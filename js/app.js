"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sampleData = require("./sample-data.js");

var _sampleData2 = _interopRequireDefault(_sampleData);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-env browser */
/* global React, ReactDOM */


var WHRow = function (_React$Component) {
    _inherits(WHRow, _React$Component);

    function WHRow(props) {
        _classCallCheck(this, WHRow);

        /* Bindings */
        var _this = _possibleConstructorReturn(this, (WHRow.__proto__ || Object.getPrototypeOf(WHRow)).call(this, props));

        _this.toggleEdit = _this.toggleEdit.bind(_this);
        _this.handleUpdateValue = _this.handleUpdateValue.bind(_this);
        _this.handleAddChildRow = _this.handleAddChildRow.bind(_this);
        _this.handleDeleteRow = _this.handleDeleteRow.bind(_this);
        _this.onRowUpdate = _this.onRowUpdate.bind(_this);
        _this.onRowDelete = _this.onRowDelete.bind(_this);
        /* Set States */
        _this.state = {
            value: props.value,
            word: props.word,
            level: props.level,
            maxLevel: props.maxLevel,
            children: undefined !== props.children && Array.isArray(props.children) && props.children.length > 0 ? props.children : [{}],
            edit: _this.props.edit ? _this.props.edit : false
        };
        /* Props */
        _this.dataNeedsUpdate = false;
        return _this;
    }

    _createClass(WHRow, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            if (this.dataNeedsUpdate === true) {
                this.setState({
                    word: nextProps.word,
                    children: nextProps.children
                });
                this.dataNeedsUpdate = false;
            }
        }
    }, {
        key: "toggleEdit",
        value: function toggleEdit(e) {
            e.preventDefault();
            this.setState({
                edit: !this.state.edit
            });
        }
    }, {
        key: "handleUpdateValue",
        value: function handleUpdateValue(e) {
            var index = this.state.value,
                children = this.state.children ? this.state.children.concat() : null,
                row = {
                word: e.target.value,
                children: children
            };
            e.preventDefault();
            this.dataNeedsUpdate = true;
            this.props.onRowUpdate(index, row);
        }
    }, {
        key: "handleAddChildRow",
        value: function handleAddChildRow(e) {
            var index = this.state.value,
                childRow = {
                word: "",
                children: null
            },
                children = this.state.children ? this.state.children.concat([childRow]) : [childRow],
                row = {
                word: this.state.word,
                children: children
            };
            e.preventDefault();
            this.dataNeedsUpdate = true;
            this.props.onRowUpdate(index, row);
        }
    }, {
        key: "handleDeleteRow",
        value: function handleDeleteRow(e) {
            var index = this.state.value;
            e.preventDefault();
            this.dataNeedsUpdate = true;
            this.props.onRowDelete(index);
        }
    }, {
        key: "onRowUpdate",
        value: function onRowUpdate(rowIndex, row) {
            var index = this.state.value,
                children = this.state.children.concat(),
                // ? this.state.children.concat() : null,
            newRow = void 0;
            children[rowIndex] = row;
            newRow = {
                word: this.state.word,
                children: children
            };

            this.props.onRowUpdate(index, newRow);
        }
    }, {
        key: "onRowDelete",
        value: function onRowDelete(rowIndex) {
            var index = this.state.value,
                children = this.state.children.concat(),
                newRow = void 0;
            children.splice(rowIndex, 1);
            newRow = {
                word: this.state.word,
                children: children
            };

            this.props.onRowUpdate(index, newRow);
        }
    }, {
        key: "render",
        value: function render() {
            var that = this;
            var maxLevel = that.state.maxLevel;
            var children = function children(childRows, level) {
                if (childRows) {
                    if (maxLevel > level) {
                        return childRows.map(function (row, index) {
                            var word = row.word;
                            var children = row.children;
                            return React.createElement(WHRow, { key: index, word: word, value: index, level: level, children: children, maxLevel: maxLevel, onRowUpdate: that.onRowUpdate, onRowDelete: that.onRowDelete });
                        });
                    } else {
                        if (maxLevel === level) {
                            var word = childRows.map(function (row) {
                                return row.word;
                            }).join(", ");
                            return React.createElement(WHRow, { key: 0, value: 0, word: word, level: level, maxLevel: maxLevel, onRowUpdate: that.onRowUpdate, onRowDelete: that.onRowDelete });
                        } else {
                            return null;
                        }
                    }
                } else {
                    if (maxLevel === level) {
                        return React.createElement(WHRow, { key: 0, value: 0, word: "", level: level, maxLevel: maxLevel, onRowUpdate: that.onRowUpdate, onRowDelete: that.onRowDelete });
                    } else {
                        return null;
                    }
                }
            };
            var cellType = function cellType(word) {
                if (that.state.edit) {
                    return React.createElement(
                        "div",
                        { className: "wh-cell" },
                        React.createElement(
                            "form",
                            { onSubmit: that.toggleEdit },
                            React.createElement("input", { id: "edit-input-text", type: "text", value: word, onChange: that.handleUpdateValue })
                        ),
                        React.createElement(
                            "div",
                            { className: "edit edit-mode-button" },
                            React.createElement(
                                "a",
                                { href: "#", onClick: that.toggleEdit },
                                "Update"
                            )
                        )
                    );
                } else {
                    return React.createElement(
                        "div",
                        { className: "wh-cell" },
                        React.createElement(
                            "p",
                            null,
                            word
                        ),
                        React.createElement(
                            "div",
                            { className: "edit edit-mode-button" },
                            React.createElement(
                                "a",
                                { href: "#", onClick: that.toggleEdit },
                                "Edit"
                            )
                        )
                    );
                }
            };
            return React.createElement(
                "div",
                { className: "wh-row" },
                cellType(that.state.word),
                React.createElement(
                    "div",
                    { className: "sub" },
                    children(that.state.children, that.state.level + 1),
                    that.state.level < that.state.maxLevel - 1 ? React.createElement(
                        "div",
                        { className: "add edit-mode-button" },
                        React.createElement(
                            "a",
                            { href: "#", onClick: that.handleAddChildRow },
                            "Add Row"
                        )
                    ) : ""
                ),
                that.state.level < that.state.maxLevel ? React.createElement(
                    "div",
                    { className: "delete edit-mode-button" },
                    React.createElement(
                        "a",
                        { href: "#", onClick: that.handleDeleteRow },
                        "Delete"
                    )
                ) : ""
            );
        }
    }]);

    return WHRow;
}(React.Component);

WHRow.propTypes = {
    value: _propTypes2.default.string,
    word: _propTypes2.default.string,
    children: _propTypes2.default.node,
    level: _propTypes2.default.number,
    maxLevel: _propTypes2.default.number,
    edit: _propTypes2.default.bool,
    onRowUpdate: _propTypes2.default.func,
    onRowDelete: _propTypes2.default.func
};

var WHTable = function (_React$Component2) {
    _inherits(WHTable, _React$Component2);

    function WHTable(props) {
        _classCallCheck(this, WHTable);

        /* Bindings */
        var _this2 = _possibleConstructorReturn(this, (WHTable.__proto__ || Object.getPrototypeOf(WHTable)).call(this, props));

        _this2.resetTable = _this2.resetTable.bind(_this2);
        _this2.newTable = _this2.newTable.bind(_this2);
        _this2.toggleEdit = _this2.toggleEdit.bind(_this2);
        _this2.handleAddChildRow = _this2.handleAddChildRow.bind(_this2);
        _this2.onRowUpdate = _this2.onRowUpdate.bind(_this2);
        _this2.onRowDelete = _this2.onRowDelete.bind(_this2);
        _this2.toggleEditTerm = _this2.toggleEditTerm.bind(_this2);
        _this2.handleEditTerm = _this2.handleEditTerm.bind(_this2);
        /* Set State */
        _this2.state = {
            term: undefined === props.term ? "Term" : props.term,
            data: props.data,
            maxLevel: props.maxLevel,
            editMode: false,
            editTerm: false
        };
        _this2.newRowCounter = 0; // This is used to add a unique key to new rows (with no value) so as to add multiple rows 
        return _this2;
    }

    _createClass(WHTable, [{
        key: "resetTable",
        value: function resetTable(e) {
            e.preventDefault();
            this.setState({
                term: undefined === this.props.term ? "Term" : this.props.term,
                data: this.props.data,
                editMode: false,
                editTerm: false
            });
        }
    }, {
        key: "newTable",
        value: function newTable(e) {
            e.preventDefault();
            this.setState({
                term: "",
                data: [{ word: "", children: [{}] }],
                editMode: true,
                editTerm: true
            });
        }
    }, {
        key: "toggleEdit",
        value: function toggleEdit(e) {
            e.preventDefault();
            this.setState({ editMode: !this.state.editMode });
        }
    }, {
        key: "onRowUpdate",
        value: function onRowUpdate(index, row) {
            var rows = this.state.data.concat();
            rows[index] = row;
            this.setState({
                data: rows
            });
        }
    }, {
        key: "onRowDelete",
        value: function onRowDelete(index) {
            var rows = this.state.data.concat();
            rows.splice(index, 1);
            this.setState({
                data: rows
            });
        }
    }, {
        key: "handleAddChildRow",
        value: function handleAddChildRow(e) {
            var newRow = {
                word: "",
                children: null
            },
                rows = this.state.data ? this.state.data.concat([newRow]) : [newRow];
            e.preventDefault();
            this.setState({
                data: rows
            });
        }
    }, {
        key: "toggleEditTerm",
        value: function toggleEditTerm(e) {
            e.preventDefault();
            this.setState({
                editTerm: !this.state.editTerm
            });
        }
    }, {
        key: "handleEditTerm",
        value: function handleEditTerm(e) {
            e.preventDefault();
            this.setState({
                term: e.target.value
            });
        }
    }, {
        key: "render",
        value: function render() {
            var that = this;
            var maxLevel = that.state.maxLevel;
            var tableClasses = function tableClasses() {
                return "wh-table-box" + (that.state.editMode ? " edit-mode" : "");
            };
            var isEditTermActive = function isEditTermActive() {
                return that.state.editTerm ? "edit-term table-button active" : "edit-term table-button";
            };
            var tableRows = that.state.data.map(function (row, index) {
                var word = row.word;
                var children = row.children;
                return React.createElement(WHRow, { key: index, value: index, word: word, level: 1, children: children, maxLevel: maxLevel, onRowUpdate: that.onRowUpdate, onRowDelete: that.onRowDelete });
            });
            return React.createElement(
                "div",
                { className: tableClasses() },
                React.createElement(
                    "div",
                    { className: "table-button-box" },
                    React.createElement(
                        "div",
                        { className: "reset table-button" },
                        React.createElement(
                            "a",
                            { href: "#", onClick: that.resetTable },
                            "Revert to Sample"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "new table-button" },
                        React.createElement(
                            "a",
                            { href: "#", onClick: that.newTable },
                            "Create New Table"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: isEditTermActive() },
                        React.createElement(
                            "form",
                            { onSubmit: that.toggleEditTerm },
                            React.createElement("input", { id: "edit-input-text", type: "text", placeholder: "Enter Term", value: that.state.term, onChange: that.handleEditTerm })
                        ),
                        React.createElement(
                            "a",
                            { href: "#", onClick: that.toggleEditTerm },
                            "Edit Term"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "print table-button" },
                        React.createElement(
                            "a",
                            { href: "#", onClick: print },
                            "Print Table"
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "wh-table" },
                    React.createElement(
                        "div",
                        { className: "wh-row wh-header-row" },
                        React.createElement(
                            "div",
                            { className: "wh-primary" },
                            React.createElement(
                                "div",
                                { className: "wh-cell" },
                                React.createElement(
                                    "h3",
                                    null,
                                    "Primary ",
                                    that.state.term
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "wh-secondary" },
                                React.createElement(
                                    "div",
                                    null,
                                    React.createElement(
                                        "div",
                                        { className: "wh-cell" },
                                        React.createElement(
                                            "h3",
                                            null,
                                            "Secondary ",
                                            that.state.term
                                        )
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "wh-tertiary" },
                                        React.createElement(
                                            "div",
                                            null,
                                            React.createElement(
                                                "div",
                                                { className: "wh-cell" },
                                                React.createElement(
                                                    "h3",
                                                    null,
                                                    "Tertiary ",
                                                    that.state.term
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    tableRows,
                    React.createElement(
                        "div",
                        { className: "add edit-mode-button" },
                        React.createElement(
                            "a",
                            { href: "#", onClick: that.handleAddChildRow },
                            "Add Row"
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "toggle-edit" },
                    React.createElement(
                        "a",
                        { href: "#", onClick: that.toggleEdit },
                        "Edit Mode"
                    )
                )
            );
        }
    }]);

    return WHTable;
}(React.Component);

WHTable.propTypes = {
    term: _propTypes2.default.string,
    data: _propTypes2.default.node,
    maxLevel: _propTypes2.default.number
};

var buildTable = function buildTable(data, targetId, termType, maxLevel) {

    ReactDOM.render(React.createElement(WHTable, { data: data, term: termType, maxLevel: maxLevel }), document.getElementById(targetId));
};

buildTable(_sampleData2.default, "wh-sample", "Emotion", 3);
