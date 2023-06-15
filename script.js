// script.js
// Validação de formulário de pedido
var formPedido = document.getElementById('form-pedido');
formPedido.addEventListener('submit', function(event) {
  event.preventDefault();
  
  var nome = document.getElementById('nome').value;
  var email = document.getElementById('email').value;

  if (nome.trim() === '' || email.trim() === '') {
    alert('Por favor, preencha todos os campos do formulário de pedido.');
    return;
  }

  // Outras validações necessárias...

  // Envie o pedido ou salve-o em algum lugar
  alert('Pedido enviado com sucesso!');
  formPedido.reset();
});

// Cálculo de preços
var buttonsAdicionarCarrinho = document.getElementsByClassName('adicionar-carrinho');
var carrinho = [];

Array.from(buttonsAdicionarCarrinho).forEach(function(button) {
  button.addEventListener('click', function() {
    var nome = button.getAttribute('data-nome');
    var preco = parseFloat(button.getAttribute('data-preco'));

    carrinho.push({ nome: nome, preco: preco });
    alert('Pastel "' + nome + '" adicionado ao carrinho!');
    atualizarCarrinho();
  });
});

function atualizarCarrinho() {
  var total = 0;
  var carrinhoHTML = '';

  carrinho.forEach(function(item) {
    total += item.preco;
    carrinhoHTML += '<li>' + item.nome + ' - R$ ' + item.preco.toFixed(2) + '</li>';
  });

  document.getElementById('carrinho-lista').innerHTML = carrinhoHTML;
  document.getElementById('carrinho-total').innerHTML = 'Total: R$ ' + total.toFixed(2);
}
