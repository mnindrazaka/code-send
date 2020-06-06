import android.content.Context;

import androidx.test.core.app.ApplicationProvider;
import androidx.test.filters.SmallTest;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.PromiseImpl;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.soloader.SoLoader;
import com.reactlibrary.CodeSendModule;

import org.junit.Before;
import org.junit.Test;

import java.io.File;
import java.net.MalformedURLException;

import static com.google.common.truth.Truth.assertThat;


@SmallTest
public class CodeSendModuleTest {
    private ReactApplicationContext reactContext;

    @Before
    public void createReactContext() {
        Context applicationContext = ApplicationProvider.getApplicationContext();
        reactContext = new ReactApplicationContext(applicationContext);
        SoLoader.init(reactContext, false);
    }

    @Test
    public void canGetActiveBundle() {
        WritableMap updateMap = Arguments.createMap();
        updateMap.putString("_id", "57jg739gk388g4g89ut4");
        updateMap.putString("createdAt", "2020-03-29T21:59:47.213Z");
        updateMap.putString("updatedAt", "2020-03-29T21:59:47.213Z");
        updateMap.putString("version", "0.1");
        updateMap.putString("note", "first update");
        updateMap.putString("bundleUrl", "https://res.cloudinary.com/mnindrazaka/raw/upload/v1585519194/ttoan4aymkbufrrjl1r0");

        final WritableMap bundleMap = Arguments.createMap();
        bundleMap.putString("filename", "/data/data/package/files/bundle/0.1.bundle");
        bundleMap.putMap("update", updateMap);

        Callback onResolved = new Callback() {
            @Override
            public void invoke(Object... args) {
                assertThat(args[0]).isEqualTo(bundleMap);
            }
        };

        Callback onRejected = new Callback() {
            @Override
            public void invoke(Object... args) {}
        };

        CodeSendModule codeSendModule = new CodeSendModule(reactContext);
        codeSendModule.setActiveBundle(bundleMap);
        codeSendModule.getActiveBundle(new PromiseImpl(onResolved, onRejected));
    }

    @Test
    public void canReturnNullIfNoActiveBundle() {
        Callback onResolved = new Callback() {
            @Override
            public void invoke(Object... args) {
                assertThat(args[0]).isNull();
            }
        };

        Callback onRejected = new Callback() {
            @Override
            public void invoke(Object... args) {}
        };

        CodeSendModule codeSendModule = new CodeSendModule(reactContext);
        codeSendModule.clearActiveBundle();
        codeSendModule.getActiveBundle(new PromiseImpl(onResolved, onRejected));
    }

    @Test
    public void canDownloadBundle() {
        WritableMap updateMap = Arguments.createMap();
        updateMap.putString("_id", "57jg739gk388g4g89ut4");
        updateMap.putString("createdAt", "2020-03-29T21:59:47.213Z");
        updateMap.putString("updatedAt", "2020-03-29T21:59:47.213Z");
        updateMap.putString("version", "0.1");
        updateMap.putString("note", "first update");
        updateMap.putString("bundleUrl", "https://res.cloudinary.com/mnindrazaka/raw/upload/v1585519194/ttoan4aymkbufrrjl1r0");

        Callback onResolved = new Callback() {
            @Override
            public void invoke(Object... args) {
                File expectedFile = new File(reactContext.getFilesDir().getAbsolutePath() + "/bundle", "0.1.bundle");
                assertThat(args[0]).isEqualTo(expectedFile.getAbsolutePath());
            }
        };

        Callback onRejected = new Callback() {
            @Override
            public void invoke(Object... args) {}
        };

        CodeSendModule codeSendModule = new CodeSendModule(reactContext);
        codeSendModule.downloadBundle(updateMap, false, new PromiseImpl(onResolved, onRejected));
    }

    @Test
    public void canThrowWrongURLFormat() {
        WritableMap updateMap = Arguments.createMap();
        updateMap.putString("_id", "57jg739gk388g4g89ut4");
        updateMap.putString("createdAt", "2020-03-29T21:59:47.213Z");
        updateMap.putString("updatedAt", "2020-03-29T21:59:47.213Z");
        updateMap.putString("version", "0.1");
        updateMap.putString("note", "first update");
        updateMap.putString("bundleUrl", "http//wrongUrlFormat.com");

        Callback onResolved = new Callback() {
            @Override
            public void invoke(Object... args) {}
        };

        Callback onRejected = new Callback() {
            @Override
            public void invoke(Object... args) {
                assertThat(args[0].toString()).contains(new MalformedURLException().toString());
            }
        };

        CodeSendModule codeSendModule = new CodeSendModule(reactContext);
        codeSendModule.downloadBundle(updateMap, false, new PromiseImpl(onResolved, onRejected));
    }
}
