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
    const Toolbar = (props) => (
        <div className="toolbar">
            <i className="fa fa-free-code-camp" title="no-stack-dub-sack"></i>
            {props.text}
            <i className={props.icon} onClick={props.onClick}></i>
        </div>
    );

    const Editor = (props) => (
        <textarea
            id="editor"
            onChange={props.onChange}
            type="text"
            value={props.markdown}
        />
    );

    const Preview = (props) => (
        <div
            dangerouslySetInnerHTML={{
                __html: marked(props.markdown, { renderer: renderer })
            }}
            id="preview"
        />
    );

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

            return (
                <div>
                    <div className={classes.editorWrap}>
                        <Toolbar 
                            icon={classes.icon}
                            onClick={this.handleEditorMaximize}
                            text="Editor"
                        />
                        <Editor
                            markdown={this.state.markdown}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="converter" />
                    <div className={classes.previewWrap}>
                        <Toolbar
                            icon={classes.icon}
                            onClick={this.handlePreviewMaximize}
                            text="Previewer"
                        />
                        <Preview markdown={this.state.markdown} />
                    </div>
                </div>
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
    ReactDOM.render(<MarkdownPreviewer />, document.getElementById("app"));
})();
