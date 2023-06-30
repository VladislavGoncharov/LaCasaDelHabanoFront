$(document).ready(function () {
        $('.height-along-central-column').css('height', $('.central-column').height())
    })
    // открывается описание этапов работы
function openFilter(number) {
    $(`#filters_${number}`).slideToggle();
    $(`#jackdaw_${number}`).toggleClass('rotate-180');
}
// range sliders
// range price
let rangePrice = $('#range-price')[0];
let rangePriceFrom = $('#range-price-from');
let rangePriceTo = $('#range-price-to');
createSlider('price');
rangePrice.noUiSlider.on('update', function () {
    updateText('price')
});
// range ring gauge
let rangeRingGauge = $('#range-ring-gauge')[0];
let rangeRingGaugeFrom = $('#range-ring-gauge-from');
let rangeRingGaugeTo = $('#range-ring-gauge-to');
createSlider('ring-gauge')
rangeRingGauge.noUiSlider.on('update', function () {
    updateText('ring-gauge')
});
// range size
let rangeSize = $('#range-size')[0];
let rangeSizeFrom = $('#range-size-from');
let rangeSizeTo = $('#range-size-to');
createSlider('size')
rangeSize.noUiSlider.on('update', function () {
    updateText('size')
});
// range size
let rangeFortress = $('#range-fortress')[0];
let rangeFortressFrom = $('#range-fortress-from');
let rangeFortressTo = $('#range-fortress-to');
createSlider('fortress')
rangeFortress.noUiSlider.on('update', function () {
    updateText('fortress')
});

function updateText(el) {
    let [from, to] = $(`#range-${el}`)[0].noUiSlider.get();
    $(`#range-${el}-from`).text(parseInt(from));
    $(`#range-${el}-to`).text(parseInt(to));
}

function createSlider(el) {
    let [from, to] = [
    parseInt($(`#range-${el}-from`).text())
    , parseInt($(`#range-${el}-to`).text())
  ];
    let rangeEl = $(`#range-${el}`);
    noUiSlider.create(rangeEl[0], {
        start: [from, to]
        , connect: true
        , range: {
            min: from
            , max: to
        }
    });
}
//web socket
var socket = new SockJS("http://127.0.0.1:8080/websocket");
var stompClient = Stomp.over(socket);
stompClient.connect({}, function (frame) {
    console.log('Connected: ' + frame);
    sendFilterRequest('привет')
        // Подписка на определенные топики
    stompClient.subscribe('/get/items', function (data) {
        var responseData = JSON.parse(data.body);
        var container = $('#containerForItems');
        $('#pagination-catalog').pagination({
            dataSource: responseData
            , pageSize: 9
            , callback: function (data, pagination) {
                container.empty();
                container.prepend('<div class="col-12 mt-19px"></div>');
                // Отображение элементов на текущей странице
                for (var i = 0; i < data.length; i++) {
                    createItem(container, data[i]);
                }
                // настройка высоты, чтобы линия соприкосалась снизом
                $('.height-along-central-column').css('height', $('.central-column').height())
            }
        });
    });
});

function sendFilterRequest(filters) {
    // Отправка запроса с фильтрами на сервер
    stompClient.send("/app/filter", {}, JSON.stringify(filters));
}

function createItem(container, item) {
    var itemDiv = document.createElement('div');
    itemDiv.classList.add('col-4', 'mt-5', 'catalog__card');
    itemDiv.innerHTML = `
            <div class="catalog__card_img_div">
                <img class="catalog__card_img" src="img/catalog__img_card_1.jpg" alt="catalog__img_card_1">
            </div>
            <div class="catalog__card_padding_text">
                <div class="mt-2 catalog__card_name h5">${item.name}</div>
                <div class="border-top-black"></div>
                <div class="h5 pe-1 text-uppercase d-flex justify-content-between">
                    <div class="ff-lato">${item.price} р.</div>
                    <div><a href="">в корзину</a></div>
                </div>
            </div>
        `;
    container.append(itemDiv);
}
//
//  var dataContainer = $('#data-container');
//
//  // Ваш массив данных
//  var dataArray = [
//    'Элемент 1',
//    'Элемент 2',
//    'Элемент 3',
//    'Элемент 4',
//    'Элемент 5',
//    'Элемент 6',
//    'Элемент 7',
//    'Элемент 8',
//    'Элемент 9',
//    'Элемент 10',
//    'Элемент 11',
//    'Элемент 12',
//    'Элемент 13',
//    'Элемент 14',
//    'Элемент 15'
//    // Добавьте остальные элементы данных
//  ];
//  var itemsPerPage = 5; // Количество элементов на странице
//
//  $('#pagination').pagination({
//    dataSource: dataArray,
//    pageSize: itemsPerPage,
//    callback: function(data, pagination) {
//      dataContainer.empty();
//
//      // Отображение элементов на текущей странице
//      for (var i = 0; i < data.length; i++) {
//        dataContainer.append('<div>' + data[i] + '</div>');
//      }
//    }
//  });
