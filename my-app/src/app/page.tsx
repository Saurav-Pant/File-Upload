"use client";

import { UploadButton } from "../utils/uploadthing";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'

const FileUploader: React.FC = () => {
  const [Content, setContent] = useState("");
  const [fileLink, setFileLink] = useState<string>();
  const router = useRouter()

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (!Content || !fileLink) {
        alert("Please provide both Content and fileLink before submitting.");
        return;
      }

      const response = await fetch("/api/FileUpload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Content,
          fileLink,
        }),
      });

      if (response.ok) {
        router.push("/Dashboard")
      } else {
        alert(`Submission failed. Status: ${response.status}`);
      }
    } catch (error: any) {
      alert(`Error during submission: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 border rounded-md">
        <div className="mb-4">
          <label
            htmlFor="fileName"
            className="block text-sm font-medium text-gray-700"
          >
            File Name
          </label>
          <input
            type="text"
            id="fileName"
            name="fileName"
            value={Content}
            className="mt-1 p-2 border rounded-md w-full"
            onChange={handleContentChange}
          />
        </div>
        <div>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Url: ", res[0].url);
              setFileLink(res[0].url);
              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded-md"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FileUploader;
