import $ from 'jquery';
// 1 По готовности документа - функция
// 2 Создать переменные для блоков поиска и листа
// 3 Прикрепить к поиску обработчик и получить значения
// 4 Найти в Листе параграф и перебрать
// 5 переменная для зис
// 6 переменный для текста в малом шрифте и взять родителя параграфа
// 7 условие если текст совпадает со значением то показать родителя параграфа если нет то скрыть

$(document).ready(function(){
    var $FriendList = $('.ChatBlock__FriendsList');
    var $searchFriendInput = $('.ChatBlock__SearchFriend');

    $searchFriendInput.on('input',function(event){
        var value = event.target.value.toLowerCase();

        $FriendList.find('.ChatBlock__FriendName').each(function(){
            var $this = $(this);
            var text = $this.text().toLocaleLowerCase();
            var $friendContainer = $this.closest('.FriendVisual');

            if(text.indexOf(value) !==-1){
                $friendContainer.show();
            }else {
                $friendContainer.hide();
            }
        });
    });
});