import {postData} from '../services/services';
import {showModal,hideModal} from "./trigers";

function form (formSelector,modalWindow,modalSelector,openModal){
    //post data to server
    const formInPage = document.querySelectorAll(formSelector),
          modal = document.querySelector(modalSelector);
    
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
        const prevModal = document.querySelector(modalWindow);
        prevModal.classList.add("hide");
        showModal(modalSelector,openModal);
        const newModal = document.createElement("div");
        newModal.classList.add(modalWindow.slice(1));
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
            hideModal(modalSelector);
        },2000);
    }

}

export default form;