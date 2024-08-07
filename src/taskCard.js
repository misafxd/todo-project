export const card = (function() {
    const domCard = (title, due, project) => {
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
        checkBox.addEventListener('click', () => {
            card.classList.toggle('checked');
        })

        cardInfo.appendChild(cardTitle);
        cardDescription.appendChild(Due);
        cardDescription.appendChild(Project);
        cardInfo.appendChild(cardDescription);
        card.appendChild(cardInfo);
        card.appendChild(checkBox);
        
        return card;


    }

    const newCard = (project) => {
        


    }

    return {
        domCard
    }
})();