/* qtopic.js — which of her helpline sections a question sits on.
 *
 * WHY. Long matching, cloze and written questions rarely get a judged reference: no single
 * slide or paragraph states half of a ten-pair hormone table. But her MODULE 2 HELPLINE
 * answers board (content/helpline.js) IS the worked answer for nine topics, step-numbered
 * with the mark-earning words in CAPITALS. Until 2026-09-18 the sim showed it only on the
 * focus-checklist rows; this map lets the marking screen show it under the question.
 *
 * WHAT IT IS. question id -> focus.js topic id, only for the topics that have a helpline
 * section (helpline.js keys). Built 2026-09-18 by keyword rules over stem + key (162 hits),
 * then every hit read by hand and ~60 struck — a stroke question that mentions diabetes, a
 * synovial-joint label that mentions the epiphyseal plate, a ten-pair hormone table where
 * her calcium table states two pairs. A question is here only if her section actually
 * teaches what it tests. The block it unlocks is collapsed ("open it"), so an on-topic
 * section under a short MCQ costs nothing; an off-topic one would mislead, so those are out.
 *
 * ns-csf questions are filed under ns-protection (same section). Calcium / PTH / calcitonin
 * questions are filed under endo-stimuli, whose section carries her calcitonin-vs-PTH table
 * (the endo-calcium section is a two-line note). build.mjs fails if an id here is not a
 * live question or a topic here has no helpline section.
 */
export const QTOPIC = {
  /* ── bone repair · the accident case (ACCIDENT CASE STUDY section) ── */
  "q451e9d2f0a": "ms-repair",
  "qe13ca09a78": "ms-repair",
  "q2331ea7770": "ms-repair",
  "q9d25809bfe": "ms-repair",
  "q9c8385b5f0": "case7-accident",
  "qce4bc6286a": "case7-accident",
  /* ── ossification (OSSIFICATION section) ── */
  "qcfbaf54c47": "ms-ossification",
  "qf12f170323": "ms-ossification",
  "q3c380779fe": "ms-ossification",
  "q777f28741c": "ms-ossification",
  "qc4c28bfc37": "ms-ossification",
  "q4ad833af34": "ms-ossification",
  "qa71b3e8402": "ms-ossification",
  "q81b0c1d153": "ms-ossification",
  "q192adeab77": "ms-ossification",
  "q3aec6cb62c": "ms-ossification",
  "qfe42dada64": "ms-ossification",
  "q2541a7158a": "ms-ossification",
  "qd68155cb94": "ms-ossification",
  "qdba3dd66dd": "ms-ossification",
  /* ── blood calcium · calcitonin vs PTH (her table in the ENDOCRINE REGULATING … section) ── */
  "q1f5b6bd9bf": "endo-stimuli",
  "qa8c8ff223c": "endo-stimuli",
  "q6f621ee3bf": "endo-stimuli",
  "qb1e9f0b70d": "endo-stimuli",
  "q2284351643": "endo-stimuli",
  "qcb43dfb047": "endo-stimuli",
  "q230842c2b9": "endo-stimuli",
  "qefcd667bdb": "endo-stimuli",
  "qb2b040684c": "endo-stimuli",
  "qc68c0045c6": "endo-stimuli",
  "qfe37f9405c": "endo-stimuli",
  /* ── growth hormone axis ── */
  "q0050707514": "endo-pituitary",
  "q76bcf38d1f": "endo-pituitary",
  "q8bd73aec1c": "endo-pituitary",
  "qf02a72f9e2": "endo-pituitary",
  "qcf49653099": "endo-pituitary",
  /* ── short- and long-term stress · adrenal medulla and cortex ── */
  "qbb137d5155": "endo-adrenal",
  "q59e81042d1": "endo-adrenal",
  "qab4b3f2f0a": "endo-adrenal",
  "qcc01122fb1": "endo-adrenal",
  "q7f479d514b": "endo-adrenal",
  "qaf17433e3f": "endo-adrenal",
  "qce60f2ab0e": "endo-adrenal",
  "qa16de9bf25": "endo-adrenal",
  /* ── sugar homeostasis (SUGAR HOMEOSTASIS section, incl. the hormones that raise glucose) ── */
  "q3eff1aa29d": "endo-pancreas",
  "qa7fa49e68f": "endo-pancreas",
  "q2bb9e1f8d4": "endo-pancreas",
  "q467ea923ca": "endo-pancreas",
  "q4859dabebf": "endo-pancreas",
  "q742ff3b771": "endo-pancreas",
  "qd9a9c94dff": "endo-pancreas",
  "q563cbe1fb6": "endo-pancreas",
  "qff87a8c5c9": "endo-pancreas",
  "q30a84d63ad": "endo-pancreas",
  "q67bed01a7a": "endo-pancreas",
  "q0e0d1b7db5": "endo-pancreas",
  "q7c41ceb2d6": "endo-pancreas",
  "q06539fa723": "endo-pancreas",
  "q29bbd9e32c": "endo-pancreas",
  "q03279f1c08": "endo-pancreas",
  "q91977f97aa": "endo-pancreas",
  "q68cf376da9": "endo-pancreas",
  "qe703d323c7": "endo-pancreas",
  "qc1de8dd0e7": "endo-pancreas",
  "q86d113fc6c": "endo-pancreas",
  "q6e52f0f926": "endo-pancreas",
  "q04ddfd14cf": "endo-pancreas",
  "qeb189dd885": "endo-pancreas",
  "q1ae4d52179": "endo-pancreas",
  "qef4906beda": "endo-pancreas",
  "q419f24422c": "endo-pancreas",
  "qc98fc4bab7": "endo-pancreas",
  "qc6a708b1da": "endo-pancreas",
  "q3d30e957fe": "endo-pancreas",
  "qc6ce1e5437": "endo-pancreas",
  "q0a8ea8c746": "endo-pancreas",
  "qc3a2673541": "endo-pancreas",
  "q7d7c1efcfc": "endo-pancreas",
  "q3a353b52f9": "endo-pancreas",
  "q2482df2a39": "endo-pancreas",
  "qe8c33933fe": "endo-pancreas",
  "q432ad1458d": "endo-pancreas",
  "q5c97998026": "endo-pancreas",
  "qbc017cecde": "endo-pancreas",
  /* ── brain & spinal cord protection · meninges, BBB, CSF (one section) ── */
  "q6457ee6436": "ns-protection",
  "q5fb6e985f6": "ns-protection",
  "q74018bd95b": "ns-protection",
  "q9ce4eeb9c7": "ns-protection",
  "q6c6677d093": "ns-protection",
  "q510831f1fc": "ns-protection",
  "q66cc2eee82": "ns-protection",
  "q685e613285": "ns-protection",
  "q35505e1260": "ns-protection",
  "q85a7a0190f": "ns-protection",
  "qb07d11b39e": "ns-protection",
  "q1678121481": "ns-protection",
  "qca2f0baf60": "ns-protection",
  "qf9f31fb20c": "ns-protection",
  "qe9bda79a8e": "ns-protection",
  "q224113e27f": "ns-protection",
  "qdd5ebfeedd": "ns-protection",
  "q57602a50d7": "ns-protection",
  "qbded6542cc": "ns-protection",
  "qd4ec053cdc": "ns-protection",
  "q21c942f519": "ns-protection",
  "q365d24ca46": "ns-protection",
  "q06ec2a28a9": "ns-protection",
  "q1f3974f9c1": "ns-protection",
  "q031e69ad1f": "ns-protection",
  "q553b6cc5a8": "ns-protection",
  /* ── synaptic transmission (NERVOUS CONDUCTION section) ── */
  "q9140b8b252": "ns-synapse",
  "q246e2ddd0d": "ns-synapse",
  "qba62195c17": "ns-synapse",
  "q346dde0874": "ns-synapse",
  "q8d0c5c60cf": "ns-synapse",
  "q1675974221": "ns-synapse",
  "q1c764301c1": "ns-synapse",
  "q9daf3705a4": "ns-synapse",
  "qe97b7deab2": "ns-synapse",
};
