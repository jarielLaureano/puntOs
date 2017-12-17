import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { getMetrics, getBusinessProfile } from '../actions';
import { Actions } from 'react-native-router-flux';
import BusinessMetric from './BusinessMetric';

class BusinessDashboard extends Component {
  componentWillMount(){
      this.props.getMetrics(this.props.uid);
    }

    render() {
        console.log(this.props.metrics)
        return (
            <ScrollView>
                <BusinessMetric metrics={this.props.metrics} />
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    const { user, uid, metrics} = state.businessMain;
    return { user, uid, metrics};
  };
  
  export default connect(mapStateToProps,{ getMetrics, getBusinessProfile })(BusinessDashboard);