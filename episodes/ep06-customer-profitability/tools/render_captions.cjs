const fs = require("node:fs");
const path = require("node:path");
const { spawnSync, execFileSync } = require("node:child_process");
const root = path.resolve(__dirname, "..");
const original = path.join(root, "out", "ep06-customer-profitability.mp4");
const work = path.join(root, "out", "ep06-captioned-work.mp4");
const output = path.join(
  root,
  "out",
  "ep06-customer-profitability-bilingual.mp4",
);
const ffmpeg = process.env.FFMPEG_PATH || "ffmpeg";
if (!fs.existsSync(original))
  throw new Error(
    "Original EP06 MP4 is required to preserve its exact audio track.",
  );
function run(command, args) {
  const r = spawnSync(command, args, { cwd: root, stdio: "inherit" });
  if (r.error) throw r.error;
  if (r.status !== 0) process.exit(r.status || 1);
}
run(process.execPath, [
  path.join(root, "node_modules", "@remotion", "cli", "remotion-cli.js"),
  "render",
  "src/index.tsx",
  "EP06BilingualCaptions",
  work,
  "--browser-executable=" +
    (process.env.BROWSER_EXECUTABLE || "/usr/bin/chromium"),
  "--codec=h264",
  "--pixel-format=yuv420p",
  "--concurrency=4",
  "--log=error",
]);
run(ffmpeg, [
  "-v",
  "error",
  "-y",
  "-i",
  work,
  "-i",
  original,
  "-map",
  "0:v:0",
  "-map",
  "1:a:0",
  "-c",
  "copy",
  "-movflags",
  "+faststart",
  output,
]);
function hash(file) {
  return execFileSync(
    ffmpeg,
    [
      "-v",
      "error",
      "-i",
      file,
      "-map",
      "0:a:0",
      "-c",
      "copy",
      "-f",
      "hash",
      "-hash",
      "sha256",
      "-",
    ],
    { encoding: "utf8" },
  ).trim();
}
const before = hash(original),
  after = hash(output);
if (before !== after)
  throw new Error(
    "Audio packet hash differs from original; do not deliver this file.",
  );
fs.writeFileSync(
  path.join(root, "out", "captioned-audio-preservation.json"),
  JSON.stringify(
    {
      source: "ep06-customer-profitability.mp4",
      output: path.basename(output),
      compressed_audio_packet_hash: after,
      exact_original_audio_preserved: true,
    },
    null,
    2,
  ) + "\n",
);
fs.unlinkSync(work);
console.log(
  "Bilingual captioned video rendered; exact original audio packet hash verified.",
);
