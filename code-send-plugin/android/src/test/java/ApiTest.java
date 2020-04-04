import com.facebook.react.bridge.JavaOnlyMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.reactlibrary.models.Api;

import org.junit.Test;
import static com.google.common.truth.Truth.assertThat;

public class ApiTest {
    @Test
    public void canCreateObjectFromMap() {
        WritableMap apiMap = new JavaOnlyMap();
        apiMap.putString("_id", "mockId");
        apiMap.putString("createdAt", "mockCreatedAt");
        apiMap.putString("updatedAt", "mockUpdatedAt");
        Api api = new Api(apiMap);

        assertThat(api.get_id()).isEqualTo("mockId");
        assertThat(api.getCreatedAt()).isEqualTo("mockCreatedAt");
        assertThat(api.getUpdatedAt()).isEqualTo("mockUpdatedAt");
    }
}
