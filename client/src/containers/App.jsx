import React, { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Layout, AdminLayout, AuthLayout } from 'layouts/.';
import { Home, UserProfile, AdminHome, Authentication } from 'pages/.';
import { firebaseApp } from 'config/firebase.config';

const App = () => {
  useEffect(() => {
    const unsubrsibe = firebaseApp.auth.onAuthStateChanged(userCred => {
      if (userCred) {
        userCred.getIdToken().then(token => {
          console.log(token);
        });
      }
    });

    return () => unsubrsibe();
  }, [firebaseApp.auth]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Client User layout */}
        <Route element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="/profile/:id" element={<UserProfile />}></Route>
        </Route>

        {/* Admin User layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />}></Route>
        </Route>

        {/* Auth layout */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Authentication />}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;

