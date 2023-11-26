"use client";
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [fileData, setFileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/FileUpload')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setFileData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error);
      });
  }, []);

  if (error) {
    return (
      <div className="container mx-auto my-8">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8">
      {fileData && fileData.Note && Array.isArray(fileData.Note) ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fileData.Note.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <p className="text-lg font-bold mb-2">{item.Content}</p>
              <img
                src={item.fileLink}
                alt=""
                className="w-full h-auto rounded-md"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500">No data available</div>
      )}
    </div>
  );
};

export default Page;
