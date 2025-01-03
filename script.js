(function() {
  "use strict";
  
  // Set options for marked
  marked.setOptions({
    breaks: true,
    highlight: function (code) {
      return Prism.highlight(code, Prism.languages.javascript, "javascript");
    }
  });

  // Create a new marked renderer
  const renderer = new marked.Renderer();
  renderer.link = function (href, title, text) {
    return '<a target="_blank" href="' + href + '">' + text + "</a>";
  };

  // React component for the app
  class MarkdownPreviewer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        markdown: initialMarkdown,
        editorMaximized: false,
        previewMaximized: false
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
      this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
    }

    // Handle changes in the editor
    handleChange(e) {
      this.setState({
        markdown: e.target.value
      });
    }

    // Toggle editor maximization
    handleEditorMaximize() {
      this.setState({
        editorMaximized: !this.state.editorMaximized
      });
    }

    // Toggle preview maximization
    handlePreviewMaximize() {
      this.setState({
        previewMaximized: !this.state.previewMaximized
      });
    }

    render() {
      // Define class names based on maximization states
      const classNames = this.state.editorMaximized
        ? ["editorWrap maximized", "previewWrap hide", "fa fa-compress"]
        : this.state.previewMaximized
        ? ["editorWrap hide", "previewWrap maximized", "fa fa-compress"]
        : ["editorWrap", "previewWrap", "fa fa-arrows-alt"];

      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: classNames[0] },
          React.createElement(Toolbar, {
            icon: classNames[2],
            onClick: this.handleEditorMaximize,
            text: "Editor"
          }),
          React.createElement(Editor, {
            markdown: this.state.markdown,
            onChange: this.handleChange
          })
        ),
        React.createElement("div", { className: "converter" }),
        React.createElement(
          "div",
          { className: classNames[1] },
          React.createElement(Toolbar, {
            icon: classNames[2],
            onClick: this.handlePreviewMaximize,
            text: "Previewer"
          }),
          React.createElement(Preview, { markdown: this.state.markdown })
        )
      );
    }
  }

  // Toolbar component
  const Toolbar = (props) => React.createElement(
    "div",
    { className: "toolbar" },
    React.createElement("i", {
      className: "fa fa-free-code-camp",
      title: "no-stack-dub-sack"
    }),
    props.text,
    React.createElement("i", { className: props.icon, onClick: props.onClick })
  );

  // Editor component
  const Editor = (props) => React.createElement(
    "textarea",
    {
      id: "editor",
      onChange: props.onChange,
      type: "text",
      value: props.markdown
    }
  );

  // Preview component
  const Preview = (props) => React.createElement(
    "div",
    {
      dangerouslySetInnerHTML: {
        __html: marked(props.markdown, { renderer: renderer })
      },
      id: "preview"
    }
  );

  // Initial Markdown text
  const initialMarkdown = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

  // Render the app
  ReactDOM.render(
    React.createElement(MarkdownPreviewer, null),
    document.getElementById("app")
  );
})();
