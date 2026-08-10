// components/Success.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recruiter, companyName } = location.state.recruiter || {};
  const user = useSelector((state) => state.recruiter.user);

  return (
    <div className="min-h-full flex items-center justify-center p-6 bg-stone-100">
      <div className="max-w-sm w-full bg-white border border-slate-200 rounded-sm p-10 text-center shadow-sm">
        <div className="text-4xl mb-3">🎉</div>
        <p className="text-xs tracking-[0.2em] uppercase text-teal-800 font-semibold mb-2">Registration Complete</p>
        <h1 className="font-serif text-2xl text-slate-900 mb-3">Success!</h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          {companyName && (
            <>Your recruiter profile for <span className="font-medium text-slate-700">{companyName}</span> has been created successfully.</>
          )}
          {!companyName && (
            <>Your recruiter profile has been created successfully.</>
          )}
        </p>
        
        {recruiter && (
          <div className="mt-6 p-4 bg-stone-50 border border-slate-200 rounded-sm text-left">
            <h3 className="text-xs font-semibold uppercase text-slate-500 mb-2">Recruiter Details</h3>
            <div className="space-y-1 text-sm">
              <p><span className="text-slate-500">Name:</span> {recruiter.first_name} {recruiter.last_name}</p>
              <p><span className="text-slate-500">Job Title:</span> {recruiter.job_title || 'N/A'}</p>
              <p><span className="text-slate-500">Phone:</span> {recruiter.phone_number || 'N/A'}</p>
              <p><span className="text-slate-500">LinkedIn:</span> {recruiter.linkedin_url || 'N/A'}</p>
            </div>
          </div>
        )}

        <div className="mt-8 space-y-3">
          <button
            onClick={() => navigate('/home')}
            className="w-full bg-teal-800 hover:bg-teal-900 text-white text-sm font-medium px-5 py-2.5 rounded-sm transition-colors"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate('/company-form')}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium px-5 py-2.5 rounded-sm transition-colors"
          >
            Add Another
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;