var botaoAdicionar = document.querySelector("#adicionar-encomenda");

botaoAdicionar.addEventListener("click", function(event){

    event.preventDefault();

    //Captura o formulário da página
    var form = document.querySelector("#form-adiciona");

    //Captura os dados da nova encomenda
    var encomenda = obtemEncomenda(form);

   
   //Valida se a encomenda pode ser inserida
   if(validaEncomenda(encomenda).length > 0) {
    console.log(validaEncomenda(encomenda));
} else {
    //Insere a nova encomenda na tabela
    addEncomenda(encomenda);

    //Limpa o formulário
    form.reset();
}
    
  
});

//Função para capturar os dados da nova encomenda
function obtemEncomenda(dadosForm){

    var encomenda = {
        nome: dadosForm.nome.value,
        qtde: dadosForm.qtde.value,
        produto: dadosForm.produto.value,
        unitario: dadosForm.unitario.value,
    }

    return encomenda;
}

//Função para adicionar a nova encomenda na tabela
function addEncomenda(novaEncomenda){

    var tabela = document.querySelector("#tabela-clientes");

    tabela.appendChild(montaTR(novaEncomenda));
}

//Monta uma coluna nova
function montaTD(dado) {

    var td = document.createElement("td");
    td.textContent = dado;

    return td;
}

//Monta uma nova TR
function montaTR(novaEncomenda) {
    var tr = document.createElement("tr");

    // Definindo estilos diretamente para a linha (<tr>)
    tr.style.backgroundColor = "#f5f5f5";

    function montaTD(conteudo, estilo) {
        var td = document.createElement("td");
        td.textContent = conteudo;

        // Aplicando estilos diretamente para a célula (<td>)
        if (estilo) {
            for (var prop in estilo) {
                td.style[prop] = estilo[prop];
            }
        }

        return td;
    }

    // Criando células (<td>) com conteúdo e estilos inline
    tr.appendChild(montaTD(novaEncomenda.nome, { backgroundColor: "black", color: "green" }));
    tr.appendChild(montaTD(novaEncomenda.produto, { backgroundColor: "black", color: "green" }));
    tr.appendChild(montaTD(novaEncomenda.qtde, {backgroundColor: "black", color: "green"  }));
    tr.appendChild(montaTD(formataValor(parseFloat(novaEncomenda.unitario)), {backgroundColor: "black", color: "green" }));
    tr.appendChild(montaTD(calculaTotal(novaEncomenda.qtde, novaEncomenda.unitario), {backgroundColor: "black", color: "green" }));

    return tr;
}


//Função para validação da quantidade e do unitário
function validaEncomenda(encomenda){

    var erros =[];

    //Verifica se o nome foi informado
    if(encomenda.nome=="") {
        erros.push("O nome não pode ser vazio!");
    }

    //Verifica se a quantidade é maior que zero e um número
    if(encomenda.qtde <= 0 || isNaN(encomenda.qtde)){
        erros.push("A quantidade deve ser numérica e maior que 0.");
    }

    //Verifica se o valor unitário é maior que zero e um número
    if(encomenda.unitario <=0 || isNaN(encomenda.unitario)){
        erros.push("O valor unitário deve ser numérico e maior que 0.");
    }

    return erros;
}