/* Walk each HS2CAP capture, and for the i-th display_question block collect the
   Canvas file ids of the images it embeds. parse-quizzes.mjs emits questions in
   the same block order, so (file, index) joins the two without touching stems. */
import fs from 'node:fs';
import path from 'node:path';
const CAP = 'C:/Users/USER/Desktop/github/_inbox/HS2 Module 2 Capture';
const out = {};
for (const f of fs.readdirSync(CAP).filter(x => /^HS2CAP-.*\.html$/.test(x))) {
  const html = fs.readFileSync(path.join(CAP, f), 'utf8');
  const re = /<div[^>]*class="[^"]*\bdisplay_question\b[^"]*"[^>]*>/g;
  const starts = [];
  let m; while ((m = re.exec(html))) starts.push(m.index);
  const per = {};
  starts.forEach((s, i) => {
    const end = i + 1 < starts.length ? starts[i + 1] : html.length;
    const seg = html.slice(s, end);
    const ids = new Set();
    for (const im of seg.matchAll(/<img[^>]*\ssrc="https:\/\/canvas[^"]*?(?:files\/(\d+))[^"]*"/g)) ids.add(im[1]);
    if (ids.size) per[i] = [...ids];
  });
  if (Object.keys(per).length) out[f] = per;
}
fs.writeFileSync('images.json', JSON.stringify(out, null, 1));
const n = Object.values(out).reduce((s, p) => s + Object.keys(p).length, 0);
console.log('files:', Object.keys(out).length, 'questions with images:', n);
