# HS2 Paper Sim — Module 2

Every practice quiz Hannetjie posted for HS2 Module 2 (MS / NS / Endocrine), unlocked and
re-sittable, plus dealt mock papers with a score history. Test 2: 21 Sept 2026, 42 Q, 22% SAQ.

- `build.mjs` — assembles `index.html` from `../hs2-anki/m2/questions.json` (parsed Canvas
  captures; parser lives in `hs2-test1/audit/parse-quizzes.mjs`, run with `HS2_EXPORT`/`HS2_OUT`),
  `images.json` (per-question image binding from `bind-images.mjs`) and `content/` (authored:
  chains, case-7 pack, SAQ model answers — gated both directions).
- Stems/options/keys are hers, verbatim. Model answers for written questions are the tool's.
- `held.json` — every excluded question with its reason. Locked on Canvas, not yet captured:
  Module Review B (access code), Formative 2.
- `index.html` is exactly `template.html` with `/*@BANK@*/` replaced by the bank JSON —
  nothing else. So a **chrome-only** change (header, home screen, styles) can be made in
  `template.html` and re-spliced onto the bank already in `index.html`, without her Canvas
  archive on hand. Anything that touches a QUESTION still needs the real `node build.mjs`.
- Videos: this page only shows one after a wrong answer, and 100 of the 148 in
  `content/dmdm-all.json` match no question at all. The whole shelf, by topic, is at
  <https://jeremyspm.github.io/hs2-videos.html> — generated from this repo's own data by
  `hs2-videos.build.mjs` in `jeremyspm.github.io`. The ▶ in the header and the "Watch
  first" door on the home screen point there.
- Rebuild: `node build.mjs` then `python compress-slides.py` (ships only the slides questions reference). Serve: any static server; state is per-browser localStorage.
