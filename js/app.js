"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (e) {
  var t = {};function n(l) {
    if (t[l]) return t[l].exports;var r = t[l] = { i: l, l: !1, exports: {} };return e[l].call(r.exports, r, r.exports, n), r.l = !0, r.exports;
  }n.m = e, n.c = t, n.d = function (e, t, l) {
    n.o(e, t) || Object.defineProperty(e, t, { configurable: !1, enumerable: !0, get: l });
  }, n.r = function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 });
  }, n.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };return n.d(t, "a", t), t;
  }, n.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, n.p = "", n(n.s = 7);
}([function (e, t, n) {
  "use strict";
  e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
}, function (e, t, n) {
  "use strict";
  var l = function l(e) {};e.exports = function (e, t, n, r, a, d, o, i) {
    if (l(t), !e) {
      var c;if (void 0 === t) c = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else {
        var u = [n, r, a, d, o, i],
            s = 0;(c = new Error(t.replace(/%s/g, function () {
          return u[s++];
        }))).name = "Invariant Violation";
      }throw c.framesToPop = 1, c;
    }
  };
}, function (e, t, n) {
  "use strict";
  function l(e) {
    return function () {
      return e;
    };
  }var r = function r() {};r.thatReturns = l, r.thatReturnsFalse = l(!1), r.thatReturnsTrue = l(!0), r.thatReturnsNull = l(null), r.thatReturnsThis = function () {
    return this;
  }, r.thatReturnsArgument = function (e) {
    return e;
  }, e.exports = r;
}, function (e, t, n) {
  "use strict";
  var l = n(2),
      r = n(1),
      a = n(0);e.exports = function () {
    function e(e, t, n, l, d, o) {
      o !== a && r(!1, "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
    }function t() {
      return e;
    }e.isRequired = e;var n = { array: e, bool: e, func: e, number: e, object: e, string: e, symbol: e, any: e, arrayOf: t, element: e, instanceOf: t, node: e, objectOf: t, oneOf: t, oneOfType: t, shape: t, exact: t };return n.checkPropTypes = l, n.PropTypes = n, n;
  };
}, function (e, t, n) {
  "use strict";
  "function" == typeof Symbol && Symbol.iterator;e.exports = n(3)();
}, function (e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 });t.sampleHierarchy = [{ word: "Love", children: [{ word: "Affection", children: [{ word: "Adoration", children: null }, { word: "Affection", children: null }, { word: "Attraction", children: null }, { word: "Caring", children: null }, { word: "Compassion", children: null }, { word: "Fondness", children: null }, { word: "Liking", children: null }, { word: "Love", children: null }, { word: "Sentimentality", children: null }, { word: "Tenderness", children: null }] }, { word: "Lust", children: [{ word: "Arousal", children: null }, { word: "Desire", children: null }, { word: "Infatuation", children: null }, { word: "Lust", children: null }, { word: "Passion", children: null }] }, { word: "Longing", children: [{ word: "Longing", children: null }] }, { word: "Optimism", children: [{ word: "Eagerness", children: null }, { word: "Hope", children: null }, { word: "Optimism", children: null }] }, { word: "Enthrallment", children: [{ word: "Enthrallment", children: null }, { word: "Rapture", children: null }] }, { word: "Relief", children: [{ word: "Relief", children: null }] }] }, { word: "Surprise", children: [{ word: "Surprise", children: [{ word: "Amazement", children: null }, { word: "Astonishment", children: null }, { word: "Surprise", children: null }] }] }, { word: "Joy", children: [{ word: "Cheerfulness", children: [{ word: "Amusement", children: null }, { word: "Bliss", children: null }, { word: "Cheerfulness", children: null }, { word: "Delight", children: null }, { word: "Elation", children: null }, { word: "Ecstasy", children: null }, { word: "Enjoyment", children: null }, { word: "Euphoria", children: null }, { word: "Gaiety", children: null }, { word: "Gladness", children: null }, { word: "Glee", children: null }, { word: "Happiness", children: null }, { word: "Joliness", children: null }, { word: "Joviality", children: null }, { word: "Joy", children: null }, { word: "Jubilation", children: null }, { word: "Satisfaction", children: null }] }, { word: "Zest", children: [{ word: "Enthousiasm", children: null }, { word: "Excitment", children: null }, { word: "Exhiliration", children: null }, { word: "Thrill", children: null }, { word: "Zeal", children: null }, { word: "Zest", children: null }] }, { word: "Contentment", children: [{ word: "Contentment", children: null }, { word: "Pleasure", children: null }] }, { word: "Pride", children: [{ word: "Pride", children: null }, { word: "Triumph", children: null }] }] }, { word: "Anger", children: [{ word: "Irritation", children: [{ word: "Aggravation", children: null }, { word: "Agitation", children: null }, { word: "Annoyance", children: null }, { word: "Grouchiness", children: null }, { word: "Grumpiness", children: null }, { word: "Irritation", children: null }] }, { word: "Exasperation", children: [{ word: "Exasperation", children: null }, { word: "Frustration", children: null }] }, { word: "Rage", children: [{ word: "Anger", children: null }, { word: "Bitterness", children: null }, { word: "Dislike", children: null }, { word: "Ferocity", children: null }, { word: "Fury", children: null }, { word: "Hostility", children: null }, { word: "Hate", children: null }, { word: "Loathing", children: null }, { word: "Outrage", children: null }, { word: "Rage", children: null }, { word: "Resentment", children: null }, { word: "Scorn", children: null }, { word: "Spite", children: null }, { word: "Vengefulness", children: null }, { word: "Wrath", children: null }] }, { word: "Disgust", children: [{ word: "Contempt", children: null }, { word: "Disgust", children: null }, { word: "Revulsion", children: null }] }, { word: "Envy", children: [{ word: "Envy", children: null }, { word: "Jealousy", children: null }] }, { word: "Torment", children: [{ word: "Torment", children: null }] }] }];
}, function (e, t, n) {
  "use strict";
  var l,
      r = function () {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var l = t[n];l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(e, l.key, l);
      }
    }return function (t, n, l) {
      return n && e(t.prototype, n), l && e(t, l), t;
    };
  }(),
      a = n(5),
      d = n(4),
      o = (l = d) && l.__esModule ? l : { default: l };function i(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
  }function c(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && "function" != typeof t ? e : t;
  }function u(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : _typeof(t)));e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
  }var s = function (e) {
    function t(e) {
      i(this, t);var n = c(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));return n.toggleEdit = n.toggleEdit.bind(n), n.handleUpdateValue = n.handleUpdateValue.bind(n), n.handleAddChildRow = n.handleAddChildRow.bind(n), n.handleDeleteRow = n.handleDeleteRow.bind(n), n.onRowUpdate = n.onRowUpdate.bind(n), n.onRowDelete = n.onRowDelete.bind(n), n.state = { value: e.value, word: e.word, level: e.level, maxLevel: e.maxLevel, children: void 0 !== e.children && Array.isArray(e.children) && e.children.length > 0 ? e.children : [{}], edit: !!n.props.edit && n.props.edit }, n.dataNeedsUpdate = !1, n;
    }return u(t, React.Component), r(t, [{ key: "componentWillReceiveProps", value: function value(e) {
        !0 === this.dataNeedsUpdate && (this.setState({ word: e.word, children: e.children }), this.dataNeedsUpdate = !1);
      } }, { key: "toggleEdit", value: function value(e) {
        e.preventDefault(), this.setState({ edit: !this.state.edit });
      } }, { key: "handleUpdateValue", value: function value(e) {
        var t = this.state.value,
            n = this.state.children ? this.state.children.concat() : null,
            l = { word: e.target.value, children: n };e.preventDefault(), this.dataNeedsUpdate = !0, this.props.onRowUpdate(t, l);
      } }, { key: "handleAddChildRow", value: function value(e) {
        var t = this.state.value,
            n = { word: "", children: null },
            l = this.state.children ? this.state.children.concat([n]) : [n],
            r = { word: this.state.word, children: l };e.preventDefault(), this.dataNeedsUpdate = !0, this.props.onRowUpdate(t, r);
      } }, { key: "handleDeleteRow", value: function value(e) {
        var t = this.state.value;e.preventDefault(), this.dataNeedsUpdate = !0, this.props.onRowDelete(t);
      } }, { key: "onRowUpdate", value: function value(e, t) {
        var n,
            l = this.state.value,
            r = this.state.children.concat();r[e] = t, n = { word: this.state.word, children: r }, this.props.onRowUpdate(l, n);
      } }, { key: "onRowDelete", value: function value(e) {
        var t,
            n = this.state.value,
            l = this.state.children.concat();l.splice(e, 1), t = { word: this.state.word, children: l }, this.props.onRowUpdate(n, t);
      } }, { key: "render", value: function value() {
        var e,
            n = this,
            l = n.state.maxLevel;return React.createElement("div", { className: "wh-row" }, (e = n.state.word, n.state.edit ? React.createElement("div", { className: "wh-cell" }, React.createElement("form", { onSubmit: n.toggleEdit }, React.createElement("input", { id: "edit-input-text", type: "text", value: e, onChange: n.handleUpdateValue })), React.createElement("div", { className: "edit edit-mode-button" }, React.createElement("a", { href: "#", onClick: n.toggleEdit }, "Update"))) : React.createElement("div", { className: "wh-cell" }, React.createElement("p", null, e), React.createElement("div", { className: "edit edit-mode-button" }, React.createElement("a", { href: "#", onClick: n.toggleEdit }, "Edit")))), React.createElement("div", { className: "sub" }, function (e, r) {
          if (e) {
            if (l > r) return e.map(function (e, a) {
              var d = e.word,
                  o = e.children;return React.createElement(t, { key: a, word: d, value: a, level: r, children: o, maxLevel: l, onRowUpdate: n.onRowUpdate, onRowDelete: n.onRowDelete });
            });if (l === r) {
              var a = e.map(function (e) {
                return e.word;
              }).join(", ");return React.createElement(t, { key: 0, value: 0, word: a, level: r, maxLevel: l, onRowUpdate: n.onRowUpdate, onRowDelete: n.onRowDelete });
            }return null;
          }return l === r ? React.createElement(t, { key: 0, value: 0, word: "", level: r, maxLevel: l, onRowUpdate: n.onRowUpdate, onRowDelete: n.onRowDelete }) : null;
        }(n.state.children, n.state.level + 1), n.state.level < n.state.maxLevel - 1 ? React.createElement("div", { className: "add edit-mode-button" }, React.createElement("a", { href: "#", onClick: n.handleAddChildRow }, "Add Row")) : ""), n.state.level < n.state.maxLevel ? React.createElement("div", { className: "delete edit-mode-button" }, React.createElement("a", { href: "#", onClick: n.handleDeleteRow }, "Delete")) : "");
      } }]), t;
  }();s.propTypes = { value: o.default.string, word: o.default.string, children: o.default.node, level: o.default.number, maxLevel: o.default.number, edit: o.default.bool, onRowUpdate: o.default.func, onRowDelete: o.default.func };var h = function (e) {
    function t(e) {
      i(this, t);var n = c(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));return n.resetTable = n.resetTable.bind(n), n.newTable = n.newTable.bind(n), n.toggleEdit = n.toggleEdit.bind(n), n.handleAddChildRow = n.handleAddChildRow.bind(n), n.onRowUpdate = n.onRowUpdate.bind(n), n.onRowDelete = n.onRowDelete.bind(n), n.toggleEditTerm = n.toggleEditTerm.bind(n), n.handleEditTerm = n.handleEditTerm.bind(n), n.state = { term: void 0 === e.term ? "Term" : e.term, data: e.data, maxLevel: e.maxLevel, editMode: !1, editTerm: !1 }, n.newRowCounter = 0, n;
    }return u(t, React.Component), r(t, [{ key: "resetTable", value: function value(e) {
        e.preventDefault(), this.setState({ term: void 0 === this.props.term ? "Term" : this.props.term, data: this.props.data, editMode: !1, editTerm: !1 });
      } }, { key: "newTable", value: function value(e) {
        e.preventDefault(), this.setState({ term: "", data: [{ word: "", children: [{}] }], editMode: !0, editTerm: !0 });
      } }, { key: "toggleEdit", value: function value(e) {
        e.preventDefault(), this.setState({ editMode: !this.state.editMode });
      } }, { key: "onRowUpdate", value: function value(e, t) {
        var n = this.state.data.concat();n[e] = t, this.setState({ data: n });
      } }, { key: "onRowDelete", value: function value(e) {
        var t = this.state.data.concat();t.splice(e, 1), this.setState({ data: t });
      } }, { key: "handleAddChildRow", value: function value(e) {
        var t = { word: "", children: null },
            n = this.state.data ? this.state.data.concat([t]) : [t];e.preventDefault(), this.setState({ data: n });
      } }, { key: "toggleEditTerm", value: function value(e) {
        e.preventDefault(), this.setState({ editTerm: !this.state.editTerm });
      } }, { key: "handleEditTerm", value: function value(e) {
        e.preventDefault(), this.setState({ term: e.target.value });
      } }, { key: "render", value: function value() {
        var e = this,
            t = e.state.maxLevel,
            n = e.state.data ? e.state.data.map(function (n, l) {
          var r = n.word,
              a = n.children;return React.createElement(s, { key: l, value: l, word: r, level: 1, children: a, maxLevel: t, onRowUpdate: e.onRowUpdate, onRowDelete: e.onRowDelete });
        }) : [];return React.createElement("div", { className: "wh-table-box" + (e.state.editMode ? " edit-mode" : "") }, React.createElement("div", { className: "table-button-box" }, React.createElement("div", { className: "reset table-button" }, React.createElement("a", { href: "#", onClick: e.resetTable }, "Revert to Sample")), React.createElement("div", { className: "new table-button" }, React.createElement("a", { href: "#", onClick: e.newTable }, "Create New Table")), React.createElement("div", { className: e.state.editTerm ? "edit-term table-button active" : "edit-term table-button" }, React.createElement("form", { onSubmit: e.toggleEditTerm }, React.createElement("input", { id: "edit-input-text", type: "text", placeholder: "Enter Term", value: e.state.term, onChange: e.handleEditTerm })), React.createElement("a", { href: "#", onClick: e.toggleEditTerm }, "Edit Term")), React.createElement("div", { className: "print table-button" }, React.createElement("a", { href: "#", onClick: print }, "Print Table"))), React.createElement("div", { className: "wh-table" }, React.createElement("div", { className: "wh-row wh-header-row" }, React.createElement("div", { className: "wh-primary" }, React.createElement("div", { className: "wh-cell" }, React.createElement("h3", null, "Primary ", e.state.term)), React.createElement("div", { className: "wh-secondary" }, React.createElement("div", null, React.createElement("div", { className: "wh-cell" }, React.createElement("h3", null, "Secondary ", e.state.term)), React.createElement("div", { className: "wh-tertiary" }, React.createElement("div", null, React.createElement("div", { className: "wh-cell" }, React.createElement("h3", null, "Tertiary ", e.state.term)))))))), n, React.createElement("div", { className: "add edit-mode-button" }, React.createElement("a", { href: "#", onClick: e.handleAddChildRow }, "Add Row"))), React.createElement("div", { className: "toggle-edit" }, React.createElement("a", { href: "#", onClick: e.toggleEdit }, "Edit Mode")));
      } }]), t;
  }();h.propTypes = { term: o.default.string, data: o.default.node, maxLevel: o.default.number };var w, m, p, f;console.log(a.sampleHierarchy), w = a.sampleHierarchy, m = "wh-sample", p = "Emotion", f = 3, ReactDOM.render(React.createElement(h, { data: w, term: p, maxLevel: f }), document.getElementById(m));
}, function (e, t, n) {
  e.exports = n(6);
}]);
