/*!
 * jQuery MultiSelect v0.9.8
 *
 * Copyright (c) 2012 Louis Cuny
 * Licensed under the Do What The Fuck You Want * To Public License
 */

!function(s){var t=function(t,a){this.settings=s.extend({},s.fn.multiSelect.defaults,a),this.$el=s(t),this.$container=s("<div/>",{"class":"ms-container row"}),this.$available=s("<ul/>",{"class":"ms-list",tabindex:"-1"}),this.$selection=null,this.init()};t.prototype=function(){function a(){var t=this;this.$el.css({position:"absolute",left:"-9999px"}),this.$el.find("option").each(function(a,i){e.call(t,s(i))}),this.$selection=this.$available.clone(),this.$selection.addClass("ms-selection").attr("unselectable","on").css("user-select","none").on("selectstart",!1),this.$available.addClass("ms-available").attr("unselectable","on").css("user-select","none").on("selectstart",!1),this.$el.find("option[selected]").each(function(a,e){var l=t.$available.find('.ms-item[data-value="'+s(e).attr("value")+'"]');i.call(t,l,!0)}),c.call(this),this.$el.attr("disabled")?this.$container.addClass("disabled"):s.attachEvents(this._primaryEvents),this.$container.append(this.$available).append(this.$selection),this.$el.after(this.$container)}function e(t){var a=s("<li/>",{"class":"ms-item"}).attr("data-value",t.attr("value")).text(t.attr("value")),e=t.parent("optgroup");if(t.attr("disabled")&&a.addClass(this.settings.disabledClass),0!==e.length){var i=e.attr("label"),l=this.$available.find('li[data-optgrp="'+i+'"]');if(0===l.length){var n=s("<li/>",{"class":"ms-optgrp"}).attr("data-optgrp",i).append(s("<span/>").text(i)).append(s("<ul/>"));this.$available.append(n),l=this.$available.find('li[data-optgrp="'+i+'"]')}l.find("> ul").append(a)}else this.$available.append(a)}function i(s,t){var a=s.attr("data-value"),e=this.$available.find('li[data-value="'+a+'"]').addClass("active");n.call(this,e);var i=this.$selection.find('li[data-value="'+a+'"]').addClass("active");o.call(this,i),t||this.$el.find('option[value="'+a+'"]').prop("selected",!0)}function l(s){var t=s.attr("data-value"),a=this.$available.find('li[data-value="'+t+'"]').removeClass("active");n.call(this,a);var e=this.$selection.find('li[data-value="'+t+'"]').removeClass("active");o.call(this,e),this.$el.find('option[value="'+t+'"]').prop("selected",!1)}function n(s){var t=s.parent().parent(".ms-optgrp");1===t.length&&(0===t.find("> ul li:not(.active)").length?t.addClass("all-active"):t.removeClass("all-active"))}function o(s){var t=s.parent().parent(".ms-optgrp");1===t.length&&(t.find("> ul li.active").length>0?t.addClass("active"):t.removeClass("active"))}function c(){this._primaryEvents=[[this.$el,{focus:s.proxy(h,this),blur:s.proxy(r,this),keydown:s.proxy(f,this)}],[this.$container,".ms-item:not(."+this.settings.disabledClass+")",[["mouseenter",s.proxy(d,this)],["mouseleave",s.proxy(v,this)],["click",s.proxy(u,this)]]]]}function h(){this.$available.hasClass("ms-focus")||this.$selection.hasClass("ms-focus")||this.$available.addClass("ms-focus"),this.disableTimeout=!1}function r(){if(this.disableTimeout)this.$available.removeClass("ms-focus"),this.$selection.removeClass("ms-focus");else{var s=this;setTimeout(function(){s.$el.is(":focus")||(s.$available.removeClass("ms-focus"),s.$selection.removeClass("ms-focus"))},100)}}function d(t){var a=s(t.target);a.parents().is(this.$available)?this.$available.find(".ms-item").removeClass("hover"):this.$selection.find(".ms-item").removeClass("hover"),a.addClass("hover")}function v(t){var a=s(t.target);a.removeClass("hover")}function u(t){var a=s(t.target);a.parents().is(this.$selection)?(this.$selection.addClass("ms-focus"),this.$available.removeClass("ms-focus")):(this.$available.addClass("ms-focus"),this.$selection.removeClass("ms-focus")),this.$el.focus(),a.hasClass("active")?l.call(this,a):i.call(this,a)}function f(s){switch(s.which){case 40:case 38:s.preventDefault(),s.stopPropagation(),m.call(this,38===s.which?1:-1);break;case 32:s.preventDefault(),s.stopPropagation();var t;t=this.$available.hasClass("ms-focus")?this.$available.find(".ms-item.hover").first():this.$selection.find(".ms-item.hover").first(),t.removeClass("hover"),t.hasClass("active")?l.call(this,t):i.call(this,t);break;case 37:case 39:s.preventDefault(),s.stopPropagation(),this.$available.hasClass("ms-focus")&&39===s.which?(this.$available.removeClass("ms-focus"),this.$selection.addClass("ms-focus")):this.$selection.hasClass("ms-focus")&&37===s.which&&(this.$selection.removeClass("ms-focus"),this.$available.addClass("ms-focus"));break;case 9:this.disableTimeout=!0}}function m(t){var a,e,i,l,n;if(this.$available.hasClass("ms-focus")?(n=this.$available,a=n.find(".ms-item.hover"),e=n.find(".ms-item:not(.active):not(."+this.settings.disabledClass+")")):(n=this.$selection,a=n.find(".ms-item.hover"),e=n.find(".ms-item.active:not(."+this.settings.disabledClass+")")),e.removeClass("hover"),-1===t?a.length>0?(l=e.index(a)+1,l>e.length-1&&(l=0)):l=0:a.length>0?(l=e.index(a)-1,0>l&&(l=e.length-1)):l=e.length-1,i=s(e.get(l)),i.length>0){i.addClass("hover");var o=n.scrollTop()+i.position().top-(n.height()+i.outerHeight())/2;n.scrollTop(o)}}return{constructor:t,init:function(){a.call(this)},selectAll:function(){var t=this;this.$available.find(".ms-item:not(.active):not(."+this.settings.disabledClass+")").each(function(a,e){i.call(t,s(e))})},deselectAll:function(){var t=this;this.$available.find(".ms-item.active:not(."+this.settings.disabledClass+")").each(function(a,e){l.call(t,s(e))})},enable:function(){return this.$el.attr("disabled")&&(this.$el.prop("disabled",!1),s.attachEvents(this._primaryEvents),this.$container.removeClass("disabled")),this.$el},disable:function(){return this.$el.attr("disabled")||(s.detachEvents(this._primaryEvents),this.$el.attr("disabled","disabled"),this.$container.addClass("disabled")),this.$el}}}(),s.fn.multiSelect=function(a){if(!a||"object"==typeof a)return this.each(function(){s(this).data("multiSelect")||s(this).data("multiSelect",new t(this,a))});if("string"==typeof a&&"_"!==a.charAt(0)){var e=this.data("multiSelect");if(!e)throw new Error("multiSelect is not initialized on this DOM element.");if(e&&e[a])return e[a].apply(e,Array.prototype.slice.apply(arguments,[1]))}throw new Error('"'+a+'" is no valid api method.')},s.fn.multiSelect.defaults={disabledClass:"disabled"}}(window.jQuery);