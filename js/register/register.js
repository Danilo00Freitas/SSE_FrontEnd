import {
    triggerViaCepApi
} from './viaCep.js';

import {
    validateFields,
    validateZipField
} from './validation.js';

import {
    showEmailCriteria,
    hideEmailCriteria,
    showPasswordCriteria,
    hidePasswordCriteria,
    showPhoneCriteria,
    hidePhoneCriteria,
    showZipCriteria,
    hideZipCriteria
} from './popUps.js';

// FUNÇÕES RELACIONADAS A EXIBIÇÃO DOS POP-UPS INFORMATIVOS
document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('focus', showEmailCriteria);
    emailInput.addEventListener('blur', hideEmailCriteria);

    const passwordInput = document.getElementById('password');
    passwordInput.addEventListener('focus', showPasswordCriteria);
    passwordInput.addEventListener('blur', hidePasswordCriteria);

    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('focus', showPhoneCriteria);
    phoneInput.addEventListener('blur', hidePhoneCriteria);

    const zipInput = document.getElementById('zip');
    zipInput.addEventListener('focus', showZipCriteria);
    zipInput.addEventListener('blur', hideZipCriteria);
});


// INTERAGINDO COM A API DA VIA CEP NO FORMULÁRIO
const cepInput = document.getElementById('zip');
cepInput.addEventListener('input', async function () {
    if (cepInput.value.trim().length === 8) {
        if (validateZipField(cepInput.value)) {
            const viaCepJson = await triggerViaCepApi(cepInput.value);
            document.getElementById('address').value = viaCepJson.logradouro;
            document.getElementById('neighbourhood').value = viaCepJson.bairro;
            document.getElementById('city').value = viaCepJson.localidade;
            document.getElementById('state').value = viaCepJson.uf;
        } else {
            showZipCriteria();
        }
    }
});

// FUNÇÕES RELACIONADAS A VALIDAÇÃO DAS INFORMAÇÕES NO MOMENTO QUE CLICAMOS EM CADASTRAR

document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submitBtn');

    submitBtn.addEventListener('click', async function (event) {
        event.preventDefault(); // Previne o comportamento padrão do botão de submit

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value;
        const zip = document.getElementById('zip').value;
        const address = document.getElementById('address').value;
        const addressNumber = document.getElementById('addressNumber').value;
        const neighbourhood = document.getElementById('neighbourhood').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value.toUpperCase();

        const errorList = validateFields(name, email, password, phone, zip, address, addressNumber, neighbourhood, city, state);

        if (errorList.length === 0) {
            const requestBody = {
                name,
                email,
                password
            };

            try {
                const response = await fetch('http://localhost:8080/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody),
                    credentials: 'include'
                });

                if (response.ok) {
                    alert('Cadastro realizado com sucesso!');
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Network response was not ok');
                }
            } catch (error) {
                console.error('There was an error while registering', error);
                alert(`Erro ao realizar cadastro: ${error.message}`);
            }
        } else {
            alert(errorList.join('\n'));
        }
    });
});