import { Button } from "./button";
import plus from './plus.png';

export function MainContent(){

    const main = document.getElementById('main');
    const mainHeader = document.createElement('div');
    const mainTitle = document.createElement('h2');
    mainHeader.classList.add('main-header');
    mainTitle.textContent = "All";
    const plusIcon = new Image();
    plusIcon.src = plus;

    const addTaskButton = Button(()=> {console.log("new task")},"New task", plusIcon);
    // addTaskButton.classList.remove('aside-button');
    addTaskButton.classList.add('main-button');

    mainHeader.appendChild(mainTitle);
    mainHeader.appendChild(addTaskButton);
    



    main.appendChild(mainHeader);

}