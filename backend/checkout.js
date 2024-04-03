function updateTotalPrice() {
    var total = 0;
    var quantityFields = $('.quantity-field');
    var priceFields = $('input[name^="varian"]');
    var orderList = $('#orderList');
    orderList.empty();

    quantityFields.each(function(index) {
      var quantity = parseInt($(this).val());
      var price = parseInt(priceFields.eq(index).val());
      var subTotal = quantity * price;
      total += subTotal;

      if (quantity > 0) {
        var variantName = $(this).closest('.d-flex').find('p').text();
        orderList.append(`<li><p class="text-dark">${variantName} - ${quantity} x Rp. ${price} = Rp. ${subTotal}</p></li>`);
      }
    });

    $('#totalPrice').text('Rp. ' + total);
  }

  function submitForm() {
    
  }

  $('.input-group').on('click', '.button-plus', function(e) {
    incrementValue(e);
  });

  $('.input-group').on('click', '.button-minus', function(e) {
    decrementValue(e);
  });

  $('.input-group').on('change', '.quantity-field', function() {
    updateTotalPrice();
  });

  function incrementValue(e) {
    e.preventDefault();
    var parent = $(e.target).closest('.input-group');
    var currentVal = parseInt(parent.find('.quantity-field').val(), 10);

    if (!isNaN(currentVal)) {
      parent.find('.quantity-field').val(currentVal + 1);
    } else {
      parent.find('.quantity-field').val(0);
    }

    updateTotalPrice();
  }

  function decrementValue(e) {
    e.preventDefault();
    var parent = $(e.target).closest('.input-group');
    var currentVal = parseInt(parent.find('.quantity-field').val(), 10);

    if (!isNaN(currentVal) && currentVal > 0) {
      parent.find('.quantity-field').val(currentVal - 1);
    } else {
      parent.find('.quantity-field').val(0);
    }

    updateTotalPrice();
  }