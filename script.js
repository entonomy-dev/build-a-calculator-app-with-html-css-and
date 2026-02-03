// Calculator Class
class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
    }

    delete() {
        if (this.currentOperand === '0') return;
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
    }

    appendNumber(number) {
        // If we should reset screen (after operation), replace current operand
        if (this.shouldResetScreen) {
            this.currentOperand = '';
            this.shouldResetScreen = false;
        }

        // If current operand is 0, replace it (unless adding decimal point)
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
            return;
        }

        // Prevent multiple decimal points
        if (number === '.' && this.currentOperand.includes('.')) return;

        // Limit length to prevent overflow
        if (this.currentOperand.length >= 15) return;

        this.currentOperand += number;
    }

    chooseOperation(operation) {
        // If there's no current operand (or it's empty), can't choose operation
        if (this.currentOperand === '') return;

        // If there's a previous operand, calculate first
        if (this.previousOperand !== '') {
            this.calculate();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.shouldResetScreen = true;
    }

    calculate() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        // If either value is NaN, can't compute
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                if (current === 0) {
                    this.showError();
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }

        // Round to prevent floating point errors
        computation = Math.round(computation * 100000000) / 100000000;

        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.shouldResetScreen = true;
    }

    percentage() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        this.currentOperand = (current / 100).toString();
    }

    showError() {
        this.currentOperand = 'Error';
        this.previousOperand = '';
        this.operation = undefined;
        this.currentOperandElement.classList.add('error');

        setTimeout(() => {
            this.clear();
            this.updateDisplay();
            this.currentOperandElement.classList.remove('error');
        }, 1500);
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        // Add animation class
        this.currentOperandElement.classList.add('display-update');
        setTimeout(() => {
            this.currentOperandElement.classList.remove('display-update');
        }, 100);

        // Update current operand
        if (this.currentOperand === 'Error') {
            this.currentOperandElement.textContent = this.currentOperand;
        } else {
            this.currentOperandElement.textContent = this.getDisplayNumber(this.currentOperand);
        }

        // Update previous operand with operation
        if (this.operation != null) {
            const operatorSymbol = this.getOperatorSymbol(this.operation);
            this.previousOperandElement.textContent =
                `${this.getDisplayNumber(this.previousOperand)} ${operatorSymbol}`;
        } else {
            this.previousOperandElement.textContent = '';
        }
    }

    getOperatorSymbol(operation) {
        switch (operation) {
            case '+': return '+';
            case '-': return '−';
            case '*': return '×';
            case '/': return '÷';
            default: return '';
        }
    }
}

// Initialize Calculator
const previousOperandElement = document.getElementById('previousOperand');
const currentOperandElement = document.getElementById('currentOperand');
const calculator = new Calculator(previousOperandElement, currentOperandElement);

// Event Listeners for Number Buttons
const numberButtons = document.querySelectorAll('[data-number]');
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.dataset.number);
        calculator.updateDisplay();
    });
});

// Event Listeners for Operator Buttons
const operatorButtons = document.querySelectorAll('[data-operator]');
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.dataset.operator);
        calculator.updateDisplay();

        // Visual feedback for active operator
        operatorButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Event Listener for Equals Button
const equalsButton = document.querySelector('[data-action="equals"]');
equalsButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();

    // Remove active state from operators
    operatorButtons.forEach(btn => btn.classList.remove('active'));
});

// Event Listener for Clear Button
const clearButton = document.querySelector('[data-action="clear"]');
clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();

    // Remove active state from operators
    operatorButtons.forEach(btn => btn.classList.remove('active'));
});

// Event Listener for Delete Button
const deleteButton = document.querySelector('[data-action="delete"]');
deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

// Event Listener for Percent Button
const percentButton = document.querySelector('[data-action="percent"]');
percentButton.addEventListener('click', () => {
    calculator.percentage();
    calculator.updateDisplay();
});

// Keyboard Support
document.addEventListener('keydown', (e) => {
    // Numbers
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
        calculator.appendNumber(e.key);
        calculator.updateDisplay();
    }

    // Operators
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        calculator.chooseOperation(e.key);
        calculator.updateDisplay();

        // Visual feedback
        const operatorButton = document.querySelector(`[data-operator="${e.key}"]`);
        if (operatorButton) {
            operatorButtons.forEach(btn => btn.classList.remove('active'));
            operatorButton.classList.add('active');
        }
    }

    // Enter/Equals
    if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculator.calculate();
        calculator.updateDisplay();
        operatorButtons.forEach(btn => btn.classList.remove('active'));
    }

    // Backspace/Delete
    if (e.key === 'Backspace') {
        e.preventDefault();
        calculator.delete();
        calculator.updateDisplay();
    }

    // Escape/Clear
    if (e.key === 'Escape') {
        calculator.clear();
        calculator.updateDisplay();
        operatorButtons.forEach(btn => btn.classList.remove('active'));
    }

    // Percent
    if (e.key === '%') {
        calculator.percentage();
        calculator.updateDisplay();
    }
});

// Initial Display Update
calculator.updateDisplay();

// Add button press animation feedback
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });

    button.addEventListener('mouseup', function() {
        this.style.transform = '';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Prevent context menu on calculator
document.querySelector('.calculator').addEventListener('contextmenu', (e) => {
    e.preventDefault();
});
