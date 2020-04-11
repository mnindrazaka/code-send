package services;

import android.content.Context;

import androidx.test.core.app.ApplicationProvider;
import androidx.test.filters.SmallTest;

import com.facebook.react.bridge.ReactApplicationContext;
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
        Update update = new Update(
                "54yfh3678g7u3j5gf73h",
                "2020-03-29T21:59:47.213Z",
                "2020-03-29T21:59:47.213Z",
                "0.1",
                "fist update",
                "https://bundle.com/download"
        );
        Bundle bundle = new Bundle("/data/data/package/files/bundle/0.1.bundle", update);
        BundleService bundleService = new BundleService(reactContext);
        bundleService.setActiveBundle(bundle);

        assertThat(bundleService.getActiveBundle().getFilename()).isEqualTo("/data/data/package/files/bundle/0.1.bundle");
        assertThat(bundleService.getActiveBundle().getUpdate().get_id()).isEqualTo("54yfh3678g7u3j5gf73h");
        assertThat(bundleService.getActiveBundle().getUpdate().getCreatedAt()).isEqualTo("2020-03-29T21:59:47.213Z");
        assertThat(bundleService.getActiveBundle().getUpdate().getUpdatedAt()).isEqualTo("2020-03-29T21:59:47.213Z");
        assertThat(bundleService.getActiveBundle().getUpdate().getVersion()).isEqualTo("0.1");
        assertThat(bundleService.getActiveBundle().getUpdate().getNote()).isEqualTo("fist update");
        assertThat(bundleService.getActiveBundle().getUpdate().getBundleUrl()).isEqualTo("https://bundle.com/download");
    }

    @Test
    public void canReturnNullIfActiveBundleNotFound() {
        BundleService bundleService = new BundleService(reactContext);
        bundleService.clearActiveBundle();
        assertThat(bundleService.getActiveBundle()).isNull();
    }
}
