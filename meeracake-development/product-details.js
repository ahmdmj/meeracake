$(document).ready(function () {
    let productData; // Variabel untuk menyimpan data produk dari file JSON

    // Function to load product data from JSON file
    function loadProductData(productId) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "assets/database/products.json",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    productData = data.find(item => item.id === productId);
                    resolve(productData);
                },
                error: function (xhr, status, error) {
                    reject(error);
                }
            });
        });
    }

    // Load product data and display on the page
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    loadProductData(parseInt(productId))
        .then(function (product) {
            updateProductDetails(product);
        })
        .catch(function (error) {
            console.error("Error loading product data:", error);
        });

    // Event handler for plus button click
    $(document).on("click", ".button-plus", function (e) {
        e.preventDefault();
        const index = $(this).data("index");
        const quantityField = $(`.quantity-field[data-index="${index}"]`);
        let value = parseInt(quantityField.val(), 10);
        value = isNaN(value) ? 0 : value;
        value = value >= 10 ? 10 : value + 1;
        quantityField.val(value);
        // Update total price
        updateTotalPrice();
    });

    // Event handler for minus button click
    $(document).on("click", ".button-minus", function (e) {
        e.preventDefault();
        const index = $(this).data("index");
        const quantityField = $(`.quantity-field[data-index="${index}"]`);
        let value = parseInt(quantityField.val(), 10);
        value = isNaN(value) ? 0 : value;
        value = value <= 0 ? 0 : value - 1;
        quantityField.val(value);
        // Update total price
        updateTotalPrice();
    });

    // Update total price based on selected variants and quantities
    function updateTotalPrice() {
        let totalPrice = 0;
        $(".quantity-field").each(function () {
            const index = $(this).data("index");
            const quantity = parseInt($(this).val(), 10);
            if (!isNaN(quantity) && quantity > 0 && productData && productData.variants[index]) {
                const price = productData.variants[index].price;
                totalPrice += price * quantity;
            }
        });
        $("#totalPrice").text(`Rp. ${totalPrice.toLocaleString()}`);
        // Update order list
        updateOrderList();
    }

    function updateProductDetails(product) {
        $("#product-name-detail").text(product.name);
        $("#product-image").attr("src", product.image);
        const variantList = $("#variant-list");
        variantList.empty();
        product.variants.forEach((variant, index) => {
            variantList.append(`
        <li class="list-group-item d-flex justify-content-between lh-sm">
            <div style="width: 45%;">
                <h6 class="my-0 mb-3">${variant.variantPrice} / ${variant.variantName} </h6>
            </div>
            <div class="input-group" style="width: 55%;">
                <span class="input-group-btn">
                    <button type="button" class="btn btn-default button-minus" data-index="${index}">-</button>
                </span>
                <input type="number" step="1" max="10" value="0" name="quantity" class="form-control quantity-field" data-index="${index}" style="width: 50px;">
                <span class="input-group-btn">
                    <button type="button" class="btn btn-default button-plus" data-index="${index}">+</button>
                </span>
            </div>
        </li>
        `);
        });
        // Update total price
        updateTotalPrice();
    }


    // Update order list based on selected variants and quantities
    function updateOrderList() {
        let orderListHTML = "";
        $(".quantity-field").each(function () {
            const index = $(this).data("index");
            const quantity = parseInt($(this).val(), 10);
            if (!isNaN(quantity) && quantity > 0 && productData && productData.variants[index]) {
                const variantPrice = productData.variants[index].variantPrice;
                const variantName = productData.variants[index].variantName;
                const price = productData.variants[index].price;
                const totalPrice = price * quantity;
                orderListHTML += `<li>${variantPrice} / ${variantName} x ${quantity} = ${totalPrice.toLocaleString()}</li>`;
            }
        });
        $("#orderList").html(orderListHTML);
    }


    // Event handler for checkout button click
    $("#continueToCheckout").click(function () {
        // Mengecek apakah productData telah dimuat
        if (!productData) {
            console.error("Error: Product data not loaded.");
            return;
        }

        // Mendapatkan nama produk
        const productName = productData.name;

        // Mendapatkan total harga pesanan
        const totalPrice = $("#totalPrice").text();

        // Membuat pesan WhatsApp
        let message = "Halo Ka, Saya ingin pesan kue : ";

        // Menambahkan nama produk ke pesan
        message += "Daftar Pesanan : ";
        message += "Nama Kue : " + productName + " ";

        // Mendapatkan daftar pesanan
        const orderListItems = $("#orderList li");

        // Jika tidak ada pesanan yang dipilih, tampilkan alert
        if (orderListItems.length === 0) {
            alert("Anda belum memilih pesanan. Silakan pilih item untuk dipesan.");
            return;
        }

        // Loop melalui setiap item di daftar pesanan dan menambahkannya ke pesan dengan baris baru
        orderListItems.each(function () {
            message += "- " + $(this).text() + " ";
        });

        // Menambahkan total harga pesanan ke pesan
        message += "Total : " + totalPrice;

        // Mengarahkan ke aplikasi WhatsApp dengan pesan otomatis
        window.location.href = `https://wa.me/6281245758576/?text=${encodeURIComponent(message)}`;
    });


});

