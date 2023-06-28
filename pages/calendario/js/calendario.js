let meses = ["JANEIRO","FEVEREIRO","MARÇO","ABRIL","MAIO","JUNHO","JULHO","AGOSTO","SETEMBRO","OUTUBRO","NOVEMBRO","DEZEMBRO"];

(function(){
    let dataAtual = new Date();
    let selects = document.querySelectorAll("#filtro-calendario select");
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
    selects.forEach((select)=>{
        select.addEventListener("change",()=> {
            let selectMes = selects[0].value;
            let selectAno = Number (selects[1].value);
            for(let mes in meses) if(meses[mes] === selectMes) selectMes = Number(mes) + 1;
            numeroValidos(selectMes,selectAno);
        });
    })
    let numeroValidos = (mes,ano)=>{
        let datas = [{}];
        for(let i = 0; i < 32;i++) {
            datas[0][i] = {date: new Date(`${ano}-${mes}-${i}`),display:false};
        };
        let numeroValidos = datas.filter( data => data);
        return numeroValidos;
    }
    let criarTd = conteudo =>{
        let td = document.createElement("td");
        td.innerText = conteudo;
        return td;
    } 
    let criarLinha = ()=>{
        let linha = document.createElement("tr");
        return linha;
    }
    let atualizarNumerosCalendario = (mes,ano) => {
        let linhas = [];
        for(let i = 0; i < 7;i++){
            let linha = criarLinha();
            let count = 0;
            for(let data in numeroValidos(mes,ano)[0]){
                if(!numeroValidos(mes,ano)[0][data].display && count <= 7){
                    linha.appendChild(criarTd(numeroValidos(mes,ano)[0][data].date.getDate()));
                    numeroValidos(mes,ano)[0][data].display = true;
                    count++;
                }
                console.log("executado");
            }
            linhas[i] = linha;
        }
        console.log(linhas);
    }
    atualizarNumerosCalendario();
})();
