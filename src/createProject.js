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

    const allProjects = () => {
        return projectList.map(project => project.title);
        
    }

    const all = () => {
        return projectList.reduce((acc, project) => {
            return acc.concat(project.task || []);
        },[]);
    }

    return {newProject, addTask, projectsList: projectList, allProjects, all, }
})();