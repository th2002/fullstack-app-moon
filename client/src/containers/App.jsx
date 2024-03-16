import React, { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';

import { Layout, AdminLayout, AuthLayout } from 'layouts/.';
import {
  Home,
  UserProfile,
  AdminHome,
  Authentication,
  AdminApps,
  AdminUsers
} from 'pages/.';

import 'react-toastify/dist/ReactToastify.css';
import { MainLoader } from 'components';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<MainLoader />}>
        <Routes>
          {/* Client User layout */}
          <Route element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/profile/:id" element={<UserProfile />}></Route>
          </Route>

          {/* Admin User layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="home" element={<AdminHome />}></Route>
            <Route path="apps" element={<AdminApps />}></Route>
            <Route path="users" element={<AdminUsers />}></Route>
          </Route>

          {/* Auth layout */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Authentication />}></Route>
          </Route>
        </Routes>
      </Suspense>

      {/* enable React Query Devtools to handle the state library */}
      <ReactQueryDevtools initialIsOpen={false} />

      <ToastContainer position="top-right" theme="dark" />
    </QueryClientProvider>
  );
};

export default App;

