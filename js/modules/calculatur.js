function calculatur(){
    //calculator

    let weight, hight, age, sex, retio;
    if(localStorage.getItem("sex")){
        sex = localStorage.getItem("sex");
    } else {
        sex = "female";
        localStorage.setItem("sex",sex);
    }
    if(localStorage.getItem("retio")){
        retio = +localStorage.getItem("retio");
    } else {
        retio = 1.375;
        localStorage.setItem("retio",retio);
    }
    
    const result = document.querySelector(".calculating__result span");
    function calcolation(weight,hight, age, sex, retio){
        if(!weight || !hight || !age || !sex || !retio){
            result.textContent = "___";
            return;
        }

        if (sex === "female"){
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * hight) - (4.3 * age)) * retio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * hight) - (5.7 * age)) * retio);
        }
    }
    calcolation(weight,hight, age, sex, retio);

    function initLocalStorage(parent, activeClass){
        const elements = document.querySelectorAll(`${parent} div`);
        elements.forEach(element =>{
            element.classList.remove(activeClass);
            if(element.getAttribute("id") === localStorage.getItem("sex")){
                element.classList.add(activeClass);
            }
            if(element.getAttribute("data-ratio") === localStorage.getItem("retio")){
                element.classList.add(activeClass);
            }
        });
    }

    function getStaticData(parent, activeClass){
        const elements = document.querySelectorAll(`${parent} div`);
        elements.forEach(element =>{
            element.addEventListener("click", (e)=>{
                if (e.target.getAttribute("data-ratio")){
                    retio = +e.target.getAttribute("data-ratio");
                    localStorage.setItem("retio",+e.target.getAttribute("data-ratio"));
                } else {
                    sex = e.target.getAttribute("id");
                    localStorage.setItem("sex",e.target.getAttribute("id"));
                }
                elements.forEach(element => element.classList.remove(activeClass));
                e.target.classList.add(activeClass);
                calcolation(weight,hight, age, sex, retio);
            });
        });
    }

    function getDymanicData(id){
        const data = document.querySelector(`#${id}`);
        data.addEventListener("input", (e)=>{
            const input = e.target;
            if (input.value.match(/\D/g)){
                data.style.border = "1px solid red";
            } else{
                data.style.border = "none";
            }
            switch (e.target.getAttribute("id")){
                case "height": 
                    hight = +input.value;
                    break;
                case "weight": 
                    weight = +input.value;
                    break;
                case "age": 
                    age = +input.value;
                    break;
            }
            calcolation(weight,hight, age, sex, retio);
        });
        
    }
    initLocalStorage("#gender","calculating__choose-item_active");
    initLocalStorage(".calculating__choose_big", "calculating__choose-item_active" );
    getStaticData("#gender","calculating__choose-item_active");
    getStaticData(".calculating__choose_big", "calculating__choose-item_active" );
    getDymanicData("height");
    getDymanicData("weight");
    getDymanicData("age");

}

module.exports = calculatur;