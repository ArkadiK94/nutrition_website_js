"use strict";

window.addEventListener('DOMContentLoaded', () => {
    const calculatur = require('./modules/calculatur'),
          menuTabes = require('./modules/menu_tabs'),
          server = require('./modules/server'),
          slider = require('./modules/slider'),
          tabs = require('./modules/tabs'),
          timer = require('./modules/timer'),
          trigers = require('./modules/trigers');
    
    calculatur();
    menuTabes();
    server();
    slider();
    tabs();
    timer();
    trigers();
    
});