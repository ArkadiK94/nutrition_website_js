function tabs(tabContentSelector,tabHeaderItemsSelector,tabHeaderItemSelector,tabActive){
    //Tabs
    const tabContent = document.querySelectorAll(tabContentSelector),
          tabHeaderItems = document.querySelector(tabHeaderItemsSelector),
          tabHeaderItem = document.querySelectorAll(tabHeaderItemSelector);

    function hideTab() {
        tabHeaderItem.forEach(function(item) {
            item.classList.remove(tabActive);

        });

        tabContent.forEach(function(item) {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

    }

    function showTab(i=0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabHeaderItem[i].classList.add(tabActive);
    }

    tabHeaderItems.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains(tabHeaderItemSelector.slice(1))) {
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

export default tabs;