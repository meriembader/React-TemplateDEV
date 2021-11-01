'use strict'
import React from 'react'
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import {FormGroup, FormLabel, FormText, InputGroup, Col, FormControl, Button} from 'react-bootstrap';
import './inputStyle.scss';


//only used with redux form
export default class TextEntry extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({focclassNameused: false, value: props.value || ''});
    }

    handleFocus = (event) => {
        this.setState({focused: true});

        if (this.props.input && this.props.input.onFocus) {
            //this.props.input.onFocus(event);
        }
    };

    handleBlur = (event) => {
        this.setState({focused: false});

        let UOC = this.props.updateOnChange;

        if (!UOC && this.props.onChange) {
            this.props.onChange(event, event.target.value);
        }

        if (this.props.input) {
            if (this.props.input.onBlur)
                this.props.input.onBlur(event);
            if (!UOC && this.props.input.onChange)
                this.props.input.onChange(event);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            this.setState({value: nextProps.value});
        }
    }

    handleChange = (event) => {
        let newValue = event.target.value;

        this.setState({value: newValue});

        if (this.props.updateOnChange && this.props.onChange) {
            this.props.onChange(event, newValue);
        }

        if (this.props.input && this.props.input.onChange) {
            this.props.input.onChange(event);
        }
    }
    handleKeyPress = (event) => {
        if (this.props.updateOnEnter === true) {
            var charCode = (typeof event.which == "number") ? event.which : event.keyCode;
            if (charCode == 13) { // on Enter pressed
                this.props.onChange(event, event.target.value);
            }
        }
    }

    render() {
        let {input, title, placeholder, disabled, readOnly, type, hidden, isLoading, className, prefixSrc, prefix, ...props} = this.props;

        let vs = {
            'error': input && props.meta.touched && props.meta.error
        };
        let gc = {
            'form-group': title,
            'text-entry-form-group': title,
             'input-group': true,
             'mb-3': true,
             'focused': this.state.focused || (this.props.input && this.props.input.value)
        };

        if (props.groupClassName) {
            gc[props.groupClassName] = true;
        }

        let value = this.state.value;
        if (input !== undefined) {
            value = input.value;
        }
      if(prefix){
        input.value = prefix + input.value;
      }

        let reduxName = this.props.reduxName || (this.props.input && this.props.input.name);
        let inputClassNames = {
            'form-control': true,
            'Select-loading-zone': !!isLoading,
            'text-entry-custom' : true
    };


      let inputComponent =  <FormControl
        type={type || "text"}
        placeholder={placeholder}
        name={this.props.inputName}
        disabled={disabled}
        readOnly={readOnly}
        value={value}
        data-reduxname={reduxName}
        autoComplete={(this.props.autoComplete === false) ? 'new-password' : 'on'}
        isInvalid={props.meta && props.meta.touched && props.meta.error }
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
        onFocus={this.handleFocus}
        className={classNames(inputClassNames)}
      />;

        if (isLoading) {
            inputComponent = <span className={classNames(inputClassNames)} aria-hidden={true}>
                <span className="Select-loading"/></span>
        }

        let inputSize = this.props.inputSize;
        if (inputSize) {
            inputComponent = (<Col lg={inputSize} md={inputSize} className="form-subcol">{inputComponent}</Col>);
        }

        let readOnlyInput = <InputGroup>{value || 'n/a'}</InputGroup>;
        let prefixImg = (<img alt="user_image" src={prefixSrc} fill="red" className="icon-style"/>);
        var controlLabel = title ? <FormLabel>{title}</FormLabel> : null;


        return prefixSrc ? (
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">{prefixImg}
              </InputGroup.Text>
            </InputGroup.Prepend>
            {controlLabel}
            {readOnly ? readOnlyInput : inputComponent}
          </InputGroup>
        ) : (
        <FormGroup bsClass={classNames(gc)} validationState={classNames(vs) || undefined}>
          {controlLabel}
          {readOnly ? readOnlyInput : inputComponent}
          <FormControl.Feedback type="invalid" >{props.meta && props.meta.error}</FormControl.Feedback>

        </FormGroup>
      )
    }
}
