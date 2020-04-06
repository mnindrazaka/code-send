package com.reactlibrary;

import android.content.Context;
import android.content.SharedPreferences;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.google.gson.Gson;
import com.reactlibrary.models.Bundle;
import com.reactlibrary.models.Update;
import com.reactlibrary.services.BundleService;
import com.reactlibrary.services.DownloadTask;

public class CodeSendModule extends ReactContextBaseJavaModule {
    public interface OnReloadRequestedListener {
        void onReloadRequested();
    }

    private final ReactApplicationContext reactContext;
    private final BundleService bundleService;
    private OnReloadRequestedListener listener;

    // TODO: refactor this method
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
        this.bundleService = new BundleService(reactContext);
    }

    public OnReloadRequestedListener getListener() {
        return listener;
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
        Bundle activeBundle = bundleService.getActiveBundle();
        if (activeBundle == null) return;
        promise.resolve(activeBundle.toMap());
    }

    @ReactMethod
    public void setActiveBundle(ReadableMap bundleMap) {
        bundleService.setActiveBundle(new Bundle(bundleMap));
    }

    @ReactMethod
    public void downloadBundle(ReadableMap updateMap, Promise promise) {
        DownloadTask downloadTask = new DownloadTask(reactContext, new Update(updateMap), promise);
        downloadTask.execute();
    }

    @ReactMethod
    public void reloadBundle() {
        if (this.listener != null) this.listener.onReloadRequested();
    }
}
