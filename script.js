/* =====================================================
   SANTTA COSTELA
   SCRIPT.JS
   ===================================================== */

let carrinho = [];


/* =====================================================
   ADICIONAR PRODUTO AO CARRINHO
   ===================================================== */

function adicionarCarrinho(nome, preco) {

    const produtoExistente = carrinho.find(
        item => item.nome === nome
    );

    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });

    }

    atualizarCarrinho();

    abrirCarrinho();
}


/* =====================================================
   ALTERAR QUANTIDADE
   ===================================================== */

function alterarQuantidade(nome, quantidade) {

    const produto = carrinho.find(
        item => item.nome === nome
    );

    if (!produto) {
        return;
    }

    produto.quantidade += quantidade;

    if (produto.quantidade <= 0) {

        carrinho = carrinho.filter(
            item => item.nome !== nome
        );

    }

    atualizarCarrinho();
}


/* =====================================================
   ATUALIZAR CARRINHO
   ===================================================== */

function atualizarCarrinho() {

    const container =
        document.getElementById("cart-items");

    const contador =
        document.getElementById("cart-count");

    const totalElemento =
        document.getElementById("cart-total");


    let quantidadeTotal = 0;
    let valorTotal = 0;


    carrinho.forEach(item => {

        quantidadeTotal += item.quantidade;

        valorTotal +=
            item.preco * item.quantidade;

    });


    contador.textContent = quantidadeTotal;


    totalElemento.textContent =
        formatarPreco(valorTotal);


    if (carrinho.length === 0) {

        container.innerHTML = `
            <p class="empty-cart">
                Seu carrinho está vazio.
            </p>
        `;

        return;
    }


    container.innerHTML = "";


    carrinho.forEach(item => {

        const subtotal =
            item.preco * item.quantidade;


        const elemento =
            document.createElement("div");

        elemento.className = "cart-item";


        elemento.innerHTML = `

            <div>
                <strong>${item.nome}</strong>

                <p>
                    ${formatarPreco(item.preco)}
                    cada
                </p>
            </div>


            <div class="cart-item-controls">

                <button
                    onclick="alterarQuantidade(
                        '${item.nome}',
                        -1
                    )">
                    −
                </button>


                <span>
                    ${item.quantidade}
                </span>


                <button
                    onclick="alterarQuantidade(
                        '${item.nome}',
                        1
                    )">
                    +
                </button>

            </div>


            <strong>
                ${formatarPreco(subtotal)}
            </strong>

        `;


        container.appendChild(element);

    });

}


/* =====================================================
   FORMATAR PREÇO
   ===================================================== */

function formatarPreco(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* =====================================================
   ABRIR CARRINHO
   ===================================================== */

function abrirCarrinho() {

    const carrinhoElemento =
        document.getElementById("cart-overlay");

    carrinhoElemento.classList.add("active");

}


/* =====================================================
   FECHAR CARRINHO
   ===================================================== */

function fecharCarrinho() {

    const carrinhoElemento =
        document.getElementById("cart-overlay");

    carrinhoElemento.classList.remove("active");

}


/* =====================================================
   FILTRAR PRODUTOS
   ===================================================== */

function filtrarProdutos(categoria) {

    const produtos =
        document.querySelectorAll(".product");


    produtos.forEach(produto => {

        const categoriaProduto =
            produto.dataset.category;


        if (
            categoria === "todos" ||
            categoriaProduto === categoria
        ) {

            produto.style.display = "";

        } else {

            produto.style.display = "none";

        }

    });

}


/* =====================================================
   FINALIZAR PEDIDO
   ===================================================== */

function finalizarPedido() {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio. Adicione algum produto primeiro."
        );

        return;
    }


    let mensagem =
        "🔥 *NOVO PEDIDO - SANTTA COSTELA*%0A%0A";


    let total = 0;


    carrinho.forEach(item => {

        const subtotal =
            item.preco * item.quantidade;

        total += subtotal;


        mensagem +=
            `🍖 ${item.nome}%0A` +
            `Quantidade: ${item.quantidade}%0A` +
            `Subtotal: ${formatarPreco(subtotal)}%0A%0A`;

    });


    mensagem +=
        `💰 *TOTAL: ${formatarPreco(total)}*%0A%0A`;


    mensagem +=
        "Olá! Gostaria de fazer este pedido. " +
        "Por favor, confirme a disponibilidade.";


    /*
       COLOQUE AQUI O NÚMERO DO WHATSAPP
       DA SANTTA COSTELA.

       Exemplo:
       5511999999999
    */

    const numeroWhatsApp =
        "5511924869801";


    const url =
        `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;


    window.open(url, "_blank");

}


/* =====================================================
   FECHAR CARRINHO CLICANDO FORA
   ===================================================== */

document
    .getElementById("cart-overlay")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {

                fecharCarrinho();

            }

        }
    );


/* =====================================================
   INICIALIZAÇÃO
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        atualizarCarrinho();

    }
);
