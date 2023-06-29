function openPopUp(el, event) {
    event.preventDefault();
    let element = $(`#${el}`);
    element.fadeToggle();
    element.children().first().toggleClass("open_pop_up");
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
