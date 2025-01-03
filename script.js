(function () {
    "use strict";

    // Configure marked library
    marked.setOptions({
        breaks: true,
        highlight: function (code) {
            return Prism.highlight(code, Prism.languages.javascript, "javascript");
        },
    });

    const renderer = new marked.Renderer();
    renderer.link = function (href, title, text) {
        return `<a target="_blank" href="${href}">${text}</a>`;
    };

    // React Components
    function Toolbar(props) {
        return React.createElement(
            "div",
            { className: "toolbar" },
            React.createElement("i", { className: "fa fa-free-code-camp", title: "no-stack-dub-sack" }),
            props.text,
            React.createElement("i", { className: props.icon, onClick: props.onClick })
        );
    }

    function Editor(props) {
        return React.createElement("textarea", {
            id: "editor",
            onChange: props.onChange,
            value: props.markdown
        });
    }

    function Preview(props) {
        return React.createElement("div", {
            dangerouslySetInnerHTML: {
                __html: marked(props.markdown, { renderer: renderer })
            },
            id: "preview"
        });
    }

    // MarkdownPreviewer Component
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

        handleChange(e) {
            this.setState({
                markdown: e.target.value
            });
        }

        handleEditorMaximize() {
            this.setState({
                editorMaximized: !this.state.editorMaximized
            });
        }

        handlePreviewMaximize() {
            this.setState({
                previewMaximized: !this.state.previewMaximized
            });
        }

        render() {
            const classes = {
                editorWrap: this.state.editorMaximized
                    ? 'editorWrap maximized'
                    : this.state.previewMaximized
                        ? 'editorWrap hide'
                        : 'editorWrap',
                previewWrap: this.state.previewMaximized
                    ? 'previewWrap maximized'
                    : this.state.editorMaximized
                        ? 'previewWrap hide'
                        : 'previewWrap',
                icon: this.state.editorMaximized || this.state.previewMaximized
                    ? 'fa fa-compress'
                    : 'fa fa-arrows-alt'
            };

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: classes.editorWrap },
                    React.createElement(Toolbar, {
                        icon: classes.icon,
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
                    { className: classes.previewWrap },
                    React.createElement(Toolbar, {
                        icon: classes.icon,
                        onClick: this.handlePreviewMaximize,
                        text: "Previewer"
                    }),
                    React.createElement(Preview, { markdown: this.state.markdown })
                )
            );
        }
    }

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

    // Render app
    ReactDOM.render(React.createElement(MarkdownPreviewer), document.getElementById("app"));
})();
