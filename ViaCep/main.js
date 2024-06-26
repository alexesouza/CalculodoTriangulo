//função para limpar o formulário;
function limparFormulario() {
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

//Validando se o CEP tem apenas números;
function eNumero(numero) {
    return /^[0-9]+$/.test(numero);
}

//validar se o cep contém os 8 caracteres e se contém apenas números
const cepValido = (cep) => cep.length == 8 && eNumero(cep)

const getViaCep = async () => {
    //chamando a função sempre que realizar uma nova requisição
    limparFormulario();

    //criando variável para armazenar o valor do CEP
    const cep = document.getElementById('cep').value;

    //variável recebendo a url da API
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if (cepValido(cep)) {

        const resposta = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const dados = await resposta.json();

        console.log(dados);


        //validação para o retorno da requisição. Operador Ternário
        dados.hasOwnProperty('erro') ? document.getElementById('endereco').value = "CEP não encontrado!" : preencherFormulario(dados)

    }else{
        document.getElementById('endereco'). value = "CEP incorreto! Tente novamente"
    }
}

getViaCep()

function preencherFormulario(dados) {
    document.getElementById('endereco').value = dados.logradouro;
    document.getElementById('bairro').value = dados.bairro;
    document.getElementById('cidade').value = dados.localidade;
    document.getElementById('estado').value = dados.uf;
}


document.getElementById('cep')
    .addEventListener('focusout', getViaCep);

/*function preencherFormulario(dados) {

    document.getElementById('endereco').value = "";
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}*/

