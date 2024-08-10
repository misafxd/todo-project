import { Projects } from "./createProject";
import { Storage } from "./storage";
import { compareAsc, format} from "date-fns";

export const card = (function() {
    
    
    const createCard = (title, due, project, checked) => {
        const card = document.createElement('div');
        const cardInfo = document.createElement('div');
        const cardDescription = document.createElement('div');
        card.classList.add('card');
        const cardTitle = document.createElement('h3');
        cardTitle.innerText = title;
        const Due = document.createElement('p');
        Due.classList.add('due');
        Due.innerText = `Due: ${due}`;
        const Project = document.createElement('p');
        Project.innerText = `Project: ${project}`;
        cardDescription.classList.add('card-information');
        cardInfo.classList.add('card-info');

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = checked;

        checkBox.addEventListener('change', () => {
            updateState(title, checkBox.checked);
            Storage.save();
            
        })

        card.appendChild(checkBox);
        cardInfo.appendChild(cardTitle);
        cardDescription.appendChild(Due);
        cardDescription.appendChild(Project);
        cardInfo.appendChild(cardDescription);
        card.appendChild(cardInfo);
        
        
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
            let newTask = createCard(task.title, task.due, task.project_id, task.checked);
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
            let newTask = createCard(task.title, task.due, task.description, task.checked);
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
            let newTask = createCard(task.title, task.due, task.description, task.checked);
            newTask.classList.add('deleted');
                mainCards.appendChild(newTask);
        })

        title.textContent = 'Completed'
        
        sortTask();
    }

    return {
        createCard, showAllCards, sortTask, showTodayCards, showCompleted
    }
})();