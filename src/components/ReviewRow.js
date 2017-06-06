import React from 'react';
import {
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../constants/colors';

const starInactive = require('../resources/star_inactive.png');
const starActive = require('../resources/star_active.png');

const { widthHeader } = Dimensions.get('window');
const heightContainers = 50;

const styles = EStyleSheet.create({
  container: {
    width: widthHeader,
    height: heightContainers,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.separator,
  },
  reviewContainer: { 
    paddingLeft: 15, 
    paddingTop: 5, 
    paddingBottom: 5, 
    justifyContent: 'space-between',
    flex: 1
  },
  dateAndRateContainer: {
    flex: 1,
  },
  username: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  dateContainer: {
    paddingRight: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  date: {
    fontSize: 11,
    color: 'gray'
  },
  rate: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

EStyleSheet.build();

export default class ReviewRow extends React.Component {
  render() {
    const listIcons = new Array(5);
    listIcons.fill(starInactive);
    return (
      <View style={styles.container}>
        <View style={styles.reviewContainer}>
          <Text style={styles.username}>{this.props.rowData.created_by.username}</Text>
          <Text lineBreakMode="tail" numberOfLines={1}>{this.props.rowData.text}</Text>
        </View>
        <View style={styles.dateAndRateContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{moment(this.props.rowData.created_at).format('D MMM YYYY, h:mm:ss A')}</Text>
          </View>      
          <View style={styles.rate}>
            {            
              listIcons.map((icon, index) =>      
                <Image 
                  key={`key${index}`}
                  source={(index + 1 <= this.props.rowData.rate) ? starActive : icon}
                  resizeMode='contain'
                  style={{ width: 20, height: 20 }}
                />  
              )
            }
          </View>
        </View>
      </View>
    );
  }
}
