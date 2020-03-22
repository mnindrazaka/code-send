import { NativeModules } from "react-native";
import { Bundle } from "interfaces/Bundle";
const { CodeSend } = NativeModules;

export function getActiveBundle(): Promise<Bundle> {
  return CodeSend.getActiveBundle();
}

export function setActiveBundle(bundle: Bundle) {
  CodeSend.setActiveBundle(bundle);
}

export function reloadBundle() {
  CodeSend.reloadBundle();
}

export function registerBundle(bundleId: string, relativePath: string) {
  CodeSend.registerBundle(bundleId, relativePath);
}
