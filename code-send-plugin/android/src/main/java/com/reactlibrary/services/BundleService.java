package com.reactlibrary.services;

import android.content.Context;
import android.content.SharedPreferences;

import com.facebook.react.bridge.ReactApplicationContext;
import com.google.gson.Gson;
import com.reactlibrary.models.Bundle;

public class BundleService {
    public static final String ACTIVE_BUNDLE_KEY = "activeBundle";
    public static final  String BUNDLE_PREFS_KEY = "bundlePrefs";
    private final SharedPreferences bundlePrefs;

    public BundleService(ReactApplicationContext reactContext) {
        bundlePrefs = reactContext.getSharedPreferences(BUNDLE_PREFS_KEY, Context.MODE_PRIVATE);
    }

    public Bundle getActiveBundle() {
        if(!bundlePrefs.contains(ACTIVE_BUNDLE_KEY)) return null;
        Gson gson = new Gson();
        String bundleJson = bundlePrefs.getString(ACTIVE_BUNDLE_KEY, "");
        return gson.fromJson(bundleJson, Bundle.class);
    }

    public void setActiveBundle(Bundle bundle) {
        Gson gson = new Gson();
        String bundleJson = gson.toJson(bundle);
        SharedPreferences.Editor editor = bundlePrefs.edit();
        editor.putString(ACTIVE_BUNDLE_KEY, bundleJson);
        editor.apply();
    }
}
