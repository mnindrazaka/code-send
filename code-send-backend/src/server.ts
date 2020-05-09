require("dotenv").config();
import app from "app";
import { connectDB } from "utils/database";
import updateUtil from "api/update/update.util";

updateUtil.initCloudinaryConfig();

const port = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(port, () => console.log(`server running on port ${port}`));
});
