const display = document.querySelector('input[name="display"]');
    const numberButtons = document.querySelectorAll('.button.number');
    const operatorButtons = document.querySelectorAll('.button.operator');
    const actionButtons = document.querySelectorAll('.button.action');

    // Utility function to check if last character is an operator
    function isLastCharOperator(val) {
        return /[+\-/%X]/.test(val.slice(-1));
    }

    // Handle number button clicks
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            display.value += button.textContent;
        });
    });

    // Handle operator button clicks
    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value === '=') {
                if (display.value === '' || isLastCharOperator(display.value)) return;

                try {
                    // Replace 'X' with '*' before evaluation
                    const expression = display.value.replace(/X/g, '*');
                    display.value = eval(expression);
                } catch {
                    display.value = 'Error';
                }
            } else {
                // Prevent operator at start or repeated operators
                if (display.value === '' || isLastCharOperator(display.value)) return;
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