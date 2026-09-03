/* Extra ACCEPTED answers for a handful of blanks where her Canvas key marks a
   plainly correct answer wrong. Her key stays the displayed answer; these only stop
   a false "wrong". Each entry is matched on question id + blank index + her correct
   answer, and build.mjs fails if one matches nothing (a stale override is a lie). */
export const OVERRIDES = [
  /* "represents a [third / 3rd] class lever" — both options ARE the answer; Canvas
     keyed only "third", so "3rd" was a coin-flip mark against a correct student */
  { id: 'q2b40cd42e0', blank: 0, correct: 'third', also: ['3rd'] },
  /* "Label the glands: E =" points at both adrenal glands; she accepts
     "ADRENAL GLANDS" / "Adrenal" but not the singular or the everyday plural */
  { id: 'q0ed957ca9a', blank: 3, correct: 'Adrenal', also: ['adrenal gland', 'adrenals'] },
];
