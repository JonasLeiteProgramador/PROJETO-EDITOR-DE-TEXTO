
const entradaTexto = document.getElementById('entrada-texto');
const botaoSalvar = document.getElementById('botao-salvar');
const botaoEditar = document.getElementById('botao-editar');
const botaoExcluir = document.getElementById('botao-excluir');
const listaEntradas = document.getElementById('lista-entradas');
const botaoBaixar = document.getElementById('botao-baixar');


class Anotacoes {
    constructor() {
        this.entradaTexto = document.getElementById('entrada-texto');
        this.botaoSalvar = document.getElementById('botao-salvar');
        this.botaoEditar = document.getElementById('botao-editar');
        this.botaoExcluir = document.getElementById('botao-excluir');
        this.listaEntradas = document.getElementById('lista-entradas');
        this.botaoBaixar = document.getElementById('botao-baixar');

        this.botaoSalvar.addEventListener('click', () => this.adicionarEntrada());
        this.botaoEditar.addEventListener('click', () => this.editarEntrada());
        this.botaoExcluir.addEventListener('click', () => this.excluirEntrada());
        this.botaoBaixar.addEventListener('click', () => this.baixarArquivo());

        this.carregarEntradas();
    }

    carregarEntradas() {
        this.entradas = JSON.parse(localStorage.getItem('entradasDiario')) || [];
        this.exibirEntradas();
    }

    salvarEntradas() {
        localStorage.setItem('entradasDiario', JSON.stringify(this.entradas));
    }

    exibirEntradas() {
        this.listaEntradas.innerHTML = '';
        this.entradas.forEach((entrada, index) => {
            const itemEntrada = document.createElement('li');
            itemEntrada.textContent = `Anotação ${index + 1}`;
            itemEntrada.addEventListener('click', () => this.selecionarEntrada(index));
            this.listaEntradas.appendChild(itemEntrada);
        });
    }

    adicionarEntrada() {
        const novaEntrada = this.entradaTexto.value;
        if (novaEntrada.trim() !== '') {
            this.entradas.push(novaEntrada);
            this.salvarEntradas();
            this.exibirEntradas();
            this.entradaTexto.value = '';
        }
    }

    selecionarEntrada(index) {
        this.entradaTexto.value = this.entradas[index];
        this.botaoEditar.disabled = false;
        this.botaoExcluir.disabled = false;
        this.entradaSelecionadaIndex = index;
    }

    editarEntrada() {
        const entradaEditada = this.entradaTexto.value;
        if (entradaEditada.trim() !== '' && this.entradaSelecionadaIndex !== undefined) {
            this.entradas[this.entradaSelecionadaIndex] = entradaEditada;
            this.salvarEntradas();
            this.exibirEntradas();
            this.entradaTexto.value = '';
            this.botaoEditar.disabled = true;
            this.botaoExcluir.disabled = true;
        }
    }

    excluirEntrada() {
        if (this.entradaSelecionadaIndex !== undefined) {
            this.entradas.splice(this.entradaSelecionadaIndex, 1);
            this.salvarEntradas();
            this.exibirEntradas();
            this.entradaTexto.value = '';
            this.botaoEditar.disabled = true;
            this.botaoExcluir.disabled = true;
        }
    }

    baixarArquivo() {
        const conteudo = this.entradaTexto.value;
        const blob = new Blob([conteudo], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'minhas_anotacoes.txt';
        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
    }
}

const anotacao = new Anotacoes();
