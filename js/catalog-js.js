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
    parseInt($(`#range-${el}-from`).text()),
    parseInt($(`#range-${el}-to`).text())
  ];

  let rangeEl = $(`#range-${el}`);
  noUiSlider.create(rangeEl[0], {
    start: [from, to],
    connect: true,
    range: {
      min: from,
      max: to
    }
  });
}
