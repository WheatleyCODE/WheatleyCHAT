import $ from 'jquery';

$(document).ready(function(){

    //Глобальные переменные
    var UserImg = 'images/UserAvatarMain.jpg';
    var friendImg = '';

    var friendMessageColl = [
        'Соре, помочь не могу, не знаю где он',
        'Но могу зачитать реп!',
        'Как хочешь, бро )',
        'Если б я был человеком, а не скриптом, я пообщался бы с тобой =)',
        'Заскриптованная фраза №5',
    ]

    //Функция запоминающая выбранного друга
    function RememberFriends () {
        var FriendIdLocal = localStorage.getItem('SelectedFriend');
        if(FriendIdLocal){
            friendImg = $('#'+ FriendIdLocal).addClass('FriendVisualOne').find('.ChatBlock_FriendAvatarImg').attr('src');
        }else {
            friendImg = $('.FriendVisual').eq(0).addClass('FriendVisualOne').find('.ChatBlock_FriendAvatarImg').attr('src');
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
            friendImg = $(this).find('.ChatBlock_FriendAvatarImg').attr('src');
            var FriendId = this.id;
            localStorage.setItem('SelectedFriend',FriendId);
        };
    };

    //Конструктор сообщений
    function CreateMessage (message, isUser){
        var сlassName = isUser ? 'ChatBlock__MessagePullFriend UserMesage' : 'ChatBlock__MessagePullFriend' ;
        var avatar = isUser ? UserImg : friendImg;
        return '<div class="'+ сlassName +'"><img class="ChatBlock__FriendImg" src="'+ avatar +'" alt=""><div class="ChatBlock__FriendMessage"><p>'+ message +'</p></div></div>'
    }

    //Рандомное число 
    function randomValue(min, max){
        return Math.floor(Math.random() * (max - min) + min);
    }
    
    //Обработчик отправки сообщений
    function inputHandlers(){
        var $userMessageInput = $('.ChatBlock__UserMessageInput');
        var $userMessageButton = $('.ChatBlock__UserMessageButton');
        
        $userMessageInput.keypress(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                printMessage();
            }
        });
        $userMessageButton.on('click', printMessage);
    }

    //Отображение сообщения
    function printMessage(){
        var $massagrsContainer = $('.ChatBlock__Message');
        var $userMessageInput = $('.ChatBlock__UserMessageInput');
        var message = $userMessageInput.val();
        $userMessageInput.val('');
        if(message !==''){
            $massagrsContainer.prepend(CreateMessage(message, true));
            setTimeout(function() {
                var friendMessage = friendMessageColl[randomValue(0, friendMessageColl.length)];
                $massagrsContainer.prepend(CreateMessage(friendMessage, false));
            }, 1000);
        }
    }

    //Вызов функций
    RememberFriends();
    FilterFriend();
    FhooseFriend();
    inputHandlers();
});