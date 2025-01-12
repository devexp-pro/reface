import { TestUtils } from "@recast/test-utils";

Deno.test("JSX - basic element rendering", () => {
  const utils = new TestUtils();
  utils.assertRender(
    <div class="container">Hello World</div>,
    '<div class="container">Hello World</div>',
  );
});

Deno.test("JSX - nested elements", () => {
  const utils = new TestUtils();
  utils.assertRender(
    <div class="container">
      <h1>Title</h1>
      <p>Content</p>
    </div>,
    '<div class="container"><h1>Title</h1><p>Content</p></div>',
  );
});

Deno.test("JSX - fragments", () => {
  const utils = new TestUtils();
  utils.assertRender(
    <>
      <div>First</div>
      <div>Second</div>
    </>,
    "<div>First</div><div>Second</div>",
  );
});

Deno.test("JSX - conditional rendering", () => {
  const utils = new TestUtils();
  const showContent = true;
  utils.assertRender(
    <div>
      {showContent && <span>Visible</span>}
      {!showContent && <span>Hidden</span>}
    </div>,
    "<div><span>Visible</span></div>",
  );
});

Deno.test("JSX - handles primitives", () => {
  const utils = new TestUtils();
  utils.assertRender(
    <div>
      {false}
      {null}
      {undefined}
      {0}
      {true}
      {""}
    </div>,
    "<div>0</div>",
  );
});

Deno.test("JSX - all HTML elements", () => {
  const utils = new TestUtils();

  // Document Metadata
  utils.assertRender(
    <head>
      <title>Title</title>
    </head>,
    "<head><title>Title</title></head>",
  );
  utils.assertRender(<base href="/" />, '<base href="/"/>');
  utils.assertRender(<link rel="stylesheet" />, '<link rel="stylesheet"/>');
  utils.assertRender(<meta charset="utf-8" />, '<meta charset="utf-8"/>');
  utils.assertRender(
    <style>body {"{"} color: red; {"}"}</style>,
    "<style>body { color: red; }</style>",
  );
  utils.assertRender(<body>Content</body>, "<body>Content</body>");

  // Content Sectioning
  utils.assertRender(<header>Header</header>, "<header>Header</header>");
  utils.assertRender(<nav>Nav</nav>, "<nav>Nav</nav>");
  utils.assertRender(<main>Main</main>, "<main>Main</main>");
  utils.assertRender(<article>Article</article>, "<article>Article</article>");
  utils.assertRender(<section>Section</section>, "<section>Section</section>");
  utils.assertRender(<aside>Aside</aside>, "<aside>Aside</aside>");
  utils.assertRender(<footer>Footer</footer>, "<footer>Footer</footer>");

  // Text Content
  utils.assertRender(<p>Paragraph</p>, "<p>Paragraph</p>");
  utils.assertRender(<pre>Preformatted</pre>, "<pre>Preformatted</pre>");
  utils.assertRender(
    <blockquote>Quote</blockquote>,
    "<blockquote>Quote</blockquote>",
  );
  utils.assertRender(
    <ol>
      <li>Item</li>
    </ol>,
    "<ol><li>Item</li></ol>",
  );
  utils.assertRender(
    <ul>
      <li>Item</li>
    </ul>,
    "<ul><li>Item</li></ul>",
  );
  utils.assertRender(
    <dl>
      <dt>Term</dt>
      <dd>Description</dd>
    </dl>,
    "<dl><dt>Term</dt><dd>Description</dd></dl>",
  );
  utils.assertRender(
    <figure>
      <figcaption>Caption</figcaption>
    </figure>,
    "<figure><figcaption>Caption</figcaption></figure>",
  );

  // Forms
  utils.assertRender(
    <form action="/submit">
      <label for="name">Name</label>
      <input id="name" type="text" />
      <select>
        <optgroup>
          <option>Option</option>
        </optgroup>
      </select>
      <textarea />
      <button>Submit</button>
      <fieldset>
        <legend>Legend</legend>
      </fieldset>
    </form>,
    '<form action="/submit"><label for="name">Name</label><input id="name" type="text"/><select><optgroup><option>Option</option></optgroup></select><textarea></textarea><button>Submit</button><fieldset><legend>Legend</legend></fieldset></form>',
  );

  // Tables
  utils.assertRender(
    <table>
      <caption>Caption</caption>
      <thead>
        <tr>
          <th>Header</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cell</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Footer</td>
        </tr>
      </tfoot>
    </table>,
    "<table><caption>Caption</caption><thead><tr><th>Header</th></tr></thead><tbody><tr><td>Cell</td></tr></tbody><tfoot><tr><td>Footer</td></tr></tfoot></table>",
  );

  // Inline Text
  utils.assertRender(<a href="#">Link</a>, '<a href="#">Link</a>');
  utils.assertRender(<code>Code</code>, "<code>Code</code>");
  utils.assertRender(<em>Emphasis</em>, "<em>Emphasis</em>");
  utils.assertRender(<strong>Strong</strong>, "<strong>Strong</strong>");
  utils.assertRender(<small>Small</small>, "<small>Small</small>");
  utils.assertRender(<s>Strike</s>, "<s>Strike</s>");
  utils.assertRender(<cite>Citation</cite>, "<cite>Citation</cite>");
  utils.assertRender(<q>Quote</q>, "<q>Quote</q>");
  utils.assertRender(
    <time datetime="2024">2024</time>,
    '<time datetime="2024">2024</time>',
  );

  // Embedded Content
  utils.assertRender(
    <img src="img.jpg" alt="Image" />,
    '<img src="img.jpg" alt="Image"/>',
  );
  utils.assertRender(
    <iframe src="page.html" />,
    '<iframe src="page.html"></iframe>',
  );
  utils.assertRender(<embed src="file.swf" />, '<embed src="file.swf"/>');
  utils.assertRender(
    <object data="file.pdf" />,
    '<object data="file.pdf"></object>',
  );
  utils.assertRender(<source src="video.mp4" />, '<source src="video.mp4"/>');

  // Media
  utils.assertRender(
    <video src="video.mp4" />,
    '<video src="video.mp4"></video>',
  );
  utils.assertRender(
    <audio src="audio.mp3" />,
    '<audio src="audio.mp3"></audio>',
  );

  // Interactive Elements
  utils.assertRender(
    <details>
      <summary>Summary</summary>
    </details>,
    "<details><summary>Summary</summary></details>",
  );
  utils.assertRender(<dialog>Dialog</dialog>, "<dialog>Dialog</dialog>");

  // Progress
  utils.assertRender(
    <progress value={50} max={100} />,
    '<progress value="50" max="100"></progress>',
  );

  // Technical
  utils.assertRender(<canvas />, "<canvas></canvas>");
  utils.assertRender(
    <script src="script.js" />,
    '<script src="script.js"></script>',
  );
  utils.assertRender(
    <template>Template</template>,
    "<template>Template</template>",
  );

  // SVG
  utils.assertRender(
    <svg viewBox="0 0 100 100">
      <path d="M0 0h100v100H0z" />
    </svg>,
    '<svg viewBox="0 0 100 100"><path d="M0 0h100v100H0z"></path></svg>',
  );

  // Generic
  utils.assertRender(<div>Content</div>, "<div>Content</div>");
  utils.assertRender(<span>Content</span>, "<span>Content</span>");
});
