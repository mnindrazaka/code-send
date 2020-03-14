import { NativeModules } from 'react-native'

const { CodeSend } = NativeModules

export function setActiveBundle(bundleId: string) {
  CodeSend.setActiveBundle(bundleId)
}

export function registerBundle(bundleId: string, relativePath: string) {
  CodeSend.registerBundle(bundleId, relativePath)
}

export function reloadBundle() {
  CodeSend.reloadBundle()
}

export function getActiveBundle() {
  return CodeSend.getActiveBundle()
}
