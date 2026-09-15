/* focus.js — the granular focus list.
 *
 * WHAT THIS IS. Her "Diagrams & Processes in Test 2" post names topics in one or
 * two words. This file says, for each of those topics, HOW FAR IT GOES — because
 * "ossification ✓" is not a claim anyone can make honestly, and "learn it to what
 * level" is the only question that matters when you are triaging.
 *
 * WHERE THE NUMBERS COME FROM. Every question in the shipped bank (471) was
 * assigned a topic, then read by hand to fix what pattern-matching got wrong.
 *   n    unique questions on this topic in her bank (repeats across quizzes merged)
 *   all  including repeats — a topic re-drilled in five quizzes is emphasis
 *   pts  marks those unique questions carry
 *   qz   how many separate quizzes touch it
 *   saq  how many are essay or dropdown — she said on tape the dropdowns ARE the SAQs
 *
 * WHY DENSITY ISN'T THE WHOLE STORY. `endo-glands-map` is 2 questions and 14 marks,
 * and she said outright in the 10 Sept lecture that a label-the-glands diagram is in
 * the test. Density alone would have buried it. So `flag` carries her own signals and
 * a tape flag floors the tier at 1. Marks are the tiebreak, not the verdict.
 *
 * flag letters — her four focus-post rows:
 *   D diagrams to interpret   P sequential processes
 *   R multi-step reasoning    T terminology precision
 *   tape: she named it in the Endocrine 1 lecture, 10 Sept 2026
 *
 * `done` is the ceiling: what you must be able to DO to tick the box.
 * `ask`  is the shape she actually uses.
 * `cap`  is the explicit "and no further", where the bank proves a limit.
 */
export const FOCUS = [

/* ══════════ TIER 1 ══════════ */
{ id:'ms-skeleton', sys:'ms', tier:1, t:'Naming bones on a diagram', crit:'MS 18', flag:'D',
  n:38, all:47, pts:78, qz:8, saq:2,
  done:'Point at any labelled bone on a full skeleton, a skull, a hand or a foot and name it — and go the other way, given the name, find it. Plus the lateral/medial and weight-bearing one-liners (which leg bone bears no weight, which is lateral, what is posterior to the sternum).',
  ask:'Overwhelmingly "Name this bone" / "What is the name of structure B?" off a figure — 14 of them are one labelled skeleton, A through O. Then scientific-vs-common name matching, and a few clinical one-liners (a dental abscess in the maxilla, whiplash vertebrae, the bone distal to the knee and proximal to the ankle).',
  cap:'This is recognition, not reasoning. There is no question anywhere in the bank asking you to explain a bone. It is the single biggest block of marks in MS and it is pure flashcard work — which makes it the cheapest marks on the paper.' },

{ id:'endo-pancreas', sys:'endo', tier:1, t:'Blood sugar — insulin, glucagon, diabetes', crit:'Endo 6', flag:'D P R tape',
  n:19, all:32, pts:56, qz:8, saq:21,
  done:'Write the full rising-glucose and falling-glucose loops as numbered steps: stimulus → which cell → which hormone → what it does to liver, muscle and fat → glucose returns to range → feedback shuts it off. Name the normal fasting range. List insulin\'s actions organ by organ. Give type 1 vs type 2 in one sentence. Explain polydipsia/polyphagia/polyuria mechanistically, not as a list.',
  ask:'The most written-answer-heavy topic in the entire bank — 18 essays and 3 dropdown passages. Also the cells (alpha vs beta), the stress hormones that raise glucose, and which cells are not insulin-dependent.',
  cap:'She said it on tape: "pancreas" earns nothing — name the CELLS. Alpha → glucagon, beta → insulin, and the acinar cells are the exocrine half. Also on tape: the glycogenesis / glycogenolysis / gluconeogenesis word set is an exam AND test question.' },

{ id:'ns-csf', sys:'ns', tier:1, t:'CSF — production, circulation, reabsorption', crit:'NS 6', flag:'D P',
  n:12, all:14, pts:43, qz:8, saq:3,
  done:'Trace CSF from the choroid plexus through all four ventricles, into the subarachnoid space, back through the arachnoid granulations into venous blood — in order, naming each space. Say which cells make it (ependymal), how much and what it does.',
  ask:'Ordering and labelling — the four ventricles, which one sits nearest the cerebellum, which neuroglia produce it, and a quoted passage with dropdowns.',
  cap:'One of the heaviest mark-per-question topics in NS (43 marks over 12 questions) and it is on her Sequential Processes row — a prime SAQ shape.' },

{ id:'ms-levers', sys:'ms', tier:1, t:'Lever systems in the body', crit:'MS 11–12', flag:'D R',
  n:15, all:17, pts:37, qz:6, saq:8,
  done:'Given any body movement, name the lever class and justify it by where the fulcrum, load and effort sit — standing on your toes (2nd), flexing the elbow (3rd), nodding the head back (1st). Label effort/fulcrum/load on a diagram. Say which arrangement gives mechanical advantage and why, and compute it.',
  ask:'Eight of the fifteen are dropdown passages — and she said on tape the dropdowns are the SAQs. Plus matching the lever parts to body structures, and identifying which diagram has the greatest mechanical advantage.',
  cap:'Note her own trap: "Third-class levers have the pivot in the middle. Scissors are third-class." Both halves false — scissors are first class.' },

{ id:'ms-joints', sys:'ms', tier:1, t:'Joints, movements, tendons & ligaments', crit:'MS 2–3', flag:'D',
  n:21, all:22, pts:36, qz:10, saq:7,
  done:'Label the parts of a synovial joint and give each part\'s function. Classify a named joint (fibrous/cartilaginous/synovial, and the synovial sub-type) — elbow, vertebrae, cranial sutures, shoulder. Name the movement at a joint from a description. State the structural AND functional difference between a tendon and a ligament.',
  ask:'The synovial-joint label diagram, three written questions (tendon vs ligament; how muscles, bones and joints produce movement; why the elbow/vertebrae/cranium are classed differently), and movement-naming dropdowns.',
  cap:'Touched by 10 separate quizzes — the most re-drilled MS topic there is.' },

{ id:'ms-remodel', sys:'ms', tier:1, t:'Bone remodelling & calcium — PTH vs calcitonin', crit:'MS 4 · Endo 4', flag:'D P tape',
  n:9, all:10, pts:36, qz:6, saq:5,
  done:'Run the calcium loop both directions: blood Ca²⁺ falls → parathyroid → PTH → osteoclasts resorb bone + kidney + gut → Ca²⁺ rises; Ca²⁺ rises → thyroid → calcitonin → osteoblasts → bone hardens. Say what each does to bone DENSITY, and what happens if the parathyroids are removed.',
  ask:'Five dropdown passages, several explicitly worded "(3 marks as descriptive question)" — that is an SAQ wearing a dropdown costume. Plus which two hormones oppose each other.',
  cap:'She named calcium control as an endocrine SAQ on tape. The MS side and the endocrine side are the same loop — learn it once, tick both.' },

{ id:'ms-muscle-structure', sys:'ms', tier:1, t:'Muscles — identifying and naming them', crit:'MS 5', flag:'D',
  n:24, all:25, pts:33, qz:8, saq:3,
  done:'Name the major skeletal muscles on a labelled figure, front and back. Say which muscle does a named action and which muscles a given exercise trains. Know the three muscle tissue types and what separates them.',
  ask:'Mostly identification off figures, same shape as the bone naming. A handful on muscle tissue types and connective-tissue coverings.',
  cap:'Recognition work again — pair it with the bone naming in the same sitting, it is the same mental move.' },

{ id:'endo-stimuli', sys:'endo', tier:1, t:'The three stimuli for hormone release', crit:'Endo 5', flag:'R tape',
  n:10, all:12, pts:33, qz:7, saq:3,
  done:'Define humoral, neural and hormonal stimulation and give a worked example of each — Ca²⁺ → PTH (humoral); sympathetic → adrenal medulla, suckling → oxytocin (neural); TSH → thyroxine, ACTH → cortisol, FSH → oestrogen (hormonal). Then add the negative-feedback sentence that switches each one off.',
  ask:'Seven MCQs of the "this is an example of ______ stimulation" shape, plus two written and a matching row.',
  cap:'She said this on tape, on the slide: "mark this slide if you have it as a possible short answer question." Her standing distractor is a fourth mechanism that does not exist — "Enzyme" / "Enzymatic". There are three.' },

{ id:'ns-synapse', sys:'ns', tier:1, t:'Synaptic transmission', crit:'NS 9', flag:'D P',
  n:12, all:13, pts:32, qz:8, saq:1,
  done:'Give the sequence in order: action potential reaches the terminal → Ca²⁺ enters → vesicles fuse → neurotransmitter into the cleft → binds receptors on the postsynaptic membrane → ion channels open → new potential → transmitter cleared. Name the cleft. Name the transmitter at a neuromuscular junction, and at sympathetic vs parasympathetic endings.',
  ask:'One 4-mark written ("Explain the process of synaptic transmission"), an ordering exercise, and which-transmitter-where MCQs.',
  cap:'Criterion 9 is the only NS criterion that says "in detail" — she means it.' },

{ id:'endo-adrenal', sys:'endo', tier:1, t:'Adrenal glands & the stress hormones', crit:'Endo 6', flag:'R',
  n:18, all:20, pts:29, qz:7, saq:1,
  done:'Split cortex from medulla and name what each secretes: cortex → aldosterone (sodium/water), cortisol (glucose, anti-inflammatory), gonadocorticoids; medulla → adrenaline/noradrenaline under direct sympathetic drive. Say what cortisol does long-term, and run the hypothalamus → pituitary → adrenal cascade.',
  ask:'Hormone-to-effect MCQs, "which hormone is given as a drug to reduce inflammation", why long-term cortisol is a problem, why we get sick under stress.',
  cap:'Heads up — her options list every gland, so these questions can only be answered if you know the WHOLE roster, not just the adrenals. Learn the glands as one table.' },

{ id:'ns-stroke', sys:'ns', tier:1, t:'Stroke & the Circle of Willis', crit:'NS 10', flag:'D R',
  n:15, all:15, pts:18, qz:2, saq:1,
  done:'Distinguish ischaemic from haemorrhagic — cause, mechanism, which is more common, which is more serious. Describe the Circle of Willis and why berry aneurysms form there. Give the four FAST tests. List the modifiable risk factors. Say why one-sided symptoms point where they do, and name the conditions that mimic a stroke.',
  ask:'Nine True/False plus MCQs and a written comparison of the two stroke types. Concentrated almost entirely in her 25-mark "Brain and Stroke" quiz.',
  cap:'Her focus row is "functional areas of the cerebrum WITH stroke symptoms if injured" — she wants the map and the deficit joined up, not either alone.' },

{ id:'endo-glands-map', sys:'endo', tier:1, t:'Label the endocrine glands', crit:'Endo 2', flag:'D tape',
  n:2, all:2, pts:14, qz:2, saq:2,
  done:'Put every major endocrine gland on a body outline from memory and name it: pituitary, pineal, thyroid, parathyroids, thymus, adrenals, pancreas, ovaries/testes — and the hypothalamus above the pituitary.',
  ask:'Two labelling questions, A through H, 7 marks each.',
  cap:'Only 2 questions — and it would have ranked near the bottom on density alone. It is here because she said it out loud in the 10 Sept lecture: a label-the-glands diagram is in the test. Highest marks-per-question of anything in the endocrine bank.' },

/* ══════════ TIER 2 ══════════ */
{ id:'ms-markings', sys:'ms', tier:2, t:'Bone markings (and the femur)', crit:'MS 18', flag:'D T',
  n:6, all:7, pts:25, qz:4, saq:0,
  done:'Define each marking term and say what kind of feature it is — epicondyle, tuberosity, trochanter, tubercle, fossa, ramus, meatus, condyle, crest, facet, foramen, process, spine, line, sinus, groove. Then find them on the femur specifically: two trochanters, two condyles, the head, the neck.',
  ask:'Matching the term to its meaning (twice), naming a circled structure, and spotting a foramen on the base of the skull.',
  cap:'Her focus post names "femur bone markings" twice — once under diagrams, once under terminology precision. That is deliberate.' },

{ id:'ns-ans', sys:'ns', tier:2, t:'Autonomic nervous system', crit:'NS 13 · 18', flag:'R',
  n:12, all:17, pts:23, qz:7, saq:1,
  done:'Sort any body response into sympathetic or parasympathetic and say what it does to that organ — pupils, heart, bronchioles, gut, salivation, bladder. Name the two outflows by their spinal origin (thoracolumbar vs craniosacral). Explain how one transmitter can constrict in one place and dilate in another.',
  ask:'Scenario MCQs (a car backfires; the door slams and your heart races), a sympathetic/parasympathetic sorting dropdown, and origin matching.',
  cap:'She asks it as scenarios, not definitions — practise by predicting the body\'s response, not by reciting the two lists.' },

{ id:'ms-ossification', sys:'ms', tier:2, t:'Ossification — endochondral & intramembranous', crit:'MS 10', flag:'P',
  n:11, all:12, pts:22, qz:7, saq:2,
  done:'Put the five endochondral steps in order — bone collar → cavitation of the hyaline cartilage → periosteal bud invades, spongy bone forms → medullary cavity + secondary centres in the epiphyses → epiphyses ossify, cartilage left only in the growth plates. Give the four intramembranous steps. Say which bones form which way (flat/skull → intramembranous, long → endochondral) and name the precursor tissue for each.',
  ask:'Four separate ordering questions using the same five steps, which-bone-forms-how MCQs, and the clavicle oddity.',
  cap:'HARD LIMIT: she has never once asked you to write ossification as prose — not in 471 questions. It is always ordering or recognition. In the criteria doc it appears only as a TERM to explain inside MS 10\'s vocabulary list. Learn the five steps in order; stop there.' },

{ id:'ms-origin-insertion', sys:'ms', tier:2, t:'How muscles are named · origin & insertion', crit:'MS 5 · 14', flag:'D',
  n:10, all:15, pts:21, qz:6, saq:2,
  done:'Given a muscle name, say which naming criterion it uses — size (gluteus maximus/medius/minimus, vastus lateralis), shape (deltoid, trapezius), action (flexor digitorum), location, number of origins (biceps), or direction (rectus = straight). Define origin, insertion and belly and point to them.',
  ask:'Repeated "the criterion used to name X is ___" MCQs, plus shape-to-muscle dropdowns.',
  cap:'This is a rule you apply, not a list you memorise — learn the six naming criteria and you can answer ones you have never seen.' },

{ id:'ns-glia', sys:'ns', tier:2, t:'Neuroglia, myelin, grey vs white matter', crit:'NS 3', flag:'',
  n:14, all:20, pts:20, qz:10, saq:2,
  done:'Name the six glial cell types and what each does. Say which cell myelinates in the CNS (oligodendrocyte) versus the PNS (Schwann), which line the ventricles (ependymal), and state what actually makes grey matter grey and white matter white.',
  ask:'Which-cell-does-what MCQs, repeated across ten different quizzes — the most widely re-drilled NS topic in the bank.',
  cap:'Not on her focus post at all, which is exactly why it is worth flagging: her bank hammers it anyway.' },

{ id:'ns-reflex', sys:'ns', tier:2, t:'Reflexes & the reflex arc', crit:'NS 14–15', flag:'P R',
  n:6, all:6, pts:18, qz:4, saq:3,
  done:'Name the five components of a reflex arc in order — receptor, sensory neuron, integration centre, motor neuron, effector. Distinguish somatic from autonomic, and know the stretch and withdrawal reflexes with a real-life example of each. Say what kind of arc a nociceptor starts.',
  ask:'Scenario-led (touching a hot jug), then dropdowns naming the parts.',
  cap:'On two of her focus rows at once — processes AND multi-step reasoning. Small in count, structurally important.' },

{ id:'endo-pituitary', sys:'endo', tier:2, t:'Pituitary hormones & their actions', crit:'Endo 8', flag:'R',
  n:17, all:18, pts:16, qz:7, saq:1,
  done:'Split anterior from posterior and name what each releases and does: anterior → GH, TSH, ACTH, FSH, LH, prolactin; posterior → ADH, oxytocin (made in the hypothalamus, stored here). Attach the disorders: gigantism/acromegaly (GH excess), and know which hormones drive lactation and egg ripening.',
  ask:'Hormone-by-hormone MCQs — "ADH", "Oxytocin:", "Prolactin:" — plus the tropic-hormone concept and the disorder pairings.',
  cap:'"Tropic hormone" is the idea she is really testing: a hormone whose target is another endocrine gland.' },

{ id:'ns-lobes', sys:'ns', tier:2, t:'Cerebral lobes & functional areas', crit:'NS 5 · 10', flag:'D',
  n:7, all:7, pts:16, qz:4, saq:1,
  done:'Name the four lobes and place them. Put the functional areas on a diagram — primary motor, somatosensory, visual, auditory, Broca\'s, Wernicke\'s — and for each say what is lost if it is damaged. Predict the deficit from the site of a blow to the head.',
  ask:'Labelled-diagram MCQs ("the area labelled G is called the…", "area B\'s function is to…") and a functional-area matching exercise.',
  cap:'Pair this with stroke — her focus row joins them explicitly, and the deficit half is where the marks are.' },

{ id:'ns-plexus', sys:'ns', tier:2, t:'Spinal nerves & the plexuses', crit:'NS 8 · 19', flag:'T',
  n:12, all:16, pts:15, qz:7, saq:2,
  done:'Give the spinal nerve counts by region (C1–C8, T1–T12, L1–L5, S1–S5, 1 coccygeal). Name the major nerve out of each plexus — cervical → phrenic, brachial → median/ulnar/radial, lumbosacral → sciatic/femoral. Say what a lesion there costs: carpal tunnel and the median nerve, a C7 transection and breathing, sciatic damage from a bad gluteal injection.',
  ask:'Plexus labelling dropdowns, counts, and clinical True/False.',
  cap:'On her terminology-precision row — the marks are in naming the right nerve, not describing it.' },

{ id:'ms-muscle-interactions', sys:'ms', tier:2, t:'Agonist, antagonist, synergist, fixator', crit:'MS 13', flag:'R',
  n:9, all:9, pts:15, qz:6, saq:2,
  done:'Define all four roles and give a worked pair — biceps flexes the elbow (agonist) while triceps relaxes (antagonist). Name the prime mover for a stated action, and say which muscle opposes it.',
  ask:'Prime-mover MCQs, an antagonist-pair dropdown, one written question, and her True/False definition check.',
  cap:'On her multi-step reasoning row as "antagonistic muscle actions" — she wants the pair reasoned about, not the word defined.' },

{ id:'ns-motor-neuron-lesion', sys:'ns', tier:2, t:'Upper vs lower motor neuron injury', crit:'NS 12', flag:'R',
  n:2, all:2, pts:14, qz:1, saq:0,
  done:'Contrast the two: where the lesion sits, and what it produces — UMN → spastic paralysis, hypertonia, exaggerated reflexes, Babinski; LMN → flaccid paralysis, atrophy, lost reflexes. Say which one spastic and which one flaccid paralysis belongs to.',
  ask:'Two matching exercises, 7 marks each.',
  cap:'Only two questions but 14 marks, and it sits on her multi-step reasoning row. Classic low-count / high-value — do not skip it because the counter is small.' },

{ id:'ms-energy', sys:'ms', tier:2, t:'Muscle energy & fatigue', crit:'MS 6–9', flag:'T',
  n:7, all:7, pts:13, qz:6, saq:1,
  done:'Rank the three energy routes by speed and yield — creatine phosphate (fastest), anaerobic glycolysis, aerobic respiration (most ATP). Match sprinter to anaerobic and endurance cyclist to aerobic. Say what lactic acid does, and define oxygen debt and muscle tone.',
  ask:'Fastest-vs-most-energy MCQs, the sprinter/cyclist comparison, and True/False on aerobic respiration.',
  cap:'"Energy for muscle actions" is on her terminology-precision row — the exact words matter here.' },

{ id:'ns-protection', sys:'ns', tier:2, t:'Protection of the CNS — meninges & BBB', crit:'NS 6', flag:'R',
  n:12, all:13, pts:10, qz:6, saq:0,
  done:'Name the four protective layers — bone, meninges, CSF, blood-brain barrier. Order the three meninges both directions (deep→superficial and the reverse — she asks it both ways). Say what the BBB excludes and what slips through (alcohol, some pathogens by Trojan horse), and why brain infections are hard to treat.',
  ask:'Ordering MCQs asked in both directions, which-meninx-is-double, and BBB True/False.',
  cap:'Watch the direction of the question — "closest to the brain" vs "deep to superficial" flip the answer and she uses both.' },

{ id:'endo-calcium', sys:'endo', tier:2, t:'Calcium regulation (endocrine side)', crit:'Endo 4', flag:'D P tape',
  n:7, all:10, pts:11, qz:5, saq:0,
  done:'Same loop as bone remodelling, from the gland side: which gland senses what, PTH raises blood calcium, calcitonin lowers it, and what removing the parathyroids does.',
  ask:'Which-two-hormones MCQs and matching rows.',
  cap:'She named calcium control as an endocrine SAQ on tape. If you have ticked the bone-remodelling row you have most of this already — it is the same mechanism from the other end.' },

{ id:'ns-cranial-nerves', sys:'ns', tier:2, t:'Cranial nerves', crit:'NS 7', flag:'R',
  n:4, all:4, pts:11, qz:4, saq:1,
  done:'Name the twelve and state each one\'s function. Work backwards from a deficit — a blow to the head and the face will not smile (facial, VII) — and know which nerve carries most parasympathetic outflow (vagus, X).',
  ask:'Deficit scenarios and a number-and-name dropdown.',
  cap:'Her focus row says "injury to different cranial and spinal nerves" — she tests them through the deficit, so drill deficit→nerve, not just the list.' },

{ id:'endo-diencephalon', sys:'endo', tier:2, t:'Diencephalon — hypothalamus, pituitary, pineal', crit:'Endo 7', flag:'D',
  n:4, all:4, pts:9, qz:3, saq:1,
  done:'Place the three on a mid-sagittal brain and say how the hypothalamus controls the pituitary two different ways — releasing hormones down the portal vessels to the anterior lobe, and neurons straight down the stalk to the posterior. Name the pineal\'s hormone (melatonin) and its job.',
  ask:'A written question on the hypothalamus–pituitary relationship, plus dissection-image labelling.',
  cap:'Her focus post files this under ENDOCRINE, not nervous system — so expect it in an endocrine question even though it is brain anatomy.' },

{ id:'endo-feedback', sys:'endo', tier:2, t:'Positive vs negative feedback', crit:'Endo 5', flag:'P',
  n:1, all:1, pts:8, qz:1, saq:0,
  done:'Define both and say which one runs nearly all endocrine control. Give a negative example (thyroxine shutting down TSH) and a positive one (oxytocin in labour, where the response amplifies the stimulus until birth ends it).',
  ask:'One 8-mark matching exercise.',
  cap:'A single question — but 8 marks, and it is on her Sequential Processes row. Cheap to secure.' },

{ id:'ms-imbalance', sys:'ms', tier:2, t:'MS disorders & the "-itis" terms', crit:'MS 10', flag:'T',
  n:2, all:2, pts:8, qz:2, saq:2,
  done:'Break the words apart — "-itis" is inflammation, "arth-" is joint. Define arthritis and separate osteoarthritis from rheumatoid. Know osteoporosis, osteomalacia, rickets, gout, strain vs sprain, and the spinal curvatures.',
  ask:'One written question that walks the word apart before asking for the definition, plus a curvature dropdown.',
  cap:'She marks the word-parts separately from the definition — say what the prefix means AND what the condition is, or you drop the first marks.' },

/* ══════════ TIER 3 — know it, don't camp on it ══════════ */
{ id:'ns-action-potential', sys:'ns', tier:3, t:'Action potentials', crit:'NS 3', flag:'',
  n:9, all:9, pts:8, qz:2, saq:0,
  done:'Get the ion directions right: sodium IN for depolarisation, potassium OUT for repolarisation. Know that propagation is one-way, that myelinated axons are faster, and what saltatory conduction means.',
  ask:'Eight True/False, several of them deliberately reversed ("sodium moves out of the axon in depolarisation" — false).',
  cap:'Almost entirely True/False and confined to two quizzes. Her traps are direction reversals, so read every one slowly.' },

{ id:'ns-brain-regions', sys:'ns', tier:3, t:'Brain regions & their jobs', crit:'NS 4', flag:'D',
  n:9, all:11, pts:8, qz:6, saq:0,
  done:'Name the four regions and their parts — cerebrum (grey, white, basal ganglia), diencephalon (thalamus, hypothalamus, epithalamus), brainstem (midbrain, pons, medulla), cerebellum. Attach one job each: thalamus relays sensory input, medulla runs the vital centres, cerebellum coordinates movement and balance.',
  ask:'Which-region-does-what MCQs and coloured-figure identification.',
  cap:'Low marks per question, but it underpins the stroke and lobes rows — do it as scaffolding for those.' },

{ id:'ms-im-injection', sys:'ms', tier:3, t:'IM injection sites', crit:'MS 5', flag:'',
  n:4, all:5, pts:6, qz:5, saq:1,
  done:'Name the common sites — deltoid, vastus lateralis, ventrogluteal, dorsogluteal — say why gluteus maximus is avoided (the sciatic nerve), and identify the sites on a figure.',
  ask:'Site-picking from a lettered figure plus one written comparison.',
  cap:'Not on her focus post at all, but it appears in five separate quizzes and it is the clinical crossover she likes. Cheap to hold.' },

{ id:'ms-repair', sys:'ms', tier:3, t:'Fracture repair', crit:'MS 10', flag:'P',
  n:3, all:3, pts:6, qz:2, saq:1,
  done:'Four stages in order: haematoma forms → fibrocartilaginous (soft) callus → bony callus → remodelling. Know the fracture types by name (simple, compound, spiral, greenstick, comminuted).',
  ask:'One ordering MCQ and a dropdown naming the first stage.',
  cap:'On her Sequential Processes row but only three questions in the bank — learn the four words in order and move on.' },

{ id:'ms-bone-structure', sys:'ms', tier:3, t:'Bone tissue — compact & spongy', crit:'MS 1', flag:'',
  n:2, all:2, pts:6, qz:2, saq:1,
  done:'Describe the osteon: lamellae in concentric rings around a central (Haversian) canal, osteocytes in lacunae. Contrast with spongy bone\'s trabeculae. Name the parts of a long bone — diaphysis, epiphysis, periosteum, endosteum, medullary cavity, red vs yellow marrow.',
  ask:'A dropdown passage on compact bone structure.',
  cap:'Her focus post lists "Haversian system in compact bone" and "long bone structure" as diagrams to read, so the labelling could appear even though the bank barely asks it.' },

{ id:'ms-contraction', sys:'ms', tier:3, t:'Muscle fibre structure', crit:'MS 5', flag:'',
  n:3, all:3, pts:5, qz:2, saq:1,
  done:'Name the wrappings inward — sarcolemma, sarcoplasm, myofibril — and know actin and myosin are the contractile filaments.',
  ask:'One labelling dropdown and two "all of these except" MCQs.',
  cap:'Genuinely thin: three questions, and the sliding-filament mechanism is never asked. Do not spend an evening here — the textbook goes far deeper than she does.' },

{ id:'ns-spinal-cord', sys:'ns', tier:3, t:'Spinal cord & injury levels', crit:'NS 19', flag:'R',
  n:5, all:6, pts:4, qz:4, saq:0,
  done:'Say which horn/root is sensory and which is motor (dorsal in, ventral out), that ascending tracts carry sensory and descending carry motor, and what a transection above T6 costs versus below.',
  ask:'Short MCQs on tracts, roots and transection level.',
  cap:'"Nerves" are in the PNS, "tracts" in the CNS — that exact distinction is a question.' },

{ id:'ns-organisation', sys:'ns', tier:3, t:'Organisation of the nervous system', crit:'NS 1–2 · 12', flag:'',
  n:5, all:8, pts:4, qz:4, saq:0,
  done:'Split CNS from PNS and name what is in each; split the PNS into somatic and autonomic, sensory and motor. Know what counts as PNS and what does not.',
  ask:'"The term central nervous system refers to…" and "all of the following are found in the PNS except…".',
  cap:'Scaffolding — it costs ten minutes and makes several other topics answerable.' },

{ id:'ns-neuron', sys:'ns', tier:3, t:'Neuron structure', crit:'NS 3', flag:'D',
  n:3, all:5, pts:3, qz:3, saq:0,
  done:'Label a neuron — dendrites, cell body, axon, myelin sheath, nodes, terminals — and say which way the signal travels. Classify by structure (multipolar/bipolar/unipolar) and function (sensory/motor/interneuron).',
  ask:'Few and short, but "Neuron: parts and functions" is on her diagrams row, so the labelling is fair game.',
  cap:'Low bank density, explicitly named by her — learn the labelled diagram, not the cell biology.' },

{ id:'endo-hormone-chem', sys:'endo', tier:3, t:'How hormones act on cells', crit:'Endo 3', flag:'',
  n:4, all:5, pts:3, qz:3, saq:0,
  done:'Split water-soluble from lipid-soluble: water-soluble bind receptors on the cell SURFACE and work through second messengers; steroid (lipid-soluble) cross the membrane and bind receptors INSIDE, acting on DNA. Say which travel bound to carriers in blood.',
  ask:'"Steroid hormones exert their action by…" MCQs and one sequencing question.',
  cap:'Small but it is the mechanism behind every other endocrine answer — worth the ten minutes.' },

{ id:'ms-bone-growth', sys:'ms', tier:3, t:'Bone growth in length & width', crit:'MS 4', flag:'',
  n:3, all:5, pts:2, qz:2, saq:0,
  done:'Length comes from epiphyseal plate activity, width from appositional growth at the periosteum. Name the hormones that drive it (GH in childhood, sex hormones at puberty closing the plate) and know bone adapts to the stress put on it.',
  ask:'True/False off her lecture slide.',
  cap:'The tail end of endochondral ossification — tick it alongside that row.' },

{ id:'endo-thyroid', sys:'endo', tier:3, t:'Thyroid & metabolism', crit:'Endo 6', flag:'',
  n:2, all:3, pts:2, qz:3, saq:0,
  done:'Thyroxine (T3/T4) sets metabolic rate, TSH from the anterior pituitary drives it, iodine is required. Attach the disorders: cretinism in children, myxoedema in adults, goitre, and hyper- vs hypothyroid signs.',
  ask:'Which-hormone-regulates-metabolism MCQs.',
  cap:'Counts low here only because her thyroid questions are spread across the calcium and pituitary rows — the gland itself is examined more than this number suggests.' },

{ id:'endo-thymus-pineal', sys:'endo', tier:3, t:'Thymus & pineal', crit:'Endo 9', flag:'',
  n:2, all:2, pts:2, qz:1, saq:0,
  done:'Thymus → thymosin, matures T-lymphocytes, shrinks after puberty. Pineal → melatonin, sets the circadian rhythm.',
  ask:'One-line MCQs.',
  cap:'Two facts. Learn them in a minute and never think about it again.' },

{ id:'ms-gravity-friction', sys:'ms', tier:3, t:'Centre of gravity, lifting, friction', crit:'MS 16–17', flag:'',
  n:2, all:3, pts:1, qz:3, saq:0,
  done:'Say which back muscles are hurt by bad lifting technique (erector spinae), and how keeping a load close to your centre of gravity reduces the strain.',
  ask:'One MCQ, repeated.',
  cap:'Two full criteria (16 and 17) that her bank almost ignores. Read them once so an odd question cannot blindside you — that is all this deserves.' },

{ id:'ns-sensation', sys:'ns', tier:3, t:'Sensation, perception & receptors', crit:'NS 16–17 · 20', flag:'',
  n:1, all:1, pts:1, qz:1, saq:0,
  done:'Name the receptor types by what they detect — mechano, noci, thermo, proprio, chemo, photo. Separate sensation (the signal arriving) from perception (the brain making it mean something). Know referred pain: a heart attack felt in the left arm.',
  ask:'One MCQ, on referred pain.',
  cap:'Three criteria, one question. Read the receptor list, know referred pain, move on.' },

{ id:'endo-imbalance', sys:'endo', tier:3, t:'Endocrine imbalances', crit:'Endo 10', flag:'',
  n:1, all:1, pts:0, qz:1, saq:0,
  done:'For each gland, know the over- and under-secretion condition: GH → gigantism/acromegaly vs dwarfism; thyroid → Graves/myxoedema/cretinism; adrenal → Cushing/Addison; pancreas → diabetes; parathyroid → calcium swings.',
  ask:'Barely asked as its own topic — it arrives attached to each gland instead.',
  cap:'Do not study this separately. You will have covered all of it by ticking the gland rows above.' },
];
