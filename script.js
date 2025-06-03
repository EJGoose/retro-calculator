//Variable selecting the expression screen
const displayExpression = document.querySelector(".expression");
const displayResult = document.querySelector(".result");
let answerInBrackets = 0
let theAnswer = []

//hide or expand the calculator
function expandCalculator() {
    let calculatorHide = document.querySelector(".calculator");
    calculatorHide.classList.toggle("calculator-hide");
};

//Add the pressed button value to the screen
function calculatorInput(buttonValue) {
    displayExpression.innerHTML += buttonValue;
};


//Clear the calculator Screen
function calculatorClear() {
    displayExpression.innerHTML = "";
    displayResult.innerHTML = "";
};

//Evaluate the expression, so it can be processed in the correct order
function calculatorEvaluate (calculationArray) {
    theAnswer = []
    if (calculationArray.includes('(')) {
        return brackets(calculationArray)
    } else if (calculationArray.includes('/')) {
        return divide(calculationArray)
    } else if (calculationArray.includes('*')) {
        return multiplication(calculationArray)
    } else if (calculationArray.includes('+')) {
        return addition(calculationArray)
    } else if (calculationArray.includes('-')) {
        return subtraction(calculationArray)
    } else {
        theAnswer = calculationArray[0]
        answerInBrackets = calculationArray[0]                
    }
};

//process the calculation array
function cleanUp(calculationArray, startLocation, endLocation, answer) {
    //console.log("the array is: ", calculationArray)
    //console.log("the answer is: ", answer)

    //check if the answer contains an error
    if (isNaN(answer)) {
        window.alert("Error, answer value is not a number");
        theAnswer = ['Error'];
        return theAnswer
    }
    let toRemove = []
    let calculatedArray = [] 
    //the area of the array including the brackets
    for (let i = startLocation; i != endLocation + 1; i++) {
        toRemove.push(i)
    };
    //filter out the area we have just processed
    calculationArray = calculationArray.filter((value, index) => !toRemove.includes(index));
    //fill in the evaluated answer
    let truncatedArray = calculationArray.splice(startLocation,0,answer);
    //call the funciton again now that the brackets have been removed
    //console.log("spliced array:", calculationArray)
    calculatorEvaluate(calculationArray);
};

//calculate the values in the brackets
function brackets(calculationArray) {
    //console.log("Brackets detected")
    //find location of first bracket
    let openBracketLocation = calculationArray.indexOf('(');
    //find location of first closing bracket
    let closeBracketLocation = calculationArray.indexOf(')');
    let errorCheck = closeBracketLocation-openBracketLocation;
    //console.log("error check: ",errorCheck);
    //Make sure the brackets do contain an expression
    if (errorCheck < 4) {
        window.alert("Error brackets must contain more than a single value")
    } else {
        if (calculationArray.at(openBracketLocation-1) == '') {
            //the area of the array excluding brackets
            let inBrackets = calculationArray.slice(openBracketLocation + 1, closeBracketLocation);
            //evaluate the expression within the brackets
            calculatorEvaluate(inBrackets);
            //take the answer and fill in the array
            cleanUp(calculationArray, openBracketLocation -1, closeBracketLocation +1, answerInBrackets);
        } else {
            //detect two adjacent values and multiply them together
            let splicedArray = calculationArray.splice(openBracketLocation, 0, '*')
            //console.log("add in the multiply symbol ", calculationArray)
            openBracketLocation = calculationArray.indexOf('(');
            closeBracketLocation = calculationArray.indexOf(')');
            let inBrackets = calculationArray.slice(openBracketLocation + 1, closeBracketLocation);
            //evaluate the expression within the brackets
            calculatorEvaluate(inBrackets);
            //take the answer and fill in the array
            cleanUp(calculationArray, openBracketLocation, closeBracketLocation, answerInBrackets);
        }
    }
};

//perform a division
function divide(calculationArray) {
    //console.log("division detected")
    let divisionLocation = calculationArray.indexOf('/');
    //get the value of the numerator
    let numerator = parseFloat(calculationArray[divisionLocation - 1]);
    //get the value of the denominator
    let denominator =  parseFloat(calculationArray[divisionLocation + 1]);
    //perform division
    if (denominator != 0) {
        let result = numerator / denominator;
        cleanUp(calculationArray, divisionLocation - 1, divisionLocation + 1, result)
    //provide an alert 
    } else {
        window.alert("Cannot divide by 0")
    };
};

//perform a multiplication
function multiplication(calculationArray) {
    //console.log("multiplication detected")
    let multiplicationLocation = calculationArray.indexOf('*');
    //find the values to be multiplied
    let multiplier = parseFloat(calculationArray[multiplicationLocation - 1]);
    let multiplicand =  parseFloat(calculationArray[multiplicationLocation + 1]);
    //perform multiplication
    let result = multiplier * multiplicand;
    cleanUp(calculationArray, multiplicationLocation - 1, multiplicationLocation + 1, result)
};

//perform addition
function addition(calculationArray) {
    //console.log("addition detected")
    //find the values to be added
    let additionLocation = calculationArray.indexOf('+');
    let addend1 = parseFloat(calculationArray[additionLocation - 1]);
    let addend2 =  parseFloat(calculationArray[additionLocation + 1]);
    //perform addition
    let result = addend1 + addend2;
    cleanUp(calculationArray, additionLocation - 1, additionLocation + 1, result)
};

//perform subtraction
function subtraction(calculationArray) {
    //console.log("subtraction detected")
    //find the values to be subtracted
    let subtractionLocation = calculationArray.indexOf('-');
    let minuend = parseFloat(calculationArray[subtractionLocation - 1]);
    let subtrahend =  parseFloat(calculationArray[subtractionLocation + 1]);
    //perform subtraction
    let result = minuend - subtrahend;
    cleanUp(calculationArray, subtractionLocation - 1, subtractionLocation + 1, result)
};


//Return the Answer
function calculatorAnswer() {
    //console.log("########### START DEBUGGING HERE ###########")
    const calculation = displayExpression.innerHTML;
    let calculationArray = calculation.split(" ");
    //check for blanks
    calculationArray.forEach(e => {
        if (e == '') {
            let index = calculationArray.indexOf(e);
            calculationArray.splice(index, 1);
        };
    });
    //console.log(calculationArray)
    calculatorEvaluate(calculationArray);
    //show answer to user
    displayResult.innerHTML =`= ${theAnswer}`; 
};
