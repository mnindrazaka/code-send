import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.JavaOnlyMap;
import com.facebook.react.bridge.WritableMap;
import com.reactlibrary.models.Update;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import static com.google.common.truth.Truth.assertThat;

@PrepareForTest(Arguments.class)
@RunWith(PowerMockRunner.class)
public class UpdateTest {
    @Before
    public void setup() {
        PowerMockito.mockStatic(Arguments.class);
        PowerMockito.when(Arguments.createMap()).thenAnswer(new Answer<Object>() {
            @Override
            public Object answer(InvocationOnMock invocation) throws Throwable {
                return new JavaOnlyMap();
            }
        });
    }

    @Test
    public void canCreateObjectFromMap() {
        WritableMap updateMap = new JavaOnlyMap();
        updateMap.putString("_id", "564h2vfh3u56383hg6");
        updateMap.putString("createdAt", "2020-03-29T21:59:47.213Z");
        updateMap.putString("updatedAt", "2020-03-29T21:59:47.213Z");
        updateMap.putString("version", "0.1");
        updateMap.putString("note", "first update");
        updateMap.putString("bundleUrl", "https://bundle.com/download");
        Update update = new Update(updateMap);

        assertThat(update.get_id()).isEqualTo("564h2vfh3u56383hg6");
        assertThat(update.getCreatedAt()).isEqualTo("2020-03-29T21:59:47.213Z");
        assertThat(update.getUpdatedAt()).isEqualTo("2020-03-29T21:59:47.213Z");
        assertThat(update.getVersion()).isEqualTo("0.1");
        assertThat(update.getNote()).isEqualTo("first update");
        assertThat(update.getBundleUrl()).isEqualTo("https://bundle.com/download");
    }

    @Test
    public void canCreateMapFromObject() {
        Update update = new Update(
                "564h2vfh3u56383hg6",
                "2020-03-29T21:59:47.213Z",
                "2020-03-29T21:59:47.213Z",
                "0.1",
                "first update",
                "https://bundle.com/download"
        );
        assertThat(update.toMap().getString("_id")).isEqualTo("564h2vfh3u56383hg6");
        assertThat(update.toMap().getString("createdAt")).isEqualTo("2020-03-29T21:59:47.213Z");
        assertThat(update.toMap().getString("updatedAt")).isEqualTo("2020-03-29T21:59:47.213Z");
        assertThat(update.toMap().getString("version")).isEqualTo("0.1");
        assertThat(update.toMap().getString("note")).isEqualTo("first update");
        assertThat(update.toMap().getString("bundleUrl")).isEqualTo("https://bundle.com/download");
    }
}
