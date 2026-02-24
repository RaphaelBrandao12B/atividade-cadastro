const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Verifica se já existe uma preferência salva no LocalStorage
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    body.classList.add(savedTheme);
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Salva a escolha do usuário
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode');
    } else {
        localStorage.setItem('theme', '');
    }
});