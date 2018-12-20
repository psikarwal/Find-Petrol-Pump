import React, { Component } from 'react';
import _ from 'lodash';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity
} from 'react-native';
const axios = require('axios');
import Login from './Login';

class PumpsList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  state = {
    text: '',
    response: null
  };

  _onTextChange = text => {
    this.setState({ text });
  };

  _renderList = () => {
    return _.map(this.state.response, venue => (
      <View
        key={venue.id}
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          margin: 5,
          padding: 10,
          borderRadius: 3,
          shadowColor: '#000000',
          shadowOpacity: 0.3,
          shadowRadius: 3,
          backgroundColor: '#ffffff',
          elevation: 5,
          shadowOffsetWidth: 3,
          shadowOffsetHeight: 3
        }}
      >
        <Text style={{ fontWeight: 'bold', margin: 5 }}>{venue.name}</Text>
        <Text style={{ margin: 5 }}>
          {!venue.location.city ? null : venue.location.city + ', '}
          {!venue.location.state ? null : venue.location.state + ', '}
          {!venue.location.country ? null : venue.location.country}
        </Text>
        <Text style={{ margin: 2 }}>Latitute :{venue.location.lat}</Text>
        <Text style={{ margin: 2 }}>Longitude :{venue.location.lng}</Text>
        <Text style={{ margin: 2 }}>{venue.location.formattedAddress}</Text>
      </View>
    ));
  };

  _updateState = data => {
    this.setState({ response: data });
  };

  _goPressed = async () => {
    axios
      .get('https://api.foursquare.com/v2/venues/search', {
        params: {
          near: this.state.text,
          client_id: 'IZKYBFZGDXFIXKQYLEF4DYT1TZIOEQUJVKJUT3BQYCCN124P',
          client_secret: '0LMXWHQXH2UE0SFY11CCTRRQ3WUS2KPE04GZLO1NRNTIQLC1',
          v: 20160609,
          categoryId: ['4bf58dd8d48988d113951735']
        }
      })
      .then(response => {
        console.log(response.data.response.venues);
        this._updateState(response.data.response.venues);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <View style={{ backgroundColor: '#F5FCFF', display: 'flex', flex: 1 }}>
        <View
          style={{
            backgroundColor: '#b9b9b9',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 3
          }}
        >
          <Text
            style={{
              padding: 10,
              margin: 10,
              fontWeight: 'bold',
              fontSize: 15
            }}
          >
            Search
          </Text>
          <TextInput
            style={{
              backgroundColor: '#F5FCFF',
              display: 'flex',
              flex: 1,
              padding: 5,
              marginRight: 5
            }}
            onChangeText={text => this._onTextChange(text)}
            placeholder="Enter place !!"
            value={this.state.text}
            onSubmitEditing={() => this._goPressed()}
          />
          <Button
            title="Go"
            onPress={() => this._goPressed()}
            style={{ marginRight: 10 }}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10
          }}
        >
          <Login />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10
          }}
        >
          <Button
            style={{ padding: 10, margin: 20 }}
            title="Mapview"
            onPress={() =>
              this.props.navigation.navigate('Mapview', {
                venues: this.state.response
              })
            }
            disabled={!this.state.response}
          />
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
          }}
        >
          <Text> Results for : </Text>
          <Text style={{ fontWeight: '800', color: 'blue' }}>
            {' '}
            {this.state.text}{' '}
          </Text>
          {!this.state.text ? null : (
            <Button
              title="x"
              style={{ marginLeft: 5 }}
              onPress={() => this.setState({ text: '', response: null })}
            />
          )}
        </View>
        {!this.state.response ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: '500' }}>
              No Petrol Pumps
            </Text>
          </View>
        ) : (
          <ScrollView>{this._renderList()}</ScrollView>
        )}
      </View>
    );
  }
}

export default PumpsList;
