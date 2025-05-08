document.getElementById('getUser').addEventListener('click', getRandomUser);

async function getRandomUser() {
    const userInfo = document.getElementById('userInfo');
    userInfo.innerHTML = '<p>Loading...</p>';

    try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const user = data.results[0];

        userInfo.innerHTML = `
                <img src="${user.picture.large}" alt="User Picture">
                <p><strong>Name:</strong> ${user.name.first} ${user.name.last}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Location:</strong> ${user.location.city}, ${user.location.country}</p>
                `;
    } catch (error) {
        userInfo.innerHTML = '<p>⚠️ Failed to load user. Try again.</p>';
        console.error(error);
    }
}