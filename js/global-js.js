$(document).ready(function () {
        setTimeout(function () {
            distanceToBottom()
        }, 100);
        $('.basket__scroll_div').overlayScrollbars({
            className: 'os-theme-dark'
            , scrollbars: {
                clickScrolling: true
            }
        })
        scrollFunction()
    })
    //открытие меню
function openPopUp(el, event) {
    event.preventDefault();
    let element = $(`#${el}`);
    element.fadeToggle();
    element.children().first().toggleClass("open_pop_up");
    setTimeout(function () {
        element.find('.border_hide_left, .border_hide_right, .border_hide_center, .transform_up_text, .transform_right_text').each(function () {
            $(this).toggleClass('transform_show')
        })
        element.find('.opacity_hide_text').toggleClass('opacity_show')
    }, 700)
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
$('.scroll-to-top').click(function (event) {
    event.preventDefault()
    $('html, body').animate({
        scrollTop: 0
    }, 100);
});
$(window).scroll(function () {
    scrollFunction()
});
$(window).resize(function () {
    setTimeout(function () {
        distanceToBottom()
    }, 100);
});

function scrollFunction() {
    let win = $(window)
    let windowBottomOpacity = win.scrollTop() + (win.innerHeight() * 0.95);
    let windowBottomTransform = win.scrollTop() + (win.innerHeight() * 0.85);
    let windowBottomScale = win.scrollTop() + (win.innerHeight() * 0.2);
    // Проверяем каждый элемент, к которому нужно добавить класс при появлении в зоне видимости
    $('.transform_up_text').each(function () {
        let elementTop = $(this).offset().top;
        if (!$(this).closest('#allMenu').length)
            if (elementTop <= windowBottomOpacity) {
                $(this).addClass('transform_show');
            }
    });
    $('.opacity_hide_text').each(function () {
        let elementTop = $(this).offset().top;
        if (!$(this).closest('#allMenu').length)
            if (elementTop <= windowBottomOpacity) {
                $(this).addClass('opacity_show');
            }
    });
    $('[class*=border_hide]').each(function () {
        let elementTop = $(this).offset().top;
        if (!$(this).closest('#allMenu').length)
            if (elementTop <= windowBottomOpacity) {
                $(this).addClass('transform_show');
            }
    });
}
//создание курсора
let customCursor = $('<div>', {
    id: 'custom-cursor'
    , class: 'custom-cursor'
});
$('body').append(customCursor);
$(document).mousemove(function (event) {
    $('#custom-cursor').css({
        left: event.clientX + 'px'
        , top: event.clientY + 'px'
    });
});
// плавный скролл
SmoothScroll({
        // Время скролла 400 = 0.4 секунды
        animationTime: 1000, // Размер шага в пикселях
        stepSize: 100, // Дополнительные настройки:
        // Ускорение
        accelerationDelta: 20, // Максимальное ускорение
        accelerationMax: 2, // Поддержка клавиатуры
        keyboardSupport: true, // Шаг скролла стрелками на клавиатуре в пикселях
        arrowScroll: 50, // Pulse (less tweakable)
        // ratio of "tail" to "acceleration"
        pulseAlgorithm: true
        , pulseScale: 4
        , pulseNormalize: 1, // Поддержка тачпада
        touchpadSupport: true
    , })
    //дата в резерве
new AirDatepicker('#dateReserve', {
    position: 'bottom center'
    , minDate: new Date()
    , buttons: [{
        content: 'Сегодня'
        , className: 'flat-button flat-button-bg-light'
        , onClick: (dp) => {
            let date = new Date();
            dp.selectDate(date);
            dp.setViewDate(date);
        }
    }]
});
