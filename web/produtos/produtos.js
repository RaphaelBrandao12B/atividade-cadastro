// 1. Seleção de elementos e aplicação inicial do tema
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');

// Verifica o tema salvo (ajuste 'dark-mode' para 'dark' se seu CSS for assim)
if (localStorage.getItem('theme') === 'dark-mode') {
    body.classList.add('dark-mode');
}

// 2. Lógica do Botão de Alternar Tema
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Salva a escolha para as outras páginas
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark-mode');
        } else {
            localStorage.setItem('theme', 'light-mode');
        }
    });
}

// 3. Função para carregar produtos
async function carregarProdutos() {
    const lista = document.getElementById('lista-produtos');
    try {
        const res = await fetch('http://localhost:3000/produtos');
        const produtos = await res.json();

        if (produtos.length === 0) {
            lista.innerHTML = "<p class='vazio'>Ops! Nenhum produto encontrado no estoque.</p>";
            return;
        }

        // Limpa a lista antes de adicionar para evitar duplicatas
        lista.innerHTML = ""; 

        produtos.forEach(p => {
            lista.innerHTML += `
                <div class="card-item">
                    <h4>${p.nome}</h4>
                    <span>${p.categoria}</span>
                    <p class="preco">R$ ${p.preco}</p>
                </div>`;
        });
    } catch (err) {
        lista.innerHTML = "<p class='vazio'>Erro ao conectar com o servidor.</p>";
    }
}

carregarProdutos();