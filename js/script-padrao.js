let submenu = document.querySelectorAll(".cabecalho ul li div");
setTimeout(()=>{
    submenu.forEach((Element)=>{
        Element.addEventListener("click",()=>{
            let item = Element.querySelector("ol");
            let item2 = Element.querySelector("img");
            item.classList.toggle("submenu-oculto");
            document.addEventListener("click", e => {if(!(item === e.target || item2 === e.target || Element === e.target)) item.classList.add("submenu-oculto")});
        })
    })
},500);
(function(){
    let dataAtual = new Date();
    let diffDats = dataNova => (dataAtual - dataNova) / (1000 * 3600 * 24);
    let atrasados = Object.keys(localStorage).filter((atividadeKey)=>{
        let objDate;
        let dados = JSON.parse(localStorage.getItem(atividadeKey));
        (dados.horario === "-") ? objDate = new Date(`${dados.data} ${23}:${59}`) : objDate = new Date(`${dados.data}T${dados.horario}`);
        let validaAtraso = (objDate.getTime() + 60000) <= dataAtual.getTime() && (-diffDats(objDate)) <= 0;
        return validaAtraso;
    });
    atrasados.filter((atividadeKey)=>{
        let dadosDoAtrasado =  JSON.parse(localStorage.getItem(atividadeKey));
        if(dadosDoAtrasado.status !== "concluido"){
            dadosDoAtrasado.status = "atrasados";
            localStorage.setItem(atividadeKey,JSON.stringify(dadosDoAtrasado));
        }
    })
})();




