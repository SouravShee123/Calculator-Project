/* ==========================================================================
   GLOBAL STATE & VARIABLES
   ========================================================================== */
let num1 = "";           
let opr = "";            
let num2 = "";          
let justEvaluated = false; // Flag: true if = was just clicked (starts fresh on next digit)

/* ==========================================================================
   DOM ELEMENTS
   ========================================================================== */
const digits = document.querySelectorAll(".btn button");
const operators = document.querySelectorAll(".operator button");
const display = document.getElementById("display");
const equals = document.getElementById("equalTo");
const clear = document.getElementById("clear");
const decimal = document.getElementById("decimal");
const backspace = document.getElementById("backspace");

/* ==========================================================================
   BASIC MATH FUNCTIONS
   ========================================================================== */
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

/* Map button class names ("add", "subtract", etc.) directly to JS functions */
const oprFn = { add, subtract, multiply, divide };

/* Calls the passed operator function on numbers a and b */
function operator(opr, a, b) {
    return opr(a, b);
}

/* ==========================================================================
   HELPER FUNCTIONS & LOGIC
   ========================================================================== */

/* Appends typed digit to whichever number is currently active (num1 or num2) */
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

/* Resets all state variables back to initial blank state */
function resetAll() {
    num1 = "";
    num2 = "";
    opr = "";
    justEvaluated = false;
}

/* Executes math operation, handles rounding & div-by-zero errors, updates display */
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

/* ==========================================================================
   EVENT LISTENERS
   ========================================================================== */


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

/* Operator Buttons: Handles + - * / clicks & triggers calculation if chaining */
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

/* Decimal Button: Appends "." to active number if it doesn't already have one */
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