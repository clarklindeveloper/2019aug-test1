import React, { Component } from 'react';
import classes from './Icon.module.scss';
// font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faMinus,
  faBars,
  faTimes,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faSearch,
  faExclamationCircle,
  faArrowCircleUp,
  faCloudUploadAlt
} from '@fortawesome/free-solid-svg-icons';
import {
  faEdit,
  faTrashAlt as farFaTrashAlt,
  faCalendarAlt
} from '@fortawesome/free-regular-svg-icons';

import Utils from '../../../Utils';
//add to fontawesome lib so we can reuse icons
library.add(
  faChevronLeft,
  faChevronRight,
  faEdit,
  faTimes, //close
  farFaTrashAlt, //delete
  faPlus,
  faMinus,
  faBars, //show side menu
  faCalendarAlt, //date picker
  faChevronUp,
  faChevronDown,
  faSearch, //magnifying glass
  faExclamationCircle, //input error
  faArrowCircleUp, //uploaded
  faCloudUploadAlt //upload
);

class Icon extends Component {
  render() {
    let classList = Utils.getClassNameString([
      classes.Icon,
      Icon.name,
      classes[this.props.type],
      this.props.className
    ]);

    return (
      <div className={[classList].join(' ')}>
        <FontAwesomeIcon
          icon={[this.props.iconstyle, this.props.code]}
          size={this.props.size}
          fixedWidth
        />
      </div>
    );
  }
}

export default Icon;
