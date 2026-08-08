import {
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  FileText,
  Bookmark,
  TrendingUp,
  ArrowUpRight,
  Clock3,
  Star,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

import { Badge } from "@/Components/ui/badge";

import { Button } from "@/Components/ui/button";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { useNavigate } from "react-router";



const dashboardData = {
  applications: 12,
  pendingInterviews: 3,
  completedInterviews: 7,
  averageScore: 84,
  atsScore: 91,
  savedJobs: 8,
  acceptanceRate: 25,
};



const recentApplications = [
  {
    id: 1,
    jobTitle: "Backend Developer",
    company: "ABC Technologies",
    logo: "A",
    status: "interview_generated",
    appliedAt: "Aug 7, 2026",
  },
  {
    id: 2,
    jobTitle: "Machine Learning Engineer",
    company: "XYZ AI",
    logo: "X",
    status: "reviewed",
    appliedAt: "Aug 5, 2026",
  },
  {
    id: 3,
    jobTitle: "Python Developer",
    company: "Tech Solutions",
    logo: "T",
    status: "answered",
    appliedAt: "Aug 3, 2026",
  },
  {
    id: 4,
    jobTitle: "Django Developer",
    company: "Cloud Nepal",
    logo: "C",
    status: "pending",
    appliedAt: "Jul 30, 2026",
  },
];



const upcomingInterviews = [
  {
    id: 1,
    jobTitle: "Backend Developer",
    company: "ABC Technologies",
    questions: 8,
  },
  {
    id: 2,
    jobTitle: "Django Developer",
    company: "Cloud Nepal",
    questions: 10,
  },
];




const recentFeedback = [
  {
    jobTitle: "Machine Learning Engineer",
    score: 88,
    note: "Strong understanding of machine learning concepts and model evaluation.",
  },
  {
    jobTitle: "Python Developer",
    score: 82,
    note: "Good Python knowledge. Improve your explanation of asynchronous programming.",
  },
  {
    jobTitle: "Backend Developer",
    score: 79,
    note: "Good API design knowledge with room for improvement in system design.",
  },
];




const recommendedJobs = [
  {
    id: 1,
    title: "Python Developer",
    company: "Tech Solutions",
    skills: ["Python", "Django", "REST API"],
    location: "Kathmandu",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Cloud Nepal",
    skills: ["Django", "PostgreSQL", "Docker"],
    location: "Remote",
  },
  {
    id: 3,
    title: "AI Engineer",
    company: "AI Labs Nepal",
    skills: ["Python", "PyTorch", "Machine Learning"],
    location: "Kathmandu",
  },
];



const applicationsPerMonth = [
  { month: "Jan", applications: 2 },
  { month: "Feb", applications: 4 },
  { month: "Mar", applications: 3 },
  { month: "Apr", applications: 6 },
  { month: "May", applications: 5 },
  { month: "Jun", applications: 8 },
  { month: "Jul", applications: 12 },
  { month: "Aug", applications: 7 },
];


const applicationStatus = [
  {
    name: "Applied",
    value: 3,
  },
  {
    name: "Interview",
    value: 3,
  },
  {
    name: "Answered",
    value: 2,
  },
  {
    name: "Reviewed",
    value: 3,
  },
  {
    name: "Rejected",
    value: 1,
  },
];


const interviewScores = [
  {
    date: "Jul 01",
    score: 72,
  },
  {
    date: "Jul 05",
    score: 78,
  },
  {
    date: "Jul 10",
    score: 75,
  },
  {
    date: "Jul 15",
    score: 81,
  },
  {
    date: "Jul 20",
    score: 84,
  },
  {
    date: "Jul 25",
    score: 88,
  },
  {
    date: "Aug 01",
    score: 84,
  },
];


const statusColors = [
  "hsl(var(--primary))",
  "#8b5cf6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
];




const getStatusBadge = (status) => {
  switch (status) {
    case "interview_generated":
      return (
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
          Interview
        </Badge>
      );

    case "answered":
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          Answered
        </Badge>
      );

    case "reviewed":
      return (
        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
          Reviewed
        </Badge>
      );

    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
          Pending
        </Badge>
      );

    case "rejected":
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
          Rejected
        </Badge>
      );

    default:
      return <Badge>{status}</Badge>;
  }
};




function StatCard({
  title,
  value,
  description,
  icon: Icon,
}) {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-5">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight">
              {value}
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="rounded-xl bg-primary/10 p-3">
            <Icon className="h-5 w-5 text-primary" />
          </div>

        </div>

      </CardContent>
    </Card>
  );
}



export default function CandidateDashboard() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-muted/30 p-6">

      <div className="mx-auto max-w-7xl space-y-6">

       {/* header */}

        <div>

          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back, Dinesh 👋
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Here's what's happening with your job applications.
          </p>

        </div>


        {/* STAT CARDS */}
        

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

          <StatCard
            title="Applications"
            value={dashboardData.applications}
            description="Total applications"
            icon={BriefcaseBusiness}
          />

          <StatCard
            title="Pending Interviews"
            value={dashboardData.pendingInterviews}
            description="Waiting to complete"
            icon={CalendarClock}
          />

          <StatCard
            title="Completed Interviews"
            value={dashboardData.completedInterviews}
            description="Completed interviews"
            icon={CheckCircle2}
          />

          <StatCard
            title="Average Score"
            value={`${dashboardData.averageScore}%`}
            description="Interview performance"
            icon={TrendingUp}
          />

          <StatCard
            title="Resume ATS Score"
            value={`${dashboardData.atsScore}%`}
            description="Resume compatibility"
            icon={FileText}
          />

          <StatCard
            title="Saved Jobs"
            value={dashboardData.savedJobs}
            description="Jobs bookmarked"
            icon={Bookmark}
          />

        </div>


      
        {/* RECENT APPLICATIONS + UPCOMING INTERVIEWS */}
       

        <div className="grid gap-6 lg:grid-cols-2">

          {/* Recent Applications */}

          <Card>

            <CardHeader className="flex flex-row items-center justify-between">

              <CardTitle className="text-lg">
                Recent Applications
              </CardTitle>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/applications")}
              >
                View all
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>

            </CardHeader>

            <CardContent className="space-y-4">

              {recentApplications.map((application) => (

                <div
                  key={application.id}
                  onClick={() =>
                    navigate(`/applications/${application.id}`)
                  }
                  className="flex cursor-pointer items-center justify-between rounded-xl border p-3 transition hover:bg-muted/50"
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-semibold text-primary">
                      {application.logo}
                    </div>

                    <div>

                      <p className="font-medium">
                        {application.jobTitle}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {application.company}
                      </p>

                    </div>

                  </div>


                  <div className="text-right">

                    {getStatusBadge(application.status)}

                    <p className="mt-1 text-xs text-muted-foreground">
                      {application.appliedAt}
                    </p>

                  </div>

                </div>

              ))}

            </CardContent>

          </Card>


          {/* Upcoming Interviews */}

          <Card>

            <CardHeader>

              <CardTitle className="text-lg">
                Upcoming Interviews
              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-4">

              {upcomingInterviews.map((interview) => (

                <div
                  key={interview.id}
                  className="rounded-xl border p-4"
                >

                  <div className="flex items-start justify-between">

                    <div>

                      <h3 className="font-semibold">
                        {interview.jobTitle}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        {interview.company}
                      </p>

                    </div>

                    <Clock3 className="h-5 w-5 text-muted-foreground" />

                  </div>


                  <div className="mt-4 flex items-center justify-between">

                    <span className="text-xs text-muted-foreground">
                      {interview.questions} questions
                    </span>

                    <Button
                      size="sm"
                      onClick={() =>
                        navigate(`/interview/${interview.id}`)
                      }
                    >
                      Start Interview
                    </Button>

                  </div>

                </div>

              ))}

            </CardContent>

          </Card>

        </div>


        {/* FEEDBACK + RECOMMENDED JOBS */}
       

        <div className="grid gap-6 lg:grid-cols-2">

          {/* Recent Feedback */}

          <Card>

            <CardHeader>

              <CardTitle className="text-lg">
                Recent Feedback
              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-4">

              {recentFeedback.map((feedback, index) => (

                <div
                  key={index}
                  className="rounded-xl border p-4"
                >

                  <div className="flex items-center justify-between">

                    <h3 className="font-medium">
                      {feedback.jobTitle}
                    </h3>

                    <div className="flex items-center gap-1 font-semibold">

                      <Star className="h-4 w-4 fill-current" />

                      {feedback.score}/100

                    </div>

                  </div>

                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {feedback.note}
                  </p>

                </div>

              ))}

            </CardContent>

          </Card>


          {/* Recommended Jobs */}

          <Card>

            <CardHeader className="flex flex-row items-center justify-between">

              <CardTitle className="text-lg">
                Recommended Jobs
              </CardTitle>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/jobs")}
              >
                View jobs
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>

            </CardHeader>


            <CardContent className="space-y-4">

              {recommendedJobs.map((job) => (

                <div
                  key={job.id}
                  className="rounded-xl border p-4"
                >

                  <div className="flex justify-between">

                    <div>

                      <h3 className="font-semibold">
                        {job.title}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        {job.company}
                      </p>

                    </div>

                    <BriefcaseBusiness className="h-5 w-5 text-muted-foreground" />

                  </div>


                  <div className="mt-3 flex flex-wrap gap-1">

                    {job.skills.map((skill) => (

                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs"
                      >
                        {skill}
                      </Badge>

                    ))}

                  </div>


                  <div className="mt-3 flex items-center justify-between">

                    <span className="text-xs text-muted-foreground">
                      {job.location}
                    </span>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        navigate(`/jobs/${job.id}`)
                      }
                    >
                      View Job
                    </Button>

                  </div>

                </div>

              ))}

            </CardContent>

          </Card>

        </div>


        

        <div className="grid gap-6 lg:grid-cols-2">

          {/* Applications Per Month */}

          <Card>

            <CardHeader>

              <CardTitle>
                Applications per Month
              </CardTitle>

            </CardHeader>

            <CardContent>

              <div className="h-[300px]">

                <ResponsiveContainer width="100%" height="100%">

                  <BarChart data={applicationsPerMonth}>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis dataKey="month" />

                    <YAxis allowDecimals={false} />

                    <Tooltip />

                    <Bar
                      dataKey="applications"
                      radius={[6, 6, 0, 0]}
                      fill="hsl(var(--primary))"
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </CardContent>

          </Card>


          {/* Application Status */}

          <Card>

            <CardHeader>

              <CardTitle>
                Application Status
              </CardTitle>

            </CardHeader>

            <CardContent>

              <div className="h-[300px]">

                <ResponsiveContainer width="100%" height="100%">

                  <PieChart>

                    <Pie
                      data={applicationStatus}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={105}
                      paddingAngle={3}
                    >

                      {applicationStatus.map((_, index) => (

                        <Cell
                          key={index}
                          fill={statusColors[index]}
                        />

                      ))}

                    </Pie>

                    <Tooltip />

                  </PieChart>

                </ResponsiveContainer>

              </div>

              <div className="flex flex-wrap justify-center gap-4">

                {applicationStatus.map((status, index) => (

                  <div
                    key={status.name}
                    className="flex items-center gap-2 text-xs"
                  >

                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor: statusColors[index],
                      }}
                    />

                    {status.name}

                  </div>

                ))}

              </div>

            </CardContent>

          </Card>


          {/* Interview Scores */}

          <Card>

            <CardHeader>

              <CardTitle>
                Interview Scores
              </CardTitle>

            </CardHeader>

            <CardContent>

              <div className="h-[300px]">

                <ResponsiveContainer width="100%" height="100%">

                  <LineChart data={interviewScores}>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis dataKey="date" />

                    <YAxis
                      domain={[0, 100]}
                      tickCount={6}
                    />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </CardContent>

          </Card>


          {/* Acceptance Rate */}

          <Card>

            <CardHeader>

              <CardTitle>
                Acceptance Rate
              </CardTitle>

            </CardHeader>

            <CardContent>

              <div className="flex h-300px flex-col items-center justify-center">

                <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-[18px] border-primary/20">

                  <div className="absolute inset-18px rounded-full border-18px border-transparent border-t-primary rotate-[20deg]" />

                  <div className="text-center">

                    <p className="text-4xl font-bold">
                      {dashboardData.acceptanceRate}%
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Acceptance Rate
                    </p>

                  </div>

                </div>

                <p className="mt-5 text-sm text-muted-foreground">
                  Accepted applications compared to total applications
                </p>

              </div>

            </CardContent>

          </Card>

        </div>

      </div>

    </div>
  );
}