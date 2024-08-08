import { Button } from "./button";
import { card } from "./taskCard";
import home from './home.png';
import today from './today.png';
import completed from './completed.png';
import project from './project.png';

function addIcon(icon) {
    const newIcon = new Image();
    newIcon.src = icon;

    return newIcon;
}

export function ButtonGroup () {
    const homeIcon = addIcon(home);
    const todayIcon = addIcon(today);
    const projectsIcon = addIcon(project);
    const completedIcon = addIcon(completed);
   

    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('button-group');

    const buttons = [
        {icon: homeIcon, onClick: () => {card.showAllCards()}, text: 'All'},
        {icon: todayIcon, onClick: () => console.log('click 2'), text: 'Today'},
        {icon: projectsIcon, onClick: () => console.log('click 3'), text: 'Projects'},
        {icon: completedIcon, onClick: () => console.log('click 4'), text: 'Completed'}
    ]

    buttons.map((btn) => {
        buttonGroup.appendChild(Button(btn.onClick, btn.text, btn.icon));
    });

    return buttonGroup;

}


