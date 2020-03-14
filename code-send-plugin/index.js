import { NativeModules } from 'react-native';

const { CodeSend } = NativeModules;

export function setActiveBundle(bundleId) {
  CodeSend.setActiveBundle(bundleId)
}

export function registerBundle(bundleId, relativePath) {
  CodeSend.registerBundle(bundleId, relativePath)
}

export function reloadBundle() {
  CodeSend.reloadBundle()
}

export function getActiveBundle() {
  return CodeSend.getActiveBundle()
}
