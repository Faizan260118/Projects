const form = document.getElementById('bmi-form');
const results = document.getElementById('results');
const restartBtn = document.getElementById('restart-btn');
const toggleThemeBtn = document.getElementById('toggle-theme');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const height = parseFloat(document.getElementById('height').value.trim());
    const weight = parseFloat(document.getElementById('weight').value.trim());

    if (isNaN(height) || height <= 0) {
        results.innerHTML = `⚠️ Please enter a valid height.`;
        return;
    }
    if (isNaN(weight) || weight <= 0) {
        results.innerHTML = `⚠️ Please enter a valid weight.`;
        return;
    }

    const bmi = (weight / ((height * height) / 10000)).toFixed(2);

    if (bmi < 18.6) {
        results.innerHTML = `🔵 Your BMI is ${bmi} — You are <b>Underweight</b>.`;
    } else if (bmi >= 18.6 && bmi <= 24.9) {
        results.innerHTML = `🟢 Your BMI is ${bmi} — You are in <b>Normal weight</b>.`;
    } else {
        results.innerHTML = `🟠 Your BMI is ${bmi} — You are <b>Overweight</b>.`;
    }

    restartBtn.style.display = 'block';
});

restartBtn.addEventListener('click', function () {
    form.reset();
    results.innerHTML = '';
    restartBtn.style.display = 'none';
});

toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleThemeBtn.textContent =
        document.body.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';
});
