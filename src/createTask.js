export const createTask = (function() {
    const newTask = (title, due ,description, project_id) => {
        return {title, due, description, project_id};
    }

    return {
        newTask,
    }

})();