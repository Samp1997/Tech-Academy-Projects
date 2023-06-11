//Creates an object to keep track of values
const Calculator = {
    Display_Value: '0',
    //This will hold the first operand for any expressions, we set it null for now.
    First_Operand: null,
    //This checks wether or not the second operand has been inputted by the user.
    Wait_Second_Operand: false,
    //This will hold the operator we set it to null for now.
    operator: null,
};

//This modifies values each time a button is clicked on.
function Input_Digit(digit) {
    const {Display_Value, Wait_Second_Operand } = Calculator;

    if (Wait_Second_Operand === true) {
        Calculator.Display_Value = digit;
        Calculator.Wait_Second_Operand = false;
    } else {
        Calculator.Display_Value = Display_Value === '0' ? digit : Display_Value + digit;
    }
}

//this handles decimal points.
function Input_Decimal(dot) {
    if (Calculator.Wait_Second_Operand === true) return;
    if (!Calculator.Display_Value.includes(dot)) {
        Calculator.Display_Value += dot;
    }
}

//this handles operators
function Handle_Operator(Next_Operator) {
    const {First_Operand, Display_Value, operator} = Calculator;

    const Value_of_Input = parseFloat(Display_Value);

    if (operator && Calculator.Wait_Second_Operand) {
        Calculator.operator = Next_Operator;
        return;

    }
    if (First_Operand == null) {
        Calculator.First_Operand = Value_of_Input;
    } else if (operator) {
        const Value_Now = First_Operand = First_Operand || 0;

        let results = Perform_Calulation[operator] (Value_Now, Value_of_Input);

        results = Number(results).toFixed (9);
        results = (results *1).toString();
        Calculator.Display_Value = parseFloat(results);
        Calculator.First_Operand = parseFloat(results);
    } 
    Calculator.Wait_Second_Operand = true;
    Calculator.operator = Next_Operator;
}

const Perform_Calulation = {
    '/': (First_Operand, Second_Operand) => First_Operand / Second_Operand,
    '*': (First_Operand, Second_Operand) => First_Operand * Second_Operand,
    '+': (First_Operand, Second_Operand) => First_Operand + Second_Operand,
    '-': (First_Operand, Second_Operand) => First_Operand - Second_Operand,
    '=': (First_Operand, Second_Operand) => Second_Operand
};
function Calculator_Reset() {
    Calculator.Display_Value = '0';
    Calculator.First_Operand = null;
    Calculator.Wait_Second_Operand = false;
    Calculator.operator = null;
}
//This function updates the Calculator screen with Display_Value
function Update_Display() {
    const display = document.querySelector('.calculator-screen');
    display.value = Calculator.Display_Value;
}

Update_Display();
//this section monitors button clicks
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click' , (event) => {
    const { target } = event;

    if (!target.matches('button')) {
        return;
    }
    if (traget.classList.contains('operator')) {
        Handle_Operator(target.value);
        Update_Display();
        return
    }
    if (target.classList.contains('decimal')) {
        Input_Decimal(target.value);
        Update_Display();
        return;
    }
    //Ensures that AC clears all
    if (target.classList.contains('All-clear')) {
        Calculator_Reset();
        Update_Display();
        return;
    }
    Input_Digit(target.value);
    Update_Display();
})