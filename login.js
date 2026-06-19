class LoginForm {
    constructor(formId, submitBtnId) {
        this.form = document.getElementById(formId);
        this.submitBtn = document.getElementById(submitBtnId);

        this.correoElement = document.getElementById('correo');
        this.passwordElement = document.getElementById('password');

        this.correoErrorElement = document.getElementById('invalid-user');
        this.passErrorElement = document.getElementById('invalid-pass');

        this.form.addEventListener('submit', (event) => this.login(event));

        // Botones de autenticación externa (proveedor: google / apple)
        this.googleBtn = document.getElementById('googleLogin');
        this.appleBtn = document.getElementById('appleLogin');

        this.googleBtn.addEventListener('click', (event) => this.loginExterno(event, 'google'));
        this.appleBtn.addEventListener('click', (event) => this.loginExterno(event, 'apple'));
    }

    showError(inputElement, errorElement, message, duration = 3000) {
        errorElement.textContent = message;
        inputElement.focus();
        setTimeout(() => (errorElement.textContent = ''), duration);
    }

    toggleButton(enabled, text) {
        this.submitBtn.disabled = !enabled;
        this.submitBtn.textContent = text;
    }

    validateEmail(correo) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(correo);
    }

    login(event) {
        event.preventDefault();

        const correoValue = this.correoElement.value.trim();
        const passwordValue = this.passwordElement.value.trim();

        // Limpiar errores previos
        this.correoErrorElement.textContent = '';
        this.passErrorElement.textContent = '';

        // Validar correo
        if (correoValue === '') {
            return this.showError(this.correoElement, this.correoErrorElement, 'El correo no puede estar vacío');
        }
        if (!this.validateEmail(correoValue)) {
            return this.showError(this.correoElement, this.correoErrorElement, 'Ingresa un correo válido');
        }

        // Validar contraseña
        if (passwordValue === '') {
            return this.showError(this.passwordElement, this.passErrorElement, 'La contraseña no puede estar vacía');
        }

        // Aquí se debe enviar correoValue y passwordValue al backend
        // para validar contra la tabla Credenciales_Locales (id_usuario, password_hash)
        this.toggleButton(false, 'Ingresando...');
        setTimeout(() => {
            alert('Login simulado. Falta conectar con el backend (tabla Credenciales_Locales).');
            this.form.reset();
            this.toggleButton(true, 'Iniciar Sesión');
        }, 800);
    }

    loginExterno(event, proveedor) {
        event.preventDefault();
        // Aquí se debe iniciar el flujo OAuth del proveedor (Google / Apple)
        // y guardar el resultado en la tabla Autenticacion_Externa
        // (id_usuario, proveedor, proveedor_user_id)
        alert(`Login con ${proveedor} simulado. Falta integrar el SDK/OAuth de ${proveedor}.`);
    }
}

// eslint-disable-next-line no-unused-vars
const _loginForm = new LoginForm('loginForm', 'submitBtn');
