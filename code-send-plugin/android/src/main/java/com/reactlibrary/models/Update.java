package com.reactlibrary.models;

import com.facebook.react.bridge.JavaOnlyMap;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

public class Update extends Api {

    private String version;
    private String note;
    private String bundleUrl;

    public Update(String _id, String createdAt, String updatedAt, String version, String note, String bundleUrl) {
        super(_id, createdAt, updatedAt);
        this.version = version;
        this.note = note;
        this.bundleUrl = bundleUrl;
    }

    public Update(ReadableMap updateMap) {
        super(updateMap);
        this.version = updateMap.getString("version");
        this.note = updateMap.getString("note");
        this.bundleUrl = updateMap.getString("bundleUrl");
    }

    public WritableMap toMap() {
        WritableMap updateMap = new JavaOnlyMap();
        updateMap.putString("_id", this._id);
        updateMap.putString("createdAt", this.createdAt);
        updateMap.putString("updatedAt", this.updatedAt);
        updateMap.putString("version", this.version);
        updateMap.putString("note", this.note);
        updateMap.putString("bundleUrl", this.bundleUrl);
        return updateMap;
    }

    public String getVersion() {
        return version;
    }

    public String getNote() {
        return note;
    }

    public String getBundleUrl() {
        return bundleUrl;
    }
}
