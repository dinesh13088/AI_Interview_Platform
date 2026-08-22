import React, { useEffectEvent, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  Search,
  MapPin,
  Building2,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router";
import { Outlet } from "react-router"

import {
  Card,
  CardContent,
} from "@/Components/ui/card";

import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";

import { getjobs } from "@/api/user.api";
import { useSelector } from "react-redux";
import { useEffect } from "react";





const initialJobs = [
  {
    id: 1,
    title: "Backend Developer",
    description:
      "We are looking for a Backend Developer to build scalable REST APIs and work with our development team.",
    company: "ABC Technologies",
    location: "Kathmandu, Nepal",
    jobType: "Full Time",
    created_at: "Aug 20, 2026",
  },

  {
    id: 2,
    title: "Python Developer",
    description:
      "Looking for a Python developer with experience in Django, REST APIs and PostgreSQL.",
    company: "Tech Solutions",
    location: "Kathmandu, Nepal",
    jobType: "Full Time",
    created_at: "Aug 18, 2026",
  },

  {
    id: 3,
    title: "React Developer",
    description:
      "Join our frontend team to build modern web applications using React and Tailwind CSS.",
    company: "Digital Nepal",
    location: "Remote",
    jobType: "Full Time",
    created_at: "Aug 15, 2026",
  },

  {
    id: 4,
    title: "Machine Learning Engineer",
    description:
      "We are looking for an ML Engineer to develop and deploy machine learning solutions.",
    company: "AI Labs Nepal",
    location: "Kathmandu, Nepal",
    jobType: "Full Time",
    created_at: "Aug 10, 2026",
  },
];


function Jobs() {

  const navigate = useNavigate();

  const [jobs, setJobs] = useState(initialJobs);

  const [search, setSearch] = useState("");
  const accessToken = useSelector((state) => state.auth.accessToken)

  useEffect(() => {
    const fetchJobs = async () => {

      const response = await getjobs(accessToken);
      console.log(response.data)
      setJobs(response.data)
    };
    if (accessToken) fetchJobs();
  }, [accessToken]);

  const filteredJobs = useMemo(() => {

    const searchValue = search.toLowerCase().trim();

    if (!searchValue) {
      return jobs;
    }

    return jobs.filter((job) =>

      job.title
        .toLowerCase()
        .includes(searchValue) ||

      job.company
        .toLowerCase()
        .includes(searchValue) ||

      job.description
        .toLowerCase()
        .includes(searchValue) ||

      job.location
        .toLowerCase()
        .includes(searchValue)

    );

  }, [jobs, search]);


  return (

    <div className="min-h-screen bg-muted/30 p-6">

      <div className="mx-auto max-w-6xl space-y-6">



        {/* Header */}


        <div>

          <h1 className="text-2xl font-bold tracking-tight">
            Available Jobs
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Find a job that matches your skills and apply.
          </p>

        </div>



        {/* Search */}


        <Card>

          <CardContent className="p-4">

            <div className="relative">

              <Search
                className="
                  absolute
                  left-3
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-muted-foreground
                "
              />

              <Input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search jobs, companies, or locations..."
                className="pl-9"
              />

            </div>

          </CardContent>

        </Card>



        {/* Job count */}


        <div className="flex items-center justify-between">

          <p className="text-sm text-muted-foreground">

            {filteredJobs.length}{" "}

            {filteredJobs.length === 1
              ? "job"
              : "jobs"}{" "}

            available

          </p>

        </div>



        {/* Jobs */}


        <div className="space-y-4">

          {filteredJobs.length === 0 ? (

            <Card>

              <CardContent className="flex flex-col items-center justify-center py-16 text-center">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">

                  <BriefcaseBusiness
                    className="
                      h-7
                      w-7
                      text-muted-foreground
                    "
                  />

                </div>

                <h3 className="mt-4 font-semibold">
                  No jobs found
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Try searching for a different job or company.
                </p>

              </CardContent>

            </Card>

          ) : (

            filteredJobs.map((job) => {
              const title = job.title
              const companyName = job.company.name
              const location = job.company.location || 'Kathmandu,Nepal'
              const jobduration = 'Full Time'

              return (

                <Card
                  key={job.id}
                  className="
                  transition-all
                  hover:-translate-y-0.5
                  hover:shadow-md
                "
                >

                  <CardContent className="p-6">

                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">


                      {/* Job information */}


                      <div className="flex min-w-0 gap-4">

                        {/* Company Logo */}

                        <div
                          className="
                          flex
                          h-12
                          w-12
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-primary/10
                        "
                        >

                          <Building2
                            className="
                            h-6
                            w-6
                            text-primary
                          "
                          />

                        </div>


                        {/* Information */}

                        <div className="min-w-0">

                          <h2 className="text-lg font-semibold">
                            {job.title}
                          </h2>


                          <p className="mt-1 text-sm font-medium text-muted-foreground">
                            {companyName}
                          </p>


                          {/* Job metadata */}

                          <div className="mt-3 flex flex-wrap gap-3">

                            <Badge
                              variant="secondary"
                              className="gap-1"
                            >
                              <MapPin className="h-3 w-3" />
                              {location}
                            </Badge>


                            <Badge
                              variant="secondary"
                            >
                              {job.jobType}
                            </Badge>

                          </div>


                          {/* Description */}

                          <p
                            className="
                            mt-4
                            max-w-3xl
                            text-sm
                            leading-6
                            text-muted-foreground
                            line-clamp-2
                          "
                          >
                            {job.description}
                          </p>


                          {/* Posted date */}

                          <div
                            className="
                            mt-4
                            flex
                            items-center
                            gap-1.5
                            text-xs
                            text-muted-foreground
                          "
                          >

                            <CalendarDays className="h-4 w-4" />

                            Posted {job.created_at}

                          </div>

                        </div>

                      </div>



                      {/* Apply button */}


                      <div className="shrink-0">

                        <Button
                          className="gap-2"
                          onClick={() =>
                            navigate(`/home/apply-jobs/${job.id}`, {
                              state: {



                                'title': title,
                                'companyName': companyName,
                                'location': location,
                                'jobduration': jobduration


                              }
                            })
                          }
                        >

                          View & Apply

                          <ArrowRight
                            className="h-4 w-4"
                          />

                        </Button>

                      </div>

                    </div>

                  </CardContent>

                </Card>

              )
            })

          )}

        </div>

      </div>


    </div>
  );
}

export default Jobs;