"use client";
import React from "react";
import { IconCloud } from "../../components/ui/icon-cloud";

const slugs = [
  "appier",
  "appsflyer",
  "clevertap",
  "jira",
  "moengage",
  "netcore",
  "optimove", 
  "salesforce",
  "servicenow",
  "smartsheet",
  "unica",
  "vtiger",
  "zoho"
];

export function ToolsCloud() {
  // Ensure proper path to your logo images
  const images = slugs.map((slug) => `/icons/${slug}.svg`);

  return (
    <div className="w-full flex justify-center items-center p-4">
      <IconCloud images={images} size={500} />
    </div>
  );
}