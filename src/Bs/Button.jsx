import React, {Component} from 'react';
//import BSButton from 'react-bootstrap/lib/Button';
import {Button as BSButton} from 'reactstrap';
import PropTypes from 'prop-types';

class Button extends Component {

  constructor(props, context) {
    super(props, context);
    this.onClick = this.onClick.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
  }

  onClick(event){
    //when using onMutation we want prevent default (submiting form)
    this.props.onMutation && event.preventDefault();
    this.props.onMutation && this.props.onMutation(this.context.mutators);
    //calling onClick event if defined by user
    this.props.onClick && this.props.onClick(event);
  }

  isDisabled(){
    if(this.props.type !== 'submit') return false;
    else return (this.context.status.submitting === true || this.context.status.valid === false  || this.context.status.pristine === true ) && this.context.status.dirtySinceLastSubmit === false;
  }

  render() {
    const {children, type, ...rest} = this.props;

    return (
      <BSButton disabled={this.isDisabled()} type={type} {...rest} onClick={this.onClick}>
        {children}
        {type === 'submit' && this.context.status.submitting && ' '}
        {type === 'submit' && this.context.status.submitting && <i className="fa fa-circle-o-notch fa-spin" />}
      </BSButton>
    );
  }
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
  type: PropTypes.string,
  onMutation: PropTypes.func
};
Button.defaultProps = {};
Button.contextTypes = {
  status: PropTypes.object,
  mutators: PropTypes.object,
};
export default Button;
