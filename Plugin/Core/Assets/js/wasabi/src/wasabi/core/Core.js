goog.provide('wasabi.core.Core');

goog.require('wasabi.core.BackendMenu');
goog.require('wasabi.core.Menus');
goog.require('wasabi.core.Languages');
goog.require('wasabi.core.Permissions');
goog.require('wasabi.core.Media');

window.wasabi.translations = window.wasabi.translations || {};

(function($, win, doc, translations) {

  /**
   * Core Constructor
   *
   * @constructor
   */
  var Core = function() {

    /**
     * Core events and their registered handlers.
     *
     * @type {Array}
     */
    this.events = [];

    /**
     * Holds a reference to the core BackendMenu instance.
     *
     * @type {null|wasabi.core.BackendMenu}
     */
    this.backendMenu = null;

    /**
     * Holds a reference to the core Menus instance.
     *
     * @type {null|wasabi.core.Menus}
     */
    this.menus = null;

    /**
     * Holds a reference to the core Languages instance.
     *
     * @type {null|wasabi.core.Languages}
     */
    this.languages = null;

    /**
     * Holds a reference to the core Permissions instance.
     *
     * @type {null|wasabi.core.Permissions}
     */
    this.permissions = null;

    /**
     * Holds a reference to the core Media instance.
     *
     * @type {null|wasabi.core.Media}
     */
    this.media = null;
  };

  /**
   * Core prototype
   *
   * @type {Function}
   */
  Core.prototype = (function() {

    /**
     * Translate a message with its context.
     *
     * @param {string} message
     * @param {Array=} context
     * @returns {string}
     * @private
     */
    function _translate(message, context) {
      message = translations[message] || message.toString();
      if (context) {
        $.each(context, function (key, value) {
          message = message.replace('{' + key + '}', value);
        });
      }
      return message;
    }

    /**
     * Render a flash message after a specific element.
     *
     * @param {string|jQuery} elAfter The element after which the message should be rendered.
     * @param {string}        cls     The css class of the flash message.
     * @param {string}        message The content of the flash message.
     * @private
     */
    function _flashMessage(elAfter, cls, message) {
      var $ancestor = $(elAfter);
      if ($ancestor.length) {
        $('#flashMessage').remove();
        var $flashMessage = $('<div id="flashMessage"></div>');
        $flashMessage.addClass(cls).html(message);
        $ancestor.after($flashMessage);
      }
    }

    /**
     * Setup default Ajax options.
     *
     * @private
     */
    function _setupAjax() {
      $.ajaxSetup({
        dataType: 'json'
      });
    }

    /**
     * Setup the spin presets.
     *
     * @private
     */
    function _setupSpin() {
      $.fn.spin.presets = {
        small:  { lines: 12, length: 0, width: 3, radius: 6 },
        medium: { lines: 9 , length: 4, width: 2, radius: 3 },
        large:  { lines: 11, length: 7, width: 2, radius: 5 }
      };
    }

    /**
     * Build all default core events.
     *
     * @private
     */
    function _buildEvents() {
      this.events = [
        [$(doc), {
          ajaxSuccess: _onAjaxSuccess,
          ajaxError: _onAjaxError
        }]
      ];
    }

    /**
     * Default ajax success handler.
     * display a flash message if the response contains
     * {
     *   'status': '...' # the class of the flash message
     *   'flashMessage': '...' # the text of the flash message
     * }
     *
     * @param event
     * @param xhr
     * @private
     */
    function _onAjaxSuccess(event, xhr) {
      if (xhr.status == 200 && xhr.statusText == 'OK') {
        var data = $.parseJSON(xhr.responseText) || {};
        if (typeof data.status !== 'undefined' && typeof data.flashMessage !== 'undefined') {
          _flashMessage('div.title-pad', data.status, data.flashMessage);
        }
      }
    }

    /**
     * Default ajax error handler.
     *
     * @param event
     * @param xhr
     * @private
     */
    function _onAjaxError(event, xhr) {
      var data;
      if (xhr.status == 401) {
        data = $.parseJSON(xhr.responseText) || {};
        if (typeof data.name !== 'undefined') {
          if (confirm(data.name)) {
            win.location.reload();
          } else {
            win.location.reload();
          }
        }
      }
      if (xhr.status == 500) {
        data = $.parseJSON(xhr.responseText) || {};
        if (typeof data.name !== 'undefined') {
          _flashMessage('div.title-pad', 'error', data.name);
        }
      }
    }

    /**
     * Initialize tabs.
     *
     * @private
     */
    function _initTabs() {
      $('.tabs').tabify();
      $('[data-tabify-tab]').each(function() {
        if ($(this).find('.form-row.error').length > 0) {
          var tabifyId = $(this).attr('data-tabify-id');
          var tab = $(this).attr('data-tabify-tab');
          $('[data-tabify-id="' + tabifyId + '"] > [data-tabify-target="' + tab + '"]').addClass('has-error');
        }
      });
    }

    /**
     * Initialize dropdown menus
     *
     * @private
     */
    function _initDropdowns() {
      $('[data-toggle="dropdown"]').dropdown();
    }

    /**
     * Initialize modal dialogs
     *
     * @private
     */
    function _initModals() {
      $('[data-toggle="modal"]').livequery(function() {
        $(this).modal();
      });
      $('[data-toggle="confirm"]').livequery(function() {
        $(this).modal();
      })
    }

    /**
     * Initialize sortable tables
     *
     * @private
     */
    function _initTableSortables() {
      $('.is-sortable')
        .tSortable({
          handle: 'a.sort',
          placeholder: 'sortable-placeholder',
          opacity: 0.8
        })
        .on('tSortable-change', function() {
          var i = 1;
          $(this).find('tbody > tr').each(function() {
            $(this).find('input[id*="Position"]').first().val(i);
            i++;
          });
        });
    }

    /**
     * Initialize jQuery MultiSelect on all
     * elements with class name 'mselect'.
     *
     * @private
     */
    function _initMultiSelect() {
      $('.mselect').multiSelect();
    }

    /**
     * Initialize jQuery ToggleSelect for all
     * bulk tables.
     *
     * @private
     */
    function _initToggleSelect() {
      $('[data-toggle="select"]').toggleSelect();
    }

    function _initBackendMenu() {
      this.backendMenu = new wasabi.core.BackendMenu('.main-nav', '.toggle-nav');
    }

    function _initMenus() {
      this.menus = new wasabi.core.Menus('#menu-items', '#MenuItemId', '#MenuItemMenuId', '#MenuItemParentId', '#MenuItemItem');
    }


    function _initLanguages() {
      this.languages = new wasabi.core.Languages('#languages');
    }

    function _initPermissions() {
      this.permissions = new wasabi.core.Permissions('.permissions');
    }

    function _initMedia() {
      this.media = new wasabi.core.Media();
    }

    return {

      /**
       * Constructor
       */
      constructor: Core,

      /**
       * Public wrapper for _translate.
       *
       * @param {string} message
       * @param {Array=} context
       * @returns {string}
       * @see _translate
       */
      translate: function(message, context) {
        return _translate(message, context);
      },

      /**
       * Public wrapper for _flashMessage.
       *
       * @param {string|jQuery} elAfter The element after which the message should be rendered.
       * @param {string}        cls     The css class of the flash message.
       * @param {string}        message The content of the flash message.
       * @see _flashMessage
       */
      flash: function(elAfter, cls, message) {
        _flashMessage(elAfter, cls, message);
      },

      /**
       * Core initialization function
       */
      init: function() {
        _setupAjax();
        _setupSpin();
        _buildEvents.call(this);
        $.attachEvents(this.events);

        _initTabs();
        _initDropdowns();
        _initModals();
        _initTableSortables();
        _initMultiSelect();
        _initToggleSelect();
        _initBackendMenu.call(this);
        _initMenus.call(this);
        _initLanguages.call(this);
        _initPermissions.call(this);
        _initMedia.call(this);
      }
    }

  })();

  wasabi.core.Core = Core;

  $(function() {
    wasabi.run = wasabi.run || {};
    wasabi.run.core = wasabi.run.core || new wasabi.core.Core();
    wasabi.run.core.init();
  });

})(jQuery, window, document, wasabi.translations);
