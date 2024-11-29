// Check if the user is logged in and display their name
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('userToken');
    if (token) {
        const username = "John Doe"; // Example, you would fetch this from your API
        document.getElementById('username').textContent = username;
    } else {
        window.location.href = 'login.html'; // Redirect to login page if not logged in
    }
});
