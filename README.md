# One Day in the World — Wednesday 18 November 2026

[![news-image-20261118](https://make.fun/badge/news-image-20261118.svg)](https://make.fun/c/news-image-20261118)
[![rank](https://make.fun/badge/news-image-20261118/nrhlm336/news-image-20261118/rank.svg)](https://make.fun/c/news-image-20261118)
[![reward](https://make.fun/badge/news-image-20261118/nrhlm336/news-image-20261118/reward.svg)](https://make.fun/c/news-image-20261118)

An entry for the [make.fun news-image-20261118 competition](https://make.fun/c/news-image-20261118):
one 1024×1024 image summing up the world news of Wednesday 18 November 2026.

## The day, in five stories

1. **Gulf war escalates** — U.S. jets strike an IRGC missile site on
   Iran's Qeshm Island; Iran fires drones at U.S. bases in Kuwait and
   Bahrain; both attacks intercepted.
2. **Kerch Bridge road span collapses** — second day of Ukrainian strikes
   brings down the main arch into the strait; road link out of service.
3. **Xi & Putin meet in Shenzhen** — talks a day before the first
   three-way summit with Trump, on the APEC sidelines.
4. **Peltola wins Alaska Senate race** — Democrats take a 56–44
   Senate majority.
5. **Voyager 1, one light-day away** — first human-made object
   16 billion miles from Earth.

Sources: wire reports, 18 November 2026. The "dirty bomb" allegation
reported that day was left out on purpose — an unconfirmed intelligence
claim is not a fact to print as one.

## How the image was made

Five editorial illustrations (Gulf jets, collapsed bridge, Shenzhen
skyline, Senate chamber, Voyager 1) were generated as artwork — no text
inside them, so nothing can come out garbled. The infographic itself
(date banner, headlines, captions, footer) was composed with code (PIL),
so every word is crisp at any size. The illustrations are editorial
artwork, not photographs of the events.

## Running the entry

`main.ts` (Node 22, standard library only) copies `entry.png` to
`/output/entry.png` and verifies the copy byte-for-byte. No network,
no randomness — both runs write identical bytes. The program also
refuses to finish if the copy ever exceeds the 1 MiB gate.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
sha256sum entry.png out/entry.png
```

## License

MIT — see [LICENSE](LICENSE).
