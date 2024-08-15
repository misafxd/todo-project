import { Button } from "./button";
import { card } from "./taskCard";
import home from './home.svg';
import today from './today.svg';
import completed from './completed.svg';
import project from './project.svg';
import { Projects } from "./createProject";
import { newProjectModal } from "./newProjectModal";

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
    homeIcon.alt = ''
    todayIcon.alt = ''
    projectsIcon.alt = ''
    completedIcon.alt = ''
   

    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('button-group');

    const buttons = [
        {icon: homeIcon, onClick: () => {card.showAllCards()}, text: 'All'},
        {icon: todayIcon, onClick: () => {card.showTodayCards()}, text: 'Today'},
        {icon: completedIcon, onClick: () => {card.showCompleted()}, text: 'Completed'},
        {icon: projectsIcon, onClick: () => {showAllButtons()}, text: 'Projects'}

    ]

    buttons.map((btn) => {
        buttonGroup.appendChild(Button(btn.onClick, btn.text, btn.icon));
    });

    return buttonGroup;

}

function showAllButtons() {
        const projectList = document.querySelector('.project-list');
        projectList.classList.toggle('visible');
}


