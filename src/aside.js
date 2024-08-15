import { header } from "./header";
import { ButtonGroup } from "./buttonGroup";
import { Button } from "./button";
import plus from './plus.svg';
import { newProjectModal } from "./newProjectModal";
import { Projects } from "./createProject";
import { card } from "./taskCard";

export function Aside(title){
    const aside = document.getElementById('aside');
    const PageHeader = header(title);
    const buttons = ButtonGroup();
    const projects = document.createElement('div');
    projects.classList.add('project-list');
    const list = Projects.allProjects();
    const size = projects.childNodes.length;
    
    
    const plusIcon = new Image();
    plusIcon.src = plus;
    plusIcon.alt = ''
    const newTodo = Button(() => {newProjectModal.showProjectModal()}, 'Add new project', plusIcon);
    newTodo.classList.add('new-project');

    aside.appendChild(PageHeader);
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