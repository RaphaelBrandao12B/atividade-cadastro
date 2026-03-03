// 1. Seleção de elementos e aplicação inicial do tema
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');

if (localStorage.getItem('theme') === 'dark-mode') {
    body.classList.add('dark-mode');
}

// 2. Lógica do Botão de Alternar Tema
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark-mode');
        } else {
            localStorage.setItem('theme', 'light-mode');
        }
    });
}

// 3. Função para carregar produtos (COM A OPÇÃO DO BOTÃO DE APAGAR)
async function carregarProdutos() {
    const lista = document.getElementById('lista-produtos'); //
    try {
        const res = await fetch('http://localhost:3000/produtos'); //
        const produtos = await res.json();

        if (produtos.length === 0) {
            lista.innerHTML = "<p class='vazio'>Ops! Nenhum produto encontrado no estoque.</p>";
            return;
        }

        lista.innerHTML = ""; 

        produtos.forEach(p => {
            // Abaixo está a Opção 2 integrada: o botão com o evento onclick
            lista.innerHTML += `
                <div class="card-item">
                    <h4>${p.nome}</h4>
                    <span>${p.categoria}</span>
                    <p class="preco">R$ ${p.preco}</p>
                    <button class="btn-delete" onclick="apagarProduto(${p.id})">🗑️ Apagar</button>
                </div>`;
        });
    } catch (err) {
        lista.innerHTML = "<p class='vazio'>Erro ao conectar com o servidor.</p>";
    }
}

// 4. FUNÇÃO PARA DELETAR: Faz a conexão com a rota DELETE do backend
async function apagarProduto(id) {
    if (confirm("Deseja realmente excluir este produto?")) {
        try {
            const res = await fetch(`http://localhost:3000/produtos/${id}`, {
                method: 'DELETE' // Chama a rota DELETE criada no backend
            });

            if (res.ok) {
                alert("Sucesso! Item removido."); // Mensagem de sucesso solicitada
                carregarProdutos(); // Atualiza a tela sem precisar dar F5
            } else {
                alert("Erro ao apagar o produto no servidor.");
            }
        } catch (err) {
            console.error("Erro na requisição:", err);
            alert("Não foi possível conectar ao servidor. O XAMPP está ligado?");
        }
    }
}

carregarProdutos();