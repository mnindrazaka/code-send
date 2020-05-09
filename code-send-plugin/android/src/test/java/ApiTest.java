import com.facebook.react.bridge.JavaOnlyMap;
import com.facebook.react.bridge.WritableMap;
import com.reactlibrary.models.Api;

import org.junit.Test;
import static com.google.common.truth.Truth.assertThat;

public class ApiTest {
    @Test
    public void canCreateObjectFromMap() {
        WritableMap apiMap = new JavaOnlyMap();
        apiMap.putString("_id", "5e527g78786873jga");
        apiMap.putString("createdAt", "2020-03-29T21:59:47.213Z");
        apiMap.putString("updatedAt", "2020-03-29T21:59:47.213Z");
        Api api = new Api(apiMap);

        assertThat(api.get_id()).isEqualTo("5e527g78786873jga");
        assertThat(api.getCreatedAt()).isEqualTo("2020-03-29T21:59:47.213Z");
        assertThat(api.getUpdatedAt()).isEqualTo("2020-03-29T21:59:47.213Z");
    }
}
