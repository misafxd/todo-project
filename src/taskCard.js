import { Projects } from "./createProject";
import { Storage } from "./storage";

export const card = (function() {
    
    
    const createCard = (title, due, project,checked) => {
        const card = document.createElement('div');
        const cardInfo = document.createElement('div');
        const cardDescription = document.createElement('div');
        card.classList.add('card');
        const cardTitle = document.createElement('h3');
        cardTitle.innerText = title;
        const Due = document.createElement('p');
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
        })
    }

    const showAllCards = () => {
        const mainCards = document.querySelector('.cards');
        const allTask = Projects.all();
        clean();

        

        allTask.forEach(task => {
            let newTask = createCard(task.title, task.due, task.description, task.checked);
            mainCards.appendChild(newTask);
        });


    }

    return {
        createCard, showAllCards
    }
})();