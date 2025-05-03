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
        const value = button.textContent;
        const lastChar = display.value.slice(-1);

        if (value === '=') {
            try {
                display.value = eval(display.value);
            } catch {
                display.value = 'Error';
            }
        } else {
            // Prevent operator if input is empty or last char is an operator
            if (display.value === '' || /[+\-*/%]/.test(lastChar)) return;

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