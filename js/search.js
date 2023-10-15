

let containerSearchResult = $('#search_result');

$('#search_input').on('input', function () {

   var inputValue = $(this).val();
   //web socket
   sendsearcgRequest(inputValue)

})


function sendsearcgRequest(inputValue) {

   globalState.stompClient.send("/app/search", {}, JSON.stringify(inputValue));
   // Подписка на определенные топики
   globalState.stompClient.subscribe('/get/search', function (data) {
      let responseData = JSON.parse(data.body);
      containerSearchResult.empty();
      // Отображение элементов на текущей странице
      if (responseData.length !== 0) {
         for (let i = 0; i < responseData.length; i++) {
            createItemSearchResult(containerSearchResult, responseData[i]);
         }
      }
   });
}

globalState.stompClient.connect({}, function (frame) {
   console.log('Connected: ' + frame);
});

function createItemSearchResult(container, item) {
   let itemDiv = document.createElement('div');
   itemDiv.classList.add('d-flex', 'mt-2');
   itemDiv.innerHTML = `
           <div class="search__container-img-result">
               <div class="search__img-result"></div>
           </div>
           <div class="h5">
               <a href="${item.link}" data-price="${item.price}">${item.name}</a>
            </div>                        
       `;
   container.append(itemDiv);
}