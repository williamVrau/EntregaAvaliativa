window.addEventListener('DOMContentLoaded', () => {
  atualizarTabela();

  document.getElementById('cadastroForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const telefonePrincipal = document.getElementById('telefonePrincipal').value;
    const telefoneSecundario = document.getElementById('telefoneSecundario').value;
    
    const numeros = obterNumeros();
    const nomeJaExiste = numeros.some(item => item.nome.toLowerCase() === nome.toLowerCase());
    if (nomeJaExiste) {
      alert('Este nome já está cadastrado!');
      return;
    }

    const telPrincipalNumeros = telefonePrincipal.replace(/\D/g, '');
    const telSecundarioNumeros = telefoneSecundario.replace(/\D/g, '');
    if (telPrincipalNumeros.length !== 11 || telSecundarioNumeros.length !== 11) {
      alert('Os telefones devem conter exatamente 11 dígitos!');
      return;
    }

    if (nome && telefonePrincipal && telefoneSecundario) {
      const numeros = obterNumeros();
      numeros.push({ nome, telefonePrincipal, telefoneSecundario });
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

function atualizarTabela() {
  const tabela = document.getElementById('tabelaNumeros');
  const numeros = obterNumeros();

  tabela.innerHTML = numeros.map((numero, index) => `
    <tr>
      <td>${numero.nome}</td>
      <td>${numero.telefonePrincipal}</td>
      <td>${numero.telefoneSecundario}</td>
      <td><button onclick="excluirNumero(${index})">Excluir</button></td>
    </tr>
  `).join('');
}

function excluirNumero(index) {
  const numeros = obterNumeros();
  numeros.splice(index, 1);
  salvarNumeros(numeros);
  atualizarTabela();
}