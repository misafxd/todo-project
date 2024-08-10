import { Projects } from "./createProject";
import { createTask } from "./createTask";
import { card } from "./taskCard";
import { Storage } from "./storage";

export const modal = (function() {
    let modalContainer;
    let modalContent;
    let form;
    let projectName;

    function createModal() {
        const body = document.getElementById('body');
        modalContainer = document.createElement('div');
        modalContent = document.createElement('div');
        form = document.createElement('form');
        const closeButton = document.createElement('button');
        const title = createInput('text', 'Title');
        const due = createInput('date', 'Date');
        const description = createInput('text', 'Description');
        projectName = document.createElement('select');
        projectName.id = 'Project';
        projectName.setAttribute('name', "Project");

        modalContent.classList.add('modal');
        modalContainer.classList.add('modal-container');

        const submit = document.createElement('button');
        submit.type = 'submit';
        submit.textContent = "Create";

        form.addEventListener('submit', handleSubmit);

        closeButton.textContent = "Cancel";
        closeButton.type = 'button';
        closeButton.addEventListener('click', closeModal);

        form.appendChild(createLabel('Title'));
        form.appendChild(title);
        form.appendChild(createLabel('Date'));
        form.appendChild(due);
        form.appendChild(createLabel('Description'));
        form.appendChild(description);
        form.appendChild(createLabel('Project'));
        form.appendChild(projectName);
        form.appendChild(submit);
        form.appendChild(closeButton);

        modalContent.appendChild(form);
        modalContainer.appendChild(modalContent);
        body.appendChild(modalContainer);
    }

    function updateProjectOptions() {
        projectName.innerHTML = '';

        if (Projects.allProjects().length === 0) {
            Projects.newProject('All');
            const option = document.createElement('option');
            option.textContent = 'All';
            projectName.appendChild(option);
        } else {
            Projects.allProjects().forEach(title => {
                let option = document.createElement('option');
                option.textContent = title;
                option.value = title;
                projectName.appendChild(option);
            });
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const taskObject = createTask.newTask(formData.get('Title'), formData.get('Date'), formData.get('Description'), formData.get('Project'));
        Projects.addTask(taskObject.project_id, taskObject);
        closeModal();
        form.reset();
        card.showAllCards();
        card.sortTask();
        Storage.save();
    }

    function showModal() {
        if (!modalContainer) {
            createModal();
        }
        updateProjectOptions();
        modalContainer.classList.add('modal-visible');
    }

    function closeModal() {
        if (modalContainer) {
            modalContainer.classList.remove('modal-visible');
        }
    }

    function createInput(type, label) {
        const input = document.createElement('input');
        input.type = type;
        input.name = label;
        input.id = label;
        input.required = true;
        return input;
    }

    function createLabel(label) {
        const inputLabel = document.createElement('label');
        inputLabel.textContent = label;
        inputLabel.setAttribute('for', label);
        return inputLabel;
    }

    return {
        showModal,
        closeModal
    };
})();


