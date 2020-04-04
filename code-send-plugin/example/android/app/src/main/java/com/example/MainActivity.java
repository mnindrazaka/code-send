package com.example;

import android.os.Bundle;
import android.os.PersistableBundle;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactContext;
import com.reactlibrary.CodeSendModule;

public class MainActivity extends ReactActivity implements CodeSendModule.OnReloadRequestedListener {

  private CodeSendModule codeSendModule;

  @Override
  public void onCreate(@Nullable Bundle savedInstanceState, @Nullable PersistableBundle persistentState) {
    super.onCreate(savedInstanceState, persistentState);

    MainApplication app = (MainApplication) this.getApplicationContext();
    app.getReactNativeHost().getReactInstanceManager().addReactInstanceEventListener(new ReactInstanceManager.ReactInstanceEventListener() {
      @Override
      public void onReactContextInitialized(ReactContext context) {
        MainActivity.this.codeSendModule = context.getNativeModule(CodeSendModule.class);
        codeSendModule.setListener(MainActivity.this);
      }
    });
  }

  @Override
  protected void onStart() {
    super.onStart();
    if (codeSendModule != null) {
      codeSendModule.setListener(this);
    }
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "example";
  }

  @Override
  public void onReloadRequested() {
    this.runOnUiThread(() -> {
      MainActivity.this.getReactNativeHost().clear();
      MainActivity.this.recreate();
    });
  }
}
