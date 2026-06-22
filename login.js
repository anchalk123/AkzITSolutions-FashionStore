function switchForm(targetForm) {
    // Forms and Tabs objects query
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');

    if (targetForm === 'register') {
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
        tabLogin.classList.remove('active');
        tabRegister.classList.add('active');
    } else {
        registerForm.classList.remove('active');
        loginForm.classList.add('active');
        tabRegister.classList.remove('active');
        tabLogin.classList.add('active');
    }
}

function togglePassView(inputId) {
    const passwordInput = document.getElementById(inputId);
    const icon = passwordInput.nextElementSibling;

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.remove('fa-regular', 'fa-eye');
        icon.classList.add('fa-solid', 'fa-eye-slash');
    } else {
        passwordInput.type = "password";
        icon.classList.remove('fa-solid', 'fa-eye-slash');
        icon.classList.add('fa-regular', 'fa-eye');
    }
}

function handleAuthLog(event, formType) {
    event.preventDefault();

    if (formType === 'login') {
        const email = document.getElementById('login-email').value;
        alert(`Success: Logging in with ${email}... Redirecting to Shop!`);
        window.location.href = 'shop.html';
    } else {
        alert('Account Created Successfully! Welcome to Lumora. Switching to Sign In...');
        switchForm('login');
    }
}