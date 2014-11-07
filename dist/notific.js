/*! 
* notific - v0.1.0 - 2014-11-07
* https://github.com/gbiryukov/notific
* Copyright (c) 2014 George Biryukov
* Licensed MIT 
*/

define(['jquery'], function ($) {
    'use strict';

    var notific = {
        _default: {
            title: 'Notification',
            text: '',
            type: 'default',
            timeout: false,
            position: 'bottom'
        },
        _params: {
            body: 'body',
            container: 'notific',
            notification: 'notific__alert',
            title: 'notific__title',
            text: 'notific__text',
            close: 'notific__close'
        },
        _types: {
            default: 'notific__alert_info',
            error: 'notific__alert_danger',
            success: 'notific__alert_success',
            warning: 'notific__alert_warning'
        },
        _init: function () {
            var self = this,
                $container = $('<div>', {'class': this._params.container });

            $(this._params.body).append($container);

            $container.on('click', '.' + this._params.close, function () {
                var $notification = $(this).closest('.' + self._params.notification);
                self.close($notification);
            });

            return $container;
        },
        _verifyNotificationType: function (type) {
            if (typeof(this._types[type]) === 'undefined') {
                return 'default';
            } else {
                return type;
            }
        },
        _scrollToBottom: function ($container) {
            $container.stop().animate({ scrollTop: $container.prop('scrollHeight')}, 300);
        },
        /*
        _styleBootstrap: function ($notification) {
            if ($notification.css('border-width') === '0px') {
                $notification.addClass('notific__alert_with-shadow');
            }
        },
         */
        show: function (opts) {
            var $container = $('.' + this._params.container);
            if ($container.length === 0) {
                $container = this._init();
            }

            var options = {};
            $.extend(options, this._default, opts);

            options.type = this._verifyNotificationType(options.type);

            var $notification = $(
                '<div class="' + this._params.notification + ' ' + this._types[options.type] + '">' +
                    '<button type="button" class="' + this._params.close + '">&times;</button>' +
                    '<h4 class="' + this._params.title + '">' + options.title + '</h4>' +
                    '<p class="' + this._params.text + '">' + options.text + '</p>' +
                '</div>'
            );

            $container.append($notification);
            //this._styleBootstrap($notification);
            this._scrollToBottom($container);

            //todo плохо, отрефакторить, ибо изначально в архитектуре этого нет
            if (options.position === 'top') {
                $container.removeClass('notific_bottom');
                $container.addClass('notific_top');
            } else {
                $container.removeClass('notific_top');
                $container.addClass('notific_bottom');
            }

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
