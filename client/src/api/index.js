import { auth } from 'config/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { baseURL } from 'utils/helpers';

export const getAuthenticatedUser = async () => {
  return new Promise((resolve, reject) => {
    // listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async userCred => {
      try {
        if (userCred) {
          const token = await userCred.getIdToken();
          const res = await fetch(`${baseURL}/validateUserJwtToken`, {
            method: 'GET',
            headers: {
              authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.statusText}`);
          }

          const userData = await res.json();

          resolve(userData?.user);
        } else {
          throw new Error('User is not authenticated in api');
        }
      } catch (error) {
        reject(error);
      } finally {
        // clean up the listener when the component unmounts
        unsubscribe();
      }
    });
  });
};

