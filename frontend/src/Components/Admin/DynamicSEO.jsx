// src/components/DynamicSEO.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import seoConfig from "./seoConfig";

const DynamicSEO = () => {
  const location = useLocation();
  const path = location.pathname === "/" ? "/" : location.pathname;
  const seoData = seoConfig[path] || seoConfig["/"];
  console.log(seoData);
  return (
    <Helmet>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords} />
    </Helmet>
  );
};

export default DynamicSEO;
