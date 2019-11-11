import $ from 'jquery';
// 1 По готовности документа - функция
// 2 Создать переменные для блоков поиска и листа
// 3 Прикрепить к поиску обработчик и получить значения
// 4 Найти в Листе параграф и перебрать
// 5 переменная для зис
// 6 переменный для текста в малом шрифте и взять родителя параграфа
// 7 условие если текст совпадает со значением то показать родителя параграфа если нет то скрыть

$(document).ready(function(){

    //Счетчик друзей
   function counterFriend() {
        var $FriendList = $('.ChatBlock__FriendsList');
        $FriendList.find('.visible .FriendNumber').each(function(i){
            var number = i + 1;
            var $this = $(this);
            $this.text(number);
        });
    };

    //Функция считающая друзей
    function CountingFriends(){
        $('.FriendVisual').addClass('visible');
        counterFriend();
    }

    //Функция запоминающая выбранного друга
    function RememberFriends () {
        var FriendIdLocal = localStorage.getItem('SelectedFriend');
        if(FriendIdLocal){
            $('#'+ FriendIdLocal).addClass('FriendVisualOne');
        }else {
            $('.FriendVisual').eq(0).addClass('FriendVisualOne');
        }
    }
    
    //Функция ищущая друзей
    function FilterFriend(){

        var $FriendList = $('.ChatBlock__FriendsList');
        var $searchFriendInput = $('.ChatBlock__SearchFriend');

        $searchFriendInput.on('input',function(event){
        var value = event.target.value.toLowerCase();

            $FriendList.find('.ChatBlock__FriendName').each(function(){
                var $this = $(this);
                var text = $this.text().toLocaleLowerCase();
                var $friendContainer = $this.closest('.FriendVisual');

                    if(text.indexOf(value) !==-1){
                        $friendContainer.show().addClass('visible');
                    }else {
                        $friendContainer.hide().removeClass('visible');
            }
            counterFriend();
            });
        });
    };

    //Выбор друга
    function FhooseFriend(){
        $('.FriendVisual').on('click', ItemSelection);

        function ItemSelection() {
            $(this).addClass('FriendVisualOne');
            $(this).siblings().removeClass('FriendVisualOne');
            var FriendId = this.id;
            localStorage.setItem('SelectedFriend',FriendId);
        };
    };

    //Вызов функций
    counterFriend();
    CountingFriends();
    RememberFriends();
    FilterFriend();
    FhooseFriend();
});