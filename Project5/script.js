const display = document.querySelector('input[name="display"]');
const numberButtons = document.querySelectorAll('.button.number');
const operatorButtons = document.querySelectorAll('.button.operator');
const actionButtons = document.querySelectorAll('.button.action');

// Handle number button clicks
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        display.value += button.textContent;
    });
});

// Handle operator button clicks with validation
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        let value = button.textContent;
        const lastChar = display.value.slice(-1);

        if (value === '=') {
            try {
                // Replace X with * before evaluation
                const expression = display.value.replace(/X/g, '*');
                display.value = eval(expression);
            } catch {
                display.value = 'Error';
            }
        } else {
            // Prevent operator at start or double operator
            if (display.value === '' || /[+\-*/%X]/.test(lastChar)) return;
            display.value += value;
        }
    });
});

// Handle AC and DEL buttons
actionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.textContent;
        if (action === 'AC') {
            display.value = '';
        } else if (action === 'DEL') {
            display.value = display.value.slice(0, -1);
        }
    });
});