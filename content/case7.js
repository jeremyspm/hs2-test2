/* CASE STUDY 7 — CAR ACCIDENT. The only case study in Test 2's scope
   (Assessment Overview: "Aspects of the (7) Accident scenario").
   Scenario + questions are HERS, verbatim from discussion_topics/413334.
   MODEL ANSWERS ARE THE TOOL'S — Canvas has published none for this case.
   Each answer is written as numbered steps because her marking schedules
   allocate one mark per distinct causal step. */
export const CASE7 = {
  scenario:
    'Julie (65), Marian (31), and Julia (Marian’s 8-year-old child) are in a car crash. ' +
    'Julie was on the impacted side of the car, as was Julia. Julie has experienced a compound break of her left lower leg and left forearm, ' +
    'which is more serious than you would expect for a crash like this. Julia hit her arm on the seat in front of her, but is okay otherwise ' +
    '(she was strapped tightly into a half booster). Julie was unconscious, and hasn’t yet woken up; blood tests show she has low blood calcium and possible osteoporosis.',
  questions: [
    {
      q: 'A bone break can occur when a force is put on a bone that it is not designed to withstand. What kinds of bone breaks are there?',
      marks: 3,
      steps: [
        'Simple (closed) fracture — the bone breaks but does not pierce the skin.',
        'Compound (open) fracture — broken ends pierce the skin (Julie’s type; infection risk).',
        'Spiral fracture — a twisting force breaks the bone in a spiral line. (Others worth naming: greenstick — partial bend-and-crack, common in children; comminuted — bone shatters into fragments.)',
      ],
    },
    {
      q: 'The major bones of the limbs are…',
      marks: 3,
      steps: [
        'Upper limb: humerus (arm), radius and ulna (forearm).',
        'Lower limb: femur (thigh), tibia and fibula (lower leg).',
        'Julie’s breaks: lower leg = tibia/fibula; forearm = radius/ulna.',
      ],
    },
    {
      q: 'The most commonly broken bone in the body is the…',
      marks: 1,
      steps: ['The clavicle (collarbone).'],
    },
    {
      q: 'Julie has broken bones in both limbs — what intervention needs to be put in place before the healing process begins?',
      marks: 2,
      steps: [
        'Reduction — the broken ends are realigned into their normal position (closed = manipulation; open = surgical, likely for her compound break).',
        'Immobilisation — cast, splint or traction holds the ends together so a callus can form.',
      ],
    },
    {
      q: 'What is the healing process Julie’s bones will undergo? Explain the stages in detail, as if educating a patient.',
      marks: 4,
      steps: [
        'Haematoma — torn vessels bleed and clot at the break site ("a bruise forms inside the bone").',
        'Fibrocartilaginous (soft) callus — fibroblasts and chondrocytes bridge the gap with cartilage and collagen ("a soft splint grows across the crack").',
        'Bony (hard) callus — osteoblasts replace the soft bridge with spongy bone ("the splint turns to bone").',
        'Remodelling — osteoclasts and osteoblasts reshape the callus along stress lines back toward the original shape ("the repair is polished over months").',
      ],
    },
    {
      q: 'Julie has low blood calcium. How does that impact her bone density? What is osteoporosis?',
      marks: 3,
      steps: [
        'Low blood Ca²⁺ → parathyroid glands release PTH.',
        'PTH stimulates osteoclasts to resorb bone matrix to release Ca²⁺ into the blood — chronically, this thins the bone (density falls).',
        'Osteoporosis = bone resorption outpaces deposition, leaving porous, brittle, low-density bone.',
      ],
    },
    {
      q: 'Why does Julie’s bone density put her at greater risk of bone breaks?',
      marks: 2,
      steps: [
        'Less mineralised matrix means the bone withstands less force.',
        'So forces a healthy bone would tolerate cause fractures — why her break is "more serious than you would expect" for this crash.',
      ],
    },
    {
      q: 'How do Julie’s bones compare to Julia’s? What is the likely difference and why?',
      marks: 3,
      steps: [
        'Julia (8): bones are more flexible and collagen-rich, epiphyseal (growth) plates still open, ossification incomplete — they bend rather than shatter (greenstick pattern) and heal fast.',
        'Julie (65): bones are less dense and more brittle — post-menopausal oestrogen loss accelerates resorption — and heal slowly.',
        'Hence the same crash bruises the child and breaks the grandmother’s bones.',
      ],
    },
    {
      q: 'Head trauma can damage the brain. What protective features ensure the brain and spinal cord are protected from trauma?',
      marks: 4,
      steps: [
        'Bone — the skull around the brain, the vertebral column around the spinal cord.',
        'Meninges — dura mater, arachnoid mater, pia mater wrap the CNS.',
        'Cerebrospinal fluid — the brain floats in a shock-absorbing cushion.',
        'The blood-brain barrier — keeps harmful substances in the blood away from brain tissue.',
      ],
    },
    {
      q: 'What would be the consequences of slowed breathing? Think about ventilation and gas exchange (CO₂ levels), the bicarbonate buffer system and blood pH.',
      marks: 4,
      steps: [
        'Slowed breathing → less ventilation → CO₂ is retained in the blood.',
        'CO₂ + H₂O → H₂CO₃ (carbonic acid) → H⁺ + HCO₃⁻.',
        'More CO₂ pushes this to the right, so H⁺ rises and blood pH falls.',
        'Result: respiratory acidosis — the homeostatic outcome sentence her marking rewards.',
      ],
    },
  ],
};
