import { StatusBar } from 'expo-status-bar';
import * as AuthSession from 'expo-auth-session';
import { StyleSheet, Text, Platform, TouchableOpacity } from 'react-native';
import jwtDecode from 'jwt-decode';

const auth0ClientId = "";
const authorizationEndpoint = "https://dev-et0gdqzi.us.auth0.com/authorize";

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

console.log(redirectUri)  // <-- you will need to add this to your auth0 callbacks / logout configs




export default function App() {
  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: auth0ClientId,
      // id_token will return a JWT token
      responseType: 'id_token',
      // retrieve the user's profile
      scopes: ['openid', 'profile', 'email'],
      extraParams: {
        // ideally, this will be a random value
        nonce: 'nonce',
      },
    },
    { authorizationEndpoint }
  );

  console.log('result', result)
  console.log('request', request)

  async function login(){

    const authResult = await promptAsync({ useProxy })
    console.log(authResult)


  }

  
  return (
    <TouchableOpacity style={styles.container} onPress={login}>
      <Text>Login</Text>
      <StatusBar style="auto" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
