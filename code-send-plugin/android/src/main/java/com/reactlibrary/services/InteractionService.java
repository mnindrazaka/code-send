package com.reactlibrary.services;

import android.widget.Toast;
import com.facebook.react.bridge.ReactApplicationContext;

public class InteractionService {
    private ReactApplicationContext reactContext;

    public InteractionService(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
    }

    public void showMessage(String message) {
        Toast.makeText(reactContext, message, Toast.LENGTH_LONG).show();
    }
}
