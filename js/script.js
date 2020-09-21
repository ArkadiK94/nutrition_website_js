"use strict";

window.addEventListener('DOMContentLoaded', () => {
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

    //Timer

    const deadline = '2020-10-15T00:00';


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


    //Trigers
    function showModal(){
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearTimeout(openModal);
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

    const tabsInMenu = document.querySelectorAll(".container");
    tabsInMenu[4].innerHTML = "";
    const name1 = "Фитнес",
          name2 = "Премиум",
          name3 = "Постное",
          img1 = "img/tabs/vegy.jpg",
          img2 = "img/tabs/elite.jpg",
          img3 = "img/tabs/post.jpg",
          text1 = 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
          text2 = 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
          text3 = 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
          price1 = 10,
          price2 = 550,
          price3 = 430;
          
          
          const item1 = new MenuTabs(name1,img1,text1,price1, tabsInMenu[4], "menu__item", "i", "y","jfdklsj"),
                item2 = new MenuTabs(name2,img2,text2,price2, tabsInMenu[4]),
                item3 = new MenuTabs(name3,img3,text3,price3, tabsInMenu[4]);
          
          item1.showNew();
          console.log(item1);
        
         

   
});