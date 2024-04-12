import { atom } from 'recoil'

export const bottomNavigationState = atom({
  key: 'CarentButtom',
  default: 'home'
})

export const carentEmail = atom({
  key: 'CarentEmail',
  default: ''
})
