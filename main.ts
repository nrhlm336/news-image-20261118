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

import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));
const source = join(repoDir, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Verify the copy is byte-identical before the run ends: the competition
// requires both runs to write the same bytes, and a silent short copy
// would be a worse failure than a loud one. The size check also guards
// the 1 MiB gate in case the image is ever swapped for a larger one.
const original = readFileSync(source);
const written = readFileSync(target);
if (!original.equals(written)) {
  throw new Error("entry.png copy failed: output bytes differ from source");
}
if (statSync(target).size > 1048576) {
  throw new Error("entry.png exceeds the 1 MiB limit");
}
console.log(`wrote ${target} (${written.length} bytes, byte-identical copy)`);
