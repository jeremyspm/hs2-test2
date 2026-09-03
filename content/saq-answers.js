/* Model answers for the 18 essay questions in her Module 2 quizzes.
   Canvas publishes no key for essays — THE ANSWERS BELOW ARE THE TOOL'S,
   sourced from her decks/learning pages, written as numbered steps (her
   marking = one mark per distinct step). Keyed on the normalised opening
   of the question text ONLY (an overlay may never key on what it writes).
   build.mjs fails if any essay in the bank finds no entry here, and if any
   entry here matches no essay — both directions. */
export const norm = s => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

export const SAQ_ANSWERS = [
  // ── 211018 · Blood Sugar Regulation (the endocrine SAQ set) ──
  {
    k: 'the pancreas has both endocrine and exocrine functions',
    /* the stem states the exocrine/endocrine split itself and asks only to NAME the
       hypoglycaemic and the hyperglycaemic hormone — one mark each */
    steps: [
      'Hypoglycaemic hormone (LOWERS blood glucose) = insulin, from the beta cells of the islets of Langerhans.',
      'Hyperglycaemic hormone (RAISES blood glucose) = glucagon, from the alpha cells of the islets.',
    ],
    src: 'Endocrine 2 deck',
  },
  {
    k: 'what is the normal fasting blood glucose level',
    steps: ['About 4–6 mmol/L when fasting.'],
    src: 'Endocrine 2 / blood sugar quiz',
  },
  {
    k: 'what is the stimulus for the release of insulin',
    steps: ['Rising blood glucose (e.g. after a meal) — a humoral stimulus acting directly on the beta cells.'],
    src: 'Endocrine 2 deck',
  },
  {
    k: 'explain how the body maintains the blood glucose levels within the normal',
    steps: [
      'Glucose rises → beta cells release insulin.',
      'Insulin drives uptake into muscle and adipose tissue and glycogen storage in the liver → glucose falls.',
      'Glucose falls → alpha cells release glucagon.',
      'Glucagon makes the liver break down glycogen (glycogenolysis) and build new glucose (gluconeogenesis) → glucose rises.',
      'Two opposing hormones in a negative-feedback loop hold glucose at the set point.',
    ],
    src: 'Endocrine 2 deck, fig 16.18',
  },
  {
    k: 'think of all the target organs where insulin acts make a list',
    steps: [
      'Skeletal muscle: takes glucose up, stores it as glycogen.',
      'Liver: glycogenesis up, gluconeogenesis suppressed.',
      'Adipose tissue: glucose uptake, converted to and stored as fat.',
    ],
    src: 'Endocrine 2 deck',
  },
  {
    k: 'describe the signs and symptoms of diabetes mellitus and explain the und',
    steps: [
      'Polyuria — glucose spills into urine and drags water with it (osmotic diuresis).',
      'Polydipsia — the water loss dehydrates, driving thirst.',
      'Polyphagia — cells cannot take glucose in, so they signal starvation.',
      'Weight loss and fatigue — fat and protein are broken down for fuel instead.',
    ],
    src: 'Endocrine 2 deck, table 16.4',
  },
  {
    k: 'glucagon hormone is released when the blood glucose levels start to fall',
    steps: [
      'Falling glucose → alpha cells of the islets release glucagon.',
      'Glucagon acts on the LIVER: glycogenolysis + gluconeogenesis.',
      'Glucose is released into the blood and the level rises back to normal.',
    ],
    src: 'Endocrine 2 deck',
  },
  {
    k: 'in times of stress other hormones besides glucagon are released',
    steps: [
      'Adrenaline (epinephrine, adrenal medulla) — triggers rapid glycogenolysis in liver and muscle.',
      'Cortisol (adrenal cortex) — drives gluconeogenesis from amino acids; both raise blood glucose for fight-or-flight.',
    ],
    src: 'Endocrine 2 deck (stress axis)',
  },
  {
    k: 'there are some cells in the body that are not insulin dependent',
    steps: ['Brain cells (neurons) — they take up glucose without insulin (also red blood cells). This is why hypoglycaemia harms the brain first.'],
    src: 'Endocrine 2 deck',
  },
  {
    k: 'what is the major difference between type 1 and type 2 diabetes',
    steps: [
      'Type 1: autoimmune destruction of beta cells → the pancreas makes NO insulin (usually young onset, insulin injections required).',
      'Type 2: cells become RESISTANT to insulin (± falling production later) — usually adult onset, linked to lifestyle, managed first with diet/exercise/tablets.',
    ],
    src: 'Endocrine 2 deck',
  },

  // ── 211033 · Lab 3 MS SAQ (student-marked) ──
  {
    k: 'study the images and then explain the differences between the male and f',
    steps: [
      'Female pelvis: wider and shallower, larger pelvic inlet, wider subpubic angle (>90°) — adapted for childbirth.',
      'Male skeleton: generally larger and heavier bones, more prominent muscle markings, narrower pelvis (<90° angle).',
    ],
    src: 'Lab 3 workbook / MS1 deck',
  },
  {
    k: 'describe the common sites of different intramuscular injections',
    steps: [
      'Deltoid (upper arm) — small volumes, e.g. vaccines.',
      'Vastus lateralis (outer thigh) — safe in infants, no major vessels/nerves nearby.',
      'Ventrogluteal (hip) — preferred large-volume site, away from the sciatic nerve; (dorsogluteal is avoided for its sciatic risk).',
      'The sites differ in the volume they tolerate and their distance from major nerves and vessels.',
    ],
    src: 'Lab 3 / her injection-sites slide',
  },
  {
    k: 'briefly explain how muscles bones and joints work together to produce mo',
    steps: [
      'A skeletal muscle attaches to two bones across a joint (origin on the stationary bone, insertion on the moving one).',
      'The muscle can only PULL: it contracts and pulls the insertion toward the origin.',
      'The joint acts as the fulcrum of a lever system, so the bone moves around it.',
    ],
    src: 'MS2/MS3 decks',
  },
  {
    k: 'list the ways in which skeletal muscles are named provide examples',
    steps: [
      'Location — tibialis anterior.',
      'Shape — deltoid (triangle), trapezius.',
      'Size — gluteus maximus.',
      'Fibre direction — rectus abdominis (rectus = straight).',
      'Number of origins — biceps, triceps.',
      'Origin/insertion — sternocleidomastoid.',
      'Action — flexor carpi, extensor digitorum.',
    ],
    src: 'MS2 deck (ways muscles are named)',
  },
  {
    k: 'explain the difference between tendons and ligaments in terms of structu',
    steps: [
      'Tendon: dense regular connective tissue joining MUSCLE to BONE — transmits the muscle’s pull.',
      'Ligament: dense connective tissue joining BONE to BONE — stabilises the joint and limits its range.',
    ],
    src: 'MS1 deck / Lab 3',
  },
  {
    k: 'the elbow the joints between the vertebrae and the bones that form the c',
    steps: [
      'Elbow — synovial joint, functionally a diarthrosis (freely movable hinge).',
      'Between vertebrae — cartilaginous joints, functionally amphiarthroses (slightly movable).',
      'Cranium — sutures, fibrous joints, functionally synarthroses (immovable).',
    ],
    src: 'MS1 deck (joint classification)',
  },
  {
    k: '1 what does the term itis mean and the prefix art',
    steps: [
      '"-itis" = inflammation; "arthr-" = joint.',
      'Arthritis = inflammation of a joint (pain, swelling, stiffness).',
      'Common in the elderly: osteoarthritis — wear-and-tear erosion of articular cartilage until bone rubs on bone.',
      /* her questions 4 and 5 ask about mobility and about pain/swelling — not RA or gout */
      'Mobility: cartilage loss, bone-on-bone grinding and bone spurs make the joint stiff and painful to move, so the range of motion shrinks.',
      'Pain and swelling: the inflamed synovial membrane releases more fluid and inflammatory mediators into the joint (swelling, warmth) and irritates pain receptors; exposed bone has no cartilage to cushion it.',
    ],
    src: 'MS1 deck / 2024 joints case answers',
  },

  // ── 211060 · Bones, Joints and Muscles (embedded-answer SAQ) ──
  {
    k: 'the answer for this question is embedded do it submit the quiz',
    steps: [
      'Agonist (prime mover) — produces the movement, e.g. biceps brachii in elbow flexion.',
      'Antagonist — opposes it and relaxes/lengthens, e.g. triceps brachii during that flexion.',
      'Synergist — assists the agonist and steadies the movement, e.g. brachialis.',
      'Fixator — holds the origin bone still, e.g. scapular muscles stabilising the shoulder.',
      /* her part 2 (max 2): origin and insertion */
      'Origin — the muscle’s attachment on the bone that stays still (usually proximal).',
      'Insertion — the attachment on the bone that MOVES (usually distal); contraction pulls the insertion toward the origin.',
    ],
    src: 'her own embedded answer (½ mark per fact) · MS2 deck',
  },
];
