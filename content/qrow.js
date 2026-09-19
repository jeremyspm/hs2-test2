/* qrow.js — which of her questions a focus-checklist row deals when you press
 * "Learn her N questions on this".
 *
 * WHY. After the 🤖 button has explained a topic, the only honest check is HER questions
 * on exactly that topic. Until 2026-09-19 the closest door was "Learn Endo" — anything
 * endocrine. This map closes the loop on the row itself: explain → her questions → tick.
 *
 * WHAT IT IS. focus.js row id -> question ids, for the 15 tier-0 rows (the ones she
 * pointed at: helpline + revision sessions). Built 2026-09-19 from keyword rules over
 * stem + options + key + matching pairs + blank keys (221 hits), then every hit read by
 * hand against the row's own `done` / `ask` lines; the 250 no-hit questions were read too.
 *
 * NOT THE SAME MAP AS qtopic.js, on purpose. qtopic answers "which helpline SECTION
 * teaches this question" (so calcium sits under endo-stimuli, where her PTH table lives,
 * and CSF sits under ns-protection). This one answers "which ROW is this question a rep
 * for". A question may sit on more than one row: the ependymal-cell questions are both
 * a glia rep and a CSF rep; the calcium loop is one mechanism on two rows.
 *
 * LEFT OUT, deliberately: the six mixed 5-pair tables of "Hormones & Functions" and the
 * two cross-topic hormone mix-and-matches (no single row owns them); bone-growth questions
 * (tier-3 row of their own); T6 / C7 cord transections (spinal-cord row); "name the bone
 * she fractured" (bone naming in a fracture costume).
 *
 * build.mjs fails if a row here is not a focus row or an id is not a live question, drops
 * exact repeats (same type + stem + key captured in two quizzes) and orders each row
 * one-tap questions first, written questions last.
 */
const CALCIUM = [   /* the PTH / calcitonin loop — one mechanism, two rows */
  "q2284351643", "qcb43dfb047", "q230842c2b9", "qb2b040684c", "qefcd667bdb", "qd68155cb94",
  "qfe37f9405c", "q1f5b6bd9bf", "qb1e9f0b70d", "qa8c8ff223c", "q6f621ee3bf",
];
const MRS_B = ["q9c8385b5f0", "qce4bc6286a"];            /* the car-crash forearm, calcium applied */
const HEALING = ["q451e9d2f0a", "qe13ca09a78", "q2331ea7770"];   /* four stages of fracture repair */
const EPENDYMAL = ["q5fb6e985f6", "qca2f0baf60", "q510831f1fc", "q1678121481"];
const STRESS_SUGAR = ["q432ad1458d", "q5c97998026", "qbc017cecde"];   /* the stress hormones that raise glucose */

export const QROW = {
  "case7-accident": [...MRS_B, ...HEALING],

  "ms-remodel": [...CALCIUM, "qc68c0045c6" /* Wolff's law — the mechanical loop */, ...MRS_B],
  "endo-calcium": [...CALCIUM, ...MRS_B],

  "ms-repair": [...HEALING],

  "ms-ossification": [
    "qcfbaf54c47", "q3c380779fe", "qc4c28bfc37", "q192adeab77",   /* the five endochondral steps, four times */
    "q777f28741c", "qa71b3e8402", "q4ad833af34", "q81b0c1d153", "qf12f170323", "qdba3dd66dd",
    "qfc09da398c",                                                 /* the clavicle oddity */
  ],

  "endo-pancreas": [
    "q04ddfd14cf", "qeb189dd885", "qc98fc4bab7", "q0e0d1b7db5", "qc6ce1e5437", "qe8c33933fe",
    "qc3a2673541", "q7d7c1efcfc", "q2482df2a39", "q0a8ea8c746", "qc6a708b1da", "q3d30e957fe",
    ...STRESS_SUGAR,
    "q67bed01a7a", "q30a84d63ad", "qef4906beda", "q419f24422c",
    "q6e52f0f926", "q1ae4d52179", "q3a353b52f9",
    "q3eff1aa29d", "qa7fa49e68f", "q2bb9e1f8d4", "q467ea923ca", "q4859dabebf", "q742ff3b771",
    "qd9a9c94dff", "q563cbe1fb6", "qff87a8c5c9",
    "q7c41ceb2d6", "q06539fa723", "q29bbd9e32c", "q03279f1c08", "q91977f97aa", "q68cf376da9",
    "qe703d323c7", "qc1de8dd0e7", "q86d113fc6c",
  ],

  "endo-adrenal": [
    "qbb137d5155", "q59e81042d1", "qab4b3f2f0a", "qcc01122fb1", "q7f479d514b", "qaf17433e3f",
    "qce60f2ab0e", "qa16de9bf25",
    "qcbe7474e91", "q888457ca50",          /* aldosterone — sodium, water */
    "q711de33936",                         /* gonadocorticoids */
    ...STRESS_SUGAR,
  ],

  "endo-pituitary": [
    "q0050707514", "qcf49653099", "qf02a72f9e2", "q76bcf38d1f", "q8bd73aec1c",   /* growth hormone axis */
    "q9484fe62d3", "qd0d869d293", "q06cd899f6e", "q3966e4f80f", "q7aff4623ce",   /* prolactin · oxytocin */
    "q4ceeaf5caa", "q12666c15b0",                                                 /* ADH */
    "qd4c5312ec9", "qae7206c6ef", "q6898329938", "q7a55c75850", "q278f8cad97",   /* tropic hormones · FSH / LH */
    "qa16de9bf25", "q417e9d2327", "q687956317e", "qcd3438ebac",
  ],

  "ns-synapse": [
    "q246e2ddd0d", "q8d0c5c60cf", "qba62195c17", "q9140b8b252", "q346dde0874", "qfad296fdb0",
    "q1675974221", "q9daf3705a4", "q1c764301c1", "qe97b7deab2",
  ],

  "ns-csf": [
    "q6457ee6436", "q9ce4eeb9c7", "q66cc2eee82", "qe9bda79a8e", ...EPENDYMAL,
    "qb07d11b39e", "q74018bd95b", "q685e613285",
  ],

  "ns-protection": [
    "q224113e27f", "q553b6cc5a8", "qdd5ebfeedd", "q57602a50d7", "q21c942f519", "q031e69ad1f",
    "qf9f31fb20c", "qbded6542cc", "qd4ec053cdc", "q1f3974f9c1", "q365d24ca46", "q06ec2a28a9",
    "q6c6677d093", "qe9bda79a8e", "q35505e1260", "q74018bd95b",
  ],

  "ns-glia": [
    "q694b050ed7", "qdd5ad2b4e1", "q992b27c8aa", "q10019a7f8d", "q7d1e2efc32", "q7e59bf2afc",
    "q39d85a9707", ...EPENDYMAL,
    "q01cce4aab9", "q9f74b83665", "q11d7321c99", "qcae5c1b15d", "qf6c99191f7", "q5d8f8c1047",
    "qe829a898e0", "q2a92fb95bc", "q19579fac0f", "q1933b8d02c", "q89b2860a56",
    "q50a3662f9f", "qc0290d4553", "q85a7a0190f", "qbc78f4dc50",
  ],

  "ns-ans": [
    "q6b2ae296d4", "q9e52697203", "q82d15e7cbb", "q5656676fc0", "q5c70b90940", "q45a4e3bcb8",
    "q0c3d652dd1", "q84491c6b52", "qbf329841ef", "qa2f25efdb5", "qd5745f4d8e", "qca3df8356b",
    "q0e1227a721", "q2af66434f6", "q1dce99a439", "q2fe2c73399", "q66647d222a", "qb838406f8a",
    "q8e16f95ddb", "qb2100455d8", "q586d28cca7", "q28369e36a2",
  ],

  "ns-reflex": ["q4583d9e480", "qcd59779017", "qbbb06b7516", "qafcd43f79c", "q7b112806fa"],

  "ns-lobes": [
    "q6cdd756d7d", "qfac4cd9cfa", "q36be9c1fd8", "qdbf40f06f8", "qd1d4102456",
    "q92726c24e9", "q128756cfb5", "qea2f3a358e",
  ],
};
