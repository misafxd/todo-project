import { Projects } from "./createProject";
import { Storage } from "./storage";
import { compareAsc, format} from "date-fns";
import { modal } from "./modal";
import erase from "./delete.png";
import edit from "./edit.svg";

export const card = (function() {
    
    
    const createCard = (title, due, project, description, checked) => {
        const card = document.createElement('div');
        const cardInfo = document.createElement('div');
        const cardDescription = document.createElement('div');
        const deleteCard = new Image();
        deleteCard.src = erase;
        deleteCard.alt = "Delete task button";
        card.classList.add('card');
        const cardTitle = document.createElement('h3');
        cardTitle.innerText = title;
        cardTitle.classList.add('task-name')
        const Due = document.createElement('p');
        Due.classList.add('due');
        Due.innerText = `Due: ${due}`;
        const Project = document.createElement('p');
        Project.innerText = `Description: ${description}`;
        cardDescription.classList.add('card-information');
        cardInfo.classList.add('card-info');
        const editIcon = new Image();
        editIcon.src = edit;

        editIcon.addEventListener('click', () => {
            const taskToEdit = { title, due, project, description, checked };
            modal.showModal(taskToEdit);
        })

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = checked;

        checkBox.addEventListener('change', () => {
            updateState(title, checkBox.checked);
            Storage.save();
            
        })

        deleteCard.addEventListener('click', (event) => {
            const target = event.target;
            const parent = target.closest('.card');
        
            if (parent) {
                parent.remove();
                Projects.deleteTask(project, title);
                Storage.save();
            }
        });

        card.appendChild(checkBox);
        cardInfo.appendChild(cardTitle);
        cardDescription.appendChild(Due);
        cardDescription.appendChild(Project);
        cardInfo.appendChild(cardDescription);
        card.appendChild(cardInfo);
        card.appendChild(editIcon);
        card.appendChild(deleteCard);
        
        
        return card;
    }


    const clean = () => {
        const mainCards = document.querySelector('.cards');
        mainCards.innerHTML = '';
    }

    const updateState = (title, state) => {
        Projects.projectsList.forEach(project => {
            let task = project.task.find(t => t.title === title);
            if (task) {
                task.checked = state;
            }
           sortTask()
        })
    }

    const sortTask = () => {
        const mainCards = document.querySelector('.cards');
        const cards = Array.from(mainCards.children);
    
        cards.sort((a, b) => {
            const aDate = new Date(a.querySelector('.due').textContent.split('Due: ')[1]);
            const bDate = new Date(b.querySelector('.due').textContent.split('Due: ')[1]);
           
            let dateComparison = compareAsc(aDate, bDate);

            return dateComparison;
            
        
        });

        cards.sort((a,b) => {
            const aChecked = a.querySelector('input[type="checkbox"]').checked;
            const bChecked = b.querySelector('input[type="checkbox"]').checked;
            return (aChecked - bChecked);
        })
    
        cards.forEach(card => mainCards.appendChild(card));
    }

    const showAllCards = () => {
        const mainCards = document.querySelector('.cards');
        const title = document.querySelector('.main-title');
        title.textContent = 'All'
        const allTask = Projects.all();
        clean();

        

        allTask.forEach(task => {
            let newTask = createCard(task.title, task.due, task.project_id, task.description, task.checked);
            mainCards.appendChild(newTask);
        });

        sortTask()

    }

    const showTodayCards = () => {
        const mainCards = document.querySelector('.cards');
        const title = document.querySelector('.main-title');
        const today = format(new Date(), 'yyyy-MM-dd');
        const allTask = Projects.all()
        const todayTask = allTask.filter(task => task.due === today);

        clean();

        todayTask.forEach(task => {
            let newTask = createCard(task.title, task.due, task.project_id, task.description, task.checked);
                mainCards.appendChild(newTask);
        });

        title.textContent = 'Today'


        sortTask();
    }

    const showCompleted = () => {
        const mainCards = document.querySelector('.cards');
        const title = document.querySelector('.main-title');
        const allTask = Projects.all();
        const completedtask = allTask.filter(task => task.checked === true);
        clean();

        completedtask.forEach(task => {
            let newTask = createCard(task.title, task.due, task.project_id,  task.description, task.checked);
            newTask.classList.add('deleted');
                mainCards.appendChild(newTask);
        })

        title.textContent = 'Completed'
        
        sortTask();
    }

    const showProjectCards = (title) => {
        const mainCards = document.querySelector('.cards');
        const mainTitle = document.querySelector('.main-title');
        const project = Projects.projectsList.filter(p => p.title == title);
        const projectTask = project[0].task;
        const empty = document.createElement('h3');
        empty.textContent = 'Empty project!!! please add a new task :C';
        empty.classList.add('empty');
        
        clean();

        if (projectTask.length > 0){
        projectTask.forEach( task => {
 
            let newTask = createCard(task.title, task.due, task.project_id,  task.description,task.checked);
            mainCards.appendChild(newTask);
            
        })} else {
            mainCards.appendChild(empty);
        }

        mainTitle.textContent = title;
        sortTask();
    }

    return {
        createCard, showAllCards, sortTask, showTodayCards, showCompleted, showProjectCards
    }
})();