document.addEventListener('DOMContentLoaded', () => {
    
    
    const ctaButton = document.getElementById('cta-button');
    const inscricaoSection = document.getElementById('inscricao');

    ctaButton.addEventListener('click', () => {
        inscricaoSection.scrollIntoView({ behavior: 'smooth' });
    });

    const cepInput = document.getElementById('cep');
    const cidadeInput = document.getElementById('cidade');
    const estadoInput = document.getElementById('estado');

    cepInput.addEventListener('blur', () => {
        let cep = cepInput.value.replace(/\D/g, '');

        if (cep.length === 8) {
            const url = `https://viacep.com.br/ws/${cep}/json/`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        cidadeInput.value = data.localidade;
                        estadoInput.value = data.uf;
                    } else {
                        alert('CEP não encontrado. Por favor, verifique o número.');
                        cidadeInput.value = '';
                        estadoInput.value = '';
                    }
                })
                .catch(error => {
                    console.error('Erro ao buscar o CEP:', error);
                    alert('Erro ao consultar o CEP. Verifique sua conexão.');
                });
        }
    });

    const cadastroForm = document.getElementById('cadastro-form');
    const mensagemSucesso = document.getElementById('mensagem-sucesso');
    const userNameSpan = document.getElementById('user-name');

    cadastroForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede a página de recarregar

        const nome = document.getElementById('nome').value;

        userNameSpan.textContent = nome;

        cadastroForm.style.display = 'none';
        mensagemSucesso.classList.remove('hidden');
    });
});