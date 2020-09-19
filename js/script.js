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
   
});