$(document).ready(function () {
    setTimeout(function () {
        distanceToBottom()
    }, 100);
})


//открытие меню
function openPopUp(el, event) {
    event.preventDefault();
    let element = $(`#${el}`);
    element.fadeToggle();
    element.children().first().toggleClass("open_pop_up");
}
$('#search').click(function () {
    openPopUp('search', event);
});
$('#basket').click(function () {
    openPopUp('basket', event)
});
$('.bg_black_pop_up_windows_on_the_right_dark').click(function (event) {
    event.stopPropagation();
});
//функция автоматического расчета высоты элемента
function distanceToBottom() {
    $('.height-auto').each(function () {
        let $element = $(this);
        let distanceToBottom = Math.round($('body').height() - $element.position().top) + 25;
        let heightClass = 'height-' + distanceToBottom + 'px';
        // Добавление класса к текущему элементу
        $element.addClass(heightClass);
        // Применение стиля высоты к текущему элементу с добавленным классом
        $element.css('height', distanceToBottom);
    });
}
// плавный скрол до верха
$('.scroll-to-top').click(function(event) {
    event.preventDefault()
    $('html, body').animate({ scrollTop: 0 }, 100);

});


$(window).scroll(function() {
  let windowBottom = $(this).scrollTop() + ($(this).innerHeight()*0.9);
  // Проверяем каждый элемент, к которому нужно добавить класс при появлении в зоне видимости
  $('.transform_up_text').each(function() {
    let elementTop = $(this).offset().top;
    if (elementTop <= windowBottom) {
      $(this).addClass('transform_show');
    }
  });
  $('.opacity_hide_text').each(function() {
    let elementTop = $(this).offset().top;
    if (elementTop <= windowBottom) {
      $(this).addClass('opacity_show');
    }
  });
  $('[class*=border_hide]').each(function() {
    let elementTop = $(this).offset().top;
    if (elementTop <= windowBottom) {
      $(this).addClass('transform_show');
    }
  });
});

