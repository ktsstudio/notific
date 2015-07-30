Notific
==========

Простейший amd-модуль(пока) для показа уведомлений. Для работы требуется jQuery.

### Доступные методы

#### .config(params)

Позволяет настроить модуль.

```JavaScript
require(['notific'], function(Notific){
    Notific.config({

        // имена стилей генерируемой верстки
        // возможные поля: body, container, top, bottom, 
        // notification, default, error, success, warning, 
        // title, text, close
        css: {
            title: 'super-mega-title'
        },

        // ширина уведомления, можно в процентах от ширины экрана
        width: 360,

        // положение уведомлений
        // может принимать значения 'top', 'bottom'
        // по умолчанию 'bottom'
        position: 'bottom',

        // использовать дизайн bootstrap вместо обычного
        // для работы опции должна быть подключена css-ка bootstarap-а
        // по умолчанию false
        bootstrap: false
    });
});
```

#### .show(options)

Показывает уведомление

```JavaScript
require(['notific'], function(Notific){
    Notific.show({
        // по умолчанию 'Notification'
        title: 'Notification title',

        text: 'Notification message',

        // может принимать значения 'default', 'error', 'success', 'warning'
        // по умолчанию default
        type: 'default',

        // время автозакрытия уведомления. false для отмены автозакрытия
        // по умолчанию 5000
        timeout: false,

        // может принимать значения 'top', 'bottom'
        // по умолчанию 'bottom'
        // DEPRECATED
        position: 'bottom'
    });
});
```

#### .error(options)

Показывает уведомление об ошибке

```JavaScript
require(['notific'], function(Notific){
    Notific.error({
        title: 'Notification title',
        text: 'Notification message',
        timeout: 5000,
        position: 'bottom'
    });
});
```

#### .success(options)

Показывает уведомление об успешном действии.
```options``` идентичны опциям метода ```.error```

#### .warning(options)

Показывает предупреждение.
```options``` идентичны опциям метода ```.error```

#English
(coming soon)
