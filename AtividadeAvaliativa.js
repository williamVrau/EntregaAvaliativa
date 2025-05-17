window.addEventListener('load', () => {
    const numeros = JSON.parse(localStorage.getItem('numeros')) || [];
    numeros.forEach((numero, index) => {
      adicionarNumeroNaTabela(numero, index);
    });
  });

  document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const telefonePrincipal = document.getElementById('telefonePrincipal').value;
    const telefoneSecundario = document.getElementById('telefoneSecundario').value;

    if (nome && telefonePrincipal && telefoneSecundario) {
      const novoNumero = { nome, telefonePrincipal, telefoneSecundario };
      const numeros = JSON.parse(localStorage.getItem('numeros')) || [];
      numeros.push(novoNumero);
      localStorage.setItem('numeros', JSON.stringify(numeros));
      adicionarNumeroNaTabela(novoNumero, numeros.length - 1);
      document.getElementById('cadastroForm').reset();
    }
  });   

    function adicionarNumeroNaTabela(numero, index) {
    const tabela = document.getElementById('tabelaNumeros').querySelector('tbody');
    const novaLinha = tabela.insertRow();
  
    novaLinha.insertCell(0).textContent = numero.nome;
    novaLinha.insertCell(1).textContent = numero.telefonePrincipal;
    novaLinha.insertCell(2).textContent = numero.telefoneSecundario;
  
    const celulaAcao = novaLinha.insertCell(3);
    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = 'Excluir';
    botaoExcluir.onclick = function () {
      excluirNumero(index);
    };
    celulaAcao.appendChild(botaoExcluir);
  }

  function excluirNumero(index) {
    let numeros = JSON.parse(localStorage.getItem('numeros')) || [];
    numeros.splice(index, 1);
    localStorage.setItem('numeros', JSON.stringify(numeros));
    atualizarTabela();
  }

  function atualizarTabela() {
    const tabela = document.getElementById('tabelaNumeros').querySelector('tbody');
    tabela.innerHTML = '';
    const numeros = JSON.parse(localStorage.getItem('numeros')) || [];
    numeros.forEach((numero, index) => {
      adicionarNumeroNaTabela(numero, index);
    });
  }