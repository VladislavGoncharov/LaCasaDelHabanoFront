//web socket
var socket = new SockJS("http://127.0.0.1:8080/websocket");
var stompClient = Stomp.over(socket);
stompClient.connect({}, function (frame) {
    console.log('Connected: ' + frame);
    sendFilterRequest('привет')
        // Подписка на определенные топики
    stompClient.subscribe('/get/news', function (data) {
        var responseData = JSON.parse(data.body);
        var container = $('#containerForNews');
        $('#pagination-news').pagination({
            dataSource: responseData,
            pageSize: 5,
            callback: function (data, pagination) {
                container.empty();
                // Отображение элементов на текущей странице
                for (var i = 0; i < data.length; i++) {
                    createItem(container, data[i]);
                }
            }
        });
    });
});

function sendFilterRequest(filters) {
    // Отправка запроса с фильтрами на сервер
    stompClient.send("/app/news", {}, JSON.stringify(filters));
}

function createItem(container, item) {
    var itemDiv = document.createElement('div');
    itemDiv.classList.add('offset-3', 'mb-3', 'col-9');
    itemDiv.innerHTML = `
                <div class="border-top">
                    <div class="row mt-5 mb-5">
                        <div class="col-5">
                            <div class="h5-num">${item.date}</div>
                            <div class="mt-2 h3">${item.header}</div>
                            <div class="mt-4 pe-5">
                                <p class="h5">${item.mainText}</p>
                            </div>
                        </div>
                        <div class="col-4 ps-5 ms-1"><img src="img/about_us__picture_news.jpg" alt="news"></div>
                        <div class="col">
                            <div class="position-relative h-100">
                                <div class="position-absolute bottom-0 end-0"> <a class="round-button round-button-big d-flex justify-content-center align-items-center" href="#">
                            Резерв
                        </a> </div>
                            </div>
                        </div>
                    </div>
                    <div class="h5 mb-2" style="color:var(--mc-white-06)">${item.tag}</div>
                </div>
        `;
    container.append(itemDiv);
}
