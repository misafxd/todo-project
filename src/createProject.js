import { Storage } from "./storage";

export const Projects = ( function () {
    let projectList = [];

    if (Storage.load()){
        projectList = Storage.load();
    }


    const createNewProject = (title) =>{
        return {title, "task": []};
    }

    const newProject = (title) => {
        const project = createNewProject(title);
        projectList.push(project);
        
    }

    const addTask = (project, task) => {
        const toUpdate = projectList.find(p => p.title === project);
        toUpdate.task.push(task);
    }

    const deleteTask = (projectTitle, taskTitle) => {
        const project = projectList.find(proj => proj.title === projectTitle);
        if (project) {
            const taskIndex = project.task.findIndex(task => task.title === taskTitle);
            if (taskIndex !== -1) {
                project.task.splice(taskIndex, 1);
            }
        }
    }

    const findTask = (projectTitle, taskTitle) => {
        const project = projectList.find(proj => proj.title == projectTitle);
        if(project){
            const taskIndex = project.task.findIndex(task => task.title === taskTitle);
            return project.task[taskIndex];
        }
    }

    const updateTask = (oldProjectTitle, taskTitle, updatedTask) => {
        deleteTask(oldProjectTitle, taskTitle)
        
        // Encuentra el nuevo proyecto (o crea uno nuevo si no existe)
        const newProject = projectList.find(proj => proj.title === updatedTask.project_id);
        if (newProject) {
            // Agrega la tarea al nuevo proyecto
            newProject.task.push(updatedTask);
        } else {
            // Si el proyecto no existe, crea uno nuevo y agrega la tarea
            const newProject = createNewProject(updatedTask.project);
            newProject.task.push(updatedTask);
            projectList.push(newProject);
        }
        
    };

    const allProjects = () => {
        return projectList.map(project => project.title);
        
    }

    const projectIndex = (title) => {
       return projectList.findIndex(project => project.title === title)
    }

    const deleteProject = (title) => {
        const index = projectIndex(title);
        if(index !== -1){
            projectList.splice(index, 1);
        }
    }

    const all = () => {
        return projectList.reduce((acc, project) => {
            return acc.concat(project.task || []);
        },[]);
    }

    return {newProject, addTask, projectsList: projectList, allProjects, all, deleteProject, deleteTask, updateTask, findTask }
})();