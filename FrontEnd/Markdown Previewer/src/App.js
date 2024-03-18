import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { marked } from "marked";

export default function App() {
  const placeholderText = `# My React Markdown Previewer!
## Sub-heading...
### And a smaller heading:
Here's some code, \`<div></div>\`, between 2 backticks.
\`\`\`
// multi-line code:
function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
You can also make text **bold**... whoa!
There's also links [you can](https://www.freecodecamp.com) click, and
> Block Quotes!
1. And of course there are lists.
2. That look like this.
3. embedded image:
![React Logo](https://cdn.iconscout.com/icon/free/png-256/react-1543566-1306069.png)
`;
  const [inputText, setInputText] = useState(placeholderText);
  function handleInput(event) {
    setInputText(event.target.value);
  }

  function setLocalStorage() {
    localStorage.setItem("project_selector", "markdown-previewer");
    localStorage.setItem("fCC_markdown-previewer_hide", true);
  }
  const renderer = new marked.Renderer();
  marked.setOptions({
    gfm: true,
    tables: true,
    breaks: true,
  });

  setLocalStorage();
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="heading">Markdown Previewer</h1>
      </header>
      <div>
        <Row>
          <Col>
            <h2 className="subHeading">Editor</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <Form.Control
                className="inputField"
                id="editor"
                as="textarea"
                rows={10}
                aria-label="editor"
                onChange={handleInput}
                defaultValue={inputText}
              />
            </Form>
          </Col>
        </Row>
      </div>
      <div>
        <Row>
          <Col>
            <h2 className="subHeading">Previewer</h2>
          </Col>
        </Row>
        <Row>
          <Col
            id="preview"
            className="preview"
            dangerouslySetInnerHTML={{
              __html: marked(inputText, { renderer: renderer }),
            }}
          />
        </Row>
      </div>
      <Row className="footer">
        <Col>
          <footer>
            <a
              href="https://github.com/ssrome/fcc_markdown_previewer"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open-sourced code
            </a>{" "}
            by Sabrina Samuel
          </footer>
        </Col>
      </Row>
    </div>
  );
}
