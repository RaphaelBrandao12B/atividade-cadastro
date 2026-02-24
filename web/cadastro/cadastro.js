// 1. Manter a consistência do tema ao carregar a página
const body = document.body;
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    body.classList.add(savedTheme);
}

// 2. Lógica de envio do formulário
const formCadastro = document.getElementById('form-cadastro');

formCadastro.addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede a página de recarregar

    // Captura os valores dos inputs
    const nome = document.getElementById('nome').value;
    const categoria = document.getElementById('categoria').value;
    const preco = document.getElementById('preco').value;

    // Monta o objeto com os dados (deve ser igual ao que o backend espera)
    const novoProduto = {
        nome: nome,
        categoria: categoria,
        preco: preco
    };

    try {
        // Envia os dados para o servidor usando fetch
        const response = await fetch('http://localhost:3000/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoProduto)
        });

        if (response.ok) {
            alert('Sucesso! Item cadastrado com sucesso.');
            formCadastro.reset(); // Limpa os campos do formulário
            
            // Redireciona para a vitrine para ver o item novo
            window.location.href = '../produtos/produtos.html';
        } else {
            const erro = await response.json();
            alert('Erro ao cadastrar: ' + (erro.message || 'Verifique o servidor.'));
        }

    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Não foi possível conectar ao servidor. Verifique se o backend está rodando!');
    }
});