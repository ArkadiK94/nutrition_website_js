/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculatur.js":
/*!**********************************!*\
  !*** ./js/modules/calculatur.js ***!
  \**********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 98:0-14 */
/***/ ((module) => {

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

/***/ }),

/***/ "./js/modules/menu_tabs.js":
/*!*********************************!*\
  !*** ./js/modules/menu_tabs.js ***!
  \*********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 59:0-14 */
/***/ ((module) => {

function menuTabs(){
    //class for menu tabs
    class MenuTabs {
        constructor(name, img, text, price, place, ...classes){
            this.name = name;
            this.img = img;
            this.text = text;
            this.price = price;
            this.place = place;
            this.classes = classes;
            this.changeValue();
        }
        changeValue(){
            this.price = this.price * 27;
        }
        showNew(){
            const element = document.createElement("div");
            
            if (this.classes.length == 0){
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(item => element.classList.add(item));
            }
            
            element.innerHTML += `
                <img src=${this.img} alt="vegy">
                <h3 class="menu__item-subtitle">Меню ${this.name}</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`;

            this.place.append(element);
        }
    } 
    const getData = async (url) => {
        const res = await fetch(url);
        if(!res.ok){
            throw new Error(`couldnt fetch url ${url} status ${res.status}`);
        }
        return await res.json();
        
    };
    const tabsInMenu = document.querySelectorAll(".container");
    tabsInMenu[4].innerHTML = "";
    getData("http://localhost:3000/menu")
    .then(data => {
        data.forEach(({img,title,descr,price}) => {
            new MenuTabs(title,img,descr,price, tabsInMenu[4], "menu__item", "i", "y","jfdklsj").showNew();
        });
    });

    
}

module.exports = menuTabs;

/***/ }),

/***/ "./js/modules/server.js":
/*!******************************!*\
  !*** ./js/modules/server.js ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 67:0-14 */
/***/ ((module) => {

function server (){
    //post data to server
    const postData = async (url, data) => {
        const res = await fetch(url,{
            method: "POST",
            headers: {
                "Content-type":"application/json"
            },
            body: data
        });
        return await res.json();
    };
    const formInPage = document.querySelectorAll("form");
    formInPage.forEach(item => {
        item.addEventListener("submit",(e)=>{
            e.preventDefault();
            const massage = {
                      success: "success,we will call you soon",
                      loading: "img/form/spinner.svg",
                      failure : "didnt work,try again later"
                  };
            const divMassege = document.createElement("img");
            item.append(divMassege);
            divMassege.src = massage.loading;
            divMassege.style.cssText = `
                  display: block;
                  margin: 0 auto;
            `;
            item.insertAdjacentElement("afterEnd",divMassege);
            const formDate = new FormData(item);
            const json = JSON.stringify(Object.fromEntries(formDate.entries()));
            postData('http://localhost:3000/requests', json)
            .then(data => {
                showModalAnswer(massage.success);
                console.log(data);
                divMassege.remove();
            }).catch(()=>{
                showModalAnswer(massage.failure);
            }).finally(()=>{
                item.reset();
            });
        });
    });

    function showModalAnswer(massage){
        const prevModal = document.querySelector(".modal__dialog");
        prevModal.classList.add("hide");
        showModal();
        const newModal = document.createElement("div");
        newModal.classList.add("modal__dialog");
        modal.append(newModal);
        newModal.innerHTML =`
            <div class="modal__content">
                <div class="modal__title">${massage}</div>
            </div>
            `;
        setTimeout(()=>{
            prevModal.classList.add("show");
            prevModal.classList.remove("hide");
            newModal.remove();
            hideModal();
        },2000);
    }

}

module.exports = server;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 151:0-14 */
/***/ ((module) => {

function slider(){
    // //slider 1
    // const sliders = document.querySelectorAll(".offer__slide"),
    //       counterSlider = document.querySelector(".offer__slider-counter");
    // let indexSlider = 0;
    // counterSlider.querySelector("#current").textContent = "01";
    
    // function cheking(value,classOfPlace){
    //     if (value < 10){
    //         counterSlider.querySelector(classOfPlace).textContent = `0${value}`; 
    //     } else {
    //         counterSlider.querySelector(classOfPlace).textContent = `${value}`; 
    //     }
    // }
    // cheking(sliders.length,"#total");
        
    
    // function hideSliders() {
    //     sliders.forEach(function(item) {
    //         item.classList.add('hide');
    //         item.classList.remove("show");
    //     });
    // }

    // function showSlider(indexSlider) {
    //     if (indexSlider == -1 ){
    //         indexSlider = sliders.length-1;
    //     } else if (indexSlider == sliders.length){
    //         indexSlider = 0;
    //     }
    //     hideSliders();
    //     cheking(indexSlider+1,"#current");
    //     sliders[indexSlider].classList.add('show');
    //     sliders[indexSlider].classList.remove("hide");
    //     return indexSlider;
    // }
    
    // counterSlider.addEventListener('click', (event) => {
    //     if (event.target && event.target.classList.contains("offer__slider-prev")){
    //         indexSlider -= 1;
    //         indexSlider = showSlider(indexSlider);
    //     } else if (event.target && event.target.classList.contains("offer__slider-next")) {
    //         indexSlider += 1;
    //         indexSlider = showSlider(indexSlider);
    //     }
    // });

    // hideSliders();
    // showSlider(indexSlider); 

    //slider 2 

    function cheking(value,classOfPlace){
        if (value < 10){
            counterSlider.querySelector(classOfPlace).textContent = `0${value}`; 
        } else {
            counterSlider.querySelector(classOfPlace).textContent = `${value}`; 
        }
    }

    const sliders = document.querySelectorAll(".offer__slide"),
          counterSlider = document.querySelector(".offer__slider-counter"),
          sliderWrapper = document.querySelector(".offer__slider-wrapper"),
          sliderFiled = document.querySelector(".offer__slider-inner"),
          width = window.getComputedStyle(sliderWrapper).width,
          allSlider = document.querySelector(".offer__slider"),
          divForDots = document.createElement("div");
          
    let indexSlider = 0,
        offSet = 0;

    cheking("1","#current");
    cheking(sliders.length,"#total");

    sliderFiled.style.width = 100 * sliders.length +"%";
    sliderFiled.style.display = "flex";
    sliderFiled.style.transition = "0.5s all";

    sliders.forEach(slide=>{
        slide.style.width = width;
    });

    sliderWrapper.style.width = width;
    sliderWrapper.style.overflow = "hidden";
    allSlider.style.position = "relative";
    divForDots.classList.add("carousel-indicators");
    allSlider.append(divForDots);
    for(let i=0; i < sliders.length; i++){
        divForDots.innerHTML += `
        <div class="dot" data-current="${i}"></div>
        `;
    }
    const currentDot = divForDots.querySelectorAll(`[data-current]`);
    const markDot = function() {
        currentDot.forEach(item=>item.classList.remove("active"));
        currentDot[indexSlider].classList.add("active");
    };
    markDot();
    currentDot.forEach((item,i)=>{
        item.addEventListener("click",(event)=>{
            offSet = +width.slice(0,width.length-2) * i;
            indexSlider = i;
            cheking(indexSlider+1,"#current");
            sliderFiled.style.transform = `translateX(-${offSet}px)`;
            markDot();
        });
    });


    counterSlider.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains("offer__slider-prev")){
            indexSlider -= 1;
            if (indexSlider == -1 ){
                indexSlider = sliders.length-1;
                markDot();
            } else {
                markDot();
            }
            cheking(indexSlider+1,"#current");

            if (offSet == 0){
                offSet = +width.slice(0,width.length-2) * (sliders.
                length-1);
            }else {
               offSet -= +width.slice(0,width.length-2);
            }
            sliderFiled.style.transform = `translateX(-${offSet}px)`;

        } else if (event.target && event.target.classList.contains("offer__slider-next")) {
            indexSlider += 1;
            if (indexSlider == sliders.length){
                indexSlider = 0;
                markDot();
            } else {
                markDot();
            }
            cheking(indexSlider+1,"#current");

            if (offSet == +width.slice(0,width.length-2) * (sliders.length-1)){
                offSet = 0;
            } else {
                offSet += +width.slice(0,width.length-2);
            }
            sliderFiled.style.transform = `translateX(-${offSet}px)`;


        }
    });    
}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 43:0-14 */
/***/ ((module) => {

function tabs(){
    //Tabs
    const tabContent = document.querySelectorAll('.tabcontent'),
          tabHeaderItems = document.querySelector('.tabheader__items'),
          tabHeaderItem = document.querySelectorAll('.tabheader__item');

    function hideTab() {
        tabHeaderItem.forEach(function(item) {
            item.classList.remove('tabheader__item_active');

        });

        tabContent.forEach(function(item) {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

    }

    function showTab(i=0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabHeaderItem[i].classList.add('tabheader__item_active');
    }

    tabHeaderItems.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('tabheader__item')) {
            tabHeaderItem.forEach(function(item, i) {
                if (event.target == item) {
                    hideTab();
                    showTab(i);

                } 
            });
        }
    });

    hideTab();
    showTab(); 

}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 59:0-14 */
/***/ ((module) => {

function timer(){
    //Timer

    const deadline = '2020-12-10T00:00';


    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total' : t,
            'days' : days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds

        };
    }
    
    function getZero(num) {
        if (num >= 0 && num  < 10) {
            return `0${num}`;
        }else {
            return num;
        }
    }
    function setClock(selector, endtime) {
        const timer = document.querySelector('.timer'),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {

                clearInterval(timeInterval);
         
            }
        }          
    }
    setClock('.timer', deadline);

}

module.exports = timer;

/***/ }),

/***/ "./js/modules/trigers.js":
/*!*******************************!*\
  !*** ./js/modules/trigers.js ***!
  \*******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 49:0-14 */
/***/ ((module) => {

function trigers(){
     //Trigers
     function showModal(){
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        // clearTimeout(openModal);
    }

    function hideModal(){
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }
    function showInPageDowen (){
        if(document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            showModal();
            window.removeEventListener("scroll", showInPageDowen);
        }
    }

    const modalTrigers = document.querySelectorAll("[data-modal]"),
          modalClose = document.querySelector("[data-close]"),
          modal = document.querySelector(".modal");
    
    modalTrigers.forEach((item, i) =>{
        item.addEventListener("click",showModal);
    });

    modalClose.addEventListener("click",hideModal);
    modal.addEventListener("click",(e)=>{
        if(e.target === modal){
            hideModal();
        }
    });

    document.addEventListener('keydown',(e)=>{
        if(e.code === "Escape" && modal.classList.contains("show")){
            hideModal();
        }
    });

    // const openModal = setTimeout(showModal, 6000);

    window.addEventListener("scroll", showInPageDowen);

}

module.exports = trigers;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */


window.addEventListener('DOMContentLoaded', () => {
    const calculatur = __webpack_require__(/*! ./modules/calculatur */ "./js/modules/calculatur.js"),
          menuTabes = __webpack_require__(/*! ./modules/menu_tabs */ "./js/modules/menu_tabs.js"),
          server = __webpack_require__(/*! ./modules/server */ "./js/modules/server.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
          tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          trigers = __webpack_require__(/*! ./modules/trigers */ "./js/modules/trigers.js");
    
    calculatur();
    menuTabes();
    server();
    slider();
    tabs();
    timer();
    trigers();
    
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map