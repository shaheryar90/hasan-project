import React, {Component} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';

import GetLocation from 'react-native-get-location';

export default class Map extends Component {
  constructor() {
    super();
    this.state = {
      location: {lat: null, lng: null},
      loading: true,
    };
  }
  componentDidMount() {
    this.setState({loading: true, location: null});

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 150000,
    })
      .then((location) => {
        this.setState({
          location,
          loading: false,
        });
        console.log(location);
        this.setState({
          location: {lat: location.latitude, lng: location.longitude},
        });
        // Position Geocoding
        var NY = {
          lat: this.state.location.lat,
          lng: this.state.location.lng,
        };

        Geocoder.geocodePosition(NY)
          .then((res) => {
            console.log(res);
            console.log(res[0].formattedAddress);
            // res is an Array of geocoding object (see below)
          })
          .catch((err) => console.log(err));

        // Address Geocoding
        Geocoder.geocodeAddress('Pakistan')
          .then((res) => {
            // res is an Array of geocoding object (see below)
          })
          .catch((err) => console.log(err));
      })
      .catch((ex) => {
        const {code, message} = ex;
        // console.warn(code, message);
        if (code === 'CANCELLED') {
          Alert.alert('Location cancelled by user or by another request');
        }
        if (code === 'UNAVAILABLE') {
          Alert.alert('Location service is disabled or unavailable');
        }
        if (code === 'TIMEOUT') {
          Alert.alert('Location request timed out');
        }
        if (code === 'UNAUTHORIZED') {
          Alert.alert('Authorization denied');
        }
        this.setState({
          location: null,
          loading: false,
        });
      });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.loading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <MapView
            style={{flex: 1}}
            initialRegion={{
              latitude: this.state.location.lat,
              longitude: this.state.location.lng,
              // latitude: 25.453453,
              // longitude: 21341241,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={{
                latitude: this.state.location.lat,
                longitude: this.state.location.lng,
              }}
            />
          </MapView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  location: {
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    marginBottom: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// export default class Map extends Component {
//   render() {
//     const {location, loading} = this.state;
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React Native!</Text>
//         <Text style={styles.instructions}>
//           To get location, press the button:
//         </Text>
//         <View style={styles.button}>
//           <Button
//             disabled={loading}
//             title="Get Location"
//             onPress={this._requestLocation}
//           />
//         </View>
//         {loading ? <ActivityIndicator /> : null}
//         {location ? (
//           <Text style={styles.location}>{JSON.stringify(location, 0, 2)}</Text>
//         ) : null}
//       </View>
//     );
//   }
// }
