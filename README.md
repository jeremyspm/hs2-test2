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
- Videos: `content/video-matches.json` is the ONLY source of the video shown after a
  wrong answer. It was built 2026-09-06 from the videos' own YouTube caption tracks, not
  their titles: every question's key + stem terms BM25-scored against 90-second caption
  windows of all 153 videos, the top candidates judged from the caption text, every
  accepted match carrying a verbatim caption quote that was then located mechanically in
  the track (its position is `at`, so the link opens where the point is taught), then a
  second look that struck four. Result: 206 of 407 questions have a caption-verified
  video (up to two each), 86 of the 153 videos are reachable. Five of the 153 were added
  the same day after grepping the whole channel for the gap topics (bone healing,
  osteoporosis, aerobic ATP, glycolysis, scapula movers); bone healing and aerobic ATP
  earned matches, the other three are orientation only. The title matcher it
  replaced attached 163 videos and only 22 of those survived the caption check —
  "serratus ANTERIOR" had bought the Anterior Pituitary video. Questions with no entry
  get no video on purpose: no video beats a wrong video. A stale entry (a question id
  the bank no longer has, a video id the list lacks, an `at` past the video's end) fails
  the build. The captions are not shipped. The whole shelf, by topic, is at
  <https://jeremyspm.github.io/hs2-videos.html> — generated from this repo's built
  `index.html` by `hs2-videos.build.mjs` in `jeremyspm.github.io`. The ▶ in the header
  and the "Watch first" door on the home screen point there.
- References: `content/ref-matches.json` is the ONLY source of the slide / notes / Patton shown
  with a question. Built 2026-09-09 by the estate's `scripts/text-refs/` the same way the videos
  were: every unit of her slides, learning pages, Anatomy Mondays 5–9 (+ answer pages), the 2026
  lab workbook and Patton 9e chapters 11–26 was BM25-shortlisted per question (two lanes, hers and
  Patton's, so the book cannot crowd her out), a model judged from the unit's text whether it
  STATES the keyed fact, every "yes" carried a 6–15 word quote re-found verbatim in the unit, and
  an adversarial pass struck 20 + 13. Result: 278 of 471 questions carry a judged reference
  (119 her slide images, 82 her prose, 175 Patton excerpts; 99 have Patton only), at most one per
  lane per question, her material above Patton. The term-overlap matcher it replaced attached 347
  passages, 102 of which shared no word with the keyed answer and 254 of which were decided by a
  tie or a margin under 2. Patton ships as the sentence(s) around the quote, ≤70 words, with
  chapter, PDF-derived printed page and (for captions) figure number — never the paragraph; the
  copy on disk is the 9th ed. (2016), the course's ClinicalKey copy is the 2019 ed. A question
  with no entry has nothing that states its answer outright in any of those sources. Build gates:
  unknown kind, missing source, quote not inside its excerpt, excerpt >80 words, Patton ref
  without page/chapter, or an entry for a question the bank no longer has — each fails the build.
  Slides are still never shown beside a question that carries its own image; text is.
- **Learn mode** (home door “Learn as you go”, and the Learn button beside every quiz): the same
  decks and the same marking, but per question — **Check** marks it in place and the answer, her
  slide, her notes, the Patton passage and the matched video (the model steps, for written
  questions) open right under it, each also a chip you can open *before* answering; that is a peek,
  and a right answer after a peek does not clear a miss. Check with nothing picked = “show me” = a miss. Learn sittings feed the
  misses pile and the least-seen dealer, never the score chart.
- `resplice.mjs` — re-splices `template.html` onto the bank already inside `index.html` (the
  chrome-only path above, as a script), and fails if the bank is not one JSON value, the marker is
  not exactly once, or the page script does not parse.
- Rebuild: `node build.mjs` then `python compress-slides.py` (ships only the slides questions reference). Serve: any static server; state is per-browser localStorage.
