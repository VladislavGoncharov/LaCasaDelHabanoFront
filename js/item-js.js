

//функция увеличения картинки при попадании курсора на область картинки
$('.item-img').mousemove(function (e) {
    var image = $(this).find('img');
    var containerWidth = $(this).width();
    var containerHeight = $(this).height();
    var offsetX = containerWidth - e.pageX;
    var offsetY = containerHeight - e.pageY;
    image.css({
        'transition': '0s'
        , 'transform': 'translate(' + (offsetX * 0.5) + 'px, ' + offsetY + 'px) scale(2)'
    });
});
//функция которая возвращает картинку при уходе курсора из область картинки
$('.item-img').mouseleave(function (e) {
    var image = $(this).find('img');
    image.css({
        'transition': '1s'
        , 'transform': 'translate(0) scale(1)'
    });
});

// Вызываем функцию обновления высоты при загрузке страницы и при изменении размера окна
$(window).on('load resize', function() {
    $('.height-along-central-column').css('height', $('.central-column').height())
    console.log($('.central-column').height());
    
});

//обработка кнопок в корзину и количество
let plusItem = $('#plus-item');
let minusItem = $('#minus-item');
let quantityOfItem = $('#quantity-of-item');
plusItem.click(function (event) {
    event.preventDefault();
    let quantity = parseInt(quantityOfItem.text());
    quantity++;
    quantityOfItem.text(quantity)
    minusItem.find('path').css('fill', 'black')
    calculationOfFinalPrice()
})
minusItem.click(function (event) {
    event.preventDefault();
    let quantity = parseInt(quantityOfItem.text());
    if (quantity > 1) {
        quantity--;
        quantityOfItem.text(quantity)
        if (quantity > 1) minusItem.find('path').css('fill', 'black')
        else minusItem.find('path').css('fill', 'grey')
    }

    else {
        minusItem.find('path').css('fill', 'grey')
    }
    calculationOfFinalPrice()
})

//обработка радио инпута "вариант упаковки"
let selectedPackagingOption
$(document).ready(function () {
    $('input[name="packagingOption"]').change(function () {
        selectedPackagingOption = $('input[name="packagingOption"]:checked').val();
        calculationOfFinalPrice()
    });
    calculationOfFinalPrice()
});

//подсчет окончательной цены
function calculationOfFinalPrice() {
    let quantityOfPackagingOption
    if (selectedPackagingOption === "byBox") quantityOfPackagingOption = parseInt($('#amountOfGoodsInPackaging').text());
    else quantityOfPackagingOption = 1

    let quantity = parseInt(quantityOfItem.text());
    let priceItem = parseInt($("#endPrice").attr("data-price"));

    let endPrice = priceItem * quantity * quantityOfPackagingOption;

    $('#endPrice').text(formatNumberWithThousandsSeparator(endPrice));
}

//функция которая форматируем конечную цену в красивый вариант, например 1793203221 в 1 793 203 221 
function formatNumberWithThousandsSeparator(number) {
    // Преобразуем число в строку и разделяем его на группы по 3 цифры с конца числа
    var parts = number.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    // Объединяем группы с разделителем тысяч и возвращаем результат
    return parts.join('.');
}
//автонастройка высоты и ширины картинок в карточках товаров
function autoWidhtImgInCardItems() {
    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  
    let cardImg = $('.catalog__card_img_div')
    cardImg.css('width', 'initial')
  
    if (screenWidth > 2000) {
      cardImg.css('height', '455px')
    }
    else {
      cardImg.css('height', cardImg.css('width'))
    }
  }
  
  $(document).ready(function () {
    autoWidhtImgInCardItems()
  })
  $(window).resize(function () {
  
    autoWidhtImgInCardItems()
  });