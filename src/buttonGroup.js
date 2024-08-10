import { Button } from "./button";
import { card } from "./taskCard";
import home from './home.png';
import today from './today.png';
import completed from './completed.png';
import project from './project.png';
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
        const size = projectList.childNodes.length;
        const listButtons = Projects.allProjects();
        listButtons.forEach(element => {
            if (element != 'All' && size == 0){
                newProjectModal.addProjectButton(() => {card.showProjectCards(element)},element);
            }
        });
}


