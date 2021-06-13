import PropTypes from 'prop-types';
import React from 'react';
import _has from 'lodash/has';
import _map from 'lodash/map';
import _get from 'lodash/get';
import _pick from 'lodash/pick';
import _filter from 'lodash/filter';
import _isFunction from 'lodash/isFunction';
import {
  Col,
  Button,
  Input,
  InputGroup,
  FormGroup,
  FormFeedback,
  FormText,
  InputGroupAddon,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroupButtonDropdown
} from 'reactstrap';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import { Field } from 'react-final-form';

class Wrap extends React.Component {

  constructor(props) {
    super(props);
    this.input = {};
    this.custom = {};
    this.dropdownButton = this.dropdownButton.bind(this);
    this.dropDown = this.dropDown.bind(this);
    this.renderField = this.renderField.bind(this);
    this.options = this.options.bind(this);
  }

  options(props) {
    if (props.type === 'select') {
      return this.props.children;
    }
  }

  dropDown(props) {
    const menuItem = [];
    let dropDownTitle = _get(props.field, 'title', null);
    _map(props.field.children, (item, key) => {
      const select = () => {
        this.input.onBlur();
        this.input.onChange(item.props.value);
      };
      if (item.props.selected && !props.input.value) {
        dropDownTitle = item.props.children;
        menuItem.push(<DropdownItem key={key} onClick={select}>{item.props.children}</DropdownItem>);
      } else {
        if (String(this.input.value) === String(item.props.value)) {
          dropDownTitle = item.props.children;
        }
        menuItem.push(<DropdownItem key={key} onClick={select}>{item.props.children}</DropdownItem>);
      }
      if (item.props.selected) {
        menuItem.push(<DropdownItem key={key + '_div'} divider />);
      }

    });
    return { dropDownTitle, menuItem };
  }


  dropdownButton(props, isStatic, inputItem) {
    const { dropDownTitle, menuItem } = this.dropDown(props);
    const size = _get(props.field, 'bsSize', this.props.size);
    const thisSize = () => {
      if (size !== 'medium') {
        return ({ size: size });
      }
    };

    let disabled = false;
    if (props.field && props.field.disabled && _isFunction(props.field.disabled)) {
      disabled = this.context.checkCondition(props.field.disabled());
    }

    if (isStatic === true || disabled === true) {
      return (
        <Input>
          {dropDownTitle || _get(props.field, 'placeholder')}
        </Input>
      );
    }

    //input group dropdown button is not the same as dropdown
    let Dropdown = UncontrolledDropdown;
    //Dropdown = inputItem ? InputGroupButtonDropdown : UncontrolledDropdown;

    return (
      <Dropdown key={this.input.name} {...thisSize()} id={'input-dropdown-addon' + this.input.name}>
        <DropdownToggle>{dropDownTitle || _get(props.field, 'placeholder')}</DropdownToggle>
        <DropdownMenu>
          {menuItem}
        </DropdownMenu>
      </Dropdown>
      /*<DropdownButton key={this.input.name}
        onClick={(event) => {
          event.preventDefault();
        }}
        {...thisSize()}
        title={dropDownTitle || _get(props.field, 'placeholder')}
        id={'input-dropdown-addon' + this.input.name}>
        {menuItem}
      </DropdownButton>*/
    );
  }

  renderField(props) {
    const { input, help, meta: { touched, error, submitError, submitFailed, valid }, ...custom } = props;
    this.input = input;
    const size = _get(props.field, 'bsSize', this.props.size);
    if (props.field && props.field.hidden && _isFunction(props.field.hidden)) {
      if (this.context.checkCondition(props.field.hidden, _get(props, 'parent')) === true) {
        return null;
      }
    } else if (props.field && props.field.show && _isFunction(props.field.show)) {
      if (this.context.checkCondition(props.field.show, _get(props, 'parent')) !== true) {
        return null;
      }
    }

    const thisSize = () => {
      if (size !== 'medium') {
        return ({ size: size });
      }
    };

    const labelSize = () => {
      if (_has(props.field, 'labelSize')) {
        return props.field.labelSize;
      }
    };

    const fieldSize = () => {
      if (_has(props.field, 'fieldSize')) {
        return props.field.fieldSize;
      }
    };

    const add = _pick(custom, ['type', 'placeholder', 'rows', 'cols', 'color']);
    if (add.type === 'select') {
      add.componentClass = 'select';
    }
    if (custom.field.disabled && _isFunction(custom.field.disabled)) {
      add.disabled = this.context.checkCondition(custom.field.disabled, _get(props, 'parent'));
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

    const component = () => {
      // Render custom component
      if (this.props.component) {
        const Comp = this.props.component;
        return (<Comp {...props} />);
      }

      if (this.context.isStatic === true || _get(props.field, 'static', false) === true) {
        const value = () => {
          if (props.field.type === 'select') {
            return _map(_filter(props.field.options, { value: this.input.value }), (item, key) => {
              return (<span key={key}>{item.desc}</span>);
            });
          }
          return this.input.value;
        };

        switch (props.type) {
          case 'dropdown':
            return this.dropdownButton(props, true);
          default: {
            return (
              <Input>
                {value()}
              </Input>);
          }
        }
      }

      switch (props.field.type) {
        case 'dropdown':
          return this.dropdownButton(props, false);
        case 'input-dropdown':
          return this.dropdownButton(props, false, true);
        case 'textarea':
          return <Input
            type="textarea"
            {...input}
            {...add}
          />;
        case 'select':
          return <Input
            type="select"
            {...input}
            {...add}
          >{this.options(props)}</Input>;
        default:
          return (<Input
            {...input}
            {...add}
          />);
      }
    };

    const validationState = () => {
      if ((touched && error) || (submitFailed && submitError)) {
        return 'error';
      }

      if (touched && valid) {
        return 'success';
      }
    };

    const buttonBefore = () => {
      if (_has(props.field, 'buttonBefore')) {
        return (<InputGroupAddon addonType={"prepend"}><Button>{props.field.buttonBefore()}</Button></InputGroupAddon>);
      }
    };

    const buttonAfter = () => {
      if (_has(props.field, 'buttonAfter')) {
        return (<InputGroupAddon addonType={"append"}><Button>{props.field.buttonAfter()}</Button></InputGroupAddon>);
      }
    };

    const addonBefore = () => {
      if (_has(props.field, 'addonBefore')) {
        return (<InputGroupAddon addonType={"prepend"}>{_get(props.field, 'addonBefore')}</InputGroupAddon>);
      }
    };

    const addonAfter = () => {
      if (_has(props.field, 'addonAfter')) {
        return (<InputGroupAddon addonType={"append"}>{_get(props.field, 'addonAfter')}</InputGroupAddon>);
      }
    };

    const getField = () => {
      if (_has(props.field, 'addonBefore')
        || _has(props.field, 'addonAfter')
        || _has(props.field, 'buttonBefore')
        || _has(props.field, 'buttonAfter')
      ) {
        return (
          <InputGroup>
            {buttonBefore()}
            {addonBefore()}
            {component()}
            {addonAfter()}
            {buttonAfter()}
          </InputGroup>
        );
      }

      return component();
    };

    if (props.type === 'dropdown' && !_has(props.field, 'label')) {
      return getField();
    }

    const getLabel = () => {
      if (props.field.label) {
        return (
          <Col componentClass={ControlLabel} {...labelSize()}>
            {props.field.label}
          </Col>
        );
      }
    };

    const rendered = (<FormGroup
      {...thisSize()}
      validationState={validationState()}
    >

      {getLabel()}
      <Col {...fieldSize()}>
        {getField()}
        {((touched && error) || (submitFailed && submitError)) && <FormFeedback />}
        {props.field.help && (!touched || (!submitError && !error)) && <FormText>{props.field.help}</FormText>}
        {((touched && error) || (submitFailed && submitError)) && <FormFeedback>{(submitError || error)}</FormFeedback>}
      </Col>
    </FormGroup>);

    if(this.context.debug) {
      return (
        <div style={{ position: 'relative' }}>
          {rendered}
        </div>
      );
    }

    return rendered;
  }

  render() {
    const { name, ...rest } = this.props;
    return (
      <Field
        component={this.renderField}
        type={this.props.type}
        name={name}
        field={rest}
      />
    );
  }
}

Wrap.propTypes = {
  'field': PropTypes.object,
  'size': PropTypes.string,
  'addField': PropTypes.func,
  'static': PropTypes.bool,
  'name': PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  component: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.bool])
};
Wrap.contextTypes = {
  debug: PropTypes.bool.isRequired,
  checkCondition: PropTypes.func.isRequired,
  isStatic: PropTypes.bool.isRequired
};
Wrap.defaultProps = {};

export default Wrap;
