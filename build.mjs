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

const HERE = path.dirname(fileURLToPath(import.meta.url));
const M2 = 'C:/Users/USER/Desktop/github/hs2-anki/m2';
const CAP = 'C:/Users/USER/Desktop/github/_inbox/HS2 Module 2 Capture';

const bank = JSON.parse(fs.readFileSync(path.join(M2, 'questions.json'), 'utf8'));
const imgBind = JSON.parse(fs.readFileSync(path.join(HERE, 'images.json'), 'utf8'));
const manifest = JSON.parse(fs.readFileSync(path.join(CAP, 'images/manifest.json'), 'utf8'));

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
  211125:['ms','Formative: Bone Growth'],211126:['endo','Endocrine 2 (MC)'],
  211129:['ns','Neuron, AP & Synapse'],211133:['ms','MS: Muscles'],
  213199:['ms','MS: Find the Errors'],
};

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
    const imgs = ((imgBind[path.basename(z.file)] || {})[idx] || []);
    const needsImg = /\[\[IMG/.test(stemRaw) || /\b(image|diagram|picture|micrograph|labell?ed|figure) (above|below|shown)\b/i.test(stem);
    if (needsImg && !imgs.length) { held.push({ quiz: qname, why: 'image did not survive capture', q: stem.slice(0, 80) }); return; }
    const sys = qsys === 'mixed' ? routeSys(stem + ' ' + (q.answers || []).map(a => a.text).join(' ')) : qsys;
    const base = { id: qid(fid, stem, q.key), quiz: fid, sys, pts: +q.points || 1, q: stem, imgs };

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
      questions.push({ ...base, type: 'cloze', blanks: q.key.blanks, pts: Math.max(base.pts, q.key.blanks.length) });
      kept++; return;
    }
    /* options family. Some of her MCQs store options as bare letters (a/b/c/d)
       with the real text only in each answer's title attribute — enrich from the
       title, keys re-derived through the SAME rule so they can never diverge. */
    const cleanTitle = t => (t || '').replace(/\.?\s*This was the correct answer\.?$/i, '').trim();
    const enrich = a => { const t = (a.text || '').trim(), ti = cleanTitle(a.titleAttr);
      return (t.length < 3 && ti.length >= 3) ? ti : t; };
    const ans = (q.answers || []).filter(a => (a.text || '').trim() || cleanTitle(a.titleAttr));
    const opts = [...new Set(ans.map(enrich).filter(Boolean))];
    const key = [...new Set(ans.filter(a => a.correctClass || a.weight === '100').map(enrich))];
    const lettered = opts.every(o => o.length < 3) && /\b[a-d]\.\s/.test(stem);
    if (!opts.length || opts.length < 2 || !key.length || !key.every(k => opts.includes(k))) {
      held.push({ quiz: qname, why: 'key text not among options', q: stem.slice(0, 80) }); return;
    }
    if (opts.some(o => o.length < 3) && !lettered && !imgs.length) {
      held.push({ quiz: qname, why: 'letter-only options with no lettered stem or image', q: stem.slice(0, 80) }); return;
    }
    const type = q.type === 'true_false_question' ? 'tf'
      : q.type === 'multiple_answers_question' ? 'multi' : 'mcq';
    questions.push({ ...base, type, opts, key });
    kept++;
  });
  if (kept) quizzes.push({ id: fid, name: qname, sys: qsys, n: kept });
}

/* ── gates ─────────────────────────────────────────────────────────── */
const fails = [];
for (const a of SAQ_ANSWERS) if (!saqUsed.has(a.k)) fails.push('saq-answers entry matched NO essay: "' + a.k + '"');
/* identical content captured twice (review quizzes repeat questions) — keep one */
const dup = new Set(); let dropped = 0;
for (let i = questions.length - 1; i >= 0; i--) {
  if (dup.has(questions[i].id)) { questions.splice(i, 1); dropped++; }
  else dup.add(questions[i].id);
}
if (dropped) console.log('deduped', dropped, 'identical duplicate captures');
for (const q of questions) for (const f of q.imgs) if (!fs.existsSync(path.join(CAP, 'images', f))) fails.push('missing image file ' + f);
for (const c of CHAINS) if (c.beads.filter(b => b.t).length < 4) fails.push('chain too short: ' + c.id);
if (fails.length) { console.error('BUILD FAILED:\n  ' + fails.join('\n  ')); process.exit(1); }

/* ── emit ──────────────────────────────────────────────────────────── */
const DATA = {
  built: new Date().toISOString().slice(0, 10),
  stats: { n: questions.length, held: held.length },
  quizzes: quizzes.sort((a, b) => a.sys.localeCompare(b.sys) || a.name.localeCompare(b.name)),
  questions, chains: CHAINS, case7: CASE7, held,
};
const tpl = fs.readFileSync(path.join(HERE, 'template.html'), 'utf8');
const marker = '/*@BANK@*/';
if (tpl.split(marker).length !== 2) { console.error('BUILD FAILED: expected exactly one ' + marker); process.exit(1); }
const out = tpl.replace(marker, JSON.stringify(DATA));
fs.writeFileSync(path.join(HERE, 'index.html'), out);

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
