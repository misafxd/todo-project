import logo from './logo.png';

export function header(title) {
    const header = document.createElement('header');
    const icon = new Image();
    icon.src = logo;
    icon.alt = '';
    header.appendChild(icon);
    const titleLogo = document.createElement('h1');
    titleLogo.textContent = title;
    header.appendChild(titleLogo);

    return header;
}