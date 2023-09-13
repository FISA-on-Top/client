import { atom } from 'recoil';

export const calendarDate = atom({
    key: 'calendarDate',
    default: new Date(),
});

export const ipoList = atom({
    key: 'ipoList',
    default: null,
});

export const selectedIpo = atom({
    key: 'selectedIpo',
    default: null,
});

export const accountNumber = atom({
    key: 'accountNumber',
    default: '',
});
export const commissionPrice = atom({
    key: 'commissionPrice',
    default: '2,000',
});
export const phoneNumber = atom({
    key: 'phoneNumber',
    default: '',
});

export const orderAmount = atom({
    key: 'orderAmount',
    default: 0,
});
export const deposit = atom({
    key: 'deposit',
    default: '',
});