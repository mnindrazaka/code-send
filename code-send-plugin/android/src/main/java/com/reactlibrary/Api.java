package com.reactlibrary;

import com.facebook.react.bridge.ReadableMap;

public class Api {
    protected String _id;
    protected String createdAt;
    protected String updatedAt;

    public Api(String _id, String createdAt, String updatedAt) {
        this._id = _id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Api(ReadableMap apiMap) {
        this._id = apiMap.getString("_id");
        this.createdAt = apiMap.getString("createdAt");
        this.updatedAt = apiMap.getString("updatedAt");
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }
}
