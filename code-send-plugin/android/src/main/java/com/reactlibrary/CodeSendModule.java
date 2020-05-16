package com.reactlibrary;

import android.content.Context;
import android.content.SharedPreferences;

import androidx.annotation.NonNull;
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

import java.io.File;

public class CodeSendModule extends ReactContextBaseJavaModule {
    private final CodeSendPackage codeSendPackage;
    private final BundleService bundleService;
    private final InteractionService interactionService;

    // TODO: refactor this method
    public static String launchResolveBundlePath(Context ctx) {
        SharedPreferences bundlePrefs = ctx.getSharedPreferences(BundleService.BUNDLE_PREFS_KEY, Context.MODE_PRIVATE);
        if(!bundlePrefs.contains(BundleService.ACTIVE_BUNDLE_KEY)) return null;
        Gson gson = new Gson();
        String bundleJson = bundlePrefs.getString(BundleService.ACTIVE_BUNDLE_KEY, "");
        Bundle bundle = gson.fromJson(bundleJson, Bundle.class);
        return bundle.getFilename();
    }

    public CodeSendModule(ReactApplicationContext reactApplicationContext, CodeSendPackage codeSendPackage) {
        super(reactApplicationContext);
        this.bundleService = new BundleService(reactApplicationContext);
        this.interactionService = new InteractionService(reactApplicationContext);
        this.codeSendPackage = codeSendPackage;
    }

    @NonNull
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
        if (getCurrentActivity() == null) return;

        // this is must be sync with https://github.com/facebook/react-native/blob/master/ReactAndroid/src/main/java/com/facebook/react/devsupport/DevSupportManagerBase.java
        File cachedDevBundle = new File(getReactApplicationContext().getFilesDir(), "ReactNativeDevBundle.js");
        if (cachedDevBundle.exists()) {
            cachedDevBundle.delete();
        }

        codeSendPackage.invalidateCurrentInstance();
        getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (getCurrentActivity() == null) return;
                getCurrentActivity().recreate();
            }
        });
    }

    @ReactMethod
    public void showMessage(String message) {
        interactionService.showMessage(message);
    }
}
