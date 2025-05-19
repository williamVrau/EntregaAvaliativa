window.addEventListener('DOMContentLoaded', () => {
  carregarNumeros();
  
  document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const telefonePrincipal = document.getElementById('telefonePrincipal').value.trim();
    const telefoneSecundario = document.getElementById('telefoneSecundario').value.trim();

    if (nome && telefonePrincipal && telefoneSecundario) {
      const novoNumero = { nome, telefonePrincipal, telefoneSecundario };
      const numeros = obterNumeros();
      numeros.push(novoNumero);
      salvarNumeros(numeros);
      atualizarTabela();
      this.reset();
    }
  });
});

function obterNumeros() {
  return JSON.parse(localStorage.getItem('numeros')) || [];
}

function salvarNumeros(numeros) {
  localStorage.setItem('numeros', JSON.stringify(numeros));
}

function carregarNumeros() {
  atualizarTabela();
}

function atualizarTabela() {
  const tabela = document.getElementById('tabelaNumeros').querySelector('tbody');
  tabela.innerHTML = '';

  const numeros = obterNumeros();
  numeros.forEach((numero, index) => {
    adicionarNumeroNaTabela(numero, index);
  });
}

function adicionarNumeroNaTabela(numero, index) {
  const tabela = document.getElementById('tabelaNumeros').querySelector('tbody');
  const novaLinha = tabela.insertRow();

  novaLinha.insertCell(0).textContent = numero.nome;
  novaLinha.insertCell(1).textContent = numero.telefonePrincipal;
  novaLinha.insertCell(2).textContent = numero.telefoneSecundario;

  const celulaAcao = novaLinha.insertCell(3);
  const botaoExcluir = document.createElement('button');
  botaoExcluir.textContent = 'Excluir';
  botaoExcluir.addEventListener('click', () => excluirNumero(index));
  celulaAcao.appendChild(botaoExcluir);
}

function excluirNumero(index) {
  const numeros = obterNumeros();
  numeros.splice(index, 1);
  salvarNumeros(numeros);
  atualizarTabela();
}