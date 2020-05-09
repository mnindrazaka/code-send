package com.reactlibrary.models;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

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

    public WritableMap toMap() {
        WritableMap bundleMap = Arguments.createMap();
        bundleMap.putString("filename", this.filename);
        bundleMap.putMap("update", this.update.toMap());
        return bundleMap;
    }

    public String getFilename() {
        return filename;
    }

    public Update getUpdate() {
        return update;
    }
}
