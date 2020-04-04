import android.content.Context;
import android.content.SharedPreferences;

import androidx.test.core.app.ApplicationProvider;
import androidx.test.filters.SmallTest;

import com.facebook.react.bridge.ReactApplicationContext;
import com.google.gson.Gson;
import com.reactlibrary.models.Bundle;
import com.reactlibrary.models.Update;
import com.reactlibrary.services.BundleService;

import org.junit.Before;
import org.junit.Test;
import static com.google.common.truth.Truth.assertThat;

@SmallTest
public class BundleServiceTest {

    private ReactApplicationContext reactContext;

    @Before
    public void createReactContext() {
        Context applicationContext = ApplicationProvider.getApplicationContext();
        reactContext = new ReactApplicationContext(applicationContext);
    }

    @Test
    public void canGetActiveBundle() {
        SharedPreferences bundlePrefs = reactContext.getSharedPreferences(BundleService.BUNDLE_PREFS_KEY, Context.MODE_PRIVATE);
        Update update = new Update(
                "mockId",
                "mockCreatedAt",
                "mockUpdatedAt",
                "mockVersion",
                "mockNote",
                "mockBundleUrl"
        );
        Bundle bundle = new Bundle("mockFilename", update);
        Gson gson = new Gson();
        String bundleJson = gson.toJson(bundle);
        SharedPreferences.Editor editor = bundlePrefs.edit();
        editor.putString(BundleService.ACTIVE_BUNDLE_KEY, bundleJson);
        editor.apply();
        BundleService bundleService = new BundleService(reactContext);

        assertThat(bundleService.getActiveBundle().getFilename()).isEqualTo("mockFilename");
        assertThat(bundleService.getActiveBundle().getUpdate().get_id()).isEqualTo("mockId");
        assertThat(bundleService.getActiveBundle().getUpdate().getCreatedAt()).isEqualTo("mockCreatedAt");
        assertThat(bundleService.getActiveBundle().getUpdate().getUpdatedAt()).isEqualTo("mockUpdatedAt");
        assertThat(bundleService.getActiveBundle().getUpdate().getVersion()).isEqualTo("mockVersion");
        assertThat(bundleService.getActiveBundle().getUpdate().getNote()).isEqualTo("mockNote");
        assertThat(bundleService.getActiveBundle().getUpdate().getBundleUrl()).isEqualTo("mockBundleUrl");
    }

    @Test
    public void canReturnNullIfActiveBundleNotFound() {
        reactContext.getSharedPreferences(BundleService.BUNDLE_PREFS_KEY, Context.MODE_PRIVATE).edit().clear().apply();
        BundleService bundleService = new BundleService(reactContext);
        assertThat(bundleService.getActiveBundle()).isNull();
    }

    @Test
    public void canSetActiveBundle() {
        BundleService bundleService = new BundleService(reactContext);
        Update update = new Update(
                "mockId",
                "mockCreatedAt",
                "mockUpdatedAt",
                "mockVersion",
                "mockNote",
                "mockBundleUrl"
        );
        Bundle bundle = new Bundle("mockFilename", update);
        bundleService.setActiveBundle(bundle);

        assertThat(bundleService.getActiveBundle().getFilename()).isEqualTo("mockFilename");
        assertThat(bundleService.getActiveBundle().getUpdate().get_id()).isEqualTo("mockId");
        assertThat(bundleService.getActiveBundle().getUpdate().getCreatedAt()).isEqualTo("mockCreatedAt");
        assertThat(bundleService.getActiveBundle().getUpdate().getUpdatedAt()).isEqualTo("mockUpdatedAt");
        assertThat(bundleService.getActiveBundle().getUpdate().getVersion()).isEqualTo("mockVersion");
        assertThat(bundleService.getActiveBundle().getUpdate().getNote()).isEqualTo("mockNote");
        assertThat(bundleService.getActiveBundle().getUpdate().getBundleUrl()).isEqualTo("mockBundleUrl");
    }
}
