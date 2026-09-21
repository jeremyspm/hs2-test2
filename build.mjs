/* Assemble index.html from the parsed Module 2 question bank.
   Nothing here authors questions — stems, options and keys come from the capture
   verbatim; authored content lives in content/ and is joined by gates that fail
   the build in BOTH directions (an unmatched answer file entry is as fatal as an
   unanswered essay). */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { CHAINS } from './content/chains.js';
import { CASE7 } from './content/case7.js';
import { SAQ_ANSWERS, norm } from './content/saq-answers.js';
import { loadVideos, loadVideoMatches, loadRefMatches, loadPartRefs, matchVideo, matchRefs, matchParts } from './content/explain.mjs';
import { structuredStems, plainText } from './stem-html.mjs';
import { OVERRIDES } from './content/overrides.js';
import { AUTHORED_STEMS } from './content/authored-stems.js';
import { FOCUS } from './content/focus.js';
import { HELPLINE } from './content/helpline.js';
import { QTOPIC } from './content/qtopic.js';
import { QROW } from './content/qrow.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const M2 = 'C:/Users/USER/Desktop/github/hs2-anki/m2';
const CAP = 'C:/Users/USER/Desktop/github/_inbox/HS2 Module 2 Capture';

const bank = JSON.parse(fs.readFileSync(path.join(M2, 'questions.json'), 'utf8'));
const imgBind = JSON.parse(fs.readFileSync(path.join(HERE, 'images.json'), 'utf8'));
const manifest = JSON.parse(fs.readFileSync(path.join(CAP, 'images/manifest.json'), 'utf8'));
const extManifest = JSON.parse(fs.readFileSync(path.join(CAP, 'images/ext-manifest.json'), 'utf8'));
/* the same captures, read a second way: structure kept, blanks and images in place.
   `q` (flat, hers verbatim) stays the id + search text; `qh` is what the student sees. */
const STEMS = structuredStems(CAP, manifest, extManifest);

/* quiz id -> name + system (titles in the capture are the noscript banner, so
   names are declared here, matching Canvas titles) */
const QUIZ = {
  210996:['ns','CNS Practice Test'],210997:['ms','Formative: General Bones'],
  211007:['endo','Hormones & Functions'],211018:['endo','Regulating Blood Sugar (SAQ)'],
  211023:['mixed','Module 2: MS & NS'],211028:['mixed','Revision: Biggest, Smallest, Oddest'],
  211031:['endo','Diencephalon & Endocrine'],211032:['mixed','Module Review A'],
  211033:['ms','Lab 3: MS SAQ'],211037:['ms','Labeling Muscles & Bones'],
  211044:['ns','Autonomic NS Practice'],211046:['ms','MS Overview Quiz'],
  211051:['ms','Lab 3: Bony Markings'],211056:['ms','Levers & Energy in Muscles'],
  211060:['ms','Bones, Joints & Muscles'],211073:['endo','Formative: Endocrine (MC)'],
  211080:['ns','Fundamentals of the NS'],211093:['ns','Protection of the NS'],
  211097:['ns','Practice Lab 4 (NS)'],211109:['endo','Endocrine SAQ'],
  211115:['ns','Neurons & the NS'],211119:['mixed','Module 2 Formative (55 mk)'],
  211020:['mixed','Module Review B'],211103:['ns','Brain Parts'],
  211125:['ms','Formative: Bone Growth'],211126:['endo','Endocrine 2 (MC)'],
  211129:['ns','Neuron, AP & Synapse'],211133:['ms','MS: Muscles'],
  213199:['ms','MS: Find the Errors'],
  /* Sep-7 unlock captures (Module 2 MS/NS/Endo) */
  211052:['ms','Muscles'],211078:['ms','Skeleton, Muscles & Energy'],
  211042:['ns','The Brain & Stroke'],211112:['endo','Formative: Endocrine System'],
  211063:['endo','Insulin, Glucagon & Blood Sugar'],211055:['endo','Endocrine System (SAQ)'],
  /* captured 21 Sep 2026 from his own graded attempts: Formative 2 had been locked, PNS was never saved */
  210998:['mixed','Module 2 Formative 2 (35 mk)'],213444:['ns','Peripheral Nervous System'],
};

/* Questions the pipeline cannot render truthfully, held on purpose rather than
   shipped broken. Matched by quiz + normalised stem prefix. (211112 #1 "Label the
   glands" used to live here; it now has an authored image-stem in
   content/authored-stems.js, so it ships.) */
const EXCLUDE = [
  /* her OWN Canvas key, read off his graded page: the row "Sacral" is keyed to Phrenic and "Brachi" to "Medial". Her other PNS
     question keys the phrenic nerve to the CERVICAL plexus, so this one contradicts her — held rather than taught. */
  { quiz: '213444', k: 'match the plexuses and the important nerves', why: 'her Canvas key contradicts itself (row "Sacral" keyed to Phrenic; elsewhere she keys phrenic to the cervical plexus)' },
  /* her OWN Canvas key, read off his graded page (answer_for_B, correct_answer): the C5-T1 row is keyed "Cervical" although
     "Brachial" is one of its options and her own table names the ulnar/median/radial nerves in that row. Was held for a missing
     figure until 393dab6 found the figure, which released it with the wrong key and no note — held again, for the key. */
  { quiz: '213444', k: 'spinal nerves plexuses origin nerves', why: 'her Canvas key marks C5-T1 as "Cervical" (C5-T1 is the brachial plexus, and "Brachial" is one of the options)' },
];

/* Questions held as "image did not survive" whose only image is a dead or decorative
   reference (a failed external image, an empty [[IMG]]) and which are fully answerable
   from their own text or pairs. Shipped as text rather than held on a phantom figure.
   Matched by quiz + normalised stem prefix; a stale entry fails the build. */
const NO_IMAGE_OK = [
  /* Empty since 21 Sep 2026: all eight former rows (211042 FAST, 211103 brain parts, five in 210998, the 213444 reflex arc)
     were figures the reader could not see (unquoted src=data: and SingleFile --sf-img-N variables), and every one now ships
     WITH her figure, each checked by eye against its question. A row whose question HAS its figure fails the build. */
];
const noImgOkUsed = new Set(), noImgOkStale = [];

/* A blank her KEY defines but her STEM never shows: in the PNS receptor table she printed "Photo receptors" as plain text
   and left its dropdown out, so Canvas itself shows three dropdowns for a four-blank key. A blank the student cannot see
   cannot be asked — it is dropped here, by name, and the rest renumbered. Explicit on purpose: the general rule stays
   "every key blank must be inline", so a blank the READER lost still fails the build. A stale entry fails it too. */
const ORPHAN_BLANKS = [
  { quiz: '213444', k: 'receptor type stimulus detected', drop: ['Photo'] },
];
const orphanUsed = new Set();

/* deal-weight routing for mixed-quiz questions — coarse by design; used for
   stratification only, never for a coverage claim. APPEND rules, never insert. */
const ROUTE = [
  ['ms', /\b(bone|muscle|joint|skelet|fractur|lever|ossif|osteo|tendon|ligament|vertebra|cartilage|marrow|synovial|sarcomere|myofibril)/i],
  ['endo', /\b(hormon|insulin|glucagon|thyroid|pituitar|adrenal|endocrin|cortisol|calcitonin|parathyroid|glucose|aldosterone|oxytocin|adh|tropic)/i],
  ['ns', /\b(neuron|nerv|brain|synap|reflex|spinal|cereb|cranial|axon|dendrite|meninge|myelin|action potential|sympathetic|parasympathetic|csf)/i],
];
const routeSys = (txt) => (ROUTE.find(([, re]) => re.test(txt)) || ['mixed'])[0];

/* id hashes the CONTENT (stem + key), not the position — Canvas renumbers, and a
   review quiz can carry the same stem twice; identical content dedupes silently. */
const qid = (quiz, stem, content) =>
  'q' + crypto.createHash('sha1').update(quiz + '|' + stem + '|' + JSON.stringify(content ?? '')).digest('hex').slice(0, 10);

const stripImgRefs = (s) => s
  .replace(/\[\[IMG[^\]]*\]\]/g, ' ')
  /* Canvas page furniture that leaks into stems — never part of the question */
  .replace(/https?:\/\/\S+/g, ' ')
  .replace(/\(?\s*Links to an external site\.?\s*\)?/gi, ' ')
  .replace(/This video may display YouTube ads\.?/gi, ' ')
  .replace(/Continue to YouTube content\.?/gi, ' ')
  .replace(/Minimize embedded content\.?/gi, ' ')
  .replace(/\s+/g, ' ').trim();

const questions = [], held = [], quizzes = [];
const saqUsed = new Set();
const structFails = []; let nInline = 0;
const overridesUsed = new Set();
const authoredUsed = new Set();

for (const z of bank.quizzes) {
  const fid = (z.file.match(/HS2CAP-(\d+)/) || [])[1];
  const [qsys, qname] = QUIZ[fid] || ['mixed', 'Quiz ' + fid];
  let kept = 0;
  z.questions.forEach((q, idx) => {
    if (q.type === 'text_only_question' || q.type === 'unknown') return;
    const stemRaw = q.q || '';
    let stem = stripImgRefs(stemRaw);
    /* Some of her matching questions have NO stem in Canvas itself — the content
       is entirely in the pairs. A synthesised stem keeps them dealable; it is
       labelled generic on purpose, never invented content. */
    if (!stem && q.key && q.key.kind === 'pairs' && q.key.pairs.length >= 2)
      stem = 'Match each item with its correct partner.';
    if (!stem) { held.push({ quiz: qname, why: 'empty stem' }); return; }
    const ex = EXCLUDE.find(e => e.quiz === fid && norm(stem).startsWith(e.k));
    if (ex) { held.push({ quiz: qname, why: ex.why, q: stem.slice(0, 80) }); return; }
    const imgs = ((imgBind[path.basename(z.file)] || {})[idx] || []);
    const okNoImg = NO_IMAGE_OK.find(e => e.quiz === fid && norm(stem).startsWith(e.k));
    if (okNoImg) noImgOkUsed.add(okNoImg);
    if (okNoImg && imgs.length) noImgOkStale.push(`no-image-ok row is stale, the question ships its figure: ${fid} "${okNoImg.k}"`);
    const needsImg = !okNoImg && (/\[\[IMG/.test(stemRaw) || /\b(image|diagram|picture|micrograph|labell?ed|figure) (above|below|shown)\b/i.test(stem));
    if (needsImg && !imgs.length) { held.push({ quiz: qname, why: 'image did not survive capture', q: stem.slice(0, 80) }); return; }
    const sys = qsys === 'mixed' ? routeSys(stem + ' ' + (q.answers || []).map(a => a.text).join(' ')) : qsys;
    const base = { id: qid(fid, stem, q.key), quiz: fid, sys, pts: +q.points || 1, q: stem, imgs };
    /* structured stem: only images this question actually ships may be placed inline;
       blank markers are validated per type below, so a stem can never show a blank
       the key does not have, or hide one it does. */
    const authoredSt = AUTHORED_STEMS.find(a => a.quiz === fid && norm(stem).startsWith(a.k));
    if (authoredSt) authoredUsed.add(authoredSt);
    const st = authoredSt ? authoredSt.st : (STEMS[path.basename(z.file)] || {})[idx];
    if (st && st.html) {
      base.qh = st.html.replace(/\[\[IMG:([^\]]+)\]\]/g, (m, f) => imgs.includes(f) ? m : '');
      if (!/<(?:p|ul|ol|div)\b/.test(base.qh)) base.qh = '<p>' + base.qh + '</p>';
    } else base.qh = '<p>' + stem.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])) + '</p>'; // synthesised stem
    /* one-line text of the SAME stem for titles and the Ask-AI prompt — the flat
       capture split words at inline tags ("a nta gonist") and carries "[ Select ]" */
    base.qt = plainText(base.qh);
    const blankMarkers = (h) => [...(h || '').matchAll(/\[\[BLANK:(\d+|\?)\]\]/g)].map(m => m[1]);
    const placeBlanks = (n) => {
      const ks = blankMarkers(base.qh);
      const ok = base.qh && ks.length === n && !ks.includes('?') && new Set(ks).size === n && ks.every(k => +k < n);
      if (!ok) { structFails.push(`${qname} #${idx + 1}: ${n} blanks in key, markers [${ks.join(',')}] in stem — "${stem.slice(0, 60)}"`); base.qh = (base.qh || '').replace(/\[\[BLANK:[^\]]*\]\]/g, '____'); return null; }
      nInline++;
      return st.ctx;
    };
    if (base.qh && q.type !== 'multiple_dropdowns_question' && q.type !== 'fill_in_multiple_blanks_question' && blankMarkers(base.qh).length) {
      structFails.push(`${qname} #${idx + 1}: blank markers in a ${q.type}`); base.qh = base.qh.replace(/\[\[BLANK:[^\]]*\]\]/g, '____');
    }

    if (q.type === 'essay_question') {
      const hit = SAQ_ANSWERS.find(a => norm(stem).startsWith(a.k) || norm(stem).includes(a.k));
      if (!hit) { held.push({ quiz: qname, why: 'essay with no authored model answer', q: stem.slice(0, 80) }); return; }
      saqUsed.add(hit.k);
      questions.push({ ...base, type: 'essay', pts: Math.max(base.pts, hit.steps.length ? Math.min(6, hit.steps.length) : base.pts), saq: { steps: hit.steps, src: 'Model answer is the tool’s · from ' + hit.src } });
      kept++; return;
    }
    if (!q.key) { held.push({ quiz: qname, why: 'no extracted key', q: stem.slice(0, 80) }); return; }
    if (q.key.kind === 'pairs') {
      if (q.key.pairs.length < 2) { held.push({ quiz: qname, why: 'matching with <2 recovered pairs', q: stem.slice(0, 80) }); return; }
      questions.push({ ...base, type: 'match', pairs: q.key.pairs, pts: Math.max(base.pts, q.key.pairs.length) });
      kept++; return;
    }
    if (q.key.kind === 'blanks') {
      if (q.key.blanks.some(b => !b.options.length || !b.correct)) { held.push({ quiz: qname, why: 'blank with no options/correct', q: stem.slice(0, 80) }); return; }
      /* bk: how the blank is answered — 'dd' = her dropdown (options are choices, ONE
         is right), 'fib' = typed (options are the accepted spellings, ALL are right).
         The two must grade differently; the old single path marked any dropdown
         choice correct. */
      const bk = q.type === 'multiple_dropdowns_question' ? 'dd' : 'fib';
      let keyBlanks = q.key.blanks, keptIdx = null;
      const orphan = ORPHAN_BLANKS.find(e => e.quiz === fid && norm(stem).startsWith(e.k));
      if (orphan) {
        const present = new Set(blankMarkers(base.qh));
        keptIdx = keyBlanks.map((b, k) => k).filter(k => present.has(String(k)) || !orphan.drop.includes(keyBlanks[k].correct));
        if (keptIdx.length < keyBlanks.length) orphanUsed.add(orphan);
        const remap = new Map(keptIdx.map((k, n) => [String(k), n]));
        base.qh = base.qh.replace(/\[\[BLANK:(\d+)\]\]/g, (m, k) => remap.has(k) ? `[[BLANK:${remap.get(k)}]]` : m);
        keyBlanks = keptIdx.map(k => keyBlanks[k]);
      }
      const ctx0 = placeBlanks(keyBlanks.length);
      const ctx = ctx0 && keptIdx ? Object.fromEntries(keptIdx.map((k, n) => [n, ctx0[k]])) : ctx0;
      const blanks = keyBlanks.map((b, k) => ({ ...b, ctx: ctx ? (ctx[k] || '') : '' }));
      /* extra accepted answers, declared in content/overrides.js and matched here by
         id + blank + her correct answer — a stale override fails the build below */
      for (const o of OVERRIDES.filter(o => o.id === base.id)) {
        const b = blanks[o.blank];
        if (!b || b.correct !== o.correct) continue;
        b.also = [...new Set([...(b.also || []), ...o.also])];
        overridesUsed.add(o);
      }
      questions.push({ ...base, type: 'cloze', bk, blanks, pts: Math.max(base.pts, blanks.length) });
      kept++; return;
    }
    /* options family. Some of her MCQs store options as bare letters (a/b/c/d)
       with the real text only in each answer's title attribute — enrich from the
       title, keys re-derived through the SAME rule so they can never diverge. */
    /* Canvas's title = the answer + "." + its marks ("You selected this answer.", "This was the correct answer."). Strip the marks
       AND that dot: a wrong "23." beside a bare right "92" marked the answer by its shape (2 live in hs2-test2, 24 in hs2-test3). */
    const cleanTitle = t => (t || '').replace(/(?:\.?\s*(?:This was the correct answer|You selected this answer)\.?)+\s*$/i, '').replace(/\.$/, '').trim();
    const enrich = a => { const t = (a.text || '').trim(), ti = cleanTitle(a.titleAttr);
      return (t.length < 3 && ti.length >= 3) ? ti : t; };
    const ans = (q.answers || []).filter(a => (a.text || '').trim() || cleanTitle(a.titleAttr));
    let opts = [...new Set(ans.map(enrich).filter(Boolean))];
    /* "All/None of the above" only means what it says when it IS below the others —
       the capture holds them in Canvas's per-attempt shuffle order. Display order only. */
    const above = o => /^(?:all|none|both) of (?:the above|these)/i.test(o);
    opts = [...opts.filter(o => !above(o)), ...opts.filter(above)];
    const key = [...new Set(ans.filter(a => a.correctClass || a.weight === '100').map(enrich))];
    /* a BARE LETTER is one character A-H. "Shorter than 3" held real answers as letters: genetics' "46", "Hh", "AO", "LH", "0%",
       Module 2's "6" (skeletal muscles), Module 1's "7" (blood pH) and "1"-"4" (O2 per haemoglobin). */
    const bare = o => /^[A-Ha-h]$/.test(o.trim());
    /* her lettered list may be in either case: "A. Calcitonin B. Parathyroid hormone C. Oestrogen" */
    const lettered = opts.every(bare) && /\b[a-d]\.\s/i.test(stem);
    if (!opts.length || opts.length < 2 || !key.length || !key.every(k => opts.includes(k))) {
      held.push({ quiz: qname, why: 'key text not among options', q: stem.slice(0, 80) }); return;
    }
    if (opts.every(bare) && !lettered && !imgs.length) {      /* EVERY option a bare letter: blood types A · B · AB · O are answers, not letters */
      held.push({ quiz: qname, why: 'letter-only options with no lettered stem or image', q: stem.slice(0, 80) }); return;
    }
    const type = q.type === 'true_false_question' ? 'tf'
      : q.type === 'multiple_answers_question' ? 'multi' : 'mcq';
    /* bare-letter options (a/b/c/d) get their text from the stem's own lettered list,
       so the card reads "b. Fibula" instead of "b" — display only; the key stays hers.
       Only when every option letter is found exactly once in the stem. */
    let ol = null;
    if (lettered) {
      const found = {};
      for (const m of stem.matchAll(/(?:^|\s)([a-d])\.\s*(.+?)(?=\s+[a-d]\.\s*\S|$)/gi)) { const L = m[1].toLowerCase(); if (found[L]) { found.__dup = true; } found[L] = m[2].trim(); }
      if (!found.__dup && opts.every(o => found[o.toLowerCase()])) ol = Object.fromEntries(opts.map(o => [o, found[o.toLowerCase()]]));
    }
    questions.push({ ...base, type, opts, key, ...(ol ? { ol } : {}) });
    kept++;
  });
  if (kept) quizzes.push({ id: fid, name: qname, sys: qsys, n: kept });
}

/* ── the explain layer: video + judged text references per question ── */
const videos = loadVideos(path.join(HERE, 'content'));
const vmatches = loadVideoMatches(path.join(HERE, 'content'), videos);
const rmatches = loadRefMatches(path.join(HERE, 'content'));
const pmatches = loadPartRefs(path.join(HERE, 'content'));
let nPartQ = 0, nPartRefs = 0; const pmUsed = new Set();
const SLIDESRC = path.join(CAP, 'slides');
let nVid = 0, nRef = 0, nSlide = 0, nSlideText = 0, nHer = 0, nCourse = 0, nPat = 0, nPatOnly = 0;
const usedSlides = new Set(), vmUsed = new Set(), rmUsed = new Set();
for (const q of questions) {
  const v = matchVideo(q, videos, vmatches); if (v) { q.vid = v; nVid++; vmUsed.add(q.id); }
  const refs = [];
  for (const r of matchRefs(q, rmatches)) {
    rmUsed.add(q.id);
    if (r.k === 'slide') {
      /* A question that carries its OWN image is its own authority — a retrieved
         slide with a different letter/label scheme beside it contradicts the
         figure the student just answered on (the label-the-glands bug). Such
         questions keep text references only, never a second figure. */
      if (q.imgs.length) continue;
      const png = path.join(SLIDESRC, r.slug, `slide-${r.n}.png`);
      if (fs.existsSync(png)) {
        const name = `${r.slug}-${r.n}.jpg`;
        usedSlides.add(JSON.stringify([png, name]));
        refs.push({ k: 'slide', src: r.src, slide: name }); nSlide++;
      } else if (r.t) { refs.push({ k: 'slide', src: r.src, t: r.t }); nSlideText++; }   /* deck not rendered: quote the slide's own words — never point at a picture we can't show */
    } else {
      refs.push(r);
      if (r.k === 'her') nHer++; else if (r.k === 'course') nCourse++; else nPat++;
    }
  }
  if (refs.length) { q.refs = refs; nRef++; if (refs.every(r => r.k === 'patton')) nPatOnly++; }
  const prefs = matchParts(q, pmatches);
  if (prefs.length) { q.prefs = prefs; nPartQ++; nPartRefs += prefs.length; pmUsed.add(q.id); }
}
console.log(`references per part: ${nPartRefs} parts referenced over ${nPartQ} multi-part questions`);
console.log(`explain layer: ${nVid}/${questions.length} questions matched a video (${Math.round(100 * nVid / questions.length)}%); ` +
  `${nRef} carry a judged reference (${nSlide} her slide images + ${nSlideText} slides quoted as text, ${nHer} her prose, ${nCourse} course files, ${nPat} Patton excerpts; ${nPatOnly} Patton-only) — from ${videos.length} videos`);
/* compress + ship only the referenced slides */
const SLIDEOUT = path.join(HERE, 'img', 'slides');
fs.mkdirSync(SLIDEOUT, { recursive: true });
fs.writeFileSync(path.join(HERE, 'slides-todo.json'),
  JSON.stringify([...usedSlides].map(s => JSON.parse(s)), null, 1));

/* her worked helpline answer, under the question: q.hl = the focus topic whose section
   teaches this question (content/qtopic.js, read by hand). Both directions gated: an id
   that matches no live question is stale, a topic with no section would render nothing. */
let nHl = 0; const hlUsed = new Set();
for (const q of questions) if (QTOPIC[q.id]) { q.hl = QTOPIC[q.id]; nHl++; hlUsed.add(q.id); }
/* ── gates ─────────────────────────────────────────────────────────── */
const fails = [];
for (const [qid, t] of Object.entries(QTOPIC)) {
  if (!hlUsed.has(qid)) fails.push('qtopic entry matched NO question: ' + qid);
  if (!HELPLINE[t]) fails.push(`qtopic topic has no helpline section: ${t} (${qid})`);
}
for (const a of SAQ_ANSWERS) if (!saqUsed.has(a.k)) fails.push('saq-answers entry matched NO essay: "' + a.k + '"');
/* a verified video match whose question id no longer exists is stale evidence,
   not a harmless extra — same rule as an override that matched nothing */
for (const qid of Object.keys(vmatches)) if (!vmUsed.has(qid)) fails.push('video-matches entry matched NO question: ' + qid);
for (const qid of Object.keys(rmatches)) if (!rmUsed.has(qid)) fails.push('ref-matches entry matched NO question: ' + qid);
for (const qid of Object.keys(pmatches)) if (!pmUsed.has(qid)) fails.push('part-refs entry matched NO question: ' + qid);
/* identical content captured twice (review quizzes repeat questions) — keep one */
const dup = new Set(); let dropped = 0;
for (let i = questions.length - 1; i >= 0; i--) {
  if (dup.has(questions[i].id)) { questions.splice(i, 1); dropped++; }
  else dup.add(questions[i].id);
}
if (dropped) console.log('deduped', dropped, 'identical duplicate captures');
/* "Learn her N questions on this": each focus row named in content/qrow.js carries `qs`,
   the ids it deals. Gated both ways like every other join; exact repeats (one question
   captured in two quizzes) are dropped so the button's count is what he will actually sit,
   and one-tap questions lead so a run starts in the shallow end and ends on the written ones. */
const TYPE_RANK = { mcq: 0, tf: 0, multi: 1, match: 2, cloze: 3, essay: 4 };
const byId = new Map(questions.map(q => [q.id, q]));
const rowQs = {}; let nRowQ = 0;
for (const [rid, ids] of Object.entries(QROW)) {
  if (!FOCUS.some(f => f.id === rid)) { fails.push('qrow row is not a focus row: ' + rid); continue; }
  const seenId = new Set(), seenSig = new Set(), keep = [];
  for (const id of ids) {
    const q = byId.get(id);
    if (!q) { fails.push(`qrow entry matched NO question: ${id} (${rid})`); continue; }
    if (seenId.has(id)) { fails.push(`qrow lists ${id} twice under ${rid}`); continue; }
    seenId.add(id);
    const sig = q.type + '|' + norm(q.q) + '|' + JSON.stringify(q.key || q.pairs || (q.blanks || []).map(b => b.correct));
    if (seenSig.has(sig)) continue;
    seenSig.add(sig); keep.push(q);
  }
  if (!keep.length) fails.push('qrow row deals nothing: ' + rid);
  rowQs[rid] = keep.map((q, i) => [q, i]).sort((a, b) => (TYPE_RANK[a[0].type] ?? 5) - (TYPE_RANK[b[0].type] ?? 5) || a[1] - b[1]).map(x => x[0].id);
  nRowQ += rowQs[rid].length;
}
const focusOut = FOCUS.map(f => rowQs[f.id] ? { ...f, qs: rowQs[f.id] } : f);
for (const q of questions) for (const f of q.imgs) if (!fs.existsSync(path.join(CAP, 'images', f))) fails.push('missing image file ' + f);
for (const c of CHAINS) if (c.beads.filter(b => b.t).length < 4) fails.push('chain too short: ' + c.id);
/* every blank-type question must carry every one of its blanks inline, once, in the
   stem the student sees — a blank the key has but the stem lacks is the exact bug this
   layer exists to kill, so it fails the build rather than falling back quietly */
for (const s of structFails) fails.push('stem structure: ' + s);
for (const o of OVERRIDES) if (!overridesUsed.has(o)) fails.push(`override matched nothing: ${o.id} blank ${o.blank} "${o.correct}"`);
for (const a of AUTHORED_STEMS) if (!authoredUsed.has(a)) fails.push(`authored-stem matched NO question: ${a.quiz} "${a.k}"`);
for (const e of ORPHAN_BLANKS) if (!orphanUsed.has(e)) fails.push(`orphan-blank rule dropped nothing: ${e.quiz} "${e.k}"`);
for (const e of NO_IMAGE_OK) if (!noImgOkUsed.has(e)) fails.push(`no-image-ok matched NO question: ${e.quiz} "${e.k}"`);
fails.push(...noImgOkStale);
/* an option must not carry Canvas's marks or the dot its title appends: either one tells the answer apart by its shape */
for (const q of questions) for (const o of [...(q.opts || []), ...(q.key || [])]) if (typeof o === 'string' && (/you selected this answer|this was the correct answer/i.test(o) || /^[^\s.]{2}\.$/.test(o))) fails.push(`option carries a Canvas title mark: ${q.id} "${o}"`);
for (const q of questions) if (!q.qh) fails.push('no structured stem for ' + q.id + ' "' + q.q.slice(0, 60) + '"');
for (const q of questions) if (q.qh && /\[\[(?!IMG:|BLANK:\d+\]\])/.test(q.qh)) fails.push('stray marker in ' + q.id);
if (fails.length) { console.error('BUILD FAILED:\n  ' + fails.join('\n  ')); process.exit(1); }
console.log(`her worked helpline answer under ${nHl} questions`);
console.log(`learn-by-row: ${Object.keys(rowQs).length} focus rows deal ${nRowQ} question slots — ` + Object.entries(rowQs).map(([r, a]) => r + ' ' + a.length).join(' · '));
console.log(`structured stems: ${questions.filter(q => q.qh).length}/${questions.length} · blanks placed inline in ${nInline} cloze questions`);

/* ── emit ──────────────────────────────────────────────────────────── */
/* video reach is a stat, not a sentence: the template reads these so the home
   screen can never quote a count the bank has moved past */
const reached = new Set();
for (const q of questions) if (q.vid) { reached.add(q.vid.id); if (q.vid.alt) reached.add(q.vid.alt.id); }
const DATA = {
  built: new Date().toISOString().slice(0, 10),
  stats: { n: questions.length, held: held.length, videos: videos.length, videosReached: reached.size,
    videosFill: videos.filter(v => v.ch).length,
    withVideo: questions.filter(q => q.vid).length,
    withRef: nRef, withHer: questions.filter(q => q.refs && q.refs.some(r => r.k === 'slide' || r.k === 'her')).length, withCourse: nCourse,
    withPatton: nPat, pattonOnly: nPatOnly, partQ: nPartQ, partRefs: nPartRefs, withHl: nHl },
  quizzes: quizzes.sort((a, b) => a.sys.localeCompare(b.sys) || a.name.localeCompare(b.name)),
  questions, chains: CHAINS, case7: CASE7, focus: focusOut, helpline: HELPLINE, held,
};
const tpl = fs.readFileSync(path.join(HERE, 'template.html'), 'utf8');
const marker = '/*@BANK@*/';
if (tpl.split(marker).length !== 2) { console.error('BUILD FAILED: expected exactly one ' + marker); process.exit(1); }
const out = tpl.replace(marker, JSON.stringify(DATA));
fs.writeFileSync(path.join(HERE, 'index.html'), out);

/* Parse-check the page's own inline script before it ships. A single bad escape
   kills the whole app with nothing but a blank page and exit code 0 - this is the
   cheapest possible guard against that. */
{
  const scripts = [...out.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  if (!scripts.length) { console.error('BUILD FAILED: no inline script found to verify'); process.exit(1); }
  scripts.forEach((src, i) => {
    try { new Function(src); }
    catch (e) {
      console.error(`BUILD FAILED: inline script #${i + 1} does not parse - ${e.message}`);
      const line = (e.lineNumber || 0);
      console.error(src.split('\n').slice(Math.max(0, line - 3), line + 2).join('\n'));
      process.exit(1);
    }
  });
  console.log(`script parse check: ${scripts.length} inline script(s) OK`);
}

/* images ship beside the page */
const IMGDIR = path.join(HERE, 'img');
fs.mkdirSync(IMGDIR, { recursive: true });
const used = new Set(questions.flatMap(q => q.imgs));
for (const f of used) fs.copyFileSync(path.join(CAP, 'images', f), path.join(IMGDIR, f));

fs.writeFileSync(path.join(HERE, 'held.json'), JSON.stringify(held, null, 1));
const by = {}; for (const q of questions) by[q.sys] = (by[q.sys] || 0) + 1;
const byT = {}; for (const q of questions) byT[q.type] = (byT[q.type] || 0) + 1;
console.log('bank:', questions.length, 'questions ·', quizzes.length, 'quizzes ·', used.size, 'images ·', held.length, 'held');
console.log('by system:', JSON.stringify(by), '\nby type:', JSON.stringify(byT));
console.log('index.html', (fs.statSync(path.join(HERE, 'index.html')).size / 1024 | 0) + ' KB');
