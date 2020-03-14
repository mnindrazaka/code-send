package com.reactlibrary;

import android.content.Context;
import android.content.SharedPreferences;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;

public class CodeSendModule extends ReactContextBaseJavaModule {

    public interface OnReloadRequestedListener {
        void onReloadRequested();
    }

    private final ReactApplicationContext reactContext;
    private final SharedPreferences bundlePrefs;
    private final SharedPreferences extraPrefs;
    private OnReloadRequestedListener listener;

    public CodeSendModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.bundlePrefs = reactContext.getSharedPreferences("_bundles", Context.MODE_PRIVATE);
        this.extraPrefs = reactContext.getSharedPreferences("_extra", Context.MODE_PRIVATE);
    }

    public OnReloadRequestedListener getListener() {
        return this.listener;
    }

    public void setListener(OnReloadRequestedListener listener) {
        this.listener = listener;
    }

    @Override
    public String getName() {
        return "CodeSend";
    }

    @ReactMethod
    public void setActiveBundle(String bundleId) {
        SharedPreferences.Editor editor = this.extraPrefs.edit();
        editor.putString("activeBundle", bundleId);
        editor.commit();
    }

    @ReactMethod
    public void registerBundle(String bundleId, String relativePath) {
        File absolutePath = new File(this.reactContext.getFilesDir(), relativePath);

        SharedPreferences.Editor editor = this.bundlePrefs.edit();
        editor.putString(bundleId, absolutePath.getAbsolutePath());
        editor.commit();
    }

    @ReactMethod
    public void unregisterBundle(String bundleId) {
        SharedPreferences.Editor editor = this.bundlePrefs.edit();
        editor.remove(bundleId);
        editor.commit();
    }
}
