import com.facebook.react.bridge.JavaOnlyMap;
import com.facebook.react.bridge.WritableMap;
import com.reactlibrary.models.Update;

import org.junit.Test;
import static com.google.common.truth.Truth.assertThat;

public class UpdateTest {
    @Test
    public void canCreateObjectFromMap() {
        WritableMap updateMap = new JavaOnlyMap();
        updateMap.putString("_id", "mockId");
        updateMap.putString("createdAt", "mockCreatedAt");
        updateMap.putString("updatedAt", "mockUpdatedAt");
        updateMap.putString("version", "mockVersion");
        updateMap.putString("note", "mockNote");
        updateMap.putString("bundleUrl", "mockBundleUrl");
        Update update = new Update(updateMap);

        assertThat(update.get_id()).isEqualTo("mockId");
        assertThat(update.getCreatedAt()).isEqualTo("mockCreatedAt");
        assertThat(update.getUpdatedAt()).isEqualTo("mockUpdatedAt");
        assertThat(update.getVersion()).isEqualTo("mockVersion");
        assertThat(update.getNote()).isEqualTo("mockNote");
        assertThat(update.getBundleUrl()).isEqualTo("mockBundleUrl");
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
        assertThat(update.toMap().getString("_id")).isEqualTo("mockId");
        assertThat(update.toMap().getString("createdAt")).isEqualTo("mockCreatedAt");
        assertThat(update.toMap().getString("updatedAt")).isEqualTo("mockUpdatedAt");
        assertThat(update.toMap().getString("version")).isEqualTo("mockVersion");
        assertThat(update.toMap().getString("note")).isEqualTo("mockNote");
        assertThat(update.toMap().getString("bundleUrl")).isEqualTo("mockBundleUrl");
    }
}
