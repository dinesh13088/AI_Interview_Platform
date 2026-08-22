import { useState } from "react";
import { ArrowLeft, BriefcaseBusiness } from "lucide-react";
import { useNavigate } from "react-router";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/Components/ui/card";

import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { useSelector } from "react-redux";


import {jobs} from "@/api/user.api";

export default function RecruiterJobs() {
  const navigate = useNavigate();
  const id=useSelector((state)=>state.rAuth.company.id)
  const accessToken=useSelector((state)=>state.rAuth.accessToken)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company:id
  });

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);



  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };



  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Job title is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description =
        "Job description is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  //submit

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {

      console.log("Job data:", formData);

      const reponse=await jobs(formData,accessToken)
      if(reponse?.data)
      {
        console.log("jobs created ")
        setFormData((prev)=>({title:'',description:'',company:''}))
      }
      

    } catch (error) {
      console.error("Failed to create job:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 p-6">

      <div className="mx-auto max-w-4xl">

      
        {/* Back button */}
        
        <Button
          variant="ghost"
          className="mb-4 gap-2"
          onClick={() =>
            navigate("rdashboard")
          }
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>


       {/* card */}

        <Card>

          <CardHeader className="border-b">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">

                <BriefcaseBusiness className="h-6 w-6 text-primary" />

              </div>

              <div>

                <CardTitle className="text-xl">
                  Create New Job
                </CardTitle>

                <CardDescription className="mt-1">
                  Post a new job opportunity for candidates.
                </CardDescription>

              </div>

            </div>

          </CardHeader>


          <CardContent className="p-6">

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

       
              {/* Job Title */}
              

              <div className="space-y-2">

                <label
                  htmlFor="title"
                  className="text-sm font-medium"
                >
                  Job Title
                  <span className="ml-1 text-destructive">
                    *
                  </span>
                </label>

                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Backend Developer"
                  className={
                    errors.title
                      ? "border-destructive"
                      : ""
                  }
                />

                {errors.title && (
                  <p className="text-sm text-destructive">
                    {errors.title}
                  </p>
                )}

              </div>


          
              {/* Description */}
             

              <div className="space-y-2">

                <label
                  htmlFor="description"
                  className="text-sm font-medium"
                >
                  Job Description
                  <span className="ml-1 text-destructive">
                    *
                  </span>
                </label>

                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder={`Describe the job role, responsibilities, requirements, and qualifications...

Example:

We are looking for a Backend Developer to join our team.

Responsibilities:
- Develop REST APIs
- Work with Django and PostgreSQL
- Collaborate with frontend developers

Requirements:
- Python knowledge
- Django/Django REST Framework
- Database knowledge`}
                  className={`min-h-300px resize-y ${
                    errors.description
                      ? "border-destructive"
                      : ""
                  }`}
                />

                <div className="flex justify-between">

                  {errors.description ? (
                    <p className="text-sm text-destructive">
                      {errors.description}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Include responsibilities, requirements,
                      qualifications, and other relevant details.
                    </p>
                  )}

                  <p className="text-xs text-muted-foreground">
                    {formData.description.length} characters
                  </p>

                </div>

              </div>


             
              {/* Buttons */}
              

              <div className="flex justify-end gap-3 border-t pt-6">

                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    navigate("/recruiter/jobs")
                  }
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Posting..."
                    : "Post Job"}
                </Button>

              </div>

            </form>

          </CardContent>

        </Card>

      </div>

    </div>
  );
}
