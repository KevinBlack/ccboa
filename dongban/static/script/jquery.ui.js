/**
 * P2 Framework JS Library 1.0 Copyright(c) 2013, China Construction Bank.
 * 
 * @Author lingy Create on: 2013-12-24 Last Updated:
 *         说明:国际化资源文件 简体中文
 */

(function($) {
	$.parser = {
		auto: true,
		onComplete: function(_1) {},
		plugins: ["draggable", "droppable", "resizable", "pagination", "linkbutton", "menu", "menubutton", "splitbutton", "progressbar", "tree", "combobox", "combotree", "combogrid", "numberbox", "validatebox", "searchbox", "numberspinner", "timespinner", "calendar", "datebox", "datetimebox", "slider", "layout", "panel", "datagrid", "propertygrid", "treegrid", "tabs", "accordion", "window", "dialog"],
		parse: function(_2) {
			var aa = [];
			for (var i = 0; i < $.parser.plugins.length; i++) {
				var _3 = $.parser.plugins[i];
				var r = $(".easyui-" + _3, _2);
				if (r.length) {
					if (r[_3]) {
						r[_3]();
					} else {
						aa.push({
							name: _3,
							jq: r
						});
					}
				}
			}
			if (aa.length && window.easyloader) {
				var _4 = [];
				for (var i = 0; i < aa.length; i++) {
					_4.push(aa[i].name);
				}
				easyloader.load(_4, function() {
					for (var i = 0; i < aa.length; i++) {
						var _5 = aa[i].name;
						var jq = aa[i].jq;
						jq[_5]();
					}
					$.parser.onComplete.call($.parser, _2);
				});
			} else {
				$.parser.onComplete.call($.parser, _2);
			}
		},
		parseOptions: function(_6, _7) {
			var t = $(_6);
			var _8 = {};
			var s = $.trim(t.attr("data-options"));
			if (s) {
				var _9 = s.substring(0, 1);
				var _a = s.substring(s.length - 1, 1);
				if (_9 != "{") {
					s = "{" + s;
				}
				if (_a != "}") {
					s = s + "}";
				}
				_8 = (new Function("return " + s))();
			}
			if (_7) {
				var _b = {};
				for (var i = 0; i < _7.length; i++) {
					var pp = _7[i];
					if (typeof pp == "string") {
						if (pp == "width" || pp == "height" || pp == "left" || pp == "top") {
							_b[pp] = parseInt(_6.style[pp]) || undefined;
						} else {
							_b[pp] = t.attr(pp);
						}
					} else {
						for (var _c in pp) {
							var _d = pp[_c];
							if (_d == "boolean") {
								_b[_c] = t.attr(_c) ? (t.attr(_c) == "true") : undefined;
							} else {
								if (_d == "number") {
									_b[_c] = t.attr(_c) == "0" ? 0 : parseFloat(t.attr(_c)) || undefined;
								}
							}
						}
					}
				}
				$.extend(_8, _b);
			}
			return _8;
		}
	};
	$(function() {
		if (!window.easyloader && $.parser.auto) {
			$.parser.parse();
		}
	});
	$.fn._outerWidth = function(_e) {
		if (_e == undefined) {
			if (this[0] == window) {
				return this.width() || document.body.clientWidth;
			}
			return this.outerWidth() || 0;
		}
		return this.each(function() {
			if (!$.support.boxModel && $.browser.msie) {
				$(this).width(_e);
			} else {
				$(this).width(_e - ($(this).outerWidth() - $(this).width()));
			}
		});
	};
	$.fn._outerHeight = function(_f) {
		if (_f == undefined) {
			if (this[0] == window) {
				return this.height() || document.body.clientHeight;
			}
			return this.outerHeight() || 0;
		}
		return this.each(function() {
			if (!$.support.boxModel && $.browser.msie) {
				$(this).height(_f);
			} else {
				$(this).height(_f - ($(this).outerHeight() - $(this).height()));
			}
		});
	};
	$.fn._propAttr = $.fn.prop || $.fn.attr;
})(jQuery);
(function($) {
	var _10 = false;

	function _11(e) {
		var _12 = $.data(e.data.target, "draggable").options;
		var _13 = e.data;
		var _14 = _13.startLeft + e.pageX - _13.startX;
		var top = _13.startTop + e.pageY - _13.startY;
		if (_12.deltaX != null && _12.deltaX != undefined) {
			_14 = e.pageX + _12.deltaX;
		}
		if (_12.deltaY != null && _12.deltaY != undefined) {
			top = e.pageY + _12.deltaY;
		}
		if (e.data.parent != document.body) {
			_14 += $(e.data.parent).scrollLeft();
			top += $(e.data.parent).scrollTop();
		}
		if (_12.axis == "h") {
			_13.left = _14;
		} else {
			if (_12.axis == "v") {
				_13.top = top;
			} else {
				_13.left = _14;
				_13.top = top;
			}
		}
	};

	function _15(e) {
		var _16 = $.data(e.data.target, "draggable").options;
		var _17 = $.data(e.data.target, "draggable").proxy;
		if (!_17) {
			_17 = $(e.data.target);
		}
		_17.css({
			left: e.data.left,
			top: e.data.top
		});
		$("body").css("cursor", _16.cursor);
	};

	function _18(e) {
		_10 = true;
		var _19 = $.data(e.data.target, "draggable").options;
		var _1a = $(".droppable").filter(function() {
			return e.data.target != this;
		}).filter(function() {
			var _1b = $.data(this, "droppable").options.accept;
			if (_1b) {
				return $(_1b).filter(function() {
					return this == e.data.target;
				}).length > 0;
			} else {
				return true;
			}
		});
		$.data(e.data.target, "draggable").droppables = _1a;
		var _1c = $.data(e.data.target, "draggable").proxy;
		if (!_1c) {
			if (_19.proxy) {
				if (_19.proxy == "clone") {
					_1c = $(e.data.target).clone().insertAfter(e.data.target);
				} else {
					_1c = _19.proxy.call(e.data.target, e.data.target);
				}
				$.data(e.data.target, "draggable").proxy = _1c;
			} else {
				_1c = $(e.data.target);
			}
		}
		_1c.css("position", "absolute");
		_11(e);
		_15(e);
		_19.onStartDrag.call(e.data.target, e);
		return false;
	};

	function _1d(e) {
		_11(e);
		if ($.data(e.data.target, "draggable").options.onDrag.call(e.data.target, e) != false) {
			_15(e);
		}
		var _1e = e.data.target;
		$.data(e.data.target, "draggable").droppables.each(function() {
			var _1f = $(this);
			if (_1f.droppable("options").disabled) {
				return;
			}
			var p2 = _1f.offset();
			if (e.pageX > p2.left && e.pageX < p2.left + _1f.outerWidth() && e.pageY > p2.top && e.pageY < p2.top + _1f.outerHeight()) {
				if (!this.entered) {
					$(this).trigger("_dragenter", [_1e]);
					this.entered = true;
				}
				$(this).trigger("_dragover", [_1e]);
			} else {
				if (this.entered) {
					$(this).trigger("_dragleave", [_1e]);
					this.entered = false;
				}
			}
		});
		return false;
	};

	function _20(e) {
		_10 = false;
		_11(e);
		var _21 = $.data(e.data.target, "draggable").proxy;
		var _22 = $.data(e.data.target, "draggable").options;
		if (_22.revert) {
			if (_23() == true) {
				$(e.data.target).css({
					position: e.data.startPosition,
					left: e.data.startLeft,
					top: e.data.startTop
				});
			} else {
				if (_21) {
					_21.animate({
						left: e.data.startLeft,
						top: e.data.startTop
					}, function() {
						_24();
					});
				} else {
					$(e.data.target).animate({
						left: e.data.startLeft,
						top: e.data.startTop
					}, function() {
						$(e.data.target).css("position", e.data.startPosition);
					});
				}
			}
		} else {
			$(e.data.target).css({
				position: "absolute",
				left: e.data.left,
				top: e.data.top
			});
			_23();
		}
		_22.onStopDrag.call(e.data.target, e);
		$(document).unbind(".draggable");
		setTimeout(function() {
			$("body").css("cursor", "");
		}, 100);

		function _24() {
			if (_21) {
				_21.remove();
			}
			$.data(e.data.target, "draggable").proxy = null;
		};

		function _23() {
			var _25 = false;
			$.data(e.data.target, "draggable").droppables.each(function() {
				var _26 = $(this);
				if (_26.droppable("options").disabled) {
					return;
				}
				var p2 = _26.offset();
				if (e.pageX > p2.left && e.pageX < p2.left + _26.outerWidth() && e.pageY > p2.top && e.pageY < p2.top + _26.outerHeight()) {
					if (_22.revert) {
						$(e.data.target).css({
							position: e.data.startPosition,
							left: e.data.startLeft,
							top: e.data.startTop
						});
					}
					_24();
					$(this).trigger("_drop", [e.data.target]);
					_25 = true;
					this.entered = false;
					return false;
				}
			});
			if (!_25 && !_22.revert) {
				_24();
			}
			return _25;
		};
		return false;
	};
	$.fn.draggable = function(_27, _28) {
		if (typeof _27 == "string") {
			return $.fn.draggable.methods[_27](this, _28);
		}
		return this.each(function() {
			var _29;
			var _2a = $.data(this, "draggable");
			if (_2a) {
				_2a.handle.unbind(".draggable");
				_29 = $.extend(_2a.options, _27);
			} else {
				_29 = $.extend({}, $.fn.draggable.defaults, $.fn.draggable.parseOptions(this), _27 || {});
			}
			if (_29.disabled == true) {
				$(this).css("cursor", "");
				return;
			}
			var _2b = null;
			if (typeof _29.handle == "undefined" || _29.handle == null) {
				_2b = $(this);
			} else {
				_2b = (typeof _29.handle == "string" ? $(_29.handle, this) : _29.handle);
			}
			$.data(this, "draggable", {
				options: _29,
				handle: _2b
			});
			_2b.unbind(".draggable").bind("mousemove.draggable", {
				target: this
			}, function(e) {
				if (_10) {
					return;
				}
				var _2c = $.data(e.data.target, "draggable").options;
				if (_2d(e)) {
					$(this).css("cursor", _2c.cursor);
				} else {
					$(this).css("cursor", "");
				}
			}).bind("mouseleave.draggable", {
				target: this
			}, function(e) {
				$(this).css("cursor", "");
			}).bind("mousedown.draggable", {
				target: this
			}, function(e) {
				if (_2d(e) == false) {
					return;
				}
				$(this).css("cursor", "");
				var _2e = $(e.data.target).position();
				var _2f = {
					startPosition: $(e.data.target).css("position"),
					startLeft: _2e.left,
					startTop: _2e.top,
					left: _2e.left,
					top: _2e.top,
					startX: e.pageX,
					startY: e.pageY,
					target: e.data.target,
					parent: $(e.data.target).parent()[0]
				};
				$.extend(e.data, _2f);
				var _30 = $.data(e.data.target, "draggable").options;
				if (_30.onBeforeDrag.call(e.data.target, e) == false) {
					return;
				}
				$(document).bind("mousedown.draggable", e.data, _18);
				$(document).bind("mousemove.draggable", e.data, _1d);
				$(document).bind("mouseup.draggable", e.data, _20);
			});

			function _2d(e) {
				var _31 = $.data(e.data.target, "draggable");
				var _32 = _31.handle;
				var _33 = $(_32).offset();
				var _34 = $(_32).outerWidth();
				var _35 = $(_32).outerHeight();
				var t = e.pageY - _33.top;
				var r = _33.left + _34 - e.pageX;
				var b = _33.top + _35 - e.pageY;
				var l = e.pageX - _33.left;
				return Math.min(t, r, b, l) > _31.options.edge;
			};
		});
	};
	$.fn.draggable.methods = {
		options: function(jq) {
			return $.data(jq[0], "draggable").options;
		},
		proxy: function(jq) {
			return $.data(jq[0], "draggable").proxy;
		},
		enable: function(jq) {
			return jq.each(function() {
				$(this).draggable({
					disabled: false
				});
			});
		},
		disable: function(jq) {
			return jq.each(function() {
				$(this).draggable({
					disabled: true
				});
			});
		}
	};
	$.fn.draggable.parseOptions = function(_36) {
		var t = $(_36);
		return $.extend({}, $.parser.parseOptions(_36, ["cursor", "handle", "axis", {
			"revert": "boolean",
			"deltaX": "number",
			"deltaY": "number",
			"edge": "number"
		}]), {
			disabled: (t.attr("disabled") ? true : undefined)
		});
	};
	$.fn.draggable.defaults = {
		proxy: null,
		revert: false,
		cursor: "move",
		deltaX: null,
		deltaY: null,
		handle: null,
		disabled: false,
		edge: 0,
		axis: null,
		onBeforeDrag: function(e) {},
		onStartDrag: function(e) {},
		onDrag: function(e) {},
		onStopDrag: function(e) {}
	};
})(jQuery);
(function($) {
	function _37(_38) {
		$(_38).addClass("droppable");
		$(_38).bind("_dragenter", function(e, _39) {
			$.data(_38, "droppable").options.onDragEnter.apply(_38, [e, _39]);
		});
		$(_38).bind("_dragleave", function(e, _3a) {
			$.data(_38, "droppable").options.onDragLeave.apply(_38, [e, _3a]);
		});
		$(_38).bind("_dragover", function(e, _3b) {
			$.data(_38, "droppable").options.onDragOver.apply(_38, [e, _3b]);
		});
		$(_38).bind("_drop", function(e, _3c) {
			$.data(_38, "droppable").options.onDrop.apply(_38, [e, _3c]);
		});
	};
	$.fn.droppable = function(_3d, _3e) {
		if (typeof _3d == "string") {
			return $.fn.droppable.methods[_3d](this, _3e);
		}
		_3d = _3d || {};
		return this.each(function() {
			var _3f = $.data(this, "droppable");
			if (_3f) {
				$.extend(_3f.options, _3d);
			} else {
				_37(this);
				$.data(this, "droppable", {
					options: $.extend({}, $.fn.droppable.defaults, $.fn.droppable.parseOptions(this), _3d)
				});
			}
		});
	};
	$.fn.droppable.methods = {
		options: function(jq) {
			return $.data(jq[0], "droppable").options;
		},
		enable: function(jq) {
			return jq.each(function() {
				$(this).droppable({
					disabled: false
				});
			});
		},
		disable: function(jq) {
			return jq.each(function() {
				$(this).droppable({
					disabled: true
				});
			});
		}
	};
	$.fn.droppable.parseOptions = function(_40) {
		var t = $(_40);
		return $.extend({}, $.parser.parseOptions(_40, ["accept"]), {
			disabled: (t.attr("disabled") ? true : undefined)
		});
	};
	$.fn.droppable.defaults = {
		accept: null,
		disabled: false,
		onDragEnter: function(e, _41) {},
		onDragOver: function(e, _42) {},
		onDragLeave: function(e, _43) {},
		onDrop: function(e, _44) {}
	};
})(jQuery);
(function($) {
	var _45 = false;
	$.fn.resizable = function(_46, _47) {
		if (typeof _46 == "string") {
			return $.fn.resizable.methods[_46](this, _47);
		}

		function _48(e) {
			var _49 = e.data;
			var _4a = $.data(_49.target, "resizable").options;
			if (_49.dir.indexOf("e") != -1) {
				var _4b = _49.startWidth + e.pageX - _49.startX;
				_4b = Math.min(Math.max(_4b, _4a.minWidth), _4a.maxWidth);
				_49.width = _4b;
			}
			if (_49.dir.indexOf("s") != -1) {
				var _4c = _49.startHeight + e.pageY - _49.startY;
				_4c = Math.min(Math.max(_4c, _4a.minHeight), _4a.maxHeight);
				_49.height = _4c;
			}
			if (_49.dir.indexOf("w") != -1) {
				_49.width = _49.startWidth - e.pageX + _49.startX;
				if (_49.width >= _4a.minWidth && _49.width <= _4a.maxWidth) {
					_49.left = _49.startLeft + e.pageX - _49.startX;
				}
			}
			if (_49.dir.indexOf("n") != -1) {
				_49.height = _49.startHeight - e.pageY + _49.startY;
				if (_49.height >= _4a.minHeight && _49.height <= _4a.maxHeight) {
					_49.top = _49.startTop + e.pageY - _49.startY;
				}
			}
		};

		function _4d(e) {
			var _4e = e.data;
			var _4f = _4e.target;
			$(_4f).css({
				left: _4e.left,
				top: _4e.top
			});
			$(_4f)._outerWidth(_4e.width)._outerHeight(_4e.height);
		};

		function _50(e) {
			_45 = true;
			$.data(e.data.target, "resizable").options.onStartResize.call(e.data.target, e);
			return false;
		};

		function _51(e) {
			_48(e);
			if ($.data(e.data.target, "resizable").options.onResize.call(e.data.target, e) != false) {
				_4d(e);
			}
			return false;
		};

		function _52(e) {

			_45 = false;
			_48(e, true);
			_4d(e);
			$.data(e.data.target, "resizable").options.onStopResize.call(e.data.target, e);
			$(document).unbind(".resizable");
			$("body").css("cursor", "");
			return false;
		};
		return this.each(function() {
			var _53 = null;
			var _54 = $.data(this, "resizable");
			if (_54) {
				$(this).unbind(".resizable");
				_53 = $.extend(_54.options, _46 || {});
			} else {
				_53 = $.extend({}, $.fn.resizable.defaults, $.fn.resizable.parseOptions(this), _46 || {});
				$.data(this, "resizable", {
					options: _53
				});
			}
			if (_53.disabled == true) {
				return;
			}
			$(this).bind("mousemove.resizable", {
				target: this
			}, function(e) {
				if (_45) {
					return;
				}
				var dir = _55(e);
				if (dir == "") {
					$(e.data.target).css("cursor", "");
				} else {
					$(e.data.target).css("cursor", dir + "-resize");
				}
			}).bind("mouseleave.resizable", {
				target: this
			}, function(e) {
				$(e.data.target).css("cursor", "");
			}).bind("mousedown.resizable", {
				target: this
			}, function(e) {
				var dir = _55(e);
				if (dir == "") {
					return;
				}

				function _56(css) {
					var val = parseInt($(e.data.target).css(css));
					if (isNaN(val)) {
						return 0;
					} else {
						return val;
					}
				};
				var _57 = {
					target: e.data.target,
					dir: dir,
					startLeft: _56("left"),
					startTop: _56("top"),
					left: _56("left"),
					top: _56("top"),
					startX: e.pageX,
					startY: e.pageY,
					startWidth: $(e.data.target).outerWidth(),
					startHeight: $(e.data.target).outerHeight(),
					width: $(e.data.target).outerWidth(),
					height: $(e.data.target).outerHeight(),
					deltaWidth: $(e.data.target).outerWidth() - $(e.data.target).width(),
					deltaHeight: $(e.data.target).outerHeight() - $(e.data.target).height()
				};
				$(document).bind("mousedown.resizable", _57, _50);
				$(document).bind("mousemove.resizable", _57, _51);
				$(document).bind("mouseup.resizable", _57, _52);
				$("body").css("cursor", dir + "-resize");
			});

			function _55(e) {
				var tt = $(e.data.target);
				var dir = "";
				var _58 = tt.offset();
				var _59 = tt.outerWidth();
				var _5a = tt.outerHeight();
				var _5b = _53.edge;
				if (e.pageY > _58.top && e.pageY < _58.top + _5b) {
					dir += "n";
				} else {
					if (e.pageY < _58.top + _5a && e.pageY > _58.top + _5a - _5b) {
						dir += "s";
					}
				}
				if (e.pageX > _58.left && e.pageX < _58.left + _5b) {
					dir += "w";
				} else {
					if (e.pageX < _58.left + _59 && e.pageX > _58.left + _59 - _5b) {
						dir += "e";
					}
				}
				var _5c = _53.handles.split(",");
				for (var i = 0; i < _5c.length; i++) {
					var _5d = _5c[i].replace(/(^\s*)|(\s*$)/g, "");
					if (_5d == "all" || _5d == dir) {
						return dir;
					}
				}
				return "";
			};
		});
	};
	$.fn.resizable.methods = {
		options: function(jq) {
			return $.data(jq[0], "resizable").options;
		},
		enable: function(jq) {
			return jq.each(function() {
				$(this).resizable({
					disabled: false
				});
			});
		},
		disable: function(jq) {
			return jq.each(function() {
				$(this).resizable({
					disabled: true
				});
			});
		}
	};
	$.fn.resizable.parseOptions = function(_5e) {
		var t = $(_5e);
		return $.extend({}, $.parser.parseOptions(_5e, ["handles", {
			minWidth: "number",
			minHeight: "number",
			maxWidth: "number",
			maxHeight: "number",
			edge: "number"
		}]), {
			disabled: (t.attr("disabled") ? true : undefined)
		});
	};
	$.fn.resizable.defaults = {
		disabled: false,
		handles: "n, e, s, w, ne, se, sw, nw, all",
		minWidth: 10,
		minHeight: 10,
		maxWidth: 10000,
		maxHeight: 10000,
		edge: 5,
		onStartResize: function(e) {},
		onResize: function(e) {},
		onStopResize: function(e) {}
	};
})(jQuery);
(function($) {
	function _5f(_60) {
		var _61 = $.data(_60, "linkbutton").options;
		$(_60).empty();
		$(_60).addClass("l-btn");
		if (_61.id) {
			$(_60).attr("id", _61.id);
		} else {
			$(_60).attr("id", "");
		}
		if (_61.plain) {
			$(_60).addClass("l-btn-plain");
		} else {
			$(_60).removeClass("l-btn-plain");
		}
		if (_61.text) {
			$(_60).html(_61.text).wrapInner("<span class=\"l-btn-left\">" + "<span class=\"l-btn-text\">" + "</span>" + "</span>");
			if (_61.iconCls) {
				$(_60).find(".l-btn-text").css({
					"padding-right": "10px"
				}); //让生成的linkbutton上的字体居右 YH.2012.11.17
				// 添加span以显示icon    , famingyuan 2013/02/18 
				var tempIconCls = PJF.constants.ICONCLS_MAP[_61.iconCls] || "icon-default";
				if (tempIconCls != "icon-default") {
					$(_60).find(".l-btn-left").prepend('<span class="appendImage ' + tempIconCls + '"></span>');
				} else {
					$(_60).find(".l-btn-text").addClass(_61.iconCls); // 添加非icon类型的className到文字所在span(可注释掉)  famingyuan 2013/02/18
				}
			}
		} else {
			$(_60).html("&nbsp;").wrapInner("<span class=\"l-btn-left\">" + "<span class=\"l-btn-text\">" + "<span class=\"l-btn-empty\"></span>" + "</span>" + "</span>");
			if (_61.iconCls) {
				$(_60).find(".l-btn-empty").addClass(_61.iconCls);
			}
		}
		$(_60).unbind(".linkbutton").bind("focus.linkbutton", function() {
			if (!_61.disabled) {
				$(this).find("span.l-btn-text").addClass("l-btn-focus");
			}
		}).bind("blur.linkbutton", function() {
			$(this).find("span.l-btn-text").removeClass("l-btn-focus");
		});
		_62(_60, _61.disabled);
	};

	function _62(_63, _64) {
		var _65 = $.data(_63, "linkbutton");
		if (_64) {
			_65.options.disabled = true;
			var _66 = $(_63).attr("href");
			if (_66) {
				_65.href = _66;
				$(_63).attr("href", "javascript:void(0)");
			}
			if (_63.onclick) {
				_65.onclick = _63.onclick;
				_63.onclick = null;
			}
			//去掉分页组件不可用样式 YH 2012.12.5
			// $(_63).addClass("");
			// for CCBS
			$(_63).addClass("l-btn-disabled");
			// end
		} else {
			_65.options.disabled = false;
			if (_65.href) {
				$(_63).attr("href", _65.href);
			}
			if (_65.onclick) {
				_63.onclick = _65.onclick;
			}
			//去掉分页组件不可用样式 YH 2012.12.5
			// $(_63).removeClass("");
			// for CCBS
			$(_63).removeClass("l-btn-disabled");
		}
	};
	$.fn.linkbutton = function(_67, _68) {
		if (typeof _67 == "string") {
			return $.fn.linkbutton.methods[_67](this, _68);
		}
		_67 = _67 || {};
		return this.each(function() {
			var _69 = $.data(this, "linkbutton");
			if (_69) {
				$.extend(_69.options, _67);
			} else {
				$.data(this, "linkbutton", {
					options: $.extend({}, $.fn.linkbutton.defaults, $.fn.linkbutton.parseOptions(this), _67)
				});
				$(this).removeAttr("disabled");
			}
			_5f(this);
		});
	};
	$.fn.linkbutton.methods = {
		options: function(jq) {
			return $.data(jq[0], "linkbutton").options;
		},
		enable: function(jq) {
			return jq.each(function() {
				_62(this, false);
			});
		},
		disable: function(jq) {
			return jq.each(function() {
				_62(this, true);
			});
		}
	};
	$.fn.linkbutton.parseOptions = function(_6a) {
		var t = $(_6a);
		return $.extend({}, $.parser.parseOptions(_6a, ["id", "iconCls", {
			plain: "boolean"
		}]), {
			disabled: (t.attr("disabled") ? true : undefined),
			text: $.trim(t.html()),
			iconCls: (t.attr("icon") || t.attr("iconCls"))
		});
	};
	$.fn.linkbutton.defaults = {
		id: null,
		disabled: false,
		plain: false,
		text: "",
		iconCls: null
	};
})(jQuery);
(function($) {
	// 添加上一页显示控制
	var hideBtnFlags = {
		// 信用卡  true 表示隐藏  false 表示显示
		'CREDITCARD': true
	};
	// 获取是否显示下一页标志

	function getHideFlag(opts) {
		if (!opts.reqType) {
			return false;
		}
		return hideBtnFlags[opts.reqType];
	};

	function _6b(_6c) {
		var _6d = $.data(_6c, "pagination");
		var _6e = _6d.options;
		var opts = _6e; // add for CCBS
		var bb = _6d.bb = {};
		var inputPagenum;
		//added by zhouyh on 2012/12/1
		var prevHandler = _6e.prevHandler ? _6e.prevHandler : null
		var nextHandler = _6e.nextHandler ? _6e.nextHandler : null
		var firstHandler = _6e.firstHandler ? _6e.firstHandler : null
		var endHandler = _6e.endHandler ? _6e.endHandler : null
		var _6f = {
			first: {
				iconCls: "icon-pager",
				text: "&nbsp;" + resource.GRID_PAGINATION_BTN_FIRST,
				handler: function() {
					var pageChangeFlag = opts.pageChangeHandler('first',opts,1);
					if(pageChangeFlag===false){
						return ;
					}
					if (firstHandler) {
						firstHandler(1);
						//加入分页器实现 YH 2012.12.10
						createPager(_6c, bb, 1, _6e);
					} else {
						if (_6e.pageNumber > 1) {
							_76(_6c, 1);
							//加入分页器实现 YH 2012.12.10
							createPager(_6c, bb, 1, _6e);
						}
					}
				}
			},
			prev: {
				iconCls: "icon-pager",
				text: "&nbsp;" + resource.GRID_PAGINATION_BTN_PREV,
				handler: function() {
					// for CCBS
					if (opts.isCCBS) {
                        var _disablemark = bb.prev.hasClass("l-btn-disabled");
                        if( _disablemark ){
                            return;
                        }
						opts.ccbsReqFlag.preReq = true;
						opts.ccbsReqFlag.nextReq = false;

						if (!opts.ccbsCurrentPageNumber) {
							opts.ccbsCurrentPageNumber = 1;
						}
						opts.ccbsRealTimePageNumber = opts.ccbsCurrentPageNumber;
						if (!bb.prev.hasClass("l-btn-disabled")) {
							opts.ccbsCurrentPageNumber--;
						}

						if (opts.ccbsCurrentPageNumber < 1) {
							opts.ccbsCurrentPageNumber = 1;
						}

						if (prevHandler) {
							prevHandler(opts.ccbsCurrentPageNumber);
						} else {
							_76(_6c, opts.ccbsCurrentPageNumber);
						}

						return;
					}
					//added by zhouyh on 2012/12/1
					if (prevHandler) {
						if (_6e.pageNumber > 1) {
							var pageChangeFlag = opts.pageChangeHandler('prev',opts,(_6e.pageNumber - 1));
							if(pageChangeFlag===false){
								return ;
							}
							prevHandler(_6e.pageNumber - 1);
						} else {
							var pageChangeFlag = opts.pageChangeHandler('prev',opts,1);
							if(pageChangeFlag===false){
								return ;
							}
							prevHandler(1);
						}
						//加入分页器实现 YH 2012.12.10
						var pages = Math.ceil(_6e.total / _6e.pageSize);
						var groups = Math.ceil(pages / opts.showNumberSize);
						if (_6e.pagegroup > 1 && ((_6e.pageNumber - 1) % opts.showNumberSize == 0)) {
							createPager(_6c, bb, _6e.pagegroup - 1, _6e);
						}
					} else {
						if (_6e.pageNumber > 1) {
							var pageChangeFlag = opts.pageChangeHandler('prev',opts,(_6e.pageNumber - 1));
							if(pageChangeFlag===false){
								return ;
							}							
							_76(_6c, _6e.pageNumber - 1);
						}else{
							var pageChangeFlag = opts.pageChangeHandler('prev',opts,1);
							if(pageChangeFlag===false){
								return ;
							}				
						}
						//加入分页器实现 YH 2012.12.10
						var pages = Math.ceil(_6e.total / _6e.pageSize);
						var groups = Math.ceil(pages / opts.showNumberSize);
						if (_6e.pagegroup > 1 && (_6e.pageNumber % opts.showNumberSize == 0)) {
							createPager(_6c, bb, _6e.pagegroup - 1, _6e);
						}
					}
				}
			},
			next: {
				iconCls: "icon-pager",
				text: "&nbsp;" + resource.GRID_PAGINATION_BTN_NEXT,
				handler: function() {
					// for CCBS
					if (opts.isCCBS) {
                        var _disablemark = bb.next.hasClass("l-btn-disabled");
                        if( _disablemark ){
                            return;
                        }
						opts.ccbsReqFlag.nextReq = true;  // nextReq 是表示 执行向前还是向后请求
						opts.ccbsReqFlag.preReq = false;
						if (!opts.ccbsCurrentPageNumber) {
							opts.ccbsCurrentPageNumber = 1;
						}
						/*用于NCIMP当前页面计数*/
						opts.ccbsRealTimePageNumber = opts.ccbsCurrentPageNumber;
						if (!bb.next.hasClass("l-btn-disabled")) {
							opts.ccbsCurrentPageNumber++;
						}

						if (nextHandler) {
							nextHandler(opts.ccbsCurrentPageNumber);
						} else {
							_76(_6c, opts.ccbsCurrentPageNumber);
						}
						return;
					}
					//added by zhouyh on 2012/12/1
					if (nextHandler) {
						var _70 = Math.ceil(_6e.total / _6e.pageSize);
						if (_6e.pageNumber < _70) {
							var pageChangeFlag = opts.pageChangeHandler('next',opts,(_6e.pageNumber + 1));
							if(pageChangeFlag===false){
								return ;
							}
							nextHandler(_6e.pageNumber + 1);
						} else {
							var pageChangeFlag = opts.pageChangeHandler('next',opts,_6e.pageNumber);
							if(pageChangeFlag===false){
								return ;
							}
							nextHandler(_6e.pageNumber);// 此处本不该再调用了(可以考虑不调用了，因为没有下一页了)
						}
						//加入分页器实现 YH 2012.12.10
						var pages = Math.ceil(_6e.total / _6e.pageSize);
						var groups = Math.ceil(pages / opts.showNumberSize);
						if (_6e.pagegroup < groups && ((_6e.pageNumber) % opts.showNumberSize == 0)) {
							createPager(_6c, bb, _6e.pagegroup + 1, _6e);
						}
					} else {
						var _70 = Math.ceil(_6e.total / _6e.pageSize);
						if (_6e.pageNumber < _70) {
							var pageChangeFlag = opts.pageChangeHandler('next',opts,(_6e.pageNumber+1));
							if(pageChangeFlag===false){
								return ;
							}
							_76(_6c, _6e.pageNumber + 1);
						}else{
							var pageChangeFlag = opts.pageChangeHandler('next',opts,_6e.pageNumber);
							// 修复自动翻页功能 没有重置isRequesting 的bug
							if(typeof(arguments[0])=='function'){
								arguments[0].call(opts,false);
							}
							if(pageChangeFlag===false){
								return ;
							}							
						}
						//加入分页器实现 YH 2012.12.10
						var pages = Math.ceil(_6e.total / _6e.pageSize);
						var groups = Math.ceil(pages / opts.showNumberSize);
						if (_6e.pagegroup < groups && ((_6e.pageNumber - 1) % opts.showNumberSize == 0)) {
							createPager(_6c, bb, _6e.pagegroup + 1, _6e);
						}
					}
				}
			},
			last: {
				iconCls: "icon-pager",
				text: "&nbsp;" + resource.GRID_PAGINATION_BTN_LAST,
				handler: function() {
					if (endHandler) {
						var _71 = Math.ceil(_6e.total / _6e.pageSize);
						var pageChangeFlag = opts.pageChangeHandler('last',opts,_71);
						if(pageChangeFlag===false){
							return ;
						}						
						endHandler(_71);
						//加入分页器实现 YH 2012.12.10
						var pages = Math.ceil(_6e.total / _6e.pageSize);
						var groups = Math.ceil(pages / opts.showNumberSize);
						try {
							createPager(_6c, bb, groups, _6e);
						} catch (e) {
							alert("Error: createPager_1 -> " + e.message);
						}

					} else {
						var _71 = Math.ceil(_6e.total / _6e.pageSize);
						var pageChangeFlag = opts.pageChangeHandler('last',opts,_71);
						if(pageChangeFlag===false){
							return ;
						}							
						if (_6e.pageNumber < _71) {
							_76(_6c, _71);
						}
						//加入分页器实现 YH 2012.12.10
						var pages = Math.ceil(_6e.total / _6e.pageSize);
						if (pages > 0) {
							var groups = Math.ceil(pages / opts.showNumberSize);
							try {
								createPager(_6c, bb, groups, _6e);
							} catch (e) {
								alert("Error: createPager_2 -> " + e.message);
							}

						}
					}
				}
			},
			refresh: {
				iconCls: "pagination-load",
				handler: function() {
					if (_6e.onBeforeRefresh.call(_6c, _6e.pageNumber, _6e.pageSize) != false) {
						var pageChangeFlag = opts.pageChangeHandler('refresh',opts,_6e.pageNumber);
						if(pageChangeFlag===false){
							return ;
						}
						_76(_6c, _6e.pageNumber);
						_6e.onRefresh.call(_6c, _6e.pageNumber, _6e.pageSize);
						// 清楚可能存在的选中  ， famingyuan , 2013/03/28  abcd
						if (_6e.clearGridSelections) {
							_6e.clearGridSelections.call(_6c, _6c, _6e.pageNumber, _6e.pageSize);
						}
					}
				}
			}
		};
		// 保存分页按钮
		_6e.paginationBtns = _6f;
		var _72 = $(_6c).addClass("pagination").html("<table id=table_pager_pagination cellspacing=\"0\"  cellpadding=\"0\" border=\"0\"><tr></tr></table>");
		var tr = _72.find("tr");
		bb.paginationArea = tr;
		opts.bb = bb;
		function _73(_74) {
			var a = $("<a href=\"javascript:void(0)\"></a>").appendTo(tr);
			a.wrap("<td></td>");
			a.linkbutton({
				iconCls: _6f[_74].iconCls,
				text: _6f[_74].text,
				plain: true
			}).unbind(".pagination").bind("click.pagination", _6f[_74].handler);
			 
			PJF.constants.KEYBOARD_ENABLE&&a.attr("tabindex", "-1");
			
			return a;
		};
		// for CCBS  , CCBS模式 不显示 pageList
		if (_6e.showPageList && (opts.isCCBS == false)) {
			var ps = $("<select class=\"pagination-page-list\"></select>");
			PJF.constants.KEYBOARD_ENABLE&&ps.attr("tabindex", "-1");
			// 保存之前的pageSize
			var prevPageSize = opts.pageSize;
			ps.bind("change", function() {
				var newPageSize = parseInt($(this).val());
				var pageChangeFlag = opts.pageChangeHandler('pageList',opts,newPageSize);
				if(pageChangeFlag===false){
					// 重置
					if(newPageSize!=prevPageSize){
						$(this).val(prevPageSize);
					}
					return;
				}
				prevPageSize = newPageSize; // 保存
				_6e.pageSize = newPageSize;
				_6e.onChangePageSize.call(_6c, _6e.pageSize);
				_76(_6c, _6e.pageNumber, PJF.constants.FIX_GRID_PAGINATION_ERR);
				//添加创建分页器方法 YH 2012.12.10
				createPager(_6c, bb, _6e.pagegroup, _6e);
			});
			for (var i = 0; i < _6e.pageList.length; i++) {
				$("<option></option>").text(_6e.pageList[i]).appendTo(ps);
			}
			$("<div id=td_pager_list width=15% class=pagination-pagelist >"+resource.GRID_LIST_PER+"</div>").append(ps).appendTo(_72); //分页记录条数信息显示位置 YH 2013.3.11
		} else { //showPageList为false时用td占位 YH 2013.1.4
			$("<div id=td_pager_list width=15% class=pagination-pagelist></div>").appendTo(_72);
		}

		if(_6e.highPerformance || opts.isCCBS){
			
			var totalPage = Math.ceil(opts.total / opts.pageSize) || 1;
			var page = opts.pageNumber;
			if(opts.isCCBS){
				bb.prev = _73("prev");
				bb.next = _73("next");
				$("<div class=\"pagination-info pagination-info-grid\" id=\"div_pagination_info\"></div>").appendTo(_72);
				$("<div style=\"clear:both;\"></div>").appendTo(_72);
			}else{
				bb.first = _73("first");
				bb.prev = _73("prev");
				bb.next = _73("next");
				bb.last = _73("last");
				bb.total_current = $("<td><span id=\"total_current\">&nbsp;"+resource.GRID_LIST_INDEX+" "+page+resource.GRID_LIST_JUMP_2_1+""+totalPage+" "+resource.GRID_LIST_JUMP_3+"</span></td>").appendTo(tr);	
			}		
			
			adjustBtnStyle(opts, bb);
			return;
		}
		bb.first = _73("first");
		bb.prev = _73("prev");
		bb.pagebuttons = $("<td id=td_pager_pagebuttons></td>").appendTo(tr);
		// 是否显示分页数字按钮
		if(opts.isShowPaginationNumber===false){
			bb.pagebuttons.css("display","none");
		}
		bb.next = _73("next");
		bb.last = _73("last");
		if (_6e.showRefresh) { //去掉分割线 YH 2013.1.23
			$("<td><div class=\"\"></div></td>").appendTo(tr);
			bb.refresh = _73("refresh");
			/*追加一个class以便样式表控制*/
			bb.refresh.removeClass("datagrid-refresh-icon").addClass("datagrid-refresh-icon");
		}
		if (_6e.buttons) {
			$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
			for (var i = 0; i < _6e.buttons.length; i++) {
				var btn = _6e.buttons[i];
				if (btn == "-") {
					$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
				} else {
					var td = $("<td></td>").appendTo(tr);
					$("<a href=\"javascript:void(0)\"></a>").appendTo(td).linkbutton($.extend(btn, {
						plain: false
					})).bind("click", eval(btn.handler || function() {}));
				}
			}
		}
		// for CCBS
		bb.beforePageText = $("<span style=\"padding-left:6px;" + (opts.isCCBS ? "display:none;" : '') + "\"></span>").html(_6e.beforePageText).appendTo(tr).wrap("<td></td>");
		bb.num = $("<input class=\"pagination-num\" id=\"txt_pagination_num\" type=\"text\" value=\"1\" size=\"2\">").appendTo(tr).wrap("<td></td>");
		PJF.constants.KEYBOARD_ENABLE&&bb.num.attr("tabindex", "-1");
		/*修改keydown事件为keypress事件 客户端keydown事件存在bug*/
		bb.num.unbind(".pagination").bind("keypress.pagination", function(e) {

			if (e.keyCode == 13) {
				if (parseInt($(this).val()) <= 0) {
					opts.skipAlert = true;
					alert(resource.GRID_LIST_NUMBER_ERROR);
					return;
				}
				var pageChangeFlag = opts.pageChangeHandler('number',opts,($(this).val() || 1));
				if(pageChangeFlag===false){
					return ;
				}				
				//自定义页码框回车事件 YH 2012.12.4
				var enterHandler = _6e.enterHandler ? _6e.enterHandler : null;
				if (enterHandler) {
					enterHandler(parseInt($(this).val()) || 1);
					calPage(parseInt($(this).val()) || 1);
				} else {
					var _75 = parseInt($(this).val()) || 1;
					_76(_6c, _75);
					calPage(_75);
					return false;
				}
			} else if (!(e.keyCode >= 48 && e.keyCode <= 57) && (e.keyCode != 8) && (e.keyCode != 37) && (e.keyCode != 39) && (e.keyCode != 46)) {
				return false;
			} else {
				/*处理可能的伴随组合键的情况*/
				if (e.shiftKey || e.ctrlKey || e.altKey) {
					return false;
				}
				return true;
			}
		});
		//给页码输入框中的值，赋变量 YH 2012.12.11
		bb.num.bind("blur.pagination", function(e) {
			if (parseInt($(this).val()) <= 0) {
				if (!opts.skipAlert) {
					alert(resource.GRID_LIST_NUMBER_ERROR);
				} else {
					opts.skipAlert = false;
				}

				return;
			} else {
				inputPagenum = parseInt($(this).val()) || 1;
			}
		});
		bb.after = $("<span style=\"padding-right:6px;\" id=\"span_pagination_pages\"></span>").appendTo(tr).wrap("<td></td>");
		$("<div class=\"pagination-info pagination-info-grid\" id=\"div_pagination_info\"></div>").appendTo(_72);
		$("<div style=\"clear:both;\"></div>").appendTo(_72);
		//加入页面转到按钮 YH 2012.12.11
		bb.selectPageButton = $("<td></td>").appendTo(tr);

		// 只显示上一页和下一页按钮 add 2014/06/17
		if(opts.isShowPrevNextBtnOnly){
			bb.first.css("display","none");
			// bb.prev.css("display","none");
			// bb.next.css("display","none");
			bb.last .css("display","none");
			bb.num.css("display","none");
			bb.refresh.css("display","none");
			bb.selectPageButton.css("display","none");
			bb.after.css("display","none");
			bb.beforePageText.css("display","none");
		}


		// 计算分页 ,用于在手动输入目标也之后进行 2013/05/03

		function calPage(inputPagenum) {
			//加入分页器实现 YH 2012.12.10
			// 如果大于最大页数 则设置为最大
			if (inputPagenum > Math.ceil(_6e.total / _6e.pageSize)) {
				inputPagenum = Math.ceil(_6e.total / _6e.pageSize);
			}
			if (inputPagenum) {
				var targetGroup = Math.ceil(inputPagenum / opts.showNumberSize);
				createPager(_6c, bb, targetGroup, _6e);
			} else {
				createPager(_6c, bb, 1, _6e);
			}
		};
		var selectbtn = {
			iconCls: "",
			text: "&nbsp;&nbsp;"+resource.GRID_LIST_JUMP,
			handler: function() {
				// opts.pageChangeHandler('number',opts,(inputPagenum || _6e.pageNumber));
				inputPagenum = parseInt(bb.num.val()) || _6e.pageNumber;
				var pageChangeFlag = opts.pageChangeHandler('number',opts,inputPagenum);
				if(pageChangeFlag===false){
					return ;
				}					
				//自定义页码框回车事件 YH 2012.12.4
				var enterHandler = _6e.enterHandler ? _6e.enterHandler : null;
				if (enterHandler) {
					if (inputPagenum) {
						enterHandler(inputPagenum);
					} else {
						enterHandler(_6e.pageNumber);
					}
					// 计算分页
					calPage(inputPagenum);
				} else {
					if (inputPagenum) {
						_76(_6c, inputPagenum);
						// 计算分页
						calPage(inputPagenum);
						return false;
					} else {
						_76(_6c, _6e.pageNumber);
						// 计算分页
						calPage(inputPagenum);
					}
				}
			}
		};
		var s_selectbtn = $("<a href=\"javascript:void(0)\"></a>").pjfLinkButton($.extend(selectbtn, {
			iconCls: "submit_btn icon-default2",
			plain: true
		})).bind("click", eval(selectbtn.handler || function() {}));
		s_selectbtn[0].innerHTML = s_selectbtn[0].innerHTML.replace("l-btn-left", "submit_btn_left");
		s_selectbtn.appendTo(bb.selectPageButton);
		PJF.constants.KEYBOARD_ENABLE&&s_selectbtn.attr("tabindex", "-1");
		// 覆盖转到按钮className , 修改为辅助按钮     famingyuan 2013/02/28
		// s_selectbtn[0].className = PJF.constants.PJF_LINKBUTTON_STYLE["default"].defStatus.left + " " + PJF.constants.PJF_LINKBUTTON_STYLE["assistant"].defStatus.left + " linkBtn_margin";
		// s_selectbtn[0].firstChild.className = PJF.constants.PJF_LINKBUTTON_STYLE["default"].defStatus.middle + " " + PJF.constants.PJF_LINKBUTTON_STYLE["assistant"].defStatus.middle;
		// $(s_selectbtn[0].firstChild).find("span:last")[0].className = PJF.constants.PJF_LINKBUTTON_STYLE["default"].defStatus.right + " " + PJF.constants.PJF_LINKBUTTON_STYLE["assistant"].defStatus.right;
		// 由于linkButton 样式修改 采用LinkButton的样式 显示会不协调 故采用原始linkButton样式
		s_selectbtn[0].className = "l-btn l-btn-plain";
		s_selectbtn[0].firstChild.className = "icon-pager-left";
		$(s_selectbtn[0].firstChild).find("span:last")[0].className = "l-btn-text icon-pager";
		$(s_selectbtn[0].firstChild).find("span:last").css('padding-right', '10px');

		// 修改padding
		adjustBtnStyle(opts, bb);

	};
	/******************根据下一页，上一页生成分页器方法 YH 2012.12.7***********************/

	function createPager(_6c, bb, pagegroup, _6e) {
		var _79 = $.data(_6c, "pagination").options;
		if(_79.highPerformance || _79.isCCBS){
			// 不需要分组
			return;
		}
		var pages = Math.ceil(_6e.total / _6e.pageSize);
		var groups = Math.ceil(pages / _79.showNumberSize);
		var pagemode = pages % _79.showNumberSize;
		if (pagegroup <= groups) {
			bb.pagebuttons[0].innerHTML = "";
			if (pagegroup * _79.showNumberSize <= pages) {
				for (var p = (pagegroup - 1) * _79.showNumberSize + 1; p <= pagegroup * _79.showNumberSize; p++) {
					var btn = {
						iconCls: "",
						text: "&nbsp;" + p,
						handler: (function(arg) {
							return function() {
								var pageChangeFlag = _79.pageChangeHandler('number',_79,arg);
								if(pageChangeFlag===false){
									return ;
								}								
								//自定义页码框回车事件 YH 2012.12.4
								var enterHandler = _6e.enterHandler ? _6e.enterHandler : null;
								if (enterHandler) {
									enterHandler(arg);
								} else {
									_76(_6c, arg);
								}
							}
						})(p)
					};
					var s_btn = $("<a href=\"javascript:void(0)\"></a>").linkbutton($.extend(btn, {
						iconCls: "icon-pager",
						plain: true
					})).bind("click", eval(btn.handler || function() {}));
					s_btn[0].innerHTML = s_btn[0].innerHTML.replace("l-btn-left", "icon-pager-left");
					s_btn.appendTo(bb.pagebuttons);
					PJF.constants.KEYBOARD_ENABLE&&s_btn.attr("tabindex", "-1");
				}
			} else {
				for (var p = (pagegroup - 1) * _79.showNumberSize + 1; p <= ((pagegroup - 1) * _79.showNumberSize + pagemode); p++) {
					var btn = {
						iconCls: "",
						text: "&nbsp;" + p,
						handler: (function(arg) {
							return function() {
								var pageChangeFlag = _79.pageChangeHandler('number',_79,arg);
								if(pageChangeFlag===false){
									return ;
								}
								//自定义页码框回车事件 YH 2012.12.4
								var enterHandler = _6e.enterHandler ? _6e.enterHandler : null;
								if (enterHandler) {
									enterHandler(arg);
								} else {
									_76(_6c, arg);
								}
							}
						})(p)
					};
					var s_btn = $("<a href=\"javascript:void(0)\"></a>").linkbutton($.extend(btn, {
						iconCls: "icon-pager",
						plain: true
					})).bind("click", eval(btn.handler || function() {}));
					s_btn[0].innerHTML = s_btn[0].innerHTML.replace("l-btn-left", "icon-pager-left");
					s_btn.appendTo(bb.pagebuttons);
					PJF.constants.KEYBOARD_ENABLE&&s_btn.attr("tabindex", "-1");
				}
			}
			_79.onPagegroupSelect.call(_6c, pagegroup);
		}
	};
	// var isTotalChange; //记录总数是否发生改变 YH 2013.2.27  取消内部全局变量 导致的bug
    // 增加needNewPager属性，是想在grid的refresh方法中重新生成pager,之所以要区分，因为下面的按钮中是分别调用_76方法和createPager方法
	function _76(_77, _78, needNewPager) {
		var _79 = $.data(_77, "pagination").options;
		// CCBS 模式只存在上下页
		if (_79.isCCBS) {
			_7b(_77, {
				pageNumber: _79.ccbsCurrentPageNumber
			});
			_79.onSelectPage.call(_77, _79.ccbsCurrentPageNumber, _79.pageSize);
			_79.pageNumber = _79.ccbsCurrentPageNumber;
			return;
		}

		var _7a = Math.ceil(_79.total / _79.pageSize) || 1;
		_79.pageNumber = _78;
		if (_79.pageNumber < 1) {
			_79.pageNumber = 1;
		}
		if (_79.pageNumber > _7a) {
			_79.pageNumber = _7a;
		}

		/*更新总共有几页*/
		_79.highPerformance&&$.data(_77, "pagination").bb.total_current.html("<span id=\"total_current\">&nbsp;&nbsp;第 "+_78+" 页,共 "+_7a+" 页</span>");

		_7b(_77, {
			pageNumber: _79.pageNumber
		});
		_79.onSelectPage.call(_77, _79.pageNumber, _79.pageSize);
		//将跳转到的页
		var jumpGroups = Math.ceil(_79.pageNumber / _79.showNumberSize);
		//更新pager 
		if(needNewPager && _79.pagegroup != jumpGroups){
			createPager(_77,_79.bb,jumpGroups,_79);
		}
	};
	// 设置间距 修改按钮padding 并设置高亮

	function adjustBtnStyle(opts, btns, totalPageNumber, currentPageNumber) {
		/*取消掉高亮设置*/
		if(opts.highPerformance || opts.isCCBS){ 
			if(opts.isCCBS){
				$("span.l-btn-text", btns.prev).css("padding-right", "5px");
				$("span.l-btn-text", btns.next).css("padding-right", "5px");
			}else{
				$("span.l-btn-text", btns.first).css("padding-right", "5px");
				$("span.l-btn-text", btns.prev).css("padding-right", "5px");
				$("span.l-btn-text", btns.next).css("padding-right", "5px");
				$("span.l-btn-text", btns.last).css("padding-right", "5px");
			}
			return;
		}
		var pageNumBtns_a = $("a.l-btn-plain", btns.pagebuttons);
		/*设置当前页按钮的索引位*/
		if (totalPageNumber) {
			if (currentPageNumber > opts.showNumberSize) {
				currentPageNumber = currentPageNumber % opts.showNumberSize;
				if (currentPageNumber) {
					currentPageNumber -= 1;
				} else {
					currentPageNumber = opts.showNumberSize - 1;
				}
			} else {
				currentPageNumber -= 1;
			}
		}
		pageNumBtns_a.each(function(item) {
			if (totalPageNumber > 1 && (currentPageNumber == item)) {
				$(pageNumBtns_a[item]).addClass('pagination_btn_hover');
			} else {
				$(pageNumBtns_a[item]).removeClass('pagination_btn_hover');
			}
			$(pageNumBtns_a[item]).css("padding-right", "3px");
		});
		var pageNumBtns_span = $("span.l-btn-text", btns.pagebuttons);
		pageNumBtns_span.each(function(item) {
			$(pageNumBtns_span[item]).css("padding-right", "5px");
		});
		$("span.l-btn-text", btns.first).css("padding-right", "5px");
		$("span.l-btn-text", btns.last).css("padding-right", "5px");
		$("span.l-btn-text", btns.prev).css("padding-right", "5px");
		$("span.l-btn-text", btns.next).css("padding-right", "5px");
	};

	function _7b(_7c, _7d) {
		var _7e = $.data(_7c, "pagination").options;
		var bb = $.data(_7c, "pagination").bb;
		$.extend(_7e, _7d || {});
		var ps = $(_7c).find("select.pagination-page-list");
		if (ps.length) {
			ps.val(_7e.pageSize + "");
			_7e.pageSize = parseInt(ps.val());
		}
		var _7f = Math.ceil(_7e.total / _7e.pageSize) || 1;
		if (_7e.pageNumber >= _7f) { //判断如果分页时记录总数变化以最大页数为准 YH 2013.2.28
			_7e.pageNumber = _7f;
			bb.num&&bb.num.val(_7f);
		} else {
			bb.num&&bb.num.val(_7e.pageNumber);
		}
		/************* 初始分页器方法的实现 YH 2012.12.6****************/
		
		if(_7e.highPerformance){
			_7e.isTotalChange = _7f;
		}else if (_7f > 1 && (_7e.isCCBS == false)) {
			//总页数大于1的时候执行
			// for CCBS
			//初始
			if (_7e.isTotalChange != _7f || _7e.pageNumber == 1) {
				bb.pagebuttons.html("");
				//总页数小于7时
				if (_7f <= _7e.showNumberSize) {
					for (var p = 1; p <= _7f; p++) {
						var btn = {
							iconCls: "",
							text: "&nbsp;" + p,
							handler: (function(arg) {
								return function() {
									var pageChangeFlag = _7e.pageChangeHandler('number',_7e,arg);
									if(pageChangeFlag===false){
										return ;
									}
									//自定义页码框回车事件 YH 2012.12.4
									var enterHandler = _7e.enterHandler ? _7e.enterHandler : null;
									if (enterHandler) {
										enterHandler(arg);
									} else {
										_76(_7c, arg);
									}
								}
							})(p)
						};
						var s_btn = $("<a href=\"javascript:void(0)\"></a>").linkbutton($.extend(btn, {
							iconCls: "icon-pager",
							plain: true
						})).bind("click", eval(btn.handler || function() {}));
						s_btn[0].innerHTML = s_btn[0].innerHTML.replace("l-btn-left", "icon-pager-left");
						s_btn.appendTo(bb.pagebuttons);
						PJF.constants.KEYBOARD_ENABLE&&s_btn.attr("tabindex", "-1");
					}
				} else {
					for (var p = 1; p <= _7e.showNumberSize; p++) {
						var btn = {
							iconCls: "",
							text: "&nbsp;" + p,
							handler: (function(arg) {
								return function() {
									var pageChangeFlag = _7e.pageChangeHandler('number',_7e,arg);
									if(pageChangeFlag===false){
										return ;
									}
									//自定义页码框回车事件 YH 2012.12.4
									var enterHandler = _7e.enterHandler ? _7e.enterHandler : null;
									if (enterHandler) {
										enterHandler(arg);
									} else {
										_76(_7c, arg);
									}
								}
							})(p)
						};
						var s_btn = $("<a href=\"javascript:void(0)\"></a>").linkbutton($.extend(btn, {
							iconCls: "icon-pager",
							plain: true
						})).bind("click", eval(btn.handler || function() {}));
						s_btn[0].innerHTML = s_btn[0].innerHTML.replace("l-btn-left", "icon-pager-left");
						s_btn.appendTo(bb.pagebuttons);
						PJF.constants.KEYBOARD_ENABLE&&s_btn.attr("tabindex", "-1");
					}
				}
			}
			_7e.isTotalChange = _7f;
		} else if (_7f == 1 && (_7e.isCCBS == false)) {
			// 修复无数据时 分页信息没有重置  for ClearData
			// by famingyuan , 2013/04/27
			_7e.isTotalChange = _7f;
			bb.pagebuttons.html("");
		}
		/*高性能模式*/
		if(_7e.highPerformance || _7e.isCCBS){
			 
			$(bb.prev[0]).html(bb.prev[0].innerHTML.replace("l-btn-left", "icon-pager-left"));
			$(bb.next[0]).html(bb.next[0].innerHTML.replace("l-btn-left", "icon-pager-left"));

			if(!_7e.isCCBS){
				$(bb.first[0]).html(bb.first[0].innerHTML.replace("l-btn-left", "icon-pager-left"));
				$(bb.last[0]).html(bb.last[0].innerHTML.replace("l-btn-left", "icon-pager-left"));
			}			

			// 针对需要隐藏的情况 CREDITCARD 信用卡隐藏上一页按钮 add 2014/06/17
			if (getHideFlag(_7e)) {
				bb.prev.css("display", "none");
			}

			_81(_7c, _7e.loading); 
			// 修改
			adjustBtnStyle(_7e, bb, _7f, _7e.pageNumber); 
			// 补充CCBS 等四种模式的情况
			if (_7e.isCCBS) {
				_7e.pageNumber = _7e.ccbsCurrentPageNumber || 1;
			}
			/*隐藏右边所有区域*/
			if(_7e.isShowPaginationArea===false){ 
				bb.paginationArea.css("display","none");
			}
 			if(_7e.isCCBS){
 				/*控制总记录数的显示*/
 				if (_7e.isShowTotal) {
					$(_7c).find("div.pagination-info").html("&nbsp;&nbsp;"+resource.GRID_LIST_TOTAL1+" <B>" + (_7e.total > 0 ? _7e.total : 0) + "</B> "+resource.GRID_LIST_UNIT);
				} else {
					$(_7c).find("div.pagination-info").html("");
				} 
 			}else{
				bb.total_current.html("<span id=\"total_current\">&nbsp;&nbsp;"+resource.GRID_LIST_INDEX+" "+_7e.pageNumber+""+resource.GRID_LIST_JUMP_2_1+""+_7f+" "+resource.GRID_LIST_JUMP_3+"</span>");	
 			}			

			return;
		}
		bb.after.html(_7e.afterPageText.replace(/{pages}/, _7f));
		var _80 = _7e.displayMsg;
		_80 = _80.replace(/{from}/, _7e.total == 0 ? 0 : _7e.pageSize * (_7e.pageNumber - 1) + 1);
		_80 = _80.replace(/{to}/, Math.min(_7e.pageSize * (_7e.pageNumber), _7e.total));
		_80 = _80.replace(/{total}/, _7e.total);
		// $(_7c).find("div.pagination-info").html(_80);
		// $(_7c).find("div.pagination-info").html("&nbsp;&nbsp;共 <B>" + (_7e.total > 0 ? _7e.total : 0) + "</B> 条");
		/*控制总记录数的显示*/
		if (_7e.isShowTotal) {
			$(_7c).find("div.pagination-info").html("&nbsp;&nbsp;"+resource.GRID_LIST_TOTAL1+" <B>" + (_7e.total > 0 ? _7e.total : 0) + "</B> "+resource.GRID_LIST_UNIT);
		} else {
			$(_7c).find("div.pagination-info").html("");
		}
        var _gridDom = $(_7c).siblings(".datagrid-view").eq(0).find("[componenttype='PJF.ui.grid'],[componenttype='PJF.ui.treegrid']")[0];
        var _gridOpt = $.data(_gridDom,'datagrid').options;

        bb.first.add(bb.prev).linkbutton({
            // for CCBS  取消掉
            disabled:_gridOpt.setPaginationStatus ? (_7e.pageNumber==1):false
        });
        bb.next.add(bb.last).linkbutton({
            // for CCBS  取消掉
            disabled:_gridOpt.setPaginationStatus ? (_7e.pageNumber==_7f):false
        });
		//替换分页器首页，上一页，下一页，末页样式 YH 2012.12.10
		$(bb.first[0]).html(bb.first[0].innerHTML.replace("l-btn-left", "icon-pager-left"));
		$(bb.prev[0]).html(bb.prev[0].innerHTML.replace("l-btn-left", "icon-pager-left"));
		$(bb.next[0]).html(bb.next[0].innerHTML.replace("l-btn-left", "icon-pager-left"));
		$(bb.last[0]).html(bb.last[0].innerHTML.replace("l-btn-left", "icon-pager-left"));

		// for CCBS
		if (_7e.isCCBS) {
			bb.first.css("display", "none");
			bb.last.css("display", "none");
			bb.refresh.css("display", "none");
			bb.num.css("display", "none");
			bb.after.css("display", "none");
			bb.selectPageButton.css("display", "none");
			if (getHideFlag(_7e)) {
				bb.prev.css("display", "none");
			}
		}
		_81(_7c, _7e.loading);

		// 修改
		adjustBtnStyle(_7e, bb, _7f, _7e.pageNumber);

		// 补充CCBS 等四种模式的情况
		if (_7e.isCCBS) {
			_7e.pageNumber = _7e.ccbsCurrentPageNumber || 1;
		}

		/*隐藏右边所有区域*/
		if(_7e.isShowPaginationArea===false){ 
			bb.paginationArea.css("display","none");
		}
	};

	function _81(_82, _83) {
		var _84 = $.data(_82, "pagination").options; 
		var bb = $.data(_82, "pagination").bb;
		_84.loading = _83;
		if(_84.highPerformance || _84.isCCBS){
			return;
		}
		if (_84.showRefresh) {
			if (_84.loading) {
				bb.refresh.linkbutton({
					iconCls: "pagination-loading"
				});
			} else {
				bb.refresh.linkbutton({
					iconCls: "pagination-load-grid"
				});
			}
		}
	};
	$.fn.pagination = function(_85, _86, needNewPager) {
		if (typeof _85 == "string") {
			return $.fn.pagination.methods[_85](this, _86, needNewPager);
		}
		_85 = _85 || {};
		return this.each(function() {
			var _87;
			var _88 = $.data(this, "pagination");
			if (_88) {
				_87 = $.extend(_88.options, _85);
			} else {
				_87 = $.extend({}, $.fn.pagination.defaults, $.fn.pagination.parseOptions(this), _85);
				$.data(this, "pagination", {
					options: _87
				});
			}
			_6b(this);
			_7b(this);
		});
	};
	$.fn.pagination.methods = {
		/**
		 * 设置上下是否启用
		 * @param {[type]} preBtnStatus  上页按钮
		 * @param {[type]} nextBtnStatus 下页按钮
		 */
		setPagBtnStatus: function(jq, btnStatus) {
			var btns = $.data(jq[0], "pagination").bb;
			(btnStatus.preBtnStatus) ? (btns.prev.linkbutton("enable")) : (btns.prev.linkbutton("disable"));
			(btnStatus.nextBtnStatus) ? (btns.next.linkbutton("enable")) : (btns.next.linkbutton("disable"));
		},
		/*用于在外部更新总记录信息*/
		updateTotalRecDesc: function(jq, newTotal) {
			$(jq[0]).find("div.pagination-info").html("&nbsp;&nbsp;"+resource.GRID_LIST_TOTAL1+" " + (newTotal > 0 ? newTotal : 0) + " "+resource.GRID_LIST_UNIT);
		},
		options: function(jq) {
			return $.data(jq[0], "pagination").options;
		},
		loading: function(jq) {
			return jq.each(function() {
				_81(this, true);
			});
		},
		loaded: function(jq) {
			return jq.each(function() {
				_81(this, false);
			});
		},
		refresh: function(jq, _89) {
			return jq.each(function() {
				_7b(this, _89);
			});
		},
		//对分页组件增加跳转页方法 YH 2012.11.27
		selectPage: function(jq, pageNumber, needNewPager) {
			return jq.each(function() {
				var _75 = parseInt(pageNumber) || 1;
				_76(this, pageNumber, needNewPager);
			});
		},
		//对分页组件增加上一页方法 YH 2012.11.27
		prevPage: function(jq) {
			return jq.each(function() {
				var _opts = $.data(this, "pagination").options;
				if (_opts.pageNumber > 1) {
					_76(this, _opts.pageNumber - 1);
				}
			});
		},
		//对分页组件增加下一页方法 YH 2012.11.27
		nextPage: function(jq) {
			return jq.each(function() {
				var _opts = $.data(this, "pagination").options;
				var _71 = Math.ceil(_opts.total / _opts.pageSize);
				if (_opts.pageNumber < _71) {
					_76(this, _opts.pageNumber + 1);
				}
			});
		},
		//对分页组件增加尾页方法 YH 2012.11.27
		lastPage: function(jq) {
			return jq.each(function() {
				var _opts = $.data(this, "pagination").options;
				var _71 = Math.ceil(_opts.total / _opts.pageSize);
				if (_opts.pageNumber < _71) {
					_76(this, _71);
				}
			});
		},
		//对分页组件增加首页方法 YH 2012.11.27
		firstPage: function(jq) {
			return jq.each(function() {
				var _opts = $.data(this, "pagination").options;
				if (_opts.pageNumber !== 1) {
					_76(this, 1);
				}
			});
		},
		//得到分页组件信息方法 YH 2012.11.27
		getPageInfo: function(jq) {
			var _opts;
			jq.each(function() {
				_opts = $.data(this, "pagination").options;
			});
			return _opts;
		},
		select: function(jq, _8a) {
			return jq.each(function() {
				_76(this, _8a);
			});
		}
	};
	$.fn.pagination.parseOptions = function(_8b) {
		var t = $(_8b);
		return $.extend({}, $.parser.parseOptions(_8b, [{
			total: "number",
			pagegroup: "number",
			pageSize: "number",
			pageNumber: "number"
		}, {
			loading: "boolean",
			showPageList: "boolean",
			showRefresh: "boolean"
		}]), {
			pageList: (t.attr("pageList") ? eval(t.attr("pageList")) : undefined)
		});
	};
	$.fn.pagination.defaults = {
		total: 1,
		pagegroup: 1,
		pageSize: 10,
		pageNumber: 1,
		pageList: [10, 20, 30, 50],
		loading: false,
		buttons: null,
		showPageList: true,
		showRefresh: true,
		onSelectPage: function(_8c, _8d) {},
		onPagegroupSelect: function(pagegroup) {},
		onBeforeRefresh: function(_8e, _8f) {},
		// add by famingyuan, 2013/03/28 清除刷新时存在的check abcd
		// 修复错误  作用域问题导致问题
		clearGridSelections: function(_6c, pageNumber, pageSize) {
			var opts = $.data(_6c, "pagination").options;
			opts.clearSelections && opts.clearSelections();
		},
		onRefresh: function(_90, _91) {},
		onChangePageSize: function(_92) {},
		beforePageText: resource.GRID_LIST_JUMP_1+" ",
		afterPageText: " "+resource.GRID_LIST_JUMP_3+" &nbsp;"+resource.GRID_LIST_TOTAL+" {pages} "+resource.GRID_LIST_JUMP_3,
		displayMsg: "显示 {from} 到 {to} 共 {total} 条记录"
	};
})(jQuery);
(function($) {
	function _93(_94) {
		var _95 = $(_94);
		_95.addClass("tree");
		return _95;
	};

	function _96(_97) {
		var _98 = [];
		_99(_98, $(_97));

		function _99(aa, _9a) {
			_9a.children("li").each(function() {
				var _9b = $(this);
				var _9c = $.extend({}, $.parser.parseOptions(this, ["id", "iconCls", "state"]), {
					checked: (_9b.attr("checked") ? true : undefined)
				});
				_9c.text = _9b.children("span").html();
				if (!_9c.text) {
					_9c.text = _9b.html();
				}
				var _9d = _9b.children("ul");
				if (_9d.length) {
					_9c.children = [];
					_99(_9c.children, _9d);
				}
				aa.push(_9c);
			});
		};
		return _98;
	};

	function _9e(_9f) {
		var _a0 = $.data(_9f, "tree").options;
		$(_9f).unbind().bind("mouseover", function(e) {
			var tt = $(e.target);
			var _a1 = tt.closest("div.tree-node");
			if (!_a1.length) {
				return;
			}
			_a1.addClass("tree-node-hover");
			if (tt.hasClass("tree-hit")) {
				if (tt.hasClass("tree-expanded")) {
					tt.addClass("tree-expanded-hover");
				} else {
					tt.addClass("tree-collapsed-hover");
				}
			}
			e.stopPropagation();
		}).bind("mouseout", function(e) {
			var tt = $(e.target);
			var _a2 = tt.closest("div.tree-node");
			if (!_a2.length) {
				return;
			}
			_a2.removeClass("tree-node-hover");
			if (tt.hasClass("tree-hit")) {
				if (tt.hasClass("tree-expanded")) {
					tt.removeClass("tree-expanded-hover");
				} else {
					tt.removeClass("tree-collapsed-hover");
				}
			}
			e.stopPropagation();
		}).bind("click", function(e) {
			var tt = $(e.target);
			var _a3 = tt.closest("div.tree-node");
			if (!_a3.length) {
				return;
			}
			if (tt.hasClass("tree-hit")) {
				_10a(_9f, _a3[0]);
				return false;
			} else {
				if (tt.hasClass("tree-checkbox")) {
					_c3(_9f, _a3[0], !tt.hasClass("tree-checkbox1"));
					return false;
				} else {
					_148(_9f, _a3[0]);
					_a0.onClick.call(_9f, _a6(_9f, _a3[0]));
				}
			}
			e.stopPropagation();
		}).bind("dblclick", function(e) {
			var _a4 = $(e.target).closest("div.tree-node");
			if (!_a4.length) {
				return;
			}
			_148(_9f, _a4[0]);
			_a0.onDblClick.call(_9f, _a6(_9f, _a4[0]));
			e.stopPropagation();
		}).bind("contextmenu", function(e) {
			var _a5 = $(e.target).closest("div.tree-node");
			if (!_a5.length) {
				return;
			}
			_a0.onContextMenu.call(_9f, e, _a6(_9f, _a5[0]));
			e.stopPropagation();
		});
	};

	function _a7(_a8) {
		var _a9 = $(_a8).find("div.tree-node");
		_a9.draggable("disable");
		_a9.css("cursor", "pointer");
	};

	function _aa(_ab) {
		var _ac = $.data(_ab, "tree").options;
		var _ad = $.data(_ab, "tree").tree;
		_ad.find("div.tree-node").draggable({
			disabled: false,
			revert: true,
			cursor: "pointer",
			proxy: function(_ae) {
				var p = $("<div class=\"tree-node-proxy tree-dnd-no\"></div>").appendTo("body");
				p.html($(_ae).find(".tree-title").html());
				p.hide();
				return p;
			},
			deltaX: 15,
			deltaY: 15,
			onBeforeDrag: function(e) {
				if ($(e.target).hasClass("tree-hit") || $(e.target).hasClass("tree-checkbox")) {
					return false;
				}
				if (e.which != 1) {
					return false;
				}
				$(this).next("ul").find("div.tree-node").droppable({
					accept: "no-accept"
				});
				var _af = $(this).find("span.tree-indent");
				if (_af.length) {
					e.data.startLeft += _af.length * _af.width();
				}
			},
			onStartDrag: function() {
				$(this).draggable("proxy").css({
					left: -10000,
					top: -10000
				});
			},
			onDrag: function(e) {
				var x1 = e.pageX,
					y1 = e.pageY,
					x2 = e.data.startX,
					y2 = e.data.startY;
				var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
				if (d > 3) {
					$(this).draggable("proxy").show();
				}
				this.pageY = e.pageY;
			},
			onStopDrag: function() {
				$(this).next("ul").find("div.tree-node").droppable({
					accept: "div.tree-node"
				});
			}
		}).droppable({
			accept: "div.tree-node",
			onDragOver: function(e, _b0) {
				var _b1 = _b0.pageY;
				var top = $(this).offset().top;
				var _b2 = top + $(this).outerHeight();
				$(_b0).draggable("proxy").removeClass("tree-dnd-no").addClass("tree-dnd-yes");
				$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
				if (_b1 > top + (_b2 - top) / 2) {
					if (_b2 - _b1 < 5) {
						$(this).addClass("tree-node-bottom");
					} else {
						$(this).addClass("tree-node-append");
					}
				} else {
					if (_b1 - top < 5) {
						$(this).addClass("tree-node-top");
					} else {
						$(this).addClass("tree-node-append");
					}
				}
			},
			onDragLeave: function(e, _b3) {
				$(_b3).draggable("proxy").removeClass("tree-dnd-yes").addClass("tree-dnd-no");
				$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
			},
			onDrop: function(e, _b4) {
				var _b5 = this;
				var _b6, _b7;
				if ($(this).hasClass("tree-node-append")) {
					_b6 = _b8;
				} else {
					_b6 = _b9;
					_b7 = $(this).hasClass("tree-node-top") ? "top" : "bottom";
				}
				_b6(_b4, _b5, _b7);
				$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
			}
		});

		function _b8(_ba, _bb) {
			if (_a6(_ab, _bb).state == "closed") {
				_102(_ab, _bb, function() {
					_bc();
				});
			} else {
				_bc();
			}

			function _bc() {
				var _bd = $(_ab).tree("pop", _ba);
				$(_ab).tree("append", {
					parent: _bb,
					data: [_bd]
				});
				_ac.onDrop.call(_ab, _bb, _bd, "append");
			};
		};

		function _b9(_be, _bf, _c0) {
			var _c1 = {};
			if (_c0 == "top") {
				_c1.before = _bf;
			} else {
				_c1.after = _bf;
			}
			var _c2 = $(_ab).tree("pop", _be);
			_c1.data = _c2;
			$(_ab).tree("insert", _c1);
			_ac.onDrop.call(_ab, _bf, _c2, _c0);
		};
	};

	function _c3(_c4, _c5, _c6) {
		var _c7 = $.data(_c4, "tree").options;
		if (!_c7.checkbox) {
			return;
		}
		var _c8 = _a6(_c4, _c5);
		if (_c7.onBeforeCheck.call(_c4, _c8, _c6) == false) {
			return;
		}
		var _c9 = $(_c5);
		var ck = _c9.find(".tree-checkbox");
		ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
		if (_c6) {
			ck.addClass("tree-checkbox1");
		} else {
			ck.addClass("tree-checkbox0");
		}
		if (_c7.cascadeCheck) {
			_ca(_c9);
			_cb(_c9);
		}
		_c7.onCheck.call(_c4, _c8, _c6);

		function _cb(_cc) {
			var _cd = _cc.next().find(".tree-checkbox");
			_cd.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
			if (_cc.find(".tree-checkbox").hasClass("tree-checkbox1")) {
				_cd.addClass("tree-checkbox1");
			} else {
				_cd.addClass("tree-checkbox0");
			}
		};

		function _ca(_ce) {
			var _cf = _115(_c4, _ce[0]);
			if (_cf) {
				var ck = $(_cf.target).find(".tree-checkbox");
				ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
				if (_d0(_ce)) {
					ck.addClass("tree-checkbox1");
				} else {
					if (_d1(_ce)) {
						ck.addClass("tree-checkbox0");
					} else {
						ck.addClass("tree-checkbox2");
					}
				}
				_ca($(_cf.target));
			}

			function _d0(n) {
				var ck = n.find(".tree-checkbox");
				if (ck.hasClass("tree-checkbox0") || ck.hasClass("tree-checkbox2")) {
					return false;
				}
				var b = true;
				n.parent().siblings().each(function() {
					if (!$(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox1")) {
						b = false;
					}
				});
				return b;
			};

			function _d1(n) {
				var ck = n.find(".tree-checkbox");
				if (ck.hasClass("tree-checkbox1") || ck.hasClass("tree-checkbox2")) {
					return false;
				}
				var b = true;
				n.parent().siblings().each(function() {
					if (!$(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox0")) {
						b = false;
					}
				});
				return b;
			};
		};
	};

	function _d2(_d3, _d4) {
		var _d5 = $.data(_d3, "tree").options;
		var _d6 = $(_d4);
		if (_d7(_d3, _d4)) {
			var ck = _d6.find(".tree-checkbox");
			if (ck.length) {
				if (ck.hasClass("tree-checkbox1")) {
					_c3(_d3, _d4, true);
				} else {
					_c3(_d3, _d4, false);
				}
			} else {
				if (_d5.onlyLeafCheck) {
					$("<span class=\"tree-checkbox tree-checkbox0\"></span>").insertBefore(_d6.find(".tree-title"));
				}
			}
		} else {
			var ck = _d6.find(".tree-checkbox");
			if (_d5.onlyLeafCheck) {
				ck.remove();
			} else {
				if (ck.hasClass("tree-checkbox1")) {
					_c3(_d3, _d4, true);
				} else {
					if (ck.hasClass("tree-checkbox2")) {
						var _d8 = true;
						var _d9 = true;
						var _da = _db(_d3, _d4);
						for (var i = 0; i < _da.length; i++) {
							if (_da[i].checked) {
								_d9 = false;
							} else {
								_d8 = false;
							}
						}
						if (_d8) {
							_c3(_d3, _d4, true);
						}
						if (_d9) {
							_c3(_d3, _d4, false);
						}
					}
				}
			}
		}
	};

	function _dc(_dd, ul, _de, _df) {
		var _e0 = $.data(_dd, "tree").options;
		_de = _e0.loadFilter.call(_dd, _de, $(ul).prev("div.tree-node")[0]);
		if (!_df) {
			$(ul).empty();
		}
		var _e1 = [];
		var _e2 = $(ul).prev("div.tree-node").find("span.tree-indent, span.tree-hit").length;
		_e3(ul, _de, _e2);
		if (_e0.dnd) {
			_aa(_dd);
		} else {
			_a7(_dd);
		}
		for (var i = 0; i < _e1.length; i++) {
			_c3(_dd, _e1[i], true);
		}
		setTimeout(function() {
			_eb(_dd, _dd);
		}, 0);
		var _e4 = null;
		if (_dd != ul) {
			var _e5 = $(ul).prev();
			_e4 = _a6(_dd, _e5[0]);
		}
		_e0.onLoadSuccess.call(_dd, _e4, _de);

		function _e3(ul, _e6, _e7) {
			for (var i = 0; i < _e6.length; i++) {
				var li = $("<li></li>").appendTo(ul);
				var _e8 = _e6[i];
				if (_e8.state != "open" && _e8.state != "closed") {
					_e8.state = "open";
				}
				var _e9 = $("<div class=\"tree-node\"></div>").appendTo(li);
				_e9.attr("node-id", _e8.id);
				$.data(_e9[0], "tree-node", {
					id: _e8.id,
					text: _e8.text,
					iconCls: _e8.iconCls,
					attributes: _e8.attributes
				});
				$("<span class=\"tree-title\"></span>").html(_e8.text).appendTo(_e9);
				if (_e0.checkbox) {
					if (_e0.onlyLeafCheck) {
						if (_e8.state == "open" && (!_e8.children || !_e8.children.length)) {
							if (_e8.checked) {
								$("<span class=\"tree-checkbox tree-checkbox1\"></span>").prependTo(_e9);
							} else {
								$("<span class=\"tree-checkbox tree-checkbox0\"></span>").prependTo(_e9);
							}
						}
					} else {
						if (_e8.checked) {
							$("<span class=\"tree-checkbox tree-checkbox1\"></span>").prependTo(_e9);
							_e1.push(_e9[0]);
						} else {
							$("<span class=\"tree-checkbox tree-checkbox0\"></span>").prependTo(_e9);
						}
					}
				}
				if (_e8.children && _e8.children.length) {
					var _ea = $("<ul></ul>").appendTo(li);
					if (_e8.state == "open") {
						$("<span class=\"tree-icon tree-folder tree-folder-open\"></span>").addClass(_e8.iconCls).prependTo(_e9);
						$("<span class=\"tree-hit tree-expanded\"></span>").prependTo(_e9);
					} else {
						$("<span class=\"tree-icon tree-folder\"></span>").addClass(_e8.iconCls).prependTo(_e9);
						$("<span class=\"tree-hit tree-collapsed\"></span>").prependTo(_e9);
						_ea.css("display", "none");
					}
					_e3(_ea, _e8.children, _e7 + 1);
				} else {
					if (_e8.state == "closed") {
						$("<span class=\"tree-icon tree-folder\"></span>").addClass(_e8.iconCls).prependTo(_e9);
						$("<span class=\"tree-hit tree-collapsed\"></span>").prependTo(_e9);
					} else {
						$("<span class=\"tree-icon tree-file\"></span>").addClass(_e8.iconCls).prependTo(_e9);
						$("<span class=\"tree-indent\"></span>").prependTo(_e9);
					}
				}
				for (var j = 0; j < _e7; j++) {
					$("<span class=\"tree-indent\"></span>").prependTo(_e9);
				}
			}
		};
	};

	function _eb(_ec, ul, _ed) {
		var _ee = $.data(_ec, "tree").options;
		if (!_ee.lines) {
			return;
		}
		if (!_ed) {
			_ed = true;
			$(_ec).find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom");
			$(_ec).find("div.tree-node").removeClass("tree-node-last tree-root-first tree-root-one");
			var _ef = $(_ec).tree("getRoots");
			if (_ef.length > 1) {
				$(_ef[0].target).addClass("tree-root-first");
			} else {
				$(_ef[0].target).addClass("tree-root-one");
			}
		}
		$(ul).children("li").each(function() {
			var _f0 = $(this).children("div.tree-node");
			var ul = _f0.next("ul");
			if (ul.length) {
				if ($(this).next().length) {
					_f1(_f0);
				}
				_eb(_ec, ul, _ed);
			} else {
				_f2(_f0);
			}
		});
		var _f3 = $(ul).children("li:last").children("div.tree-node").addClass("tree-node-last");
		_f3.children("span.tree-join").removeClass("tree-join").addClass("tree-joinbottom");

		function _f2(_f4, _f5) {
			var _f6 = _f4.find("span.tree-icon");
			_f6.prev("span.tree-indent").addClass("tree-join");
		};

		function _f1(_f7) {
			var _f8 = _f7.find("span.tree-indent, span.tree-hit").length;
			_f7.next().find("div.tree-node").each(function() {
				$(this).children("span:eq(" + (_f8 - 1) + ")").addClass("tree-line");
			});
		};
	};

	function _f9(_fa, ul, _fb, _fc) {
		var _fd = $.data(_fa, "tree").options;
		_fb = _fb || {};
		var _fe = null;
		if (_fa != ul) {
			var _ff = $(ul).prev();
			_fe = _a6(_fa, _ff[0]);
		}
		if (_fd.onBeforeLoad.call(_fa, _fe, _fb) == false) {
			return;
		}
		var _100 = $(ul).prev().children("span.tree-folder");
		_100.addClass("tree-loading");
		var _101 = _fd.loader.call(_fa, _fb, function(data) {
			_100.removeClass("tree-loading");
			_dc(_fa, ul, data);
			if (_fc) {
				_fc();
			}
		}, function() {
			_100.removeClass("tree-loading");
			_fd.onLoadError.apply(_fa, arguments);
			if (_fc) {
				_fc();
			}
		});
		if (_101 == false) {
			_100.removeClass("tree-loading");
		}
	};

	function _102(_103, _104, _105) {
		var opts = $.data(_103, "tree").options;
		var hit = $(_104).children("span.tree-hit");
		if (hit.length == 0) {
			return;
		}
		if (hit.hasClass("tree-expanded")) {
			return;
		}
		var node = _a6(_103, _104);
		if (opts.onBeforeExpand.call(_103, node) == false) {
			return;
		}
		hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
		hit.next().addClass("tree-folder-open");
		var ul = $(_104).next();
		if (ul.length) {
			if (opts.animate) {
				ul.slideDown("normal", function() {
					opts.onExpand.call(_103, node);
					if (_105) {
						_105();
					}
				});
			} else {
				ul.css("display", "block");
				opts.onExpand.call(_103, node);
				if (_105) {
					_105();
				}
			}
		} else {
			var _106 = $("<ul style=\"display:none\"></ul>").insertAfter(_104);
			_f9(_103, _106[0], {
				id: node.id
			}, function() {
				if (_106.is(":empty")) {
					_106.remove();
				}
				if (opts.animate) {
					_106.slideDown("normal", function() {
						opts.onExpand.call(_103, node);
						if (_105) {
							_105();
						}
					});
				} else {
					_106.css("display", "block");
					opts.onExpand.call(_103, node);
					if (_105) {
						_105();
					}
				}
			});
		}
	};

	function _107(_108, _109) {
		var opts = $.data(_108, "tree").options;
		var hit = $(_109).children("span.tree-hit");
		if (hit.length == 0) {
			return;
		}
		if (hit.hasClass("tree-collapsed")) {
			return;
		}
		var node = _a6(_108, _109);
		if (opts.onBeforeCollapse.call(_108, node) == false) {
			return;
		}
		hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
		hit.next().removeClass("tree-folder-open");
		var ul = $(_109).next();
		if (opts.animate) {
			ul.slideUp("normal", function() {
				opts.onCollapse.call(_108, node);
			});
		} else {
			ul.css("display", "none");
			opts.onCollapse.call(_108, node);
		}
	};

	function _10a(_10b, _10c) {
		var hit = $(_10c).children("span.tree-hit");
		if (hit.length == 0) {
			return;
		}
		if (hit.hasClass("tree-expanded")) {
			_107(_10b, _10c);
		} else {
			_102(_10b, _10c);
		}
	};

	function _10d(_10e, _10f) {
		var _110 = _db(_10e, _10f);
		if (_10f) {
			_110.unshift(_a6(_10e, _10f));
		}
		for (var i = 0; i < _110.length; i++) {
			_102(_10e, _110[i].target);
		}
	};

	function _111(_112, _113) {
		var _114 = [];
		var p = _115(_112, _113);
		while (p) {
			_114.unshift(p);
			p = _115(_112, p.target);
		}
		for (var i = 0; i < _114.length; i++) {
			_102(_112, _114[i].target);
		}
	};

	function _116(_117, _118) {
		var _119 = _db(_117, _118);
		if (_118) {
			_119.unshift(_a6(_117, _118));
		}
		for (var i = 0; i < _119.length; i++) {
			_107(_117, _119[i].target);
		}
	};

	function _11a(_11b) {
		var _11c = _11d(_11b);
		if (_11c.length) {
			return _11c[0];
		} else {
			return null;
		}
	};

	function _11d(_11e) {
		var _11f = [];
		$(_11e).children("li").each(function() {
			var node = $(this).children("div.tree-node");
			_11f.push(_a6(_11e, node[0]));
		});
		return _11f;
	};

	function _db(_120, _121) {
		var _122 = [];
		if (_121) {
			_123($(_121));
		} else {
			var _124 = _11d(_120);
			for (var i = 0; i < _124.length; i++) {
				_122.push(_124[i]);
				_123($(_124[i].target));
			}
		}

		function _123(node) {
			node.next().find("div.tree-node").each(function() {
				_122.push(_a6(_120, this));
			});
		};
		return _122;
	};

	function _115(_125, _126) {
		var ul = $(_126).parent().parent();
		if (ul[0] == _125) {
			return null;
		} else {
			return _a6(_125, ul.prev()[0]);
		}
	};

	function _127(_128, _129) {
		_129 = _129 || "checked";
		var _12a = "";
		if (_129 == "checked") {
			_12a = "span.tree-checkbox1";
		} else {
			if (_129 == "unchecked") {
				_12a = "span.tree-checkbox0";
			} else {
				if (_129 == "indeterminate") {
					_12a = "span.tree-checkbox2";
				}
			}
		}
		var _12b = [];
		$(_128).find(_12a).each(function() {
			var node = $(this).parent();
			_12b.push(_a6(_128, node[0]));
		});
		return _12b;
	};

	function _12c(_12d) {
		var node = $(_12d).find("div.tree-node-selected");
		if (node.length) {
			return _a6(_12d, node[0]);
		} else {
			return null;
		}
	};

	function _12e(_12f, _130) {
		var node = $(_130.parent);
		var ul;
		if (node.length == 0) {
			ul = $(_12f);
		} else {
			ul = node.next();
			if (ul.length == 0) {
				ul = $("<ul></ul>").insertAfter(node);
			}
		}
		if (_130.data && _130.data.length) {
			var _131 = node.find("span.tree-icon");
			if (_131.hasClass("tree-file")) {
				_131.removeClass("tree-file").addClass("tree-folder");
				var hit = $("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_131);
				if (hit.prev().length) {
					hit.prev().remove();
				}
			}
		}
		_dc(_12f, ul[0], _130.data, true);
		_d2(_12f, ul.prev());
	};

	function _132(_133, _134) {
		var ref = _134.before || _134.after;
		var _135 = _115(_133, ref);
		var li;
		if (_135) {
			_12e(_133, {
				parent: _135.target,
				data: [_134.data]
			});
			li = $(_135.target).next().children("li:last");
		} else {
			_12e(_133, {
				parent: null,
				data: [_134.data]
			});
			li = $(_133).children("li:last");
		}
		if (_134.before) {
			li.insertBefore($(ref).parent());
		} else {
			li.insertAfter($(ref).parent());
		}
	};

	function _136(_137, _138) {
		var _139 = _115(_137, _138);
		var node = $(_138);
		var li = node.parent();
		var ul = li.parent();
		li.remove();
		if (ul.children("li").length == 0) {
			var node = ul.prev();
			node.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
			node.find(".tree-hit").remove();
			$("<span class=\"tree-indent\"></span>").prependTo(node);
			if (ul[0] != _137) {
				ul.remove();
			}
		}
		if (_139) {
			_d2(_137, _139.target);
		}
		_eb(_137, _137);
	};

	function _13a(_13b, _13c) {
		function _13d(aa, ul) {
			ul.children("li").each(function() {
				var node = $(this).children("div.tree-node");
				var _13e = _a6(_13b, node[0]);
				var sub = $(this).children("ul");
				if (sub.length) {
					_13e.children = [];
					_13d(_13e.children, sub);
				}
				aa.push(_13e);
			});
		};
		if (_13c) {
			var _13f = _a6(_13b, _13c);
			_13f.children = [];
			_13d(_13f.children, $(_13c).next());
			return _13f;
		} else {
			return null;
		}
	};

	function _140(_141, _142) {
		var node = $(_142.target);
		var _143 = _a6(_141, _142.target);
		if (_143.iconCls) {
			node.find(".tree-icon").removeClass(_143.iconCls);
		}
		var data = $.extend({}, _143, _142);
		$.data(_142.target, "tree-node", data);
		node.attr("node-id", data.id);
		node.find(".tree-title").html(data.text);
		if (data.iconCls) {
			node.find(".tree-icon").addClass(data.iconCls);
		}
		if (_143.checked != data.checked) {
			_c3(_141, _142.target, data.checked);
		}
	};

	function _a6(_144, _145) {
		var node = $.extend({}, $.data(_145, "tree-node"), {
			target: _145,
			checked: $(_145).find(".tree-checkbox").hasClass("tree-checkbox1")
		});
		if (!_d7(_144, _145)) {
			node.state = $(_145).find(".tree-hit").hasClass("tree-expanded") ? "open" : "closed";
		}
		return node;
	};

	function _146(_147, id) {
		var node = $(_147).find("div.tree-node[node-id=" + id + "]");
		if (node.length) {
			return _a6(_147, node[0]);
		} else {
			return null;
		}
	};

	function _148(_149, _14a) {
		var opts = $.data(_149, "tree").options;
		var node = _a6(_149, _14a);
		if (opts.onBeforeSelect.call(_149, node) == false) {
			return;
		}
		$("div.tree-node-selected", _149).removeClass("tree-node-selected");
		$(_14a).addClass("tree-node-selected");
		opts.onSelect.call(_149, node);
	};

	function _d7(_14b, _14c) {
		var node = $(_14c);
		var hit = node.children("span.tree-hit");
		return hit.length == 0;
	};

	function _14d(_14e, _14f) {
		var opts = $.data(_14e, "tree").options;
		var node = _a6(_14e, _14f);
		if (opts.onBeforeEdit.call(_14e, node) == false) {
			return;
		}
		$(_14f).css("position", "relative");
		var nt = $(_14f).find(".tree-title");
		var _150 = nt.outerWidth();
		nt.empty();
		var _151 = $("<input class=\"tree-editor\">").appendTo(nt);
		_151.val(node.text).focus();
		_151.width(_150 + 20);
		_151.height(document.compatMode == "CSS1Compat" ? (18 - (_151.outerHeight() - _151.height())) : 18);
		_151.bind("click", function(e) {
			return false;
		}).bind("mousedown", function(e) {
			e.stopPropagation();
		}).bind("mousemove", function(e) {
			e.stopPropagation();
		}).bind("keydown", function(e) {
			if (e.keyCode == 13) {
				_152(_14e, _14f);
				return false;
			} else {
				if (e.keyCode == 27) {
					_156(_14e, _14f);
					return false;
				}
			}
		}).bind("blur", function(e) {
			e.stopPropagation();
			_152(_14e, _14f);
		});
	};

	function _152(_153, _154) {
		var opts = $.data(_153, "tree").options;
		$(_154).css("position", "");
		var _155 = $(_154).find("input.tree-editor");
		var val = _155.val();
		_155.remove();
		var node = _a6(_153, _154);
		node.text = val;
		_140(_153, node);
		opts.onAfterEdit.call(_153, node);
	};

	function _156(_157, _158) {
		var opts = $.data(_157, "tree").options;
		$(_158).css("position", "");
		$(_158).find("input.tree-editor").remove();
		var node = _a6(_157, _158);
		_140(_157, node);
		opts.onCancelEdit.call(_157, node);
	};
	$.fn.tree = function(_159, _15a) {
		if (typeof _159 == "string") {
			return $.fn.tree.methods[_159](this, _15a);
		}
		var _159 = _159 || {};
		return this.each(function() {
			var _15b = $.data(this, "tree");
			var opts;
			if (_15b) {
				opts = $.extend(_15b.options, _159);
				_15b.options = opts;
			} else {
				opts = $.extend({}, $.fn.tree.defaults, $.fn.tree.parseOptions(this), _159);
				$.data(this, "tree", {
					options: opts,
					tree: _93(this)
				});
				var data = _96(this);
				if (data.length && !opts.data) {
					opts.data = data;
				}
			}
			_9e(this);
			if (opts.lines) {
				$(this).addClass("tree-lines");
			}
			if (opts.data) {
				_dc(this, this, opts.data);
			} else {
				if (opts.dnd) {
					_aa(this);
				} else {
					_a7(this);
				}
			}
			_f9(this, this);
		});
	};
	$.fn.tree.methods = {
		options: function(jq) {
			return $.data(jq[0], "tree").options;
		},
		loadData: function(jq, data) {
			return jq.each(function() {
				_dc(this, this, data);
			});
		},
		getNode: function(jq, _15c) {
			return _a6(jq[0], _15c);
		},
		getData: function(jq, _15d) {
			return _13a(jq[0], _15d);
		},
		reload: function(jq, _15e) {
			return jq.each(function() {
				if (_15e) {
					var node = $(_15e);
					var hit = node.children("span.tree-hit");
					hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
					node.next().remove();
					_102(this, _15e);
				} else {
					$(this).empty();
					_f9(this, this);
				}
			});
		},
		getRoot: function(jq) {
			return _11a(jq[0]);
		},
		getRoots: function(jq) {
			return _11d(jq[0]);
		},
		getParent: function(jq, _15f) {
			return _115(jq[0], _15f);
		},
		getChildren: function(jq, _160) {
			return _db(jq[0], _160);
		},
		getChecked: function(jq, _161) {
			return _127(jq[0], _161);
		},
		getSelected: function(jq) {
			return _12c(jq[0]);
		},
		isLeaf: function(jq, _162) {
			return _d7(jq[0], _162);
		},
		find: function(jq, id) {
			return _146(jq[0], id);
		},
		select: function(jq, _163) {
			return jq.each(function() {
				_148(this, _163);
			});
		},
		check: function(jq, _164) {
			return jq.each(function() {
				_c3(this, _164, true);
			});
		},
		uncheck: function(jq, _165) {
			return jq.each(function() {
				_c3(this, _165, false);
			});
		},
		collapse: function(jq, _166) {
			return jq.each(function() {
				_107(this, _166);
			});
		},
		expand: function(jq, _167) {
			return jq.each(function() {
				_102(this, _167);
			});
		},
		collapseAll: function(jq, _168) {
			return jq.each(function() {
				_116(this, _168);
			});
		},
		expandAll: function(jq, _169) {
			return jq.each(function() {
				_10d(this, _169);
			});
		},
		expandTo: function(jq, _16a) {
			return jq.each(function() {
				_111(this, _16a);
			});
		},
		toggle: function(jq, _16b) {
			return jq.each(function() {
				_10a(this, _16b);
			});
		},
		append: function(jq, _16c) {
			return jq.each(function() {
				_12e(this, _16c);
			});
		},
		insert: function(jq, _16d) {
			return jq.each(function() {
				_132(this, _16d);
			});
		},
		remove: function(jq, _16e) {
			return jq.each(function() {
				_136(this, _16e);
			});
		},
		pop: function(jq, _16f) {
			var node = jq.tree("getData", _16f);
			jq.tree("remove", _16f);
			return node;
		},
		update: function(jq, _170) {
			return jq.each(function() {
				_140(this, _170);
			});
		},
		enableDnd: function(jq) {
			return jq.each(function() {
				_aa(this);
			});
		},
		disableDnd: function(jq) {
			return jq.each(function() {
				_a7(this);
			});
		},
		beginEdit: function(jq, _171) {
			return jq.each(function() {
				_14d(this, _171);
			});
		},
		endEdit: function(jq, _172) {
			return jq.each(function() {
				_152(this, _172);
			});
		},
		cancelEdit: function(jq, _173) {
			return jq.each(function() {
				_156(this, _173);
			});
		}
	};
	$.fn.tree.parseOptions = function(_174) {
		var t = $(_174);
		return $.extend({}, $.parser.parseOptions(_174, ["url", "method", {
			checkbox: "boolean",
			cascadeCheck: "boolean",
			onlyLeafCheck: "boolean"
		}, {
			animate: "boolean",
			lines: "boolean",
			dnd: "boolean"
		}]));
	};
	$.fn.tree.defaults = {
		url: null,
		method: "post",
		animate: false,
		checkbox: false,
		cascadeCheck: true,
		onlyLeafCheck: false,
		lines: false,
		dnd: false,
		data: null,
		loader: function(_175, _176, _177) {
			var opts = $(this).tree("options");
			if (!opts.url) {
				return false;
			}
			$.ajax({
				type: opts.method,
				url: opts.url,
				data: _175,
				dataType: "json",
				success: function(data) {
					_176(data);
				},
				error: function() {
					_177.apply(this, arguments);
				}
			});
		},
		loadFilter: function(data, _178) {
			return data;
		},
		onBeforeLoad: function(node, _179) {},
		onLoadSuccess: function(node, data) {},
		onLoadError: function() {},
		onClick: function(node) {},
		onDblClick: function(node) {},
		onBeforeExpand: function(node) {},
		onExpand: function(node) {},
		onBeforeCollapse: function(node) {},
		onCollapse: function(node) {},
		onBeforeCheck: function(node, _17a) {},
		onCheck: function(node, _17b) {},
		onBeforeSelect: function(node) {},
		onSelect: function(node) {},
		onContextMenu: function(e, node) {},
		onDrop: function(_17c, _17d, _17e) {},
		onBeforeEdit: function(node) {},
		onAfterEdit: function(node) {},
		onCancelEdit: function(node) {}
	};
})(jQuery);
(function($) {
	function init(_17f) {
		$(_17f).addClass("progressbar");
		$(_17f).html("<div class=\"progressbar-text\"></div><div class=\"progressbar-value\">&nbsp;</div>");
		return $(_17f);
	};

	function _180(_181, _182) {
		var opts = $.data(_181, "progressbar").options;
		var bar = $.data(_181, "progressbar").bar;
		if (_182) {
			opts.width = _182;
		}
		bar._outerWidth(opts.width);
		bar.find("div.progressbar-text").width(bar.width());
	};
	$.fn.progressbar = function(_183, _184) {
		if (typeof _183 == "string") {
			var _185 = $.fn.progressbar.methods[_183];
			if (_185) {
				return _185(this, _184);
			}
		}
		_183 = _183 || {};
		return this.each(function() {
			var _186 = $.data(this, "progressbar");
			if (_186) {
				$.extend(_186.options, _183);
			} else {
				_186 = $.data(this, "progressbar", {
					options: $.extend({}, $.fn.progressbar.defaults, $.fn.progressbar.parseOptions(this), _183),
					bar: init(this)
				});
			}
			$(this).progressbar("setValue", _186.options.value);
			_180(this);
		});
	};
	$.fn.progressbar.methods = {
		options: function(jq) {
			return $.data(jq[0], "progressbar").options;
		},
		resize: function(jq, _187) {
			return jq.each(function() {
				_180(this, _187);
			});
		},
		getValue: function(jq) {
			return $.data(jq[0], "progressbar").options.value;
		},
		setValue: function(jq, _188) {
			if (_188 < 0) {
				_188 = 0;
			}
			if (_188 > 100) {
				_188 = 100;
			}
			return jq.each(function() {
				var opts = $.data(this, "progressbar").options;
				var text = opts.text.replace(/{value}/, _188);
				var _189 = opts.value;
				opts.value = _188;
				$(this).find("div.progressbar-value").width(_188 + "%");
				$(this).find("div.progressbar-text").html(text);
				if (_189 != _188) {
					opts.onChange.call(this, _188, _189);
				}
			});
		}
	};
	$.fn.progressbar.parseOptions = function(_18a) {
		return $.extend({}, $.parser.parseOptions(_18a, ["width", "text", {
			value: "number"
		}]));
	};
	$.fn.progressbar.defaults = {
		width: "auto",
		value: 0,
		text: "{value}%",
		onChange: function(_18b, _18c) {}
	};
})(jQuery);
(function($) {
	function _18d(node) {
		node.each(function() {
			$(this).remove();
			if ($.browser.msie) {
				this.outerHTML = "";
			}
		});
	};

	function _18e(_18f, _190) {
		var opts = $.data(_18f, "panel").options;
		var _191 = $.data(_18f, "panel").panel;
		var _192 = _191.children("div.panel-header");
		var _193 = _191.children("div.panel-body");
		if (_190) {
			if (_190.width) {
				opts.width = _190.width;
			}
			if (_190.height) {
				opts.height = _190.height;
			}
			if (_190.left != null) {
				opts.left = _190.left;
			}
			if (_190.top != null) {
				opts.top = _190.top;
			}
		}
		if (opts.fit == true) {
			var p = _191.parent();
			p.addClass("panel-noscroll");
			if (p[0].tagName == "BODY") {
				$("html").addClass("panel-fit");
			}
			opts.width = p.width();
			opts.height = p.height();
		}
		_191.css({
			left: opts.left,
			top: opts.top
		});
		if (!isNaN(opts.width)) {
			_191.width(opts.width);
			_192.width(opts.width);
			_193.width(opts.width);
		} else {
			if($.browser.msie && $.browser.version < '7.0'){
				_191.width("100%");
				_192.add(_193).width("100%");
				_192.width('auto');
				_193.css("overflow","auto");
			}else{
				_191.width("auto");
				_192.add(_193).width("auto");
			}
		}
		//使panel自适应
		if($.browser.msie && $.browser.version<'7.0'){
			_192.add(_193).width("100%");
			_192.width('auto');
		}else{
			_192.add(_193).width("auto");
		}
		//_192.add(_193)._outerWidth(_191.width());
		if (!isNaN(opts.height)) {
			_191._outerHeight(opts.height);
			_193._outerHeight(_191.height() - _192._outerHeight());
		} else {
			_193.height("auto");
		}
		_191.css("height", "");
		opts.onResize.apply(_18f, [opts.width, opts.height]);
		_191.find(">div.panel-body>div").triggerHandler("_resize");
	};

	function _194(_195, _196) {
		var opts = $.data(_195, "panel").options;
		var _197 = $.data(_195, "panel").panel;
		if (_196) {
			if (_196.left != null) {
				opts.left = _196.left;
			}
			if (_196.top != null) {
				opts.top = _196.top;
			}
		}
		_197.css({
			left: opts.left,
			top: opts.top
		});
		opts.onMove.apply(_195, [opts.left, opts.top]);
	};

	function _198(_199) {
		$(_199).addClass("panel-body");
		var _19a = $("<div class=\"panel\"></div>").insertBefore(_199);
		_19a[0].appendChild(_199);
		_19a.bind("_resize", function() {
			var opts = $.data(_199, "panel").options;
			if (opts.fit == true) {
				_18e(_199);
			}
			return false;
		});
		return _19a;
	};

	function _19b(_19c) {
		var opts = $.data(_19c, "panel").options;
		var _19d = $.data(_19c, "panel").panel;
		if (opts.tools && typeof opts.tools == "string") {
			_19d.find(">div.panel-header>div.panel-tool .panel-tool-a").appendTo(opts.tools);
		}
		_18d(_19d.children("div.panel-header"));
		if (opts.title && !opts.noheader) {
			var _19e = $("<div class=\"panel-header\"><div class=\"panel-title\">" + opts.title + "</div></div>").prependTo(_19d);
			if (opts.iconCls) {
				_19e.find(".panel-title").addClass("panel-with-icon");
				$("<div class=\"panel-icon\"></div>").addClass(opts.iconCls).appendTo(_19e);
			}
			var tool = $("<div class=\"panel-tool\"></div>").appendTo(_19e);
			tool.bind("click", function(e) {
				e.stopPropagation();
			});
			if (opts.tools) {
				if (typeof opts.tools == "string") {
					$(opts.tools).children().each(function() {
						$(this).addClass($(this).attr("iconCls")).addClass("panel-tool-a").appendTo(tool);
					});
				} else {
					for (var i = 0; i < opts.tools.length; i++) {
						var t = $("<a href=\"javascript:void(0)\"></a>").addClass(opts.tools[i].iconCls).appendTo(tool);
						if (opts.tools[i].handler) {
							t.bind("click", eval(opts.tools[i].handler));
						}
					}
				}
			}
			if (opts.collapsible) {
				var collapseClassName = "panel-tool-collapse";
				if (opts.winButtConrl) {
					collapseClassName = "pjf_win_panel-tool-collapse";
				}
				$("<a class=" + '"' + collapseClassName + '"' + " href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function() {
					if (opts.collapsed == true) {
						_1b8(_19c, true);
					} else {
						_1ad(_19c, true);
					}
					return false;
				}).attr("tabindex","-1");
				/*添加文字点击收缩展开*/
				$("div.panel-title", _19e).bind("click", function() {
					if (opts.collapsed == true) {
						_1b8(_19c, true);
					} else {
						_1ad(_19c, true);
					}
					return false;
				});
			}
			if (opts.minimizable) {
				$("<a class=\"panel-tool-min\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function() {
					_1be(_19c);
					return false;
				});
			}
			if (opts.maximizable) {
				var maxClassName = "panel-tool-max";
				if (opts.winButtConrl) {
					maxClassName = "pjf_win_panel-tool-max";
				}
				$("<a class=" + '"' + maxClassName + '"' + " href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function() {
					if (opts.maximized == true) {
						_1c1(_19c);
					} else {
						_1ac(_19c);
					}
					/**最大时始终显示panel的body部分*/
					if (opts.winButtConrl) {
						$(_19c).show()
						if ($(_19c).parent().next().hasClass('window-shadow')) {
							$(_19c).parent().next().show()

						}
						//body展开后，折叠属性设置为false
						opts.collapsed = false;
					}
					return false;
				});
			}
			if (opts.closable) {
				var closeClassName = "panel-tool-close";
				if (opts.winButtConrl) {
					closeClassName = "pjf_win_panel-tool-close";
				}
				$("<a class=" + '"' + closeClassName + '"' + " href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function() {
					_19f(_19c);
					return false;
				});
			}
			_19d.children("div.panel-body").removeClass("panel-body-noheader");
		} else {
			_19d.children("div.panel-body").addClass("panel-body-noheader");
		}
	};

	function _1a0(_1a1) {
		var _1a2 = $.data(_1a1, "panel");
		if (_1a2.options.href && (!_1a2.isLoaded || !_1a2.options.cache)) {
			_1a2.isLoaded = false;
			_1a3(_1a1);
			var _1a4 = _1a2.panel.find(">div.panel-body");
			if (_1a2.options.loadingMessage) {
				_1a4.html($("<div class=\"panel-loading\"></div>").html(_1a2.options.loadingMessage));
			}
			$.ajax({
				url: _1a2.options.href,
				cache: false,
				success: function(data) {
					_1a4.html(_1a2.options.extractor.call(_1a1, data));
					if ($.parser) {
						$.parser.parse(_1a4);
					}
					_1a2.options.onLoad.apply(_1a1, arguments);
					_1a2.isLoaded = true;
					//针对window的auto情况，第一次显示完成后重新设置高宽度
					/*if($(_1a1).attr('componenttype') == 'PJF.ui.window' && !_1a2.options.notFirst){
						_1a2.options.notFirst = true;
						//若window的width为auto
						if(_1a2.options.width == 'auto'){
							$.fn.window.methods.hcenter($(_1a1));
							//auto情况下,标题在收缩时会缩紧，所以重新设置宽度
							var boardWidth = $(_1a1).width();
							_1a2.panel.children('.panel-header').css('width',boardWidth)
						}
						//若window的height为auto
						if(_1a2.options.height == 'auto')
							$.fn.window.methods.vcenter($(_1a1));			
					}*/
				}
			});
		}
	};

	function _1a3(_1a5) {
		var t = $(_1a5);
		t.find(".combo-f").each(function() {
			$(this).combo("destroy");
		});
		t.find(".m-btn").each(function() {
			$(this).menubutton("destroy");
		});
		t.find(".s-btn").each(function() {
			$(this).splitbutton("destroy");
		});
	};

	function _1a6(_1a7) {
		$(_1a7).find("div.panel:visible,div.accordion:visible,div.tabs-container:visible,div.layout:visible").each(function() {
			$(this).triggerHandler("_resize", [true]);
		});
	};

	function _1a8(_1a9, _1aa) {
		var opts = $.data(_1a9, "panel").options;
		var _1ab = $.data(_1a9, "panel").panel;
		if (_1aa != true) {
			if (opts.onBeforeOpen.call(_1a9) == false) {
				return;
			}
		}
		_1ab.show();
		opts.closed = false;
		opts.minimized = false;
		opts.onOpen.call(_1a9);
		if (opts.maximized == true) {
			opts.maximized = false;
			_1ac(_1a9);
		}
		if (opts.collapsed == true) {
			opts.collapsed = false;
			_1ad(_1a9);
		}
		if (!opts.collapsed) {
			_1a0(_1a9);
			_1a6(_1a9);
		}
	};

	function _19f(_1ae, _1af) {
		var opts = $.data(_1ae, "panel").options;
		var _1b0 = $.data(_1ae, "panel").panel;
		if (_1af != true) {
			if (opts.onBeforeClose.call(_1ae) == false) {
				return;
			}
		}
		_1b0.hide();
		opts.closed = true;
		opts.onClose.call(_1ae);
	};

	function _1b1(_1b2, _1b3) {
		var opts = $.data(_1b2, "panel").options;
		var _1b4 = $.data(_1b2, "panel").panel;
		if (_1b3 != true) {
			if (opts.onBeforeDestroy.call(_1b2) == false) {
				return;
			}
		}
		_1a3(_1b2);
		_18d(_1b4);
		opts.onDestroy.call(_1b2);
	};

	function _1ad(_1b5, _1b6) {
		var opts = $.data(_1b5, "panel").options;
		var _1b7 = $.data(_1b5, "panel").panel;
		var body = _1b7.children("div.panel-body");
		var tool = _1b7.children("div.panel-header").find("a.panel-tool-collapse");
		if (opts.collapsed == true) {
			return;
		}
		body.stop(true, true);
		if (opts.onBeforeCollapse.call(_1b5) == false) {
			return;
		}
		tool.addClass("panel-tool-expand");
		if (_1b6 == true) {
			body.slideUp("normal", function() {
				opts.collapsed = true;
				opts.onCollapse.call(_1b5);
			});
			//fixed布局 add by bhy 2015-09-06
			if(opts.position == "fixed"){
				var top_distance = parseInt(_1b7.css("top").replace("px","")) + parseInt(body.css("height").replace("px",""));
				_1b7.css("top",top_distance+"px");
				_1b7.next().css("top",top_distance+"px");
			}
		} else {
			body.hide();
			opts.collapsed = true;
			opts.onCollapse.call(_1b5);
		}
	};

	function _1b8(_1b9, _1ba) {
		var opts = $.data(_1b9, "panel").options;
		var _1bb = $.data(_1b9, "panel").panel;
		var body = _1bb.children("div.panel-body");
		var tool = _1bb.children("div.panel-header").find("a.panel-tool-collapse");
		if (opts.collapsed == false) {
			return;
		}
		body.stop(true, true);
		if (opts.onBeforeExpand.call(_1b9) == false) {
			return;
		}
		tool.removeClass("panel-tool-expand");
		if (_1ba == true) {
			//fixed布局 add by bhy 2015-09-06
			if(opts.position == "fixed"){
				var top_distance = parseInt(_1bb.css("top").replace("px","")) - parseInt(body.css("height").replace("px",""));
				_1bb.css("top",top_distance+"px");
				_1bb.next().css("top",top_distance+"px");
			}
			body.slideDown("normal", function() {
				opts.collapsed = false;
				opts.onExpand.call(_1b9);
				_1a0(_1b9);
				_1a6(_1b9);
			});
		} else {
			body.show();
			opts.collapsed = false;
			opts.onExpand.call(_1b9);
			_1a0(_1b9);
			_1a6(_1b9);
		}
	};

	function _1ac(_1bc) {
		var opts = $.data(_1bc, "panel").options;
		var _1bd = $.data(_1bc, "panel").panel;
		var tool;
		if (opts.winButtConrl) {
			tool = _1bd.children("div.panel-header").find("a.pjf_win_panel-tool-max");
		} else {
			tool = _1bd.children("div.panel-header").find("a.panel-tool-max");
		}
		if (opts.maximized == true) {
			return;
		}
		if (opts.winButtConrl) {
			tool.addClass("pjf_win_panel-tool-restore");
		} else {
			tool.addClass("panel-tool-restore");
		}
		if (!$.data(_1bc, "panel").original) {
			$.data(_1bc, "panel").original = {
				width: opts.width,
				height: opts.height,
				left: opts.left,
				top: opts.top,
				fit: opts.fit
			};
		}
		opts.left = 0;
		opts.top = 0;
		opts.fit = true;
		_18e(_1bc);
		opts.minimized = false;
		opts.maximized = true;
		opts.onMaximize.call(_1bc);
	};

	function _1be(_1bf) {
		var opts = $.data(_1bf, "panel").options;
		var _1c0 = $.data(_1bf, "panel").panel;
		_1c0.hide();
		opts.minimized = true;
		opts.maximized = false;
		opts.onMinimize.call(_1bf);
	};

	function _1c1(_1c2) {
		var opts = $.data(_1c2, "panel").options;
		var _1c3 = $.data(_1c2, "panel").panel;
		var tool = _1c3.children("div.panel-header").find("a.panel-tool-max");
		if (opts.maximized == false) {
			return;
		}
		_1c3.show();
		tool.removeClass("panel-tool-restore");
		var _1c4 = $.data(_1c2, "panel").original;
		opts.width = _1c4.width;
		opts.height = _1c4.height;
		opts.left = _1c4.left;
		opts.top = _1c4.top;
		opts.fit = _1c4.fit;
		_18e(_1c2);
		opts.minimized = false;
		opts.maximized = false;
		$.data(_1c2, "panel").original = null;
		opts.onRestore.call(_1c2);
	};

	function _1c5(_1c6) {
		var opts = $.data(_1c6, "panel").options;
		var _1c7 = $.data(_1c6, "panel").panel;
		var _1c8 = $(_1c6).panel("header");
		var body = $(_1c6).panel("body");
		_1c7.css(opts.style);
		_1c7.addClass(opts.cls);
		if (opts.border) {
			_1c8.removeClass("panel-header-noborder");
			body.removeClass("panel-body-noborder");
		} else {
			_1c8.addClass("panel-header-noborder");
			body.addClass("panel-body-noborder");
		}
		_1c8.addClass(opts.headerCls);
		body.addClass(opts.bodyCls);
		if (opts.id) {
			$(_1c6).attr("id", opts.id);
		} else {
			$(_1c6).attr("id", "");
		}
	};

	function _1c9(_1ca, _1cb) {
		$.data(_1ca, "panel").options.title = _1cb;
		$(_1ca).panel("header").find("div.panel-title").html(_1cb);
	};
	var TO = false;
	var _1cc = true;
	$(window).unbind(".panel").bind("resize.panel", function() {
		if (!_1cc) {
			return;
		}
		if (TO !== false) {
			clearTimeout(TO);
		}
		TO = setTimeout(function() {
			_1cc = false;
			var _1cd = $("body.layout");
			if (_1cd.length) {
				_1cd.layout("resize");
			} else {
				$("body").children("div.panel,div.accordion,div.tabs-container,div.layout").triggerHandler("_resize");
			}
			_1cc = true;
			TO = false;
		}, 200);
	});
	$.fn.panel = function(_1ce, _1cf) {
		if (typeof _1ce == "string") {
			return $.fn.panel.methods[_1ce](this, _1cf);
		}
		_1ce = _1ce || {};
		return this.each(function() {
			var _1d0 = $.data(this, "panel");
			var opts;
			if (_1d0) {
				opts = $.extend(_1d0.options, _1ce);
			} else {
				opts = $.extend({}, $.fn.panel.defaults, $.fn.panel.parseOptions(this), _1ce);
				$(this).attr("title", "");
				_1d0 = $.data(this, "panel", {
					options: opts,
					panel: _198(this),
					isLoaded: false
				});
			}
			if (opts.content) {
				$(this).html(opts.content);
				if ($.parser) {
					$.parser.parse(this);
				}
			}
			_19b(this);
			_1c5(this);
			if (opts.doSize == true) {
				_1d0.panel.css("display", "block");
				_18e(this);
			}
			if (opts.closed == true || opts.minimized == true) {
				_1d0.panel.hide();
			} else {
				_1a8(this);
			}
		});
	};
	$.fn.panel.methods = {
		options: function(jq) {
			return $.data(jq[0], "panel").options;
		},
		panel: function(jq) {
			return $.data(jq[0], "panel").panel;
		},
		header: function(jq) {
			return $.data(jq[0], "panel").panel.find(">div.panel-header");
		},
		body: function(jq) {
			return $.data(jq[0], "panel").panel.find(">div.panel-body");
		},
		setTitle: function(jq, _1d1) {
			return jq.each(function() {
				_1c9(this, _1d1);
			});
		},
		open: function(jq, _1d2) {
			return jq.each(function() {
				_1a8(this, _1d2);
			});
		},
		close: function(jq, _1d3) {
			return jq.each(function() {
				_19f(this, _1d3);
			});
		},
		destroy: function(jq, _1d4) {
			return jq.each(function() {
				_1b1(this, _1d4);
			});
		},
		refresh: function(jq, href) {
			return jq.each(function() {
				$.data(this, "panel").isLoaded = false;
				if (href) {
					$.data(this, "panel").options.href = href;
				}
				_1a0(this);
			});
		},
		resize: function(jq, _1d5) {
			return jq.each(function() {
				_18e(this, _1d5);
			});
		},
		move: function(jq, _1d6) {
			return jq.each(function() {
				_194(this, _1d6);
			});
		},
		maximize: function(jq) {
			return jq.each(function() {
				_1ac(this);
			});
		},
		minimize: function(jq) {
			return jq.each(function() {
				_1be(this);
			});
		},
		restore: function(jq) {
			return jq.each(function() {
				_1c1(this);
			});
		},
		collapse: function(jq, _1d7) {
			return jq.each(function() {
				_1ad(this, _1d7);
			});
		},
		expand: function(jq, _1d8) {
			return jq.each(function() {
				_1b8(this, _1d8);
			});
		}
	};
	$.fn.panel.parseOptions = function(_1d9) {
		var t = $(_1d9);
		return $.extend({}, $.parser.parseOptions(_1d9, ["id", "width", "height", "left", "top", "title", "iconCls", "cls", "headerCls", "bodyCls", "tools", "href", {
			cache: "boolean",
			fit: "boolean",
			border: "boolean",
			noheader: "boolean"
		}, {
			collapsible: "boolean",
			minimizable: "boolean",
			maximizable: "boolean"
		}, {
			closable: "boolean",
			collapsed: "boolean",
			minimized: "boolean",
			maximized: "boolean",
			closed: "boolean"
		}]), {
			loadingMessage: (t.attr("loadingMessage") != undefined ? t.attr("loadingMessage") : undefined)
		});
	};
	$.fn.panel.defaults = {
		id: null,
		title: null,
		iconCls: null,
		width: "auto",
		height: "auto",
		left: null,
		top: null,
		cls: null,
		headerCls: null,
		bodyCls: null,
		style: {},
		href: null,
		cache: true,
		fit: false,
		border: true,
		doSize: true,
		noheader: false,
		content: null,
		collapsible: false,
		minimizable: false,
		maximizable: false,
		closable: false,
		collapsed: false,
		minimized: false,
		maximized: false,
		closed: false,
		tools: null,
		href: null,
		loadingMessage: "Loading...",
		extractor: function(data) {
			var _1da = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
			var _1db = _1da.exec(data);
			if (_1db) {
				return _1db[1];
			} else {
				return data;
			}
		},
		onLoad: function() {},
		onBeforeOpen: function() {},
		onOpen: function() {},
		onBeforeClose: function() {},
		onClose: function() {},
		onBeforeDestroy: function() {},
		onDestroy: function() {},
		onResize: function(_1dc, _1dd) {},
		onMove: function(left, top) {},
		onMaximize: function() {},
		onRestore: function() {},
		onMinimize: function() {},
		onBeforeCollapse: function() {},
		onBeforeExpand: function() {},
		onCollapse: function() {},
		onExpand: function() {}
	};
})(jQuery);
(function($) {
	function _1de(_1df, _1e0) {
		var opts = $.data(_1df, "window").options;
		if (_1e0) {
			if (_1e0.width) {
				opts.width = _1e0.width;
			}
			if (_1e0.height) {
				opts.height = _1e0.height;
			}
			if (_1e0.left != null) {
				opts.left = _1e0.left;
			}
			if (_1e0.top != null) {
				opts.top = _1e0.top;
			}
		}
		$(_1df).panel("resize", opts);
	};

	function _1e1(_1e2, _1e3) {
		var _1e4 = $.data(_1e2, "window");
		if (_1e3) {
			if (_1e3.left != null) {
				_1e4.options.left = _1e3.left;
			}
			if (_1e3.top != null) {
				_1e4.options.top = _1e3.top;
			}
			//初始window时body高度小，而window的height较大时，top会产生为负，此时window就不能拖拽,故重设top为0  lingy 20131030
			if (_1e3.top && _1e3.top<0) {
				_1e4.options.top = 0;
			}
		}
		$(_1e2).panel("move", _1e4.options);
		if (_1e4.shadow) {
			_1e4.shadow.css({
				left: _1e4.options.left,
				top: _1e4.options.top
			});
		}
	};

	function _1e5(_1e6, _1e7) {
		var _1e8 = $.data(_1e6, "window");
		var opts = _1e8.options;
		var _1e9 = opts.width;
		if (isNaN(_1e9)) {
			_1e9 = _1e8.window._outerWidth();

		}
		if (opts.inline) {
			var _1ea = _1e8.window.parent();
			opts.left = (_1ea.width() - _1e9) / 2 + _1ea.scrollLeft();
		} else {
			opts.left = ($(window)._outerWidth() - _1e9) / 2 + $(document).scrollLeft();
		}
		if (_1e7) {
			_1e1(_1e6);
		}
	};

	function _1eb(_1ec, _1ed) {
		var _1ee = $.data(_1ec, "window");
		var opts = _1ee.options;
		var _1ef = opts.height;
		if (isNaN(_1ef)) {
			_1ef = _1ee.window._outerHeight();
		}
		if (opts.inline) {
			var _1f0 = _1ee.window.parent();
			opts.top = (_1f0.height() - _1ef) / 2 + _1f0.scrollTop();
		} else {
			opts.top = ($(window)._outerHeight() - _1ef) / 2 + $(document).scrollTop();
		}
		if(opts.top<0){
			opts.top=0;
		}
		if (_1ed) {
			_1e1(_1ec);
		}
	};

	function _1f1(_1f2) {
		var _1f3 = $.data(_1f2, "window");
		var win = $(_1f2).panel($.extend({}, _1f3.options, {
			border: false,
			doSize: true,
			closed: true,
			cls: "window",
			headerCls: "window-header",
			bodyCls: "window-body " + (_1f3.options.noheader ? "window-body-noheader" : ""),
			onBeforeDestroy: function() {
				if (_1f3.options.onBeforeDestroy.call(_1f2) == false) {
					return false;
				}
				if (_1f3.shadow) {
					_1f3.shadow.remove();
				}
				if (_1f3.mask) {
					_1f3.mask.remove();
				}
			},
			onClose: function() {
				if (_1f3.shadow) {
					_1f3.shadow.hide();
				}
				if (_1f3.mask) {
					_1f3.mask.hide();
				}
				_1f3.options.onClose.call(_1f2);
			},
			onOpen: function() {
				if (_1f3.mask) {
					_1f3.mask.css({
						display: "block",
						zIndex: $.fn.window.defaults.zIndex++
					});
				}
				if (_1f3.shadow) {
					_1f3.shadow.css({
						display: "block",
						zIndex: $.fn.window.defaults.zIndex++,
						left: _1f3.options.left,
						top: _1f3.options.top,
						width: _1f3.window._outerWidth(),
						height: _1f3.window._outerHeight()
					});
				}
				_1f3.window.css("z-index", $.fn.window.defaults.zIndex++);
				_1f3.options.onOpen.call(_1f2);
			},
			onResize: function(_1f4, _1f5) {
				var opts = $(this).panel("options");
				$.extend(_1f3.options, {
					width: opts.width,
					height: opts.height,
					left: opts.left,
					top: opts.top
				});
				if (_1f3.shadow) {
					_1f3.shadow.css({
						left: _1f3.options.left,
						top: _1f3.options.top,
						width: _1f3.window._outerWidth(),
						height: _1f3.window._outerHeight()
					});
				}
				_1f3.options.onResize.call(_1f2, _1f4, _1f5);
			},
			onMinimize: function() {
				if (_1f3.shadow) {
					_1f3.shadow.hide();
				}
				if (_1f3.mask) {
					_1f3.mask.hide();
				}
				_1f3.options.onMinimize.call(_1f2);
			},
			onBeforeCollapse: function() {
				if (_1f3.options.onBeforeCollapse.call(_1f2) == false) {
					return false;
				}
				if (_1f3.shadow) {
					_1f3.shadow.hide();
				}
			},
			onExpand: function() {
				if (_1f3.shadow) {
					_1f3.shadow.show();
				}
				_1f3.options.onExpand.call(_1f2);
			}
		}));
		_1f3.window = win.panel("panel");
		if (_1f3.mask) {
			_1f3.mask.remove();
		}
		if (_1f3.options.modal == true) {
			_1f3.mask = $("<div class=\"window-mask\"></div>").insertAfter(_1f3.window);
			_1f3.mask.css({
				width: (_1f3.options.inline ? _1f3.mask.parent().width() : _1f6().width),
				height: (_1f3.options.inline ? _1f3.mask.parent().height() : _1f6().height),
				display: "none"
			});
		}
		if (_1f3.shadow) {
			_1f3.shadow.remove();
		}
		if (_1f3.options.shadow == true) {
			_1f3.shadow = $("<div class=\"window-shadow\"></div>").insertAfter(_1f3.window);
			_1f3.shadow.css({
				display: "none"
			});
		}
		if (_1f3.options.left == null) {
			_1e5(_1f2);
		}
		if (_1f3.options.top == null) {
			_1eb(_1f2);
		}
		_1e1(_1f2);
		if (_1f3.options.closed == false) {
			win.window("open");
		}
	};

	function _1f7(_1f8) {
		var _1f9 = $.data(_1f8, "window");
		_1f9.window.draggable({
			handle: ">div.window-header>div.panel-title",
			// handle: null,//窗口拖动范围为 整个窗口 zhangxr 13/7/30
			disabled: _1f9.options.draggable == false,
			onStartDrag: function(e) {
				if (_1f9.mask) {
					_1f9.mask.css("z-index", $.fn.window.defaults.zIndex++);
				}
				if (_1f9.shadow) {
					_1f9.shadow.css("z-index", $.fn.window.defaults.zIndex++);
				}
				_1f9.window.css({
					"z-index":$.fn.window.defaults.zIndex++
				});
				if (!_1f9.proxy) {
					_1f9.proxy = $("<div class=\"window-proxy\"></div>").insertAfter(_1f9.window);
				}
				_1f9.proxy.css({
					display: "none",
					zIndex: $.fn.window.defaults.zIndex++,
					left: e.data.left,
					top: e.data.top
				});
				_1f9.proxy._outerWidth(_1f9.window._outerWidth());
				_1f9.proxy._outerHeight(_1f9.window._outerHeight());
				setTimeout(function() {
					if (_1f9.proxy) {
						_1f9.proxy.show();
					}
				}, 500);
			},
			onDrag: function(e) {
				_1f9.proxy.css({
					display: "block",
					left: e.data.left,
					top: e.data.top
				});
				return false;
			},
			onStopDrag: function(e) {
				_1f9.options.left = e.data.left<0?e.data.left+50:e.data.left;//使window不能完全拖拽出左边窗口（还能拖出来） lingy 20131030
				_1f9.options.top = e.data.top<0?0:e.data.top;//使window不能拖出浏览器窗口 add zhangxr 13/9/11
				$(_1f8).window("move");
				_1f9.proxy.remove();
				_1f9.proxy = null;
			}
		});
		_1f9.window.resizable({
			disabled: _1f9.options.resizable == false,
			onStartResize: function(e) {
				if (!_1f9.pmask) //若有代替窗口则不创建 zhangxr 13/6/14
				_1f9.pmask = $("<div class=\"window-proxy-mask\"></div>").insertAfter(_1f9.window);

				_1f9.pmask.css({
					zIndex: $.fn.window.defaults.zIndex++,
					left: e.data.left,
					top: e.data.top,
					width: _1f9.window._outerWidth(),
					height: _1f9.window._outerHeight()
				});
				if (!_1f9.proxy) {
					_1f9.proxy = $("<div class=\"window-proxy\"></div>").insertAfter(_1f9.window);
				}
				_1f9.proxy.css({
					zIndex: $.fn.window.defaults.zIndex++,
					left: e.data.left,
					top: e.data.top
				});
				_1f9.proxy._outerWidth(e.data.width);
				_1f9.proxy._outerHeight(e.data.height);
			},
			onResize: function(e) {
				_1f9.proxy.css({
					left: e.data.left,
					top: e.data.top
				});
				_1f9.proxy._outerWidth(e.data.width);
				_1f9.proxy._outerHeight(e.data.height);
				return false;
			},
			onStopResize: function(e) {
				$.extend(_1f9.options, {
					left: e.data.left,
					top: e.data.top<0?0:e.data.top,//向上调整window窗口尺寸时，不能拉出顶边窗口 lingy 20131030
					width: e.data.width,
					height: e.data.height
				});
				_1de(_1f8);
				_1f9.pmask.remove();
				_1f9.pmask = null;
				_1f9.proxy.remove();
				_1f9.proxy = null;
			}
		});
	};

	function _1f6() {
		if (document.compatMode == "BackCompat") {
			return {
				width: Math.max(document.body.scrollWidth, document.body.clientWidth),
				height: Math.max(document.body.scrollHeight, document.body.clientHeight)
			};
		} else {
			return {
				width: Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth),
				height: Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
			};
		}
	};
	$(window).resize(function() {
		$("body>div.window-mask").css({
			width: $(window)._outerWidth(),
			height: $(window)._outerHeight()
		});
		setTimeout(function() {
			$("body>div.window-mask").css({
				width: _1f6().width,
				height: _1f6().height
			});
		}, 50);
	});
	$.fn.window = function(_1fa, _1fb) {
		if (typeof _1fa == "string") {
			var _1fc = $.fn.window.methods[_1fa];
			if (_1fc) {
				return _1fc(this, _1fb);
			} else {
				return this.panel(_1fa, _1fb);
			}
		}
		_1fa = _1fa || {};
		return this.each(function() {
			var _1fd = $.data(this, "window");
			if (_1fd) {
				$.extend(_1fd.options, _1fa);
			} else {
				_1fd = $.data(this, "window", {
					options: $.extend({}, $.fn.window.defaults, $.fn.window.parseOptions(this), _1fa)
				});
				if (!_1fd.options.inline) {
					document.body.appendChild(this);
				}
			}
			_1f1(this);
			_1f7(this);
		});
	};
	$.fn.window.methods = {
		options: function(jq) {
			var _1fe = jq.panel("options");
			var _1ff = $.data(jq[0], "window").options;
			return $.extend(_1ff, {
				closed: _1fe.closed,
				collapsed: _1fe.collapsed,
				minimized: _1fe.minimized,
				maximized: _1fe.maximized
			});
		},
		window: function(jq) {
			return $.data(jq[0], "window").window;
		},
		resize: function(jq, _200) {
			return jq.each(function() {
				_1de(this, _200);
			});
		},
		move: function(jq, _201) {
			return jq.each(function() {
				_1e1(this, _201);
			});
		},
		hcenter: function(jq) {
			return jq.each(function() {
				_1e5(this, true);
			});
		},
		vcenter: function(jq) {
			return jq.each(function() {
				_1eb(this, true);
			});
		},
		center: function(jq) {
			return jq.each(function() {
				_1e5(this);
				_1eb(this);
				_1e1(this);
			});
		}
	};
	$.fn.window.parseOptions = function(_202) {
		return $.extend({}, $.fn.panel.parseOptions(_202), $.parser.parseOptions(_202, [{
			draggable: "boolean",
			resizable: "boolean",
			shadow: "boolean",
			modal: "boolean",
			inline: "boolean"
		}]));
	};
	$.fn.window.defaults = $.extend({}, $.fn.panel.defaults, {
		zIndex: 9000,
		draggable: true,
		resizable: true,
		shadow: true,
		modal: false,
		inline: false,
		title: "New Window",
		collapsible: false,
		minimizable: false,
		maximizable: false,
		closable: true,
		closed: false
	});
})(jQuery);
(function($) {
	function _203(_204) {
		var cp = document.createElement("div");
		while (_204.firstChild) {
			cp.appendChild(_204.firstChild);
		}
		_204.appendChild(cp);
		var _205 = $(cp);
		_205.attr("style", $(_204).attr("style"));
		$(_204).removeAttr("style").css("overflow", "hidden");
		_205.panel({
			border: false,
			doSize: false,
			bodyCls: "dialog-content"
		});
		return _205;
	};

	function _206(_207) {
		var opts = $.data(_207, "dialog").options;
		var _208 = $.data(_207, "dialog").contentPanel;
		if (opts.toolbar) {
			if (typeof opts.toolbar == "string") {
				$(opts.toolbar).addClass("dialog-toolbar").prependTo(_207);
				$(opts.toolbar).show();
			} else {
				$(_207).find("div.dialog-toolbar").remove();
				var _209 = $("<div class=\"dialog-toolbar\"></div>").prependTo(_207);
				for (var i = 0; i < opts.toolbar.length; i++) {
					var p = opts.toolbar[i];
					if (p == "-") {
						_209.append("<div class=\"dialog-tool-separator\"></div>");
					} else {
						var tool = $("<a href=\"javascript:void(0)\"></a>").appendTo(_209);
						tool.css("float", "left");
						tool[0].onclick = eval(p.handler || function() {});
						tool.linkbutton($.extend({}, p, {
							plain: true
						}));
					}
				}
				_209.append("<div style=\"clear:both\"></div>");
			}
		} else {
			$(_207).find("div.dialog-toolbar").remove();
		}
		if (opts.buttons) {
			if (typeof opts.buttons == "string") {
				$(opts.buttons).addClass("dialog-button").appendTo(_207);
				$(opts.buttons).show();
			} else {
				$(_207).find("div.dialog-button").remove();
				var _20a = $("<div class=\"dialog-button\"></div>").appendTo(_207);
				for (var i = 0; i < opts.buttons.length; i++) {
					var p = opts.buttons[i];
					var _20b = $("<a href=\"javascript:void(0)\"></a>").appendTo(_20a);
					if (p.handler) {
						_20b[0].onclick = p.handler;
					}
					_20b.linkbutton(p);
				}
			}
		} else {
			$(_207).find("div.dialog-button").remove();
		}
		var _20c = opts.href;
		var _20d = opts.content;
		opts.href = null;
		opts.content = null;
		_208.panel({
			closed: opts.closed,
			cache: opts.cache,
			href: _20c,
			content: _20d,
			onLoad: function() {
				if (opts.height == "auto") {
					$(_207).window("resize");
				}
				opts.onLoad.apply(_207, arguments);
			}
		});
		$(_207).window($.extend({}, opts, {
			onOpen: function() {
				if (_208.panel("options").closed) {
					_208.panel("open");
				}
				if (opts.onOpen) {
					opts.onOpen.call(_207);
				}
			},
			onResize: function(_20e, _20f) {
				var _210 = $(_207);
				_208.panel("panel").show();
				_208.panel("resize", {
					width: _210.width(),
					height: (_20f == "auto") ? "auto" : _210.height() - _210.children("div.dialog-toolbar")._outerHeight() - _210.children("div.dialog-button")._outerHeight()
				});
				if (opts.onResize) {
					opts.onResize.call(_207, _20e, _20f);
				}
			}
		}));
		opts.href = _20c;
		opts.content = _20d;
	};

	function _211(_212, href) {
		var _213 = $.data(_212, "dialog").contentPanel;
		_213.panel("refresh", href);
	};
	$.fn.dialog = function(_214, _215) {
		if (typeof _214 == "string") {
			var _216 = $.fn.dialog.methods[_214];
			if (_216) {
				return _216(this, _215);
			} else {
				return this.window(_214, _215);
			}
		}
		_214 = _214 || {};
		return this.each(function() {
			var _217 = $.data(this, "dialog");
			if (_217) {
				$.extend(_217.options, _214);
			} else {
				$.data(this, "dialog", {
					options: $.extend({}, $.fn.dialog.defaults, $.fn.dialog.parseOptions(this), _214),
					contentPanel: _203(this)
				});
			}
			_206(this);
		});
	};
	$.fn.dialog.methods = {
		options: function(jq) {
			var _218 = $.data(jq[0], "dialog").options;
			var _219 = jq.panel("options");
			$.extend(_218, {
				closed: _219.closed,
				collapsed: _219.collapsed,
				minimized: _219.minimized,
				maximized: _219.maximized
			});
			var _21a = $.data(jq[0], "dialog").contentPanel;
			return _218;
		},
		dialog: function(jq) {
			return jq.window("window");
		},
		refresh: function(jq, href) {
			return jq.each(function() {
				_211(this, href);
			});
		}
	};
	$.fn.dialog.parseOptions = function(_21b) {
		return $.extend({}, $.fn.window.parseOptions(_21b), $.parser.parseOptions(_21b, ["toolbar", "buttons"]));
	};
	$.fn.dialog.defaults = $.extend({}, $.fn.window.defaults, {
		title: "New Dialog",
		collapsible: false,
		minimizable: false,
		maximizable: false,
		resizable: false,
		toolbar: null,
		buttons: null
	});
})(jQuery);
(function($) {
	function show(el, type, _21c, _21d) {
		var win = $(el).window("window");
		if (!win) {
			return;
		}
		switch (type) {
			case null:
				win.show();
				break;
			case "slide":
				win.slideDown(_21c);
				break;
			case "fade":
				win.fadeIn(_21c);
				break;
			case "show":
				win.show(_21c);
				break;
		}
		var _21e = null;
		if (_21d > 0) {
			_21e = setTimeout(function() {
				hide(el, type, _21c);
			}, _21d);
		}
		win.hover(function() {
			if (_21e) {
				clearTimeout(_21e);
			}
		}, function() {
			if (_21d > 0) {
				_21e = setTimeout(function() {
					hide(el, type, _21c);
				}, _21d);
			}
		});
	};

	function hide(el, type, _21f) {
		if (el.locked == true) {
			return;
		}
		el.locked = true;
		var win = $(el).window("window");
		if (!win) {
			return;
		}
		switch (type) {
			case null:
				win.hide();
				break;
			case "slide":
				win.slideUp(_21f);
				break;
			case "fade":
				win.fadeOut(_21f);
				break;
			case "show":
				win.hide(_21f);
				break;
		}
		setTimeout(function() {
			$(el).window("destroy");
		}, _21f);
	};

	function _220(_221) {
		var opts = $.extend({}, $.fn.window.defaults, {
			collapsible: false,
			minimizable: false,
			maximizable: false,
			shadow: false,
			draggable: false,
			resizable: false,
			closed: true,
			style: {
				left: "",
				top: "",
				right: 0,
				zIndex: $.fn.window.defaults.zIndex++,
				bottom: -document.body.scrollTop - document.documentElement.scrollTop
			},
			onBeforeOpen: function() {
				show(this, opts.showType, opts.showSpeed, opts.timeout);
				return false;
			},
			onBeforeClose: function() {
				hide(this, opts.showType, opts.showSpeed);
				return false;
			}
		}, {
			title: "",
			width: 250,
			height: 100,
			showType: "slide",
			showSpeed: 600,
			msg: "",
			timeout: 4000
		}, _221);
		var win = $("<div class=\"messager-body\"></div>").html(opts.msg).appendTo("body");
		win.window(opts);
		win.window("window").css(opts.style);
		win.window("open");
		return win;
	};

	function _222(_223, _224, _225) {
		var win = $("<div class=\"messager-body\"></div>").appendTo("body");
		win.append(_224);
		if (_225) {
			var tb = $("<div class=\"messager-button\"></div>").appendTo(win);
			//修改样式  linguoyong 2013.3.5
			var icos = {
					'okBtnIcos': 'icon-confirm',
					'cancelBtnIcos': 'linkbtn_icon_canel'
			};
			for (var _226 in _225) {
				var iconCls;
				var a;
				//有图标情况，目前只有确认和取消有图标　linguoyong 2013.3.25
				if (_226) {
					if(_226.toLowerCase()==resource.MESSAGER_DEFAULTS_OK.toLowerCase()){
						iconCls　= icos.okBtnIcos;
					}
					if(_226.toLowerCase()==resource.MESSAGER_DEFAULTS_CANCEL.toLowerCase()){
						iconCls　= icos.cancelBtnIcos;
					}
					if(iconCls){
						a = '<a class="pjf_linkBtn_left linkBtn_margin" href ="javascript:void(0)"><span class="pjf_linkBtn"><span class="appendImage ' + iconCls + '"></span><span class="l-btn-text pjf_linkBtn_right">' + _226 + '</span></span></a>';
					}else{
						a = '<a class="pjf_linkBtn_left linkBtn_margin" href ="javascript:void(0)"><span class="pjf_linkBtn"><span class="l-btn-text pjf_linkBtn_right">' + _226 + '</span></span></a>';
					}
				} else {
					a = '<a class="pjf_linkBtn_left linkBtn_margin" href ="javascript:void(0)"><span class="pjf_linkBtn"><span class="l-btn-text pjf_linkBtn_right">' + _226 + '</span></span></a>';
				}
				$(a).bind("click", eval(_225[_226])).appendTo(tb);
			}
		}
		win.window({
			title: _223,
			noheader: (_223 ? false : true),
			width: 380,
			height: "auto",
			modal: true,
			collapsible: false,
			minimizable: false,
			maximizable: false,
			resizable: false,
			onClose: function() {
				setTimeout(function() {
					win.window("destroy");
				}, 100);
			}
		});
		win.window("window").addClass("messager-window");
		win.children("div.messager-button").children("a:first").focus();
		return win;
	};
	$.messager = {
		show: function(_227) {
			return _220(_227);
		},
		alert: function(_228, msg, icon, fn) {
			//修改消息样式　linguoyong 2013.6.4
			var _229 = "<div style=\"margin-top:23px;margin-left:57px;*margin-left:0px;margin-right:5px;overflow:hidden;_float:left;\">" + msg + "</div>";
			switch (icon) {
				case "error":
					_229 = "<div class=\"messager-icon messager-error\"></div>" + _229;
					break;
					//messageBox加success样式判定  linguoyong 2013.3.5
				case "success":
					_229 = "<div class=\"messager-icon messager-success\"></div>" + _229;
					break;
				case "info":
					_229 = "<div class=\"messager-icon messager-info\"></div>" + _229;
					break;
				case "question":
					_229 = "<div class=\"messager-icon messager-question\"></div>" + _229;
					break;
				case "warning":
					_229 = "<div style='position:relative;padding-left:10px'><div class=\"messager-icon messager-warning\"></div>" + _229 + "</div>";
					break;
			}
			_229 += "<div style=\"clear:both;\"/>";
			var _22a = {};
			_22a[$.messager.defaults.ok] = function() {
				win.window("close");
				if (fn) {
					fn();
					return false;
				}
			};
			var win = _222(_228, _229, _22a);
			return win;
		},
		confirm: function(_22b, msg, icon, fn) {
			//var _22c="<div class=\"messager-icon messager-question\"></div>"+"<div>"+msg+"</div>"+"<div style=\"clear:both;\"/>";
			//messager的confirm方法加图标样式判定  linguoyong 2013.4.8
			var _22c = "<div style=\"margin-top:23px;margin-left:57px;*margin-left:0px;margin-right:5px;overflow:hidden;_float:left;\">" + msg + "</div>" + "<div style=\"clear:both;\"/>";
			if (icon) {
				switch (icon) {
					case "error":
						_22c = "<div class=\"messager-icon messager-error\"></div>" + _22c;
						break;
					case "success":
						_22c = "<div class=\"messager-icon messager-success\"></div>" + _22c;
						break;
					case "info":
						_22c = "<div class=\"messager-icon messager-info\"></div>" + _22c;
						break;
					case "question":
						_22c = "<div class=\"messager-icon messager-question\"></div>" + _22c;
						break;
					case "warning":
						_22c = "<div class=\"messager-icon messager-warning\"></div>" + _22c;
						break;
				}
			} else {
				_22c = "<div class=\"messager-icon messager-question\"></div>" + _22c;
			}
			var _22d = {};
			_22d[$.messager.defaults.ok] = function() {
				win.window("close");
				if (fn) {
					fn(true);
					return false;
				}
			};
			_22d[$.messager.defaults.cancel] = function() {
				win.window("close");
				if (fn) {
					fn(false);
					return false;
				}
			};
			var win = _222(_22b, _22c, _22d);
			return win;
		},
		prompt: function(_22e, msg, fn) {
			var _22f = "<div class=\"messager-icon messager-question\"></div>" + "<div>" + msg + "</div>" + "<br/>" + "<input class=\"messager-input\" type=\"text\"/>" + "<div style=\"clear:both;\"/>";
			var _230 = {};
			_230[$.messager.defaults.ok] = function() {
				win.window("close");
				if (fn) {
					fn($(".messager-input", win).val());
					return false;
				}
			};
			_230[$.messager.defaults.cancel] = function() {
				win.window("close");
				if (fn) {
					fn();
					return false;
				}
			};
			var win = _222(_22e, _22f, _230);
			win.children("input.messager-input").focus();
			return win;
		},
		progress: function(_231) {
			var _232 = {
				bar: function() {
					return $("body>div.messager-window").find("div.messager-p-bar");
				},
				close: function() {
					var win = $("body>div.messager-window>div.messager-body");
					if (win.length) {
						win.window("close");
					}
				}
			};
			if (typeof _231 == "string") {
				var _233 = _232[_231];
				return _233();
			}
			var opts = $.extend({
				title: "",
				msg: "",
				text: undefined,
				interval: 300
			}, _231 || {});
			var _234 = "<div class=\"messager-progress\"><div class=\"messager-p-msg\"></div><div class=\"messager-p-bar\"></div></div>";
			var win = _222(opts.title, _234, null);
			win.find("div.messager-p-msg").html(opts.msg);
			var bar = win.find("div.messager-p-bar");
			bar.progressbar({
				text: opts.text
			});
			win.window({
				closable: false,
				onClose: function() {
					if (this.timer) {
						clearInterval(this.timer);
					}
					$(this).window("destroy");
				}
			});
			if (opts.interval) {
				win[0].timer = setInterval(function() {
					var v = bar.progressbar("getValue");
					v += 10;
					if (v > 100) {
						v = 0;
					}
					bar.progressbar("setValue", v);
				}, opts.interval);
			}
			return win;
		}
	};
	$.messager.defaults = {
		ok: "Ok",
		cancel: "Cancel"
	};
})(jQuery);
(function($) {
	function _235(_236) {
		var opts = $.data(_236, "accordion").options;
		var _237 = $.data(_236, "accordion").panels;
		var cc = $(_236);
		if (opts.fit == true) {
			var p = cc.parent();
			p.addClass("panel-noscroll");
			if (p[0].tagName == "BODY") {
				$("html").addClass("panel-fit");
			}
			opts.width = p.width();
			opts.height = p.height();
		}
		if (opts.width > 0) {
			cc._outerWidth(opts.width);
		}
		var _238 = "auto";
		if (opts.height > 0) {
			cc._outerHeight(opts.height);
			var _239 = _237.length ? _237[0].panel("header").css("height", "")._outerHeight() : "auto";
			var _238 = cc.height() - (_237.length - 1) * _239;
		}
		for (var i = 0; i < _237.length; i++) {
			var _23a = _237[i];
			var _23b = _23a.panel("header");
			_23b._outerHeight(_239);
			_23a.panel("resize", {
				width: cc.width(),
				height: _238
			});
		}
	};

	function _23c(_23d) {
		var _23e = $.data(_23d, "accordion").panels;
		for (var i = 0; i < _23e.length; i++) {
			var _23f = _23e[i];
			if (_23f.panel("options").collapsed == false) {
				return _23f;
			}
		}
		return null;
	};

	function _240(_241, _242) {
		var _243 = $.data(_241, "accordion").panels;
		for (var i = 0; i < _243.length; i++) {
			if (_243[i][0] == $(_242)[0]) {
				return i;
			}
		}
		return -1;
	};

	function _244(_245, _246, _247) {
		var _248 = $.data(_245, "accordion").panels;
		if (typeof _246 == "number") {
			if (_246 < 0 || _246 >= _248.length) {
				return null;
			} else {
				var _249 = _248[_246];
				if (_247) {
					_248.splice(_246, 1);
				}
				return _249;
			}
		}
		for (var i = 0; i < _248.length; i++) {
			var _249 = _248[i];
			if (_249.panel("options").title == _246) {
				if (_247) {
					_248.splice(i, 1);
				}
				return _249;
			}
		}
		return null;
	};

	function _24a(_24b) {
		var opts = $.data(_24b, "accordion").options;
		var cc = $(_24b);
		if (opts.border) {
			cc.removeClass("accordion-noborder");
		} else {
			cc.addClass("accordion-noborder");
		}
	};

	function _24c(_24d) {
		var cc = $(_24d);
		cc.addClass("accordion");
		var _24e = [];
		cc.children("div").each(function() {
			var opts = $.extend({}, $.parser.parseOptions(this), {
				selected: ($(this).attr("selected") ? true : undefined)
			});
			var pp = $(this);
			_24e.push(pp);
			_250(_24d, pp, opts);
		});
		cc.bind("_resize", function(e, _24f) {
			var opts = $.data(_24d, "accordion").options;
			if (opts.fit == true || _24f) {
				_235(_24d);
			}
			return false;
		});
		return {
			accordion: cc,
			panels: _24e
		};
	};

	function _250(_251, pp, _252) {
		pp.panel($.extend({}, _252, {
			collapsible: false,
			minimizable: false,
			maximizable: false,
			closable: false,
			doSize: false,
			collapsed: true,
			headerCls: "accordion-header",
			bodyCls: "accordion-body",
			onBeforeExpand: function() {
				var curr = _23c(_251);
				if (curr) {
					var _253 = $(curr).panel("header");
					_253.removeClass("accordion-header-selected");
					_253.find(".accordion-collapse").triggerHandler("click");
				}
				var _253 = pp.panel("header");
				_253.addClass("accordion-header-selected");
				_253.find(".accordion-collapse").removeClass("accordion-expand");
			},
			onExpand: function() {
				var opts = $.data(_251, "accordion").options;
				opts.onSelect.call(_251, pp.panel("options").title, _240(_251, this));
			},
			onBeforeCollapse: function() {
				var _254 = pp.panel("header");
				_254.removeClass("accordion-header-selected");
				_254.find(".accordion-collapse").addClass("accordion-expand");
			}
		}));
		var _255 = pp.panel("header");
		var t = $("<a class=\"accordion-collapse accordion-expand\" href=\"javascript:void(0)\"></a>").appendTo(_255.children("div.panel-tool"));
		t.bind("click", function(e) {
			var _256 = $.data(_251, "accordion").options.animate;
			_261(_251);
			if (pp.panel("options").collapsed) {
				pp.panel("expand", _256);
			} else {
				pp.panel("collapse", _256);
			}
			return false;
		});
		_255.click(function() {
			$(this).find(".accordion-collapse").triggerHandler("click");
			return false;
		});
	};

	function _257(_258, _259) {
		var _25a = _244(_258, _259);
		if (!_25a) {
			return;
		}
		var curr = _23c(_258);
		if (curr && curr[0] == _25a[0]) {
			return;
		}
		_25a.panel("header").triggerHandler("click");
	};

	function _25b(_25c) {
		var _25d = $.data(_25c, "accordion").panels;
		for (var i = 0; i < _25d.length; i++) {
			if (_25d[i].panel("options").selected) {
				_25e(i);
				return;
			}
		}
		if (_25d.length) {
			_25e(0);
		}

		function _25e(_25f) {
			var opts = $.data(_25c, "accordion").options;
			var _260 = opts.animate;
			opts.animate = false;
			_257(_25c, _25f);
			opts.animate = _260;
		};
	};

	function _261(_262) {
		var _263 = $.data(_262, "accordion").panels;
		for (var i = 0; i < _263.length; i++) {
			_263[i].stop(true, true);
		}
	};

	function add(_264, _265) {
		var opts = $.data(_264, "accordion").options;
		var _266 = $.data(_264, "accordion").panels;
		if (_265.selected == undefined) {
			_265.selected = true;
		}
		_261(_264);
		var pp = $("<div></div>").appendTo(_264);
		_266.push(pp);
		_250(_264, pp, _265);
		_235(_264);
		opts.onAdd.call(_264, _265.title, _266.length - 1);
		if (_265.selected) {
			_257(_264, _266.length - 1);
		}
	};

	function _267(_268, _269) {
		var opts = $.data(_268, "accordion").options;
		var _26a = $.data(_268, "accordion").panels;
		_261(_268);
		var _26b = _244(_268, _269);
		var _26c = _26b.panel("options").title;
		var _26d = _240(_268, _26b);
		if (opts.onBeforeRemove.call(_268, _26c, _26d) == false) {
			return;
		}
		var _26b = _244(_268, _269, true);
		if (_26b) {
			_26b.panel("destroy");
			if (_26a.length) {
				_235(_268);
				var curr = _23c(_268);
				if (!curr) {
					_257(_268, 0);
				}
			}
		}
		opts.onRemove.call(_268, _26c, _26d);
	};
	$.fn.accordion = function(_26e, _26f) {
		if (typeof _26e == "string") {
			return $.fn.accordion.methods[_26e](this, _26f);
		}
		_26e = _26e || {};
		return this.each(function() {
			var _270 = $.data(this, "accordion");
			var opts;
			if (_270) {
				opts = $.extend(_270.options, _26e);
				_270.opts = opts;
			} else {
				opts = $.extend({}, $.fn.accordion.defaults, $.fn.accordion.parseOptions(this), _26e);
				var r = _24c(this);
				$.data(this, "accordion", {
					options: opts,
					accordion: r.accordion,
					panels: r.panels
				});
			}
			_24a(this);
			_235(this);
			_25b(this);
		});
	};
	$.fn.accordion.methods = {
		options: function(jq) {
			return $.data(jq[0], "accordion").options;
		},
		panels: function(jq) {
			return $.data(jq[0], "accordion").panels;
		},
		resize: function(jq) {
			return jq.each(function() {
				_235(this);
			});
		},
		getSelected: function(jq) {
			return _23c(jq[0]);
		},
		getPanel: function(jq, _271) {
			return _244(jq[0], _271);
		},
		getPanelIndex: function(jq, _272) {
			return _240(jq[0], _272);
		},
		select: function(jq, _273) {
			return jq.each(function() {
				_257(this, _273);
			});
		},
		add: function(jq, _274) {
			return jq.each(function() {
				add(this, _274);
			});
		},
		remove: function(jq, _275) {
			return jq.each(function() {
				_267(this, _275);
			});
		}
	};
	$.fn.accordion.parseOptions = function(_276) {
		var t = $(_276);
		return $.extend({}, $.parser.parseOptions(_276, ["width", "height", {
			fit: "boolean",
			border: "boolean",
			animate: "boolean"
		}]));
	};
	$.fn.accordion.defaults = {
		width: "auto",
		height: "auto",
		fit: false,
		border: true,
		animate: true,
		onSelect: function(_277, _278) {},
		onAdd: function(_279, _27a) {},
		onBeforeRemove: function(_27b, _27c) {},
		onRemove: function(_27d, _27e) {}
	};
})(jQuery);
(function($) {
	function _27f(_280) {
		var _281 = $(_280).children("div.tabs-header");
		var _282 = 0;
		$("ul.tabs li", _281).each(function() {
			_282 += $(this).outerWidth(true);
		});
		var _283 = _281.children("div.tabs-wrap").width();
		var _284 = parseInt(_281.find("ul.tabs").css("padding-left"));
		return _282 - _283 + _284;
	};

	function _285(_286) {
		var opts = $.data(_286, "tabs").options;
		var _287 = $(_286).children("div.tabs-header");
		var tool = _287.children("div.tabs-tool");
		var _288 = _287.children("div.tabs-scroller-left");
		var _289 = _287.children("div.tabs-scroller-right");
		var wrap = _287.children("div.tabs-wrap");
		tool._outerHeight(_287.outerHeight() - (opts.plain ? 2 : 0));
		var _28a = 0;
		$("ul.tabs li", _287).each(function() {
			_28a += $(this).outerWidth(true);
		});
		var _28b = _287.width() - tool._outerWidth();
		var width = 'auto';
		if($.browser.msie && $.browser.version<'7.0'){
			width = '100%';
		}
		if (_28a > _28b) {
			_288.show();
			_289.show();
			tool.css("right", _289.outerWidth());
			wrap.css({
				marginLeft: _288.outerWidth(),
				marginRight: _289.outerWidth() + tool._outerWidth(),
				left: 0,
				width: width
			});
		} else {
			_288.hide();
			_289.hide();
			tool.css("right", 0);
			wrap.css({
				marginLeft: 0,
				marginRight: tool._outerWidth(),
				left: 0,
				width: width
			});
			wrap.scrollLeft(0);
		}
	};

	function _28c(_28d) {
		var opts = $.data(_28d, "tabs").options;
		var _28e = $(_28d).children("div.tabs-header");
		if (opts.tools) {
			if (typeof opts.tools == "string") {
				$(opts.tools).addClass("tabs-tool").appendTo(_28e);
				$(opts.tools).show();
			} else {
				_28e.children("div.tabs-tool").remove();
				var _28f = $("<div class=\"tabs-tool\"></div>").appendTo(_28e);
				for (var i = 0; i < opts.tools.length; i++) {
					var tool = $("<a href=\"javascript:void(0);\"></a>").appendTo(_28f);
					tool[0].onclick = eval(opts.tools[i].handler || function() {});
					tool.linkbutton($.extend({}, opts.tools[i], {
						plain: true
					}));
				}
			}
		} else {
			_28e.children("div.tabs-tool").remove();
		}
	};

	function _290(_291) {
		var opts = $.data(_291, "tabs").options;
		var cc = $(_291);
		if (opts.fit == true) {
			var p = cc.parent();
			p.addClass("panel-noscroll");
			if (p[0].tagName == "BODY") {
				$("html").addClass("panel-fit");
			}
			opts.width = p.width();
			opts.height = p.height();
		}
		cc.width(opts.width).height(opts.height);
		var _292 = $(_291).children("div.tabs-header");
		_292._outerWidth(opts.width);
		_285(_291);
		var _293 = $(_291).children("div.tabs-panels");
		var _294 = opts.height;
		if (!isNaN(_294)) {
			_293._outerHeight(_294 - _292.outerHeight());
		} else {
			_293.height("auto");
		}
		var _295 = opts.width;
		if (!isNaN(_295)) {
			_293._outerWidth(_295);
		} else {
			_293.width("auto");
		}
	};

	function _296(_297) {
		var opts = $.data(_297, "tabs").options;
		var tab = _298(_297);
		if (tab) {
			var _299 = $(_297).children("div.tabs-panels");
			var _29a = opts.width == "auto" ? "auto" : _299.width();
			var _29b = opts.height == "auto" ? "auto" : _299.height();
			tab.panel("resize", {
				width: _29a,
				height: _29b
			});
		}
	};

	function _29c(_29d) {
		var tabs = $.data(_29d, "tabs").tabs;
		var cc = $(_29d);
		cc.addClass("tabs-container");
		cc.wrapInner("<div class=\"tabs-panels\"/>");
		$("<div class=\"tabs-header\">" + "<div class=\"tabs-scroller-left\"></div>" + "<div class=\"tabs-scroller-right\"></div>" + "<div class=\"tabs-wrap\">" + "<ul class=\"tabs\"></ul>" + "</div>" + "</div>").prependTo(_29d);
		cc.children("div.tabs-panels").children("div").each(function(i) {
			var opts = $.extend({}, $.parser.parseOptions(this), {
				selected: ($(this).attr("selected") ? true : undefined)
			});
			var pp = $(this);
			tabs.push(pp);
			_2a3(_29d, pp, opts);
		});
		cc.children("div.tabs-header").find(".tabs-scroller-left, .tabs-scroller-right").hover(function() {
			$(this).addClass("tabs-scroller-over");
		}, function() {
			$(this).removeClass("tabs-scroller-over");
		});
		cc.bind("_resize", function(e, _29e) {
			var opts = $.data(_29d, "tabs").options;
			if (opts.fit == true || _29e) {
				_290(_29d);
				_296(_29d);
			}
			return false;
		});
	};

	function _29f(_2a0) {
		var opts = $.data(_2a0, "tabs").options;
		var _2a1 = $(_2a0).children("div.tabs-header");
		var _2a2 = $(_2a0).children("div.tabs-panels");
		if (opts.plain == true) {
			_2a1.addClass("tabs-header-plain");
		} else {
			_2a1.removeClass("tabs-header-plain");
		}
		if (opts.border == true) {
			_2a1.removeClass("tabs-header-noborder");
			_2a2.removeClass("tabs-panels-noborder");
		} else {
			_2a1.addClass("tabs-header-noborder");
			_2a2.addClass("tabs-panels-noborder");
		}
        //TODO  设置禁用
		$(".tabs-scroller-left", _2a1).unbind(".tabs").bind("click.tabs", function() {
			var wrap = $(".tabs-wrap", _2a1);
			var pos = wrap.scrollLeft() - opts.scrollIncrement;
            if( pos < wrap.scrollLeft() ){
                $(".tabs-scroller-right", _2a1).removeAttr('disabled').removeClass("tabs-right-disabled")
            };
            if( pos < 0 ){
                $(this).attr('disabled','disabled').addClass("tabs-left-disabled");
                pos = '-100';     //zws 修复无法左划到底issue 2015年7月24日14:46:35
            }else{
                $(this).removeAttr('disabled').removeClass("tabs-left-disabled");
            };
			wrap.stop().animate({   //防止动画队列堆积，只触发2次
				scrollLeft: pos
			}, opts.scrollDuration);
		});
		$(".tabs-scroller-right", _2a1).unbind(".tabs").bind("click.tabs", function() {
			var wrap = $(".tabs-wrap", _2a1);
			var pos = Math.min(wrap.scrollLeft() + opts.scrollIncrement, _27f(_2a0));
            if( pos == wrap.scrollLeft() ){
                $(this).attr('disabled','disabled').addClass('tabs-right-disabled')
                return ;
            }
            if( pos > 0 ){
                $(".tabs-scroller-left", _2a1).removeAttr('disabled').removeClass('tabs-left-disabled')
            }
            wrap.stop().animate({ //防止动画队列堆积，只触发2次
				scrollLeft: pos
			}, opts.scrollDuration);
		});
	};

	function _2a3(_2a4, pp, _2a5) {
		var _2a6 = $.data(_2a4, "tabs");
		_2a5 = _2a5 || {};
		pp.panel($.extend({}, _2a5, {
			border: false,
			noheader: true,
			closed: true,
			doSize: false,
			iconCls: (_2a5.icon ? _2a5.icon : undefined),
			onLoad: function() {
				if (_2a5.onLoad) {
					_2a5.onLoad.call(this, arguments);
				}
				_2a6.options.onLoad.call(_2a4, $(this));
			}
		}));
		var opts = pp.panel("options");
		var tabs = $(_2a4).children("div.tabs-header").find("ul.tabs");
		opts.tab = $("<li></li>").appendTo(tabs);
		opts.tab.append("<a href=\"javascript:void(0)\" class=\"tabs-inner\">" + "<span class=\"tabs-title\"></span>" + "<span class=\"tabs-icon\"></span>" + "</a><b class = \"tabs-inner\"></b>");
		opts.tab.unbind(".tabs").bind("click.tabs", {
			p: pp
		}, function(e) {
			if ($(this).hasClass("tabs-disabled")) {
				return;
			}
			_2ac(_2a4, _2a7(_2a4, e.data.p));
		}).bind("contextmenu.tabs", {
			p: pp
		}, function(e) {
			if ($(this).hasClass("tabs-disabled")) {
				return;
			}
			_2a6.options.onContextMenu.call(_2a4, e, $(this).find("span.tabs-title").html(), _2a7(_2a4, e.data.p));
		});
		_2a8(_2a4, {
			tab: pp,
			options: opts
		});
	};

	function _2a9(_2aa, _2ab) {
		var opts = $.data(_2aa, "tabs").options;
		var tabs = $.data(_2aa, "tabs").tabs;
		//注解　tab的selected为undefined 将其参数　设置为true lingy 20130813
		var pp = $("<div></div>").appendTo($(_2aa).children("div.tabs-panels"));
		tabs.push(pp);
		_2a3(_2aa, pp, _2ab);
		opts.onAdd.call(_2aa, _2ab.title, tabs.length - 1);
		_285(_2aa);
		if (_2ab.selected) {
			_2ac(_2aa, tabs.length - 1);
		}
	};

	function _2a8(_2ad, _2ae) {
		var _2af = $.data(_2ad, "tabs").selectHis;
		var pp = _2ae.tab;
		var _2b0 = pp.panel("options").title;
		pp.panel($.extend({}, _2ae.options, {
			iconCls: (_2ae.options.icon ? _2ae.options.icon : undefined)
		}));
		var opts = pp.panel("options");
		var tab = opts.tab;
		var _2b1 = tab.find("span.tabs-title");
		var _2b2 = tab.find("span.tabs-icon");
		_2b1.html(opts.title);
		_2b2.attr("class", "tabs-icon");
		tab.find("b.tabs-close").remove();
		if (opts.closable) {
			_2b1.addClass("tabs-closable");
			var _2b3 = $("<a href=\"javascript:void(0)\" class=\"tabs-close\"></a>").appendTo(tab);
			_2b3.bind("click.tabs", {
				p: pp
			}, function(e) {
				if ($(this).parent().hasClass("tabs-disabled")) {
					return;
				}
				_2b5(_2ad, _2a7(_2ad, e.data.p));
				return false;
			});
		} else {
			_2b1.removeClass("tabs-closable");
		}
		if (opts.iconCls) {
			_2b1.addClass("tabs-with-icon");
			_2b2.addClass(opts.iconCls);
		} else {
			_2b1.removeClass("tabs-with-icon");
		}
		if (_2b0 != opts.title) {
			for (var i = 0; i < _2af.length; i++) {
				if (_2af[i] == _2b0) {
					_2af[i] = opts.title;
				}
			}
		}
		tab.find("span.tabs-p-tool").remove();
		if (opts.tools) {
			var _2b4 = $("<span class=\"tabs-p-tool\"></span>").insertAfter(tab.find("a.tabs-inner"));
			if (typeof opts.tools == "string") {
				$(opts.tools).children().appendTo(_2b4);
			} else {
				for (var i = 0; i < opts.tools.length; i++) {
					var t = $("<a href=\"javascript:void(0)\"></a>").appendTo(_2b4);
					t.addClass(opts.tools[i].iconCls);
					if (opts.tools[i].handler) {
						t.bind("click", {
							handler: opts.tools[i].handler
						}, function(e) {
							if ($(this).parents("li").hasClass("tabs-disabled")) {
								return;
							}
							e.data.handler.call(this);
						});
					}
				}
			}
			var pr = _2b4.children().length * 12;
			if (opts.closable) {
				pr += 8;
			} else {
				pr -= 3;
				_2b4.css("right", "5px");
			}
			_2b1.css("padding-right", pr + "px");
		}
		_285(_2ad);
		$.data(_2ad, "tabs").options.onUpdate.call(_2ad, opts.title, _2a7(_2ad, pp));
	};

	function _2b5(_2b6, _2b7) {
		var opts = $.data(_2b6, "tabs").options;
		var tabs = $.data(_2b6, "tabs").tabs;
		var _2b8 = $.data(_2b6, "tabs").selectHis;
		if (!_2b9(_2b6, _2b7)) {
			return;
		}
		var tab = _2ba(_2b6, _2b7);
		var _2bb = tab.panel("options").title;
		var _2bc = _2a7(_2b6, tab);
		if (opts.onBeforeClose.call(_2b6, _2bb, _2bc) == false) {
			return;
		}
		var tab = _2ba(_2b6, _2b7, true);
		tab.panel("options").tab.remove();
		tab.panel("destroy");
		opts.onClose.call(_2b6, _2bb, _2bc);
		_285(_2b6);
		for (var i = 0; i < _2b8.length; i++) {
			if (_2b8[i] == _2bb) {
				_2b8.splice(i, 1);
				i--;
			}
		}
		var _2bd = _2b8.pop();
		if (_2bd) {
			_2ac(_2b6, _2bd);
		} else {
			if (tabs.length) {
				_2ac(_2b6, 0);
			}
		}
	};

	function _2ba(_2be, _2bf, _2c0) {
		var tabs = $.data(_2be, "tabs").tabs;
		if (typeof _2bf == "number") {
			if (_2bf < 0 || _2bf >= tabs.length) {
				return null;
			} else {
				var tab = tabs[_2bf];
				if (_2c0) {
					tabs.splice(_2bf, 1);
				}
				return tab;
			}
		}
		for (var i = 0; i < tabs.length; i++) {
			var tab = tabs[i];
			if (tab.panel("options").title == _2bf) {
				if (_2c0) {
					tabs.splice(i, 1);
				}
				return tab;
			}
		}
		return null;
	};

	function _2a7(_2c1, tab) {
		var tabs = $.data(_2c1, "tabs").tabs;
		for (var i = 0; i < tabs.length; i++) {
			if (tabs[i][0] == $(tab)[0]) {
				return i;
			}
		}
		return -1;
	};

	function _298(_2c2) {
		var tabs = $.data(_2c2, "tabs").tabs;
		for (var i = 0; i < tabs.length; i++) {
			var tab = tabs[i];
			if (tab.panel("options").closed == false) {
				return tab;
			}
		}
		return null;
	};

	function _2c3(_2c4) {
		var tabs = $.data(_2c4, "tabs").tabs;
		for (var i = 0; i < tabs.length; i++) {
			if (tabs[i].panel("options").selected) {
				_2ac(_2c4, i);
				return;
			}
		}
		if (tabs.length) {
			_2ac(_2c4, 0);
		}
	};

	function _2ac(_2c5, _2c6) {
		var opts = $.data(_2c5, "tabs").options;
		var tabs = $.data(_2c5, "tabs").tabs;
		var _2c7 = $.data(_2c5, "tabs").selectHis;
		if (tabs.length == 0) {
			return;
		}
		var _2c8 = _2ba(_2c5, _2c6);
		if (!_2c8) {
			return;
		}
		var _2c9 = _298(_2c5);
		if (_2c9) {
			_2c9.panel("close");
			_2c9.panel("options").tab.removeClass("tabs-selected");
		}
		_2c8.panel("open");
		var _2ca = _2c8.panel("options").title;
		_2c7.push(_2ca);
		var tab = _2c8.panel("options").tab;
		tab.addClass("tabs-selected");
		var wrap = $(_2c5).find(">div.tabs-header div.tabs-wrap");
		var _2cb = tab.position().left + wrap.scrollLeft();
		var left = _2cb - wrap.scrollLeft();
		var _2cc = left + tab.outerWidth();
		if (left < 0 || _2cc > wrap.innerWidth()) {
			var pos = Math.min(_2cb - (wrap.width() - tab.width()) / 2, _27f(_2c5));
			wrap.animate({
				scrollLeft: pos
			}, opts.scrollDuration);
		} else {
			var pos = Math.min(wrap.scrollLeft(), _27f(_2c5));
			wrap.animate({
				scrollLeft: pos
			}, opts.scrollDuration);
		}
		_296(_2c5);
		opts.onSelect.call(_2c5, _2ca, _2a7(_2c5, _2c8));
	};

	function _2b9(_2cd, _2ce) {
		return _2ba(_2cd, _2ce) != null;
	};
	$.fn.tabs = function(_2cf, _2d0) {
		if (typeof _2cf == "string") {
			return $.fn.tabs.methods[_2cf](this, _2d0);
		}
		_2cf = _2cf || {};
		return this.each(function() {
			var _2d1 = $.data(this, "tabs");
			var opts;
			if (_2d1) {
				opts = $.extend(_2d1.options, _2cf);
				_2d1.options = opts;
			} else {
				$.data(this, "tabs", {
					options: $.extend({}, $.fn.tabs.defaults, $.fn.tabs.parseOptions(this), _2cf),
					tabs: [],
					selectHis: []
				});
				_29c(this);
			}
			_28c(this);
			_29f(this);
			_290(this);
			_2c3(this);
			/*宽度bug*/
			/*宽度bug*/
			if ($(this).width() < 50) {
				var base = this;
				var number = setInterval(function() {
					var _287 = $(base).children("div.tabs-header");
					var twrap = $(_287).children("div.tabs-wrap").width();
					if (twrap > 100) {
						$(base).tabs("resize");
						var obj = $(base).tabs('getSelected');
						if (obj) {
							var title = obj.panel('options').title;
							$(base).tabs('select', title);
							clearInterval(number);
							return;
						}
					}
					if ($(base).width() < 2000) {
						$(base).tabs("resize");
					} else {
						clearInterval(number);
					}
				}, 200);
				setTimeout(function() {
					clearInterval(number);
					// $(base).tabs("add",{title:' ',content:" "});
					// setTimeout(function  () {
					// 	$(base).tabs("close",' ');
					// },2000);
				}, 1000);//change to 1 second
			}
		});
	};
	$.fn.tabs.methods = {
		options: function(jq) {
			return $.data(jq[0], "tabs").options;
		},
		tabs: function(jq) {
			return $.data(jq[0], "tabs").tabs;
		},
		resize: function(jq) {
			return jq.each(function() {
				_290(this);
				_296(this);
			});
		},
		add: function(jq, _2d2) {
			return jq.each(function() {
				_2a9(this, _2d2);
			});
		},
		close: function(jq, _2d3) {
			return jq.each(function() {
				_2b5(this, _2d3);
			});
		},
		getTab: function(jq, _2d4) {
			return _2ba(jq[0], _2d4);
		},
		getTabIndex: function(jq, tab) {
			return _2a7(jq[0], tab);
		},
		getSelected: function(jq) {
			return _298(jq[0]);
		},
		select: function(jq, _2d5) {
			return jq.each(function() {
				_2ac(this, _2d5);
			});
		},
		exists: function(jq, _2d6) {
			return _2b9(jq[0], _2d6);
		},
		update: function(jq, _2d7) {
			return jq.each(function() {
				_2a8(this, _2d7);
			});
		},
		enableTab: function(jq, _2d8) {
			return jq.each(function() {
				$(this).tabs("getTab", _2d8).panel("options").tab.removeClass("tabs-disabled");
			});
		},
		disableTab: function(jq, _2d9) {
			return jq.each(function() {
				$(this).tabs("getTab", _2d9).panel("options").tab.addClass("tabs-disabled");
			});
		}
	};
	$.fn.tabs.parseOptions = function(_2da) {
		return $.extend({}, $.parser.parseOptions(_2da, ["width", "height", "tools", {
			fit: "boolean",
			border: "boolean",
			plain: "boolean"
		}]));
	};
	$.fn.tabs.defaults = {
		width: "auto",
		height: "auto",
		plain: false,
		fit: false,
		border: true,
		tools: null,
		scrollIncrement: 100,
		scrollDuration: 400,
		onLoad: function(_2db) {},
		onSelect: function(_2dc, _2dd) {},
		onBeforeClose: function(_2de, _2df) {},
		onClose: function(_2e0, _2e1) {},
		onAdd: function(_2e2, _2e3) {},
		onUpdate: function(_2e4, _2e5) {},
		onContextMenu: function(e, _2e6, _2e7) {}
	};
})(jQuery);
(function($) {
	var _2e8 = false;

	function _2e9(_2ea) {
		var opts = $.data(_2ea, "layout").options;
		var _2eb = $.data(_2ea, "layout").panels;
		var cc = $(_2ea);
		if (opts.fit == true) {
			var p = cc.parent();
			p.addClass("panel-noscroll");
			if (p[0].tagName == "BODY") {
				$("html").addClass("panel-fit");
			}
			cc.width(p.width());
			cc.height(p.height());
		}
		var cpos = {
			top: 0,
			left: 0,
			width: cc.width(),
			height: cc.height()
		};

		function _2ec(pp) {
			if (pp.length == 0) {
				return;
			}
			pp.panel("resize", {
				width: cc.width(),
				height: pp.panel("options").height,
				left: 0,
				top: 0
			});
			cpos.top += pp.panel("options").height;
			cpos.height -= pp.panel("options").height;
		};
		if (_2f0(_2eb.expandNorth)) {
			_2ec(_2eb.expandNorth);
		} else {
			_2ec(_2eb.north);
		}

		function _2ed(pp) {
			if (pp.length == 0) {
				return;
			}
			pp.panel("resize", {
				width: cc.width(),
				height: pp.panel("options").height,
				left: 0,
				top: cc.height() - pp.panel("options").height
			});
			cpos.height -= pp.panel("options").height;
		};
		if (_2f0(_2eb.expandSouth)) {
			_2ed(_2eb.expandSouth);
		} else {
			_2ed(_2eb.south);
		}

		function _2ee(pp) {
			if (pp.length == 0) {
				return;
			}
			pp.panel("resize", {
				width: pp.panel("options").width,
				height: cpos.height,
				left: cc.width() - pp.panel("options").width,
				top: cpos.top
			});
			cpos.width -= pp.panel("options").width;
		};
		if (_2f0(_2eb.expandEast)) {
			_2ee(_2eb.expandEast);
		} else {
			_2ee(_2eb.east);
		}

		function _2ef(pp) {
			if (pp.length == 0) {
				return;
			}
			pp.panel("resize", {
				width: pp.panel("options").width,
				height: cpos.height,
				left: 0,
				top: cpos.top
			});
			cpos.left += pp.panel("options").width;
			cpos.width -= pp.panel("options").width;
		};
		if (_2f0(_2eb.expandWest)) {
			_2ef(_2eb.expandWest);
		} else {
			_2ef(_2eb.west);
		}
		_2eb.center.panel("resize", cpos);
	};

	function init(_2f1) {
		var cc = $(_2f1);
		if (cc[0].tagName == "BODY") {
			$("html").addClass("panel-fit");
		}
		cc.addClass("layout");

		function _2f2(cc) {
			cc.children("div").each(function() {
				var opts = $.parser.parseOptions(this, ["region"]);
				var r = opts.region;
				if (r == "north" || r == "south" || r == "east" || r == "west" || r == "center") {
					_2f4(_2f1, {
						region: r
					}, this);
				}
			});
		};
		cc.children("form").length ? _2f2(cc.children("form")) : _2f2(cc);
		$("<div class=\"layout-split-proxy-h\"></div>").appendTo(cc);
		$("<div class=\"layout-split-proxy-v\"></div>").appendTo(cc);
		cc.bind("_resize", function(e, _2f3) {
			var opts = $.data(_2f1, "layout").options;
			if (opts.fit == true || _2f3) {
				_2e9(_2f1);
			}
			return false;
		});
	};

	function _2f4(_2f5, _2f6, el) {
		_2f6.region = _2f6.region || "center";
		var _2f7 = $.data(_2f5, "layout").panels;
		var cc = $(_2f5);
		var dir = _2f6.region;
		if (_2f7[dir].length) {
			return;
		}
		var pp = $(el);
		if (!pp.length) {
			pp = $("<div></div>").appendTo(cc);
		}
		pp.panel($.extend({}, {
			width: (pp.length ? parseInt(pp[0].style.width) || pp.outerWidth() : "auto"),
			height: (pp.length ? parseInt(pp[0].style.height) || pp.outerHeight() : "auto"),
			split: (pp.attr("split") ? pp.attr("split") == "true" : undefined),
			doSize: false,
			cls: ("layout-panel layout-panel-" + dir),
			bodyCls: "layout-body",
			onOpen: function() {
				var _2f8 = {
					north: "up",
					south: "down",
					east: "right",
					west: "left"
				};
				if (!_2f8[dir]) {
					return;
				}
				var _2f9 = "layout-button-" + _2f8[dir];
				var tool = $(this).panel("header").children("div.panel-tool");
				if (!tool.children("a." + _2f9).length) {
					var t = $("<a href=\"javascript:void(0)\"></a>").addClass(_2f9).appendTo(tool);
					t.bind("click", {
						dir: dir
					}, function(e) {
						_305(_2f5, e.data.dir);
						return false;
					});
				}
			}
		}, _2f6));
		_2f7[dir] = pp;
		if (pp.panel("options").split) {
			var _2fa = pp.panel("panel");
			_2fa.addClass("layout-split-" + dir);
			var _2fb = "";
			if (dir == "north") {
				_2fb = "s";
			}
			if (dir == "south") {
				_2fb = "n";
			}
			if (dir == "east") {
				_2fb = "w";
			}
			if (dir == "west") {
				_2fb = "e";
			}
			_2fa.resizable({
				handles: _2fb,
				onStartResize: function(e) {
					_2e8 = true;
					if (dir == "north" || dir == "south") {
						var _2fc = $(">div.layout-split-proxy-v", _2f5);
					} else {
						var _2fc = $(">div.layout-split-proxy-h", _2f5);
					}
					var top = 0,
						left = 0,
						_2fd = 0,
						_2fe = 0;
					var pos = {
						display: "block"
					};
					if (dir == "north") {
						pos.top = parseInt(_2fa.css("top")) + _2fa.outerHeight() - _2fc.height();
						pos.left = parseInt(_2fa.css("left"));
						pos.width = _2fa.outerWidth();
						pos.height = _2fc.height();
					} else {
						if (dir == "south") {
							pos.top = parseInt(_2fa.css("top"));
							pos.left = parseInt(_2fa.css("left"));
							pos.width = _2fa.outerWidth();
							pos.height = _2fc.height();
						} else {
							if (dir == "east") {
								pos.top = parseInt(_2fa.css("top")) || 0;
								pos.left = parseInt(_2fa.css("left")) || 0;
								pos.width = _2fc.width();
								pos.height = _2fa.outerHeight();
							} else {
								if (dir == "west") {
									pos.top = parseInt(_2fa.css("top")) || 0;
									pos.left = _2fa.outerWidth() - _2fc.width();
									pos.width = _2fc.width();
									pos.height = _2fa.outerHeight();
								}
							}
						}
					}
					_2fc.css(pos);
					$("<div class=\"layout-mask\"></div>").css({
						left: 0,
						top: 0,
						width: cc.width(),
						height: cc.height()
					}).appendTo(cc);
				},
				onResize: function(e) {
					if (dir == "north" || dir == "south") {
						var _2ff = $(">div.layout-split-proxy-v", _2f5);
						_2ff.css("top", e.pageY - $(_2f5).offset().top - _2ff.height() / 2);
					} else {
						var _2ff = $(">div.layout-split-proxy-h", _2f5);
						_2ff.css("left", e.pageX - $(_2f5).offset().left - _2ff.width() / 2);
					}
					return false;
				},
				onStopResize: function() {
					$(">div.layout-split-proxy-v", _2f5).css("display", "none");
					$(">div.layout-split-proxy-h", _2f5).css("display", "none");
					var opts = pp.panel("options");
					opts.width = _2fa.outerWidth();
					opts.height = _2fa.outerHeight();
					opts.left = _2fa.css("left");
					opts.top = _2fa.css("top");
					pp.panel("resize");
					_2e9(_2f5);
					_2e8 = false;
					cc.find(">div.layout-mask").remove();
				}
			});
		}
	};

	function _300(_301, _302) {
		var _303 = $.data(_301, "layout").panels;
		if (_303[_302].length) {
			_303[_302].panel("destroy");
			_303[_302] = $();
			var _304 = "expand" + _302.substring(0, 1).toUpperCase() + _302.substring(1);
			if (_303[_304]) {
				_303[_304].panel("destroy");
				_303[_304] = undefined;
			}
		}
	};

	function _305(_306, _307, _308) {
		if (_308 == undefined) {
			_308 = "normal";
		}
		var _309 = $.data(_306, "layout").panels;
		var p = _309[_307];
		if (p.panel("options").onBeforeCollapse.call(p) == false) {
			return;
		}
		var _30a = "expand" + _307.substring(0, 1).toUpperCase() + _307.substring(1);
		if (!_309[_30a]) {
			_309[_30a] = _30b(_307);
			_309[_30a].panel("panel").click(function() {
				var _30c = _30d();
				p.panel("expand", false).panel("open").panel("resize", _30c.collapse);
				p.panel("panel").animate(_30c.expand);
				return false;
			});
		}
		var _30e = _30d();
		if (!_2f0(_309[_30a])) {
			_309.center.panel("resize", _30e.resizeC);
		}
		p.panel("panel").animate(_30e.collapse, _308, function() {
			p.panel("collapse", false).panel("close");
			_309[_30a].panel("open").panel("resize", _30e.expandP);
		});

		function _30b(dir) {
			var icon;
			if (dir == "east") {
				icon = "layout-button-left";
			} else {
				if (dir == "west") {
					icon = "layout-button-right";
				} else {
					if (dir == "north") {
						icon = "layout-button-down";
					} else {
						if (dir == "south") {
							icon = "layout-button-up";
						}
					}
				}
			}
			var p = $("<div></div>").appendTo(_306).panel({
				cls: "layout-expand",
				title: "&nbsp;",
				closed: true,
				doSize: false,
				tools: [{
					iconCls: icon,
					handler: function() {
						_30f(_306, _307);
						return false;
					}
				}]
			});
			p.panel("panel").hover(function() {
				$(this).addClass("layout-expand-over");
			}, function() {
				$(this).removeClass("layout-expand-over");
			});
			return p;
		};

		function _30d() {
			var cc = $(_306);
			if (_307 == "east") {
				return {
					resizeC: {
						width: _309.center.panel("options").width + _309["east"].panel("options").width - 28
					},
					expand: {
						left: cc.width() - _309["east"].panel("options").width
					},
					expandP: {
						top: _309["east"].panel("options").top,
						left: cc.width() - 28,
						width: 28,
						height: _309["center"].panel("options").height
					},
					collapse: {
						left: cc.width()
					}
				};
			} else {
				if (_307 == "west") {
					return {
						resizeC: {
							width: _309.center.panel("options").width + _309["west"].panel("options").width - 28,
							left: 28
						},
						expand: {
							left: 0
						},
						expandP: {
							left: 0,
							top: _309["west"].panel("options").top,
							width: 28,
							height: _309["center"].panel("options").height
						},
						collapse: {
							left: -_309["west"].panel("options").width
						}
					};
				} else {
					if (_307 == "north") {
						var hh = cc.height() - 28;
						if (_2f0(_309.expandSouth)) {
							hh -= _309.expandSouth.panel("options").height;
						} else {
							if (_2f0(_309.south)) {
								hh -= _309.south.panel("options").height;
							}
						}
						_309.east.panel("resize", {
							top: 28,
							height: hh
						});
						_309.west.panel("resize", {
							top: 28,
							height: hh
						});
						if (_2f0(_309.expandEast)) {
							_309.expandEast.panel("resize", {
								top: 28,
								height: hh
							});
						}
						if (_2f0(_309.expandWest)) {
							_309.expandWest.panel("resize", {
								top: 28,
								height: hh
							});
						}
						return {
							resizeC: {
								top: 28,
								height: hh
							},
							expand: {
								top: 0
							},
							expandP: {
								top: 0,
								left: 0,
								width: cc.width(),
								height: 28
							},
							collapse: {
								top: -_309["north"].panel("options").height
							}
						};
					} else {
						if (_307 == "south") {
							var hh = cc.height() - 28;
							if (_2f0(_309.expandNorth)) {
								hh -= _309.expandNorth.panel("options").height;
							} else {
								if (_2f0(_309.north)) {
									hh -= _309.north.panel("options").height;
								}
							}
							_309.east.panel("resize", {
								height: hh
							});
							_309.west.panel("resize", {
								height: hh
							});
							if (_2f0(_309.expandEast)) {
								_309.expandEast.panel("resize", {
									height: hh
								});
							}
							if (_2f0(_309.expandWest)) {
								_309.expandWest.panel("resize", {
									height: hh
								});
							}
							return {
								resizeC: {
									height: hh
								},
								expand: {
									top: cc.height() - _309["south"].panel("options").height
								},
								expandP: {
									top: cc.height() - 28,
									left: 0,
									width: cc.width(),
									height: 28
								},
								collapse: {
									top: cc.height()
								}
							};
						}
					}
				}
			}
		};
	};

	function _30f(_310, _311) {
		var _312 = $.data(_310, "layout").panels;
		var _313 = _314();
		var p = _312[_311];
		if (p.panel("options").onBeforeExpand.call(p) == false) {
			return;
		}
		var _315 = "expand" + _311.substring(0, 1).toUpperCase() + _311.substring(1);
		_312[_315].panel("close");
		p.panel("panel").stop(true, true);
		p.panel("expand", false).panel("open").panel("resize", _313.collapse);
		p.panel("panel").animate(_313.expand, function() {
			_2e9(_310);
		});

		function _314() {
			var cc = $(_310);
			if (_311 == "east" && _312.expandEast) {
				return {
					collapse: {
						left: cc.width()
					},
					expand: {
						left: cc.width() - _312["east"].panel("options").width
					}
				};
			} else {
				if (_311 == "west" && _312.expandWest) {
					return {
						collapse: {
							left: -_312["west"].panel("options").width
						},
						expand: {
							left: 0
						}
					};
				} else {
					if (_311 == "north" && _312.expandNorth) {
						return {
							collapse: {
								top: -_312["north"].panel("options").height
							},
							expand: {
								top: 0
							}
						};
					} else {
						if (_311 == "south" && _312.expandSouth) {
							return {
								collapse: {
									top: cc.height()
								},
								expand: {
									top: cc.height() - _312["south"].panel("options").height
								}
							};
						}
					}
				}
			}
		};
	};

	function _316(_317) {
		var _318 = $.data(_317, "layout").panels;
		var cc = $(_317);
		if (_318.east.length) {
			_318.east.panel("panel").bind("mouseover", "east", _319);
		}
		if (_318.west.length) {
			_318.west.panel("panel").bind("mouseover", "west", _319);
		}
		if (_318.north.length) {
			_318.north.panel("panel").bind("mouseover", "north", _319);
		}
		if (_318.south.length) {
			_318.south.panel("panel").bind("mouseover", "south", _319);
		}
		_318.center.panel("panel").bind("mouseover", "center", _319);

		function _319(e) {
			if (_2e8 == true) {
				return;
			}
			if (e.data != "east" && _2f0(_318.east) && _2f0(_318.expandEast)) {
				_305(_317, "east");
			}
			if (e.data != "west" && _2f0(_318.west) && _2f0(_318.expandWest)) {
				_305(_317, "west");
			}
			if (e.data != "north" && _2f0(_318.north) && _2f0(_318.expandNorth)) {
				_305(_317, "north");
			}
			if (e.data != "south" && _2f0(_318.south) && _2f0(_318.expandSouth)) {
				_305(_317, "south");
			}
			return false;
		};
	};

	function _2f0(pp) {
		if (!pp) {
			return false;
		}
		if (pp.length) {
			return pp.panel("panel").is(":visible");
		} else {
			return false;
		}
	};

	function _31a(_31b) {
		var _31c = $.data(_31b, "layout").panels;
		if (_31c.east.length && _31c.east.panel("options").collapsed) {
			_305(_31b, "east", 0);
		}
		if (_31c.west.length && _31c.west.panel("options").collapsed) {
			_305(_31b, "west", 0);
		}
		if (_31c.north.length && _31c.north.panel("options").collapsed) {
			_305(_31b, "north", 0);
		}
		if (_31c.south.length && _31c.south.panel("options").collapsed) {
			_305(_31b, "south", 0);
		}
	};
	$.fn.layout = function(_31d, _31e) {
		if (typeof _31d == "string") {
			return $.fn.layout.methods[_31d](this, _31e);
		}
		_31d = _31d || {};
		return this.each(function() {
			var _31f = $.data(this, "layout");
			if (_31f) {
				$.extend(_31f.options, _31d);
			} else {
				var opts = $.extend({}, $.fn.layout.defaults, $.fn.layout.parseOptions(this), _31d);
				$.data(this, "layout", {
					options: opts,
					panels: {
						center: $(),
						north: $(),
						south: $(),
						east: $(),
						west: $()
					}
				});
				init(this);
				_316(this);
			}
			_2e9(this);
			_31a(this);
		});
	};
	$.fn.layout.methods = {
		resize: function(jq) {
			return jq.each(function() {
				_2e9(this);
			});
		},
		panel: function(jq, _320) {
			return $.data(jq[0], "layout").panels[_320];
		},
		collapse: function(jq, _321) {
			return jq.each(function() {
				_305(this, _321);
			});
		},
		expand: function(jq, _322) {
			return jq.each(function() {
				_30f(this, _322);
			});
		},
		add: function(jq, _323) {
			return jq.each(function() {
				_2f4(this, _323);
				_2e9(this);
				if ($(this).layout("panel", _323.region).panel("options").collapsed) {
					_305(this, _323.region, 0);
				}
			});
		},
		remove: function(jq, _324) {
			return jq.each(function() {
				_300(this, _324);
				_2e9(this);
			});
		}
	};
	$.fn.layout.parseOptions = function(_325) {
		return $.extend({}, $.parser.parseOptions(_325, [{
			fit: "boolean"
		}]));
	};
	$.fn.layout.defaults = {
		fit: false
	};
})(jQuery);
(function($) {
	function init(_326) {
		$(_326).appendTo("body");
		$(_326).addClass("menu-top");
		var _327 = [];
		_328($(_326));
		var time = null;
		for (var i = 0; i < _327.length; i++) {
			var menu = _327[i];
			_329(menu);
			menu.children("div.menu-item").each(function() {
				_32d(_326, $(this));
			});
			menu.bind("mouseenter", function() {
				if (time) {
					clearTimeout(time);
					time = null;
				}
			}).bind("mouseleave", function() {
				time = setTimeout(function() {
					_332(_326);
				}, 100);
			});
		}

		function _328(menu) {
			_327.push(menu);
			menu.find(">div").each(function() {
				var item = $(this);
				var _32a = item.find(">div");
				if (_32a.length) {
					_32a.insertAfter(_326);
					item[0].submenu = _32a;
					_328(_32a);
				}
			});
		};

		function _329(menu) {
			menu.addClass("menu").find(">div").each(function() {
				var item = $(this);
				if (item.hasClass("menu-sep")) {
					item.html("&nbsp;");
				} else {
					var _32b = $.extend({}, $.parser.parseOptions(this, ["name", "iconCls", "href"]), {
						disabled: (item.attr("disabled") ? true : undefined)
					});
					item.attr("name", _32b.name || "").attr("href", _32b.href || "");
					var text = item.addClass("menu-item").html();
					item.empty().append($("<div class=\"menu-text\"></div>").html(text));
					if (_32b.iconCls) {
						$("<div class=\"menu-icon\"></div>").addClass(_32b.iconCls).appendTo(item);
					}
					if (_32b.disabled) {
						_32c(_326, item[0], true);
					}
					if (item[0].submenu) {
						$("<div class=\"menu-rightarrow\"></div>").appendTo(item);
					}
					item._outerHeight(22);
				}
			});
			menu.hide();
		};
	};

	function _32d(_32e, item) {
		item.unbind(".menu");
		item.bind("mousedown.menu", function() {
			return false;
		}).bind("click.menu", function() {
			if ($(this).hasClass("menu-item-disabled")) {
				return;
			}
			if (!this.submenu) {
				_332(_32e);
				var href = $(this).attr("href");
				if (href) {
					location.href = href;
				}
			}
			var item = $(_32e).menu("getItem", this);
			$.data(_32e, "menu").options.onClick.call(_32e, item);
		}).bind("mouseenter.menu", function(e) {
			item.siblings().each(function() {
				if (this.submenu) {
					_331(this.submenu);
				}
				$(this).removeClass("menu-active");
			});
			item.addClass("menu-active");
			if ($(this).hasClass("menu-item-disabled")) {
				item.addClass("menu-active-disabled");
				return;
			}
			var _32f = item[0].submenu;
			if (_32f) {
				var left = item.offset().left + item.outerWidth() - 2;
				if (left + _32f.outerWidth() + 5 > $(window)._outerWidth() + $(document).scrollLeft()) {
					left = item.offset().left - _32f.outerWidth() + 2;
				}
				var top = item.offset().top - 3;
				if (top + _32f.outerHeight() > $(window)._outerHeight() + $(document).scrollTop()) {
					top = $(window)._outerHeight() + $(document).scrollTop() - _32f.outerHeight() - 5;
				}
				_336(_32f, {
					left: left,
					top: top
				});
			}
		}).bind("mouseleave.menu", function(e) {
			item.removeClass("menu-active menu-active-disabled");
			var _330 = item[0].submenu;
			if (_330) {
				if (e.pageX >= parseInt(_330.css("left"))) {
					item.addClass("menu-active");
				} else {
					_331(_330);
				}
			} else {
				item.removeClass("menu-active");
			}
		});
	};

	function _332(_333) {
		var opts = $.data(_333, "menu").options;
		_331($(_333));
		$(document).unbind(".menu");
		opts.onHide.call(_333);
		return false;
	};

	function _334(_335, pos) {
		var opts = $.data(_335, "menu").options;
		if (pos) {
			opts.left = pos.left;
			opts.top = pos.top;
			if (opts.left + $(_335).outerWidth() > $(window)._outerWidth() + $(document).scrollLeft()) {
				opts.left = $(window)._outerWidth() + $(document).scrollLeft() - $(_335).outerWidth() - 5;
			}
			if (opts.top + $(_335).outerHeight() > $(window)._outerHeight() + $(document).scrollTop()) {
				opts.top -= $(_335).outerHeight();
			}
		}
		_336($(_335), {
			left: opts.left,
			top: opts.top
		}, function() {
			$(document).unbind(".menu").bind("mousedown.menu", function() {
				_332(_335);
				$(document).unbind(".menu");
				return false;
			});
			opts.onShow.call(_335);
		});
	};

	function _336(menu, pos, _337) {
		if (!menu) {
			return;
		}
		if (pos) {
			menu.css(pos);
		}
		menu.show(0, function() {
			if (!menu[0].shadow) {
				menu[0].shadow = $("<div class=\"menu-shadow\"></div>").insertAfter(menu);
			}
			menu[0].shadow.css({
				display: "block",
				zIndex: $.fn.menu.defaults.zIndex++,
				left: menu.css("left"),
				top: menu.css("top"),
				width: menu.outerWidth(),
				height: menu.outerHeight()
			});
			menu.css("z-index", $.fn.menu.defaults.zIndex++);
			if (_337) {
				_337();
			}
		});
	};

	function _331(menu) {
		if (!menu) {
			return;
		}
		_338(menu);
		menu.find("div.menu-item").each(function() {
			if (this.submenu) {
				_331(this.submenu);
			}
			$(this).removeClass("menu-active");
		});

		function _338(m) {
			m.stop(true, true);
			if (m[0].shadow) {
				m[0].shadow.hide();
			}
			m.hide();
		};
	};

	function _339(_33a, text) {
		var _33b = null;
		var tmp = $("<div></div>");

		function find(menu) {
			menu.children("div.menu-item").each(function() {
				var item = $(_33a).menu("getItem", this);
				var s = tmp.empty().html(item.text).text();
				if (text == $.trim(s)) {
					_33b = item;
				} else {
					if (this.submenu && !_33b) {
						find(this.submenu);
					}
				}
			});
		};
		find($(_33a));
		tmp.remove();
		return _33b;
	};

	function _32c(_33c, _33d, _33e) {
		var t = $(_33d);
		if (_33e) {
			t.addClass("menu-item-disabled");
			if (_33d.onclick) {
				_33d.onclick1 = _33d.onclick;
				_33d.onclick = null;
			}
		} else {
			t.removeClass("menu-item-disabled");
			if (_33d.onclick1) {
				_33d.onclick = _33d.onclick1;
				_33d.onclick1 = null;
			}
		}
	};

	function _33f(_340, _341) {
		var menu = $(_340);
		if (_341.parent) {
			menu = _341.parent.submenu;
		}
		var item = $("<div class=\"menu-item\"></div>").appendTo(menu);
		$("<div class=\"menu-text\"></div>").html(_341.text).appendTo(item);
		if (_341.iconCls) {
			$("<div class=\"menu-icon\"></div>").addClass(_341.iconCls).appendTo(item);
		}
		if (_341.id) {
			item.attr("id", _341.id);
		}
		if (_341.href) {
			item.attr("href", _341.href);
		}
		if (_341.name) {
			item.attr("name", _341.name);
		}
		if (_341.onclick) {
			if (typeof _341.onclick == "string") {
				item.attr("onclick", _341.onclick);
			} else {
				item[0].onclick = eval(_341.onclick);
			}
		}
		if (_341.handler) {
			item[0].onclick = eval(_341.handler);
		}
		_32d(_340, item);
		if (_341.disabled) {
			_32c(_340, item[0], true);
		}
	};

	function _342(_343, _344) {
		function _345(el) {
			if (el.submenu) {
				el.submenu.children("div.menu-item").each(function() {
					_345(this);
				});
				var _346 = el.submenu[0].shadow;
				if (_346) {
					_346.remove();
				}
				el.submenu.remove();
			}
			$(el).remove();
		};
		_345(_344);
	};

	function _347(_348) {
		$(_348).children("div.menu-item").each(function() {
			_342(_348, this);
		});
		if (_348.shadow) {
			_348.shadow.remove();
		}
		$(_348).remove();
	};
	$.fn.menu = function(_349, _34a) {
		if (typeof _349 == "string") {
			return $.fn.menu.methods[_349](this, _34a);
		}
		_349 = _349 || {};
		return this.each(function() {
			var _34b = $.data(this, "menu");
			if (_34b) {
				$.extend(_34b.options, _349);
			} else {
				_34b = $.data(this, "menu", {
					options: $.extend({}, $.fn.menu.defaults, $.fn.menu.parseOptions(this), _349)
				});
				init(this);
			}
			$(this).css({
				left: _34b.options.left,
				top: _34b.options.top
			});
		});
	};
	$.fn.menu.methods = {
		show: function(jq, pos) {
			return jq.each(function() {
				_334(this, pos);
			});
		},
		hide: function(jq) {
			return jq.each(function() {
				_332(this);
			});
		},
		destroy: function(jq) {
			return jq.each(function() {
				_347(this);
			});
		},
		setText: function(jq, _34c) {
			return jq.each(function() {
				$(_34c.target).children("div.menu-text").html(_34c.text);
			});
		},
		setIcon: function(jq, _34d) {
			return jq.each(function() {
				var item = $(this).menu("getItem", _34d.target);
				if (item.iconCls) {
					$(item.target).children("div.menu-icon").removeClass(item.iconCls).addClass(_34d.iconCls);
				} else {
					$("<div class=\"menu-icon\"></div>").addClass(_34d.iconCls).appendTo(_34d.target);
				}
			});
		},
		getItem: function(jq, _34e) {
			var t = $(_34e);
			var item = {
				target: _34e,
				id: t.attr("id"),
				text: $.trim(t.children("div.menu-text").html()),
				disabled: t.hasClass("menu-item-disabled"),
				href: t.attr("href"),
				name: t.attr("name"),
				onclick: _34e.onclick
			};
			var icon = t.children("div.menu-icon");
			if (icon.length) {
				var cc = [];
				var aa = icon.attr("class").split(" ");
				for (var i = 0; i < aa.length; i++) {
					if (aa[i] != "menu-icon") {
						cc.push(aa[i]);
					}
				}
				item.iconCls = cc.join(" ");
			}
			return item;
		},
		findItem: function(jq, text) {
			return _339(jq[0], text);
		},
		appendItem: function(jq, _34f) {
			return jq.each(function() {
				_33f(this, _34f);
			});
		},
		removeItem: function(jq, _350) {
			return jq.each(function() {
				_342(this, _350);
			});
		},
		enableItem: function(jq, _351) {
			return jq.each(function() {
				_32c(this, _351, false);
			});
		},
		disableItem: function(jq, _352) {
			return jq.each(function() {
				_32c(this, _352, true);
			});
		}
	};
	$.fn.menu.parseOptions = function(_353) {
		return $.extend({}, $.parser.parseOptions(_353, ["left", "top"]));
	};
	$.fn.menu.defaults = {
		zIndex: 110000,
		left: 0,
		top: 0,
		onShow: function() {},
		onHide: function() {},
		onClick: function(item) {}
	};
})(jQuery);
(function($) {
	function init(_354) {
		var opts = $.data(_354, "menubutton").options;
		var btn = $(_354);
		btn.removeClass("m-btn-active m-btn-plain-active").addClass("m-btn");
		btn.linkbutton($.extend({}, opts, {
			text: opts.text + "<span class=\"m-btn-downarrow\">&nbsp;</span>"
		}));
		if (opts.menu) {
			$(opts.menu).menu({
				onShow: function() {
					btn.addClass((opts.plain == true) ? "m-btn-plain-active" : "m-btn-active");
				},
				onHide: function() {
					btn.removeClass((opts.plain == true) ? "m-btn-plain-active" : "m-btn-active");
				}
			});
		}
		_355(_354, opts.disabled);
	};

	function _355(_356, _357) {
		var opts = $.data(_356, "menubutton").options;
		opts.disabled = _357;
		var btn = $(_356);
		if (_357) {
			btn.linkbutton("disable");
			btn.unbind(".menubutton");
		} else {
			btn.linkbutton("enable");
			btn.unbind(".menubutton");
			btn.bind("click.menubutton", function() {
				_358();
				return false;
			});
			var _359 = null;
			btn.bind("mouseenter.menubutton", function() {
				_359 = setTimeout(function() {
					_358();
				}, opts.duration);
				return false;
			}).bind("mouseleave.menubutton", function() {
				if (_359) {
					clearTimeout(_359);
				}
			});
		}

		function _358() {
			if (!opts.menu) {
				return;
			}
			var left = btn.offset().left;
			if (left + $(opts.menu)._outerWidth() + 5 > $(window)._outerWidth()) {
				left = $(window)._outerWidth() - $(opts.menu)._outerWidth() - 5;
			}
			$("body>div.menu-top").menu("hide");
			$(opts.menu).menu("show", {
				left: left,
				top: btn.offset().top + btn.outerHeight()
			});
			btn.blur();
		};
	};
	$.fn.menubutton = function(_35a, _35b) {
		if (typeof _35a == "string") {
			return $.fn.menubutton.methods[_35a](this, _35b);
		}
		_35a = _35a || {};
		return this.each(function() {
			var _35c = $.data(this, "menubutton");
			if (_35c) {
				$.extend(_35c.options, _35a);
			} else {
				$.data(this, "menubutton", {
					options: $.extend({}, $.fn.menubutton.defaults, $.fn.menubutton.parseOptions(this), _35a)
				});
				$(this).removeAttr("disabled");
			}
			init(this);
		});
	};
	$.fn.menubutton.methods = {
		options: function(jq) {
			return $.data(jq[0], "menubutton").options;
		},
		enable: function(jq) {
			return jq.each(function() {
				_355(this, false);
			});
		},
		disable: function(jq) {
			return jq.each(function() {
				_355(this, true);
			});
		},
		destroy: function(jq) {
			return jq.each(function() {
				var opts = $(this).menubutton("options");
				if (opts.menu) {
					$(opts.menu).menu("destroy");
				}
				$(this).remove();
			});
		}
	};
	$.fn.menubutton.parseOptions = function(_35d) {
		var t = $(_35d);
		return $.extend({}, $.fn.linkbutton.parseOptions(_35d), $.parser.parseOptions(_35d, ["menu", {
			plain: "boolean",
			duration: "number"
		}]));
	};
	$.fn.menubutton.defaults = $.extend({}, $.fn.linkbutton.defaults, {
		plain: true,
		menu: null,
		duration: 100
	});
})(jQuery);
(function($) {
	function init(_35e) {
		var opts = $.data(_35e, "splitbutton").options;
		var btn = $(_35e);
		btn.removeClass("s-btn-active s-btn-plain-active").addClass("s-btn");
		btn.linkbutton($.extend({}, opts, {
			text: opts.text + "<span class=\"s-btn-downarrow\">&nbsp;</span>"
		}));
		if (opts.menu) {
			$(opts.menu).menu({
				onShow: function() {
					btn.addClass((opts.plain == true) ? "s-btn-plain-active" : "s-btn-active");
				},
				onHide: function() {
					btn.removeClass((opts.plain == true) ? "s-btn-plain-active" : "s-btn-active");
				}
			});
		}
		_35f(_35e, opts.disabled);
	};

	function _35f(_360, _361) {
		var opts = $.data(_360, "splitbutton").options;
		opts.disabled = _361;
		var btn = $(_360);
		var _362 = btn.find(".s-btn-downarrow");
		if (_361) {
			btn.linkbutton("disable");
			_362.unbind(".splitbutton");
		} else {
			btn.linkbutton("enable");
			_362.unbind(".splitbutton");
			_362.bind("click.splitbutton", function() {
				_363();
				return false;
			});
			var _364 = null;
			_362.bind("mouseenter.splitbutton", function() {
				_364 = setTimeout(function() {
					_363();
				}, opts.duration);
				return false;
			}).bind("mouseleave.splitbutton", function() {
				if (_364) {
					clearTimeout(_364);
				}
			});
		}

		function _363() {
			if (!opts.menu) {
				return;
			}
			var left = btn.offset().left;
			if (left + $(opts.menu)._outerWidth() + 5 > $(window)._outerWidth()) {
				left = $(window)._outerWidth() - $(opts.menu)._outerWidth() - 5;
			}
			$("body>div.menu-top").menu("hide");
			$(opts.menu).menu("show", {
				left: left,
				top: btn.offset().top + btn.outerHeight()
			});
			btn.blur();
		};
	};
	$.fn.splitbutton = function(_365, _366) {
		if (typeof _365 == "string") {
			return $.fn.splitbutton.methods[_365](this, _366);
		}
		_365 = _365 || {};
		return this.each(function() {
			var _367 = $.data(this, "splitbutton");
			if (_367) {
				$.extend(_367.options, _365);
			} else {
				$.data(this, "splitbutton", {
					options: $.extend({}, $.fn.splitbutton.defaults, $.fn.splitbutton.parseOptions(this), _365)
				});
				$(this).removeAttr("disabled");
			}
			init(this);
		});
	};
	$.fn.splitbutton.methods = {
		options: function(jq) {
			return $.data(jq[0], "splitbutton").options;
		},
		enable: function(jq) {
			return jq.each(function() {
				_35f(this, false);
			});
		},
		disable: function(jq) {
			return jq.each(function() {
				_35f(this, true);
			});
		},
		destroy: function(jq) {
			return jq.each(function() {
				var opts = $(this).splitbutton("options");
				if (opts.menu) {
					$(opts.menu).menu("destroy");
				}
				$(this).remove();
			});
		}
	};
	$.fn.splitbutton.parseOptions = function(_368) {
		var t = $(_368);
		return $.extend({}, $.fn.linkbutton.parseOptions(_368), $.parser.parseOptions(_368, ["menu", {
			plain: "boolean",
			duration: "number"
		}]));
	};
	$.fn.splitbutton.defaults = $.extend({}, $.fn.linkbutton.defaults, {
		plain: true,
		menu: null,
		duration: 100
	});
})(jQuery);
(function($) {
	function init(_369) {
		$(_369).hide();
		var span = $("<span class=\"searchbox\"></span>").insertAfter(_369);
		var _36a = $("<input type=\"text\" class=\"searchbox-text\">").appendTo(span);
		$("<span><span class=\"searchbox-button\"></span></span>").appendTo(span);
		var name = $(_369).attr("name");
		if (name) {
			_36a.attr("name", name);
			$(_369).removeAttr("name").attr("searchboxName", name);
		}
		return span;
	};

	function _36b(_36c, _36d) {
		var opts = $.data(_36c, "searchbox").options;
		var sb = $.data(_36c, "searchbox").searchbox;
		if (_36d) {
			opts.width = _36d;
		}
		sb.appendTo("body");
		if (isNaN(opts.width)) {
			opts.width = sb.outerWidth();
		}
		sb._outerWidth(opts.width);
		sb.find("input.searchbox-text")._outerWidth(sb.width() - sb.find("a.searchbox-menu").outerWidth() - sb.find("span.searchbox-button").outerWidth());
		sb.insertAfter(_36c);
	};

	function _36e(_36f) {
		var _370 = $.data(_36f, "searchbox");
		var opts = _370.options;
		if (opts.menu) {
			_370.menu = $(opts.menu).menu({
				onClick: function(item) {
					_371(item);
				}
			});
			var item = _370.menu.children("div.menu-item:first");
			_370.menu.children("div.menu-item").each(function() {
				var _372 = $.extend({}, $.parser.parseOptions(this), {
					selected: ($(this).attr("selected") ? true : undefined)
				});
				if (_372.selected) {
					item = $(this);
					return false;
				}
			});
			item.triggerHandler("click");
		} else {
			_370.searchbox.find("a.searchbox-menu").remove();
			_370.menu = null;
		}

		function _371(item) {
			_370.searchbox.find("a.searchbox-menu").remove();
			var mb = $("<a class=\"searchbox-menu\" href=\"javascript:void(0)\"></a>").html(item.text);
			mb.prependTo(_370.searchbox).menubutton({
				menu: _370.menu,
				iconCls: item.iconCls
			});
			_370.searchbox.find("input.searchbox-text").attr("name", $(item.target).attr("name") || item.text);
			_36b(_36f);
		};
	};

	function _373(_374) {
		var _375 = $.data(_374, "searchbox");
		var opts = _375.options;
		var _376 = _375.searchbox.find("input.searchbox-text");
		var _377 = _375.searchbox.find(".searchbox-button");
		_376.unbind(".searchbox").bind("blur.searchbox", function(e) {
			opts.value = $(this).val();
			if (opts.value == "") {
				$(this).val(opts.prompt);
				$(this).addClass("searchbox-prompt");
			} else {
				$(this).removeClass("searchbox-prompt");
			}
		}).bind("focus.searchbox", function(e) {
			if ($(this).val() != opts.value) {
				$(this).val(opts.value);
			}
			$(this).removeClass("searchbox-prompt");
		}).bind("keydown.searchbox", function(e) {
			if (e.keyCode == 13) {
				e.preventDefault();
				var name = $.fn.prop ? _376.prop("name") : _376.attr("name");
				opts.value = $(this).val();
				opts.searcher.call(_374, opts.value, name);
				return false;
			}
		});
		_377.unbind(".searchbox").bind("click.searchbox", function() {
			var name = $.fn.prop ? _376.prop("name") : _376.attr("name");
			opts.searcher.call(_374, opts.value, name);
		}).bind("mouseenter.searchbox", function() {
			$(this).addClass("searchbox-button-hover");
		}).bind("mouseleave.searchbox", function() {
			$(this).removeClass("searchbox-button-hover");
		});
	};

	function _378(_379) {
		var _37a = $.data(_379, "searchbox");
		var opts = _37a.options;
		var _37b = _37a.searchbox.find("input.searchbox-text");
		if (opts.value == "") {
			_37b.val(opts.prompt);
			_37b.addClass("searchbox-prompt");
		} else {
			_37b.val(opts.value);
			_37b.removeClass("searchbox-prompt");
		}
	};
	$.fn.searchbox = function(_37c, _37d) {
		if (typeof _37c == "string") {
			return $.fn.searchbox.methods[_37c](this, _37d);
		}
		_37c = _37c || {};
		return this.each(function() {
			var _37e = $.data(this, "searchbox");
			if (_37e) {
				$.extend(_37e.options, _37c);
			} else {
				_37e = $.data(this, "searchbox", {
					options: $.extend({}, $.fn.searchbox.defaults, $.fn.searchbox.parseOptions(this), _37c),
					searchbox: init(this)
				});
			}
			_36e(this);
			_378(this);
			_373(this);
			_36b(this);
		});
	};
	$.fn.searchbox.methods = {
		options: function(jq) {
			return $.data(jq[0], "searchbox").options;
		},
		menu: function(jq) {
			return $.data(jq[0], "searchbox").menu;
		},
		textbox: function(jq) {
			return $.data(jq[0], "searchbox").searchbox.find("input.searchbox-text");
		},
		getValue: function(jq) {
			return $.data(jq[0], "searchbox").options.value;
		},
		setValue: function(jq, _37f) {
			return jq.each(function() {
				$(this).searchbox("options").value = _37f;
				$(this).searchbox("textbox").val(_37f);
				$(this).searchbox("textbox").blur();
			});
		},
		getName: function(jq) {
			return $.data(jq[0], "searchbox").searchbox.find("input.searchbox-text").attr("name");
		},
		selectName: function(jq, name) {
			return jq.each(function() {
				var menu = $.data(this, "searchbox").menu;
				if (menu) {
					menu.children("div.menu-item[name=\"" + name + "\"]").triggerHandler("click");
				}
			});
		},
		destroy: function(jq) {
			return jq.each(function() {
				var menu = $(this).searchbox("menu");
				if (menu) {
					menu.menu("destroy");
				}
				$.data(this, "searchbox").searchbox.remove();
				$(this).remove();
			});
		},
		resize: function(jq, _380) {
			return jq.each(function() {
				_36b(this, _380);
			});
		}
	};
	$.fn.searchbox.parseOptions = function(_381) {
		var t = $(_381);
		return $.extend({}, $.parser.parseOptions(_381, ["width", "prompt", "menu"]), {
			value: t.val(),
			searcher: (t.attr("searcher") ? eval(t.attr("searcher")) : undefined)
		});
	};
	$.fn.searchbox.defaults = {
		width: "auto",
		prompt: "",
		value: "",
		menu: null,
		searcher: function(_382, name) {}
	};
})(jQuery);

//修改验证函数 2013-1-25
(function($) {
	function init(_383) {
		$(_383).addClass("validatebox-text"); // zhangxr 2013.2.27
	};

	function _384(_385) {
		var _386 = $.data(_385, "validatebox");
		_386.validating = false;
		var tip = _386.tip;
		if (tip) {
			tip.remove();
		}
		$(_385).unbind();
		$(_385).remove();
	};
	/*function _387(_388){
var box=$(_388);
var _389=$.data(_388,"validatebox");
box.unbind(".validatebox").bind("focus.validatebox",function(){
box.parent().css("border-color","#75B4E9");//获得焦点后边框激活

box.css("border-color","#75B4E9");//获得焦点后边框激活
}).bind("blur.validatebox",function(){//失去焦点验证
box.css("borderColor","#c5c5c5");
if(box.hasClass("validatebox-invalid") && box.attr('readonly') == null){//屏蔽文本框不可用时不验证 zhangxr 
_389.validating=true;
_389.value=undefined;

(function(){
if(_389.validating){
    if(_389.value!=box.val()){
    _389.value=box.val();
    if(_390(_388)){  //若验证有误则红色背景，若无误则默认背景
        box.removeClass("validatebox-tipcolor").css("borderColor","#c5c5c5");
        if(box.parent().is("span")){
            box.next("span").removeClass("validatebox-spanicon").parent().css("borderColor","#c5c5c5");
        }
    }else{
        
        if(box.parent().is("span")){
            box.addClass("validatebox-tipcolor").next("span").addClass("validatebox-spanicon").parent().css("borderColor","#FE0000");
        }else{
            box.addClass("validatebox-tipcolor").css("borderColor","#FE0000");
        }
    };
    }else{
    //add xfc
    	if($.data(_388, "validatebox")!=null){
    		 var msg = $.data(_388, "validatebox").message;
    		 _38d(_388,msg);
    	}
   
    }
    setTimeout(arguments.callee,200);
}
})();
}else if(box.hasClass("validatebox-warn")&& box.attr('readonly') == null){
_389.validating=true;
_389.value=undefined;
(function(){
if(_389.validating){
    
    if(_389.value!=box.val()){
        
    _389.value=box.val();
    if(warnValidate(_388)){  //若验证有误则黄色背景，若无误则默认背景
        box.removeClass("warnbox-tipcolor").css("borderColor","#c5c5c5");
        if(box.parent().is("span")){
            box.next("span").removeClass("warnbox-spanicon").parent().css("borderColor","#c5c5c5");
        }
    }else{
        if(box.parent().is("span")){
            box.addClass("warnbox-tipcolor")
            .next("span").addClass("warnbox-spanicon").parent().css("borderColor","#F9E929");
        }else{
            box.addClass("warnbox-tipcolor").css("border","1px solid #FBBC11");
        }
    };
    }else{
    //add xfc
   if($.data(_388, "validatebox")!=null){
    		 var msg = $.data(_388, "validatebox").message;
    		 _38d(_388,msg);
    	}
    }
    setTimeout(arguments.callee,200);
}
})();
}//end if
});
//去掉划入提示，改为点击提示 2012.12.27
box.next("span.point_box").hover(function(){//屏蔽日期框的悬浮提示信息 zhangxr 2013/3/1
//鼠标滑入帮助信息显示 zhangxr 2013-2-1
if(!box.hasClass("validatebox-tipcolor") && !box.hasClass("warnbox-tipcolor")){
    var opts=$.data(_388,"validatebox").options;
    $.data(_388,"validatebox").message=opts.missingMessage;
    //_38b(_388,false,true)
}
},function(){
_389.validating=false;
//_38a(_388); 
}).bind("blur",function(){
    _389.validating=false;
    //_38a(_388);
});
};*/
	//调整错误提示框(38b 38d) -xfc
	/*function //_38b(_38c,iswarn,ishelp){
var msg=$.data(_38c,"validatebox").message;
var tip=$.data(_38c,"validatebox").tip;
if(!tip){
if(!iswarn){
    if(!ishelp){
        tip = $(
            '<div class="errorbox_ipt_help"><div class="errorbox_ipt_helpbox">' +
                '<div class="errorbox_arrow"> </div>' +
                '<p class="errorbox_tip-content"></p>' +
            '</div></div>'
            ).appendTo('body');
    }else{
        tip = $(
        '<div class="helpbox_ipt_help"><div class="helpbox_ipt_helpbox">' +
            '<div class="helpbox_arrow"></div>' +
            '<p class="errorbox_tip-content"></p>' +
        '</div></div>'
        ).appendTo('body');
    }
}else{
    tip = $(
    '<div class="warnbox_ipt_help"><div class="warnbox_ipt_helpbox">' +
        '<div class="warnbox_arrow"> </div>' +
        '<p class="errorbox_tip-content"></p>' +
    '</div></div>'
    ).appendTo('body');
}
$.data(_38c,"validatebox").tip=tip;
}
tip.find(".errorbox_tip-content").html(msg);
$(_38c).attr("error",msg);//add zhangxr 2013/2/27
$(".errorbox_ipt_help").bgiframe();
_38d(_38c,msg);
};
function _38d(_38e, msg){
var opts = $.data(_38e,"validatebox").options;
var box=$(_38e);
var tip=$.data(_38e,"validatebox").tip;   
var toppos = box.offset().top -38 ;
//由于多行提示文本，矫正位置
var strLen = getStrLength(msg);
var line = Math.floor(strLen/24 +1);
if(line >1 ){
    toppos -=(line-1)*22;
}        
if (tip) {
    tip.css({
        display : "block",
        left : box.offset().left + box.outerWidth() -55,
        top : toppos
    });
    $("#bgiframe").css({
        display : "block",
        left : box.offset().left + box.outerWidth() -55,
        top : toppos
    });
}
// if(tip){
// tip.css({display:"block",left:box.offset().left+box.outerWidth(),top:box.offset().top});
// }
};
//通过字符串长度来确定是否换行
function getStrLength(str){
    if(str){
        var tmp =str.replace(/[\u4e00-\u9fa5]/g, '');
        var leng = (str.length-tmp.length)*2 + tmp.length;
        return leng;
    }else{
        return 0;
    }
    
};
function //_38a(_38f){
var tip=$.data(_38f,"validatebox").tip;
if(tip){
tip.remove();
$.data(_38f,"validatebox").tip=null;
}
};*/
	function _390(_391) {
		var _392 = $.data(_391, "validatebox");
		var opts = $.data(_391, "validatebox").options;
		var tip = $.data(_391, "validatebox").tip;
		var box = $(_391);
		var _393 = box.val();

		function _394(msg) {
			$.data(_391, "validatebox").message = msg;
		};
		if (opts.required) {
			if (_393 == "") {
				box.addClass("validatebox-invalid");
				_394(opts.missingMessage);
				return false;
				if (_392.validating) {
					//_38b(_391);
				}

				return false;
			}
		}
		if (opts.validType) {

			//added by zhouyh on 2013/1/30
			if (opts.validType instanceof Array) {
				var flag = true;

				if (flag) {
					box.removeClass("validatebox-invalid");
					//_38a(_391);
					return true;
				} else return false;
			} //end if

			else {
				var _395 = /([a-zA-Z_]+)(.*)/.exec(opts.validType);
				var rule = opts.rules[_395[1]];
				if (_393 && rule) {
					var _396 = eval(_395[2]);
					if (!rule["validator"](_393, _396)) {
						box.addClass('validatebox-invalid');
						var _397 = rule["message"];
						if (_396) {
							for (var i = 0; i < _396.length; i++) {
								_397 = _397.replace(new RegExp("\\{" + i + "\\}", "g"), _396[i]);
							}
						}
						_394(opts.invalidMessage || _397);
						if (_392.validating) {
							//_38b(_391);

						}
						return false;
					}
				}
			}
		}
		box.removeClass("validatebox-invalid");
		//_38a(_391);
		return true;
	};
	$.fn.validatebox = function(_398, _399) {
		if (typeof _398 == "string") {
			return $.fn.validatebox.methods[_398](this, _399);
		}
		_398 = _398 || {};
		return this.each(function() {
			var _39a = $.data(this, "validatebox");
			if (_39a) {
				$.extend(_39a.options, _398);
			} else {
				init(this);
				$.data(this, "validatebox", {
					options: $.extend({}, $.fn.validatebox.defaults, $.fn.validatebox.parseOptions(this), _398)
				});
			}
			//_387(this);
		});
	};
	$.fn.validatebox.methods = {
		destroy: function(jq) {
			return jq.each(function() {
				_384(this);
			});
		},
		validate: function(jq) {
			return jq.each(function() {
				// _390(this);
			});
		},
		isValid: function(jq) {
			return _390(jq[0]);
		}
	};
	$.fn.validatebox.parseOptions = function(_39b) {
		var t = $(_39b);
		return $.extend({}, $.parser.parseOptions(_39b, ["validType", "warnType", , "warnMessage", "missingMessage", "invalidMessage"]), {
			required: (t.attr("required") ? true : undefined)
		});
	};
	$.fn.validatebox.defaults = {
		required: false,
		validType: null,
		warnType: null,
		missingMessage: "This field is required.",
		warnMessage: 'this is a warning',
		invalidMessage: null,
		rules: {
			email: {
				validator: function(_39c) {
					return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(_39c);
				},
				message: "Please enter a valid email address."
			},
			url: {
				validator: function(_39d) {
					return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(_39d);
				},
				message: "Please enter a valid URL."
			},
			length: {
				validator: function(_39e, _39f) {
					var len = $.trim(_39e).length;
					return len >= _39f[0] && len <= _39f[1];
				},
				message: "Please enter a value between {0} and {1}."
			},
			remote: {
				validator: function(_3a0, _3a1) {
					var data = {};
					data[_3a1[1]] = _3a0;
					var _3a2 = $.ajax({
						url: _3a1[0],
						dataType: "json",
						data: data,
						async: false,
						cache: false,
						type: "post"
					}).responseText;
					return _3a2 == "true";
				},
				message: "Please fix this field."
			}
		}
	};
})(jQuery);

(function($) {
	function _3a3(_3a4, _3a5) {
		_3a5 = _3a5 || {};
		if (_3a5.onSubmit) {
			if (_3a5.onSubmit.call(_3a4) == false) {
				return;
			}
		}
		var form = $(_3a4);
		if (_3a5.url) {
			form.attr("action", _3a5.url);
		}
		var _3a6 = "easyui_frame_" + (new Date().getTime());
		var _3a7 = $("<iframe id=" + _3a6 + " name=" + _3a6 + "></iframe>").attr("src", window.ActiveXObject ? "javascript:false" : "about:blank").css({
			position: "absolute",
			top: -1000,
			left: -1000
		});
		var t = form.attr("target"),
			a = form.attr("action");
		form.attr("target", _3a6);
		try {
			_3a7.appendTo("body");
			_3a7.bind("load", cb);
			form[0].submit();
		} finally {
			form.attr("action", a);
			t ? form.attr("target", t) : form.removeAttr("target");
		}
		var _3a8 = 10;

		function cb() {
			_3a7.unbind();
			var body = $("#" + _3a6).contents().find("body");
			var data = body.html();
			if (data == "") {
				if (--_3a8) {
					setTimeout(cb, 100);
					return;
				}
				return;
			}
			var ta = body.find(">textarea");
			if (ta.length) {
				data = ta.val();
			} else {
				var pre = body.find(">pre");
				if (pre.length) {
					data = pre.html();
				}
			}
			if (_3a5.success) {
				_3a5.success(data);
			}
			setTimeout(function() {
				_3a7.unbind();
				_3a7.remove();
			}, 100);
		};
	};

	function load(_3a9, data) {
		if (!$.data(_3a9, "form")) {
			$.data(_3a9, "form", {
				options: $.extend({}, $.fn.form.defaults)
			});
		}
		var opts = $.data(_3a9, "form").options;
		if (typeof data == "string") {
			var _3aa = {};
			if (opts.onBeforeLoad.call(_3a9, _3aa) == false) {
				return;
			}
			$.ajax({
				url: data,
				data: _3aa,
				dataType: "json",
				success: function(data) {
					_3ab(data);
				},
				error: function() {
					opts.onLoadError.apply(_3a9, arguments);
				}
			});
		} else {
			_3ab(data);
		}

		function _3ab(data) {
			var form = $(_3a9);
			for (var name in data) {
				var val = data[name];
				var rr = _3ac(name, val);
				if (!rr.length) {
					var f = form.find("input[numberboxName=\"" + name + "\"]");
					if (f.length) {
						f.numberbox("setValue", val);
					} else {
						$("input[name=\"" + name + "\"]", form).val(val);
						$("textarea[name=\"" + name + "\"]", form).val(val);
						$("select[name=\"" + name + "\"]", form).val(val);
					}
				}
				_3ad(name, val);
			}
			opts.onLoadSuccess.call(_3a9, data);
			_3b0(_3a9);
		};

		function _3ac(name, val) {
			var form = $(_3a9);
			var rr = $("input[name=\"" + name + "\"][type=radio], input[name=\"" + name + "\"][type=checkbox]", form);
			$.fn.prop ? rr.prop("checked", false) : rr.attr("checked", false);
			rr.each(function() {
				var f = $(this);
				if (f.val() == String(val)) {
					$.fn.prop ? f.prop("checked", true) : f.attr("checked", true);
				}
			});
			return rr;
		};

		function _3ad(name, val) {
			var form = $(_3a9);
			var cc = ["combobox", "combotree", "combogrid", "datetimebox", "datebox", "combo"];
			var c = form.find("[comboName=\"" + name + "\"]");
			if (c.length) {
				for (var i = 0; i < cc.length; i++) {
					var type = cc[i];
					if (c.hasClass(type + "-f")) {
						if (c[type]("options").multiple) {
							c[type]("setValues", val);
						} else {
							c[type]("setValue", val);
						}
						return;
					}
				}
			}
		};
	};

	function _3ae(_3af) {
		$("input,select,textarea", _3af).each(function() {
			var t = this.type,
				tag = this.tagName.toLowerCase();
			if (t == "text" || t == "hidden" || t == "password" || tag == "textarea") {
				this.value = "";
			} else {
				if (t == "file") {
					var file = $(this);
					file.after(file.clone().val(""));
					file.remove();
				} else {
					if (t == "checkbox" || t == "radio") {
						this.checked = false;
					} else {
						if (tag == "select") {
							this.selectedIndex = -1;
						}
					}
				}
			}
		});
		if ($.fn.combo) {
			$(".combo-f", _3af).combo("clear");
		}
		if ($.fn.combobox) {
			$(".combobox-f", _3af).combobox("clear");
		}
		if ($.fn.combotree) {
			$(".combotree-f", _3af).combotree("clear");
		}
		if ($.fn.combogrid) {
			$(".combogrid-f", _3af).combogrid("clear");
		}
		_3b0(_3af);
	};

	function _3b1(_3b2) {
		var _3b3 = $.data(_3b2, "form").options;
		var form = $(_3b2);
		form.unbind(".form").bind("submit.form", function() {
			setTimeout(function() {
				_3a3(_3b2, _3b3);
			}, 0);
			return false;
		});
	};
	//表单的验证提示信息 表单里不需要验证

	function _3b0(_3b4) {
		/*if($.fn.validatebox){
	var t=$(_3b4);
	t.find(".validatebox-text:not(:disabled)").validatebox("validate");
	var _3b5=t.find(".validatebox-invalid");
	_3b5.filter(":not(:disabled):first").focus();
	return _3b5.length==0;
	}*/
		return true;
	};


	$.fn.form = function(_3b6, _3b7) {
		if (typeof _3b6 == "string") {
			return $.fn.form.methods[_3b6](this, _3b7);
		}
		_3b6 = _3b6 || {};
		return this.each(function() {
			if (!$.data(this, "form")) {
				$.data(this, "form", {
					options: $.extend({}, $.fn.form.defaults, _3b6)
				});
			}
			_3b1(this);
		});
	};
	$.fn.form.methods = {
		submit: function(jq, _3b8) {
			return jq.each(function() {
				_3a3(this, $.extend({}, $.fn.form.defaults, _3b8 || {}));
			});
		},
		load: function(jq, data) {
			return jq.each(function() {
				load(this, data);
			});
		},
		clear: function(jq) {
			return jq.each(function() {
				_3ae(this);
			});
		},
		validate: function(jq) {
			return _3b0(jq[0]);
		}
	};
	$.fn.form.defaults = {
		url: null,
		onSubmit: function() {
			return $(this).form("validate");
		},
		success: function(data) {},
		onBeforeLoad: function(_3b9) {},
		onLoadSuccess: function(data) {},
		onLoadError: function() {}
	};
})(jQuery);
(function($) {
	function init(_3ba) {
		var v = $("<input type=\"hidden\">").insertAfter(_3ba);
		var name = $(_3ba).attr("name");
		if (name) {
			v.attr("name", name);
			$(_3ba).removeAttr("name").attr("numberboxName", name);
		}
		return v;
	};

	function _3bb(_3bc) {
		var opts = $.data(_3bc, "numberbox").options;
		var fn = opts.onChange;
		opts.onChange = function() {};
		_3bd(_3bc, opts.parser.call(_3bc, opts.value));
		opts.onChange = fn;
	};

	function _3be(_3bf) {
		//处理当启动两numberspinner在window中循环验证后，关闭window时报取不到numberbox对象  lgy 20130704
		if ($.data(_3bf, "numberbox")) {
			return $.data(_3bf, "numberbox").field.val();
		} else {
			return "";
		}

	};

	function _3bd(_3c0, _3c1) {
		var _3c2 = $.data(_3c0, "numberbox");
		var opts = _3c2.options;
		var _3c3 = _3be(_3c0);
		_3c1 = opts.parser.call(_3c0, _3c1);
		opts.value = _3c1;
		_3c2.field.val(_3c1);
		$(_3c0).val(opts.formatter.call(_3c0, _3c1));
		if (_3c3 != _3c1) {
			opts.onChange.call(_3c0, _3c1, _3c3);
		}
	};

	function _3c4(_3c5) {
		var opts = $.data(_3c5, "numberbox").options;
		$(_3c5).unbind(".numberbox").bind("keypress.numberbox", function(e) {
			if (e.which == 45) {
				if ($(this).val().indexOf("-") == -1) {
					return true;
				} else {
					return false;
				}
			}
			if (e.which == 46) {
				if ($(this).val().indexOf(".") == -1) {
					return true;
				} else {
					return false;
				}
			} else {
				if ((e.which >= 48 && e.which <= 57 && e.ctrlKey == false && e.shiftKey == false) || e.which == 0 || e.which == 8) {
					return true;
				} else {
					if (e.ctrlKey == true && (e.which == 99 || e.which == 118)) {
						return true;
					} else {
						return false;
					}
				}
			}
		}).bind("paste.numberbox", function() {
			if (window.clipboardData) {
				var s = clipboardData.getData("text");
				if (!/\D/.test(s)) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		}).bind("dragenter.numberbox", function() {
			return false;
		}).bind("blur.numberbox", function() {
			_3bd(_3c5, $(this).val());
			$(this).val(opts.formatter.call(_3c5, _3be(_3c5)));
		}).bind("focus.numberbox", function() {
			var vv = _3be(_3c5);
			if ($(this).val() != vv) {
				// $(this).val(vv);
			}
		});
	};

	function _3c6(_3c7) {
		if ($.fn.validatebox) {
			var opts = $.data(_3c7, "numberbox").options;
			$(_3c7).validatebox(opts);
		}
	};

	function _3c8(_3c9, _3ca) {
		var opts = $.data(_3c9, "numberbox").options;
		if (_3ca) {
			opts.disabled = true;
			$(_3c9).attr("disabled", true);
		} else {
			opts.disabled = false;
			$(_3c9).removeAttr("disabled");
		}
	};
	$.fn.numberbox = function(_3cb, _3cc) {
		if (typeof _3cb == "string") {
			var _3cd = $.fn.numberbox.methods[_3cb];
			if (_3cd) {
				return _3cd(this, _3cc);
			} else {
				return this.validatebox(_3cb, _3cc);
			}
		}
		_3cb = _3cb || {};
		return this.each(function() {
			var _3ce = $.data(this, "numberbox");
			if (_3ce) {
				$.extend(_3ce.options, _3cb);
			} else {
				_3ce = $.data(this, "numberbox", {
					options: $.extend({}, $.fn.numberbox.defaults, $.fn.numberbox.parseOptions(this), _3cb),
					field: init(this)
				});
				$(this).removeAttr("disabled");
				$(this).css({
					imeMode: "disabled"
				});
			}
			_3c8(this, _3ce.options.disabled);
			_3c4(this);
			_3c6(this);
			_3bb(this);
		});
	};
	$.fn.numberbox.methods = {
		options: function(jq) {
			return $.data(jq[0], "numberbox").options;
		},
		destroy: function(jq) {
			return jq.each(function() {
				$.data(this, "numberbox").field.remove();
				$(this).validatebox("destroy");
				$(this).remove();
			});
		},
		disable: function(jq) {
			return jq.each(function() {
				_3c8(this, true);
			});
		},
		enable: function(jq) {
			return jq.each(function() {
				_3c8(this, false);
			});
		},
		fix: function(jq) {
			return jq.each(function() {
				_3bd(this, $(this).val());
			});
		},
		setValue: function(jq, _3cf) {
			return jq.each(function() {
				_3bd(this, _3cf);
			});
		},
		getValue: function(jq) {
			return _3be(jq[0]);
		},
		clear: function(jq) {
			return jq.each(function() {
				var _3d0 = $.data(this, "numberbox");
				_3d0.field.val("");
				$(this).val("");
			});
		}
	};
	$.fn.numberbox.parseOptions = function(_3d1) {
		var t = $(_3d1);
		return $.extend({}, $.fn.validatebox.parseOptions(_3d1), $.parser.parseOptions(_3d1, ["decimalSeparator", "groupSeparator", "prefix", "suffix", {
			min: "number",
			max: "number",
			precision: "number"
		}]), {
			disabled: (t.attr("disabled") ? true : undefined),
			value: (t.val() || undefined)
		});
	};
	$.fn.numberbox.defaults = $.extend({}, $.fn.validatebox.defaults, {
		disabled: false,
		value: "",
		min: null,
		max: null,
		precision: 0,
		decimalSeparator: ".",
		groupSeparator: "",
		prefix: "",
		suffix: "",
		formatter: function(_3d2) {
			if (!_3d2) {
				return _3d2;
			}
			_3d2 = _3d2 + "";
			var opts = $(this).numberbox("options");
			var s1 = _3d2,
				s2 = "";
			var dpos = _3d2.indexOf(".");
			if (dpos >= 0) {
				s1 = _3d2.substring(0, dpos);
				s2 = _3d2.substring(dpos + 1, _3d2.length);
			}
			if (opts.groupSeparator) {
				var p = /(\d+)(\d{3})/;
				while (p.test(s1)) {
					s1 = s1.replace(p, "$1" + opts.groupSeparator + "$2");
				}
			}
			if (s2) {
				return opts.prefix + s1 + opts.decimalSeparator + s2 + opts.suffix;
			} else {
				return opts.prefix + s1 + opts.suffix;
			}
		},
		parser: function(s) {
			s = s + "";
			var opts = $(this).numberbox("options");
			if (opts.groupSeparator) {
				s = s.replace(new RegExp("\\" + opts.groupSeparator, "g"), "");
			}
			if (opts.decimalSeparator) {
				s = s.replace(new RegExp("\\" + opts.decimalSeparator, "g"), ".");
			}
			if (opts.prefix) {
				s = s.replace(new RegExp("\\" + $.trim(opts.prefix), "g"), "");
			}
			if (opts.suffix) {
				s = s.replace(new RegExp("\\" + $.trim(opts.suffix), "g"), "");
			}
			s = s.replace(/\s/g, "");
			var val = parseFloat(s).toFixed(opts.precision);
			if (isNaN(val)) {
				val = "";
			} else {
				if (typeof(opts.min) == "number" && val < opts.min) {
					val = opts.min.toFixed(opts.precision);
				} else {
					if (typeof(opts.max) == "number" && val > opts.max) {
						val = opts.max.toFixed(opts.precision);
					}
				}
			}
			return val;
		},
		onChange: function(_3d3, _3d4) {}
	});
})(jQuery);

(function($) {
	function _3d5(_3d6) {
		var opts = $.data(_3d6, "calendar").options;
		var t = $(_3d6);
		if (opts.fit == true) {
			var p = t.parent();
			opts.width = p.width();
			opts.height = p.height();
		}
		var _3d7 = t.find(".calendar-header");
		t._outerWidth(opts.width);
		t._outerHeight(opts.height);
		t.find(".calendar-body")._outerHeight(t.height() - _3d7._outerHeight());
	};

	function init(_3d8, monthSwitch) {
        var opts = $.data(_3d8,'calendar').options;

		/*去掉日历翻页按钮根据开关 linguoyong 2013.2.17*/
		var monthSwitchOpen_divClass = "<div class=\"calendar-header\">" +
			"<div class=\"calendar-prevmonth\"></div>" + "<div class=\"calendar-nextmonth\"></div>" + "<div class=\"calendar-prevyear\"></div>" + "<div class=\"calendar-nextyear\"></div>" +
			"<div class=\"calendar-title\">" + "<span>April 2010</span>" + "</div>" + "</div>" + "<div class=\"calendar-body\">" + "<div class=\"calendar-menu\">" + "<div class=\"calendar-menu-year-inner\">" + "<span class=\"calendar-menu-prev\"></span>" + "<span><input class=\"calendar-menu-year\" type=\"text\"></input></span>" + "<span class=\"calendar-menu-next\"></span>" + "</div>" + "<div class=\"calendar-menu-month-inner\">" + "</div>" + "</div>" + "</div>";
		var monthSwitchClose_divClass = "<div class=\"calendar-header\">" +
			"<div class=\"calendar-title\">" + "<span>April 2010</span>" + "</div>" + "</div>" + "<div class=\"calendar-body\">" + "</div>";

        var monthSwitchOpen_divClass_dropMonthNYear = "<div class=\"calendar-header cal-hd\">" +
                                                                "<div class=\"calendar-monthset \">"+
                                                                    "<div class=\"calendar-title cal-tm\" >" +
                                                                        "<span>April</span>" +
                                                                    "</div>" +
                                                                    "<div class=\"calendar-prevmonth cal-pre\"></div>" +
                                                                    "<div class=\"calendar-nextmonth cal-next\"></div>" +
                                                                "</div>" +
                                                                "<div class=\"calendar-yearset \">"+
                                                                    "<div class=\"calendar-title cal-ty\" >" +
                                                                        "<span>2010</span>" +
                                                                    "</div>" +
                                                                    "<div class=\"calendar-nextyear cal-next\"></div>" +
                                                                    "<div class=\"calendar-prevyear cal-pre\"></div>" +
                                                                "</div>" +
                                                                "<div class=\"calendar-todayset \">"+
                                                                    "<span>" + opts.today + "</span>" +
                                                                "</div>" +
                                                                "</div>" +
                                                                "<div class=\"calendar-body\">" +
                                                                "<div class=\"calendar-menu\">" +
                                                                "<div class=\"calendar-menu-year-inner\">" +
                                                                "<span class=\"calendar-menu-prev\"></span>" +
                                                                "<span><input class=\"calendar-menu-year\" type=\"text\"></input></span>" +
                                                                "<span class=\"calendar-menu-next\"></span>" +
                                                                "</div>" +
                                                                "<div class=\"calendar-menu-month-inner\">" + "</div>" +
                                                                "</div>" +
                                                                "</div>";

        if (monthSwitch == false) {
			$(_3d8).addClass("calendar").wrapInner(monthSwitchClose_divClass);
		} else {
            if( opts.onlyMonth ){                    //季节切换
                $(_3d8).addClass("calendar").wrapInner(monthSwitchOpen_divClass);
            }
            if( !opts.onlyMonth && !opts.seasonSwitch  ){//常规日历
                if( opts.dropMonthNYear ){
                    $(_3d8).addClass("calendar").wrapInner(monthSwitchOpen_divClass_dropMonthNYear);
                }else{
                    $(_3d8).addClass("calendar").wrapInner(monthSwitchOpen_divClass);
                }
            }
		}
		//年历时不需要显示月份
		if (monthSwitch != false) {
			//显示月月份
			_3df(_3d8);
		}
        if( monthSwitch != false ){
            if( opts.dropMonthNYear ){
                if( opts.onlyMonth  ){
                    $(_3d8).find(".calendar-menu-year-inner").fallList({
                        valueDom: "input",   //  选中的值放哪里
                        focusDom: "input",   //  foucs和blur事件帮哪里
                        clickSwitch:false,  //  是否支持点击切换显示和隐藏
                        width: 46,
                        top:28,
                        left: ( parseInt( opts.width ) / 2 - 23 + 4 ) ,
                        onScrollTop: function (topVal) {
                            var preYears = _getYears(topVal, 1, 11, true);
                            $(_3d8).find(".calendar-menu-year-inner").fallList("prependOptions", preYears);
                        },
                        onScrollEnd: function (btmVal) {
                            var nextYears = _getYears(btmVal, 1, 11, false);
                            $(_3d8).find(".calendar-menu-year-inner").fallList("appendOptions", nextYears);
                        },
                        createOption: function (val) {
                            var vll = Number(val);
                            var ott = _getYears(vll, -10, 11, false);
                            return ott;
                        },
                        onSelect: function (year) {
                            var obj = {
                                month: opts.month,
                                year: Number(year)
                            };
                            //_G2D(_3d8, obj);
                        }
                    })
                }
                if( !opts.onlyMonth ) {
                    $(_3d8).find(".cal-tm").fallList({
                        options: resource.CALENDAR_DEFAULTS_MONTHS,
                        valueDom: "span",
                        width: 60,
                        onSelect: function (month) {
                            var obj = {
                                month: _C2D(month),
                                year: opts.year
                            };
                            _G2D(_3d8, obj);
                        }
                    });
                    $(_3d8).find(".cal-ty").fallList({
                        valueDom: "span",
                        width: 50,
                        onScrollTop: function (topVal) {
                            var preYears = _getYears(topVal, 1, 11, true);
                            $(_3d8).find(".cal-ty").fallList("prependOptions", preYears);
                        },
                        onScrollEnd: function (btmVal) {
                            var nextYears = _getYears(btmVal, 1, 11, false);
                            $(_3d8).find(".cal-ty").fallList("appendOptions", nextYears);
                        },
                        createOption: function (val) {
                            var vll = Number(val);
                            var ott = _getYears(vll, -10, 11, false);
                            return ott;
                        },
                        onSelect: function (year) {
                            var obj = {
                                month: opts.month,
                                year: Number(year)
                            };
                            _G2D(_3d8, obj);
                        }
                    })
                }
            }
        }

		$(".calendar-prevmonth,.calendar-nextmonth,.calendar-prevyear,.calendar-nextyear", _3d8).hover(function() {
			$(this).addClass("calendar-nav-hover");
		}, function() {
			$(this).removeClass("calendar-nav-hover");
		});
		$(_3d8).find(".calendar-nextmonth").click(function() {
			_3d9(_3d8, 1);
		});
		$(_3d8).find(".calendar-prevmonth").click(function() {
			_3d9(_3d8, -1);
		});
		$(_3d8).find(".calendar-nextyear").click(function() {
			_3dc(_3d8, 1);
		});
		$(_3d8).find(".calendar-prevyear").click(function() {
			_3dc(_3d8, -1);
		});
		$(_3d8).bind("_resize", function() {
			var opts = $.data(_3d8, "calendar").options;
			if (opts.fit == true) {
				_3d5(_3d8);
			}
			return false;
		});
        $(_3d8).find(".calendar-todayset").click(function(){
            var _today = new Date();
            var obj = {
                month: Number( _today.getMonth() + 1 ),
                year : Number( _today.getFullYear() )
            };
            _G2D( _3d8 ,obj );
        });
	};

    /**
     * 用途：获取等差数列
     * @param startYear ：起始值
     * @param sIndex ：开始
     * @param eIndex ：结束
     * @param flag true:向前递增
     * */
    function _getYears( startYear , sIndex , eIndex , flag ){
        var year = [];
        for( var jk = sIndex ; jk < eIndex ; jk ++ ){
            if( flag ){
                year.unshift( startYear - jk );
            }else{
                year.push(startYear + jk );
            }

        }
        return year ;
    }

    /**
     * 用途：中英文月份转换成阿拉伯数字
     * @param month ： 中英文月份
     * */
    function _C2D( month ){
        var _num = $.inArray( month,resource.CALENDAR_DEFAULTS_MONTHS);
        return _num + 1 ;
    }

    /**
     * 用途：翻到指定日期（值包含年月）
     * @param _3da : 组建dom引用
     * @param ynm : 只包含年份和月份的Date()对象
     * */
    function _G2D( _3da ,ynm ){
        var opts = $.data(_3da, "calendar").options;
        opts.month = ynm.month;
        opts.year = ynm.year;
        show(_3da);

        var menu = $(_3da).find(".calendar-menu-month-inner");
        menu.find("td.calendar-selected").removeClass("calendar-selected");
        menu.find("td:eq(" + (opts.month - 1) + ")").addClass("calendar-selected");
    }

	function _3d9(_3da, _3db) {
		var opts = $.data(_3da, "calendar").options;
		opts.month += _3db;
		if (opts.month > 12) {
			opts.year++;
			opts.month = 1;
		} else {
			if (opts.month < 1) {
				opts.year--;
				opts.month = 12;
			}
		}
		show(_3da);
		var menu = $(_3da).find(".calendar-menu-month-inner");
		menu.find("td.calendar-selected").removeClass("calendar-selected");
		menu.find("td:eq(" + (opts.month - 1) + ")").addClass("calendar-selected");
	};

	function _3dc(_3dd, _3de) {
		var opts = $.data(_3dd, "calendar").options;
		opts.year += _3de;
		show(_3dd);
		var menu = $(_3dd).find(".calendar-menu-year");
		menu.val(opts.year);
	};

	function _3df(_3e0) {
		var opts = $.data(_3e0, "calendar").options;
		$(_3e0).find(".calendar-menu").show();
		if ($(_3e0).find(".calendar-menu-month-inner").is(":empty")) {
			$(_3e0).find(".calendar-menu-month-inner").empty();
			var t = $("<table></table>").appendTo($(_3e0).find(".calendar-menu-month-inner"));
			var idx = 0;
			//判断是需要创建季节的日历 2015-1-9
			if(opts.seasonSwitch==true){
				for (var i = 0; i < 4; i++) {
					var tr = $("<tr></tr>").appendTo(t);
					for (var j = 0; j < 1; j++) {
						$("<td class=\"calendar-menu-month\"></td>").html(opts.seasons[idx++]).attr("abbr", idx).appendTo(tr);
					}
				}
			}else{
			for (var i = 0; i < 3; i++) {
				var tr = $("<tr></tr>").appendTo(t);
				for (var j = 0; j < 4; j++) {
					$("<td class=\"calendar-menu-month\"></td>").html(opts.months[idx++]).attr("abbr", idx).appendTo(tr);
				}
			}
			}
			$(_3e0).find(".calendar-menu-prev,.calendar-menu-next").hover(function() {
				$(this).addClass("calendar-menu-hover");
			}, function() {
				$(this).removeClass("calendar-menu-hover");
			});
			$(_3e0).find(".calendar-menu-next").click(function() {
				var y = $(_3e0).find(".calendar-menu-year");
				if (!isNaN(y.val())) {
					y.val(parseInt(y.val()) + 1);
				}
			});
			$(_3e0).find(".calendar-menu-prev").click(function() {
				var y = $(_3e0).find(".calendar-menu-year");
				if (!isNaN(y.val())) {
					y.val(parseInt(y.val() - 1));
				}
			});
			$(_3e0).find(".calendar-menu-year").keypress(function(e) {
				if (e.keyCode == 13) {
					_3e1();
				}
			});
			$(_3e0).find(".calendar-menu-month").hover(function() {
				$(this).addClass("calendar-menu-hover");
			}, function() {
				$(this).removeClass("calendar-menu-hover");
			}).click(function() {
				var menu = $(_3e0).find(".calendar-menu");
				$(this).addClass("calendar-selected");
				var year = menu.find(".calendar-menu-year").val();
				var month = menu.find(".calendar-selected").attr("abbr");
				if (!isNaN(year)) {
					opts.year = parseInt(year);
					opts.month = parseInt(month);
					opts.onSelect.call(_3e0, year + (opts.month <= 9 ? ('0' + opts.month) : opts.month));
				}
			});
		}

		function _3e1() {
			var menu = $(_3e0).find(".calendar-menu");
			var year = menu.find(".calendar-menu-year").val();
			var _3e2 = menu.find(".calendar-selected").attr("abbr");
			if (!isNaN(year)) {
				opts.year = parseInt(year);
				opts.month = parseInt(_3e2);
				show(_3e0);
			}
			menu.hide();
		};
		var body = $(_3e0).find(".calendar-body");
		var sele = $(_3e0).find(".calendar-menu");
		var _3e3 = sele.find(".calendar-menu-year-inner");
		var _3e4 = sele.find(".calendar-menu-month-inner");
		_3e3.find("input").val(opts.year).focus();
		_3e4.find("td.calendar-selected").removeClass("calendar-selected");
		_3e4.find("td:eq(" + (opts.month - 1) + ")").addClass("calendar-selected");
		sele._outerWidth(body._outerWidth());
		sele._outerHeight(body._outerHeight());
		_3e4._outerHeight(sele.height() - _3e3._outerHeight());
	};

	function _3e5(_3e6, year, _3e7) {
		var opts = $.data(_3e6, "calendar").options;
		var _3e8 = [];
		var _3e9 = new Date(year, _3e7, 0).getDate();
		for (var i = 1; i <= _3e9; i++) {
			_3e8.push([year, _3e7, i]);
		}
		var _3ea = [],
			week = [];
		var _3eb = 0;
		while (_3e8.length > 0) {
			var date = _3e8.shift();
			week.push(date);
			var day = new Date(date[0], date[1] - 1, date[2]).getDay();
			if (_3eb == day) {
				day = 0;
			} else {
				if (day == (opts.firstDay == 0 ? 7 : opts.firstDay) - 1) {
					_3ea.push(week);
					week = [];
				}
			}
			_3eb = day;
		}
		if (week.length) {
			_3ea.push(week);
		}
		var _3ec = _3ea[0];
		if (_3ec.length < 7) {
			while (_3ec.length < 7) {
				var _3ed = _3ec[0];
				var date = new Date(_3ed[0], _3ed[1] - 1, _3ed[2] - 1);
				_3ec.unshift([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
			}
		} else {
			var _3ed = _3ec[0];
			var week = [];
			for (var i = 1; i <= 7; i++) {
				var date = new Date(_3ed[0], _3ed[1] - 1, _3ed[2] - i);
				week.unshift([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
			}
			_3ea.unshift(week);
		}
		var _3ee = _3ea[_3ea.length - 1];
		while (_3ee.length < 7) {
			var _3ef = _3ee[_3ee.length - 1];
			var date = new Date(_3ef[0], _3ef[1] - 1, _3ef[2] + 1);
			_3ee.push([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
		}
		if (_3ea.length < 6) {
			var _3ef = _3ee[_3ee.length - 1];
			var week = [];
			for (var i = 1; i <= 7; i++) {
				var date = new Date(_3ef[0], _3ef[1] - 1, _3ef[2] + i);
				week.push([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
			}
			_3ea.push(week);
		}
		return _3ea;
	};

	function show(_3f0, monthSwitch) {
		var opts = $.data(_3f0, "calendar").options;
        //TODO  设置不可选   2015-4-28
        var disabledMinDate=opts.disabledMinDate;
        var  disabledMaxDate=opts.disabledMaxDate;

		//判断是否是选择季节2015-1-9
		if(opts.seasonSwitch==true){
			$(_3f0).find(".calendar-title span").html(opts.seasons[0] + " " + opts.year);
		}else{
            if(opts.dropMonthNYear){
                $(_3f0).find(".calendar-title.cal-tm span").html( opts.months[opts.month - 1] );
                $(_3f0).find(".calendar-title.cal-ty span").html( opts.year );
            }else{
                $(_3f0).find(".calendar-title span").html(opts.months[opts.month - 1] + " " + opts.year);
            }
		}
		var body = $(_3f0).find("div.calendar-body");
		body.find(">table").remove();
        //zws modify 2016年3月11日10:04:38 cellspacing 0 => 1
		var t = $("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><thead></thead><tbody></tbody></table>").prependTo(body);
		var tr = $("<tr></tr>").appendTo(t.find("thead"));
        //TODO 配置不显示日期中的星期
        var hideWeeks=opts.hideWeeks;
        if(!hideWeeks){
            /**屏蔽日历中星期显示 linguoyong 2013.1.11 因日期设计中有星期，所以需显示 lingy 20140703*/
            for(var i=opts.firstDay;i<opts.weeks.length;i++){
                tr.append("<th>"+opts.weeks[i]+"</th>");
            }
            for(var i=0;i<opts.firstDay;i++){
                tr.append("<th>"+opts.weeks[i]+"</th>");
            }
        }

		var _3f1 = _3e5(_3f0, opts.year, opts.month);
		for (var i = 0; i < _3f1.length; i++) {
			var week = _3f1[i];
			var tr = $("<tr></tr>").appendTo(t.find("tbody"));
			for (var j = 0; j < week.length; j++) {
				var day = week[j];
				var td=$("<td class=\"calendar-day calendar-other-month\"></td>").attr("abbr", day[0] + "," + day[1] + "," + day[2]).html(day[2]).appendTo(tr);
                //如果设置最小值，那么在这个值之前的都不能选   2015-4-28
                 //有最大最小限制
                if(disabledMinDate&&disabledMaxDate){
                    td.addClass("datebox-disabled"); //全部禁用
                    if(compareDisableMaxMin(disabledMaxDate,disabledMinDate,day)){
                        td.removeClass("datebox-disabled");
                        td.addClass("datebox-other-month");
                    };

                }else if(disabledMinDate||disabledMaxDate){//只有最大最小限制
                    td.addClass("datebox-disabled"); //全部禁用
                    var disableMinFlag=undefined;
                    if(disabledMinDate&&disabledMinDate.length>6){
                        disableMinFlag=true;
                        if(compareDisable(disabledMinDate,day,disableMinFlag)){
                            td.removeClass("datebox-disabled");
                            td.addClass("datebox-other-month");
                        };
                    }
                    if(disabledMaxDate&&disabledMaxDate.length>6){
                        disableMinFlag=false;
                        if(compareDisable(disabledMaxDate,day,disableMinFlag)){
                            td.removeClass("datebox-disabled");
                            td.addClass("datebox-other-month");
                        };
                    }
                }
			}
		}
		t.find("td[abbr^=\"" + opts.year + "," + opts.month + "\"]").removeClass("calendar-other-month");
		var now = new Date();
		var _3f2 = now.getFullYear() + "," + (now.getMonth() + 1) + "," + now.getDate();
		t.find("td[abbr=\"" + _3f2 + "\"]").addClass("calendar-today");
		if (opts.current) {
			t.find(".calendar-selected").removeClass("calendar-selected");
			var _3f3 = opts.current.getFullYear() + "," + (opts.current.getMonth() + 1) + "," + opts.current.getDate();
			//删除今天日期在下个月的选中状态   linguoyong 2013.1.28
			t.find("td[abbr=\"" + _3f3 + "\"]").parent().find(".calendar-other-month").removeClass("calendar-selected");

           //如果设置默认选中，日期默认选中 2015-5-19
            t.find("td[abbr=\"" + _3f3 + "\"]").addClass("calendar-selected");
		}
		var _3f4 = 6 - opts.firstDay;
		var _3f5 = _3f4 + 1;
		if (_3f4 >= 7) {
			_3f4 -= 7;
		}
		if (_3f5 >= 7) {
			_3f5 -= 7;
		}
		t.find("tr").find("td:eq(" + _3f4 + ")").addClass("calendar-saturday");
		t.find("tr").find("td:eq(" + _3f5 + ")").addClass("calendar-sunday");
		t.find("td").hover(function() {
			$(this).addClass("calendar-hover");
		}, function() {
			$(this).removeClass("calendar-hover");
		}).click(function() {
			//选中的日期，单击取消;未选中的日期，单击选中。linguoyong 2013.1.28
			if (monthSwitch == false) {
				if ($(this).attr("class").indexOf('calendar-selected') > 0) {
					$(this).removeClass("calendar-selected");
				} else {
					$(this).addClass("calendar-selected");
				}
			} else {
				//今天添加选中样式 linguoyong 2013.3.22
				t.find("td[abbr=\"" + _3f3 + "\"]").addClass("calendar-selected");
				t.find(".calendar-selected").removeClass("calendar-selected");
				$(this).addClass("calendar-selected");
			}
			var _3f6 = $(this).attr("abbr").split(",");
			opts.current = new Date(_3f6[0], parseInt(_3f6[1]) - 1, _3f6[2]);
			var date = opts.current;
			//格式化日期 linguoyong 2013.1.16
			var dateStr = date.getFullYear() + '' + ((date.getMonth() + 1) <= 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + (date.getDate() <= 9 ? '0' + date.getDate() : date.getDate());
			//  有最大最小设置不可选，那么日期框中不可选  2015-4-28
             var dateboxDisabled= $(this).hasClass("datebox-disabled");
            if(!dateboxDisabled){
                opts.onSelect.call(_3f0, dateStr);
            }
		});
	};
    //每个日期框中td  与最大最小禁用日期比较
    function compareDisable(disabledMinDate,day,disableMinFlag){
        var disableYear,disableMonth,disableDate;
        if(disabledMinDate&&disabledMinDate.length>6){
            disableYear=parseInt(disabledMinDate.substr(0,4),10);
            disableMonth=parseInt(disabledMinDate.substr(4,2),10);
            disableDate=parseInt(disabledMinDate.substr(6,2),10);
        }
        var disabled=new  Date(disableYear,disableMonth-1,disableDate);
        var date=new Date(day[0],day[1]-1,day[2]);
        var disabledTime=disabled.getTime();
        var dateTime=date.getTime();
        if(disableMinFlag){
            if(dateTime>=disabledTime){
                return true;
            }
        }else{
            if(dateTime<=disabledTime){
                return true;
            }
        }

    };
    //同时有最大最小限制
    function compareDisableMaxMin(disabledMaxDate,disabledMinDate,day){
        var disableMaxYear,disableMaxMonth,disableMaxDay;
        var disableMinYear,disableMinMonth,disableMinDay;
        if(disabledMaxDate&&disabledMaxDate.length>6){
            disableMaxYear=parseInt(disabledMaxDate.substr(0,4),10);
            disableMaxMonth=parseInt(disabledMaxDate.substr(4,2),10);
            disableMaxDay=parseInt(disabledMaxDate.substr(6,2),10);
        }
        if(disabledMinDate&&disabledMinDate.length>6){
            disableMinYear=parseInt(disabledMinDate.substr(0,4),10);
            disableMinMonth=parseInt(disabledMinDate.substr(4,2),10);
            disableMinDay=parseInt(disabledMinDate.substr(6,2),10);
        }
        var disabledMax=new  Date(disableMaxYear,disableMaxMonth-1,disableMaxDay);
        var disabledMin=new  Date(disableMinYear,disableMinMonth-1,disableMinDay);
        var date=new Date(day[0],day[1]-1,day[2])
        var disabledMaxTime=disabledMax.getTime();
        var disabledMinTime=disabledMin.getTime();
        var dateTime=date.getTime();
        if(disabledMinTime<=dateTime&&dateTime<=disabledMaxTime){
            return true;
        }
    };

	$.fn.calendar = function(_3f7, _3f8) {
		if (typeof _3f7 == "string") {
			return $.fn.calendar.methods[_3f7](this, _3f8);
		}
		_3f7 = _3f7 || {};
		return this.each(function() {
			var _3f9 = $.data(this, "calendar");
			if (_3f9) {
				$.extend(_3f9.options, _3f7);
			} else {
				_3f9 = $.data(this, "calendar", {
					options: $.extend({}, $.fn.calendar.defaults, $.fn.calendar.parseOptions(this), _3f7)
				});
				init(this, _3f9.options.monthSwitch);
			}
			if (_3f9.options.border == false) {
				$(this).addClass("calendar-noborder");
			}
			_3d5(this);
			show(this, _3f9.options.monthSwitch);
			$(this).find("div.calendar-menu").hide();
		});
	};
	$.fn.calendar.methods = {
		options: function(jq) {
			return $.data(jq[0], "calendar").options;
		},
		resize: function(jq) {
			return jq.each(function() {
				_3d5(this);
			});
		},
		moveTo: function(jq, date) {
			return jq.each(function() {
                    //dateinput和datespan组件，当选非今天的日期，值进入input框，选中状态还是只选择今天 linguoyong 2013.3.5
                    if ($.data(jq[0], "calendar").options.monthSwitch != false) {
                        $(this).parent().parent().find(".calendar-selected").removeClass("calendar-selected");
                    }
                    //如果设置默认日期，默认选中 2015-5-19
                    //此外yearcalendar的setValue会进入这个方法，所以需判断不为yearcalendar
                if ($.data(jq[0], "calendar").options.current && !$.data(jq[0], "calendar").options.isYearCalendar) {
                    var defaultDate=$.data(jq[0], "calendar").options.current;
                    var defaultSelected = (defaultDate.getFullYear() + "," + (defaultDate.getMonth() + 1) + "," + defaultDate.getDate()).replace(".", ",").replace(".", ",");
                    $(this).parent().parent().find("td[abbr=\"" + defaultSelected + "\"]").addClass("calendar-selected");
                    $(this).parent().parent().find("td[abbr=\"" + defaultSelected + "\"]").addClass("calendar-today");//加粗字体，引用today 样式
                    return;
                }

                    //多日期选定样式设置  linguoyong 2013.1.28
                    var dateStrArr = (date.getFullYear() + "," + (date.getMonth() + 1) + "," + date.getDate()).replace(".", ",").replace(".", ",");
                    $(this).parent().parent().find("td[abbr=\"" + dateStrArr + "\"]").addClass("calendar-selected");
                    $(this).parent().parent().find(".calendar-other-month").removeClass("calendar-selected");
                    //$(this).calendar({year:date.getFullYear(),month:date.getMonth()+1,current:date});
			});
		}
	};
	$.fn.calendar.parseOptions = function(_3fa) {
		var t = $(_3fa);
		return $.extend({}, $.parser.parseOptions(_3fa, ["width", "height", {
			firstDay: "number",
			fit: "boolean",
			border: "boolean"
		}]));
	};
	$.fn.calendar.defaults = {
		width: 180,
		height: 180,
		fit: false,
		border: true,
		firstDay: 0,
        weeks:resource.CALENDAR_DEFAULTS_WEEKS,
		months: resource.CALENDAR_DEFAULTS_MONTHS,
		seasons: resource.CALENDAR_DEFAULTS_SEASONS,
		year: new Date().getFullYear(),
		month: new Date().getMonth() + 1,
		current: new Date(),
		onSelect: function(date) {}
	};
})(jQuery);
(function($) {
	function init(_3fb) {
		var _3fc = $("<span class=\"spinner\">" + "<span class=\"spinner-arrow\">" + "<span class=\"spinner-arrow-up\"></span>" + "<span class=\"spinner-arrow-down\"></span>" + "</span>" + "</span>").insertAfter(_3fb);
		$(_3fb).addClass("spinner-text").prependTo(_3fc);
		return _3fc;
	};

	function _3fd(_3fe, _3ff) {
		var opts = $.data(_3fe, "spinner").options;
		var _400 = $.data(_3fe, "spinner").spinner;
		if (_3ff) {
			opts.width = _3ff;
		}
		var _401 = $("<div style=\"display:none\"></div>").insertBefore(_400);
		_400.appendTo("body");
		if (isNaN(opts.width)) {
			opts.width = $(_3fe).outerWidth();
		}
		_400._outerWidth(opts.width);
		// 将_400.width()换成opts.width-2
		$(_3fe)._outerWidth(opts.width - 2 - _400.find(".spinner-arrow").outerWidth());
		_400.insertAfter(_401);
		_401.remove();
	};

	function _402(_403) {
		var opts = $.data(_403, "spinner").options;
		var _404 = $.data(_403, "spinner").spinner;
		_404.find(".spinner-arrow-up,.spinner-arrow-down").unbind(".spinner");
		if (!opts.disabled) {
			_404.find(".spinner-arrow-up").bind("mouseenter.spinner", function() {
				$(this).addClass("spinner-arrow-hover");
			}).bind("mouseleave.spinner", function() {
				$(this).removeClass("spinner-arrow-hover");
			}).bind("click.spinner", function() {
				opts.spin.call(_403, false);
				opts.onSpinUp.call(_403);
				$(_403).validatebox("validate");
			});
			_404.find(".spinner-arrow-down").bind("mouseenter.spinner", function() {
				$(this).addClass("spinner-arrow-hover");
			}).bind("mouseleave.spinner", function() {
				$(this).removeClass("spinner-arrow-hover");
			}).bind("click.spinner", function() {
				opts.spin.call(_403, true);
				opts.onSpinDown.call(_403);
				$(_403).validatebox("validate");
			});
		}
	};

	function _405(_406, _407) {
		var opts = $.data(_406, "spinner").options;
		if (_407) {
			opts.disabled = true;
			$(_406).attr("disabled", true);
		} else {
			opts.disabled = false;
			$(_406).removeAttr("disabled");
		}
	};
	$.fn.spinner = function(_408, _409) {
		if (typeof _408 == "string") {
			var _40a = $.fn.spinner.methods[_408];
			if (_40a) {
				return _40a(this, _409);
			} else {
				return this.validatebox(_408, _409);
			}
		}
		_408 = _408 || {};
		return this.each(function() {
			var _40b = $.data(this, "spinner");
			if (_40b) {
				$.extend(_40b.options, _408);
			} else {
				_40b = $.data(this, "spinner", {
					options: $.extend({}, $.fn.spinner.defaults, $.fn.spinner.parseOptions(this), _408),
					spinner: init(this)
				});
				$(this).removeAttr("disabled");
			}
			$(this).val(_40b.options.value);
			$(this).attr("readonly", !_40b.options.editable);
			_405(this, _40b.options.disabled);
			_3fd(this);
			$(this).validatebox(_40b.options);
			_402(this);
		});
	};
	$.fn.spinner.methods = {
		options: function(jq) {
			var opts = $.data(jq[0], "spinner").options;
			return $.extend(opts, {
				value: jq.val()
			});
		},
		destroy: function(jq) {
			return jq.each(function() {
				var _40c = $.data(this, "spinner").spinner;
				$(this).validatebox("destroy");
				_40c.remove();
			});
		},
		resize: function(jq, _40d) {
			return jq.each(function() {
				_3fd(this, _40d);
			});
		},
		enable: function(jq) {
			return jq.each(function() {
				_405(this, false);
				_402(this);
			});
		},
		disable: function(jq) {
			return jq.each(function() {
				_405(this, true);
				_402(this);
			});
		},
		getValue: function(jq) {
			return jq.val();
		},
		setValue: function(jq, _40e) {
			return jq.each(function() {
				var opts = $.data(this, "spinner").options;
				opts.value = _40e;
				$(this).val(_40e);
			});
		},
		clear: function(jq) {
			return jq.each(function() {
				var opts = $.data(this, "spinner").options;
				opts.value = "";
				$(this).val("");
			});
		}
	};
	$.fn.spinner.parseOptions = function(_40f) {
		var t = $(_40f);
		return $.extend({}, $.fn.validatebox.parseOptions(_40f), $.parser.parseOptions(_40f, ["width", "min", "max", {
			increment: "number",
			editable: "boolean"
		}]), {
			value: (t.val() || undefined),
			disabled: (t.attr("disabled") ? true : undefined)
		});
	};
	$.fn.spinner.defaults = $.extend({}, $.fn.validatebox.defaults, {
		width: "auto",
		value: "",
		min: null,
		max: null,
		increment: 1,
		editable: true,
		disabled: false,
		spin: function(down) {},
		onSpinUp: function() {},
		onSpinDown: function() {}
	});
})(jQuery);
(function($) {
	function _410(_411) {
		var opts = $.data(_411, "numberspinner").options;
		$(_411).spinner(opts).numberbox(opts);
	};

	function _412(_413, down) {
		var opts = $.data(_413, "numberspinner").options;
		var v = parseFloat($(_413).numberbox("getValue") || opts.value) || 0;
		if (down == true) {
			v -= opts.increment;
		} else {
			v += opts.increment;
		}
		$(_413).numberbox("setValue", v);
	};
	$.fn.numberspinner = function(_414, _415) {
		if (typeof _414 == "string") {
			var _416 = $.fn.numberspinner.methods[_414];
			if (_416) {
				return _416(this, _415);
			} else {
				return this.spinner(_414, _415);
			}
		}
		_414 = _414 || {};
		return this.each(function() {
			var _417 = $.data(this, "numberspinner");
			if (_417) {
				$.extend(_417.options, _414);
			} else {
				$.data(this, "numberspinner", {
					options: $.extend({}, $.fn.numberspinner.defaults, $.fn.numberspinner.parseOptions(this), _414)
				});
			}
			_410(this);
		});
	};
	$.fn.numberspinner.methods = {
		options: function(jq) {
			var opts = $.data(jq[0], "numberspinner").options;
			return $.extend(opts, {
				value: jq.numberbox("getValue")
			});
		},
		setValue: function(jq, _418) {
			return jq.each(function() {
				$(this).numberbox("setValue", _418);
			});
		},
		getValue: function(jq) {
			return jq.numberbox("getValue");
		},
		clear: function(jq) {
			return jq.each(function() {
				$(this).spinner("clear");
				$(this).numberbox("clear");
			});
		}
	};
	$.fn.numberspinner.parseOptions = function(_419) {
		return $.extend({}, $.fn.spinner.parseOptions(_419), $.fn.numberbox.parseOptions(_419), {});
	};
	$.fn.numberspinner.defaults = $.extend({}, $.fn.spinner.defaults, $.fn.numberbox.defaults, {
		spin: function(down) {
			_412(this, down);
		}
	});
})(jQuery);
(function($) {
	function _41a(_41b) {
		var opts = $.data(_41b, "timespinner").options;
		$(_41b).spinner(opts);
		$(_41b).unbind(".timespinner");
		$(_41b).bind("click.timespinner", function() {
			var _41c = 0;
			if (this.selectionStart != null) {
				_41c = this.selectionStart;
			} else {
				if (this.createTextRange) {
					var _41d = _41b.createTextRange();
					var s = document.selection.createRange();
					s.setEndPoint("StartToStart", _41d);
					_41c = s.text.length;
				}
			}
			if (_41c >= 0 && _41c <= 2) {
				opts.highlight = 0;
			} else {
				if (_41c >= 3 && _41c <= 5) {
					opts.highlight = 1;
				} else {
					if (_41c >= 6 && _41c <= 8) {
						opts.highlight = 2;
					}
				}
			}
			_41f(_41b);
		}).bind("blur.timespinner", function() {
			//添加   当手动在timespinner输入框中输入时进行验证，注解掉当输入时间作特殊处理函数  _41e   linguoyong 2013.5.
			// _41e(_41b);
		});
	};

	function _41f(_420) {
		var opts = $.data(_420, "timespinner").options;
		var _421 = 0,
			end = 0;
		if (opts.highlight == 0) {
			_421 = 0;
			end = 2;
		} else {
			if (opts.highlight == 1) {
				_421 = 3;
				end = 5;
			} else {
				if (opts.highlight == 2) {
					_421 = 6;
					end = 8;
				}
			}
		}
		if (_420.selectionStart != null) {
			_420.setSelectionRange(_421, end);
		} else {
			if (_420.createTextRange) {
				var _422 = _420.createTextRange();
				_422.collapse();
				_422.moveEnd("character", end);
				_422.moveStart("character", _421);
				_422.select();
			}
		}
		$(_420).focus();
	};

	function _423(_424, _425) {
		var opts = $.data(_424, "timespinner").options;
		if (!_425) {
			return null;
		}
		var vv = _425.split(opts.separator);
		for (var i = 0; i < vv.length; i++) {
			if (isNaN(vv[i])) {
				return null;
			}
		}
		while (vv.length < 3) {
			vv.push(0);
		}
		return new Date(1900, 0, 0, vv[0], vv[1], vv[2]);
	};

	function _41e(_426) {
		var opts = $.data(_426, "timespinner").options;
		var _427 = $(_426).val();
		var time = _423(_426, _427);
		if (!time) {
			time = _423(_426, opts.value);
		}
		if (!time) {
			opts.value = "";
			$(_426).val("");
			return;
		}
		var _428 = _423(_426, opts.min);
		var _429 = _423(_426, opts.max);
		if (_428 && _428 > time) {
			time = _428;
		}
		if (_429 && _429 < time) {
			time = _429;
		}
		var tt = [_42a(time.getHours()), _42a(time.getMinutes())];
		if (opts.showSeconds) {
			tt.push(_42a(time.getSeconds()));
		}
		var val = tt.join(opts.separator);
		opts.value = val;
		$(_426).val(val);

		function _42a(_42b) {
			return (_42b < 10 ? "0" : "") + _42b;
		};
	};

	function _42c(_42d, down) {
		var opts = $.data(_42d, "timespinner").options;
		var val = $(_42d).val();
		if (val == "") {
			val = [0, 0, 0].join(opts.separator);
		}
		var vv = val.split(opts.separator);
		for (var i = 0; i < vv.length; i++) {
			vv[i] = parseInt(vv[i], 10);
		}
		if (down == true) {
			vv[opts.highlight] -= opts.increment;
		} else {
			vv[opts.highlight] += opts.increment;
		}
		$(_42d).val(vv.join(opts.separator));
		_41e(_42d);
		_41f(_42d);
	};
	$.fn.timespinner = function(_42e, _42f) {
		if (typeof _42e == "string") {
			var _430 = $.fn.timespinner.methods[_42e];
			if (_430) {
				return _430(this, _42f);
			} else {
				return this.spinner(_42e, _42f);
			}
		}
		_42e = _42e || {};
		return this.each(function() {
			var _431 = $.data(this, "timespinner");
			if (_431) {
				$.extend(_431.options, _42e);
			} else {
				$.data(this, "timespinner", {
					options: $.extend({}, $.fn.timespinner.defaults, $.fn.timespinner.parseOptions(this), _42e)
				});
				_41a(this);
			}
		});
	};
	$.fn.timespinner.methods = {
		options: function(jq) {
			var opts = $.data(jq[0], "timespinner").options;
			return $.extend(opts, {
				value: jq.val()
			});
		},
		setValue: function(jq, _432) {
			return jq.each(function() {
				$(this).val(_432);
				_41e(this);
			});
		},
		getHours: function(jq) {
			var opts = $.data(jq[0], "timespinner").options;
			var vv = jq.val().split(opts.separator);
			return parseInt(vv[0], 10);
		},
		getMinutes: function(jq) {
			var opts = $.data(jq[0], "timespinner").options;
			var vv = jq.val().split(opts.separator);
			return parseInt(vv[1], 10);
		},
		getSeconds: function(jq) {
			var opts = $.data(jq[0], "timespinner").options;
			var vv = jq.val().split(opts.separator);
			return parseInt(vv[2], 10) || 0;
		}
	};
	$.fn.timespinner.parseOptions = function(_433) {
		return $.extend({}, $.fn.spinner.parseOptions(_433), $.parser.parseOptions(_433, ["separator", {
			showSeconds: "boolean",
			highlight: "number"
		}]));
	};
	$.fn.timespinner.defaults = $.extend({}, $.fn.spinner.defaults, {
		separator: ":",
		showSeconds: false,
		highlight: 0,
		spin: function(down) {
			_42c(this, down);
		}
	});
})(jQuery);
(function($) {
	var _434 = 0;

	function _435(a, o) {
		for (var i = 0, len = a.length; i < len; i++) {
			if (a[i] == o) {
				return i;
			}
		}
		return -1;
	};
	//实现数据格式的转换 YH 2013.1.31 
	//修复可能存在空的问题 2013/05/14 famingyuan
	//添加ccbs支持  至少会返回原始值 2013/06/14

	function formatGridData(opts, data) {
		if (opts.isCCBS || (opts.totalPath && opts.rowsPath && !data.rows && !data.total)) {
			var realdata = {
				"total": 0,
				"rows": []
			};
			var totalpath = opts.totalPath;
			var rowspath = opts.rowsPath;
			var totalStr = "data." + totalpath;
			var rowsStr = "data." + rowspath;
			var total = 0;
			var rows = [];
			try {
				total = eval(totalStr);
			} catch (e) {
				if (typeof(console) != "undefined") {
					console.log(totalStr + "  对应字段不存在！");
				}
				total = 0;
			}
			try {
				rows = eval(rowsStr);
			} catch (e) {
				if (typeof(console) != "undefined") {
					console.log(rowsStr + "  对应字段不存在！");
				}
				rows = [];
			}
			// realdata["total"] = total;
			// realdata["rows"] = rows;
			// realdata["total"] = (total == undefined) ? 0 : total;
			realdata["rows"] = (rows == undefined) ? [] : rows;
			realdata["total"] = (total == undefined) ? 0 : total;

			if (opts.isCCBS) {
				realdata["total"] = realdata["total"] ? realdata["total"] : (realdata["rows"].length || 0);
			}

			for (var k in data) {
				realdata[k] = data[k];
			}
			return realdata;
		}
		return data;
	};

	function _436(a, o, id) {
		if (typeof o == "string") {
			for (var i = 0, len = a.length; i < len; i++) {
				if (a[i][o] == id) {
					a.splice(i, 1);
					return;
				}
			}
		} else {
			var _437 = _435(a, o);
			if (_437 != -1) {
				a.splice(_437, 1);
			}
		}
	};

	function _438(_439, _43a) {
		var opts = $.data(_439, "datagrid").options;
		var _43b = $.data(_439, "datagrid").panel;
		if (_43a) {
			if (_43a.width) {
				opts.width = _43a.width;
			}
			if (_43a.height) {
				opts.height = _43a.height;
			}
		}
		if (opts.fit == true) {
			var p = _43b.panel("panel").parent();
			opts.width = p.width();
			opts.height = p.height();
		}
		_43b.panel("resize", {
			width: opts.width,
			height: opts.height
		});
	};
	// 高度修改  famingyuan 2013/04/22 
	// update 2013/04/25 更新panel设置高度
	// 修复设置高度时存在NAN 问题
	// 修复存在footer情况 rowNumber列于footer列不在同一高度上
	// update 2013/05/07 修复无数据 无分页情况下 下边框不显示的bug
	// update 2013/05/29 修复
	// update 2013/05/29 修复在无分页栏情况下 显示不全的问题
	// update 2013/06/03 修复 自适应高度 无法反弹的问题
	// update 2013/06/03 修复 toolbar高度获取时 存在2px像素差的问题
	// update 2013/07/15 修复只在客户端中存在的2px问题以及实现高度统一

	function fixGridHeight(baseDom, from) {

		var name = "fixGridHeight";
		var data = $.data(baseDom, "datagrid").data;
		var dc = $.data(baseDom, "datagrid").dc;
		var opts = $.data(baseDom, "datagrid").options;
		if (opts.justReturn) {
			return;
		}

		var view = dc.view;
		var view1 = dc.view1;
		var view2 = dc.view2;
		var body1 = dc.body1.parent("div.datagrid-body:first");
		var body2 = dc.body2;

		var panel = null;
		var toolBar = null;
		var pager = null;

		// 添加treegrid , 暂时pass
		var treeData = $.data(baseDom, "treegrid");
		if (treeData && treeData.data) {
			return;
		}

		// 暂时针对grid ， treegrid暂时不考虑
		if ($.data(baseDom, "datagrid")) {
			panel = $.data(baseDom, "datagrid").panel;
			toolBar = $("div.datagrid-toolbar", panel);
			pager = $("div.datagrid-pager", panel);
		}
		
		if (opts.isAutoSizeHeight) {
			// 针对clearData 设置到最小高度的问题
			if (opts.isSetToMinHeight) {
				opts.isSetToMinHeight = false;
				setToMinHeight();
			}
			return;
		}

		if (panel && !panel.baseHeight) {
			panel.baseHeight = panel.height();
		} else if (panel && panel.baseHeight < panel.height()) {
			panel.baseHeight = panel.height();
		}

		/*高度设置逻辑 */
		if (data.total > 0 || (data.rows && data.rows.length > 0)) {

			// 页脚
			var adxFooter = (opts.showFooter && data.footer && data.footer.length > 0) ? 26 : 0;

			/*可能没有footer 但是却有showFooter情况*/
			if (opts.showFooter && adxFooter == 0) {
				/*奇葩情况*/
				adxFooter = 1;
			}

			/*标题高度*/
			var titleHeight = opts.title?29:0;

			// 分页栏
			var pagerHeight = (opts.pagination ? 30 : 0);
			// toolbar
			var toolBarHeight = toolBar.height() || 30;

			toolBarHeight += 2; // toolbar的高度需要包含有内边距

			// 设置view view1 view2的高度 
			view.height(opts.height - toolBarHeight - pagerHeight-titleHeight);

			view1.height(view.height());
			view2.height(view.height());

			var grid_header_height = $("div.datagrid-header", view2).height() || 30;
			// body2 高度
			body2.height(view2.height() - grid_header_height - adxFooter);
			body1.height(body2.height()); //内层div设置为auto ，外层已设为固定值  

			/*附加信息高度*/
			var additionalHeight = opts.showAdditionalInfo ? dc.additionalInfo.outerHeight() : 0;

			if (panel) {
				panel.height(view.outerHeight() + toolBarHeight + pagerHeight + additionalHeight);
			}
		} else {
			setToMinHeight();
		}

		// 设置到最小高度

		function setToMinHeight() {
			if (opts.isFixedHeight) {
				return;
			}
			// 修复 自适应高度 无法反弹的问题
			if (opts.isAutoSizeHeight) {
				body1.css("height", "auto");
				body2.css("height", "auto");
				view1.css("height", "auto");
				view2.css("height", "auto");
				view.css("height", "auto");
				panel.css("height", "auto");
				return;
			}

			body1.height("90px");
			body2.height("90px");
			// 页脚
			var adxFooter = (opts.showFooter && data.footer && data.footer.length > 0) ? 26 : 0;
			// 分页栏
			var pagerHeight = (opts.pagination ? 30 : 0);
			// toolbar
			var toolBarHeight = toolBar.height() || 0;
			// 表头高度
			var grid_header_height = $("div.datagrid-header", view2).height() || 30;

			view2.height(adxFooter + 90 + grid_header_height);
			view1.height(view2.height());
			view.height(view2.height());

			var viewHeight = view.height();
			if (panel) {
				var additionalHeight = opts.showAdditionalInfo ? dc.additionalInfo.outerHeight() : 0;
				var totalHeight = toolBarHeight + viewHeight + pagerHeight + additionalHeight + 2;
				if (!opts.pagination) {
					totalHeight += 2;
				}
				panel.height(totalHeight);
			}

		};
	};
	

	function _43c(_43d) {
		var opts = $.data(_43d, "datagrid").options;
		var dc = $.data(_43d, "datagrid").dc;
		var wrap = $.data(_43d, "datagrid").panel;
		var _43e = wrap.width();
		// ===============1. 修复宽度自适应全屏时 左边框可能看不清楚的问题======================
		// ===============2. 修复分页栏在右边看不到的问题=====================
		// ===============3. 修复grid纵向滚动条被外层纵向滚动条挡住的问题 2013/07/15=====================
		if (!opts.basePanelWidth) {
			var fixScrollBarHover = 17;
			if ($.browser.msie) {
				try {
					/*IE6/7 由于始终存在滚动条位置 故需设置为0*/
					var ieVersion = parseInt($.browser.version);
					if ((ieVersion == 6) || (ieVersion == 7)) {
						fixScrollBarHover = 0;
					}
				} catch (e) {
					fixScrollBarHover = 17;
				}
			}
			opts.basePanelWidth = _43e - fixScrollBarHover;
		}
		if (opts.isAutoSizeWidth || opts.width == "auto") { // XF
			/*在auto情况下 ，让表格离左右边各1px 好让边框更显眼*/
			wrap.css("margin-left", "1px");
			wrap.css("margin-right", "1px");
			/*待提交 --- 需与_483方法配合*/
			// _43e = opts.basePanelWidth;
			// wrap.width(_43e - 2);
			// _43e = _43e - 2;
			/*修复外层宽度可能为0的情况*/
			if(opts.basePanelWidth<=0 || !opts.basePanelWidth){
				opts.basePanelWidth=0;
				var datagridPanel = wrap.parent(".datagrid");
				if(datagridPanel.length>0 && datagridPanel.is(":visible")){
						var tmpValue = datagridPanel.width();
						if(tmpValue>10){
							opts.basePanelWidth = tmpValue; 
						}else{
							opts.needResize = true;
							return;
						}
				}
				_43e = opts.basePanelWidth;
				wrap.width(_43e - 2);
				_43e = _43e - 2;
			}else{
				_43e = opts.basePanelWidth;
				wrap.width(_43e - 2);
				_43e = _43e - 2;
			}
		}
		dc.panelHeader && dc.panelHeader.outerWidth(_43e);
		// ------------------------------------------------
		var _43f = wrap.height();
		var view = dc.view;
		var _440 = dc.view1;
		var _441 = dc.view2;
		var _442 = _440.children("div.datagrid-header");
		var _443 = _441.children("div.datagrid-header");
		var _444 = _442.find("table");
		var _445 = _443.find("table");
		view.width(_43e - 2); //修改grid view 边框像素 YH 2013.3.8
		var _446 = _442.children("div.datagrid-header-inner").show();
		_440.width(_446.find("table").width());
		if (!opts.showHeader) {
			_446.hide();
		}
		// _441.width(_43e - _440._outerWidth()); 
		/*修改宽度设置 以提供间距 实现外边框与内边框 2013/07/23*/
		_441.width(_43e - _440._outerWidth() - 3);

		_440.children("div.datagrid-header,div.datagrid-body,div.datagrid-footer").width(_440.width());
		_441.children("div.datagrid-header,div.datagrid-body,div.datagrid-footer").width(_441.width());
		var hh;
		_442.css("height", "");
		_443.css("height", "");
		_444.css("height", "");
		_445.css("height", "");
		hh = Math.max(_444.height(), _445.height());
		_444.height(hh);
		_445.height(hh);
		_442.add(_443)._outerHeight(hh);
		if (opts.height != "auto") {
			var _447 = _43f - _441.children("div.datagrid-header")._outerHeight() - _441.children("div.datagrid-footer")._outerHeight() - wrap.children("div.datagrid-toolbar")._outerHeight();
			wrap.children("div.datagrid-pager").each(function() {
				_447 -= $(this)._outerHeight();
			});
			_440.children("div.datagrid-body").height(_447);
			_441.children("div.datagrid-body").height(_447);
		}
		view.height(_441.height() - 2); //修改grid view 边框高度 YH 2013.3.8
		_441.css("left", _440._outerWidth());
		fixGridHeight(_43d);

	};

	function _448(_449, _44a, _44b) {
		var rows = $.data(_449, "datagrid").data.rows;
		var opts = $.data(_449, "datagrid").options;
		var dc = $.data(_449, "datagrid").dc;
		if (!dc.body1.is(":empty") && (!opts.nowrap || opts.autoRowHeight || _44b)) {
			if (_44a != undefined) {
				var tr1 = opts.finder.getTr(_449, _44a, "body", 1);
				var tr2 = opts.finder.getTr(_449, _44a, "body", 2);
				_44c(tr1, tr2);
			} else {
				var tr1 = opts.finder.getTr(_449, 0, "allbody", 1);
				var tr2 = opts.finder.getTr(_449, 0, "allbody", 2);
				_44c(tr1, tr2);
				if (opts.showFooter) {
					var tr1 = opts.finder.getTr(_449, 0, "allfooter", 1);
					var tr2 = opts.finder.getTr(_449, 0, "allfooter", 2);
					_44c(tr1, tr2);
				}
			}
		}
		_43c(_449);
		if (opts.height == "auto") {
			var _44d = dc.body1.parent();
			var _44e = dc.body2;
			var _44f = 0;
			var _450 = 0;
			_44e.children().each(function() {
				var c = $(this);
				if (c.is(":visible")) {
					_44f += c._outerHeight();
					if (_450 < c._outerWidth()) {
						_450 = c._outerWidth();
					}
				}
			});
			if (_450 > _44e.width()) {
				_44f += 18;
			}

			// 控制删除数据时的最小高度
			if (_44f < 90) {
				_44f = 90;
			}
			/*设置只适应高度时  最大高度*/
			if (opts.isAutoSizeHeight && opts.maxAutoSizeHeight && _44f > opts.maxAutoSizeHeight) {
				_44f = opts.maxAutoSizeHeight;
			}
			_44d.height(_44f);
			_44e.height(_44f);
			dc.view.height(dc.view2.height());
		}
		dc.body2.triggerHandler("scroll");

		function _44c2(trs1, trs2) {
			for (var i = 0; i < trs2.length; i++) {
				var tr1 = $(trs1[i]);
				var tr2 = $(trs2[i]);
				tr1.css("height", "");
				tr2.css("height", "");
				// var _451 = Math.max(tr1.height(), tr2.height());
				/*修复一开始就选中一行时 grid的左右两个tr错位的问题 2013/08/08*/
				var _451 = Math.max(tr1.outerHeight(), tr2.outerHeight());
				_451 = _451 + 1;
				tr1.outerHeight(_451);
				tr2.outerHeight(_451);
			}
		};
		function _44c(trs1, trs2) {
			for (var i = 0; i < trs2.length; i++) {
				var tr1 = $(trs1[i]);
				var tr2 = $(trs2[i]);
				tr1.css("height", "");
				tr2.css("height", "");
				var _451 = Math.max(tr1.height(), tr2.height());
				var adx = 2;
				switch (opts.ieVersion) {
					case -1:
						tr1.height(_451 + adx);
						tr2.height(_451 + adx);
						break;
					case 9:
						tr1.height(_451 + adx);
						tr2.height(_451 + adx);
						break;
					case 8:
						tr1.height(_451 + adx);
						tr2.height(_451 + adx);
						break;
					case 7:
						tr1.height(_451);
						tr2.height(_451);
						break;
					case 6:
						tr1.height(_451 + adx);
						tr2.height(_451 + adx);
						break;
					default:
						tr1.height(_451 + adx);
						tr2.height(_451 + adx);
				}
			}
		};
	};

	function _452(_453, _454,__opts) {
		function _455() {
			var _456 = [];
			var _457 = [];
			$(_453).children("thead").each(function() {
				var opt = $.parser.parseOptions(this, [{
					frozen: "boolean"
				}]);
				$(this).find("tr").each(function() {
					var cols = [];
					$(this).find("th").each(function() {
						var th = $(this);
						var col = $.extend({}, $.parser.parseOptions(this, ["field", "align", {
							sortable: "boolean",
							checkbox: "boolean",
							resizable: "boolean"
						}, {
							rowspan: "number",
							colspan: "number",
							width: "number"
						}]), {
							title: (th.html() || undefined),
							hidden: (th.attr("hidden") ? true : undefined),
							formatter: (th.attr("formatter") ? eval(th.attr("formatter")) : undefined),
							styler: (th.attr("styler") ? eval(th.attr("styler")) : undefined)
						});
						if (!col.align) {
							col.align = "left";
						}
						if (th.attr("editor")) {
							var s = $.trim(th.attr("editor"));
							if (s.substr(0, 1) == "{") {
								col.editor = eval("(" + s + ")");
							} else {
								col.editor = s;
							}
						}
						cols.push(col);
					});
					opt.frozen ? _456.push(cols) : _457.push(cols);
				});
			});
			return [_456, _457];
		};
		// 在最外层div设置align=center之后 分页栏位按钮显示异常 此处补充设置align="left" 让其显示ok  2015-05-27 famingyuan
		var _458 = $("<div class=\"datagrid-wrap\">" + "<div class=\"datagrid-view\" "+(__opts.supportAutoCenter===true?" align=\"left\" ":"")+">" + "<div class=\"datagrid-view1\">" + "<div class=\"datagrid-header\">" + "<div class=\"datagrid-header-inner\"></div>" + "</div>" + "<div class=\"datagrid-body\">" + "<div class=\"datagrid-body-inner\"></div>" + "</div>" + "<div class=\"datagrid-footer\">" + "<div class=\"datagrid-footer-inner\"></div>" + "</div>" + "</div>" + "<div class=\"datagrid-view2\">" + "<div class=\"datagrid-header\">" + "<div class=\"datagrid-header-inner\"></div>" + "</div>" + "<div class=\"datagrid-body\"></div>" + "<div class=\"datagrid-footer\">" + "<div class=\"datagrid-footer-inner\"></div>" + "</div>" + "</div>" + "</div>" + "</div>").insertAfter(_453);
		_458.panel({
			doSize: false
		});
		_458.panel("panel").addClass("datagrid").bind("_resize", function(e, _459) {
			var opts = $.data(_453, "datagrid").options;
			if (opts.fit == true || _459) {
				_438(_453);
				setTimeout(function() {
					if ($.data(_453, "datagrid")) {
						_45a(_453);
					}
				}, 0);
			}
			return false;
		});
		$(_453).hide().appendTo(_458.children("div.datagrid-view"));
		var cc = _455();
		var view = _458.children("div.datagrid-view");
		var _45b = view.children("div.datagrid-view1");
		var _45c = view.children("div.datagrid-view2");
		return {
			panel: _458,
			frozenColumns: cc[0],
			columns: cc[1],
			dc: {
				view: view,
				view1: _45b,
				view2: _45c,
				header1: _45b.children("div.datagrid-header").children("div.datagrid-header-inner"),
				header2: _45c.children("div.datagrid-header").children("div.datagrid-header-inner"),
				body1: _45b.children("div.datagrid-body").children("div.datagrid-body-inner"),
				body2: _45c.children("div.datagrid-body"),
				footer1: _45b.children("div.datagrid-footer").children("div.datagrid-footer-inner"),
				footer2: _45c.children("div.datagrid-footer").children("div.datagrid-footer-inner")
			}
		};
	};

	function _45d(_45e) {
		var data = {
			total: 0,
			rows: []
		};
		var _45f = _460(_45e, true).concat(_460(_45e, false));
		$(_45e).find("tbody tr").each(function() {
			data.total++;
			var col = {};
			for (var i = 0; i < _45f.length; i++) {
				col[_45f[i]] = $("td:eq(" + i + ")", this).html();
			}
			data.rows.push(col);
		});
		return data;
	};

	function _461(_462) {
		var _463 = $.data(_462, "datagrid");
		var opts = _463.options;
		var dc = _463.dc;
		var _464 = _463.panel;
		_464.panel($.extend({}, opts, {
			id: null,
			doSize: false,
			onResize: function(_465, _466) {
				setTimeout(function() {
					if ($.data(_462, "datagrid")) {
						_43c(_462);
						/*修复表格外层宽度为0的情况*/
						if(opts.needResize&&!opts.hasResize){
							setTimeout(function  () {
								_43c(_462);
								_483(_462);
								opts.onResize.call(_464, _465, _466);
							},0);
							opts.needResize=false;
							opts.hasResize = true;
							return;
						}
						_483(_462);
						opts.onResize.call(_464, _465, _466);
					}
				}, 0);
			},
			onExpand: function() {
				_448(_462);
				opts.onExpand.call(_464);
			},
			onCollapse:function  () {
				opts.onCollapse&&opts.onCollapse.call(_464);  
			}
		}));
		_463.rowIdPrefix = "datagrid-row-r" + (++_434);
		_467(dc.header1, opts.frozenColumns, true);
		_467(dc.header2, opts.columns, false);
		_468();
		dc.header1.add(dc.header2).css("display", opts.showHeader ? "block" : "none");
		dc.footer1.add(dc.footer2).css("display", opts.showFooter ? "block" : "none");
		if (opts.toolbar) {
			if (typeof opts.toolbar == "string") {
				$(opts.toolbar).addClass("datagrid-toolbar").prependTo(_464);
				$(opts.toolbar).show();
			} else {
				$("div.datagrid-toolbar", _464).remove();
				// m1
				$("div.datagrid-toolbar-container",_464).remove();
				// 添加左右箭头 
				// 恰好容纳条件
				// (按钮宽度+5px )*number + 4 <=conf.width
				// 或者
				// (按钮宽度+5px )*number<=toolbar.width()
				// m2
				// 24*(73) 
				// var tb = $("<div class=\"datagrid-toolbar\"></div>").prependTo(_464);
				var tb = $("<div class=\"datagrid-toolbar\"><div class=\"datagrid-toolbar-container\"><div class=\"datagrid-toolbar-entity\"></div></div></div>").prependTo(_464);
				tb = $("div.datagrid-toolbar-entity",tb);
				for (var i = 0; i < opts.toolbar.length; i++) { //循环生成toolbar按钮 YH 2013.2.7
					var btn = opts.toolbar[i];
					if (btn == "-") {
						$("<div class=\"datagrid-btn-separator\"></div>").appendTo(tb);
					} else {
						if (btn.dom) { //生成submitButton按钮 YH 2013.2.7
							var tool = $("<a href=\"##\" id='" + btn.dom + "' ></a>");
							tool.css("float", btn.align || "left").appendTo(tb);
						} else {
							// var tool = $("<a href=\"javascript:void(0)\"></a>");
							btn.key = btn.key ? btn.key : "";
							var tool = $('<a href=\"##\" id=\"' + btn.key + '\"></a>');
							// tool[0].onclick = eval(btn.handler || function() {});
							tool[0].onclick = (function(handler) {
								return function() {
									if (handler) {
										handler();
									}
									return false;
								}
							})(btn.handler);
							// 采用新的linkbutton , famingyuan 2013/02/19 
							tool.css("float", btn.align || "left").appendTo(tb).pjfLinkButton($.extend({}, btn, {
								plain: true
							}));
						}
					}
				} 
			}
		} else {
			$("div.datagrid-toolbar", _464).remove();
		}

		/*=============放置在分页栏的前面=======================*/
		/*无论是否显示 都先设置好*/
		$("div.datagrid-additional-info", _464).remove();
		var additionalInfo = $("<div class=\"datagrid-additional-info\"></div>");
		additionalInfo.appendTo(_464);
		dc.additionalInfo = additionalInfo;
		/*====================================*/

		$("div.datagrid-pager", _464).remove();
		if (opts.pagination) {
			// 在最外层div设置align=center之后 分页栏位按钮显示异常 此处补充设置align="left" 让其显示ok  2015-05-27 famingyuan
			var _469 = $("<div class=\"datagrid-pager\""+(opts.supportAutoCenter===true?" align=\"left\" ":"")+"></div>");
			if (opts.pagePosition == "bottom") {
				_469.appendTo(_464);
			} else {
				if (opts.pagePosition == "top") {
					_469.addClass("datagrid-pager-top").prependTo(_464);
				} else {
					var ptop = $("<div class=\"datagrid-pager datagrid-pager-top\"></div>").prependTo(_464);
					_469.appendTo(_464);
					_469 = _469.add(ptop);
				}
			}
			//给grid的分页组件增加自定义事件 YH 2012.12.4
			// 添加beforeRefresh 接口 ， famingyuan 2013/04/17
			_469.pagination({
				// add for CCBS mode
				// 此处准确来讲 isCCBS 是一个通常 
				// 相当于判断是否为非普通分页模式 而不仅仅表示是否为CCBS分页模式
				isCCBS: opts.isCCBS,
				// 采用请求类型来控制按钮显示  以适配之后新的需求
				reqType: opts.reqType,

				isFirstCCBSReq: opts.isFirstCCBSReq,
				ccbsReqFlag: opts.ccbsReqFlag,
				// end 
				showNumberSize: opts.showNumberSize || 5, // 显示多少个按钮
				/*是否显示总记录树*/
				isShowTotal: opts.isShowTotal,
				/*是否显示分页栏右边区域*/
				isShowPaginationArea:opts.isShowPaginationArea,				
				/*高性能模式下 关闭分页栏下多余的按钮*/
				highPerformance:opts.highPerformance,

				// 是否只显示上一页和下一页按钮
				isShowPrevNextBtnOnly:opts.isShowPrevNextBtnOnly,
				// 是否显示分页数字按钮 
				isShowPaginationNumber:opts.isShowPaginationNumber,

				total: 0,
				endHandler: opts.endHandler,
				firstHandler: opts.firstHandler,
				enterHandler: opts.enterHandler,
				prevHandler: opts.prevHandler,
				nextHandler: opts.nextHandler,
				// 点击分页按钮以及刷新按钮时 添加的回调
				pageChangeHandler: opts.pageChangeHandler,

				onBeforeRefresh: opts.beforeRefresh,
				pagegroup: opts.pagegroup,
				pageNumber: opts.pageNumber,
				/*高性能模式下 不显示pageList*/
				showPageList: (opts.highPerformance?false:opts.showPageList) ,
				/*高性能模式下 不显示刷新按钮*/
				showRefresh:opts.highPerformance?false:true,
				pageSize: opts.pageSize,
				pageList: opts.pageList,
				onSelectPage: function(_46a, _46b) {
					opts.pageNumber = _46a;
					opts.pageSize = _46b;
					_469.pagination("refresh", {
						pageNumber: _46a,
						pageSize: _46b
					});
					_537(_462);
				},
				//对当前分页器组号赋值 YH 2012.12.10
				onPagegroupSelect: function(pagegroup) {
					opts.pagegroup = pagegroup;
					_469.pagination("refresh", {
						pagegroup: pagegroup
					});
				},
				// 添加清空选中接口 , add by famingyuan ,2013/05/02
				clearSelections: function() {
					$(_462).datagrid("clearSelections");
				}
			});
			opts.pageSize = _469.pagination("options").pageSize;
		}
		/*保存panel标题栏*/
		if (opts.title) {
			var panel_header = _464.prev("div.panel-header");
			if (panel_header && panel_header.length == 1) {
				dc.panelHeader = panel_header;
			}
		}
		// _46e 为flag 标示是否为冻结列的渲染
		// _467(dc.header1, opts.frozenColumns, true);
		// _467(dc.header2, opts.columns, false); 
		// 实现要求：
		// 1. 纵向表格最后一列永远不加边框
		// 2. 左侧冻结列，如果只有一列且为checkbox 则不加边框，
		// 3. col中加属性表示这一列是否加上了边框 col.isAddedBorder default false
		function _467(_46c, _46d, _46e) {
			if (!_46d) {
				return;
			}
			$(_46c).show();
			$(_46c).empty();
			var t = $("<table class=\"datagrid-htable\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody></tbody></table>").appendTo(_46c);
			for (var i = 0; i < _46d.length; i++) {
				var tr = $("<tr class=\"datagrid-header-row\"></tr>").appendTo($("tbody", t));
				var cols = _46d[i];
				var colsMaxIndex = cols.length -1; // 表示冻结列或者非冻结列的最大索引 ，cols.length为冻结的列的数量
				for (var j = 0; j < cols.length; j++) {
					var col = cols[j];
					var attr = "";
					if (col.rowspan) {
						attr += "rowspan=\"" + col.rowspan + "\" ";
					}
					if (col.colspan) {
						attr += "colspan=\"" + col.colspan + "\" ";
					}
					// 如果是纵向列表且显示表头边框
					if(opts.showBorder){
						if(_46e){// 冻结列渲染
							// 左侧冻结列，如果只有一列且为checkbox 则不加边框
							if(colsMaxIndex==0&&col.checkbox===true){
								// pass
							}else{
								if (opts.verColumn){ // 如果是纵向列表
									// 纵向表格
									if (opts.verColumnLevel == 1) {
										attr +='class="ver-header-right-border "';
									}else{
										attr +='class="ver-header-right-border ver-header-right-multilevel-border "';
									}
								}else{
									attr +='class="header-right-border "';
								}
								col.isAddedBorder = true;
							}							
						}else{// 非冻结列
							// 最后一列永远不加边框
							if(colsMaxIndex==j&&i==0){ // i 为0 对于复合表头而言，表示渲染的是大标题
								// pass
							}else{
								if (opts.verColumn){ // 如果是纵向列表
									// 纵向表格
									if (opts.verColumnLevel == 1) {
										attr +='class="ver-header-right-border "';
									}else{
										attr +='class="ver-header-right-border ver-header-right-multilevel-border "';
									}
								}else{
									attr +='class="header-right-border "';
								}
								col.isAddedBorder = true;
							}
						}
					}
					var td = $("<td " + attr + "></td>").appendTo(tr);
					if (col.checkbox) {
						td.attr("field", col.field);
						// $("<div class=\"datagrid-header-check\"></div>").html("<input type=\"checkbox\"/>").appendTo(td);
						$("<div class=\"datagrid-header-check\"></div>").html("<input type=\"checkbox\" textContent=\"header\" " + ((opts.singleSelect||opts.isShowSelectAllCheckBox===false) ? "style=\"display:none\"" : "") + "/><span class=\"grid-head-ck-desc\" "+((opts.singleSelect||opts.isShowSelectAllCheckBox===false) ? "style=\"display:none\"" : "")+">"+resource.GRID_SELECT_ALL+"</span>").appendTo(td);
					} else {
						if (col.field) {
							td.attr("field", col.field);
                            /**
                             * 用途：双层菜单实现斜线切割
                             * 原理：利用背景图片完成斜线，2x2漂浮实现内容定位
                             * 缺点: 1.斜线因为样式所限，无法完全贯穿对角线
                             *      2.表头菜单文字不能太多且不能换行，4个字为上限
                             * */
                            if( $.isArray( col.title ) && col.rowspan > 1 ){
                                var doubleHeaderDom = "<div class=\"datagrid-cell\" style='height:50px;'>" +
                                                        "<div class='datagrid-header-subCell datagrid-header-italic'></div>" +  //左上斜线框
                                                        "<div class='datagrid-header-subCell'>" +                               //水平表头框
                                                            "<span></span>" +
                                                        "</div>" +
                                                        "<div class='datagrid-header-subCell'>" +                               //垂直表头框
                                                            "<span></span>" +
                                                            "<span class=\"datagrid-sort-icon\"></span>" +
                                                        "</div>" +
                                                        "<div class='datagrid-header-subCell datagrid-header-italic'></div>" +  //右下斜线框
                                                       "</div>"

                                td.append( doubleHeaderDom );
                                $("span:first", td).html(col.title[0]); //水平表头添加文字
                                $("span:eq(1)", td).html(col.title[1]); //垂直表头添加文字
                                $("span.datagrid-sort-icon", td).html("&nbsp;");
                            }else{
                            	td.append("<div " + (opts.titleNowrap === false ? "style='white-space:normal;word-break:break-all;'" : "") + " class=\"datagrid-cell\"><span></span><span class=\"datagrid-sort-icon\"></span></div>");
                                $("span", td).html(col.title);
                                $("span.datagrid-sort-icon", td).html("&nbsp;");
                            }
							var cell = td.find("div.datagrid-cell");
							if (col.resizable == false) {
								cell.attr("resizable", "false");
							}
							if (col.width) {
								cell._outerWidth(col.width);
								col.boxWidth = parseInt(cell[0].style.width);
							} else {
								col.auto = true;
							}
							cell.css("text-align", (col.align || "left"));
							col.cellClass = "datagrid-cell-c" + _434 + "-" + col.field.replace(/\./g, "-");
							col.cellSelector = "div." + col.cellClass;
						} else {
							$("<div class=\"datagrid-cell-group\"></div>").html(col.title).appendTo(td);
						}
					}
					if (col.hidden) {
						td.hide();
					}
				}
			}
			if (_46e && opts.rownumbers) {
				var td = $("<td rowspan=\"" + opts.frozenColumns.length + "\"><div class=\"datagrid-header-rownumber\"></div></td>");
				if ($("tr", t).length == 0) {
					td.wrap("<tr class=\"datagrid-header-row\"></tr>").parent().appendTo($("tbody", t));
				} else {
					td.prependTo($("tr:first", t));
				}
			}
		};

		function _468() {
			var ss = ["<style type=\"text/css\">"];
			var _46f = _460(_462, true).concat(_460(_462));
			for (var i = 0; i < _46f.length; i++) {
				var col = _470(_462, _46f[i]);
				if (col && !col.checkbox) {
					ss.push(col.cellSelector + " {width:" + col.boxWidth + "px;}");
				}
			}
			ss.push("</style>");
			$(ss.join("\n")).prependTo(dc.view);
		};
	};
	/*为表头添加一个空的TD宽度为17px add by famingyuan 2013/07/05*/

	function addEmptyTDToHeader2(dom) {
		/*如果是高度自适应 则不添加空白单元格*/
		// var opts = $.data(dom, "datagrid").options;
		// if(opts.isAutoSizeHeight){
		// 	return;
		// }
		// 由于设置了高度自适应最大高度 则取消该功能 2013/07/24
		var dc = $.data(dom, "datagrid").dc;
		var targetTr = $("tr.datagrid-header-row", dc.header2);
		$('<td class="empty_empty"><span class="empty_empty">&nbsp;</span></td>').appendTo(targetTr);
	};

	function _471(_472) {
		var _473 = $.data(_472, "datagrid");
		var _474 = _473.panel;
		var opts = _473.options;
		var dc = _473.dc;
		var _475 = dc.header1.add(dc.header2);
		_475.find("input[type=checkbox]").unbind(".datagrid").bind("click.datagrid", function(e) {
			if (opts.singleSelect && opts.selectOnCheck) {
				return false;
			}
			if ($(this).is(":checked")) {
				opts.isSelectAllByUser = true;
				_4d8(_472);
				opts.isSelectAllByUser = false;
			} else {
				opts.isUnSelectAllByUser = true;
				_4de(_472);
				opts.isUnSelectAllByUser = false;
			}
			e.stopPropagation();
		});
		var _476 = _475.find("div.datagrid-cell");
		_476.closest("td").unbind(".datagrid").bind("mouseenter.datagrid", function() {
			if (_473.resizing) {
				return;
			}
			$(this).addClass("datagrid-header-over");
		}).bind("mouseleave.datagrid", function() {
			$(this).removeClass("datagrid-header-over");
		}).bind("contextmenu.datagrid", function(e) {
			// 默认情况下 不显示contextMenu
			if(opts.isShowContextMenu){
				var _477 = $(this).attr("field");
				opts.onHeaderContextMenu.call(_472, e, _477);
			}
		});
		_476.unbind(".datagrid").bind("click.datagrid", function(e) {
			//如果是竖排标题以Y轴为主，给横向标题加单击事件 YH 2013.1.16
			if (opts.axleY) {
				var _478ex = $(this).parent().attr("field");
				dc.view2.find("td.datagrid-tdCol-selected").each(function() {
					$(this).removeClass("datagrid-tdCol-selected");
				});
				dc.view2.find("table.datagrid-btable td[field=\"" + _478ex + "\"]").each(function() {
					$(this).addClass("datagrid-tdCol-selected");
				});
			};
			if (e.pageX < $(this).offset().left + $(this)._outerWidth() - 5) {
				var _478 = $(this).parent().attr("field");
				var col = _470(_472, _478);
				if (!col.sortable || _473.resizing) {
					return;
				}
				opts.sortName = _478;
				var c;
				if(!$(this).hasClass('datagrid-sort-desc') && !$(this).hasClass('datagrid-sort-asc')){
					c = 'datagrid-sort-' + (col.order || opts.sortOrder);
					opts.sortOrder = col.order;
				}
				else{
					opts.sortOrder = "asc";
					c = "datagrid-sort-asc";
					if ($(this).hasClass(c)) {
						c = "datagrid-sort-desc";
						opts.sortOrder = "desc";
					}
				}			
				_476.removeClass("datagrid-sort-asc datagrid-sort-desc");
				$(this).addClass(c);
				opts.justSort = true;
				if (opts.remoteSort) {
					_537(_472);
				} else {
					var data = $.data(_472, "datagrid").data;
					_4b1(_472, data);
				}
				opts.justSort = false;
				opts.onSortColumn.call(_472, opts.sortName, opts.sortOrder);
			}
		}).bind("dblclick.datagrid", function(e) {
			if (e.pageX > $(this).offset().left + $(this)._outerWidth() - 5) {
				var _479 = $(this).parent().attr("field");
				var col = _470(_472, _479);
				if (col.resizable == false) {
					return;
				}
				$(_472).datagrid("autoSizeColumn", _479);
				col.auto = false;
			}
		});
		_476.each(function() {
			$(this).resizable({
				handles: "e",
				disabled: ($(this).attr("resizable") ? $(this).attr("resizable") == "false" : false),
				minWidth: 25,
				onStartResize: function(e) {
					_473.resizing = true;
					_475.css("cursor", "e-resize");
					if (!_473.proxy) {
						_473.proxy = $("<div class=\"datagrid-resize-proxy\"></div>").appendTo(dc.view);
					}
					_473.proxy.css({
						left: e.pageX - $(_474).offset().left - 1,
						display: "none"
					});
					setTimeout(function() {
						if (_473.proxy) {
							_473.proxy.show();
						}
					}, 500);
				},
				onResize: function(e) {
					_473.proxy.css({
						left: e.pageX - $(_474).offset().left - 1,
						display: "block"
					});
					return false;
				},
				onStopResize: function(e) {
					_475.css("cursor", "");
					var _47a = $(this).parent().attr("field");
					var col = _470(_472, _47a);
					col.width = $(this)._outerWidth();
					col.boxWidth = parseInt(this.style.width);
					col.auto = undefined;
					_45a(_472, _47a);
					dc.view2.children("div.datagrid-header").scrollLeft(dc.body2.scrollLeft());
					_473.proxy.remove();
					_473.proxy = null;
					if ($(this).parents("div:first.datagrid-header").parent().hasClass("datagrid-view1")) {
						_43c(_472);
					}
					// fix for resize .......
					col.keepSize = true;
					col.userHandlerResize = true;
					opts.userHandlerResize = true;
					_483(_472, true, col);
					opts.userHandlerResize = false;

					opts.onResizeColumn.call(_472, _47a, col.width);
					setTimeout(function() {
						_473.resizing = false;
					}, 0);
				}
			});
		});
		dc.body1.add(dc.body2).unbind().bind("mouseover", function(e) {
			if (_473.resizing) {
				return;
			}
			var tr = $(e.target).closest("tr.datagrid-row");
			if (!tr.length) {
				return;
			}
			var _47b = _47c(tr);
			opts.finder.getTr(_472, _47b).addClass("datagrid-row-over");
			e.stopPropagation();
			// 添加showGuid 
			if (opts.showGuid) {
				var td = $(e.target).closest("td[field!='']");
				/*排除checkbox 以及其它无ck*/
				if (td.attr("field") && td.attr("field") != 'ck') {
					opts.cellMouseOver && opts.cellMouseOver.call(_472, td);
				}
			}
		}).bind("mouseout", function(e) {
			var tr = $(e.target).closest("tr.datagrid-row");
			if (!tr.length) {
				return;
			}
			var _47d = _47c(tr);
			opts.finder.getTr(_472, _47d).removeClass("datagrid-row-over");
			e.stopPropagation();
			// 添加showGuid 
			if (opts.showGuid) {
				/*传递当前时区焦点对象*/
				var td = $(e.target).closest("td[field!='']");
				opts.cellMouseOut && opts.cellMouseOut.call(_472,td);
			}
		}).bind("click", function(e) {
			var tt = $(e.target);
			var tr = tt.closest("tr.datagrid-row");
			if (!tr.length) {
				// 点击空白区域前的回调
				var isCancelAcceptChanges = opts.onBeforeClickBodyEmptyArea.call(_472);
				if(isCancelAcceptChanges===false){
					return;
				}
				// 允许点击 剩余空白空间
				$(_472).datagrid('acceptChanges');
				// 点击空白区域的回调函数  2014/05/19
				opts.onClickBodyEmptyArea.call(_472);
				return;
			}
			var _47e = _47c(tr);
			if (tt.parent().hasClass("datagrid-cell-check")) {
				if (opts.singleSelect && opts.selectOnCheck) {
					// if(!opts.checkOnSelect){
					// _4de(_472,true);
					// }
					// _4c9(_472,_47e);
					// 修改单选时 不能取消选中的bug
					if (tt.is(":checked")) {
						_4c9(_472, _47e);
					} else {
						_4d2(_472, _47e);
					}
				} else {
					if (tt.is(":checked")) {
						_4c9(_472, _47e);
					} else {
						_4d2(_472, _47e);
					}
				}
			} else {
				var row = opts.finder.getRow(_472, _47e);
				var td = tt.closest("td[field]", tr);
				if (td.length) {
					var _47f = td.attr("field");
					opts.onClickCell.call(_472, _47e, _47f, row[_47f]);
				}
				/*  
				取消单选多选状态 选中取消的区别
				if (opts.singleSelect == true) {
					_4c2(_472, _47e);
				} else {
					if (tr.hasClass("datagrid-row-selected")) {
						_4cc(_472, _47e);
					} else {
						_4c2(_472, _47e);
					}
				}*/
				// 如果checkOnSelect === false　那么只能是点击的列为ck才行
				if(opts.checkOnSelect===false){
					if(td.length && td.attr("field")=='ck'){
						if (tr.hasClass("datagrid-row-selected")) {
							_4cc(_472, _47e);
							// handleBorder(_472,opts,_47e,false);
						} else {
							_4c2(_472, _47e);
							// handleBorder(_472,opts,_47e,true);
						}
					}
				}else{
					if (tr.hasClass("datagrid-row-selected")) {
						_4cc(_472, _47e);
						// handleBorder(_472,opts,_47e,false);
					} else {
						_4c2(_472, _47e);
						// handleBorder(_472,opts,_47e,true);
					}
				}
				opts.onClickRow.call(_472, _47e, row);
			}
			e.stopPropagation();
		}).bind("dblclick", function(e) {
			var tt = $(e.target);
			/*修复快速双击导致的bug*/
			if (tt.is(':disabled')) {
				e.stopPropagation();
				return;
			}
			var tr = tt.closest("tr.datagrid-row");
			if (!tr.length) {
				return;
			}
			var _480 = _47c(tr);
			var row = opts.finder.getRow(_472, _480);
			var td = tt.closest("td[field]", tr);
			/*==========修复双击未选中的bug start==================*/
			if (!tr.hasClass("datagrid-row-selected")) { 
				// 如果checkOnSelect === false　那么只能是点击的列为ck才行
				if(opts.checkOnSelect===false){
					if(td.length && td.attr("field")=='ck'){
						_4c2(_472, _480);
					}
				}else{
					_4c2(_472, _480);
				}
			}
			/*==========修复双击未选中的bug  end==================*/
			if (td.length) {
				var _481 = td.attr("field");
				opts.onDblClickCell.call(_472, _480, _481, row[_481]);
			}
			opts.onDblClickRow.call(_472, _480, row);
			e.stopPropagation();
		}).bind("contextmenu", function(e) {
			var tr = $(e.target).closest("tr.datagrid-row");
			if (!tr.length) {
				return;
			}
			var _482 = _47c(tr);
			var row = opts.finder.getRow(_472, _482);
			opts.onRowContextMenu.call(_472, e, _482, row);
			e.stopPropagation();
		});
		dc.body2.bind("scroll", function() {
			dc.view1.children("div.datagrid-body").scrollTop($(this).scrollTop());
			dc.view2.children("div.datagrid-header,div.datagrid-footer").scrollLeft($(this).scrollLeft());
		});

		
		// 监听滚动事件
		if(opts.autoPagination){
			var paginationOpts = $(_472).datagrid("getPager").pagination("options");
			var paginationBtns = paginationOpts.paginationBtns;
			var lastScrollLeft = 0;
			dc.body2.scroll(function  (event) {
				 // 排除非手动滚动触发的情况
				 if(event.isTrigger){
				 	return;
				 }
				 // 判断下当前的scrollLeft 如果和之前的不一致 说明移动的横向滚动条
				var currentScrollLeft = dc.body2.scrollLeft();
				if(currentScrollLeft!=lastScrollLeft){
					lastScrollLeft = currentScrollLeft;
					return;
				}
				
				 // 如果当前正在执行请求 则返回
				 if(opts.isRequesting){
				 	return;
				 }
				 var totalPageNumber = Math.ceil(paginationOpts.total / paginationOpts.pageSize);
				 if(paginationOpts.pageNumber>=totalPageNumber){
				 	return;
				 }

				 // 判断是否滚动到末尾
				 var table2 = $("table:first",dc.body2);
				 var h1 = dc.body2.height()+dc.body2.scrollTop();
				 var h2 = table2.height();
				 if(h1<h2){
				 	return ;
				 }
				 console.log('1--> '+h1);
				 console.log('2---> '+h2);
	     		 console.log("--------------trigger by user ------------------");
				 opts.isRequesting = true;

				// 请求下一页 直接调用下一页按钮回调
				paginationBtns.next.handler(function  (willDoReq) {
					if(willDoReq===false){
						opts.isRequesting = false;
					}
				});
			});
		}

		function _47c(tr) {
			if (tr.attr("datagrid-row-index")) {
				return parseInt(tr.attr("datagrid-row-index"));
			} else {
				return tr.attr("node-id");
			}
		};
	};

	/*处理边框border*/
	function handleBorder (dom,opts,rowIndex,flag) {
		/*处理前一行*/
		function handlePreTr () {
			if(rowIndex===0){
				return;
			}
			var preTrs = opts.finder.getTr(dom, rowIndex-1);
			preTrs.each(function  (itemIndex) {
				var preTr = $(preTrs[itemIndex]);
				/*true 则表示选中tr时*/
				if(flag){ 
					if(preTr.hasClass("datagrid-row-selected")){
						return;
					}
					preTr.removeClass("datagrid-row-selected-fix-bottom").addClass("datagrid-row-selected-fix-bottom");
				}else{
					/*false 则表示取消选中tr时*/
					if(preTr.hasClass("datagrid-row-selected")){
						return;
					}
					preTr.removeClass("datagrid-row-selected-fix-bottom");
				}
			});
		};
		/*处理当前行*/
		function handleCurrentTr () {
			currentTrs = opts.finder.getTr(dom, rowIndex);
			currentTrs.each(function  (index) {
				if(flag){
					if(rowIndex==0){
						$(currentTrs[index]).removeClass("datagrid-row-selected-fix-top").addClass("datagrid-row-selected-fix-top");
					}						
					$(currentTrs[index]).addClass("datagrid-row-selected-fix-bottom");
				}else{
					$(currentTrs[index]).removeClass("datagrid-row-selected-fix-top");
				}
			});
		};
		/*处理下一行*/
		function handleNextTr () { 
			if(flag){
				return;
			}
			/*如果下一行没有被选中的话*/
			//var nextTr = opts.finder.getTr(dom, rowIndex+1);
            //2016年3月3日16:58:20 zws 替换上一行，以提升效率
            var nextTr = currentTrs.eq(0).next();
			var isRemove = true;
			nextTr.each(function  (index) {
				var next = $(nextTr[index]);
				if(next.hasClass("datagrid-row-selected")){
					isRemove = false;
				}
			});

			if(isRemove){
				currentTrs.each(function  (index) {
					$(currentTrs[index]).removeClass("datagrid-row-selected-fix-bottom");
				});
			}
		};
		if(opts.verColumn){
			return;
		}
		handlePreTr();
		var currentTrs = null;
		handleCurrentTr();
		handleNextTr();

		return;
	};
	/**
	 * 获取新的合适的宽度
	 * @return {[type]} [description]
	 */
	function getNewWidth (rowIndex,dom,field,opts,from) {
		var rows = $.data(dom, "datagrid").data.rows;
		var w;
		var targetCol = (opts.mergedBaseCols && opts.mergedBaseCols[field]) || (opts.mergedCols && opts.mergedCols[field]);
		if(targetCol){
			w = targetCol.widthBeforeMerged;
		}
		return w;
	};

	/*采用空白占位符解决滚动时 表头与内容区错位的问题 2013/07/05*/

	function _483(_484, flag, targetCol) {
		var opts = $.data(_484, "datagrid").options;
		var data = $.data(_484, "datagrid").data;
		// 只要是排序 则就应该跳过
		if (opts.justSort) {
			opts.justSort = false;
			return;
		}
		var dc = $.data(_484, "datagrid").dc;

		if (!opts.fitColumns) {
			return;
		}
		if (opts.justUD) {
			//如果仅仅是上下移动 则不需要再进行计算 列宽不再调整
			return;
		}

		var _485 = dc.view2.children("div.datagrid-header");
		var _485_ = dc.view1.children("div.datagrid-header"); // 表头左侧
		var _486 = 0; //924
		var _487; //
		var _488 = _460(_484, false); // 返回column
		if(opts.fixGridFrozenColumnsBug){
			var _488_ = _460(_484, true); // 返回frozenColumns
			_488 = _488.concat(_488_); // 合并下
		}

		_484.hasCheckBox = false; // 是否存在checkbox

		_484.hasHidden = false; // 是否存在hidden column 以便适配 hideColumns

		var adx = 0; // add by famingyuan , 计算adx(由padding组成)
		var adxNumber = 0; //实际数据有多少列
		var addBorderCount = 0; // 加上边框之后需要计算的宽度
		// 循环 计算宽度
		var skipAdx = false; // 用于是否跳过计算

		// 适配 之前隐藏的列 在显示的时候 能够支持自	适应
		// 作用： 用于临时获取当前列的autoWidth 即：自适应宽度

		function dealHidenCol(col, _490, _494) {
			var _495 = dc.header2.find("td[field=\"" + _494 + "\"]").find("div.datagrid-cell");
			if (_495.length == 0) {
				_495 = dc.header1.find("td[field=\"" + _494 + "\"]").find("div.datagrid-cell");
			}
			_495.css("width", "");
			// 备份 
			var tempWidth = col.width;
			var tempBoxWidth = col.boxWidth;
			var tempAuto = col.auto;
			var tempHidden = col.hidden;

			col.width = undefined;
			col.boxWidth = undefined;
			col.auto = true;
			col.hidden = false;
			$(_490).datagrid("fixColumnSize", _494);
			var _496 = Math.max(_495._outerWidth(), _4972("allbody"), _497("allfooter"));

			// 还原
			col.width = tempWidth;
			col.boxWidth = tempBoxWidth;
			col.auto = tempAuto;
			col.hidden = tempHidden;

			col.autoWidth = _496;

			// 获得页脚对应列的列宽 

			function _497(type) {
				var _498 = 0;
				// 未显示页脚 直接返回0
				if (!opts.showFooter) {
					return _498;
				}
				var allContentDiv = dc.footer2.find("td[field=\"" + _494 + "\"]").find("div.datagrid-cell");
				if (allContentDiv.length == 0) {
					allContentDiv = dc.footer1.find("td[field=\"" + _494 + "\"]").find("div.datagrid-cell");
				}
				// opts.finder.getTr(_490, 0, type).find("td[field=\"" + _494 + "\"] div.datagrid-cell").each(function() {
				allContentDiv.each(function() {
					var w = $(this)._outerWidth();
					if (opts.verColumn) {
						var colspanInfo = $(this).parent("td:first").attr("colspan");
						// 不能使用跨行的宽度
						if (colspanInfo > 1) {
							return;
						}
					}
					if (_498 < w) {
						_498 = w;
					}

				});
				return _498;
			};
			// 获得body中 对应列的列宽

			function _4972(type) {
				var _498 = 0;
				// var contentBody = opts.finder.getTr(_490, 0, type);
				// 耗时100ms  找到body1 或者 body2 中 某一列 field=_494的
				var allContentDiv = dc.body2.find("td[field=\"" + _494 + "\"]").find("div.datagrid-cell");
				if (allContentDiv.length == 0) {
					allContentDiv = dc.body1.find("td[field=\"" + _494 + "\"]").find("div.datagrid-cell");
				}
				allContentDiv.each(function(index) {
					var w = $(this)._outerWidth();
					if (opts.verColumn) {
						var colspanInfo = $(this).parent("td:first").attr("colspan");
						// 不能使用跨行的宽度
						if (colspanInfo > 1) {
							return;
						}
					}
					// _483 function
					
					// 在表格执行了merge操作之后 一列的最大宽度 不能以colspan > 1 的情况来判断 如此暂用太宽了
					// 当前正在判断最大宽度的列 属于合并时使用的主列 
					var tmp = getNewWidth(index,_490,_494,opts,"from _483 列宽调整");
					if(tmp){
					   //w = tmp;
					}
					if (_498 < w) {
						_498 = w;
					}

				});
				return _498;
			};
		};
		for (var i = 0; i < _488.length; i++) {
			// 此处col中的width为由pjf.grid传递
			var col = _470(_484, _488[i]);
			if (_489(col)) { /*不是hidden checkbox auto*/
				// 重置表头
				if (flag == "reset") {
					if (col.userInitWidth > 0) {
						_486 += col.userInitWidth;
						skipAdx = true;
					} else {
						_486 += (fixTitleLength(col) * 14);
					}
				} else {
					if (opts.showOrHide) {
						// 显示 或者隐藏
						var addValue = 0;
						if (col.userHandlerResize) {
							addValue = col.boxWidth; // +8
							skipAdx = true;
						} else if (col.userInitWidth > 0) {
							addValue = col.userInitWidth; // +8
							skipAdx = true;
						} else {
							addValue = col.autoWidth || (fixTitleLength(col) * 14); // +8
							// 针对隐藏列的情况
							if (addValue < 9) {
								dealHidenCol(col, _484, _488[i]);
								addValue = col.autoWidth || (fixTitleLength(col) * 14); // +8
							}
						}
						_486 += addValue;
					} else if (col.userHandlerResize) {
						// 1. 用户拖动 
						// 1.1 用户刚刚拖动完 
						if (flag && targetCol && col.field == targetCol.field) {
							if (col.boxWidth < (fixTitleLength(col) * 14)) {
								col.boxWidth = (fixTitleLength(col) * 14);
							}
							_486 += ((col.boxWidth > 0) ? col.boxWidth : (fixTitleLength(col) * 14));
							skipAdx = true;
						} else if (col.field == opts.currentEditColumn && opts.FLAG_DRAG_AFTER_EDIT == false) {
							// 1.2 用户刚刚编辑完当前列  不允许拓展 FLAG_DRAG_AFTER_EDIT
							_486 += col.fixByHandValue;
							skipAdx = true;
						} else if (col.field == opts.currentEditColumn) {
							// 1.3 拖动之后 再编辑后 允许自动扩展
							_486 += col.autoWidth;
						} else {
							// 1.4 之前拖动过
							_486 += col.fixByHandValue;
							skipAdx = true;
						}
					} else if (col.userInitWidth > 0) {
						// 2. 用户指定 
						if (col.field == opts.currentEditColumn && opts.FLAG_DEFWIDTH_AFTER_EDIT == false) {
							// 	2.1 用户进行编辑 且 指定了 不自动扩展
							_486 += col.userInitWidth;
							skipAdx = true;
						} else if (col.field == opts.currentEditColumn) {
							//  2.2 用户进行编辑 且 可以自动扩展
							_486 += col.autoWidth;
						} else {
							//	2.3 仅仅是指定了  
							_486 += col.userInitWidth;
							skipAdx = true;
						}
					} else if (opts.from_48fFLAG) {
						// 3. 经过自适应矫正
						_486 += ((col.boxWidth > 0) ? (col.boxWidth) : (fixTitleLength(col) * 14));
						// _486 += ((col.autoWidth > 0) ? (col.autoWidth) : (fixTitleLength(col) * 14));
					} else if (opts.verColumn && (!col.title || col.title == "")) { // 补充verColum情况下 title为空的情况
						// 初始纵向表头无数据
						var addValue = col.boxWidth; // +8
						if (addValue > 0) {
							_486 += addValue;
						} else {
							_486 += (fixTitleLength(col) * 14);
						}
					} else {
						// 初始普通grid 无数据
						var addValue = col.boxWidth;
						if (addValue > 0) {
							_486 += addValue;
						} else {
							_486 += fixTitleLength(col) * 14;
						}
					}
				}

				_487 = col;
				// 应为左右间距是4px
				adx += 8; // 添加8px
				// =============适配纵向列表
				if (opts.verColumn) {
					// adx += 1; /*此处待注释掉*/
				}
				// --------不作为adxNumber计算分配-------
				// 1. 如果是用户手动拉宽的
				// 2. 手动拉宽的 且 当前编辑完改列 并要求不自动扩展的
				// 3. 指定了列宽的 
				//    3.1 没有编辑改列
				//    3.2 编辑了改列 且指定 不扩展
				if (skipAdx) {
					skipAdx = false;
					continue;
				}
				adxNumber++;
				if(col.isAddedBorder){
					addBorderCount++;
				}
			}
			// 符合加边框的checkbox
			if(col.checkbox===true&&col.isAddedBorder){
				addBorderCount++;
			}
		}

		if (opts.verColumn) {
			// adx += 1;
		}

		var countWidth = 0; // 计算所有列宽

		var _48a = _485.children("div.datagrid-header-inner").show();

		baseTableWidth = _486 > 0 ? _486 : _485.find("table").width();

		// =========
		// 防止出现滚动条 
		var new_padding_fix = 0;
		// 如果加边框的 则需要减去边框暂用宽度
		if(opts.showBorder){
			new_padding_fix += addBorderCount; // 所有列的数量 对于隐藏列则不包含
		}
		var _48b = _485.width() - baseTableWidth - opts.scrollbarSize - new_padding_fix;
		if(opts.fixGridFrozenColumnsBug){
			baseTableWidth = _486 > 0 ? _486 : (_485.find("table").width()+_485_.find("table").width());
			var _485Width = _485_.width(); // 左侧可以用于分配的宽度
			if(opts.rownumbers){ // 左侧栏默认情况下是包含行号列的 固定为25px
				_485Width-=25;
			}
			_48b = _485Width + _485.width() - baseTableWidth - opts.scrollbarSize - new_padding_fix;
		}
		/*调整高度自适应情况下 表格最右边的则不需要显示滚动条*/
		// 由于设置了高度自适应最大高度 则取消该功能 2013/07/24
		// if(opts.isAutoSizeHeight){
		// 	_48b += opts.scrollbarSize;	
		// }
		_48b -= adx; // 再减去adx

		if (_484.hasCheckBox) { // 如果存在checkbox则再减掉该宽度
			_48b -= 27;
		}

		/**
		 *  计算没列的扩展值 ---
		 *  adxNumber为 需要扩展的列的数列 进行平均分配
		 */
		var fixValue = 0;
		if (adxNumber > 0) {
			fixValue = _48b / adxNumber;
			if (fixValue > 1) {
				fixValue = Math.floor(fixValue); //向下取整 防止扩展出边界
			}
		}
		if (!opts.showHeader) {
			_48a.hide();
		}
		// 给所有列都加上一个 fixValue 进行放大
		var rC = 0;
		for (var i = 0; i < _488.length; i++) {
			var col = _470(_484, _488[i]);
			if (_489(col)) { /*不是hidden checkbox auto*/
				var returnFix = 0;
				// 重置表头
				// 保存keepSize
				var tmpKeepSize = col.keepSize;
				if (flag == "reset") {
					col.keepSize = false;
					col.width = 0;
					col.boxWidth = 0;
					col.autoWidth = 0;
					tmpKeepSize = false;
					col.userHandlerResize = false;
				}
				// 1. 用户拖动过  
				if (opts.showOrHide) {
					if (col.userHandlerResize) {
						returnFix = _48d(col, 0);
					} else if (col.userInitWidth > 0) {
						returnFix = _48d(col, 0);
					} else {
						col.width = (col.autoWidth - 8) || fixTitleLength(col) * 14 - 8;
						col.boxWidth = col.autoWidth || fixTitleLength(col) * 14;
						returnFix = _48d(col, fixValue);
					}
				} else if (col.userHandlerResize) {
					//    1.1 刚刚拖动过
					if (flag && targetCol && col.field == targetCol.field) {
						col.keepSize = true;
						// 用于在用户拖动表格时 保持拖动后的宽度 
						col.fixByHandValue = col.boxWidth;
						returnFix = _48d(col, 0);
					} else if (col.field == opts.currentEditColumn) {
						//    1.2 之前拖动过  当前编辑过
						//    1.2.1 不允许编辑后自动扩展
						if (opts.FLAG_DRAG_AFTER_EDIT == false) {
							returnFix = _48d(col, 0);
						} else {
							//    1.2.2 允许编辑后自动扩展
							returnFix = _48d(col, fixValue);
						}
					} else {
						//    1.3. 之前拖动过  当前未编辑过
						returnFix = _48d(col, 0);
					}
				} else if (col.userInitWidth > 0) {
					// 2.1 当前编辑过
					col.width = col.userInitWidth - 8;
					col.boxWidth = col.userInitWidth;
					if (col.field == opts.currentEditColumn) {
						// 2.1.1 当前编辑过 且不允许自动扩展
						if (opts.FLAG_DEFWIDTH_AFTER_EDIT == false) {
							returnFix = _48d(col, 0);
						} else {
							// 2.1.1 当前编辑过 允许自动扩展
							returnFix = _48d(col, fixValue);
						}
					} else {
						// 2.2 未编辑过
						returnFix = _48d(col, 0);
					}
				} else {
					col.width = col.width || (fixTitleLength(col) * 14 - 8);
					col.boxWidth = col.boxWidth || (fixTitleLength(col) * 14);
					returnFix = _48d(col, fixValue);
				}
				rC += returnFix;
				col.keepSize = tmpKeepSize;
			}
		}
		// 将多出来的宽度附加到最后一列上
		_48b -= rC;
		if (_48b > 0) {
			/*临时取消  本不应该有此逻辑 2013/07/22*/
			// _48b -= 4;
		}
		if (_48b < 0) {
			_48b = 0;
		}
		if (_48b && _487) {
			_48d(_487, _48b, true);
		}

		_45a(_484);

		// 修复无数据展示时，滚动条不能不能展示完表头的所有列
		countWidth += 27;

		var headerTarget = $(".datagrid-header .datagrid-htable", $.data(_484, "datagrid").dc.view2);
		var headerTargetWidth = headerTarget.width();
		headerTargetWidth = headerTargetWidth ? headerTargetWidth : countWidth;
		/*非高度自适应情况下 才应该留白*/
		// 由于设置了高度自适应最大高度 则取消该功能 2013/07/24
		if (data && data.rows && data.rows.length) {
			headerTargetWidth -= 17;
		} else {
			/*treegrid 需要单独处理 考虑到treegrid可能展开*/
			if (opts.type_flag == 'treegrid') {
				var treegrid_data = $.data(_484, "treegrid").data;
				if (treegrid_data && treegrid_data.length) {
					headerTargetWidth -= 17;
				}
			}
		}

		$(".datagrid-body table:first", $.data(_484, "datagrid").dc.view2).width(headerTargetWidth);

		function _48d(col, _48e, isAppend) {

			var returnFix = 0;
			var preValue = (col.boxWidth > 0) ? col.boxWidth : (fixTitleLength(col) * 14);

			var tmpBoxWidth = col.boxWidth + _48e;

			// 此处校验  
			if (flag == "reset") {
				if (col.userInitWidth > 0) {
					tmpBoxWidth = col.userInitWidth;
				} else {
					if (tmpBoxWidth < (fixTitleLength(col) * 14)) {
						tmpBoxWidth = fixTitleLength(col) * 14;
					}
				}
			} else if (opts.showOrHide) {
				// 显示或者隐藏
				if (col.userHandlerResize) {
					tmpBoxWidth = col.fixByHandValue;
				} else if (col.userInitWidth > 0) {
					tmpBoxWidth = col.userInitWidth;
				} else {
					tmpBoxWidth = col.autoWidth || (fixTitleLength(col) * 14);
					tmpBoxWidth += _48e;
					if (tmpBoxWidth < col.autoWidth) {
						tmpBoxWidth = col.autoWidth;
					}
					if (tmpBoxWidth < fixTitleLength(col) * 14) {
						tmpBoxWidth = fixTitleLength(col) * 14;
					}
				}
			} else if (col.keepSize) {
				// 1. 用户拖动了列宽的  
				// 1.1 刚刚拖动过
				if (flag && targetCol && col.field == targetCol.field) {
					tmpBoxWidth = col.fixByHandValue;
				} else if (col.field == opts.currentEditColumn && opts.FLAG_DRAG_AFTER_EDIT == false) {
					// 1.2 拖动后  编辑不允许自动扩展
					tmpBoxWidth = col.fixByHandValue;
				} else if (col.field == opts.currentEditColumn) {
					// 1.3 拖动后   编辑 允许自动扩展 
					if (tmpBoxWidth < col.autoWidth) {
						tmpBoxWidth = col.autoWidth;
					}
				} else {
					// 1.4 之前拖动过
					tmpBoxWidth = col.fixByHandValue;
				}
			} else if (col.userInitWidth > 0) {
				// 2. 用户指定了列宽的 不能扩展
				// 	  2.1 用户指定了 指定列宽 编辑后 不自动扩展
				if (col.field == opts.currentEditColumn && opts.FLAG_DEFWIDTH_AFTER_EDIT == false) {
					tmpBoxWidth = col.userInitWidth;
				} else if (col.field == opts.currentEditColumn) {
					// 	  2.2  指定列宽 编辑后 自动扩展		 
					if (tmpBoxWidth < col.autoWidth) {
						tmpBoxWidth = col.autoWidth;
					}
				} else {
					// 	 2.3   指定了列宽 未编辑过
					tmpBoxWidth = col.userInitWidth;
				}
			} else if (col.autoWidth && tmpBoxWidth < col.autoWidth) {
				// 3. 其它列的最小宽度 不能小于其自动扩展的宽度
				tmpBoxWidth = col.autoWidth;
			} else {
				// 4. 未加载过数据的情况(拖动空表头)
				//    则不能小于最小宽度
				if (tmpBoxWidth < (fixTitleLength(col) * 14)) {
					tmpBoxWidth = fixTitleLength(col) * 14;
				}
			}

			// end
			tmpBoxWidth = parseInt(tmpBoxWidth);

			col.width = tmpBoxWidth - 8;
			col.boxWidth = tmpBoxWidth;
			returnFix = tmpBoxWidth - preValue;
			returnFix = (returnFix > 0 ? returnFix : 0);

			var targetDiv = _485.find("td[field=\"" + col.field + "\"]").find("div.datagrid-cell"); // 目标单元格中的div
			// 对于冻结的列 则在左侧查找 此处可以尝试优化 但效果仅限于有冻结列的情况
			if(targetDiv.length==0){
				targetDiv = _485_.find("td[field=\"" + col.field + "\"]").find("div.datagrid-cell"); // 目标单元格中的div
			}
			targetDiv.width(col.boxWidth);

			countWidth += col.boxWidth;

			return returnFix;
		};

		/*不是hidden checkbox auto*/

		function _489(col) {

			if (!col.hidden && !col.checkbox) {
				return true;
			}
			if (col.checkbox) {
				_484.hasCheckBox = true;
			}
			if (col.hidden) {
				_484.hasHidden = true;
			}
		};

		function fixTitleLength(col) {
			if (col.title && col.title.length > 0) {
				return col.title.length;
			} else {
				return 4; //默认长度为4
			}
		};
	};

	function _48f(_490, _491, flag) {
		var opts = $.data(_490, "datagrid").options;
		/*高性能标记 默认为false 如果为true将关闭额外操作，包括列宽自适应、排序等*/
		if(opts.highPerformance){
			return;
		}
		// IE6 不自适应 除非强制设置
		if (($.browser.msie && /msie 6\.0/i.test(navigator.userAgent)) && !opts.isForceAutoSize) {
			return;
		}

		var dc = $.data(_490, "datagrid").dc;
		// 如果仅仅是上下移动 则不需要再进行计算 列宽不再调整
		if (opts.justUD) {
			return;
		}
		// 如果是排序  则不需要扩展表头以及单元格宽度
		if (opts.justSort) {
			return;
		}
		opts.from_48fFLAG = true;
		if (_491) {
			_438(_491, false);
			if (opts.fitColumns) {
				_43c(_490);
				_483(_490);
			}
		} else {
			var _492 = false;
			var _493 = _460(_490, true).concat(_460(_490, false));
			// 数组最大索引位
			var _493Length = _493.length - 1;
			for (var i = 0; i < _493.length; i++) {
				var _491 = _493[i];
				var col = _470(_490, _491);
				if (col.auto) {
					_438(_491, (i == _493Length));
					_492 = true;
				} else {
					// add 当拖动后 auto将变为false
					// 此时同样需要扩展
					// continue;
					if (!col.checkbox && !col.hidden) {
						col.auto = true;
						_438(_491, (i == _493Length));
						_492 = true;
					}
					// end
				}
			}
			if (_492 && opts.fitColumns) {
				_43c(_490);
				_483(_490);
			}
			// add 当进行点击表头排序时 不应该进行扩展
			opts.justSort = false;
			// end
		}
		opts.justSort = false;
		opts.from_48fFLAG = false;

		function _438(_494, flag) {
			// var _495 = dc.view.find("div.datagrid-header td[field=\"" + _494 + "\"] div.datagrid-cell");
			// ======================
			var _495 = dc.header2.find("td[field=\"" + _494 + "\"]").find("div.datagrid-cell");
			if (_495.length == 0) {
				_495 = dc.header1.find("td[field=\"" + _494 + "\"]").find("div.datagrid-cell");
			}
			// ======================
			_495.css("width", "");
			var col = $(_490).datagrid("getColumnOption", _494);
			// baseBoxWidth 以及 baseWidth 用于保存最初无数据时 表头的宽度
			if (!col.baseWidth) {
				col.baseWidth = col.width;
			}
			if (!col.baseBoxWidth) {
				col.baseBoxWidth = col.boxWidth;
			}
			col.width = undefined;
			col.boxWidth = undefined;
			col.auto = true;
			var tmpHidden = col.hidden;
			col.hidden = false;
			$(_490).datagrid("fixColumnSize", _494, true);
			var _496 = Math.max(_495._outerWidth(), _4972("allbody"), _497("allfooter"));
			col.hidden = tmpHidden;

			col.autoWidth = _496;

			// 本逻辑用于用户编辑完一行数据后 重置宽度使用
			// 1. 用户拖动 (刚刚拖动 不会调用_48f方法 只会调用_483)
			if (col.userHandlerResize) {
				// 	1.1 编辑后不允许自动扩展
				if (col.field == opts.currentEditColumn && opts.FLAG_DRAG_AFTER_EDIT == false) {
					_496 = col.fixByHandValue;
				} else if (col.field == opts.currentEditColumn) {
					// 	1.2 编辑后允许自动扩展
					_496 = col.autoWidth;
				} else {
					// 	1.3 未编辑 
					_496 = col.fixByHandValue;
				}
			} else if (col.userInitWidth > 0) {
				// 2. 用户指定列宽 
				if (col.field == opts.currentEditColumn) {
					if (opts.FLAG_DEFWIDTH_AFTER_EDIT == false) {
						// 	2.1 指定列宽 且编辑后 不允许自动扩展
						_496 = col.userInitWidth;
					} else {
						// 	2.2 指定列宽 且编辑后 允许自动扩展
						_496 = col.autoWidth;
					}
				} else {
					// 	2.3 指定列宽 未编辑
					_496 = col.userInitWidth;
				}
			} else {
				// 默认情况
				_496 = col.autoWidth;
			}
			_495._outerWidth(_496);
			col.width = _496 - 8;
			col.boxWidth = parseInt(_495[0].style.width);
			col.boxWidth = _496;

			// end
			$(_490).datagrid("fixColumnSize", _494, !flag);
			opts.onResizeColumn.call(_490, _494, col.width);

			function _497_bak(type) {
				var _498 = 0;
				opts.finder.getTr(_490, 0, type).find("td[field=\"" + _494 + "\"] div.datagrid-cell").each(function() {
					var w = $(this)._outerWidth();
					if (opts.verColumn) {
						var colspanInfo = $(this).parent("td:first").attr("colspan");
						// 不能使用跨行的宽度
						if (colspanInfo > 1) {
							return;
						}
					}
					if (_498 < w) {
						_498 = w;
					}

				});
				return _498;
			};
			// 获得页脚对应列的列宽

			function _497(type) {
				var _498 = 0;
				// 未显示页脚 直接返回0
				if (!opts.showFooter) {
					return _498;
				}
				var allContentDiv = dc.footer2.find("td[field=\"" + _494 + "\"]").find("div.datagrid-cell");
				if (allContentDiv.length == 0) {
					allContentDiv = dc.footer1.find("td[field=\"" + _494 + "\"]").find("div.datagrid-cell");
				}
				allContentDiv.each(function() {
					var w = $(this)._outerWidth();
					if (opts.verColumn) {
						var colspanInfo = $(this).parent("td:first").attr("colspan");
						// 不能使用跨行的宽度
						if (colspanInfo > 1) {
							return;
						}
					}
					if (_498 < w) {
						_498 = w;
					}

				});
				return _498;
			};
			// 获得body中 对应列的列宽

			function _4972(type) {
				var _498 = 0;
				// var contentBody = opts.finder.getTr(_490, 0, type);
				// 耗时100ms  找到body1 或者 body2 中 某一列 field=_494的
				var allContentDiv = dc.body2.find("td[field=\"" + _494 + "\"]").find("div.datagrid-cell");
				if (allContentDiv.length == 0) {
					allContentDiv = dc.body1.find("td[field=\"" + _494 + "\"]").find("div.datagrid-cell");
				}
				allContentDiv.each(function(index) {
					var w = $(this)._outerWidth();
					if (opts.verColumn) {
						var colspanInfo = $(this).parent("td:first").attr("colspan");
						// 不能使用跨行的宽度
						if (colspanInfo > 1) {
							return;
						}
					}

					// 在表格执行了merge操作之后 一列的最大宽度 不能以colspan > 1 的情况来判断 如此暂用太宽了
					// 当前正在判断最大宽度的列 属于合并时使用的主列 
					var tmp = getNewWidth(index,_490,_494,opts," from _438 _48f 列宽auto");
					if(tmp){
					   //w = tmp;
					}

					if (_498 < w) {
						_498 = w;
					}

				});
				return _498;
			};
		};
	};
	// 设置数据宽度为 col.boxWidth  
	// 添加参数 flag 以提高性能

	function _45a(_499, _49a, flag) {
		var opts = $.data(_499, "datagrid").options;
		var dc = $.data(_499, "datagrid").dc;

		// var _49b = dc.view.find("table.datagrid-btable,table.datagrid-ftable");
		// _49b.css("table-layout", "fixed");

		if (_49a) {
			fix(_49a);
		} else {
			var ff = _460(_499, true).concat(_460(_499, false));
			for (var i = 0; i < ff.length; i++) {
				fix(ff[i]);
			}
		}
		// _49b.css("table-layout", "auto");

		// _49c(_499); // 该函数已无实际作用
		// 跳过后续多余的高度调整动作 
		if (flag) {
			return;
		}

		/*添加更新CSS到页面*/
		updateContentCSS(dc);

		setTimeout(function() {
			try {
				_448(_499);
				_4a4(_499);
			} catch (e) {
				printLog("Error: --> " + e.message);
			}
		}, 0);

		function fix(_49d) {
			var col = _470(_499, _49d);
			if (col.checkbox) {
				return;
			}
			var _49e = dc.view.children("style")[0];
			var _49f = _49e.styleSheet ? _49e.styleSheet : (_49e.sheet || document.styleSheets[document.styleSheets.length - 1]);
			var _4a0 = _49f.cssRules || _49f.rules;
			for (var i = 0, len = _4a0.length; i < len; i++) {
				var rule = _4a0[i];
				if (rule.selectorText.toLowerCase() == col.cellSelector.toLowerCase()) {
					// ============适配纵向表格===========
					if(opts.verColumn){
						// 不显示表头边框是
						if(!opts.showBorder){
							rule.style["width"] = (col.boxWidth && col.boxWidth > 0) ? (col.boxWidth - 1) + "px" : "auto";
						}else{
							rule.style["width"] = (col.boxWidth && col.boxWidth > 0) ? col.boxWidth + "px" : "auto";
						}
					}else{
						// 普通横向表格
						rule.style["width"] = (col.boxWidth && col.boxWidth > 0) ? col.boxWidth + "px" : "auto";
					}					 
					// ----------------------
					// rule.style["width"] = (col.boxWidth && col.boxWidth > 0) ? col.boxWidth + "px" : "auto";
					break;
				}
			}
		};
	};

	/*更新CSS到页面*/

	function updateContentCSS(dc) {
		var _49e = dc.view.children("style")[0];
		var _49f = _49e.styleSheet ? _49e.styleSheet : (_49e.sheet || document.styleSheets[document.styleSheets.length - 1]);
		var cssRules = _49f.cssRules || _49f.rules;
		if (cssRules && cssRules.length > 0) {
			var cssStr = '';
			for (var x = 0; x < cssRules.length; x++) {
				var rule = cssRules[x];
				if (rule.selectorText) {
					var str = rule.selectorText + '{width:' + rule.style.width + ';}';
					cssStr += str;
				}
			}
			if (cssStr.length > 0) {
				/*IE9 FIREFOX 使用innerHTML IE678 用styleSheet*/
				try {
					_49e.innerHTML = cssStr;
				} catch (e) {
					try {
						/*IE678*/
						_49e.styleSheet.cssText = cssStr;
					} catch (e) {
						printLog("Error: 未知浏览器 写入样式表失败!");
					}
				}
			}
		}
	};

	// 计算合并宽度
	function _49c(_4a1) {
		var dc = $.data(_4a1, "datagrid").dc;
		dc.body1.add(dc.body2).find("td.datagrid-td-merged").each(function() {
			var td = $(this);
			var _4a2 = td.attr("colspan") || 1;
			var _4a3 = _470(_4a1, td.attr("field")).boxWidth +8;
			for (var i = 1; i < _4a2; i++) {
				td = td.next();
				_4a3 += _470(_4a1, td.attr("field")).boxWidth + 1 +8;
			}
			$(this).children("div.datagrid-cell")._outerWidth(_4a3);
		});
	};

	function _4a4(_4a5) {
		var dc = $.data(_4a5, "datagrid").dc;
		dc.view.find("div.datagrid-editable").each(function() {
			var cell = $(this);
			var _4a6 = cell.parent().attr("field");
			var col = $(_4a5).datagrid("getColumnOption", _4a6);
			/*修改单元格宽度计算方式*/
			// cell._outerWidth(col.boxWidth+8);
			cell._outerWidth(col.boxWidth+8);
			var ed = $.data(this, "datagrid.editor");
			if (ed.actions.resize) {
				/*修改单元格宽度计算方式*/
				ed.actions.resize(ed.target, col.boxWidth+8);
			}
		});
	};

	function _470(_4a7, _4a8) {
		function find(_4a9) {
			if (_4a9) {
				for (var i = 0; i < _4a9.length; i++) {
					var cc = _4a9[i];
					for (var j = 0; j < cc.length; j++) {
						var c = cc[j];
						if (c.field == _4a8) {
							return c;
						}
					}
				}
			}
			return null;
		};
		var opts = $.data(_4a7, "datagrid").options;
		var col = find(opts.columns);
		if (!col) {
			col = find(opts.frozenColumns);
		}
		return col;
	};

	function _460(_4aa, _4ab) {
		var opts = $.data(_4aa, "datagrid").options;
		var _4ac = (_4ab == true) ? (opts.frozenColumns || [
			[]
		]) : opts.columns;
		if (_4ac.length == 0) {
			return [];
		}
		var _4ad = [];

		function _4ae(_4af) {
			var c = 0;
			var i = 0;
			while (true) {
				if (_4ad[i] == undefined) {
					if (c == _4af) {
						return i;
					}
					c++;
				}
				i++;
			}
		};

		function _4b0(r) {
			var ff = [];
			var c = 0;
			for (var i = 0; i < _4ac[r].length; i++) {
				var col = _4ac[r][i];
				if (col.field) {
					ff.push([c, col.field]);
				}
				c += parseInt(col.colspan || "1");
			}
			for (var i = 0; i < ff.length; i++) {
				ff[i][0] = _4ae(ff[i][0]);
			}
			for (var i = 0; i < ff.length; i++) {
				var f = ff[i];
				_4ad[f[0]] = f[1];
			}
		};
		for (var i = 0; i < _4ac.length; i++) {
			_4b0(i);
		}
		return _4ad;
	};
	// 添加数据错误处理, add by famingyuan ,2013/04/22 
	// 补充说明：grid verticalGrid simpleGrid 均需要该方法
	// True 表示有错误  False 表示没有错误
	function dataErrorResponse(opts, data) {
	    if(opts.dataErrorHandler){
	      return opts.dataErrorHandler(opts, data);
	    }else{
	      // 默认没有错误 该段逻辑在现有代码逻辑下，永远不会执行
	      return false;
	    }		
	};

	/**
	 * 修复排序后 没有选中的bug
	 * @param  {[type]} dom  [description]
	 * @param  {[type]} opts [description]
	 * @param  {[type]} flag [description]
	 * @return {[type]}      [description]
	 */

	function fixSortCheck(dom, opts, flag) {
		// 如果不是排序 则不需进行
		if (!opts.justSort) {
			return;
		}
		if (flag) { // true 为仅为获取rows 
			opts.preSelectRows = [];
			var tmpRows = $(dom).datagrid("getSelections");
			for (var x in tmpRows) {
				opts.preSelectRows.push(tmpRows[x]);
			}
			$(dom).datagrid("unselectAll");
		} else { // false 为设置新的选中 
			for (var x in opts.preSelectRows) {
				var rowIndex = $(dom).datagrid('getRowIndex', opts.preSelectRows[x]);
				$(dom).datagrid('selectRow', rowIndex);
			}
		}
	};
	// 更新全选按钮

	function updateSelectAll(opts, dom, data) {
		var ck = opts.finder.getTr(dom, "", "allbody").find("div.datagrid-cell-check input[type=checkbox]:not(:checked)");
		if (opts.singleSelect == false) {
			var dc = $(dom).datagrid("getGridDom").dc;
			var _4e4 = dc.header1.add(dc.header2);
			var status = false;
			if (!ck.length && data && data.rows && data.rows.length > 0) {
				status = true;
			}
			_4e4.find("input[type=checkbox]")._propAttr("checked", status);
		}

	};

	function printLog(info) {
		if (typeof(console) != "undefined") {
			console.log(info);
		}
	};
	// 处理可能不传递total的情况

	function handleTotal(opts, data) {
		var unSupportTypes = {
			'CCBS': true,
			'CCBSS': true,
			'ECIFP': true,
			'FESP': true,
			'P6': true,
			'CREDITCARD': true
		};
		// 只针对普通类型 当然如果其他类型有需求 删除unSupportTypes中对应项
		if (opts.isCCBS && unSupportTypes[opts.reqType]) {
			return;
		}

		if (!data) {
			return;
		}
		// if (opts.totalBak == undefined) {
		// 	opts.totalBak = data.total || 0;
		// 	return;
		// }
		// 备份total
		if (!opts.totalBak || (data.total > 0 && opts.totalBak != data.total)) {
			opts.totalBak = data.total || 0;
		}

		if (data.total) {
			return;
		}

		// 如果传递回来的total数据 恒等于0  表示总共就0条
		// 如果为undefined 说明 将使用上一次的 
		if(data.total===0){
			opts.totalBak = 0;
		}

		data.total = opts.totalBak || 0;
		printLog("Warning: Set total to --> " + opts.totalBak + " or 0 !");
	};
	// 补充CCBS等模式下 无total字段的问题
	// (由于改变之前的逻辑 可能导致现有编写好的代码存在问题，故在此方法中处理)

	function fixTotal(opts, data) {
		if (!opts.isCCBS) {
			return;
		}
		if (data.total && data.total > 0) {
			return;
		}
		data.total = data.rows ? data.rows.length : 0;
	};

	// 重置掉部分控制参数 防止重新加载表格时导致的标志错误 
	function resetParams(dom,opts){
		// 删除所有列可能配置上的合并参数信息
		if(opts.allCols){
			opts.mergedBaseCols = null;
			opts.mergedRowIndexs = null;
			var allCols = opts.allCols;
			for(var i=0,len=allCols.length;i<len;i++){
				var col = allCols[i];
				delete col.mergeOpts;
				delete col.widthWithSubCols;
				delete col.widthBeforeMerged;
				delete col.hideForMerge;
			}
		}
	};

	function _4b1(_4b2, data) {

		var _4b3 = $.data(_4b2, "datagrid");
		var opts = _4b3.options;
		var dc = _4b3.dc;
		var _4b4 = _4b3.selectedRows;
		// 重置掉部分控制参数 防止重新加载表格时导致的标志错误 
		resetParams(_4b2,opts);
		var tmpData = opts.loadFilter.call(_4b2, data, opts);
		data = tmpData ? tmpData : data;
		if (!data) { //如果不返回数据 就return YH 2013.3.14
			setCCBSPagBtn(_4b2, false, false);
			data = {
				total: 0,
				rows: []
			};
			// 不再直接return 而采用load空数据的方式 2013/06/19
		}
		/*是否调用成功回调函数*/
		var successCallBackFlag = true;
		// 用于表示 请求是否成功 默认成功
		// 如果失败 则禁用CCBS等模式所有上下页按钮
		opts.reqResult = true;
		if (dataErrorResponse(opts, data)) {
			setCCBSPagBtn(_4b2, false, false);
			opts.reqResult = false;
			try {
				data['total'] = 0;
				data['rows'] = [];
			} catch (e) {
				data = {
					total: 0,
					rows: []
				};
			}
			// 不再直接return 而采用load空数据的方式 2013/06/19
			/*如果出错 则不应该调用onLoadSuccess函数*/
			successCallBackFlag = false;
		}
		if (!data.rows && !data.total) {
			data = formatGridData(opts, data); //转换 YH 2013.1.31
		}
		// 修复total字段可能是字符串的bug 2014/07/17
		if(typeof(data.total)=='string'){
			try{
				data.total = parseInt(data.total,10);
			}catch(e){
				printLog("Error: --> " + e.message);
				data.total = 0;
			}
		}

		// 同步pageSize 以适配用户动态修改pageSize  适配用户改变pageSize之后 采用本地加载的方法
		if (opts.pagination) {
			$(_4b2).datagrid("getPageInfo").pageSize = opts.pageSize;
		}

		// 处理点击下一页或者其他页时不传递total字段的情况
		handleTotal(opts, data);

		// 处理通过前面操作 CCBS等模式 依旧没有获取到total的问题
		fixTotal(opts, data);
		// 如果是自动分页
		if(!opts.isRequesting){
			_4b3.data = data;
		}		

		// 执行过数据加载之后 就不再第一次加载了
		opts.isFirstCCBSReq = false;

		// CCBS及另外三种模式
		dataLoadedHandler(opts, data, _4b2);

		// 修复可能的翻页选中时 第一条数据莫名选中的问题
		opts.isSelectRow = false;
		if (data.footer) {
			_4b3.footer = data.footer;
		}
		if (!opts.remoteSort&& !opts.highPerformance) {
			var opt = _470(_4b2, opts.sortName);
			if (opt) {
				var _4b5 = opt.sorter || function(a, b) {
						return (a > b ? 1 : -1);
					};
				// 获取选中的所有行数据, fix by famingyuan ,2013/04/28
				fixSortCheck(_4b2, opts, true);

				// 排除 移动行以及没有sortName的情况
				if (!opts.justUD && opts.sortName) {
					data.rows.sort(function(r1, r2) {
						return _4b5(r1[opts.sortName], r2[opts.sortName]) * (opts.sortOrder == "asc" ? 1 : -1);
					});
				}
			}
		}
		if (opts.view.onBeforeRender) {
			opts.view.onBeforeRender.call(opts.view, _4b2, data.rows);
		}
		// 非自动分页情况下 采用清空并render的方式
		if(!opts.isRequesting){
			opts.view.render.call(opts.view, _4b2, dc.body2, false);
			opts.view.render.call(opts.view, _4b2, dc.body1, true);
			if (opts.showFooter) {
				opts.view.renderFooter.call(opts.view, _4b2, dc.footer2, false);
				opts.view.renderFooter.call(opts.view, _4b2, dc.footer1, true);
			}
 		}else{
 			// 追加数据
	 		var appendRows = data.rows || [];
	 		// 批量插入数据
	 		$(_4b2).datagrid("insertRows",{rows:appendRows});
	 		// 设置背景色
	 		checkBackground();
 		}

		if (opts.view.onAfterRender) {
			opts.view.onAfterRender.call(opts.view, _4b2);
		}
		dc.view.children("style:gt(0)").remove();
		/*临时调整onLoadSuccess函数位置*/
		// opts.onLoadSuccess.call(_4b2, data);
		var _4b6 = $(_4b2).datagrid("getPager");
		if (_4b6.length) {
			if (_4b6.pagination("options").total != data.total) {
				_4b6.pagination("refresh", {
					total: data.total
				});
			}
			// 用于显示多少条记录 同分页记录数分开
			opts.totalRecForDesc = data.total;
		}
		_448(_4b2);
		dc.body2.triggerHandler("scroll");

		/*检测是否有选中 用于翻页选中 并同时回调选中函数
		Bug: ---	此处可能会在翻页过程中多次回调onSelect*/
		_4b7();

		/*修复翻页选中 没有加入边框的问题*/
		setTimeout(function() {
			for (var x in opts.selected_index) { 
				try {
					if (!isNaN(x)) {
						var rowIndex = parseInt(x);
						handleBorder(_4b2,opts,rowIndex,true);	
					}
				} catch (e) {
					printLog("Error: 设置翻页选中高亮失败!");
				}
			}
			/*重置可能的selected_index*/
			opts.selected_index = {};
		}, 0);

		// 将_537函数中 请求成功回调函数中的loaded 放在此处 以提升显示效果
		$(_4b2).datagrid("loaded");

		/*临时调整改函数到_4b7函数之后*/
		successCallBackFlag && opts.onLoadSuccess.call(_4b2, data);

		// 修改为异步
		// $(_4b2).datagrid("autoSizeColumn");
		setTimeout(function() {
			try {
				$(_4b2).datagrid("autoSizeColumn");
			} catch (e) {
				printLog("Error: --> " + e.message);
			}
		}, 0);

		// fix by famingyuan ,选中对应的行
		fixSortCheck(_4b2, opts, false);

		// 更新全选checkbox控制
		updateSelectAll(opts, _4b2, _4b3.data);
		//判断数据格式是否正确 YH 2012.11.29 
		console.log('grid装载查询数据完毕,耗时：' + (typeof(gridBeginTime)!='undefined'?(new Date().getTime()-gridBeginTime):'未知'));
		function _4b7() {
			if (!data.rows) {
				// alert("远程数据加载失败，请检查数据格式！");
				if (typeof(console) != "undefined") {
					console.log("Error: 远程数据加载失败，请检查数据格式！");
				}
				return;
			}
			if (opts.idField) {
				for (var i = 0; i < data.rows.length; i++) {
					var row = data.rows[i];
					if (_4b8(row)) {
						_4be(_4b2, row[opts.idField]);
					}
				}
			}

			function _4b8(row) {
				for (var i = 0; i < _4b4.length; i++) {
					if (_4b4[i][opts.idField] == row[opts.idField]) {
						_4b4[i] = row;
						return true;
					}
				}
				return false;
			};
		};
		/**
		 * 补全列
		 * @param  {[type]} opts [description]
		 * @param  {[type]} row  [description]
		 * @return {[type]}      [description]
		 */
		function checkColumn(opts, row) {
		    // 获取所有的列的fieldId的名字 

		    function getColumnsName() {
		      var columns = opts.columns;
		      var columnsName = [];
		      for (var x in columns) {
		        for (var n in columns[x]) {
		          // 排除checkbox和非数据列
		          if (columns[x][n].field && !columns[x][n].checkbox) {
		            columnsName.push(columns[x][n].field);
		          }
		        }
		      }
		      return columnsName;
		    }
		    // 获取所有columnName
		    if (!this.columnsName) {
		      this.columnsName = getColumnsName();
		    }
		    var columnsName = this.columnsName;
		    var fieldId = null;
		    var tmpValue = null;

		    for (var n in columnsName) {
		      fieldId = columnsName[n];
		      try {
		        tmpValue = row[fieldId];
		      } catch (e) {
		        tmpValue = "";
		      }
		      row[fieldId] = (tmpValue == undefined) ? "" : tmpValue;
		    }
		    return row;
		  };
		  /**
		   * 设置背景色 奇偶色
		   * @return {[type]} [description]
		   */
		  function checkBackground() {
			    var view1_trs = $("tr", dc.body1);
			    var view2_trs = $("tr", dc.body2);

			    view1_trs.each(function(index) {
			      $(this).removeClass('datagrid-row-alt');
			      if (index % 2) {
			        $(this).addClass('datagrid-row-alt');
			      }
			    });
			    view2_trs.each(function(index) {
			      $(this).removeClass('datagrid-row-alt');
			      if (index % 2) {
			        $(this).addClass('datagrid-row-alt');
			      }
			    });
		  };
	};

	function _4b9(_4ba, row) {
		var opts = $.data(_4ba, "datagrid").options;
		var rows = $.data(_4ba, "datagrid").data.rows;
		if (typeof row == "object") {
			return _435(rows, row);
		} else {
			for (var i = 0; i < rows.length; i++) {
				if (rows[i][opts.idField] == row) {
					return i;
				}
			}
			return -1;
		}
	};

	function _4bb(_4bc) {
		var opts = $.data(_4bc, "datagrid").options;
		var data = $.data(_4bc, "datagrid").data;
		if (opts.idField) {
			return $.data(_4bc, "datagrid").selectedRows;
		} else {
			var rows = [];
			opts.finder.getTr(_4bc, "", "selected", 2).each(function() {
				var _4bd = parseInt($(this).attr("datagrid-row-index"));
				rows.push(data.rows[_4bd]);
			});
			return rows;
		}
	};

	function _4be(_4bf, _4c0) {
		var opts = $.data(_4bf, "datagrid").options;
		if (opts.idField) {
			var _4c1 = _4b9(_4bf, _4c0);
			if (_4c1 >= 0) {
				_4c2(_4bf, _4c1);
			}
		}
	};

	/*============================================*/
	/*selectSingle 背景色*/

	function _4c2(_4c3, _4c4, _4c5) {
		var _4c6 = $.data(_4c3, "datagrid");
		var dc = _4c6.dc;
		var opts = _4c6.options;
		var data = _4c6.data;
		var _4c7 = $.data(_4c3, "datagrid").selectedRows;
		if (opts.singleSelect) {
			_4c8(_4c3);
			_4c7.splice(0, _4c7.length);
		}
		if (opts.type_flag == 'datagrid') {
			/*对于datagrid屏蔽掉check 统一select和check*/
			var ck = opts.finder.getTr(_4c3, _4c4).find("div.datagrid-cell-check input[type=checkbox]");
			// 如果禁用了直接返回  2014/12/17
			if(ck.prop("disabled")){
				return;
			}
			if(PJF.constants.KEYBOARD_ENABLE){
				ck._propAttr("checked", true).focus();
			}else{
				ck._propAttr("checked", true);
			}
            
			//ck = opts.finder.getTr(_4c3, "", "allbody").find("div.datagrid-cell-check input[type=checkbox]:not(:checked)");
            //2016年2月26日10:31:05 zws 修改，提升DOM查找速度，适应“大次数高速循环触发”
            ck = dc.body1.add(dc.body2).find("div.datagrid-cell-check input[type=checkbox]:not(:checked)");
			if (!ck.length) {
				var _4e4 = dc.header1.add(dc.header2);
				if(PJF.constants.KEYBOARD_ENABLE){
					_4e4.find("input[type=checkbox]")._propAttr("checked", true).focus();
				}else{
					_4e4.find("input[type=checkbox]")._propAttr("checked", true);	
				}
				
			}
		} else if (!_4c5 && opts.checkOnSelect) {
			_4c9(_4c3, _4c4, true);
		}
		if (opts.idField) {
			var row = opts.finder.getRow(_4c3, _4c4);
			(function() {
				for (var i = 0; i < _4c7.length; i++) {
					if (_4c7[i][opts.idField] == row[opts.idField]) {
						return;
					}
				}
				_4c7.push(row);
			})();
		}
		// opts.onSelect.call(_4c3, _4c4, data.rows[_4c4]);
		var tr;
		//如果不是竖排标题表格以Y轴为准才加入选择背景 YH 2013.1.15
		if (!opts.axleY) {
			tr = opts.finder.getTr(_4c3, _4c4).addClass("datagrid-row-selected");
		} else {
			tr = opts.finder.getTr(_4c3, _4c4).addClass("");
		}
		if (tr.length) {
			var _4ca = dc.view2.children("div.datagrid-header")._outerHeight();
			var _4cb = dc.body2;
			var top = tr.position().top - _4ca;
			if (top <= 0) {
				_4cb.scrollTop(_4cb.scrollTop() + top);
			} else {
				if (top + tr._outerHeight() > _4cb.height() - 18) {
					_4cb.scrollTop(_4cb.scrollTop() + top + tr._outerHeight() - _4cb.height() + 18);
				}
			}
		}
		handleBorder(_4c3,opts,_4c4,true);		
		/*调整位置 让其能够实现一段选中就获取*/
		opts.onSelect.call(_4c3, _4c4, data.rows[_4c4]);
	};

	/*unSelectSingle 背景色*/

	function _4cc(_4cd, _4ce, _4cf) {
		var _4d0 = $.data(_4cd, "datagrid");
		var dc = _4d0.dc;
		var opts = _4d0.options;
		var data = _4d0.data;
		var _4d1 = $.data(_4cd, "datagrid").selectedRows;
		if (opts.type_flag == 'datagrid') {
			/*对于datagrid屏蔽掉check 统一select和check*/
			var ck = opts.finder.getTr(_4cd, _4ce).find("div.datagrid-cell-check input[type=checkbox]");
			ck._propAttr("checked", false);
			var _4e9 = dc.header1.add(dc.header2);
			_4e9.find("input[type=checkbox]")._propAttr("checked", false);
		} else if (!_4cf && opts.checkOnSelect) {
			_4d2(_4cd, _4ce, true);
		}
		opts.finder.getTr(_4cd, _4ce).removeClass("datagrid-row-selected");
		var row = opts.finder.getRow(_4cd, _4ce);
		if (opts.idField) {
			_436(_4d1, opts.idField, row[opts.idField]);
		}
		handleBorder(_4cd,opts,_4ce,false);
		opts.onUnselect.call(_4cd, _4ce, row);
	};

	/*selectAll  ---- 背景色*/

	function _4d3(_4d4, _4d5) {
		var _4d6 = $.data(_4d4, "datagrid");
		var opts = _4d6.options;
		var rows = _4d6.data.rows;
		var _4d7 = $.data(_4d4, "datagrid").selectedRows;
		var disabledIndex = opts.disabledIndex = opts.disabledIndex  || {};
		if (opts.type_flag == 'datagrid') {
			/*对于datagrid屏蔽掉check 统一select和check*/
			var _4ed = opts.finder.getTr(_4d4, "", "allbody").find("div.datagrid-cell-check input[type=checkbox]");
			// _4ed._propAttr("checked", true);
			_4ed.each(function  (index) {
				// 如果disable则pass
				if($(this).prop("disabled")){
					disabledIndex[index]=true;
					return;
				}
                disabledIndex[index] = false ;
				$(this)._propAttr("checked", true);
			});
		} else if (!_4d5 && opts.checkOnSelect) {
			_4d8(_4d4, true);
		}
		// opts.finder.getTr(_4d4, "", "allbody").addClass("datagrid-row-selected");
		opts.finder.getTr(_4d4, "", "allbody").each(function(index){
			// 修复treegrid 全选报错的bug
			try{
				var rowIndex = /datagrid-row-r\d+-\d+-(\d+)/.exec(this.id)[1];
			}catch(e){
				// console.error(e.message);
			}
			// 如果disable则pass
			if(disabledIndex[rowIndex]){
				return;
			}
			$(this).addClass("datagrid-row-selected");
		});
		if (opts.idField) {
			for (var _4d9 = 0; _4d9 < rows.length; _4d9++) {
				// 如果disable则pass
				if(disabledIndex[_4d9]){
					continue;
				}
				(function() {
					var row = rows[_4d9];
					for (var i = 0; i < _4d7.length; i++) {
						if (_4d7[i][opts.idField] == row[opts.idField]) {
							return;
						}
					}
					_4d7.push(row);
				})();
			}
		}
		opts.onSelectAll.call(_4d4, rows,disabledIndex);
	};

	/*unSelectAll-- 背景色*/

	function _4c8(_4da, _4db) {
		var _4dc = $.data(_4da, "datagrid");
		var opts = _4dc.options;
		var rows = _4dc.data.rows;
		var _4dd = $.data(_4da, "datagrid").selectedRows;
		if (opts.type_flag == 'datagrid') {
			/*对于datagrid屏蔽掉check 统一select和check*/
			var _4f1 = opts.finder.getTr(_4da, "", "allbody").find("div.datagrid-cell-check input[type=checkbox]");
			_4f1._propAttr("checked", false);
		} else if (!_4db && opts.checkOnSelect) {
			_4de(_4da, true);
		}
		// opts.finder.getTr(_4da, "", "selected").removeClass("datagrid-row-selected");
		var allTr = opts.finder.getTr(_4da, "", "allbody");
		allTr.removeClass("datagrid-row-selected");
		allTr.removeClass("datagrid-row-selected-fix-bottom");
		allTr.removeClass("datagrid-row-selected-fix-top");
		
		if (opts.idField) {
			for (var _4df = 0; _4df < rows.length; _4df++) {
				_436(_4dd, opts.idField, rows[_4df][opts.idField]);
			}
		}
		// 清空全选 按钮  value 2
		var ck = allTr.find("div.datagrid-cell-check input[type=checkbox]");
		if (ck.length > 0) {
			var dc = _4dc.dc;
			var _4e4 = dc.header1.add(dc.header2);
			var target = _4e4.find("input[type=checkbox]");
			target._propAttr("checked", false);
			if (opts.singleSelect) {
				target.css("display", "none");
			}
		}
		// end
		opts.onUnselectAll.call(_4da, rows);
	};

    /*selectMassRows  ---- 背景色*/
    function _4bx(jq,indexArr ){
        var _gridObj = $.data(jq, "datagrid");
        var _gridOpts = _gridObj.options;
        var _gridRows = _gridObj.data.rows;
        var _gridDom = _gridObj.dc;
        var _selectedRows = _gridObj.selectedRows;
        var disabledIndex = _gridOpts.disabledIndex = _gridOpts.disabledIndex  || {};

        //KEY0 :排个序
        indexArr = indexArr.sort();
        var lastIndex;
        //KEY1:内层checkbox 渲染
        if (_gridOpts.type_flag == 'datagrid') {
            var _allCheckbox = _gridOpts.finder.getTr(jq, "", "allbody").find("div.datagrid-cell-check input[type=checkbox]");
            _allCheckbox.each(function  (index) {

                var _currentIndex = $(this).closest("[datagrid-row-index]").attr("datagrid-row-index");
                var _ifInIndexArr = $.inArray( parseInt(_currentIndex,10) ,indexArr) < 0 ;

                if($(this).prop("disabled")){ // 如果disable则pass
                    disabledIndex[index]=true;
                    return;
                }
                disabledIndex[index] = false ;
                if( _ifInIndexArr ){ //如果不在indexARR中，则不加理会
                    return;
                }
                lastIndex = _currentIndex;
                $(this)._propAttr("checked", true);
            });
        }
        //KEY2：外层行渲染
        _gridOpts.finder.getTr(jq, "", "allbody").each(function(index){
            // 修复treegrid 全选报错的bug
            try{
                var rowIndex = /datagrid-row-r\d+-\d+-(\d+)/.exec(this.id)[1];
            }catch(e){
            }

            var _ifInIndexArr1 = $.inArray( parseInt(rowIndex,10) ,indexArr) < 0 ;
            if( _ifInIndexArr1 ){ //如果不在indexARR中，则不加理会
                return;
            }
            if(disabledIndex[rowIndex]){ // 如果disable则pass
                return;
            }
            $(this).addClass("datagrid-row-selected");
            handleBorder(jq,_gridOpts,rowIndex,true);
        });

        //KEY3: 带分析
        if (_gridOpts.idField) {
            for (var _4d9 = 0; _4d9 < rows.length; _4d9++) {
                // 如果disable则pass
                if(disabledIndex[_4d9]){
                    continue;
                }
                (function() {
                    var row = _gridRows[_4d9];
                    for (var i = 0; i < _selectedRows.length; i++) {
                        if (_selectedRows[i][_gridOpts.idField] == row[_gridOpts.idField]) {
                            return;
                        }
                    }
                    _selectedRows.push(row);
                })();
            }
        };

        //KEY 3.4:如果都被选完了，就把表头的checkbox给点了
        var allCk = _gridDom.body1.add(_gridDom.body2).find("div.datagrid-cell-check input[type=checkbox]:not(:checked)");
        if (!allCk.length) {
            var _4e4 = _gridDom.header1.add(_gridDom.header2);
            if(PJF.constants.KEYBOARD_ENABLE){
                _4e4.find("input[type=checkbox]")._propAttr("checked", true).focus();
            }else{
                _4e4.find("input[type=checkbox]")._propAttr("checked", true);
            }
        }

        //KEY 3.8:选完后，滚动到最下面的那个行
        var _lastRow = _gridOpts.finder.getTr(jq, lastIndex);
        if (_lastRow.length) {
            var _4ca = _gridDom.view2.children("div.datagrid-header")._outerHeight();
            var _4cb = _gridDom.body2;
            var top = _lastRow.position().top - _4ca;
            if (top <= 0) {
                _4cb.scrollTop(_4cb.scrollTop() + top);
            } else {
                if (top + _lastRow._outerHeight() > _4cb.height() - 18) {
                    _4cb.scrollTop(_4cb.scrollTop() + top + _lastRow._outerHeight() - _4cb.height() + 18);
                }
            }
        }
        if(PJF.constants.KEYBOARD_ENABLE){
            _lastRow.find("input[type=checkbox]").focus();
        }

        //KEY4: 回调添加数据
        _gridOpts.onSelectMassRows.call(jq, _gridRows,disabledIndex,indexArr);
    };

    /*unSelectMassRows  ---- 背景色*/
    function _4by(jq,indexArr){
        var _gridObj = $.data(jq, "datagrid");
        var _gridDom = _gridObj.dc;
        var _gridOpts = _gridObj.options;
        var _gridRows = _gridObj.data.rows;
        var _selectedRows = _gridObj.selectedRows;
        var disabledIndex = _gridOpts.disabledIndex = _gridOpts.disabledIndex  || {};
        //KEY0 :排个序
        indexArr = indexArr.sort();
        var lastIndex;
        if (_gridOpts.type_flag == 'datagrid') {
            var _4ed = _gridOpts.finder.getTr(jq, "", "allbody").find("div.datagrid-cell-check input[type=checkbox]");
            _4ed.each(function  (index) {

                var _currentIndex = $(this).closest("[datagrid-row-index]").attr("datagrid-row-index");
                var _ifInIndexArr = $.inArray( parseInt(_currentIndex,10) ,indexArr) < 0 ;

                if($(this).prop("disabled")){ // 如果disable则pass
                    disabledIndex[index]=true;
                    return;
                }
                disabledIndex[index] = false ;
                if( _ifInIndexArr ){ //如果不在indexARR中，则不加理会
                    return;
                }
                lastIndex = _currentIndex;
                $(this)._propAttr("checked", false);
            });

        }
        //KEY2：外层行渲染
        _gridOpts.finder.getTr(jq, "", "allbody").each(function(index){
            // 修复treegrid 全选报错的bug
            try{
                var rowIndex = /datagrid-row-r\d+-\d+-(\d+)/.exec(this.id)[1];
            }catch(e){
                // console.error(e.message);
            }

            var _ifInIndexArr1 = $.inArray( parseInt(rowIndex,10) ,indexArr) < 0 ;
            if( _ifInIndexArr1 ){ //如果不在indexARR中，则不加理会
                return;
            }
            if(disabledIndex[rowIndex]){ // 如果disable则pass
                return;
            }
            $(this).removeClass("datagrid-row-selected");
           handleBorder(jq,_gridOpts,rowIndex,false);
        });

        //KEY2：外层行渲染
        if (_gridOpts.idField) {
            for (var _4df = 0; _4df < rows.length; _4df++) {
                _436(_selectedRows, _gridOpts.idField, _gridRows[_4df][_gridOpts.idField]);
            }
        }
        //KEY 3.4:如果都被选完了，就把表头的checkbox给点了
        var allCk = _gridDom.body1.add(_gridDom.body2).find("div.datagrid-cell-check input[type=checkbox]:not(:checked)");
        if (allCk.length) {
            var _4e4 = _gridDom.header1.add(_gridDom.header2);
            _4e4.find("input[type=checkbox]")._propAttr("checked", false);
        }

        //KEY4: 回调添加数据
        _gridOpts.onUnSelectMassRows.call(jq, _gridRows,disabledIndex,indexArr);

    };
	/*================checkStart======================*/
	/*check single*/

	function _4c9(_4e0, _4e1, _4e2) {
		var _4e3 = $.data(_4e0, "datagrid");
		var opts = _4e3.options;
		var data = _4e3.data;
		if (opts.type_flag == 'datagrid') {
			/*对于datagrid屏蔽掉check 统一select和check*/
			if (!_4e2 && opts.selectOnCheck) {
				_4c2(_4e0, _4e1, true);
			}
			return;
		}
		if (!_4e2 && opts.selectOnCheck) {
			_4c2(_4e0, _4e1, true);
		}
		var ck = opts.finder.getTr(_4e0, _4e1).find("div.datagrid-cell-check input[type=checkbox]");
		ck._propAttr("checked", true);
		ck = opts.finder.getTr(_4e0, "", "allbody").find("div.datagrid-cell-check input[type=checkbox]:not(:checked)");
		if (!ck.length) {
			var dc = _4e3.dc;
			var _4e4 = dc.header1.add(dc.header2);
			_4e4.find("input[type=checkbox]")._propAttr("checked", true);
		}
		opts.onCheck.call(_4e0, _4e1, data.rows[_4e1]);
	};

	/*unCheck single*/

	function _4d2(_4e5, _4e6, _4e7) {
		var _4e8 = $.data(_4e5, "datagrid");
		var opts = _4e8.options;
		var data = _4e8.data;
		if (opts.type_flag == 'datagrid') {
			/*对于datagrid屏蔽掉check 统一select和check*/
			if (!_4e7 && opts.selectOnCheck) {
				_4cc(_4e5, _4e6, true);
			}
			return;
		}
		if (!_4e7 && opts.selectOnCheck) {
			_4cc(_4e5, _4e6, true);
		}
		var ck = opts.finder.getTr(_4e5, _4e6).find("div.datagrid-cell-check input[type=checkbox]");
		ck._propAttr("checked", false);
		var dc = _4e8.dc;
		var _4e9 = dc.header1.add(dc.header2);
		_4e9.find("input[type=checkbox]")._propAttr("checked", false);
		opts.onUncheck.call(_4e5, _4e6, data.rows[_4e6]);
	};

	/*checkAll所有*/

	function _4d8(_4ea, _4eb) {
		var _4ec = $.data(_4ea, "datagrid");
		var opts = _4ec.options;
		var data = _4ec.data;
		if (opts.type_flag == 'datagrid') {
			/*对于datagrid屏蔽掉check 统一select和check*/
			if (!_4eb && opts.selectOnCheck) {
				_4d3(_4ea, true);
			}
			return;
		}
		if (!_4eb && opts.selectOnCheck) {
			_4d3(_4ea, true);
		}
		var _4ed = opts.finder.getTr(_4ea, "", "allbody").find("div.datagrid-cell-check input[type=checkbox]");
		_4ed._propAttr("checked", true);
		opts.onCheckAll.call(_4ea, data.rows);
	};

	/*取消所有checkAll*/

	function _4de(_4ee, _4ef) {
		var _4f0 = $.data(_4ee, "datagrid");
		var opts = _4f0.options;
		var data = _4f0.data;
		if (opts.type_flag == 'datagrid') {
			/*对于datagrid屏蔽掉check 统一select和check*/
			if (!_4ef && opts.selectOnCheck) {
				_4c8(_4ee, true);
			}
			return;
		}
		if (!_4ef && opts.selectOnCheck) {
			_4c8(_4ee, true);
		}
		var _4f1 = opts.finder.getTr(_4ee, "", "allbody").find("div.datagrid-cell-check input[type=checkbox]");
		_4f1._propAttr("checked", false);
		opts.onUncheckAll.call(_4ee, data.rows);
	};

	/*===================================*/
	//增加datagrid编辑方法，精确到列_4f4ex 2012.12.27

	function _4f2(_4f3, _4f4, _4f4ex) {
		var opts = $.data(_4f3, "datagrid").options;
		var tr = opts.finder.getTr(_4f3, _4f4);
		var row = opts.finder.getRow(_4f3, _4f4);
		if (tr.hasClass("datagrid-row-editing")) {
			// 允许调用代码同时编辑多列  2013/06/09
			if (_4f4ex == undefined) {
				return;
			}
		}
		if (opts.onBeforeEdit.call(_4f3, _4f4, row) == false) {
			return;
		}
		/*取消一开始就加入editing功能 必须有编辑才加入*/
		// tr.addClass("datagrid-row-editing");
		_4f5(_4f3, _4f4, _4f4ex);
		_4a4(_4f3);

		if (_4f4ex != undefined) {
			var currEditTd = $(tr.children("td")[_4f4ex]);
			if (currEditTd.length == 1) {
				// 只有一个
				$(currEditTd).find("div.datagrid-editable").each(function() {
					var _4f6 = $(this).parent().attr("field");
					var ed = $.data(this, "datagrid.editor");
					// 添加行索引 列索引
					ed.actions.setValue(ed.target, row[_4f6], _4f4, _4f4ex);

					// 触发单个单元格校验
					_4f7Ex(_4f3, _4f4, _4f4ex);
				});
			}
			// 退出当前程序
			return;
		}

		tr.find("div.datagrid-editable").each(function() {
			var _4f6 = $(this).parent().attr("field");
			var ed = $.data(this, "datagrid.editor");
			ed.actions.setValue(ed.target, row[_4f6], _4f4, ed.columnIndex);
		});
		_4f7(_4f3, _4f4);
	};

	function _4f8(_4f9, _4fa, _4fb) {
		var opts = $.data(_4f9, "datagrid").options;
		var _4fc = $.data(_4f9, "datagrid").updatedRows;
		var _4fd = $.data(_4f9, "datagrid").insertedRows;
		var tr = opts.finder.getTr(_4f9, _4fa);
		var row = opts.finder.getRow(_4f9, _4fa);
		if (!tr.hasClass("datagrid-row-editing")) {
			return;
		}
		if (!_4fb) {
			if (!_4f7(_4f9, _4fa,true)) {
				return;
			}
			var _4fe = false;
			var _4ff = {};
			tr.find("div.datagrid-editable").each(function() {
				var _500 = $(this).parent().attr("field");
				var ed = $.data(this, "datagrid.editor");
				var _501 = ed.actions.getValue(ed.target);
				if (row[_500] != _501) {
					row[_500] = _501;
					_4fe = true;
					_4ff[_500] = _501;
				}
			});
			if (_4fe) {
				if (_435(_4fd, row) == -1) {
					if (_435(_4fc, row) == -1) {
						_4fc.push(row);
					}
				}
			}
		}
		tr.removeClass("datagrid-row-editing");
		_502(_4f9, _4fa);
		$(_4f9).datagrid("refreshRow", _4fa);
		if (!_4fb) {
			opts.onAfterEdit.call(_4f9, _4fa, row, _4ff);
		} else {
			opts.onCancelEdit.call(_4f9, _4fa, row);
		}
	};
	// 执行单列数据保存 add by famingyuan 添加参数--- columnIndex

	function _4f8Ex(_4f9, _4fa, _4fb, columnIndex) {

		var opts = $.data(_4f9, "datagrid").options;
		var _4fc = $.data(_4f9, "datagrid").updatedRows;
		var _4fd = $.data(_4f9, "datagrid").insertedRows;
		var tr = opts.finder.getTr(_4f9, _4fa);
		var row = opts.finder.getRow(_4f9, _4fa);
		if (!tr.hasClass("datagrid-row-editing")) {
			return;
		}
		// 临时对象 length==1
		var allEditBox = $("<div></div>");
		if (!_4fb) {
			if (!_4f7Ex(_4f9, _4fa, columnIndex,true)) {
				return;
			}
			var _4fe = false;
			var _4ff = {};
			var allTds = tr.children("td");
			var targetTd = allTds[columnIndex];
			var editBox = $(targetTd);
			if (editBox.length > 0) {
				editBox.find("div.datagrid-editable").each(function() {
					var _500 = $(this).parent().attr("field");
					var ed = $.data(this, "datagrid.editor");
					var _501 = ed.actions.getValue(ed.target);
					if (row[_500] != _501) {
						row[_500] = _501;
						_4fe = true;
						_4ff[_500] = _501;
					}
				});
				if (_4fe) {
					if (_435(_4fd, row) == -1) {
						if (_435(_4fc, row) == -1) {
							_4fc.push(row);
						}
					}
				}

				allEditBox = tr.find("div.datagrid-editable");

				// 敲回车  focus到本行的下一个
				if (allEditBox.length > 1) {
					// 找到下一个
					var nextEditBox = null;
					for (var i = columnIndex + 1; i < allTds.length; i++) {
						nextEditBox = $(allTds[i]).find(".validatebox-text");
						if (nextEditBox.length == 1) {
							nextEditBox.trigger("focus");
							break;
						}
					}
				}

			}
		}

		// 添加列参数 用于销毁单行单列
		_502Ex(_4f9, _4fa, columnIndex);

		// 当前已经没有列处于编辑状态  由于 查找是在之前查找的
		if (allEditBox.length == 1) {
			$(_4f9).datagrid("refreshRow", _4fa);
			tr.removeClass("datagrid-row-editing");
			if (!_4fb) {
				opts.onAfterEdit.call(_4f9, _4fa, row, _4ff, columnIndex);
			} else {
				opts.onCancelEdit.call(_4f9, _4fa, row, columnIndex);
			}
		}
		return;
		// 判断一行 是否ok  只有在正行OK的情况下 才会刷新行 并 调用回调
		if (_4f7(_4f9, _4fa)) {
			$(_4f9).datagrid("refreshRow", _4fa);
			tr.removeClass("datagrid-row-editing");
			if (!_4fb) {
				opts.onAfterEdit.call(_4f9, _4fa, row, _4ff, columnIndex);
			} else {
				opts.onCancelEdit.call(_4f9, _4fa, row, columnIndex);
			}
		}
	};

	function _503(_504, _505) {
		var opts = $.data(_504, "datagrid").options;
		var tr = opts.finder.getTr(_504, _505);
		var _506 = [];
		tr.children("td").each(function() {
			var cell = $(this).find("div.datagrid-editable");
			if (cell.length) {
				var ed = $.data(cell[0], "datagrid.editor");
				_506.push(ed);
			}
		});
		return _506;
	};

	function _507(_508, _509) {
		var _50a = _503(_508, _509.index);
		for (var i = 0; i < _50a.length; i++) {
			if (_50a[i].field == _509.field) {
				return _50a[i];
			}
		}
		return null;
	};
	//增加datagrid编辑方法，精确到列_50cex 2012.12.27

	function _4f5(_50b, _50c, _50cex) {
		var opts = $.data(_50b, "datagrid").options;
		var tr = opts.finder.getTr(_50b, _50c);
		// if (_50cex) {
		// 处理 第0列的情况
		if (_50cex != undefined) {
			var tds = tr.children("td");
			var cell = $(tds[_50cex]).find("div.datagrid-cell");
			var _50d = $(tds[_50cex]).attr("field");
			var col = _470(_50b, _50d);
			if (col && col.editor) {
				/*必须存在编辑才会给行加入editing*/
				tr.removeClass("datagrid-row-editing").addClass("datagrid-row-editing"); /*MF*/
				var _50e, _50f;
				if (typeof col.editor == "string") {
					_50e = col.editor;
				} else {
					_50e = col.editor.type;
					_50f = col.editor.options;
				}
				var _510 = opts.editors[_50e];
				if (_510) {
					var _511 = cell.html();
					var _512 = cell._outerWidth();
					cell.addClass("datagrid-editable");
					cell._outerWidth(_512);
					cell.html("<table border=\"0\" cellspacing=\"0\" cellpadding=\"1\"><tr><td></td></tr></table>");
					cell.children("table").attr("align", col.align);
					cell.children("table").bind("click dblclick contextmenu", function(e) {
						e.stopPropagation();
					});
					/*添加宽度设置*/
					if(_50f){
						// 保存原来的宽度 add 2013/06/18 
						if(_50f.width&&!_50f.orginalWidth){
							_50f.orginalWidth = _50f.width;
						}
						// 强制使用用户定义的宽度(新加功能 只能暂时多加一个标志位启用)
						if(_50f.useUserDefWidth&&_50f.orginalWidth){
							_50f.width = _50f.orginalWidth;
						}else{
							_50f.width = col.boxWidth+8-1;
						}
					}
					$.data(cell[0], "datagrid.editor", {
						actions: _510,
						// 往前端传递当前的dom对象  2013/06/13 add by famingyuan 
						target: _510.init(cell.find("td"), _50f, _50b),
						field: _50d,
						type: _50e,
						oldHtml: _511
					});
				}
			}
		} else {
			var columnIndex = -1;
			tr.children("td").each(function() {
				var cell = $(this).find("div.datagrid-cell");
				var _50d = $(this).attr("field");
				var col = _470(_50b, _50d);
				columnIndex++;
				if (col && col.editor) {
					/*必须存在编辑才会给行加入editing*/
					tr.removeClass("datagrid-row-editing").addClass("datagrid-row-editing"); /*MF*/
					var _50e, _50f;
					if (typeof col.editor == "string") {
						_50e = col.editor;
					} else {
						_50e = col.editor.type;
						_50f = col.editor.options;
					}
					var _510 = opts.editors[_50e];
					if (_510) {
						var _511 = cell.html();
						var _512 = cell._outerWidth();
						cell.addClass("datagrid-editable");
						cell._outerWidth(_512);
						cell.html("<table border=\"0\" cellspacing=\"0\" cellpadding=\"1\"><tr><td></td></tr></table>");
						cell.children("table").attr("align", col.align);
						cell.children("table").bind("click dblclick contextmenu", function(e) {
							e.stopPropagation();
						});
						/*添加宽度控制 让生成的框宽度和单元格宽度保持一致*/
						if(_50f){
							// _50f.width = col.boxWidth+8-1;
							// 保存原来的宽度 add 2013/10/28 
							if(_50f.width&&!_50f.orginalWidth){
								_50f.orginalWidth = _50f.width;
							}
							// 强制使用用户定义的宽度(新加功能 只能暂时多加一个标志位启用)
							if(_50f.useUserDefWidth&&_50f.orginalWidth){
								_50f.width = _50f.orginalWidth;
							}else{
								_50f.width = col.boxWidth+8-1;
							}
						}
						$.data(cell[0], "datagrid.editor", {
							actions: _510,
							// 往前端传递当前的dom对象  2013/06/13 add by famingyuan 
							target: _510.init(cell.find("td"), _50f, _50b),
							field: _50d,
							type: _50e,
							oldHtml: _511,
							columnIndex: columnIndex
						});
					}
				}
			});
		}
		_448(_50b, _50c, true);
	};

	function _502(_513, _514) {
		var opts = $.data(_513, "datagrid").options;
		var tr = opts.finder.getTr(_513, _514);
		tr.children("td").each(function() {
			var cell = $(this).find("div.datagrid-editable");
			if (cell.length) {
				var ed = $.data(cell[0], "datagrid.editor");
				if (ed.actions.destroy) {
					ed.actions.destroy(ed.target);
				}
				cell.html(ed.oldHtml);
				$.removeData(cell[0], "datagrid.editor");
				cell.removeClass("datagrid-editable");
				cell.css("width", "");
			}
		});
	};
	// 添加列参数 用于销毁单行单列

	function _502Ex(_513, _514, columnIndex) {
		var opts = $.data(_513, "datagrid").options;
		var tr = opts.finder.getTr(_513, _514);
		var allTds = tr.children("td");
		var targetTd = $(allTds[columnIndex]);
		if (targetTd.length == 1) {
			targetTd.each(function() {
				var cell = $(this).find("div.datagrid-editable");
				if (cell.length) {
					var ed = $.data(cell[0], "datagrid.editor");
					if (ed.actions.destroy) {
						ed.actions.destroy(ed.target);
					}

					if (ed.actions.getValue) {
						cell.html(ed.actions.getValue(ed.target));
					} else {
						cell.html(ed.oldHtml);
					}

					$.removeData(cell[0], "datagrid.editor");
					cell.removeClass("datagrid-editable");
					cell.css("width", "");
				}
			});
		}
	};

	function _4f7(_515, _516,isSaveData) {
        var opts = $.data(_515, "datagrid").options;
		var tr = opts.finder.getTr(_515, _516);
        var flag = opts.quickSave;              //2016年1月27日15:37:52  保存编辑完的行数据时，减少反复获焦又失焦
		if (!tr.hasClass("datagrid-row-editing")) {
			return true;
		}
		var vbox = tr.find(".validatebox-text");
		vbox.validatebox("validate");
		vbox.trigger("mouseleave");
		// 适配日期组件没有校验的问题  add by famingyuan ,2013/06/03
		vbox.trigger("blur");

		// 再次focus
        if(!flag){
            vbox.trigger("focus");
        }

		var _517 = tr.find(".validatebox-invalid");
		// 修复IE9下 连续双击编辑 事件被textfield循环校验阻塞的bug
		// 1. 处于保存数据的情况下 如果没有错误 则应该使其失去焦点
		if(_517.length == 0&&isSaveData){
            if(!flag) {
                vbox.trigger("blur");
            }
		}
		return _517.length == 0;
	};
	// 触发单个单元格 检查某行某列数据 add by famingyuan

	function _4f7Ex(_515, _516, columnIndex,isSaveData) {
		var tr = $.data(_515, "datagrid").options.finder.getTr(_515, _516);
		if (!tr.hasClass("datagrid-row-editing")) {
			return true;
		}

		// 修改为 先定位td 然后定位
		var allTds = tr.children("td");
		var targetTd = allTds[columnIndex];
		var vbox = $(targetTd).find(".validatebox-text");

		if (vbox.length == 0) {
			return;
		}

		vbox.validatebox("validate");
		vbox.trigger("mouseleave");

		// 适配日期组件没有校验的问题 
		vbox.trigger("blur");

		vbox.trigger("focus");

		var _517 = $(targetTd).find(".validatebox-invalid");
		// 修复IE9下 连续双击编辑 事件被textfield循环校验阻塞的bug
		// 1. 处于保存数据的情况下 如果没有错误 则应该使其失去焦点
		if(_517.length == 0&&isSaveData){
			vbox.trigger("blur");
		}
		return _517.length == 0;
	};

	function _518(_519, _51a) {
		var _51b = $.data(_519, "datagrid").insertedRows;
		var _51c = $.data(_519, "datagrid").deletedRows;
		var _51d = $.data(_519, "datagrid").updatedRows;
		if (!_51a) {
			var rows = [];
			rows = rows.concat(_51b);
			rows = rows.concat(_51c);
			rows = rows.concat(_51d);
			return rows;
		} else {
			if (_51a == "inserted") {
				return _51b;
			} else {
				if (_51a == "deleted") {
					return _51c;
				} else {
					if (_51a == "updated") {
						return _51d;
					}
				}
			}
		}
		return [];
	};

	function _51e(_51f, _520) {
		var opts = $.data(_51f, "datagrid").options;
		var data = $.data(_51f, "datagrid").data;
		var _521 = $.data(_51f, "datagrid").insertedRows;
		var _522 = $.data(_51f, "datagrid").deletedRows;
		var _523 = $.data(_51f, "datagrid").selectedRows;
		$(_51f).datagrid("cancelEdit", _520);
		var row = data.rows[_520];
		if (_435(_521, row) >= 0) {
			_436(_521, row);
		} else {
			_522.push(row);
		}
		_436(_523, opts.idField, data.rows[_520][opts.idField]);
		opts.view.deleteRow.call(opts.view, _51f, _520);
		if (opts.height == "auto") {
			_448(_51f);
		}
		$(_51f).datagrid("getPager").pagination("refresh", {
			total: data.total
		});
		/*修改显示的文字*/
		var opts = $.data(_51f, "datagrid").options;
		!opts.autoPagination&& opts.pagination && ($(_51f).datagrid("getPager").pagination("updateTotalRecDesc", opts.totalRecForDesc));
	};

	function _524(_525, _526) {
		var data = $.data(_525, "datagrid").data;
		var view = $.data(_525, "datagrid").options.view;
		var _527 = $.data(_525, "datagrid").insertedRows;
		view.insertRow.call(view, _525, _526.index, _526.row);
		_527.push(_526.row);
		$(_525).datagrid("getPager").pagination("refresh", {
			total: data.total
		});
		var opts = $.data(_525, "datagrid").options;
		!opts.autoPagination&&opts.pagination && ($(_525).datagrid("getPager").pagination("updateTotalRecDesc", opts.totalRecForDesc));
	};
	/**
	 * 添加批量数据添加操作
	 * @param  {[type]} dom  [description]
	 * @param  {[type]} rows [description]
	 * @return {[type]}      [description]
	 */
	function insertRows (dom,rowsJson) {
		var data = $.data(dom, "datagrid").data;
		var view = $.data(dom, "datagrid").options.view;
		var insertedRows = $.data(dom, "datagrid").insertedRows;
		view.insertRows.call(view, dom, rowsJson.index, rowsJson.rows);
		insertedRows.concat(rowsJson.rows); // 添加到insertedRows数组中
		$(dom).datagrid("getPager").pagination("refresh", {
			total: data.total
		});
		var opts = $.data(dom, "datagrid").options;
		!opts.autoPagination&&opts.pagination && ($(dom).datagrid("getPager").pagination("updateTotalRecDesc", opts.totalRecForDesc));
	};

	function _528(_529, row) {
		var data = $.data(_529, "datagrid").data;
		var view = $.data(_529, "datagrid").options.view;
		var _52a = $.data(_529, "datagrid").insertedRows;
		view.insertRow.call(view, _529, null, row);
		_52a.push(row);
		$(_529).datagrid("getPager").pagination("refresh", {
			total: data.total
		});
		var opts = $.data(_529, "datagrid").options;
		!opts.autoPagination&&opts.pagination && ($(_529).datagrid("getPager").pagination("updateTotalRecDesc", opts.totalRecForDesc));

		/*=========修复添加一行数据时 被选中的问题==============*/
		var rowIndex = -1;
		if(data.rows&&data.rows.length){
			rowIndex = data.rows.length -1;
		}
		_4cc(_529, rowIndex);
		/*=======================*/
	};

	function _52b(_52c) {
		var data = $.data(_52c, "datagrid").data;
		//判断数据加载格式是否正确 YH 2012.11.29
		if (!data.rows) {
			// alert("远程数据加载失败，请检查数据格式！");
			if (typeof(console) != "undefined") {
				console.log("Function _52b Error: 远程数据加载失败，请检查数据格式！");
			}
			return;
		}
		var rows = data.rows;
		var _52d = [];
		for (var i = 0; i < rows.length; i++) {
			_52d.push($.extend({}, rows[i]));
		}
		$.data(_52c, "datagrid").originalRows = _52d;
		$.data(_52c, "datagrid").updatedRows = [];
		$.data(_52c, "datagrid").insertedRows = [];
		$.data(_52c, "datagrid").deletedRows = [];
	};

	// 保存数据逻辑 添加保存某一行某一列数据情况  编辑器___
	// flag,rowIndex,colIndex 为用于

	function _52e(_52f, editInfo) {
		// ====执行数据前保存 add 2014/06/18=====
		var opts = $.data(_52f,"datagrid").options;
		// 是否执行数据保存 如果返回false 则取消数据保存
		if(opts.onBeforeAcceptChanges&&opts.onBeforeAcceptChanges(editInfo)===false){
			return;
		}
		//=======================================
		var data = $.data(_52f, "datagrid").data;
		var ok = true;

		// 更新某行的某列  针对flag 为true情况 ===== 只会出现在 textfield
		if (editInfo && editInfo.flag) {

			if (editInfo.rowIndex == undefined || editInfo.columnIndex == undefined) {
				alert("Error: rowIndex or columnIndex == undefined");
				return;
			}
			// 触发校验 检查一某行某列数据
			if (_4f7Ex(_52f, editInfo.rowIndex, editInfo.columnIndex,true)) {
				// 满足所有校验 保存改行列数据 效果编辑框
				_4f8Ex(_52f, editInfo.rowIndex, false, editInfo.columnIndex);
			} else {
				ok = false;
			}
			if (ok) {
				// 更新内部变量
				_52b(_52f);
			}
			return;
		}
		for (var i = 0, len = data.rows.length; i < len; i++) {
			if (_4f7(_52f, i,true)) {
				_4f8(_52f, i, false);
			} else {
				ok = false;
			}
		}
		if (ok) {
			_52b(_52f);
		}
	};

	function _530(_531) {
		var opts = $.data(_531, "datagrid").options;
		var _532 = $.data(_531, "datagrid").originalRows;
		var _533 = $.data(_531, "datagrid").insertedRows;
		var _534 = $.data(_531, "datagrid").deletedRows;
		var _535 = $.data(_531, "datagrid").selectedRows;
		var data = $.data(_531, "datagrid").data;
		for (var i = 0; i < data.rows.length; i++) {
			_4f8(_531, i, true);
		}
		var _536 = [];
		for (var i = 0; i < _535.length; i++) {
			_536.push(_535[i][opts.idField]);
		}
		_535.splice(0, _535.length);
		data.total += _534.length - _533.length;
		data.rows = _532;
		_4b1(_531, data);
		for (var i = 0; i < _536.length; i++) {
			_4be(_531, _536[i]);
		}
		_52b(_531);
	};
	// --------------------CCBS------------------------

	/**
	 * 更新PAGE_STA_KEY_LIST
	 * @param  {[type]} opts  [description]
	 * @param  {[type]} value [description]
	 * @param  {[type]} index [Index从1开始 配合当前页码]
	 * @return {[type]}       [description]
	 */

	function addPAG_STA_KEY(opts, value) {
		if (!opts.PAGE_STA_KEY_LIST) {
			opts.PAGE_STA_KEY_LIST = [];
		}
		opts.PAGE_STA_KEY_LIST.push(value);
	};
	/**
	 * 获取PAGE_STA_KEY
	 * @return {[type]} [description]
	 */

	function getPAG_STA_KEY(opts, flag) {
		if (!opts.PAGE_STA_KEY_LIST || opts.PAGE_STA_KEY_LIST.length == 0) {
			if (flag) {
				return opts.firstSTA_KEY;
			}
			alert("ERROR, PAGE_STA_KEY_LIST =  " + opts.PAGE_STA_KEY_LIST + "!");
			return "";
		}
		if (flag) {
			return opts.PAGE_STA_KEY_LIST[opts.PAGE_STA_KEY_LIST.length - 1];
		}
		var value = opts.PAGE_STA_KEY_LIST.pop();
		return value;
	}
	/**
	 * 设置CCBS请求时 参数
	 * @param {[type]} dom        [description]
	 * @param {[type]} opts       [description]
	 * @param {[type]} jsonDataEx [description]
	 */

	function setCCBSParameter(dom, opts, jsonDataEx) {

		if (opts.isCCBS) {
			var CCBS_Info = {};
			// 第一次发送请求 
			if (opts.isFirstCCBSReq) {
				CCBS_Info["INM_MSG_STATUS"] = 32769;
				CCBS_Info["INM_PAGE_CTL"] = {};
				CCBS_Info.INM_PAGE_CTL["INM_PAGE_UP_DOWN"] = 0;
			} else {
				// 第二次请求
				// 取得信息 
				var lastData = $.data(dom, "datagrid").data;

				var PAGE_STA_KEY = getCCBSValueByKey(lastData, "OPM_PAGE_CTL.OPM_PAGE_STA_KEY", opts);
				var PAGE_END_KEY = getCCBSValueByKey(lastData, "OPM_PAGE_CTL.OPM_PAGE_END_KEY", opts);
				var CONV_NO_DATA = getCCBSValueByKey(lastData, "OPM_PAGE_CTL.OPM_PAGE_NO_DATA", opts);

				/*如果之前还没有取到 再取一次 适配可能的中途添加修改*/
				if (!opts.OPM_ITI_ID) {
					opts.OPM_ITI_ID = getCCBSValueByKey(lastData, "OPM_ITI_ID", opts);
				}
				/*上传INM_ITI_ID*/
				CCBS_Info["INM_ITI_ID"] = opts.OPM_ITI_ID;

				CCBS_Info["INM_MSG_STATUS"] = 36865;
				CCBS_Info["INM_PAGE_CTL"] = {};

				if (opts.ccbsReqFlag.preReq) { // 上页  
					if (PAGE_STA_KEY == opts.firstSTA_KEY) {
						return false;
					} else {
						CCBS_Info.INM_PAGE_CTL["INM_PAGE_UP_DOWN"] = 1;
					}
					PAGE_STA_KEY = getPAG_STA_KEY(opts);
				} else if (opts.ccbsReqFlag.nextReq) { // 下页
					if (CONV_NO_DATA == "1") {
						return false;
					} else {
						CCBS_Info.INM_PAGE_CTL["INM_PAGE_UP_DOWN"] = 2;
					}
					var tmp_PAGE_STA_KEY = PAGE_STA_KEY;
					if (opts.PRE_PAGE_STA_KEY) {
						PAGE_STA_KEY = opts.PRE_PAGE_STA_KEY;
						opts.PRE_PAGE_STA_KEY = tmp_PAGE_STA_KEY;
					} else {
						opts.PRE_PAGE_STA_KEY = PAGE_STA_KEY;
					}
					PAGE_STA_KEY = getPAG_STA_KEY(opts, true);
					addPAG_STA_KEY(opts, opts.PRE_PAGE_STA_KEY);
				} else {
					// 加载当前页情况 ......
					alert("不支持加载当前页模式!");
					return false;
				}

				CCBS_Info.INM_PAGE_CTL["INM_PAGE_STA_KEY"] = PAGE_STA_KEY;
				CCBS_Info.INM_PAGE_CTL["INM_PAGE_END_KEY"] = PAGE_END_KEY;

				// FOR TEST 
				// opts.queryParams["INM_PAGE_STA_KEY"] = PAGE_STA_KEY;
				// opts.queryParams["INM_PAGE_END_KEY"] = PAGE_END_KEY;
				// opts.queryParams["INM_PAGE_UP_DOWN"] = CCBS_Info.INM_PAGE_CTL["INM_PAGE_UP_DOWN"];
				// END TEST
			}
			// jsonDataEx[opts.sendPath] = CCBS_Info;
			if(opts.sendPath=="."){	
				for(var x in CCBS_Info){
					jsonDataEx[x]=CCBS_Info[x];
				}
			}else{
				jsonDataEx[opts.sendPath] = CCBS_Info;
			}
		}

		return true;
	};
	/**
	 * 设置P6请求时 参数
	 * @param {[type]} dom        [description]
	 * @param {[type]} opts       [description]
	 * @param {[type]} jsonDataEx [description]
	 */

	function setP6Parameter(dom, opts, jsonDataEx) {

		if (opts.isCCBS) {
			var CCBS_Info = {};
			// 第一次发送请求 
			if (opts.isFirstCCBSReq) {
				CCBS_Info["FLOW_STATUS"] = opts.firstReqFlowStatus || "00000000";
			} else {
				// 第二次请求
				// 取得信息 
				var lastData = $.data(dom, "datagrid").data;
				var FLOW_STATUS = getCCBSValueByKey(lastData, "FLOW_STATUS", opts);
				if (FLOW_STATUS == "00000000") {
					if (typeof(console) != "undefined") {
						console.log("Error: 主机系统已经主动终止了本套会话，外围系统不可在继续交谈！");
					}
					return false;
				}
				var PAGE_STA_KEY = getCCBSValueByKey(lastData, "PAGE_STA_KEY", opts);
				var PAGE_END_KEY = getCCBSValueByKey(lastData, "PAGE_END_KEY", opts);
				var CONV_NO_DATA = getCCBSValueByKey(lastData, "CONV_NO_DATA", opts);
				var FLOW_ITI_ID = getCCBSValueByKey(lastData, "FLOW_ITI_ID", opts);

				CCBS_Info["FLOW_STATUS"] = FLOW_STATUS;
				CCBS_Info["FLOW_ITI_ID"] = FLOW_ITI_ID;

				if (opts.ccbsReqFlag.preReq) { // 上页  
					if (PAGE_STA_KEY == opts.firstSTA_KEY) {
						return false;
					} else {
						CCBS_Info["PAGE_UP_DOWN"] = 1;
					}
					PAGE_STA_KEY = getPAG_STA_KEY(opts);
				} else if (opts.ccbsReqFlag.nextReq) { // 下页
					if (CONV_NO_DATA == "Y") {
						return false;
					} else {
						CCBS_Info["PAGE_UP_DOWN"] = 2;
					}
					var tmp_PAGE_STA_KEY = PAGE_STA_KEY;
					if (opts.PRE_PAGE_STA_KEY) {
						PAGE_STA_KEY = opts.PRE_PAGE_STA_KEY;
						opts.PRE_PAGE_STA_KEY = tmp_PAGE_STA_KEY;
					} else {
						opts.PRE_PAGE_STA_KEY = PAGE_STA_KEY;
					}
					PAGE_STA_KEY = getPAG_STA_KEY(opts, true);
					addPAG_STA_KEY(opts, opts.PRE_PAGE_STA_KEY);
				} else {
					// 加载当前页情况 ......
					alert("不支持加载当前页模式!");
					return false;
				}

				// 修改p6翻页bug 2014/11/03 默认情况下按照之前的翻页方式 
				// 配置为fixP6 按照新标准则直接使用上次响应中的参数就行
				if(opts.p6ReqTypeFix){
					PAGE_STA_KEY = getCCBSValueByKey(lastData, "PAGE_STA_KEY", opts);
					PAGE_END_KEY = getCCBSValueByKey(lastData, "PAGE_END_KEY", opts);
				}

				CCBS_Info["PAGE_STA_KEY"] = PAGE_STA_KEY;
				CCBS_Info["PAGE_END_KEY"] = PAGE_END_KEY;

				// FOR TEST 
				// opts.queryParams["PAGE_STA_KEY"] = PAGE_STA_KEY;
				// opts.queryParams["PAGE_END_KEY"] = PAGE_END_KEY;
				// opts.queryParams["PAGE_UP_DOWN"] = CCBS_Info["PAGE_UP_DOWN"];
				// END TEST
			}
			// jsonDataEx["CCBS_Info"] = CCBS_Info;
			if(opts.sendPath=="."){	
				for(var x in CCBS_Info){
					jsonDataEx[x]=CCBS_Info[x];
				}
			}else{
				// 兼容已有代码 使用CCBS_Info 作为参数存放位置
				jsonDataEx["CCBS_Info"] = CCBS_Info;
			}
		}

		return true;
	};

	/**
	 * 设置P6请求时 参数  对应交易文档《主机技术框架与应用平台联机流程交互模式》----- 4.2	一般交谈式交易模式2
	 * @param {[type]} dom        [description]
	 * @param {[type]} opts       [description]
	 * @param {[type]} jsonDataEx [description]
	 */

	function setP6_2Parameter(dom, opts, jsonDataEx) {

		var CCBS_Info = {};
		// 第一次发送请求 
		if (opts.isFirstCCBSReq) {
			CCBS_Info["FLOW_STATUS"] = "00000130"; // 首笔 传 00000130
		} else {
			// 第二次请求
			// 取得信息 
			var lastData = $.data(dom, "datagrid").data;
			var FLOW_STATUS = getCCBSValueByKey(lastData, "FLOW_STATUS", opts);
			if (FLOW_STATUS == "00000000") {
				if (typeof(console) != "undefined") {
					console.log("Error: 主机系统已经主动终止了本套会话，外围系统不可在继续交谈！");
				}
				return false;
			}
			var FLOW_ITI_ID = getCCBSValueByKey(lastData, "FLOW_ITI_ID", opts);

			CCBS_Info["FLOW_STATUS"] = FLOW_STATUS; // 非首笔 传 00000131 --- 首次查询 响应结果为 00000131
			CCBS_Info["FLOW_ITI_ID"] = FLOW_ITI_ID;
		}

		if(opts.sendPath=="."){	
			for(var x in CCBS_Info){
				jsonDataEx[x]=CCBS_Info[x];
			}
		}else{
			// 兼容已有代码 使用CCBS_Info 作为参数存放位置
			jsonDataEx["CCBS_Info"] = CCBS_Info;
		}

		return true;
	};

	/**
	 * 设置NCIMP请求时 参数
	 * @param {[type]} dom        [description]
	 * @param {[type]} opts       [description]
	 * @param {[type]} jsonDataEx [description]
	 */

	function setNCIMPParameter(dom, opts, jsonDataEx) {
		if (opts.isCCBS) {
			var CCBS_Info = {};
			// 第一次发送请求 
			if (opts.isFirstCCBSReq) {
				// CCBS_Info["PAGE_UP_DOWN"] = "2"; // 三个参数必须同时传或者同时不传
				// CCBS_Info["PAGE_STA_KEY"] = "";
				// CCBS_Info["PAGE_END_KEY"] = "";
				CCBS_Info["FLOW_STATUS"] = "00000000";
				// CCBS_Info["FLOW_ITI_ID"] = "";

			} else {
				// 第二次请求
				// 取得信息 
				var lastData = $.data(dom, "datagrid").data;

				// var FLOW_STATUS = getCCBSValueByKey(lastData, "FLOW_STATUS", opts);
				var PAGE_STA_KEY = getCCBSValueByKey(lastData, "PAGE_STA_KEY", opts);
				var PAGE_END_KEY = getCCBSValueByKey(lastData, "PAGE_END_KEY", opts);
				var CONV_NO_DATA = getCCBSValueByKey(lastData, "CONV_NO_DATA", opts);
				var FLOW_ITI_ID = getCCBSValueByKey(lastData, "FLOW_ITI_ID", opts);
				// 当前页码
				var ccbsRealTimePageNumber  = $(dom).datagrid("getPageInfo").ccbsRealTimePageNumber || 1;

				CCBS_Info["FLOW_STATUS"] = "00000100"; // 多页式查询模式
				CCBS_Info["FLOW_ITI_ID"] = FLOW_ITI_ID; // 上送上次返回的

				if (opts.ccbsReqFlag.preReq) { // 上页  
					// 当前是第一页 则不再往前翻了
					if (ccbsRealTimePageNumber==1) {
						return false;
					} else {
						CCBS_Info["PAGE_UP_DOWN"] = 1;
					}
				} else if (opts.ccbsReqFlag.nextReq) { // 下页
					if (CONV_NO_DATA == "Y") {
						return false;
					} else {
						CCBS_Info["PAGE_UP_DOWN"] = 2;
					}
				} else {
					// 加载当前页情况 ......
					alert("不支持加载当前页模式!");
					return false;
				}
				// 上送上一支交易返回的
				CCBS_Info["PAGE_STA_KEY"] = PAGE_STA_KEY;
				CCBS_Info["PAGE_END_KEY"] = PAGE_END_KEY;
			}
			if(opts.sendPath=="."){	
				for(var x in CCBS_Info){
					jsonDataEx[x]=CCBS_Info[x];
				}
			}else{
				jsonDataEx[opts.sendPath] = CCBS_Info;
			}
		}

		return true;
	};
	/**
	 * 设置CCBSS请求时 参数
	 * @param {[type]} dom        [description]
	 * @param {[type]} opts       [description]
	 * @param {[type]} jsonDataEx [description]
	 */

	function setCCBSSParameter(dom, opts, jsonDataEx) {

		if (opts.isCCBS) {
			var CCBS_Info = {};
			// 第一次发送请求 
			if (opts.isFirstCCBSReq) {
				CCBS_Info["QUERY_PAGE_NO"] = 0;
				CCBS_Info["QUERY_LINE_COUNT"] = 10;
				CCBS_Info["INDEX_STRING"] = "";
				opts.currentPageNumber = 1;
				opts.firstSTA_KEY = 1;

			} else {
				// 可能数据是自己请求回来的
				opts.currentPageNumber = opts.currentPageNumber || 1;
				opts.firstSTA_KEY = opts.firstSTA_KEY || 1;

				// 第二次请求
				// 取得信息
				var lastData = $.data(dom, "datagrid").data;
				var INDEX_STRING = getCCBSValueByKey(lastData, "INDEX_STRING", opts);
				var QUERY_PAGE_NO = opts.currentPageNumber;
				var RETURN_LINE_COUNT = getCCBSValueByKey(lastData, "RETURN_LINE_COUNT", opts, true, 0);
				if (opts.ccbsReqFlag.preReq) { // 上页  
					if (QUERY_PAGE_NO == opts.firstSTA_KEY) {
						return false;
					}
					QUERY_PAGE_NO--;
				} else if (opts.ccbsReqFlag.nextReq) { // 下页
					if (RETURN_LINE_COUNT < 10) {
						return false;
					}
					QUERY_PAGE_NO++;
				} else {
					// 加载当前页情况 ......
					alert("不支持加载当前页模式!");
					return false;
				}
				// 这个字段 有可能出现 第三页（20条数据）
				opts.currentPageNumber = QUERY_PAGE_NO;
				CCBS_Info["QUERY_PAGE_NO"] = QUERY_PAGE_NO;
				// 修复CCBSS原有的缺陷
				if(opts.ccbssReqTypeFix){
					CCBS_Info["QUERY_PAGE_NO"] = QUERY_PAGE_NO - 1;
				}
				CCBS_Info["QUERY_LINE_COUNT"] = 10;
				CCBS_Info["INDEX_STRING"] = INDEX_STRING;
			}
			// FOR TEST 
			// opts.queryParams["QUERY_PAGE_NO"] = CCBS_Info["QUERY_PAGE_NO"];
			// opts.queryParams["QUERY_LINE_COUNT"] = 10;
			// opts.queryParams["INDEX_STRING"] = CCBS_Info["INDEX_STRING"];
			// END TEST
			// jsonDataEx[opts.sendPath] = CCBS_Info;
			if(opts.sendPath=="."){	
				for(var x in CCBS_Info){
					jsonDataEx[x]=CCBS_Info[x];
				}
			}else{
				jsonDataEx[opts.sendPath] = CCBS_Info;
			}
		}

		return true;
	};
	/**
	 * 设置CCBS请求时 参数
	 * @param {[type]} dom        [description]
	 * @param {[type]} opts       [description]
	 * @param {[type]} jsonDataEx [description]
	 */

	function setFESPParameter(dom, opts, jsonDataEx) {

		if (opts.isCCBS) {
			var CCBS_Info = {};
			// 第一次发送请求 
			if (opts.isFirstCCBSReq) {
				CCBS_Info["BGN_NO"] = 1;
			} else {
				// 第二次请求
				// 取得信息 
				var lastData = $.data(dom, "datagrid").data;

				var UP_NO = getCCBSValueByKey(lastData, "UP_NO", opts);
				var DOWN_NO = getCCBSValueByKey(lastData, "DOWN_NO", opts);
				var FLAG = getCCBSValueByKey(lastData, "FLAG", opts);
				/**
				 *  0_无向前查询数据，有向后查询数据
					1_有向前查询数据，有向后查询数据
					2_有向前查询数据，无向后查询数据
					3_无向前查询数据，无向后查询数据
				 * @type {Number}
				 */
				var BGN_NO = 1;
				if (opts.ccbsReqFlag.preReq) { // 上页  
					// 没有前一页
					if (FLAG == "0" || FLAG == "3") {
						return false;
					}
					BGN_NO = UP_NO;
				} else if (opts.ccbsReqFlag.nextReq) { // 下页
					// 已经是最后一页
					if (FLAG == "2" || FLAG == "3") {
						return false;
					}
					BGN_NO = DOWN_NO;
				} else {
					// 加载当前页情况 ......
					alert("不支持加载当前页模式!");
					return false;
				}
				CCBS_Info["BGN_NO"] = BGN_NO;
			}
			// FOR TEST 
			// opts.queryParams["BGN_NO"] = CCBS_Info["BGN_NO"];
			// END TEST
			// jsonDataEx[opts.sendPath] = CCBS_Info;
			// 2013/12/31 适配根层次结构
			if(opts.sendPath=="."){	
				for(var x in CCBS_Info){
					jsonDataEx[x]=CCBS_Info[x];
				}
			}else{
				jsonDataEx[opts.sendPath] = CCBS_Info;	
			}
		}

		return true;
	};
    /**
     * 设置CCBS请求时 参数 2016年3月3日14:57:12 zws add 满足特殊的FESP
     * @param {[type]} dom        [description]
     * @param {[type]} opts       [description]
     * @param {[type]} jsonDataEx [description]
     */

    function setFESP_2Parameter(dom, opts, jsonDataEx) {

        if (opts.isCCBS) {
            var CCBS_Info = {};
            // 第一次发送请求
            if (opts.isFirstCCBSReq) {
                CCBS_Info["ST_NO"] = 0;
            } else {
                // 第二次请求
                // 取得信息
                var lastData = $.data(dom, "datagrid").data;

                var UP_NO = getCCBSValueByKey(lastData, "UP_NO", opts);
                var DOWN_NO = getCCBSValueByKey(lastData, "DOWN_NO", opts);
                var FLAG = getCCBSValueByKey(lastData, "FLAG", opts);
                /**
                 *  0_无向前查询数据，有向后查询数据
                 1_有向前查询数据，有向后查询数据
                 2_有向前查询数据，无向后查询数据
                 3_无向前查询数据，无向后查询数据
                 * @type {Number}
                 */
                var ST_NO = 0;
                if (opts.ccbsReqFlag.preReq) { // 上页
                    // 没有前一页
                    if (FLAG == "0" || FLAG == "3") {
                        return false;
                    }
                    ST_NO = UP_NO;
                } else if (opts.ccbsReqFlag.nextReq) { // 下页
                    // 已经是最后一页
                    if (FLAG == "2" || FLAG == "3") {
                        return false;
                    }
                    ST_NO = DOWN_NO;
                } else {
                    // 加载当前页情况 ......
                    alert("不支持加载当前页模式!");
                    return false;
                }
                CCBS_Info["ST_NO"] = ST_NO;
            }

            // 2013/12/31 适配根层次结构
            if(opts.sendPath=="."){
                for(var x in CCBS_Info){
                    jsonDataEx[x]=CCBS_Info[x];
                }
            }else{
                jsonDataEx[opts.sendPath] = CCBS_Info;
            }
        }
        return true;
    };
	/**
	 * 设置ECIFP请求时 参数
	 * @param {[type]} dom        [description]
	 * @param {[type]} opts       [description]
	 * @param {[type]} jsonDataEx [description]
	 *
	 */

	function setECIFPParameter(dom, opts, jsonDataEx) {

		if (opts.isCCBS) {
			var CCBS_Info = {};
			// 第一次发送请求 
			if (opts.isFirstCCBSReq) {
				CCBS_Info["INM_FIRST_NO"] = 1;
				CCBS_Info["INM_RESULT_SIZE"] = opts.pageSize;
				opts.firstSTA_KEY = 1;
			} else {
				// 可能数据最初由loadData加载
				opts.firstSTA_KEY = opts.firstSTA_KEY || 1;
				// 第二次请求
				// 取得信息 
				var lastData = $.data(dom, "datagrid").data;

				// 当前页的起始号
				var OPM_FIRST_NO = getCCBSValueByKey(lastData, "OPM_FIRST_NO", opts, true, 1);
				// 当前是否已经是最后一页
				var OPM_LAST_FLAG = getCCBSValueByKey(lastData, "OPM_LAST_FLAG", opts);
				// 当前页总条数--- 服务端返回
				var OPM_RETURN_NUM = getCCBSValueByKey(lastData, "OPM_RETURN_NUM", opts);

				if (opts.ccbsReqFlag.preReq) { // 上页  
					if (OPM_FIRST_NO == opts.firstSTA_KEY) {
						// 已经是在第一页了
						return false;
					}
					OPM_FIRST_NO = OPM_FIRST_NO - opts.pageSize;
					OPM_FIRST_NO = (OPM_FIRST_NO > 0) ? OPM_FIRST_NO : 1;
				} else if (opts.ccbsReqFlag.nextReq) { // 下页
					if (OPM_LAST_FLAG == "1") {
						// 已经是在最后一页了
						return false;
					}
					OPM_FIRST_NO = OPM_FIRST_NO + opts.pageSize;
				} else {
					alert("不支持加载当前页模式!");
					return false;
				}
				CCBS_Info["INM_FIRST_NO"] = OPM_FIRST_NO;
				CCBS_Info["INM_RESULT_SIZE"] = opts.pageSize;

			}
			if(opts.sendPath=="."){	
				for(var x in CCBS_Info){
					jsonDataEx[x]=CCBS_Info[x];
				}
			}else{
				jsonDataEx[opts.sendPath] = CCBS_Info;
			}
			// FOR TEST 
			// opts.queryParams["INM_FIRST_NO"] = CCBS_Info["INM_FIRST_NO"];
			// opts.queryParams["INM_RESULT_SIZE"] = CCBS_Info["INM_RESULT_SIZE"];
			// END TEST
		}
		return true;
	};
	/**
	 * 设置CREDITCARD 请求参数
	 * @param {[type]} dom        [description]
	 * @param {[type]} opts       [description]
	 * @param {[type]} jsonDataEx [description]
	 */
	function setCreditcardParameter (dom, opts, jsonDataEx) {
		// 目前没有规则判断是否还有下一页
		return true;
	};
	// 
	/**
	 * 设置请求参数 支持 CCBS CCBSS ECIFP FESP 四种模式
	 * @param {[type]} dom        [description]
	 * @param {[type]} opts       [description]
	 * @param {[type]} jsonDataEx [description]
	 */

	function setReqParameter(dom, opts, jsonDataEx) {
		if (!opts.isCCBS) {
			if (opts.reqType) {
				switch (opts.reqType) {
					// 对应交易文档《主机技术框架与应用平台联机流程交互模式》----- 4.2	一般交谈式交易模式2
					// 且采用的是带分页按钮的模式 故 isCCBS标示为false
					case "P6_2": 
					return setP6_2Parameter(dom, opts, jsonDataEx);
					break;
				}
			}
			return true;
		}
		switch (opts.reqType) {
			case "CREDITCARD":
				return setCreditcardParameter(dom, opts, jsonDataEx);
				break;
			case "P6":
				return setP6Parameter(dom, opts, jsonDataEx);
				break;
			case "CCBS":
				return setCCBSParameter(dom, opts, jsonDataEx);
				break;
			case "CCBSS":
				return setCCBSSParameter(dom, opts, jsonDataEx);
				break;
			case "ECIFP":
				return setECIFPParameter(dom, opts, jsonDataEx);
				break;
			case "FESP":
				return setFESPParameter(dom, opts, jsonDataEx);
				break;
            case "FESP_2":
                return setFESP_2Parameter(dom, opts, jsonDataEx);
                break;
			case "NCIMP":
				return setNCIMPParameter(dom,opts,jsonDataEx);
				break;
			default:
				alert("Error: setReqParameter 不支持reqType为 " + opts.reqType + " 的请求！");
				return false;
		}

	}
	/**
	 * 用于设置启用或者禁用按钮
	 * @param {Boolean} isCCBS        是否为CCBS模式
	 * @param {[type]}  preBtnStatus  上页按钮状态
	 * @param {[type]}  nextBtnStatus 下页按钮状态
	 */

	function setCCBSPagBtn(dom, a, b) {
		var opts = $.data(dom, "datagrid").options;
		// return;
		// 修复在分页栏设置为false情况下 且 isCCBS为true时 
		// 设置按钮状态的bug pagination为false时 无需设置按钮状态
		if (opts.isCCBS&&opts.pagination!==false) {
			$(dom).datagrid("getPager").pagination('setPagBtnStatus', {
				preBtnStatus: a,
				nextBtnStatus: b
			});
		}
	};
	// 统一处理 

	function getCCBSValueByKey(jd, key, opts, isParseInt, defaultValue) {
		// var keyPath = "jd." + opts.ccbsPath + "." + key;
		// 修改获取数据在根层的问题
		var keyPath = "";
		if (opts.ccbsPath==".") {
			keyPath = "jd." + key;
		} else {
			keyPath = "jd." + opts.ccbsPath + "." + key;
		}

		var value = "";
		try {
			value = eval("(" + keyPath + ")");
			value = (value == undefined) ? "" : value;
		} catch (e) {
			value = "";
		}

		if (isParseInt) {
			try {
				value = parseInt(value);
				if (isNaN(value)) {
					value = (defaultValue ? defaultValue : 0);
				}
			} catch (e) {
				value = (defaultValue ? defaultValue : 0);
				if (typeof(console) != "undefined") {
					console.log("Error--> parse value(" + value + ") to int error!");
				}
			}
		}

		return value;
	};

	// 用于在加载数据时处理 CCBS 

	function ccbsLoadHandler(opts, data, dom) {
		if (opts.isCCBS) {
			var preBtnStatus = false;
			var nextBtnStatus = false;
			// if (data && data.total > 0) {
			var CONV_NO_DATA = getCCBSValueByKey(data, "OPM_PAGE_CTL.OPM_PAGE_NO_DATA", opts);
			var PAGE_STA_KEY = getCCBSValueByKey(data, "OPM_PAGE_CTL.OPM_PAGE_STA_KEY", opts);

			/* 取得 OPM_ITI_ID */
			if (!opts.OPM_ITI_ID) {
				opts.OPM_ITI_ID = getCCBSValueByKey(data, "OPM_ITI_ID", opts);
			}

			if (!opts.firstSTA_KEY) {
				opts.firstSTA_KEY = PAGE_STA_KEY;
			}
			if (PAGE_STA_KEY == opts.firstSTA_KEY) {
				opts.PRE_PAGE_STA_KEY = PAGE_STA_KEY;
			}
			if (CONV_NO_DATA == "1") {
				nextBtnStatus = false;
			} else {
				nextBtnStatus = true;
			}
			if (PAGE_STA_KEY == opts.firstSTA_KEY) {
				preBtnStatus = false;
			} else {
				preBtnStatus = true;
			}

			setCCBSPagBtn(dom, preBtnStatus, nextBtnStatus);
		}
	};
	// 用于处理P6数据加载   P6  

	function p6LoadHandler(opts, data, dom) {
		if (opts.isCCBS) {
			var preBtnStatus = false;
			var nextBtnStatus = false;

			var CONV_NO_DATA = getCCBSValueByKey(data, "CONV_NO_DATA", opts);
			var PAGE_STA_KEY = getCCBSValueByKey(data, "PAGE_STA_KEY", opts);
			var FLOW_STATUS = getCCBSValueByKey(data, "FLOW_STATUS", opts);
			if (!opts.firstSTA_KEY) {
				opts.firstSTA_KEY = PAGE_STA_KEY;
			}
			if (PAGE_STA_KEY == opts.firstSTA_KEY) {
				opts.PRE_PAGE_STA_KEY = PAGE_STA_KEY;
			}
			if (CONV_NO_DATA == "Y" || FLOW_STATUS == "00000000") {
				nextBtnStatus = false;
			} else {
				nextBtnStatus = true;
			}
			if (PAGE_STA_KEY == opts.firstSTA_KEY) {
				preBtnStatus = false;
			} else {
				preBtnStatus = true;
			}

			setCCBSPagBtn(dom, preBtnStatus, nextBtnStatus);
		}
	};

	// 用于处理P6_2 数据加载 ---- 对应交易文档《主机技术框架与应用平台联机流程交互模式》----- 4.2	一般交谈式交易模式2
	function p6_2LoadHandler(opts, data, dom) {

		return true;
	};

	// 用于在加载数据时处理 NCIMP 交易
	function ncimpLoadHandler (opts, data, dom) {
		if (!opts.isCCBS) {
			return;
		}
		var preBtnStatus = false;
		var nextBtnStatus = false;

		var CONV_NO_DATA = getCCBSValueByKey(data, "CONV_NO_DATA", opts);
		var pageNumber  = $(dom).datagrid("getPageInfo").pageNumber;
		
		// 如果当前返回的记录为0的话 一样禁用掉下一页按钮
		if (CONV_NO_DATA == "Y") {
			nextBtnStatus = false;
		} else {
			nextBtnStatus = true;
		}
		// 当前页面为1 则禁用上一页按钮
		if (pageNumber==1) {
			preBtnStatus = false;
		} else {
			preBtnStatus = true;
		}

		setCCBSPagBtn(dom, preBtnStatus, nextBtnStatus);
	};
	// 用于在加载数据时处理 CCBSS

	function ccbssLoadHandler(opts, data, dom) {
		if (opts.isCCBS) {
			var preBtnStatus = false;
			var nextBtnStatus = false;

			var RETURN_LINE_COUNT = getCCBSValueByKey(data, "RETURN_LINE_COUNT", opts, true, 0);
			// 处理可能第一次数据加载不是由grid自己加载的情况
			opts.currentPageNumber = opts.currentPageNumber || 1;
			if (opts.currentPageNumber > 1) {
				preBtnStatus = true;
			}
			// CCBSS pageSize固定为10 ，当记录等于十时 表示还有下一页
			if (RETURN_LINE_COUNT == 10) {
				nextBtnStatus = true;
			}
			setCCBSPagBtn(dom, preBtnStatus, nextBtnStatus);
		}
	};
	// 用于在加载数据时处理 ECIFP

	function ecifpLoadHandler(opts, data, dom) {

		if (opts.isCCBS) {
			var preBtnStatus = false;
			var nextBtnStatus = false;

			var OPM_FIRST_NO = getCCBSValueByKey(data, "OPM_FIRST_NO", opts, true, 1);
			var OPM_LAST_FLAG = getCCBSValueByKey(data, "OPM_LAST_FLAG", opts);
			if (OPM_FIRST_NO > 1) {
				preBtnStatus = true;
			}
			if (OPM_LAST_FLAG == "0") {
				nextBtnStatus = true;
			}
			setCCBSPagBtn(dom, preBtnStatus, nextBtnStatus);
		}
	};
	// 用于在加载数据时处理 FESP

	function fespLoadHandler(opts, data, dom) {
		/**
		 *  0_无向前查询数据，有向后查询数据
			1_有向前查询数据，有向后查询数据
			2_有向前查询数据，无向后查询数据
			3_无向前查询数据，无向后查询数据
		 */
		if (opts.isCCBS) {
			var preBtnStatus = false;
			var nextBtnStatus = false;

			var FLAG = getCCBSValueByKey(data, "FLAG", opts,true);
			switch (FLAG) {
				case 0:
					preBtnStatus = false;
					nextBtnStatus = true;
					break;
				case 1:
					preBtnStatus = true;
					nextBtnStatus = true;
					break;
				case 2:
					preBtnStatus = true;
					nextBtnStatus = false;
					break;
				case 3:
					preBtnStatus = false;
					nextBtnStatus = false;
					break;
				default:
					alert("Error: 未知的数据标志  FLAG = " + FLAG);
			}
			setCCBSPagBtn(dom, preBtnStatus, nextBtnStatus);
		}
	};

	// CREDITCARD 信用卡 该类型数据加载支持
	function creditcardLoadHandler (opts, data, dom) {
		// 默认情况下 只启用下一页按钮
		setCCBSPagBtn(dom, false, true);
	};
	/**
	 * 数据加载后的处理 支持 CCBS CCBSS ECIFP FESP 四种模式
	 * @param  {[type]} opts [description]
	 * @param  {[type]} data [description]
	 * @param  {[type]} dom  [description]
	 * @return {[type]}      true 完成处理
	 *                       false 处理失败
	 */

	function dataLoadedHandler(opts, data, dom) {
		if (!opts.isCCBS) {
			if (opts.reqType) {
				switch (opts.reqType) {
					case "P6_2":
					var flag =  p6_2LoadHandler(opts, data, dom);
					opts.reqResult = false;
					return flag;
					break;
				}
			}
			return true;
		}
		var flag = true;
		switch (opts.reqType) {
			case "CREDITCARD":
				flag = creditcardLoadHandler(opts, data, dom);
				// flag = true;
				break;
			case "P6":
				flag = p6LoadHandler(opts, data, dom);
				break;
			case "CCBS":
				flag = ccbsLoadHandler(opts, data, dom);
				break;
			case "CCBSS":
				flag = ccbssLoadHandler(opts, data, dom);
				break;
			case "ECIFP":
				flag = ecifpLoadHandler(opts, data, dom);
				break;
			case "FESP":
				flag = fespLoadHandler(opts, data, dom);
				break;
            case "FESP_2":
                flag = fespLoadHandler(opts, data, dom);
                break;
			case "NCIMP":
				flag = ncimpLoadHandler(opts,data,dom);
				break;
			default:
				alert("Error: dataLoadHandler 不支持reqType为 " + opts.reqType + " 的请求！");
				flag = false;
		}
		/*请求处理失败 禁用所有按钮*/
		if (!opts.reqResult) {
			setCCBSPagBtn(dom, false, false);
		}
		opts.reqResult = false;
		return flag;
	}
	// ----------------------CCBS-------------------------	

	function addOpInfo(allParam) {
		return PJF.communication.setEcpJsonParam(allParam._fw_service_id, allParam.transaction_id, allParam.jsonData,allParam.adapterId, null, allParam._sql_id, allParam.fmtPrintId);
	};
	// 添加排序信息

	function addSortInfo(allParam, opts) {
		if (opts.sortName && opts.remoteSort) {
			var sortInfo = {};
			sortInfo[opts.remoteSortNameKey] = opts.sortName || "";
			sortInfo[opts.remoteSortOrderKey] = opts.sortOrder || "asc";
			if (!allParam.jsonData) {
				allParam.jsonData = {};
			}
			if (PJF.util.getType(allParam.jsonData) == 'string') {
				allParam.jsonData = eval("(" + allParam.jsonData + ")");
			}
			$.extend(allParam.jsonData, sortInfo);
		}
	};

	/*组合请求参数*/

	function combineReqParams(_53a, opInfo) {

		if (opInfo.jsonData && typeof(opInfo.jsonData) == "string") {
			try {
				opInfo.jsonData = eval('(' + opInfo.jsonData + ')');
			} catch (e) {
				alert("Error: eval opInfo.jsonData 字符串为对象时报错");
			}
		}
		if (_53a.jsonData && typeof(_53a.jsonData) == "string") {
			try {
				_53a.jsonData = eval('(' + _53a.jsonData + ')');
			} catch (e) {
				alert("Error: eval _53a.jsonData 字符串为对象时报错");
			}
		}

		/*合并JSON对象*/
		combineJson(_53a, opInfo);

		if (_53a.jsonData) {
			try {
				_53a.jsonData = PJF.util.json2str(_53a.jsonData);
			} catch (e) {
				alert("Error: eval jsonData 失败");
			}
		}
		/*组合JSON对象*/

		function combineJson(desc, src) {
			for (var x in src) {
				if (src[x] instanceof Array) {
					desc[x] = src[x];
				} else if (typeof(src[x]) == 'object') {
					if (!desc[x]) {
						desc[x] = {};
					}
					combineJson(desc[x], src[x]);
				} else {
					desc[x] = src[x];
				}
			}
		};
	};

	function _537(_538, _539) {
		var opts = $.data(_538, "datagrid").options;
		if (_539) {
			opts.queryParams = _539;
		}
		if (opts.queryParams) {
			if (opts.queryParams.jsonData) {
				//增加向后台传参数 YH 2013.1.31
				// var jsonDataEx = eval("(" + opts.queryParams.jsonData + ")");
				// ------------------- 处理jsonData为对象情况
				var jsonDataEx = null;
				if (PJF.util.getType(opts.queryParams.jsonData) == 'string') {
					jsonDataEx = eval("(" + opts.queryParams.jsonData + ")");
				} else {
					jsonDataEx = opts.queryParams.jsonData;
				}
				// -===================
				var REC_IN_PAGE_Key = opts.pageSizeParamName || "REC_IN_PAGE";
				var PAGE_JUMP_key = opts.pageNumberParamName || "PAGE_JUMP";
				var bindParams = {};
				bindParams[REC_IN_PAGE_Key] = opts.pageSize;
				bindParams[PAGE_JUMP_key] = opts.pageNumber;

				jsonDataEx["_pagination"] = bindParams;

				// start
				// CCBS 模式以及另外三种模式
				if (setReqParameter(_538, opts, jsonDataEx) == false) {
					return;
				}
				// end

				opts.queryParams.jsonData = PJF.util.json2str(jsonDataEx);
			}
		}
		var _53a = $.extend({}, opts.queryParams);


		// 同步pageSize 以适配用户动态修改pageSize 2013/06/05
		if (opts.pagination) {
			$(_538).datagrid("getPageInfo").pageSize = opts.pageSize;
		}

		//---- 添加可能的排序信息---- 
		addSortInfo(_53a, opts);
		//-----添加可能的排序信息====

		//---- 添加操作员信息----  2013/05/17 famingyuan
		// $.extend(_53a,opInfo);
		// var opInfo = addOpInfo(_53a);
		/*组合请求参数*/
		// combineReqParams(_53a, opInfo);

		if (opts.onBeforeLoad.call(_538, _53a) == false) {
			return;
		}

		var tmpResult = addOpInfo(_53a);
		if(_53a.jsonClass){
			tmpResult.jsonClass=_53a.jsonClass;
		}
		_53a = tmpResult; 
		if (!opts.url&&!opts.isLocalPagination) { //如果URL是空 不发送请求 YH 2013.2.26
			return;
		}

		// 添加一个参数过滤器 2015-06-02 用于添加自定义参数
		if(opts.reqParamsFilter){
			opts.reqParamsFilter.call(_538,_53a);
		}
		// for CCBS
		// 直到发了一次请求之后 才是false
		opts.isFirstCCBSReq = false;
		// $(_538).datagrid("clearSelections");
		$(_538).datagrid("loading");

		//===================添加前端分页适配 2014/06/16
		if(opts.isLocalPagination){
			// 在本地进行分页时 不再发送请求 所以直接忽略掉url参数
			var orginalData = $(_538).datagrid("getData");
			if(!orginalData.orginalRows){
				$(_538).datagrid("loaded");
				return;
			}
			var currentPageNumber = $(_538).datagrid("getPageInfo").pageNumber;
			orginalData.rows=orginalData.orginalRows.slice((currentPageNumber-1)*opts.pageSize,opts.pageSize*currentPageNumber);
			$(_538).datagrid("loadData",orginalData);
			return;
		}
		//======================
		setTimeout(function() {
			try {
				_53b();
			} catch (e) {
				printLog("Error: --> " + e.message);
			}
		}, 0);

		function _53b() {
			var _53c = opts.loader.call(_538, _53a, function(data) {
				// 注释掉此行代码 放在_4b1中执行 以提升显示效果
				// setTimeout(function() {
				// 	$(_538).datagrid("loaded");
				// }, 0);
				try {
					_4b1(_538, data);
				} catch (e) {
					printLog("Error: --> " + e.message);
				}
				setTimeout(function() {
					try {
						_52b(_538);
						opts.isRequesting = false;
					} catch (e) {
						printLog("Error: --> " + e.message);
						opts.isRequesting = false;
					}
				}, 0);
			}, function() {
				setTimeout(function() {
					try {
						$(_538).datagrid("loaded");
					} catch (e) {
						printLog("Error: --> " + e.message);
					}
				}, 0);

				try {
					opts.onLoadError.apply(_538, arguments);
					opts.isRequesting = false;
				} catch (e) {
					printLog("Error: --> " + e.message);
					opts.isRequesting = false;
				}
			});
			try {
				if (_53c == false) {
					$(_538).datagrid("loaded");
				}
			} catch (e) {
				printLog("Error: --> " + e.message);
			}

		};
	};

	// 合并动作 
	// 1. 变更内部值
	// 2. 隐藏指定的div
	function _53d(_53e, _53f) {
		//如果没有参数不执行合并动作 YH 2013.1.8
		if (!_53f) {
			return;
		}
		var opts = $.data(_53e, "datagrid").options;
		var rows = $.data(_53e, "datagrid").data.rows;
		_53f.rowspan = _53f.rowspan || 1;
		_53f.colspan = _53f.colspan || 1;
		if (_53f.index < 0 || _53f.index >= rows.length) {
			return;
		}
		if (_53f.rowspan == 1 && _53f.colspan == 1) {
			return;
		}
		// 合并的起始单元格
		// 把合并的主单元格保存下来
		if(!opts.mergedBaseCols){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
			opts.mergedBaseCols={};
		}
		if(!opts.mergedRowIndexs){
			opts.mergedRowIndexs = {};
		}
		
		var targetCol = $(_53e).datagrid("getColumnOption",_53f.field);
		if(!targetCol.mergeOpts){
			targetCol.mergeOpts = {};
		}
		targetCol.mergeOpts[""+_53f.index]=_53f;// 保存合并时使用的参数 同一列可能存在多个配置参数
		targetCol.widthBeforeMerged = targetCol.boxWidth || targetCol.userInitWidth ;
		opts.mergedBaseCols[_53f.field]=targetCol; // 保存被合并的主列
		opts.mergedRowIndexs[_53f.index]=_53f; // 保存变更的行

		var _540 = rows[_53f.index][_53f.field];
		var tr = opts.finder.getTr(_53e, _53f.index);
		var td = tr.find("td[field=\"" + _53f.field + "\"]");
		td.attr("rowspan", _53f.rowspan).attr("colspan", _53f.colspan);
		td.addClass("datagrid-td-merged");
		// 保存被隐藏的列field
		var fieldsHiddArray=[];
		for (var i = 1; i < _53f.colspan; i++) {
			td = td.next();
			td.hide();
			fieldsHiddArray.push(td.attr("field"));
			// 值都给改了....
			rows[_53f.index][td.attr("field")] = _540;
		}
		for (var i = 1; i < _53f.rowspan; i++) {
			tr = tr.next();
			var td = tr.find("td[field=\"" + _53f.field + "\"]").hide();
			rows[_53f.index + i][td.attr("field")] = _540;
			for (var j = 1; j < _53f.colspan; j++) {
				td = td.next();
				td.hide();
				rows[_53f.index + i][td.attr("field")] = _540;
			}
		}

		// 遍历列 设置合并隐藏属性
		// 合并获取所有的col
		var allCols = [];
		if(!opts.allCols){
			allCols = Array.prototype.concat.apply(allCols,opts.columns); // 二维数组 抹平
			allCols = Array.prototype.concat.apply(allCols,opts.frozenColumns);
			opts.allCols = allCols;
		}else{
			allCols = opts.allCols;
		}

		// 把所有附加合并的单元格给保存下来
		var mergedCols = opts.mergedCols = opts.mergedCols || {}; // 被merge的列
		var subColsWidth = 0;
		// 给所有被合并的单元格设置上标志 因为被合并的单元格应该隐藏，主单元格需要暂用它所在的位置 通过(rowspan\colspan)
		for(var m=0,n=fieldsHiddArray.length;m<n;m++){
			for(var i=0,len=allCols.length;i<len;i++){
				if(fieldsHiddArray[m]==allCols[i].field){
					allCols[i].hideForMerge = true; // 被合并了
					// 保存在merged前的宽度
					allCols[i].widthBeforeMerged =allCols[i].boxWidth || allCols[i].userInitWidth;
					subColsWidth+=allCols[i].widthBeforeMerged + 8;
					// allCols[i].userInitWidth = allCols[i].boxWidth;
					mergedCols[allCols[i].field]  = allCols[i];
					break;
				}
			}
		}	 
		targetCol.widthWithSubCols =targetCol.widthBeforeMerged + subColsWidth + 8;

		// 此处使用新加的一个flag 防止未大规模测试 可能造成未知、未测试到的新bug
		if(!opts.verColumn&&_53f.resizeMergedCell){
			//_49c(_53e);
		}
		/*if(!opts.verColumn){ //如果不是竖排标题表格才在合并的时候计算宽度 YH 2013.1.11
       _49c(_53e)
   };*/
	};

	/*生成无数据提示信息*/

	function generateMsg(opts, isInitInfo) {
		/*初始状态信息*/
		if (isInitInfo) {
			return '<span class="pjf_grid_nodataMsg">' + (opts.initInfo ? opts.initInfo : PJF.constants.GRID_INIT_INFO) + '</span>';
		}
		if (opts.noDataMsg) {
			return '<span class="pjf_grid_nodataMsg">' + opts.noDataMsg + '</span>';
		}
		return '<div style="width:300px;">' + '<span class="pjf_grid_nodataMsgImg"></span>' + '<span class="pjf_grid_nodataMsg">' + PJF.constants.GRID_NODATA_INFO + '</span></div>';
	};
	// 为函数添加一个参数
	$.fn.datagrid = function(_541, _542, addParam) {
		if (typeof _541 == "string") {
			return $.fn.datagrid.methods[_541](this, _542, addParam);
		}
		_541 = _541 || {};
		return this.each(function() {
			var _543 = $.data(this, "datagrid");
			var opts;
			if (_543) {
				opts = $.extend(_543.options, _541);
				_543.options = opts;
			} else {
				opts = $.extend({}, $.extend({}, $.fn.datagrid.defaults, {
					queryParams: {}
				}), $.fn.datagrid.parseOptions(this), {
					type_flag: 'datagrid'
				}, _541);
				$(this).css("width", "").css("height", "");
				var _544 = _452(this, opts.rownumbers,opts);
				if (!opts.columns) {
					opts.columns = _544.columns;
				}
				if (!opts.frozenColumns) {
					opts.frozenColumns = _544.frozenColumns;
				}
				opts.columns = $.extend(true, [], opts.columns);
				opts.frozenColumns = $.extend(true, [], opts.frozenColumns);
				$.data(this, "datagrid", {
					options: opts,
					panel: _544.panel,
					dc: _544.dc,
					selectedRows: [],
					data: {
						total: 0,
						rows: []
					},
					originalRows: [],
					updatedRows: [],
					insertedRows: [],
					deletedRows: []
				});
			}
			_461(this);
			/*为表头添加一个空白占位符号*/
			addEmptyTDToHeader2(this);
			if (!_543) {
				var data = _45d(this);
				if (data.total > 0) {
					_4b1(this, data);
					_52b(this);
				}
			}
			_438(this);

			// 初始状态下 需要禁用CCBS等模式的按钮  2013/06/18
			setCCBSPagBtn(this, false, false);

			_537(this);
			_471(this);

			//初始生成的时候提示信息 YH 2012.11.22
			// if(data && data.rows.length == 0 && !(opts.url)){
			if (!data || (data && data.rows && data.rows.length == 0) || (data && !data.rows)) {
				var br = $('#' + this.id).prev();
				var view2body = $(".datagrid-body", br);
				var str0 = "<TABLE style='TABLE-LAYOUT: auto' width=100% class=datagrid-btable border=0 cellSpacing=0 cellPadding=0><TBODY><TR style='HEIGHT:1px' >";
				var str1 = "";
				var str3 = "";
				if (opts.columns != 0) {
					for (var i = 0; i < opts.columns[0].length; i++) {
						// 取消
						// if(!opts.columns[0][i].title){
						//      str3 = "<TD style=\"BORDER: medium none\" ><font color=#f0f5fa></font></TD>"

						// }else{
						//      var str_text = ""
						//      for(var k=0;k<opts.columns[0][i].title.length;k++){
						//          str_text = str_text + "---";
						//      }
						//      str3 = "<TD style=\"BORDER: medium none\" ><font color=#f0f5fa>"+str_text+"</font></TD>";
						// }
						// str1 = str1 + str3;
					}
				}
				var tempMsg = generateMsg(opts, true);
				var str2 = "</TR></TBODY></TABLE>" + "<TABLE id=tab_listdiv_listContent class=div_tableList border=0 cellSpacing=0 cellPadding=0 width=100% height=80%>" + "<TBODY><TR><TD colSpan=99 align=middle>" + tempMsg + "</TD></TR></TBODY></TABLE>";
				$(view2body[0]).html(str0 + str1 + str2);
			}


		});
	};
	var _545 = {
		text: {
			init: function(_546, _547) {
				var _548 = $("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(_546);
				return _548;
			},
			getValue: function(_549) {
				return $(_549).val();
			},
			setValue: function(_54a, _54b) {
				$(_54a).val(_54b);
			},
			resize: function(_54c, _54d) {
				$(_54c)._outerWidth(_54d);
			}
		},
		textarea: {
			init: function(_54e, _54f) {
				var _550 = $("<textarea class=\"datagrid-editable-input\"></textarea>").appendTo(_54e);
				return _550;
			},
			getValue: function(_551) {
				return $(_551).val();
			},
			setValue: function(_552, _553) {
				$(_552).val(_553);
			},
			resize: function(_554, _555) {
				$(_554)._outerWidth(_555);
			}
		},
		checkbox: {
			init: function(_556, _557) {
				var _558 = $("<input type=\"checkbox\">").appendTo(_556);
				_558.val(_557.on);
				_558.attr("offval", _557.off);
				return _558;
			},
			getValue: function(_559) {
				if ($(_559).is(":checked")) {
					return $(_559).val();
				} else {
					return $(_559).attr("offval");
				}
			},
			setValue: function(_55a, _55b) {
				var _55c = false;
				if ($(_55a).val() == _55b) {
					_55c = true;
				}
				$(_55a)._propAttr("checked", _55c);
			}
		},
		numberbox: {
			init: function(_55d, _55e) {
				var _55f = $("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(_55d);
				_55f.numberbox(_55e);
				return _55f;
			},
			destroy: function(_560) {
				$(_560).numberbox("destroy");
			},
			getValue: function(_561) {
				return $(_561).numberbox("getValue");
			},
			setValue: function(_562, _563) {
				$(_562).numberbox("setValue", _563);
			},
			resize: function(_564, _565) {
				$(_564)._outerWidth(_565);
			}
		},
		validatebox: {
			init: function(_566, _567) {
				var _568 = $("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(_566);
				_568.validatebox(_567);
				return _568;
			},
			destroy: function(_569) {
				$(_569).validatebox("destroy");
			},
			getValue: function(_56a) {
				return $(_56a).val();
			},
			setValue: function(_56b, _56c) {
				$(_56b).val(_56c);
			},
			resize: function(_56d, _56e) {
				$(_56d)._outerWidth(_56e);
			}
		},
		datebox: {
			init: function(_56f, _570) {
				var _571 = $("<input type=\"text\">").appendTo(_56f);
				_571.datebox(_570);
				return _571;
			},
			destroy: function(_572) {
				$(_572).datebox("destroy");
			},
			getValue: function(_573) {
				return $(_573).datebox("getValue");
			},
			setValue: function(_574, _575) {
				$(_574).datebox("setValue", _575);
			},
			resize: function(_576, _577) {
				$(_576).datebox("resize", _577);
			}
		},
		combobox: {
			init: function(_578, _579) {
				var _57a = $("<input type=\"text\">").appendTo(_578);
				_57a.combobox(_579 || {});
				return _57a;
			},
			destroy: function(_57b) {
				$(_57b).combobox("destroy");
			},
			getValue: function(_57c) {
				return $(_57c).combobox("getValue");
			},
			setValue: function(_57d, _57e) {
				$(_57d).combobox("setValue", _57e);
			},
			resize: function(_57f, _580) {
				$(_57f).combobox("resize", _580);
			}
		},
		combotree: {
			init: function(_581, _582) {
				var _583 = $("<input type=\"text\">").appendTo(_581);
				_583.combotree(_582);
				return _583;
			},
			destroy: function(_584) {
				$(_584).combotree("destroy");
			},
			getValue: function(_585) {
				return $(_585).combotree("getValue");
			},
			setValue: function(_586, _587) {
				$(_586).combotree("setValue", _587);
			},
			resize: function(_588, _589) {
				$(_588).combotree("resize", _589);
			}
		}
	};
	$.fn.datagrid.methods = {
		// 用于重新调整合并后的单元格宽度
		resizeMergeCell:function  (jq) {
			_49c(jq[0]);
		},
		// 用于前端调用 实现前端设置高度
		doFixGridHeight: function(jq) {
			// body... 
			fixGridHeight(jq[0]);
		},
		// add  用于在无数据情况下，重置表头宽度（而不是自动拓展后的宽度）
		doResetTableHead: function(jq) {
			_483(jq[0], "reset");
		},
		// add  用于在修改数据后，重置宽度（而不是自动拓展后的宽度）
		doResetColumnWidth: function(jq) {
			_48f(jq[0], false, "resetColWidth");
		},
		// 用于在前端CCBS等模式重置按钮
		doSetCCBSPagBtn: function(jq, flag1, flag2) {
			setCCBSPagBtn(jq[0], flag1, flag2);
		},
		options: function(jq) {
			var _58a = $.data(jq[0], "datagrid").options;
			var _58b = $.data(jq[0], "datagrid").panel.panel("options");
			var opts = $.extend(_58a, {
				width: _58b.width,
				height: _58b.height,
				closed: _58b.closed,
				collapsed: _58b.collapsed,
				minimized: _58b.minimized,
				maximized: _58b.maximized
			});
			return opts;
		},
		// 添加一个接口 用于获取grid对象 ， add by famingyuan,2013/04/10
		getGridDom: function(jq) {
			return $.data(jq[0], "datagrid");
		},
		getPanel: function(jq) {
			return $.data(jq[0], "datagrid").panel;
		},
		getPager: function(jq) {
			return $.data(jq[0], "datagrid").panel.children("div.datagrid-pager");
		},
		getColumnFields: function(jq, _58c) {
			return _460(jq[0], _58c);
		},
		getColumnOption: function(jq, _58d) {
			return _470(jq[0], _58d);
		},
		resize: function(jq, _58e) {
			return jq.each(function() {
				this.doResize = true; // famingyuan, fix F12
				_438(this, _58e);
			});
		},
		load: function(jq, _58f) {
			return jq.each(function() {
				var opts = $(this).datagrid("options");
				opts.pageNumber = 1;
				var _590 = $(this).datagrid("getPager");
				_590.pagination({
					pageNumber: 1
				});
				_537(this, _58f);
			});
		},
		reload: function(jq, _591) {
			return jq.each(function() {
				_537(this, _591);
			});
		},
		reloadFooter: function(jq, _592) {
			return jq.each(function() {
				var opts = $.data(this, "datagrid").options;
				var dc = $.data(this, "datagrid").dc;
				if (_592) {
					$.data(this, "datagrid").footer = _592;
				}
				if (opts.showFooter) {
					opts.view.renderFooter.call(opts.view, this, dc.footer2, false);
					opts.view.renderFooter.call(opts.view, this, dc.footer1, true);
					if (opts.view.onAfterRender) {
						opts.view.onAfterRender.call(opts.view, this);
					}
					$(this).datagrid("fixRowHeight");
				}
			});
		},
		loading: function(jq) {
			return jq.each(function() {
				var opts = $.data(this, "datagrid").options;
				$(this).datagrid("getPager").pagination("loading");
				if (opts.loadMsg) {
					var _593 = $(this).datagrid("getPanel");
					$("<div class=\"datagrid-mask\" style=\"display:block\"></div>").appendTo(_593);
					var msg = $("<div class=\"datagrid-mask-msg\" style=\"display:block\"></div>").html(opts.loadMsg).appendTo(_593);
					msg.css("left", (_593.width() - msg._outerWidth()) / 2);
				}
			});
		},
		loaded: function(jq) {
			return jq.each(function() {
				$(this).datagrid("getPager").pagination("loaded");
				var _594 = $(this).datagrid("getPanel");
				_594.children("div.datagrid-mask-msg").remove();
				_594.children("div.datagrid-mask").remove();
			});
		},
		fitColumns: function(jq) {
			return jq.each(function() {
				_483(this);
			});
		},
		// 添加一个参数 flag 用于控制是否跳过后续多余的高度调整
		fixColumnSize: function(jq, _595, flag) {
			return jq.each(function() {
				_45a(this, _595, flag);
			});
		},
		fixRowHeight: function(jq, _596) {
			return jq.each(function() {
				_448(this, _596);
			});
		},
		autoSizeColumn: function(jq, _597) {
			return jq.each(function() {
				_48f(this, _597);
			});
		},
		loadData: function(jq, data) {
			return jq.each(function() {
				_4b1(this, data);
				_52b(this);
			});
		},
		getData: function(jq) {
			return $.data(jq[0], "datagrid").data;
		},
		getRows: function(jq) {
			return $.data(jq[0], "datagrid").data.rows;
		},
		getFooterRows: function(jq) {
			return $.data(jq[0], "datagrid").footer;
		},
		getRowIndex: function(jq, id) {
			return _4b9(jq[0], id);
		},
		getChecked: function(jq) {
			var rr = [];
			var rows = jq.datagrid("getRows");
			var dc = $.data(jq[0], "datagrid").dc;
			dc.view.find("div.datagrid-cell-check input:checked").each(function() {
				var _598 = $(this).parents("tr.datagrid-row:first").attr("datagrid-row-index");
				rr.push(rows[_598]);
			});
			return rr;
		},
		getSelected: function(jq) {
			var rows = _4bb(jq[0]);
			return rows.length > 0 ? rows[0] : null;
		},
		getSelections: function(jq) {
			return _4bb(jq[0]);
		},
		clearSelections: function(jq) {
			return jq.each(function() {
				var _599 = $.data(this, "datagrid").selectedRows;
				_599.splice(0, _599.length);
				_4c8(this);
			});
		},
		selectAll: function(jq) {
			return jq.each(function() {
				_4d3(this);
			});
		},
		unselectAll: function(jq) {
			return jq.each(function() {
				_4c8(this);
			});
		},
		selectRow: function(jq, _59a) {
			return jq.each(function() {
				_4c2(this, _59a);
			});
		},
        selectMassRows:function(jq,indexArr){
            return jq.each(function() {
                _4bx(this, indexArr);
            });
        },
        unSelectMassRows:function(jq,indexArr){
            return jq.each(function() {
                _4by(this, indexArr);
            });
        },
		selectRecord: function(jq, id) {
			return jq.each(function() {
				_4be(this, id);
			});
		},
		unselectRow: function(jq, _59b) {
			return jq.each(function() {
				_4cc(this, _59b);
			});
		},
		checkRow: function(jq, _59c) {
			return jq.each(function() {
				_4c9(this, _59c);
			});
		},
		uncheckRow: function(jq, _59d) {
			return jq.each(function() {
				_4d2(this, _59d);
			});
		},
		checkAll: function(jq) {
			return jq.each(function() {
				_4d8(this);
			});
		},
		uncheckAll: function(jq) {
			return jq.each(function() {
				_4de(this);
			});
		},
		beginEdit: function(jq, _59e) {
			return jq.each(function() {
				//增加编辑精确到列 YH 2012.12.27
				_4f2(this, _59e.rowIndex, _59e.colIndex);
			});
		},
		endEdit: function(jq, _59f) {
			return jq.each(function() {
				_4f8(this, _59f, false);
			});
		},
		cancelEdit: function(jq, _5a0) {
			return jq.each(function() {
				_4f8(this, _5a0, true);
			});
		},
		getEditors: function(jq, _5a1) {
			return _503(jq[0], _5a1);
		},
		getEditor: function(jq, _5a2) {
			return _507(jq[0], _5a2);
		},
		refreshRow: function(jq, _5a3) {
			return jq.each(function() {
				var opts = $.data(this, "datagrid").options;
				opts.view.refreshRow.call(opts.view, this, _5a3);
			});
		},
		validateRow: function(jq, _5a4) {
			return _4f7(jq[0], _5a4);
		},
		updateRow: function(jq, _5a5) {
			return jq.each(function() {
				var opts = $.data(this, "datagrid").options;
				opts.view.updateRow.call(opts.view, this, _5a5.index, _5a5.row);
			});
		},
		appendRow: function(jq, row) {
			return jq.each(function() {
				_528(this, row);
			});
		},
		insertRow: function(jq, _5a6) {
			return jq.each(function() {
				_524(this, _5a6);
			});
		},
		insertRows:function  (jq,rowsJson) {
			return jq.each(function  () {
				insertRows(this,rowsJson);
			});
		},
		deleteRow: function(jq, _5a7) {
			return jq.each(function() {
				_51e(this, _5a7);
			});
		},
		getChanges: function(jq, _5a8) {
			return _518(jq[0], _5a8);
		},
		acceptChanges: function(jq, editInfo) {
			return jq.each(function() {
				_52e(this, editInfo);
			});
		},
		rejectChanges: function(jq) {
			return jq.each(function() {
				_530(this);
			});
		},
		mergeCells: function(jq, _5a9) {
			return jq.each(function() {
				_53d(this, _5a9);
			});
		},
		showColumn: function(jq, _5aa) {
			return jq.each(function() {
				var _5ab = $(this).datagrid("getPanel");
				_5ab.find("td[field=\"" + _5aa + "\"]").show();
				$(this).datagrid("getColumnOption", _5aa).hidden = false;
				$(this).datagrid("getColumnOption", _5aa).doFix = true;
				$(this).datagrid("fitColumns");
			});
		},
		hideColumn: function(jq, _5ac) {
			return jq.each(function() {
				var _5ad = $(this).datagrid("getPanel");
				_5ad.find("td[field=\"" + _5ac + "\"]").hide();
				$(this).datagrid("getColumnOption", _5ac).hidden = true;
				$(this).datagrid("getColumnOption", _5ac).doFix = true;
				$(this).datagrid("fitColumns");
			});
		},
		//对datagrid封装上一页方法 YH 2012.11.27
		getPrevPage: function(jq) {
			return jq.each(function() {
				$(this).datagrid("getPager").pagination("prevPage");
			});
		},
		//对datagrid封装下一页方法 YH 2012.11.27
		getNextPage: function(jq) {
			return jq.each(function() {
				$(this).datagrid("getPager").pagination("nextPage");
			});
		},
		//对datagrid封装首页的方法 YH 2012.11.26
		getFirstPage: function(jq) {
			return jq.each(function() {
				$(this).datagrid("getPager").pagination("firstPage");
			});
		},
		//对datagrid封装跳转页的方法 YH 2012.11.26
		getSelectPage: function(jq, pageNumber) {
			return jq.each(function() {
				if (pageNumber > 0) {
					$(this).datagrid("getPager").pagination("selectPage", pageNumber, true);
				}
			});
		},
		//得到分页信息   YH 2012.11.27
		getPageInfo: function(jq) {
			var _opts;
			jq.each(function() {
				var pager = $(this).datagrid("getPager");
				_opts = pager.pagination("getPageInfo");
			});
			return _opts;
		},
		//设置折叠表格   YH 2012.11.27
		setCollapse: function(jq) {
			jq.each(function() {
				$(this).datagrid("getPanel").panel("collapse", true);
			});
		},
		//设置扩展表格   YH 2012.11.27
		setExpand: function(jq) {
			jq.each(function() {
				$(this).datagrid("getPanel").panel("expand", true);
			});
		},
		//对datagrid封装尾页的方法 YH 2012.11.26
		getLastPage: function(jq) {
			return jq.each(function() {
				$(this).datagrid("getPager").pagination("lastPage");
			});
		}
	};
	$.fn.datagrid.parseOptions = function(_5ae) {
		var t = $(_5ae);
		return $.extend({}, $.fn.panel.parseOptions(_5ae), $.parser.parseOptions(_5ae, ["url", "toolbar", "idField", "sortName", "sortOrder", "pagePosition", {
			fitColumns: "boolean",
			autoRowHeight: "boolean",
			striped: "boolean",
			nowrap: "boolean"
		}, {
			rownumbers: "boolean",
			singleSelect: "boolean",
			checkOnSelect: "boolean",
			selectOnCheck: "boolean"
		}, {
			pagination: "boolean",
			pageSize: "number",
			pageNumber: "number"
		}, {
			remoteSort: "boolean",
			showHeader: "boolean",
			showFooter: "boolean"
		}, {
			scrollbarSize: "number"
		}]), {
			pageList: (t.attr("pageList") ? eval(t.attr("pageList")) : undefined),
			loadMsg: (t.attr("loadMsg") != undefined ? t.attr("loadMsg") : undefined),
			rowStyler: (t.attr("rowStyler") ? eval(t.attr("rowStyler")) : undefined)
		});
	};
	var renderCount = 0; //渲染次数 YH 2013.1.16
	var _5af = {
		render: function(_5b0, _5b1, _5b2) {
			var _5b3 = $.data(_5b0, "datagrid");
			var opts = _5b3.options;
			if (!_5b3.data.rows && !_5b3.data.total) {
				_5b3.data = formatGridData(opts, _5b3.data); //转换 2013.1.31
			}
			var rows = _5b3.data.rows;
			var dc = _5b3.dc;
			//判断数据格式是否正确  YH 2012.11.20
			if (!rows) {
				// alert("远程数据格式错误，请检查数据格式！");
				if (typeof(console) != "undefined") {
					console.log("Error: 远程数据格式错误，请检查数据格式！");
				}
				return;
			}
			/***********竖排标题生成数据start****YH 2013.1.8*****/
			if (opts.verColumn) {
				if (renderCount == 0) { //第一次渲染表格的时候把rows赋给隐藏框保存 YH 2013.1.16
					var int_verticalGrid_rows = dc.view.find("input[id=int_verticalGrid_rows]");
					int_verticalGrid_rows[0].value = PJF.util.json2str(rows);
					renderCount = renderCount + 1;
				}
				// if(opts.verColumnData.length<rows.length){
				//    alert("提示：数据超出竖排标题最大值！");
				//    return;
				// }
				for (var i = 0; i < opts.verColumnData.length; i++) {
					var objVercol = opts.verColumnData[i];
					if (!rows[i]) {
						rows[i] = {};
					}
					for (var j = 0; j < opts.verColumnLevel; j++) {
						var tempCol = "vercol_" + j;
						var field = "field";
						rows[i][tempCol] = "<strong><font color=#000000 >" + objVercol[tempCol] + "</font></strong>";
						rows[i][field] = objVercol[field];
					}
				}
			}
			/***********竖排标题生成数据end****YH 2013.1.8*****/
			var _5b4 = $(_5b0).datagrid("getColumnFields", _5b2);
			if (_5b2) {
				if (!(opts.rownumbers || (opts.frozenColumns && opts.frozenColumns.length))) {
					//  修复无行号 无数据的情况下，不显示无数据信息
					if (rows.length == 0 && (opts.url)) {
						// var view2body = $("div.datagrid-view2 div.datagrid-body");
						var view2body = $("div.datagrid-body", dc.view2);
						// var str = "" + "<TABLE id=tab_listdiv_listContent class=div_tableList border=0 cellSpacing=0 cellPadding=0 width=100% height=80%>" + "<TBODY><TR><TD colSpan=99 align=middle><font size=3>" + opts.noDataMsg + "</font></TD></TR>" + "</TBODY></TABLE>";
						var str = "" + "<TABLE id=tab_listdiv_listContent class=div_tableList border=0 cellSpacing=0 cellPadding=0 width=100% height=80%>" + "<TBODY><TR><TD colSpan=99 align=middle> " + generateMsg(opts) + " </TD></TR>" + "</TBODY></TABLE>";
						// view2body[0].innerHTML = str;
						view2body.html(str);
					}
					return;
				}
			}
			//如果查询不到数据则显示提示信息 YH 2012.11.22
			// if(rows.length == 0 && (opts.url)){
			if (rows.length == 0) { // 修改无数据就显示提示信息 famingyuan ,2013/05/09
				// var view2body = $("div.datagrid-view2 div.datagrid-body");
				var view2body = $("div.datagrid-body", dc.view2);
				// var str = "" + "<TABLE id=tab_listdiv_listContent class=div_tableList border=0 cellSpacing=0 cellPadding=0 width=100% height=80%>" + "<TBODY><TR><TD colSpan=99 align=middle><font size=3>" + opts.noDataMsg + "</font></TD></TR>" + "</TBODY></TABLE>";
				var str = "" + "<TABLE id=tab_listdiv_listContent class=div_tableList border=0 cellSpacing=0 cellPadding=0 width=100% height=80%>" + "<TBODY><TR><TD colSpan=99 align=middle>" + generateMsg(opts) + "</TD></TR>" + "</TBODY></TABLE>";
				// view2body[0].innerHTML = str;
				view2body.html(str);
			}
			var _5b5 = ["<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
			//加入分页数据下标 YH 2012.12.4
			var pageFrom = ((rows.length == 0 ? 0 : opts.pageSize * (opts.pageNumber - 1) + 1) - 1);
			var pageTo = rows.length;
			//如果是竖排标题没有分页功能 YH 2013.1.7
			if (opts.verColumn) {
				pageTo = opts.verColumnData.length;
			}
			for (var i = 0; i < pageTo; i++) {
				//如果是以Y轴为标题需要重新组装数据 YH 2013.1.7
				if (opts.axleY) {
					for (var k = 0; k < rows.length; k++) {
						rows[i][k] = rows[k][rows[i].field];
					}
				}
				var cls = (i % 2 && opts.striped) ? "class=\"datagrid-row datagrid-row-alt\"" : "class=\"datagrid-row\"";
				var _5b6 = opts.rowStyler ? opts.rowStyler.call(_5b0, i, rows[i]) : "";
				var _5b7 = _5b6 ? "style=\"" + _5b6 + "\"" : "";
				var _5b8 = _5b3.rowIdPrefix + "-" + (_5b2 ? 1 : 2) + "-" + i;
				/*
_5b5.push("<tr id=\""+_5b8+"\" datagrid-row-index=\""+i+"\" "+cls+" "+_5b7+">");
_5b5.push(this.renderRow.call(this,_5b0,_5b4,_5b2,i,rows[i]));
_5b5.push("</tr>");
// 修复无法翻页选中的bug , 2013/05/10
 */
				var str1 = "<tr id=\"" + _5b8 + "\" datagrid-row-index=\"" + i + "\" " + cls + " " + _5b7 + ">";
				var str2 = this.renderRow.call(this, _5b0, _5b4, _5b2, i, rows[i]);
				var str3 = "</tr>";

				if (opts.isSelectRow || (opts.selected_index && opts.selected_index[i])) {
					cls = "class=\"datagrid-row  datagrid-row-selected \"";
					str1 = "<tr id=\"" + _5b8 + "\" datagrid-row-index=\"" + i + "\" " + cls + " " + _5b7 + " abc=\"HEIHEI\">";
					opts.isSelectRow = false;
				}

				_5b5.push(str1);
				_5b5.push(str2);
				_5b5.push(str3);
			}
			_5b5.push("</tbody></table>");
			$(_5b1).html(_5b5.join(""));
			//竖排标题渲染判断 YH 2013.1.7
			if (opts.verColumn) {
				for (var i = 0; i < opts.verColumnData.length; i++) {
					var objVercol = opts.verColumnData[i];
					for (var j = 0; j < opts.verColumnLevel; j++) {
						var temp = "vercol_" + j;
						var nexttemp = "";
						var objVercol2;
						var colspanCount = 1;
						var rowspanCount = 1;
						var n = 0;
						for (n = (j + 1); n < opts.verColumnLevel; n++) {
							nexttemp = "vercol_" + n; //如果有相同的值列合并 YH 2013.1.8
							if (objVercol[temp] == objVercol[nexttemp]) {
								colspanCount = colspanCount + 1;
							} else {
								var copts = {
									index: i,
									field: temp,
									rowspan: 1,
									colspan: colspanCount
								};
								_53d(_5b0, copts);
								colspanCount = 1;
								break;
							}
						}
						if (n == opts.verColumnLevel) {
							var copts = {
								index: i,
								field: temp,
								rowspan: 1,
								colspan: colspanCount
							};
							_53d(_5b0, copts);
							colspanCount = 1;
						}
						var c = 0;
						for (c = (i + 1); c < opts.verColumnData.length; c++) {
							objVercol2 = opts.verColumnData[c]; //如果下一行的值相同行合并 YH 2013.1.8
							if (objVercol[temp] == objVercol2[temp]) {
								rowspanCount = rowspanCount + 1;
							} else {
								var ropts = {
									index: i,
									field: temp,
									rowspan: rowspanCount,
									colspan: 1
								};
								_53d(_5b0, ropts);
								rowspanCount = 1;
								break;
							}
						}
						if (c == opts.verColumnData.length) {
							var ropts = {
								index: i,
								field: temp,
								rowspan: rowspanCount,
								colspan: 1
							};
							_53d(_5b0, ropts);
							rowspanCount = 1;
						}
					}
				}
			}
		},
		renderFooter: function(_5b9, _5ba, _5bb) {
			var opts = $.data(_5b9, "datagrid").options;
			var rows = $.data(_5b9, "datagrid").footer || [];
			var _5bc = $(_5b9).datagrid("getColumnFields", _5bb);
			var _5bd = ["<table class=\"datagrid-ftable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
			for (var i = 0; i < rows.length; i++) {
				_5bd.push("<tr class=\"datagrid-row\" datagrid-row-index=\"" + i + "\">");
				_5bd.push(this.renderRow.call(this, _5b9, _5bc, _5bb, i, rows[i]));
				_5bd.push("</tr>");
			}
			_5bd.push("</tbody></table>");
			$(_5ba).html(_5bd.join(""));
		},
		// _5c0 为true表示右边
		renderRow: function(_5be, _5bf, _5c0, _5c1, _5c2,rowsLen) {
			var opts = $.data(_5be, "datagrid").options;
			/*保存当前选中的索引*/
			if (!opts.selected_index) {
				opts.selected_index = {};
			}
			var cc = [];
			if (_5c0 && opts.rownumbers) {
				var _5c3 = _5c1 + 1;
				//列表行索引生成修改 YH 2012.12.4
				/*if(opts.pagination){
//_5c3+=(opts.pageNumber-1)*opts.pageSize;
}*/
				cc.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">" + _5c3 + "</div></td>");
			}
			var _5bfMaxIndex = _5bf.length -1; // 表示渲染的最大列索引
			for (var i = 0; i < _5bf.length; i++) {
				var _5c4 = _5bf[i];
				var col = $(_5be).datagrid("getColumnOption", _5c4);
				if (col && _5c2) {
					var _5c5 = _5c2[_5c4];
					var _5c6 = col.styler ? (col.styler(_5c5, _5c2, _5c1) || "") : "";
					//竖排标题表格边框样式默认值 YH 2013.1.11
					if (opts.verColumn) {
						if (opts.verColumnLevel == 1) {
							var vercolstyle = "border-right:1px solid #0080ff;border-bottom:0px solid #0080ff;";
							// 取消掉最后一列的右边框
							if(i==_5bfMaxIndex){
								vercolstyle = "border-bottom:0px solid #0080ff;";
							}
							_5c6 = _5c6 + vercolstyle;
							if (i == 0) {
								_5c6 = _5c6 + "background:#f2edf3;";
							}
						} else {
							var vercolstyle = "border-right:1px solid #99baec;border-bottom:1px solid #99baec;";
							// 取消掉最后一列的右边框
							if(i==_5bfMaxIndex){
								vercolstyle = "border-bottom:1px solid #99baec;";
							}
							_5c6 = _5c6 + vercolstyle;
							if (i < opts.verColumnLevel) {
								_5c6 = _5c6 + "background:#fafafa;";
							}
						}
					}

					//对竖排标题表格生成样式 YH 2013.1.10
					/*添加是否定义了宽度标志 2013/06/28*/
					var appendFlag = "";
					if (col.userInitWidth != undefined) {
						appendFlag = ' defWidth=\"true\" ';
					}
					// 普通表格渲染  
					// if((i!=(_5bfMaxIndex))&&!opts.verColumn&&opts.showBorder&&col.isAddedBorder){
					// 	appendFlag +=' class="header-right-border "';
					// }
					// 纵向表格上面已经设置了边框的 此处设置横向表格
					var classValue = "";
					if(opts.showBorder&&!opts.verColumn&&col.isAddedBorder){
						// 如果渲染的是右边内容
						classValue +=' header-right-border ';
					}
					
					// 针对合并单元格情况  mergeOpts 为执行merge操作时 添加的			
					if(col.mergeOpts || col.hideForMerge){
						var currentMergeOpts = col.mergeOpts?col.mergeOpts[""+_5c1]:null;
						// 如果根据当前的索引能取到  说明是主合并行
						if(currentMergeOpts){
							appendFlag += "  rowspan=\""+currentMergeOpts.rowspan+"\" colspan=\""+currentMergeOpts.colspan+"\" ";
							classValue +=' datagrid-td-merged ';
							if(rowsLen==1){
								_5c6+=" width:"+col.widthWithSubCols+"px; ";	
							}
						}else if(opts.mergedRowIndexs[""+_5c1]){
							_5c6 += " display:none;";
						}else{
							// 判断当前行是不是辅助合并行 如果是的话 则应该给display:none
							var currentRowIndex = parseInt(_5c1,10);
							var isAdditionRow = false; // 单元格是否处于附属行中
							if(col.mergeOpts){// 属于和并列的
								for(var key in col.mergeOpts){
									var tempMergeOpts = col.mergeOpts[key];
									var crossRowCount = parseInt(tempMergeOpts.rowspan,10);
									key = parseInt(key,10);

									if(currentRowIndex>key&&(key+crossRowCount)>currentRowIndex){
										isAdditionRow = true;
										break;
									}
								}
							}else if(col.hideForMerge && opts.mergedRowIndexs){ // 当前的单元格是受merge影响
								for(var key in opts.mergedRowIndexs){
									var tempMergeOpts = opts.mergedRowIndexs[key];
									var crossRowCount = parseInt(tempMergeOpts.rowspan,10); // merge跨行
									key = parseInt(key,10); // 指定行
									if(col.hideForMerge && (currentRowIndex>key)&&(key+crossRowCount)>currentRowIndex){
										isAdditionRow = true;
										break;
									}
								}
							}

							if(isAdditionRow){
								_5c6 += " display:none;";
							}

						}
					}

					// 设置样式
					var _5c7 = col.hidden ? "style=\"display:none;" + _5c6 + "\"" : (_5c6 ? "style=\"" + _5c6 + "\"" : "");
					// 添加class
					appendFlag += ' class ="'+classValue+'" ';

					if (opts.verColumn) {
						cc.push("<td align=\"center\" field=\"" + _5c4 + "\" " + _5c7 + appendFlag + ">");
					} else {
						cc.push("<td field=\"" + _5c4 + "\" " + _5c7 + appendFlag + ">");
					}
					if (col.checkbox) {
						var _5c7 = "";
					} else {
						var _5c7 = "";
						_5c7 += "text-align:" + (col.align || "left") + ";";
                        if( col.showErrMsg ){ //2016年2月15日11:25:39 满足非editor组件显示错误提示的功能
                            _5c7 += "overflow:visible;";
                        }
						if (!opts.nowrap) {
							// 修改设置对于任何字符均换行 包含长数字等  20140728 famingyuan
							_5c7 += "white-space:normal;height:auto;word-break:break-all";
						} else {
							if (opts.autoRowHeight) {
								_5c7 += "height:auto;";
							}
						}
					}
					cc.push("<div style=\"" + _5c7 + "\" ");
					if (col.checkbox) {
						cc.push("class=\"datagrid-cell-check ");
					} else {
						cc.push("class=\"datagrid-cell " + col.cellClass);
					}
					cc.push("\">");
					if (col.checkbox) {
						var key = opts.pageSize * (opts.pageNumber - 1) + (_5c1 + 1); //如果有被选中的记录 在checkbox前打上√ YH 2013.2.18
						var ischecked = "";
						if (opts.selectedsData.containsKey(key)) {
							ischecked = "checked=\"checked\"";
							// 添加 翻页选中的功能 ， famingyuan , 2013/05/10
							opts.isSelectRow = true;
							opts.selected_index[_5c1] = true;
						}
						// 如果checkbox配置了formatter 那么formatter将作为判断当前行是否可以点击的标志 2014/12/17
						if(col.formatter){
							var checkboxStatus = col.formatter(_5c5, _5c2, _5c1);
							if(checkboxStatus===false){
								ischecked += " disabled=\"true\" ";
							}
						}
						cc.push("<input type=\"checkbox\" textContent=\"cell\" name=\"" + _5c4 + "\" " + ischecked + " value=\"" + (_5c5 != undefined ? _5c5 : "") + "\"/>");
					} else {
						if (col.formatter) {
							cc.push(col.formatter(_5c5, _5c2, _5c1));
						} else {
							cc.push(_5c5);
						}
					}
					cc.push("</div>");
					cc.push("</td>");
				}
			}
			// cc.push("<td><span class=\"empty_empty\">&nbsp;</span></td>");
			return cc.join("");
		},
		refreshRow: function(_5c8, _5c9) {
			this.updateRow.call(this, _5c8, _5c9, {});
		},
		updateRow: function(_5ca, _5cb, row) {
			var opts = $.data(_5ca, "datagrid").options;
			var rows = $(_5ca).datagrid("getRows");
			var rowsLen = rows?rows.length:0;
			$.extend(rows[_5cb], row);
			var _5cc = opts.rowStyler ? opts.rowStyler.call(_5ca, _5cb, rows[_5cb]) : "";

			function _5cd(_5ce) {
				var _5cf = $(_5ca).datagrid("getColumnFields", _5ce);
				var tr = opts.finder.getTr(_5ca, _5cb, "body", (_5ce ? 1 : 2));
				var _5d0 = tr.find("div.datagrid-cell-check input[type=checkbox]").is(":checked");
				tr.html(this.renderRow.call(this, _5ca, _5cf, _5ce, _5cb, rows[_5cb],rowsLen));
				tr.attr("style", _5cc || "");
				if (_5d0) {
					tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked", true);
				}
			};
			_5cd.call(this, true);
			_5cd.call(this, false);
			$(_5ca).datagrid("fixRowHeight", _5cb);
		},
		insertRow: function(_5d1, _5d2, row) {
			var _5d3 = $.data(_5d1, "datagrid");
			var opts = _5d3.options;
			var dc = _5d3.dc;
			var data = _5d3.data;
			if (_5d2 == undefined || _5d2 == null) {
				_5d2 = data.rows.length;
			}
			if (_5d2 > data.rows.length) {
				_5d2 = data.rows.length;
			}
			// 把_5d2 之后的行的索引全部加1
			function _5d4(_5d5) {
				var _5d6 = _5d5 ? 1 : 2;
				for (var i = data.rows.length - 1; i >= _5d2; i--) {
					var tr = opts.finder.getTr(_5d1, i, "body", _5d6);
					tr.attr("datagrid-row-index", i + 1);
					tr.attr("id", _5d3.rowIdPrefix + "-" + _5d6 + "-" + (i + 1));
					if (_5d5 && opts.rownumbers) {
						tr.find("div.datagrid-cell-rownumber").html(i + 2);
					}
				}
			};
			// 组装dom 插入到指定行tr之后
			function _5d7(_5d8) {
				var _5d9 = _5d8 ? 1 : 2;
				var _5da = $(_5d1).datagrid("getColumnFields", _5d8);
				var _5db = _5d3.rowIdPrefix + "-" + _5d9 + "-" + _5d2;
				var tr = "<tr id=\"" + _5db + "\" class=\"datagrid-row\" datagrid-row-index=\"" + _5d2 + "\"></tr>";
				if (_5d2 >= data.rows.length) {
					if (data.rows.length) {
						opts.finder.getTr(_5d1, "", "last", _5d9).after(tr);
					} else {
						var cc = _5d8 ? dc.body1 : dc.body2;
						cc.html("<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>" + tr + "</tbody></table>");
					}
				} else {
					opts.finder.getTr(_5d1, _5d2 + 1, "body", _5d9).before(tr);
				}
			};
			_5d4.call(this, true);
			_5d4.call(this, false);
			_5d7.call(this, true);
			_5d7.call(this, false);
			// 取消添加数据 改变总记录数的问题
			// data.total += 1;
			if (opts.pagination) {
				if (opts.totalRecForDesc) {
					opts.totalRecForDesc += 1;
				} else {
					opts.totalRecForDesc = 1;
				}
			}
			data.rows.splice(_5d2, 0, row);
			this.refreshRow.call(this, _5d1, _5d2);
		},
		/**
		 * 批量插入行
		 * @param  {[type]} _5d1  [description]
		 * @param  {[type]} _5d2  [description]
		 * @param  {[type]} rows [添加的行数据]
		 * @return {[type]}      [description]
		 */
		insertRows:function  (_5d1,_5d2,rows) {

			var _5d3 = $.data(_5d1, "datagrid");
			var opts = _5d3.options;
			var dc = _5d3.dc;
			var data = _5d3.data;
			var originalLenght = data.rows.length; // 原来的数组长度
			if (_5d2 == undefined || _5d2 == null) {
				_5d2 = data.rows.length;
			}
			if (_5d2 > data.rows.length) {
				_5d2 = data.rows.length;
			}
			rows = rows || []; // 
			// 添加到数组中
			var preRow = data.rows.slice(0,_5d2);
			var nextRow = data.rows.slice(_5d2);
			data.rows = preRow.concat(rows).concat(nextRow);

			// 把_5d2 之后的行的索引全部加1
			function _5d4(_5d5) {
				var _5d6 = _5d5 ? 1 : 2;
				for (var i = data.rows.length - 1; i >= _5d2; i--) {
					var tr = opts.finder.getTr(_5d1, i, "body", _5d6);
					tr.attr("datagrid-row-index", i + 1);
					tr.attr("id", _5d3.rowIdPrefix + "-" + _5d6 + "-" + (i + rows.length));
					// 左侧table
					if (_5d5 && opts.rownumbers) {
						tr.find("div.datagrid-cell-rownumber").html(i + 1+rows.length);
					}
				}
			};
			// 批量组装dom 插入到指定行tr之后
			function _5d7(_5d8) {
				var _5d9 = _5d8 ? 1 : 2;
				var _5da = $(_5d1).datagrid("getColumnFields", _5d8);
				// 保存新增加dom结构
				var trs = [];
				// 直接追加数据的body
				var targetBody = _5d8 ? dc.body1 : dc.body2;
				if (_5d2 >= originalLenght) {
					 // 获取当前情况下的最后一行
					var lastTr = opts.finder.getTr(_5d1, "", "last", _5d9);
				} else {
					// 获取pos的下一行 ，用于插入到前面
					var currentNextTr  = opts.finder.getTr(_5d1, _5d2 + 1, "body", _5d9);
				}

				var subFix = "";
				var _5cf = $(_5d1).datagrid("getColumnFields", _5d8);
				for(var i=0,len=rows.length;i<len;i++){
					var _5db = _5d3.rowIdPrefix + "-" + _5d9 + "-" + (_5d2+i);
					// 自定义样式
					var _5cc = opts.rowStyler ? opts.rowStyler.call(_5d1, (_5d2+i), rows[i]) : "";
					var content = this.renderRow.call(this, _5d1, _5cf, _5d8, (_5d2+i), rows[i]);
					var tr = "<tr id=\"" + _5db + "\" class=\"datagrid-row\" datagrid-row-index=\"" + (_5d2+i) + "\" style=\""+_5cc+"\">"+content+"</tr>";
					// pos 大于当前的总行数了 以总行数为准
					if (_5d2 >= originalLenght) {
						if (originalLenght) {
							trs.push(tr);
						} else {
							trs.push("<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>" + tr);
							subFix =  "</tbody></table>";
						}
					} else {
						trs.push(tr);
					}
				}
				// 针对原来没有数据 
				trs.push(subFix);

				if(lastTr){
					lastTr.after(trs.join(''));
				}else{
					currentNextTr.before(trs.join(''));
				}

			};
			 
			_5d4.call(this, true);
			_5d4.call(this, false);
			_5d7.call(this, true);
			_5d7.call(this, false);
			// 取消添加数据 改变总记录数的问题
			// data.total += 1;
			if (opts.pagination) {
				if (opts.totalRecForDesc) {
					opts.totalRecForDesc += rows.length;
				} else {
					opts.totalRecForDesc = rows.length;
				}
			}
			// data.rows.splice(_5d2, 0, rows); // 将rows添加到内部变量中
		},
		deleteRow: function(_5dc, _5dd) {
			var _5de = $.data(_5dc, "datagrid");
			var opts = _5de.options;
			var data = _5de.data;

			function _5df(_5e0) {
				var _5e1 = _5e0 ? 1 : 2;
				for (var i = _5dd + 1; i < data.rows.length; i++) {
					var tr = opts.finder.getTr(_5dc, i, "body", _5e1);
					tr.attr("datagrid-row-index", i - 1);
					tr.attr("id", _5de.rowIdPrefix + "-" + _5e1 + "-" + (i - 1));
					if (_5e0 && opts.rownumbers) {
						tr.find("div.datagrid-cell-rownumber").html(i);
					}
				}
			};
			opts.finder.getTr(_5dc, _5dd).remove();
			_5df.call(this, true);
			_5df.call(this, false);
			// 取消删除记录 修改总记录数据的问题
			// data.total -= 1;
			if (opts.pagination) {
				if (opts.totalRecForDesc > 0) {
					opts.totalRecForDesc -= 1;
				} else {
					opts.totalRecForDesc = 0;
				}
			}
			data.rows.splice(_5dd, 1);
			if (data.rows.length == 0) {
				/*修复在行数据被删除完毕之后 全选按钮还被选中的bug*/
				updateSelectAll(opts, _5dc, data);
			}

			/*修复删除数据时没有去掉上边框的问题*/
			handleBorder(_5dc,opts,_5dd-1);
		},
		onBeforeRender: function(_5e2, rows) {},
		onAfterRender: function(_5e3) {
            var count,  //翻页次数
                opts;

            count = $.data(_5e3,'refreshCount');
            opts = $.data(_5e3, "datagrid").options;

            if (opts.showFooter) {
                var _5e4 = $(_5e3).datagrid("getPanel").find("div.datagrid-footer");
                _5e4.find("div.datagrid-cell-rownumber,div.datagrid-cell-check").css("visibility", "hidden");
            };

            //zws 加载表格翻页自聚焦 2015年7月23日18:52:15
            if( count >= 1 ) {
                var preElm;
                preElm = $( _5e3).prev();
                preElm.find( 'tr.datagrid-row:first' ).
                    find( 'input[type=checkbox]:first' ).
                    focus().trigger("mouseover");
                $( _5e3).data( 'refreshCount',++count );
            }else{
                $( _5e3).data( 'refreshCount','1' );
            }
		}
	};
	$.fn.datagrid.defaults = $.extend({}, $.fn.panel.defaults, {
		frozenColumns: undefined,
		columns: undefined,
		fitColumns: false,
		autoRowHeight: true,
		toolbar: null,
		striped: false,
		method: "post",
		nowrap: true,
		titleNowrap: true,
		idField: null,
		url: null,
		loadMsg: resource.GRID_LOADMSG,
		rownumbers: false,
		singleSelect: false,
		selectOnCheck: true,
		checkOnSelect: true,
		pagination: false,
		pagePosition: "bottom",
		pageNumber: 1,
		pageSize: 10,
		pageList: [10, 20, 30, 40, 50],
		queryParams: {},
		sortName: null,
		sortOrder: "asc",
		remoteSort: true,
		showHeader: true,
		showFooter: false,
		scrollbarSize: 18,
		rowStyler: function(_5e5, _5e6) {},
		loader: function(_5e7, _5e8, _5e9) {
			var me = this;
			var opts = $(this).datagrid("options");
			if (!opts.url) {
				return false;
			}
			// $.ajax({
			// 	type: opts.method,
			// 	url: opts.url,
			// 	data: _5e7,
			// 	dataType: opts.dataType || "json",
			// 	// 添加超时
			// 	timeout: opts.timeout || PJF.constants.AJAX_TIMEOUT,
			// 	success: function(data) {
			// 		_5e8(data);
			// 	},
			// 	error: function() {
			// 		_5e9.apply(this, arguments);
			// 	}
			// });
			// 修改默认的ajax请求为PJF AJAX
			gridBeginTime = new Date().getTime();
			console.log('grid开始发送请求加载数据');
			//得在客户端里才去发跨域
			if(opts.crossDomain && PJF.communication.client.isInP2()){
				PJF.communication.crossDomainReq({
					url : opts.url,
					data : JSON.stringify(_5e7),
					success: function(data){
						try{
							data = JSON.parse(data);
						}catch(e){
							data = {BK_STATUS: '01', BK_DESC: e.message, _COMMON:{}};
							console.log('解析跨域grid返回数据出错');							
						}
						_5e8(data);
					},
					failure: function(errMsg){
						_5e9.apply(this, [{},errMsg,'error']);
					}
				})
			}
			else{
				var conf = {
					//请求地址
					url: opts.url,
					//默认为json格式
					dataType: opts.dataType,
					//传递的数据
					data: _5e7,
					//同步模式：默认为异步
					async: true,
					//默认为post
					type: opts.method,
					//默认为10秒
					timeOut: opts.timeout,
					success: function(data) {
						if (data && data._val_page) {
							var cancelCallback = function() {
									//关闭loading状态
									$(me).datagrid("loaded");
								}
								//打开授权页面
							PJF.communication.handleAuthResource(data, conf, cancelCallback);
							//授权成功后的回调函数
							PJF.loadResource.PJF_LOAD_RESOURCES_CALLBACK = function() {
								PJF.communication.cpsJsonReqResend();
							}
						} else
							_5e8(data);
					},
					//通信失败回调函数
					failure: function() {
						_5e9.apply(this, arguments);
					}
				};
				PJF.communication.ajax(conf);
			}			
		},
		loadFilter: function(data, opts) {
			//判断表格数据是否为空 YH 2012.11.20
			if (!data) {
				// alert("远程数据加载对象不存在，请检查数据！");
				if (typeof(console) != "undefined") {
					console.log("Error: 远程数据加载对象不存在，请检查数据！");
				}
				var totalPath = opts.totalPath || "total";
				var rowsPath = opts.rowsPath || "rows";
				var data = {};
				data[totalPath] = 0;
				data[rowsPath] = [];
				return data;
			}
			if (typeof data.length == "number" && typeof data.splice == "function") {
				return {
					total: data.length,
					rows: data
				};
			} else {
				return data;
			}
		},
		editors: _545,
		finder: {
			getTr: function(_5ea, _5eb, type, _5ec) {
				type = type || "body";
				_5ec = _5ec || 0;
				var _5ed = $.data(_5ea, "datagrid");
				var dc = _5ed.dc;
				var opts = _5ed.options;
				if (_5ec == 0) {
					var tr1 = opts.finder.getTr(_5ea, _5eb, type, 1);
					var tr2 = opts.finder.getTr(_5ea, _5eb, type, 2);
					return tr1.add(tr2);
				} else {
					if (type == "body") {
						var tr = $("#" + _5ed.rowIdPrefix + "-" + _5ec + "-" + _5eb);
						if (!tr.length) {
							tr = (_5ec == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr[datagrid-row-index=" + _5eb + "]");
						}
						return tr;
					} else {
						if (type == "footer") {
							return (_5ec == 1 ? dc.footer1 : dc.footer2).find(">table>tbody>tr[datagrid-row-index=" + _5eb + "]");
						} else {
							if (type == "selected") {
								return (_5ec == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr.datagrid-row-selected");
							} else {
								if (type == "last") {
									return (_5ec == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr:last[datagrid-row-index]");
								} else {
									if (type == "allbody") {
										return (_5ec == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr[datagrid-row-index]");
									} else {
										if (type == "allfooter") {
											return (_5ec == 1 ? dc.footer1 : dc.footer2).find(">table>tbody>tr[datagrid-row-index]");
										}
									}
								}
							}
						}
					}
				}
			},
			getRow: function(_5ee, _5ef) {
				return $.data(_5ee, "datagrid").data.rows[_5ef];
			}
		},
		view: _5af,
		onBeforeLoad: function(_5f0) {},
		onLoadSuccess: function() {},
		onLoadError: function() {
			PJF.configuration.ajaxFailure(); // 默认处理方式,add by famingyuan ,2013/05/03
		},
		onClickRow: function(_5f1, _5f2) {},
		onDblClickRow: function(_5f3, _5f4) {},
		onClickCell: function(_5f5, _5f6, _5f7) {},
		onDblClickCell: function(_5f8, _5f9, _5fa) {},
		onSortColumn: function(sort, _5fb) {},
		onResizeColumn: function(_5fc, _5fd) {},
		onSelect: function(_5fe, _5ff) {},
		onUnselect: function(_600, _601) {},
		onSelectAll: function(rows) {},
		onUnselectAll: function(rows) {},
		onCheck: function(_602, _603) {},
		onUncheck: function(_604, _605) {},
		onCheckAll: function(rows) {},
		onUncheckAll: function(rows) {},
		onBeforeEdit: function(_606, _607) {},
		onAfterEdit: function(_608, _609, _60a) {},
		onCancelEdit: function(_60b, _60c) {},
		onHeaderContextMenu: function(e, _60d) {},
		onRowContextMenu: function(e, _60e, _60f) {},
		// 添加grid点击body空白区域回调函数
		onClickBodyEmptyArea:function  () {},
		// 添加grid点击body空白区域前的回调函数 如果返回false将取消保存操作
		onBeforeClickBodyEmptyArea:function  () {
			return true;
		}
	});
})(jQuery);
(function($) {
	var _610;

	function _611(_612) {
		var _613 = $.data(_612, "propertygrid");
		var opts = $.data(_612, "propertygrid").options;
		$(_612).datagrid($.extend({}, opts, {
			cls: "propertygrid",
			view: (opts.showGroup ? _614 : undefined),
			onClickRow: function(_615, row) {
				if (_610 != this) {
					_616();
					_610 = this;
				}
				if (opts.editIndex != _615 && row.editor) {
					var col = $(this).datagrid("getColumnOption", "value");
					col.editor = row.editor;
					_616();
					$(this).datagrid("beginEdit", _615);
					$(this).datagrid("getEditors", _615)[0].target.focus();
					opts.editIndex = _615;
				}
				opts.onClickRow.call(_612, _615, row);
			},
			onLoadSuccess: function(data) {
				$(_612).datagrid("getPanel").find("div.datagrid-group").css("border", "");
				opts.onLoadSuccess.call(_612, data);
			}
		}));
		$(document).unbind(".propertygrid").bind("mousedown.propertygrid", function(e) {
			var p = $(e.target).closest("div.propertygrid,div.combo-panel");
			if (p.length) {
				return;
			}
			_616();
		});

		function _616() {
			var t = $(_610);
			if (!t.length) {
				return;
			}
			var opts = $.data(_610, "propertygrid").options;
			var _617 = opts.editIndex;
			if (_617 == undefined) {
				return;
			}
			t.datagrid("getEditors", _617)[0].target.blur();
			if (t.datagrid("validateRow", _617)) {
				t.datagrid("endEdit", _617);
			} else {
				t.datagrid("cancelEdit", _617);
			}
			opts.editIndex = undefined;
		};
	};
	$.fn.propertygrid = function(_618, _619) {
		if (typeof _618 == "string") {
			var _61a = $.fn.propertygrid.methods[_618];
			if (_61a) {
				return _61a(this, _619);
			} else {
				return this.datagrid(_618, _619);
			}
		}
		_618 = _618 || {};
		return this.each(function() {
			var _61b = $.data(this, "propertygrid");
			if (_61b) {
				$.extend(_61b.options, _618);
			} else {
				var opts = $.extend({}, $.fn.propertygrid.defaults, $.fn.propertygrid.parseOptions(this), _618);
				opts.frozenColumns = $.extend(true, [], opts.frozenColumns);
				opts.columns = $.extend(true, [], opts.columns);
				$.data(this, "propertygrid", {
					options: opts
				});
			}
			_611(this);
		});
	};
	$.fn.propertygrid.methods = {};
	$.fn.propertygrid.parseOptions = function(_61c) {
		var t = $(_61c);
		return $.extend({}, $.fn.datagrid.parseOptions(_61c), $.parser.parseOptions(_61c, [{
			showGroup: "boolean"
		}]));
	};
	var _614 = $.extend({}, $.fn.datagrid.defaults.view, {
		render: function(_61d, _61e, _61f) {
			var _620 = $.data(_61d, "datagrid");
			var opts = _620.options;
			var rows = _620.data.rows;
			var _621 = $(_61d).datagrid("getColumnFields", _61f);
			var _622 = [];
			var _623 = 0;
			var _624 = this.groups;
			for (var i = 0; i < _624.length; i++) {
				var _625 = _624[i];
				_622.push("<div class=\"datagrid-group\" group-index=" + i + " style=\"height:25px;overflow:hidden;border-bottom:1px solid #ccc;\">");
				_622.push("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"height:100%\"><tbody>");
				_622.push("<tr>");
				_622.push("<td style=\"border:0;\">");
				if (!_61f) {
					_622.push("<span style=\"color:#666;font-weight:bold;\">");
					_622.push(opts.groupFormatter.call(_61d, _625.fvalue, _625.rows));
					_622.push("</span>");
				}
				_622.push("</td>");
				_622.push("</tr>");
				_622.push("</tbody></table>");
				_622.push("</div>");
				_622.push("<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>");
				for (var j = 0; j < _625.rows.length; j++) {
					var cls = (_623 % 2 && opts.striped) ? "class=\"datagrid-row datagrid-row-alt\"" : "class=\"datagrid-row\"";
					var _626 = opts.rowStyler ? opts.rowStyler.call(_61d, _623, _625.rows[j]) : "";
					var _627 = _626 ? "style=\"" + _626 + "\"" : "";
					var _628 = _620.rowIdPrefix + "-" + (_61f ? 1 : 2) + "-" + _623;
					_622.push("<tr id=\"" + _628 + "\" datagrid-row-index=\"" + _623 + "\" " + cls + " " + _627 + ">");
					_622.push(this.renderRow.call(this, _61d, _621, _61f, _623, _625.rows[j]));
					_622.push("</tr>");
					_623++;
				}
				_622.push("</tbody></table>");
			}
			$(_61e).html(_622.join(""));
		},
		onAfterRender: function(_629) {
			var opts = $.data(_629, "datagrid").options;
			var dc = $.data(_629, "datagrid").dc;
			var view = dc.view;
			var _62a = dc.view1;
			var _62b = dc.view2;
			$.fn.datagrid.defaults.view.onAfterRender.call(this, _629);
			if (opts.rownumbers || opts.frozenColumns.length) {
				var _62c = _62a.find("div.datagrid-group");
			} else {
				var _62c = _62b.find("div.datagrid-group");
			}
			$("<td style=\"border:0\"><div class=\"datagrid-row-expander datagrid-row-collapse\" style=\"width:25px;height:16px;cursor:pointer\"></div></td>").insertBefore(_62c.find("td"));
			view.find("div.datagrid-group").each(function() {
				var _62d = $(this).attr("group-index");
				$(this).find("div.datagrid-row-expander").bind("click", {
					groupIndex: _62d
				}, function(e) {
					if ($(this).hasClass("datagrid-row-collapse")) {
						$(_629).datagrid("collapseGroup", e.data.groupIndex);
					} else {
						$(_629).datagrid("expandGroup", e.data.groupIndex);
					}
				});
			});
		},
		onBeforeRender: function(_62e, rows) {
			var opts = $.data(_62e, "datagrid").options;
			var _62f = [];
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				var _630 = _631(row[opts.groupField]);
				if (!_630) {
					_630 = {
						fvalue: row[opts.groupField],
						rows: [row],
						startRow: i
					};
					_62f.push(_630);
				} else {
					_630.rows.push(row);
				}
			}

			function _631(_632) {
				for (var i = 0; i < _62f.length; i++) {
					var _633 = _62f[i];
					if (_633.fvalue == _632) {
						return _633;
					}
				}
				return null;
			};
			this.groups = _62f;
			var _634 = [];
			for (var i = 0; i < _62f.length; i++) {
				var _630 = _62f[i];
				for (var j = 0; j < _630.rows.length; j++) {
					_634.push(_630.rows[j]);
				}
			}
			$.data(_62e, "datagrid").data.rows = _634;
		}
	});
	$.extend($.fn.datagrid.methods, {
		expandGroup: function(jq, _635) {
			return jq.each(function() {
				var view = $.data(this, "datagrid").dc.view;
				if (_635 != undefined) {
					var _636 = view.find("div.datagrid-group[group-index=\"" + _635 + "\"]");
				} else {
					var _636 = view.find("div.datagrid-group");
				}
				var _637 = _636.find("div.datagrid-row-expander");
				if (_637.hasClass("datagrid-row-expand")) {
					_637.removeClass("datagrid-row-expand").addClass("datagrid-row-collapse");
					_636.next("table").show();
				}
				$(this).datagrid("fixRowHeight");
			});
		},
		collapseGroup: function(jq, _638) {
			return jq.each(function() {
				var view = $.data(this, "datagrid").dc.view;
				if (_638 != undefined) {
					var _639 = view.find("div.datagrid-group[group-index=\"" + _638 + "\"]");
				} else {
					var _639 = view.find("div.datagrid-group");
				}
				var _63a = _639.find("div.datagrid-row-expander");
				if (_63a.hasClass("datagrid-row-collapse")) {
					_63a.removeClass("datagrid-row-collapse").addClass("datagrid-row-expand");
					_639.next("table").hide();
				}
				$(this).datagrid("fixRowHeight");
			});
		}
	});
	$.fn.propertygrid.defaults = $.extend({}, $.fn.datagrid.defaults, {
		singleSelect: true,
		remoteSort: false,
		fitColumns: true,
		loadMsg: "",
		frozenColumns: [
			[{
				field: "f",
				width: 16,
				resizable: false
			}]
		],
		columns: [
			[{
				field: "name",
				title: "Name",
				width: 100,
				sortable: true
			}, {
				field: "value",
				title: "Value",
				width: 100,
				resizable: false
			}]
		],
		showGroup: false,
		groupField: "group",
		groupFormatter: function(_63b, rows) {
			return _63b;
		}
	});
})(jQuery);
(function($) {
	function _63c(a, o) {
		for (var i = 0, len = a.length; i < len; i++) {
			if (a[i] == o) {
				return i;
			}
		}
		return -1;
	};

	function _63d(a, o) {
		var _63e = _63c(a, o);
		if (_63e != -1) {
			a.splice(_63e, 1);
		}
	};

	function _63f(_640) {
		var opts = $.data(_640, "treegrid").options;
		$(_640).datagrid($.extend({}, opts, {
			url: null,
			loader: function() {
				return false;
			},
			onLoadSuccess: function() {},
			onResizeColumn: function(_641, _642) {
				_657(_640);
				opts.onResizeColumn.call(_640, _641, _642);
			},
			onSortColumn: function(sort, _643) {
				opts.sortName = sort;
				opts.sortOrder = _643;
				if (opts.remoteSort) {
					_656(_640);
				} else {
					var data = $(_640).treegrid("getData");
					_66c(_640, 0, data);
				}
				opts.onSortColumn.call(_640, sort, _643);
			},
			onBeforeEdit: function(_644, row) {
				if (opts.onBeforeEdit.call(_640, row) == false) {
					return false;
				}
			},
			onAfterEdit: function(_645, row, _646) {
				opts.onAfterEdit.call(_640, row, _646);
			},
			onCancelEdit: function(_647, row) {
				opts.onCancelEdit.call(_640, row);
			},
			onSelect: function(_648) {
				opts.onSelect.call(_640, find(_640, _648));
			},
			onUnselect: function(_649) {
				opts.onUnselect.call(_640, find(_640, _649));
			},
			onSelectAll: function() {
				opts.onSelectAll.call(_640, $.data(_640, "treegrid").data);
			},
			onUnselectAll: function() {
				opts.onUnselectAll.call(_640, $.data(_640, "treegrid").data);
			},
			onCheck: function(_64a) {
				opts.onCheck.call(_640, find(_640, _64a));
			},
			onUncheck: function(_64b) {
				opts.onUncheck.call(_640, find(_640, _64b));
			},
			onCheckAll: function() {
				opts.onCheckAll.call(_640, $.data(_640, "treegrid").data);
			},
			onUncheckAll: function() {
				opts.onUncheckAll.call(_640, $.data(_640, "treegrid").data);
			},
			onClickRow: function(_64c) {
				opts.onClickRow.call(_640, find(_640, _64c));
			},
			onDblClickRow: function(_64d) {
				opts.onDblClickRow.call(_640, find(_640, _64d));
			},
			onClickCell: function(_64e, _64f) {
				opts.onClickCell.call(_640, _64f, find(_640, _64e));
			},
			onDblClickCell: function(_650, _651) {
				opts.onDblClickCell.call(_640, _651, find(_640, _650));
			},
			onRowContextMenu: function(e, _652) {
				opts.onContextMenu.call(_640, e, find(_640, _652));
			}
		}));
		if (opts.pagination) {
			var _653 = $(_640).datagrid("getPager");
			_653.pagination({
				pageNumber: opts.pageNumber,
				pageSize: opts.pageSize,
				pageList: opts.pageList,
				onSelectPage: function(_654, _655) {
					opts.pageNumber = _654;
					opts.pageSize = _655;
					_656(_640);
				}
			});
			opts.pageSize = _653.pagination("options").pageSize;
		}
	};

	function _657(_658, _659) {
		var opts = $.data(_658, "datagrid").options;
		var dc = $.data(_658, "datagrid").dc;
		if (!dc.body1.is(":empty") && (!opts.nowrap || opts.autoRowHeight)) {
			if (_659 != undefined) {
				var _65a = _65b(_658, _659);
				for (var i = 0; i < _65a.length; i++) {
					_65c(_65a[i][opts.idField]);
				}
			}
		}
		$(_658).datagrid("fixRowHeight", _659);

		function _65c(_65d) {
			var tr1 = opts.finder.getTr(_658, _65d, "body", 1);
			var tr2 = opts.finder.getTr(_658, _65d, "body", 2);
			tr1.css("height", "");
			tr2.css("height", "");
			var _65e = Math.max(tr1.height(), tr2.height());
			tr1.css("height", _65e);
			tr2.css("height", _65e);
		};
	};

	function _65f(_660) {
		var dc = $.data(_660, "datagrid").dc;
		var opts = $.data(_660, "treegrid").options;
		if (!opts.rownumbers) {
			return;
		}
		dc.body1.find("div.datagrid-cell-rownumber").each(function(i) {
			$(this).html(i + 1);
		});
		dc.body2.find("tr.datagrid-row").each(function(i) {
			if (i % 2 == 0) {
				$(this).removeClass("datagrid-row-alt").addClass("datagrid-row-alt");
			} else {
				$(this).removeClass("datagrid-row-alt");
			}
		});
		dc.body1.find("tr.datagrid-row").each(function(i) {
			if (i % 2 == 0) {
				$(this).removeClass("datagrid-row-alt").addClass("datagrid-row-alt");
			} else {
				$(this).removeClass("datagrid-row-alt");
			}
		});
		dc.body1.add(dc.body2).removeClass("treegrid-body").addClass("treegrid-body");
	};

	function _661(_662) {
		var dc = $.data(_662, "datagrid").dc;
		var body = dc.body1.add(dc.body2);
		var _663 = ($.data(body[0], "events") || $._data(body[0], "events")).click[0].handler;
		dc.body1.add(dc.body2).bind("mouseover", function(e) {
			var tt = $(e.target);
			var tr = tt.closest("tr.datagrid-row");
			if (!tr.length) {
				return;
			}
			if (tt.hasClass("tree-hit")) {
				tt.hasClass("tree-expanded") ? tt.addClass("tree-expanded-hover") : tt.addClass("tree-collapsed-hover");
			}
			e.stopPropagation();
		}).bind("mouseout", function(e) {
			var tt = $(e.target);
			var tr = tt.closest("tr.datagrid-row");
			if (!tr.length) {
				return;
			}
			if (tt.hasClass("tree-hit")) {
				tt.hasClass("tree-expanded") ? tt.removeClass("tree-expanded-hover") : tt.removeClass("tree-collapsed-hover");
			}
			e.stopPropagation();
		}).unbind("click").bind("click", function(e) {
			var tt = $(e.target);
			var tr = tt.closest("tr.datagrid-row");
			if (!tr.length) {
				return;
			}
			if (tt.hasClass("tree-hit")) {
				_664(_662, tr.attr("node-id"));
			} else {
				_663(e);
			}
			e.stopPropagation();
		});
	};

	// 生成一行 分别对应左右table
	function _665(_666, _667) {
		var opts = $.data(_666, "treegrid").options;
		var tr1 = opts.finder.getTr(_666, _667, "body", 1); // tr id 根据 idField对应的值来进行命名 so idField的那个字段不得重复
		var tr2 = opts.finder.getTr(_666, _667, "body", 2);
		var _668 = $(_666).datagrid("getColumnFields", true).length + (opts.rownumbers ? 1 : 0);
		var _669 = $(_666).datagrid("getColumnFields", false).length;
		_66a(tr1, _668);
		_66a(tr2, _669);

		function _66a(tr, _66b) {
			$("<tr class=\"treegrid-tr-tree\">" + "<td style=\"border:0px\" colspan=\"" + _66b + "\">" + "<div></div>" + "</td>" + "</tr>").insertAfter(tr);
		};
	};

	function _66c(_66d, _66e, data, _66f) {
		var opts = $.data(_66d, "treegrid").options;
		var dc = $.data(_66d, "datagrid").dc;
		data = opts.loadFilter.call(_66d, data, _66e);
		var node = find(_66d, _66e);
		if (node) {
			var _670 = opts.finder.getTr(_66d, _66e, "body", 1);
			var _671 = opts.finder.getTr(_66d, _66e, "body", 2);
			var cc1 = _670.next("tr.treegrid-tr-tree").children("td").children("div");
			var cc2 = _671.next("tr.treegrid-tr-tree").children("td").children("div");
		} else {
			var cc1 = dc.body1;
			var cc2 = dc.body2;
		}
		if (!_66f) {
			$.data(_66d, "treegrid").data = [];
			cc1.empty();
			cc2.empty();
		}
		var successFlag = true
		if (opts.dataErrorHandler(opts, data)) {
			try {
				data['total'] = 0;
				data['rows'] = [];
			} catch (e) {
				data = {
					total: 0,
					rows: []
				};
			}
			successFlag = false
		}

		if (opts.view.onBeforeRender) {
			opts.view.onBeforeRender.call(opts.view, _66d, _66e, data);
		}
		opts.view.render.call(opts.view, _66d, cc1, true);
		opts.view.render.call(opts.view, _66d, cc2, false);
		if (opts.showFooter) {
			opts.view.renderFooter.call(opts.view, _66d, dc.footer1, true);
			opts.view.renderFooter.call(opts.view, _66d, dc.footer2, false);
		}
		if (opts.view.onAfterRender) {
			opts.view.onAfterRender.call(opts.view, _66d);
		}
		successFlag && opts.onLoadSuccess.call(_66d, node, data);
		if (!_66e && opts.pagination) {
			var _672 = $.data(_66d, "treegrid").total;
			var _673 = $(_66d).datagrid("getPager");
			if (_673.pagination("options").total != _672) {
				_673.pagination({
					total: _672
				});
			}
		}
		_657(_66d);
		_65f(_66d);
		$(_66d).treegrid("autoSizeColumn");
	};

	function _656(_674, _675, _676, _677, _678) {
		var opts = $.data(_674, "treegrid").options;
		var body = $(_674).datagrid("getPanel").find("div.datagrid-body");
		if (_676) {
			//opts.queryParams=_676;
			// modify by famingyuan ,2013/04/15 
			// 增加自定义参数传递  
			// 防止展开数据时 queryParams数据被重置
			opts.queryParams = $.extend({}, opts.queryParams, _676);
		}
		var _679 = $.extend({}, opts.queryParams);
		if (opts.pagination) {
            //zws modify 2016年4月28日16:02:37 增加请求参数自定义
            var _levelName = opts.paginationParamsLevelName;
            var _transferParam = null ;
            var _params = {};
            _params[ opts.pageSizeParamName ] = opts.pageSize ;
            _params[ opts.pageNumberParamName]= opts.pageNumber;

            $.extend(_679, {
                page: opts.pageNumber,
                rows: opts.pageSize
            });

            if (PJF.util.getType(_679.jsonData) == 'string') {
                _transferParam = eval( "(" + _679.jsonData + ")");
            }else{
                if( _679.jsonData == undefined ){
                    _679.jsonData = {};
                    _transferParam = {};
                }else{
                    _transferParam = _679.jsonData;
                }
            }

            if( _levelName == "." ){
                for (var key in _params) {
                    _transferParam[key] = _params[key];
                }
            }else{
                _transferParam[ _levelName ] = _params;
            }

            _679.jsonData = PJF.util.json2str(_transferParam) ;

		}
		if (opts.sortName) {
			$.extend(_679, {
				sort: opts.sortName,
				order: opts.sortOrder
			});
		}
		var row = find(_674, _675);
		if (opts.onBeforeLoad.call(_674, row, _679) == false) {
			return;
		}
		var _67a = body.find("tr[node-id=" + _675 + "] span.tree-folder");
		_67a.addClass("tree-loading");
		$(_674).treegrid("loading");
		// var _67b=opts.loader.call(_674,_679,function(data){
		// _67a.removeClass("tree-loading");
		// $(_674).treegrid("loaded");
		// _66c(_674,_675,data,_677);
		// if(_678){
		// _678();
		// }
		// },function(){
		// _67a.removeClass("tree-loading");
		// $(_674).treegrid("loaded");
		// opts.onLoadError.apply(_674,arguments);
		// if(_678){
		// _678();
		// }
		// });
		// if(_67b==false){
		// _67a.removeClass("tree-loading");
		// $(_674).treegrid("loaded");
		// }
		// modify by famingyuan ,2013/04/23
		// 添加treegrid对 data属性支持
		var _67b = false;
		if (opts.url) {
			_67b = opts.loader.call(_674, _679, function(data) {
				_67a.removeClass("tree-loading");
				$(_674).treegrid("loaded");

				_66c(_674, _675, data, _677);
				if (_678) {
					_678();
				}
			}, function() {
				_67a.removeClass("tree-loading");
				$(_674).treegrid("loaded");
				opts.onLoadError.apply(_674, arguments);
				if (_678) {
					_678();
				}
			});
		} else {
			// 如果传递data属性
			if (opts.data) {
				opts.data = formatTreeGridData(opts.data);
				// 判断是否符合要求的数据..... 
				_67a.removeClass("tree-loading");
				$(_674).treegrid("loaded");
				_66c(_674, _675, opts.data, _677);
				if (_678) {
					_678();
				}
			}
		}

		if (_67b == false) {
			_67a.removeClass("tree-loading");
			$(_674).treegrid("loaded");
		}

		function formatTreeGridData(data) {
			// body...
			return data;
		}
	};

	function _67c(_67d) {
		var rows = _67e(_67d);
		if (rows.length) {
			return rows[0];
		} else {
			return null;
		}
	};

	function _67e(_67f) {
		return $.data(_67f, "treegrid").data;
	};

	function _680(_681, _682) {
		var row = find(_681, _682);
		if (row._parentId) {
			return find(_681, row._parentId);
		} else {
			return null;
		}
	};
	// 搜集节点 expandLevel 对于指定节点来讲 1 表示展开自身 2展开子节点
	function _65b(_683, _684,expandLevel) {
		var opts = $.data(_683, "treegrid").options;
		var body = $(_683).datagrid("getPanel").find("div.datagrid-view2 div.datagrid-body");
		var _685 = [];
		// 当前levelCount
		var levelCount = 0;
		// 最后一层的节点的ID
		var lastExpandLevelNodesIds = [];

		// 单个节点
		if (_684) {
			levelCount = 1;
			_686(_684);
		} else {
			// 不指定节点情况 得到所有的根节点
			var _687 = _67e(_683);
			for (var i = 0; i < _687.length; i++) {
				_685.push(_687[i]);
				levelCount = 1;
				// 循环遍历根节点的子节点
				_686(_687[i][opts.idField]);
			}
		}
		// 纳入子节点
		function _686(_688) {
			levelCount++;
			// 如果指定了 expandLevel 并且 levelCount 大于展开级别 则返回 不再执行搜索操作
			if(expandLevel&&levelCount>expandLevel){
				// 得到下一层节点的ID
				if(_685.length){
					var childrenNodes = _685[_685.length-1].children || [];
					if(childrenNodes.length){
						for(var m=0,n=childrenNodes.length;m<n;m++){
							lastExpandLevelNodesIds.push(childrenNodes[m][opts.idField]);
						}
					}
				}
				return;
			}
			var _689 = find(_683, _688);
			if (_689 && _689.children) {
				for (var i = 0, len = _689.children.length; i < len; i++) {
					var _68a = _689.children[i];
					_685.push(_68a);
					_686(_68a[opts.idField]);
				}
			}
		};

		// 下一层的 节点数据  用于展开到第几层之后  把该层之下的节点收拢
		expandLevel&&$.data(_683, "treegrid_expand_next_level_nodes",lastExpandLevelNodesIds);
		
		return _685;
	};

	function _68b(_68c) {
		var rows = _68d(_68c);
		if (rows.length) {
			return rows[0];
		} else {
			return null;
		}
	};

	function _68d(_68e) {
		var rows = [];
		var _68f = $(_68e).datagrid("getPanel");
		_68f.find("div.datagrid-view2 div.datagrid-body tr.datagrid-row-selected").each(function() {
			var id = $(this).attr("node-id");
			rows.push(find(_68e, id));
		});
		return rows;
	};

	function _690(_691, _692) {
		if (!_692) {
			return 0;
		}
		var opts = $.data(_691, "treegrid").options;
		var view = $(_691).datagrid("getPanel").children("div.datagrid-view");
		var node = view.find("div.datagrid-body tr[node-id=" + _692 + "]").children("td[field=" + opts.treeField + "]");
		return node.find("span.tree-indent,span.tree-hit").length;
	};

	function find(_693, _694) {
		var opts = $.data(_693, "treegrid").options;
		var data = $.data(_693, "treegrid").data;
		var cc = [data];
		while (cc.length) {
			var c = cc.shift();
			for (var i = 0; i < c.length; i++) {
				var node = c[i];
				if (node[opts.idField] == _694) {
					return node;
				} else {
					if (node["children"]) {
						cc.push(node["children"]);
					}
				}
			}
		}
		return null;
	};
	// 折叠
	function _695(_696, _697) {
		var opts = $.data(_696, "treegrid").options;
		var row = find(_696, _697);
		var tr = opts.finder.getTr(_696, _697);
		var hit = tr.find("span.tree-hit");
		if (hit.length == 0) {
			return;
		}
		if (hit.hasClass("tree-collapsed")) {
			return;
		}
		if (opts.onBeforeCollapse.call(_696, row) == false) {
			return;
		}
		hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
		hit.next().removeClass("tree-folder-open");
		row.state = "closed";
		tr = tr.next("tr.treegrid-tr-tree");
		var cc = tr.children("td").children("div");
		if (opts.animate) {
			// 此处存在callBack 回调多次的情况(导致autoSize两次,onExpand等回调被调用多次) 可以酌情优化
			var flag = false;
			cc.slideUp("normal", function() {
				if(opts.enableHighPerformance===true&&flag){
					console.log('skip one time .....');
					return;
				}
				flag = true; // 标示是否已经调整过一次了 highPerformace为true时 取消重复的调整
				$(_696).treegrid("autoSizeColumn");
				_657(_696, _697);
				opts.onCollapse.call(_696, row);
				_65f(_696);
			});
		} else {
			cc.hide();
			$(_696).treegrid("autoSizeColumn");
			_657(_696, _697);
			opts.onCollapse.call(_696, row);
			_65f(_696);
		}
	};

	// 展开
	function _698(_699, _69a) {
		var opts = $.data(_699, "treegrid").options;
		var tr = opts.finder.getTr(_699, _69a);
		var hit = tr.find("span.tree-hit");
		var row = find(_699, _69a);
		if (hit.length == 0) {
			return;
		}
		if (hit.hasClass("tree-expanded")) {
			return;
		}
		if (opts.onBeforeExpand.call(_699, row) == false) {
			return;
		}
		hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
		hit.next().addClass("tree-folder-open");
		var _69b = tr.next("tr.treegrid-tr-tree");
		// 已有 直接展开
		if (_69b.length) {
			var cc = _69b.children("td").children("div");
			_69c(cc);
		} else {
			_665(_699, row[opts.idField]); // 创建子节点容器
			var _69b = tr.next("tr.treegrid-tr-tree");
			var cc = _69b.children("td").children("div");
			cc.hide();
			// 发送交易或者根据本地数据 直接进行加载
			_656(_699, row[opts.idField], {
				id: row[opts.idField]
			}, true, function() {
				if (cc.is(":empty")) {
					_69b.remove();
				} else {
					_69c(cc);
				}
			});
		}

		// 展开
		function _69c(cc) {
			row.state = "open";
			if (opts.animate) {
				// 此处存在callBack 回调多次的情况(导致autoSize两次,onExpand等回调被调用多次) 可以酌情优化
				var flag = false;
				cc.slideDown("normal", function() {
					if(opts.enableHighPerformance===true&&flag){
						console.log('skip one time .....');
						return;
					}
					flag = true;// 标示是否已经调整过一次了 highPerformace为true时 取消重复的调整
					$(_699).treegrid("autoSizeColumn");
					_657(_699, _69a);
					opts.onExpand.call(_699, row);
					_65f(_699);
				});
			} else {
				cc.show();
				$(_699).treegrid("autoSizeColumn");
				_657(_699, _69a);
				opts.onExpand.call(_699, row);
				_65f(_699);
			}
		};
	};

	function _664(_69d, _69e) {
		var opts = $.data(_69d, "treegrid").options;
		var tr = opts.finder.getTr(_69d, _69e);
		var hit = tr.find("span.tree-hit");
		if (hit.hasClass("tree-expanded")) {
			_695(_69d, _69e);
		} else {
			_698(_69d, _69e);
		}
	};

	function _69f(_6a0, _6a1) {
		var opts = $.data(_6a0, "treegrid").options;
		var _6a2 = _65b(_6a0, _6a1);
		if (_6a1) {
			_6a2.unshift(find(_6a0, _6a1));
		}
		for (var i = 0; i < _6a2.length; i++) {
			_695(_6a0, _6a2[i][opts.idField]);
		}
	};

	/*展开指定节点下的所有节点 如果不指定 _6a5 节点 那么将展开从根节点开始展开所有*/
	/**
	 * [_6a3 展开指定节点下的所有节点]
	 * @param  {[type]} _6a4        [description]
	 * @param  {[type]} _6a5        [如果不指定 _6a5 节点 那么将展开从根节点开始展开所有]
	 * @param  {[type]} expandLevel [新加属性 用于指定展开到第几级]
	 * @return {[type]}             [description]
	 */
	function _6a3(_6a4, _6a5,expandLevel) {
		var opts = $.data(_6a4, "treegrid").options;
		// 搜集指定节点下的节点数据
		var _6a6 = _65b(_6a4, _6a5,expandLevel);
		var currentNode = null;
		if (_6a5) {
			currentNode = find(_6a4, _6a5);
			_6a6.unshift(currentNode);
		}
		// 循环展开
		for (var i = 0; i < _6a6.length; i++) {
			// 根据 idField来查找到dom 并展开
			_698(_6a4, _6a6[i][opts.idField]);
		}

	};

	function _6a7(_6a8, _6a9) {
		var opts = $.data(_6a8, "treegrid").options;
		var ids = [];
		var p = _680(_6a8, _6a9);
		while (p) {
			var id = p[opts.idField];
			ids.unshift(id);
			p = _680(_6a8, id);
		}
		for (var i = 0; i < ids.length; i++) {
			_698(_6a8, ids[i]);
		}
	};

	function _6aa(_6ab, _6ac) {
		var opts = $.data(_6ab, "treegrid").options;
		if (_6ac.parent) {
			var tr = opts.finder.getTr(_6ab, _6ac.parent);
			if (tr.next("tr.treegrid-tr-tree").length == 0) {
				_665(_6ab, _6ac.parent);
			}
			var cell = tr.children("td[field=" + opts.treeField + "]").children("div.datagrid-cell");
			var _6ad = cell.children("span.tree-icon");
			if (_6ad.hasClass("tree-file")) {
				_6ad.removeClass("tree-file").addClass("tree-folder");
				var hit = $("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_6ad);
				if (hit.prev().length) {
					hit.prev().remove();
				}
			}
		}
		_66c(_6ab, _6ac.parent, _6ac.data, true);
	};

	function _6ae(_6af, _6b0) {
		var ref = _6b0.before || _6b0.after;
		var opts = $.data(_6af, "treegrid").options;
		var _6b1 = _680(_6af, ref);
		_6aa(_6af, {
			parent: (_6b1 ? _6b1[opts.idField] : null),
			data: [_6b0.data]
		});
		_6b2(true);
		_6b2(false);
		_65f(_6af);

		function _6b2(_6b3) {
			var _6b4 = _6b3 ? 1 : 2;
			var tr = opts.finder.getTr(_6af, _6b0.data[opts.idField], "body", _6b4);
			var _6b5 = tr.closest("table.datagrid-btable");
			tr = tr.parent().children();
			var dest = opts.finder.getTr(_6af, ref, "body", _6b4);
			if (_6b0.before) {
				tr.insertBefore(dest);
			} else {
				var sub = dest.next("tr.treegrid-tr-tree");
				tr.insertAfter(sub.length ? sub : dest);
			}
			_6b5.remove();
		};
	};

	function _6b6(_6b7, _6b8) {
		var opts = $.data(_6b7, "treegrid").options;
		var tr = opts.finder.getTr(_6b7, _6b8);
		tr.next("tr.treegrid-tr-tree").remove();
		tr.remove();
		var _6b9 = del(_6b8);
		if (_6b9) {
			if (_6b9.children.length == 0) {
				tr = opts.finder.getTr(_6b7, _6b9[opts.idField]);
				tr.next("tr.treegrid-tr-tree").remove();
				var cell = tr.children("td[field=" + opts.treeField + "]").children("div.datagrid-cell");
				cell.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
				cell.find(".tree-hit").remove();
				$("<span class=\"tree-indent\"></span>").prependTo(cell);
			}
		}
		_65f(_6b7);

		function del(id) {
			var cc;
			var _6ba = _680(_6b7, _6b8);
			if (_6ba) {
				cc = _6ba.children;
			} else {
				cc = $(_6b7).treegrid("getData");
			}
			for (var i = 0; i < cc.length; i++) {
				if (cc[i][opts.idField] == id) {
					cc.splice(i, 1);
					break;
				}
			}
			return _6ba;
		};
	};
	$.fn.treegrid = function(_6bb, _6bc,moreParams) {
		if (typeof _6bb == "string") {
			var _6bd = $.fn.treegrid.methods[_6bb];
			if (_6bd) {
				return _6bd(this, _6bc,moreParams);
			} else {
				return this.datagrid(_6bb, _6bc);
			}
		}
		_6bb = _6bb || {};
		return this.each(function() {
			var _6be = $.data(this, "treegrid");
			if (_6be) {
				$.extend(_6be.options, _6bb);
			} else {
				/*添加treegrid类型标志 以便在datagrid中区分出当前是何种类型(由于treegrid的数据源和grid的数据源不一样)*/
				$.data(this, "treegrid", {
					options: $.extend({}, $.fn.treegrid.defaults, $.fn.treegrid.parseOptions(this), _6bb, {
						type_flag: 'treegrid'
					}),
					data: []
				});
			}
			_63f(this);
			_656(this);
			_661(this);
		});
	};
	$.fn.treegrid.methods = {
		options: function(jq) {
			return $.data(jq[0], "treegrid").options;
		},
		resize: function(jq, _6bf) {
			return jq.each(function() {
				$(this).datagrid("resize", _6bf);
			});
		},
		fixRowHeight: function(jq, _6c0) {
			return jq.each(function() {
				_657(this, _6c0);
			});
		},
		loadData: function(jq, data) {
			return jq.each(function() {
				_66c(this, null, data);
			});
		},
		reload: function(jq, id) {
			return jq.each(function() {
				if (id) {
					var node = $(this).treegrid("find", id);
					if (node.children) {
						node.children.splice(0, node.children.length);
					}
					var body = $(this).datagrid("getPanel").find("div.datagrid-body");
					var tr = body.find("tr[node-id=" + id + "]");
					tr.next("tr.treegrid-tr-tree").remove();
					var hit = tr.find("span.tree-hit");
					hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
					_698(this, id);
				} else {
					_656(this, null, {});
				}
			});
		},
		loadFirstPage:function(jq){
			return jq.each(function(){
				var opts = $(this).treegrid('options');
           		opts.pageNumber = 1;
           		var pager = $(this).treegrid('getPager');
           		pager.pagination({
					pageNumber: 1
				});
				_656(this,null,{});
			})
		},
		reloadFooter: function(jq, _6c1) {
			return jq.each(function() {
				var opts = $.data(this, "treegrid").options;
				var dc = $.data(this, "datagrid").dc;
				if (_6c1) {
					$.data(this, "treegrid").footer = _6c1;
				}
				if (opts.showFooter) {
					opts.view.renderFooter.call(opts.view, this, dc.footer1, true);
					opts.view.renderFooter.call(opts.view, this, dc.footer2, false);
					if (opts.view.onAfterRender) {
						opts.view.onAfterRender.call(opts.view, this);
					}
					$(this).treegrid("fixRowHeight");
				}
			});
		},
		loading: function(jq) {
			return jq.each(function() {
				$(this).datagrid("loading");
			});
		},
		loaded: function(jq) {
			return jq.each(function() {
				$(this).datagrid("loaded");
			});
		},
		getData: function(jq) {
			return $.data(jq[0], "treegrid").data;
		},
		getFooterRows: function(jq) {
			return $.data(jq[0], "treegrid").footer;
		},
		getRoot: function(jq) {
			return _67c(jq[0]);
		},
		getRoots: function(jq) {
			return _67e(jq[0]);
		},
		getParent: function(jq, id) {
			return _680(jq[0], id);
		},
		getChildren: function(jq, id) {
			return _65b(jq[0], id);
		},
		getSelected: function(jq) {
			return _68b(jq[0]);
		},
		getSelections: function(jq) {
			return _68d(jq[0]);
		},
		getLevel: function(jq, id) {
			return _690(jq[0], id);
		},
		find: function(jq, id) {
			return find(jq[0], id);
		},
		isLeaf: function(jq, id) {
			var opts = $.data(jq[0], "treegrid").options;
			var tr = opts.finder.getTr(jq[0], id);
			var hit = tr.find("span.tree-hit");
			return hit.length == 0;
		},
		select: function(jq, id) {
			return jq.each(function() {
				$(this).datagrid("selectRow", id);
			});
		},
		unselect: function(jq, id) {
			return jq.each(function() {
				$(this).datagrid("unselectRow", id);
			});
		},
		collapse: function(jq, id) {
			return jq.each(function() {
				_695(this, id);
			});
		},
		expand: function(jq, id) {
			return jq.each(function() {
				_698(this, id);
			});
		},
		toggle: function(jq, id) {
			return jq.each(function() {
				_664(this, id);
			});
		},
		collapseAll: function(jq, id) {
			return jq.each(function() {
				_69f(this, id);
			});
		},
		expandAll: function(jq, id,expandLevel) {
			return jq.each(function() {
				_6a3(this, id,expandLevel);
			});
		},
		expandTo: function(jq, id) {
			return jq.each(function() {
				_6a7(this, id);
			});
		},
		append: function(jq, _6c2) {
			return jq.each(function() {
				_6aa(this, _6c2);
			});
		},
		insert: function(jq, _6c3) {
			return jq.each(function() {
				_6ae(this, _6c3);
			});
		},
		remove: function(jq, id) {
			return jq.each(function() {
				_6b6(this, id);
			});
		},
		pop: function(jq, id) {
			var row = jq.treegrid("find", id);
			jq.treegrid("remove", id);
			return row;
		},
		refresh: function(jq, id) {
			return jq.each(function() {
				var opts = $.data(this, "treegrid").options;
				opts.view.refreshRow.call(opts.view, this, id);
			});
		},
		update: function(jq, _6c4) {
			return jq.each(function() {
				var opts = $.data(this, "treegrid").options;
				opts.view.updateRow.call(opts.view, this, _6c4.id, _6c4.row);
			});
		},
		beginEdit: function(jq, id) {
			return jq.each(function() {
				$(this).datagrid("beginEdit", id);
				$(this).treegrid("fixRowHeight", id);
			});
		},
		endEdit: function(jq, id) {
			return jq.each(function() {
				$(this).datagrid("endEdit", id);
			});
		},
		cancelEdit: function(jq, id) {
			return jq.each(function() {
				$(this).datagrid("cancelEdit", id);
			});
		}
	};
	$.fn.treegrid.parseOptions = function(_6c5) {
		return $.extend({}, $.fn.datagrid.parseOptions(_6c5), $.parser.parseOptions(_6c5, ["treeField", {
			animate: "boolean"
		}]));
	};
	var _6c6 = $.extend({}, $.fn.datagrid.defaults.view, {
		render: function(_6c7, _6c8, _6c9) {
			var opts = $.data(_6c7, "treegrid").options;
			var _6ca = $(_6c7).datagrid("getColumnFields", _6c9);
			var _6cb = $.data(_6c7, "datagrid").rowIdPrefix;
			if (_6c9) {
				if (!(opts.rownumbers || (opts.frozenColumns && opts.frozenColumns.length))) {
					return;
				}
			}
			var view = this;
			var _6cc = _6cd(_6c9, this.treeLevel, this.treeNodes);
			$(_6c8).append(_6cc.join(""));

			function _6cd(_6ce, _6cf, _6d0) {
				var _6d1 = ["<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
				for (var i = 0; i < _6d0.length; i++) {
					var row = _6d0[i];
					if (row.state != "open" && row.state != "closed") {
						row.state = "open";
					}
					var _6d2 = opts.rowStyler ? opts.rowStyler.call(_6c7, row) : "";
					var _6d3 = _6d2 ? "style=\"" + _6d2 + "\"" : "";
					var _6d4 = _6cb + "-" + (_6ce ? 1 : 2) + "-" + row[opts.idField];
					_6d1.push("<tr id=\"" + _6d4 + "\" class=\"datagrid-row\" node-id=" + row[opts.idField] + " " + _6d3 + ">");
					_6d1 = _6d1.concat(view.renderRow.call(view, _6c7, _6ca, _6ce, _6cf, row));
					_6d1.push("</tr>");
					if (row.children && row.children.length) {
						var tt = _6cd(_6ce, _6cf + 1, row.children);
						var v = row.state == "closed" ? "none" : "block";
						_6d1.push("<tr class=\"treegrid-tr-tree\"><td style=\"border:0px\" colspan=" + (_6ca.length + (opts.rownumbers ? 1 : 0)) + "><div style=\"display:" + v + "\">");
						_6d1 = _6d1.concat(tt);
						_6d1.push("</div></td></tr>");
					}
				}
				_6d1.push("</tbody></table>");
				return _6d1;
			};
		},
		renderFooter: function(_6d5, _6d6, _6d7) {
			var opts = $.data(_6d5, "treegrid").options;
			var rows = $.data(_6d5, "treegrid").footer || [];
			var _6d8 = $(_6d5).datagrid("getColumnFields", _6d7);
			var _6d9 = ["<table class=\"datagrid-ftable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				row[opts.idField] = row[opts.idField] || ("foot-row-id" + i);
				_6d9.push("<tr class=\"datagrid-row\" node-id=" + row[opts.idField] + ">");
				_6d9.push(this.renderRow.call(this, _6d5, _6d8, _6d7, 0, row));
				_6d9.push("</tr>");
			}
			_6d9.push("</tbody></table>");
			$(_6d6).html(_6d9.join(""));
		},
		renderRow: function(_6da, _6db, _6dc, _6dd, row) {
			var opts = $.data(_6da, "treegrid").options;
			var cc = [];
			if (_6dc && opts.rownumbers) {
				cc.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">0</div></td>");
			}
			for (var i = 0; i < _6db.length; i++) {
				var _6de = _6db[i];
				var col = $(_6da).datagrid("getColumnOption", _6de);
				if (col) {
					var _6df = col.styler ? (col.styler(row[_6de], row) || "") : "";
					var _6e0 = col.hidden ? "style=\"display:none;" + _6df + "\"" : (_6df ? "style=\"" + _6df + "\"" : "");
					cc.push("<td field=\"" + _6de + "\" " + _6e0 + ">");
					if (col.checkbox) {
						var _6e0 = "";
					} else {
						var _6e0 = "";
						_6e0 += "text-align:" + (col.align || "left") + ";";
						if (!opts.nowrap) {
							_6e0 += "white-space:normal;height:auto;";
						} else {
							if (opts.autoRowHeight) {
								_6e0 += "height:auto;";
							}
						}
					}
					cc.push("<div style=\"" + _6e0 + "\" ");
					if (col.checkbox) {
						cc.push("class=\"datagrid-cell-check ");
					} else {
						cc.push("class=\"datagrid-cell " + col.cellClass);
					}
					cc.push("\">");
					if (col.checkbox) {
						if (row.checked) {
							cc.push("<input type=\"checkbox\" checked=\"checked\"");
						} else {
							cc.push("<input type=\"checkbox\"");
						}
						if(col.formatter){
							var checkboxStatus = col.formatter(row[_6de], row);
							if(checkboxStatus===false){
								cc.push(" disabled=\"true\" ");
							}
						}
						cc.push(" name=\"" + _6de + "\" value=\"" + (row[_6de] != undefined ? row[_6de] : "") + "\"/>");
					} else {
						var val = null;
						if (col.formatter) {
							val = col.formatter(row[_6de], row);
						} else {
							val = row[_6de];
						}
						if (_6de == opts.treeField) {
							for (var j = 0; j < _6dd; j++) {
								cc.push("<span class=\"tree-indent\"></span>");
							}
							if (row.state == "closed") {
								cc.push("<span class=\"tree-hit tree-collapsed\"></span>");
								cc.push("<span class=\"tree-icon tree-folder " + (row.iconCls ? row.iconCls : "") + "\"></span>");
							} else {
								if (row.children && row.children.length) {
									cc.push("<span class=\"tree-hit tree-expanded\"></span>");
									cc.push("<span class=\"tree-icon tree-folder tree-folder-open " + (row.iconCls ? row.iconCls : "") + "\"></span>");
								} else {
									// 删除多余的间隔  2015-03-27 famingyuan
									// 不删除了 2017-10-12 shenye
									cc.push("<span class=\"tree-indent\"></span>");
									cc.push("<span class=\"tree-icon tree-file " + (row.iconCls ? row.iconCls : "") + "\"></span>");
								}
							}
							cc.push("<span class=\"tree-title\">" + val + "</span>");
						} else {
							cc.push(val);
						}
					}
					cc.push("</div>");
					cc.push("</td>");
				}
			}
			return cc.join("");
		},
		refreshRow: function(_6e1, id) {
			this.updateRow.call(this, _6e1, id, {});
		},
		updateRow: function(_6e2, id, row) {
			var opts = $.data(_6e2, "treegrid").options;
			var _6e3 = $(_6e2).treegrid("find", id);
			$.extend(_6e3, row);
			var _6e4 = $(_6e2).treegrid("getLevel", id) - 1;
			var _6e5 = opts.rowStyler ? opts.rowStyler.call(_6e2, _6e3) : "";

			function _6e6(_6e7) {
				var _6e8 = $(_6e2).treegrid("getColumnFields", _6e7);
				var tr = opts.finder.getTr(_6e2, id, "body", (_6e7 ? 1 : 2));
				var _6e9 = tr.find("div.datagrid-cell-rownumber").html();
				var _6ea = tr.find("div.datagrid-cell-check input[type=checkbox]").is(":checked");
				tr.html(this.renderRow(_6e2, _6e8, _6e7, _6e4, _6e3));
				tr.attr("style", _6e5 || "");
				tr.find("div.datagrid-cell-rownumber").html(_6e9);
				if (_6ea) {
					tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked", true);
				}
			};
			_6e6.call(this, true);
			_6e6.call(this, false);
			$(_6e2).treegrid("fixRowHeight", id);
		},
		onBeforeRender: function(_6eb, _6ec, data) {
			if (!data) {
				return false;
			}
			var opts = $.data(_6eb, "treegrid").options;
			if (data.length == undefined) {
				if (data.footer) {
					$.data(_6eb, "treegrid").footer = data.footer;
				}

                //zws modify ,自定义rowsPath totalPath 路径
                var _rowsPath = "data." + opts['rowsPath'] ;
                var _rows = [];
                try{
                    _rows = eval("(" + _rowsPath + ")");
                    _rows = (_rows == undefined) ? [] : _rows ;
                }catch(e){
                    console.warn("----看上去无法解析到具体数据，请检查rowsPath");
                    _rows = [] ;
                }

                var _totalPath = "data." + opts['totalPath'] ;
                var _total = 0 ;
                try{
                    _total = eval("(" + _totalPath + ")");
                    _total = (_total == undefined) ? _rows.length : _total ;
                }catch(e){
                    console.warn("----看上去无法解析到总数量，请检查totalPath");
                    _total = _rows.length ;
                }

                $.data(_6eb, "treegrid").total = _total ;
				data = this.transfer(_6eb, _6ec, _rows );

            } else {
				function _6ed(_6ee, _6ef) {
					for (var i = 0; i < _6ee.length; i++) {
						var row = _6ee[i];
						row._parentId = _6ef;
						if (row.children && row.children.length) {
							_6ed(row.children, row[opts.idField]);
						}
					}
				};
				_6ed(data, _6ec);
			}
			var node = find(_6eb, _6ec);
			if (node) {
				if (node.children) {
					node.children = node.children.concat(data);
				} else {
					node.children = data;
				}
			} else {
				$.data(_6eb, "treegrid").data = $.data(_6eb, "treegrid").data.concat(data);
			}
			if (!opts.remoteSort) {
				this.sort(_6eb, data);
			}
			this.treeNodes = data;
			this.treeLevel = $(_6eb).treegrid("getLevel", _6ec);
		},
		sort: function(_6f0, data) {
			var opts = $.data(_6f0, "treegrid").options;
			var opt = $(_6f0).treegrid("getColumnOption", opts.sortName);
			if (opt) {
				var _6f1 = opt.sorter || function(a, b) {
						return (a > b ? 1 : -1);
					};
				_6f2(data);
			}

			function _6f2(rows) {
				rows.sort(function(r1, r2) {
					return _6f1(r1[opts.sortName], r2[opts.sortName]) * (opts.sortOrder == "asc" ? 1 : -1);
				});
				for (var i = 0; i < rows.length; i++) {
					var _6f3 = rows[i].children;
					if (_6f3 && _6f3.length) {
						_6f2(_6f3);
					}
				}
			};
		},
		transfer: function(_6f4, _6f5, data) {
			var opts = $.data(_6f4, "treegrid").options;
			var rows = [];
			for (var i = 0; i < data.length; i++) {
				rows.push(data[i]);
			}
			var _6f6 = [];
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				if (!_6f5) {
					if (!row._parentId) {
						_6f6.push(row);
						_63d(rows, row);
						i--;
					}
				} else {
					if (row._parentId == _6f5) {
						_6f6.push(row);
						_63d(rows, row);
						i--;
					}
				}
			}
			var toDo = [];
			for (var i = 0; i < _6f6.length; i++) {
				toDo.push(_6f6[i]);
			}
			while (toDo.length) {
				var node = toDo.shift();
				for (var i = 0; i < rows.length; i++) {
					var row = rows[i];
					if (row._parentId == node[opts.idField]) {
						if (node.children) {
							node.children.push(row);
						} else {
							node.children = [row];
						}
						toDo.push(row);
						_63d(rows, row);
						i--;
					}
				}
			}
			return _6f6;
		}
	});
	$.fn.treegrid.defaults = $.extend({}, $.fn.datagrid.defaults, {
		treeField: null,
		animate: false,
		singleSelect: true,
		view: _6c6,
		loader: function(_6f7, _6f8, _6f9) {
			var me = this;
			var opts = $(this).treegrid("options");
			if (!opts.url) {
				return false;
			}
			/*
			$.ajax({
				type: opts.method,
				url: opts.url,
				data: _6f7,
				dataType: "json",
				success: function(data) {
					_6f8(data);
				},
				error: function() {
					_6f9.apply(this, arguments);
				}
			});
			*/
			var conf = {
				//请求地址
				url: opts.url,
				//默认为json格式
				dataType: opts.dataType,
				//传递的数据
				data: _6f7,
				/*是否加入操作员信息 默认为true*/
				safe:(opts.safe===undefined?true:opts.safe),
				//同步模式：默认为异步
				async: true,
				//默认为post
				type: opts.method,
				//默认为10秒
				timeout: opts.timeout,
				success: function(data) {
					if(data&&data._val_page){
						var cancelCallback = function(){
							//关闭loading状态
							$(me).treegrid("loaded");
						}						
						//打开授权页面
						PJF.communication.handleAuthResource(data,conf,cancelCallback);						
             			//授权成功后的回调函数
             			PJF.loadResource.PJF_LOAD_RESOURCES_CALLBACK = function(){
             				PJF.communication.cpsJsonReqResend();
             			}   
					}
					else{
						_6f8(data);
					}					
				},
				//通信失败回调函数
				failure: function() {
					_6f9.apply(this, arguments);
				}
			}
			/*修改treegrid发送请求方式为PJF.communication.ajax*/
			PJF.communication.ajax(conf);
		},
		loadFilter: function(data, _6fa) {
			return data;
		},
		finder: {
			getTr: function(_6fb, id, type, _6fc) {
				type = type || "body";
				_6fc = _6fc || 0;
				var dc = $.data(_6fb, "datagrid").dc;
				if (_6fc == 0) {
					var opts = $.data(_6fb, "treegrid").options;
					var tr1 = opts.finder.getTr(_6fb, id, type, 1);
					var tr2 = opts.finder.getTr(_6fb, id, type, 2);
					return tr1.add(tr2);
				} else {
					if (type == "body") {
						var tr = $("#" + $.data(_6fb, "datagrid").rowIdPrefix + "-" + _6fc + "-" + id);
						if (!tr.length) {
							tr = (_6fc == 1 ? dc.body1 : dc.body2).find("tr[node-id=" + id + "]");
						}
						return tr;
					} else {
						if (type == "footer") {
							return (_6fc == 1 ? dc.footer1 : dc.footer2).find("tr[node-id=" + id + "]");
						} else {
							if (type == "selected") {
								return (_6fc == 1 ? dc.body1 : dc.body2).find("tr.datagrid-row-selected");
							} else {
								if (type == "last") {
									return (_6fc == 1 ? dc.body1 : dc.body2).find("tr:last[node-id]");
								} else {
									if (type == "allbody") {
										return (_6fc == 1 ? dc.body1 : dc.body2).find("tr[node-id]");
									} else {
										if (type == "allfooter") {
											return (_6fc == 1 ? dc.footer1 : dc.footer2).find("tr[node-id]");
										}
									}
								}
							}
						}
					}
				}
			},
			getRow: function(_6fd, id) {
				return $(_6fd).treegrid("find", id);
			}
		},
		onBeforeLoad: function(row, _6fe) {},
		onLoadSuccess: function(row, data) {},
		onLoadError: function() {},
		onBeforeCollapse: function(row) {},
		onCollapse: function(row) {},
		onBeforeExpand: function(row) {},
		onExpand: function(row) {},
		onClickRow: function(row) {},
		onDblClickRow: function(row) {},
		onClickCell: function(_6ff, row) {},
		onDblClickCell: function(_700, row) {},
		onContextMenu: function(e, row) {},
		onBeforeEdit: function(row) {},
		onAfterEdit: function(row, _701) {},
		onCancelEdit: function(row) {}
	});
})(jQuery);
(function($) {
	function _702(_703, _704) {
		var opts = $.data(_703, "combo").options;
		var _705 = $.data(_703, "combo").combo;
		var _706 = $.data(_703, "combo").panel;
		if (_704) {
			opts.width = _704;
		}
		_705.appendTo("body");
		if (isNaN(opts.width)) {
			opts.width = _705.find("input.combo-text").outerWidth();
		}
		var _707 = 0;
		if (opts.hasDownArrow) {
			_707 = _705.find(".combo-arrow").outerWidth();
		}
		_705.find("input.combo-text").width(0);
		_705._outerWidth(opts.width);
		_705.find("input.combo-text").width(_705.width() - _707);
		_706.panel("resize", {
			width: (opts.panelWidth ? opts.panelWidth : _705.outerWidth()),
			height: opts.panelHeight
		});
		_705.insertAfter(_703);
	};

	function _708(_709) {
		var opts = $.data(_709, "combo").options;
		var _70a = $.data(_709, "combo").combo;
		if (opts.hasDownArrow) {
			_70a.find(".combo-arrow").show();
		} else {
			_70a.find(".combo-arrow").hide();
		}
	};

	function init(_70b) {
		$(_70b).addClass("combo-f").hide();
		var span = $("<span class=\"combo\"></span>").insertAfter(_70b);
		//填加combo的inputborder样式style=\"border:0 none;\"，保证combo框内的input边框宽度0-xfc
		var _70c = $("<input type=\"text\" class=\"combo-text \" style=\"border:0 none;\">").appendTo(span);
		$("<span><span class=\"combo-arrow\"></span></span>").appendTo(span);
		$("<input type=\"hidden\" class=\"combo-value\">").appendTo(span);
		var _70d = $("<div class=\"combo-panel\"></div>").appendTo("body");
		_70d.panel({
			doSize: false,
			closed: true,
			cls: "combo-p",
			style: {
				position: "absolute",
				zIndex: 10
			},
			onOpen: function() {
				$(this).panel("resize");
			}
		});
		var name = $(_70b).attr("name");
		if (name) {
			span.find("input.combo-value").attr("name", name);
			$(_70b).removeAttr("name").attr("comboName", name);
		}
		_70c.attr("autocomplete", "off");
		return {
			combo: span,
			panel: _70d
		};
	};

	function _70e(_70f) {
		var _710 = $.data(_70f, "combo").combo.find("input.combo-text");
		_710.validatebox("destroy");
		$.data(_70f, "combo").panel.panel("destroy");
		$.data(_70f, "combo").combo.remove();
		$(_70f).remove();
	};

	function _711(_712) {
		var _713 = $.data(_712, "combo");
		var opts = _713.options;
		var _714 = $.data(_712, "combo").combo;
		var _715 = $.data(_712, "combo").panel;
		var _716 = _714.find(".combo-text");
		var _717 = _714.find(".combo-arrow");
		$(document).unbind(".combo").bind("mousedown.combo", function(e) {
			var _718 = $("body>div.combo-p>div.combo-panel");
			var p = $(e.target).closest("div.combo-panel", _718);
			if (p.length) {
				return;
			}
			_718.panel("close");
		});
		_714.unbind(".combo");
		_715.unbind(".combo");
		_716.unbind(".combo");
		_717.unbind(".combo");
		if (!opts.disabled) {
			//dateinput多选  linguoyong 2013.2.27
			if (opts.muti != true) {
				//dateinput组件 KEYBOARD_ENABLE==true时，enter换成tab　linguoyong 2013.3.28
				if (PJF.constants.KEYBOARD_ENABLE) {
					//当onlyMonth为true时取消键盘操作功能  linguoyong  2013.5.7
					if (!opts.onlyMonth) {　
						_716.bind("mousedown.combo", function(e) {
							e.stopPropagation();
						}).bind("keydown.combo", function(e) {
							switch (e.keyCode) {
								case 38:
									opts.keyHandler.up.call(_712);
									break;
								case 40:
									opts.keyHandler.down.call(_712);
									break;
								case 9:
								case 27:
									_71f(_712);
									break;
								default:
									if (opts.editable) {
										if (_713.timer) {
											clearTimeout(_713.timer);
										}
										_713.timer = setTimeout(function() {
											var q = _716.val();
											if (_713.previousValue != q) {
												_713.previousValue = q;
												opts.keyHandler.query.call(_712, _716.val());
												_722(_712, true);
											}
										}, opts.delay);
									}
							}
						});
					}
					_717.bind("click.combo", function() {
						if (_715.is(":visible")) {
							_71f(_712);
						} else {
							$("div.combo-panel").panel("close");
							_719(_712);
						}
						if (opts.onlyMonth) {
							$(_715).find(".calendar-prevyear").remove();
							$(_715).find(".calendar-prevmonth").remove();
							$(_715).find(".calendar-nextyear").remove();
							$(_715).find(".calendar-prevyear").remove();
							var menu = $(_715).find(".calendar-menu");
							menu.removeAttr('style');
							var body = $(_715).find("div.calendar-body");
							body.find(">table").remove();

							var monthInner = menu.find(".calendar-menu-month-inner");
							monthInner.css("height", menu.height() - 30);
							menu.show();
						}

						_716.focus();
					}).bind("mouseenter.combo", function() {
						$(this).addClass("combo-arrow-hover");
					}).bind("mouseleave.combo", function() {
						$(this).removeClass("combo-arrow-hover");
					}).bind("mousedown.combo", function() {
						return false;
					});
				} else {
					//当onlyMonth为true时取消键盘操作功能  linguoyong  2013.5.7
					if (!opts.onlyMonth) {
						_716.bind("mousedown.combo", function(e) {
							e.stopPropagation();
						}).bind("keydown.combo", function(e) {
							switch (e.keyCode) {
								case 38:
									opts.keyHandler.up.call(_712);
									break;
								case 40:
									opts.keyHandler.down.call(_712);
									break;
								case 13:
									e.preventDefault();
									//opts.keyHandler.enter.call(_712); 注日期按回车键则录入当前日期　lgy 2013.6.6
									return false;
								case 9:
								case 27:
									_71f(_712);
									break;
								default:
									if (opts.editable) {
										if (_713.timer) {
											clearTimeout(_713.timer);
										}
										_713.timer = setTimeout(function() {
											var q = _716.val();
											if (_713.previousValue != q) {
												_713.previousValue = q;
												/*
												 * 判定只有在日期datespan和dateinput时再input框输入时弹出combo框
												 * lgy 2013.12.30
												 */
												if(!opts.dateFlag){
													_719(_712);
												}
												opts.keyHandler.query.call(_712, _716.val());
												_722(_712, true);
											}
										}, opts.delay);
									}
							}
						});
					} else {
						_716.bind("mousedown.combo", function(e) {
							e.stopPropagation();
						}).bind("keydown.combo", function(e) {
							if (opts.editable) {
								if (_713.timer) {
									clearTimeout(_713.timer);
								}
								_713.timer = setTimeout(function() {
									var q = _716.val();
									if (_713.previousValue != q) {
										_713.previousValue = q;
										opts.keyHandler.query.call(_712, _716.val());
										_722(_712, true);
									}
								}, opts.delay);
							}
						});

					}
					_717.bind("click.combo", function() {
						if (_715.is(":visible")) {
							_71f(_712);
						} else {
							$("div.combo-panel").panel("close");
							_719(_712);
						}
						if (opts.onlyMonth) {
							$(_715).find(".calendar-nextmonth").remove();
							$(_715).find(".calendar-prevmonth").remove();
							$(_715).find(".calendar-nextyear").remove();
							$(_715).find(".calendar-prevyear").remove();
							var menu = $(_715).find(".calendar-menu");
							menu.removeAttr('style');
							var body = $(_715).find("div.calendar-body");
							body.find(">table").remove();

							var monthInner = menu.find(".calendar-menu-month-inner");
							monthInner.css("height", menu.height() - 30);
							menu.show();
						}

						_716.focus();
					}).bind("mouseenter.combo", function() {
						$(this).addClass("combo-arrow-hover");
					}).bind("mouseleave.combo", function() {
						$(this).removeClass("combo-arrow-hover");
					}).bind("mousedown.combo", function() {
						return false;
					});

				}
			} else {
				_717.bind("click.combo", function() {
					if (_715.is(":visible")) {
						_71f(_712);
					} else {
						$("div.combo-panel").panel("close");
						_719(_712);
					}
					_716.focus();
				}).bind("mouseenter.combo", function() {
					$(this).addClass("combo-arrow-hover");
				}).bind("mouseleave.combo", function() {
					$(this).removeClass("combo-arrow-hover");
				}).bind("mousedown.combo", function() {
					return false;
				})
			}
		}
	};

	function _719(_71a) {
		var opts = $.data(_71a, "combo").options;
		var _71b = $.data(_71a, "combo").combo;
		var _71c = $.data(_71a, "combo").panel;
		if ($.fn.window) {
			_71c.panel("panel").css("z-index", $.fn.window.defaults.zIndex++);
		}
		if($.browser.safari){
			_71c.panel("move", {
				left: _71b.offset().left,
				top: _71d()
			});
			_71c.panel("open");
			opts.onShowPanel.call(_71a);
			(function() {
				if (_71c.is(":visible")) {
					_71c.panel("move", {
						left: _71e(),
						top: _71d()
					});
					setTimeout(arguments.callee, 200);
				}
			})();
		}
		else{
			_71c.panel("move", {
				left: _71b.offset().left+$(document.body).scrollLeft(),
				top: _71d()+$(document.body).scrollTop()
			});
			_71c.panel("open");
			opts.onShowPanel.call(_71a);
			(function() {
				if (_71c.is(":visible")) {
					_71c.panel("move", {
						left: _71e()+$(document.body).scrollLeft(),
						top: _71d()+$(document.body).scrollTop()
					});
					setTimeout(arguments.callee, 200);
				}
			})();
		}

		function _71e() {
			var left = _71b.offset().left;
			if (left + _71c._outerWidth() > $(window)._outerWidth() + $(document).scrollLeft()) {
				left = $(window)._outerWidth() + $(document).scrollLeft() - _71c._outerWidth();
			}
			if (left < 0) {
				left = 0;
			}
			return left;
		};

		function _71d() {
			var top = _71b.offset().top + _71b._outerHeight();
			if (top + _71c._outerHeight() > $(window)._outerHeight() + $(document).scrollTop()) {
				top = _71b.offset().top - _71c._outerHeight();
			}
			if (top < $(document).scrollTop()) {
				top = _71b.offset().top + _71b._outerHeight();
			}
			return top;
		};
	};

	function _71f(_720) {
		var opts = $.data(_720, "combo").options;
		var _721 = $.data(_720, "combo").panel;
		_721.panel("close");
		opts.onHidePanel.call(_720);
	};

	function _722(_723, doit) {
		var opts = $.data(_723, "combo").options;
		var _724 = $.data(_723, "combo").combo.find("input.combo-text");
		_724.validatebox(opts);
		if (doit) {
			_724.validatebox("validate");
		}
	};

	function _725(_726, _727) {
		var opts = $.data(_726, "combo").options;
		var _728 = $.data(_726, "combo").combo;
		if (_727) {
			opts.disabled = true;
			$(_726).attr("disabled", true);
			_728.find(".combo-value").attr("disabled", true);
			_728.find(".combo-text").attr("disabled", true);
		} else {
			opts.disabled = false;
			$(_726).removeAttr("disabled");
			_728.find(".combo-value").removeAttr("disabled");
			_728.find(".combo-text").removeAttr("disabled");
		}
	};

	function _729(_72a) {
		var opts = $.data(_72a, "combo").options;
		var _72b = $.data(_72a, "combo").combo;
		if (opts.multiple) {
			_72b.find("input.combo-value").remove();
		} else {
			_72b.find("input.combo-value").val("");
		}
		_72b.find("input.combo-text").val("");
	};

	function _72c(_72d) {
		var _72e = $.data(_72d, "combo").combo;
		return _72e.find("input.combo-text").val();
	};

	function _72f(_730, text) {
		var _731 = $.data(_730, "combo").combo;
		//dateinput多选日期拼装   linguoyong 2013.2.27
		var optns = $.data(_730, "combo").options
		if (optns.muti == true) {
			var prevText = _731.find("input.combo-text").val();
			if (prevText) {
				_731.find("input.combo-text").val(prevText + "," + text);
				_731.find("input.combo-value").val(prevText + "," + text);
			} else {
				_731.find("input.combo-text").val(text);
			}
		} else {
			_731.find("input.combo-text").val(text);
			_722(_730, true);
			$.data(_730, "combo").previousValue = text;
		}
	};

	function _732(_733) {
		var _734 = [];
		var _735 = $.data(_733, "combo").combo;
		_735.find("input.combo-value").each(function() {
			_734.push($(this).val());
		});
		return _734;
	};

	function _736(_737, _738) {
		var opts = $.data(_737, "combo").options;
		var _739 = _732(_737);
		var _73a = $.data(_737, "combo").combo;
		_73a.find("input.combo-value").remove();
		var name = $(_737).attr("comboName");
		for (var i = 0; i < _738.length; i++) {
			var _73b = $("<input type=\"hidden\" class=\"combo-value\">").appendTo(_73a);
			if (name) {
				_73b.attr("name", name);
			}
			_73b.val(_738[i]);
		}
		var tmp = [];
		for (var i = 0; i < _739.length; i++) {
			tmp[i] = _739[i];
		}
		var aa = [];
		for (var i = 0; i < _738.length; i++) {
			for (var j = 0; j < tmp.length; j++) {
				if (_738[i] == tmp[j]) {
					aa.push(_738[i]);
					tmp.splice(j, 1);
					break;
				}
			}
		}
		if (aa.length != _738.length || _738.length != _739.length) {
			if (opts.multiple) {
				opts.onChange.call(_737, _738, _739);
			} else {
				opts.onChange.call(_737, _738[0], _739[0]);
			}
		}
	};

	function _73c(_73d) {
		var _73e = _732(_73d);
		return _73e[0];
	};

	function _73f(_740, _741) {
		_736(_740, [_741]);
	};

	function _742(_743) {
		var opts = $.data(_743, "combo").options;
		var fn = opts.onChange;
		opts.onChange = function() {};
		if (opts.multiple) {
			if (opts.value) {
				if (typeof opts.value == "object") {
					_736(_743, opts.value);
				} else {
					_73f(_743, opts.value);
				}
			} else {
				_736(_743, []);
			}
		} else {
			_73f(_743, opts.value);
		}
		opts.onChange = fn;
	};
	$.fn.combo = function(_744, _745) {
		if (typeof _744 == "string") {
			return $.fn.combo.methods[_744](this, _745);
		}
		_744 = _744 || {};
		return this.each(function() {
			var _746 = $.data(this, "combo");
			if (_746) {
				$.extend(_746.options, _744);
			} else {
				var r = init(this);
				_746 = $.data(this, "combo", {
					options: $.extend({}, $.fn.combo.defaults, $.fn.combo.parseOptions(this), _744),
					combo: r.combo,
					panel: r.panel,
					previousValue: null
				});
				$(this).removeAttr("disabled");
			}
			$("input.combo-text", _746.combo).attr("readonly", !_746.options.editable);
			_708(this);
			_725(this, _746.options.disabled);
			_702(this);
			_711(this);
			_722(this);
			_742(this);
		});
	};
	$.fn.combo.methods = {
		options: function(jq) {
			return $.data(jq[0], "combo").options;
		},
		panel: function(jq) {
			return $.data(jq[0], "combo").panel;
		},
		textbox: function(jq) {
			return $.data(jq[0], "combo").combo.find("input.combo-text");
		},
		destroy: function(jq) {
			return jq.each(function() {
				_70e(this);
			});
		},
		resize: function(jq, _747) {
			return jq.each(function() {
				_702(this, _747);
			});
		},
		showPanel: function(jq) {
			return jq.each(function() {
				_719(this);
			});
		},
		hidePanel: function(jq) {
			return jq.each(function() {
				_71f(this);
			});
		},
		disable: function(jq) {
			return jq.each(function() {
				_725(this, true);
				_711(this);
			});
		},
		enable: function(jq) {
			return jq.each(function() {
				_725(this, false);
				_711(this);
			});
		},
		validate: function(jq) {
			return jq.each(function() {
				_722(this, true);
			});
		},
		isValid: function(jq) {
			var _748 = $.data(jq[0], "combo").combo.find("input.combo-text");
			return _748.validatebox("isValid");
		},
		clear: function(jq) {
			return jq.each(function() {
				_729(this);
			});
		},
		getText: function(jq) {
			return _72c(jq[0]);
		},
		setText: function(jq, text) {
			return jq.each(function() {
				_72f(this, text);
			});
		},
		getValues: function(jq) {
			return _732(jq[0]);
		},
		setValues: function(jq, _749) {
			return jq.each(function() {
				_736(this, _749);
			});
		},
		getValue: function(jq) {
			return _73c(jq[0]);
		},
		setValue: function(jq, _74a) {
			return jq.each(function() {
				_73f(this, _74a);
			});
		}
	};
	$.fn.combo.parseOptions = function(_74b) {
		var t = $(_74b);
		return $.extend({}, $.fn.validatebox.parseOptions(_74b), $.parser.parseOptions(_74b, ["width", "separator", {
			panelWidth: "number",
			editable: "boolean",
			hasDownArrow: "boolean",
			delay: "number"
		}]), {
			panelHeight: (t.attr("panelHeight") == "auto" ? "auto" : parseInt(t.attr("panelHeight")) || undefined),
			multiple: (t.attr("multiple") ? true : undefined),
			disabled: (t.attr("disabled") ? true : undefined),
			value: (t.val() || undefined)
		});
	};
	$.fn.combo.defaults = $.extend({}, $.fn.validatebox.defaults, {
		width: "auto",
		panelWidth: null,
		panelHeight: 200,
		multiple: false,
		separator: ",",
		editable: true,
		disabled: false,
		hasDownArrow: true,
		value: "",
		delay: 200,
		keyHandler: {
			up: function() {},
			down: function() {},
			enter: function() {},
			query: function(q) {}
		},
		onShowPanel: function() {},
		onHidePanel: function() {},
		onChange: function(_74c, _74d) {}
	});
})(jQuery);
(function($) {
	function _74e(_74f, _750) {
		var _751 = $(_74f).combo("panel");
		var item = _751.find("div.combobox-item[value=\"" + _750 + "\"]");
		if (item.length) {
			if (item.position().top <= 0) {
				var h = _751.scrollTop() + item.position().top;
				_751.scrollTop(h);
			} else {
				if (item.position().top + item.outerHeight() > _751.height()) {
					var h = _751.scrollTop() + item.position().top + item.outerHeight() - _751.height();
					_751.scrollTop(h);
				}
			}
		}
	};

	function _752(_753) {
		var _754 = $(_753).combo("panel");
		var _755 = $(_753).combo("getValues");
		var item = _754.find("div.combobox-item[value=\"" + _755.pop() + "\"]");
		if (item.length) {
			var prev = item.prev(":visible");
			if (prev.length) {
				item = prev;
			}
		} else {
			item = _754.find("div.combobox-item:visible:last");
		}
		var _756 = item.attr("value");
		_757(_753, _756);
		_74e(_753, _756);
	};

	function _758(_759) {
		var _75a = $(_759).combo("panel");
		var _75b = $(_759).combo("getValues");
		var item = _75a.find("div.combobox-item[value=\"" + _75b.pop() + "\"]");
		if (item.length) {
			var next = item.next(":visible");
			if (next.length) {
				item = next;
			}
		} else {
			item = _75a.find("div.combobox-item:visible:first");
		}
		var _75c = item.attr("value");
		_757(_759, _75c);
		_74e(_759, _75c);
	};

	function _757(_75d, _75e) {
		var opts = $.data(_75d, "combobox").options;
		var data = $.data(_75d, "combobox").data;
		if (opts.multiple) {
			var _75f = $(_75d).combo("getValues");
			for (var i = 0; i < _75f.length; i++) {
				if (_75f[i] == _75e) {
					return;
				}
			}
			_75f.push(_75e);
			_760(_75d, _75f);
		} else {
			_760(_75d, [_75e]);
		}
		for (var i = 0; i < data.length; i++) {
			if (data[i][opts.valueField] == _75e) {
				opts.onSelect.call(_75d, data[i]);
				return;
			}
		}
	};

	function _761(_762, _763) {
		var opts = $.data(_762, "combobox").options;
		var data = $.data(_762, "combobox").data;
		var _764 = $(_762).combo("getValues");
		for (var i = 0; i < _764.length; i++) {
			if (_764[i] == _763) {
				_764.splice(i, 1);
				_760(_762, _764);
				break;
			}
		}
		for (var i = 0; i < data.length; i++) {
			if (data[i][opts.valueField] == _763) {
				opts.onUnselect.call(_762, data[i]);
				return;
			}
		}
	};

	function _760(_765, _766, _767) {
		var opts = $.data(_765, "combobox").options;
		var data = $.data(_765, "combobox").data;
		var _768 = $(_765).combo("panel");
		_768.find("div.combobox-item-selected").removeClass("combobox-item-selected");
		var vv = [],
			ss = [];
		for (var i = 0; i < _766.length; i++) {
			var v = _766[i];
			var s = v;
			for (var j = 0; j < data.length; j++) {
				if (data[j][opts.valueField] == v) {
					s = data[j][opts.textField];
					break;
				}
			}
			vv.push(v);
			ss.push(s);
			_768.find("div.combobox-item[value=\"" + v + "\"]").addClass("combobox-item-selected");
		}
		$(_765).combo("setValues", vv);
		if (!_767) {
			$(_765).combo("setText", ss.join(opts.separator));
		}
	};

	function _769(_76a) {
		var opts = $.data(_76a, "combobox").options;
		var data = [];
		$(">option", _76a).each(function() {
			var item = {};
			item[opts.valueField] = $(this).attr("value") != undefined ? $(this).attr("value") : $(this).html();
			item[opts.textField] = $(this).html();
			item["selected"] = $(this).attr("selected");
			data.push(item);
		});
		return data;
	};

	function _76b(_76c, data, _76d) {
		var opts = $.data(_76c, "combobox").options;
		var _76e = $(_76c).combo("panel");
		$.data(_76c, "combobox").data = data;
		var _76f = $(_76c).combobox("getValues");
		_76e.empty();
		for (var i = 0; i < data.length; i++) {
			var v = data[i][opts.valueField];
			var s = data[i][opts.textField];
			var item = $("<div class=\"combobox-item\"></div>").appendTo(_76e);
			item.attr("value", v);
			if (opts.formatter) {
				item.html(opts.formatter.call(_76c, data[i]));
			} else {
				item.html(s);
			}
			if (data[i]["selected"]) {
				(function() {
					for (var i = 0; i < _76f.length; i++) {
						if (v == _76f[i]) {
							return;
						}
					}
					_76f.push(v);
				})();
			}
		}
		if (opts.multiple) {
			_760(_76c, _76f, _76d);
		} else {
			if (_76f.length) {
				_760(_76c, [_76f[_76f.length - 1]], _76d);
			} else {
				_760(_76c, [], _76d);
			}
		}
		opts.onLoadSuccess.call(_76c, data);
		$(".combobox-item", _76e).hover(function() {
			$(this).addClass("combobox-item-hover");
		}, function() {
			$(this).removeClass("combobox-item-hover");
		}).click(function() {
			var item = $(this);
			if (opts.multiple) {
				if (item.hasClass("combobox-item-selected")) {
					_761(_76c, item.attr("value"));
				} else {
					_757(_76c, item.attr("value"));
				}
			} else {
				_757(_76c, item.attr("value"));
				$(_76c).combo("hidePanel");
			}
		});
	};

	function _770(_771, url, _772, _773) {
		var opts = $.data(_771, "combobox").options;
		if (url) {
			opts.url = url;
		}
		_772 = _772 || {};
		if (opts.onBeforeLoad.call(_771, _772) == false) {
			return;
		}
		opts.loader.call(_771, _772, function(data) {
			_76b(_771, data, _773);
		}, function() {
			opts.onLoadError.apply(this, arguments);
		});
	};

	function _774(_775, q) {
		var opts = $.data(_775, "combobox").options;
		if (opts.multiple && !q) {
			_760(_775, [], true);
		} else {
			_760(_775, [q], true);
		}
		if (opts.mode == "remote") {
			_770(_775, null, {
				q: q
			}, true);
		} else {
			var _776 = $(_775).combo("panel");
			_776.find("div.combobox-item").hide();
			var data = $.data(_775, "combobox").data;
			for (var i = 0; i < data.length; i++) {
				if (opts.filter.call(_775, q, data[i])) {
					var v = data[i][opts.valueField];
					var s = data[i][opts.textField];
					var item = _776.find("div.combobox-item[value=\"" + v + "\"]");
					item.show();
					if (s == q) {
						_760(_775, [v], true);
						item.addClass("combobox-item-selected");
					}
				}
			}
		}
	};

	function _777(_778) {
		var opts = $.data(_778, "combobox").options;
		$(_778).addClass("combobox-f");
		$(_778).combo($.extend({}, opts, {
			onShowPanel: function() {
				$(_778).combo("panel").find("div.combobox-item").show();
				_74e(_778, $(_778).combobox("getValue"));
				opts.onShowPanel.call(_778);
			}
		}));
	};
	$.fn.combobox = function(_779, _77a) {
		if (typeof _779 == "string") {
			var _77b = $.fn.combobox.methods[_779];
			if (_77b) {
				return _77b(this, _77a);
			} else {
				return this.combo(_779, _77a);
			}
		}
		_779 = _779 || {};
		return this.each(function() {
			var _77c = $.data(this, "combobox");
			if (_77c) {
				$.extend(_77c.options, _779);
				_777(this);
			} else {
				_77c = $.data(this, "combobox", {
					options: $.extend({}, $.fn.combobox.defaults, $.fn.combobox.parseOptions(this), _779)
				});
				_777(this);
				_76b(this, _769(this));
			}
			if (_77c.options.data) {
				_76b(this, _77c.options.data);
			}
			_770(this);
		});
	};
	$.fn.combobox.methods = {
		options: function(jq) {
			return $.data(jq[0], "combobox").options;
		},
		getData: function(jq) {
			return $.data(jq[0], "combobox").data;
		},
		setValues: function(jq, _77d) {
			return jq.each(function() {
				_760(this, _77d);
			});
		},
		setValue: function(jq, _77e) {
			return jq.each(function() {
				_760(this, [_77e]);
			});
		},
		clear: function(jq) {
			return jq.each(function() {
				$(this).combo("clear");
				var _77f = $(this).combo("panel");
				_77f.find("div.combobox-item-selected").removeClass("combobox-item-selected");
			});
		},
		loadData: function(jq, data) {
			return jq.each(function() {
				_76b(this, data);
			});
		},
		reload: function(jq, url) {
			return jq.each(function() {
				_770(this, url);
			});
		},
		select: function(jq, _780) {
			return jq.each(function() {
				_757(this, _780);
			});
		},
		unselect: function(jq, _781) {
			return jq.each(function() {
				_761(this, _781);
			});
		}
	};
	$.fn.combobox.parseOptions = function(_782) {
		var t = $(_782);
		return $.extend({}, $.fn.combo.parseOptions(_782), $.parser.parseOptions(_782, ["valueField", "textField", "mode", "method", "url"]));
	};
	$.fn.combobox.defaults = $.extend({}, $.fn.combo.defaults, {
		valueField: "value",
		textField: "text",
		mode: "local",
		method: "post",
		url: null,
		data: null,
		keyHandler: {
			up: function() {
				_752(this);
			},
			down: function() {
				_758(this);
			},
			enter: function() {
				var _783 = $(this).combobox("getValues");
				$(this).combobox("setValues", _783);
				$(this).combobox("hidePanel");
			},
			query: function(q) {
				_774(this, q);
			}
		},
		filter: function(q, row) {
			var opts = $(this).combobox("options");
			return row[opts.textField].indexOf(q) == 0;
		},
		formatter: function(row) {
			var opts = $(this).combobox("options");
			return row[opts.textField];
		},
		loader: function(_784, _785, _786) {
			var opts = $(this).combobox("options");
			if (!opts.url) {
				return false;
			}
			$.ajax({
				type: opts.method,
				url: opts.url,
				data: _784,
				dataType: "json",
				success: function(data) {
					_785(data);
				},
				error: function() {
					_786.apply(this, arguments);
				}
			});
		},
		onBeforeLoad: function(_787) {},
		onLoadSuccess: function() {},
		onLoadError: function() {},
		onSelect: function(_788) {},
		onUnselect: function(_789) {}
	});
})(jQuery);
(function($) {
	function _78a(_78b) {
		var opts = $.data(_78b, "combotree").options;
		var tree = $.data(_78b, "combotree").tree;
		$(_78b).addClass("combotree-f");
		$(_78b).combo(opts);
		var _78c = $(_78b).combo("panel");
		if (!tree) {
			tree = $("<ul></ul>").appendTo(_78c);
			$.data(_78b, "combotree").tree = tree;
		}
		tree.tree($.extend({}, opts, {
			checkbox: opts.multiple,
			onLoadSuccess: function(node, data) {
				var _78d = $(_78b).combotree("getValues");
				if (opts.multiple) {
					var _78e = tree.tree("getChecked");
					for (var i = 0; i < _78e.length; i++) {
						var id = _78e[i].id;
						(function() {
							for (var i = 0; i < _78d.length; i++) {
								if (id == _78d[i]) {
									return;
								}
							}
							_78d.push(id);
						})();
					}
				}
				$(_78b).combotree("setValues", _78d);
				opts.onLoadSuccess.call(this, node, data);
			},
			onClick: function(node) {
				_790(_78b);
				$(_78b).combo("hidePanel");
				opts.onClick.call(this, node);
			},
			onCheck: function(node, _78f) {
				_790(_78b);
				opts.onCheck.call(this, node, _78f);
			}
		}));
	};

	function _790(_791) {
		var opts = $.data(_791, "combotree").options;
		var tree = $.data(_791, "combotree").tree;
		var vv = [],
			ss = [];
		if (opts.multiple) {
			var _792 = tree.tree("getChecked");
			for (var i = 0; i < _792.length; i++) {
				vv.push(_792[i].id);
				ss.push(_792[i].text);
			}
		} else {
			var node = tree.tree("getSelected");
			if (node) {
				vv.push(node.id);
				ss.push(node.text);
			}
		}
		$(_791).combo("setValues", vv).combo("setText", ss.join(opts.separator));
	};

	function _793(_794, _795) {
		var opts = $.data(_794, "combotree").options;
		var tree = $.data(_794, "combotree").tree;
		tree.find("span.tree-checkbox").addClass("tree-checkbox0").removeClass("tree-checkbox1 tree-checkbox2");
		var vv = [],
			ss = [];
		for (var i = 0; i < _795.length; i++) {
			var v = _795[i];
			var s = v;
			var node = tree.tree("find", v);
			if (node) {
				s = node.text;
				tree.tree("check", node.target);
				tree.tree("select", node.target);
			}
			vv.push(v);
			ss.push(s);
		}
		$(_794).combo("setValues", vv).combo("setText", ss.join(opts.separator));
	};
	$.fn.combotree = function(_796, _797) {
		if (typeof _796 == "string") {
			var _798 = $.fn.combotree.methods[_796];
			if (_798) {
				return _798(this, _797);
			} else {
				return this.combo(_796, _797);
			}
		}
		_796 = _796 || {};
		return this.each(function() {
			var _799 = $.data(this, "combotree");
			if (_799) {
				$.extend(_799.options, _796);
			} else {
				$.data(this, "combotree", {
					options: $.extend({}, $.fn.combotree.defaults, $.fn.combotree.parseOptions(this), _796)
				});
			}
			_78a(this);
		});
	};
	$.fn.combotree.methods = {
		options: function(jq) {
			return $.data(jq[0], "combotree").options;
		},
		tree: function(jq) {
			return $.data(jq[0], "combotree").tree;
		},
		loadData: function(jq, data) {
			return jq.each(function() {
				var opts = $.data(this, "combotree").options;
				opts.data = data;
				var tree = $.data(this, "combotree").tree;
				tree.tree("loadData", data);
			});
		},
		reload: function(jq, url) {
			return jq.each(function() {
				var opts = $.data(this, "combotree").options;
				var tree = $.data(this, "combotree").tree;
				if (url) {
					opts.url = url;
				}
				tree.tree({
					url: opts.url
				});
			});
		},
		setValues: function(jq, _79a) {
			return jq.each(function() {
				_793(this, _79a);
			});
		},
		setValue: function(jq, _79b) {
			return jq.each(function() {
				_793(this, [_79b]);
			});
		},
		clear: function(jq) {
			return jq.each(function() {
				var tree = $.data(this, "combotree").tree;
				tree.find("div.tree-node-selected").removeClass("tree-node-selected");
				var cc = tree.tree("getChecked");
				for (var i = 0; i < cc.length; i++) {
					tree.tree("uncheck", cc[i].target);
				}
				$(this).combo("clear");
			});
		}
	};
	$.fn.combotree.parseOptions = function(_79c) {
		return $.extend({}, $.fn.combo.parseOptions(_79c), $.fn.tree.parseOptions(_79c));
	};
	$.fn.combotree.defaults = $.extend({}, $.fn.combo.defaults, $.fn.tree.defaults, {
		editable: false
	});
})(jQuery);
(function($) {
	function _79d(_79e) {
		var opts = $.data(_79e, "combogrid").options;
		var grid = $.data(_79e, "combogrid").grid;
		$(_79e).addClass("combogrid-f");
		$(_79e).combo(opts);
		var _79f = $(_79e).combo("panel");
		if (!grid) {
			grid = $("<table></table>").appendTo(_79f);
			$.data(_79e, "combogrid").grid = grid;
		}
		grid.datagrid($.extend({}, opts, {
			border: false,
			fit: true,
			singleSelect: (!opts.multiple),
			onLoadSuccess: function(data) {
				var _7a0 = $.data(_79e, "combogrid").remainText;
				var _7a1 = $(_79e).combo("getValues");
				_7ad(_79e, _7a1, _7a0);
				opts.onLoadSuccess.apply(_79e, arguments);
			},
			onClickRow: _7a2,
			onSelect: function(_7a3, row) {
				_7a4();
				opts.onSelect.call(this, _7a3, row);
			},
			onUnselect: function(_7a5, row) {
				_7a4();
				opts.onUnselect.call(this, _7a5, row);
			},
			onSelectAll: function(rows) {
				_7a4();
				opts.onSelectAll.call(this, rows);
			},
			onUnselectAll: function(rows) {
				if (opts.multiple) {
					_7a4();
				}
				opts.onUnselectAll.call(this, rows);
			}
		}));

		function _7a2(_7a6, row) {
			$.data(_79e, "combogrid").remainText = false;
			_7a4();
			if (!opts.multiple) {
				$(_79e).combo("hidePanel");
			}
			opts.onClickRow.call(this, _7a6, row);
		};

		function _7a4() {
			var _7a7 = $.data(_79e, "combogrid").remainText;
			var rows = grid.datagrid("getSelections");
			var vv = [],
				ss = [];
			for (var i = 0; i < rows.length; i++) {
				vv.push(rows[i][opts.idField]);
				ss.push(rows[i][opts.textField]);
			}
			if (!opts.multiple) {
				$(_79e).combo("setValues", (vv.length ? vv : [""]));
			} else {
				$(_79e).combo("setValues", vv);
			}
			if (!_7a7) {
				$(_79e).combo("setText", ss.join(opts.separator));
			}
		};
	};

	function _7a8(_7a9, step) {
		var opts = $.data(_7a9, "combogrid").options;
		var grid = $.data(_7a9, "combogrid").grid;
		var _7aa = grid.datagrid("getRows").length;
		$.data(_7a9, "combogrid").remainText = false;
		var _7ab;
		var _7ac = grid.datagrid("getSelections");
		if (_7ac.length) {
			_7ab = grid.datagrid("getRowIndex", _7ac[_7ac.length - 1][opts.idField]);
			_7ab += step;
			if (_7ab < 0) {
				_7ab = 0;
			}
			if (_7ab >= _7aa) {
				_7ab = _7aa - 1;
			}
		} else {
			if (step > 0) {
				_7ab = 0;
			} else {
				if (step < 0) {
					_7ab = _7aa - 1;
				} else {
					_7ab = -1;
				}
			}
		}
		if (_7ab >= 0) {
			grid.datagrid("clearSelections");
			grid.datagrid("selectRow", _7ab);
		}
	};

	function _7ad(_7ae, _7af, _7b0) {
		var opts = $.data(_7ae, "combogrid").options;
		var grid = $.data(_7ae, "combogrid").grid;
		var rows = grid.datagrid("getRows");
		var ss = [];
		for (var i = 0; i < _7af.length; i++) {
			var _7b1 = grid.datagrid("getRowIndex", _7af[i]);
			if (_7b1 >= 0) {
				grid.datagrid("selectRow", _7b1);
				ss.push(rows[_7b1][opts.textField]);
			} else {
				ss.push(_7af[i]);
			}
		}
		if ($(_7ae).combo("getValues").join(",") == _7af.join(",")) {
			return;
		}
		$(_7ae).combo("setValues", _7af);
		if (!_7b0) {
			$(_7ae).combo("setText", ss.join(opts.separator));
		}
	};

	function _7b2(_7b3, q) {
		var opts = $.data(_7b3, "combogrid").options;
		var grid = $.data(_7b3, "combogrid").grid;
		$.data(_7b3, "combogrid").remainText = true;
		if (opts.multiple && !q) {
			_7ad(_7b3, [], true);
		} else {
			_7ad(_7b3, [q], true);
		}
		if (opts.mode == "remote") {
			grid.datagrid("clearSelections");
			grid.datagrid("load", $.extend({}, opts.queryParams, {
				q: q
			}));
		} else {
			if (!q) {
				return;
			}
			var rows = grid.datagrid("getRows");
			for (var i = 0; i < rows.length; i++) {
				if (opts.filter.call(_7b3, q, rows[i])) {
					grid.datagrid("clearSelections");
					grid.datagrid("selectRow", i);
					return;
				}
			}
		}
	};
	$.fn.combogrid = function(_7b4, _7b5) {
		if (typeof _7b4 == "string") {
			var _7b6 = $.fn.combogrid.methods[_7b4];
			if (_7b6) {
				return _7b6(this, _7b5);
			} else {
				return $.fn.combo.methods[_7b4](this, _7b5);
			}
		}
		_7b4 = _7b4 || {};
		return this.each(function() {
			var _7b7 = $.data(this, "combogrid");
			if (_7b7) {
				$.extend(_7b7.options, _7b4);
			} else {
				_7b7 = $.data(this, "combogrid", {
					options: $.extend({}, $.fn.combogrid.defaults, $.fn.combogrid.parseOptions(this), _7b4)
				});
			}
			_79d(this);
		});
	};
	$.fn.combogrid.methods = {
		options: function(jq) {
			return $.data(jq[0], "combogrid").options;
		},
		grid: function(jq) {
			return $.data(jq[0], "combogrid").grid;
		},
		setValues: function(jq, _7b8) {
			return jq.each(function() {
				_7ad(this, _7b8);
			});
		},
		setValue: function(jq, _7b9) {
			return jq.each(function() {
				_7ad(this, [_7b9]);
			});
		},
		clear: function(jq) {
			return jq.each(function() {
				$(this).combogrid("grid").datagrid("clearSelections");
				$(this).combo("clear");
			});
		}
	};
	$.fn.combogrid.parseOptions = function(_7ba) {
		var t = $(_7ba);
		return $.extend({}, $.fn.combo.parseOptions(_7ba), $.fn.datagrid.parseOptions(_7ba), $.parser.parseOptions(_7ba, ["idField", "textField", "mode"]));
	};
	$.fn.combogrid.defaults = $.extend({}, $.fn.combo.defaults, $.fn.datagrid.defaults, {
		loadMsg: null,
		idField: null,
		textField: null,
		mode: "local",
		keyHandler: {
			up: function() {
				_7a8(this, -1);
			},
			down: function() {
				_7a8(this, 1);
			},
			enter: function() {
				_7a8(this, 0);
				$(this).combo("hidePanel");
			},
			query: function(q) {
				_7b2(this, q);
			}
		},
		filter: function(q, row) {
			var opts = $(this).combogrid("options");
			return row[opts.textField].indexOf(q) == 0;
		}
	});
})(jQuery);


(function($) {
	//定义一个全局的变量，保存combo的jq对象 add  by xfc
	var comboObj;

	function _7bb(_7bc) {
		var _7bd = $.data(_7bc,"datebox");
		var opts = _7bd.options;
        //添加默认显示 2015-4-27
        var defaultDate=opts.defaultDate;
        //不可选日期   2015-4-28
        var disabledMinDate=opts.disabledMinDate;
        var disabledMaxDate=opts.disabledMaxDate;
        var hideWeeks=opts.hideWeeks;
		$(_7bc).addClass("datebox-f");
		$(_7bc).combo($.extend({}, opts, {
			onShowPanel: function() {
				_7bd.calendar.calendar("resize");
				opts.onShowPanel.call(_7bc);
			}
		}));
		$(_7bc).combo("textbox").parent().addClass("datebox");
		//保存combo的jq对象 add by xfc
		comboObj = $(_7bc).combo("textbox").parent();
		if (!_7bd.calendar) {
		var seasonSwitch=opts.seasonSwitch;
			//创建calender 是否是有季节的 20215-1-9
			_7be(seasonSwitch,defaultDate,disabledMinDate,disabledMaxDate,hideWeeks);
		}

		function _7be(seasonSwitch,defaultDate,disabledMinDate,disabledMaxDate,hideWeeks) {
            //显示配置日期 2015-4-27
            var year,month,current,date;
            if(defaultDate){
                    year=parseInt(defaultDate.substr(0,4),10);
                    month=parseInt(defaultDate.substr(4,2),10);
                    date=parseInt(defaultDate.substr(6,2),10);
                    current=new Date();
                    current.setFullYear(year,month-1,date);
            }

			var _7bf = $(_7bc).combo("panel");
			_7bd.calendar = $("<div></div>").appendTo(_7bf).wrap("<div class=\"datebox-calendar-inner\"></div>");
			_7bd.calendar.calendar({
				fit: true,
				border: false,
                onlyMonth:opts.onlyMonth,
                dropMonthNYear:opts.dropMonthNYear,
				//将星期和月份改为中文-xfc
				/**　恢复英文 linguoyong 2013.3.20 */
                today:resource.DATEBOX_DEFAULTS_CURRENTTEXT,
			    weeks:resource.CALENDAR_DEFAULTS_WEEKS,
			    months: resource.CALENDAR_DEFAULTS_MONTHS,
			    seasons:resource.CALENDAR_DEFAULTS_SEASONS,//创建选择季节的参数   2015-1-9
			    seasonSwitch:seasonSwitch,//是否创建季节boolean值
                year:year,// 配置显示日期  2015-4-27
                month:month,
                current:current,
                disabledMinDate:disabledMinDate,//设置不可选日期   2015-4-28
                disabledMaxDate:disabledMaxDate,
                hideWeeks:hideWeeks,
				onSelect: function(date) {
					var _7c0 = opts.formatter(date);
					_7c4(_7bc, _7c0);
					$(_7bc).combo("hidePanel");
					opts.onSelect.call(_7bc, date);
				}
			});
			_7c4(_7bc, opts.value);
			//lingy 处理ie 6下日期被select遮挡的问题 2013.7.5
			_7bd.calendar.bgiframe();
		};
	};

	function _7c2(_7c3, q) {
		_7c4(_7c3, q);
	};

	function _7c5(_7c6) {
		var opts = $.data(_7c6, "datebox").options;
		var c = $.data(_7c6, "datebox").calendar;
		var _7c7 = opts.formatter(c.calendar("options").current);
		_7c4(_7c6, _7c7);
		$(_7c6).combo("hidePanel");
	};

	function _7c4(_7c8, _7c9) {
		var _7ca = $.data(_7c8, "datebox");
		var opts = _7ca.options;
		$(_7c8).combo("setValue", _7c9).combo("setText", _7c9);
		_7ca.calendar.calendar("moveTo", opts.parser(_7c9));
	};
	$.fn.datebox = function(_7cb, _7cc) {
		if (typeof _7cb == "string") {
			var _7cd = $.fn.datebox.methods[_7cb];
			if (_7cd) {
				return _7cd(this, _7cc);
			} else {
				return this.combo(_7cb, _7cc);
			}
		}
		_7cb = _7cb || {};
		return this.each(function() {
			var _7ce = $.data(this, "datebox");
			if (_7ce) {
				$.extend(_7ce.options, _7cb);
			} else {
				$.data(this, "datebox", {
					options: $.extend({}, $.fn.datebox.defaults, $.fn.datebox.parseOptions(this), _7cb)
				});
			}
			_7bb(this);
		});
	};
	$.fn.datebox.methods = {
		options: function(jq) {
			return $.data(jq[0], "datebox").options;
		},
		calendar: function(jq) {
			return $.data(jq[0], "datebox").calendar;
		},
		setValue: function(jq, _7cf) {
			return jq.each(function() {
				_7c4(this, _7cf);
			});
		}, //添加获取日期框jq对象的方法
		getComboObj: function() {
			if (comboObj) {
				return comboObj;
			}
		}
	};
	$.fn.datebox.parseOptions = function(_7d0) {
		var t = $(_7d0);
		return $.extend({}, $.fn.combo.parseOptions(_7d0), {});
	};
	$.fn.datebox.defaults = $.extend({}, $.fn.combo.defaults, {
		panelWidth: 180,
		panelHeight: "auto",
		keyHandler: {
			up: function() {},
			down: function() {},
			enter: function() {
				_7c5(this);
			},
			query: function(q) {
				_7c2(this, q);
				//改为中文-xfc
			}
		},
		currentText: resource.DATEBOX_DEFAULTS_OKTEXT,
		closeText: resource.DATEBOX_DEFAULTS_CLOSETEXT,
		okText: resource.DATEBOX_DEFAULTS_OKTEXT,
		formatter: function(date) {
			//对于date参数对字符型的处理 linguoyong 2013.1.17
			var y, m, d = ""
			if (typeof date == "string") {
				y = date.substr(0, 4);
				m = date.substr(4, 2);
				d = date.substr(6, 2);
			} else {
				y = date.getFullYear();
				m = date.getMonth() + 1;
				d = date.getDate();

			}
			return m + "/" + d + "/" + y;
		},
		parser: function(s) {
			var t = Date.parse(s);
			if (!isNaN(t)) {
				return new Date(t);
			} else {
				return new Date();
			}
		},
		onSelect: function(date) {}
	});
})(jQuery);
(function($) {
	function _7d1(_7d2) {
		var _7d3 = $.data(_7d2, "datetimebox");
		var opts = _7d3.options;
		$(_7d2).datebox($.extend({}, opts, {
			onShowPanel: function() {
				var _7d4 = $(_7d2).datetimebox("getValue");
				_7d7(_7d2, _7d4, true);
				opts.onShowPanel.call(_7d2);
			},
			formatter: $.fn.datebox.defaults.formatter,
			parser: $.fn.datebox.defaults.parser
		}));
		$(_7d2).removeClass("datebox-f").addClass("datetimebox-f");
		$(_7d2).datebox("calendar").calendar({
			onSelect: function(date) {
				opts.onSelect.call(_7d2, date);
			}
		});
		var _7d5 = $(_7d2).datebox("panel");
		if (!_7d3.spinner) {
			// 添加边框样式　lingy 20130403
			var p = $("<div style=\"padding:2px;border:1px solid #a4bed4;width:174px;height:22px;background:#f0f0f0;border-top-style:none;\"><input style=\"width:80px\"></div>").insertAfter(_7d5.children("div.datebox-calendar-inner"));
			_7d3.spinner = p.children("input");
			var _7d6 = _7d5.children("div.datebox-button");
			var ok = $("<a href=\"javascript:void(0)\" class=\"datebox-ok\"></a>").html(opts.okText).appendTo(_7d6);
			ok.hover(function() {
				$(this).addClass("datebox-button-hover");
			}, function() {
				$(this).removeClass("datebox-button-hover");
			}).click(function() {
				_7dc(_7d2);
			});
		}
		_7d3.spinner.timespinner({
			showSeconds: opts.showSeconds,
			separator: opts.timeSeparator
		}).unbind(".datetimebox").bind("mousedown.datetimebox", function(e) {
			e.stopPropagation();
		});
		_7d7(_7d2, opts.value);
	};

	function _7d8(_7d9) {
		var c = $(_7d9).datetimebox("calendar");
		var t = $(_7d9).datetimebox("spinner");
		var date = c.calendar("options").current;
		return new Date(date.getFullYear(), date.getMonth(), date.getDate(), t.timespinner("getHours"), t.timespinner("getMinutes"), t.timespinner("getSeconds"));
	};

	function _7da(_7db, q) {
		_7d7(_7db, q, true);
	};

	function _7dc(_7dd) {
		var opts = $.data(_7dd, "datetimebox").options;
		var date = _7d8(_7dd);
		_7d7(_7dd, opts.formatter.call(_7dd, date));
		$(_7dd).combo("hidePanel");
	};

	function _7d7(_7de, _7df, _7e0) {
		var opts = $.data(_7de, "datetimebox").options;
		$(_7de).combo("setValue", _7df);
		if (!_7e0) {
			if (_7df) {
				var date = opts.parser.call(_7de, _7df);
				$(_7de).combo("setValue", opts.formatter.call(_7de, date));
				$(_7de).combo("setText", opts.formatter.call(_7de, date));
			} else {
				$(_7de).combo("setText", _7df);
			}
		}
		var date = opts.parser.call(_7de, _7df);
		$(_7de).datetimebox("calendar").calendar("moveTo", date);
		$(_7de).datetimebox("spinner").timespinner("setValue", _7e1(date));

		function _7e1(date) {
			function _7e2(_7e3) {
				return (_7e3 < 10 ? "0" : "") + _7e3;
			};
			var tt = [_7e2(date.getHours()), _7e2(date.getMinutes())];
			if (opts.showSeconds) {
				tt.push(_7e2(date.getSeconds()));
			}
			return tt.join($(_7de).datetimebox("spinner").timespinner("options").separator);
		};
	};
	$.fn.datetimebox = function(_7e4, _7e5) {
		if (typeof _7e4 == "string") {
			var _7e6 = $.fn.datetimebox.methods[_7e4];
			if (_7e6) {
				return _7e6(this, _7e5);
			} else {
				return this.datebox(_7e4, _7e5);
			}
		}
		_7e4 = _7e4 || {};
		return this.each(function() {
			var _7e7 = $.data(this, "datetimebox");
			if (_7e7) {
				$.extend(_7e7.options, _7e4);
			} else {
				$.data(this, "datetimebox", {
					options: $.extend({}, $.fn.datetimebox.defaults, $.fn.datetimebox.parseOptions(this), _7e4)
				});
			}
			_7d1(this);
		});
	};
	$.fn.datetimebox.methods = {
		options: function(jq) {
			return $.data(jq[0], "datetimebox").options;
		},
		spinner: function(jq) {
			return $.data(jq[0], "datetimebox").spinner;
		},
		setValue: function(jq, _7e8) {
			return jq.each(function() {
				_7d7(this, _7e8);
			});
		}
	};
	$.fn.datetimebox.parseOptions = function(_7e9) {
		var t = $(_7e9);
		return $.extend({}, $.fn.datebox.parseOptions(_7e9), $.parser.parseOptions(_7e9, ["timeSeparator", {
			showSeconds: "boolean"
		}]));
	};
	$.fn.datetimebox.defaults = $.extend({}, $.fn.datebox.defaults, {
		showSeconds: true,
		timeSeparator: ":",
		keyHandler: {
			up: function() {},
			down: function() {},
			enter: function() {
				_7dc(this);
			},
			query: function(q) {
				_7da(this, q);
			}
		},
		formatter: function(date) {
			var h = date.getHours();
			var M = date.getMinutes();
			var s = date.getSeconds();

			function _7ea(_7eb) {
				return (_7eb < 10 ? "0" : "") + _7eb;
			};
			var _7ec = $(this).datetimebox("spinner").timespinner("options").separator;
			var r = $.fn.datebox.defaults.formatter(date) + " " + _7ea(h) + _7ec + _7ea(M);
			if ($(this).datetimebox("options").showSeconds) {
				r += _7ec + _7ea(s);
			}
			return r;
		},
		parser: function(s) {
			if ($.trim(s) == "") {
				return new Date();
			}
			var dt = s.split(" ");
			var d = $.fn.datebox.defaults.parser(dt[0]);
			if (dt.length < 2) {
				return d;
			}
			var _7ed = $(this).datetimebox("spinner").timespinner("options").separator;
			var tt = dt[1].split(_7ed);
			var hour = parseInt(tt[0], 10) || 0;
			var _7ee = parseInt(tt[1], 10) || 0;
			var _7ef = parseInt(tt[2], 10) || 0;
			return new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, _7ee, _7ef);
		}
	});
})(jQuery);
(function($) {
	function init(_7f0) {
		var _7f1 = $("<div class=\"slider\">" + "<div class=\"slider-inner\">" + "<a href=\"javascript:void(0)\" class=\"slider-handle\"></a>" + "<span class=\"slider-tip\"></span>" + "</div>" + "<div class=\"slider-rule\"></div>" + "<div class=\"slider-rulelabel\"></div>" + "<div style=\"clear:both\"></div>" + "<input type=\"hidden\" class=\"slider-value\">" + "</div>").insertAfter(_7f0);
		var name = $(_7f0).hide().attr("name");
		if (name) {
			_7f1.find("input.slider-value").attr("name", name);
			$(_7f0).removeAttr("name").attr("sliderName", name);
		}
		return _7f1;
	};

	function _7f2(_7f3, _7f4) {
		var opts = $.data(_7f3, "slider").options;
		var _7f5 = $.data(_7f3, "slider").slider;
		if (_7f4) {
			if (_7f4.width) {
				opts.width = _7f4.width;
			}
			if (_7f4.height) {
				opts.height = _7f4.height;
			}
		}
		if (opts.mode == "h") {
			_7f5.css("height", "");
			_7f5.children("div").css("height", "");
			if (!isNaN(opts.width)) {
				_7f5.width(opts.width);
			}
		} else {
			_7f5.css("width", "");
			_7f5.children("div").css("width", "");
			if (!isNaN(opts.height)) {
				_7f5.height(opts.height);
				_7f5.find("div.slider-rule").height(opts.height);
				_7f5.find("div.slider-rulelabel").height(opts.height);
				_7f5.find("div.slider-inner")._outerHeight(opts.height);
			}
		}
		_7f6(_7f3);
	};

	function _7f7(_7f8) {
		var opts = $.data(_7f8, "slider").options;
		var _7f9 = $.data(_7f8, "slider").slider;
		if (opts.mode == "h") {
			_7fa(opts.rule);
		} else {
			_7fa(opts.rule.slice(0).reverse());
		}

		function _7fa(aa) {
			var rule = _7f9.find("div.slider-rule");
			var _7fb = _7f9.find("div.slider-rulelabel");
			rule.empty();
			_7fb.empty();
			for (var i = 0; i < aa.length; i++) {
				var _7fc = i * 100 / (aa.length - 1) + "%";
				var span = $("<span></span>").appendTo(rule);
				span.css((opts.mode == "h" ? "left" : "top"), _7fc);
				if (aa[i] != "|") {
					span = $("<span></span>").appendTo(_7fb);
					span.html(aa[i]);
					if (opts.mode == "h") {
						span.css({
							left: _7fc,
							marginLeft: -Math.round(span.outerWidth() / 2)
						});
					} else {
						span.css({
							top: _7fc,
							marginTop: -Math.round(span.outerHeight() / 2)
						});
					}
				}
			}
		};
	};

	function _7fd(_7fe) {
		var opts = $.data(_7fe, "slider").options;
		var _7ff = $.data(_7fe, "slider").slider;
		_7ff.removeClass("slider-h slider-v slider-disabled");
		_7ff.addClass(opts.mode == "h" ? "slider-h" : "slider-v");
		_7ff.addClass(opts.disabled ? "slider-disabled" : "");
		_7ff.find("a.slider-handle").draggable({
			axis: opts.mode,
			cursor: "pointer",
			disabled: opts.disabled,
			onDrag: function(e) {
				var left = e.data.left;
				var _800 = _7ff.width();
				if (opts.mode != "h") {
					left = e.data.top;
					_800 = _7ff.height();
				}
				if (left < 0 || left > _800) {
					return false;
				} else {
					var _801 = _810(_7fe, left);
					_802(_801);
					return false;
				}
			},
			onStartDrag: function() {
				opts.onSlideStart.call(_7fe, opts.value);
			},
			onStopDrag: function(e) {
				var _803 = _810(_7fe, (opts.mode == "h" ? e.data.left : e.data.top));
				_802(_803);
				opts.onSlideEnd.call(_7fe, opts.value);
			}
		});

		function _802(_804) {
			var s = Math.abs(_804 % opts.step);
			if (s < opts.step / 2) {
				_804 -= s;
			} else {
				_804 = _804 - s + opts.step;
			}
			_805(_7fe, _804);
		};
	};

	function _805(_806, _807) {
		var opts = $.data(_806, "slider").options;
		var _808 = $.data(_806, "slider").slider;
		var _809 = opts.value;
		if (_807 < opts.min) {
			_807 = opts.min;
		}
		if (_807 > opts.max) {
			_807 = opts.max;
		}
		opts.value = _807;
		$(_806).val(_807);
		_808.find("input.slider-value").val(_807);
		var pos = _80a(_806, _807);
		var tip = _808.find(".slider-tip");
		if (opts.showTip) {
			tip.show();
			tip.html(opts.tipFormatter.call(_806, opts.value));
		} else {
			tip.hide();
		}
		if (opts.mode == "h") {
			var _80b = "left:" + pos + "px;";
			_808.find(".slider-handle").attr("style", _80b);
			tip.attr("style", _80b + "margin-left:" + (-Math.round(tip.outerWidth() / 2)) + "px");
		} else {
			var _80b = "top:" + pos + "px;";
			_808.find(".slider-handle").attr("style", _80b);
			tip.attr("style", _80b + "margin-left:" + (-Math.round(tip.outerWidth())) + "px");
		}
		if (_809 != _807) {
			opts.onChange.call(_806, _807, _809);
		}
	};

	function _7f6(_80c) {
		var opts = $.data(_80c, "slider").options;
		var fn = opts.onChange;
		opts.onChange = function() {};
		_805(_80c, opts.value);
		opts.onChange = fn;
	};

	function _80a(_80d, _80e) {
		var opts = $.data(_80d, "slider").options;
		var _80f = $.data(_80d, "slider").slider;
		if (opts.mode == "h") {
			var pos = (_80e - opts.min) / (opts.max - opts.min) * _80f.width();
		} else {
			var pos = _80f.height() - (_80e - opts.min) / (opts.max - opts.min) * _80f.height();
		}
		return pos.toFixed(0);
	};

	function _810(_811, pos) {
		var opts = $.data(_811, "slider").options;
		var _812 = $.data(_811, "slider").slider;
		if (opts.mode == "h") {
			var _813 = opts.min + (opts.max - opts.min) * (pos / _812.width());
		} else {
			var _813 = opts.min + (opts.max - opts.min) * ((_812.height() - pos) / _812.height());
		}
		return _813.toFixed(0);
	};
	$.fn.slider = function(_814, _815) {
		if (typeof _814 == "string") {
			return $.fn.slider.methods[_814](this, _815);
		}
		_814 = _814 || {};
		return this.each(function() {
			var _816 = $.data(this, "slider");
			if (_816) {
				$.extend(_816.options, _814);
			} else {
				_816 = $.data(this, "slider", {
					options: $.extend({}, $.fn.slider.defaults, $.fn.slider.parseOptions(this), _814),
					slider: init(this)
				});
				$(this).removeAttr("disabled");
			}
			_7fd(this);
			_7f7(this);
			_7f2(this);
		});
	};
	$.fn.slider.methods = {
		options: function(jq) {
			return $.data(jq[0], "slider").options;
		},
		destroy: function(jq) {
			return jq.each(function() {
				$.data(this, "slider").slider.remove();
				$(this).remove();
			});
		},
		resize: function(jq, _817) {
			return jq.each(function() {
				_7f2(this, _817);
			});
		},
		getValue: function(jq) {
			return jq.slider("options").value;
		},
		setValue: function(jq, _818) {
			return jq.each(function() {
				_805(this, _818);
			});
		},
		enable: function(jq) {
			return jq.each(function() {
				$.data(this, "slider").options.disabled = false;
				_7fd(this);
			});
		},
		disable: function(jq) {
			return jq.each(function() {
				$.data(this, "slider").options.disabled = true;
				_7fd(this);
			});
		}
	};
	$.fn.slider.parseOptions = function(_819) {
		var t = $(_819);
		return $.extend({}, $.parser.parseOptions(_819, ["width", "height", "mode", {
			showTip: "boolean",
			min: "number",
			max: "number",
			step: "number"
		}]), {
			value: (t.val() || undefined),
			disabled: (t.attr("disabled") ? true : undefined),
			rule: (t.attr("rule") ? eval(t.attr("rule")) : undefined)
		});
	};
	$.fn.slider.defaults = {
		width: "auto",
		height: "auto",
		mode: "h",
		showTip: false,
		disabled: false,
		value: 0,
		min: 0,
		max: 100,
		step: 1,
		rule: [],
		tipFormatter: function(_81a) {
			return _81a;
		},
		onChange: function(_81b, _81c) {},
		onSlideStart: function(_81d) {},
		onSlideEnd: function(_81e) {}
	};
})(jQuery);

/* Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version 2.1.2
 */
(function(a) {
	a.fn.bgiframe = (a.browser.msie && /msie 6\.0/i.test(navigator.userAgent) ? function(d) {
		d = a.extend({
			top: "auto",
			left: "auto",
			width: "auto",
			height: "auto",
			opacity: true,
			src: ""
		}, d);
		var c = '<iframe class="bgiframe"frameborder="0" scrolling="no" tabindex="-1"src="' + d.src + '"style="display:block; background-color:green;position:absolute;z-index:-1;' + (d.opacity !== true ? "filter:Alpha(Opacity='0');" : "") + "top:" + (d.top == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')" : b(d.top)) + ";left:" + (d.left == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')" : b(d.left)) + ";width:" + (d.width == "auto" ? "expression((this.parentNode.offsetWidth-4)+'px')" : b(d.width)) + ";height:" + (d.height == "auto" ? "expression((this.parentNode.offsetHeight-4)+'px')" : b(d.height)) + ';"/>';
		return this.each(function() {
			if (a(this).children("iframe.bgiframe").length === 0) {
				this.insertBefore(document.createElement(c), this.firstChild)
			}
		})
	} : function() {
		return this
	});
	a.fn.bgIframe = a.fn.bgiframe;

	function b(c) {
		return c && c.constructor === Number ? c + "px" : c
	}
})(jQuery);
/*
 * delete scroll for ie7
 */
(function($) {
	function delScroll($arr) {
		$(window).resize(function() {
			$.each($arr, function(index, item) {
				var $target = $arr;
				var w = $target.width();
				var h = $target.height();
				var $children = $target.children();
				var sw = 0;
				var sh = 0;
				$children.each(function() {
					sw += $(this).outerWidth();
					sh += $(this).outerHeight();
				});
				if (h < sh) {
					$target.css("overflow-y", "scroll");
				} else {
					$target.css("overflow-y", "hidden");
				}
				if (w < sw) {
					$target.css("overflow-x", "scroll");
				} else {
					$target.css("overflow-x", "hidden");
				}
			});
		});
	}
	$.fn.dealScroll = function(options) {
		options = this;
		delScroll(options);
	}
})(jQuery);
/*
 * Optimized version of jQuery Templates, for rendering to string.
 * Does not require jQuery, or HTML DOM
 * Integrates with JsViews (http://github.com/BorisMoore/jsviews)
 * Copyright 2012, Boris Moore
 * Released under the MIT License.
 */
// informal pre beta commit counter: 24b

(function(global, jQuery, undefined) {
	// global is the this object, which is window when running in the usual browser environment.
	"use strict";

	if (jQuery && jQuery.views || global.jsviews) {
		return;
	} // JsRender is already loaded

	//========================== Top-level vars ==========================

	var versionNumber = "v1.0pre",

		$, jsvStoreName, rTag, rTmplString,
		//TODO	tmplFnsCache = {},
		delimOpenChar0 = "{",
		delimOpenChar1 = "{",
		delimCloseChar0 = "}",
		delimCloseChar1 = "}",
		linkChar = "^",
		FALSE = false,
		TRUE = true,

		rPath = /^(?:null|true|false|\d[\d.]*|([\w$]+|\.|~([\w$]+)|#(view|([\w$]+))?)([\w$.^]*?)(?:[.[^]([\w$]+)\]?)?)$/g,
		//                                     object     helper    view  viewProperty pathTokens      leafToken

		rParams = /(\()(?=|\s*\()|(?:([([])\s*)?(?:([#~]?[\w$.^]+)?\s*((\+\+|--)|\+|-|&&|\|\||===|!==|==|!=|<=|>=|[<>%*!:?\/]|(=))\s*|([#~]?[\w$.^]+)([([])?)|(,\s*)|(\(?)\\?(?:(')|("))|(?:\s*([)\]])([([]?))|(\s+)/g,
		//          lftPrn        lftPrn2                 path    operator err                                                eq          path2       prn    comma   lftPrn2   apos quot        rtPrn   prn2   space
		// (left paren? followed by (path? followed by operator) or (path followed by paren?)) or comma or apos or quot or right paren or space

		rNewLine = /\r?\n/g,
		rUnescapeQuotes = /\\(['"])/g,
		// escape quotes and \ character
		rEscapeQuotes = /([\\'"])/g,
		rBuildHash = /\x08(~)?([^\x08]+)\x08/g,
		rTestElseIf = /^if\s/,
		rFirstElem = /<(\w+)[>\s]/,
		rPrevElem = /<(\w+)[^>\/]*>[^>]*$/,
		autoTmplName = 0,
		viewId = 0,
		escapeMapForHtml = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;"
		},
		attrEncodeChars = /[<"'&]/g,
		htmlEncodeChars = /[\x00<>"'&]/g,
		tmplAttr = "data-jsv-tmpl",
		fnDeclStr = "var j=j||" + (jQuery ? "jQuery." : "js") + "views,",
		slice = [].slice,

		$render = {},
		jsvStores = {
			template: {
				compile: compileTmpl
			},
			tag: {
				compile: compileTag
			},
			helper: {},
			converter: {}
		},

		// jsviews object ($.views if jQuery is loaded)
		$views = {
			jsviews: versionNumber,
			render: $render,
			View: View,
			settings: {
				delimiters: $viewsDelimiters,
				debugMode: TRUE,
				tryCatch: TRUE
			},
			sub: {
				// subscription, e.g. JsViews integration
				Error: JsViewsError,
				tmplFn: tmplFn,
				parse: parseParams,
				extend: $extend,
				error: error
				//TODO			invoke: $invoke
			},
			_cnvt: convertVal,
			_tag: renderTag,

			// TODO provide better debug experience - e.g. support $.views.onError callback
			_err: function(e) {
				// Place a breakpoint here to intercept template rendering errors
				return $viewsSettings.debugMode ? ("Error: " + (e.message || e)) + ". " : '';
			}
		};

	function JsViewsError(message, object) {
		// Error exception type for JsViews/JsRender
		// Override of $.views.sub.Error is possible
		if (object && object.onError) {
			if (object.onError(message) === FALSE) {
				return;
			}
		}
		this.name = "JsRender Error";
		this.message = message || "JsRender error";
	}

	function $extend(target, source) {
		var name;
		target = target || {};
		for (name in source) {
			target[name] = source[name];
		}
		return target;
	}

	//TODO		function $invoke() {
	//			try {
	//				return arguments[1].apply(arguments[0], arguments[2]);
	//			}
	//			catch(e) {
	//				throw new $views.sub.Error(e, arguments[0]);
	//			}
	//		}

	(JsViewsError.prototype = new Error()).constructor = JsViewsError;

	//========================== Top-level functions ==========================

	//===================
	// jsviews.delimiters
	//===================

	function $viewsDelimiters(openChars, closeChars, link) {
		// Set the tag opening and closing delimiters and 'link' character. Default is "{{", "}}" and "^"
		// openChars, closeChars: opening and closing strings, each with two characters

		if (!$viewsSub.rTag || arguments.length) {
			delimOpenChar0 = openChars ? openChars.charAt(0) : delimOpenChar0; // Escape the characters - since they could be regex special characters
			delimOpenChar1 = openChars ? openChars.charAt(1) : delimOpenChar1;
			delimCloseChar0 = closeChars ? closeChars.charAt(0) : delimCloseChar0;
			delimCloseChar1 = closeChars ? closeChars.charAt(1) : delimCloseChar1;
			linkChar = link || linkChar;
			openChars = "\\" + delimOpenChar0 + "(\\" + linkChar + ")?\\" + delimOpenChar1; // Default is "{^{"
			closeChars = "\\" + delimCloseChar0 + "\\" + delimCloseChar1; // Default is "}}"
			// Build regex with new delimiters
			//          tag    (followed by / space or })   or cvtr+colon or html or code
			rTag = "(?:(?:(\\w+(?=[\\/\\s\\" + delimCloseChar0 + "]))|(?:(\\w+)?(:)|(>)|!--((?:[^-]|-(?!-))*)--|(\\*)))" + "\\s*((?:[^\\" + delimCloseChar0 + "]|\\" + delimCloseChar0 + "(?!\\" + delimCloseChar1 + "))*?)";

			// make rTag available to JsViews (or other components) for parsing binding expressions
			$viewsSub.rTag = rTag + ")";

			rTag = new RegExp(openChars + rTag + "(\\/)?|(?:\\/(\\w+)))" + closeChars, "g");

			// Default:    bind           tag       converter colon html     comment            code      params            slash   closeBlock
			//           /{(\^)?{(?:(?:(\w+(?=[\/\s}]))|(?:(\w+)?(:)|(>)|!--((?:[^-]|-(?!-))*)--|(\*)))\s*((?:[^}]|}(?!}))*?)(\/)?|(?:\/(\w+)))}}/g

			rTmplString = new RegExp("<.*>|([^\\\\]|^)[{}]|" + openChars + ".*" + closeChars);
			// rTmplString looks for html tags or { or } char not preceded by \\, or JsRender tags {{xxx}}. Each of these strings are considered NOT to be jQuery selectors
		}
		return [delimOpenChar0, delimOpenChar1, delimCloseChar0, delimCloseChar1, linkChar];
	}

	//=========
	// View.get
	//=========

	function getView(type) {
		// TODO complete/test/provide samples for this
		// If type is undefined, returns root view (view under top view).
		var view = this,
			root = !type || type === "root";
		while (root && view.parent.parent || view && view.type !== type) {
			view = view.parent;
		}
		return view;
	}

	function getIndex() {
		var view = this.get("item");
		return view ? view.index : undefined;
	}

	getIndex.depends = function(view) {
		return [view.get("item"), "index"];
	}
	//==========
	// View._hlp
	//==========

	function getHelper(helper) {
		// Helper method called as view._hlp(key) from compiled template, for helper functions or template parameters ~foo
		var wrapped,
		view = this,
			res = (view.ctx || {})[helper];

		res = res === undefined ? view.getRsc("helpers", helper) : res;

		if (res) {
			if (typeof res === "function") {
				wrapped = function() {
					// If it is of type function, we will wrap it so it gets called with view as 'this' context.
					// If the helper ~foo() was in a data-link expression, the view will have a 'temporary' linkCtx property too.
					// However note that helper functions on deeper paths will not have access to view and tagCtx.
					// For example, ~util.foo() will have the ~util object as 'this' pointer
					return res.apply(view, arguments);
				};
				$extend(wrapped, res);
			}
		}
		return wrapped || res;
	}

	//==============
	// jsviews._cnvt
	//==============

	function convertVal(converter, view, self, tagCtx, bindingPaths, text) {
		// self is template object or linkCtx object
		if (converter || bindingPaths) {
			var tmplConverter,
			linkCtx = !self.markup && self,
				tag = {
					tagName: converter + ":",
					tagCtx: tagCtx
				},
				args = tagCtx.args = slice.call(arguments, 5);

			tagCtx.view = view;
			tagCtx.bind = !! (linkCtx || bindingPaths);

			if (linkCtx) {
				linkCtx.tag = tag;
				tag.linkCtx = linkCtx;
				tagCtx.ctx = extendCtx(tagCtx.ctx, linkCtx.view.ctx);
			}
			tag.ctx = tagCtx.ctx || {};
			tagCtx.props = tagCtx.props || {};
			delete tagCtx.ctx;

			if (converter && ((tmplConverter = view.getRsc("converters", converter)) || error("Unknown converter: {{" + converter + ":"))) {
				// A call to {{cnvt: ... }} or {^{cnvt: ... }} or data-link="{cnvt: ... }"
				text = tmplConverter.apply(tag, args);
			}
			if (bindingPaths) {
				// A call to {^{: ... }} or {^{cnvt: ... }}
				bindingPaths = view.tmpl.bnds[bindingPaths - 1];
				linkCtx.paths = bindingPaths;
				// Consider being able to switch off binding if parent view is not currently bound.
				view._.tag = tag; // Provide this tag on view, for markerNode on bound tags, and for getting the tagCtx and linkCtx during rendering.
				// Provide this tag on view, for addMarkerNode on bound tags to add the tag to view._.bnds, associated with the tag id,
				// and so when rendering subsequent {{else}}, will be associated with this tag
				//TODO does this work with nested elses and with {^{foo:...}} which also adds tag to view, for markerNodes.
				text = view._.onRender(text, view, TRUE);
				//Example:  text = '<script type="jsv123"></script>' + text + '<script type="jsv123/"></script>';
			}
		}
		return text;
	}

	//=============
	// jsviews._tag
	//=============

	function getResource(storeName, item) {
		var res,
		view = this,
			store = $views[storeName];

		res = store && store[item];
		while ((res === undefined) && view) {
			store = view.tmpl[storeName];
			res = store && store[item];
			view = view.parent;
		}
		return res;
	}

	function getResource2(storeName, item, root) {
		var view = this,
			store = !root && $views[storeName];
		return store && store[item] || (store = view.tmpl[storeName], store && store[item]) || view.parent && view.parent.getRsc(storeName, item, TRUE);
	}

	function renderTag(tagName, parentView, self, content, tagCtx, bind) {
		// Called from within compiled template function, to render a template tag
		// Returns the rendered tag

		var ret, render, ctx, elses, tag, tags,
		tmpl = self.markup && self,
			// self is either a template object (if rendering a tag) or a linkCtx object (if linking using a link tag)
			linkCtx = !tmpl && self,
			parentView_ = parentView._,
			parentTmpl = tmpl || parentView.tmpl,
			childTemplates = parentTmpl.templates,
			tagDef = parentView.getRsc("tags", tagName) || error("Unknown tag: {{" + tagName + "}}"),
			args = tagCtx.args = arguments.length > 6 ? slice.call(arguments, 6) : [],
			props = tagCtx.props = tagCtx.props || {};

		tagCtx.view = parentView;
		tagCtx.ctx = extendCtx(tagCtx.ctx, parentView.ctx); // Extend parentView.ctx
		ctx = tagCtx.ctx || {};
		delete tagCtx.ctx;

		// Set the tmpl property to the content of the block tag, unless set as an override property on the tag
		tmpl = props.tmpl;
		content = content && parentTmpl.tmpls[content - 1];
		tmpl = tmpl || content || tagDef.template || undefined;
		tmpl = "" + tmpl === tmpl // if a string
		?
		parentView.getRsc("templates", tmpl) || $templates(tmpl) : tmpl;

		if (tagName === "else") {
			tag = parentView._.tag;
			// Switch current tagCtx of tag instance to this {{else ...}}
			elses = tag._elses = tag._elses || [];
			elses.push(tmpl);
			tagCtx.isElse = elses.length;
			render = tag.render;
		}
		if (tagDef.init) {
			// init is the constructor for the tag/control instance

			// tags hash: tag.ctx.tags, merged with parentView.ctx.tags,
			tags = ctx.tags = parentView.ctx && extendCtx(ctx.tags, parentView.ctx.tags) || {};

			tag = tag || linkCtx.tag;
			if (tag) {
				// tag has already been instantiated, so keep it, but attach the current context, which may have changed
				// Add tag to tags hash
				tags[tagName] = tag;
			} else {
				// If the tag has not already been instantiated, we will create a new instance and add to the tags hash,
				// so ~tags.tagName will access the tag, even within the rendering of the template content of this tag
				//	TODO provide error handling owned by the tag - using tag.onError
				//			try {
				tag = tags[tagName] = new tagDef.init(tagCtx, linkCtx, ctx);
				//				}
				//				catch(e) {
				//					tagDef.onError(e);
				//				}
				tag.tmpl = tmpl;

				if (linkCtx) {
					tag.attr =
					// Setting attr on tag so renderContent knows whether to include script node markers.
					linkCtx.attr =
					// Setting attr on self to ensure outputting to the correct target attribute.
					linkCtx.attr || tagDef.attr || "";
				}
			}
			ctx.tag = tag;
		} else {
			// This is a simple tag declared as a function. We won't instantiate a specific tag constructor - just a standard instance object.
			tag = tag || {
				// tag instance object if no init constructor
				render: tagDef.render,
				renderContent: renderContent,
				tmpl: tmpl,
				tagName: tagName
			};
		}

		// Provide tagCtx, linkCtx and ctx access from tag
		tag.tagCtx = tagCtx;
		tag.ctx = ctx;
		if (linkCtx) {
			linkCtx.tag = tag;
			tag.linkCtx = linkCtx;
		}

		tag._is = "tag";
		tag._done = tagCtx.isElse ? tag._done : FALSE; // If not an {{else}} this is a new
		tmpl = tmpl || tag.tmpl;
		elses = tag._elses;

		//TODO The above works for initial rendering, but when refreshing {^{foo}} need also to associate with {{else}} tags. Use compilation to bind else content templates and expressions with the primary tag template and expression.

		parentView_.tag = tag;
		// Provide this tag on view, for addMarkerNode on bound tags to add the tag to view._.bnds, associated with the tag id,
		// for getting the tagCtx and linkCtx during rendering, and so when rendering subsequent {{else}}, will be associated with this tag
		//TODO does this work with nested elses and with {^{foo:...}} which also adds tag to view, for markerNodes.

		//		while (tmpl) {
		// If tagDef has a 'render' function, call it.
		// If the return result is undefined, return "", or, if a template (or content) is provided,
		// return the rendered template(using the current data or the first parameter as data);
		if (render = render || tag.render) {
			ret = render.apply(tag, args);

			//	TODO		ret = $invoke(tag, render, args);
		}
		ret = ret !== undefined ? ret // Return result of render function unless it is undefined, in which case return rendered template
		:
		tmpl
		// render template on args[0] if defined, or otherwise on the current data item
		?
		tag.renderContent(tagCtx.data !== undefined ? tagCtx.data : parentView.data, undefined, parentView) : ""; // No return value from render, and no template defined, so return ::

		//			tmpl = (tag !== "else" && elses) ? (tagCtx.isElse = tagCtx.isElse || 0, elses[tagCtx.isElse++]) : undefined;
		//}

		// If bind, for {^{tag ... }}, insert script marker nodes
		return bind ? parentView_.onRender(ret, parentView, bind) : ret;
	}

	//=================
	// View constructor
	//=================

	function View(context, type, parentView, data, template, key, onRender) {
		// Constructor for view object in view hierarchy. (Augmented by JsViews if JsViews is loaded)
		var views, parentView_,
		isArray = type === "array",
			self_ = {
				key: 0,
				useKey: isArray ? 0 : 1,
				id: "" + viewId++,
				onRender: onRender,
				bnd: {}
			},
			self = {
				data: data,
				tmpl: template,
				views: isArray ? [] : {},
				parent: parentView,
				ctx: context,
				type: type,
				// If the data is an array, this is an 'array view' with a views array for each child 'item view'
				// If the data is not an array, this is an 'item view' with a views 'map' object for any child nested views
				// ._.useKey is non zero if is not an 'array view' (owning a data array). Uuse this as next key for adding to child views map
				get: getView,
				getIndex: getIndex,
				getRsc: getResource,
				_hlp: getHelper,
				_: self_
			};

		if (parentView) {
			views = parentView.views;
			parentView_ = parentView._;
			if (parentView_.useKey) {
				// Parent is an 'item view'. Add this view to its views object
				// self._key = is the key in the parent view map
				views[self_.key = "_" + parentView_.useKey++] = self;
			} else {
				// Parent is an 'array view'. Add this view to its views array
				views.splice(
				// self._.key = self.index - the index in the parent view array
				self_.key = self.index = key !== undefined ? key : views.length,
				0, self);
			}
			// If no context was passed in, use parent context
			// If context was passed in, it should have been merged already with parent context
			self.ctx = context || parentView.ctx;
		}
		return self;
	}

	//=============
	// Registration
	//=============

	function compileChildResources(parentTmpl) {
		var storeName, resources, resourceName, settings, compile;
		for (storeName in jsvStores) {
			settings = jsvStores[storeName];
			if ((compile = settings.compile) && (resources = parentTmpl[storeName + "s"])) {
				for (resourceName in resources) {
					// compile child resource declarations (templates, tags, converters or helpers)
					resources[resourceName] = compile(resourceName, resources[resourceName], parentTmpl, storeName, settings);
				}
			}
		}
	}

	function compileTag(name, item, parentTmpl) {
		var init, tmpl;
		if (typeof item === "function") {
			// Simple tag declared as function. No presenter instantation.
			item = {
				tagName: name,
				render: item,
				depends: item.depends
			};
		} else {
			// Tag declared as object, used as the prototype for tag instantiation (control/presenter)
			item.tagName = name;
			if (tmpl = item.template) {
				item.template = "" + tmpl === tmpl ? ($templates[tmpl] || $templates(tmpl)) : tmpl;
			}
			if (item.init !== FALSE) {
				init = item.init = item.init || function(tagCtx) {};
				init.prototype = item;
				(init.prototype = item).constructor = init;
			}
		}
		item.renderContent = renderContent;
		item.attr = "html";
		if (parentTmpl) {
			item._parentTmpl = parentTmpl;
		}
		//TODO	item.onError = function(e) {
		//			var error;
		//			if (error = this.prototype.onError) {
		//				error.call(this, e);
		//			} else {
		//				throw e;
		//			}
		//		}
		return item;
	}

	function compileTmpl(name, tmpl, parentTmpl, storeName, storeSettings, options) {
		// tmpl is either a template object, a selector for a template script block, the name of a compiled template, or a template object

		//==== nested functions ====

		function tmplOrMarkupFromStr(value) {
			// If value is of type string - treat as selector, or name of compiled template
			// Return the template object, if already compiled, or the markup string

			if (("" + value === value) || value.nodeType > 0) {
				try {
					elem = value.nodeType > 0 ? value : !rTmplString.test(value)
					// If value is a string and does not contain HTML or tag content, then test as selector
					&&
					jQuery && jQuery(value)[0];
					// If selector is valid and returns at least one element, get first element
					// If invalid, jQuery will throw. We will stay with the original string.
				} catch (e) {}

				if (elem) {
					// Generally this is a script element.
					// However we allow it to be any element, so you can for example take the content of a div,
					// use it as a template, and replace it by the same content rendered against data.
					// e.g. for linking the content of a div to a container, and using the initial content as template:
					// $.link("#content", model, {tmpl: "#content"});

					value = elem.getAttribute(tmplAttr);
					name = name || value;
					value = $templates[value];
					if (!value) {
						// Not already compiled and cached, so compile and cache the name
						// Create a name for compiled template if none provided
						name = name || "_" + autoTmplName++;
						elem.setAttribute(tmplAttr, name);
						value = $templates[name] = compileTmpl(name, elem.innerHTML, parentTmpl, storeName, storeSettings, options); // Use tmpl as options
					}
				}
				return value;
			}
			// If value is not a string, return undefined
		}

		var tmplOrMarkup, elem;

		//==== Compile the template ====
		tmpl = tmpl || "";
		tmplOrMarkup = tmplOrMarkupFromStr(tmpl);

		// If options, then this was already compiled from a (script) element template declaration.
		// If not, then if tmpl is a template object, use it for options
		options = options || (tmpl.markup ? tmpl : {});
		options.tmplName = name;
		if (parentTmpl) {
			options._parentTmpl = parentTmpl;
		}
		// If tmpl is not a markup string or a selector string, then it must be a template object
		// In that case, get it from the markup property of the object
		if (!tmplOrMarkup && tmpl.markup && (tmplOrMarkup = tmplOrMarkupFromStr(tmpl.markup))) {
			if (tmplOrMarkup.fn && (tmplOrMarkup.debug !== tmpl.debug || tmplOrMarkup.allowCode !== tmpl.allowCode)) {
				// if the string references a compiled template object, but the debug or allowCode props are different, need to recompile
				tmplOrMarkup = tmplOrMarkup.markup;
			}
		}
		if (tmplOrMarkup !== undefined) {
			if (name && !parentTmpl) {
				$render[name] = function() {
					return tmpl.render.apply(tmpl, arguments);
				};
			}
			if (tmplOrMarkup.fn || tmpl.fn) {
				// tmpl is already compiled, so use it, or if different name is provided, clone it
				if (tmplOrMarkup.fn) {
					if (name && name !== tmplOrMarkup.tmplName) {
						tmpl = extendCtx(options, tmplOrMarkup);
					} else {
						tmpl = tmplOrMarkup;
					}
				}
			} else {
				// tmplOrMarkup is a markup string, not a compiled template
				// Create template object
				tmpl = TmplObject(tmplOrMarkup, options);
				// Compile to AST and then to compiled function
				tmplFn(tmplOrMarkup, tmpl);
			}
			compileChildResources(options);
			return tmpl;
		}
	}
	//==== /end of function compile ====

	function TmplObject(markup, options) {
		// Template object constructor
		var htmlTag,
		wrapMap = $viewsSettings.wrapMap || {},
		tmpl = $extend({
			markup: markup,
			tmpls: [],
			links: {},
			bnds: [],
			render: renderContent
		},
		options);

		if (!options.htmlTag) {
			// Set tmpl.tag to the top-level HTML tag used in the template, if any...
			htmlTag = rFirstElem.exec(markup);
			tmpl.htmlTag = htmlTag ? htmlTag[1].toLowerCase() : "";
		}
		htmlTag = wrapMap[tmpl.htmlTag];
		if (htmlTag && htmlTag !== wrapMap.div) {
			// When using JsViews, we trim templates which are inserted into HTML contexts where text nodes are not rendered (i.e. not 'Phrasing Content').
			tmpl.markup = $.trim(tmpl.markup);
			tmpl._elCnt = TRUE; // element content model (no rendered text nodes), not phrasing content model
		}

		return tmpl;
	}

	function registerStore(storeName, storeSettings) {

		function theStore(name, item, parentTmpl) {
			// The store is also the function used to add items to the store. e.g. $.templates, or $.views.tags

			// For store of name 'thing', Call as:
			//    $.views.things(items[, parentTmpl]),
			// or $.views.things(name, item[, parentTmpl])

			var onStore, compile, items, itemName, childTemplates, childTemplate, thisStore, childStoreName;

			if (name && "" + name !== name && !name.nodeType && !name.markup) {
				// Call to $.views.things(items[, parentTmpl]),

				// Adding items to the store
				// If name is a map, then item is parentTmpl. Iterate over map and call store for key.
				for (itemName in name) {
					theStore(itemName, name[itemName], item);
				}
				return $views;
			}
			thisStore = parentTmpl ? parentTmpl[storeNames] = parentTmpl[storeNames] || {} : theStore;

			// Adding a single unnamed item to the store
			if (item === undefined) {
				item = name;
				name = undefined;
			}
			compile = storeSettings.compile;
			if (onStore = $viewsSub.onBeforeStoreItem) {
				// e.g. provide an external compiler or preprocess the item.
				compile = onStore(thisStore, name, item, compile) || compile;
			}
			if (!name) {
				item = compile(undefined, item);
			} else if ("" + name === name) { // name must be a string
				if (item === null) {
					// If item is null, delete this entry
					delete thisStore[name];
				} else {
					thisStore[name] = compile ? (item = compile(name, item, parentTmpl, storeName, storeSettings)) : item;
				}
			}
			if (item) {
				item._is = storeName;
			}
			if (onStore = $viewsSub.onStoreItem) {
				// e.g. JsViews integration
				onStore(thisStore, name, item, compile);
			}
			return item;
		}

		var storeNames = storeName + "s";

		$views[storeNames] = theStore;
		jsvStores[storeName] = storeSettings;
	}

	//==============
	// renderContent
	//==============

	function renderContent(data, context, parentView, key, isLayout, onRender) {
		// Render template against data as a tree of subviews (nested rendered template instances), or as a string (top-level template).
		// If the data is the parent view, treat as layout template, re-render with the same data context.
		var i, l, dataItem, newView, childView, itemResult, parentContext, props, swapContent, tagCtx, isTag, outerOnRender,
		self = this,
			tmpl = self,
			allowDataLink = self.attr === undefined || self.attr === "html",
			result = "";

		if (key === TRUE) {
			swapContent = TRUE;
			key = 0;
		}
		if (isTag = self._is === "tag") {
			tagCtx = self.tagCtx;
			// This is a call from renderTag
			tmpl = tagCtx.isElse ? self._elses[tagCtx.isElse - 1] : self.tmpl;
			context = extendCtx(context, self.ctx);
			props = tagCtx.props;
			if (props.link === FALSE) {
				// link=false setting on block tag
				// We will override inherited value of link by the explicit setting link=false taken from props
				// The child views of an unlinked view are also unlinked. So setting child back to true will not have any effect.
				context = context || {};
				context.link = FALSE;
			}
			parentView = parentView || tagCtx.view;
		} else {
			tmpl = self.jquery && (self[0] || error('Unknown template: "' + self.selector + '"')) // This is a call from $(selector).render
			||
			self;
		}
		if (tmpl) {
			if (parentView) {
				onRender = onRender || parentView._.onRender;
				parentContext = parentView.ctx;
				if (data === parentView) {
					// Inherit the data from the parent view.
					// This may be the contents of an {{if}} block
					// Set isLayout = true so we don't iterate the if block if the data is an array.
					data = parentView.data;
					isLayout = TRUE;
				}
			}

			// Set additional context on views created here, (as modified context inherited from the parent, and to be inherited by child views)
			// Note: If no jQuery, $extend does not support chained copies - so limit extend() to two parameters
			context = extendCtx(context, parentContext);

			if (!tmpl.fn) {
				tmpl = $templates[tmpl] || $templates(tmpl);
			}

			if (tmpl) {
				onRender = (context && context.link) !== FALSE && allowDataLink && onRender;
				// If link===false, do not call onRender, so no data-linking marker nodes
				outerOnRender = onRender;
				if (onRender === TRUE) {
					// Used by view.refresh(). Don't create a new wrapper view.
					outerOnRender = undefined;
					onRender = parentView._.onRender;
				}
				if ($.isArray(data) && !isLayout) {
					// Create a view for the array, whose child views correspond to each data item. (Note: if key and parentView are passed in
					// along with parent view, treat as insert -e.g. from view.addViews - so parentView is already the view item for array)
					newView = swapContent ? parentView : (key !== undefined && parentView) || View(context, "array", parentView, data, tmpl, key, onRender);
					for (i = 0, l = data.length; i < l; i++) {
						// Create a view for each data item.
						dataItem = data[i];
						childView = View(context, "item", newView, dataItem, tmpl, (key || 0) + i, onRender);
						itemResult = tmpl.fn(dataItem, childView, $views);
						result += newView._.onRender ? newView._.onRender(itemResult, childView) : itemResult;
					}
				} else {
					// Create a view for singleton data object. The type of the view will be the tag name, e.g. "if" or "myTag" except for
					// "item", "array" and "data" views. A "data" view is from programatic render(object) against a 'singleton'. 
					newView = swapContent ? parentView : View(context, self.tagName || "data", parentView, data, tmpl, key, onRender);
					result += tmpl.fn(data, newView, $views);
				}
				return outerOnRender ? outerOnRender(result, newView) : result;
			}
		}
		return "";
	}

	//===========================
	// Build and compile template
	//===========================

	// Generate a reusable function that will serve to render a template against data
	// (Compile AST then build template function)

	function error(message) {
		if ($viewsSettings.debugMode) {
			throw new $views.sub.Error(message);
		}
	}

	function syntaxError(message) {
		error("Syntax error\n" + message);
	}

	function tmplFn(markup, tmpl, isLinkExpression) {
		// Compile markup to AST (abtract syntax tree) then build the template function code from the AST nodes
		// Used for compiling templates, and also by JsViews to build functions for data link expressions


		//==== nested functions ====

		function pushprecedingContent(shift) {
			shift -= loc;
			if (shift) {
				content.push(markup.substr(loc, shift).replace(rNewLine, "\\n"));
			}
		}

		function blockTagCheck(tagName) {
			tagName && syntaxError('Unmatched or missing tag: "{{/' + tagName + '}}" in template:\n' + markup);
		}

		function parseTag(all, bind, tagName, converter, colon, html, comment, codeTag, params, slash, closeBlock, index) {

			//    bind         tag        converter colon html     comment            code      params            slash   closeBlock
			// /{(\^)?{(?:(?:(\w+(?=[\/\s}]))|(?:(\w+)?(:)|(>)|!--((?:[^-]|-(?!-))*)--|(\*)))\s*((?:[^}]|}(?!}))*?)(\/)?|(?:\/(\w+)))}}/g
			// Build abstract syntax tree (AST): [ tagName, converter, params, content, hash, bindings, contentMarkup ]
			if (html) {
				colon = ":";
				converter = "html";
			}
			var noError, current0,
			pathBindings = [],
				code = "",
				hash = "",
				passedCtx = "",
				// Block tag if not self-closing and not {{:}} or {{>}} (special case) and not a data-link expression
				block = !slash && !colon && !comment && !isLinkExpression;

			//==== nested helper function ====
			tagName = tagName || colon;
			pushprecedingContent(index);
			loc = index + all.length; // location marker - parsed up to here
			if (codeTag) {
				if (allowCode) {
					content.push(["*", "\n" + params.replace(rUnescapeQuotes, "$1") + "\n"]);
				}
			} else if (tagName) {
				if (tagName === "else") {
					if (rTestElseIf.test(params)) {
						syntaxError('for "{{else if expr}}" use "{{else expr}}"');
					}
					current[7] = markup.substring(current[7], index); // contentMarkup for block tag
					current = stack.pop();
					content = current[3];
					block = TRUE;
				}
				if (params) {
					params = params.replace(/\s*\n\s*/g, " "); // remove newlines from the params string, to avoid compiled code errors for unterminated strings
					code = parseParams(params, pathBindings)
						.replace(rBuildHash, function(all, isCtx, keyValue) {
						if (isCtx) {
							passedCtx += keyValue + ",";
						} else {
							hash += keyValue + ",";
						}
						return "";
					});
				}
				hash = hash.slice(0, -1);
				code = code.slice(0, -1);
				noError = hash && (hash.indexOf("noerror:true") + 1) && hash || "";

				newNode = [
				tagName,
				converter || "",
				code,
				block && [],
					"{" + (hash ? ("props:" + (noError ? "hsh" : "{" + hash + "}") + ",") : "") + 'params:"' + params + '"' + (passedCtx ? ",ctx:{" + passedCtx.slice(0, -1) + "}" : "") + "},",
				noError,
				//"{" + (hash ? ("props:{" + hash + "},") : "") + 'params:"' + params + '"' + (passedCtx ? ",ctx:{" + passedCtx.slice(0, -1) + "}" : "") + "},",
				bind && pathBindings || 0];
				content.push(newNode);
				if (block) {
					stack.push(current);
					current = newNode;
					current[7] = loc; // Store current location of open tag, to be able to add contentMarkup when we reach closing tag
				}
			} else if (closeBlock) {
				current0 = current[0];
				blockTagCheck(closeBlock !== current0 && current0 && current0 !== "else");
				current[7] = markup.substring(current[7], index); // contentMarkup for block tag
				current = stack.pop();
			}
			blockTagCheck(!current && closeBlock);
			content = current[3];
		}
		//==== /end of nested functions ====

		var newNode,
		allowCode = tmpl && tmpl.allowCode,
			astTop = [],
			loc = 0,
			stack = [],
			content = astTop,
			current = [, , , astTop];

		markup = markup.replace(rEscapeQuotes, "\\$1");

		//TODO	result = tmplFnsCache[markup];  // Only cache if template is not named and markup length < ..., and there are no bindings or subtemplates?? Consider standard optimization for data-link="a.b.c"
		//		if (result) {
		//			tmpl.fn = result;
		//		} else {

		//		result = markup;

		blockTagCheck(stack[0] && stack[0][3].pop()[0]);

		// Build the AST (abstract syntax tree) under astTop
		markup.replace(rTag, parseTag);

		pushprecedingContent(markup.length);

		if (loc = astTop[astTop.length - 1]) {
			blockTagCheck("" + loc !== loc && (+loc[7] === loc[7]) && loc[0]);
		}
		//			result = tmplFnsCache[markup] = buildCode(astTop, tmpl);
		//		}
		return buildCode(astTop, tmpl);
	}

	function buildCode(ast, tmpl) {
		// Build the template function code from the AST nodes, and set as property on the passed-in template object
		// Used for compiling templates, and also by JsViews to build functions for data link expressions
		var ret, i, node, hasTag, noError, hasEncoder, getsValue, hasConverter, hasViewPath, tagName, converter, params, hash, bindings, bindingPaths, nestedTmpls, nestedTmpl, allowCode, content, markup,
		code = "",
			tmplOptions = {},
			l = ast.length;

		if (tmpl) {
			if (allowCode = tmpl.allowCode) {
				tmplOptions.allowCode = TRUE;
			}
			if (tmpl.debug) {
				tmplOptions.debug = TRUE;
			}
			bindings = tmpl.bnds;
			nestedTmpls = tmpl.tmpls;
		}

		for (i = 0; i < l; i++) {
			// AST nodes: [ tagName, converter, params, content, hash, bindings, contentMarkup, link ]
			node = ast[i];

			// Add newline for each callout to t() c() etc. and each markup string
			ret = "";
			if ("" + node === node) {
				// a markup string to be inserted
				ret = 'ret+="' + node + '";';
			} else {
				// a compiled tag expression to be inserted
				tagName = node[0];
				if (tagName === "*") {
					// Code tag: {{* }}
					ret = "" + node[1];
				} else {
					converter = node[1];
					params = node[2];
					content = node[3];
					hash = node[4];
					noError = node[5];
					bindingPaths = node[6];
					markup = node[7];

					if (content) {
						// Create template object for nested template
						nestedTmpl = TmplObject(markup, tmplOptions);
						// Compile to AST and then to compiled function
						buildCode(content, nestedTmpl);
						nestedTmpls.push(nestedTmpl);
					}
					if (bindingPaths) {
						// Add leaf binding paths to template
						bindings.push(bindingPaths);
						bindingPaths = bindings.length;
					}
					hasViewPath = hasViewPath || hash.indexOf("view") > -1;
					// Add newline for each callout to t() c() etc.

					//TODO consider passing in ret to c() and t() so they can look at the previous ret, and detect whether this is a jsrender tag _within_an_HTML_element_tag_
					// and if so, don't insert marker nodes, add data-link attributes to the HTML element markup... No need for people to set link=false.

					if (noError) {
						// If the tag includes noerror=true, we will do a try catch around expressions for named or unnamed parameters
						// passed to the tag, and return the empty string for each expression if it throws during evaluation
						// TODO perhaps support noerror=xxx and return the value of the expression xxx||'', rather than always the empty string
						noError = "try{prm=" + params + ";hsh={" + noError + '};}catch(e){prm="";hsh={};}\n';
						params = "prm";
					}

					ret += noError + "ret+=" + (tagName === ":" ? (converter === "html" && !bindingPaths ? (hasEncoder = TRUE, "h(" + params + ");") : converter || bindingPaths // Call _cnvt if there is a converter, or binding: {{cnvt: ... }}, {^{: ... }} or {^{cnvt: ... }}
					?
					(hasConverter = TRUE, 'c("' + converter + '",view,this,' + hash + bindingPaths + "," + params + ");") : (getsValue = TRUE, "(v=" + params + ')!=u?v:"";')) : (hasTag = TRUE, 't("' + tagName + '",view,this,' + (content ? nestedTmpls.length : '""') // For block tags, pass in the key (nestedTmpls.length) to the nested content template
					+
						"," + hash + bindingPaths + (params ? "," : "") + params) + ");");
				}
			}
			code += "\n" + ret;
		}

		// Include only the var references that are needed in the code
		code = fnDeclStr + (noError ? "prm,hsh," : "") + (getsValue ? "v," : "") + (hasTag ? "t=j._tag," : "") + (hasConverter ? "c=j._cnvt," : "") + (hasEncoder ? "h=j.converters.html," : "") + 'ret="";\n' + ($viewsSettings.tryCatch ? "try{\n" : "") + (tmplOptions.debug ? "debugger;" : "") + code + "\nreturn ret;\n" + ($viewsSettings.tryCatch ? "\n}catch(e){return j._err(e);}" : "");

		try {
			code = new Function("data, view, j, u", code);
		} catch (e) {
			syntaxError("Compiled template code:\n\n" + code, e);
		}

		if (tmpl) {
			tmpl.fn = code;
		}
		return code;
	}

	function parseParams(params, bindings) {

		function parseTokens(all, lftPrn0, lftPrn, path, operator, err, eq, path2, prn, comma, lftPrn2, apos, quot, rtPrn, prn2, space) {
			// rParams = /(\()(?=|\s*\()|(?:([([])\s*)?(?:([#~]?[\w$^.]+)?\s*((\+\+|--)|\+|-|&&|\|\||===|!==|==|!=|<=|>=|[<>%*!:?\/]|(=))\s*|([#~]?[\w$^.]+)([([])?)|(,\s*)|(\(?)\\?(?:(')|("))|(?:\s*([)\]])([([]?))|(\s+)
			//          lftPrn0-flwed by (- lftPrn               path    operator err                                                eq         path2       prn    comma   lftPrn3   apos quot        rtPrn   prn2   space
			// (left paren? followed by (path? followed by operator) or (path followed by paren?)) or comma or apos or quot or right paren or space
			operator = operator || "";
			lftPrn = lftPrn || lftPrn0 || lftPrn2;
			path = path || path2;
			prn = prn || prn2 || "";

			function parsePath(all, object, helper, view, viewProperty, pathTokens, leafToken) {
				// rPath = /^(?:null|true|false|\d[\d.]*|([\w$]+|~([\w$]+)|#(view|([\w$]+))?)([\w$.^]*?)(?:[.[^]([\w$]+)\]?)?)$/g,
				//                                        object   helper    view  viewProperty pathTokens       leafToken

				if (object) {
					bindings.push(path);
					if (object !== ".") {
						var leaf,
						ret = (helper ? 'view._hlp("' + helper + '")' : view ? "view" : "data") + (leafToken ? (viewProperty ? "." + viewProperty : helper ? "" : (view ? "" : "." + object)) + (pathTokens || "") : (leafToken = helper ? "" : view ? viewProperty || "" : object, ""));

						leaf = (leafToken ? "." + leafToken : "");
						ret = ret + leaf;
						ret = ret.slice(0, 9) === "view.data" ? ret.slice(5) // convert #view.data... to data...
						:
						ret;
						return ret;
					}
				}
				return all;
			}

			if (err) {
				syntaxError(params);
			} else {
				return (aposed
				// within single-quoted string
				?
				(aposed = !apos, (aposed ? all : '"')) : quoted
				// within double-quoted string
				?
				(quoted = !quot, (quoted ? all : '"')) : (
				(lftPrn ? (parenDepth++, lftPrn) : "") + (space ? (parenDepth ? "" : named ? (named = FALSE, "\b") : ",") : eq
				// named param
				// Insert backspace \b (\x08) as separator for named params, used subsequently by rBuildHash
				?
				(parenDepth && syntaxError(params), named = TRUE, '\b' + path + ':') : path
				// path
				?
				(path.split("^").join(".").replace(rPath, parsePath) + (prn ? (fnCall[++parenDepth] = TRUE, prn) : operator)) : operator ? operator : rtPrn
				// function
				?
				((fnCall[parenDepth--] = FALSE, rtPrn) + (prn ? (fnCall[++parenDepth] = TRUE, prn) : "")) : comma ? (fnCall[parenDepth] || syntaxError(params), ",") // We don't allow top-level literal arrays or objects
				:
				lftPrn0 ? "" : (aposed = apos, quoted = quot, '"'))));
			}
		}
		var named,
		fnCall = {},
		parenDepth = 0,
			quoted = FALSE, // boolean for string content in double quotes
			aposed = FALSE; // or in single quotes

		bindings.expr = params.replace(rUnescapeQuotes, "$1");
		return (params + " ").replace(rParams, parseTokens);
	}

	//==========
	// Utilities
	//==========

	// HTML encoding helper

	function replacerForHtml(ch) {
		// Original code from Mike Samuel <msamuel@google.com>
		return escapeMapForHtml[ch]
		// Intentional assignment that caches the result of encoding ch.
		||
		(escapeMapForHtml[ch] = "&#" + ch.charCodeAt(0) + ";");
	}

	// Merge objects, in particular contexts which inherit from parent contexts

	function extendCtx(context, parentContext) {
		// Return copy of parentContext, unless context is defined and is different, in which case return a new merged context
		// If neither context nor parentContext are undefined, return undefined
		return context && context !== parentContext ? (parentContext ? $extend($extend({}, parentContext), context) : context) : parentContext && $extend({}, parentContext);
	}

	//========================== Initialize ==========================

	for (jsvStoreName in jsvStores) {
		registerStore(jsvStoreName, jsvStores[jsvStoreName]);
	}

	var $templates = $views.templates,
		$converters = $views.converters,
		$helpers = $views.helpers,
		$tags = $views.tags,
		$viewsSub = $views.sub,
		$viewsSettings = $views.settings;

	if (jQuery) {
		////////////////////////////////////////////////////////////////////////////////////////////////
		// jQuery is loaded, so make $ the jQuery object
		$ = jQuery;
		$.render = $render;
		$.views = $views;
		$.templates = $templates = $views.templates;
		$.fn.render = renderContent;

	} else {
		////////////////////////////////////////////////////////////////////////////////////////////////
		// jQuery is not loaded.

		$ = global.jsviews = $views;

		$.isArray = Array && Array.isArray || function(obj) {
			return Object.prototype.toString.call(obj) === "[object Array]";
		};
	}

	//========================== Register tags ==========================

	$tags({
		"if": function(val) {
			var self = this;
			// If not done and val is truey, set done=true on tag instance and render content. Otherwise return ""
			// On else will call this function again on the same tag instance.
			return (self._done || arguments.length && !val) ? "" : (self._done = true,
			// Test is satisfied, so render content on current context. Rather than return undefined
			// (which will render the tmpl/content on the current context but will iterate if it is an array),
			// we pass in the view. This ensures treating as a layout template - with no iteration
			self.renderContent(self.tagCtx.view));
		},
		// Temporary fix for binding to {{if}}
		//	"if": {
		//		render: function(val) {
		//			var self = this;
		//			return (self._done || arguments.length && !val) ? "" : (self._done = true, self.renderContent(self.tagCtx.view));
		//		}
		//	},
		"else": function() {}, // Does nothing but ensures {{else}} tags are recognized as valid
		"for": function() {
			var i, arg, undef,
			self = this,
				tagCtx = self.tagCtx,
				result = "",
				args = arguments,
				done = 0,
				l = args.length;

			if (!l) {
				return tagCtx.done ? "" : (tagCtx.done = TRUE,
				// Test is satisfied, so render content on current context. Rather than return undefined
				// (which will render the tmpl/content on the current context but will iterate if it is an array),
				// we pass in the view. This ensures treating as a layout template - with no iteration
				self.renderContent(tagCtx.view));
			}
			for (i = 0; i < l; i++) {
				arg = args[i];
				undef = arg === undefined;
				if (!undef) {
					done += $.isArray(arg) ? arg.length : 1;
					result += self.renderContent(arg);
				} else {
					return "";
				}
			}
			tagCtx.done = done;
			return result;
		},
		"*": function(value) {
			return value;
		}
	});

	//========================== Register global helpers ==========================

	//	$helpers({ // Global helper functions
	//		// TODO add any useful built-in helper functions
	//	});

	//========================== Register converters ==========================

	$converters({
		html: function(text) {
			// HTML encoding helper: Replace < > & and ' and " by corresponding entities.
			return text != undefined ? String(text).replace(htmlEncodeChars, replacerForHtml) : "";
		},
		attr: function(text) {
			// Attribute encoding helper: Replace < & ' and " by corresponding entities.
			return text != undefined ? String(text).replace(attrEncodeChars, replacerForHtml) : "";
		},
		url: function(text) {
			// TODO - support chaining {{attr|url:....}} to protect against injection attacks from url parameters containing " or '.
			// URL encoding helper.
			return text != undefined ? encodeURI(String(text)) : "";
		}
	});

	//========================== Define default delimiters ==========================
	$viewsDelimiters();

})(this, this.jQuery);