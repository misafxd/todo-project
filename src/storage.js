import { Projects } from "./createProject";

export const Storage = (function() {
    
    const save = () => {
        localStorage.setItem('Projects', JSON.stringify(Projects.projectsList));
    }

    const load = () => {
        return JSON.parse(localStorage.getItem('Projects'));
    }

    return {
        save, load
    }

})();