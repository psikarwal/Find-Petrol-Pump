import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

class Mapview extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  render() {
    let venues = this.props.navigation.getParam('venues', []);

    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: venues[0].location.lat,
            longitude: venues[0].location.lng,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04
          }}
        >
          {_.map(venues, venue => (
            <Marker
              key={venue.key}
              coordinate={{
                latitude: venue.location.lat,
                longitude: venue.location.lng
              }}
              title={venue.name}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

export default Mapview;
