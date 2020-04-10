import android.content.Context;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.test.core.app.ApplicationProvider;

import com.facebook.react.bridge.JavaOnlyMap;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.reactlibrary.CodeSendModule;
import com.reactlibrary.models.Update;

import org.junit.Before;
import org.junit.Test;

import java.io.File;

import static com.google.common.truth.Truth.assertThat;

public class CodeSendModuleTest {
    private ReactApplicationContext reactContext;

    @Before
    public void createReactContext() {
        Context applicationContext = ApplicationProvider.getApplicationContext();
        reactContext = new ReactApplicationContext(applicationContext);
    }

    @Test
    public void canGetActiveBundle() {
        WritableMap updateMap = new JavaOnlyMap();
        updateMap.putString("_id", "mockId");
        updateMap.putString("createdAt", "mockCreatedAt");
        updateMap.putString("updatedAt", "mockUpdatedAt");
        updateMap.putString("version", "mockVersion");
        updateMap.putString("note", "mockNote");
        updateMap.putString("bundleUrl", "mockBundleUrl");

        final WritableMap bundleMap = new JavaOnlyMap();
        bundleMap.putString("filename", "mockFilename");
        bundleMap.putMap("update", updateMap);

        Promise promise = new Promise() {
            @Override
            public void resolve(@Nullable Object value) {
                assertThat(value).isEqualTo(bundleMap);
            }

            @Override
            public void reject(String code, String message) {

            }

            @Override
            public void reject(String code, Throwable throwable) {

            }

            @Override
            public void reject(String code, String message, Throwable throwable) {

            }

            @Override
            public void reject(Throwable throwable) {

            }

            @Override
            public void reject(Throwable throwable, WritableMap userInfo) {

            }

            @Override
            public void reject(String code, @NonNull WritableMap userInfo) {

            }

            @Override
            public void reject(String code, Throwable throwable, WritableMap userInfo) {

            }

            @Override
            public void reject(String code, String message, @NonNull WritableMap userInfo) {

            }

            @Override
            public void reject(String code, String message, Throwable throwable, WritableMap userInfo) {

            }

            @Override
            public void reject(String message) {

            }
        };

        CodeSendModule codeSendModule = new CodeSendModule(reactContext);
        codeSendModule.setActiveBundle(bundleMap);
        codeSendModule.getActiveBundle(promise);
    }

    @Test
    public void canReturnNullIfNoActiveBundle() {
        Promise promise = new Promise() {
            @Override
            public void resolve(@Nullable Object value) {
                assertThat(value).isNull();
            }

            @Override
            public void reject(String code, String message) {

            }

            @Override
            public void reject(String code, Throwable throwable) {

            }

            @Override
            public void reject(String code, String message, Throwable throwable) {

            }

            @Override
            public void reject(Throwable throwable) {

            }

            @Override
            public void reject(Throwable throwable, WritableMap userInfo) {

            }

            @Override
            public void reject(String code, @NonNull WritableMap userInfo) {

            }

            @Override
            public void reject(String code, Throwable throwable, WritableMap userInfo) {

            }

            @Override
            public void reject(String code, String message, @NonNull WritableMap userInfo) {

            }

            @Override
            public void reject(String code, String message, Throwable throwable, WritableMap userInfo) {

            }

            @Override
            public void reject(String message) {

            }
        };

        CodeSendModule codeSendModule = new CodeSendModule(reactContext);
        codeSendModule.clearActiveBundle();
        codeSendModule.getActiveBundle(promise);
    }

    @Test
    public void canDownloadBundle() {
        WritableMap updateMap = new JavaOnlyMap();
        updateMap.putString("_id", "mockId");
        updateMap.putString("createdAt", "mockCreatedAt");
        updateMap.putString("updatedAt", "mockUpdatedAt");
        updateMap.putString("version", "mockVersion");
        updateMap.putString("note", "mockNote");
        updateMap.putString("bundleUrl", "https://res.cloudinary.com/mnindrazaka/raw/upload/v1585519194/ttoan4aymkbufrrjl1r0");

        Promise promise = new Promise() {
            @Override
            public void resolve(@Nullable Object value) {
                File expectedFile = new File(reactContext.getFilesDir().getAbsolutePath() + "/bundle", "0.1.bundle");
                assertThat(value).isEqualTo(expectedFile.getAbsolutePath());
            }

            @Override
            public void reject(String code, String message) {

            }

            @Override
            public void reject(String code, Throwable throwable) {

            }

            @Override
            public void reject(String code, String message, Throwable throwable) {

            }

            @Override
            public void reject(Throwable throwable) {

            }

            @Override
            public void reject(Throwable throwable, WritableMap userInfo) {

            }

            @Override
            public void reject(String code, @NonNull WritableMap userInfo) {

            }

            @Override
            public void reject(String code, Throwable throwable, WritableMap userInfo) {

            }

            @Override
            public void reject(String code, String message, @NonNull WritableMap userInfo) {

            }

            @Override
            public void reject(String code, String message, Throwable throwable, WritableMap userInfo) {

            }

            @Override
            public void reject(String message) {

            }
        };

        CodeSendModule codeSendModule = new CodeSendModule(reactContext);
        codeSendModule.downloadBundle(updateMap, promise);
    }
}
