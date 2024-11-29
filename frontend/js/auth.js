// Handle the signup form submission
document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        email: formData.get('email'),
        password: formData.get('password'),
        country: formData.get('country'),
        cohort: formData.get('cohort'),
    };

    try {
        const response = await fetch('https://your-backend-api.com/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (result.success) {
            window.location.href = 'login.html'; // Redirect to login page after successful signup
        } else {
            alert(result.message); // Show error message
        }
    } catch (error) {
        console.error('Error signing up:', error);
        alert('An error occurred. Please try again.');
    }
});

// Handle the login form submission
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
    };

    try {
        const response = await fetch('https://your-backend-api.com/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (result.success) {
            localStorage.setItem('userToken', result.token);
            window.location.href = 'dashboard.html'; // Redirect to dashboard after successful login
        } else {
            alert(result.message); // Show error message
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('An error occurred. Please try again.');
    }
});
