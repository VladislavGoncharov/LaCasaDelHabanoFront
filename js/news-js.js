$(document).ready(function() {
  var dataContainer = $('#data-container');

  // Ваш массив данных
  var dataArray = [
    'Элемент 1',
    'Элемент 2',
    'Элемент 3',
    'Элемент 4',
    'Элемент 5',
    'Элемент 6',
    'Элемент 7',
    'Элемент 8',
    'Элемент 9',
    'Элемент 10',
    'Элемент 11',
    'Элемент 12',
    'Элемент 13',
    'Элемент 14',
    'Элемент 15'
    // Добавьте остальные элементы данных
  ];

  var itemsPerPage = 5; // Количество элементов на странице

  $('#pagination-demo').pagination({
    dataSource: dataArray,
    pageSize: itemsPerPage,
    callback: function(data, pagination) {
      dataContainer.empty();

      // Отображение элементов на текущей странице
      for (var i = 0; i < data.length; i++) {
        dataContainer.append('<div>' + data[i] + '</div>');
      }
    }
  });
});
