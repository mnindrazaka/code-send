package com.reactlibrary;

import com.facebook.react.bridge.ReadableMap;

public class Bundle {

    private String filename;
    private Update update;

    public Bundle(String filename, Update update) {
        this.filename = filename;
        this.update = update;
    }

    public Bundle(ReadableMap bundleMap) {
        this.filename = bundleMap.getString("filename");
        this.update = new Update(bundleMap.getMap("update"));
    }

    public String getFilename() {
        return filename;
    }

    public Update getUpdate() {
        return update;
    }
}
