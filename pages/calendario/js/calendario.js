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
    let coletarDados = () => {
        let selectMes = selects[0].value;
        let selectAno = Number (selects[1].value);
        for(let mes in meses) if(meses[mes] === selectMes) selectMes = Number(mes) + 1;
        return [selectMes,selectAno];
    }
    let selectDados = coletarDados();
    selects.forEach((select)=>{
        select.addEventListener("change",()=> {
            selectDados = coletarDados();
            atualizarNumerosCalendario(selectDados[0],selectDados[1]);
        });
    })
    let numerosCalendario = (mes,ano)=>{
        let difDomDay = (-(0 - numeroValidos(mes,ano)[0].date.getDay()));
        let numeros = [...mesAnterio(mes,ano,difDomDay),...numeroValidos(mes,ano)];
        let numerosPosterior = numeroPosterio(numeros, mes,ano);
        numeros = [...mesAnterio(mes,ano,difDomDay),...numeroValidos(mes,ano),...numerosPosterior];
        return numeros;
    }
    let numeroPosterio = (numeros, mes, ano) =>{
        let numeroPosterio = [];
        let count = 0;
        let dia = 2;
        do{
            numeroPosterio[count] = {date: new Date(`${ano}-${mes + 1}-${dia} 15:00`),display:false,foraDoMes:true};
            count++;
            dia++;
        }while((count + numeros.length) <= 41);
        return numeroPosterio;
    }
    let numeroValidos = (mes,ano) =>{
        let datas = [];
        for(let i = 2; i < 32;i++) {
            datas[i] = {date: new Date(`${ano}-${mes}-${i} 15:00`),display:false};
        };
        let numeroValidos = datas.filter( (data) => {
            return data.date != "Invalid Date";
        });
        numeroValidos.push({date: new Date(`${ano}-${mes + 1}-${1}`),display:false});
        let dataAtual = new Date();
        numeroValidos.map((valor)=>{
            let dataIgual = dataFormatada(valor.date.getDate(),valor.date.getMonth(),valor.date.getFullYear()) === dataFormatada(dataAtual.getDate(),dataAtual.getMonth(),dataAtual.getFullYear());
            if(dataIgual) valor.diaDoMes = true; 
            return valor;
        })
        return numeroValidos;
    }
    let dataFormatada = (dia,mes, ano) => `${dia}/${mes}/${ano}`;
    let mesAnterio = (mes,ano,diff) =>{
        let mesAnterio = [];
        let count = 0;
        for(let i = 0; i < 32;i++) {
            mesAnterio[count] = {date: new Date(`${ano}-${mes-1}-${i} 15:00`),display:false,foraDoMes:true};
            count++;
        };
        mesAnterio.push({date: new Date(`${ano}-${mes}-${1}`),display:false,foraDoMes:true});
        let numeroValidos = mesAnterio.filter( (data) => {
            return data.date != "Invalid Date";
        });
        let diasDiff = [];
        for(let i = numeroValidos.length - diff; i < numeroValidos.length;i++){
            diasDiff.push(numeroValidos[i]);
        }
        return diasDiff;
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
    let calendario = document.querySelector("#calendario tbody");
    let limparTds = ()=>{
        let trs = calendario.querySelectorAll("tr");
        for(let tr of  trs){
            tr.remove();
        }
    }
    let atualizarNumerosCalendario = (mes,ano) => {
        calendario = document.querySelector("#calendario tbody");
        limparTds();
        let numeros = numerosCalendario(mes,ano);
        let newLinhas;
        for(let i = 0; i < 6; i++){
            newLinhas = criarLinha();
            let count = 0; 
            for(let numero of numeros){
                if(!numero.display && count < 7){
                    let td = criarTd(numero.date.getDate());
                    if(numero.foraDoMes) td.setAttribute("class","dia-fora-mes");
                    if(numero.diaDoMes) td.setAttribute("class","dia-clicado");
                    newLinhas.appendChild(td);
                    numero.display = true;
                    count++
                } 
            }
            calendario.appendChild(newLinhas);
        }
    }
    atualizarNumerosCalendario(selectDados[0],selectDados[1]);
})();
7