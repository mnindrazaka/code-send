import com.facebook.react.bridge.JavaOnlyMap;
import com.facebook.react.bridge.WritableMap;
import com.reactlibrary.models.Bundle;
import com.reactlibrary.models.Update;

import org.junit.Test;
import static com.google.common.truth.Truth.assertThat;

public class BundleTest {
    @Test
    public void canCreateObjectFromMap() {
        WritableMap updateMap = new JavaOnlyMap();
        updateMap.putString("_id", "mockId");
        updateMap.putString("createdAt", "mockCreatedAt");
        updateMap.putString("updatedAt", "mockUpdatedAt");
        updateMap.putString("version", "mockVersion");
        updateMap.putString("note", "mockNote");
        updateMap.putString("bundleUrl", "mockBundleUrl");
        WritableMap bundleMap = new JavaOnlyMap();
        bundleMap.putString("filename", "mockFilename");
        bundleMap.putMap("update", updateMap);
        Bundle bundle = new Bundle(bundleMap);

        assertThat(bundle.getFilename()).isEqualTo("mockFilename");
        assertThat(bundle.getUpdate().get_id()).isEqualTo("mockId");
        assertThat(bundle.getUpdate().getCreatedAt()).isEqualTo("mockCreatedAt");
        assertThat(bundle.getUpdate().getUpdatedAt()).isEqualTo("mockUpdatedAt");
        assertThat(bundle.getUpdate().getVersion()).isEqualTo("mockVersion");
        assertThat(bundle.getUpdate().getNote()).isEqualTo("mockNote");
        assertThat(bundle.getUpdate().getBundleUrl()).isEqualTo("mockBundleUrl");
    }

    @Test
    public void canCreateMapFromObject() {
        Update update = new Update(
                "mockId",
                "mockCreatedAt",
                "mockUpdatedAt",
                "mockVersion",
                "mockNote",
                "mockBundleUrl"
        );
        Bundle bundle = new Bundle("mockFilename", update);
        assertThat(bundle.toMap().getString("filename")).isEqualTo("mockFilename");
        assertThat(bundle.toMap().getMap("update").getString("_id")).isEqualTo("mockId");
        assertThat(bundle.toMap().getMap("update").getString("createdAt")).isEqualTo("mockCreatedAt");
        assertThat(bundle.toMap().getMap("update").getString("updatedAt")).isEqualTo("mockUpdatedAt");
        assertThat(bundle.toMap().getMap("update").getString("version")).isEqualTo("mockVersion");
        assertThat(bundle.toMap().getMap("update").getString("note")).isEqualTo("mockNote");
        assertThat(bundle.toMap().getMap("update").getString("bundleUrl")).isEqualTo("mockBundleUrl");
    }
}
