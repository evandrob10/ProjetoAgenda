const dadosForm = () =>{
    let dados = document.querySelectorAll("#formulario input");
    let dadoTextarea = document.querySelector("#formulario textarea");
    return{
        assunto: dados[0].value,
        data: dados[1].value,
        horario: dados[2].value,
        status: dados[3].value,
        descricao: dadoTextarea.value,  
        validacao: {
            status: false,
            messagem: ""
        } 
    }
}
let botaoSalvar = document.querySelector("button[type='submit']");
botaoSalvar.addEventListener("click",(element)=> {
    element.preventDefault();
    let dadosAtividades = dadosForm();
    dadosAtividades = validarDadosEntrada(dadosAtividades);
    if(dadosAtividades.validacao.status) salvarDados(dadosAtividades);
    mostrarMensagemResultado(dadosAtividades)
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
        if(dadosAtividade.validacao.status) document.location.href = "../../pages/tarefas/";
    })
}
const salvarDados = (dadosAtividade)=>{
    for(let dados in dadosAtividade){
        if(dadosAtividade[dados] === "") dadosAtividade[dados] = null;
    }
    let id = 0;
    let dadosSalvo = true;
    do{
        if(!localStorage.getItem(`${id}`)){
            localStorage.setItem(`${id}`,JSON.stringify(dadosAtividade));
            dadosSalvo = false;
            console.log("Executado");
        }
        id++;
    }while(dadosSalvo);
}



