
export function Button(onClick, text, icon) {
    const button = document.createElement('button');
    const btnName = document.createElement('h4');
    const textNode = document.createTextNode(text);
   
    button.classList.add('aside-button');
    if(icon){
        button.appendChild(icon);
    }
    button.appendChild(textNode);
    button.addEventListener('click', onClick);

    return button;
}