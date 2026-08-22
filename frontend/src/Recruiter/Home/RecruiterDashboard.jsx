import {
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  TrendingUp,
  FileSearch,
  Bookmark,
  ArrowUpRight,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/Components/ui/card";

import { Button } from "@/Components/ui/button";

import { useNavigate } from "react-router";



const dashboardStats = {
  applications: 48,
  pendingInterviews: 12,
  completedInterviews: 21,
  averageScore: 82,
  atsScore: 87,
  savedJobs: 15,
};



function StatCard({
  title,
  value,
  description,
  icon: Icon,
  onClick,
}) {
  return (
    <Card
      onClick={onClick}
      className={`border-none shadow-sm transition-all ${
        onClick
          ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-md"
          : ""
      }`}
    >
      <CardContent className="p-5">

        <div className="flex items-start justify-between">

          
          <div className="min-w-0">

            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>

            <p className="mt-2 text-2xl font-bold tracking-tight">
              {value}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              {description}
            </p>

          </div>


          
          <div className="shrink-0 rounded-xl bg-primary/10 p-3">

            <Icon className="h-5 w-5 text-primary" />

          </div>

        </div>

      </CardContent>
    </Card>
  );
}


// --------------------------------------------------
// Recruiter Dashboard
// --------------------------------------------------

export default function RecruiterDashboard() {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-muted/30 p-6">

      <div className="mx-auto max-w-7xl space-y-6">

        {/* ---------------------------------------- */}
        {/* Header */}
        {/* ---------------------------------------- */}

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>

            <h1 className="text-2xl font-bold tracking-tight">
              Welcome back, Recruiter 👋
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Here's an overview of your hiring activity.
            </p>

          </div>


          <Button
            onClick={() => navigate("/recruiter/jobs/create")}
            className="gap-2"
          >
            <BriefcaseBusiness className="h-4 w-4" />
            Post New Job
          </Button>

        </div>


        {/* ---------------------------------------- */}
        {/* Stat Cards */}
        {/* ---------------------------------------- */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

          {/* Applications */}

          <StatCard
            title="Applications"
            value={dashboardStats.applications}
            description="Total applications"
            icon={BriefcaseBusiness}
            onClick={() =>
              navigate("/recruiter/applications")
            }
          />


          {/* Pending Interviews */}

          <StatCard
            title="Pending Interviews"
            value={dashboardStats.pendingInterviews}
            description="Waiting for answers"
            icon={CalendarClock}
            onClick={() =>
              navigate("/recruiter/interviews?status=pending")
            }
          />


        

          <StatCard
            title="Completed Interviews"
            value={dashboardStats.completedInterviews}
            description="Answered or reviewed"
            icon={CheckCircle2}
            onClick={() =>
              navigate("/recruiter/interviews?status=completed")
            }
          />


         
          <StatCard
            title="Average Score"
            value={`${dashboardStats.averageScore}%`}
            description="Across all answers"
            icon={TrendingUp}
            onClick={() =>
              navigate("/recruiter/interviews")
            }
          />


       

          <StatCard
            title="Resume ATS Score"
            value={`${dashboardStats.atsScore}%`}
            description="Candidate resume match"
            icon={FileSearch}
            onClick={() =>
              navigate("/recruiter/applications")
            }
          />


          

          <StatCard
            title="Saved Jobs"
            value={dashboardStats.savedJobs}
            description="Saved job postings"
            icon={Bookmark}
            onClick={() =>
              navigate("/recruiter/jobs/saved")
            }
          />

        </div>


        {/* ---------------------------------------- */}
        {/* Quick Actions */}
        {/* ---------------------------------------- */}

        <div className="grid gap-6 md:grid-cols-3">

          <Card className="border-none shadow-sm">

            <CardContent className="p-6">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-muted-foreground">
                    Applications
                  </p>

                  <h3 className="mt-2 text-lg font-semibold">
                    Review Candidates
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Review recent applications and candidate profiles.
                  </p>

                </div>

                <ArrowUpRight className="h-5 w-5 text-muted-foreground" />

              </div>


              <Button
                variant="outline"
                className="mt-5 w-full"
                onClick={() =>
                  navigate("/recruiter/applications")
                }
              >
                View Applications
              </Button>

            </CardContent>

          </Card>


          <Card className="border-none shadow-sm">

            <CardContent className="p-6">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-muted-foreground">
                    Interviews
                  </p>

                  <h3 className="mt-2 text-lg font-semibold">
                    Review Interviews
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Evaluate candidate answers and interview scores.
                  </p>

                </div>

                <ArrowUpRight className="h-5 w-5 text-muted-foreground" />

              </div>


              <Button
                variant="outline"
                className="mt-5 w-full"
                onClick={() =>
                  navigate("/recruiter/interviews")
                }
              >
                View Interviews
              </Button>

            </CardContent>

          </Card>


          <Card className="border-none shadow-sm">

            <CardContent className="p-6">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-muted-foreground">
                    Jobs
                  </p>

                  <h3 className="mt-2 text-lg font-semibold">
                    Manage Job Posts
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Create, edit and manage your job openings.
                  </p>

                </div>

                <ArrowUpRight className="h-5 w-5 text-muted-foreground" />

              </div>


              <Button
                variant="outline"
                className="mt-5 w-full"
                onClick={() =>
                  navigate("/recruiter/jobs")
                }
              >
                Manage Jobs
              </Button>

            </CardContent>

          </Card>

        </div>

      </div>

    </div>
  );
}