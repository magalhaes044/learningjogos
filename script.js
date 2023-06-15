// script.js

document.addEventListener('DOMContentLoaded', function() {
  const carrinhoLista = document.getElementById('carrinho-lista');
  const carrinhoTotal = document.getElementById('carrinho-total');
  const limparCarrinhoButton = document.getElementById('limpar-carrinho');

  const adicionarAoCarrinho = function(event) {
    const nome = event.target.dataset.nome;
    const preco = parseFloat(event.target.dataset.preco);

    const itemCarrinho = document.createElement('li');
    itemCarrinho.innerHTML = `${nome} - R$ ${preco.toFixed(2)}`;
    carrinhoLista.appendChild(itemCarrinho);

    const precosItens = Array.from(carrinhoLista.querySelectorAll('li')).map(function(item) {
      return parseFloat(item.textContent.split('R$ ')[1]);
    });

    const total = precosItens.reduce(function(acc, preco) {
      return acc + preco;
    }, 0);

    carrinhoTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
  };

  const limparCarrinho = function() {
    carrinhoLista.innerHTML = '';
    carrinhoTotal.textContent = 'Total: R$ 0,00';
  };

  const adicionarCarrinhoButtons = document.querySelectorAll('.adicionar-carrinho');
  adicionarCarrinhoButtons.forEach(function(button) {
    button.addEventListener('click', adicionarAoCarrinho);
  });

  limparCarrinhoButton.addEventListener('click', limparCarrinho);
});
