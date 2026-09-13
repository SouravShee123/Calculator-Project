let num1 = "";
let opr = "";
let num2 = "";
let justEvaluated = false;

const digits = document.querySelectorAll(".btn button");
const operators = document.querySelectorAll(".operator button")
const display = document.getElementById("display");
const equals = document.getElementById("equalTo");
const clear = document.getElementById("clear");
const decimal = document.getElementById("decimal");
const backspace = document.getElementById("backspace");

/*  functions for each operator  */
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

/*  Access the operator by their class name instead of the content  */
const oprFn = { add, subtract, multiply, divide };

/*  Takes the desired operator and calls the function according to it */
function operator(opr, a, b) {
    return opr(a, b);
}

/*  Function to take a digit and assign it to its correct variable  */
function updateVariables(value) {
    if (opr === "") {
        num1 += value;
        display.textContent = num1;
    }
    else {
        num2 += value;
        display.textContent = num2;
    }
}

/*  Takes all the reset values in a function so that later we dont have to write the same thing  */
function resetAll() {
    num1 = "";
    num2 = "";
    opr = "";
    justEvaluated = false;
}

function calculate() {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (opr === divide && b === 0) {
        display.textContent = "Cannot divide by zero";
        resetAll();
        return false;
    }

    let result = operator(opr, a, b);
    result = Math.round(result * 1000000) / 1000000;

    display.textContent = result;
    num1 = String(result);
    num2 = "";
    return true;
}

digits.forEach((digit) => {
    digit.addEventListener("click", () => {
        let value = digit.textContent.trim();

        if (justEvaluated === true) {
            num1 = "";
            num2 = "";
            justEvaluated = false;
        }
        updateVariables(value);
    })
});

operators.forEach((optr) => {
    optr.addEventListener("click", () => {
        let nextOperator = oprFn[optr.className];

        if (num1 !== "" && num2 !== "" && opr !== "") {
            const ok = calculate();
            if (!ok) return;
        }

        opr = nextOperator;
        justEvaluated = false;
    });
});

equals.addEventListener("click", () => {
    if (num1 === "" || num2 === "" || opr === "") {
        return;
    }

    const ok = calculate();
    if (!ok) return;

    opr = "";
    justEvaluated = true;
})

clear.addEventListener("click", () => {
    resetAll();
    display.textContent = "0";
})

/*  Checks whichever number is being typed and only adds "." if that number doesn't already have one  */
decimal.addEventListener("click", () => {
    if (opr === "") {
        if (!num1.includes(".")) {
            num1 += ".";
            display.textContent = num1;
        }
    }
    else {
        if (!num2.includes(".")) {
            num2 += ".";
            display.textContent = num2;
        }
    }
});

backspace.addEventListener("click", () => {
    if (opr === "") {
        num1 = num1.slice(0, -1);
        display.textContent = num1;
    }
    else {
        num2 = num2.slice(0, -1);
        display.textContent = num2;
    }
});