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