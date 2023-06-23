let atividades = {};
( function(){
    Object.keys(localStorage).map((atividade)=>{
        atividades[atividade] = (JSON.parse(localStorage.getItem(atividade)));
    })
})();
(function(){
    function CriarElementos(id,atividade){
        this.id = id;
        let criarLinha = () => {
            let linha = document.createElement("tr");
            linha.setAttribute("id",`${this.id}`);
            return linha;
        };
        let criarBotoes = ()=>{
            let botoes = [];
            for(let i = 0; i < 6; i++){
                let td = document.createElement("td");
                switch(i){
                    case 1:
                        td.appendChild(botao("VER"));
                        break;
                    case 3:
                        td.appendChild(botao("EDITAR"));
                        break;
                    case 5:
                        td.appendChild(botao("EXCLUIR"));
                        break;
                }
                botoes.push(td);
            }
            return botoes;
        }
        let botao = (texto)=> {
            let botao = document.createElement("button");
            let textoBotao = document.createTextNode(texto);
            botao.setAttribute("type","button");
            botao.setAttribute("class",texto);
            botao.appendChild(textoBotao);
            return botao;
        }
        let criarTds = ()=>{
            let newLinha = criarLinha();
            for(let conteudo in atividade){
                if(conteudo !== "validacao" && conteudo != "id"){
                    let td = document.createElement("td");
                    let conteudoTd;
                    if(conteudo === "data"){
                        let dataFormatada = atividade[conteudo].split("-");
                        atividade[conteudo] = `${dataFormatada[2]}/${dataFormatada[1]}/${dataFormatada[0]}`;
                    }
                    if(conteudo === "status"){
                        let status = document.createElement("input");
                        status.setAttribute("type","checkBox");
                        status.setAttribute("id",atividade["id"]);
                        td.appendChild(status);
                    }else{
                        conteudoTd = document.createTextNode(atividade[conteudo].toUpperCase());
                        td.appendChild(conteudoTd);
                    }
                    newLinha.appendChild(td);
                }
            }
            for(let botao of criarBotoes()) newLinha.appendChild(botao);
            return newLinha;
        }
        this.mostrarAtividade = () =>{
            let tabelaTarefas = document.querySelector("#tarefas tbody");
            tabelaTarefas.appendChild(criarTds());
        }
    }
    let carregarAtividades = () =>{
        if(Object.keys(atividades).length){
            let linhas = [];
            for(let atividade in atividades) linhas[atividade]  = new CriarElementos(atividade,atividades[atividade]);
            linhas.forEach(elementos => elementos.mostrarAtividade());
        }else{
            let campoVazio = document.querySelector("#sem-registro");
            campoVazio.removeAttribute("style");
        }
    }
    carregarAtividades();
})();
let botoes = document.querySelectorAll("button");
(function(){
    botoes.forEach(botao =>{
        if(botao.getAttribute("class") === "VER") botao.addEventListener("click",()=> mostrarAtividade(botao));
        if(botao.getAttribute("class") === "EDITAR") botao.addEventListener("click",()=> editarAtividade(botao));  
        if(botao.getAttribute("class") === "EXCLUIR") botao.addEventListener("click",()=> removerAtividade(botao));      
    })
    let mostrarAtividade = botao => document.location.href = `./atividade/index.html?id=${idLinha(botao)}`;
    let editarAtividade = botao => document.location.href =  `./atividade/index.html?id=${idLinha(botao)}&edit`;
    let removerAtividade = botao =>{
        localStorage.removeItem(idLinha(botao));
        document.location.reload();
    }
    let idLinha = botao =>{
        let tr = botao.parentNode.parentNode;
        let idAtividade = tr.getAttribute("id");
        return idAtividade;
    }
    let checkBoxStatus = document.querySelectorAll("#tarefas input[type='checkBox']");
    checkBoxStatus.forEach((checkBox)=>{
        let dadosAtividade = JSON.parse(localStorage.getItem(checkBox.getAttribute("id")));
        checkBox.addEventListener("click",()=>{
            dadosAtividade.status === "concluido" ? dadosAtividade.status = "pendente" : dadosAtividade.status = "concluido";
            localStorage.setItem(checkBox.getAttribute("id"),JSON.stringify(dadosAtividade));
        })
        dadosAtividade.status === "concluido" ? checkBox.setAttribute("checked","") : checkBox.removeAttribute("checked");
    })

})();
