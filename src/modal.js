import { Projects } from "./createProject";
import { createTask } from "./createTask";

export function modal(){
    const body = document.getElementById('body');
    const modalContainer = document.createElement('div');
    const modalContent = document.createElement('div');
    const form = document.createElement('form');
    const closeButton = document.createElement('button');
    const title = createInput('text', 'Title');
    const due = createInput('date', 'Date');
    const description = createInput('text', 'Description');
    const projectName = document.createElement('select');
    projectName.id = 'Project';
    projectName.setAttribute('name', "Project");
    modalContent.classList.add('modal');
    modalContainer.classList.add('modal-container');

    if (Projects.all().length <= 0){
        Projects.newProject('All');
        const option = document.createElement('option');
        option.textContent = 'All';
        projectName.appendChild(option);
    }else {
        Projects.all().forEach(title => {
            let option = document.createElement('option');
            option.textContent = title;
            option.value = title;
            projectName.appendChild(option);
        })
    }

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.textContent = "Create";

    form.addEventListener('submit', (event)=> {
        event.preventDefault();
        const formData = new FormData(form);
        const taskObject = createTask.newTask(formData.get('Title'), formData.get('Date'),formData.get('Description'), formData.get('Project'));
        Projects.addTask(taskObject.project_id, taskObject);
        closeModal();
        form.reset();
    })

    closeButton.textContent = "Cancel";
    closeButton.type = 'button'
    closeButton.addEventListener('click',()=> {closeModal()});


    const titleLabel = createLabel('Title');
    const dueLabel = createLabel('Date');
    const descriptionLabel = createLabel('Description');
    const projectLabel = createLabel('Project')

    form.appendChild(titleLabel);
    form.appendChild(title);
    form.appendChild(dueLabel);
    form.appendChild(due);
    form.appendChild(descriptionLabel);
    form.appendChild(description);
    form.appendChild(projectLabel);
    form.appendChild(projectName);
    form.appendChild(submit);
    
    form.appendChild(closeButton);
    modalContent.appendChild(form);

    modalContainer.appendChild(modalContent);

    body.appendChild(modalContainer);
    
}

export function showModal(){
    const modal = document.querySelector('.modal-container');
    modal.classList.add('modal-visible');   
}

function closeModal(){
    const modal = document.querySelector('.modal-container');
    modal.classList.remove('modal-visible');
}

function createInput(type, label){
    const input = document.createElement('input');

    input.type = type;
    input.name = label;
    input.id = label;
    input.required = true;

    return input
    
}

function createLabel(label){
    const inputLabel = document.createElement('label');
    inputLabel.textContent = label;
    inputLabel.setAttribute('for', label);
     return inputLabel;
}

