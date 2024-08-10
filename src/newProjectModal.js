import { Projects } from "./createProject";
import { Storage } from "./storage";

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
        title.type = 'text'
        title.name = 'Project-title'
        const titleLabel = document.createElement('label');
        titleLabel.textContent = 'Insert a title'
        modalContainer.classList.add('project-modal-container');
        const submit = document.createElement('button');
        submit.type = 'submit';
         submit.textContent = "Create";
         const closeButton = document.createElement('button');
         closeButton.textContent = "Cancel";
         closeButton.type = 'button'
         closeButton.addEventListener('click',()=> {closeProjectModal()});

         
        

        form.addEventListener('submit', (event)=> {
            event.preventDefault();
            const formData = new FormData(form);
            Projects.newProject(formData.get('Project-title'));
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

    return {
        showProjectModal, closeProjectModal, modalProject
    }

})();