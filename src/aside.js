import { ButtonGroup } from "./buttonGroup";
import { Button } from "./button";
import plus from './plus.svg';
import { newProjectModal } from "./newProjectModal";
import { Projects } from "./createProject";
import { card } from "./taskCard";

export function Aside(){
    const active = document.querySelector('.menu')
    const aside = document.getElementById('aside');
    const buttons = ButtonGroup();
    const projects = document.createElement('div');
    projects.classList.add('project-list');
    const list = Projects.allProjects();
    const size = projects.childNodes.length;
    
    active.addEventListener('click',() => {
        aside.classList.toggle('active');
    })
    const plusIcon = new Image();
    plusIcon.src = plus;
    plusIcon.alt = ''
    const newTodo = Button(() => {newProjectModal.showProjectModal()}, 'Add new project', plusIcon);
    newTodo.classList.add('new-project');

    aside.appendChild(buttons);
    aside.appendChild(projects);
    aside.appendChild(newTodo);

    list.forEach(element => {
        if(element != 'All' && size == 0){
            newProjectModal.addProjectButton(() => {card.showProjectCards(element)}, element);
        }
    });

    return aside;
}