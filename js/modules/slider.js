function slider({sliderNextSelector,sliderPrevSelector,slidersSelector,counterSliderSelector,sliderWrapperSelector,sliderFiledSelector,allSliderSelector}){
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

    const sliders = document.querySelectorAll(slidersSelector),
          counterSlider = document.querySelector(counterSliderSelector),
          sliderWrapper = document.querySelector(sliderWrapperSelector),
          sliderFiled = document.querySelector(sliderFiledSelector),
          width = window.getComputedStyle(sliderWrapper).width,
          allSlider = document.querySelector(allSliderSelector),
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
        if (event.target && event.target.classList.contains(sliderPrevSelector)){
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

        } else if (event.target && event.target.classList.contains(sliderNextSelector)) {
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

export default slider;