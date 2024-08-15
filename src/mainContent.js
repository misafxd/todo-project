import { Button } from "./button";
import plus from './plus.svg';
import { modal } from "./modal";
import { card } from "./taskCard";
import { newProjectModal } from "./newProjectModal";


export function MainContent(){
    newProjectModal.modalProject();

    const main = document.getElementById('main');
    const mainHeader = document.createElement('div');
    const mainTitle = document.createElement('h2');
    const mainCards = document.createElement('section');
    mainTitle.classList.add('main-title');
    mainCards.classList.add('cards');
    mainHeader.classList.add('main-header');
    mainTitle.textContent = "All";
    const plusIcon = new Image();
    plusIcon.src = plus;
    plusIcon.alt = '';

    const addTaskButton = Button(() => {modal.showModal()},"New task", plusIcon);
    addTaskButton.classList.add('main-button');

    mainHeader.appendChild(mainTitle);
    mainHeader.appendChild(addTaskButton);
       

    main.appendChild(mainHeader);
    main.appendChild(mainCards);
    card.showAllCards();
    card.sortTask();

}