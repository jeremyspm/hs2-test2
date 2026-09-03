# HS2 Paper Sim — Module 2

Every practice quiz Hannetjie posted for HS2 Module 2 (MS / NS / Endocrine), unlocked and
re-sittable, plus dealt mock papers with a score history. Test 2: 21 Sept 2026, 42 Q, 22% SAQ.

- `build.mjs` — assembles `index.html` from `../hs2-anki/m2/questions.json` (parsed Canvas
  captures; parser lives in `hs2-test1/audit/parse-quizzes.mjs`, run with `HS2_EXPORT`/`HS2_OUT`),
  `images.json` (per-question image binding from `bind-images.mjs`) and `content/` (authored:
  chains, case-7 pack, SAQ model answers — gated both directions).
- `stem-html.mjs` — reads the SAME captures a second way and gives every question a
  structured stem (`qh`): her paragraphs, lists and table rows kept, each image and each
  blank as a `[[IMG:…]]` / `[[BLANK:k]]` marker at its true position (fill-in blanks are
  matched to their answer groups through Canvas's md5 blank-id hashing, dropdowns by order).
  The build fails if any blank-type question does not carry every blank inline exactly once.
  Her external links and embedded videos survive as plain links; Canvas file links and
  page furniture are dropped. The flat parser stem (`q`) stays the id and search text.
- Stems/options/keys are hers, verbatim. Model answers for written questions are the tool's.
  `content/overrides.js` holds the few extra ACCEPTED answers (e.g. "3rd" for "third");
  her key remains the displayed answer, and a stale override fails the build.
- Grading: her dropdowns mark only her keyed option right; her typed blanks accept any
  of her listed spellings (case-insensitive, curly apostrophes normalised).
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
