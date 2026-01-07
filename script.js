let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

function appendToDisplay(value) {
    if (value === '.' && currentInput.includes('.')) return;
    currentInput += value;
    display.textContent = currentInput;
}

function setOperator(op) {
    if (currentInput) {
        if (previousInput && operator) {
            calculate();
        }
        previousInput = currentInput;
        operator = op;
        currentInput = '';
    }
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    display.textContent = '0';
}

function calculate() {
    if (previousInput && currentInput && operator) {
        let result;
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);
        switch (operator) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '/':
                if (curr === 0) {
                    display.textContent = 'Error';
                    return;
                }
                result = prev / curr;
                break;
            default:
                return;
        }
        display.textContent = result;
        currentInput = result.toString();
        previousInput = '';
        operator = '';
    }
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        if (currentInput) {
            if (previousInput && operator) {
                calculate();
            }
            previousInput = currentInput;
            operator = key;
            currentInput = '';
        }
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    }
});
