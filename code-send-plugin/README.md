# code-send-plugin

Plugin for implementing hot code update with react native using code send platform

## 1. Setup

1. Install code send plugin and react native geolocation for implementing regional update

```bash
$ npm install code-send-plugin @react-native-community/geolocation
```

2. Link package

```bash
$ npx react-native link code-send-plugin @react-native-community/geolocation
```

3. Add Permission to access geolocation and file system to store bundle on `AndroidManifest.xml`

```xml
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

4. Add bundle resolver in react native host in `android/app/src/main/java/com/packageName/MainApplication.java`

```java
package com.packageName;

import android.app.Application;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.List;
import com.reactlibrary.CodeSendModule; // import CodeSendModule

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }

        // add this method to load bundle from code send platform
        @Nullable
        @Override
        protected String getJSBundleFile() {
            return CodeSendModule.launchResolveBundlePath(MainApplication.this);
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }
}
```

5. Use code send hook to automatically check for update when application start. You can get `projectId` by creating a project on [code send platform](https://mnindrazaka.github.io/code-send/)

```javascript
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useCodeSend } from "code-send"; // import useCodeSend hook

const App = () => {
  // run useCodeSend hook
  useCodeSend("projectId");
  return (
    <View>
      <Text>CodeSend initial app</Text>
    </View>
  );
};

export default App;
```

`useCodeSend` has second optional parameters to manage update behaviour. Here is the 

| Parameter                | Default | Description                                                 |
| ------------------------ | ------- | ----------------------------------------------------------- |
| showDownloadConfirmation | true    | show confirmation dialog to download update if update found |
| showDownloadProgress     | true    | show download update progress in notification               |
| showErrorMessage         | true    | show error message if checking or download update failed    |



1. Release your react native application and upload it to marketplace. To make a signed apk, follow tutorial from [react native website](https://reactnative.dev/docs/signed-apk-android)

### 2. Release New Update

1. Update your project source code on javascript side, and make a new bundle using following command

```bash
$ npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle
```

2. Create a new update on [code send platform](https://mnindrazaka.github.io/code-send/) and upload your bundle

3. All running application should be notified that there is new update from you
