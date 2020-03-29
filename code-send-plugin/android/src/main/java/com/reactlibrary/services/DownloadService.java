package com.reactlibrary.services;

import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.Uri;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.reactlibrary.models.Update;

import java.io.File;

public class DownloadService {
    private ReactApplicationContext reactContext;
    private Promise downloadPromise;
    private File downloadedFile;
    private long downloadId;

    public DownloadService(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
    }

    public void downloadBundle(Update update, Promise promise) {
        reactContext.registerReceiver(onDownloadComplete, new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE));
        downloadedFile = new File(reactContext.getApplicationInfo().dataDir,update.getVersion() + ".bundle");
        DownloadManager.Request request = new DownloadManager.Request(Uri.parse(update.getBundleUrl()))
                .setTitle("Downloading Update")
                .setDescription("your update is downloading")
                .setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE)
                .setDestinationUri(Uri.fromFile(downloadedFile));
        DownloadManager downloadManager = (DownloadManager) reactContext.getSystemService(Context.DOWNLOAD_SERVICE);
        downloadId = downloadManager.enqueue(request);
        downloadPromise = promise;
    }

    private BroadcastReceiver onDownloadComplete = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            long id = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
            if (downloadId == id) downloadPromise.resolve(downloadedFile.getAbsolutePath());
        }
    };
}
