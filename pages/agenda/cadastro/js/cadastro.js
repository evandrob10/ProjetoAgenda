let dados = document.querySelectorAll("#formulario input");
let dadoTextarea = document.querySelector("#formulario textarea");
( 
    function (){
    const dadosForm = () =>{
        return{
            status: "pendente",
            data: dados[1].value,
            horario: dados[2].value,
            assunto: dados[0].value,
            descricao: dadoTextarea.value,  
            validacao: {
                status: false,
                messagem: ""
            } 
        }
    }
    let botaoSalvar = document.querySelector("#salvar");
    botaoSalvar.addEventListener("click",(element)=> {
        element.preventDefault();
        let dadosAtividades = dadosForm();
        dadosAtividades = validarDadosEntrada(dadosAtividades);
        if(dadosAtividades.validacao.status) salvarDados(dadosAtividades);
        if(dadosAtividades.validacao.status) mostrarMensagemResultado(dadosAtividades)
    });
    const validarDadosEntrada = (dadosAtividade)=>{
        for(let dado in dadosAtividade){
            if(dado !== "horario" && dado !== "descricao"){
                if(dadosAtividade[dado] === "") {
                    dadosAtividade.validacao.messagem = `Você esqueceu de preencher ${dado}.`;
                    return dadosAtividade;
                }
            }
        }
        dadosAtividade.validacao.status = true;
        dadosAtividade.validacao.messagem = `Atividade cadastrada com sucesso! `;
        return dadosAtividade;
    }
    const mostrarMensagemResultado = (dadosAtividade)=> {
        let resultado = document.querySelector(".campo-resultado p");
        let campoResultado = document.querySelector(".fundo-resultado");
        let botaoResultado = campoResultado.querySelector("button");
        resultado.innerText = dadosAtividade.validacao.messagem;
        campoResultado.style.display = "flex";
        botaoResultado.addEventListener("click",()=>{
            campoResultado.style.display = "none";
            if(dadosAtividade.validacao.status) document.location.href = "../tarefas/";
        })
    }
    const salvarDados = (dadosAtividade)=>{
        for(let dados in dadosAtividade) if(dadosAtividade[dados] === "") dadosAtividade[dados] = "-";
        let id = 0;
        let dadosSalvo = true;
        do{
            if(!localStorage.getItem(`${id}`)){
                dadosAtividade.id = id;
                localStorage.setItem(`${id}`,JSON.stringify(dadosAtividade));
                dadosSalvo = false;
            }
            id++;
        }while(dadosSalvo);
    }
})();
(function(){
    let botaoLimpar = document.querySelector("#limpar");
    botaoLimpar.addEventListener("click",()=>{
        for(let dado of dados){
            dado.value = "";
        }
        dadoTextarea.value = "";
    })
})();
(function (){
    let botaoCancelar = document.querySelector("#cancelar");
    botaoCancelar.addEventListener("click",()=> document.location = "../tarefas/");
})();