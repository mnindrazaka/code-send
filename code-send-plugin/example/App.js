import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useCodeSend from "code-send"

const App = () => {
  const { error, loading, update } = useCodeSend("5e7fe2afa491f60003847d6b")

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>CodeSend initial app</Text>
    </View>
  );
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
});

export default App