import { NativeModules } from "react-native";
import { Bundle } from "../interfaces/Bundle";
import { Update } from "../interfaces/Update";
const { CodeSend } = NativeModules;

export function getActiveBundle(): Promise<Bundle | undefined> {
  return CodeSend.getActiveBundle();
}

export function setActiveBundle(bundle: Bundle) {
  CodeSend.setActiveBundle(bundle);
}

export function downloadBundle(update: Update): Promise<string> {
  return CodeSend.downloadBundle(update);
}

export function reloadBundle() {
  CodeSend.reloadBundle();
}
