import { NativeModules } from "react-native";
import { Bundle } from "../interfaces/Bundle";
import { Update } from "../interfaces/Update";
const { CodeSend } = NativeModules;

const getActiveBundle = (): Promise<Bundle | null> => {
  return CodeSend.getActiveBundle();
};

const setActiveBundle = (bundle: Bundle) => {
  CodeSend.setActiveBundle(bundle);
};

const clearActiveBundle = () => {
  CodeSend.clearActiveBundle();
};

const downloadBundle = (
  update: Update,
  showProgress: boolean
): Promise<string> => {
  return CodeSend.downloadBundle(update, showProgress);
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
