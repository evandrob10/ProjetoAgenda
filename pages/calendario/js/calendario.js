let meses = ["JANEIRO","FEVEREIRO","MARÇO","ABRIL","MAIO","JUNHO","JULHO","AGOSTO","SETEMBRO","OUTUBRO","NOVEMBRO","DEZEMBRO"];

(function(){
    let dataAtual = new Date();
    let selects = document.querySelectorAll("#calendario thead select");
    let carregarMesesSelect = meses => {
        let selectMeses = selects[0];
        meses.forEach((mes,id)=>{
            let option = criarOptionSelect(mes,id);
            selectMeses.appendChild(option);
        })
    }
    let criarOptionSelect = (item,id) =>{
        let option = document.createElement("option");
        option.innerText = item;
        if(id === dataAtual.getMonth() || item === dataAtual.getFullYear()) option.setAttribute("selected","");
        option.setAttribute("value", item);
        return option;
    }
    carregarMesesSelect(meses);
    let  carregarAnosSelect = () => {
        //Serão listado ultimos 10 anos e os proximos 10 anos do calendario virgente.
        let selectAnos = selects[1];
        let anoAtual = dataAtual.getFullYear();
        for(let i = 1; i <= 20;i++) selectAnos.appendChild(criarOptionSelect(((anoAtual + 11)  - i)));
    }

    carregarAnosSelect();

    let mes = 4;
    let ano = 2023;
    let datas = [];
    for(let i = 0; i < 32;i++) datas.push(new Date(`${ano}-${mes}-${i}`));
    datas.push(new Date(`${ano}-${mes + 1}-${1}`));
    let dataValidas = datas.filter( data =>  (data.getMonth() + 1) === mes)
})();
