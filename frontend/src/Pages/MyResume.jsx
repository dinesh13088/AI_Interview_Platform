import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function MyResume() {
  const resumeUrl = useSelector(state => state.auth.candidate.cv_url);
  const fullUrl = `http://localhost:8000${resumeUrl}`;
  const [blobUrl, setBlobUrl] = useState(null);

  useEffect(() => {
    let objectUrl;
    fetch(fullUrl)
      .then(res => res.blob())
      .then(blob => {
        objectUrl = URL.createObjectURL(blob);
        setBlobUrl(objectUrl);
      })
      .catch(err => console.error('Failed to load PDF:', err));

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [fullUrl]);

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-100">
      <div className="bg-white shadow-md px-6 py-3 flex items-center justify-between flex-shrink-0">
        <h1 className="text-xl font-semibold text-slate-800">📄 Resume Viewer</h1>
        <a href={fullUrl} download className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition text-sm">
          ⬇️ Download
        </a>
      </div>
      <div className="flex-1 w-full bg-white">
        {blobUrl ? (
          <embed src={blobUrl} type="application/pdf" className="w-full h-full" />
        ) : (
          <p className="p-4 text-slate-500">Loading resume...</p>
        )}
      </div>
    </div>
  );
}

export default MyResume;