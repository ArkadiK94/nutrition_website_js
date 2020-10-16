import {getData} from "../services/services";

function menuTabs(container){
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
    
    const tabsInMenu = document.querySelectorAll(container);
    tabsInMenu[4].innerHTML = "";
    getData("http://localhost:3000/menu")
    .then(data => {
        data.forEach(({img,title,descr,price}) => {
            new MenuTabs(title,img,descr,price, tabsInMenu[4], "menu__item", "i", "y","jfdklsj").showNew();
        });
    });

    
}

export default menuTabs;