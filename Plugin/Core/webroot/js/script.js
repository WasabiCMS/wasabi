(function($) {
  "use strict";

  var LightModal = function(element, options) {
    var that = this;

    this.source = $(element);
    this.settings = $.extend({}, $.fn.lightModal.defaults, options);

    this.source.click(function(event) {
      event.preventDefault();
      that.initModal();
    });

    /**
     * Initialize a new overlay
     * takes a callback function that is executed when the overlay fadein is complete
     */
    this.initOverlay = function(callback) {
      this.overlay = $('<div id="lightmodal_overlay"></div>');
      this.overlay.css({
        'opacity': this.settings.opacity,
        'zIndex': 10000
      });
      this.overlay.click(function() {
        that.closeModal();
      });
      $('body').append(this.overlay);
      this.overlay.fadeIn(300, callback);
    };

    /**
     * Initialize the modal dialog
     */
    this.initModal = function() {
      that.initOverlay(function() {
        that.modalBody = $('<div id="lightmodal_body"></div>');
        that.modalCloseButton = $('<a href="#" class="lightmodal-close"></a>');
        that.modalContainer = $('<div id="lightmodal_container"></div>');
        that.modalContent = $('<div id="lightmodal_content"></div>');
        that.modalHeader = $('<div id="lightmodal_header"></div>');

        that.initModalHeader();

        if (that.settings.type == 'confirm') {
          var action = that.source.attr('data-confirm-action') || false;
          var confirmMessage = that.source.attr('data-confirm-message') || false;
          if (confirmMessage !== false) {
            that.modalBody.append($('<p></p>').html(confirmMessage));
          }
          if (action !== false) {
            var form = $('<form></form>').attr('accept-charset', 'utf-8').attr('method', 'post').attr('action', action).attr('id', 'confirm-form');
            var submitButton = $('<button type="submit"></button>').addClass('lightmodal-confirm button green primary').html($.translateEntity('Yes'));
            var cancelLink = $('<a></a>').attr('href', '#').addClass('lightmodal-close button danger').html($.translateEntity('No'));
            var confirmBar = $('<div id="lightmodal_confirm_bar"></div>');

            confirmBar.append(form.append(submitButton).append(cancelLink));

            that.modalBody.append(confirmBar);
            that.modalBody.find('.lightmodal-confirm').click(function(event) {
              event.preventDefault();
              if ($(this).attr('data-disabled') != 'true') {
                $(this).attr('data-disabled', 'true');
                $('#confirm-form').submit();
              }
            });
          }
        }

        that.modalContent.append(that.modalBody);
        that.modalContainer.append(that.modalContent);

        that.modalContainer.find('.lightmodal-close').click(function(event) {
          event.preventDefault();
          that.closeModal();
        });

        that.modalContainer.css({
          'display': 'block',
          'opacity': 0,
          'zIndex': 10001,
          'width': that.settings.width
        });
        $('body').append(that.modalContainer);

        that.adjustModalPosition();

        that.modalContainer.css({
          'display': 'none',
          'opacity': 1
        });
        that.modalContainer.fadeIn(300);
      });
    };

    this.initModalHeader = function() {
      var modalTitle = that.source.attr('data-modal-title') || false;
      var modalSubTitle = that.source.attr('data-modal-subtitle') || false;

      if (that.settings.type == 'confirm') {
        modalTitle = that.source.attr('data-confirm-title') || false;
        modalSubTitle = that.source.attr('data-confirm-subtitle') || false;
      }

      if (modalTitle !== false) {
        that.modalHeader.append($('<h2></h2>').html(modalTitle));
      }

      if (modalSubTitle !== false) {
        that.modalHeader.append($('<p></p>').html(modalSubTitle));
      }

      if (modalTitle !== false || modalSubTitle !== false) {
        if (that.settings.showCloseButton === true) {
          that.modalHeader.append(that.modalCloseButton);
        }
        that.modalContent.append(that.modalHeader);
      }
    };

    this.adjustModalPosition = function() {
      if (that.settings.verticalPosition === 'center') {
        that.modalContainer.css({
          'top': '50%',
          'marginTop': -that.modalContainer.outerHeight() / 2 + 'px'
        });
      } else {
        that.modalContainer.css({
          'top': that.settings.verticalPosition + 'px'
        });
      }

      that.modalContainer.css({
        'position': 'fixed',
        'left': '50%',
        'marginLeft': -that.modalContainer.outerWidth() / 2 + 'px'
      });
    };

    /**
     * Close the modal dialog
     */
    this.closeModal = function() {
      // hide modal container
      this.modalContainer.fadeOut(200, function() {
        // destroy modal container
        that.modalContainer.remove();
      });
      // hide overlay
      this.overlay.fadeOut(200, function() {
        // remove overlay from DOM
        that.overlay.remove();
      });
      console.log('close triggered');
    };

    return this;
  };

  $.fn.lightModal = function(options) {
    return this.each(function(key, value) {
      if (!$(this).data('lightModal')) {
        $(this).data('lightModal', new LightModal(this, options));
      }
      return $(this).data('lightModal');
    });
  };

  $.fn.lightModal.defaults = {
    width: 400,
    horizontalPosition: 'center',
    verticalPosition: 200,
    content: 'Default Modal Content',
    opacity: 0.5,
    showCloseButton: true,
    type: 'confirm'
  };

})(jQuery);

(function($) {

  var Tabify = function(element, options) {

    var that = this;
    var $wrapper = $(element);
    var $tabs = $wrapper.find('div[data-tab]');
    var settings = $.extend({}, $.fn.tabify.defaults, options);
    var $li = $wrapper.find(settings.tabSelector).find('li');
    var $a = $li.find('a');

    if ($a.length) {
      $a.click(function(event) {
        event.preventDefault();
        var li_tab = $(this).parent().attr('data-tab');
        $li.removeClass('active');
        $tabs.removeClass('active').hide();
        $tabs.filter('[data-tab="'+li_tab+'"]').addClass('active').show();
        $(this).parent().addClass('active');
      });
    } else {
      $li.click(function(event) {
        event.preventDefault();
        var li_tab = $(this).attr('data-tab');
        $li.removeClass('active');
        $tabs.removeClass('active').hide();
        $tabs.filter('[data-tab="'+li_tab+'"]').addClass('active').show();
        $(this).addClass('active');
      });
    }

    return this;

  };

  $.fn.tabify = function(options) {
    return this.each(function() {
      return new Tabify($(this), options);
    });
  };

  $.fn.tabify.defaults = {
    tabSelector: 'ul.tab-tabs'
  };

})(jQuery);

(function(factory) {

  if (typeof exports == 'object') {
    // CommonJS
    factory(require('jquery'), require('spin'))
  }
  else if (typeof define == 'function' && define.amd) {
    // AMD, register as anonymous module
    define(['jquery', 'spin'], factory)
  }
  else {
    // Browser globals
    if (!window.Spinner) throw new Error('Spin.js not present');
    factory(window.jQuery, window.Spinner)
  }

}(function($, Spinner) {

  $.fn.spin = function(opts, color) {

    return this.each(function() {
      var $this = $(this),
        data = $this.data();

      if (data.spinner) {
        data.spinner.stop();
        delete data.spinner;
      }
      if (opts !== false) {
        opts = $.extend(
          { color: color || $this.css('color') },
          $.fn.spin.presets[opts] || opts
        );
        data.spinner = new Spinner(opts).spin(this)
      }
    })
  };

  $.fn.spin.presets = {
//    tiny: { lines: 8, length: 2, width: 2, radius: 3 },
//    small: { lines: 8, length: 4, width: 3, radius: 5 },
//    large: { lines: 10, length: 8, width: 4, radius: 8 }
    "small": { lines: 12, length: 0, width: 3, radius: 6 },
    "medium": { lines: 9, length: 4, width: 2, radius: 3 },
    "large": { lines: 11, length: 7, width: 2, radius: 5 }
  };

}));

$(function() {

  $('.main-nav > li').each(function() {
    if ($(this).find('ul').length) {
      $(this).find('> a').click(function() {
        $(this).parent().toggleClass('open');
      });
    }
  });

  $('.user-menu').hover(function() {
    $(this).addClass('hover');
    $(this).find('ul').show();
  }, function() {
    $(this).find('ul').hide();
    $(this).removeClass('hover');
  });

  $('a.confirm').lightModal({
    content: 'blub',
    type: 'confirm'
  });

  $('.list:not(.permissions) tbody')
    .on('mouseover', 'tr', function() {
      $(this).addClass('hover');
    })
    .on('mouseout', 'tr', function() {
      $(this).removeClass('hover');
    });

  $('#languages').sortable({
    handle: 'a.sort',
    items: 'tbody tr',
    placeholder: 'sortable-placeholder',
    forcePlaceholderSize: true,
    opacity: 0.8,
    helper: function(e, tr) {
      var originals = tr.children();
      var helper = tr.clone();
      helper.children().each(function(index) {
        $(this).width(originals.eq(index).outerWidth());
      });
      return helper;
    },
    start: function(event, ui) {
      var colspan = $(event.target).find('thead tr').find('th').length;
      ui.placeholder.html('<td colspan="' + colspan + '"></td>');
    },
    stop: function(event, ui) {
      var i = 1;
      $(this).find('tbody tr').each(function(index) {
        $(this).find('input.position').first().val(i);
        i++;
      });
      var form = $('#LanguageIndexForm');
      $.ajax({
        url: form.attr('action'),
        data: form.serialize(),
        type: 'post'
      });
    }
  });

  $('.is-sortable').sortable({
    handle: 'a.sort',
    items: 'tbody tr',
    placeholder: 'sortable-placeholder',
    forcePlaceholderSize: true,
    opacity: 0.8,
    helper: function(e, tr) {
      var originals = tr.children();
      var helper = tr.clone();
      helper.children().each(function(index) {
        $(this).width(originals.eq(index).outerWidth());
      });
      return helper;
    },
    start: function(event, ui) {
      var colspan = $(event.target).find('thead tr').first().find('th').length;
      ui.placeholder.html('<td colspan="' + colspan + '"></td>');
    },
    stop: function(event, ui) {
      var i = 1;
      $(this).find('tbody tr').each(function(index) {
        $(this).find('input[id*="Position"]').first().val(i);
        i++;
      });
    }
  });

  $('#menu-items').on('change', '.menu-item-select', function(event) {
    var val = $(this).val();
    var parts = val.split('|');
    var $td = $(this).parent().parent();
    var _i, _len, url;

    function parseUrlString(urlString) {
      var url = {
        plugin: '',
        controller: '',
        action: '',
        params: [],
        query: ''
      };

      var parts = urlString.split('?');
      urlString = parts[0];

      if (parts[1] !== undefined) {
        url.query = parts[1];
      }

      parts = urlString.split('/');

      for (_i = 0, _len = parts.length; _i < _len; _i++) {

        if (_i === 0) {
          var plugin = parts[_i].split('plugin:')[1];
          if (plugin !== undefined) {
            url.plugin = plugin;
            continue;
          }
        }

        if ((_i === 0 || _i === 1) && url.controller === '') {
          var controller = parts[_i].split('controller:')[1];
          if (controller !== undefined) {
            url.controller = controller;
            continue;
          }
        }

        if ((_i ===1 || _i === 2) && url.action === '') {
          var action = parts[_i].split('action:')[1];
          if (action !== undefined) {
            url.action = action;
            continue;
          }
        }

        url.params.push(parts[_i]);
      }

      if (url.params.length > 0) {
        url.params = url.params.join('/');
      } else {
        url.params = '';
      }

      return url;
    }

    $td.find('input[name*="type"]').val(parts[0]);

    var $active_div = $td.find('div.active');
    $active_div.removeClass('active').find('input').prop('disabled', true);

    var $div = $td.find('div[data-type="' + parts[0] + '"]');
    $div.find('input').removeAttr('disabled');
    $div.addClass('active');

    if (parts[0] === 'Object' || parts[0] === 'Action') {
      $div = $td.find('div[data-type="' + parts[0] + '"]');
      url = {};

      if (parts[0] === 'Object') {
        url = parseUrlString(parts[3]);
        $div.find('input[name*="foreign_model"]').first().val(parts[1]);
        $div.find('input[name*="foreign_id"]').first().val(parts[2]);
      }

      if (parts[0] === 'Action') {
        url = parseUrlString(parts[1]);
      }

      $div.find('input[name*="plugin"]').first().val(url.plugin);
      $div.find('input[name*="controller"]').first().val(url.controller);
      $div.find('input[name*="action"]').first().val(url.action);
      $div.find('input[name*="params"]').first().val(url.params);
      $div.find('input[name*="query"]').first().val(url.query);
    }

    console.log($(this).val());
  });

  $('a.add-item').click(function(event) {
    event.preventDefault();
    var tr = $(this).parent().parent().find('table tr.new');
    var str = tr.html();
    var time = new Date().getTime().toString();
    str = str.split('{UID}').join(time);
    tr.clone().html(str).removeClass('new').appendTo(tr.parent());
    var table = $(this).parent().parent().find('table').first();
    var i = 1;
    table.find('tbody tr').each(function(index) {
      if ($(this).hasClass('new')) {
        return true;
      }
      $(this).find('input[id*="Position"]').first().val(i);
      i++;
    });
  });

  $('.list').on('click', 'a.remove-item', function(event) {
    event.preventDefault();
    var tr = $(this).parent().parent();
    var deleteInput = tr.find('input[id*="Delete"]');
    if (deleteInput.length) {
      deleteInput.first().val(1);
      tr.hide();
    } else {
      tr.hide(0, function() {
        $(this).remove();
      });
    }
    var i = 1;
    tr.parent().parent().find('tbody tr').each(function(index) {
      $(this).find('input[id*="Position"]').first().val(i);
      i++;
    });
  });

  $('.permissions .single-submit').click(function(event) {
    event.preventDefault();
    var that = $(this);
    that.hide();
    that.blur();
    that.parent().spin('small');
    $.ajax({
      type: 'POST',
      url: $('#GroupPermissionIndexForm').attr('action'),
      data: $(this).parent().parent().find('input').serialize(),
      cache: false,
      success: function() {
        var tr = that.parent().parent();
        var bgColor = that.parent().css('backgroundColor');
        that.parent().spin(false);
        that.show();
        tr.find('td:not(.controller)').stop().css({
          backgroundColor: '#fff7d9'
        }).animate({
            backgroundColor: bgColor
          }, 1000, function() {
            $(this).css({backgroundColor: ''});
          });
      }
    })
  });

  $('.tab-wrapper').tabify();

  /**
   * Default Ajax options
   */
  $.ajaxSetup({
    dataType: 'json'
  });

  /**
   * Default ajaxSuccess handler
   * display a flash message if the response contains
   * {
   *   'status': '...' # the class of the flash message
   *   'flashMessage': '...' # the text of the flash message
   * }
   */
  $(document).ajaxSuccess(function(event, xhr, settings) {
    if (xhr.status == 200 && xhr.statusText == 'OK') {
      var data = $.parseJSON(xhr.responseText) || {};
      if (data.status !== undefined && data.flashMessage !== undefined) {
        $.flashMessage('ul.sub-menu', data.status, data.flashMessage);
      }
    }
  });

  /**
   * Default ajaxError handler
   */
  $(document).ajaxError(function(event, xhr, settings) {
    if (xhr.status == 500) {
      var data = $.parseJSON(xhr.responseText) || {};
      if (data.name !== undefined) {
        $.flashMessage('ul.sub-menu', 'error', data.name);
      }
    }
  });

});

(function($) {

  $.extend({

    translateEntity: function(entity) {
      if (wasabiTranslations[entity] !== undefined) {
        return wasabiTranslations[entity];
      } else {
        return entity;
      }
    },

    /**
     * Render a flash message
     *
     * @param elAfter The element after which the message should be rendered.
     * @param cls The css class of the flash message.
     * @param message The content of the flash message.
     */
    flashMessage: function(elAfter, cls, message) {
      var ancestor = $(elAfter);
      if (ancestor.length) {
        $('#flashMessage').remove();
        var flashMessage = $('<div id="flashMessage"></div>');
        flashMessage.addClass(cls).html(message);
        ancestor.after(flashMessage);
      }
    }

  });

})(jQuery);