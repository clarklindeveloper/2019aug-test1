import React, { Component } from 'react';
import classes from './Formbuilder.module.scss';
import Spinner from '../../components/UI/Loaders/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import DefaultPageLayout from '../../hoc/DefaultPageLayout/DefaultPageLayout';
import FlexRow from '../../hoc/Layout/FlexRow';
import Card from '../../components/UI/Card/Card';
import Label from '../../components/UI/Headers/Label';
import List from '../../components/UI/InputComponents/List';
import ListItem from '../../components/UI/InputComponents/ListItem';
import DraggableItem from '../../components/UI/InputComponents/DraggableItem';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Formbuilder extends Component {
  state = {
    showClipboardModal: false,
  };

  componentDidMount() {
    this.getComponentList();
  }

  getComponentList = () => {
    console.log('FUNCTION getComponentList');
    this.props.onFetchComponents();
  };

  render() {
    let listofcomponents = null;

    if (this.props.components !== null) {
      listofcomponents = Object.keys(this.props.components).map((each) => {
        return <DraggableItem style={['Embedded']}>{each}</DraggableItem>;
      });
      console.log('listofcomponents: ', listofcomponents);
    }
    return (
      <div className={classes.Formbuilder}>
        {this.props.isLoading && !this.props.activeProfile ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <Modal show={this.state.showClipboardModal}>
              <FlexRow justifyContent='center'>
                <p>Copied to clipboard</p>
              </FlexRow>
            </Modal>
            {listofcomponents !== null ? (
              <div className={classes.ComponentList}>
                <div className={classes.ComponentListHeading}>
                  <Label style={{ color: 'grey' }}>Components</Label>
                </div>
                <div className={classes.ComponentListBody}>
                  <List value={{ data: listofcomponents }} />
                </div>
              </div>
            ) : null}
            <DefaultPageLayout label={`Formbuilder`}>
              <Card></Card>
            </DefaultPageLayout>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    components: state.formbuilder.components,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchComponents: () => {
      dispatch(actions.processFetchComponents());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Formbuilder);
