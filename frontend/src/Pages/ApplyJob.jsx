import React, { useState } from "react";
import {
    ArrowLeft,
    BriefcaseBusiness,
    FileText,
    Upload,
    CheckCircle2,
} from "lucide-react";

import { useNavigate, useParams } from "react-router";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Badge } from "@/Components/ui/badge";

import { useLocation } from 'react-router'
import { useSelector } from "react-redux";



const candidate = {
    fullName: "Dinesh Tamang",
    email: "dinesh@example.com",
    resume: "Dinesh_Tamang_CV.pdf",
};


export default function ApplyJob() {



    const navigate = useNavigate();

    const { jobId } = useParams();

    const [resume, setResume] = useState(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [submitted, setSubmitted] = useState(false)

    

    let location = useLocation()
    const title = location.state.title
    const companyName = location.state.companyName
    const joblocation = location.state.location
    const jobduration = location.state.jobduration



    const job = {
        title: title,
        company: companyName,
        location: joblocation,
        jobType: jobduration,
    };



    const handleResumeChange = (e) => {

        const file = e.target.files?.[0];

        if (!file) return;

        setResume(file);
    };



    const handleSubmit = async (e) => {

        e.preventDefault();

        setIsSubmitting(true);

        try {


            const formData = new FormData();

            formData.append("job", jobId);

            if (resume) {
                formData.append("resume", resume);
            }

            console.log("Application data:", {
                job: jobId,
                resume,
            });

            await new Promise((resolve) =>
                setTimeout(resolve, 800)
            );

            setSubmitted(true);

        } catch (error) {

            console.error(
                "Application failed:",
                error
            );

        } finally {

            setIsSubmitting(false);

        }
    };



    if (submitted) {

        return (

            <div className="min-h-screen bg-muted/30 p-6">

                <div className="mx-auto flex min-h-[80vh] max-w-xl items-center justify-center">

                    <Card className="w-full">

                        <CardContent className="flex flex-col items-center p-10 text-center">

                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">

                                <CheckCircle2
                                    className="h-8 w-8 text-green-600"
                                />

                            </div>


                            <h1 className="mt-5 text-2xl font-bold">
                                Application Submitted!
                            </h1>


                            <p className="mt-2 text-sm text-muted-foreground">
                                Your application for{" "}
                                <span className="font-medium text-foreground">
                                    {job.title}
                                </span>{" "}
                                at{" "}
                                <span className="font-medium text-foreground">
                                    {job.company}
                                </span>{" "}
                                has been submitted successfully.
                            </p>


                            <div className="mt-6 flex gap-3">

                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        navigate("/applications")
                                    }
                                >
                                    View Applications
                                </Button>


                                <Button
                                    onClick={() =>
                                        navigate("/jobs")
                                    }
                                >
                                    Browse Jobs
                                </Button>

                            </div>

                        </CardContent>

                    </Card>

                </div>

            </div>

        );
    }


    return (

        <div className="min-h-screen bg-muted/30 p-6">

            <div className="mx-auto max-w-3xl space-y-6">



                {/* Back */}


                <Button
                    variant="ghost"
                    className="gap-2"
                    onClick={() =>
                        navigate(`/jobs/${jobId}`)
                    }
                >

                    <ArrowLeft className="h-4 w-4" />

                    Back to Job

                </Button>


                {/* Job Summary */}


                <Card>

                    <CardContent className="p-6">

                        <div className="flex items-start gap-4">

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">

                                <BriefcaseBusiness
                                    className="h-6 w-6 text-primary"
                                />

                            </div>


                            <div>

                                <h1 className="text-xl font-bold">
                                    Apply for {job.title}
                                </h1>

                                <p className="mt-1 text-sm font-medium text-muted-foreground">
                                    {job.company}
                                </p>


                                <div className="mt-3 flex flex-wrap gap-2">

                                    <Badge variant="secondary">
                                        {job.location}
                                    </Badge>

                                    <Badge variant="secondary">
                                        {job.jobType}
                                    </Badge>

                                </div>

                            </div>

                        </div>

                    </CardContent>

                </Card>



                {/* Application Form */}


                <Card>

                    <CardHeader>

                        <CardTitle>
                            Your Information
                        </CardTitle>

                    </CardHeader>


                    <CardContent>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >


                            {/* Full Name */}


                            <div className="space-y-2">

                                <label className="text-sm font-medium">
                                    Full Name
                                </label>

                                <Input
                                    value={candidate.fullName}
                                    disabled
                                    className="bg-muted"
                                />

                            </div>



                            {/* Email */}


                            <div className="space-y-2">

                                <label className="text-sm font-medium">
                                    Email
                                </label>

                                <Input
                                    value={candidate.email}
                                    disabled
                                    className="bg-muted"
                                />

                            </div>



                            {/* Resume */}


                            <div className="space-y-3">

                                <label className="text-sm font-medium">
                                    Resume
                                </label>


                                {/* Existing resume */}

                                {!resume && candidate.resume && (

                                    <div className="flex items-center justify-between rounded-lg border p-4">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">

                                                <FileText
                                                    className="h-5 w-5 text-primary"
                                                />

                                            </div>

                                            <div>

                                                <p className="text-sm font-medium">
                                                    {candidate.resume}
                                                </p>

                                                <p className="text-xs text-muted-foreground">
                                                    Your saved resume
                                                </p>

                                            </div>

                                        </div>


                                        <label>

                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >

                                                <span>
                                                    Change
                                                </span>

                                            </Button>

                                            <input
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                onChange={handleResumeChange}
                                                className="hidden"
                                            />

                                        </label>

                                    </div>

                                )}


                                {/* New resume */}

                                {(!candidate.resume || resume) && (

                                    <label
                                        className="
                      flex
                      cursor-pointer
                      flex-col
                      items-center
                      justify-center
                      rounded-lg
                      border-2
                      border-dashed
                      p-8
                      text-center
                      transition
                      hover:bg-muted/50
                    "
                                    >

                                        <Upload className="h-7 w-7 text-muted-foreground" />

                                        <p className="mt-3 text-sm font-medium">

                                            {resume
                                                ? resume.name
                                                : "Upload your resume"}

                                        </p>

                                        <p className="mt-1 text-xs text-muted-foreground">
                                            PDF, DOC or DOCX
                                        </p>

                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleResumeChange}
                                            className="hidden"
                                        />

                                    </label>

                                )}

                            </div>



                            {/* Submit */}


                            <div className="flex justify-end gap-3 border-t pt-6">

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() =>
                                        navigate(`/jobs/${jobId}`)
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
                                        ? "Submitting..."
                                        : "Submit Application"}

                                </Button>

                            </div>

                        </form>

                    </CardContent>

                </Card>

            </div>

        </div>

    );
}