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

    const openModal = setTimeout(showModal, 6000);

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
});