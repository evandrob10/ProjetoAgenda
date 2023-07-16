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
        if(!id)option.setAttribute("value", item);
        if(id || id === 0)option.setAttribute("value",id);
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
        let selectMes = Number(selects[0].value) + 1;
        let selectAno = Number(selects[1].value);
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
        let dia = 1;
        if(mes != 12){
            do{
                numeroPosterio[count] = {date: new Date(`${ano}-${mes + 1}-${dia} 15:00`),display:false,foraDoMes:true};
                count++;
                dia++;
            }while((count + numeros.length) <= 41);
        }else{
            do{
                numeroPosterio[count] = {date: new Date(`${ano + 1}-${1}-${dia} 15:00`),display:false,foraDoMes:true};
                count++;
                dia++;
            }while((count + numeros.length) <= 41);
        }
        return numeroPosterio;
    }
    let numeroValidos = (mes,ano) =>{
        let datas = [];
        for(let i = 1; i < 32;i++) datas[i] = {date: new Date(`${ano}-${mes}-${i} 15:00`),display:false};
        let numeroValidos = datas.filter( data => data.date !== "Invalid Date" && (data.date.getMonth() + 1) === mes);
        let dataAtual = new Date(); 
        let dias = numeroValidos.map((valor)=>{
            let dataIgual = dataFormatada(valor.date.getDate(),valor.date.getMonth(),valor.date.getFullYear()) === dataFormatada(dataAtual.getDate(),dataAtual.getMonth(),dataAtual.getFullYear());
            if(dataIgual) valor.diaDoMes = true; 
            return valor;
        })
        return dias;
    }
    let dataFormatada = (dia,mes, ano) => `${dia}/${mes}/${ano}`;
    let mesAnterio = (mes,ano,diff) =>{
        let mesAnterio = [];
        let count = 0;
        let diasDiff = [];
        if(mes === 1){
            for(let i = 0; i < 32;i++) {
                mesAnterio[count] = {date: new Date(`${ano - 1}-${12}-${i} 15:00`),display:false,foraDoMes:true};
                count++;
            };
            let numeroValidos = mesAnterio.filter( data => data.date !== "Invalid Date");
            diasDiff = [];
            for(let i = numeroValidos.length - diff; i < numeroValidos.length;i++) diasDiff.push(numeroValidos[i]);
        }else{
            for(let i = 0; i < 32;i++) {
                mesAnterio[count] = {date: new Date(`${ano}-${mes-1}-${i} 15:00`),display:false,foraDoMes:true};
                count++;
            };
            let numeroValidos = mesAnterio.filter( data => data.date !== "Invalid Date" && data.date.getMonth() + 1 === (mes - 1));
            diasDiff = [];
            for(let i = numeroValidos.length - diff; i < numeroValidos.length;i++) diasDiff.push(numeroValidos[i]);
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
        for(let tr of  trs) tr.remove();
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
                    if(numero.diaDoMes) {
                        td.setAttribute("class","dia-do-mes");
                        td.setAttribute("title","Dia do mês");
                    }
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
//Dias com evento:
let campoNumeros = document.querySelector("#calendario tbody");
let selects = document.querySelectorAll("#calendario select");
let tds = campoNumeros.querySelectorAll("td");
let data = (td,selects)=> new Date(`${selects[1].value}-${Number(selects[0].value) + 1}-0${td.innerText} 00:00`);
(function(){
    let eventos = ()=>{
        tds = campoNumeros.querySelectorAll("td");
        let todosEventos = Object.keys(localStorage).map( valor => JSON.parse(localStorage.getItem(valor)));
        let datasComEvento = todosEventos.map(valor => (new Date(`${valor.data} 00:00`)));
    
        for(let td of tds){
            if(!td.getAttribute("class") || td.getAttribute("class") === "dia-clicado"){
                for(let evento of datasComEvento){
                    if(Number(td.innerText) === evento.getDate() && Number(selects[0].value) === evento.getMonth() && Number(selects[1].value) === evento.getFullYear()){
                        td.setAttribute("class","dia-com-evento");
                        td.setAttribute("title","Data com evento");
                    }
                }
            }
        }
    }
    selects.forEach((valor)=> valor.addEventListener("change",()=> eventos()));
    eventos();
})();
//TAREFAS: BARRA LATERAL DIREITA
(function(){
    let campoTarefas = document.querySelector("#eventos-por-dia");
    let diasSemana = ["DOMINGO","SEGUNDA-FEIRA","TERÇA-FEIRA","QUARTA-FEIRA","QUINTA-FEIRA","SEXTA-FEIRA","SÁBADO"];    
    
    let alterDadosBarra = ()=>{
        let dia;
        let data;
        let mes = selects[0].value;
        let ano = selects[1].value;
        let zeroAesquerda = num => num < 10 ? `0${num}`: num;
        for(let td of tds){
            td.addEventListener("click",()=>{
                if(td.getAttribute("class") === "dia-com-evento") dia = td.innerText;
                let Strong = document.querySelector("#eventos-por-dia caption strong");
                data = new Date(`${ano}-${zeroAesquerda(Number(mes) + 1)}-${zeroAesquerda(Number(dia))} 05:00`); 
                if(dia) Strong.innerText = `${zeroAesquerda(dia)} ${meses[mes]} ${ano} - ${diasSemana[data.getDay()]}`;
                campoTarefas.style.display = "";
            })
        }
    }
    alterDadosBarra();
    let limparCampoEventos = () =>{
        let trs = document.querySelectorAll("#eventos-por-dia tbody tr");
        for(let tr of trs) tr.remove();
    }
    let criarLinhaComTds = (data, horario, tarefa) =>{
        let linha  = document.createElement("tr");
        for(let i = 1; i <= 4;i++){
            let td = document.createElement("td");
            switch(i){
                case 1:
                    td.innerText = data;
                    break;
                case 2:
                    td.innerText = horario;
                    break;
                case 3:
                    td.innerText = tarefa;
                    break;
                case 4:
                    td.innerText = "VISUALIZAR";
                    break;
            }
            linha.appendChild(td);
        }
        return linha;     
    }
    selects.forEach((valor)=> valor.addEventListener("change",()=> alterDadosBarra()));
})();