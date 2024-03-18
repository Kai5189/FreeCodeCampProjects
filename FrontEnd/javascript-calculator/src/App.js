import "./App.css";
import { useState } from "react";

function Calculator() {
  const [expression, setExpression] = useState("");
  const [answer, setAnswer] = useState("");
  const trimExp = expression.trim();

  const isOperator = (symbol) => {
    return /[-+/*]/.test(symbol);
  };

  const solveCalculation = () => {
    if (isOperator(trimExp.charAt(trimExp.length - 1))) return;

    const parts = trimExp.split(" ");
    console.log("parts : ", parts);
    const updatedParts = [];
    const newOperator = ["*", "/", "+"];

    for (let i = parts.length - 1; i >= 0; i--) {
      console.log(parts[i]);
      console.log(parts[i - 1]);
      if (newOperator.includes(parts[i]) && isOperator(parts[i - 1])) {
        console.log("yes ", parts[i]);
        updatedParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        updatedParts.unshift(parts[i]);
      }
    }

    const updatedExpression = updatedParts.join(" ");
    if (isOperator(updatedExpression.charAt(0))) {
      setAnswer(eval(answer + updatedExpression));
    } else {
      setAnswer(eval(updatedExpression));
    }
    setExpression("");
  };

  const buttonClicked = (symbol) => {
    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");
    } else if (symbol === "negative") {
      if (answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    } else if (isOperator(symbol)) {
      setExpression(trimExp + " " + symbol + " ");
    } else if (symbol === "=") {
      solveCalculation();
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      const lastNum = expression.split(/[-+/*]/g).pop();
      console.log(lastNum);
      if (!lastNum) return;
      if (lastNum?.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div id="center">
          <div id="display">
            <div id="answer">{answer}</div>
            <div id="expression">{expression}</div>
          </div>
          <div id="calculator">
            <button
              id="seven"
              className="btn btn-dark btn-block"
              onClick={() => buttonClicked("7")}
            >
              7
            </button>
            <button
              id="eight"
              className="btn btn-dark btn-block"
              onClick={() => buttonClicked("8")}
            >
              8
            </button>
            <button
              id="nine"
              className="btn btn-dark btn-block"
              onClick={() => buttonClicked("9")}
            >
              9
            </button>
            <button
              id="divide"
              className="btn btn-dark btn-block"
              onClick={() => buttonClicked("/")}
            >
              /
            </button>
            <button
              id="four"
              className="btn btn-dark btn-block"
              onClick={() => buttonClicked("4")}
            >
              4
            </button>
            <button
              id="five"
              className="btn btn-dark btn-block"
              onClick={() => buttonClicked("5")}
            >
              5
            </button>
            <button
              id="six"
              className="btn btn-dark btn-block"
              onClick={() => buttonClicked("6")}
            >
              6
            </button>
            <button
              id="multiply"
              className="btn btn-dark btn-block"
              onClick={() => buttonClicked("*")}
            >
              *
            </button>
            <button
              id="one"
              className="btn btn-dark btn-block"
              onClick={() => buttonClicked("1")}
            >
              1
            </button>
            <button
              id="two"
              className="btn btn-dark btn-block"
              onClick={() => buttonClicked("2")}
            >
              2
            </button>
            <button
              id="three"
              className="btn btn-dark btn-block"
              onClick={() => buttonClicked("3")}
            >
              3
            </button>
            <button
              id="subtract"
              className="btn btn-dark btn-block"
              onClick={() => buttonClicked("-")}
            >
              -
            </button>
            <button
              id="zero"
              className="btn btn-dark btn-block"
              onClick={() => buttonClicked("0")}
            >
              0
            </button>
            <button
              id="decimal"
              className="btn btn-dark btn-block"
              onClick={() => buttonClicked(".")}
            >
              .
            </button>
            <button
              id="add"
              className="btn btn-dark btn-block"
              onClick={() => buttonClicked("+")}
            >
              +
            </button>
            <button
              id="clear"
              className="btn btn-danger btn-block"
              onClick={() => buttonClicked("clear")}
            >
              AC
            </button>
            <button
              id="equals"
              className="btn btn-warning btn-block"
              onClick={solveCalculation}
            >
              =
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

function App() {
  return <Calculator />;
}

export default App;
