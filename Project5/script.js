const display = document.querySelector('input[name="display"]');
const numberButtons = document.querySelectorAll('.button.number');
const operatorButtons = document.querySelectorAll('.button.operator');
const actionButtons = document.querySelectorAll('.button.action');

const operatorSymbols = ['+', '-', '%', '÷', '×'];

function isLastCharOperator(val) {
    return operatorSymbols.includes(val.slice(-1));
}

// Add number to display
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        display.value += button.textContent;
    });
});

// Handle operator clicks
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === '=') {
            if (display.value === '' || isLastCharOperator(display.value)) return;

            try {
                const expression = display.value
                    .replace(/×/g, '*')
                    .replace(/÷/g, '/');
                display.value = eval(expression);
            } catch {
                display.value = 'Error';
            }
        } else {
            if (display.value === '' || isLastCharOperator(display.value)) return;
            display.value += value;
        }
    });
});

// Handle AC and DEL
actionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.textContent;
        if (action === 'AC') display.value = '';
        else if (action === 'DEL') display.value = display.value.slice(0, -1);
    });
});

// ✅ Optional: Keyboard support
window.addEventListener('keydown', (e) => {
    const key = e.key;

    if (!isNaN(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
        display.value += key;
    } else if (key === 'Enter') {
        try {
            const expression = display.value
                .replace(/×/g, '*')
                .replace(/÷/g, '/');
            display.value = eval(expression);
        } catch {
            display.value = 'Error';
        }
    } else if (key === 'Backspace') {
        display.value = display.value.slice(0, -1);
    } else if (key === 'Escape') {
        display.value = '';
    }
});