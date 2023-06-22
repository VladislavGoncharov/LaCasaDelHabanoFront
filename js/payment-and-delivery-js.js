// открывается описание этапов работы
function openB(number) {
    //    let status = true;
    let idAnswer = '#answer-' + number;
    let idImg = '#button-plus-' + number;
    $(idAnswer).slideToggle();
    //    if ($(idImg).hasClass('rotate-45')) status = false;
    $(idImg).toggleClass('rotate-45');
    //    let bg_1 = $('.payment_and_delivery__bg_vinous');
    //    let bg_2 = $('.payment_and_delivery__bg_vinous_2');
    //    let oldHieght = 0;
    //    let interval = setInterval(function () {
    //        console.log($(idAnswer).height());
    //        let newHeight;
    //        if (status) newHeight = bg_1.height() + $(idAnswer).height() - oldHieght;
    //        else newHeight = bg_1.height() - oldHieght - $(idAnswer).height() ;
    //        bg_1.css('height', newHeight + 'px')
    //        oldHieght = $(idAnswer).height()
    //        console.log(newHeight);
    //        //        let newTop = bg_2.css('top') + $(idAnswer).height();
    //        //        bg_2.css('top', newTop  + 'px')
    //    }, 1);
    //    setTimeout(function () {
    //        oldHieght = 0;
    //        clearInterval(interval);
    //    }, 400);
}
//$(window).on('scroll', function() {
//  var scrollPosition = $(this).scrollTop();
//  $('.payment_and_delivery__foreground_picture').css('background-position-y', -scrollPosition * 0.1 + 'px');
//});
//// Создаем новый экземпляр ScrollMagic Controller
//var controller = new ScrollMagic.Controller();
//
//// Создаем новый экземпляр TweenMax для анимации
//var tween = TweenMax.to("#section1", 0.5, { opacity: 0 });
//
//// Создаем новую сцену ScrollMagic
//new ScrollMagic.Scene({
//  triggerElement: "#section1", // Указываем элемент-триггер
//  triggerHook: 0.5, // Указываем точку триггера (0.5 - посередине экрана)
//  duration: "100%" // Указываем длительность анимации (100% - размер элемента)
//})
//  .setTween(tween) // Устанавливаем анимацию
//  .addTo(controller); // Добавляем сцену в контроллер
//
//// Добавьте аналогичный код для других разделов, которые вы хотите анимировать
//// Создаем новый экземпляр TweenMax для анимации
//var tween2 = TweenMax.to("#section2", 0.5, { opacity: 0 });
//
//// Создаем новую сцену ScrollMagic
//new ScrollMagic.Scene({
//  triggerElement: "#section1", // Указываем элемент-триггер
//  triggerHook: 0.5, // Указываем точку триггера (0.5 - посередине экрана)
//  duration: "100%" // Указываем длительность анимации (100% - размер элемента)
//})
//  .setTween(tween2) // Устанавливаем анимацию
//  .addTo(controller); // Добавляем сцену в контроллер
//
//// Добавьте аналогичный код для других разделов, которые вы хотите анимировать
$(function() {

    // Default
    jQuery.scrollSpeed(100, 800);

    // Custom Easing
    jQuery.scrollSpeed(100, 800, 'easeOutCubic');

});
