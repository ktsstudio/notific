define(['jquery'], function ($) {
    'use strict';

    var notific = {
        _default: {
            title: 'Notification',
            text: '',
            type: 'default',
            timeout: 5000
        },
        _params: {
            css: {
                body:           'body',
                container:      'notific',
                top:            'notific_top',
                bottom:         'notific_bottom',

                notification:   'notific__alert',
                default:        'notific__alert_info',
                error:          'notific__alert_danger',
                success:        'notific__alert_success',
                warning:        'notific__alert_warning',

                title:          'notific__title',
                text:           'notific__text',
                close:          'notific__close'
            },
            width: 360,
            position: 'bottom',
            bootstrap: false
        },
        _types: {
            default: true,
            error: true,
            success: true,
            warning: true
        },
        _init: function () {
            if (this._params.bootstrap) {
                this._styleBootstrap();
            }

            var self = this,
                positionClass = this._params.css[this._params.position],
                $container = $('<div>', {'class': this._params.css.container });

            $container
                .addClass(positionClass)
                .css('width', this._params.width);

            $(this._params.css.body).append($container);

            $container.on('click', '.' + this._params.css.close, function () {
                var $notification = $(this).closest('.' + self._params.css.notification);
                self.close($notification);
            });

            return $container;
        },
        _verifyNotificationType: function (type) {
            if (!this._types.hasOwnProperty(type)) {
                return 'default';
            } else {
                return type;
            }
        },
        _scrollToBottom: function ($container) {
            $container.stop().animate({ scrollTop: $container.prop('scrollHeight')}, 300);
        },
        _styleBootstrap: function () {
            this.config({
                css: {
                    notification: 'alert',
                    default:      'alert-info',
                    error:        'alert-danger',
                    success:      'alert-success',
                    warning:      'alert-warning',
                    close:        'close'
                }
            });
        },
        config: function(params){
            $.extend(true, this._params, params);
        },
        show: function (opts) {
            var $container = $('.' + this._params.css.container);
            if ($container.length === 0) {

                //Для обратной совместимости с версией 0.1.0
                if (opts.hasOwnProperty('position')) {
                    this._params.position = opts.position;
                }

                $container = this._init();
            }

            var options = {};
            $.extend(options, this._default, opts);

            options.type = this._verifyNotificationType(options.type);

            var $notification = $(
                '<div class="' + this._params.css.notification + ' ' + this._params.css[options.type] + '">' +
                    '<button type="button" class="' + this._params.css.close + '">&times;</button>' +
                    '<h4 class="' + this._params.css.title + '">' + options.title + '</h4>' +
                    '<p class="' + this._params.css.text + '">' + options.text + '</p>' +
                '</div>'
            );

            $container.append($notification);
            this._scrollToBottom($container);

            if (options.timeout) {
                var self = this;
                setTimeout(function () {
                    self.close($notification);
                }, options.timeout);
            }

            return $notification;
        },
        error: function (opts) {
            return this.show($.extend(opts, {type: 'error'}));
        },
        success: function (opts) {
            return this.show($.extend(opts, {type: 'success'}));
        },
        warning: function (opts) {
            return this.show($.extend(opts, {type: 'warning'}));
        },
        close: function ($notification) {
            $notification.remove();
        }
    };

    return notific;
});
