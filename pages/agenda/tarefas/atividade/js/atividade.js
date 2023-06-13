let inputs = document.querySelectorAll("input");
let descricao = document.querySelector("textarea");
let idAtividade = document.location.search;

(function(){
    let dadosAtividade = ()=>{
        return JSON.parse(localStorage.getItem(idAtividade.slice(4,idAtividade.length)));
    }
    let mostrarDados = ()=>{
        let dados = dadosAtividade();
        inputs.forEach((elementos,id_elementos)=>{
            switch(id_elementos){
                case 0:
                    elementos.value = dados["assunto"];
                    break;
                case 1:
                    let data = dados["data"].split("/");
                    elementos.value = `${data[2]}-${data[1]}-${data[0]}`;
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
(function(){
    let bloquearInputs = () =>{
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
    bloquearInputs();

    let botaoVoltar = () =>{
        let botaoVoltar = document.querySelector("#voltar");
        botaoVoltar.addEventListener("click",()=>{
            document.location.href = "../index.html";
        })
    }
    botaoVoltar();
})();