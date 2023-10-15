
function updateBacket() {
   $('.backet__scroll_div .os-content').children().remove() // удаляем содержимое корзины
   // обнуляем и скрываем количество товаров, которые есть/были в корзине
   $("[id^='count_']").text(0);
   $("[id^='box_count_']").css('display', 'none');
   
   if (localStorage.getItem("backet") !== null) {
      let backetJSON = localStorage.getItem('backet')

      if (backetJSON.length > 2) {

         var backet = JSON.parse(backetJSON);

         let mapBacket = new Map()

         // перевожу корзину в Map для того, чтобы узнать количество одинаковый айтемов (одиноковый это когда опция и айди одинаково)
         backet.forEach(function (item) {
            let itemStringify = JSON.stringify(item)

            if (mapBacket.has(itemStringify)) {
               let value = mapBacket.get(itemStringify)
               value = parseInt(value) + 1
               mapBacket.set(itemStringify, value)
            }
            else mapBacket.set(itemStringify, 1)
         })

         let totalPrice = 0

         // По новой Map создаю элементы в корзине с учетом количество добавленного товара
         // А так же считаю общую цену в зависимости от количества одинакового товара и опции (поштучно, 20 штук и тд)
         mapBacket.forEach(function (count, key) {
            let itemBacket = JSON.parse(key)
            //вытягиваю оригинальный объект из глобальной переменной
            let item = window.globalAllItemsOriginalMap.get(itemBacket.id)

            let optionKey
            let optionValue

            item.option.forEach(function (value, key) {
               if (itemBacket.option === Object.keys(value)[0]) {
                  optionKey = Object.keys(value)[0]
                  optionValue = value[optionKey]
               }
            })

            showCountItemsinCatalog(itemBacket.id, count)

            totalPrice = totalPrice + (parseInt(item.price) * count * parseInt(optionValue))

            createItemInBacket(item, optionKey, count)
         })
         $('#backet_total').css('opacity', 1)
         $('#backet_total_price').text(formatNumberWithThousandsSeparator(totalPrice))

      }
      else backetIsEmpty()

   }
   else backetIsEmpty()


}

function showCountItemsinCatalog(idItem, count) {
   console.log(idItem);
   
   let currentItem = parseInt($(`[id^='count_${idItem}']`).text())

   currentItem = currentItem + count

   $(`[id^='count_${idItem}']`).text(currentItem);
   $(`[id^='box_count_${idItem}']`).css('display', 'flex');
   

}


function backetIsEmpty() {

   let itemDiv = document.createElement('div');
   itemDiv.classList.add('text-uppercase', 'h5');

   itemDiv.innerHTML = `
         <div class="transform_show">пусто</div>
   `;
   $('.backet__scroll_div .os-content').append(itemDiv);

   $('#backet_total').css('opacity', 0)
   $('#backet_total_price').text(0)


}

//создание карточки товара в корзине
function createItemInBacket(item, option, count) {

   let disableBTN = count < 2 ? 'disable-btn' : '';

   let itemDiv = document.createElement('div');
   itemDiv.classList.add('grid-col-2', 'mt-4', 'pe-3');

   itemDiv.innerHTML = `
         <div class="backet__box_img">
            <img class="backet__img" src="img/${item.type}.jpg" alt="catalog__img_card_1">
         </div>
         <div class="position-relative ms-2">
            <div class="h5">${item.name}</div>
            <div class="h5">Опция: ${option}</div>
            <div class="position-absolute bottom-0 w-100">
               <div class="mb-4 pb-2"><a class="h5 fc-grey" onclick="deleteInBacket('${item.id}:${option}')">Удалить</a></div>
               <div class="d-flex justify-content-between align-items-end">
                  <div class="h3-num">${item.price}</div>
                  <div class="d-flex justify-content-center align-items-center">
                     <a class="me-sm-3 me-1 ${disableBTN}" onclick="minusItemInBacket('${item.id}:${option}')">
                        <svg class="plus_minus_backet" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M4.53516 15.1045H24.4629C24.9633 15.1045 25.3691 14.6987 25.3691 14.1982C25.3691 13.6978 24.9633 13.292 24.4629 13.292H4.53516C4.03464 13.292 3.62891 13.6978 3.62891 14.1982C3.62891 14.6987 4.03464 15.1045 4.53516 15.1045Z" fill="#817878"/>
                        </svg>
                     </a>
                     <div class="h3-num ps-2 pe-2 me-sm-3 me-1">${count}</div>
                     <a onclick="plusItemInBacket('${item.id}:${option}')">
                        <svg class="plus_minus_backet" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <g id="Add / undefined / Glyph: undefined">
                              <path id="Vector" d="M24.7734 14.1931C24.7734 14.6519 24.4327 15.0312 23.9903 15.0912L23.8674 15.0996L15.1068 15.101L15.1068 23.8652C15.1068 24.3657 14.701 24.7714 14.2005 24.7714C13.7417 24.7714 13.3625 24.4304 13.3025 23.9882L13.2943 23.8652L13.2943 15.101L4.53494 15.1034C4.03445 15.1035 3.62845 14.6979 3.62845 14.1974C3.62845 13.7386 3.9692 13.3593 4.41157 13.2993L4.53458 13.2909L13.2943 13.2885L13.2943 4.5293C13.2943 4.02878 13.7 3.62305 14.2005 3.62305C14.6593 3.62305 15.0385 3.96398 15.0986 4.40632L15.1068 4.5293L15.1068 13.2885L23.867 13.2871C24.3675 13.2869 24.7734 13.6926 24.7734 14.1931Z" fill="white"/>
                           </g>
                        </svg>
                     </a>
                  </div>
               </div>
            </div>
         </div>
      `;
   $('.backet__scroll_div .os-content').append(itemDiv);
}

function minusItemInBacket(currentItem) {
   let obj = getStringifyItem(currentItem)

   let jsonBacket = localStorage.getItem("backet");

   // Преобразование JSON-строки в массив пар ключ-значение and Восстановление Map из массива
   let backet = JSON.parse(jsonBacket);

   let mapBacket = new Map();

   backet.forEach(function (item) {
      let itemStringify = JSON.stringify(item)

      // Используем объект item как ключ
      if (mapBacket.has(itemStringify)) {
         let value = mapBacket.get(itemStringify);
         value = parseInt(value) + 1;
         mapBacket.set(itemStringify, value);
      } else {
         mapBacket.set(itemStringify, 1);
      }
   });


   let value = mapBacket.get(obj)
   value = parseInt(value) - 1
   mapBacket.set(obj, value)

   backet = []
   mapBacket.forEach(function (value, key) {
      for (let i = 0; i < value; i++) {

         backet.push(JSON.parse(key))
      }
   })

   jsonBacket = JSON.stringify(backet);
   localStorage.setItem("backet", jsonBacket);

   updateBacket()
   

}
function plusItemInBacket(currentItem) {
   let obj = getStringifyItem(currentItem)

   let jsonBacket = localStorage.getItem("backet");

   // Преобразование JSON-строки в массив пар ключ-значение and Восстановление Map из массива
   let backet = JSON.parse(jsonBacket);
   
   let mapBacket = new Map();

   backet.forEach(function (item) {
      let itemStringify = JSON.stringify(item)

      // Используем объект item как ключ
      if (mapBacket.has(itemStringify)) {
         let value = mapBacket.get(itemStringify);
         value = parseInt(value) + 1;
         mapBacket.set(itemStringify, value);
      } else {
         mapBacket.set(itemStringify, 1);
      }
   });


   let value = mapBacket.get(obj)
   value = parseInt(value) + 1
   mapBacket.set(obj, value)

   backet = []
   mapBacket.forEach(function (value, key) {
      for (let i = 0; i < value; i++) {

         backet.push(JSON.parse(key))
      }
   })

   jsonBacket = JSON.stringify(backet);
   localStorage.setItem("backet", jsonBacket);

   updateBacket()

}
function deleteInBacket(currentItem) { // не настроен
   let jsonBacket = localStorage.getItem("backet");

   // Преобразование JSON-строки в массив пар ключ-значение and Восстановление Map из массива
   let backet = JSON.parse(jsonBacket);

   currentItem = currentItem.split(':')

   let idToRemove = parseInt(currentItem[0]);
   let optionToRemove = currentItem[1];

   // Используем метод filter() для создания нового массива без объектов, которые нужно удалить
   backet = backet.filter(item => !(item.id === idToRemove && item.option === optionToRemove));

   jsonBacket = JSON.stringify(backet);
   localStorage.setItem("backet", jsonBacket);

   updateBacket()
}

function formatNumberWithThousandsSeparator(number) {
   // Преобразуем число в строку и разделяем его на группы по 3 цифры с конца числа
   let parts = number.toString().split('.');
   parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

   // Объединяем группы с разделителем тысяч и возвращаем результат
   return parts.join('.');
}

function getStringifyItem(item) {
   item = item.split(':')
   let obj = {
      id: parseInt(item[0]),
      option: item[1]
   }

   return JSON.stringify(obj);
}