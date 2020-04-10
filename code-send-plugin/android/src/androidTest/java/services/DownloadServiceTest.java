package services;

import android.content.Context;

import androidx.test.core.app.ApplicationProvider;

import com.facebook.react.bridge.ReactApplicationContext;
import com.reactlibrary.models.Update;
import com.reactlibrary.services.DownloadService;

import org.junit.Before;
import org.junit.Test;

import java.io.File;
import java.net.MalformedURLException;

import static com.google.common.truth.Truth.assertThat;

public class DownloadServiceTest {
    private ReactApplicationContext reactContext;

    @Before
    public void createReactContext() {
        Context applicationContext = ApplicationProvider.getApplicationContext();
        reactContext = new ReactApplicationContext(applicationContext);
    }

    @Test
    public void canDownloadUpdate() {
        Update update = new Update(
                "mockId",
                "mockCreatedAt",
                "mockUpdatedAt",
                "0.1",
                "mockNote",
                "https://res.cloudinary.com/mnindrazaka/raw/upload/v1585519194/ttoan4aymkbufrrjl1r0"
        );
        DownloadService downloadService = new DownloadService(reactContext, update);
        String filePath = null;
        try {
            filePath = downloadService.download();
        } catch (Exception e) {
            e.printStackTrace();
        }
        File expectedFile = new File(reactContext.getFilesDir().getAbsolutePath() + "/bundle", "0.1.bundle");
        assertThat(filePath).isEqualTo(expectedFile.getAbsolutePath());
        assertThat(expectedFile.exists()).isTrue();
    }

    @Test
    public void canThrowWrongURLFormat() {
        Update update = new Update(
                "mockId",
                "mockCreatedAt",
                "mockUpdatedAt",
                "0.1",
                "mockNote",
                "mockUrl"
        );
        DownloadService downloadService = new DownloadService(reactContext, update);
        String errorMessage = "";
        try {
            downloadService.download();
        } catch (Exception e) {
           errorMessage = e.toString();
        }
        assertThat(errorMessage).contains(new MalformedURLException().toString());
    }

    @Test
    public void canThrowServerResponseFailedMessage() {
        Update update = new Update(
                "mockId",
                "mockCreatedAt",
                "mockUpdatedAt",
                "0.1",
                "mockNote",
                "https://res.cloudinary.com/mnindrazaka/raw/upload/v1585519194/randomMockFile"
        );
        DownloadService downloadService = new DownloadService(reactContext, update);
        String errorMessage = "";
        try {
            downloadService.download();
        } catch (Exception e) {
            errorMessage = e.toString();
        }
        assertThat(errorMessage).contains("Server returned HTTP");
    }
}
