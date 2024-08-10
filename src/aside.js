import { header } from "./header";
import { ButtonGroup } from "./buttonGroup";
import { Button } from "./button";
import plus from './plus.png';
import { newProjectModal } from "./newProjectModal";


export function Aside(title){
    const aside = document.getElementById('aside');
    const PageHeader = header(title);
    const buttons = ButtonGroup();
    const projects = document.createElement('div');
    projects.classList.add('project-list');
    
    const plusIcon = new Image();
    plusIcon.src = plus;
    const newTodo = Button(() => {newProjectModal.showProjectModal()}, 'Add new project', plusIcon);
    newTodo.classList.add('new-project');

    aside.appendChild(PageHeader);
    aside.appendChild(buttons);
    aside.appendChild(projects);
    aside.appendChild(newTodo);


    return aside;
}