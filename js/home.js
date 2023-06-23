//Resumo tarefas:
(function(){
    let campoResumo = document.querySelector(".campo-resumo-tarefas");
    let dadosResumo = () =>{
        let getDados = status => {
            let dadosAtividades = [];
            Object.keys(localStorage).map((atividade)=>{
                dadosAtividades[atividade] = (JSON.parse(localStorage.getItem(atividade)));
            })
            let dados = dadosAtividades.filter((atividade)=>{
                if(atividade){
                    return status === atividade.status;
                }
            })
            return dados;
        }   
        return{
            get concluido(){
                return getDados("concluido").length;
            },
            get pendente(){
                return getDados("pendente").length;
            },
            get atrasadas(){
                return getDados("atrasados").length;
            }
        }
    }
    for(let i = 1; i <= 3; i++){
        let td = document.createElement("td");
        let p = document.createElement("p");
        switch(i){
            case 1:
                p.innerText = dadosResumo().concluido;
                break;
            case 2:
                p.innerText = dadosResumo().pendente;
                break;
            case 3:
                p.innerText = dadosResumo().atrasadas;
                break;
        }
        td.appendChild(p);
        campoResumo.appendChild(td);   
    }
})();
//Proximas tarefas:

(function(){
    let atividade = [];
    let dataAtual = new Date();
    let alertaTarefasProximas = document.querySelector(".alerta-tarefas table tbody");
    let diffDats = dataNova => Math.ceil((dataNova - dataAtual) / (1000 * 3600 * 24));
    Object.keys(localStorage).map(atividades => atividade[atividades] = (JSON.parse(localStorage.getItem(atividades))));
    let atividadesProximas = atividade.filter((atividade)=>{
        if(atividade){
            let dataNova =  atividade.data.split("-");
            let dataFormatada = new Date(dataNova[0],dataNova[1]-1,dataNova[2]);
            return diffDats(dataFormatada) < 5 && atividade.status !== "atrasados";
        }
    })
    let criarAtividadeProxima = atividade =>{ 
    let linha = document.createElement("tr");
    let tds = [];
    for(let i = 0; i < 4;i++) tds[i] = document.createElement("td");
    tds.map((td,id)=>{
        switch(id){
            case 0:
                let dataFormatada = atividade.data.split("-");
                td.innerText = `${dataFormatada[2]}/${dataFormatada[1]}/${dataFormatada[0]}`;
                break;
            case 1:
                td.innerText = atividade.horario;
                break;
            case 2:
                td.innerText = atividade.assunto;
                break;
            case 3:
                let button = document.createElement("button");
                button.setAttribute("type","button");
                button.setAttribute("id",atividade.id);
                button.innerText = "Visualizar";
                td.appendChild(button);
                break;
            }
                linha.appendChild(td);
            })
            return linha;
    }
    atividadesProximas.map( valor => alertaTarefasProximas.appendChild(criarAtividadeProxima(valor)))
    
    let buttons = document.querySelectorAll(".alerta-tarefas button");
    buttons.forEach((button)=>{
        button.addEventListener("click",()=>{
            document.location.href = `../pages/agenda/tarefas/atividade/index.html?id=${button.getAttribute("id")}`;
        })
    })
})();