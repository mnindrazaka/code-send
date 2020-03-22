package com.reactlibrary;

import com.facebook.react.bridge.ReadableMap;

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

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getBundleUrl() {
        return bundleUrl;
    }

    public void setBundleUrl(String bundleUrl) {
        this.bundleUrl = bundleUrl;
    }
}
