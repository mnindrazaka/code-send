package com.reactlibrary.services;

import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.Uri;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;

import java.io.File;

public class DownloadService {
    private Promise downloadPromise;
    private long downloadId;

    public void downloadBundle(ReactApplicationContext reactContext, String bundleUrl, Promise promise) {
        reactContext.registerReceiver(this.onDownloadComplete, new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE));
        File file = new File("something","Dummy");
        DownloadManager.Request request = new DownloadManager.Request(Uri.parse(bundleUrl))
                .setTitle("Downloading Update")
                .setDescription("your update is downloading")
                .setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE)
                .setDestinationUri(Uri.fromFile(file));

        DownloadManager downloadManager = (DownloadManager) reactContext.getSystemService(Context.DOWNLOAD_SERVICE);
        downloadId = downloadManager.enqueue(request);
        downloadPromise = promise;
    }

    private BroadcastReceiver onDownloadComplete = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            long id = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
            if (downloadId == id) downloadPromise.resolve("something");
        }
    };
}
