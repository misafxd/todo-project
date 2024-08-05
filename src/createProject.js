export const Projects = ( function () {
    const projectList = [];

    const createNewProject = (title) =>{
        return {title, "task": []};
    }

    const newProject = (title) => {
        const project = createNewProject(title);
        projectList.push(project);
        
    }

    const addTask = (project,task) => {
        const toUpdate = projectList.find(p => p.title === project);
        toUpdate.task.push(task);
    }

    return {newProject, addTask, projectsList: projectList}
})();