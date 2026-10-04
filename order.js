let cart = [];


/* =========================
   TAMBAH PRODUK
========================= */

function addToCart(name, price) {

    const existingProduct = cart.find(
        item => item.name === name
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

}


/* =========================
   UPDATE KERANJANG
========================= */

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <div>🛒</div>
                <p>Keranjang masih kosong</p>
                <small>
                    Silakan pilih menu terlebih dahulu.
                </small>
            </div>
        `;

        cartCount.innerText = "0 item";

        cartTotal.innerText = "Rp0";

        return;
    }


    let total = 0;

    let totalQuantity = 0;


    cartItems.innerHTML = "";


    cart.forEach((item, index) => {

        const subtotal =
            item.price * item.quantity;

        total += subtotal;

        totalQuantity += item.quantity;


        cartItems.innerHTML += `

            <div class="cart-item">

                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <span>
                        ${formatRupiah(item.price)}
                    </span>

                </div>


                <div class="quantity">

                    <button
                        onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>


                <strong>
                    ${formatRupiah(subtotal)}
                </strong>


                <button
                    class="remove-button"
                    onclick="removeItem(${index})">

                    Hapus

                </button>

            </div>

        `;

    });


    cartCount.innerText =
        totalQuantity + " item";


    cartTotal.innerText =
        formatRupiah(total);

}


/* =========================
   TAMBAH JUMLAH
========================= */

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

}


/* =========================
   KURANGI JUMLAH
========================= */

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    updateCart();

}


/* =========================
   HAPUS PRODUK
========================= */

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


/* =========================
   CHECKOUT
========================= */

function showCheckout() {

    if (cart.length === 0) {

        alert(
            "Silakan pilih produk terlebih dahulu."
        );

        return;
    }


    const checkout =
        document.getElementById("checkout");


    checkout.style.display = "block";


    checkout.scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================
   SUBMIT CHECKOUT
========================= */

document
    .getElementById("checkout-form")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            if (cart.length === 0) {

                alert(
                    "Keranjang masih kosong."
                );

                return;
            }


            const name =
                document.getElementById("name")
                    .value;


            const orderNumber =
                generateOrderNumber();


            document.getElementById(
                "order-number"
            ).innerText = orderNumber;


            document.getElementById(
                "checkout"
            ).style.display = "none";


            document.getElementById(
                "success"
            ).style.display = "block";


            document.getElementById(
                "success"
            ).scrollIntoView({
                behavior: "smooth"
            });


            console.log(
                "Pesanan:",
                name,
                cart
            );


            cart = [];

        }
    );


/* =========================
   NOMOR PESANAN
========================= */

function generateOrderNumber() {

    const number =
        Math.floor(
            1000 + Math.random() * 9000
        );

    return "#PSC-" + number;

}


/* =========================
   FORMAT RUPIAH
========================= */

function formatRupiah(number) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }
    ).format(number);

}