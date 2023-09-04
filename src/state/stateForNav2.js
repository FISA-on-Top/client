import { atom } from 'recoil';

export const calendarDate = atom({
  key: 'calendarDate', // unique ID (with respect to other atoms/selectors)
  default: new Date(),  // default value (aka initial value)
});

export const ipoList = atom({
  key: 'ipoList', // unique ID (with respect to other atoms/selectors)
  default: null,  // default value (aka initial value)
});

export const selectedIpo = atom({
  key: 'selectedIpo', // unique ID (with respect to other atoms/selectors)
  default: null,  // default value (aka initial value)
});

export const accountNumber = atom({
  key: 'accountNumber', // unique ID (with respect to other atoms/selectors)
  default: '',  // default value (aka initial value)
});
export const commissionPrice = atom({
  key: 'commissionPrice', // unique ID (with respect to other atoms/selectors)
  default: '2,000',  // default value (aka initial value)
});
export const phoneNumber = atom({
  key: 'phoneNumber', // unique ID (with respect to other atoms/selectors)
  default: null,  // default value (aka initial value)
});

/* for request */
export const orderAmount = atom({
  key: 'orderAmount', // unique ID (with respect to other atoms/selectors)
  default: 0,  // default value (aka initial value)
});
export const deposit = atom({
  key: 'deposit', // unique ID (with respect to other atoms/selectors)
  default: '',  // default value (aka initial value)
});