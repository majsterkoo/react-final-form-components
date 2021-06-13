"use strict";

exports.__esModule = true;
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _has2 = _interopRequireDefault(require("lodash/has"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _reactstrap = require("reactstrap");

var _ControlLabel = _interopRequireDefault(require("react-bootstrap/lib/ControlLabel"));

var _HelpBlock = _interopRequireDefault(require("react-bootstrap/lib/HelpBlock"));

var _MenuItem = _interopRequireDefault(require("react-bootstrap/lib/MenuItem"));

var _DropdownButton = _interopRequireDefault(require("react-bootstrap/lib/DropdownButton"));

var _reactFinalForm = require("react-final-form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var Wrap =
/*#__PURE__*/
function (_React$Component) {
  function Wrap(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.input = {};
    _this.custom = {};
    _this.dropdownButton = _this.dropdownButton.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.dropDown = _this.dropDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.renderField = _this.renderField.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.options = _this.options.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Wrap.prototype;

  _proto.options = function options(props) {
    if (props.type === 'select') {
      return this.props.children;
    }
  };

  _proto.dropDown = function dropDown(props) {
    var _this2 = this;

    var menuItem = [];
    var dropDownTitle = (0, _get2.default)(props.field, 'title', null);
    (0, _map2.default)(props.field.children, function (item, key) {
      var select = function select() {
        _this2.input.onBlur();

        _this2.input.onChange(item.props.value);
      };

      if (item.props.selected && !props.input.value) {
        dropDownTitle = item.props.children;
        menuItem.push(_react.default.createElement(_reactstrap.DropdownItem, {
          key: key,
          onClick: select
        }, item.props.children));
      } else {
        if (String(_this2.input.value) === String(item.props.value)) {
          dropDownTitle = item.props.children;
        }

        menuItem.push(_react.default.createElement(_reactstrap.DropdownItem, {
          key: key,
          onClick: select
        }, item.props.children));
      }

      if (item.props.selected) {
        menuItem.push(_react.default.createElement(_reactstrap.DropdownItem, {
          key: key + '_div',
          divider: true
        }));
      }
    });
    return {
      dropDownTitle: dropDownTitle,
      menuItem: menuItem
    };
  };

  _proto.dropdownButton = function dropdownButton(props, isStatic, inputItem) {
    var _this$dropDown = this.dropDown(props),
        dropDownTitle = _this$dropDown.dropDownTitle,
        menuItem = _this$dropDown.menuItem;

    var size = (0, _get2.default)(props.field, 'bsSize', this.props.size);

    var thisSize = function thisSize() {
      if (size !== 'medium') {
        return {
          size: size
        };
      }
    };

    var disabled = false;

    if (props.field && props.field.disabled && (0, _isFunction2.default)(props.field.disabled)) {
      disabled = this.context.checkCondition(props.field.disabled());
    }

    if (isStatic === true || disabled === true) {
      return _react.default.createElement(_reactstrap.Input, null, dropDownTitle || (0, _get2.default)(props.field, 'placeholder'));
    } //input group dropdown button is not the same as dropdown


    var Dropdown = _reactstrap.UncontrolledDropdown; //Dropdown = inputItem ? InputGroupButtonDropdown : UncontrolledDropdown;

    return _react.default.createElement(Dropdown, _extends({
      key: this.input.name
    }, thisSize(), {
      id: 'input-dropdown-addon' + this.input.name
    }), _react.default.createElement(_reactstrap.DropdownToggle, null, dropDownTitle || (0, _get2.default)(props.field, 'placeholder')), _react.default.createElement(_reactstrap.DropdownMenu, null, menuItem))
    /*<DropdownButton key={this.input.name}
      onClick={(event) => {
        event.preventDefault();
      }}
      {...thisSize()}
      title={dropDownTitle || _get(props.field, 'placeholder')}
      id={'input-dropdown-addon' + this.input.name}>
      {menuItem}
    </DropdownButton>*/
    ;
  };

  _proto.renderField = function renderField(props) {
    var _this3 = this;

    var input = props.input,
        help = props.help,
        _props$meta = props.meta,
        touched = _props$meta.touched,
        error = _props$meta.error,
        submitError = _props$meta.submitError,
        submitFailed = _props$meta.submitFailed,
        valid = _props$meta.valid,
        custom = _objectWithoutProperties(props, ["input", "help", "meta"]);

    this.input = input;
    var size = (0, _get2.default)(props.field, 'bsSize', this.props.size);

    if (props.field && props.field.hidden && (0, _isFunction2.default)(props.field.hidden)) {
      if (this.context.checkCondition(props.field.hidden, (0, _get2.default)(props, 'parent')) === true) {
        return null;
      }
    } else if (props.field && props.field.show && (0, _isFunction2.default)(props.field.show)) {
      if (this.context.checkCondition(props.field.show, (0, _get2.default)(props, 'parent')) !== true) {
        return null;
      }
    }

    var thisSize = function thisSize() {
      if (size !== 'medium') {
        return {
          size: size
        };
      }
    };

    var labelSize = function labelSize() {
      if ((0, _has2.default)(props.field, 'labelSize')) {
        return props.field.labelSize;
      }
    };

    var fieldSize = function fieldSize() {
      if ((0, _has2.default)(props.field, 'fieldSize')) {
        return props.field.fieldSize;
      }
    };

    var add = (0, _pick2.default)(custom, ['type', 'placeholder', 'rows', 'cols', 'color']);

    if (add.type === 'select') {
      add.componentClass = 'select';
    }

    if (custom.field.disabled && (0, _isFunction2.default)(custom.field.disabled)) {
      add.disabled = this.context.checkCondition(custom.field.disabled, (0, _get2.default)(props, 'parent'));
    }

    if (props.field.placeholder) {
      add.placeholder = props.field.placeholder;
    }

    if (props.field.cols) {
      add.cols = props.field.cols;
    }

    if (props.field.rows) {
      add.rows = props.field.rows;
    }

    if (props.field.color) {
      add.color = props.field.color;
    }

    var component = function component() {
      // Render custom component
      if (_this3.props.component) {
        var Comp = _this3.props.component;
        return _react.default.createElement(Comp, props);
      }

      if (_this3.context.isStatic === true || (0, _get2.default)(props.field, 'static', false) === true) {
        var value = function value() {
          if (props.field.type === 'select') {
            return (0, _map2.default)((0, _filter2.default)(props.field.options, {
              value: _this3.input.value
            }), function (item, key) {
              return _react.default.createElement("span", {
                key: key
              }, item.desc);
            });
          }

          return _this3.input.value;
        };

        switch (props.type) {
          case 'dropdown':
            return _this3.dropdownButton(props, true);

          default:
            {
              return _react.default.createElement(_reactstrap.Input, null, value());
            }
        }
      }

      switch (props.field.type) {
        case 'dropdown':
          return _this3.dropdownButton(props, false);

        case 'input-dropdown':
          return _this3.dropdownButton(props, false, true);

        case 'textarea':
          return _react.default.createElement(_reactstrap.Input, _extends({
            type: "textarea"
          }, input, add));

        case 'select':
          return _react.default.createElement(_reactstrap.Input, _extends({
            type: "select"
          }, input, add), _this3.options(props));

        default:
          return _react.default.createElement(_reactstrap.Input, _extends({}, input, add));
      }
    };

    var validationState = function validationState() {
      if (touched && error || submitFailed && submitError) {
        return 'error';
      }

      if (touched && valid) {
        return 'success';
      }
    };

    var buttonBefore = function buttonBefore() {
      if ((0, _has2.default)(props.field, 'buttonBefore')) {
        return _react.default.createElement(_reactstrap.InputGroupAddon, {
          addonType: "prepend"
        }, _react.default.createElement(_reactstrap.Button, null, props.field.buttonBefore()));
      }
    };

    var buttonAfter = function buttonAfter() {
      if ((0, _has2.default)(props.field, 'buttonAfter')) {
        return _react.default.createElement(_reactstrap.InputGroupAddon, {
          addonType: "append"
        }, _react.default.createElement(_reactstrap.Button, null, props.field.buttonAfter()));
      }
    };

    var addonBefore = function addonBefore() {
      if ((0, _has2.default)(props.field, 'addonBefore')) {
        return _react.default.createElement(_reactstrap.InputGroupAddon, {
          addonType: "prepend"
        }, (0, _get2.default)(props.field, 'addonBefore'));
      }
    };

    var addonAfter = function addonAfter() {
      if ((0, _has2.default)(props.field, 'addonAfter')) {
        return _react.default.createElement(_reactstrap.InputGroupAddon, {
          addonType: "append"
        }, (0, _get2.default)(props.field, 'addonAfter'));
      }
    };

    var getField = function getField() {
      if ((0, _has2.default)(props.field, 'addonBefore') || (0, _has2.default)(props.field, 'addonAfter') || (0, _has2.default)(props.field, 'buttonBefore') || (0, _has2.default)(props.field, 'buttonAfter')) {
        return _react.default.createElement(_reactstrap.InputGroup, null, buttonBefore(), addonBefore(), component(), addonAfter(), buttonAfter());
      }

      return component();
    };

    if (props.type === 'dropdown' && !(0, _has2.default)(props.field, 'label')) {
      return getField();
    }

    var getLabel = function getLabel() {
      if (props.field.label) {
        return _react.default.createElement(_reactstrap.Col, _extends({
          componentClass: _ControlLabel.default
        }, labelSize()), props.field.label);
      }
    };

    var rendered = _react.default.createElement(_reactstrap.FormGroup, _extends({}, thisSize(), {
      validationState: validationState()
    }), getLabel(), _react.default.createElement(_reactstrap.Col, fieldSize(), getField(), (touched && error || submitFailed && submitError) && _react.default.createElement(_reactstrap.FormFeedback, null), props.field.help && (!touched || !submitError && !error) && _react.default.createElement(_reactstrap.FormText, null, props.field.help), (touched && error || submitFailed && submitError) && _react.default.createElement(_reactstrap.FormFeedback, null, submitError || error)));

    if (this.context.debug) {
      return _react.default.createElement("div", {
        style: {
          position: 'relative'
        }
      }, rendered);
    }

    return rendered;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        name = _this$props.name,
        rest = _objectWithoutProperties(_this$props, ["name"]);

    return _react.default.createElement(_reactFinalForm.Field, {
      component: this.renderField,
      type: this.props.type,
      name: name,
      field: rest
    });
  };

  _inheritsLoose(Wrap, _React$Component);

  return Wrap;
}(_react.default.Component);

Wrap.propTypes = {
  'field': _propTypes.default.object,
  'size': _propTypes.default.string,
  'addField': _propTypes.default.func,
  'static': _propTypes.default.bool,
  'name': _propTypes.default.string.isRequired,
  type: _propTypes.default.string.isRequired,
  component: _propTypes.default.func,
  children: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array, _propTypes.default.bool])
};
Wrap.contextTypes = {
  debug: _propTypes.default.bool.isRequired,
  checkCondition: _propTypes.default.func.isRequired,
  isStatic: _propTypes.default.bool.isRequired
};
Wrap.defaultProps = {};
var _default = Wrap;
exports.default = _default;