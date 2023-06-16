//Resumo tarefas:
(function(){
    let campoResumo = document.querySelector(".campo-resumo-tarefas");
    
    let dadosResumo = () =>{
        let getDados = status => {
            let dadosAtividades = [];
            for(let i = 0; i < localStorage.length ; i++){
                dadosAtividades.push(JSON.parse(localStorage.getItem(i)));
            }
            let dados = dadosAtividades.filter((atividade,index)=>{
                return status === atividade.status;
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