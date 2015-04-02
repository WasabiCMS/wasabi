/*!
 * jQuery Table Sortable v0.0.1
 *
 * Copyright (c) 2013 Frank Förster (http://frankfoerster.com)
 * Licensed under the MIT License
 */

!function(t,s,e){var i=function(s,e){if(this.$el=t(s),this.settings=t.extend({},t.fn.tSortable.defaults,e),this.isDragging=!1,this.$tr=null,this.$clone=null,this.$placeholder=null,this.startPosition={},this.trOffset={},this.placeholderHeight=null,this.$scrollParent=null,this._primaryEvents=[],this._secondaryEvents=[],!this.$el.is("table"))throw new Error("DOM element is not supported. Use table!");this._buildEvents(),t.attachEvents(this._primaryEvents)};i.prototype={_buildEvents:function(){this._primaryEvents=[[this.$el,this.settings.items+" "+this.settings.handle,[["mousedown",t.proxy(this._onMouseDown,this)]]]],this._secondaryEvents=[[t(s),{mousemove:t.proxy(this._onMouseMove,this),mouseup:t.proxy(this._onMouseUp,this)}]]},_onMouseDown:function(s){s.preventDefault(),this._initStart(s),t.attachEvents(this._secondaryEvents)},_onMouseUp:function(s){function e(){i.$clone.remove(),i.$clone=null,i.$tr.insertBefore(i.$placeholder),i.$placeholder.remove(),i.$placeholder=null,i.$tr.show(),i.$tr=null,i.$scrollParent=null,i.isDragging=!1,i._trigger("tSortable-change",s)}var i=this;if(t.detachEvents(this._secondaryEvents),this.isDragging)if(this.settings.animateTarget){var o=this.$placeholder.offset();this.$clone.animate({top:o.top,left:o.left},parseInt(this.settings.animationLength),e)}else e()},_onMouseMove:function(s){this.isDragging||(this._initClone(),this._initPlaceholder(),this.$tr.hide(),this.$scrollParent=this.$clone.scrollParent(),this.isDragging=!0),this._updateClonePosition(s),this.settings.scroll===!0&&this._scroll(s),function(e){if(!e._yIntersectsPlaceholder(s)){var i=e.$el.find(e.settings.items).filter(function(){return t(this)[0]!==e.$tr[0]&&"none"!==t(this).css("display")&&"absolute"!==t(this).css("position")&&!t(this).hasClass(e.settings.placeholder)}),o=null,l=null;if(i.each(function(){var e=t(this).position().top,i=e+t(this).outerHeight(),n=parseInt((e+i)/2);return s.pageY>=e&&s.pageY<n?(o=t(this),void(l="up")):s.pageY>n&&s.pageY<=i?(o=t(this),void(l="down")):void 0}),null!==o){if("up"===l){if(o.prev().hasClass(e.settings.placeholder))return;return void e.$placeholder.insertBefore(o)}if("down"===l){if("none"===o.next().css("display")&&o.next().next().hasClass(e.settings.placeholder))return;e.$placeholder.insertAfter(o)}}}}(this)},_initStart:function(s){this.$tr=t(s.target).closest("tr"),this.startPosition={x:s.pageX,y:s.pageY};var e=this.$tr.offset();this.trOffset={x:this.startPosition.x-e.left,y:this.startPosition.y-e.top}},_initClone:function(){this.$clone=this.$tr.clone(),this.$clone.css({width:this.$tr.outerWidth(),height:this.$tr.outerHeight(),position:"absolute",zIndex:1e4,opacity:this.settings.opacity});var s=this.$tr.find("> td");this.$clone.find("> td").each(function(e){t(this).css("width",s.eq(e).outerWidth())}),this.$el.find("tbody").append(this.$clone)},_initPlaceholder:function(){this.placeholderHeight=this.$clone.outerHeight(),this.$placeholder=t('<tr><td colspan="'+this.$clone.find("td").length+'">&nbsp;</td></tr>'),this.$placeholder.addClass(this.settings.placeholder).find("> td").first().css({height:this.placeholderHeight}),this.$tr.after(this.$placeholder)},_updateClonePosition:function(t){this.$clone.css({left:t.pageX-this.trOffset.x,top:t.pageY-this.trOffset.y})},_scroll:function(i){var o=this.$scrollParent[0],l=this.$scrollParent.offset();if(o!=s&&"HTML"!=o.tagName)l.top+o.offsetHeight-i.pageY<this.settings.scrollSensitivity?o.scrollTop=o.scrollTop+this.settings.scrollSpeed:i.pageY-l.top<this.settings.scrollSensitivity&&(o.scrollTop=o.scrollTop-this.settings.scrollSpeed),l.left+o.offsetWidth-i.pageX<this.settings.scrollSensitivity?o.scrollLeft=o.scrollLeft+this.settings.scrollSpeed:i.pageX-l.left<this.settings.scrollSensitivity&&(o.scrollLeft=o.scrollLeft-this.settings.scrollSpeed);else{var n=t(s),r=t(e);i.pageY-n.scrollTop()<this.settings.scrollSensitivity?n.scrollTop(n.scrollTop()-this.settings.scrollSpeed):r.height()-(i.pageY-n.scrollTop())<this.settings.scrollSensitivity&&n.scrollTop(n.scrollTop()+this.settings.scrollSpeed),i.pageX-n.scrollLeft()<this.settings.scrollSensitivity?n.scrollLeft(n.scrollLeft()-this.settings.scrollSpeed):r.width()-(i.pageX-n.scrollLeft())<this.settings.scrollSensitivity&&n.scrollLeft(n.scrollLeft()+this.settings.scrollSpeed)}},_yIntersectsPlaceholder:function(t){var s=this.$placeholder.offset().top,e=s+this.placeholderHeight;return t.pageY>=s&&t.pageY<=e},_trigger:function(t,s){this.$el.trigger(t,{event:s})}},t.fn.tSortable=function(s){if(!s||"object"==typeof s)return this.each(function(){t(this).data("tSortable")||t(this).data("tSortable",new i(this,s))});if("string"==typeof s&&"_"!==s.charAt(0)){var e=this.data("tSortable");if(!e)throw new Error("tSortable is not initialized on this DOM element.");if(e&&e[s])return e[s].apply(e,Array.prototype.slice.apply(arguments,[1]))}throw new Error('"'+s+'" is no valid api method.')},t.fn.tSortable.defaults={handle:"div",items:"tbody > tr",opacity:.6,placeholder:"placeholder",animateTarget:!0,animationLength:300,scroll:!0,scrollSensitivity:20,scrollSpeed:20}}(jQuery,document,window);