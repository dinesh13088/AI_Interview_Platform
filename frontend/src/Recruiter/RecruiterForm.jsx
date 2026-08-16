// components/RecruiterForm.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { recruiter } from '../api/user.api';
import { setRecruiter } from '../store/RecruiterSlice';

const RecruiterForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  
  
  const companyId = location.state?.companyId;
  const companyName = location.state?.companyName;

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    job_title: '',
    phone_number: '',
    linkedin_url: '',
    company: companyId || '' // Note: API expects 'company' not 'company_id'
  });

  useEffect(() => {
    if (!companyId) {
      navigate('/company-form', { 
        state: { error: 'Please create a company first' } 
      });
    }
  }, [companyId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!formData.first_name.trim()) {
      setError('First name is required');
      setLoading(false);
      return;
    }
    if (!formData.last_name.trim()) {
      setError('Last name is required');
      setLoading(false);
      return;
    }

    // Phone number validation (optional)
    if (formData.phone_number) {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(formData.phone_number)) {
        setError('Please enter a valid phone number');
        setLoading(false);
        return;
      }
    }

    // LinkedIn URL validation (optional)
    if (formData.linkedin_url) {
      const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w\-]+\/?$/;
      if (!linkedinRegex.test(formData.linkedin_url)) {
        setError('Please enter a valid LinkedIn URL');
        setLoading(false);
        return;
      }
    }

    try {
      // Prepare data for API
      const dataToSend = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        job_title: formData.job_title || '',
        phone_number: formData.phone_number || '',
        linkedin_url: formData.linkedin_url || '',
        company: parseInt(formData.company) // API expects 'company' field
      };

      const response = await recruiter(dataToSend,accessToken);
      
      if (response?.data) {
        // Store recruiter data in Redux
        dispatch(setRecruiter(response.data));
        
        setSubmitted(true);
        navigate('/success', {
          state: {
            recruiter: response.data,
            companyName: companyName
          }
        });
      }
    } catch (error) {
      console.error('Error creating recruiter:', error);
      setError(error?.response?.data?.message || 'Failed to create recruiter profile. Please try again.');
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
          <p className="text-xs tracking-[0.2em] uppercase text-teal-800 font-semibold mb-2">Profile Created</p>
          <h1 className="font-serif text-2xl text-slate-900 mb-3">Recruiter registered!</h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            {companyName && (
              <>Your recruiter profile for <span className="font-medium">{companyName}</span> has been created.</>
            )}
            {!companyName && (
              <>Your recruiter profile has been created successfully.</>
            )}
          </p>
          <button
            onClick={() => navigate('/rhome')}
            className="mt-8 text-sm font-medium text-teal-800 hover:text-teal-900 underline underline-offset-4"
          >
            Go to Dashboard →
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
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/company-form')}
              className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              ← Back
            </button>
            <h1 className="font-serif text-3xl text-slate-900 tracking-tight">Recruiter Profile</h1>
          </div>
          <p className="text-sm text-slate-500 mt-2">Enter the recruiter's details.</p>
        </div>

        {companyName && (
          <div className="mx-8 mt-6 bg-teal-50 border border-teal-200 rounded-sm p-4 flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold text-teal-800 uppercase">Company:</span>
            <span className="text-sm font-medium text-slate-900">{companyName}</span>
            <span className="text-xs bg-teal-200 text-teal-800 px-2 py-0.5 rounded-full">
              ID: #{companyId}
            </span>
          </div>
        )}

        {error && (
          <div className="mx-8 mt-6 bg-red-50 border border-red-200 rounded-sm p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="px-8 py-8 space-y-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="first_name" className={labelClass}>
                First name <span className="text-red-500">*</span>
              </label>
              <input
                id="first_name"
                type="text"
                placeholder="John"
                required
                className={inputClass}
                value={formData.first_name}
                onChange={(e) => setFormData((prev) => ({ ...prev, first_name: e.target.value }))}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="last_name" className={labelClass}>
                Last name <span className="text-red-500">*</span>
              </label>
              <input
                id="last_name"
                type="text"
                placeholder="Doe"
                required
                className={inputClass}
                value={formData.last_name}
                onChange={(e) => setFormData((prev) => ({ ...prev, last_name: e.target.value }))}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="job_title" className={labelClass}>Job Title</label>
              <input
                id="job_title"
                type="text"
                placeholder="Technical Talent Acquisition Lead"
                className={inputClass}
                value={formData.job_title}
                onChange={(e) => setFormData((prev) => ({ ...prev, job_title: e.target.value }))}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="phone_number" className={labelClass}>Phone Number</label>
              <input
                id="phone_number"
                type="tel"
                placeholder="+1 (555) 123-4567"
                className={inputClass}
                value={formData.phone_number}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone_number: e.target.value }))}
                disabled={loading}
              />
              <p className="text-xs text-slate-400 mt-1">Format: +1 (555) 123-4567</p>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="linkedin_url" className={labelClass}>LinkedIn URL</label>
              <input
                id="linkedin_url"
                type="url"
                placeholder="https://linkedin.com/in/username"
                className={inputClass}
                value={formData.linkedin_url}
                onChange={(e) => setFormData((prev) => ({ ...prev, linkedin_url: e.target.value }))}
                disabled={loading}
              />
              <p className="text-xs text-slate-400 mt-1">Example: https://linkedin.com/in/johndoe</p>
            </div>
          </div>

          {/* Hidden company field */}
          <input
            type="hidden"
            name="company"
            value={formData.company}
          />
        </div>

        <div className="px-8 py-6 border-t border-slate-200 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/company-form')}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium px-5 py-2.5 rounded-sm transition-colors"
            disabled={loading}
          >
            Previous Step
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
              'Create Profile ✓'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecruiterForm;