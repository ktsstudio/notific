
'use strict';

require.config({
	baseUrl: 'js/lib'
});

require(['jquery', 'notific'], function($, Notific){
    $(document).ready(function($){

        //Notific.config({bootstrap:true});

        $('.btn-primary').click(function(){
            Notific.show({
                title: 'Привет',
                text: 'Это стандартное уведомление'
            });
        });

        $('.btn-danger').click(function(){
            Notific.error({
                title: 'Алло!',
                text: 'Ошибочка вышла'
            });
        });

        $('.btn-success').click(function(){
            Notific.success({
                title: 'Та-да!',
                text: 'Полный успех'
            });
        });

        $('.btn-warning').click(function(){
            Notific.warning({
                title: 'Аларм',
                text: 'Что-то не так'
            });
        });
    });
});
