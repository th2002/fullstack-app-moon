import { auth } from 'config/firebase.config';

export const baseURL = 'http://127.0.0.1:5001/full-stack-app-moon/us-central1';

export const Menus = [
  { id: 10001, menu: 'My Profile', url: '/profile' },
  { id: 10002, menu: 'My Favouries', url: '/favouries' },
  { id: 10003, menu: 'Dashboard', url: '/profile', isAdmin: true },
  { id: 10004, menu: 'Users', url: '/profile', isAdmin: true },
  { id: 10005, menu: `App's`, url: '/profile', isAdmin: true }
];

export const singOutTheUser = queryClient => {
  auth.signOut().then(() => {
    queryClient.setQueryData('user', null);
  });
};

