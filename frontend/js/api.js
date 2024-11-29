// Base URL for the API (Replace this with your actual backend URL)
const API_BASE_URL = 'https://your-backend-api.com/api';

// Helper function to make a POST request
async function postData(endpoint, data) {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error making POST request:', error);
        throw error;
    }
}

// Helper function to make a GET request
async function getData(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error making GET request:', error);
        throw error;
    }
}

// Helper function to make a PUT request
async function putData(endpoint, data) {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error making PUT request:', error);
        throw error;
    }
}

// Helper function to make a DELETE request
async function deleteData(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: 'DELETE',
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error making DELETE request:', error);
        throw error;
    }
}

// Example usage for signup (calls the API to create a user)
async function signupUser(userData) {
    const result = await postData('auth/signup', userData);
    return result;
}

// Example usage for login (calls the API to authenticate user)
async function loginUser(credentials) {
    const result = await postData('auth/login', credentials);
    return result;
}

// Example usage for fetching user data
async function fetchUserData() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        throw new Error('User is not authenticated');
    }
    const result = await getData('user/data'); // Example endpoint
    return result;
}

// Example usage for updating user profile
async function updateUserProfile(profileData) {
    const result = await putData('user/profile', profileData);
    return result;
}

// Example usage for deleting user account
async function deleteUserAccount() {
    const result = await deleteData('user/delete');
    return result;
}

// Exporting functions to use in other files
export { signupUser, loginUser, fetchUserData, updateUserProfile, deleteUserAccount };
