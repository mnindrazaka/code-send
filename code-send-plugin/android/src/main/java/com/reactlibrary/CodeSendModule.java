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
import com.reactlibrary.services.BundleService;
import com.reactlibrary.services.DownloadService;

import java.io.File;

public class CodeSendModule extends ReactContextBaseJavaModule {
    public interface OnReloadRequestedListener {
        void onReloadRequested();
    }

    private final ReactApplicationContext reactContext;
    private final BundleService bundleService;
    private final DownloadService downloadService;
    private OnReloadRequestedListener listener;

    // TODO: refactor this line
    public static String launchResolveBundlePath(Context ctx) {
        SharedPreferences bundlePrefs = ctx.getSharedPreferences("bundlePrefs", Context.MODE_PRIVATE);
        if(!bundlePrefs.contains("activeBundle")) return null;
        Gson gson = new Gson();
        String bundleJson = bundlePrefs.getString("bundlePrefs", "");
        Bundle bundle = gson.fromJson(bundleJson, Bundle.class);

        File file = new File(ctx.getFilesDir(), bundle.getFilename());
        return file.getAbsolutePath();
    }

    public CodeSendModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        String BUNDLE_PREFS_KEY = "bundlePrefs";
        SharedPreferences bundlePrefs = reactContext.getSharedPreferences(BUNDLE_PREFS_KEY, Context.MODE_PRIVATE);
        this.bundleService = new BundleService(bundlePrefs);
        this.downloadService = new DownloadService();
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
        promise.resolve(bundleService.getActiveBundle().toMap());
    }

    @ReactMethod
    public void setActiveBundle(ReadableMap bundleMap) {
        bundleService.setActiveBundle(new Bundle(bundleMap));
    }

    @ReactMethod
    public void downloadBundle(String bundleUrl, Promise promise) {
        downloadService.downloadBundle(reactContext, bundleUrl, promise);
    }

    @ReactMethod
    public void reloadBundle() {
        if (this.listener != null) this.listener.onReloadRequested();
    }
}
