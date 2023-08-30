let lineFilters = $('.filters')
let resetFilters = $('#resetFilters')
    //
let currentSeriesArray = [];
let currentBrandsArray = [];
let currentRangePriceMinMax = []
let currentRangeRingGaugeMinMax = []
let currentRangeSizeMinMax = []
let currentRangeFortressMinMax = []
let originalSeriesArray = [];
let originalBrandsArray = [];
let originalRangePriceMinMax = []
let originalRangeRingGaugeMinMax = []
let originalRangeSizeMinMax = []
let originalRangeFortressMinMax = []
    //
addingOriginalDataInOriginalArray();
//
function handleCheckboxChange(event, dataArray) {
    let isChecked = $(event.target).is(':checked');
    let selectedValue = $(event.target).data('name');
    let selectedOption = $(event.target).data('option');
    let selectedId = selectedValue.replace(/\s/g, "_");
    if (isChecked) {
        // Если чекбокс выбран
        console.log('Чекбокс выбран: ' + selectedValue);
        // Добавляем значение в массив, если оно уже не содержится
        if (!dataArray.includes(selectedValue)) {
            dataArray.push(selectedValue);
            let htmlToAppend = `
                <div id="${selectedId}" class="d-flex justify-content-between align-items-center me-5 underline-one filter-remove" data-option="${selectedOption}" data-name="${selectedValue}">
                  <div class="text-nowrap">${selectedValue}</div>
                  <button class="pe-0"><img src="img/cross_black.svg" alt="cross_black"></button>
                </div>
              `;
            // Используем метод append() для добавления HTML-кода в элемент с классом "filters"
            $('.filters').append(htmlToAppend);
        }
    }
    else {
        console.log('Чекбокс снят: ' + selectedValue);
        $(`#${selectedId}`).remove()
            // Удаляем значение из массива, если оно присутствует
        let index = dataArray.indexOf(selectedValue);
        if (index > -1) {
            dataArray.splice(index, 1);
        }
    }
    // Выводим обновленный массив в консоль
    console.log('Массив:', dataArray);
    // Другие действия с обновленным массивом...
}
$('[name="series"]').change(function (event) {
    handleCheckboxChange(event, currentSeriesArray);
});
$('[name="brands"]').change(function (event) {
    handleCheckboxChange(event, currentBrandsArray);
});
$(document).ready(function () {
        $('.height-along-central-column').css('height', $('.central-column').height())
    })
    // открывается описание этапов работы
function openFilter(number) {
    $(`#filters_${number}`).slideToggle();
    $(`#jackdaw_${number}`).toggleClass('rotate-180');
}
// Массив с информацией о каждом ползунковом регуляторе
let sliders = [
    {
        id: 'range-price'
        , textFrom: '#range-price-from'
        , textTo: '#range-price-to'
        , type: 'price'
        , rangeMinMax: currentRangePriceMinMax
        , originalRangeMinMax: originalRangePriceMinMax
        , textMin: 'Цена от: '
        , textMax: 'Цена до: '
  }
    , {
        id: 'range-ring-gauge'
        , textFrom: '#range-ring-gauge-from'
        , textTo: '#range-ring-gauge-to'
        , type: 'ring-gauge'
        , rangeMinMax: currentRangeRingGaugeMinMax
        , originalRangeMinMax: originalRangeRingGaugeMinMax
        , textMin: 'Ring gauge от: '
        , textMax: 'Ring gauge до: '
  }
    , {
        id: 'range-size'
        , textFrom: '#range-size-from'
        , textTo: '#range-size-to'
        , type: 'size'
        , rangeMinMax: currentRangeSizeMinMax
        , originalRangeMinMax: originalRangeSizeMinMax
        , textMin: 'Размер от: '
        , textMax: 'Размер до: '
  }
    , {
        id: 'range-fortress'
        , textFrom: '#range-fortress-from'
        , textTo: '#range-fortress-to'
        , type: 'fortress'
        , rangeMinMax: currentRangeFortressMinMax
        , originalRangeMinMax: originalRangeFortressMinMax
        , textMin: 'Крепкость от: '
        , textMax: 'Крепкость до: '
  }
];
// Создание ползунковых регуляторов и установка обработчиков событий для каждого
sliders.forEach(function (slider) {
    let rangeSlider = $('#' + slider.id)[0];
    let rangeSliderFrom = $(slider.textFrom);
    let rangeSliderTo = $(slider.textTo);
    createSlider(slider.type);
    rangeSlider.noUiSlider.on('update', function (values) {
        updateText(slider.type);
        updateNavFilter(slider, values);
        slider.rangeMinMax[0] = parseInt(values[0]);
        slider.rangeMinMax[1] = parseInt(values[1]);
    });
});

function updateText(el) {
    let [from, to] = $(`#range-${el}`)[0].noUiSlider.get();
    $(`#range-${el}-from`).text(parseInt(from));
    $(`#range-${el}-to`).text(parseInt(to));
}

function updateNavFilter(el, values) {
    let value0 = parseInt(values[0])
    let value1 = parseInt(values[1])
    let idFrom = el.id + '-from-filter'
    let idTo = el.id + '-to-filter'
    if (el.originalRangeMinMax[0] != value0) {
        if ($(`#${idFrom}`).length) {
            $(`#${idFrom}`).find('.ff-lato').text(value0);
        }
        else {
            let htmlToAppend = `
                <div id="${idFrom}" class="d-flex justify-content-between align-items-center me-5 underline-one filter-remove" data-option="${el.type}" data-name="from">
                  <div class="text-nowrap me-1">${el.textMin}</div>
                  <div class="text-nowrap ff-lato">${value0}</div>
                  <button class="pe-0"><img src="img/cross_black.svg" alt="cross_black"></button>
                </div>
              `;
            $('.filters').append(htmlToAppend);
        }
    }
    else {
        if ($(`#${idFrom}`).length) {
            $(`#${idFrom}`).remove()
        }
    }
    if (el.originalRangeMinMax[1] != value1) {
        if ($(`#${idTo}`).length) {
            $(`#${idTo}`).find('.ff-lato').text(value1);
        }
        else {
            let htmlToAppend = `
                <div id="${idTo}" class="d-flex justify-content-between align-items-center me-5 underline-one filter-remove" data-option="${el.type}" data-name="to">
                  <div class="text-nowrap me-1">${el.textMax}</div>
                  <div class="text-nowrap ff-lato">${value1}</div>
                  <button class="pe-0"><img src="img/cross_black.svg" alt="cross_black"></button>
                </div>
              `;
            $('.filters').append(htmlToAppend);
        }
    }
    else {
        if ($(`#${idTo}`).length) {
            $(`#${idTo}`).remove()
        }
    }
    //    console.log('----------------------------------------');
    //    console.log('currentSeriesArray:', currentSeriesArray);
    //console.log('currentBrandsArray:', currentBrandsArray);
    //console.log('currentRangePriceMinMax:', currentRangePriceMinMax);
    //console.log('currentRangeRingGaugeMinMax:', currentRangeRingGaugeMinMax);
    //console.log('currentRangeSizeMinMax:', currentRangeSizeMinMax);
    //console.log('currentRangeFortressMinMax:', currentRangeFortressMinMax);
    //
    //console.log('originalSeriesArray:', originalSeriesArray);
    //console.log('originalBrandsArray:', originalBrandsArray);
    //console.log('originalRangePriceMinMax:', originalRangePriceMinMax);
    //console.log('originalRangeRingGaugeMinMax:', originalRangeRingGaugeMinMax);
    //console.log('originalRangeSizeMinMax:', originalRangeSizeMinMax);
    //console.log('originalRangeFortressMinMax:', originalRangeFortressMinMax);
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
let socket = new SockJS("http://127.0.0.1:8080/websocket");
let stompClient = Stomp.over(socket);
stompClient.connect({}, function (frame) {
    console.log('Connected: ' + frame);
    sendFilterRequest('привет')
        // Подписка на определенные топики
    stompClient.subscribe('/get/items', function (data) {
        let responseData = JSON.parse(data.body);
        let container = $('#containerForItems');
        $('#pagination-catalog').pagination({
            dataSource: responseData
            , pageSize: 9
            , callback: function (data, pagination) {
                container.empty();
                container.prepend('<div class="col-12 mt-19px"></div>');
                // Отображение элементов на текущей странице
                for (let i = 0; i < data.length; i++) {
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
    let itemDiv = document.createElement('div');
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
//сортировка
$(document).ready(function () {
    $('.new-select__item').on('click', function () {
        // Получаем выбранное значение
        let selectedValue = $(this).attr('data-value');
        // Обработчик события для изменения выбора в выпадающем списке
        console.log('Выбрано значение: ' + selectedValue);
        // Добавьте здесь свой код для дальнейшей обработки выбранного значения
        // Например, можно выполнить дополнительные действия в зависимости от выбранного значения
        // if (selectedValue === 'desc') {
        //   // Выполнить действия для сортировки по убыванию цены
        // } else if (selectedValue === 'asc') {
        //   // Выполнить действия для сортировки по возрастанию цены
        // } else {
        //   // Выполнить действия, если выбрано "Не сортировать"
        // }
    });
});
//удаление фильтров
$('.filters').on('click', '.filter-remove', function () {
    let option = $(this).attr('data-option')
    let name = $(this).attr('data-name')
    if (option === 'type') {
        $('.checkbox-type-filter').removeClass('checkbox-type-filter-checked');
        $('.checkbox-type-filter input').not(this).prop('checked', false);
        $(this).remove();
        checkboxType($('.checkbox-type-filter input'))
    }
    else if (option === 'series' || option === 'brands') {
        let element = $(`input[data-name="${name}"]`)
        element.prop('checked', false);
        let index = currentSeriesArray.indexOf(name);
        if (index > -1) {
            currentSeriesArray.splice(index, 1);
        }
        index = currentBrandsArray.indexOf(name);
        if (index > -1) {
            currentBrandsArray.splice(index, 1);
        }
        $(this).remove()
    }
    else {
        let currentSlider;
        sliders.forEach(function (slider) {
            if (slider.type === option) {
                currentSlider = slider;
                return
            }
        });
        let element = $(`#range-${currentSlider.type}`)
        let [fromValue, toValue] = element[0].noUiSlider.get();
        if ('from' === name) {
            element[0].noUiSlider.set([currentSlider.originalRangeMinMax[0], null])
            $(currentSlider.textFrom).text(currentSlider.originalRangeMinMax[0]);
            currentSlider.rangeMinMax = [currentSlider.originalRangeMinMax[0], toValue]
        }
        if ('to' === name) {
            element[0].noUiSlider.set([null, currentSlider.originalRangeMinMax[1]])
            $(currentSlider.textTo).text(currentSlider.originalRangeMinMax[1]);
            currentSlider.rangeMinMax = [fromValue, currentSlider.originalRangeMinMax[1]]
        }
    }
});
// заполняем исходными фильтрами
function addingOriginalDataInOriginalArray() {
    originalSeriesArray = [];
    originalBrandsArray = [];
    originalRangePriceMinMax = [630, 287000]
    originalRangeRingGaugeMinMax = [30, 54]
    originalRangeSizeMinMax = [90, 194]
    originalRangeFortressMinMax = [1, 5]
}
//работа с чекбоксами типов
$('.checkbox-type-filter input').on('change', function () {
    checkboxType($(this))
});
$(document).ready(function () {
    checkboxType($('.checkbox-type-filter input'))
});

function checkboxType(el) {
    let allUnchecked = $('.checkbox-type-filter input').filter(':not(:checked)').length === $('.checkbox-type-filter input').length;
    if (allUnchecked) {
        console.log(111)
        let htmlToAppend = `
                <div id="allType" class="d-flex justify-content-between align-items-center me-5 underline-one filter-remove" data-option="type">
                  <div class="text-nowrap me-1">Все товары</div>
                </div>
              `;
        $('.filters').prepend(htmlToAppend);
        if ($(`#type`).length) {
            $(`#type`).remove();
        }
        $('#filterSeries, #filterBrands, #filterRingGuage, #filterSize, #filterFortress, #filterTypesOfAccessory').css('display', 'none')
        updatePriceByUpdateType(80, 287000)
    }
    else {
        //        console.log(222)
        $(`#allType`).remove();
        let dataName = $(el).data('name');
        if ($(`#type`).length) {
            $(`#type`).find('.type-name').text(dataName);
        }
        else {
            let htmlToAppend = `
                <div id="type" class="d-flex justify-content-between align-items-center me-5 underline-one filter-remove" data-option="type" data-name="${dataName}">
                  <div class="text-nowrap me-1">Тип:</div>
                  <div class="text-nowrap type-name">${dataName}</div>
                  <button class="pe-0"><img src="img/cross_black.svg" alt="cross_black"></button>
                </div>
              `;
            $('.filters').prepend(htmlToAppend);
        }
        switch (dataName) {
        case 'Сигары':
            $('#filterSeries, #filterBrands, #filterRingGuage, #filterSize, #filterFortress, #brandsSirars').css('display', 'block')
            $('#brandsCoffee, #brandsCigarillos, #filterTypesOfAccessory').css('display', 'none')
            updatePriceByUpdateType(630, 287000)
            break;
        case 'Сигарилы':
            $('#filterBrands, #brandsCigarillos').css('display', 'block')
            $('#filterSeries, #brandsSirars, #brandsCoffee, #filterRingGuage, #filterSize, #filterFortress, #filterTypesOfAccessory').css('display', 'none')
            updatePriceByUpdateType(585, 13120)
            break;
        case 'Кофе':
            $('#filterBrands, #brandsCoffee').css('display', 'block')
            $('#filterSeries, #brandsSirars, #brandsCigarillos, #filterRingGuage, #filterSize, #filterFortress, #filterTypesOfAccessory').css('display', 'none')
            updatePriceByUpdateType(530, 2360)
            break;
        case 'Аксессуары':
            $('#filterTypesOfAccessory').css('display', 'block')
            $('#filterSeries, #filterBrands, #filterRingGuage, #filterSize, #filterFortress').css('display', 'none')
            updatePriceByUpdateType(80, 41400)
            break;
        default:
            $('#filterSeries, #filterBrands, #filterRingGuage, #filterSize, #filterFortress, #filterTypesOfAccessory').css('display', 'none')
            break;
        }
        filterRemoveTrigger('notAllEl')
    }
}

function updatePriceByUpdateType(minOriginal, maxOriginal) {
    let currentSlider;
    sliders.forEach(function (slider) {
        if (slider.type === 'price') {
            currentSlider = slider;
            return
        }
    });
    let element = $(`#range-${currentSlider.type}`)
    currentSlider.originalRangeMinMax = [minOriginal, maxOriginal]
    currentSlider.rangeMinMax = [minOriginal, maxOriginal]
    element[0].noUiSlider.updateOptions({
        start: [minOriginal, maxOriginal]
        , range: {
            min: minOriginal
            , max: maxOriginal
        }
    });
    updateText('price')
}
//функция следит за изменением в div class = "filters" чтобы при удалении/добавлении элемнтов можно было осуществлять логику
$(document).ready(function () {
    // Выбираем элемент, за которым будем следить
    const target = $('.filters')[0];
    // Конфигурация наблюдателя (следим за добавлением и удалением элементов)
    const config = {
        childList: true
    };
    // Функция обратного вызова, которая будет вызываться при изменениях в .filters
    const callback = function (mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                hiddenBTNResetFilters()
            }
        }
    };
    // Создаем экземпляр Mutation Observer
    const observer = new MutationObserver(callback);
    // Начинаем отслеживать изменения в .filters с заданной конфигурацией
    observer.observe(target, config);
    hiddenBTNResetFilters()
});

function hiddenBTNResetFilters() {
    let $filters = $('.filters');
    let $resetFilters = $('#resetFilters');
    let countChildren = $filters.children().length;
    let countChildrenWithIdAllType = $filters.children('#allType');
    if (countChildren == 1 && countChildrenWithIdAllType.length > 0) {
        $resetFilters.css('opacity', 0)
    }
    else {
        $resetFilters.css('opacity', 1)
    }
}
$('#resetFilters').click(function () {
    filterRemoveTrigger('allEl')
})

function filterRemoveTrigger(switcher) {
    if (switcher === 'allEl') $('.filter-remove').trigger('click');
    else $('.filter-remove').each(function () {
        if (!($(this).attr('data-option') === 'type')) $(this).trigger('click');
    })
}
