import { Button } from "./button";
import plus from './plus.png';
import { modal , showModal } from "./modal";
import { card } from "./taskCard";

export function MainContent(){
    modal();

    const main = document.getElementById('main');
    const mainHeader = document.createElement('div');
    const mainTitle = document.createElement('h2');
    mainHeader.classList.add('main-header');
    mainTitle.textContent = "All";
    const plusIcon = new Image();
    plusIcon.src = plus;

    const addTaskButton = Button(() => {showModal()},"New task", plusIcon);
    addTaskButton.classList.add('main-button');

    mainHeader.appendChild(mainTitle);
    mainHeader.appendChild(addTaskButton);
    
    
    // const newCard = card.domCard('Misa', '2024-12-05', 'La rata'); para pruebas

    main.appendChild(mainHeader);
    // main.appendChild(newCard); solo para pruebas

}