package com.reactlibrary;

import android.content.Context;
import android.content.SharedPreferences;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.google.gson.Gson;

public class CodeSendModule extends ReactContextBaseJavaModule {
    public interface OnReloadRequestedListener {
        void onReloadRequested();
    }

    private final ReactApplicationContext reactContext;
    private final SharedPreferences bundlePrefs;
    private final String BUNDLE_PREFS_KEY = "bundlePrefs";
    private final String ACTIVE_BUNDLE_KEY = "activeBundle";
    private OnReloadRequestedListener listener;

    // TODO: refactor this line
    public static String launchResolveBundlePath(Context ctx) {
        SharedPreferences bundlePrefs = ctx.getSharedPreferences("bundlePrefs", Context.MODE_PRIVATE);
        if(!bundlePrefs.contains("activeBundle")) return null;
        Gson gson = new Gson();
        String bundleJson = bundlePrefs.getString("bundlePrefs", "");
        Bundle bundle = gson.fromJson(bundleJson, Bundle.class);
        return bundle.getFilename();
    }

    public CodeSendModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.bundlePrefs = reactContext.getSharedPreferences(this.BUNDLE_PREFS_KEY, Context.MODE_PRIVATE);
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
        if(!this.bundlePrefs.contains(this.ACTIVE_BUNDLE_KEY)) return;
        Gson gson = new Gson();
        String bundleJson = this.bundlePrefs.getString(this.ACTIVE_BUNDLE_KEY, "");
        Bundle bundle = gson.fromJson(bundleJson, Bundle.class);
        promise.resolve(bundle.toMap());
    }

    @ReactMethod
    public void setActiveBundle(ReadableMap bundleMap) {
        Bundle bundle = new Bundle(bundleMap);
        Gson gson = new Gson();
        String bundleJson = gson.toJson(bundle);

        SharedPreferences.Editor editor = this.bundlePrefs.edit();
        editor.putString(this.ACTIVE_BUNDLE_KEY, bundleJson);
        editor.apply();
    }

    @ReactMethod
    public void reloadBundle() {
        if (this.listener != null) this.listener.onReloadRequested();
    }
}
