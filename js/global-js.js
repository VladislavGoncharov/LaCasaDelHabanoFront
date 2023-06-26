function openPopUp(el,event) {

    event.preventDefault();
     let element = $(`#${el}`);
    element.fadeToggle()
}
