import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { bundleManager, useCodeSend } from "code-send"

const App = () => {
  // const {  } = useCodeSend("5e7fe2afa491f60003847d6b")
  const { update } = useCheckUpdate("5e7fe2afa491f60003847d6b")
  const { applyUpdate } = useApplyUpdate()

  React.useEffect(() => {
    console.log('update', update)
    if (update) {
      applyUpdate(update).then(() => {
        bundleManager.getActiveBundle().then(bundle => {
          console.log('bundle', bundle)
        })
      })
    }
  }, [update])
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