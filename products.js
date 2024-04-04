$(document).ready(function () {
    // Function to load product data from JSON file
    function loadProductData() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "assets/database/products.json",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    resolve(data);
                },
                error: function (xhr, status, error) {
                    reject(error);
                }
            });
        });
    }

    // Load product data and display on the page
    loadProductData()
        .then(function (products) {
            var productList = $("#product-list");
            products.forEach(function (product) {
                var productCard = `<div class="col-lg-3 col-md-3" data-aos="zoom-in" data-aos-delay="200">
                    <div class="box">
                        <h3 style="color: #A25223;">${product.name}</h3>
                        <div class="price"><sup>Rp</sup>${product.variants[0].price}<span> / ${product.variants[0].variantName}</span></div>
                        <img src="${product.image}" class="img-fluid" alt="${product.name}" >
                        <a href="#" class="btn-buy" data-id="${product.id}">Beli</a>
                    </div>
                </div>`;
                productList.append(productCard);
            });
        })
        .catch(function (error) {
            console.error("Error loading product data:", error);
        });

    // Event handler for buy button click
    $(document).on("click", ".btn-buy", function (e) {
        e.preventDefault(); // Prevent default behavior of anchor tag
        var productId = $(this).data("id");
        // Here you can use productId as needed, for example, redirecting to the purchase page with the corresponding product id
        window.location.href = `product-details.html?id=${productId}`;
    });

    // Event listener for search input
    $("#search-input").on("input", function () {
        var keyword = $(this).val().trim().toLowerCase();
        filterProducts(keyword);
    });


    // Function to filter products based on keyword
    function filterProducts(keyword) {
        $(".col-lg-3.col-md-3").each(function () {
            var productName = $(this).find("h3").text().trim().toLowerCase();
            if (productName.includes(keyword)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }


});
