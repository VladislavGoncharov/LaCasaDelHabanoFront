$(document).ready(function () {
    let element = $('#img_text');
    element.addClass('rotating');
    $('.main__our_mug_div').css('height', $('#our_mug_img_1').height());
    //    $('#img_div').css('height', $('.main__img_div').height());
    //    $('#img_div').css('width', $('.main__img_div').width());
    $('#img_mousemove').css('height', $('#img_div').height());
    $('#img_mousemove').css('width', $('#img_div').width());
});
$(window).resize(function () {
    $('.main__our_mug_div').css('height', $('#our_mug_img_1').height());
    //    $('#img_div').css('height', $('.main__img_div').height());
    //    $('#img_div').css('width', $('.main__img_div').width());
    $('#img_mousemove').css('height', $('#img_div').height());
    $('#img_mousemove').css('width', $('#img_div').width());
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

$('.main__img_div').on("mousemove", function (event) {
    let img_absolute = $(this).find('.main__img_absolute');
    let img_mousemove = $(this).find('#img_mousemove');
    let main__img_div_width = $(this).width();
    let x = Math.round(event.pageX - $('.main__img_div').offset().left);
    let y = Math.round(event.pageY - $('.main__img_div').offset().top);
    let x_img_mousemove = 0
    let y_img_mousemove = 0

    console.log(main__img_div_width)
    if (main__img_div_width > 930) {
        x_img_mousemove = x * (-1) + 200;
        y_img_mousemove = y * (-1) + 196;
    }
    else if (main__img_div_width > 830) {
        x_img_mousemove = x * (-1) + 200;
        y_img_mousemove = y * (-1) + 198;
    }
    gsap.to(img_absolute, {
        left: x - 200
        , top: y - 200
        , duration: 1
        , ease: "power1.out"
    });
    gsap.to(img_mousemove, {
        left: x_img_mousemove
        , top: y_img_mousemove
        , duration: 1
        , ease: "power1.out"
    });
});
// показать/скрыть инфу о других проектах
$('#button_information_show_o_cuba').click(function (event) {
    buttonInformationShow('o_cuba', event);
})
$('#button_information_show_cuba_day').click(function (event) {
    buttonInformationShow('cuba_day', event);
})

function buttonInformationShow(elName, event) {
    event.preventDefault()
    if ($(`#button_information_show_${elName}`).find($('.transform_up')).hasClass('transform_show')) {
        $(`#border_top_information_show_${elName} .transform_right_line`).toggleClass('transform_show'); //выдвигается линия
        $(`#border_top_information_show_${elName} .position-absolute`).toggleClass('transform_show'); // уходит текст под фото
        $(`#border_top_information_show_${elName} .col-3`).removeClass('overflow-hidden'); // уходит скрытие кодга при скроле я скрывал линию
        setTimeout(function () {
            $(`#button_information_show_${elName}`).find($('.transform_up')).toggleClass('transform_show'); // далее выходит текст
            $(`#button_information_show_${elName}`).find($('.transform_down')).toggleClass('transform_show');
            $(`#text_information_show_${elName} .transform_down`).toggleClass('transform_show');
            setTimeout(function () {
                $(`#border_top_information_show_${elName} .col-6`).toggleClass('ps-3'); //убираем падинг, чтобы линия была прямая
            }, 300)
        }, 500)
    }
    else {
        $(`#button_information_show_${elName}`).find($('.transform_up')).toggleClass('transform_show'); // далее уходит текст
        $(`#button_information_show_${elName}`).find($('.transform_down')).toggleClass('transform_show');
        $(`#text_information_show_${elName} .transform_down`).toggleClass('transform_show');
        setTimeout(function () {
            $(`#border_top_information_show_${elName} .transform_right_line`).toggleClass('transform_show'); // уходит линия
            $(`#border_top_information_show_${elName} .position-absolute`).toggleClass('transform_show'); // появляется текст под фото
            setTimeout(function () {
                $(`#border_top_information_show_${elName} .col-6`).toggleClass('ps-3'); //добавляем падинг, чтобы линия была прямая
            }, 300)
        }, 500)
    }
}
let onKuznechnoye = false
let enable = false

function nextMug() {
    if (enable) return
    enable = true;
    onKuznechnoye = !onKuznechnoye
    if (onKuznechnoye) {
        gsap.fromTo($('#little_img_2'), {
            x: 0
        }, {
            x: "-100%"
            , duration: 3
            , ease: 'power1.out'
        });
        gsap.fromTo($('#little_img_1'), {
            x: "100%"
        }, {
            x: 0
            , duration: 3
            , ease: 'power1.out'
        });
        gsap.fromTo($('#our_mug_img_2'), {
            x: 0
        }, {
            x: "-100%"
            , duration: 3
            , ease: 'power1.out'
        });
        gsap.fromTo($('#our_mug_img_1'), {
            x: "100%"
        }, {
            x: 0
            , duration: 3
            , ease: 'power1.out'
        });
        $('.our_shop_on_petrogradskaya').each(function () {
            $(this).removeClass('opacity-0')
            gsap.to($(this), {
                y: 0
                , duration: 0
            });
        });
        $('.our_shop_on_kuznechnoye').each(function () {
            gsap.fromTo($(this), {
                y: 0
            }, {
                y: "100%"
                , duration: 1
            });
        });
    }
    else {
        gsap.fromTo($('#little_img_1'), {
            x: 0
        }, {
            x: "-100%"
            , duration: 3
            , ease: 'power1.out'
        });
        gsap.fromTo($('#little_img_2'), {
            x: "100%"
        }, {
            x: 0
            , duration: 3
            , ease: 'power1.out'
        });
        gsap.fromTo($('#our_mug_img_1'), {
            x: 0
        }, {
            x: "-100%"
            , duration: 3
            , ease: 'power1.out'
        });
        gsap.fromTo($('#our_mug_img_2'), {
            x: "100%"
        }, {
            x: 0
            , duration: 3
            , ease: 'power1.out'
        })
        $('.our_shop_on_kuznechnoye').each(function () {
            gsap.to($(this), {
                y: 0
                , duration: 0
            });
        });
        $('.our_shop_on_petrogradskaya').each(function () {
            gsap.fromTo($(this), {
                y: 0
            }, {
                y: "100%"
                , duration: 1
            });
        });
    }
    setTimeout(function () {
        enable = false;
    }, 3000)
}
//плавное увеличение и движение большой картинки под Наши магазины при скроле
gsap.registerPlugin(ScrollTrigger);
gsap.from(['#our_mug_img_1', '#our_mug_img_2'], {
        scrollTrigger: {
            trigger: '.main__our_mug_div'
            , start: (window.innerHeight * (-1.2)) + 'px top'
            , end: '-30% top'
            , scrub: true
        , }
        , scale: 1.15
        , translateY: -350
    })
    $('.main__img_div').ripples({
        resolution: 300,
        dropRadius: 15,
        perturbance: 0.02
    });
