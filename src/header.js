import logo from './logo.png';
import menu from './menu.svg';

export function header(title) {
    const container = document.querySelector('.container');
    const header = document.createElement('header');
    const menuIcon = new Image();
    menuIcon.src = menu;
    menuIcon.classList.add('menu');

    header.id = "header";
    const icon = new Image();
    icon.src = logo;
    icon.alt = '';
    header.appendChild(icon);
    const titleLogo = document.createElement('h1');
    titleLogo.textContent = title;
    header.appendChild(titleLogo);
    header.appendChild(menuIcon);
    container.appendChild(header);
}