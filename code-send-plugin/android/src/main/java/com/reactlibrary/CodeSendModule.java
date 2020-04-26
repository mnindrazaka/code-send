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
import com.reactlibrary.services.InteractionService;

public class CodeSendModule extends ReactContextBaseJavaModule {
    public interface OnReloadRequestedListener {
        void onReloadRequested();
    }

    private final BundleService bundleService;
    private final InteractionService interactionService;
    private OnReloadRequestedListener listener;

    // TODO: refactor this method
    public static String launchResolveBundlePath(Context ctx) {
        SharedPreferences bundlePrefs = ctx.getSharedPreferences(BundleService.BUNDLE_PREFS_KEY, Context.MODE_PRIVATE);
        if(!bundlePrefs.contains(BundleService.ACTIVE_BUNDLE_KEY)) return null;
        Gson gson = new Gson();
        String bundleJson = bundlePrefs.getString(BundleService.ACTIVE_BUNDLE_KEY, "");
        Bundle bundle = gson.fromJson(bundleJson, Bundle.class);
        return bundle.getFilename();
    }

    public CodeSendModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
        this.bundleService = new BundleService(reactApplicationContext);
        this.interactionService = new InteractionService(reactApplicationContext);
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
        promise.resolve(activeBundle == null ? null : activeBundle.toMap());
    }

    @ReactMethod
    public void setActiveBundle(ReadableMap bundleMap) {
        bundleService.setActiveBundle(new Bundle(bundleMap));
    }

    @ReactMethod
    public void clearActiveBundle() {
        bundleService.clearActiveBundle();
    }

    @ReactMethod
    public void downloadBundle(ReadableMap updateMap, Promise promise) {
        DownloadTask downloadTask = new DownloadTask(getReactApplicationContext(), new Update(updateMap), promise);
        downloadTask.execute();
    }

    @ReactMethod
    public void reloadBundle() {
        if (this.listener != null) this.listener.onReloadRequested();
    }

    @ReactMethod
    public void showMessage(String message) {
        interactionService.showMessage(message);
    }
}
