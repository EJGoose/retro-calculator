# retro-calculator
A retro-styled calculator that allows users to perform basic mathematical operations in style using functions and template literals.

#### Key Concepts
- Processing Maths operations in Javascript
- Creating and calling functions 
- Event handling
- template literals
- Recursive functions
  
#### File Overviews
- index.html - simple HTML file containing the structure of the calculator and the onclick buttons which operate the JavaScript calculator.
- styles.css - simple CSS classes that create the retro look of the calculator
- script.js
    - expandCalculator - This function toggles the calculator visibility using CSS classes.
    - calculatorInput - This function takes the value of the button pressed and appends it to the display
    - calculatorClear - clears the calculator's screen
    - calculatorEvaluate - This function takes the array of values in the expression bar of the calculator and determines the next mathematical operation to perform until there is only the answer left.
    - cleanUp - checks if the answer is a number, if not returns an error, otherwise filters the array to remove the items we just processed. Call the calculatorEvaluate again with the reduced array.
    - brackets - find the location of the brackets and ensure they contain a real expression. Calculate the value inside the brackets and replace them with this value in the expression.
    - divide - parse the numerator and the denominator into float values and then if the denominator is not zero perform a division.
    - multiplication - parse the values to multiply into floats and then perform a multiplication
    - addition - parse the values to add into floats and add them together
    - subtraction - parse the values to subtract into floats and subtract them
    - calculatorAnswer - get the expression and split it into an array, and place it in the calculator before displaying the answer.
