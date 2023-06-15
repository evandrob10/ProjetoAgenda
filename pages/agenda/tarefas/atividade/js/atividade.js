//Seleção de campos
let inputs = document.querySelectorAll("input");
let descricao = document.querySelector("textarea");
//Codigo responsavel buscar id url e verificar se tem & apos o id
let idAtividade = document.location.search;
let idParametro = () => idAtividade.indexOf("&") === -1 ? idAtividade.slice((idAtividade.indexOf("=") + 1)) : idAtividade.slice((idAtividade.indexOf("=") + 1),idAtividade.indexOf("&"));
//Funções responsavel por buscar dados no localStorage
(function(){
    let dadosAtividade = ()=> JSON.parse(localStorage.getItem(idParametro()));
    let mostrarDados = ()=>{
        let dados = dadosAtividade();
        inputs.forEach((elementos,id_elementos)=>{
            switch(id_elementos){
                case 0:
                    elementos.value = dados["assunto"];
                    break;
                case 1:
                    elementos.value = dados["data"];
                    break;
                case 2:
                    elementos.value = dados["horario"];
                    break;
                case 3:
                   if(elementos.getAttribute("id") === dados["status"].toLowerCase()){
                        elementos.setAttribute("checked", "");
                   }
                   break;
                case 4:
                    if(dados["descricao"] === "-"){
                        descricao.value = "";
                        break;
                    };
                    descricao.value = dados["descricao"];         
            }
        })   
    }
    mostrarDados()
})();
//Bloquear inputs e texearea da tela atividade
(function(){
    let bloquearInputs = () =>{
        if(idAtividade.indexOf("&") === -1){
            for(let input of inputs){
                input.setAttribute("readonly","");
                input.style.color = "rgba(0,0,0,.70)";
                if(input.getAttribute("type") === "radio"){
                    input.setAttribute("disabled","");
                }
            }
            descricao.setAttribute("readonly","");
            descricao.style.color = "rgba(0,0,0,.70)";
        }
    }
    let botoesEdit = () => {
        if(idAtividade.indexOf("&") !== -1) {
            document.querySelector(".botoes-edit").style.display = "";
            document.querySelector(".botoes-ver").style.display = "none";
        }  
    }; 
    bloquearInputs();
    botoesEdit();
})();
//Botões tela atividade
(function(){
    let botaoVoltar = () =>{
        let botaoVoltar = document.querySelector("#voltar");
        botaoVoltar.addEventListener("click",()=>{
            document.location.href = "../";
        })
    }
    let botaoAlterar = () =>{
        let botaoEditar = document.querySelector("#alterar");
        botaoEditar.addEventListener("click",(botao)=>{
            let editarAtividade = id => document.location.href =  `./index.html?id=${id}&edit`;
            editarAtividade(idParametro());
        })
    }
    botaoAlterar();
    botaoVoltar();
})();
//Botões tela editar atividade
(function(){
    console.log('entrei');
    let botaoLimpar = () => {
        let botao = document.querySelector("#limpar");
        botao.addEventListener("click",()=>{
            for(let input of inputs){
                input.value = "";
            }
            descricao.value = "";
        })
    }
    let botaoCancelar = () => {
        let botao = document.querySelector("#cancelar");
        botao.addEventListener("click",()=> document.location = "../");
    };
    botaoCancelar();
    botaoLimpar();
})();
// Botao atualizar
(function(){
    let botaoAtualizar = document.querySelector("#atualizar");
    let status = "PENDENTE";
    let botoesStatus = document.querySelectorAll("input[name='status']");
    botoesStatus.forEach((botao)=>{
        botao.addEventListener("click",()=>{
            status = botao.value;
        })
    })
    const dadosForm = () =>{
        return{
            status: status,
            data: inputs[1].value,
            horario: inputs[2].value,
            assunto: inputs[0].value,
            descricao: descricao.value,  
            validacao: {
                status: false,
                messagem: ""
            } 
        }
    }
    botaoAtualizar.addEventListener("click",()=>{
        document.location = "../"
        localStorage.setItem(idParametro(),JSON.stringify(dadosForm()));
    })
})();