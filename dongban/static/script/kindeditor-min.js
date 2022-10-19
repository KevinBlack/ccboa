
/* KindEditor 4.1.5 (2013-01-20), Copyright (C) kindsoft.net, Licence: http://www.kindsoft.net/license.php */
(function(b, c) {
	function g(a) {
		if (!a) return !1;
		return Object.prototype.toString.call(a) === "[object Array]"
	}

	function l(a) {
		if (!a) return !1;
		return Object.prototype.toString.call(a) === "[object Function]"
	}

	function f(a, d) {
		for (var e = 0, b = d.length; e < b; e++)
			if (a === d[e]) return e;
		return -1
	}

	function i(a, d) {
		if (g(a))
			for (var e = 0, b = a.length; e < b; e++) {
				if (d.call(a[e], e, a[e]) === !1) break
			} else
				for (e in a)
					if (a.hasOwnProperty(e) && d.call(a[e], e, a[e]) === !1) break
	}

	function n(a) {
		return a.replace(/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, "")
	}

	function m(a, d, e) {
		e = e === c ? "," : e;
		return (e + d + e).indexOf(e + a + e) >= 0
	}

	function o(a, d) {
		d = d || "px";
		return a && /^\d+$/.test(a) ? a + d : a
	}

	function j(a) {
		var d;
		return a && (d = /(\d+)/.exec(a)) ? parseInt(d[1], 10) : 0
	}

	function q(a) {
		return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
	}

	function s(a) {
		return a.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&")
	}

	function r(a) {
		var d = a.split("-"),
			a = "";
		i(d, function(d, b) {
			a += d > 0 ? b.charAt(0).toUpperCase() +
				b.substr(1) : b
		});
		return a
	}

	function v(a) {
		function d(a) {
			a = parseInt(a, 10).toString(16).toUpperCase();
			return a.length > 1 ? a : "0" + a
		}
		return a.replace(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/ig, function(a, b, c, k) {
			return "#" + d(b) + d(c) + d(k)
		})
	}

	function z(a, d) {
		var d = d === c ? "," : d,
			e = {}, b = g(a) ? a : a.split(d),
			u;
		i(b, function(a, d) {
			if (u = /^(\d+)\.\.(\d+)$/.exec(d))
				for (var b = parseInt(u[1], 10); b <= parseInt(u[2], 10); b++) e[b.toString()] = !0;
			else e[d] = !0
		});
		return e
	}

	function D(a, d) {
		return Array.prototype.slice.call(a, d || 0)
	}

	function p(a,
		d) {
		return a === c ? d : a
	}

	function B(a, d, e) {
		e || (e = d, d = null);
		var b;
		if (d) {
			var c = function() {};
			c.prototype = d.prototype;
			b = new c;
			i(e, function(a, d) {
				b[a] = d
			})
		} else b = e;
		b.constructor = a;
		a.prototype = b;
		a.parent = d ? d.prototype : null
	}

	function A(a) {
		var d;
		if (d = /\{[\s\S]*\}|\[[\s\S]*\]/.exec(a)) a = d[0];
		d = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
		d.lastIndex = 0;
		d.test(a) && (a = a.replace(d, function(a) {
			return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
		}));
		if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return eval("(" + a + ")");
		throw "JSON parse error";
	}

	function F(a, d, e) {
		a.addEventListener ? a.addEventListener(d, e, cb) : a.attachEvent && a.attachEvent("on" + d, e)
	}

	function w(a, d, e) {
		a.removeEventListener ? a.removeEventListener(d, e, cb) : a.detachEvent && a.detachEvent("on" + d, e)
	}

	function E(a, d) {
		this.init(a, d)
	}

	function G(a) {
		try {
			delete a[ka]
		} catch (d) {
			a.removeAttribute &&
				a.removeAttribute(ka)
		}
	}

	function R(a, d, e) {
		if (d.indexOf(",") >= 0) i(d.split(","), function() {
			R(a, this, e)
		});
		else {
			var b = a[ka] || null;
			b || (a[ka] = ++db, b = db);
			L[b] === c && (L[b] = {});
			var u = L[b][d];
			u && u.length > 0 ? w(a, d, u[0]) : (L[b][d] = [], L[b].el = a);
			u = L[b][d];
			u.length === 0 && (u[0] = function(d) {
				var e = d ? new E(a, d) : c;
				i(u, function(d, b) {
					d > 0 && b && b.call(a, e)
				})
			});
			f(e, u) < 0 && u.push(e);
			F(a, d, u[0])
		}
	}

	function U(a, d, e) {
		if (d && d.indexOf(",") >= 0) i(d.split(","), function() {
			U(a, this, e)
		});
		else {
			var b = a[ka] || null;
			if (b)
				if (d === c) b in L && (i(L[b],
					function(d, e) {
						d != "el" && e.length > 0 && w(a, d, e[0])
					}), delete L[b], G(a));
				else
			if (L[b]) {
				var u = L[b][d];
				if (u && u.length > 0) {
					e === c ? (w(a, d, u[0]), delete L[b][d]) : (i(u, function(a, d) {
						a > 0 && d === e && u.splice(a, 1)
					}), u.length == 1 && (w(a, d, u[0]), delete L[b][d]));
					var k = 0;
					i(L[b], function() {
						k++
					});
					k < 2 && (delete L[b], G(a))
				}
			}
		}
	}

	function aa(a, d) {
		if (d.indexOf(",") >= 0) i(d.split(","), function() {
			aa(a, this)
		});
		else {
			var e = a[ka] || null;
			if (e) {
				var b = L[e][d];
				if (L[e] && b && b.length > 0) b[0]()
			}
		}
	}

	function P(a, d, e) {
		d = /^\d{2,}$/.test(d) ? d : d.toUpperCase().charCodeAt(0);
		R(a, "keydown", function(b) {
			b.ctrlKey && b.which == d && !b.shiftKey && !b.altKey && (e.call(a), b.stop())
		})
	}

	function O(a) {
		for (var d = {}, e = /\s*([\w\-]+)\s*:([^;]*)(;|$)/g, b; b = e.exec(a);) {
			var c = n(b[1].toLowerCase());
			b = n(v(b[2]));
			d[c] = b
		}
		return d
	}

	function H(a) {
		for (var d = {}, e = /\s+(?:([\w\-:]+)|(?:([\w\-:]+)=([^\s"'<>]+))|(?:([\w\-:"]+)="([^"]*)")|(?:([\w\-:"]+)='([^']*)'))(?=(?:\s|\/|>)+)/g, b; b = e.exec(a);) {
			var c = (b[1] || b[2] || b[4] || b[6]).toLowerCase();
			d[c] = (b[2] ? b[3] : b[4] ? b[5] : b[7]) || ""
		}
		return d
	}

	function S(a, d) {
		return a =
			/\s+class\s*=/.test(a) ? a.replace(/(\s+class=["']?)([^"']*)(["']?[\s>])/, function(a, b, c, k) {
				return (" " + c + " ").indexOf(" " + d + " ") < 0 ? c === "" ? b + d + k : b + c + " " + d + k : a
			}) : a.substr(0, a.length - 1) + ' class="' + d + '">'
	}

	function Y(a) {
		var d = "";
		i(O(a), function(a, b) {
			d += a + ":" + b + ";"
		});
		return d
	}

	function I(a, d, e, b) {
		function u(a) {
			for (var a = a.split("/"), d = [], e = 0, b = a.length; e < b; e++) {
				var c = a[e];
				c == ".." ? d.length > 0 && d.pop() : c !== "" && c != "." && d.push(c)
			}
			return "/" + d.join("/")
		}

		function k(d, e) {
			if (a.substr(0, d.length) === d) {
				for (var c = [], u =
						0; u < e; u++) c.push("..");
				u = ".";
				c.length > 0 && (u += "/" + c.join("/"));
				b == "/" && (u += "/");
				return u + a.substr(d.length)
			} else if (h = /^(.*)\//.exec(d)) return k(h[1], ++e)
		}
		d = p(d, "").toLowerCase();
		a.substr(0, 5) != "data:" && (a = a.replace(/([^:])\/\//g, "$1/"));
		if (f(d, ["absolute", "relative", "domain"]) < 0) return a;
		e = e || location.protocol + "//" + location.host;
		if (b === c) var t = location.pathname.match(/^(\/.*)\//),
		b = t ? t[1] : "";
		var h;
		if (h = /^(\w+:\/\/[^\/]*)/.exec(a)) {
			if (h[1] !== e) return a
		} else if (/^\w+:/.test(a)) return a;
		/^\//.test(a) ?
			a = e + u(a.substr(1)) : /^\w+:\/\//.test(a) || (a = e + u(b + "/" + a));
		d === "relative" ? a = k(e + b, 0).substr(2) : d === "absolute" && a.substr(0, e.length) === e && (a = a.substr(e.length));
		return a
	}

	function M(a, d, e, b, c) {
		var e = e || "",
			b = p(b, !1),
			c = p(c, "\t"),
			k = "xx-small,x-small,small,medium,large,x-large,xx-large".split(","),
			a = a.replace(/(<(?:pre|pre\s[^>]*)>)([\s\S]*?)(<\/pre>)/ig, function(a, d, e, b) {
				return d + e.replace(/<(?:br|br\s[^>]*)>/ig, "\n") + b
			}),
			a = a.replace(/<(?:br|br\s[^>]*)\s*\/?>\s*<\/p>/ig, "</p>"),
			a = a.replace(/(<(?:p|p\s[^>]*)>)\s*(<\/p>)/ig,
				"$1<br />$2"),
			a = a.replace(/\u200B/g, ""),
			a = a.replace(/\u00A9/g, "&copy;"),
			t = {};
		d && (i(d, function(a, d) {
			for (var e = a.split(","), b = 0, c = e.length; b < c; b++) t[e[b]] = z(d)
		}), t.script || (a = a.replace(/(<(?:script|script\s[^>]*)>)([\s\S]*?)(<\/script>)/ig, "")), t.style || (a = a.replace(/(<(?:style|style\s[^>]*)>)([\s\S]*?)(<\/style>)/ig, "")));
		var h = [],
			a = a.replace(/([ \t\n\r]*)<(\/)?([\w\-:]+)((?:\s+|(?:\s+[\w\-:]+)|(?:\s+[\w\-:]+=[^\s"'<>]+)|(?:\s+[\w\-:"]+="[^"]*")|(?:\s+[\w\-:"]+='[^']*'))*)(\/)?>([ \t\n\r]*)/g, function(a,
				g, m, o, j, l, q) {
				var g = g || "",
					m = m || "",
					n = o.toLowerCase(),
					s = j || "",
					o = l ? " " + l : "",
					q = q || "";
				if (d && !t[n]) return "";
				o === "" && eb[n] && (o = " /");
				fb[n] && (g && (g = " "), q && (q = " "));
				Ia[n] && (m ? q = "\n" : g = "\n");
				b && n == "br" && (q = "\n");
				if (gb[n] && !Ia[n])
					if (b) {
						m && h.length > 0 && h[h.length - 1] === n ? h.pop() : h.push(n);
						q = g = "\n";
						j = 0;
						for (l = m ? h.length : h.length - 1; j < l; j++) g += c, m || (q += c);
						o ? h.pop() : m || (q += c)
					} else g = q = "";
				if (s !== "") {
					var r = H(a);
					if (n === "font") {
						var A = {}, p = "";
						i(r, function(a, d) {
							if (a === "color") A.color = d, delete r[a];
							a === "size" && (A["font-size"] =
								k[parseInt(d, 10) - 1] || "", delete r[a]);
							a === "face" && (A["font-family"] = d, delete r[a]);
							a === "style" && (p = d)
						});
						p && !/;$/.test(p) && (p += ";");
						i(A, function(a, d) {
							d !== "" && (/\s/.test(d) && (d = "'" + d + "'"), p += a + ":" + d + ";")
						});
						r.style = p
					}
					i(r, function(a, b) {
						Jb[a] && (r[a] = a);
						f(a, ["src", "href"]) >= 0 && (r[a] = I(b, e));
						(d && a !== "style" && !t[n]["*"] && !t[n][a] || n === "body" && a === "contenteditable" || /^kindeditor_\d+$/.test(a)) && delete r[a];
						if (a === "style" && b !== "") {
							var c = O(b);
							i(c, function(a) {
								d && !t[n].style && !t[n]["." + a] && delete c[a]
							});
							var K =
								"";
							i(c, function(a, d) {
								K += a + ":" + d + ";"
							});
							r.style = K
						}
					});
					s = "";
					i(r, function(a, d) {
						a === "style" && d === "" || (d = d.replace(/"/g, "&quot;"), s += " " + a + '="' + d + '"')
					})
				}
				n === "font" && (n = "span");
				return g + "<" + m + n + s + o + ">" + q
			}),
			a = a.replace(/(<(?:pre|pre\s[^>]*)>)([\s\S]*?)(<\/pre>)/ig, function(a, d, e, b) {
				return d + e.replace(/\n/g, '<span id="__kindeditor_pre_newline__">\n') + b
			}),
			a = a.replace(/\n\s*\n/g, "\n"),
			a = a.replace(/<span id="__kindeditor_pre_newline__">\n/g, "\n");
		return n(a)
	}

	function V(a, d) {
		a = a.replace(/<meta[\s\S]*?>/ig, "").replace(/<![\s\S]*?>/ig,
			"").replace(/<style[^>]*>[\s\S]*?<\/style>/ig, "").replace(/<script[^>]*>[\s\S]*?<\/script>/ig, "").replace(/<w:[^>]+>[\s\S]*?<\/w:[^>]+>/ig, "").replace(/<o:[^>]+>[\s\S]*?<\/o:[^>]+>/ig, "").replace(/<xml>[\s\S]*?<\/xml>/ig, "").replace(/<(?:table|td)[^>]*>/ig, function(a) {
			return a.replace(/border-bottom:([#\w\s]+)/ig, "border:$1")
		});
		return M(a, d)
	}

	function T(a) {
		if (/\.(rm|rmvb)(\?|$)/i.test(a)) return "audio/x-pn-realaudio-plugin";
		if (/\.(swf|flv)(\?|$)/i.test(a)) return "application/x-shockwave-flash";
		return "video/x-ms-asf-plugin"
	}

	function hb(a) {
		return H(unescape(a))
	}

	function Ja(a) {
		var d = "<embed ";
		i(a, function(a, b) {
			d += a + '="' + b + '" '
		});
		d += "/>";
		return d
	}

	function ib(a, d) {
		var e = d.width,
			b = d.height,
			c = d.type || T(d.src),
			k = Ja(d),
			t = "";
		e > 0 && (t += "width:" + e + "px;");
		b > 0 && (t += "height:" + b + "px;");
		e = /realaudio/i.test(c) ? "ke-rm" : /flash/i.test(c) ? "ke-flash" : "ke-media";
		e = '<img class="' + e + '" src="' + a + '" ';
		t !== "" && (e += 'style="' + t + '" ');
		e += 'data-ke-tag="' + escape(k) + '" alt="" />';
		return e
	}

	function Aa(a, d) {
		if (a.nodeType == 9 && d.nodeType != 9) return !0;
		for (; d =
			d.parentNode;)
			if (d == a) return !0;
		return !1
	}

	function Ba(a, d) {
		var d = d.toLowerCase(),
			e = null;
		if (!Kb && a.nodeName.toLowerCase() != "script") {
			var b = a.ownerDocument.createElement("div");
			b.appendChild(a.cloneNode(!1));
			b = H(s(b.innerHTML));
			d in b && (e = b[d])
		} else try {
			e = a.getAttribute(d, 2)
		} catch (c) {
			e = a.getAttribute(d, 1)
		}
		d === "style" && e !== null && (e = Y(e));
		return e
	}

	function Ca(a, d) {
		function e(a) {
			if (typeof a != "string") return a;
			return a.replace(/([^\w\-])/g, "\\$1")
		}

		function b(a, d) {
			return a === "*" || a.toLowerCase() === e(d.toLowerCase())
		}

		function c(a, d, e) {
			var u = [];
			(a = (e.ownerDocument || e).getElementById(a.replace(/\\/g, ""))) && b(d, a.nodeName) && Aa(e, a) && u.push(a);
			return u
		}

		function k(a, d, e) {
			var c = e.ownerDocument || e,
				u = [],
				k, h, t;
			if (e.getElementsByClassName) {
				c = e.getElementsByClassName(a.replace(/\\/g, ""));
				k = 0;
				for (h = c.length; k < h; k++) t = c[k], b(d, t.nodeName) && u.push(t)
			} else if (c.querySelectorAll) {
				c = c.querySelectorAll((e.nodeName !== "#document" ? e.nodeName + " " : "") + d + "." + a);
				k = 0;
				for (h = c.length; k < h; k++) t = c[k], Aa(e, t) && u.push(t)
			} else {
				c = e.getElementsByTagName(d);
				a = " " + a + " ";
				k = 0;
				for (h = c.length; k < h; k++)
					if (t = c[k], t.nodeType == 1)(d = t.className) && (" " + d + " ").indexOf(a) > -1 && u.push(t)
			}
			return u
		}

		function t(a, d, b, c) {
			for (var K = [], b = c.getElementsByTagName(b), u = 0, k = b.length; u < k; u++) c = b[u], c.nodeType == 1 && (d === null ? Ba(c, a) !== null && K.push(c) : d === e(Ba(c, a)) && K.push(c));
			return K
		}

		function h(a, d) {
			var e = [],
				f, g = (f = /^((?:\\.|[^.#\s\[<>])+)/.exec(a)) ? f[1] : "*";
			if (f = /#((?:[\w\-]|\\.)+)$/.exec(a)) e = c(f[1], g, d);
			else if (f = /\.((?:[\w\-]|\\.)+)$/.exec(a)) e = k(f[1], g, d);
			else if (f = /\[((?:[\w\-]|\\.)+)\]/.exec(a)) e =
				t(f[1].toLowerCase(), null, g, d);
			else if (f = /\[((?:[\w\-]|\\.)+)\s*=\s*['"]?((?:\\.|[^'"]+)+)['"]?\]/.exec(a)) {
				e = f[1].toLowerCase();
				f = f[2];
				if (e === "id") g = c(f, g, d);
				else if (e === "class") g = k(f, g, d);
				else if (e === "name") {
					e = [];
					f = (d.ownerDocument || d).getElementsByName(f.replace(/\\/g, ""));
					for (var X, i = 0, o = f.length; i < o; i++) X = f[i], b(g, X.nodeName) && Aa(d, X) && X.getAttributeNode("name") && e.push(X);
					g = e
				} else g = t(e, f, g, d);
				e = g
			} else {
				g = d.getElementsByTagName(g);
				X = 0;
				for (i = g.length; X < i; X++) f = g[X], f.nodeType == 1 && e.push(f)
			}
			return e
		}
		var g = a.split(",");
		if (g.length > 1) {
			var m = [];
			i(g, function() {
				i(Ca(this, d), function() {
					f(this, m) < 0 && m.push(this)
				})
			});
			return m
		}
		for (var d = d || document, g = [], o, j = /((?:\\.|[^\s>])+|[\s>])/g; o = j.exec(a);) o[1] !== " " && g.push(o[1]);
		o = [];
		if (g.length == 1) return h(g[0], d);
		var j = !1,
			n, q, l, r, s, A, p, v, U, z;
		A = 0;
		for (lenth = g.length; A < lenth; A++)
			if (n = g[A], n === ">") j = !0;
			else {
				if (A > 0) {
					q = [];
					p = 0;
					for (U = o.length; p < U; p++) {
						r = o[p];
						l = h(n, r);
						v = 0;
						for (z = l.length; v < z; v++) s = l[v], j ? r === s.parentNode && q.push(s) : q.push(s)
					}
					o = q
				} else o = h(n, d); if (o.length ===
					0) return []
			}
		return o
	}

	function fa(a) {
		if (!a) return document;
		return a.ownerDocument || a.document || a
	}

	function ga(a) {
		if (!a) return b;
		a = fa(a);
		return a.parentWindow || a.defaultView
	}

	function Lb(a, d) {
		if (a.nodeType == 1) {
			var e = fa(a);
			try {
				a.innerHTML = '<img id="__kindeditor_temp_tag__" width="0" height="0" style="display:none;" />' + d;
				var b = e.getElementById("__kindeditor_temp_tag__");
				b.parentNode.removeChild(b)
			} catch (c) {
				h(a).empty(), h("@" + d, e).each(function() {
					a.appendChild(this)
				})
			}
		}
	}

	function Ka(a, d, e) {
		C && N < 8 && d.toLowerCase() ==
			"class" && (d = "className");
		a.setAttribute(d, "" + e)
	}

	function La(a) {
		if (!a || !a.nodeName) return "";
		return a.nodeName.toLowerCase()
	}

	function Mb(a, d) {
		var e = ga(a),
			b = r(d),
			c = "";
		e.getComputedStyle ? (e = e.getComputedStyle(a, null), c = e[b] || e.getPropertyValue(d) || a.style[b]) : a.currentStyle && (c = a.currentStyle[b] || a.style[b]);
		return c
	}

	function W(a) {
		a = a || document;
		return ba ? a.body : a.documentElement
	}

	function la(a) {
		var a = a || document,
			d;
		C || Ma ? (d = W(a).scrollLeft, a = W(a).scrollTop) : (d = ga(a).scrollX, a = ga(a).scrollY);
		return {
			x: d,
			y: a
		}
	}

	function Q(a) {
		this.init(a)
	}

	function jb(a) {
		a.collapsed = a.startContainer === a.endContainer && a.startOffset === a.endOffset;
		return a
	}

	function Na(a, d, e) {
		function b(c, K, u) {
			var k = c.nodeValue.length,
				t;
			d && (t = c.cloneNode(!0), t = K > 0 ? t.splitText(K) : t, u < k && t.splitText(u - K));
			if (e) {
				var f = c;
				K > 0 && (f = c.splitText(K), a.setStart(c, K));
				u < k && (c = f.splitText(u - K), a.setEnd(c, 0));
				h.push(f)
			}
			return t
		}

		function c() {
			e && a.up().collapse(!0);
			for (var d = 0, b = h.length; d < b; d++) {
				var K = h[d];
				K.parentNode && K.parentNode.removeChild(K)
			}
		}

		function k(c,
			u) {
			for (var j = c.firstChild, n; j;) {
				n = (new Z(t)).selectNode(j);
				g = n.compareBoundaryPoints(pa, a);
				g >= 0 && i <= 0 && (i = n.compareBoundaryPoints(qa, a));
				i >= 0 && o <= 0 && (o = n.compareBoundaryPoints(ma, a));
				o >= 0 && m <= 0 && (m = n.compareBoundaryPoints(ra, a));
				if (m >= 0) return !1;
				n = j.nextSibling;
				if (g > 0)
					if (j.nodeType == 1)
						if (i >= 0 && o <= 0) d && u.appendChild(j.cloneNode(!0)), e && h.push(j);
						else {
							var q;
							d && (q = j.cloneNode(!1), u.appendChild(q));
							if (k(j, q) === !1) return !1
						} else
				if (j.nodeType == 3 && (j = j == f.startContainer ? b(j, f.startOffset, j.nodeValue.length) :
					j == f.endContainer ? b(j, 0, f.endOffset) : b(j, 0, j.nodeValue.length), d)) try {
					u.appendChild(j)
				} catch (l) {}
				j = n
			}
		}
		var t = a.doc,
			h = [],
			f = a.cloneRange().down(),
			g = -1,
			i = -1,
			o = -1,
			m = -1,
			j = a.commonAncestor(),
			n = t.createDocumentFragment();
		if (j.nodeType == 3) return j = b(j, a.startOffset, a.endOffset), d && n.appendChild(j), c(), d ? n : a;
		k(j, n);
		e && a.up().collapse(!0);
		for (var j = 0, q = h.length; j < q; j++) {
			var l = h[j];
			l.parentNode && l.parentNode.removeChild(l)
		}
		return d ? n : a
	}

	function sa(a, d) {
		for (var e = d; e;) {
			var b = h(e);
			if (b.name == "marquee" || b.name ==
				"select") return;
			e = e.parentNode
		}
		try {
			a.moveToElementText(d)
		} catch (c) {}
	}

	function kb(a, d) {
		var e = a.parentElement().ownerDocument,
			b = a.duplicate();
		b.collapse(d);
		var c = b.parentElement(),
			k = c.childNodes;
		if (k.length === 0) return {
			node: c.parentNode,
			offset: h(c).index()
		};
		var t = e,
			f = 0,
			g = -1,
			j = a.duplicate();
		sa(j, c);
		for (var i = 0, o = k.length; i < o; i++) {
			var m = k[i],
				g = j.compareEndPoints("StartToStart", b);
			if (g === 0) return {
				node: m.parentNode,
				offset: i
			};
			if (m.nodeType == 1) {
				var n = a.duplicate(),
					q, l = h(m),
					r = m;
				l.isControl() && (q = e.createElement("span"),
					l.after(q), r = q, f += l.text().replace(/\r\n|\n|\r/g, "").length);
				sa(n, r);
				j.setEndPoint("StartToEnd", n);
				g > 0 ? f += n.text.replace(/\r\n|\n|\r/g, "").length : f = 0;
				q && h(q).remove()
			} else m.nodeType == 3 && (j.moveStart("character", m.nodeValue.length), f += m.nodeValue.length);
			g < 0 && (t = m)
		}
		if (g < 0 && t.nodeType == 1) return {
			node: c,
			offset: h(c.lastChild).index() + 1
		};
		if (g > 0)
			for (; t.nextSibling && t.nodeType == 1;) t = t.nextSibling;
		j = a.duplicate();
		sa(j, c);
		j.setEndPoint("StartToEnd", b);
		f -= j.text.replace(/\r\n|\n|\r/g, "").length;
		if (g > 0 && t.nodeType ==
			3)
			for (e = t.previousSibling; e && e.nodeType == 3;) f -= e.nodeValue.length, e = e.previousSibling;
		return {
			node: t,
			offset: f
		}
	}

	function lb(a, d) {
		var e = a.ownerDocument || a,
			b = e.body.createTextRange();
		if (e == a) return b.collapse(!0), b;
		if (a.nodeType == 1 && a.childNodes.length > 0) {
			var c = a.childNodes,
				k;
			d === 0 ? (k = c[0], c = !0) : (k = c[d - 1], c = !1);
			if (!k) return b;
			if (h(k).name === "head") return d === 1 && (c = !0), d === 2 && (c = !1), b.collapse(c), b;
			if (k.nodeType == 1) {
				var t = h(k),
					f;
				t.isControl() && (f = e.createElement("span"), c ? t.before(f) : t.after(f), k = f);
				sa(b,
					k);
				b.collapse(c);
				f && h(f).remove();
				return b
			}
			a = k;
			d = c ? 0 : k.nodeValue.length
		}
		e = e.createElement("span");
		h(a).before(e);
		sa(b, e);
		b.moveStart("character", d);
		h(e).remove();
		return b
	}

	function mb(a) {
		function d(a) {
			if (h(a.node).name == "tr") a.node = a.node.cells[a.offset], a.offset = 0
		}
		var e;
		if (C) {
			if (a.item) return e = fa(a.item(0)), e = new Z(e), e.selectNode(a.item(0)), e;
			e = a.parentElement().ownerDocument;
			var b = kb(a, !0),
				a = kb(a, !1);
			d(b);
			d(a);
			e = new Z(e);
			e.setStart(b.node, b.offset);
			e.setEnd(a.node, a.offset);
			return e
		}
		b = a.startContainer;
		e = b.ownerDocument || b;
		e = new Z(e);
		e.setStart(b, a.startOffset);
		e.setEnd(a.endContainer, a.endOffset);
		return e
	}

	function Z(a) {
		this.init(a)
	}

	function Oa(a) {
		if (!a.nodeName) return a.constructor === Z ? a : mb(a);
		return new Z(a)
	}

	function ca(a, d, e) {
		try {
			a.execCommand(d, !1, e)
		} catch (b) {}
	}

	function nb(a, d) {
		var e = "";
		try {
			e = a.queryCommandValue(d)
		} catch (b) {}
		typeof e !== "string" && (e = "");
		return e
	}

	function Pa(a) {
		var d = ga(a);
		return a.selection || d.getSelection()
	}

	function ob(a) {
		var d = {}, e, b;
		i(a, function(a, c) {
			e = a.split(",");
			for (var t =
				0, h = e.length; t < h; t++) b = e[t], d[b] = c
		});
		return d
	}

	function Qa(a, d) {
		return pb(a, d, "*") || pb(a, d)
	}

	function pb(a, d, e) {
		e = e || a.name;
		if (a.type !== 1) return !1;
		d = ob(d);
		if (!d[e]) return !1;
		for (var e = d[e].split(","), d = 0, b = e.length; d < b; d++) {
			var c = e[d];
			if (c === "*") return !0;
			var k = /^(\.?)([^=]+)(?:=([^=]*))?$/.exec(c),
				h = k[1] ? "css" : "attr",
				c = k[2],
				k = k[3] || "";
			if (k === "" && a[h](c) !== "") return !0;
			if (k !== "" && a[h](c) === k) return !0
		}
		return !1
	}

	function Ra(a, d) {
		a.type == 1 && (qb(a, d, "*"), qb(a, d))
	}

	function qb(a, d, e) {
		e = e || a.name;
		if (a.type ===
			1 && (d = ob(d), d[e])) {
			for (var e = d[e].split(","), d = !1, b = 0, c = e.length; b < c; b++) {
				var k = e[b];
				if (k === "*") {
					d = !0;
					break
				}
				var h = /^(\.?)([^=]+)(?:=([^=]*))?$/.exec(k),
					k = h[2];
				h[1] ? (k = r(k), a[0].style[k] && (a[0].style[k] = "")) : a.removeAttr(k)
			}
			d && a.remove(!0)
		}
	}

	function Sa(a) {
		for (; a.first();) a = a.first();
		return a
	}

	function na(a) {
		return a.type == 1 && a.html().replace(/<[^>]+>/g, "") === ""
	}

	function Nb(a, d, e) {
		i(d, function(d, e) {
			d !== "style" && a.attr(d, e)
		});
		i(e, function(d, e) {
			a.css(d, e)
		})
	}

	function ta(a) {
		this.init(a)
	}

	function rb(a) {
		a.nodeName &&
			(a = fa(a), a = Oa(a).selectNodeContents(a.body).collapse(!1));
		return new ta(a)
	}

	function Ta(a) {
		var d = a.moveEl,
			e = a.moveFn,
			b = a.clickEl || d,
			u = a.beforeDrag,
			k = [document];
		(a.iframeFix === c || a.iframeFix) && h("iframe").each(function() {
				if (!/^https?:\/\//.test(I(this.src || "", "absolute"))) {
					var a;
					try {
						a = Ua(this)
					} catch (d) {}
					if (a) {
						var e = h(this).pos();
						h(a).data("pos-x", e.x);
						h(a).data("pos-y", e.y);
						k.push(a)
					}
				}
			});
		b.mousedown(function(a) {
			function c(a) {
				a.preventDefault();
				var d = h(fa(a.target)),
					k = da((d.data("pos-x") || 0) + a.pageX -
						l),
					a = da((d.data("pos-y") || 0) + a.pageY - r);
				e.call(b, m, o, n, q, k, a)
			}

			function f(a) {
				a.preventDefault()
			}

			function g(a) {
				a.preventDefault();
				h(k).unbind("mousemove", c).unbind("mouseup", g).unbind("selectstart", f);
				i.releaseCapture && i.releaseCapture()
			}
			a.stopPropagation();
			var i = b.get(),
				m = j(d.css("left")),
				o = j(d.css("top")),
				n = d.width(),
				q = d.height(),
				l = a.pageX,
				r = a.pageY;
			u && u();
			h(k).mousemove(c).mouseup(g).bind("selectstart", f);
			i.setCapture && i.setCapture()
		})
	}

	function ea(a) {
		this.init(a)
	}

	function Va(a) {
		return new ea(a)
	}

	function Ua(a) {
		a = h(a)[0];
		return a.contentDocument || a.contentWindow.document
	}

	function Ob(a, d, e, b) {
		var c = [Wa === "" ? "<html>" : '<html dir="' + Wa + '">', '<head><meta charset="utf-8" /><title></title>', "<style>", "html {margin:0;padding:0;}", "body {margin:0;padding:5px;}", 'body, td {font:12px/1.5 "sans serif",tahoma,verdana,helvetica;}', "body, p, div {word-wrap: break-word;}", "p {margin:5px 0;}", "table {border-collapse:collapse;}", "img {border:0;}", "noscript {display:none;}", "table.ke-zeroborder td {border:1px dotted #AAA;}",
			"img.ke-flash {", "\tborder:1px solid #AAA;", "\tbackground-image:url(" + a + "common/flash.gif);", "\tbackground-position:center center;", "\tbackground-repeat:no-repeat;", "\twidth:100px;", "\theight:100px;", "}", "img.ke-rm {", "\tborder:1px solid #AAA;", "\tbackground-image:url(" + a + "common/rm.gif);", "\tbackground-position:center center;", "\tbackground-repeat:no-repeat;", "\twidth:100px;", "\theight:100px;", "}", "img.ke-media {", "\tborder:1px solid #AAA;", "\tbackground-image:url(" + a + "common/media.gif);", "\tbackground-position:center center;",
			"\tbackground-repeat:no-repeat;", "\twidth:100px;", "\theight:100px;", "}", "img.ke-anchor {", "\tborder:1px dashed #666;", "\twidth:16px;", "\theight:16px;", "}", ".ke-script, .ke-noscript, .ke-display-none {", "\tdisplay:none;", "\tfont-size:0;", "\twidth:0;", "\theight:0;", "}", ".ke-pagebreak {", "\tborder:1px dotted #AAA;", "\tfont-size:0;", "\theight:2px;", "}", "</style>"
		];
		g(e) || (e = [e]);
		i(e, function(a, d) {
			d && c.push('<link href="' + d + '" rel="stylesheet" />')
		});
		b && c.push("<style>" + b + "</style>");
		c.push("</head><body " +
			(d ? 'class="' + d + '"' : "") + "></body></html>");
		return c.join("\n")
	}

	function ua(a, d) {
		if (a.hasVal()) {
			if (d === c) {
				var e = a.val();
				return e = e.replace(/(<(?:p|p\s[^>]*)>) *(<\/p>)/ig, "")
			}
			return a.val(d)
		}
		return a.html(d)
	}

	function va(a) {
		this.init(a)
	}

	function sb(a) {
		return new va(a)
	}

	function tb(a, d) {
		var e = this.get(a);
		e && !e.hasClass("ke-disabled") && d(e)
	}

	function Da(a) {
		this.init(a)
	}

	function ub(a) {
		return new Da(a)
	}

	function wa(a) {
		this.init(a)
	}

	function Xa(a) {
		return new wa(a)
	}

	function xa(a) {
		this.init(a)
	}

	function vb(a) {
		return new xa(a)
	}

	function Ya(a) {
		this.init(a)
	}

	function ya(a) {
		this.init(a)
	}

	function wb(a) {
		return new ya(a)
	}

	function Za(a, d) {
		var e = document.getElementsByTagName("head")[0] || (ba ? document.body : document.documentElement),
			b = document.createElement("script");
		e.appendChild(b);
		b.src = a;
		b.charset = "utf-8";
		b.onload = b.onreadystatechange = function() {
			if (!this.readyState || this.readyState === "loaded") d && d(), b.onload = b.onreadystatechange = null, e.removeChild(b)
		}
	}

	function xb(a) {
		var d = a.indexOf("?");
		return d > 0 ? a.substr(0, d) : a
	}

	function $a(a) {
		for (var d =
			document.getElementsByTagName("head")[0] || (ba ? document.body : document.documentElement), e = document.createElement("link"), b = xb(I(a, "absolute")), c = h('link[rel="stylesheet"]', d), k = 0, t = c.length; k < t; k++)
			if (xb(I(c[k].href, "absolute")) === b) return;
		d.appendChild(e);
		e.href = a;
		e.rel = "stylesheet"
	}

	function yb(a, d) {
		if (a === c) return ha;
		if (!d) return ha[a];
		ha[a] = d
	}

	function zb(a) {
		var d, e = "core";
		if (d = /^(\w+)\.(\w+)$/.exec(a)) e = d[1], a = d[2];
		return {
			ns: e,
			key: a
		}
	}

	function Ab(a, d) {
		d = d === c ? h.options.langType : d;
		if (typeof a === "string") {
			if (!$[d]) return "no language";
			var e = a.length - 1;
			if (a.substr(e) === ".") return $[d][a.substr(0, e)];
			e = zb(a);
			return $[d][e.ns][e.key]
		}
		i(a, function(a, e) {
			var b = zb(a);
			$[d] || ($[d] = {});
			$[d][b.ns] || ($[d][b.ns] = {});
			$[d][b.ns][b.key] = e
		})
	}

	function Ea(a, d) {
		if (!a.collapsed) {
			var a = a.cloneRange().up(),
				e = a.startContainer,
				b = a.startOffset;
			if (ia || a.isControl())
				if ((e = h(e.childNodes[b])) && e.name == "img" && d(e)) return e
		}
	}

	function Pb() {
		var a = this;
		h(a.edit.doc).contextmenu(function(d) {
			a.menu && a.hideMenu();
			if (a.useContextmenu) {
				if (a._contextmenus.length !== 0) {
					var e =
						0,
						b = [];
					for (i(a._contextmenus, function() {
						if (this.title == "-") b.push(this);
						else if (this.cond && this.cond() && (b.push(this), this.width && this.width > e)) e = this.width
					}); b.length > 0 && b[0].title == "-";) b.shift();
					for (; b.length > 0 && b[b.length - 1].title == "-";) b.pop();
					var c = null;
					i(b, function(a) {
						this.title == "-" && c.title == "-" && delete b[a];
						c = this
					});
					if (b.length > 0) {
						d.preventDefault();
						var k = h(a.edit.iframe).pos(),
							t = Xa({
								x: k.x + d.clientX,
								y: k.y + d.clientY,
								width: e,
								css: {
									visibility: "hidden"
								},
								shadowMode: a.shadowMode
							});
						i(b, function() {
							this.title &&
								t.addItem(this)
						});
						var k = W(t.doc),
							f = t.div.height();
						d.clientY + f >= k.clientHeight - 100 && t.pos(t.x, j(t.y) - f);
						t.div.css("visibility", "visible");
						a.menu = t
					}
				}
			} else d.preventDefault()
		})
	}

	function Qb() {
		function a(a) {
			for (a = h(a.commonAncestor()); a;) {
				if (a.type == 1 && !a.isStyle()) break;
				a = a.parent()
			}
			return a.name
		}
		var d = this,
			e = d.edit.doc,
			b = d.newlineTag;
		if (!(C && b !== "br") && (!oa || !(N < 3 && b !== "p")) && !(Ma && N < 9)) {
			var c = z("h1,h2,h3,h4,h5,h6,pre,li"),
				k = z("p,h1,h2,h3,h4,h5,h6,pre,li,blockquote");
			h(e).keydown(function(h) {
				if (!(h.which !=
					13 || h.shiftKey || h.ctrlKey || h.altKey)) {
					d.cmd.selection();
					var f = a(d.cmd.range);
					f == "marquee" || f == "select" || (b === "br" && !c[f] ? (h.preventDefault(), d.insertHtml("<br />" + (C && N < 9 ? "" : "\u200b"))) : k[f] || ca(e, "formatblock", "<p>"))
				}
			});
			h(e).keyup(function(c) {
				if (!(c.which != 13 || c.shiftKey || c.ctrlKey || c.altKey) && b != "br")
					if (oa) {
						var c = d.cmd.commonAncestor("p"),
							u = d.cmd.commonAncestor("a");
						u && u.text() == "" && (u.remove(!0), d.cmd.range.selectNodeContents(c[0]).collapse(!0), d.cmd.select())
					} else
				if (d.cmd.selection(), c = a(d.cmd.range), !(c == "marquee" || c == "select"))
					if (k[c] || ca(e, "formatblock", "<p>"), c = d.cmd.commonAncestor("div")) {
						for (var u = h("<p></p>"), f = c[0].firstChild; f;) {
							var g = f.nextSibling;
							u.append(f);
							f = g
						}
						c.before(u);
						c.remove();
						d.cmd.range.selectNodeContents(u[0]);
						d.cmd.select()
					}
			})
		}
	}

	function Rb() {
		var a = this,
			d = a.edit.doc;
		h(d).keydown(function(e) {
			if (e.which == 9)
				if (e.preventDefault(), a.afterTab) a.afterTab.call(a, e);
				else {
					var e = a.cmd,
						b = e.range;
					b.shrink();
					b.collapsed && b.startContainer.nodeType == 1 && (b.insertNode(h("@&nbsp;", d)[0]), e.select());
					a.insertHtml("&nbsp;&nbsp;&nbsp;&nbsp;")
				}
		})
	}

	function Sb() {
		var a = this;
		h(a.edit.textarea[0], a.edit.win).focus(function(d) {
			a.afterFocus && a.afterFocus.call(a, d)
		}).blur(function(d) {
			a.afterBlur && a.afterBlur.call(a, d)
		})
	}

	function ja(a) {
		return n(a.replace(/<span [^>]*id="?__kindeditor_bookmark_\w+_\d+__"?[^>]*><\/span>/ig, ""))
	}

	function ab(a) {
		return a.replace(/<div[^>]+class="?__kindeditor_paste__"?[^>]*>[\s\S]*?<\/div>/ig, "")
	}

	function Bb(a, d) {
		if (a.length === 0) a.push(d);
		else {
			var e = a[a.length - 1];
			ja(d.html) !==
				ja(e.html) && a.push(d)
		}
	}

	function Cb(a, d) {
		var e = this.edit,
			b = e.doc.body,
			c, k;
		if (a.length === 0) return this;
		e.designMode ? (c = this.cmd.range, k = c.createBookmark(!0), k.html = b.innerHTML) : k = {
			html: b.innerHTML
		};
		Bb(d, k);
		var f = a.pop();
		ja(k.html) === ja(f.html) && a.length > 0 && (f = a.pop());
		e.designMode ? (e.html(f.html), f.start && (c.moveToBookmark(f), this.select())) : h(b).html(ja(f.html));
		return this
	}

	function za(a) {
		function d(a, d) {
			za.prototype[a] === c && (e[a] = d);
			e.options[a] = d
		}
		var e = this;
		e.options = {};
		i(a, function(e) {
			d(e, a[e])
		});
		i(h.options, function(a, b) {
			e[a] === c && d(a, b)
		});
		var b = h(e.srcElement || "<textarea/>");
		if (!e.width) e.width = b[0].style.width || b.width();
		if (!e.height) e.height = b[0].style.height || b.height();
		d("width", p(e.width, e.minWidth));
		d("height", p(e.height, e.minHeight));
		d("width", o(e.width));
		d("height", o(e.height));
		if (Tb && (!Ub || N < 534)) e.designMode = !1;
		e.srcElement = b;
		e.initContent = "";
		e.plugin = {};
		e.isCreated = !1;
		e.isLoading = !1;
		e._handlers = {};
		e._contextmenus = [];
		e._undoStack = [];
		e._redoStack = [];
		e._calledPlugins = {};
		e._firstAddBookmark = !0;
		e.menu = e.contextmenu = null;
		e.dialogs = []
	}

	function Db(a, d) {
		function e(a) {
			i(ha, function(d, e) {
				e.call(a, KindEditor)
			});
			return a.create()
		}
		d = d || {};
		d.basePath = p(d.basePath, h.basePath);
		d.themesPath = p(d.themesPath, d.basePath + "themes/");
		d.langPath = p(d.langPath, d.basePath + "lang/");
		d.pluginsPath = p(d.pluginsPath, d.basePath + "plugins/");
		if (p(d.loadStyleMode, h.options.loadStyleMode)) {
			var b = p(d.themeType, h.options.themeType);
			if(d.cusCssPath){
				$a(d.cusCssPath);
			}
		}
		if ((b = h(a)) && b.length !==
			0) {
			if (b.length > 1) return b.each(function() {
				Db(this, d)
			}), _instances[0];
			d.srcElement = b[0];
			var c = new za(d);
			_instances.push(c);
			if ($[c.langType]) return e(c);
			Za(c.langPath + c.langType + ".js?ver=" + encodeURIComponent(h.DEBUG ? Fa : Ga), function() {
				e(c)
			});
			return c
		}
	}

	function Eb(a, d) {
		h(a).each(function(a, b) {
			h.each(_instances, function(a, e) {
				if (e && e.srcElement[0] == b) return d.call(e, a, e), !1
			})
		})
	}
	if (!b.KindEditor) {
		if (!b.console) b.console = {};
		if (!console.log) console.log = function() {};
		var Ga = "4.1.5 (2013-01-20)",
			J = navigator.userAgent.toLowerCase(),
			C = J.indexOf("msie") > -1 && J.indexOf("opera") == -1,
			oa = J.indexOf("gecko") > -1 && J.indexOf("khtml") == -1,
			ia = J.indexOf("applewebkit") > -1,
			Ma = J.indexOf("opera") > -1,
			Tb = J.indexOf("mobile") > -1,
			Ub = /ipad|iphone|ipod/.test(J),
			ba = document.compatMode != "CSS1Compat",
			N = (J = /(?:msie|firefox|webkit|opera)[\/:\s](\d+)/.exec(J)) ? J[1] : "0",
			Fa = (new Date).getTime(),
			da = Math.round,
			h = {
				DEBUG: !1,
				VERSION: Ga,
				IE: C,
				GECKO: oa,
				WEBKIT: ia,
				OPERA: Ma,
				V: N,
				TIME: Fa,
				each: i,
				isArray: g,
				isFunction: l,
				inArray: f,
				inString: m,
				trim: n,
				addUnit: o,
				removeUnit: j,
				escape: q,
				unescape: s,
				toCamel: r,
				toHex: v,
				toMap: z,
				toArray: D,
				undef: p,
				invalidUrl: function(a) {
					return !a || /[<>"]/.test(a)
				},
				addParam: function(a, d) {
					return a.indexOf("?") >= 0 ? a + "&" + d : a + "?" + d
				},
				extend: B,
				json: A
			}, fb = z("a,abbr,acronym,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,img,input,ins,kbd,label,map,q,s,samp,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"),
			gb = z("address,applet,blockquote,body,center,dd,dir,div,dl,dt,fieldset,form,frameset,h1,h2,h3,h4,h5,h6,head,hr,html,iframe,ins,isindex,li,map,menu,meta,noframes,noscript,object,ol,p,pre,script,style,table,tbody,td,tfoot,th,thead,title,tr,ul"),
			eb = z("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed"),
			Fb = z("b,basefont,big,del,em,font,i,s,small,span,strike,strong,sub,sup,u"),
			Vb = z("img,table,input,textarea,button"),
			Ia = z("pre,style,script"),
			Ha = z("html,head,body,td,tr,table,ol,ul,li");
		z("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");
		var Jb = z("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"),
			Gb = z("input,button,textarea,select");
		h.basePath = function() {
			for (var a =
				document.getElementsByTagName("script"), d, e = 0, b = a.length; e < b; e++)
				if (d = a[e].src || "", /kindeditor[\w\-\.]*\.js/.test(d)) return d.substring(0, d.lastIndexOf("/") + 1);
			return ""
		}();
		h.options = {
			designMode: !0,
			fullscreenMode: !1,
			filterMode: !0,
			wellFormatMode: !0,
			shadowMode: !0,
			loadStyleMode: !0,
			basePath: h.basePath,
			themesPath: h.basePath + "themes/",
			langPath: h.basePath + "lang/",
			pluginsPath: h.basePath + "plugins/",
			themeType: "default",
			langType: "zh_CN",
			urlType: "",
			newlineTag: "p",
			resizeType: 2,
			syncType: "form",
			pasteType: 2,
			dialogAlignType: "page",
			useContextmenu: !0,
			fullscreenShortcut: !1,
			bodyClass: "ke-content",
			indentChar: "\t",
			cssPath: "",
			cssData: "",
			minWidth: 650,
			minHeight: 100,
			minChangeSize: 50,
			zIndex: 811213,
			items: ["source", "|", "undo", "redo", "|", "preview", "print", "template", "code", "cut", "copy", "paste", "plainpaste", "wordpaste", "|", "justifyleft", "justifycenter", "justifyright", "justifyfull", "insertorderedlist", "insertunorderedlist", "indent", "outdent", "subscript", "superscript", "clearhtml", "quickformat", "selectall", "|", "fullscreen", "/", "formatblock",
				"fontname", "fontsize", "|", "forecolor", "hilitecolor", "bold", "italic", "underline", "strikethrough", "lineheight", "removeformat", "|", "image", "multiimage", "flash", "media", "insertfile", "table", "hr", "emoticons", "baidumap", "pagebreak", "anchor", "link", "unlink", "|", "about"
			],
			noDisableItems: ["source", "fullscreen"],
			colorTable: [
				["#E53333", "#E56600", "#FF9900", "#64451D", "#DFC5A4", "#FFE500"],
				["#009900", "#006600", "#99BB00", "#B8D100", "#60D978", "#00D5FF"],
				["#337FE5", "#003399", "#4C33E5", "#9933E5", "#CC33E5", "#EE33EE"],
				["#FFFFFF", "#CCCCCC", "#999999", "#666666", "#333333", "#000000"]
			],
			fontSizeTable: ["9px", "10px", "12px", "14px", "16px", "18px", "24px", "32px"],
			htmlTags: {
				font: ["id", "class", "color", "size", "face", ".background-color"],
				span: ["id", "class", ".color", ".background-color", ".font-size", ".font-family", ".background", ".font-weight", ".font-style", ".text-decoration", ".vertical-align", ".line-height"],
				div: ["id", "class", "align", ".border", ".margin", ".padding", ".text-align", ".color", ".background-color", ".font-size", ".font-family",
					".font-weight", ".background", ".font-style", ".text-decoration", ".vertical-align", ".margin-left"
				],
				table: ["id", "class", "border", "cellspacing", "cellpadding", "width", "height", "align", "bordercolor", ".padding", ".margin", ".border", "bgcolor", ".text-align", ".color", ".background-color", ".font-size", ".font-family", ".font-weight", ".font-style", ".text-decoration", ".background", ".width", ".height", ".border-collapse"],
				"td,th": ["id", "class", "align", "valign", "width", "height", "colspan", "rowspan", "bgcolor", ".text-align",
					".color", ".background-color", ".font-size", ".font-family", ".font-weight", ".font-style", ".text-decoration", ".vertical-align", ".background", ".border"
				],
				a: ["id", "class", "href", "target", "name"],
				embed: ["id", "class", "src", "width", "height", "type", "loop", "autostart", "quality", ".width", ".height", "align", "allowscriptaccess"],
				img: ["id", "class", "src", "width", "height", "border", "alt", "title", "align", ".width", ".height", ".border"],
				"p,ol,ul,li,blockquote,h1,h2,h3,h4,h5,h6": ["id", "class", "align", ".text-align", ".color",
					".background-color", ".font-size", ".font-family", ".background", ".font-weight", ".font-style", ".text-decoration", ".vertical-align", ".text-indent", ".margin-left"
				],
				pre: ["id", "class"],
				hr: ["id", "class", ".page-break-after"],
				"br,tbody,tr,strong,b,sub,sup,em,i,u,strike,s,del": ["id", "class"],
				iframe: ["id", "class", "src", "frameborder", "width", "height", ".width", ".height"]
			},
			layout: '<div class="container"><div class="toolbar"></div><div class="edit"></div><div class="statusbar"></div></div>'
		};
		var cb = !1,
			Hb = z("8,9,13,32,46,48..57,59,61,65..90,106,109..111,188,190..192,219..222"),
			J = z("33..40"),
			bb = {};
		i(Hb, function(a, d) {
			bb[a] = d
		});
		i(J, function(a, d) {
			bb[a] = d
		});
		var Wb = "altKey,attrChange,attrName,bubbles,button,cancelable,charCode,clientX,clientY,ctrlKey,currentTarget,data,detail,eventPhase,fromElement,handler,keyCode,metaKey,newValue,offsetX,offsetY,originalTarget,pageX,pageY,prevValue,relatedNode,relatedTarget,screenX,screenY,shiftKey,srcElement,target,toElement,view,wheelDelta,which".split(",");
		B(E, {
			init: function(a, d) {
				var e = this,
					b = a.ownerDocument || a.document || a;
				e.event = d;
				i(Wb,
					function(a, b) {
						e[b] = d[b]
					});
				if (!e.target) e.target = e.srcElement || b;
				if (e.target.nodeType === 3) e.target = e.target.parentNode;
				if (!e.relatedTarget && e.fromElement) e.relatedTarget = e.fromElement === e.target ? e.toElement : e.fromElement;
				if (e.pageX == null && e.clientX != null) {
					var h = b.documentElement,
						b = b.body;
					e.pageX = e.clientX + (h && h.scrollLeft || b && b.scrollLeft || 0) - (h && h.clientLeft || b && b.clientLeft || 0);
					e.pageY = e.clientY + (h && h.scrollTop || b && b.scrollTop || 0) - (h && h.clientTop || b && b.clientTop || 0)
				}
				if (!e.which && (e.charCode || e.charCode ===
					0 ? e.charCode : e.keyCode)) e.which = e.charCode || e.keyCode;
				if (!e.metaKey && e.ctrlKey) e.metaKey = e.ctrlKey;
				if (!e.which && e.button !== c) e.which = e.button & 1 ? 1 : e.button & 2 ? 3 : e.button & 4 ? 2 : 0;
				switch (e.which) {
					case 186:
						e.which = 59;
						break;
					case 187:
					case 107:
					case 43:
						e.which = 61;
						break;
					case 189:
					case 45:
						e.which = 109;
						break;
					case 42:
						e.which = 106;
						break;
					case 47:
						e.which = 111;
						break;
					case 78:
						e.which = 110
				}
				e.which >= 96 && e.which <= 105 && (e.which -= 48)
			},
			preventDefault: function() {
				var a = this.event;
				a.preventDefault && a.preventDefault();
				a.returnValue = !1
			},
			stopPropagation: function() {
				var a = this.event;
				a.stopPropagation && a.stopPropagation();
				a.cancelBubble = !0
			},
			stop: function() {
				this.preventDefault();
				this.stopPropagation()
			}
		});
		var ka = "kindeditor_" + Fa,
			db = 0,
			L = {};
		C && b.attachEvent("onunload", function() {
			i(L, function(a, d) {
				d.el && U(d.el)
			})
		});
		h.ctrl = P;
		h.ready = function(a) {
			function d() {
				h || (h = !0, a(KindEditor))
			}

			function e() {
				if (!h) {
					try {
						document.documentElement.doScroll("left")
					} catch (a) {
						setTimeout(e, 100);
						return
					}
					d()
				}
			}

			function c() {
				document.readyState === "complete" && d()
			}
			var h = !1;
			if (document.addEventListener) R(document, "DOMContentLoaded", d);
			else if (document.attachEvent) {
				R(document, "readystatechange", c);
				var k = !1;
				try {
					k = b.frameElement == null
				} catch (f) {}
				document.documentElement.doScroll && k && e()
			}
			R(b, "load", d)
		};
		h.formatUrl = I;
		h.formatHtml = M;
		h.getCssList = O;
		h.getAttrList = H;
		h.mediaType = T;
		h.mediaAttrs = hb;
		h.mediaEmbed = Ja;
		h.mediaImg = ib;
		h.clearMsWord = V;
		h.tmpl = function(a, d) {
			var e = new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + a.replace(/[\r\t\n]/g,
				" ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
			return d ? e(d) : e
		};
		J = document.createElement("div");
		J.setAttribute("className", "t");
		var Kb = J.className !== "t";
		h.query = function(a, d) {
			var e = Ca(a, d);
			return e.length > 0 ? e[0] : null
		};
		h.queryAll = Ca;
		B(Q, {
			init: function(a) {
				for (var a = g(a) ? a : [a], d = 0, e = 0, b = a.length; e < b; e++) a[e] && (this[e] = a[e].constructor === Q ? a[e][0] : a[e],
					d++);
				this.length = d;
				this.doc = fa(this[0]);
				this.name = La(this[0]);
				this.type = this.length > 0 ? this[0].nodeType : null;
				this.win = ga(this[0])
			},
			each: function(a) {
				for (var d = 0; d < this.length; d++)
					if (a.call(this[d], d, this[d]) === !1) break;
				return this
			},
			bind: function(a, d) {
				this.each(function() {
					R(this, a, d)
				});
				return this
			},
			unbind: function(a, d) {
				this.each(function() {
					U(this, a, d)
				});
				return this
			},
			fire: function(a) {
				if (this.length < 1) return this;
				aa(this[0], a);
				return this
			},
			hasAttr: function(a) {
				if (this.length < 1) return !1;
				return !!Ba(this[0],
					a)
			},
			attr: function(a, d) {
				var e = this;
				if (a === c) return H(e.outer());
				if (typeof a === "object") return i(a, function(a, d) {
					e.attr(a, d)
				}), e;
				if (d === c) return d = e.length < 1 ? null : Ba(e[0], a), d === null ? "" : d;
				e.each(function() {
					Ka(this, a, d)
				});
				return e
			},
			removeAttr: function(a) {
				this.each(function() {
					var d = a;
					C && N < 8 && d.toLowerCase() == "class" && (d = "className");
					Ka(this, d, "");
					this.removeAttribute(d)
				});
				return this
			},
			get: function(a) {
				if (this.length < 1) return null;
				return this[a || 0]
			},
			eq: function(a) {
				if (this.length < 1) return null;
				return this[a] ?
					new Q(this[a]) : null
			},
			hasClass: function(a) {
				if (this.length < 1) return !1;
				return m(a, this[0].className, " ")
			},
			addClass: function(a) {
				this.each(function() {
					if (!m(a, this.className, " ")) this.className = n(this.className + " " + a)
				});
				return this
			},
			removeClass: function(a) {
				this.each(function() {
					if (m(a, this.className, " ")) this.className = n(this.className.replace(RegExp("(^|\\s)" + a + "(\\s|$)"), " "))
				});
				return this
			},
			html: function(a) {
				if (a === c) {
					if (this.length < 1 || this.type != 1) return "";
					return M(this[0].innerHTML)
				}
				this.each(function() {
					Lb(this,
						a)
				});
				return this
			},
			text: function() {
				if (this.length < 1) return "";
				return C ? this[0].innerText : this[0].textContent
			},
			hasVal: function() {
				if (this.length < 1) return !1;
				return !!Gb[La(this[0])]
			},
			val: function(a) {
				if (a === c) {
					if (this.length < 1) return "";
					return this.hasVal() ? this[0].value : this.attr("value")
				} else return this.each(function() {
					Gb[La(this)] ? this.value = a : Ka(this, "value", a)
				}), this
			},
			css: function(a, d) {
				var e = this;
				if (a === c) return O(e.attr("style"));
				if (typeof a === "object") return i(a, function(a, d) {
					e.css(a, d)
				}), e;
				if (d ===
					c) {
					if (e.length < 1) return "";
					return e[0].style[r(a)] || Mb(e[0], a) || ""
				}
				e.each(function() {
					this.style[r(a)] = d
				});
				return e
			},
			width: function(a) {
				if (a === c) {
					if (this.length < 1) return 0;
					return this[0].offsetWidth
				}
				return this.css("width", o(a))
			},
			height: function(a) {
				if (a === c) {
					if (this.length < 1) return 0;
					return this[0].offsetHeight
				}
				return this.css("height", o(a))
			},
			opacity: function(a) {
				this.each(function() {
					this.style.opacity === c ? this.style.filter = a == 1 ? "" : "alpha(opacity=" + a * 100 + ")" : this.style.opacity = a == 1 ? "" : a
				});
				return this
			},
			data: function(a, d) {
				a = "kindeditor_data_" + a;
				if (d === c) {
					if (this.length < 1) return null;
					return this[0][a]
				}
				this.each(function() {
					this[a] = d
				});
				return this
			},
			pos: function() {
				var a = this[0],
					d = 0,
					e = 0;
				if (a)
					if (a.getBoundingClientRect) a = a.getBoundingClientRect(), e = la(this.doc), d = a.left + e.x, e = a.top + e.y;
					else
						for (; a;) d += a.offsetLeft, e += a.offsetTop, a = a.offsetParent;
				return {
					x: da(d),
					y: da(e)
				}
			},
			clone: function(a) {
				if (this.length < 1) return new Q([]);
				return new Q(this[0].cloneNode(a))
			},
			append: function(a) {
				this.each(function() {
					this.appendChild &&
						this.appendChild(h(a)[0])
				});
				return this
			},
			appendTo: function(a) {
				this.each(function() {
					h(a)[0].appendChild(this)
				});
				return this
			},
			before: function(a) {
				this.each(function() {
					this.parentNode.insertBefore(h(a)[0], this)
				});
				return this
			},
			after: function(a) {
				this.each(function() {
					this.nextSibling ? this.parentNode.insertBefore(h(a)[0], this.nextSibling) : this.parentNode.appendChild(h(a)[0])
				});
				return this
			},
			replaceWith: function(a) {
				var d = [];
				this.each(function(e, b) {
					U(b);
					var c = h(a)[0];
					b.parentNode.replaceChild(c, b);
					d.push(c)
				});
				return h(d)
			},
			empty: function() {
				this.each(function(a, d) {
					for (var e = d.firstChild; e;) {
						if (!d.parentNode) break;
						var b = e.nextSibling;
						e.parentNode.removeChild(e);
						e = b
					}
				});
				return this
			},
			remove: function(a) {
				var d = this;
				d.each(function(e, b) {
					if (b.parentNode) {
						U(b);
						if (a)
							for (var c = b.firstChild; c;) {
								var k = c.nextSibling;
								b.parentNode.insertBefore(c, b);
								c = k
							}
						b.parentNode.removeChild(b);
						delete d[e]
					}
				});
				d.length = 0;
				return d
			},
			show: function(a) {
				a === c && (a = this._originDisplay || "");
				if (this.css("display") != "none") return this;
				return this.css("display",
					a)
			},
			hide: function() {
				if (this.length < 1) return this;
				this._originDisplay = this[0].style.display;
				return this.css("display", "none")
			},
			outer: function() {
				if (this.length < 1) return "";
				var a = this.doc.createElement("div");
				a.appendChild(this[0].cloneNode(!0));
				return M(a.innerHTML)
			},
			isSingle: function() {
				return !!eb[this.name]
			},
			isInline: function() {
				return !!fb[this.name]
			},
			isBlock: function() {
				return !!gb[this.name]
			},
			isStyle: function() {
				return !!Fb[this.name]
			},
			isControl: function() {
				return !!Vb[this.name]
			},
			contains: function(a) {
				if (this.length <
					1) return !1;
				return Aa(this[0], h(a)[0])
			},
			parent: function() {
				if (this.length < 1) return null;
				var a = this[0].parentNode;
				return a ? new Q(a) : null
			},
			children: function() {
				if (this.length < 1) return new Q([]);
				for (var a = [], d = this[0].firstChild; d;)(d.nodeType != 3 || n(d.nodeValue) !== "") && a.push(d), d = d.nextSibling;
				return new Q(a)
			},
			first: function() {
				var a = this.children();
				return a.length > 0 ? a.eq(0) : null
			},
			last: function() {
				var a = this.children();
				return a.length > 0 ? a.eq(a.length - 1) : null
			},
			index: function() {
				if (this.length < 1) return -1;
				for (var a = -1, d = this[0]; d;) a++, d = d.previousSibling;
				return a
			},
			prev: function() {
				if (this.length < 1) return null;
				var a = this[0].previousSibling;
				return a ? new Q(a) : null
			},
			next: function() {
				if (this.length < 1) return null;
				var a = this[0].nextSibling;
				return a ? new Q(a) : null
			},
			scan: function(a, d) {
				function e(b) {
					for (b = d ? b.firstChild : b.lastChild; b;) {
						var c = d ? b.nextSibling : b.previousSibling;
						if (a(b) === !1) return !1;
						if (e(b) === !1) return !1;
						b = c
					}
				}
				if (!(this.length < 1)) return d = d === c ? !0 : d, e(this[0]), this
			}
		});
		i("blur,focus,focusin,focusout,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error,contextmenu".split(","),
			function(a, d) {
				Q.prototype[d] = function(a) {
					return a ? this.bind(d, a) : this.fire(d)
				}
			});
		J = h;
		h = function(a, d) {
			function e(a) {
				a[0] || (a = []);
				return new Q(a)
			}
			if (!(a === c || a === null)) {
				if (typeof a === "string") {
					d && (d = h(d)[0]);
					var b = a.length;
					a.charAt(0) === "@" && (a = a.substr(1));
					if (a.length !== b || /<.+>/.test(a)) {
						var b = (d ? d.ownerDocument || d : document).createElement("div"),
							f = [];
						b.innerHTML = '<img id="__kindeditor_temp_tag__" width="0" height="0" style="display:none;" />' + a;
						for (var k = 0, t = b.childNodes.length; k < t; k++) {
							var j = b.childNodes[k];
							j.id != "__kindeditor_temp_tag__" && f.push(j)
						}
						return e(f)
					}
					return e(Ca(a, d))
				}
				if (a && a.constructor === Q) return a;
				a.toArray && (a = a.toArray());
				if (g(a)) return e(a);
				return e(D(arguments))
			}
		};
		i(J, function(a, d) {
			h[a] = d
		});
		h.NodeClass = Q;
		b.KindEditor = h;
		var qa = 0,
			pa = 1,
			ma = 2,
			ra = 3,
			Ib = 0;
		B(Z, {
			init: function(a) {
				this.startContainer = a;
				this.startOffset = 0;
				this.endContainer = a;
				this.endOffset = 0;
				this.collapsed = !0;
				this.doc = a
			},
			commonAncestor: function() {
				function a(a) {
					for (var d = []; a;) d.push(a), a = a.parentNode;
					return d
				}
				for (var d = a(this.startContainer),
						e = a(this.endContainer), b = 0, c = d.length, k = e.length, h, f; ++b;)
					if (h = d[c - b], f = e[k - b], !h || !f || h !== f) break;
				return d[c - b + 1]
			},
			setStart: function(a, d) {
				var e = this.doc;
				this.startContainer = a;
				this.startOffset = d;
				if (this.endContainer === e) this.endContainer = a, this.endOffset = d;
				return jb(this)
			},
			setEnd: function(a, d) {
				var e = this.doc;
				this.endContainer = a;
				this.endOffset = d;
				if (this.startContainer === e) this.startContainer = a, this.startOffset = d;
				return jb(this)
			},
			setStartBefore: function(a) {
				return this.setStart(a.parentNode || this.doc,
					h(a).index())
			},
			setStartAfter: function(a) {
				return this.setStart(a.parentNode || this.doc, h(a).index() + 1)
			},
			setEndBefore: function(a) {
				return this.setEnd(a.parentNode || this.doc, h(a).index())
			},
			setEndAfter: function(a) {
				return this.setEnd(a.parentNode || this.doc, h(a).index() + 1)
			},
			selectNode: function(a) {
				return this.setStartBefore(a).setEndAfter(a)
			},
			selectNodeContents: function(a) {
				var d = h(a);
				if (d.type == 3 || d.isSingle()) return this.selectNode(a);
				d = d.children();
				if (d.length > 0) return this.setStartBefore(d[0]).setEndAfter(d[d.length -
					1]);
				return this.setStart(a, 0).setEnd(a, 0)
			},
			collapse: function(a) {
				if (a) return this.setEnd(this.startContainer, this.startOffset);
				return this.setStart(this.endContainer, this.endOffset)
			},
			compareBoundaryPoints: function(a, d) {
				var e = this.get(),
					b = d.get();
				if (C) {
					var c = {};
					c[qa] = "StartToStart";
					c[pa] = "EndToStart";
					c[ma] = "EndToEnd";
					c[ra] = "StartToEnd";
					e = e.compareEndPoints(c[a], b);
					if (e !== 0) return e;
					var k, f, g, j;
					if (a === qa || a === ra) k = this.startContainer, g = this.startOffset;
					if (a === pa || a === ma) k = this.endContainer, g = this.endOffset;
					if (a === qa || a === pa) f = d.startContainer, j = d.startOffset;
					if (a === ma || a === ra) f = d.endContainer, j = d.endOffset;
					if (k === f) return k = g - j, k > 0 ? 1 : k < 0 ? -1 : 0;
					for (e = f; e && e.parentNode !== k;) e = e.parentNode;
					if (e) return h(e).index() >= g ? -1 : 1;
					for (e = k; e && e.parentNode !== f;) e = e.parentNode;
					if (e) return h(e).index() >= j ? 1 : -1;
					if ((e = h(f).next()) && e.contains(k)) return 1;
					if ((e = h(k).next()) && e.contains(f)) return -1
				} else return e.compareBoundaryPoints(a, b)
			},
			cloneRange: function() {
				return (new Z(this.doc)).setStart(this.startContainer, this.startOffset).setEnd(this.endContainer,
					this.endOffset)
			},
			toString: function() {
				var a = this.get();
				return (C ? a.text : a.toString()).replace(/\r\n|\n|\r/g, "")
			},
			cloneContents: function() {
				return Na(this, !0, !1)
			},
			deleteContents: function() {
				return Na(this, !1, !0)
			},
			extractContents: function() {
				return Na(this, !0, !0)
			},
			insertNode: function(a) {
				var d = this.startContainer,
					e = this.startOffset,
					b = this.endContainer,
					c = this.endOffset,
					h, f, g, j = 1;
				if (a.nodeName.toLowerCase() === "#document-fragment") h = a.firstChild, f = a.lastChild, j = a.childNodes.length;
				d.nodeType == 1 ? (g = d.childNodes[e]) ?
					(d.insertBefore(a, g), d === b && (c += j)) : d.appendChild(a) : d.nodeType == 3 && (e === 0 ? (d.parentNode.insertBefore(a, d), d.parentNode === b && (c += j)) : e >= d.nodeValue.length ? d.nextSibling ? d.parentNode.insertBefore(a, d.nextSibling) : d.parentNode.appendChild(a) : (g = e > 0 ? d.splitText(e) : d, d.parentNode.insertBefore(a, g), d === b && (b = g, c -= e)));
				h ? this.setStartBefore(h).setEndAfter(f) : this.selectNode(a);
				if (this.compareBoundaryPoints(ma, this.cloneRange().setEnd(b, c)) >= 1) return this;
				return this.setEnd(b, c)
			},
			surroundContents: function(a) {
				a.appendChild(this.extractContents());
				return this.insertNode(a).selectNode(a)
			},
			isControl: function() {
				var a = this.startContainer,
					d = this.startOffset,
					e = this.endContainer,
					b = this.endOffset;
				return a.nodeType == 1 && a === e && d + 1 === b && h(a.childNodes[d]).isControl()
			},
			get: function(a) {
				var d = this.doc;
				if (!C) {
					d = d.createRange();
					try {
						d.setStart(this.startContainer, this.startOffset), d.setEnd(this.endContainer, this.endOffset)
					} catch (e) {}
					return d
				}
				if (a && this.isControl()) return d = d.body.createControlRange(), d.addElement(this.startContainer.childNodes[this.startOffset]),
				d;
				a = this.cloneRange().down();
				d = d.body.createTextRange();
				d.setEndPoint("StartToStart", lb(a.startContainer, a.startOffset));
				d.setEndPoint("EndToStart", lb(a.endContainer, a.endOffset));
				return d
			},
			html: function() {
				return h(this.cloneContents()).outer()
			},
			down: function() {
				function a(a, b, c) {
					if (a.nodeType == 1 && (a = h(a).children(), a.length !== 0)) {
						var k, f, g, j;
						b > 0 && (k = a.eq(b - 1));
						b < a.length && (f = a.eq(b));
						if (k && k.type == 3) g = k[0], j = g.nodeValue.length;
						f && f.type == 3 && (g = f[0], j = 0);
						g && (c ? d.setStart(g, j) : d.setEnd(g, j))
					}
				}
				var d =
					this;
				a(d.startContainer, d.startOffset, !0);
				a(d.endContainer, d.endOffset, !1);
				return d
			},
			up: function() {
				function a(a, b, c) {
					a.nodeType == 3 && (b === 0 ? c ? d.setStartBefore(a) : d.setEndBefore(a) : b == a.nodeValue.length && (c ? d.setStartAfter(a) : d.setEndAfter(a)))
				}
				var d = this;
				a(d.startContainer, d.startOffset, !0);
				a(d.endContainer, d.endOffset, !1);
				return d
			},
			enlarge: function(a) {
				function d(d, b, c) {
					d = h(d);
					if (!(d.type == 3 || Ha[d.name] || !a && d.isBlock()))
						if (b === 0) {
							for (; !d.prev();) {
								b = d.parent();
								if (!b || Ha[b.name] || !a && b.isBlock()) break;
								d = b
							}
							c ? e.setStartBefore(d[0]) : e.setEndBefore(d[0])
						} else
					if (b == d.children().length) {
						for (; !d.next();) {
							b = d.parent();
							if (!b || Ha[b.name] || !a && b.isBlock()) break;
							d = b
						}
						c ? e.setStartAfter(d[0]) : e.setEndAfter(d[0])
					}
				}
				var e = this;
				e.up();
				d(e.startContainer, e.startOffset, !0);
				d(e.endContainer, e.endOffset, !1);
				return e
			},
			shrink: function() {
				for (var a, d = this.collapsed; this.startContainer.nodeType == 1 && (a = this.startContainer.childNodes[this.startOffset]) && a.nodeType == 1 && !h(a).isSingle();) this.setStart(a, 0);
				if (d) return this.collapse(d);
				for (; this.endContainer.nodeType == 1 && this.endOffset > 0 && (a = this.endContainer.childNodes[this.endOffset - 1]) && a.nodeType == 1 && !h(a).isSingle();) this.setEnd(a, a.childNodes.length);
				return this
			},
			createBookmark: function(a) {
				var d, e = h('<span style="display:none;"></span>', this.doc)[0];
				e.id = "__kindeditor_bookmark_start_" + Ib+++"__";
				if (!this.collapsed) d = e.cloneNode(!0), d.id = "__kindeditor_bookmark_end_" + Ib+++"__";
				d && this.cloneRange().collapse(!1).insertNode(d).setEndBefore(d);
				this.insertNode(e).setStartAfter(e);
				return {
					start: a ? "#" + e.id : e,
					end: d ? a ? "#" + d.id : d : null
				}
			},
			moveToBookmark: function(a) {
				var d = this.doc,
					e = h(a.start, d),
					a = a.end ? h(a.end, d) : null;
				if (!e || e.length < 1) return this;
				this.setStartBefore(e[0]);
				e.remove();
				a && a.length > 0 ? (this.setEndBefore(a[0]), a.remove()) : this.collapse(!0);
				return this
			},
			dump: function() {
				console.log("--------------------");
				console.log(this.startContainer.nodeType == 3 ? this.startContainer.nodeValue : this.startContainer, this.startOffset);
				console.log(this.endContainer.nodeType == 3 ? this.endContainer.nodeValue :
					this.endContainer, this.endOffset)
			}
		});
		h.RangeClass = Z;
		h.range = Oa;
		h.START_TO_START = qa;
		h.START_TO_END = pa;
		h.END_TO_END = ma;
		h.END_TO_START = ra;
		B(ta, {
			init: function(a) {
				var d = a.doc;
				this.doc = d;
				this.win = ga(d);
				this.sel = Pa(d);
				this.range = a
			},
			selection: function(a) {
				var d = this.doc,
					e;
				e = Pa(d);
				var b;
				try {
					b = e.rangeCount > 0 ? e.getRangeAt(0) : e.createRange()
				} catch (c) {}
				e = C && (!b || !b.item && b.parentElement().ownerDocument !== d) ? null : b;
				this.sel = Pa(d);
				if (e) return this.range = Oa(e), h(this.range.startContainer).name == "html" && this.range.selectNodeContents(d.body).collapse(!1),
				this;
				a && this.range.selectNodeContents(d.body).collapse(!1);
				return this
			},
			select: function(a) {
				var a = p(a, !0),
					d = this.sel,
					b = this.range.cloneRange().shrink(),
					c = b.startContainer,
					f = b.startOffset,
					k = fa(c),
					g = this.win,
					j, i = !1;
				if (a && c.nodeType == 1 && b.collapsed) {
					if (C) {
						d = h("<span>&nbsp;</span>", k);
						b.insertNode(d[0]);
						j = k.body.createTextRange();
						try {
							j.moveToElementText(d[0])
						} catch (m) {}
						j.collapse(!1);
						j.select();
						d.remove();
						g.focus();
						return this
					}
					if (ia && (a = c.childNodes, h(c).isInline() || f > 0 && h(a[f - 1]).isInline() || a[f] && h(a[f]).isInline())) b.insertNode(k.createTextNode("\u200b")),
					i = !0
				}
				if (C) try {
					j = b.get(!0), j.select()
				} catch (o) {} else i && b.collapse(!1), j = b.get(!0), d.removeAllRanges(), d.addRange(j), b = h(j.endContainer).pos(), g.scrollTo(b.x, b.y);
				g.focus();
				return this
			},
			wrap: function(a) {
				var d = this.range,
					b;
				b = h(a, this.doc);
				if (d.collapsed) return d.shrink(), d.insertNode(b[0]).selectNodeContents(b[0]), this;
				if (b.isBlock()) {
					for (var c = a = b.clone(!0); c.first();) c = c.first();
					c.append(d.extractContents());
					d.insertNode(a[0]).selectNode(a[0]);
					return this
				}
				d.enlarge();
				var f = d.createBookmark(),
					a = d.commonAncestor(),
					k = !1;
				h(a).scan(function(a) {
					if (!k && a == f.start) k = !0;
					else if (k) {
						if (a == f.end) return !1;
						var d = h(a),
							c;
						a: {
							for (c = d; c && c.name != "body";) {
								if (Ia[c.name] || c.name == "div" && c.hasClass("ke-script")) {
									c = !0;
									break a
								}
								c = c.parent()
							}
							c = !1
						}
						if (!c && d.type == 3 && n(a.nodeValue).length > 0) {
							for (var g;
								(g = d.parent()) && g.isStyle() && g.children().length == 1;) d = g;
							g = b;
							g = g.clone(!0);
							if (d.type == 3) Sa(g).append(d.clone(!1)), d.replaceWith(g);
							else {
								for (var a = d, j;
									(j = d.first()) && j.children().length == 1;) d = j;
								j = d.first();
								for (d = d.doc.createDocumentFragment(); j;) d.appendChild(j[0]),
								j = j.next();
								j = a.clone(!0);
								c = Sa(j);
								for (var i = j, m = !1; g;) {
									for (; i;) i.name === g.name && (Nb(i, g.attr(), g.css()), m = !0), i = i.first();
									m || c.append(g.clone(!1));
									m = !1;
									g = g.first()
								}
								g = j;
								d.firstChild && Sa(g).append(d);
								a.replaceWith(g)
							}
						}
					}
				});
				d.moveToBookmark(f);
				return this
			},
			split: function(a, d) {
				for (var b = this.range, c = b.doc, f = b.cloneRange().collapse(a), k = f.startContainer, g = f.startOffset, j = k.nodeType == 3 ? k.parentNode : k, i = !1, m; j && j.parentNode;) {
					m = h(j);
					if (d) {
						if (!m.isStyle()) break;
						if (!Qa(m, d)) break
					} else if (Ha[m.name]) break;
					i = !0;
					j = j.parentNode
				}
				if (i) c = c.createElement("span"), b.cloneRange().collapse(!a).insertNode(c), a ? f.setStartBefore(j.firstChild).setEnd(k, g) : f.setStart(k, g).setEndAfter(j.lastChild), k = f.extractContents(), g = k.firstChild, i = k.lastChild, a ? (f.insertNode(k), b.setStartAfter(i).setEndBefore(c)) : (j.appendChild(k), b.setStartBefore(c).setEndBefore(g)), f = c.parentNode, f == b.endContainer && (j = h(c).prev(), k = h(c).next(), j && k && j.type == 3 && k.type == 3 ? b.setEnd(j[0], j[0].nodeValue.length) : a || b.setEnd(b.endContainer, b.endOffset -
					1)), f.removeChild(c);
				return this
			},
			remove: function(a) {
				var d = this.doc,
					b = this.range;
				b.enlarge();
				if (b.startOffset === 0) {
					for (var c = h(b.startContainer), f;
						(f = c.parent()) && f.isStyle() && f.children().length == 1;) c = f;
					b.setStart(c[0], 0);
					c = h(b.startContainer);
					c.isBlock() && Ra(c, a);
					(c = c.parent()) && c.isBlock() && Ra(c, a)
				}
				if (b.collapsed) {
					this.split(!0, a);
					d = b.startContainer;
					c = b.startOffset;
					if (c > 0 && (f = h(d.childNodes[c - 1])) && na(f)) f.remove(), b.setStart(d, c - 1);
					(c = h(d.childNodes[c])) && na(c) && c.remove();
					na(d) && (b.startBefore(d),
						d.remove());
					b.collapse(!0);
					return this
				}
				this.split(!0, a);
				this.split(!1, a);
				var k = d.createElement("span"),
					g = d.createElement("span");
				b.cloneRange().collapse(!1).insertNode(g);
				b.cloneRange().collapse(!0).insertNode(k);
				var j = [],
					m = !1;
				h(b.commonAncestor()).scan(function(a) {
					if (!m && a == k) m = !0;
					else {
						if (a == g) return !1;
						m && j.push(a)
					}
				});
				h(k).remove();
				h(g).remove();
				d = b.startContainer;
				c = b.startOffset;
				f = b.endContainer;
				var o = b.endOffset;
				if (c > 0) {
					var n = h(d.childNodes[c - 1]);
					n && na(n) && (n.remove(), b.setStart(d, c - 1), d == f && b.setEnd(f,
						o - 1));
					if ((c = h(d.childNodes[c])) && na(c)) c.remove(), d == f && b.setEnd(f, o - 1)
				}(d = h(f.childNodes[b.endOffset])) && na(d) && d.remove();
				d = b.createBookmark(!0);
				i(j, function(d, b) {
					Ra(h(b), a)
				});
				b.moveToBookmark(d);
				return this
			},
			commonNode: function(a) {
				function d(d) {
					for (var b = d; d;) {
						if (Qa(h(d), a)) return h(d);
						d = d.parentNode
					}
					for (; b && (b = b.lastChild);)
						if (Qa(h(b), a)) return h(b);
					return null
				}
				var b = this.range,
					c = b.endContainer,
					b = b.endOffset,
					f = c.nodeType == 3 || b === 0 ? c : c.childNodes[b - 1],
					k = d(f);
				if (k) return k;
				if (f.nodeType == 1 || c.nodeType ==
					3 && b === 0)
					if (c = h(f).prev()) return d(c);
				return null
			},
			commonAncestor: function(a) {
				function d(d) {
					for (; d;) {
						if (d.nodeType == 1 && d.tagName.toLowerCase() === a) return d;
						d = d.parentNode
					}
					return null
				}
				var b = this.range,
					c = b.startContainer,
					f = b.startOffset,
					k = b.endContainer,
					b = b.endOffset,
					k = k.nodeType == 3 || b === 0 ? k : k.childNodes[b - 1],
					c = d(c.nodeType == 3 || f === 0 ? c : c.childNodes[f - 1]),
					f = d(k);
				if (c && f && c === f) return h(c);
				return null
			},
			state: function(a) {
				var d = this.doc,
					b = !1;
				try {
					b = d.queryCommandState(a)
				} catch (c) {}
				return b
			},
			val: function(a) {
				var d =
					this.doc,
					a = a.toLowerCase(),
					b = "";
				if (a === "fontfamily" || a === "fontname") return b = nb(d, "fontname"), b = b.replace(/['"]/g, ""), b.toLowerCase();
				if (a === "formatblock") {
					b = nb(d, a);
					if (b === "" && (a = this.commonNode({
						"h1,h2,h3,h4,h5,h6,p,div,pre,address": "*"
					}))) b = a.name;
					b === "Normal" && (b = "p");
					return b.toLowerCase()
				}
				if (a === "fontsize") return (a = this.commonNode({
					"*": ".font-size"
				})) && (b = a.css("font-size")), b.toLowerCase();
				if (a === "forecolor") return (a = this.commonNode({
					"*": ".color"
				})) && (b = a.css("color")), b = v(b), b === "" && (b = "default"),
				b.toLowerCase();
				if (a === "hilitecolor") return (a = this.commonNode({
					"*": ".background-color"
				})) && (b = a.css("background-color")), b = v(b), b === "" && (b = "default"), b.toLowerCase();
				return b
			},
			toggle: function(a, d) {
				this.commonNode(d) ? this.remove(d) : this.wrap(a);
				return this.select()
			},
			bold: function() {
				return this.toggle("<strong></strong>", {
					span: ".font-weight=bold",
					strong: "*",
					b: "*"
				})
			},
			italic: function() {
				return this.toggle("<em></em>", {
					span: ".font-style=italic",
					em: "*",
					i: "*"
				})
			},
			underline: function() {
				return this.toggle("<u></u>", {
					span: ".text-decoration=underline",
					u: "*"
				})
			},
			strikethrough: function() {
				return this.toggle("<s></s>", {
					span: ".text-decoration=line-through",
					s: "*"
				})
			},
			forecolor: function(a) {
				return this.toggle('<span style="color:' + a + ';"></span>', {
					span: ".color=" + a,
					font: "color"
				})
			},
			hilitecolor: function(a) {
				return this.toggle('<span style="background-color:' + a + ';"></span>', {
					span: ".background-color=" + a
				})
			},
			fontsize: function(a) {
				return this.toggle('<span style="font-size:' + a + ';"></span>', {
					span: ".font-size=" + a,
					font: "size"
				})
			},
			fontname: function(a) {
				return this.fontfamily(a)
			},
			fontfamily: function(a) {
				return this.toggle('<span style="font-family:' + a + ';"></span>', {
					span: ".font-family=" + a,
					font: "face"
				})
			},
			removeformat: function() {
				var a = {
					"*": ".font-weight,.font-style,.text-decoration,.color,.background-color,.font-size,.font-family,.text-indent"
				};
				i(Fb, function(d) {
					a[d] = "*"
				});
				this.remove(a);
				return this.select()
			},
			inserthtml: function(a, d) {
				function b(a, d) {
					var d = '<img id="__kindeditor_temp_tag__" width="0" height="0" style="display:none;" />' + d,
						e = a.get();
					e.item ? e.item(0).outerHTML = d :
						e.pasteHTML(d);
					var c = a.doc.getElementById("__kindeditor_temp_tag__");
					c.parentNode.removeChild(c);
					e = mb(e);
					a.setEnd(e.endContainer, e.endOffset);
					a.collapse(!1);
					f.select(!1)
				}

				function c(a, d) {
					var b = a.doc,
						e = b.createDocumentFragment();
					h("@" + d, b).each(function() {
						e.appendChild(this)
					});
					a.deleteContents();
					a.insertNode(e);
					a.collapse(!1);
					f.select(!1)
				}
				var f = this,
					k = f.range;
				if (a === "") return f;
				if (C && d) {
					try {
						b(k, a)
					} catch (g) {
						c(k, a)
					}
					return f
				}
				c(k, a);
				return f
			},
			hr: function() {
				return this.inserthtml("<hr />")
			},
			print: function() {
				this.win.print();
				return this
			},
			insertimage: function(a, d, b, c, f, h) {
				d = p(d, "");
				p(f, 0);
				a = '<img src="' + q(a) + '" data-ke-src="' + q(a) + '" ';
				b && (a += 'width="' + q(b) + '" ');
				c && (a += 'height="' + q(c) + '" ');
				d && (a += 'title="' + q(d) + '" ');
				h && (a += 'align="' + q(h) + '" ');
				a += 'alt="' + q(d) + '" ';
				a += "/>";
				return this.inserthtml(a)
			},
			createlink: function(a, d) {
				var b = this.doc,
					c = this.range;
				this.select();
				var f = this.commonNode({
					a: "*"
				});
				f && !c.isControl() && (c.selectNode(f.get()), this.select());
				f = '<a href="' + q(a) + '" data-ke-src="' + q(a) + '" ';
				d && (f += ' target="' +
					q(d) + '"');
				if (c.collapsed) return f += ">" + q(a) + "</a>", this.inserthtml(f);
				if (c.isControl()) {
					var k = h(c.startContainer.childNodes[c.startOffset]);
					f += "></a>";
					k.after(h(f, b));
					k.next().append(k);
					c.selectNode(k[0]);
					return this.select()
				}
				ca(b, "createlink", "__kindeditor_temp_url__");
				h('a[href="__kindeditor_temp_url__"]', b).each(function() {
					h(this).attr("href", a).attr("data-ke-src", a);
					d ? h(this).attr("target", d) : h(this).removeAttr("target")
				});
				return this
			},
			unlink: function() {
				var a = this.doc,
					d = this.range;
				this.select();
				if (d.collapsed) {
					var b = this.commonNode({
						a: "*"
					});
					b && (d.selectNode(b.get()), this.select());
					ca(a, "unlink", null);
					ia && h(d.startContainer).name === "img" && (a = h(d.startContainer).parent(), a.name === "a" && a.remove(!0))
				} else ca(a, "unlink", null);
				return this
			}
		});
		i("formatblock,selectall,justifyleft,justifycenter,justifyright,justifyfull,insertorderedlist,insertunorderedlist,indent,outdent,subscript,superscript".split(","), function(a, d) {
			ta.prototype[d] = function(a) {
				this.select();
				ca(this.doc, d, a);
				(!C || f(d, "formatblock,selectall,insertorderedlist,insertunorderedlist".split(",")) >=
					0) && this.selection();
				return this
			}
		});
		i("cut,copy,paste".split(","), function(a, d) {
			ta.prototype[d] = function() {
				if (!this.doc.queryCommandSupported(d)) throw "not supported";
				this.select();
				ca(this.doc, d, null);
				return this
			}
		});
		h.CmdClass = ta;
		h.cmd = rb;
		B(ea, {
			init: function(a) {
				var d = this;
				d.name = a.name || "";
				d.doc = a.doc || document;
				d.win = ga(d.doc);
				d.x = o(a.x);
				d.y = o(a.y);
				d.z = a.z;
				d.width = o(a.width);
				d.height = o(a.height);
				d.div = h('<div style="display:block;"></div>');
				d.options = a;
				d._alignEl = a.alignEl;
				d.width && d.div.css("width",
					d.width);
				d.height && d.div.css("height", d.height);
				d.z && d.div.css({
					position: "absolute",
					left: d.x,
					top: d.y,
					"z-index": d.z
				});
				d.z && (d.x === c || d.y === c) && d.autoPos(d.width, d.height);
				a.cls && d.div.addClass(a.cls);
				a.shadowMode && d.div.addClass("ke-shadow");
				a.css && d.div.css(a.css);
				a.src ? h(a.src).replaceWith(d.div) : h(d.doc.body).append(d.div);
				a.html && d.div.html(a.html);
				if (a.autoScroll)
					if (C && N < 7 || ba) {
						var b = la();
						h(d.win).bind("scroll", function() {
							var a = la(),
								c = a.x - b.x,
								a = a.y - b.y;
							d.pos(j(d.x) + c, j(d.y) + a, !1)
						})
					} else d.div.css("position",
						"fixed")
			},
			pos: function(a, d, b) {
				b = p(b, !0);
				if (a !== null && (a = a < 0 ? 0 : o(a), this.div.css("left", a), b)) this.x = a;
				if (d !== null && (d = d < 0 ? 0 : o(d), this.div.css("top", d), b)) this.y = d;
				return this
			},
			autoPos: function(a, d) {
				var b = j(a) || 0,
					c = j(d) || 0,
					f = la();
				if (this._alignEl) {
					var k = h(this._alignEl),
						g = k.pos(),
						b = da(k[0].clientWidth / 2 - b / 2),
						c = da(k[0].clientHeight / 2 - c / 2);
					x = b < 0 ? g.x : g.x + b;
					y = c < 0 ? g.y : g.y + c
				} else g = W(this.doc), x = da(f.x + (g.clientWidth - b) / 2), y = da(f.y + (g.clientHeight - c) / 2);
				C && N < 7 || ba || (x -= f.x, y -= f.y);
				return this.pos(x, y)
			},
			remove: function() {
				var a = this;
				(C && N < 7 || ba) && h(a.win).unbind("scroll");
				a.div.remove();
				i(a, function(d) {
					a[d] = null
				});
				return this
			},
			show: function() {
				this.div.show();
				return this
			},
			hide: function() {
				this.div.hide();
				return this
			},
			draggable: function(a) {
				var d = this,
					a = a || {};
				a.moveEl = d.div;
				a.moveFn = function(a, b, c, f, h, g) {
					if ((a += h) < 0) a = 0;
					if ((b += g) < 0) b = 0;
					d.pos(a, b)
				};
				Ta(a);
				return d
			}
		});
		h.WidgetClass = ea;
		h.widget = Va;
		var Wa = "";
		if (J = document.getElementsByTagName("html")) Wa = J[0].dir;
		B(va, ea, {
			init: function(a) {
				function d() {
					var d =
						Ua(b.iframe);
					d.open();
					if (j) d.domain = document.domain;
					d.write(Ob(c, f, k, g));
					d.close();
					b.win = b.iframe[0].contentWindow;
					b.doc = d;
					var i = rb(d);
					b.afterChange(function() {
						i.selection()
					});
					ia && h(d).click(function(a) {
						h(a.target).name === "img" && (i.selection(!0), i.range.selectNode(a.target), i.select())
					});
					C && h(document).mousedown(function() {
						i.range.isControl() && b.blur()
					});
					C && h(d).keydown(function(a) {
						if (a.which == 8) {
							i.selection();
							var d = i.range;
							d.isControl() && (d.collapse(!0), h(d.startContainer.childNodes[d.startOffset]).remove(),
								a.preventDefault())
						}
					});
					b.cmd = i;
					b.html(ua(b.srcElement));
					C ? (d.body.disabled = !0, d.body.contentEditable = !0, d.body.removeAttribute("disabled")) : d.designMode = "on";
					a.afterCreate && a.afterCreate.call(b)
				}
				var b = this;
				va.parent.init.call(b, a);
				b.srcElement = h(a.srcElement);
				b.div.addClass("ke-edit");
				b.designMode = p(a.designMode, !0);
				b.beforeGetHtml = a.beforeGetHtml;
				b.beforeSetHtml = a.beforeSetHtml;
				b.afterSetHtml = a.afterSetHtml;
				var c = p(a.themesPath, ""),
					f = a.bodyClass,
					k = a.cssPath,
					g = a.cssData,
					j = location.host.replace(/:\d+/,
						"") !== document.domain,
					i = "document.open();" + (j ? 'document.domain="' + document.domain + '";' : "") + "document.close();",
					i = C ? ' src="javascript:void(function(){' + encodeURIComponent(i) + '}())"' : "";
				b.iframe = h('<iframe class="ke-edit-iframe" hidefocus="true" frameborder="0"' + i + "></iframe>").css("width", "100%");
				b.textarea = h('<textarea class="ke-edit-textarea" hidefocus="true"></textarea>').css("width", "100%");
				b.width && b.setWidth(b.width);
				b.height && b.setHeight(b.height);
				b.designMode ? b.textarea.hide() : b.iframe.hide();
				j && b.iframe.bind("load", function() {
					b.iframe.unbind("load");
					C ? d() : setTimeout(d, 0)
				});
				b.div.append(b.iframe);
				b.div.append(b.textarea);
				b.srcElement.hide();
				!j && d()
			},
			setWidth: function(a) {
				this.div.css("width", o(a));
				return this
			},
			setHeight: function(a) {
				a = o(a);
				this.div.css("height", a);
				this.iframe.css("height", a);
				if (C && N < 8 || ba) a = o(j(a) - 2);
				this.textarea.css("height", a);
				return this
			},
			remove: function() {
				var a = this.doc;
				h(a.body).unbind();
				h(a).unbind();
				h(this.win).unbind();
				ua(this.srcElement, this.html());
				this.srcElement.show();
				a.write("");
				this.iframe.unbind();
				this.textarea.unbind();
				va.parent.remove.call(this)
			},
			html: function(a, d) {
				var b = this.doc;
				if (this.designMode) {
					b = b.body;
					if (a === c) return a = d ? "<!doctype html><html>" + b.parentNode.innerHTML + "</html>" : b.innerHTML, this.beforeGetHtml && (a = this.beforeGetHtml(a)), oa && a == "<br />" && (a = ""), a;
					this.beforeSetHtml && (a = this.beforeSetHtml(a));
					C && N >= 9 && (a = a.replace(/(<.*?checked=")checked(".*>)/ig, "$1$2"));
					h(b).html(a);
					this.afterSetHtml && this.afterSetHtml();
					return this
				}
				if (a === c) return this.textarea.val();
				this.textarea.val(a);
				return this
			},
			design: function(a) {
				if (a === c ? !this.designMode : a) {
					if (!this.designMode) a = this.html(), this.designMode = !0, this.html(a), this.textarea.hide(), this.iframe.show()
				} else if (this.designMode) a = this.html(), this.designMode = !1, this.html(a), this.iframe.hide(), this.textarea.show();
				return this.focus()
			},
			focus: function() {
				this.designMode ? this.win.focus() : this.textarea[0].focus();
				return this
			},
			blur: function() {
				if (C) {
					var a = h('<input type="text" style="float:left;width:0;height:0;padding:0;margin:0;border:0;" value="" />',
						this.div);
					this.div.append(a);
					a[0].focus();
					a.remove()
				} else this.designMode ? this.win.blur() : this.textarea[0].blur();
				return this
			},
			afterChange: function(a) {
				function d(d) {
					setTimeout(function() {
						a(d)
					}, 1)
				}
				var b = this.doc,
					c = b.body;
				h(b).keyup(function(d) {
					!d.ctrlKey && !d.altKey && bb[d.which] && a(d)
				});
				h(b).mouseup(a).contextmenu(a);
				h(this.win).blur(a);
				h(c).bind("paste", d);
				h(c).bind("cut", d);
				return this
			}
		});
		h.EditClass = va;
		h.edit = sb;
		h.iframeDoc = Ua;
		B(Da, ea, {
			init: function(a) {
				function d(a) {
					a = h(a);
					if (a.hasClass("ke-outline")) return a;
					if (a.hasClass("ke-toolbar-icon")) return a.parent()
				}

				function b(a, c) {
					var e = d(a.target);
					if (e && !e.hasClass("ke-disabled") && !e.hasClass("ke-selected")) e[c]("ke-on")
				}
				var c = this;
				Da.parent.init.call(c, a);
				c.disableMode = p(a.disableMode, !1);
				c.noDisableItemMap = z(p(a.noDisableItems, []));
				c._itemMap = {};
				c.div.addClass("ke-toolbar").bind("contextmenu,mousedown,mousemove", function(a) {
					a.preventDefault()
				}).attr("unselectable", "on");
				c.div.mouseover(function(a) {
					b(a, "addClass")
				}).mouseout(function(a) {
					b(a, "removeClass")
				}).click(function(a) {
					var b =
						d(a.target);
					b && !b.hasClass("ke-disabled") && c.options.click.call(this, a, b.attr("data-name"))
				})
			},
			get: function(a) {
				if (this._itemMap[a]) return this._itemMap[a];
				return this._itemMap[a] = h("span.ke-icon-" + a, this.div).parent()
			},
			select: function(a) {
				tb.call(this, a, function(a) {
					a.addClass("ke-selected")
				});
				return self
			},
			unselect: function(a) {
				tb.call(this, a, function(a) {
					a.removeClass("ke-selected").removeClass("ke-on")
				});
				return self
			},
			enable: function(a) {
				if (a = a.get ? a : this.get(a)) a.removeClass("ke-disabled"), a.opacity(1);
				return this
			},
			disable: function(a) {
				if (a = a.get ? a : this.get(a)) a.removeClass("ke-selected").addClass("ke-disabled"), a.opacity(0.5);
				return this
			},
			disableAll: function(a, d) {
				var b = this,
					f = b.noDisableItemMap;
				d && (f = z(d));
				(a === c ? !b.disableMode : a) ? (h("span.ke-outline", b.div).each(function() {
					var a = h(this),
						d = a[0].getAttribute("data-name", 2);
					f[d] || b.disable(a)
				}), b.disableMode = !0) : (h("span.ke-outline", b.div).each(function() {
					var a = h(this),
						d = a[0].getAttribute("data-name", 2);
					f[d] || b.enable(a)
				}), b.disableMode = !1);
				return b
			}
		});
		h.ToolbarClass = Da;
		h.toolbar = ub;
		B(wa, ea, {
			init: function(a) {
				a.z = a.z || 811213;
				wa.parent.init.call(this, a);
				this.centerLineMode = p(a.centerLineMode, !0);
				this.div.addClass("ke-menu").bind("click,mousedown", function(a) {
					a.stopPropagation()
				}).attr("unselectable", "on")
			},
			addItem: function(a) {
				if (a.title === "-") this.div.append(h('<div class="ke-menu-separator"></div>'));
				else {
					var d = h('<div class="ke-menu-item" unselectable="on"></div>'),
						b = h('<div class="ke-inline-block ke-menu-item-left"></div>'),
						c = h('<div class="ke-inline-block ke-menu-item-right"></div>'),
						f = o(a.height),
						g = p(a.iconClass, "");
					this.div.append(d);
					f && (d.css("height", f), c.css("line-height", f));
					var j;
					this.centerLineMode && (j = h('<div class="ke-inline-block ke-menu-item-center"></div>'), f && j.css("height", f));
					d.mouseover(function() {
						h(this).addClass("ke-menu-item-on");
						j && j.addClass("ke-menu-item-center-on")
					}).mouseout(function() {
						h(this).removeClass("ke-menu-item-on");
						j && j.removeClass("ke-menu-item-center-on")
					}).click(function(d) {
						a.click.call(h(this));
						d.stopPropagation()
					}).append(b);
					j && d.append(j);
					d.append(c);
					a.checked && (g = "ke-icon-checked");
					g !== "" && b.html('<span class="ke-inline-block ke-toolbar-icon ke-toolbar-icon-url ' + g + '"></span>');
					c.html(a.title);
					return this
				}
			},
			remove: function() {
				this.options.beforeRemove && this.options.beforeRemove.call(this);
				h(".ke-menu-item", this.div[0]).unbind();
				wa.parent.remove.call(this);
				return this
			}
		});
		h.MenuClass = wa;
		h.menu = Xa;
		B(xa, ea, {
			init: function(a) {
				a.z = a.z || 811213;
				xa.parent.init.call(this, a);
				var d = a.colors || [
					["#E53333", "#E56600", "#FF9900", "#64451D", "#DFC5A4",
						"#FFE500"
					],
					["#009900", "#006600", "#99BB00", "#B8D100", "#60D978", "#00D5FF"],
					["#337FE5", "#003399", "#4C33E5", "#9933E5", "#CC33E5", "#EE33EE"],
					["#FFFFFF", "#CCCCCC", "#999999", "#666666", "#333333", "#000000"]
				];
				this.selectedColor = (a.selectedColor || "").toLowerCase();
				this._cells = [];
				this.div.addClass("ke-colorpicker").bind("click,mousedown", function(a) {
					a.stopPropagation()
				}).attr("unselectable", "on");
				a = this.doc.createElement("table");
				this.div.append(a);
				a.className = "ke-colorpicker-table";
				a.cellPadding = 0;
				a.cellSpacing =
					0;
				a.border = 0;
				var b = a.insertRow(0),
					c = b.insertCell(0);
				c.colSpan = d[0].length;
				this._addAttr(c, "", "ke-colorpicker-cell-top");
				for (var f = 0; f < d.length; f++)
					for (var b = a.insertRow(f + 1), h = 0; h < d[f].length; h++) c = b.insertCell(h), this._addAttr(c, d[f][h], "ke-colorpicker-cell")
			},
			_addAttr: function(a, d, b) {
				var c = this,
					a = h(a).addClass(b);
				c.selectedColor === d.toLowerCase() && a.addClass("ke-colorpicker-cell-selected");
				a.attr("title", d || c.options.noColor);
				a.mouseover(function() {
					h(this).addClass("ke-colorpicker-cell-on")
				});
				a.mouseout(function() {
					h(this).removeClass("ke-colorpicker-cell-on")
				});
				a.click(function(a) {
					a.stop();
					c.options.click.call(h(this), d)
				});
				d ? a.append(h('<div class="ke-colorpicker-cell-color" unselectable="on"></div>').css("background-color", d)) : a.html(c.options.noColor);
				h(a).attr("unselectable", "on");
				c._cells.push(a)
			},
			remove: function() {
				i(this._cells, function() {
					this.unbind()
				});
				xa.parent.remove.call(this);
				return this
			}
		});
		h.ColorPickerClass = xa;
		h.colorpicker = vb;
		B(Ya, {
			init: function(a) {
				var d = h(a.button),
					b = a.fieldName || "file",
					c = a.url || "",
					f = d.val(),
					g = a.extraParams || {}, j = d[0].className ||
						"",
					i = a.target || "kindeditor_upload_iframe_" + (new Date).getTime();
				a.afterError = a.afterError || function(a) {
					alert(a)
				};
				var m = [],
					o;
				for (o in g) m.push('<input type="hidden" name="' + o + '" value="' + g[o] + '" />');
				b = ['<div class="ke-inline-block ' + j + '">', a.target ? "" : '<iframe name="' + i + '" style="display:none;"></iframe>', a.form ? '<div class="ke-upload-area">' : '<form class="ke-upload-area ke-form" method="post" enctype="multipart/form-data" target="' + i + '" action="' + c + '">', '<span class="ke-button-common">', m.join(""),
					'<input type="button" class="ke-button-common ke-button" value="' + f + '" />', "</span>", '<input type="file" class="ke-upload-file" name="' + b + '" tabindex="-1" />', a.form ? "</div>" : "</form>", "</div>"
				].join("");
				b = h(b, d.doc);
				d.hide();
				d.before(b);
				this.div = b;
				this.button = d;
				this.iframe = a.target ? h('iframe[name="' + i + '"]') : h("iframe", b);
				this.form = a.form ? h(a.form) : h("form", b);
				d = a.width || h(".ke-button-common", b).width();
				this.fileBox = h(".ke-upload-file", b).width(d);
				this.options = a
			},
			//避免在云中上传客户端崩溃的问题,webkit内核不采用iframe方式上传 by Shenye 2014.05.06
			submit: function() {
				var a = this,
					d = a.iframe;
				//kindeditor中$被定义了，所以无法使用jquery判断浏览器	
				if(window.navigator.userAgent.indexOf('AppleWebKit') != -1){
					var formData = new FormData(a.form[0]);
					var xhr = new XMLHttpRequest();
		  			xhr.open("POST", a.form[0].action, true);
		  			xhr.onload = function(oEvent) {
		  				d.unbind();
						var b = document.createElement("form");
						a.fileBox.before(b);
						h(b).append(a.fileBox);
						b.reset();
						h(b).remove(!0);
						var b = h.iframeDoc(d),
							c = b.getElementsByTagName("pre")[0],
							f = "",
							g, f = c ? c.innerHTML.replace(/&gt;/g,">").replace(/&lt;/g,"<") : b.body.innerHTML.replace(/&gt;/g,">").replace(/&lt;/g,"<");
						d[0].src = "javascript:false";
		    			if (xhr.readyState == 4 && xhr.status == 200) {
		    				try {
								g = h.json(this.responseText);
							} catch (j) {
								a.options.afterError.call(a, "<!doctype html><html>" + b.body.parentNode.innerHTML + "</html>");
							}
							g && a.options.afterUpload.call(a, g);
		    			} else {
		    				a.options.afterError.call(a,resource.UPLOAD_MESSAGEBOX_UPLOADERR_CONTENT);
		    		}
		  			};
		 		 	xhr.send(formData);
				}
				else{
				d.bind("load", function() {
					d.unbind();
					var b = document.createElement("form");
					a.fileBox.before(b);
					h(b).append(a.fileBox);
					b.reset();
					h(b).remove(!0);
					var b = h.iframeDoc(d),
						c = b.getElementsByTagName("pre")[0],
						f = "",
						g, f = c ? c.innerHTML.replace(/&gt;/g,">").replace(/&lt;/g,"<") : b.body.innerHTML.replace(/&gt;/g,">").replace(/&lt;/g,"<");
					d[0].src = "javascript:false";
					try {
						g = h.json(f)
					} catch (j) {
						a.options.afterError.call(a, "<!doctype html><html>" + b.body.parentNode.innerHTML + "</html>")
					}
					g && a.options.afterUpload.call(a, g)
				});
				a.form[0].submit();
				}
				return a
			},
			remove: function() {
				this.fileBox && this.fileBox.unbind();
				this.iframe.remove();
				this.div.remove();
				this.button.show();
				return this
			}
		});
		h.UploadButtonClass = Ya;
		h.uploadbutton = function(a) {
			return new Ya(a)
		};
		B(ya, ea, {
			init: function(a) {
				var b = p(a.shadowMode, !0);
				a.z = a.z || 811213;
				a.shadowMode = !1;
				a.autoScroll = p(a.autoScroll, !0);
				ya.parent.init.call(this, a);
				var c = a.title,
					f = h(a.body, this.doc),
					g = a.previewBtn,
					k = a.yesBtn,
					m = a.noBtn,
					o = a.closeBtn,
					n = p(a.showMask, !0);
				this.div.addClass("ke-dialog").bind("click,mousedown", function(a) {
					a.stopPropagation()
				});
				var q = h('<div class="ke-dialog-content"></div>').appendTo(this.div);
				C && N < 7 ? this.iframeMask = h('<iframe src="about:blank" class="ke-dialog-shadow"></iframe>').appendTo(this.div) : b && h('<div class="ke-dialog-shadow"></div>').appendTo(this.div);
				b = h('<div class="ke-dialog-header"></div>');
				q.append(b);
				b.html(c);
				this.closeIcon = h('<span class="ke-dialog-icon-close" title="' + o.name + '"></span>').click(o.click);
				b.append(this.closeIcon);
				this.draggable({
					clickEl: b,
					beforeDrag: a.beforeDrag
				});
				a = h('<div class="ke-dialog-body"></div>');
				q.append(a);
				a.append(f);
				var l = h('<div class="ke-dialog-footer"></div>');
				(g || k || m) && q.append(l);
				i([{
					btn: g,
					name: "preview"
				}, {
					btn: k,
					name: "yes"
				}, {
					btn: m,
					name: "no"
				}], function() {
					if (this.btn) {
						var a = this.btn,
							a = a || {}, b = a.name || "",
							d = h('<span class="ke-button-common ke-button-outer" title="' + b + '"></span>'),
							b = h('<input class="ke-button-common ke-button" type="button" value="' + b + '" />');
						a.click && b.click(a.click);
						d.append(b);
						d.addClass("ke-dialog-" + this.name);
						l.append(d)
					}
				});
				this.height && a.height(j(this.height) - b.height() - l.height());
				this.div.width(this.div.width());
				this.div.height(this.div.height());
				this.mask = null;
				if (n) f = W(this.doc), this.mask = Va({
					x: 0,
					y: 0,
					z: this.z - 1,
					cls: "ke-dialog-mask",
					width: Math.max(f.scrollWidth, f.clientWidth),
					height: Math.max(f.scrollHeight, f.clientHeight)
				});
				this.autoPos(this.div.width(), this.div.height());
				this.footerDiv = l;
				this.bodyDiv = a;
				this.headerDiv = b;
				this.isLoading = !1
			},
			setMaskIndex: function(a) {
				this.mask.div.css("z-index", a)
			},
			showLoading: function(a) {
				var a = p(a, ""),
					b = this.bodyDiv;
				this.loading = h('<div class="ke-dialog-loading"><div class="ke-inline-block ke-dialog-loading-content" style="margin-top:' +
					Math.round(b.height() / 3) + 'px;">' + a + "</div></div>").width(b.width()).height(b.height()).css("top", this.headerDiv.height() + "px");
				b.css("visibility", "hidden").after(this.loading);
				this.isLoading = !0;
				return this
			},
			hideLoading: function() {
				this.loading && this.loading.remove();
				this.bodyDiv.css("visibility", "visible");
				this.isLoading = !1;
				return this
			},
			remove: function() {
				this.options.beforeRemove && this.options.beforeRemove.call(this);
				this.mask && this.mask.remove();
				this.iframeMask && this.iframeMask.remove();
				this.closeIcon.unbind();
				h("input", this.div).unbind();
				h("button", this.div).unbind();
				this.footerDiv.unbind();
				this.bodyDiv.unbind();
				this.headerDiv.unbind();
				h("iframe", this.div).each(function() {
					h(this).remove()
				});
				ya.parent.remove.call(this);
				return this
			}
		});
		h.DialogClass = ya;
		h.dialog = wb;
		h.tabs = function(a) {
			var b = Va(a),
				c = b.remove,
				f = a.afterSelect,
				a = b.div,
				g = [];
			a.addClass("ke-tabs").bind("contextmenu,mousedown,mousemove", function(a) {
				a.preventDefault()
			});
			var k = h('<ul class="ke-tabs-ul ke-clearfix"></ul>');
			a.append(k);
			b.add = function(a) {
				var b =
					h('<li class="ke-tabs-li">' + a.title + "</li>");
				b.data("tab", a);
				g.push(b);
				k.append(b)
			};
			b.selectedIndex = 0;
			b.select = function(a) {
				b.selectedIndex = a;
				i(g, function(c, e) {
					e.unbind();
					c === a ? (e.addClass("ke-tabs-li-selected"), h(e.data("tab").panel).show("")) : (e.removeClass("ke-tabs-li-selected").removeClass("ke-tabs-li-on").mouseover(function() {
						h(this).addClass("ke-tabs-li-on")
					}).mouseout(function() {
						h(this).removeClass("ke-tabs-li-on")
					}).click(function() {
						b.select(c)
					}), h(e.data("tab").panel).hide())
				});
				f && f.call(b,
					a)
			};
			b.remove = function() {
				i(g, function() {
					this.remove()
				});
				k.remove();
				c.call(b)
			};
			return b
		};
		h.loadScript = Za;
		h.loadStyle = $a;
		h.ajax = function(a, d, c, f, h) {
			var c = c || "GET",
				h = h || "json",
				g = b.XMLHttpRequest ? new b.XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
			g.open(c, a, !0);
			g.onreadystatechange = function() {
				if (g.readyState == 4 && g.status == 200 && d) {
					var a = n(g.responseText);
					h == "json" && (a = A(a));
					d(a)
				}
			};
			if (c == "POST") {
				var j = [];
				i(f, function(a, b) {
					j.push(encodeURIComponent(a) + "=" + encodeURIComponent(b))
				});
				try {
					g.setRequestHeader("Content-Type",
						"application/x-www-form-urlencoded")
				} catch (m) {}
				g.send(j.join("&"))
			} else g.send(null)
		};
		var ha = {}, $ = {};
		za.prototype = {
			lang: function(a) {
				return Ab(a, this.langType)
			},
			loadPlugin: function(a, b) {
				var c = this;
				if (ha[a]) {
					if (c._calledPlugins[a]) return b && b.call(c), c;
					ha[a].call(c, KindEditor);
					b && b.call(c);
					c._calledPlugins[a] = !0;
					return c
				}
				if (c.isLoading) return c;
				c.isLoading = !0;
				Za(c.pluginsPath + a + "/" + a + ".js?ver=" + encodeURIComponent(h.DEBUG ? Fa : Ga), function() {
					c.isLoading = !1;
					ha[a] && c.loadPlugin(a, b)
				});
				return c
			},
			handler: function(a,
				b) {
				var c = this;
				c._handlers[a] || (c._handlers[a] = []);
				if (l(b)) return c._handlers[a].push(b), c;
				i(c._handlers[a], function() {
					b = this.call(c, b)
				});
				return b
			},
			clickToolbar: function(a, b) {
				var e = this,
					f = "clickToolbar" + a;
				if (b === c) {
					if (e._handlers[f]) return e.handler(f);
					e.loadPlugin(a, function() {
						e.handler(f)
					});
					return e
				}
				return e.handler(f, b)
			},
			updateState: function() {
				var a = this;
				i("justifyleft,justifycenter,justifyright,justifyfull,insertorderedlist,insertunorderedlist,subscript,superscript,bold,italic,underline,strikethrough".split(","),
					function(b, c) {
						a.cmd.state(c) ? a.toolbar.select(c) : a.toolbar.unselect(c)
					});
				return a
			},
			addContextmenu: function(a) {
				this._contextmenus.push(a);
				return this
			},
			afterCreate: function(a) {
				return this.handler("afterCreate", a)
			},
			beforeRemove: function(a) {
				return this.handler("beforeRemove", a)
			},
			beforeGetHtml: function(a) {
				return this.handler("beforeGetHtml", a)
			},
			beforeSetHtml: function(a) {
				return this.handler("beforeSetHtml", a)
			},
			afterSetHtml: function(a) {
				return this.handler("afterSetHtml", a)
			},
			create: function() {
				function a() {
					q.height() ===
						0 ? setTimeout(a, 100) : c.resize(g, k)
				}

				function d(a, b, d) {
					d = p(d, !0);
					if (a && a >= c.minWidth && (c.resize(a, null), d)) c.width = o(a);
					if (b && b >= c.minHeight && (c.resize(null, b), d)) c.height = o(b)
				}
				var c = this,
					f = c.fullscreenMode;
				if (c.isCreated) return c;
				if (c.srcElement.data("kindeditor")) return c;
				c.srcElement.data("kindeditor", "true");
				f ? W().style.overflow = "hidden" : W().style.overflow = "";
				var g = f ? W().clientWidth + "px" : c.width,
					k = f ? W().clientHeight + "px" : c.height;
				if (C && N < 8 || ba) k = o(j(k) + 2);
				var i = c.container = h(c.layout);
				f ? h(document.body).append(i) :
					c.srcElement.before(i);
				var m = h(".toolbar", i),
					n = h(".edit", i),
					q = c.statusbar = h(".statusbar", i);
				i.removeClass("container").addClass("ke-container ke-container-" + c.themeType).css("width", g);
				if (f) {
					i.css({
						position: "absolute",
						left: 0,
						top: 0,
						"z-index": 811211
					});
					if (!oa) c._scrollPos = la();
					b.scrollTo(0, 0);
					h(document.body).css({
						height: "1px",
						overflow: "hidden"
					});
					h(document.body.parentNode).css("overflow", "hidden");
					c._fullscreenExecuted = !0
				} else c._fullscreenExecuted && (h(document.body).css({
					height: "",
					overflow: ""
				}), h(document.body.parentNode).css("overflow",
					"")), c._scrollPos && b.scrollTo(c._scrollPos.x, c._scrollPos.y);
				var l = [];
				h.each(c.items, function(a, b) {
					b == "|" ? l.push('<span class="ke-inline-block ke-separator"></span>') : b == "/" ? l.push('<div class="ke-hr"></div>') : (l.push('<span class="ke-outline" data-name="' + b + '" title="' + c.lang(b) + '" unselectable="on">'), l.push('<span class="ke-toolbar-icon ke-toolbar-icon-url ke-icon-' + b + '" unselectable="on"></span></span>'))
				});
				var m = c.toolbar = ub({
					src: m,
					html: l.join(""),
					noDisableItems: c.noDisableItems,
					click: function(a,
						b) {
						a.stop();
						if (c.menu) {
							var d = c.menu.name;
							c.hideMenu();
							if (d === b) return
						}
						c.clickToolbar(b)
					}
				}),
					r = j(k) - m.div.height(),
					s = c.edit = sb({
						height: r > 0 && j(k) > c.minHeight ? r : c.minHeight,
						src: n,
						srcElement: c.srcElement,
						designMode: c.designMode,
						themesPath: c.themesPath,
						bodyClass: c.bodyClass,
						cssPath: c.cssPath,
						cssData: c.cssData,
						beforeGetHtml: function(a) {
							a = c.beforeGetHtml(a);
							return M(a, c.filterMode ? c.htmlTags : null, c.urlType, c.wellFormatMode, c.indentChar)
						},
						beforeSetHtml: function(a) {
							a = M(a, c.filterMode ? c.htmlTags : null, "", !1);
							return c.beforeSetHtml(a)
						},
						afterSetHtml: function() {
							c.edit = s = this;
							c.afterSetHtml()
						},
						afterCreate: function() {
							c.edit = s = this;
							c.cmd = s.cmd;
							c._docMousedownFn = function() {
								c.menu && c.hideMenu()
							};
							h(s.doc, document).mousedown(c._docMousedownFn);
							Pb.call(c);
							Qb.call(c);
							Rb.call(c);
							Sb.call(c);
							s.afterChange(function() {
								s.designMode && (c.updateState(), c.addBookmark(), c.options.afterChange && c.options.afterChange.call(c))
							});
							s.textarea.keyup(function(a) {
								!a.ctrlKey && !a.altKey && Hb[a.which] && c.options.afterChange && c.options.afterChange.call(c)
							});
							c.readonlyMode && c.readonly();
							c.isCreated = !0;
							if (c.initContent === "") c.initContent = c.html();
							c.afterCreate();
							c.options.afterCreate && c.options.afterCreate.call(c)
						}
					});
				q.removeClass("statusbar").addClass("ke-statusbar").append('<span class="ke-inline-block ke-statusbar-center-icon"></span>').append('<span class="ke-inline-block ke-statusbar-right-icon"></span>');
				h(b).unbind("resize");
				a();
				f ? (h(b).bind("resize", function() {
					c.isCreated && d(W().clientWidth, W().clientHeight, !1)
				}), m.select("fullscreen"), q.first().css("visibility",
					"hidden"), q.last().css("visibility", "hidden")) : (oa && h(b).bind("scroll", function() {
					c._scrollPos = la()
				}), c.resizeType > 0 ? Ta({
					moveEl: i,
					clickEl: q,
					moveFn: function(a, b, c, e, f, h) {
						e += h;
						d(null, e)
					}
				}) : q.first().css("visibility", "hidden"), c.resizeType === 2 ? Ta({
					moveEl: i,
					clickEl: q.last(),
					moveFn: function(a, b, c, e, f, h) {
						c += f;
						e += h;
						d(c, e)
					}
				}) : q.last().css("visibility", "hidden"));
				return c
			},
			remove: function() {
				var a = this;
				if (!a.isCreated) return a;
				a.beforeRemove();
				a.srcElement.data("kindeditor", "");
				a.menu && a.hideMenu();
				i(a.dialogs,
					function() {
						a.hideDialog()
					});
				h(document).unbind("mousedown", a._docMousedownFn);
				a.toolbar.remove();
				a.edit.remove();
				a.statusbar.last().unbind();
				a.statusbar.unbind();
				a.container.remove();
				a.container = a.toolbar = a.edit = a.menu = null;
				a.dialogs = [];
				a.isCreated = !1;
				return a
			},
			resize: function(a, b) {
				a !== null && j(a) > this.minWidth && this.container.css("width", o(a));
				b !== null && this.toolbar.div && this.statusbar && (b = j(b) - this.toolbar.div.height() - this.statusbar.height(), b > 0 && j(b) > this.minHeight && this.edit.setHeight(b));
				return this
			},
			select: function() {
				this.isCreated && this.cmd.select();
				return this
			},
			html: function(a) {
				if (a === c) return this.isCreated ? this.edit.html() : ua(this.srcElement);
				this.isCreated ? this.edit.html(a) : ua(this.srcElement, a);
				return this
			},
			fullHtml: function() {
				return this.isCreated ? this.edit.html(c, !0) : ""
			},
			text: function(a) {
				//return a === c ? n(this.html().replace(/<(?!img|embed).*?>/ig, "").replace(/&nbsp;/ig, " ")) : this.html(q(a))
				return a === c ? n(this.html().replace(/<[^>]+>/g,"").replace(/&nbsp;/ig, " ")) : this.html(q(a))
			},
			isEmpty: function() {
				return n(this.text().replace(/\r\n|\n|\r/, "")) === ""
			},
			isDirty: function() {
				return n(this.initContent.replace(/\r\n|\n|\r|t/g,
					"")) !== n(this.html().replace(/\r\n|\n|\r|t/g, ""))
			},
			selectedHtml: function() {
				return this.isCreated ? this.cmd.range.html() : ""
			},
			count: function(a) {
				a = (a || "html").toLowerCase();
				if (a === "html") return ja(ab(this.html())).length;
				if (a === "text") return this.text().replace(/<(?:img|embed).*?>/ig, "K").replace(/\r\n|\n|\r/g, "").length;
				return 0
			},
			exec: function(a) {
				var a = a.toLowerCase(),
					b = this.cmd,
					c = f(a, "selectall,copy,paste,print".split(",")) < 0;
				c && this.addBookmark(!1);
				b[a].apply(b, D(arguments, 1));
				c && (this.updateState(),
					this.addBookmark(!1), this.options.afterChange && this.options.afterChange.call(this));
				return this
			},
			insertHtml: function(a, b) {
				if (!this.isCreated) return this;
				a = this.beforeSetHtml(a);
				this.exec("inserthtml", a, b);
				return this
			},
			appendHtml: function(a) {
				this.html(this.html() + a);
				if (this.isCreated) a = this.cmd, a.range.selectNodeContents(a.doc.body).collapse(!1), a.select();
				return this
			},
			sync: function() {
				ua(this.srcElement, this.html());
				return this
			},
			focus: function() {
				this.isCreated ? this.edit.focus() : this.srcElement[0].focus();
				return this
			},
			blur: function() {
				this.isCreated ? this.edit.blur() : this.srcElement[0].blur();
				return this
			},
			addBookmark: function(a) {
				var a = p(a, !0),
					b = this.edit,
					c = b.doc.body,
					f = ab(c.innerHTML);
				if (a && this._undoStack.length > 0 && Math.abs(f.length - ja(this._undoStack[this._undoStack.length - 1].html).length) < this.minChangeSize) return this;
				b.designMode && !this._firstAddBookmark ? (b = this.cmd.range, a = b.createBookmark(!0), a.html = ab(c.innerHTML), b.moveToBookmark(a)) : a = {
					html: f
				};
				this._firstAddBookmark = !1;
				Bb(this._undoStack, a);
				return this
			},
			undo: function() {
				return Cb.call(this, this._undoStack, this._redoStack)
			},
			redo: function() {
				return Cb.call(this, this._redoStack, this._undoStack)
			},
			fullscreen: function(a) {
				this.fullscreenMode = a === c ? !this.fullscreenMode : a;
				return this.remove().create()
			},
			readonly: function(a) {
				var a = p(a, !0),
					b = this,
					c = b.edit,
					f = c.doc;
				b.designMode ? b.toolbar.disableAll(a, []) : i(b.noDisableItems, function() {
					b.toolbar[a ? "disable" : "enable"](this)
				});
				C ? f.body.contentEditable = !a : f.designMode = a ? "off" : "on";
				c.textarea[0].disabled =
					a
			},
			createMenu: function(a) {
				var b = this.toolbar.get(a.name),
					e = b.pos();
				a.x = e.x;
				a.y = e.y + b.height();
				a.z = this.options.zIndex;
				a.shadowMode = p(a.shadowMode, this.shadowMode);
				a.selectedColor !== c ? (a.cls = "ke-colorpicker-" + this.themeType, a.noColor = this.lang("noColor"), this.menu = vb(a)) : (a.cls = "ke-menu-" + this.themeType, a.centerLineMode = !1, this.menu = Xa(a));
				return this.menu
			},
			hideMenu: function() {
				this.menu.remove();
				this.menu = null;
				return this
			},
			hideContextmenu: function() {
				this.contextmenu.remove();
				this.contextmenu = null;
				return this
			},
			createDialog: function(a) {
				var b = this;
				a.z = b.options.zIndex;
				a.shadowMode = p(a.shadowMode, b.shadowMode);
				a.closeBtn = p(a.closeBtn, {
					name: b.lang("close"),
					click: function() {
						b.hideDialog();
						C && b.cmd && b.cmd.select()
					}
				});
				a.noBtn = p(a.noBtn, {
					name: b.lang(a.yesBtn ? "no" : "close"),
					click: function() {
						b.hideDialog();
						C && b.cmd && b.cmd.select()
					}
				});
				if (b.dialogAlignType != "page") a.alignEl = b.container;
				a.cls = "ke-dialog-" + b.themeType;
				if (b.dialogs.length > 0) {
					var c = b.dialogs[b.dialogs.length - 1];
					b.dialogs[0].setMaskIndex(c.z +
						2);
					a.z = c.z + 3;
					a.showMask = !1
				}
				a = wb(a);
				b.dialogs.push(a);
				return a
			},
			hideDialog: function() {
				this.dialogs.length > 0 && this.dialogs.pop().remove();
				this.dialogs.length > 0 && this.dialogs[0].setMaskIndex(this.dialogs[this.dialogs.length - 1].z - 1);
				return this
			},
			errorDialog: function(a) {
				var b = this.createDialog({
					width: 750,
					title: this.lang("uploadError"),
					body: '<div style="padding:10px 20px;"><iframe frameborder="0" style="width:708px;height:400px;"></iframe></div>'
				}),
					b = h("iframe", b.div),
					c = h.iframeDoc(b);
				c.open();
				c.write(a);
				c.close();
				h(c.body).css("background-color", "#FFF");
				b[0].contentWindow.focus();
				return this
			}
		};
		_instances = [];
		h.remove = function(a) {
			Eb(a, function(a) {
				this.remove();
				_instances.splice(a, 1)
			})
		};
		h.sync = function(a) {
			Eb(a, function() {
				this.sync()
			})
		};
		C && N < 7 && ca(document, "BackgroundImageCache", !0);
		h.EditorClass = za;
		h.editor = function(a) {
			return new za(a)
		};
		h.create = Db;
		h.instances = _instances;
		h.plugin = yb;
		h.lang = Ab;
		yb("core", function(a) {
			var d = this,
				e = {
					undo: "Z",
					redo: "Y",
					bold: "B",
					italic: "I",
					underline: "U",
					print: "P",
					selectall: "A"
				};
			d.afterSetHtml(function() {
				d.options.afterChange && d.options.afterChange.call(d)
			});
			d.afterCreate(function() {
				if (d.syncType == "form") {
					for (var c = a(d.srcElement), e = !1; c = c.parent();)
						if (c.name == "form") {
							e = !0;
							break
						}
					if (e) {
						c.bind("submit", function() {
							d.sync();
							a(b).bind("unload", function() {
								d.edit.textarea.remove()
							})
						});
						var f = a('[type="reset"]', c);
						f.click(function() {
							d.html(d.initContent);
							d.cmd.selection()
						});
						d.beforeRemove(function() {
							c.unbind();
							f.unbind()
						})
					}
				}
			});
			d.clickToolbar("source", function() {
				d.edit.designMode ?
					(d.toolbar.disableAll(!0), d.edit.design(!1), d.toolbar.select("source")) : (d.toolbar.disableAll(!1), d.edit.design(!0), d.toolbar.unselect("source"));
				d.designMode = d.edit.designMode
			});
			d.afterCreate(function() {
				d.designMode || d.toolbar.disableAll(!0).select("source")
			});
			d.clickToolbar("fullscreen", function() {
				d.fullscreen()
			});
			if (d.fullscreenShortcut) {
				var h = !1;
				d.afterCreate(function() {
					a(d.edit.doc, d.edit.textarea).keyup(function(a) {
						a.which == 27 && setTimeout(function() {
							d.fullscreen()
						}, 0)
					});
					if (h) {
						if (C && !d.designMode) return;
						d.focus()
					}
					h || (h = !0)
				})
			}
			i("undo,redo".split(","), function(a, b) {
				e[b] && d.afterCreate(function() {
					P(this.edit.doc, e[b], function() {
						d.clickToolbar(b)
					})
				});
				d.clickToolbar(b, function() {
					d[b]()
				})
			});
			d.clickToolbar("formatblock", function() {
				var a = d.lang("formatblock.formatBlock"),
					b = {
						h1: 28,
						h2: 24,
						h3: 18,
						H4: 14,
						p: 12
					}, c = d.cmd.val("formatblock"),
					e = d.createMenu({
						name: "formatblock",
						width: d.langType == "en" ? 200 : 150
					});
				i(a, function(a, f) {
					var h = "font-size:" + b[a] + "px;";
					a.charAt(0) === "h" && (h += "font-weight:bold;");
					e.addItem({
						title: '<span style="' + h + '" unselectable="on">' + f + "</span>",
						height: b[a] + 12,
						checked: c === a || c === f,
						click: function() {
							d.select().exec("formatblock", "<" + a + ">").hideMenu()
						}
					})
				})
			});
			d.clickToolbar("fontname", function() {
				var a = d.cmd.val("fontname"),
					b = d.createMenu({
						name: "fontname",
						width: 150
					});
				i(d.lang("fontname.fontName"), function(c, e) {
					b.addItem({
						title: '<span style="font-family: ' + c + ';" unselectable="on">' + e + "</span>",
						checked: a === c.toLowerCase() || a === e.toLowerCase(),
						click: function() {
							d.exec("fontname", c).hideMenu()
						}
					})
				})
			});
			d.clickToolbar("fontsize",
				function() {
					var a = d.cmd.val("fontsize"),
						b = d.createMenu({
							name: "fontsize",
							width: 150
						});
					i(d.fontSizeTable, function(c, e) {
						b.addItem({
							title: '<span style="font-size:' + e + ';" unselectable="on">' + e + "</span>",
							height: j(e) + 12,
							checked: a === e,
							click: function() {
								d.exec("fontsize", e).hideMenu()
							}
						})
					})
				});
			i("forecolor,hilitecolor".split(","), function(a, b) {
				d.clickToolbar(b, function() {
					d.createMenu({
						name: b,
						selectedColor: d.cmd.val(b) || "default",
						colors: d.colorTable,
						click: function(a) {
							d.exec(b, a).hideMenu()
						}
					})
				})
			});
			i("cut,copy,paste".split(","),
				function(a, b) {
					d.clickToolbar(b, function() {
						d.focus();
						try {
							d.exec(b, null)
						} catch (a) {
							alert(d.lang(b + "Error"))
						}
					})
				});
			d.clickToolbar("about", function() {
				var a = '<div style="margin:20px;"><div>KindEditor ' + Ga + '</div><div>Copyright &copy; <a href="http://www.kindsoft.net/" target="_blank">kindsoft.net</a> All rights reserved.</div></div>';
				d.createDialog({
					name: "about",
					width: 300,
					title: d.lang("about"),
					body: a
				})
			});
			d.plugin.getSelectedLink = function() {
				return d.cmd.commonAncestor("a")
			};
			d.plugin.getSelectedImage = function() {
				return Ea(d.edit.cmd.range,
					function(a) {
						return !/^ke-\w+$/i.test(a[0].className)
					})
			};
			d.plugin.getSelectedWord = function() {
				return Ea(d.edit.cmd.range,
					function(a) {
						return !/^ke-\w+$/i.test(a[0].className)
					})
			};
			d.plugin.getSelectedFlash = function() {
				return Ea(d.edit.cmd.range, function(a) {
					return a[0].className == "ke-flash"
				})
			};
			d.plugin.getSelectedMedia = function() {
				return Ea(d.edit.cmd.range, function(a) {
					return a[0].className == "ke-media" || a[0].className == "ke-rm"
				})
			};
			d.plugin.getSelectedAnchor = function() {
				return Ea(d.edit.cmd.range, function(a) {
					return a[0].className == "ke-anchor"
				})
			};
			i("link,image,flash,media,anchor".split(","), function(a, b) {
				var e = b.charAt(0).toUpperCase() +
					b.substr(1);
				i("edit,delete".split(","), function(a, f) {
					d.addContextmenu({
						title: d.lang(f + e),
						click: function() {
							d.loadPlugin(b, function() {
								d.plugin[b][f]();
								d.hideMenu()
							})
						},
						cond: d.plugin["getSelected" + e],
						width: 150,
						iconClass: f == "edit" ? "ke-icon-" + b : c
					})
				});
				d.addContextmenu({
					title: "-"
				})
			});
			d.plugin.getSelectedTable = function() {
				return d.cmd.commonAncestor("table")
			};
			d.plugin.getSelectedRow = function() {
				return d.cmd.commonAncestor("tr")
			};
			d.plugin.getSelectedCell = function() {
				return d.cmd.commonAncestor("td")
			};
			i("prop,cellprop,colinsertleft,colinsertright,rowinsertabove,rowinsertbelow,rowmerge,colmerge,rowsplit,colsplit,coldelete,rowdelete,insert,delete".split(","),
				function(a, b) {
					var c = f(b, ["prop", "delete"]) < 0 ? d.plugin.getSelectedCell : d.plugin.getSelectedTable;
					d.addContextmenu({
						title: d.lang("table" + b),
						click: function() {
							d.loadPlugin("table", function() {
								d.plugin.table[b]();
								d.hideMenu()
							})
						},
						cond: c,
						width: 170,
						iconClass: "ke-icon-table" + b
					})
				});
			d.addContextmenu({
				title: "-"
			});
			i("selectall,justifyleft,justifycenter,justifyright,justifyfull,insertorderedlist,insertunorderedlist,indent,outdent,subscript,superscript,hr,print,bold,italic,underline,strikethrough,removeformat,unlink".split(","),
				function(a, b) {
					e[b] && d.afterCreate(function() {
						P(this.edit.doc, e[b], function() {
							d.cmd.selection();
							d.clickToolbar(b)
						})
					});
					d.clickToolbar(b, function() {
						d.focus().exec(b, null)
					})
				});
			d.afterCreate(function() {
				function b() {
					e.range.moveToBookmark(f);
					e.select();
					ia && (a("div." + g, h).each(function() {
						a(this).after("<br />").remove(!0)
					}), a("span.Apple-style-span", h).remove(!0), a("span.Apple-tab-span", h).remove(!0), a("span[style]", h).each(function() {
						a(this).css("white-space") == "nowrap" && a(this).remove(!0)
					}), a("meta", h).remove());
					var c = h[0].innerHTML;
					h.remove();
					c !== "" && (ia && (c = c.replace(/(<br>)\1/ig, "$1")), d.pasteType === 2 && (c = c.replace(/(<(?:p|p\s[^>]*)>) *(<\/p>)/ig, ""), /schemas-microsoft-com|worddocument|mso-\w+/i.test(c) ? c = V(c, d.filterMode ? d.htmlTags : a.options.htmlTags) : (c = M(c, d.filterMode ? d.htmlTags : null), c = d.beforeSetHtml(c))), d.pasteType === 1 && (c = c.replace(/&nbsp;/ig, " "), c = c.replace(/\n\s*\n/g, "\n"), c = c.replace(/<br[^>]*>/ig, "\n"), c = c.replace(/<\/p><p[^>]*>/ig, "\n"), c = c.replace(/<[^>]+>/g, ""), c = c.replace(/ {2}/g, " &nbsp;"),
						d.newlineTag == "p" ? /\n/.test(c) && (c = c.replace(/^/, "<p>").replace(/$/, "<br /></p>").replace(/\n/g, "<br /></p><p>")) : c = c.replace(/\n/g, "<br />$&")), d.insertHtml(c, !0))
				}
				var c = d.edit.doc,
					e, f, h, g = "__kindeditor_paste__",
					j = !1;
				a(c.body).bind("paste", function(i) {
					if (d.pasteType === 0) i.stop();
					else if (!j) {
						j = !0;
						a("div." + g, c).remove();
						e = d.cmd.selection();
						f = e.range.createBookmark();
						h = a('<div class="' + g + '"></div>', c).css({
							position: "absolute",
							width: "1px",
							height: "1px",
							overflow: "hidden",
							left: "-1981px",
							top: a(f.start).pos().y + "px",
							"white-space": "nowrap"
						});
						a(c.body).append(h);
						if (C) {
							var m = e.range.get(!0);
							m.moveToElementText(h[0]);
							m.select();
							m.execCommand("paste");
							i.preventDefault()
						} else e.range.selectNodeContents(h[0]), e.select();
						setTimeout(function() {
							b();
							j = !1
						}, 0)
					}
				})
			});
			d.beforeGetHtml(function(a) {
				C && N <= 8 && (a = a.replace(/<div\s+[^>]*data-ke-input-tag="([^"]*)"[^>]*>([\s\S]*?)<\/div>/ig, function(a, b) {
					return unescape(b)
				}));
				return a.replace(/(<(?:noscript|noscript\s[^>]*)>)([\s\S]*?)(<\/noscript>)/ig, function(a, b, d, c) {
					return b +
						s(d).replace(/\s+/g, " ") + c
				}).replace(/<img[^>]*class="?ke-(flash|rm|media)"?[^>]*>/ig, function(a) {
					var a = H(a),
						b = O(a.style || ""),
						d = hb(a["data-ke-tag"]);
					d.width = p(a.width, j(p(b.width, "")));
					d.height = p(a.height, j(p(b.height, "")));
					return Ja(d)
				}).replace(/<img[^>]*class="?ke-anchor"?[^>]*>/ig, function(a) {
					a = H(a);
					return '<a name="' + unescape(a["data-ke-name"]) + '"></a>'
				}).replace(/<div\s+[^>]*data-ke-script-attr="([^"]*)"[^>]*>([\s\S]*?)<\/div>/ig, function(a, b, d) {
					return "<script" + unescape(b) + ">" + unescape(d) + "<\/script>"
				}).replace(/<div\s+[^>]*data-ke-noscript-attr="([^"]*)"[^>]*>([\s\S]*?)<\/div>/ig,
					function(a, b, d) {
						return "<noscript" + unescape(b) + ">" + unescape(d) + "</noscript>"
					}).replace(/(<[^>]*)data-ke-src="([^"]*)"([^>]*>)/ig, function(a, b, d) {
					a = a.replace(/(\s+(?:href|src)=")[^"]*(")/i, function(a, b, c) {
						return b + s(d) + c
					});
					return a = a.replace(/\s+data-ke-src="[^"]*"/i, "")
				}).replace(/(<[^>]+\s)data-ke-(on\w+="[^"]*"[^>]*>)/ig, function(a, b, d) {
					return b + d
				})
			});
			d.beforeSetHtml(function(a) {
				C && N <= 8 && (a = a.replace(/<input[^>]*>|<(select|button)[^>]*>[\s\S]*?<\/\1>/ig, function(a) {
					var b = H(a);
					if (O(b.style || "").display ==
						"none") return '<div class="ke-display-none" data-ke-input-tag="' + escape(a) + '"></div>';
					return a
				}));
				return a.replace(/<embed[^>]*type="([^"]+)"[^>]*>(?:<\/embed>)?/ig, function(a) {
					a = H(a);
					a.src = p(a.src, "");
					a.width = p(a.width, 0);
					a.height = p(a.height, 0);
					return ib(d.themesPath + "common/blank.gif", a)
				}).replace(/<a[^>]*name="([^"]+)"[^>]*>(?:<\/a>)?/ig, function(a) {
					var b = H(a);
					if (b.href !== c) return a;
					return '<img class="ke-anchor" src="' + CONTEXT_PATH +'css/images/anchor.gif" data-ke-name="' + escape(b.name) + '" />'
				}).replace(/<script([^>]*)>([\s\S]*?)<\/script>/ig,
					function(a, b, d) {
						return '<div class="ke-script" data-ke-script-attr="' + escape(b) + '">' + escape(d) + "</div>"
					}).replace(/<noscript([^>]*)>([\s\S]*?)<\/noscript>/ig, function(a, b, d) {
					return '<div class="ke-noscript" data-ke-noscript-attr="' + escape(b) + '">' + escape(d) + "</div>"
				}).replace(/(<[^>]*)(href|src)="([^"]*)"([^>]*>)/ig, function(a, b, d, c, e) {
					if (a.match(/\sdata-ke-src="[^"]*"/i)) return a;
					return a = b + d + '="' + c + '" data-ke-src="' + q(c) + '"' + e
				}).replace(/(<[^>]+\s)(on\w+="[^"]*"[^>]*>)/ig, function(a, b, d) {
					return b +
						"data-ke-" + d
				}).replace(/<table[^>]*\s+border="0"[^>]*>/ig, function(a) {
					if (a.indexOf("ke-zeroborder") >= 0) return a;
					return S(a, "ke-zeroborder")
				})
			})
		})
	}
})(window);
KindEditor.lang({
	source: 'HTML代码',
	preview: '预览',
	undo: '后退(Ctrl+Z)',
	redo: '前进(Ctrl+Y)',
	cut: '剪切(Ctrl+X)',
	copy: '复制(Ctrl+C)',
	paste: '粘贴(Ctrl+V)',
	plainpaste: '粘贴为无格式文本',
	wordpaste: '从Word粘贴',
	selectall: '全选(Ctrl+A)',
	justifyleft: '左对齐',
	justifycenter: '居中',
	justifyright: '右对齐',
	justifyfull: '两端对齐',
	insertorderedlist: '编号',
	insertunorderedlist: '项目符号',
	indent: '增加缩进',
	outdent: '减少缩进',
	subscript: '下标',
	superscript: '上标',
	formatblock: '段落',
	fontname: '字体',
	fontsize: '文字大小',
	forecolor: '文字颜色',
	hilitecolor: '文字背景',
	bold: '粗体(Ctrl+B)',
	italic: '斜体(Ctrl+I)',
	underline: '下划线(Ctrl+U)',
	strikethrough: '删除线',
	removeformat: '删除格式',
	image: '图片',
	multiimage: '批量图片上传',
	flash: 'Flash',
	media: '视音频',
	table: '表格',
	tablecell: '单元格',
	hr: '插入横线',
	emoticons: '插入表情',
	link: '超级链接',
	unlink: '取消超级链接',
	fullscreen: '全屏显示(Esc)',
	about: '关于',
	print: '打印(Ctrl+P)',
	filemanager: '文件空间',
	code: '插入程序代码',
	map: 'Google地图',
	baidumap: '百度地图',
	lineheight: '行距',
	clearhtml: '清理HTML代码',
	pagebreak: '插入分页符',
	quickformat: '一键排版',
	insertfile: '插入文件',
	template: '插入模板',
	anchor: '锚点',
	yes: '确定',
	no: '取消',
	close: '关闭',
	editImage: '图片属性',
	deleteImage: '删除图片',
	editFlash: 'Flash属性',
	deleteFlash: '删除Flash',
	editMedia: '视音频属性',
	deleteMedia: '删除视音频',
	editLink: '超级链接属性',
	deleteLink: '取消超级链接',
	editAnchor: '锚点属性',
	deleteAnchor: '删除锚点',
	tableprop: '表格属性',
	tablecellprop: '单元格属性',
	tableinsert: '插入表格',
	tabledelete: '删除表格',
	tablecolinsertleft: '左侧插入列',
	tablecolinsertright: '右侧插入列',
	tablerowinsertabove: '上方插入行',
	tablerowinsertbelow: '下方插入行',
	tablerowmerge: '向下合并单元格',
	tablecolmerge: '向右合并单元格',
	tablerowsplit: '拆分行',
	tablecolsplit: '拆分列',
	tablecoldelete: '删除列',
	tablerowdelete: '删除行',
	noColor: '无颜色',
	pleaseSelectFile: '请选择文件。',
	invalidImg: "请输入有效的URL地址。\n只允许jpg,gif,bmp,png格式。",
	invalidMedia: "请输入有效的URL地址。\n只允许swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb格式。",
	invalidWidth: "宽度必须为数字。",
	invalidHeight: "高度必须为数字。",
	invalidBorder: "边框必须为数字。",
	invalidUrl: "请输入有效的URL地址。",
	invalidRows: '行数为必选项，只允许输入大于0的数字。',
	invalidCols: '列数为必选项，只允许输入大于0的数字。',
	invalidPadding: '边距必须为数字。',
	invalidSpacing: '间距必须为数字。',
	invalidJson: '服务器发生故障。',
	uploadSuccess: '上传成功。',
	cutError: '您的浏览器安全设置不允许使用剪切操作，请使用快捷键(Ctrl+X)来完成。',
	copyError: '您的浏览器安全设置不允许使用复制操作，请使用快捷键(Ctrl+C)来完成。',
	pasteError: '您的浏览器安全设置不允许使用粘贴操作，请使用快捷键(Ctrl+V)来完成。',
	ajaxLoading: '加载中，请稍候 ...',
	uploadLoading: '上传中，请稍候 ...',
	uploadError: '上传错误',
	word: '插入word',
	'word.url': 'word文件',
	'word.title': '文件说明',
	'word.upload': '浏览...',
	'plainpaste.comment': '请使用快捷键(Ctrl+V)把内容粘贴到下面的方框里。',
	'wordpaste.comment': '请使用快捷键(Ctrl+V)把内容粘贴到下面的方框里。',
	'link.url': 'URL',
	'link.linkType': '打开类型',
	'link.newWindow': '新窗口',
	'link.selfWindow': '当前窗口',
	'flash.url': 'URL',
	'flash.width': '宽度',
	'flash.height': '高度',
	'flash.upload': '上传',
	'flash.viewServer': '文件空间',
	'media.url': 'URL',
	'media.width': '宽度',
	'media.height': '高度',
	'media.autostart': '自动播放',
	'media.upload': '上传',
	'media.viewServer': '文件空间',
	'image.remoteImage': '网络图片',
	'image.localImage': '本地上传',
	'image.remoteUrl': '图片地址',
	'image.localUrl': '上传文件',
	'image.size': '图片大小',
	'image.width': '宽',
	'image.height': '高',
	'image.resetSize': '重置大小',
	'image.align': '对齐方式',
	'image.defaultAlign': '默认方式',
	'image.leftAlign': '左对齐',
	'image.rightAlign': '右对齐',
	'image.imgTitle': '图片说明',
	'image.upload': '浏览...',
	'image.viewServer': '图片空间',
	'multiimage.uploadDesc': '允许用户同时上传<%=uploadLimit%>张图片，单张图片容量不超过<%=sizeLimit%>',
	'multiimage.startUpload': '开始上传',
	'multiimage.clearAll': '全部清空',
	'multiimage.insertAll': '全部插入',
	'multiimage.queueLimitExceeded': '文件数量超过限制。',
	'multiimage.fileExceedsSizeLimit': '文件大小超过限制。',
	'multiimage.zeroByteFile': '无法上传空文件。',
	'multiimage.invalidFiletype': '文件类型不正确。',
	'multiimage.unknownError': '发生异常，无法上传。',
	'multiimage.pending': '等待上传',
	'multiimage.uploadError': '上传失败',
	'filemanager.emptyFolder': '空文件夹',
	'filemanager.moveup': '移到上一级文件夹',
	'filemanager.viewType': '显示方式：',
	'filemanager.viewImage': '缩略图',
	'filemanager.listImage': '详细信息',
	'filemanager.orderType': '排序方式：',
	'filemanager.fileName': '名称',
	'filemanager.fileSize': '大小',
	'filemanager.fileType': '类型',
	'insertfile.url': 'URL',
	'insertfile.title': '文件说明',
	'insertfile.upload': '上传',
	'insertfile.viewServer': '文件空间',
	'table.cells': '单元格数',
	'table.rows': '行数',
	'table.cols': '列数',
	'table.size': '大小',
	'table.width': '宽度',
	'table.height': '高度',
	'table.percent': '%',
	'table.px': 'px',
	'table.space': '边距间距',
	'table.padding': '边距',
	'table.spacing': '间距',
	'table.align': '对齐方式',
	'table.textAlign': '水平对齐',
	'table.verticalAlign': '垂直对齐',
	'table.alignDefault': '默认',
	'table.alignLeft': '左对齐',
	'table.alignCenter': '居中',
	'table.alignRight': '右对齐',
	'table.alignTop': '顶部',
	'table.alignMiddle': '中部',
	'table.alignBottom': '底部',
	'table.alignBaseline': '基线',
	'table.border': '边框',
	'table.borderWidth': '边框',
	'table.borderColor': '颜色',
	'table.backgroundColor': '背景颜色',
	'map.address': '地址: ',
	'map.search': '搜索',
	'baidumap.address': '地址: ',
	'baidumap.search': '搜索',
	'baidumap.insertDynamicMap': '插入动态地图',
	'anchor.name': '锚点名称',
	'formatblock.formatBlock': {
		h1: '标题 1',
		h2: '标题 2',
		h3: '标题 3',
		h4: '标题 4',
		p: '正 文'
	},
	'fontname.fontName': {
		'SimSun': '宋体',
		'NSimSun': '新宋体',
		'FangSong_GB2312': '仿宋_GB2312',
		'KaiTi_GB2312': '楷体_GB2312',
		'SimHei': '黑体',
		'Microsoft YaHei': '微软雅黑',
		'Arial': 'Arial',
		'Arial Black': 'Arial Black',
		'Times New Roman': 'Times New Roman',
		'Courier New': 'Courier New',
		'Tahoma': 'Tahoma',
		'Verdana': 'Verdana'
	},
	'lineheight.lineHeight': [{
		'1': '单倍行距'
	}, {
		'1.5': '1.5倍行距'
	}, {
		'2': '2倍行距'
	}, {
		'2.5': '2.5倍行距'
	}, {
		'3': '3倍行距'
	}],
	'template.selectTemplate': '可选模板',
	'template.replaceContent': '替换当前内容',
	'template.fileList': {
		'1.html': '图片和文字',
		'2.html': '表格',
		'3.html': '项目编号'
	}
}, 'zh_CN');
KindEditor.plugin("anchor", function(b) {
	var c = this,
		g = c.lang("anchor.");
	c.plugin.anchor = {
		edit: function() {
			var l = ['<div style="padding:20px;"><div class="ke-dialog-row">', '<label for="keName">' + g.name + "</label>", '<input class="ke-input-text" type="text" id="keName" name="name" value="" style="width:100px;" /></div></div>'].join(""),
				l = c.createDialog({
					name: "anchor",
					width: 300,
					title: c.lang("anchor"),
					body: l,
					yesBtn: {
						name: c.lang("yes"),
						click: function() {
							c.insertHtml('<a name="' + f.val() + '">').hideDialog().focus()
						}
					}
				}).div,
				f = b('input[name="name"]', l);
			(l = c.plugin.getSelectedAnchor()) && f.val(unescape(l.attr("data-ke-name")));
			f[0].focus();
			f[0].select()
		},
		"delete": function() {
			c.plugin.getSelectedAnchor().remove()
		}
	};
	c.clickToolbar("anchor", c.plugin.anchor.edit)
});
KindEditor.plugin("baidumap", function(b) {
	var c = this,
		g = c.lang("baidumap."),
		l = b.undef(c.mapWidth, 558),
		f = b.undef(c.mapHeight, 360);
	c.clickToolbar("baidumap", function() {
		function i() {
			s = v[0].contentWindow;
			r = b.iframeDoc(v)
		}
		var n = ['<div style="padding:10px 20px;"><div class="ke-header"><div class="ke-left">', g.address + ' <input id="kindeditor_plugin_map_address" name="address" class="ke-input-text" value="" style="width:200px;" /> ', '<span class="ke-button-common ke-button-outer">', '<input type="button" name="searchBtn" class="ke-button-common ke-button" value="' +
			g.search + '" />', '</span></div><div class="ke-right">', '<input type="checkbox" id="keInsertDynamicMap" name="insertDynamicMap" value="1" /> <label for="keInsertDynamicMap">' + g.insertDynamicMap + "</label>", '</div><div class="ke-clearfix"></div></div>', '<div class="ke-map" style="width:' + l + "px;height:" + f + 'px;"></div>', "</div>"
		].join(""),
			n = c.createDialog({
				name: "baidumap",
				width: l + 42,
				title: c.lang("baidumap"),
				body: n,
				yesBtn: {
					name: c.lang("yes"),
					click: function() {
						var b = s.map,
							g = b.getCenter(),
							g = g.lng + "," + g.lat,
							b = b.getZoom(),
							b = [q[0].checked ? c.pluginsPath + "baidumap/index.html" : "http://api.map.baidu.com/staticimage", "?center=" + encodeURIComponent(g), "&zoom=" + encodeURIComponent(b), "&width=" + l, "&height=" + f, "&markers=" + encodeURIComponent(g), "&markerStyles=" + encodeURIComponent("l,A")].join("");
						q[0].checked ? c.insertHtml('<iframe src="' + b + '" frameborder="0" style="width:' + (l + 2) + "px;height:" + (f + 2) + 'px;"></iframe>') : c.exec("insertimage", b);
						c.hideDialog().focus()
					}
				},
				beforeRemove: function() {
					j.remove();
					r && r.write("");
					v.remove()
				}
			}),
			m = n.div,
			o = b('[name="address"]', m),
			j = b('[name="searchBtn"]', m),
			q = b('[name="insertDynamicMap"]', n.div),
			s, r, v = b('<iframe class="ke-textarea" frameborder="0" src="' + c.pluginsPath + 'baidumap/map.html" style="width:' + l + "px;height:" + f + 'px;"></iframe>');
		v.bind("load", function() {
			v.unbind("load");
			b.IE ? i() : setTimeout(i, 0)
		});
		b(".ke-map", m).replaceWith(v);
		j.click(function() {
			s.search(o.val())
		})
	})
});
KindEditor.plugin("clearhtml", function(b) {
	var c = this;
	c.clickToolbar("clearhtml", function() {
		c.focus();
		var g = c.html(),
			g = g.replace(/(<script[^>]*>)([\s\S]*?)(<\/script>)/ig, ""),
			g = g.replace(/(<style[^>]*>)([\s\S]*?)(<\/style>)/ig, ""),
			g = b.formatHtml(g, {
				a: ["href", "target"],
				embed: ["src", "width", "height", "type", "loop", "autostart", "quality", ".width", ".height", "align", "allowscriptaccess"],
				img: ["src", "width", "height", "border", "alt", "title", ".width", ".height"],
				table: ["border"],
				"td,th": ["rowspan", "colspan"],
				"div,hr,br,tbody,tr,p,ol,ul,li,blockquote,h1,h2,h3,h4,h5,h6": []
			});
		c.html(g);
		c.cmd.selection(!0);
		c.addBookmark()
	})
});
KindEditor.plugin("code", function(b) {
	var c = this;
	c.clickToolbar("code", function() {
		c.lang("code.");
		var g = c.createDialog({
			name: "code",
			width: 450,
			title: c.lang("code"),
			body: '<div style="padding:10px 20px;"><div class="ke-dialog-row"><select class="ke-code-type"><option value="js">JavaScript</option><option value="html">HTML</option><option value="css">CSS</option><option value="php">PHP</option><option value="pl">Perl</option><option value="py">Python</option><option value="rb">Ruby</option><option value="java">Java</option><option value="vb">ASP/VB</option><option value="cpp">C/C++</option><option value="cs">C#</option><option value="xml">XML</option><option value="bsh">Shell</option><option value="">Other</option></select></div><textarea class="ke-textarea" style="width:408px;height:260px;"></textarea></div>',
			yesBtn: {
				name: c.lang("yes"),
				click: function() {
					var f = b(".ke-code-type", g.div).val(),
						i = l.val(),
						f = '<pre class="prettyprint' + (f === "" ? "" : " lang-" + f) + '">\n' + b.escape(i) + "</pre> ";
					c.insertHtml(f).hideDialog().focus()
				}
			}
		}),
			l = b("textarea", g.div);
		l[0].focus()
	})
});
KindEditor.plugin("emoticons", function(b) {
	var c = this,
		//g = c.emoticonsPath || c.pluginsPath + "emoticons/images/",
		//修改表情路径 lingy 
		g = c.emoticonsPath || CONTEXT_PATH+"css/images/",
		l = c.allowPreviewEmoticons === void 0 ? !0 : c.allowPreviewEmoticons,
		f = 1;
	c.clickToolbar("emoticons", function() {
		function i(f, j, i) {
			A ? f.mouseover(function() {
				j > D ? (A.css("left", 0), A.css("right", "")) : (A.css("left", ""), A.css("right", 0));
				F.attr("src", g + i + ".gif");
				b(this).addClass("ke-on")
			}) : f.mouseover(function() {
				b(this).addClass("ke-on")
			});
			f.mouseout(function() {
				b(this).removeClass("ke-on")
			});
			f.click(function(b) {
				c.insertHtml('<img src="' +
					g + i + '.gif" border="0" alt="" />').hideMenu().focus();
				b.stop()
			})
		}

		function n(c, f) {
			var j = document.createElement("table");
			f.append(j);
			A && (b(j).mouseover(function() {
				A.show("block")
			}), b(j).mouseout(function() {
				A.hide()
			}), B.push(b(j)));
			j.className = "ke-table";
			j.cellPadding = 0;
			j.cellSpacing = 0;
			j.border = 0;
			for (var m = (c - 1) * v + r, o = 0; o < q; o++)
				for (var n = j.insertRow(o), l = 0; l < s; l++) {
					var p = b(n.insertCell(l));
					p.addClass("ke-cell");
					i(p, l, m);
					var w = b('<span class="ke-img"></span>').css("background-position", "-" + 24 * m + "px 0px").css("background-image",
						"url(" + g + "static.gif)");
					p.append(w);
					B.push(p);
					m++
				}
			return j
		}

		function m() {
			b.each(B, function() {
				this.unbind()
			})
		}

		function o(b, c) {
			b.click(function(b) {
				m();
				w.parentNode.removeChild(w);
				E.remove();
				w = n(c, p);
				j(c);
				f = c;
				b.stop()
			})
		}

		function j(c) {
			E = b('<div class="ke-page"></div>');
			p.append(E);
			for (var f = 1; f <= z; f++) {
				if (c !== f) {
					var g = b('<a href="javascript:;">[' + f + "]</a>");
					o(g, f);
					E.append(g);
					B.push(g)
				} else E.append(b("@[" + f + "]"));
				E.append(b("@&nbsp;"))
			}
		}
		var q = 5,
			s = 9,
			r = 0,
			v = q * s,
			z = Math.ceil(135 / v),
			D = Math.floor(s / 2),
			p = b('<div class="ke-plugin-emoticons"></div>'),
			B = [];
		c.createMenu({
			name: "emoticons",
			beforeRemove: function() {
				m()
			}
		}).div.append(p);
		var A, F;
		l && (A = b('<div class="ke-preview"></div>').css("right", 0), F = b('<img class="ke-preview-img" src="' + g + r + '.gif" />'), p.append(A), A.append(F));
		var w = n(f, p),
			E;
		j(f)
	})
});
KindEditor.plugin("filemanager", function(b) {
	function c(b, c) {
		c.is_dir ? b.attr("title", c.filename) : b.attr("title", c.filename + " (" + Math.ceil(c.filesize / 1024) + "KB, " + c.datetime + ")")
	}
	var g = this,
		l = b.undef(g.fileManagerJson, g.basePath + "php/file_manager_json.php"),
		f = g.pluginsPath + "filemanager/images/",
		i = g.lang("filemanager.");
	g.plugin.filemanagerDialog = function(n) {
		function m(c, f, j) {
			c = "path=" + c + "&order=" + f + "&dir=" + z;
			B.showLoading(g.lang("ajaxLoading"));
			b.ajax(b.addParam(l, c + "&" + (new Date).getTime()), function(b) {
				B.hideLoading();
				j(b)
			})
		}

		function o(c, f, g, j) {
			var i = b.formatUrl(f.current_url + g.filename, "absolute"),
				o = encodeURIComponent(f.current_dir_path + g.filename + "/");
			g.is_dir ? c.click(function() {
				m(o, E.val(), j)
			}) : g.is_photo ? c.click(function() {
				p.call(this, i, g.filename)
			}) : c.click(function() {
				p.call(this, i, g.filename)
			});
			G.push(c)
		}

		function j(c, f) {
			function g() {
				w.val() == "VIEW" ? m(c.current_dir_path, E.val(), s) : m(c.current_dir_path, E.val(), q)
			}
			b.each(G, function() {
				this.unbind()
			});
			F.unbind();
			w.unbind();
			E.unbind();
			c.current_dir_path && F.click(function() {
				m(c.moveup_dir_path,
					E.val(), f)
			});
			w.change(g);
			E.change(g);
			A.html("")
		}

		function q(c) {
			j(c, q);
			var g = document.createElement("table");
			g.className = "ke-table";
			g.cellPadding = 0;
			g.cellSpacing = 0;
			g.border = 0;
			A.append(g);
			for (var m = c.file_list, n = 0, l = m.length; n < l; n++) {
				var r = m[n],
					s = b(g.insertRow(n));
				s.mouseover(function() {
					b(this).addClass("ke-on")
				}).mouseout(function() {
					b(this).removeClass("ke-on")
				});
				var p = b('<img src="' + (f + (r.is_dir ? "folder-16.gif" : "file-16.gif")) + '" width="16" height="16" alt="' + r.filename + '" align="absmiddle" />'),
					p =
						b(s[0].insertCell(0)).addClass("ke-cell ke-name").append(p).append(document.createTextNode(" " + r.filename));
				!r.is_dir || r.has_file ? (s.css("cursor", "pointer"), p.attr("title", r.filename), o(p, c, r, q)) : p.attr("title", i.emptyFolder);
				b(s[0].insertCell(1)).addClass("ke-cell ke-size").html(r.is_dir ? "-" : Math.ceil(r.filesize / 1024) + "KB");
				b(s[0].insertCell(2)).addClass("ke-cell ke-datetime").html(r.datetime)
			}
		}

		function s(g) {
			j(g, s);
			for (var m = g.file_list, n = 0, q = m.length; n < q; n++) {
				var l = m[n],
					r = b('<div class="ke-inline-block ke-item"></div>');
				A.append(r);
				var p = b('<div class="ke-inline-block ke-photo"></div>').mouseover(function() {
					b(this).addClass("ke-on")
				}).mouseout(function() {
					b(this).removeClass("ke-on")
				});
				r.append(p);
				var v = g.current_url + l.filename,
					v = b('<img src="' + (l.is_dir ? f + "folder-64.gif" : l.is_photo ? v : f + "file-64.gif") + '" width="80" height="80" alt="' + l.filename + '" />');
				!l.is_dir || l.has_file ? (p.css("cursor", "pointer"), c(p, l), o(p, g, l, s)) : p.attr("title", i.emptyFolder);
				p.append(v);
				r.append('<div class="ke-name" title="' + l.filename + '">' +
					l.filename + "</div>")
			}
		}
		var r = b.undef(n.width, 650),
			v = b.undef(n.height, 510),
			z = b.undef(n.dirName, ""),
			D = b.undef(n.viewType, "VIEW").toUpperCase(),
			p = n.clickFn,
			n = ['<div style="padding:10px 20px;"><div class="ke-plugin-filemanager-header"><div class="ke-left">', '<img class="ke-inline-block" name="moveupImg" src="' + f + 'go-up.gif" width="16" height="16" border="0" alt="" /> ', '<a class="ke-inline-block" name="moveupLink" href="javascript:;">' + i.moveup + "</a>", '</div><div class="ke-right">', i.viewType + ' <select class="ke-inline-block" name="viewType">',
				'<option value="VIEW">' + i.viewImage + "</option>", '<option value="LIST">' + i.listImage + "</option>", "</select> ", i.orderType + ' <select class="ke-inline-block" name="orderType">', '<option value="NAME">' + i.fileName + "</option>", '<option value="SIZE">' + i.fileSize + "</option>", '<option value="TYPE">' + i.fileType + "</option>", '</select></div><div class="ke-clearfix"></div></div><div class="ke-plugin-filemanager-body"></div></div>'
			].join(""),
			B = g.createDialog({
				name: "filemanager",
				width: r,
				height: v,
				title: g.lang("filemanager"),
				body: n
			}),
			r = B.div,
			A = b(".ke-plugin-filemanager-body", r);
		b('[name="moveupImg"]', r);
		var F = b('[name="moveupLink"]', r);
		b('[name="viewServer"]', r);
		var w = b('[name="viewType"]', r),
			E = b('[name="orderType"]', r),
			G = [];
		w.val(D);
		m("", E.val(), D == "VIEW" ? s : q);
		return B
	}
});
KindEditor.plugin("flash", function(b) {
	var c = this,
		g = c.lang("flash."),
		l = b.undef(c.allowFlashUpload, !0),
		f = b.undef(c.allowFileManager, !1),
		i = b.undef(c.formatUploadUrl, !0),
		n = b.undef(c.extraFileUploadParams, {}),
		m = b.undef(c.filePostName, "imgFile"),
		o = b.undef(c.uploadJson, c.basePath + "php/upload_json.php");
	c.plugin.flash = {
		edit: function() {
			var j = ['<div style="padding:20px;"><div class="ke-dialog-row">', '<label for="keUrl" style="width:60px;">' + g.url + "</label>", '<input class="ke-input-text" type="text" id="keUrl" name="url" value="" style="width:160px;" /> &nbsp;',
				'<input type="button" class="ke-upload-button" value="' + g.upload + '" /> &nbsp;', '<span class="ke-button-common ke-button-outer">', '<input type="button" class="ke-button-common ke-button" name="viewServer" value="' + g.viewServer + '" />', '</span></div><div class="ke-dialog-row">', '<label for="keWidth" style="width:60px;">' + g.width + "</label>", '<input type="text" id="keWidth" class="ke-input-text ke-input-number" name="width" value="550" maxlength="4" /> </div><div class="ke-dialog-row">', '<label for="keHeight" style="width:60px;">' +
				g.height + "</label>", '<input type="text" id="keHeight" class="ke-input-text ke-input-number" name="height" value="400" maxlength="4" /> </div></div>'
			].join(""),
				q = c.createDialog({
					name: "flash",
					width: 450,
					title: c.lang("flash"),
					body: j,
					yesBtn: {
						name: c.lang("yes"),
						click: function() {
							var f = b.trim(r.val()),
								g = v.val(),
								j = z.val();
							f == "http://" || b.invalidUrl(f) ? (alert(c.lang("invalidUrl")), r[0].focus()) : /^\d*$/.test(g) ? /^\d*$/.test(j) ? (f = b.mediaImg(c.themesPath + "common/blank.gif", {
								src: f,
								type: b.mediaType(".swf"),
								width: g,
								height: j,
								quality: "high"
							}), c.insertHtml(f).hideDialog().focus()) : (alert(c.lang("invalidHeight")), z[0].focus()) : (alert(c.lang("invalidWidth")), v[0].focus())
						}
					}
				}),
				s = q.div,
				r = b('[name="url"]', s),
				j = b('[name="viewServer"]', s),
				v = b('[name="width"]', s),
				z = b('[name="height"]', s);
			r.val("http://");
			if (l) {
				var D = b.uploadbutton({
					button: b(".ke-upload-button", s)[0],
					fieldName: m,
					extraParams: n,
					url: b.addParam(o, "dir=flash"),
					afterUpload: function(f) {
						q.hideLoading();
						if (f.error === 0) {
							var g = f.url;
							i && (g = b.formatUrl(g, "absolute"));
							r.val(g);
							c.afterUpload && c.afterUpload.call(c, g, f, "flash");
							alert(c.lang("uploadSuccess"))
						} else alert(f.message)
					},
					afterError: function(b) {
						q.hideLoading();
						c.errorDialog(b)
					}
				});
				D.fileBox.change(function() {
					q.showLoading(c.lang("uploadLoading"));
					D.submit()
				})
			} else b(".ke-upload-button", s).hide();
			f ? j.click(function() {
				c.loadPlugin("filemanager", function() {
					c.plugin.filemanagerDialog({
						viewType: "LIST",
						dirName: "flash",
						clickFn: function(f) {
							c.dialogs.length > 1 && (b('[name="url"]', s).val(f), c.afterSelectFile && c.afterSelectFile.call(c,
								f), c.hideDialog())
						}
					})
				})
			}) : j.hide();
			if (j = c.plugin.getSelectedFlash()) {
				var p = b.mediaAttrs(j.attr("data-ke-tag"));
				r.val(p.src);
				v.val(b.removeUnit(j.css("width")) || p.width || 0);
				z.val(b.removeUnit(j.css("height")) || p.height || 0)
			}
			r[0].focus();
			r[0].select()
		},
		"delete": function() {
			c.plugin.getSelectedFlash().remove()
		}
	};
	c.clickToolbar("flash", c.plugin.flash.edit)
});
KindEditor.plugin("image", function(b) {
	var c = this,
		g = b.undef(c.allowImageUpload, !0),
		l = b.undef(c.formatUploadUrl, !0),
		f = b.undef(c.allowFileManager, !1),
		i = b.undef(c.uploadJson, c.basePath + "php/upload_json.php"),
		n = b.undef(c.imageTabIndex, 0),
		//m = c.pluginsPath + "image/images/",
		m = CONTEXT_PATH+"css/images/",
		o = b.undef(c.extraFileUploadParams, {}),
		j = b.undef(c.filePostName, "imgFile"),
		q = b.undef(c.fillDescAfterUploadImage, !1),
		s = c.lang("image.");
	c.plugin.imageDialog = function(g) {
		function n(b, c) {
			P.val(b);
			O.val(c);
			V = b;
			T = c
		}
		b.undef(g.imageWidth, "");
		b.undef(g.imageHeight,
			"");
		b.undef(g.imageTitle, "");
		b.undef(g.imageAlign, "");
		var z = b.undef(g.showRemote, !0),
			D = b.undef(g.showLocal, !0),
			p = b.undef(g.tabIndex, 0),
			B = g.clickFn,
			A = "kindeditor_upload_iframe_" + (new Date).getTime(),
			F = [],
			w;
		for (w in o) F.push('<input type="hidden" name="' + w + '" value="' + o[w] + '" />');
		//组装图片传递的参数
		var imgParam ="";
			if(c.uploadImgParam){
				for(var key in c.uploadImgParam){   	 
					imgParam = imgParam+key+"="+c.uploadImgParam[key]+"&";
				}
				imgParam =imgParam +"dir=image";
			}else{
				imgParam ="dir=image";
		}
		var F = ['<div style="padding:20px;padding-top: 40px;">'+
		         //注释 网络图片上传 lingy
		         /*
		          * '<div class="tabs"></div><div class="tab1" style="display:none;"><div class="ke-dialog-row">', '<label for="remoteUrl" style="width:60px;">' + s.remoteUrl + "</label>", '<input type="text" id="remoteUrl" class="ke-input-text" name="url" value="" style="width:200px;" /> &nbsp;<span class="ke-button-common ke-button-outer">',
				'<input type="button" class="ke-button-common ke-button" name="viewServer" value="' + s.viewServer + '" />', '</span></div><div class="ke-dialog-row">', '<label for="remoteWidth" style="width:60px;">' + s.size + "</label>", s.width + ' <input type="text" id="remoteWidth" class="ke-input-text ke-input-number" name="width" value="" maxlength="4" /> ', s.height + ' <input type="text" class="ke-input-text ke-input-number" name="height" value="" maxlength="4" /> ', '<img class="ke-refresh-btn" src="' + m + 'refresh.png" width="16" height="16" alt="" style="cursor:pointer;" title="' +
				s.resetSize + '" />', '</div><div class="ke-dialog-row">', '<label style="width:60px;">' + s.align + "</label>", '<input type="radio" name="align" class="ke-inline-block" value="" checked="checked" /> <img name="defaultImg" src="' + m + 'align_top.gif" width="23" height="25" alt="" />', ' <input type="radio" name="align" class="ke-inline-block" value="left" /> <img name="leftImg" src="' + m + 'align_left.gif" width="23" height="25" alt="" />', ' <input type="radio" name="align" class="ke-inline-block" value="right" /> <img name="rightImg" src="' +
				m + 'align_right.gif" width="23" height="25" alt="" />', '</div><div class="ke-dialog-row">', '<label for="remoteTitle" style="width:60px;">' + s.imgTitle + "</label>", '<input type="text" id="remoteTitle" class="ke-input-text" name="title" value="" style="width:200px;" /></div></div><div class="tab2" style="display:none;">',
				*/ 
			//拼装form内容
			'<iframe name="' + A + '" style="display:none;"></iframe>', '<form class="ke-upload-area ke-form" method="post" enctype="multipart/form-data" target="' + A + '" action="' + b.addParam(i, imgParam) +
			'">', '<div class="ke-dialog-row">', F.join(""), '<label style="width:60px;">' + s.localUrl + "</label>", '<input type="text" name="localUrl" class="ke-input-text" tabindex="-1" style="width:200px;" readonly="true" /> &nbsp;', '<input type="button" class="ke-upload-button" value="' + s.upload + '" />', "</div></form></div>"
			//</div>"
		].join(""),
			E = c.createDialog({
				name: "image",
				//lingy 
				width: D || f ? 450 : 400,
				height: D && z ? 180 : 250,
				//height: D && z ? 300 : 250,
				title: c.lang("image"),
				body: F,
				yesBtn: {
					name: c.lang("yes"),
					click: function() {
						if (!E.isLoading)
							//lingy if (D && z && I && I.selectedIndex ===1 || !z)
							if (D && z || !z) M.fileBox.val() == "" ? alert(c.lang("pleaseSelectFile")) : (E.showLoading(c.lang("uploadLoading")), M.submit(), U.val(""));
							else {
								var f = b.trim(R.val()),
									g = P.val(),
									j = O.val(),
									i = S.val(),
									m = "";
								Y.each(function() {
									if (this.checked) return m = this.value, !1
								});
								f == "http://" || b.invalidUrl(f) ? (alert(c.lang("invalidUrl"))) : /^\d*$/.test(g) ? /^\d*$/.test(j) ? B.call(c, f, i, g, j, 0, m) : (alert(c.lang("invalidHeight")), O[0].focus()) : (alert(c.lang("invalidWidth")), P[0].focus())
							}
					}
				},
				beforeRemove: function() {
					aa.unbind();
					P.unbind();
					O.unbind();
					H.unbind()
				}
			}),
			G = E.div,
			R = b('[name="url"]', G),
			U = b('[name="localUrl"]', G),
			aa = b('[name="viewServer"]', G),
			P = b('.tab1 [name="width"]', G),
			O = b('.tab1 [name="height"]', G),
			H = b(".ke-refresh-btn", G),
			S = b('.tab1 [name="title"]', G),
			Y = b('.tab1 [name="align"]', G),
			I;
	/*	z && D ? (I = b.tabs({
			src: b(".tabs", G),
			afterSelect: function() {}
		}), I.add({
			title: s.remoteImage,
			panel: b(".tab1", G)
		}), I.add({
			title: s.localImage,
			panel: b(".tab2", G)
		}), I.select(p)) : z ? b(".tab1", G).show() : D && b(".tab2", G).show();*/
		var M = b.uploadbutton({
			button: b(".ke-upload-button",
				G)[0],
			fieldName: j,
			form: b(".ke-form", G),
			target: A,
			width: 60,
			afterUpload: function(f) {
				E.hideLoading();
				if (f.error === 0) {
					var g = f.url;
					l && g && (g = b.formatUrl(g, "absolute"));
					//c.afterUpload && c.afterUpload.call(c, g, f, "image");
					c.afterUpload && c.afterUpload.call(c, f, "image");
					//添加 lingy
					if(f.message){
						c.hideDialog();
						alert(f.message);
					}
					//q ? (b(".ke-dialog-row #remoteUrl", G).val(g), b(".ke-tabs-li", G)[0].click(), b(".ke-refresh-btn", G).click()) : B.call(c, g, f.title, f.width, f.height, f.border, f.align)
				} else alert(f.message)
			},
			afterError: function(b) {
				E.hideLoading();
				c.errorDialog(b)
			}
		});
		M.fileBox.change(function() {
			U.val(M.fileBox.val())
		});
		f ? aa.click(function() {
			c.loadPlugin("filemanager", function() {
				c.plugin.filemanagerDialog({
					viewType: "VIEW",
					dirName: "image",
					clickFn: function(f) {
						c.dialogs.length > 1 && (b('[name="url"]', G).val(f), c.afterSelectFile && c.afterSelectFile.call(c, f), c.hideDialog())
					}
				})
			})
		}) : aa.hide();
		var V = 0,
			T = 0;
		H.click(function() {
			var c = b('<img src="' + R.val() + '" />', document).css({
				position: "absolute",
				visibility: "hidden",
				top: 0,
				left: "-1000px"
			});
			c.bind("load", function() {
				n(c.width(), c.height());
				c.remove()
			});
			b(document.body).append(c)
		});
		P.change(function() {
			V > 0 && O.val(Math.round(T / V * parseInt(this.value, 10)))
		});
		O.change(function() {
			T > 0 && P.val(Math.round(V / T * parseInt(this.value, 10)))
		});
		R.val(g.imageUrl);
		n(g.imageWidth, g.imageHeight);
		S.val(g.imageTitle);
		Y.each(function() {
			if (this.value === g.imageAlign) return this.checked = !0, !1
		});
		//注掉 网络上传tab lingy
		/*z && p === 0 && (R[0].focus(), R[0].select());*/
		return E
	};
	c.plugin.image = {
		edit: function() {
			var b = c.plugin.getSelectedImage();
			c.plugin.imageDialog({
				imageUrl: b ? b.attr("data-ke-src") : "http://",
				imageWidth: b ? b.width() : "",
				imageHeight: b ? b.height() : "",
				imageTitle: b ? b.attr("title") : "",
				imageAlign: b ? b.attr("align") : "",
				showRemote: !0,
				showLocal: g,
				tabIndex: b ? 0 : n,
				clickFn: function(b, f, g, j, i, m) {
					c.exec("insertimage", b, f, g, j, i, m);
					setTimeout(function() {
						c.hideDialog().focus()
					}, 0)
				}
			})
		},
		"delete": function() {
			var b = c.plugin.getSelectedImage();
			b.parent().name == "a" && (b = b.parent());
			b.remove()
		}
	};
	c.clickToolbar("image", c.plugin.image.edit)
});

KindEditor.plugin("word", function(b) {
	var c = this,
		g = b.undef(c.allowFileUpload, !0),
		l = b.undef(c.allowFileManager, !1),
		f = b.undef(c.formatUploadUrl, !0),
		i = b.undef(c.uploadJson, c.basePath + "php/upload_json.php"),
		n = b.undef(c.extraFileUploadParams, {}),
		m = b.undef(c.filePostName, "imgFile"),
		o = c.lang("word.");
	c.plugin.wordDialog = function(j) {
		var q = b.undef(j.wordUrl, "http://"),
			s = b.undef(j.wordTitle, ""),
			r = j.clickFn,
			j = ['<div style="padding:20px;;padding-top: 40px;"><div class="ke-dialog-row">', '<label for="keUrl" style="width:60px;">' +
				o.url + "</label>", '<input type="text" id="keUrl" name="url" class="ke-input-text" style="width:200px;" /> &nbsp;', '<input type="button" class="ke-upload-button" value="' + o.upload + '" /> &nbsp;', '<span class="ke-button-common ke-button-outer">', '</div></div></form></div>'
			].join(""),
			v = c.createDialog({
				name: "word",
				width: 450,
				height: 180,
				title: c.lang("word"),
				body: j,
				yesBtn: {
					name: c.lang("yes"),
					click: function() {
						var f = b.trim(D.val()),
							g = p.val();
						f == "http://" || b.invalidUrl(f) ? (alert(c.lang("invalidUrl")), D[0].focus()) : (b.trim(g) === "" && (g = f), r.call(c, f, g))
					}
				}
			}),
			z = v.div,
			D = b('[name="url"]', z),
			j = b('[name="viewServer"]', z),
			p = b('[name="title"]', z);
		if (g) {
			var B = b.uploadbutton({
				button: b(".ke-upload-button", z)[0],
				fieldName: m,
				url: b.addParam(i, "dir=word"),
				extraParams: n,
				afterUpload: function(g) {
					v.hideLoading();
					if (g.error === 0) {
						var j = g.url;
						f && j &&(j = b.formatUrl(j, "absolute"));
						D.val(j);
						//c.afterUpload && c.afterUpload.call(c, j, g, "word");
						c.afterUpload && c.afterUpload.call(c ,g, "word");
						//添加 lingy
						if(g.message){
							c.hideDialog();
							alert(c.lang("uploadSuccess"))
						}
					} else alert(g.message)
				},
				afterError: function(b) {
					v.hideLoading();
					c.errorDialog(b)
				}
			});
			B.fileBox.change(function() {
				v.showLoading(c.lang("uploadLoading"));
				B.submit()
			})
		} else b(".ke-upload-button", z).hide();
		l ? j.click(function() {
			c.loadPlugin("wordmanager", function() {
				c.plugin.wordmanagerDialog({
					viewType: "LIST",
					dirName: "word",
					clickFn: function(f) {
						c.dialogs.length >
							1 && (b('[name="url"]', z).val(f), c.afterSelectWord && c.afterSelectWord.call(c, f), c.hideDialog())
					}
				})
			})
		}) : j.hide();
		D.val(q);
		p.val(s);
		D[0].focus();
		D[0].select()
	};
	c.clickToolbar("word", function() {
		c.plugin.wordDialog({
			clickFn: function(b, f) {
				c.insertHtml('<a href="' + b + '" data-ke-src="' + b + '" target="_blank">' + f + "</a>").hideDialog().focus()
			}
		})
	})
});


KindEditor.plugin("insertfile", function(b) {
	var c = this,
		g = b.undef(c.allowFileUpload, !0),
		l = b.undef(c.allowFileManager, !1),
		f = b.undef(c.formatUploadUrl, !0),
		i = b.undef(c.uploadJson, c.basePath + "php/upload_json.php"),
		n = b.undef(c.extraFileUploadParams, {}),
		m = b.undef(c.filePostName, "imgFile"),
		o = c.lang("insertfile.");
	c.plugin.fileDialog = function(j) {
		var q = b.undef(j.fileUrl, "http://"),
			s = b.undef(j.fileTitle, ""),
			r = j.clickFn,
			j = ['<div style="padding:20px;"><div class="ke-dialog-row">', '<label for="keUrl" style="width:60px;">' +
				o.url + "</label>", '<input type="text" id="keUrl" name="url" class="ke-input-text" style="width:160px;" /> &nbsp;', '<input type="button" class="ke-upload-button" value="' + o.upload + '" /> &nbsp;', '<span class="ke-button-common ke-button-outer">', '<input type="button" class="ke-button-common ke-button" name="viewServer" value="' + o.viewServer + '" />', '</span></div><div class="ke-dialog-row">', '<label for="keTitle" style="width:60px;">' + o.title + "</label>", '<input type="text" id="keTitle" class="ke-input-text" name="title" value="" style="width:160px;" /></div></div></form></div>'
			].join(""),
			v = c.createDialog({
				name: "insertfile",
				width: 450,
				title: c.lang("insertfile"),
				body: j,
				yesBtn: {
					name: c.lang("yes"),
					click: function() {
						var f = b.trim(D.val()),
							g = p.val();
						f == "http://" || b.invalidUrl(f) ? (alert(c.lang("invalidUrl")), D[0].focus()) : (b.trim(g) === "" && (g = f), r.call(c, f, g))
					}
				}
			}),
			z = v.div,
			D = b('[name="url"]', z),
			j = b('[name="viewServer"]', z),
			p = b('[name="title"]', z);
		if (g) {
			var B = b.uploadbutton({
				button: b(".ke-upload-button", z)[0],
				fieldName: m,
				url: b.addParam(i, "dir=file"),
				extraParams: n,
				afterUpload: function(g) {
					v.hideLoading();
					if (g.error === 0) {
						var j = g.url;
						f && j && (j = b.formatUrl(j, "absolute"));
						D.val(j);
						//c.afterUpload && c.afterUpload.call(c, j, g, "insertfile");
						c.afterUpload && c.afterUpload.call(c ,g, "file");
						alert(c.lang("uploadSuccess"))
					} else alert(g.message)
				},
				afterError: function(b) {
					v.hideLoading();
					c.errorDialog(b)
				}
			});
			B.fileBox.change(function() {
				v.showLoading(c.lang("uploadLoading"));
				B.submit()
			})
		} else b(".ke-upload-button", z).hide();
		l ? j.click(function() {
			c.loadPlugin("filemanager", function() {
				c.plugin.filemanagerDialog({
					viewType: "LIST",
					dirName: "file",
					clickFn: function(f) {
						c.dialogs.length >
							1 && (b('[name="url"]', z).val(f), c.afterSelectFile && c.afterSelectFile.call(c, f), c.hideDialog())
					}
				})
			})
		}) : j.hide();
		D.val(q);
		p.val(s);
		D[0].focus();
		D[0].select()
	};
	c.clickToolbar("insertfile", function() {
		c.plugin.fileDialog({
			clickFn: function(b, f) {
				c.insertHtml('<a href="' + b + '" data-ke-src="' + b + '" target="_blank">' + f + "</a>").hideDialog().focus()
			}
		})
	})
});
KindEditor.plugin("lineheight", function(b) {
	var c = this,
		g = c.lang("lineheight.");
	c.clickToolbar("lineheight", function() {
		var l = "",
			f = c.cmd.commonNode({
				"*": ".line-height"
			});
		f && (l = f.css("line-height"));
		var i = c.createMenu({
			name: "lineheight",
			width: 150
		});
		b.each(g.lineHeight, function(f, g) {
			b.each(g, function(b, f) {
				i.addItem({
					title: f,
					checked: l === b,
					click: function() {
						c.cmd.toggle('<span style="line-height:' + b + ';"></span>', {
							span: ".line-height=" + b
						});
						c.updateState();
						c.addBookmark();
						c.hideMenu()
					}
				})
			})
		})
	})
});
KindEditor.plugin("link", function(b) {
	var c = this;
	c.plugin.link = {
		edit: function() {
			var g = c.lang("link."),
				l = '<div style="padding:20px;"><div class="ke-dialog-row"><label for="keUrl" style="width:60px;">' + g.url + '</label><input class="ke-input-text" type="text" id="keUrl" name="url" value="" style="width:260px;" /></div><div class="ke-dialog-row""><label for="keType" style="width:60px;">' + g.linkType + '</label><select id="keType" name="type"></select></div></div>',
				l = c.createDialog({
					name: "link",
					width: 450,
					title: c.lang("link"),
					body: l,
					yesBtn: {
						name: c.lang("yes"),
						click: function() {
							var g = b.trim(f.val());
							g == "http://" || b.invalidUrl(g) ? (alert(c.lang("invalidUrl")), f[0].focus()) : c.exec("createlink", g, i.val()).hideDialog().focus()
						}
					}
				}).div,
				f = b('input[name="url"]', l),
				i = b('select[name="type"]', l);
			f.val("http://");
			i[0].options[0] = new Option(g.newWindow, "_blank");
			i[0].options[1] = new Option(g.selfWindow, "");
			c.cmd.selection();
			if (g = c.plugin.getSelectedLink()) c.cmd.range.selectNode(g[0]), c.cmd.select(), f.val(g.attr("data-ke-src")), i.val(g.attr("target"));
			f[0].focus();
			f[0].select()
		},
		"delete": function() {
			c.exec("unlink", null)
		}
	};
	c.clickToolbar("link", c.plugin.link.edit)
});
KindEditor.plugin("map", function(b) {
	var c = this,
		g = c.lang("map.");
	c.clickToolbar("map", function() {
		function l() {
			m = j[0].contentWindow;
			o = b.iframeDoc(j)
		}
		var f = ['<div style="padding:10px 20px;"><div class="ke-dialog-row">', g.address + ' <input id="kindeditor_plugin_map_address" name="address" class="ke-input-text" value="" style="width:200px;" /> ', '<span class="ke-button-common ke-button-outer">', '<input type="button" name="searchBtn" class="ke-button-common ke-button" value="' + g.search + '" />', '</span></div><div class="ke-map" style="width:558px;height:360px;"></div></div>'].join(""),
			f = c.createDialog({
				name: "map",
				width: 600,
				title: c.lang("map"),
				body: f,
				yesBtn: {
					name: c.lang("yes"),
					click: function() {
						var b = m.map,
							f = b.getCenter().lat() + "," + b.getCenter().lng(),
							g = b.getZoom(),
							b = b.getMapTypeId(),
							j = "http://maps.googleapis.com/maps/api/staticmap";
						j += "?center=" + encodeURIComponent(f);
						j += "&zoom=" + encodeURIComponent(g);
						j += "&size=558x360";
						j += "&maptype=" + encodeURIComponent(b);
						j += "&markers=" + encodeURIComponent(f);
						j += "&language=" + c.langType;
						j += "&sensor=false";
						c.exec("insertimage", j).hideDialog().focus()
					}
				},
				beforeRemove: function() {
					n.remove();
					o && o.write("");
					j.remove()
				}
			}).div,
			i = b('[name="address"]', f),
			n = b('[name="searchBtn"]', f),
			m, o;
		['<!doctype html><html><head>\n<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />\n<style>\n\thtml { height: 100% }\n\tbody { height: 100%; margin: 0; padding: 0; background-color: #FFF }\n\t#map_canvas { height: 100% }\n</style>', '<script src="http://maps.googleapis.com/maps/api/js?sensor=false&language=' + c.langType + '"><\/script>', '<script>\nvar map, geocoder;\nfunction initialize() {\n\tvar latlng = new google.maps.LatLng(31.230393, 121.473704);\n\tvar options = {\n\t\tzoom: 11,\n\t\tcenter: latlng,\n\t\tdisableDefaultUI: true,\n\t\tpanControl: true,\n\t\tzoomControl: true,\n\t\tmapTypeControl: true,\n\t\tscaleControl: true,\n\t\tstreetViewControl: false,\n\t\toverviewMapControl: true,\n\t\tmapTypeId: google.maps.MapTypeId.ROADMAP\n\t};\n\tmap = new google.maps.Map(document.getElementById("map_canvas"), options);\n\tgeocoder = new google.maps.Geocoder();\n\tgeocoder.geocode({latLng: latlng}, function(results, status) {\n\t\tif (status == google.maps.GeocoderStatus.OK) {\n\t\t\tif (results[3]) {\n\t\t\t\tparent.document.getElementById("kindeditor_plugin_map_address").value = results[3].formatted_address;\n\t\t\t}\n\t\t}\n\t});\n}\nfunction search(address) {\n\tif (!map) return;\n\tgeocoder.geocode({address : address}, function(results, status) {\n\t\tif (status == google.maps.GeocoderStatus.OK) {\n\t\t\tmap.setZoom(11);\n\t\t\tmap.setCenter(results[0].geometry.location);\n\t\t\tvar marker = new google.maps.Marker({\n\t\t\t\tmap: map,\n\t\t\t\tposition: results[0].geometry.location\n\t\t\t});\n\t\t} else {\n\t\t\talert("Invalid address: " + address);\n\t\t}\n\t});\n}\n<\/script>\n</head>\n<body onload="initialize();">\n<div id="map_canvas" style="width:100%; height:100%"></div>\n</body></html>'].join("\n");
		var j = b('<iframe class="ke-textarea" frameborder="0" src="' + c.pluginsPath + 'map/map.html" style="width:558px;height:360px;"></iframe>');
		j.bind("load", function() {
			j.unbind("load");
			b.IE ? l() : setTimeout(l, 0)
		});
		b(".ke-map", f).replaceWith(j);
		n.click(function() {
			m.search(i.val())
		})
	})
});
KindEditor.plugin("media", function(b) {
	var c = this,
		g = c.lang("media."),
		l = b.undef(c.allowMediaUpload, !0),
		f = b.undef(c.allowFileManager, !1),
		i = b.undef(c.formatUploadUrl, !0),
		n = b.undef(c.extraFileUploadParams, {}),
		m = b.undef(c.filePostName, "imgFile"),
		o = b.undef(c.uploadJson, c.basePath + "php/upload_json.php");
	c.plugin.media = {
		edit: function() {
			var j = ['<div style="padding:20px;"><div class="ke-dialog-row">', '<label for="keUrl" style="width:60px;">' + g.url + "</label>", '<input class="ke-input-text" type="text" id="keUrl" name="url" value="" style="width:160px;" /> &nbsp;',
				'<input type="button" class="ke-upload-button" value="' + g.upload + '" /> &nbsp;', '<span class="ke-button-common ke-button-outer">', '<input type="button" class="ke-button-common ke-button" name="viewServer" value="' + g.viewServer + '" />', '</span></div><div class="ke-dialog-row">', '<label for="keWidth" style="width:60px;">' + g.width + "</label>", '<input type="text" id="keWidth" class="ke-input-text ke-input-number" name="width" value="550" maxlength="4" /></div><div class="ke-dialog-row">', '<label for="keHeight" style="width:60px;">' +
				g.height + "</label>", '<input type="text" id="keHeight" class="ke-input-text ke-input-number" name="height" value="400" maxlength="4" /></div><div class="ke-dialog-row">', '<label for="keAutostart">' + g.autostart + "</label>", '<input type="checkbox" id="keAutostart" name="autostart" value="" /> </div></div>'
			].join(""),
				q = c.createDialog({
					name: "media",
					width: 450,
					height: 230,
					title: c.lang("media"),
					body: j,
					yesBtn: {
						name: c.lang("yes"),
						click: function() {
							var f = b.trim(r.val()),
								g = v.val(),
								j = z.val();
							f == "http://" || b.invalidUrl(f) ?
								(alert(c.lang("invalidUrl")), r[0].focus()) : /^\d*$/.test(g) ? /^\d*$/.test(j) ? (f = b.mediaImg(c.themesPath + "common/blank.gif", {
								src: f,
								type: b.mediaType(f),
								width: g,
								height: j,
								autostart: D[0].checked ? "true" : "false",
								loop: "true"
							}), c.insertHtml(f).hideDialog().focus()) : (alert(c.lang("invalidHeight")), z[0].focus()) : (alert(c.lang("invalidWidth")), v[0].focus())
						}
					}
				}),
				s = q.div,
				r = b('[name="url"]', s),
				j = b('[name="viewServer"]', s),
				v = b('[name="width"]', s),
				z = b('[name="height"]', s),
				D = b('[name="autostart"]', s);
			r.val("http://");
			if (l) {
				var p = b.uploadbutton({
					button: b(".ke-upload-button", s)[0],
					fieldName: m,
					extraParams: n,
					url: b.addParam(o, "dir=media"),
					afterUpload: function(f) {
						q.hideLoading();
						if (f.error === 0) {
							var g = f.url;
							i && (g = b.formatUrl(g, "absolute"));
							r.val(g);
							c.afterUpload && c.afterUpload.call(c, g, f, "media");
							alert(c.lang("uploadSuccess"))
						} else alert(f.message)
					},
					afterError: function(b) {
						q.hideLoading();
						c.errorDialog(b)
					}
				});
				p.fileBox.change(function() {
					q.showLoading(c.lang("uploadLoading"));
					p.submit()
				})
			} else b(".ke-upload-button", s).hide();
			f ? j.click(function() {
				c.loadPlugin("filemanager", function() {
					c.plugin.filemanagerDialog({
						viewType: "LIST",
						dirName: "media",
						clickFn: function(f) {
							c.dialogs.length > 1 && (b('[name="url"]', s).val(f), c.afterSelectFile && c.afterSelectFile.call(c, f), c.hideDialog())
						}
					})
				})
			}) : j.hide();
			if (j = c.plugin.getSelectedMedia()) {
				var B = b.mediaAttrs(j.attr("data-ke-tag"));
				r.val(B.src);
				v.val(b.removeUnit(j.css("width")) || B.width || 0);
				z.val(b.removeUnit(j.css("height")) || B.height || 0);
				D[0].checked = B.autostart === "true"
			}
			r[0].focus();
			r[0].select()
		},
		"delete": function() {
			c.plugin.getSelectedMedia().remove()
		}
	};
	c.clickToolbar("media", c.plugin.media.edit)
});
(function(b) {
	function c(b) {
		this.init(b)
	}
	b.extend(c, {
		init: function(c) {
			function l(c, f) {
				b(".ke-status > div", c).hide();
				b(".ke-message", c).addClass("ke-error").show().html(b.escape(f))
			}
			var f = this;
			c.afterError = c.afterError || function(b) {
				alert(b)
			};
			f.options = c;
			f.progressbars = {};
			f.div = b(c.container).html(['<div class="ke-swfupload"><div class="ke-swfupload-top"><div class="ke-inline-block ke-swfupload-button"><input type="button" value="Browse" /></div>', '<div class="ke-inline-block ke-swfupload-desc">' + c.uploadDesc +
				"</div>", '<span class="ke-button-common ke-button-outer ke-swfupload-startupload">', '<input type="button" class="ke-button-common ke-button" value="' + c.startButtonValue + '" />', '</span></div><div class="ke-swfupload-body"></div></div>'
			].join(""));
			f.bodyDiv = b(".ke-swfupload-body", f.div);
			var i = {
				debug: !1,
				upload_url: c.uploadUrl,
				flash_url: c.flashUrl,
				file_post_name: c.filePostName,
				button_placeholder: b(".ke-swfupload-button > input", f.div)[0],
				button_image_url: c.buttonImageUrl,
				button_width: c.buttonWidth,
				button_height: c.buttonHeight,
				button_cursor: SWFUpload.CURSOR.HAND,
				file_types: c.fileTypes,
				file_types_description: c.fileTypesDesc,
				file_upload_limit: c.fileUploadLimit,
				file_size_limit: c.fileSizeLimit,
				post_params: c.postParams,
				file_queued_handler: function(b) {
					b.url = f.options.fileIconUrl;
					f.appendFile(b)
				},
				file_queue_error_handler: function(f, i) {
					var o = "";
					switch (i) {
						case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
							o = c.queueLimitExceeded;
							break;
						case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
							o = c.fileExceedsSizeLimit;
							break;
						case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
							o =
								c.zeroByteFile;
							break;
						case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
							o = c.invalidFiletype;
							break;
						default:
							o = c.unknownError
					}
					b.DEBUG && alert(o)
				},
				upload_start_handler: function(c) {
					c = b('div[data-id="' + c.id + '"]', this.bodyDiv);
					b(".ke-status > div", c).hide();
					b(".ke-progressbar", c).show()
				},
				upload_progress_handler: function(b, c, g) {
					c = Math.round(c * 100 / g);
					b = f.progressbars[b.id];
					b.bar.css("width", Math.round(c * 80 / 100) + "px");
					b.percent.html(c + "%")
				},
				upload_error_handler: function(c) {
					c && c.filestatus == SWFUpload.FILE_STATUS.ERROR &&
						(c = b('div[data-id="' + c.id + '"]', f.bodyDiv).eq(0), l(c, f.options.errorMessage))
				},
				upload_success_handler: function(c, g) {
					var i = b('div[data-id="' + c.id + '"]', f.bodyDiv).eq(0),
						j = {};
					try {
						j = b.json(g)
					} catch (q) {
						f.options.afterError.call(this, "<!doctype html><html>" + g + "</html>")
					}
					j.error !== 0 ? l(i, b.DEBUG ? j.message : f.options.errorMessage) : (c.url = j.url, b(".ke-img", i).attr("src", c.url).attr("data-status", c.filestatus).data("data", j), b(".ke-status > div", i).hide())
				}
			};
			f.swfu = new SWFUpload(i);
			b(".ke-swfupload-startupload input",
				f.div).click(function() {
				f.swfu.startUpload()
			})
		},
		getUrlList: function() {
			var c = [];
			b(".ke-img", self.bodyDiv).each(function() {
				var l = b(this);
				l.attr("data-status") == SWFUpload.FILE_STATUS.COMPLETE && c.push(l.data("data"))
			});
			return c
		},
		removeFile: function(c) {
			this.swfu.cancelUpload(c);
			c = b('div[data-id="' + c + '"]', this.bodyDiv);
			b(".ke-photo", c).unbind();
			b(".ke-delete", c).unbind();
			c.remove()
		},
		removeFiles: function() {
			var c = this;
			b(".ke-item", c.bodyDiv).each(function() {
				c.removeFile(b(this).attr("data-id"))
			})
		},
		appendFile: function(c) {
			var l =
				this,
				f = b('<div class="ke-inline-block ke-item" data-id="' + c.id + '"></div>');
			l.bodyDiv.append(f);
			var i = b('<div class="ke-inline-block ke-photo"></div>').mouseover(function() {
				b(this).addClass("ke-on")
			}).mouseout(function() {
				b(this).removeClass("ke-on")
			});
			f.append(i);
			var n = b('<img src="' + c.url + '" class="ke-img" data-status="' + c.filestatus + '" width="80" height="80" alt="' + c.name + '" />');
			i.append(n);
			b('<span class="ke-delete"></span>').appendTo(i).click(function() {
				l.removeFile(c.id)
			});
			n = b('<div class="ke-status"></div>').appendTo(i);
			b('<div class="ke-progressbar"><div class="ke-progressbar-bar"><div class="ke-progressbar-bar-inner"></div></div><div class="ke-progressbar-percent">0%</div></div>').hide().appendTo(n);
			b('<div class="ke-message">' + l.options.pendingMessage + "</div>").appendTo(n);
			f.append('<div class="ke-name">' + c.name + "</div>");
			l.progressbars[c.id] = {
				bar: b(".ke-progressbar-bar-inner", i),
				percent: b(".ke-progressbar-percent", i)
			}
		},
		remove: function() {
			this.removeFiles();
			this.swfu.destroy();
			this.div.html("")
		}
	});
	b.swfupload =
		function(b, l) {
			return new c(b, l)
	}
})(KindEditor);
KindEditor.plugin("multiimage", function(b) {
	var c = this;
	b.undef(c.formatUploadUrl, !0);
	var g = b.undef(c.uploadJson, c.basePath + "php/upload_json.php"),
		l = c.pluginsPath + "multiimage/images/",
		f = b.undef(c.imageSizeLimit, "1MB");
	b.undef(c.imageFileTypes, "*.jpg;*.gif;*.png");
	var i = b.undef(c.imageUploadLimit, 20),
		n = b.undef(c.filePostName, "imgFile"),
		m = c.lang("multiimage.");
	c.plugin.multiImageDialog = function(o) {
		var j = o.clickFn,
			o = b.tmpl(m.uploadDesc, {
				uploadLimit: i,
				sizeLimit: f
			}),
			q = c.createDialog({
				name: "multiimage",
				width: 650,
				height: 510,
				title: c.lang("multiimage"),
				body: '<div style="padding:20px;"><div class="swfupload"></div></div>',
				previewBtn: {
					name: m.insertAll,
					click: function() {
						j.call(c, s.getUrlList())
					}
				},
				yesBtn: {
					name: m.clearAll,
					click: function() {
						s.removeFiles()
					}
				},
				beforeRemove: function() {
					s.remove()
				}
			}),
			s = b.swfupload({
				container: b(".swfupload", q.div),
				buttonImageUrl: l + (c.langType == "zh_CN" ? "select-files-zh_CN.png" : "select-files-en.png"),
				buttonWidth: c.langType == "zh_CN" ? 72 : 88,
				buttonHeight: 23,
				fileIconUrl: l + "image.png",
				uploadDesc: o,
				startButtonValue: m.startUpload,
				uploadUrl: b.addParam(g, "dir=image"),
				flashUrl: l + "swfupload.swf",
				filePostName: n,
				fileTypes: "*.jpg;*.jpeg;*.gif;*.png;*.bmp",
				fileTypesDesc: "Image Files",
				fileUploadLimit: i,
				fileSizeLimit: f,
				postParams: b.undef(c.extraFileUploadParams, {}),
				queueLimitExceeded: m.queueLimitExceeded,
				fileExceedsSizeLimit: m.fileExceedsSizeLimit,
				zeroByteFile: m.zeroByteFile,
				invalidFiletype: m.invalidFiletype,
				unknownError: m.unknownError,
				pendingMessage: m.pending,
				errorMessage: m.uploadError,
				afterError: function(b) {
					c.errorDialog(b)
				}
			});
		return q
	};
	c.clickToolbar("multiimage", function() {
		c.plugin.multiImageDialog({
			clickFn: function(f) {
				f.length !== 0 && (b.each(f, function(b, f) {
					c.afterUpload && c.afterUpload.call(c, f.url, f, "multiimage");
					c.exec("insertimage", f.url, f.title, f.width, f.height, f.border, f.align)
				}), setTimeout(function() {
					c.hideDialog().focus()
				}, 0))
			}
		})
	})
});
(function() {
	if (!window.SWFUpload) window.SWFUpload = function(b) {
		this.initSWFUpload(b)
	}, SWFUpload.prototype.initSWFUpload = function(b) {
		try {
			this.customSettings = {}, this.settings = b, this.eventQueue = [], this.movieName = "SWFUpload_" + SWFUpload.movieCount++, this.movieElement = null, SWFUpload.instances[this.movieName] = this, this.initSettings(), this.loadFlash(), this.displayDebugInfo()
		} catch (c) {
			throw delete SWFUpload.instances[this.movieName], c;
		}
	}, SWFUpload.instances = {}, SWFUpload.movieCount = 0, SWFUpload.version = "2.2.0 2009-03-25",
	SWFUpload.QUEUE_ERROR = {
		QUEUE_LIMIT_EXCEEDED: -100,
		FILE_EXCEEDS_SIZE_LIMIT: -110,
		ZERO_BYTE_FILE: -120,
		INVALID_FILETYPE: -130
	}, SWFUpload.UPLOAD_ERROR = {
		HTTP_ERROR: -200,
		MISSING_UPLOAD_URL: -210,
		IO_ERROR: -220,
		SECURITY_ERROR: -230,
		UPLOAD_LIMIT_EXCEEDED: -240,
		UPLOAD_FAILED: -250,
		SPECIFIED_FILE_ID_NOT_FOUND: -260,
		FILE_VALIDATION_FAILED: -270,
		FILE_CANCELLED: -280,
		UPLOAD_STOPPED: -290
	}, SWFUpload.FILE_STATUS = {
		QUEUED: -1,
		IN_PROGRESS: -2,
		ERROR: -3,
		COMPLETE: -4,
		CANCELLED: -5
	}, SWFUpload.BUTTON_ACTION = {
		SELECT_FILE: -100,
		SELECT_FILES: -110,
		START_UPLOAD: -120
	}, SWFUpload.CURSOR = {
		ARROW: -1,
		HAND: -2
	}, SWFUpload.WINDOW_MODE = {
		WINDOW: "window",
		TRANSPARENT: "transparent",
		OPAQUE: "opaque"
	}, SWFUpload.completeURL = function(b) {
		if (typeof b !== "string" || b.match(/^https?:\/\//i) || b.match(/^\//)) return b;
		var c = window.location.pathname.lastIndexOf("/");
		path = c <= 0 ? "/" : window.location.pathname.substr(0, c) + "/";
		return path + b
	}, SWFUpload.prototype.initSettings = function() {
		this.ensureDefault = function(b, c) {
			this.settings[b] = this.settings[b] == void 0 ? c : this.settings[b]
		};
		this.ensureDefault("upload_url", "");
		this.ensureDefault("preserve_relative_urls", !1);
		this.ensureDefault("file_post_name", "Filedata");
		this.ensureDefault("post_params", {});
		this.ensureDefault("use_query_string", !1);
		this.ensureDefault("requeue_on_error", !1);
		this.ensureDefault("http_success", []);
		this.ensureDefault("assume_success_timeout", 0);
		this.ensureDefault("file_types", "*.*");
		this.ensureDefault("file_types_description", "All Files");
		this.ensureDefault("file_size_limit", 0);
		this.ensureDefault("file_upload_limit",
			0);
		this.ensureDefault("file_queue_limit", 0);
		this.ensureDefault("flash_url", "swfupload.swf");
		this.ensureDefault("prevent_swf_caching", !0);
		this.ensureDefault("button_image_url", "");
		this.ensureDefault("button_width", 1);
		this.ensureDefault("button_height", 1);
		this.ensureDefault("button_text", "");
		this.ensureDefault("button_text_style", "color: #000000; font-size: 16pt;");
		this.ensureDefault("button_text_top_padding", 0);
		this.ensureDefault("button_text_left_padding", 0);
		this.ensureDefault("button_action", SWFUpload.BUTTON_ACTION.SELECT_FILES);
		this.ensureDefault("button_disabled", !1);
		this.ensureDefault("button_placeholder_id", "");
		this.ensureDefault("button_placeholder", null);
		this.ensureDefault("button_cursor", SWFUpload.CURSOR.ARROW);
		this.ensureDefault("button_window_mode", SWFUpload.WINDOW_MODE.WINDOW);
		this.ensureDefault("debug", !1);
		this.settings.debug_enabled = this.settings.debug;
		this.settings.return_upload_start_handler = this.returnUploadStart;
		this.ensureDefault("swfupload_loaded_handler", null);
		this.ensureDefault("file_dialog_start_handler",
			null);
		this.ensureDefault("file_queued_handler", null);
		this.ensureDefault("file_queue_error_handler", null);
		this.ensureDefault("file_dialog_complete_handler", null);
		this.ensureDefault("upload_start_handler", null);
		this.ensureDefault("upload_progress_handler", null);
		this.ensureDefault("upload_error_handler", null);
		this.ensureDefault("upload_success_handler", null);
		this.ensureDefault("upload_complete_handler", null);
		this.ensureDefault("debug_handler", this.debugMessage);
		this.ensureDefault("custom_settings", {});
		this.customSettings = this.settings.custom_settings;
		if (this.settings.prevent_swf_caching) this.settings.flash_url = this.settings.flash_url + (this.settings.flash_url.indexOf("?") < 0 ? "?" : "&") + "preventswfcaching=" + (new Date).getTime();
		if (!this.settings.preserve_relative_urls) this.settings.upload_url = SWFUpload.completeURL(this.settings.upload_url), this.settings.button_image_url = SWFUpload.completeURL(this.settings.button_image_url);
		delete this.ensureDefault
	}, SWFUpload.prototype.loadFlash = function() {
		var b, c;
		if (document.getElementById(this.movieName) !== null) throw "ID " + this.movieName + " is already in use. The Flash Object could not be added";
		b = document.getElementById(this.settings.button_placeholder_id) || this.settings.button_placeholder;
		if (b == void 0) throw "Could not find the placeholder element: " + this.settings.button_placeholder_id;
		c = document.createElement("div");
		c.innerHTML = this.getFlashHTML();
		b.parentNode.replaceChild(c.firstChild, b);
		window[this.movieName] == void 0 && (window[this.movieName] = this.getMovieElement())
	},
	SWFUpload.prototype.getFlashHTML = function() {
		var b = "";
		KindEditor.IE && KindEditor.V > 8 && (b = ' classid = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"');
		return ['<object id="', this.movieName, '"' + b + ' type="application/x-shockwave-flash" data="', this.settings.flash_url, '" width="', this.settings.button_width, '" height="', this.settings.button_height, '" class="swfupload"><param name="wmode" value="', this.settings.button_window_mode, '" /><param name="movie" value="', this.settings.flash_url, '" /><param name="quality" value="high" /><param name="menu" value="false" /><param name="allowScriptAccess" value="always" />',
			'<param name="flashvars" value="' + this.getFlashVars() + '" />', "</object>"].join("")
	}, SWFUpload.prototype.getFlashVars = function() {
		var b = this.buildParamString(),
			c = this.settings.http_success.join(",");
		return ["movieName=", encodeURIComponent(this.movieName), "&amp;uploadURL=", encodeURIComponent(this.settings.upload_url), "&amp;useQueryString=", encodeURIComponent(this.settings.use_query_string), "&amp;requeueOnError=", encodeURIComponent(this.settings.requeue_on_error), "&amp;httpSuccess=", encodeURIComponent(c),
			"&amp;assumeSuccessTimeout=", encodeURIComponent(this.settings.assume_success_timeout), "&amp;params=", encodeURIComponent(b), "&amp;filePostName=", encodeURIComponent(this.settings.file_post_name), "&amp;fileTypes=", encodeURIComponent(this.settings.file_types), "&amp;fileTypesDescription=", encodeURIComponent(this.settings.file_types_description), "&amp;fileSizeLimit=", encodeURIComponent(this.settings.file_size_limit), "&amp;fileUploadLimit=", encodeURIComponent(this.settings.file_upload_limit), "&amp;fileQueueLimit=",
			encodeURIComponent(this.settings.file_queue_limit), "&amp;debugEnabled=", encodeURIComponent(this.settings.debug_enabled), "&amp;buttonImageURL=", encodeURIComponent(this.settings.button_image_url), "&amp;buttonWidth=", encodeURIComponent(this.settings.button_width), "&amp;buttonHeight=", encodeURIComponent(this.settings.button_height), "&amp;buttonText=", encodeURIComponent(this.settings.button_text), "&amp;buttonTextTopPadding=", encodeURIComponent(this.settings.button_text_top_padding), "&amp;buttonTextLeftPadding=",
			encodeURIComponent(this.settings.button_text_left_padding), "&amp;buttonTextStyle=", encodeURIComponent(this.settings.button_text_style), "&amp;buttonAction=", encodeURIComponent(this.settings.button_action), "&amp;buttonDisabled=", encodeURIComponent(this.settings.button_disabled), "&amp;buttonCursor=", encodeURIComponent(this.settings.button_cursor)].join("")
	}, SWFUpload.prototype.getMovieElement = function() {
		if (this.movieElement == void 0) this.movieElement = document.getElementById(this.movieName);
		if (this.movieElement ===
			null) throw "Could not find Flash element";
		return this.movieElement
	}, SWFUpload.prototype.buildParamString = function() {
		var b = this.settings.post_params,
			c = [];
		if (typeof b === "object")
			for (var g in b) b.hasOwnProperty(g) && c.push(encodeURIComponent(g.toString()) + "=" + encodeURIComponent(b[g].toString()));
		return c.join("&amp;")
	}, SWFUpload.prototype.destroy = function() {
		try {
			this.cancelUpload(null, !1);
			var b = null;
			if ((b = this.getMovieElement()) && typeof b.CallFunction === "unknown") {
				for (var c in b) try {
					typeof b[c] === "function" &&
						(b[c] = null)
				} catch (g) {}
				try {
					b.parentNode.removeChild(b)
				} catch (l) {}
			}
			window[this.movieName] = null;
			SWFUpload.instances[this.movieName] = null;
			delete SWFUpload.instances[this.movieName];
			this.movieName = this.eventQueue = this.customSettings = this.settings = this.movieElement = null;
			return !0
		} catch (f) {
			return !1
		}
	}, SWFUpload.prototype.displayDebugInfo = function() {
		this.debug(["---SWFUpload Instance Info---\nVersion: ", SWFUpload.version, "\nMovie Name: ", this.movieName, "\nSettings:\n\tupload_url:               ", this.settings.upload_url,
			"\n\tflash_url:                ", this.settings.flash_url, "\n\tuse_query_string:         ", this.settings.use_query_string.toString(), "\n\trequeue_on_error:         ", this.settings.requeue_on_error.toString(), "\n\thttp_success:             ", this.settings.http_success.join(", "), "\n\tassume_success_timeout:   ", this.settings.assume_success_timeout, "\n\tfile_post_name:           ", this.settings.file_post_name, "\n\tpost_params:              ", this.settings.post_params.toString(), "\n\tfile_types:               ",
			this.settings.file_types, "\n\tfile_types_description:   ", this.settings.file_types_description, "\n\tfile_size_limit:          ", this.settings.file_size_limit, "\n\tfile_upload_limit:        ", this.settings.file_upload_limit, "\n\tfile_queue_limit:         ", this.settings.file_queue_limit, "\n\tdebug:                    ", this.settings.debug.toString(), "\n\tprevent_swf_caching:      ", this.settings.prevent_swf_caching.toString(), "\n\tbutton_placeholder_id:    ", this.settings.button_placeholder_id.toString(),
			"\n\tbutton_placeholder:       ", this.settings.button_placeholder ? "Set" : "Not Set", "\n\tbutton_image_url:         ", this.settings.button_image_url.toString(), "\n\tbutton_width:             ", this.settings.button_width.toString(), "\n\tbutton_height:            ", this.settings.button_height.toString(), "\n\tbutton_text:              ", this.settings.button_text.toString(), "\n\tbutton_text_style:        ", this.settings.button_text_style.toString(), "\n\tbutton_text_top_padding:  ", this.settings.button_text_top_padding.toString(),
			"\n\tbutton_text_left_padding: ", this.settings.button_text_left_padding.toString(), "\n\tbutton_action:            ", this.settings.button_action.toString(), "\n\tbutton_disabled:          ", this.settings.button_disabled.toString(), "\n\tcustom_settings:          ", this.settings.custom_settings.toString(), "\nEvent Handlers:\n\tswfupload_loaded_handler assigned:  ", (typeof this.settings.swfupload_loaded_handler === "function").toString(), "\n\tfile_dialog_start_handler assigned: ", (typeof this.settings.file_dialog_start_handler ===
				"function").toString(), "\n\tfile_queued_handler assigned:       ", (typeof this.settings.file_queued_handler === "function").toString(), "\n\tfile_queue_error_handler assigned:  ", (typeof this.settings.file_queue_error_handler === "function").toString(), "\n\tupload_start_handler assigned:      ", (typeof this.settings.upload_start_handler === "function").toString(), "\n\tupload_progress_handler assigned:   ", (typeof this.settings.upload_progress_handler === "function").toString(), "\n\tupload_error_handler assigned:      ", (typeof this.settings.upload_error_handler === "function").toString(), "\n\tupload_success_handler assigned:    ", (typeof this.settings.upload_success_handler === "function").toString(), "\n\tupload_complete_handler assigned:   ", (typeof this.settings.upload_complete_handler === "function").toString(), "\n\tdebug_handler assigned:             ", (typeof this.settings.debug_handler === "function").toString(), "\n"
		].join(""))
	}, SWFUpload.prototype.addSetting = function(b, c, g) {
		return c == void 0 ? this.settings[b] = g : this.settings[b] =
			c
	}, SWFUpload.prototype.getSetting = function(b) {
		if (this.settings[b] != void 0) return this.settings[b];
		return ""
	}, SWFUpload.prototype.callFlash = function(b, c) {
		var c = c || [],
			g = this.getMovieElement(),
			l, f;
		try {
			f = g.CallFunction('<invoke name="' + b + '" returntype="javascript">' + __flash__argumentsToXML(c, 0) + "</invoke>"), l = eval(f)
		} catch (i) {
			throw "Call to " + b + " failed";
		}
		l != void 0 && typeof l.post === "object" && (l = this.unescapeFilePostParams(l));
		return l
	}, SWFUpload.prototype.selectFile = function() {
		this.callFlash("SelectFile")
	},
	SWFUpload.prototype.selectFiles = function() {
		this.callFlash("SelectFiles")
	}, SWFUpload.prototype.startUpload = function(b) {
		this.callFlash("StartUpload", [b])
	}, SWFUpload.prototype.cancelUpload = function(b, c) {
		c !== !1 && (c = !0);
		this.callFlash("CancelUpload", [b, c])
	}, SWFUpload.prototype.stopUpload = function() {
		this.callFlash("StopUpload")
	}, SWFUpload.prototype.getStats = function() {
		return this.callFlash("GetStats")
	}, SWFUpload.prototype.setStats = function(b) {
		this.callFlash("SetStats", [b])
	}, SWFUpload.prototype.getFile =
		function(b) {
			return typeof b === "number" ? this.callFlash("GetFileByIndex", [b]) : this.callFlash("GetFile", [b])
	}, SWFUpload.prototype.addFileParam = function(b, c, g) {
		return this.callFlash("AddFileParam", [b, c, g])
	}, SWFUpload.prototype.removeFileParam = function(b, c) {
		this.callFlash("RemoveFileParam", [b, c])
	}, SWFUpload.prototype.setUploadURL = function(b) {
		this.settings.upload_url = b.toString();
		this.callFlash("SetUploadURL", [b])
	}, SWFUpload.prototype.setPostParams = function(b) {
		this.settings.post_params = b;
		this.callFlash("SetPostParams", [b])
	}, SWFUpload.prototype.addPostParam = function(b, c) {
		this.settings.post_params[b] = c;
		this.callFlash("SetPostParams", [this.settings.post_params])
	}, SWFUpload.prototype.removePostParam = function(b) {
		delete this.settings.post_params[b];
		this.callFlash("SetPostParams", [this.settings.post_params])
	}, SWFUpload.prototype.setFileTypes = function(b, c) {
		this.settings.file_types = b;
		this.settings.file_types_description = c;
		this.callFlash("SetFileTypes", [b, c])
	}, SWFUpload.prototype.setFileSizeLimit = function(b) {
		this.settings.file_size_limit =
			b;
		this.callFlash("SetFileSizeLimit", [b])
	}, SWFUpload.prototype.setFileUploadLimit = function(b) {
		this.settings.file_upload_limit = b;
		this.callFlash("SetFileUploadLimit", [b])
	}, SWFUpload.prototype.setFileQueueLimit = function(b) {
		this.settings.file_queue_limit = b;
		this.callFlash("SetFileQueueLimit", [b])
	}, SWFUpload.prototype.setFilePostName = function(b) {
		this.settings.file_post_name = b;
		this.callFlash("SetFilePostName", [b])
	}, SWFUpload.prototype.setUseQueryString = function(b) {
		this.settings.use_query_string = b;
		this.callFlash("SetUseQueryString", [b])
	}, SWFUpload.prototype.setRequeueOnError = function(b) {
		this.settings.requeue_on_error = b;
		this.callFlash("SetRequeueOnError", [b])
	}, SWFUpload.prototype.setHTTPSuccess = function(b) {
		typeof b === "string" && (b = b.replace(" ", "").split(","));
		this.settings.http_success = b;
		this.callFlash("SetHTTPSuccess", [b])
	}, SWFUpload.prototype.setAssumeSuccessTimeout = function(b) {
		this.settings.assume_success_timeout = b;
		this.callFlash("SetAssumeSuccessTimeout", [b])
	}, SWFUpload.prototype.setDebugEnabled = function(b) {
		this.settings.debug_enabled =
			b;
		this.callFlash("SetDebugEnabled", [b])
	}, SWFUpload.prototype.setButtonImageURL = function(b) {
		b == void 0 && (b = "");
		this.settings.button_image_url = b;
		this.callFlash("SetButtonImageURL", [b])
	}, SWFUpload.prototype.setButtonDimensions = function(b, c) {
		this.settings.button_width = b;
		this.settings.button_height = c;
		var g = this.getMovieElement();
		if (g != void 0) g.style.width = b + "px", g.style.height = c + "px";
		this.callFlash("SetButtonDimensions", [b, c])
	}, SWFUpload.prototype.setButtonText = function(b) {
		this.settings.button_text = b;
		this.callFlash("SetButtonText", [b])
	}, SWFUpload.prototype.setButtonTextPadding = function(b, c) {
		this.settings.button_text_top_padding = c;
		this.settings.button_text_left_padding = b;
		this.callFlash("SetButtonTextPadding", [b, c])
	}, SWFUpload.prototype.setButtonTextStyle = function(b) {
		this.settings.button_text_style = b;
		this.callFlash("SetButtonTextStyle", [b])
	}, SWFUpload.prototype.setButtonDisabled = function(b) {
		this.settings.button_disabled = b;
		this.callFlash("SetButtonDisabled", [b])
	}, SWFUpload.prototype.setButtonAction = function(b) {
		this.settings.button_action =
			b;
		this.callFlash("SetButtonAction", [b])
	}, SWFUpload.prototype.setButtonCursor = function(b) {
		this.settings.button_cursor = b;
		this.callFlash("SetButtonCursor", [b])
	}, SWFUpload.prototype.queueEvent = function(b, c) {
		c == void 0 ? c = [] : c instanceof Array || (c = [c]);
		var g = this;
		if (typeof this.settings[b] === "function") this.eventQueue.push(function() {
			this.settings[b].apply(this, c)
		}), setTimeout(function() {
			g.executeNextEvent()
		}, 0);
		else if (this.settings[b] !== null) throw "Event handler " + b + " is unknown or is not a function";
	},
	SWFUpload.prototype.executeNextEvent = function() {
		var b = this.eventQueue ? this.eventQueue.shift() : null;
		typeof b === "function" && b.apply(this)
	}, SWFUpload.prototype.unescapeFilePostParams = function(b) {
		var c = /[$]([0-9a-f]{4})/i,
			g = {}, l;
		if (b != void 0) {
			for (var f in b.post)
				if (b.post.hasOwnProperty(f)) {
					l = f;
					for (var i;
						(i = c.exec(l)) !== null;) l = l.replace(i[0], String.fromCharCode(parseInt("0x" + i[1], 16)));
					g[l] = b.post[f]
				}
			b.post = g
		}
		return b
	}, SWFUpload.prototype.testExternalInterface = function() {
		try {
			return this.callFlash("TestExternalInterface")
		} catch (b) {
			return !1
		}
	},
	SWFUpload.prototype.flashReady = function() {
		var b = this.getMovieElement();
		b ? (this.cleanUp(b), this.queueEvent("swfupload_loaded_handler")) : this.debug("Flash called back ready but the flash movie can't be found.")
	}, SWFUpload.prototype.cleanUp = function(b) {
		try {
			if (this.movieElement && typeof b.CallFunction === "unknown") {
				this.debug("Removing Flash functions hooks (this should only run in IE and should prevent memory leaks)");
				for (var c in b) try {
					typeof b[c] === "function" && (b[c] = null)
				} catch (g) {}
			}
		} catch (l) {}
		window.__flash__removeCallback =
			function(b, c) {
				try {
					b && (b[c] = null)
				} catch (g) {}
		}
	}, SWFUpload.prototype.fileDialogStart = function() {
		this.queueEvent("file_dialog_start_handler")
	}, SWFUpload.prototype.fileQueued = function(b) {
		b = this.unescapeFilePostParams(b);
		this.queueEvent("file_queued_handler", b)
	}, SWFUpload.prototype.fileQueueError = function(b, c, g) {
		b = this.unescapeFilePostParams(b);
		this.queueEvent("file_queue_error_handler", [b, c, g])
	}, SWFUpload.prototype.fileDialogComplete = function(b, c, g) {
		this.queueEvent("file_dialog_complete_handler", [b, c,
			g
		])
	}, SWFUpload.prototype.uploadStart = function(b) {
		b = this.unescapeFilePostParams(b);
		this.queueEvent("return_upload_start_handler", b)
	}, SWFUpload.prototype.returnUploadStart = function(b) {
		var c;
		if (typeof this.settings.upload_start_handler === "function") b = this.unescapeFilePostParams(b), c = this.settings.upload_start_handler.call(this, b);
		else if (this.settings.upload_start_handler != void 0) throw "upload_start_handler must be a function";
		c === void 0 && (c = !0);
		this.callFlash("ReturnUploadStart", [ !! c])
	}, SWFUpload.prototype.uploadProgress =
		function(b, c, g) {
			b = this.unescapeFilePostParams(b);
			this.queueEvent("upload_progress_handler", [b, c, g])
	}, SWFUpload.prototype.uploadError = function(b, c, g) {
		b = this.unescapeFilePostParams(b);
		this.queueEvent("upload_error_handler", [b, c, g])
	}, SWFUpload.prototype.uploadSuccess = function(b, c, g) {
		b = this.unescapeFilePostParams(b);
		this.queueEvent("upload_success_handler", [b, c, g])
	}, SWFUpload.prototype.uploadComplete = function(b) {
		b = this.unescapeFilePostParams(b);
		this.queueEvent("upload_complete_handler", b)
	}, SWFUpload.prototype.debug =
		function(b) {
			this.queueEvent("debug_handler", b)
	}, SWFUpload.prototype.debugMessage = function(b) {
		if (this.settings.debug) {
			var c = [];
			if (typeof b === "object" && typeof b.name === "string" && typeof b.message === "string") {
				for (var g in b) b.hasOwnProperty(g) && c.push(g + ": " + b[g]);
				b = c.join("\n") || "";
				c = b.split("\n");
				b = "EXCEPTION: " + c.join("\nEXCEPTION: ")
			}
			SWFUpload.Console.writeLine(b)
		}
	}, SWFUpload.Console = {}, SWFUpload.Console.writeLine = function(b) {
		var c, g;
		try {
			c = document.getElementById("SWFUpload_Console");
			if (!c) g = document.createElement("form"),
			document.getElementsByTagName("body")[0].appendChild(g), c = document.createElement("textarea"), c.id = "SWFUpload_Console", c.style.fontFamily = "monospace", c.setAttribute("wrap", "off"), c.wrap = "off", c.style.overflow = "auto", c.style.width = "700px", c.style.height = "350px", c.style.margin = "5px", g.appendChild(c);
			c.value += b + "\n";
			c.scrollTop = c.scrollHeight - c.clientHeight
		} catch (l) {
			alert("Exception: " + l.name + " Message: " + l.message)
		}
	}
})();
(function() {
	if (typeof SWFUpload === "function") SWFUpload.queue = {}, SWFUpload.prototype.initSettings = function(b) {
		return function() {
			typeof b === "function" && b.call(this);
			this.queueSettings = {};
			this.queueSettings.queue_cancelled_flag = !1;
			this.queueSettings.queue_upload_count = 0;
			this.queueSettings.user_upload_complete_handler = this.settings.upload_complete_handler;
			this.queueSettings.user_upload_start_handler = this.settings.upload_start_handler;
			this.settings.upload_complete_handler = SWFUpload.queue.uploadCompleteHandler;
			this.settings.upload_start_handler = SWFUpload.queue.uploadStartHandler;
			this.settings.queue_complete_handler = this.settings.queue_complete_handler || null
		}
	}(SWFUpload.prototype.initSettings), SWFUpload.prototype.startUpload = function(b) {
		this.queueSettings.queue_cancelled_flag = !1;
		this.callFlash("StartUpload", [b])
	}, SWFUpload.prototype.cancelQueue = function() {
		this.queueSettings.queue_cancelled_flag = !0;
		this.stopUpload();
		for (var b = this.getStats(); b.files_queued > 0;) this.cancelUpload(), b = this.getStats()
	}, SWFUpload.queue.uploadStartHandler =
		function(b) {
			var c;
			typeof this.queueSettings.user_upload_start_handler === "function" && (c = this.queueSettings.user_upload_start_handler.call(this, b));
			c = c === !1 ? !1 : !0;
			this.queueSettings.queue_cancelled_flag = !c;
			return c
	}, SWFUpload.queue.uploadCompleteHandler = function(b) {
		var c = this.queueSettings.user_upload_complete_handler;
		b.filestatus === SWFUpload.FILE_STATUS.COMPLETE && this.queueSettings.queue_upload_count++;
		if (typeof c === "function" ? c.call(this, b) !== !1 : b.filestatus !== SWFUpload.FILE_STATUS.QUEUED) this.getStats().files_queued >
			0 && this.queueSettings.queue_cancelled_flag === !1 ? this.startUpload() : (this.queueSettings.queue_cancelled_flag === !1 ? this.queueEvent("queue_complete_handler", [this.queueSettings.queue_upload_count]) : this.queueSettings.queue_cancelled_flag = !1, this.queueSettings.queue_upload_count = 0)
	}
})();
KindEditor.plugin("pagebreak", function(b) {
	var c = this,
		g = b.undef(c.pagebreakHtml, '<hr style="page-break-after: always;" class="ke-pagebreak" />');
	c.clickToolbar("pagebreak", function() {
		var l = c.cmd,
			f = l.range;
		c.focus();
		f.enlarge(!0);
		l.split(!0);
		var i = c.newlineTag == "br" || b.WEBKIT ? "" : '<p id="__kindeditor_tail_tag__"></p>';
		c.insertHtml(g + i);
		i !== "" && (i = b("#__kindeditor_tail_tag__", c.edit.doc), f.selectNodeContents(i[0]), i.removeAttr("id"), l.select())
	})
});
KindEditor.plugin("plainpaste", function(b) {
	var c = this;
	c.clickToolbar("plainpaste", function() {
		var g = '<div style="padding:10px 20px;"><div style="margin-bottom:10px;">' + c.lang("plainpaste.").comment + '</div><textarea class="ke-textarea" style="width:408px;height:260px;"></textarea></div>',
			g = c.createDialog({
				name: "plainpaste",
				width: 450,
				title: c.lang("plainpaste"),
				body: g,
				yesBtn: {
					name: c.lang("yes"),
					click: function() {
						var f = l.val(),
							f = b.escape(f),
							f = f.replace(/ {2}/g, " &nbsp;"),
							f = c.newlineTag == "p" ? f.replace(/^/,
								"<p>").replace(/$/, "</p>").replace(/\n/g, "</p><p>") : f.replace(/\n/g, "<br />$&");
						c.insertHtml(f).hideDialog().focus()
					}
				}
			}),
			l = b("textarea", g.div);
		l[0].focus()
	})
});
KindEditor.plugin("preview", function(b) {
	var c = this;
	c.clickToolbar("preview", function() {
		c.lang("preview.");
		var g = c.createDialog({
			name: "preview",
			width: 750,
			title: c.lang("preview"),
			body: '<div style="padding:10px 20px;"><iframe class="ke-textarea" frameborder="0" style="width:708px;height:400px;"></iframe></div>'
		}),
			g = b("iframe", g.div),
			l = b.iframeDoc(g);
		l.open();
		l.write(c.fullHtml());
		l.close();
		b(l.body).css("background-color", "#FFF");
		g[0].contentWindow.focus()
	})
});
KindEditor.plugin("quickformat", function(b) {
	function c(b) {
		for (b = b.first(); b && b.first();) b = b.first();
		return b
	}
	var g = this,
		l = b.toMap("blockquote,center,div,h1,h2,h3,h4,h5,h6,p");
	g.clickToolbar("quickformat", function() {
		g.focus();
		for (var f = g.edit.doc, i = g.cmd.range, n = b(f.body).first(), m, o = [], j = [], q = i.createBookmark(!0); n;) {
			m = n.next();
			var s = c(n);
			if (!s || s.name != "img")
				if (l[n.name] ? (n.html(n.html().replace(/^(\s|&nbsp;|\u3000)+/ig, "")), n.css("text-indent", "2em")) : j.push(n), !m || l[m.name] || l[n.name] && !l[m.name]) j.length >
					0 && o.push(j), j = [];
			n = m
		}
		b.each(o, function(c, g) {
			var j = b('<p style="text-indent:2em;"></p>', f);
			g[0].before(j);
			b.each(g, function(b, c) {
				j.append(c)
			})
		});
		i.moveToBookmark(q);
		g.addBookmark()
	})
});
KindEditor.plugin("table", function(b) {
	function c(b, c) {
		c = c.toUpperCase();
		b.css("background-color", c);
		b.css("color", c === "#000000" ? "#FFFFFF" : "#000000");
		b.html(c)
	}

	function g(g, i) {
		function j() {
			b.each(n, function() {
				this.remove()
			});
			n = [];
			b(document).unbind("click,mousedown", j);
			g.unbind("click,mousedown", j)
		}
		i.bind("click,mousedown", function(b) {
			b.stopPropagation()
		});
		i.click(function() {
			j();
			var i = b(this),
				o = i.pos(),
				o = b.colorpicker({
					x: o.x,
					y: o.y + i.height(),
					z: 811214,
					selectedColor: b(this).html(),
					colors: f.colorTable,
					noColor: f.lang("noColor"),
					shadowMode: f.shadowMode,
					click: function(b) {
						c(i, b);
						j()
					}
				});
			n.push(o);
			b(document).bind("click,mousedown", j);
			g.bind("click,mousedown", j)
		})
	}

	function l(b, c, f) {
		for (var g = b = 0, i = c.cells.length; g < i; g++) {
			if (c.cells[g] == f) break;
			b += c.cells[g].rowSpan - 1
		}
		return f.cellIndex - b
	}
	var f = this,
		i = f.lang("table."),
		n = [];
	f.plugin.table = {
		prop: function(m) {
			var o = ['<div style="padding:20px;"><div class="ke-dialog-row">', '<label for="keRows" style="width:90px;">' + i.cells + "</label>", i.rows + ' <input type="text" id="keRows" class="ke-input-text ke-input-number" name="rows" value="" maxlength="4" /> &nbsp; ',
				i.cols + ' <input type="text" class="ke-input-text ke-input-number" name="cols" value="" maxlength="4" />', '</div><div class="ke-dialog-row">', '<label for="keWidth" style="width:90px;">' + i.size + "</label>", i.width + ' <input type="text" id="keWidth" class="ke-input-text ke-input-number" name="width" value="" maxlength="4" /> &nbsp; ', '<select name="widthType">', '<option value="%">' + i.percent + "</option>", '<option value="px">' + i.px + "</option>", "</select> &nbsp; ", i.height + ' <input type="text" class="ke-input-text ke-input-number" name="height" value="" maxlength="4" /> &nbsp; ',
				'<select name="heightType">', '<option value="%">' + i.percent + "</option>", '<option value="px">' + i.px + "</option>", '</select></div><div class="ke-dialog-row">', '<label for="kePadding" style="width:90px;">' + i.space + "</label>", i.padding + ' <input type="text" id="kePadding" class="ke-input-text ke-input-number" name="padding" value="" maxlength="4" /> &nbsp; ', i.spacing + ' <input type="text" class="ke-input-text ke-input-number" name="spacing" value="" maxlength="4" />', '</div><div class="ke-dialog-row">',
				'<label for="keAlign" style="width:90px;">' + i.align + "</label>", '<select id="keAlign" name="align">', '<option value="">' + i.alignDefault + "</option>", '<option value="left">' + i.alignLeft + "</option>", '<option value="center">' + i.alignCenter + "</option>", '<option value="right">' + i.alignRight + "</option>", '</select></div><div class="ke-dialog-row">', '<label for="keBorder" style="width:90px;">' + i.border + "</label>", i.borderWidth + ' <input type="text" id="keBorder" class="ke-input-text ke-input-number" name="border" value="" maxlength="4" /> &nbsp; ',
				i.borderColor + ' <span class="ke-inline-block ke-input-color"></span>', '</div><div class="ke-dialog-row">', '<label for="keBgColor" style="width:90px;">' + i.backgroundColor + "</label>", '<span class="ke-inline-block ke-input-color"></span></div></div>'
			].join(""),
				o = f.createDialog({
					name: "table",
					width: 500,
					title: f.lang("table"),
					body: o,
					beforeRemove: function() {
						F.unbind()
					},
					yesBtn: {
						name: f.lang("yes"),
						click: function() {
							var c = j.val(),
								g = l.val(),
								i = n.val(),
								m = r.val(),
								o = v.val(),
								E = z.val(),
								H = D.val(),
								S = p.val(),
								Y = B.val(),
								I = A.val(),
								M = b(F[0]).html() || "",
								V = b(F[1]).html() || "";
							if (c == 0 || !/^\d+$/.test(c)) alert(f.lang("invalidRows")), j[0].focus();
							else if (g == 0 || !/^\d+$/.test(g)) alert(f.lang("invalidRows")), l[0].focus();
							else if (/^\d*$/.test(i))
								if (/^\d*$/.test(m))
									if (/^\d*$/.test(H))
										if (/^\d*$/.test(S))
											if (/^\d*$/.test(I))
												if (w) i !== "" ? w.width(i + o) : w.css("width", ""), w[0].width !== void 0 && w.removeAttr("width"), m !== "" ? w.height(m + E) : w.css("height", ""), w[0].height !== void 0 && w.removeAttr("height"), w.css("background-color", V), w[0].bgColor !==
													void 0 && w.removeAttr("bgColor"), H !== "" ? w[0].cellPadding = H : w.removeAttr("cellPadding"), S !== "" ? w[0].cellSpacing = S : w.removeAttr("cellSpacing"), Y !== "" ? w[0].align = Y : w.removeAttr("align"), I !== "" ? w.attr("border", I) : w.removeAttr("border"), I === "" || I === "0" ? w.addClass("ke-zeroborder") : w.removeClass("ke-zeroborder"), M !== "" ? w.attr("borderColor", M) : w.removeAttr("borderColor"), f.hideDialog().focus();
												else {
													var T = "";
													i !== "" && (T += "width:" + i + o + ";");
													m !== "" && (T += "height:" + m + E + ";");
													V !== "" && (T += "background-color:" + V + ";");
													i = "<table";
													T !== "" && (i += ' style="' + T + '"');
													H !== "" && (i += ' cellpadding="' + H + '"');
													S !== "" && (i += ' cellspacing="' + S + '"');
													Y !== "" && (i += ' align="' + Y + '"');
													I !== "" && (i += ' border="' + I + '"');
													if (I === "" || I === "0") i += ' class="ke-zeroborder"';
													M !== "" && (i += ' bordercolor="' + M + '"');
													i += ">";
													for (H = 0; H < c; H++) {
														i += "<tr>";
														for (S = 0; S < g; S++) i += "<td>" + (b.IE ? "&nbsp;" : "<br />") + "</td>";
														i += "</tr>"
													}
													i += "</table>";
													b.IE || (i += "<br />");
													f.insertHtml(i);
													f.select().hideDialog().focus();
													f.addBookmark()
												} else alert(f.lang("invalidBorder")), A[0].focus();
												else alert(f.lang("invalidSpacing")), p[0].focus();
												else alert(f.lang("invalidPadding")), D[0].focus();
												else alert(f.lang("invalidHeight")), r[0].focus();
												else alert(f.lang("invalidWidth")), n[0].focus()
						}
					}
				}).div,
				j = b('[name="rows"]', o).val(3),
				l = b('[name="cols"]', o).val(2),
				n = b('[name="width"]', o).val(100),
				r = b('[name="height"]', o),
				v = b('[name="widthType"]', o),
				z = b('[name="heightType"]', o),
				D = b('[name="padding"]', o).val(2),
				p = b('[name="spacing"]', o).val(0),
				B = b('[name="align"]', o),
				A = b('[name="border"]', o).val(1),
				F = b(".ke-input-color", o);
			g(o, F.eq(0));
			g(o, F.eq(1));
			c(F.eq(0), "#000000");
			c(F.eq(1), "");
			j[0].focus();
			j[0].select();
			var w;
			if (!m && (w = f.plugin.getSelectedTable())) {
				j.val(w[0].rows.length);
				l.val(w[0].rows.length > 0 ? w[0].rows[0].cells.length : 0);
				j.attr("disabled", !0);
				l.attr("disabled", !0);
				var E, m = w[0].style.width || w[0].width,
					o = w[0].style.height || w[0].height;
				m !== void 0 && (E = /^(\d+)((?:px|%)*)$/.exec(m)) ? (n.val(E[1]), v.val(E[2])) : n.val("");
				if (o !== void 0 && (E = /^(\d+)((?:px|%)*)$/.exec(o))) r.val(E[1]), z.val(E[2]);
				D.val(w[0].cellPadding || "");
				p.val(w[0].cellSpacing || "");
				B.val(w[0].align || "");
				A.val(w[0].border === void 0 ? "" : w[0].border);
				c(F.eq(0), b.toHex(w.attr("borderColor") || ""));
				c(F.eq(1), b.toHex(w[0].style.backgroundColor || w[0].bgColor || ""));
				n[0].focus();
				n[0].select()
			}
		},
		cellprop: function() {
			var m = ['<div style="padding:20px;"><div class="ke-dialog-row">', '<label for="keWidth" style="width:90px;">' + i.size + "</label>", i.width + ' <input type="text" id="keWidth" class="ke-input-text ke-input-number" name="width" value="" maxlength="4" /> &nbsp; ',
				'<select name="widthType">', '<option value="%">' + i.percent + "</option>", '<option value="px">' + i.px + "</option>", "</select> &nbsp; ", i.height + ' <input type="text" class="ke-input-text ke-input-number" name="height" value="" maxlength="4" /> &nbsp; ', '<select name="heightType">', '<option value="%">' + i.percent + "</option>", '<option value="px">' + i.px + "</option>", '</select></div><div class="ke-dialog-row">', '<label for="keAlign" style="width:90px;">' + i.align + "</label>", i.textAlign + ' <select id="keAlign" name="textAlign">',
				'<option value="">' + i.alignDefault + "</option>", '<option value="left">' + i.alignLeft + "</option>", '<option value="center">' + i.alignCenter + "</option>", '<option value="right">' + i.alignRight + "</option>", "</select> ", i.verticalAlign + ' <select name="verticalAlign">', '<option value="">' + i.alignDefault + "</option>", '<option value="top">' + i.alignTop + "</option>", '<option value="middle">' + i.alignMiddle + "</option>", '<option value="bottom">' + i.alignBottom + "</option>", '<option value="baseline">' + i.alignBaseline + "</option>",
				'</select></div><div class="ke-dialog-row">', '<label for="keBorder" style="width:90px;">' + i.border + "</label>", i.borderWidth + ' <input type="text" id="keBorder" class="ke-input-text ke-input-number" name="border" value="" maxlength="4" /> &nbsp; ', i.borderColor + ' <span class="ke-inline-block ke-input-color"></span>', '</div><div class="ke-dialog-row">', '<label for="keBgColor" style="width:90px;">' + i.backgroundColor + "</label>", '<span class="ke-inline-block ke-input-color"></span></div></div>'
			].join(""),
				m = f.createDialog({
					name: "table",
					width: 500,
					title: f.lang("tablecell"),
					body: m,
					beforeRemove: function() {
						B.unbind()
					},
					yesBtn: {
						name: f.lang("yes"),
						click: function() {
							var c = o.val(),
								g = j.val(),
								i = l.val(),
								m = n.val();
							r.val();
							v.val();
							var F = z.val(),
								aa = D.val(),
								P = p.val(),
								O = b(B[0]).html() || "",
								H = b(B[1]).html() || "";
							/^\d*$/.test(c) ? /^\d*$/.test(g) ? /^\d*$/.test(P) ? (A.css({
									width: c !== "" ? c + i : "",
									height: g !== "" ? g + m : "",
									"background-color": H,
									"text-align": F,
									"vertical-align": aa,
									"border-width": P,
									"border-style": P !== "" ? "solid" : "",
									"border-color": O
								}),
								f.hideDialog().focus(), f.addBookmark()) : (alert(f.lang("invalidBorder")), p[0].focus()) : (alert(f.lang("invalidHeight")), j[0].focus()) : (alert(f.lang("invalidWidth")), o[0].focus())
						}
					}
				}).div,
				o = b('[name="width"]', m).val(100),
				j = b('[name="height"]', m),
				l = b('[name="widthType"]', m),
				n = b('[name="heightType"]', m),
				r = b('[name="padding"]', m).val(2),
				v = b('[name="spacing"]', m).val(0),
				z = b('[name="textAlign"]', m),
				D = b('[name="verticalAlign"]', m),
				p = b('[name="border"]', m).val(1),
				B = b(".ke-input-color", m);
			g(m, B.eq(0));
			g(m, B.eq(1));
			c(B.eq(0), "#000000");
			c(B.eq(1), "");
			o[0].focus();
			o[0].select();
			var A = f.plugin.getSelectedCell(),
				F = A[0].style.height || A[0].height || "";
			(m = /^(\d+)((?:px|%)*)$/.exec(A[0].style.width || A[0].width || "")) ? (o.val(m[1]), l.val(m[2])) : o.val("");
			if (m = /^(\d+)((?:px|%)*)$/.exec(F)) j.val(m[1]), n.val(m[2]);
			z.val(A[0].style.textAlign || "");
			D.val(A[0].style.verticalAlign || "");
			(m = A[0].style.borderWidth || "") && (m = parseInt(m));
			p.val(m);
			c(B.eq(0), b.toHex(A[0].style.borderColor || ""));
			c(B.eq(1), b.toHex(A[0].style.backgroundColor ||
				""));
			o[0].focus();
			o[0].select()
		},
		insert: function() {
			this.prop(!0)
		},
		"delete": function() {
			var b = f.plugin.getSelectedTable();
			f.cmd.range.setStartBefore(b[0]).collapse(!0);
			f.cmd.select();
			b.remove();
			f.addBookmark()
		},
		colinsert: function(c) {
			var g = f.plugin.getSelectedTable()[0],
				j = f.plugin.getSelectedRow()[0],
				i = f.plugin.getSelectedCell()[0],
				c = i.cellIndex + c;
			c += g.rows[0].cells.length - j.cells.length;
			for (var j = 0, n = g.rows.length; j < n; j++) {
				var r = g.rows[j],
					c = r.insertCell(c);
				c.innerHTML = b.IE ? "" : "<br />";
				c = l(g, r, c)
			}
			f.cmd.range.selectNodeContents(i).collapse(!0);
			f.cmd.select();
			f.addBookmark()
		},
		colinsertleft: function() {
			this.colinsert(0)
		},
		colinsertright: function() {
			this.colinsert(1)
		},
		rowinsert: function(c) {
			var g = f.plugin.getSelectedTable()[0],
				j = f.plugin.getSelectedRow()[0],
				i = f.plugin.getSelectedCell()[0],
				l = j.rowIndex;
			c === 1 && (l = j.rowIndex + (i.rowSpan - 1) + c);
			for (var n = g.insertRow(l), v = 0, z = j.cells.length; v < z; v++) {
				j.cells[v].rowSpan > 1 && (z -= j.cells[v].rowSpan - 1);
				var D = n.insertCell(v);
				if (c === 1 && j.cells[v].colSpan > 1) D.colSpan = j.cells[v].colSpan;
				D.innerHTML = b.IE ? "" : "<br />"
			}
			for (j =
				l; j >= 0; j--)
				if (c = g.rows[j].cells, c.length > v) {
					for (g = i.cellIndex; g >= 0; g--) c[g].rowSpan > 1 && (c[g].rowSpan += 1);
					break
				}
			f.cmd.range.selectNodeContents(i).collapse(!0);
			f.cmd.select();
			f.addBookmark()
		},
		rowinsertabove: function() {
			this.rowinsert(0)
		},
		rowinsertbelow: function() {
			this.rowinsert(1)
		},
		rowmerge: function() {
			var b = f.plugin.getSelectedTable()[0],
				c = f.plugin.getSelectedRow()[0],
				g = f.plugin.getSelectedCell()[0],
				i = c.rowIndex + g.rowSpan,
				n = b.rows[i];
			b.rows.length <= i || (b = l(b, c, g), n.cells.length <= b || (c = n.cells[b], g.colSpan ===
				c.colSpan && (g.rowSpan += c.rowSpan, n.deleteCell(b), f.cmd.range.selectNodeContents(g).collapse(!0), f.cmd.select(), f.addBookmark())))
		},
		colmerge: function() {
			f.plugin.getSelectedTable();
			var b = f.plugin.getSelectedRow()[0],
				c = f.plugin.getSelectedCell()[0],
				g = c.cellIndex + 1;
			if (!(b.cells.length <= g)) {
				var i = b.cells[g];
				c.rowSpan === i.rowSpan && (c.colSpan += i.colSpan, b.deleteCell(g), f.cmd.range.selectNodeContents(c).collapse(!0), f.cmd.select(), f.addBookmark())
			}
		},
		rowsplit: function() {
			var c = f.plugin.getSelectedTable()[0],
				g = f.plugin.getSelectedRow()[0],
				j = f.plugin.getSelectedCell()[0],
				i = g.rowIndex;
			if (j.rowSpan !== 1) {
				for (var n = l(c, g, j), g = 1, r = j.rowSpan; g < r; g++) {
					var v = c.rows[i + g],
						n = v.insertCell(n);
					if (j.colSpan > 1) n.colSpan = j.colSpan;
					n.innerHTML = b.IE ? "" : "<br />";
					n = l(c, v, n)
				}
				b(j).removeAttr("rowSpan");
				f.cmd.range.selectNodeContents(j).collapse(!0);
				f.cmd.select();
				f.addBookmark()
			}
		},
		colsplit: function() {
			f.plugin.getSelectedTable();
			var c = f.plugin.getSelectedRow()[0],
				g = f.plugin.getSelectedCell()[0],
				j = g.cellIndex;
			if (g.colSpan !== 1) {
				for (var i =
					1, l = g.colSpan; i < l; i++) {
					var n = c.insertCell(j + i);
					if (g.rowSpan > 1) n.rowSpan = g.rowSpan;
					n.innerHTML = b.IE ? "" : "<br />"
				}
				b(g).removeAttr("colSpan");
				f.cmd.range.selectNodeContents(g).collapse(!0);
				f.cmd.select();
				f.addBookmark()
			}
		},
		coldelete: function() {
			for (var c = f.plugin.getSelectedTable()[0], g = f.plugin.getSelectedRow()[0], j = f.plugin.getSelectedCell()[0].cellIndex, i = 0, l = c.rows.length; i < l; i++) {
				var n = c.rows[i],
					v = n.cells[j];
				v.colSpan > 1 ? (v.colSpan -= 1, v.colSpan === 1 && b(v).removeAttr("colSpan")) : n.deleteCell(j);
				v.rowSpan >
					1 && (i += v.rowSpan - 1)
			}
			g.cells.length === 0 ? (f.cmd.range.setStartBefore(c).collapse(!0), f.cmd.select(), b(c).remove()) : f.cmd.selection(!0);
			f.addBookmark()
		},
		rowdelete: function() {
			for (var c = f.plugin.getSelectedTable()[0], g = f.plugin.getSelectedRow()[0], i = f.plugin.getSelectedCell()[0], g = g.rowIndex, i = i.rowSpan - 1; i >= 0; i--) c.deleteRow(g + i);
			c.rows.length === 0 ? (f.cmd.range.setStartBefore(c).collapse(!0), f.cmd.select(), b(c).remove()) : f.cmd.selection(!0);
			f.addBookmark()
		}
	};
	f.clickToolbar("table", f.plugin.table.prop)
});
KindEditor.plugin("template", function(b) {
	function c(c) {
		return l + c + "?ver=" + encodeURIComponent(b.DEBUG ? b.TIME : b.VERSION)
	}
	var g = this;
	g.lang("template.");
	var l = CONTEXT_PATH + g.templatePath;
	g.clickToolbar("template", function() {
		var f = g.lang("template."),
			i = ['<div style="padding:10px 20px;">', '<div class="ke-header">', '<div class="ke-left">', f.selectTemplate + " <select>"];
		b.each(f.fileList, function(b, c) {
			i.push('<option value="' + b + '">' + c + "</option>")
		});
		html = [i.join(""), '</select></div><div class="ke-right">',
			'<input type="checkbox" id="keReplaceFlag" name="replaceFlag" value="1" /> <label for="keReplaceFlag">' + f.replaceContent + "</label>", '</div><div class="ke-clearfix"></div></div><iframe class="ke-textarea" frameborder="0" style="width:458px;height:260px;background-color:#FFF;"></iframe></div>'
		].join("");
		var f = g.createDialog({
			name: "template",
			width: 500,
			title: g.lang("template"),
			body: html,
			yesBtn: {
				name: g.lang("yes"),
				click: function() {
					var c = b.iframeDoc(o);
					g[m[0].checked ? "html" : "insertHtml"](c.body.innerHTML).hideDialog().focus()
				}
			}
		}),
			l = b("select", f.div),
			m = b('[name="replaceFlag"]', f.div),
			o = b("iframe", f.div);
		m[0].checked = !0;
		o.attr("src", c(l.val()));
		l.change(function() {
			o.attr("src", c(this.value))
		})
	})
});
KindEditor.plugin("wordpaste", function(b) {
	var c = this;
	c.clickToolbar("wordpaste", function() {
		var g = '<div style="padding:10px 20px;"><div style="margin-bottom:10px;">' + c.lang("wordpaste.").comment + '</div><iframe class="ke-textarea" frameborder="0" style="width:408px;height:260px;"></iframe></div>',
			g = c.createDialog({
				name: "wordpaste",
				width: 450,
				title: c.lang("wordpaste"),
				body: g,
				yesBtn: {
					name: c.lang("yes"),
					click: function() {
						var f = l.body.innerHTML,
							f = b.clearMsWord(f, c.filterMode ? c.htmlTags : b.options.htmlTags);
						c.insertHtml(f).hideDialog().focus()
					}
				}
			}).div,
			g = b("iframe", g),
			l = b.iframeDoc(g);
		if (!b.IE) l.designMode = "on";
		l.open();
		l.write("<!doctype html><html><head><title>WordPaste</title></head>");
		l.write('<body style="background-color:#FFF;font-size:12px;margin:2px;">');
		b.IE || l.write("<br />");
		l.write("</body></html>");
		l.close();
		if (b.IE) l.body.contentEditable = "true";
		g[0].contentWindow.focus()
	})
});