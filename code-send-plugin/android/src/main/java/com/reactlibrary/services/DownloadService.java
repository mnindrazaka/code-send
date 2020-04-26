package com.reactlibrary.services;

import androidx.core.util.Consumer;

import com.facebook.react.bridge.ReactApplicationContext;
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


    public DownloadService(ReactApplicationContext reactContext, Update update) {
        this.reactContext = reactContext;
        this.update = update;
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

    private void downloadFile() throws IOException {
        byte[] data = new byte[4096];
        int count;
        long total = 0;
        int lengthOfFile = connection.getContentLength();
        while ((count = input.read(data)) != -1) {
            total += count;
            output.write(data, 0, count);
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
