import { atom } from 'recoil';

export const userIdInfo = atom({
    key: 'userIdInfoState',
    default: '',
})

export const userLoggedIn = atom({
    key: 'userLoggedInState',
    default: false,
})

export const isAdminAtom = atom({
    key: 'isAdminState',
    default: false,
})