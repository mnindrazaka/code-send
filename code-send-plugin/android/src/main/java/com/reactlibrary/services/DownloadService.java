package com.reactlibrary.services;

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

    private void openConnection(String stringUrl) {
        try {
            URL url = new URL(stringUrl);
            connection = (HttpURLConnection) url.openConnection();
            connection.connect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void closeConnection() {
        if (connection != null) {
            connection.disconnect();
        }
    }

    private void openInputOutput() {
        try {
            getFile().getParentFile().mkdirs();
            input = connection.getInputStream();
            output = new FileOutputStream(getFile());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void closeInputOutput() {
        try {
            if (output != null)
                output.close();
            if (input != null)
                input.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void downloadFile() {
        try {
            byte[] data = new byte[4096];
            int count;
            while ((count = input.read(data)) != -1) {
                System.out.println("data ditulis");
                output.write(data, 0, count);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String download() {
        try {
            openConnection(update.getBundleUrl());
            if (connection.getResponseCode() != HttpURLConnection.HTTP_OK)
                return "Server returned HTTP " +  connection.getResponseCode() + " " + connection.getResponseMessage();
            openInputOutput();
            downloadFile();
        } catch (Exception e) {
            return e.toString();
        } finally {
            closeInputOutput();
            closeConnection();
        }
        return getFile().getAbsolutePath();
    }
}
