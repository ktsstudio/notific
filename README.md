Notific
==========

Простейший amd-модуль(пока) для показа уведомлений. Для работы требуется jQuery.

### Доступные методы

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
        timeout: 5000,

        // может принимать значения 'top', 'bottom'
        // по умолчанию 'bottom'
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
