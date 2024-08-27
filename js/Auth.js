// js/Auth.js

export async function login(email, password) {
    const requestBody = {
        email,
        password
    };
    console.log('Request body:', requestBody);

    try {
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody),
            credentials: 'include' // Inclui cookies e credenciais na solicitação
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.token) {
            sessionStorage.setItem('token', data.token); // Armazena o token no localStorage
            sessionStorage.setItem('userName', data.name);
        }
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

export async function accessUserPage() {
    try {
        const response = await fetch('http://localhost:8080/user', {
            method: 'GET',
            headers: {
                // pegando o token armazenado no sessionStorage
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            credentials: 'include' //novamente incluindo os cookies e as credenciais na solicitação (ainda não tenho certeza da utilidade)
        });
        if (response.ok) {
            return true;

        } else {
            console.error('Authentication failed:', response.statusText);
            sessionStorage.clear();
            return false; //retorno false indica que tivemos um problema para autenticar...
        }

    } catch (error) {
        console.error('There was a problem while trying to authenticate you', error);
        sessionStorage.clear();
        return false; //retorno false indica que tivemos um problema para autenticar...
    }

}