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
