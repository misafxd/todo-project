
export function Button(onClick, text, icon) {
    const button = document.createElement('button');
    const textNode = document.createTextNode(text);
   
    button.classList.add('aside-button');
    button.appendChild(icon);
    button.appendChild(textNode);
    button.addEventListener('click', onClick);

    return button;
}