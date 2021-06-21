import React, {Component} from 'react';
import BSButton from 'react-bootstrap/lib/Button';
import PropTypes from 'prop-types';

class Button extends Component {

  constructor(props, context) {
    super(props, context);
    this.onClick = this.onClick.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
  }

  onClick(event){
    this.props.onMutation && this.props.onMutation(this.context.mutators);
  }

  isDisabled(){
    if(this.props.type !== 'submit') return false;
    else return (this.context.status.submitting === true || this.context.status.valid === false  || this.context.status.pristine === true ) && this.context.status.dirtySinceLastSubmit === false;
  }

  render() {
    const {children, type, ...rest} = this.props;

    return (
      <BSButton onClick={this.onClick} {...rest} disabled={this.isDisabled()}>
        {children}
        {this.props.type === 'submit' && this.context.status.submitting && ' '}
        {this.props.type === 'submit' && this.context.status.submitting && <i className="fa fa-circle-o-notch fa-spin" />}
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
