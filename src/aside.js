import { header } from "./header";
import { ButtonGroup } from "./buttonGroup";
import { Button } from "./button";
import plus from './plus.png';
import { Projects } from './createProject';


export function Aside(title){
    const aside = document.getElementById('aside');
    const PageHeader = header(title);
    const buttons = ButtonGroup();
    const plusIcon = new Image();
    plusIcon.src = plus;
    const newTodo = Button(() => console.log('nuevo'), 'Add new todo', plusIcon);
    newTodo.classList.add('new-project');
    aside.appendChild(PageHeader);
    aside.appendChild(buttons);
    aside.appendChild(newTodo)

    return aside;
}