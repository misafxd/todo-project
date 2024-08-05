import { Button } from "./button";

export function MainContent(){

    const main = document.getElementById('main');
    const mainHeader = document.createElement('h2');
    mainHeader.classList.add('main-header');
    mainHeader.textContent = "All";
    



    main.appendChild(mainHeader);

}