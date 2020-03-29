package com.reactlibrary.services;

import android.content.SharedPreferences;

import com.google.gson.Gson;
import com.reactlibrary.models.Bundle;

public class BundleService {
    private final String ACTIVE_BUNDLE_KEY = "activeBundle";
    private final SharedPreferences bundlePrefs;

    public BundleService(SharedPreferences bundlePrefs) {
        this.bundlePrefs = bundlePrefs;
    }

    public Bundle getActiveBundle() {
        if(!this.bundlePrefs.contains(this.ACTIVE_BUNDLE_KEY)) return null;
        Gson gson = new Gson();
        String bundleJson = this.bundlePrefs.getString(this.ACTIVE_BUNDLE_KEY, "");
        return gson.fromJson(bundleJson, Bundle.class);
    }

    public void setActiveBundle(Bundle bundle) {
        Gson gson = new Gson();
        String bundleJson = gson.toJson(bundle);
        SharedPreferences.Editor editor = this.bundlePrefs.edit();
        editor.putString(this.ACTIVE_BUNDLE_KEY, bundleJson);
        editor.apply();
    }
}
