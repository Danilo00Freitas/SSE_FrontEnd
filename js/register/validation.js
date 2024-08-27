export function validateEmailField(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validatePasswordField(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
    return passwordRegex.test(password);
}

export function validatePhoneField(phone) {
    const phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phone);
}

export function validateZipField(zip) {
    const zipRegex = /^\d{8}$/;
    return zipRegex.test(zip);
}

export function validateAddressNumberField(number) {
    const numberRegex = /^\d+$/;
    return numberRegex.test(number);
}

export function validateFields(name, email, password, phone, zip, address, addressNumber, neighbourhood, city, state) {
    let errorList = [];

    // Validação de campos obrigatórios
    if (!name.trim()) {
        errorList.push('Nome não pode estar vazio!');
    }

    if (!address.trim()) {
        errorList.push('Endereço não pode estar vazio!');
    }

    if (!addressNumber.trim()) {
        errorList.push('Número do endereço não pode estar vazio!');
    }

    if (!neighbourhood.trim()) {
        errorList.push('Bairro não pode estar vazio!');
    }

    if (!city.trim()) {
        errorList.push('Cidade não pode estar vazia!');
    }

    // Validação de campos com regras complexas
    if (!validateEmailField(email)) {
        errorList.push('Email inválido!');
    }

    if (!validatePasswordField(password)) {
        errorList.push('Senha inválida!');
    }

    if (!validatePhoneField(phone)) {
        errorList.push('Telefone inválido!');
    }

    if (!validateZipField(zip)) {
        errorList.push('CEP inválido!');
    }

    if (!state.trim()) {
        errorList.push('Estado não pode estar vazio!');
    } 
    return errorList;
}

