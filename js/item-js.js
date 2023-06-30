$(document).ready(function () {
    $('.height-along-central-column').css('height', $('.central-column').height())
})
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
$('.item-img').mouseleave(function (e) {
    var image = $(this).find('img');
    image.css({
        'transition': '1s'
        , 'transform': 'translate(0) scale(1)'
    });
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
})
