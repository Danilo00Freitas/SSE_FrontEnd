export async function triggerViaCepApi(cep) {
    const viaCepEndPoint = 'https://viacep.com.br/ws/' + cep + '/json/';

    try {
        const response = await fetch(viaCepEndPoint);
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Erro ao consultar o viaCep para pegar os dados de endereço', error);
    }
}
