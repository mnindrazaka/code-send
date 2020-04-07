package com.reactlibrary.services;

import android.os.AsyncTask;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.reactlibrary.models.Update;

public class DownloadTask extends AsyncTask<String, Integer, String> {
    private DownloadService downloadService;
    private Promise promise;

    public DownloadTask(ReactApplicationContext reactContext,  Update update, Promise promise) {
        this.downloadService = new DownloadService(reactContext, update);
        this.promise = promise;
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
        promise.resolve(result);
    }
}
