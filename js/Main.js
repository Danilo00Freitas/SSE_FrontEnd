import {
    login
} from '/js/Auth.js';
import {
    accessUserPage
} from '/js/Auth.js';

window.addEventListener('beforeunload', function () {
    sessionStorage.clear(); // Limpa o sessionStorage quando o usuário sair da página
});

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            console.log('Tentando fazer login com o email:', email);

            try {
                const data = await login(email, password);

                console.log('Iniciando validação do token...');
                const validationSuccess = await accessUserPage();

                if (validationSuccess) {
                    window.location.href = '/pages/user-page.html';
                } else {
                    alert('Falha na validação do token. Você será redirecionado para a página de login.');
                    sessionStorage.clear();
                    window.location.href = '/index.html';
                }
            } catch (error) {
                console.error('Erro ao autenticar:', error);
            }
        });
    } else {
        console.warn('Login form não encontrado na página.');
    }
});