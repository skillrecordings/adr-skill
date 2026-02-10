#!/usr/bin/env node
/**
 * Bootstrap ADRs in a repo:
 * - create ADR directory
 * - create adr/README.md (index) using a template
 * - create first ADR: "Adopt architecture decision records"
 */

const fs = require("node:fs");
const path = require("node:path");
const childProcess = require("node:child_process");

function die(msg) {
  process.stderr.write(`${msg}\n`);
  process.exit(1);
}

function parseArgs(argv) {
  const out = {
    repoRoot: ".",
    dir: "adr",
    forceIndex: false,
    indexFile: null,
    firstTitle: "Adopt architecture decision records",
    firstStatus: "accepted",
    deciders: "",
    technicalStory: "",
    strategy: "number",
    json: false,
  };

  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    const next = () => {
      if (i + 1 >= argv.length) die(`Missing value for ${a}`);
      return argv[++i];
    };

    if (a === "--repo-root") out.repoRoot = next();
    else if (a === "--dir") out.dir = next();
    else if (a === "--force-index") out.forceIndex = true;
    else if (a === "--index-file") out.indexFile = next();
    else if (a === "--first-title") out.firstTitle = next();
    else if (a === "--first-status") out.firstStatus = next();
    else if (a === "--deciders") out.deciders = next();
    else if (a === "--technical-story") out.technicalStory = next();
    else if (a === "--strategy") out.strategy = next();
    else if (a === "--json") out.json = true;
    else if (a === "--help" || a === "-h") {
      process.stdout.write(
        [
          "Usage: node bootstrap_adr.js [options]",
          "",
          "Options:",
          "  --repo-root <path>     Repo root (default: .)",
          "  --dir <path>           ADR directory (default: adr)",
          "  --index-file <path>    Override index file path (relative to repo root unless absolute)",
          "  --force-index          Overwrite index file if it exists",
          "  --first-title <text>   Title for initial ADR",
          "  --first-status <text>  Status for initial ADR (default: accepted)",
          "  --strategy number|slug|auto  Filename strategy for initial ADR (default: number)",
          "  --json                 Output machine-readable JSON (default: off)",
          "",
        ].join("\n")
      );
      process.exit(0);
    } else {
      die(`Unknown arg: ${a}`);
    }
  }

  if (!["auto", "number", "slug"].includes(out.strategy)) die(`Invalid --strategy: ${out.strategy}`);
  return out;
}

function loadReadmeTemplate() {
  const skillRoot = path.resolve(__dirname, "..");
  const templatePath = path.join(skillRoot, "assets", "templates", "adr-readme.md");
  if (!fs.existsSync(templatePath)) die(`README template not found: ${templatePath}`);
  return fs.readFileSync(templatePath, "utf8");
}

function writeIndex(indexFile, adrDirName, { force }) {
  if (fs.existsSync(indexFile) && !force) return;
  const content = loadReadmeTemplate().replaceAll("{ADR_DIR}", adrDirName);
  fs.mkdirSync(path.dirname(indexFile), { recursive: true });
  fs.writeFileSync(indexFile, `${content.trimEnd()}\n`, "utf8");
}

function main() {
  const args = parseArgs(process.argv);

  const repoRoot = path.resolve(process.cwd(), args.repoRoot);
  if (!fs.existsSync(repoRoot)) die(`Repo root does not exist: ${repoRoot}`);

  const adrDir = path.resolve(repoRoot, args.dir);
  fs.mkdirSync(adrDir, { recursive: true });

  const indexFile = args.indexFile
    ? (path.isAbsolute(args.indexFile) ? args.indexFile : path.resolve(repoRoot, args.indexFile))
    : path.join(adrDir, "README.md");

  const indexExistedBefore = fs.existsSync(indexFile);
  writeIndex(indexFile, args.dir, { force: args.forceIndex });
  const indexWritten = fs.existsSync(indexFile) && (!indexExistedBefore || args.forceIndex);

  // Create the first ADR using new_adr.js to keep naming/index logic consistent.
  const newAdrPath = path.join(__dirname, "new_adr.js");
  const relIndex = path.isAbsolute(indexFile) ? path.relative(repoRoot, indexFile) : indexFile;

  const cmd = [
    newAdrPath,
    "--repo-root",
    repoRoot,
    "--dir",
    args.dir,
    "--title",
    args.firstTitle,
    "--status",
    args.firstStatus,
    "--strategy",
    args.strategy,
    "--update-index",
    "--index-file",
    relIndex,
  ];
  if (args.deciders) cmd.push("--deciders", args.deciders);
  if (args.technicalStory) cmd.push("--technical-story", args.technicalStory);

  const today = new Date().toISOString().slice(0, 10);

  if (args.json) {
    const jsonCmd = [...cmd, "--json"];
    const r = childProcess.spawnSync(process.execPath, jsonCmd, { encoding: "utf8" });
    if (r.status !== 0) {
      process.stderr.write(r.stderr || "");
      process.exit(r.status ?? 1);
    }

    let childPayload = null;
    try {
      childPayload = JSON.parse(String(r.stdout || "").trim());
    } catch (e) {
      die(`Failed to parse child JSON from new_adr.js. stdout was:\n${String(r.stdout || "")}`);
    }

    const payload = {
      repoRoot,
      adrDir,
      adrDirRelPath: path.relative(repoRoot, adrDir).split(path.sep).join("/"),
      indexPath: indexFile,
      indexRelPath: relIndex.split(path.sep).join("/"),
      indexExistedBefore,
      indexWritten,
      firstAdr: childPayload,
      date: today,
    };
    process.stdout.write(`${JSON.stringify(payload)}\n`);
    return;
  }

  const r = childProcess.spawnSync(process.execPath, cmd, { stdio: "inherit" });
  if (r.status !== 0) process.exit(r.status ?? 1);

  process.stdout.write(`Bootstrapped ADRs at ${adrDir} (${today})\n`);
  process.stdout.write(`Index: ${indexFile}\n`);
}

main();
