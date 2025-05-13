
console.log("Script loaded!");

function showFeature(id) {
    const features = document.querySelectorAll('.feature-content');
    features.forEach(feature => feature.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function predictSideEffects() {
    const drugs = document.getElementById('side-effect-input').value.trim();
    const output = document.getElementById('side-effect-results');

    if (!drugs) {
        alert("Please enter drug names.");
        return;
    }

    const dummyEffects = {
        "DrugA": ["Nausea", "Headache"],
        "DrugB": ["Fatigue", "Dizziness"],
        "default": ["Dry Mouth", "Insomnia"]
    };

    const drugList = drugs.split(',').map(d => d.trim());
    let allEffects = [];

    drugList.forEach(drug => {
        if (dummyEffects[drug]) {
            allEffects = allEffects.concat(dummyEffects[drug]);
        } else {
            allEffects = allEffects.concat(dummyEffects["default"]);
        }
    });

    output.innerHTML = `<h5>Predicted Side Effects:</h5><ul>${[...new Set(allEffects)].map(e => `<li>${e}</li>`).join('')}</ul>`;
}

function mixMatchDrugs() {
    // Disable the button during the processing to prevent multiple clicks
    const button = document.querySelector('#mix-match button');
    button.disabled = true;
    button.textContent = 'Analyzing...';

    // Send a request to the backend to mix and match drugs
    fetch('/mix-and-match', {  // Make sure the endpoint matches your backend route
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            drugs: ['DrugA', 'DrugB', 'DrugC'] // Example drug list, can be dynamic if needed
        })
    })
    .then(response => response.json())
    .then(data => {
        // Enable the button and reset text
        button.disabled = false;
        button.textContent = 'Analyze';

        // Display the results
        const resultDiv = document.getElementById('mix-match-results');
        
        if (data.success) {
            resultDiv.innerHTML = `
                <h5>Predicted Disease(s):</h5>
                <ul>
                    ${data.diseases.map(disease => `<li>${disease}</li>`).join('')}
                </ul>
                <h5>Accuracy: ${data.accuracy}%</h5>
            `;
        } else {
            resultDiv.innerHTML = `<p>Error: ${data.error}</p>`;
        }
    })
    .catch(error => {
        // Handle any errors from the backend
        button.disabled = false;
        button.textContent = 'Analyze';
        document.getElementById('mix-match-results').innerHTML = `<p>Error occurred. Please try again later.</p>`;
        console.error('Error:', error);
    });
}

    // Function to search for drug information (this is a placeholder function)
function searchDrugInfo() {
    const drugName = document.getElementById('drug-name').value.trim();
    const resultContainer = document.getElementById('drug-info-results');

    if (!drugName) {
        alert("Please enter a drug name.");
        return;
    }

    // For demonstration purposes, you can use a dummy data object
    const drugDatabase = {
        "Aspirin": {
            components: "Acetylsalicylic Acid",
            sideEffects: ["Nausea", "Stomach Pain", "Dizziness"],
            diseases: ["Pain", "Inflammation", "Fever"]
        },
        "Paracetamol": {
            components: "Acetaminophen",
            sideEffects: ["Liver Damage", "Rashes", "Nausea"],
            diseases: ["Pain", "Fever"]
        },
        "Ibuprofen": {
            components: "Ibuprofen",
            sideEffects: ["Upset Stomach", "Dizziness", "Heartburn"],
            diseases: ["Inflammation", "Pain"]
        }
    };

    // Search the database for the drug name
    if (drugDatabase[drugName]) {
        const drugInfo = drugDatabase[drugName];
        resultContainer.innerHTML = `
            <h5>Drug Information for ${drugName}:</h5>
            <ul>
                <li><strong>Components:</strong> ${drugInfo.components}</li>
                <li><strong>Side Effects:</strong> ${drugInfo.sideEffects.join(', ')}</li>
                <li><strong>Used for Diseases:</strong> ${drugInfo.diseases.join(', ')}</li>
            </ul>
        `;
    } else {
        resultContainer.innerHTML = `<p>No information found for ${drugName}.</p>`;
    }
}
// script.js for Email Validation

function validateEmail() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Basic validation (can add more)
    if (email.trim() === "" || password.trim() === "") {
        alert("Please fill in all fields.");
        return false;
    }

    // Simulate login success
    sessionStorage.setItem("userType", "general");

    // Redirect to general user dashboard page
    window.location.href = "user-dashboard.html";  // make sure this file exists!

    return false; // prevent default form submission
}



// Logout functionality
document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logout");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            // Clear local storage (or session if used)
            localStorage.clear();
            sessionStorage.clear();

            // Redirect to login page
            window.location.href = "login.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const emailInput = document.getElementById("email");
            const passwordInput = document.getElementById("password");

            const email = emailInput.value.trim();
            const password = passwordInput.value;

            // ✅ Check if email ends with "gmail.com"
            if (!email.endsWith("@gmail.com")) {
                alert("Only gmail.com emails are allowed!");
                return;
            }

            // ✅ Proceed with login (you can add more logic or backend call here)
            localStorage.setItem("userEmail", email);
            window.location.href = "dashboard.html";
        });
    }

    // Logout functionality (in case it's not already here)
    const logoutBtn = document.getElementById("logout");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = "login.html";
        });
    }
});
