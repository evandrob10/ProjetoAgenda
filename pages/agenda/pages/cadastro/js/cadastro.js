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
    let campoResultado = document.querySelector(".resultado p");
    campoResultado.innerText = dadosAtividade.validacao.messagem;
    if(dadosAtividade.validacao.status){
        let count = 5;
        let mensagemRedirecionamento = setInterval(()=>{
            campoResultado.innerText = `Redirecionando em ${count}...`;
            count--;
        },1000)  
        setTimeout(()=>{
            clearInterval(mensagemRedirecionamento);
            document.location.href = "../../pages/tarefas/";
        },6000)
    }
}




