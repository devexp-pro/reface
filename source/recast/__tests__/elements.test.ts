import {
  a,
  article,
  aside,
  audio,
  base,
  blockquote,
  body,
  button,
  canvas,
  caption,
  cite,
  code,
  dd,
  details,
  dialog,
  div,
  dl,
  dt,
  em,
  embed,
  fieldset,
  figcaption,
  figure,
  footer,
  form,
  head,
  header,
  iframe,
  img,
  input,
  label,
  legend,
  li,
  link,
  main,
  meta,
  nav,
  object,
  ol,
  optgroup,
  option,
  p,
  path,
  pre,
  progress,
  q,
  s,
  script,
  section,
  select,
  small,
  source,
  span,
  strong,
  style,
  summary,
  svg,
  table,
  tbody,
  td,
  template,
  textarea,
  tfoot,
  th,
  thead,
  time,
  title,
  tr,
  ul,
  video,
} from "@recast/element/mod.ts";
import { TestUtils } from "@recast/test-utils/mod.ts";

Deno.test("elements - basic usage", () => {
  const utils = new TestUtils();
  utils.assertRender(
    div({ class: "container" })`Hello World`,
    '<div class="container">Hello World</div>',
  );
});

Deno.test("elements - nested elements", () => {
  const utils = new TestUtils();
  utils.assertRender(
    div({ class: "container" })`
      ${span({ class: "text" })`Hello`}
      ${span({ class: "text" })`World`}
    `,
    '<div class="container"><span class="text">Hello</span><span class="text">World</span></div>',
  );
});

Deno.test("elements - handles primitives", () => {
  const utils = new TestUtils();
  utils.assertRender(
    div({ class: "container" })`${false}${null}${undefined}${0}${true}${""}`,
    '<div class="container">0</div>',
  );
});

Deno.test("elements - form elements", () => {
  const utils = new TestUtils();
  utils.assertRender(
    form({ action: "/submit", method: "post" })`
      ${input({ type: "text", name: "username" })}
      ${button({ type: "submit" })`Submit`}
    `,
    '<form action="/submit" method="post"><input type="text" name="username"/><button type="submit">Submit</button></form>',
  );
});

Deno.test("elements - void elements", () => {
  const utils = new TestUtils();
  utils.assertRender(
    img({ src: "image.jpg", alt: "Test image" }),
    '<img src="image.jpg" alt="Test image"/>',
  );
});

Deno.test("elements - all HTML elements", () => {
  const utils = new TestUtils();

  // Document Metadata
  utils.assertRender(
    head`${title`Title`}`,
    "<head><title>Title</title></head>",
  );
  utils.assertRender(base({ href: "/" }), '<base href="/"/>');
  utils.assertRender(link({ rel: "stylesheet" }), '<link rel="stylesheet"/>');
  utils.assertRender(meta({ charset: "utf-8" }), '<meta charset="utf-8"/>');
  utils.assertRender(
    style`body { color: red; }`,
    "<style>body { color: red; }</style>",
  );
  utils.assertRender(body`Content`, "<body>Content</body>");

  // Content Sectioning
  utils.assertRender(header`Header`, "<header>Header</header>");
  utils.assertRender(nav`Nav`, "<nav>Nav</nav>");
  utils.assertRender(main`Main`, "<main>Main</main>");
  utils.assertRender(article`Article`, "<article>Article</article>");
  utils.assertRender(section`Section`, "<section>Section</section>");
  utils.assertRender(aside`Aside`, "<aside>Aside</aside>");
  utils.assertRender(footer`Footer`, "<footer>Footer</footer>");

  // Text Content
  utils.assertRender(p`Paragraph`, "<p>Paragraph</p>");
  utils.assertRender(pre`Preformatted`, "<pre>Preformatted</pre>");
  utils.assertRender(blockquote`Quote`, "<blockquote>Quote</blockquote>");
  utils.assertRender(ol`${li`Item`}`, "<ol><li>Item</li></ol>");
  utils.assertRender(ul`${li`Item`}`, "<ul><li>Item</li></ul>");
  utils.assertRender(
    dl`${dt`Term`}${dd`Description`}`,
    "<dl><dt>Term</dt><dd>Description</dd></dl>",
  );
  utils.assertRender(
    figure`${figcaption`Caption`}`,
    "<figure><figcaption>Caption</figcaption></figure>",
  );

  // Forms
  utils.assertRender(
    form({ action: "/submit" })`
      ${label({ for: "name" })`Name`}
      ${input({ id: "name", type: "text" })}
      ${select`${optgroup`${option`Option`}`}`}
      ${textarea}
      ${button`Submit`}
      ${fieldset`${legend`Legend`}`}
    `,
    '<form action="/submit"><label for="name">Name</label><input id="name" type="text"/><select><optgroup><option>Option</option></optgroup></select><textarea></textarea><button>Submit</button><fieldset><legend>Legend</legend></fieldset></form>',
  );

  // Tables
  utils.assertRender(
    table`
      ${caption`Caption`}
      ${thead`${tr`${th`Header`}`}`}
      ${tbody`${tr`${td`Cell`}`}`}
      ${tfoot`${tr`${td`Footer`}`}`}
    `,
    "<table><caption>Caption</caption><thead><tr><th>Header</th></tr></thead><tbody><tr><td>Cell</td></tr></tbody><tfoot><tr><td>Footer</td></tr></tfoot></table>",
  );

  // Inline Text
  utils.assertRender(a({ href: "#" })`Link`, '<a href="#">Link</a>');
  utils.assertRender(code`Code`, "<code>Code</code>");
  utils.assertRender(em`Emphasis`, "<em>Emphasis</em>");
  utils.assertRender(strong`Strong`, "<strong>Strong</strong>");
  utils.assertRender(small`Small`, "<small>Small</small>");
  utils.assertRender(s`Strike`, "<s>Strike</s>");
  utils.assertRender(cite`Citation`, "<cite>Citation</cite>");
  utils.assertRender(q`Quote`, "<q>Quote</q>");
  utils.assertRender(
    time({ datetime: "2024" })`2024`,
    '<time datetime="2024">2024</time>',
  );

  // Embedded Content
  utils.assertRender(
    img({ src: "img.jpg", alt: "Image" }),
    '<img src="img.jpg" alt="Image"/>',
  );
  utils.assertRender(
    iframe({ src: "page.html" }),
    '<iframe src="page.html"></iframe>',
  );
  utils.assertRender(embed({ src: "file.swf" }), '<embed src="file.swf"/>');
  utils.assertRender(
    object({ data: "file.pdf" }),
    '<object data="file.pdf"></object>',
  );
  utils.assertRender(source({ src: "video.mp4" }), '<source src="video.mp4"/>');

  // Media
  utils.assertRender(
    video({ src: "video.mp4" }),
    '<video src="video.mp4"></video>',
  );
  utils.assertRender(
    audio({ src: "audio.mp3" }),
    '<audio src="audio.mp3"></audio>',
  );

  // Interactive Elements
  utils.assertRender(
    details`${summary`Summary`}`,
    "<details><summary>Summary</summary></details>",
  );
  utils.assertRender(dialog`Dialog`, "<dialog>Dialog</dialog>");

  // Progress
  utils.assertRender(
    progress({ value: 50, max: 100 }),
    '<progress value="50" max="100"></progress>',
  );

  // Technical
  utils.assertRender(canvas, "<canvas></canvas>");
  utils.assertRender(
    script({ src: "script.js" }),
    '<script src="script.js"></script>',
  );
  utils.assertRender(template`Template`, "<template>Template</template>");

  // SVG
  utils.assertRender(
    svg({ viewBox: "0 0 100 100" })`${path({ d: "M0 0h100v100H0z" })}`,
    '<svg viewBox="0 0 100 100"><path d="M0 0h100v100H0z"></path></svg>',
  );

  // Generic
  utils.assertRender(div`Content`, "<div>Content</div>");
  utils.assertRender(span`Content`, "<span>Content</span>");
});
