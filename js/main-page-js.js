$(document).ready(function () {
    let element = $('#img_text');
    element.addClass('rotating');
    $('.basket__scroll_div').overlayScrollbars({
        className: 'os-theme-dark'
        , scrollbars: {
            clickScrolling: true
        , }
    })
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

function startLongLogo() {
    let elementScroll = $('.long_logo');
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
}

$('.main__img_div').on("mousemove", function(event) {
  let img_absolute = $('.main__img_div').find('.main__img_absolute');
    let img_mousemove = $('.main__img_div').find('#img_mousemove');
    let x = Math.round(event.pageX - $('.main__img_div').offset().left);
    let y = Math.round(event.pageY - $('.main__img_div').offset().top);

    let x_img_mousemove = x * (-1) - 1;
    let y_img_mousemove = y * (-1) + 200;

   gsap.to(img_absolute, {
    left: x- 200,
    top: y- 200,
    duration: 1,
    ease: "power1.out"
  });
   gsap.to(img_mousemove, {
    left: x_img_mousemove,
    top: y_img_mousemove,
    duration: 1,
    ease: "power1.out"
  });
});

