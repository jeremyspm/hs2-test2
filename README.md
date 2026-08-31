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
- Rebuild: `node build.mjs` then `python compress-slides.py` (ships only the slides questions reference). Serve: any static server; state is per-browser localStorage.
