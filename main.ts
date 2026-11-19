// One Day in the World — entry program for make.fun news-image-20261118.
//
// The entry image (entry.png, 1024 x 1024, built offline from five
// editorial illustrations plus code-drawn text) sits beside this file
// in the repository. This program does exactly one thing: copy it,
// byte for byte, to the grader's output directory, so the two scored
// runs produce identical bytes. Node 22, standard library only.
// No network, no randomness, no image generation at runtime.
//
// Local check:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//   sha256sum entry.png out/entry.png   (the two hashes must match)

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));
const source = join(repoDir, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });

// Read and validate the source image before copying anything: the gate
// requires a whole PNG, at most 1024 by 1024, at most 1 MiB. Checking the
// PNG signature and the IHDR dimensions here fails loudly on a corrupt or
// swapped image instead of shipping bad bytes to the grader.
const original = readFileSync(source);
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (original.length < 33 || !original.subarray(0, 8).equals(PNG_SIGNATURE)) {
  throw new Error("entry.png is not a PNG file");
}
if (original.subarray(12, 16).toString("ascii") !== "IHDR") {
  throw new Error("entry.png has no IHDR chunk");
}
const width = original.readUInt32BE(16);
const height = original.readUInt32BE(20);
if (width !== 1024 || height !== 1024) {
  throw new Error(`entry.png is ${width}x${height}, expected 1024x1024`);
}
if (original.length > 1048576) {
  throw new Error("entry.png exceeds the 1 MiB limit");
}

copyFileSync(source, target);

// Verify the copy is byte-identical before the run ends: the competition
// requires both runs to write the same bytes, and a silent short copy
// would be a worse failure than a loud one.
const written = readFileSync(target);
if (!original.equals(written)) {
  throw new Error("entry.png copy failed: output bytes differ from source");
}
console.log(`wrote ${target} (${written.length} bytes, byte-identical copy)`);
