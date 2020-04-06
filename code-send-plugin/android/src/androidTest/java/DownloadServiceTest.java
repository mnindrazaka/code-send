import android.content.Context;

import androidx.test.core.app.ApplicationProvider;

import com.facebook.react.bridge.ReactApplicationContext;
import com.reactlibrary.models.Update;
import com.reactlibrary.services.DownloadService;

import org.junit.Test;

import java.io.File;

import static com.google.common.truth.Truth.assertThat;

public class DownloadServiceTest {
    @Test
    public void canDownloadUpdate() {
        Update update = new Update(
                "mockId",
                "mockCreatedAt",
                "mockUpdatedAt",
                "0.1",
                "mockNote",
                "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        );
        Context applicationContext = ApplicationProvider.getApplicationContext();
        ReactApplicationContext reactContext = new ReactApplicationContext(applicationContext);
        DownloadService downloadService = new DownloadService(reactContext, update);
        String filePath = downloadService.download();
        File expectedFile = new File(reactContext.getFilesDir().getAbsolutePath() + "/bundle", "0.1.bundle");

        assertThat(filePath).isEqualTo(expectedFile.getAbsolutePath());
        assertThat(expectedFile.exists()).isTrue();
    }
}
