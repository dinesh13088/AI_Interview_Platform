
import { useNavigate } from "react-router";
import {
    UserRound,
    BriefcaseBusiness,
    ArrowRight,
} from "lucide-react";

export default function RoleChooser() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background">

            {/* Header */}
            <header className="border-b">
                <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
                    <h1 className="text-xl font-bold tracking-tight">
                        AI Interview Platform
                    </h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">

                <div className="w-full max-w-4xl">

                    {/* Heading */}
                    <div className="mb-10 text-center">

                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Welcome to AI Interview Platform
                        </h2>

                        <p className="mt-3 text-muted-foreground">
                            Choose how you want to continue
                        </p>

                    </div>


                    {/* Role Cards */}
                    <div className="grid gap-6 md:grid-cols-2">

                        {/* Candidate */}
                        <button
                            type="button"
                            onClick={() => navigate("/candidate-login")}
                            className="group rounded-2xl border bg-card p-8 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
                        >

                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                                <UserRound className="h-7 w-7 text-primary" />
                            </div>

                            <h3 className="text-2xl font-semibold">
                                Candidate
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                Find jobs, apply to positions, take AI-powered interviews,
                                and track your interview performance.
                            </p>

                            <div className="mt-6 flex items-center font-medium text-primary">

                                Continue as Candidate

                                <ArrowRight
                                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                                />

                            </div>

                        </button>


                        {/* Recruiter */}
                        <button
                            type="button"
                            onClick={() => navigate("/recruiter-login")}
                            className="group rounded-2xl border bg-card p-8 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
                        >

                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                                <BriefcaseBusiness className="h-7 w-7 text-primary" />
                            </div>

                            <h3 className="text-2xl font-semibold">
                                Recruiter
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                Post jobs, manage applications, review candidates,
                                and evaluate AI interview results.
                            </p>

                            <div className="mt-6 flex items-center font-medium text-primary">

                                Continue as Recruiter

                                <ArrowRight
                                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                                />

                            </div>

                        </button>

                    </div>

                </div>

            </main>

        </div>
    );
}

