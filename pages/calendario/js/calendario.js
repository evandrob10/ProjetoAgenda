let meses = ["JANEIRO","FEVEREIRO","MARÇO","ABRIL","MAIO","JUNHO","JULHO","AGOSTO","SETEMBRO","OUTUBRO","NOVEMBRO","DEZEMBRO"];

(function(){

    let selects = document.querySelectorAll("#calendario thead select");

    let carregarMesesSelect = meses => {
        let selectMeses = selects[0];
        meses.forEach((mes,id)=>{
            let option = criarOptionSelect(mes,id);
            selectMeses.appendChild(option);
        })
    }
    let criarOptionSelect = (mes,id) =>{
        let dataAtual = new Date();
        let option = document.createElement("option");
        option.innerText = mes;
        if(id === dataAtual.getMonth()) option.setAttribute("selected","");
        option.setAttribute("value", mes);
        return option;
    }
    carregarMesesSelect(meses);

    let mes = 4;
    let ano = 2023;
    let datas = [];
    for(let i = 0; i < 32;i++) datas.push(new Date(`${ano}-${mes}-${i}`));
    datas.push(new Date(`${ano}-${mes + 1}-${1}`));
    let dataValidas = datas.filter( data =>  (data.getMonth() + 1) === mes)
})();
