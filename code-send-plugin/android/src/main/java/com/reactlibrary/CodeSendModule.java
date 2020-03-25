package com.reactlibrary;

import android.content.Context;
import android.content.SharedPreferences;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

public class CodeSendModule extends ReactContextBaseJavaModule {

    public interface OnReloadRequestedListener {
        void onReloadRequested();
    }

    private final ReactApplicationContext reactContext;
    private final SharedPreferences bundlePrefs;
    private OnReloadRequestedListener listener;

    public CodeSendModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.bundlePrefs = reactContext.getSharedPreferences("_bundles", Context.MODE_PRIVATE);
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
    public void getActiveBundle(Promise promise) {
        if(!this.bundlePrefs.contains("filename")) return;

        WritableMap updateMap = Arguments.createMap();
        updateMap.putString("_id", this.bundlePrefs.getString("update._id", ""));
        updateMap.putString("createdAt", this.bundlePrefs.getString("update.createdAt", ""));
        updateMap.putString("updatedAt", this.bundlePrefs.getString("update.updatedAt", ""));
        updateMap.putString("version", this.bundlePrefs.getString("update.version", ""));
        updateMap.putString("note", this.bundlePrefs.getString("update.note", ""));
        updateMap.putString("bundleUrl", this.bundlePrefs.getString("update.bundleUrl", ""));

        WritableMap bundleMap = Arguments.createMap();
        bundleMap.putString("filename", this.bundlePrefs.getString("filename", null));
        bundleMap.putMap("update", updateMap);

        promise.resolve(bundleMap);
    }

    @ReactMethod
    public void setActiveBundle(ReadableMap bundleMap) {
        SharedPreferences.Editor editor = this.bundlePrefs.edit();
        Bundle bundle = new Bundle(bundleMap);
        editor.putString("filename", bundle.getFilename());
        editor.putString("update._id", bundle.getUpdate().get_id());
        editor.putString("update.createdAt", bundle.getUpdate().getCreatedAt());
        editor.putString("update.updatedAt", bundle.getUpdate().getUpdatedAt());
        editor.putString("update.version", bundle.getUpdate().getVersion());
        editor.putString("update.note", bundle.getUpdate().getNote());
        editor.putString("update.bundleUrl", bundle.getUpdate().getBundleUrl());
        editor.apply();
    }

}
