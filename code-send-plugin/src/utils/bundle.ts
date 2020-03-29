import { NativeModules } from "react-native";
import { Bundle } from "../interfaces/Bundle";
const { CodeSend } = NativeModules;

export function getActiveBundle(): Promise<Bundle | undefined> {
  return CodeSend.getActiveBundle();
}

export function setActiveBundle(bundle: Bundle) {
  CodeSend.setActiveBundle(bundle);
}

export function reloadBundle() {
  CodeSend.reloadBundle();
}
