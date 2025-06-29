// Animate form appearance
const formContainer = document.querySelector('.form');
if (formContainer) {
    const form = [...formContainer.children];
    form.forEach((item, i) => {
        setTimeout(() => {
            item.style.opacity = 1;
        }, i * 100);
    });
}

// Redirect if already logged in
window.onload = () => {
    if (sessionStorage.name) {
        location.href = '/';
    }
};

// Get input fields and button
const name = document.querySelector('.name') || null;
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const submitBtn = document.querySelector('.submit-btn');

// Login Page
if (!name) {
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        fetch('/login-user', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('Login Successful');
                validateData(data.user);
            } else {
                alertBox(data.message || 'Login failed');
            }
        })
        .catch(err => {
            console.error(err);
            alertBox('Server error');
        });
    });
} else {
    // Register Page
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        fetch('/register-user', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                password: password.value
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('Registration Successful');
                validateData(data.user);
            } else {
                alertBox(data.message || 'Registration failed');
            }
        })
        .catch(err => {
            console.error(err);
            alertBox('Server error');
        });
    });
}

// Redirect and save session info
const validateData = (data) => {
    if (!data.name || !data.email) {
        alertBox('Invalid user data received');
    } else {
        sessionStorage.name = data.name;
        sessionStorage.email = data.email;
        location.href = '/';
    }
};

// Show message on the page instead of alert()
const alertBox = (message) => {
    const alertContainer = document.querySelector('.alert-box');
    const alertMsg = document.querySelector('.alert');

    if (alertContainer && alertMsg) {
        alertMsg.innerText = message;
        alertContainer.style.top = `5%`;
        setTimeout(() => {
            alertContainer.style.top = null;
        }, 5000);
    } else {
        alert(message); // Fallback if alert-box isn't in the DOM
    }
};
