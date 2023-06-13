let atividades = {};
( function(){
    let id = 0;
    do{
        atividades[id] = JSON.parse(localStorage.getItem(id));
        id++;
    }while(localStorage.getItem(id));
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
                if(conteudo !== "validacao"){
                    let td = document.createElement("td");
                    let conteudoTd = document.createTextNode(atividade[conteudo]);
                    td.appendChild(conteudoTd);
                    newLinha.appendChild(td);
                }
            }
            for(let botao of criarBotoes()){
                newLinha.appendChild(botao);
            }
            return newLinha;
        }
        this.mostrarAtividade = () =>{
            let tabelaTarefas = document.querySelector("#tarefas tbody");
            tabelaTarefas.appendChild(criarTds());
        }
    }
    let carregarAtividades = () =>{
        let campoVazio = document.querySelector("#sem-registro");
        if(atividades){
            let linhas = [];
            for(let atividade in atividades) linhas[atividade]  = new CriarElementos(atividade,atividades[atividade]);
            linhas.forEach(elementos => elementos.mostrarAtividade());
        }else{
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
    let editarAtividade = botao => document.location.href =  `./atividade/index.html?id=${idLinha(botao)}`;
    let removerAtividade = botao =>{
        localStorage.removeItem(idLinha(botao));
        document.location.reload();
    }
    let idLinha = botao =>{
        let tr = botao.parentNode.parentNode;
        let idAtividade = tr.getAttribute("id");
        return idAtividade;
    }
})();
