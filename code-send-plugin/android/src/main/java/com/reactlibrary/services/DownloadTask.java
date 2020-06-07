package com.reactlibrary.services;

import android.os.AsyncTask;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.reactlibrary.models.Update;

public class DownloadTask extends AsyncTask<String, Integer, String> {
    private ReactApplicationContext reactContext;
    private DownloadService downloadService;

    private Promise promise;

    public DownloadTask(ReactApplicationContext reactContext,  Update update, boolean showProgress, Promise promise) {
        this.reactContext = reactContext;
        this.downloadService = new DownloadService(reactContext, update, showProgress);
        this.promise = promise;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();
    }

    @Override
    protected String doInBackground(String... sUrl) {
        try {
            return downloadService.download();
        } catch (Exception e) {
            return e.toString();
        }
    }

    @Override
    protected void onPostExecute(String result) {
        if (result.contains(reactContext.getFilesDir().getAbsolutePath())) {
            promise.resolve(result);
        } else {
            promise.reject(result);
        }
    }
}
