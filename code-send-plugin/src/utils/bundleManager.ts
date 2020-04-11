import { NativeModules } from "react-native";
import { Bundle } from "../interfaces/Bundle";
import { Update } from "../interfaces/Update";
const { CodeSend } = NativeModules;

const getActiveBundle = (): Promise<Bundle | undefined> => {
  return CodeSend.getActiveBundle();
};

const setActiveBundle = (bundle: Bundle) => {
  CodeSend.setActiveBundle(bundle);
};

const clearActiveBundle = () => {
  CodeSend.clearActiveBundle();
};

const downloadBundle = (update: Update): Promise<string> => {
  return CodeSend.downloadBundle(update);
};

const reloadBundle = () => {
  CodeSend.reloadBundle();
};

export default {
  getActiveBundle,
  setActiveBundle,
  clearActiveBundle,
  downloadBundle,
  reloadBundle
};
