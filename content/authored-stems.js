/* Authored structured stems — LAYOUT ONLY.
   A figure-labelling question can arrive with its question_text being the diagram
   alone (display:none text, no inline blanks), so stem-html has nowhere to place the
   blanks and the build would either fail the structure gate or ship 7 bare ____ with
   no image. Here the stem's LAYOUT is authored: the diagram, then one labelled blank
   per part. The blanks, their accepted answers, the key and the grading all still come
   from the parsed capture verbatim (build.mjs reads q.key.blanks unchanged) — nothing
   here authors an answer. Matched by quiz id + normalised stem prefix; a stale entry
   fails the build, exactly like an override or a saq-answer that matched nothing. */
export const AUTHORED_STEMS = [
  {
    // 211112 #1 — Label the endocrine glands (A,B,C,E,F,G,H; D is on the figure but
    // not asked). Image extracted from the capture as HS2DATA-4928f05441689a39.jpg.
    quiz: '211112',
    k: 'label the glands',
    st: {
      html:
        '<p>Identify each labelled endocrine gland in the diagram. ' +
        '(D is shown on the figure but is not required.)</p>' +
        '[[IMG:HS2DATA-4928f05441689a39.jpg]]' +
        '<div>A&nbsp;=&nbsp;[[BLANK:0]]</div>' +
        '<div>B&nbsp;=&nbsp;[[BLANK:1]]</div>' +
        '<div>C&nbsp;=&nbsp;[[BLANK:2]]</div>' +
        '<div>E&nbsp;=&nbsp;[[BLANK:3]]</div>' +
        '<div>F&nbsp;=&nbsp;[[BLANK:4]]</div>' +
        '<div>G&nbsp;=&nbsp;[[BLANK:5]]</div>' +
        '<div>H&nbsp;=&nbsp;[[BLANK:6]]</div>',
      ctx: ['A', 'B', 'C', 'E', 'F', 'G', 'H'],
    },
  },
];
