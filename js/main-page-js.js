$(document).ready(function () {
    let element = $('#img_text');
    element.addClass('rotating');
    $('.main__our_mug_div').css('height', $('#our_mug_img_1').height());
    $('#img_mousemove').css('height', $('#img_div').height());
    $('#img_mousemove').css('width', $('#img_div').width());
});
$(window).resize(function () {
    $('.main__our_mug_div').css('height', $('#our_mug_img_1').height());
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
//    $('.main__img_div').ripples({
//        resolution: 300
//        , dropRadius: 15
//        , perturbance: 0.02
//    });
//gsap.registerPlugin(MorphSVGPlugin);
var length = document.querySelectorAll(".layer").length;
var layers = document.querySelectorAll(".layer");
var mouseTween;
var circles = document.querySelectorAll(".layer");
gsap.set(".clippath", {
    scale: 0,
  transformOrigin: "center center"
});
gsap.set(".clippath path", {
    scale: 2.2,
  transformOrigin: "center center"
});

gsap.to(".clippath", {
  rotation: 360,
  duration: 3,
  repeat: -1,
  ease: "none"
});
$('body').on("mousemove", function (e) {
    TweenMax.set('.layer', {
        transformOrigin: mousePos(e).x + "px " + mousePos(e).y + "px"
    });
    mouseTween = TweenMax.to([".layer .clippath"], {
        x: mousePos(e).x
        , y: mousePos(e).y
        , ease: Cubic.easeOut
    })
})
$('#main__img_div').on("mouseenter", function (e) {
    gsap.to([".clippath"], {
        scale: 1
    })
})
$('#main__img_div').on("mouseleave", function (e) {
    gsap.to([".clippath"], {
             scale: 0
        })
})

function mousePos(e) {
    return {
        x: e.pageX - $('#main__img_div').offset().left-75
        , y: e.pageY - $('#main__img_div').offset().top-50
    };
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
//
//$('.main__img_div').on("mousemove", function (event) {
//    let img_absolute = $(this).find('.main__img_absolute');
//    let img_mousemove = $(this).find('#img_mousemove');
//    let main__img_div_width = $(this).width();
//    let x = Math.round(event.pageX - $('.main__img_div').offset().left);
//    let y = Math.round(event.pageY - $('.main__img_div').offset().top);
//    let x_img_mousemove = 0
//    let y_img_mousemove = 0
//    console.log(main__img_div_width)
//    if (main__img_div_width > 930) {
//        x_img_mousemove = x * (-1) + 200;
//        y_img_mousemove = y * (-1) + 196;
//    }
//    else if (main__img_div_width > 830) {
//        x_img_mousemove = x * (-1) + 200;
//        y_img_mousemove = y * (-1) + 198;
//    }
//    gsap.to(img_absolute, {
//        left: x - 200
//        , top: y - 200
//        , duration: 1
//        , ease: "power1.out"
//    });
//    gsap.to(img_mousemove, {
//        left: x_img_mousemove
//        , top: y_img_mousemove
//        , duration: 1
//        , ease: "power1.out"
//    });
//});
//function rotateElement() {
//    $('.clippath').animate({ rotate: '+=360deg' }, 3000, 'linear', rotateElement);
//  }
//
//  rotateElement();
//    TweenMax.staggerTo(layers[i], 0.1, {
//
//            scale: function (index, target) {
//                return 1 + 0.1 * i;
//            }
//    });
//    TweenMax.to(circles[i], getRndInteger(1, 2.2), {
//        morphSVG: endShapes[i]
//        , yoyo: true
//        , repeat: -1
//        , ease: Sine.easeInOut
//    });
//    gsap.to(circles[i], {
//        transformOrigin: "center center",
//        scale: 1
//        , ease: Power1.easeInOut
//        , delay: i * 0.2
//        , yoyo: true
//        , repeat: -1
//        , d: "M142.5 56C142 32.3333 140 16 109.728 0.691238C88 0.691238 103.5 11 71 3.99998C33.0596 -4.17182 35.5 5.62415 23 11.5C6.00001 19.4911 15 23 1.5 56C-2.28633 65.2555 27.5 85 36.5 96.5C43.1521 105 46.8425 128.347 55.5 127C78 123.5 108.749 140.664 118 118C128 93.5 145.833 86.3333 142.5 56Z"
//        ,
//        duration: 2
//    })
//    gsap.fromTo(
//    circles[i],
//    { morphSVG: "M0,0 H200 V200 H0 Z" },
//    { morphSVG: "M142.5 56C142 32.3333 140 16 109.728 0.691238C88 0.691238 103.5 11 71 3.99998C33.0596 -4.17182 35.5 5.62415 23 11.5C6.00001 19.4911 15 23 1.5 56C-2.28633 65.2555 27.5 85 36.5 96.5C43.1521 105 46.8425 128.347 55.5 127C78 123.5 108.749 140.664 118 118C128 93.5 145.833 86.3333 142.5 56Z", duration: 1, ease: "power2.inOut" , yoyo: true, repeat: -1}
//  );
//}
//TweenMax.staggerTo(".layer", 0.1, {
//    cycle: {
//        scale: function (index, target) {
//            return 1 + 0.1 * (length - index);
//        }
//    }
//});
//var endShapes = document.querySelectorAll(".layer .endShape");
//gsap.registerPlugin(zIndex);
//
//TweenMax.staggerTo('.layer', 0, {
//    cycle: {
//        zIndex: function (index, target) {
//            return (index);
//        }
//    }
//}, 0)
//gsap.set(".layer .basicShape", {
//    transformOrigin: "center center"
//    , scale: 2
//    , x: window.innerWidth / 2
//    , y: window.innerHeight / 2
//})
//var zIndex = 10;
//for (var i = 0; i < layers.length; i++) {
//    layers[i].style.zIndex = zIndex--;
//}
//var shapes = [
//  "M100,50 A50,50 0 1,0 150,150 A50,50 0 1,0 50,150 Z",
//  "M94.659,57.879 A50,50 0 0,0 151.138,136.494 A50,50 0 0,0 56.471,136.238 Z",
//  "M85.596,67.778 A50,50 0 0,0 149.645,122.221 A50,50 0 0,0 63.935,109.384 Z",
//  "M75.049,78.758 A50,50 0 0,0 148.269,109.302 A50,50 0 0,0 70.309,82.053 Z",
//  "M63.314,90.566 A50,50 0 0,0 146.286,96.59 A50,50 0 0,0 76.546,58.716 Z",
//  "M50.67,103.925 A50,50 0 0,0 144.579,84.242 A50,50 0 0,0 82.864,36.481 Z",
//  "M37.396,118.552 A50,50 0 0,0 141.748,71.808 A50,50 0 0,0 90.509,18.621 Z",
//  "M23.795,134.144 A50,50 0 0,0 137.672,59.202 A50,50 0 0,0 99.07,0.814 Z",
//  "M10.184,150.409 A50,50 0 0,0 132.345,46.686 A50,50 0 0,0 107.685,0.342 Z",
//  "M-4.806,167.051 A50,50 0 0,0 126.623,34.65 A50,50 0 0,0 116.563,3.346 Z"
//];






//var currentIndex = 0;
//var svgElement = document.getElementById('mask888');

//function changeShape() {
//    var nextIndex = (currentIndex + 1) % shapes.length;
//    var nextShape = shapes[nextIndex];
//    gsap.to(svgElement, {
//        morphSVG: nextShape
//        , duration: 1.1
//    });
//    if (nextIndex === 7) currentIndex = 0
//    else currentIndex = nextIndex;
//}
//// Вызываем функцию изменения формы каждую секунду
//setInterval(changeShape, 1000);
//for (var i = 0; i < length; i++) {
//    TweenMax.to(circles[i], getRndInteger(1, 2.2), {
//        morphSVG: endShapes[i]
//        , yoyo: true
//        , repeat: -1
//        , ease: Sine.easeInOut
//    });
//    gsap.to($('.clippath path'), {
//        transformOrigin: "center center"
//        , scale: 2.2
//        , ease: Power1.easeInOut
////        , yoyo: true
//    })
//    gsap.to($('.clippath'), {
//        transformOrigin: "center center"
//        , scale: 1.5
//        , ease: Power1.easeInOut
//////        , yoyo: true
//////        , repeat: -1
//////        ,rotation: 360,
////        duration: 4
//    })
