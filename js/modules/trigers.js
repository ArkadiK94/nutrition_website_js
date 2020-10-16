function showModal(modalSelector,openModal){
    const modal = document.querySelector(modalSelector);
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    if (openModal){
        clearTimeout(openModal);
    }
}

function hideModal(modalSelector){
    const modal = document.querySelector(modalSelector);
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
}

function trigers(modalTrigersSelector,modalCloseSelector,modalSelector,openModal){
    //Trigers 
    function showInPageDowen (){
        if(document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            showModal(".modal",openModal);
            window.removeEventListener("scroll", showInPageDowen);
        }
    }

    const modalTrigers = document.querySelectorAll(modalTrigersSelector),
          modalClose = document.querySelector(modalCloseSelector),
          modal = document.querySelector(modalSelector);
    
    modalTrigers.forEach((item, i) =>{
        item.addEventListener("click",() => showModal(modalSelector,openModal));
    });

    modalClose.addEventListener("click", () => hideModal(modalSelector));
    modal.addEventListener("click",(e)=>{
        if(e.target === modal){
            hideModal(modalSelector);
        }
    });

    document.addEventListener('keydown',(e)=>{
        if(e.code === "Escape" && modal.classList.contains("show")){
            hideModal(modalSelector);
        }
    });


    window.addEventListener("scroll", showInPageDowen);

}

export default trigers;
export {showModal,hideModal};