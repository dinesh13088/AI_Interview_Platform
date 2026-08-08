import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCanididate } from "../store/CanidateSlice";
import {createCandidate} from "../api/auth.api"
import { useNavigate } from "react-router";


function RegisterCandidate() {
  const [cvName, setCvName] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formData,setFormData]=useState({
    'first_name':'',
    'last_name':'',
    'phone_number':'',
    'linkedin_url':'',
    'upload_cv':null,
    'picture':null
    
  })
  const dispatch=useDispatch()
  const accessToken=useSelector((state)=>(state.candidate.accessToken))
  const navigate=useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try{
      console.log(accessToken)
      const response =await createCandidate(formData,accessToken)
      const { upload_cv, picture, ...serializableData } = formData
      dispatch(setCanididate(serializableData))
     
    if (response.data)
    {
      setSubmitted(true);
      navigate("/home")
      
    }
    }
    catch(error)
    {
      console.error(error)
    }
  };

  const inputClass =
    "w-full px-3 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-sm placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700/30 focus:border-teal-700";
  const labelClass = "block mb-2 text-xs font-semibold tracking-wide uppercase text-slate-500";

  if (submitted) {
    return (
      <div className="min-h-full flex items-center justify-center p-6 bg-stone-100">
        <div className="max-w-sm w-full bg-white border border-slate-200 rounded-sm p-10 text-center shadow-sm">
          <p className="text-xs tracking-[0.2em] uppercase text-teal-800 font-semibold mb-2">Application received</p>
          <h1 className="font-serif text-2xl text-slate-900 mb-3">Thanks for applying.</h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            We've logged your file and will be in touch at the contact details you provided.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-8 text-sm font-medium text-teal-800 hover:text-teal-900 underline underline-offset-4"
          >
            Back to form
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
          <h1 className="font-serif text-3xl text-slate-900 tracking-tight">Candidate Registration</h1>
          <p className="text-sm text-slate-500 mt-2">Tell us about yourself and attach your documents.</p>
        </div>

        <div className="px-8 py-8 space-y-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="first_name" className={labelClass}>First name</label>
              <input id="first_name" type="text" placeholder="John" required className={inputClass} value={formData.first_name} onChange={(e) => setFormData((prev) => ({ ...prev, first_name: e.target.value }))} />
            </div>
            <div>
              <label htmlFor="last_name" className={labelClass}>Last name</label>
              <input id="last_name" type="text" placeholder="Doe" required className={inputClass} value={formData.last_name} onChange={(e)=>setFormData((prev)=>({...prev,last_name:e.target.value}))} />
            </div>
            <div>
              <label htmlFor="phone" className={labelClass} >Phone number</label>
              <input
                id="phone"
                type="tel"
                placeholder="123-45-678"
                pattern="[0-9]{10}"
                required
                className={inputClass}
                value={formData.phone_number}
                onChange={(e)=>setFormData((prev)=>({...prev,phone_number:e.target.value}))}
              />
            </div>
            <div>
              <label htmlFor="linkedin" className={labelClass}>LinkedIn URL</label>
              <input id="linkedin" type="url" placeholder="linkedin.com/in/janedoe" required className={inputClass} value={formData.linkedin_url} onChange={(e)=>setFormData((prev)=>({...prev,linkedin_url:e.target.value}))}/>
            </div>
          </div>

          <div>
            <label htmlFor="cv-file" className={labelClass}>Upload CV</label>
            <label
              htmlFor="cv-file"
              className="flex flex-col items-center justify-center w-full h-36 bg-stone-50 border border-dashed border-slate-300 rounded-sm cursor-pointer hover:bg-stone-100 transition-colors"
            >
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-800">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {cvName || "PDF or DOCX, max 10MB"}
              </p>
            </label>
            <input
              id="cv-file"
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e)=> { 
                const file=e.target.files?.[0]
                if (file)
                {
                   setCvName(file.name || "")
                   setFormData(prev=>({...prev,upload_cv:file}))

                }
               
              }}
            />
          </div>

          <div>
            <label htmlFor="photo-file" className={labelClass}>Upload profile photo</label>
            <label
              htmlFor="photo-file"
              className="flex flex-col items-center justify-center w-full h-36 bg-stone-50 border border-dashed border-slate-300 rounded-sm cursor-pointer hover:bg-stone-100 transition-colors"
            >
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-800">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {photoName || "JPG, PNG or GIF, max 30MB"}
              </p>
            </label>
            <input
              id="photo-file"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                {
                  const file=e.target.files?.[0]
                  if (file)
                  {
                    setPhotoName(file.name || "")
                    setFormData(prev=>({...prev,picture:file}))

                  }
                }}
            />
          </div>

          <label htmlFor="agree" className="flex items-start gap-3 cursor-pointer select-none">
            <input id="agree" type="checkbox" required className="mt-0.5 w-4 h-4 rounded-xs border border-slate-300 text-teal-800 focus:ring-2 focus:ring-teal-700/30" />
            <span className="text-sm text-slate-600">
              I agree with the <a href="#" onClick={(e) => e.preventDefault()} className="text-teal-800 hover:underline">terms and conditions</a>.
            </span>
          </label>
        </div>

        <div className="px-8 py-6 border-t border-slate-200 flex justify-end">
          <button
            type="submit"
            className="bg-teal-800 hover:bg-teal-900 text-white text-sm font-medium px-5 py-2.5 rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-teal-700/40"
          >
            Submit application
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterCandidate;