let submenu = document.querySelectorAll(".cabecalho ul li div");
submenu.forEach((Element)=>{
    Element.addEventListener("click",()=>{
        let item = Element.querySelector("ol");
        let item2 = Element.querySelector("img");
        item.classList.toggle("submenu-oculto");
        document.addEventListener("click", e => {if(!(item === e.target || item2 === e.target || Element === e.target)) item.classList.add("submenu-oculto")});
    }) 
})

