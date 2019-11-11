import $ from 'jquery';
// 1 По готовности документа - функция
// 2 Создать переменные для блоков поиска и листа
// 3 Прикрепить к поиску обработчик и получить значения
// 4 Найти в Листе параграф и перебрать
// 5 переменная для зис
// 6 переменный для текста в малом шрифте и взять родителя параграфа
// 7 условие если текст совпадает со значением то показать родителя параграфа если нет то скрыть

$(document).ready(function(){
    var UserImg = 'images/UserAvatar5.png';
    var friendImges = '';

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
            friendImges = $(this).find('img').attr('src');
            var FriendId = this.id;
            localStorage.setItem('SelectedFriend',FriendId);
        };
    };

    //Конструктор сообщений
    function CreateMessage (message, isUser, img){
        var сlassName = isUser ? 'ChatBlock__MessagePullFriend UserMesage' : 'ChatBlock__MessagePullFriend' ;
        var friendImg = img ? UserImg : friendImges;
        return '<div class="'+ сlassName +'"><img class="ChatBlock__FriendImg" src="'+ friendImg +'" alt=""><div class="ChatBlock__FriendMessage"><p>'+ message +'</p></div></div>'
    }

    //Рандомное число 
    function randomValue(min, max){
        return Math.floor(Math.random() * (max - min) + min);
    }

    // for(var i = 0; i <20; i++){
    //     console.log(randomValue(0, 3))
    // }
     
    var friendMessageColl = [
        'Соре, помочь не могу, не знаю где он',
        'Но могу зачитать реп!',
        'Как хочешь, бро )',
    ]

    var $userMessageInput = $('.ChatBlock__UserMessageInput');
    var $userMessageButton = $('.ChatBlock__UserMessageButton');
    var $massagrsContainer = $('.ChatBlock__Message');

    $userMessageButton.on('click', function(){
        var message = $userMessageInput.val();
        $userMessageInput.val('');
        $massagrsContainer.append(CreateMessage(message, true));

        setTimeout(function() {
            var friendMessage = friendMessageColl[randomValue(0,friendMessageColl.length)];
            $massagrsContainer.append(CreateMessage(friendMessage, false));
        }, 1000);
    });




    //Вызов функций
    RememberFriends();
    FilterFriend();
    FhooseFriend();
});