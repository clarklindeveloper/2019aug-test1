import React, { Component } from 'react';

import classes from './ComponentFactory.module.scss';
import Utils from '../../../Utils';
import InputContext from '../../../context/InputContext';

//components
import SelectWithInput from './SelectWithInput';
import MultiInput from './MultiInput';
import CheckboxCollection from './CheckboxCollection';
import RadioCollection from './RadioCollection';
import Select from './Select';
import Textarea from './Textarea';
import Input from './Input';
import Datepicker from './Datepicker';
import Toggle from './Toggle';
class ComponentFactory extends Component {
  static contextType = InputContext;

  constructor(props) {
    super(props);
    this.inputClasses = [classes.InputElement];
    this.inputElement = null;
    this.label = null;
    this.className = Utils.getClassNameString([
      classes.ComponentFactory,
      'ComponentFactory'
    ]);
  }

  render() {
    //add Invalid class if...

    switch (this.props.data.elementtype) {
      case 'input':
        this.inputElement = <Input {...this.props.data} />;
        break;

      case 'textarea':
        this.inputElement = <Textarea {...this.props.data} />;
        break;

      case 'datepicker':
        this.inputElement = <Datepicker {...this.props.data} />;
        break;

      case 'radio':
        this.inputElement = <RadioCollection {...this.props.data} />;
        break;

      case 'select':
        this.inputElement = <Select {...this.props.data} />;
        break;

      case 'selectwithinput':
        this.inputElement = <SelectWithInput {...this.props.data} />;
        break;

      case 'multiinput':
        this.inputElement = <MultiInput {...this.props.data} />;
        break;

      case 'checkbox':
        this.inputElement = <CheckboxCollection {...this.props.data} />;
        break;

      case 'toggle':
        this.inputElement = <Toggle {...this.props.data} />;
        break;

      default:
        this.inputElement = <p>specify input type</p>;
        break;
    }

    this.label = this.props.data.label ? (
      <label className={classes.Label}>{this.props.data.label}</label>
    ) : null;

    return (
      <div className={this.className}>
        {this.label}
        {this.inputElement}
      </div>
    );
  }
}

export default ComponentFactory;