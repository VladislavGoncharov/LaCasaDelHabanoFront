$(document).ready(function () {
    let element = $('#img_text');
    element.addClass('rotating');
});
////паралакс брендов от движения мыши
let scene = document.getElementById('container_for_img_brands');
let parallax = new Parallax(scene, {
    relativeInput: true
    , hoverOnly: true
    , inputElement: document.getElementById('container_for_img_brands')
    , calibrateX: false
    , calibrateY: false
    , scalarX: 5
    , scalarY: 5
    , frictionX: 0.1
    , frictionY: 0.1
});
let prevScrollTop = 0;
$(window).scroll(function () {
    let elementScroll = $('.scroll_logo');
    let transformValue = elementScroll.css('transform');
    let translateX = 0;
    let transformValues = transformValue.match(/-?[\d.]+/g);
    translateX = transformValues[4];
    let scrollDirection = $(this).scrollTop() > prevScrollTop ? 'down' : 'up';
    let offsetX = scrollDirection === 'down' ? parseInt(translateX) + 3 : (translateX) - 3; // Значение сдвига вправо и влево
    elementScroll.css({
        transform: 'translateX(' + offsetX + 'px)'
    });
    prevScrollTop = $(this).scrollTop();
});
