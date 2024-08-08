import { format } from "date-fns";
import { Projects } from "./createProject";
import { card } from "./taskCard";

export function showTodayCards(){
    const mainCards = document.querySelector('.cards');
    const today = format(new Date(), 'yyyy-MM-dd');

    const alltask = Projects.projectsList.flatMap(element => element.task);

    const todayTask = alltask.filter(task => task.due === today);

    card.clean();

    todayTask.forEach(task => {
        let newTask = card.createCard(task.title, task.due, task.description, task.checked);
            mainCards.appendChild(newTask);
    });

    card.sortTask();
}