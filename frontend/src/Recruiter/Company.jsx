// components/CompanyForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { company } from '../api/user.api';
import { setRecruiter } from '../store/RecruiterSlice';

const CompanyForm = () => {
  console.log("CompanyForm mounted")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);
  
  const [logoName, setLogoName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    industry: '',
    logo: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!formData.name.trim()) {
      setError('Company name is required');
      setLoading(false);
      return;
    }

    try {
      // Prepare data for API - this will use FormData internally
      const dataToSend = {
        name: formData.name.trim(),
        website: formData.website || '',
        industry: formData.industry || '',
        logo: formData.logo // Will be handled by FormData in the API function
      };
      console.log(accessToken)

      const response = await company(dataToSend, accessToken);

      
      if (response?.data) {
        // Store company data in Redux
        dispatch(setRecruiter({ 
          ...response.data,
          company_id: response.data.company.id 
        }));
        
        setSubmitted(true);
        navigate('/recruiter-form', { 
          state: { 
            companyId: response.data.company.id,
            companyName: response.data.company.name 
          } 
        });
      }
    } catch (error) {
      console.error('Error creating company:', error);
      setError(error?.response?.data?.message || 'Failed to create company. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-3 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-sm placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700/30 focus:border-teal-700 disabled:bg-slate-50 disabled:cursor-not-allowed";
  const labelClass = "block mb-2 text-xs font-semibold tracking-wide uppercase text-slate-500";

  if (submitted) {
    return (
      <div className="min-h-full flex items-center justify-center p-6 bg-stone-100">
        <div className="max-w-sm w-full bg-white border border-slate-200 rounded-sm p-10 text-center shadow-sm">
          <p className="text-xs tracking-[0.2em] uppercase text-teal-800 font-semibold mb-2">Company Created</p>
          <h1 className="font-serif text-2xl text-slate-900 mb-3">Company registered!</h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Your company has been created. Now let's add a recruiter.
          </p>
          <button
            onClick={() => navigate('/recruiter-form')}
            className="mt-8 text-sm font-medium text-teal-800 hover:text-teal-900 underline underline-offset-4"
          >
            Add Recruiter →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-stone-100 py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-sm shadow-sm"
      >
        <div className="px-8 pt-8 pb-6 border-b border-slate-200">
          <h1 className="font-serif text-3xl text-slate-900 tracking-tight">Company Registration</h1>
          <p className="text-sm text-slate-500 mt-2">Enter your company details to get started.</p>
        </div>

        {error && (
          <div className="mx-8 mt-6 bg-red-50 border border-red-200 rounded-sm p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="px-8 py-8 space-y-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className={labelClass}>
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter company name"
                required
                className={inputClass}
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="website" className={labelClass}>Website</label>
              <input
                id="website"
                type="url"
                placeholder="https://example.com"
                className={inputClass}
                value={formData.website}
                onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="industry" className={labelClass}>Industry</label>
              <input
                id="industry"
                type="text"
                placeholder="e.g., Software / AI"
                className={inputClass}
                value={formData.industry}
                onChange={(e) => setFormData((prev) => ({ ...prev, industry: e.target.value }))}
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="logo-file" className={labelClass}>Company Logo</label>
            <label
              htmlFor="logo-file"
              className="flex flex-col items-center justify-center w-full h-36 bg-stone-50 border border-dashed border-slate-300 rounded-sm cursor-pointer hover:bg-stone-100 transition-colors"
            >
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-800">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {logoName || "JPG, PNG or GIF, max 5MB"}
              </p>
            </label>
            <input
              id="logo-file"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setLogoName(file.name || "");
                  setFormData(prev => ({ ...prev, logo: file }));
                }
              }}
              disabled={loading}
            />
          </div>
        </div>

        <div className="px-8 py-6 border-t border-slate-200 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium px-5 py-2.5 rounded-sm transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-teal-800 hover:bg-teal-900 text-white text-sm font-medium px-5 py-2.5 rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-teal-700/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </>
            ) : (
              'Continue to Recruiter →'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;