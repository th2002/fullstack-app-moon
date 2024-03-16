import { auth } from 'config/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
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

export const saveAppDataToCloud = async data => {
  try {
    const res = await fetch(`${baseURL}/createNewApp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      toast.error('Failed to create an app');
    }

    const resData = await res.json();
    return resData;
  } catch (error) {
    toast.error('Error: ', error.message);
  }
};

export const getAllAppsFromTheCloud = async () => {
  try {
    const res = await fetch(`${baseURL}/getAllApps`);

    if (!res.ok) {
      toast.error('Failed to fetch apps');
    }

    const resData = await res.json();
    return resData;
  } catch (error) {
    toast.error('Error: ', error.message);
  }
};

export const deleteAnAppFromCloud = async id => {
  try {
    const res = await fetch(`${baseURL}/deleteAnApp?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) toast.error('Failed to delete an app');

    const message = await res.json();
    return message;
  } catch (error) {
    toast.error('Error: ', error.message);
  }
};

export const getAppUsersFromTheCloud = async () => {
  try {
    const res = await fetch(`${baseURL}/getAllUsers`);

    if (!res.ok) {
      toast.error('Failed to fetch users');
    }

    const resData = await res.json();
    return resData;
  } catch (error) {
    toast.error('Error: ', error.message);
  }
};

export const updateUserDataToCloud = async data => {
  try {
    const res = await fetch(`${baseURL}/updateTheUserRole`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      toast.error('Failed to update user');
    }

    const resData = await res.json();
    return resData;
  } catch (error) {
    toast.error('Error: ', error.message);
  }
};
