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

    // const deadLine = "2020-08-31";
    // function timeLeft (endTime){
    //     const t = Date.parse(endTime) - new Date(),
    //           days = Math.floor(t/(1000*60*60*24)),
    //           hours = Math.floor(t/(1000*60*60) % 24),
    //           minutes = Math.floor(t/(1000*60) % 60),
    //           seconds = Math.floor(t/(1000) % 60);
        
    //     return {
    //         total : t,
    //         days : days,
    //         hours : hours,
    //         minutes : minutes,
    //         seconds : seconds
    //     };
    // }
    // function addZero(num){
    //     if (num >= 0 && num < 10){
    //         return `0${num}`;
    //     } else{
    //         return num;
    //     }
    // }
    // function timerStracture (position, endTime){
    //     const t = document.querySelector(position),
    //           days = t.querySelector("#days"),
    //           hours = t.querySelector("#hours"),
    //           minutes = t.querySelector("#minutes"),
    //           seconds = t.querySelector("#seconds"),
    //           timeUpdating = setInterval(updateTime,1000);
    //     updateTime();

    //     function updateTime (){
    //         const time = timeLeft(endTime);
    //         if (time.total <= 0){
    //             clearInterval(timeUpdating);
    //         } else{
    //             days.innerHTML = addZero(time.days);
    //             hours.innerHTML = addZero(time.hours);
    //             minutes.innerHTML = addZero(time.minutes);
    //             seconds.innerHTML = addZero(time.seconds);
    //         }
    //     }
    // }
    // timerStracture(".timer", deadLine);


    const timeToFinish = "10";
    function timeLeft (endTime){
        const seconds = timeToFinish;
        
        return {
            seconds : seconds
        };
    }
    function addZero(num){
        if (num >= 0 && num < 10){
            return `0${num}`;
        } else{
            return num;
        }
    }
    function timerStracture (position, endTime){
        const t = document.querySelector(position),
              days = t.querySelector("#days"),
              hours = t.querySelector("#hours"),
              minutes = t.querySelector("#minutes"),
              seconds = t.querySelector("#seconds"),
              time = timeLeft(endTime),
              timeUpdating = setInterval(updateTime,1000);
        updateTime();

        function updateTime (){
            if (time.seconds <= -1){
                clearInterval(timeUpdating);
            } else{
                days.innerHTML = "";
                hours.innerHTML = "";
                minutes.innerHTML = "";
                seconds.innerHTML = addZero(time.seconds);
                time.seconds-- ;

            }
        }
    }
    timerStracture(".timer", timeToFinish);


});