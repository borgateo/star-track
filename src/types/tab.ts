/* eslint-disable no-unused-vars */
// FAVORITES and REPOS enum throwing a lint error

export enum TabType {
  FAVORITES = 'favorites',
  REPOS = 'repos',
}

export type Tab = TabType.FAVORITES | TabType.REPOS
