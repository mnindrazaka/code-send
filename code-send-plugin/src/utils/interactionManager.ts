import { NativeModules } from "react-native";
const { CodeSend } = NativeModules;

const showMessage = (message: string) => {
  return CodeSend.showMessage(message);
};

export default { showMessage };
