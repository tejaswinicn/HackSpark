/* script.js */
function getUserDrug() {
    const disease = document.getElementById('user-disease-input').value;
    // Replace with backend call
    document.getElementById('user-drug-result').innerText = `Recommended drug for ${disease}: Paracetamol (500mg)`;
}

function getUserSideEffects() {
    const drug = document.getElementById('user-sideeffect-input').value;
    // Replace with backend call
    document.getElementById('user-sideeffect-result').innerText = `Side effects of ${drug}: Nausea, Drowsiness.`;
}

function getUserDescription() {
    const drug = document.getElementById('user-description-input').value;
    // Replace with backend call
    document.getElementById('user-description-result').innerText = `${drug} is an anti-inflammatory drug used to treat fever and mild pain.`;
}
// script.js

// Function to handle Logout
function logout() {
    // Clear any session data (if using sessionStorage)
    sessionStorage.removeItem("userType");  // Remove user type or any other session data

    // Redirect to login page
    window.location.href = 'index.html';  // Redirect to role selection page (or login page)
}

// Add additional functionality to handle user login state
window.onload = function() {
    const path = window.location.pathname;

    // Only check login status if NOT on the login page
    if (!path.includes("user-login.html") && !sessionStorage.getItem("userType")) {
        window.location.href = 'index.html';  // redirect only if not logged in AND not on login page
    }
};

function redirectToUserLogin() {
    window.location.href = "user_login.html"; // make sure this file exists
}
function handleSignup() {
    // Handle form validation or other actions here if needed
    
    // Redirect to user dashboard after successful sign-up
    window.location.href = 'dashboard.html'; // Make sure this path is correct
    return false; // Prevent form from actually submitting (to avoid page refresh)
}


