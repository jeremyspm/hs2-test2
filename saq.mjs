/* saq.mjs — the SAQ Trainer's content, loaded and gated for build.mjs and resplice.mjs.
   content/saq-core.json  = the starred scenario/calcium/neuroglia items + the reflex arc
   content/saq-drill.json = MS + endocrine items from her "POSSIBLE SAQ IN TEST 2" list (drafted, then read against her material)
   content/saq-ns.json    = the nervous-system items from the same list
   The page shows them in ORDER below: her own signals first (the tape, the helpline, her
   Practice SAQ page marks), then the ordering-only and multiple-choice ones she lists.
   Every gate is a hard failure: a drill question with its answer missing, a duplicate option,
   or a mark point no question teaches would each ship a broken rung on test night. */
import fs from 'node:fs';
import path from 'node:path';

const ORDER = ['reflex-threat', 'calcium-low', 'neuroglia', 'reflex-arc',
  'bone-healing', 'synapse', 'blood-sugar', 'insulin', 'glucagon', 'cns-protection', 'csf',
  'three-stimuli', 'neg-feedback', 'hormone-solubility', 'endochondral', 'intramembranous',
  'brain-areas', 'cranial-nerves'];

export function loadSaq(HERE) {
  const read = f => { const p = path.join(HERE, 'content', f); return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : []; };
  const all = [...read('saq-core.json'), ...read('saq-drill.json'), ...read('saq-ns.json')];
  const rank = id => { const i = ORDER.indexOf(id); return i < 0 ? ORDER.length : i; };
  all.sort((a, b) => rank(a.id) - rank(b.id));
  const fails = [], seen = new Set();
  const low = s => String(s).toLowerCase().replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
  for (const x of all) {
    const at = `SAQ ${x.id}`;
    if (seen.has(x.id)) fails.push(`${at}: duplicate id`); seen.add(x.id);
    if (!['ms', 'ns', 'endo'].includes(x.sys)) fails.push(`${at}: bad sys ${x.sys}`);
    for (const k of ['title', 'ask', 'hook', 'src']) if (!String(x[k] || '').trim()) fails.push(`${at}: empty ${k}`);
    if (!(x.marks > 0)) fails.push(`${at}: marks must be > 0`);
    if (!Array.isArray(x.steps) || x.steps.length < 3) fails.push(`${at}: needs 3+ steps`);
    if (!Array.isArray(x.traps)) fails.push(`${at}: traps must be a list`);
    for (const g of x.same || []) if (!g.every(i => Number.isInteger(i) && i >= 0 && i < x.steps.length)) fails.push(`${at}: bad 'same' group ${JSON.stringify(g)}`);
    const covered = new Set();
    (x.mcq || []).forEach((m, i) => {
      const mt = `${at} mcq ${i + 1}`;
      if (!String(m.q || '').trim() || !String(m.a || '').trim() || !String(m.why || '').trim()) fails.push(`${mt}: empty q/a/why`);
      if (!Array.isArray(m.d) || m.d.length !== 3) fails.push(`${mt}: needs exactly 3 distractors`);
      const opts = [m.a, ...(m.d || [])].map(low);
      if (new Set(opts).size !== opts.length) fails.push(`${mt}: duplicate option (${opts.join(' | ')})`);
      if (!Number.isInteger(m.step) || m.step < 0 || m.step >= x.steps.length) fails.push(`${mt}: step ${m.step} out of range`);
      else covered.add(m.step);
    });
    if ((x.mcq || []).length < 4) fails.push(`${at}: needs 4+ drill questions`);
    x.steps.forEach((s, i) => { if (!covered.has(i)) fails.push(`${at}: mark point ${i + 1} has no drill question`); });
  }
  if (fails.length) { console.error('SAQ GATES FAILED:\n  ' + fails.join('\n  ')); process.exit(1); }
  return all;
}

/* JSON for an inline <script>: a "</" inside it would end the script block early */
export const saqJSON = all => JSON.stringify(all).replace(/<\//g, '<\\/');
