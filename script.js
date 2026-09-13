let num1 = "";
let opr = "";
let num2 = "";

const digits = document.querySelectorAll(".btn button");
const operators = document.querySelectorAll(".operator button")
const display = document.getElementById("display");
const equals = document.getElementById("equalTo");
const clear = document.getElementById("clear");

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

/*  Access the operator by their class name istead of the content (i.e, by "add", "subtract"  instead of "+", "-" so on  */
const oprFn = { add, subtract, multiply, divide };


/*  Takes the desired operator and calls the function according to it */
function operator(opr, a, b) {
    return opr(a,b);
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
    console.log(num1);
    console.log(num2);
}

digits.forEach((digit) => {
    digit.addEventListener("click", () => {
        let value = digit.textContent.trim(); /* access the value of the clicked button and removes all the white spaces (value = 1) */

        updateVariables(value);
    })
});

operators.forEach((optr) => {
    optr.addEventListener("click", () => {
        let nextOperator = oprFn[optr.className];

        if (num1 !== "" && num2 !== "" && opr !== "") {
            let a = parseFloat(num1);
            let b = parseFloat(num2);
            let result = operator(opr, a, b);
            display.textContent = result;
            num1 = result;
            num2 = "";
        }
        
        opr = nextOperator;    
    });
});

equals.addEventListener("click", () => {
    display.textContent = "dummy text";
})

clear.addEventListener("click", () => {
    num1 = "";
    num2 = "";
    opr = "";
    display.textContent = "0";
})
