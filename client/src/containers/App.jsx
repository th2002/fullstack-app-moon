import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Layout, AdminLayout, AuthLayout } from 'layouts/.';
import { Home, UserProfile, AdminHome, Authentication } from 'pages/.';

const App = () => {
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

