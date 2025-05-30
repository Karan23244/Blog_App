import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import ProtectedRoute from "./common/ProtectedRoute";
import PageNotFound from "./common/PageNotFound";
import Unauthorized from "./common/Unauthorized";
import UserHome from "./Components/User/UserHome";
import Disclaimer from "./common/Disclaimer";
import Privacy_Policy from "./common/Privacy_Policy";
import About_us from "./common/About_Us";
import Terms_and_Condition from "./common/Terms_and_Condition";
import CategoryBlogs from "./Components/User/CategoryBlogs";
import Subscribe from "./common/Subscribe";
import Popup from "./common/Popup";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./common/ScrollToTop";
import RouteHandler from './RouteHandler'
// Lazy loading components for Admin
const AdminLogin = React.lazy(() => import("./Components/Admin/AdminLogin"));
const Admin = React.lazy(() => import("./Components/Admin/Admin"));
const FullPostAdmin = React.lazy(() =>
  import("./Components/Admin/AdminPosts/FullPosts")
); // If different
const CategoriesTable = React.lazy(() =>
  import("./Components/Admin/Categories")
);
const Authors = React.lazy(() => import("./Components/Admin/Authors"));
const EditPost = React.lazy(() =>
  import("./Components/Admin/New_Post/NewPost")
);

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop/>
        <Suspense fallback={<div>Loading public content...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/admin/home" /> : <AdminLogin />
              }
            />
            {/* <Route path="/adminlogin" element={<AdminLogin />} /> */}
            {/* <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/privacy_policy" element={<Privacy_Policy />} />
            <Route
              path="/terms_and_condition"
              element={<Terms_and_Condition />}
            />
            <Route path="/About_us" element={<About_us />} /> */}
            {/* <Route path="/:param1/:param2" element={<FullPostAdmin />} /> */}
          {/* <Route path="/:param1/:param2" element={<CategoryBlogs />} />
            <Route
              path="/:param1/:param2"
              element={<RouteHandler />}
            /> */}

            {/* Admin Routes - Protected */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<div>Loading admin section...</div>}>
                    <Routes>
                      <Route path="home" element={<Admin />} />
                      <Route path="category" element={<CategoriesTable />} />
                      <Route path="edit-post/:id" element={<EditPost />} />
                      <Route path="authors" element={<Authors />} />
                      {/* Add admin-specific FullPost if necessary */}
                    </Routes>
                  </Suspense>
                </ProtectedRoute>
              }
            />

            {/* Catch-all for undefined routes */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
        {/* <Subscribe /> */}
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
