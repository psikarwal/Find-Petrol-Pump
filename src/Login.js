import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { withNavigation } from 'react-navigation';

class Login extends Component {
  render() {
    return (
      <View>
        <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log('login has error: ' + result.error);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              this.props.navigation.navigate('PumpsList');
              AccessToken.getCurrentAccessToken().then(data => {
                console.log(data);
                this.props.navigation.navigate('PumpsList');
              });
            }
          }}
          onLogoutFinished={() => {
            console.log('logout.');
            this.props.navigation.navigate('App');
          }}
        />
      </View>
    );
  }
}

export default withNavigation(Login);
