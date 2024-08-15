import { Projects } from "./createProject";
import { Storage } from "./storage";
import { Button } from "./button";
import { card } from "./taskCard";
import erase from "./delete.png"
import assignment from "./assignment.svg"


export const newProjectModal = ( function() {

    const showProjectModal = () => {
        const projectModal = document.querySelector('.project-modal-container');
        projectModal.classList.add('modal-visible');
    }

    const closeProjectModal = () => {
        const projectModal = document.querySelector('.project-modal-container');
        projectModal.classList.remove('modal-visible');
    }

    const modalProject = () => {
        const body = document.getElementById('body');
        const modalContainer = document.createElement('div');
        const form = document.createElement('form');
        const title = document.createElement('input');
        title.type = 'text';
        title.name = 'Project-title';
        title.required = true;
        const titleLabel = document.createElement('label');
        titleLabel.textContent = 'Insert a project title'
        modalContainer.classList.add('project-modal-container');
        const submit = document.createElement('button');
        submit.type = 'submit';
         submit.textContent = "Create";
         const closeButton = document.createElement('button');
         closeButton.textContent = "Cancel";
         closeButton.classList.add('secondary');
         closeButton.type = 'button'
         closeButton.addEventListener('click',()=> {closeProjectModal()});

        form.addEventListener('submit', (event)=> {
            event.preventDefault();
            const formData = new FormData(form);
            let title = formData.get('Project-title');
            Projects.newProject(title);
            closeProjectModal();
            form.reset();
            Storage.save();
        });

        form.appendChild(titleLabel);
        form.appendChild(title);
        form.appendChild(submit);
        form.appendChild(closeButton);
        modalContainer.appendChild(form);

        body.appendChild(modalContainer);
        
    }


    const addProjectButton = (onClick, title) => {
        const buttonGroup = document.querySelector('.project-list');
        const eraseIcon = new Image();
        eraseIcon.src = erase;
        eraseIcon.classList.add('delete-project');
        eraseIcon.alt = "Delete project button";
        const icono = new Image();
        icono.src = assignment;
        let btn = Button(onClick, title, icono);
        

        eraseIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            const target = event.target;
            const parent = target.closest('.project-list-btn');
            
            if (parent) {
              parent.remove();
              Projects.deleteProject(title);
              Storage.save();
              card.showAllCards();
            } 
        })

        btn.appendChild(eraseIcon)

        btn.classList.add('project-list-btn');
        btn.classList.remove('aside-button');
        
        buttonGroup.appendChild(btn);
        
    }

    return {
        showProjectModal, closeProjectModal, modalProject, addProjectButton
    }

})();