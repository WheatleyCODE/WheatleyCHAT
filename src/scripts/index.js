import $ from 'jquery';

$(document).ready(function(){

    //Глобальные переменные
    var userImg = 'images/UserAvatarMain.jpg';
    var friendImg = '';

    var friendMessageColl = [
        'Соре, помочь не могу, не знаю где он',
        'Но могу зачитать реп!',
        'Как хочешь, бро )',
        'Если б я был человеком, а не скриптом, я пообщался бы с тобой =)',
        'Заскриптованная фраза №5',
    ]

    //Функция запоминающая выбранного друга
    function RememberFriends() {
        var friendIdLocal = localStorage.getItem('SelectedFriend');
        if (friendIdLocal) {
            friendImg = $('#'+ friendIdLocal).addClass('FriendVisualOne').find('.ChatBlock_FriendAvatarImg').attr('src');
        } else {
            friendImg = $('.FriendVisual').eq(0).addClass('FriendVisualOne').find('.ChatBlock_FriendAvatarImg').attr('src');
        }
    }
    
    //Функция ищущая друзей
    function FilterFriend() {

        var $friendList = $('.ChatBlock__FriendsList');
        var $searchFriendInput = $('.ChatBlock__SearchFriend');

        $searchFriendInput.on('input',function(event){
        var value = event.target.value.toLowerCase();

            $friendList.find('.ChatBlock__FriendName').each(function() {
                var $this = $(this);
                var text = $this.text().toLocaleLowerCase();
                var $friendContainer = $this.closest('.FriendVisual');

                if(text.indexOf(value) !==-1) {
                    $friendContainer.show().addClass('visible');
                } else {
                    $friendContainer.hide().removeClass('visible');
                }
            });
        });
    };

    //Выбор друга
    function FhooseFriend() {
        $('.FriendVisual').on('click', ItemSelection);

        function ItemSelection() {
            $(this).addClass('FriendVisualOne');
            $(this).siblings().removeClass('FriendVisualOne');
            friendImg = $(this).find('.ChatBlock_FriendAvatarImg').attr('src');
            var friendId = this.id;
            localStorage.setItem('SelectedFriend',friendId);
            toggleActiveChat(friendId);
        };
    };

    function toggleActiveChat(id) {
        var $chatBlockMessage = $('.ChatBlock__Message');
        $chatBlockMessage.addClass('Close');

        var $currentChatBlock = $('.ChatBlock__Message[data-id="' + id + '"]');

        if($currentChatBlock.length > 0) {
            $currentChatBlock.removeClass('Close');
        } else {
            $('.ChatBlock__Communication').append(CreateNewChatBlockMessage(id));
        }
    }

    //Конструктор сообщений
    function CreateMessage (message, isUser) {
        var сlassName = isUser ? 'ChatBlock__MessagePullFriend UserMesage' : 'ChatBlock__MessagePullFriend';
        var avatar = isUser ? userImg : friendImg;
        return '<div class="'+ сlassName +'"><img class="ChatBlock__FriendImg" src="'+ avatar +'" alt=""><div class="ChatBlock__FriendMessage"><p>'+ message +'</p></div></div>';
    }
    function CreateNewChatBlockMessage (friendId) {
        return '<div class="ChatBlock__Message" data-id="'+ friendId+'"></div>';
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
            if (keycode == '13') {
                printMessage();
            }
        });
        $userMessageButton.on('click', printMessage);
    }

    //Отображение сообщения
    function printMessage() {
        var $massagrsContainer = $('.ChatBlock__Message');
        var $userMessageInput = $('.ChatBlock__UserMessageInput');
        var message = $userMessageInput.val();
        $userMessageInput.val('');
        if(message !=='') {
            $massagrsContainer.each(function(){
                if(!$(this).hasClass("Close")) {

                    var $this = $(this);
                    $this.prepend(CreateMessage(message, true));
                    
                    setTimeout(function() {
                    var friendMessage = friendMessageColl[randomValue(0, friendMessageColl.length)];
                    $this.prepend(CreateMessage(friendMessage, false));
                    }, 1000);
                } 
            });
        }
    }

    //Вызов функций
    RememberFriends();
    FilterFriend();
    FhooseFriend();
    inputHandlers();
});