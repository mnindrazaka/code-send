import android.content.Context;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.test.core.app.ApplicationProvider;

import com.facebook.react.bridge.JavaOnlyMap;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.reactlibrary.CodeSendModule;

import org.junit.Before;
import org.junit.Test;
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
        JavaOnlyMap updateMap = new JavaOnlyMap();
        updateMap.putString("_id", "mockId");
        updateMap.putString("createdAt", "mockCreatedAt");
        updateMap.putString("updatedAt", "mockUpdatedAt");
        updateMap.putString("version", "mockVersion");
        updateMap.putString("note", "mockNote");
        updateMap.putString("bundleUrl", "mockBundleUrl");

        final JavaOnlyMap bundleMap = new JavaOnlyMap();
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
        codeSendModule.getActiveBundle(promise);
    }
}
