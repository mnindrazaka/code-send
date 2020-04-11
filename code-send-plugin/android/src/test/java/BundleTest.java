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
        updateMap.putString("_id", "56h3bh5j83638en76");
        updateMap.putString("createdAt", "2020-03-29T21:59:47.213Z");
        updateMap.putString("updatedAt", "2020-03-29T21:59:47.213Z");
        updateMap.putString("version", "0.1");
        updateMap.putString("note", "first update");
        updateMap.putString("bundleUrl", "https://bundle.com/download");
        WritableMap bundleMap = new JavaOnlyMap();
        bundleMap.putString("filename", "/data/data/package/files/bundle/0.1.bundle");
        bundleMap.putMap("update", updateMap);
        Bundle bundle = new Bundle(bundleMap);

        assertThat(bundle.getFilename()).isEqualTo("/data/data/package/files/bundle/0.1.bundle");
        assertThat(bundle.getUpdate().get_id()).isEqualTo("56h3bh5j83638en76");
        assertThat(bundle.getUpdate().getCreatedAt()).isEqualTo("2020-03-29T21:59:47.213Z");
        assertThat(bundle.getUpdate().getUpdatedAt()).isEqualTo("2020-03-29T21:59:47.213Z");
        assertThat(bundle.getUpdate().getVersion()).isEqualTo("0.1");
        assertThat(bundle.getUpdate().getNote()).isEqualTo("first update");
        assertThat(bundle.getUpdate().getBundleUrl()).isEqualTo("https://bundle.com/download");
    }

    @Test
    public void canCreateMapFromObject() {
        Update update = new Update(
                "56h3bh5j83638en76",
                "2020-03-29T21:59:47.213Z",
                "2020-03-29T21:59:47.213Z",
                "0.1",
                "first update",
                "https://bundle.com/download"
        );
        Bundle bundle = new Bundle("/data/data/package/files/bundle/0.1.bundle", update);
        assertThat(bundle.toMap().getString("filename")).isEqualTo("/data/data/package/files/bundle/0.1.bundle");
        assertThat(bundle.toMap().getMap("update").getString("_id")).isEqualTo("56h3bh5j83638en76");
        assertThat(bundle.toMap().getMap("update").getString("createdAt")).isEqualTo("2020-03-29T21:59:47.213Z");
        assertThat(bundle.toMap().getMap("update").getString("updatedAt")).isEqualTo("2020-03-29T21:59:47.213Z");
        assertThat(bundle.toMap().getMap("update").getString("version")).isEqualTo("0.1");
        assertThat(bundle.toMap().getMap("update").getString("note")).isEqualTo("first update");
        assertThat(bundle.toMap().getMap("update").getString("bundleUrl")).isEqualTo("https://bundle.com/download");
    }
}
