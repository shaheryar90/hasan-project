/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '../header/header';

class Categories extends Component {
  componentDidMount() {
    console.log('PARAMS', this.props.route);
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          title="Categories"
          // showMenu={true}
          // showSearch={true}
          showCart={true}
          navigation={this.props.navigation}
        />
        <Text>Categories</Text>
        <TouchableOpacity
          style={styles.TextInputEmail}
          onPress={() => this.props.navigation.navigate('Map')}>
          <TextInput
            editable={false}
            selectTextOnFocus={false}
            placeholder="Current location"
            value={this.props.route.params?.address ?? null}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   alignItems: 'center',
    //   justifyContent: 'center',
  },
  TextInputEmail: {
    height: 50,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',

    width: 310,
  },
});
export default Categories;
