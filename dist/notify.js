/*! 
* notify - v1.0.0 - 2014-10-24
* https://github.com/gbiryukov/notify-amd
* Copyright (c) 2014 George Biryukov
* Licensed MIT 
*/

define(['jquery'], function ($) {
    'use strict';

    var notify = {
        _default: {
            title: 'Notification',
            text: '',
            type: 'default',
            timeout: 5000,
            position: 'bottom'
        },
        _params: {
            body: 'body',
            container: 'notify',
            notification: 'notify__alert',
            title: 'notify__title',
            text: 'notify__text'
        },
        _types: {
            default: 'notify__alert_info',
            error: 'notify__alert_danger',
            success: 'notify__alert_success',
            warning: 'notify__alert_warning'
        },
        _init: function () {
            var self = this,
                $container = $('<div>', {'class': this._params.container });

            $(this._params.body).append($container);

            $container.on('click', '.notify__close', function () {
                var $notification = $(this).closest('.' + self._params.notification);
                self.close($notification);
            });

            return $container;
        },
        _verifyNotificationType: function (options) {
            if (typeof(this._types[options.type]) === 'undefined') {
                return 'default';
            } else {
                return options.type;
            }
        },
        _scrollToBottom: function ($container) {
            $container.stop().animate({ scrollTop: $container.prop('scrollHeight')}, 300);
        },
        _styleBootstrap: function ($notification) {
            if ($notification.css('border-width') === '0px') {
                $notification.addClass('notify__alert_with-shadow');
            }
        },
        that: function (opts) {
            var $container = $('.' + this._params.container);
            if ($container.length === 0) {
                $container = this._init();
            }

            var options = {};
            $.extend(options, this._default, opts);

            options.type = this._verifyNotificationType(options);

            var $notification = $(
                '<div class="' + this._params.notification + ' ' + this._types[options.type] + '">' +
                    '<button type="button" class="notify__close">&times;</button>' +
                    '<h4 class="' + this._params.title + '">' + options.title + '</h4>' +
                    '<p class="' + this._params.text + '">' + options.text + '</p>' +
                    '</div>'
            );

            $container.append($notification);
            this._styleBootstrap($notification);
            this._scrollToBottom($container);

            //todo плохо, отрефакторить, ибо изначально в архитектуре этого нет
            if (options.position === 'top') {
                $container.removeClass('notify_bottom');
                $container.addClass('notify_top');
            } else {
                $container.removeClass('notify_top');
                $container.addClass('notify_bottom');
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
            return this.that($.extend(opts, {type: 'error'}));
        },

        success: function (opts) {
            return this.that($.extend(opts, {type: 'success'}));
        },

        warning: function (opts) {
            return this.that($.extend(opts, {type: 'warning'}));
        },

        close: function ($notification) {
            $notification.remove();
        }
    };

    return notify;
});
