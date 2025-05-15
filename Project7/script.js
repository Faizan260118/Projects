const URL = "https://official-joke-api.appspot.com/random_joke";
const btn = document.querySelector("#btn");
const text = document.querySelector("#text");
const text2 = document.querySelector("#text2");
const loader = document.querySelector("#loader");
const jokeBox = document.querySelector("#joke-box");

async function getJoke() {
    loader.classList.add("active");
    loader.classList.remove("visible");
    text.textContent = "";
    text2.textContent = "";
    btn.disabled = true;

    try {
        const res = await fetch(URL);
        if (!res.ok) throw new Error("Network error");

        const data = await res.json();

        text.textContent = `Ask: ${data.setup}`;
        text2.textContent = `Punchline: ${data.punchline}`;

        setTimeout(() => {
            jokeBox.classList.add("visible");
        }, 100);
    } catch (err) {
        text.textContent = "Oops! Something went wrong.";
        text2.textContent = "";
        console.error(err);
    } finally {
        loader.classList.remove("active");
        btn.disabled = false;
    }
}

// Event: Button click
btn.addEventListener("click", getJoke);

// Auto-load a joke on first page load
window.addEventListener("DOMContentLoaded", getJoke);