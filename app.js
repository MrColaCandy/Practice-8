const display = document.querySelector(".display input");
const keys = document.querySelector(".keys");

keys.addEventListener("click", (e) => {
  if (e.target.className !== "key") return;
  if (e.target.innerText === "=") {
    evaluate();
    return;
  }

  if (!/\d/.test(e.target.innerText)) {
    if (
      e.target.innerText != "e" &&
      e.target.innerText != "π" &&
      e.target.innerText != "-" &&
      e.target.innerText != ")" &&
      e.target.innerText != "("
    ) {
      if (display.value === "") return;
    }
  }
  if (e.target.innerText == "AC") {
    display.value = "";
    return;
  }
  if (e.target.innerText === "CE") {
    let value = display.value.toString();
    value = value.substring(0, value.length - 1);
    display.value = value;
    return;
  }

  if (e.target.innerText === "x²") {
    evaluate();

    display.value = Math.pow(display.value, 2);
    return;
  }
  if (e.target.innerText === "√") {
    evaluate();
    display.value = Math.sqrt(display.value);
    return;
  }
  if (e.target.innerText === "log") {
    evaluate();
    if (display.value < 0 || display.value === "-") {
      display.value = "Can't Calculate log of negative numbers!";
      return;
    }
    display.value = Math.log10(display.value);
    return;
  }
  if (e.target.innerText === "π") {
    evaluate();
    display.value = Math.PI;
    return;
  }
  if (e.target.innerText === "e") {
    evaluate();
    display.value = Math.E;
    return;
  }
  if (e.target.innerText === "tan") {
    evaluate();
    display.value = Math.tan(display.value);
    return;
  }
  if (e.target.innerText === "sin") {
    evaluate();
    display.value = Math.sin(display.value);
    return;
  }
  if (e.target.innerText === "cos") {
    evaluate();
    display.value = Math.cos(display.value);
    return;
  }
  if (e.target.innerText === "tan") {
    evaluate();
    display.value = Math.tan(display.value);
    return;
  }
  if (e.target.innerText === "%") {
    evaluate();
    display.value = display.value / 100;
    return;
  }

  if (e.target.innerText === "x!") {
    evaluate();
    let value = 1;

    while (display.value > 0) {
      value *= display.value;
      display.value--;
    }

    display.value = value;

    return;
  }

  if (
    display.value.length > 0 &&
    isOperator(e.target.innerText) &&
    doesEndWithOperator(display.value.toString())
  ) {
    return;
  }
  display.value += e.target.innerText;
});
function evaluate() {
  let value = display.value;
  if (value === "") return;
  if (value === "-") return;
  if (/^[0-9](?: \.)*$/.test(value)) {
    display.value = value;
    return;
  }

  while (doesEndWithOperator(value)) {
    value = value.substring(0, value.length - 1);
  }
  value = value.replaceAll("÷", "/").replaceAll("x", "*");

  if (value.includes(")") || value.includes("(")) {
    if (!value.match(/\((.*?)\)/g)) {
      display.value = "Invalid Input!";
      return;
    }
  }

  display.value = eval(value);
}

function isOperator(str) {
  return str === "x" || str === "-" || str === "÷" || str === "+";
}

function doesEndWithOperator(str) {
  return (
    str.endsWith("+") ||
    str.endsWith("-") ||
    str.endsWith("÷") ||
    str.endsWith("x")
  );
}
