package com.reactlibrary.services;

import android.app.ProgressDialog;
import android.os.AsyncTask;

import androidx.core.util.Consumer;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.reactlibrary.models.Update;

public class DownloadTask extends AsyncTask<String, Integer, String> {
    private ReactApplicationContext reactContext;
    private DownloadService downloadService;
    private Promise promise;
    private ProgressDialog progressDialog;

    public DownloadTask(ReactApplicationContext reactContext,  Update update, Promise promise) {
        this.reactContext = reactContext;
        this.downloadService = new DownloadService(reactContext, update, new Consumer<Integer>() {
            @Override
            public void accept(Integer progress) {
                publishProgress(progress);
            }
        });
        this.promise = promise;
        this.progressDialog = new ProgressDialog(reactContext);
        this.progressDialog.setMessage("Downloading update...");
        this.progressDialog.setIndeterminate(false);
        this.progressDialog.setMax(100);
        this.progressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
        this.progressDialog.setCanceledOnTouchOutside(false);
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();
        progressDialog.show();
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
        progressDialog.dismiss();
        if (result.contains(reactContext.getFilesDir().getAbsolutePath())) {
            promise.resolve(result);
        } else {
            promise.reject(result);
        }
    }
}
