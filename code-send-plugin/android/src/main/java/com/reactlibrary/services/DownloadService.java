package com.reactlibrary.services;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.os.Build;

import androidx.core.app.NotificationCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.reactlibrary.R;
import com.reactlibrary.models.Update;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class DownloadService {
    private ReactApplicationContext reactContext;
    private Update update;
    private InputStream input;
    private OutputStream output;
    private HttpURLConnection connection;
    private boolean showProgress;

    private NotificationManager notificationManager;
    private NotificationCompat.Builder builder;


    public DownloadService(ReactApplicationContext reactContext, Update update, boolean showProgress) {
        this.reactContext = reactContext;
        this.update = update;
        this.showProgress = showProgress;

        if (showProgress) {
            notificationManager = (NotificationManager) reactContext.getSystemService(Context.NOTIFICATION_SERVICE);
            builder = new NotificationCompat.Builder(reactContext);
            builder.setContentTitle("Download Update")
                    .setContentText("Download in progress")
                    .setSmallIcon(androidx.core.R.drawable.notification_icon_background);

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
            {
                String channelId = "Your_channel_id";
                NotificationChannel channel = new NotificationChannel(
                        channelId,
                        "Channel human readable title",
                        NotificationManager.IMPORTANCE_HIGH);
                notificationManager.createNotificationChannel(channel);
                builder.setChannelId(channelId);
            }
        }
    }

    private String getFilename() {
        return update.getVersion() + ".bundle";
    }

    private String getStorageDirectory() {
        return reactContext.getFilesDir().getAbsolutePath() + "/bundle";
    }

    private File getFile() {
        return new File(getStorageDirectory(), getFilename());
    }

    private void openConnection(String stringUrl) throws IOException {
        URL url = new URL(stringUrl);
        connection = (HttpURLConnection) url.openConnection();
        connection.connect();
    }

    private void closeConnection() {
        if (connection != null) {
            connection.disconnect();
        }
    }

    private void openInputOutput() throws IOException {
        getFile().getParentFile().mkdirs();
        input = connection.getInputStream();
        output = new FileOutputStream(getFile());
    }

    private void closeInputOutput() throws IOException {
        if (output != null)
            output.close();
        if (input != null)
            input.close();
    }

    private void downloadFile() throws IOException, InterruptedException {
        byte[] data = new byte[4096];
        int count;
        long total = 0;
        int lengthOfFile = connection.getContentLength();
        int notifyId = 1;
        while ((count = input.read(data)) != -1) {
            total += count;
            output.write(data, 0, count);
            if (showProgress) {
                builder.setProgress(lengthOfFile, (int) total, false);
                notificationManager.notify(notifyId, builder.build());
            }
        }
        if (showProgress) {
            builder.setContentText("Download completed").setProgress(0, 0, false);
            notificationManager.notify(notifyId, builder.build());
        }
    }

    public String download() throws Exception {
        try {
            openConnection(update.getBundleUrl());
            if (connection.getResponseCode() != HttpURLConnection.HTTP_OK)
                throw new Exception("Server returned HTTP " +  connection.getResponseCode() + " " + connection.getResponseMessage());
            openInputOutput();
            downloadFile();
        } finally {
            closeInputOutput();
            closeConnection();
        }
        return getFile().getAbsolutePath();
    }
}
