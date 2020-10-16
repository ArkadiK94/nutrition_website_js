"use strict";
import calculatur from './modules/calculatur';
import menuTabes from './modules/menu_tabs';
import form from './modules/form';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import trigers from './modules/trigers';
import {showModal} from './modules/trigers';

window.addEventListener('DOMContentLoaded', () => { 
    const openModal = setTimeout(() => showModal(".modal",openModal), 6000);

    calculatur();
    menuTabes(".container",);
    form("form",".modal__dialog",".modal",openModal);
    tabs('.tabcontent','.tabheader__items','.tabheader__item','tabheader__item_active');
    timer('.timer','2020-12-10T00:00');
    trigers("[data-modal]","[data-close]",".modal",openModal);
    slider({
        slidersSelector: ".offer__slide",
        counterSliderSelector: ".offer__slider-counter",
        sliderWrapperSelector: ".offer__slider-wrapper",
        sliderFiledSelector: ".offer__slider-inner",
        allSliderSelector: ".offer__slider",
        sliderPrevSelector: "offer__slider-prev",
        sliderNextSelector: "offer__slider-next"
    });
    
});