import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useCheckUpdate, useApplyUpdate } from "code-send"

const App = () => {
  const { update } = useCheckUpdate("123")
  if (update) useApplyUpdate(update)

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>☆CodeSend example☆</Text>
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