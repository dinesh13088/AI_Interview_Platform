import { useRef, useState } from "react";
import {
  Camera,
  MapPin,
  Phone,
  Mail,
  BriefcaseBusiness,
  Pencil,
  X,
  Check,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Badge } from "@/Components/ui/badge";
import { useSelector } from "react-redux";


export default function Profile() {

  const fileInputRef = useRef(null);

 
  const [isEditing, setIsEditing] = useState(false);
  const url=useSelector((state)=>state.auth.candidate.picture_url)

  const fullName=useSelector(state=>state.auth.candidate.first_name)+" "+useSelector(state=>state.auth.candidate.last_name)
  const email=useSelector(state=>state.auth.user.email)
  const phone=useSelector(state=>state.auth.candidate.phone_number)

  const [profile, setProfile] = useState({
    fullName: fullName,

    email: email,

    phone: phone,

    headline: "AI / Backend Developer",

    location: "Kathmandu, Nepal",

    experience: 2,

    skills: [
      "Python",
      "Django",
      "React",
      "Docker",
    ],

    profilePicture: "http://localhost:8000"+url,
  });


 

  


  // --------------------------------------------------
  // Skills input
  // --------------------------------------------------

  const [skillInput, setSkillInput] = useState("");


  // --------------------------------------------------
  // Handle normal inputs
  // --------------------------------------------------

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  

  const addSkill = () => {

    const skill = skillInput.trim();

    if (!skill) return;

    
    const exists = formData.skills.some(
      (item) =>
        item.toLowerCase() === skill.toLowerCase()
    );

    if (exists) {
      setSkillInput("");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        skill,
      ],
    }));

    setSkillInput("");
  };

  const removeSkill = (skillToRemove) => {

    setFormData((prev) => ({
      ...prev,

      skills: prev.skills.filter(
        (skill) => skill !== skillToRemove
      ),
    }));
  };


  

  const handleSkillKeyDown = (e) => {

    if (e.key === "Enter") {

      e.preventDefault();

      addSkill();
    }
  };



 



  const handleEdit = () => {

    setFormData(profile);

    setIsEditing(true);
  };



  const handleCancel = () => {

    setFormData(profile);

    setIsEditing(false);

    setSkillInput("");
  };



  const handleSave = () => {

    setProfile(formData);

    setIsEditing(false);

    console.log("Profile data:", formData);
  };
  console.log(profile.profilePicture)

  


  return (

    <div className="min-h-screen bg-muted/30 p-6">

      <div className="mx-auto max-w-5xl">

        <Card className="overflow-hidden">

          
          {/* Header */}
          

          <CardHeader className="flex flex-row items-center justify-between border-b">

            <div>

              <CardTitle className="text-xl">
                 Profile
              </CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Manage your personal and professional information.
              </p>

            </div>


            {!isEditing && (

              <Button
                onClick={handleEdit}
                className="gap-2"
              >
                <Pencil className="h-4 w-4" />
                Edit Profile
              </Button>

            )}

          </CardHeader>


          <CardContent className="p-6">

            <div className="flex flex-col gap-8 md:flex-row">

              {/* Profile picture */}

              <div className="flex flex-col items-center">

                <div className="relative">

                  <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-3xl font-bold text-primary">

                    {profile.profilePicture ? (

                      <img
                        src={profile.profilePicture}
                        alt="Profile"
                        className="h-full w-full object-cover object-center"
                      />

                    ) : (

                      formData.fullName
                        ?.charAt(0)
                        .toUpperCase()

                    )}

                  </div>


                  {isEditing && (

                    <button
                      type="button"
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                      className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition hover:bg-primary/90"
                    >

                      <Camera className="h-4 w-4" />

                    </button>

                  )}

                </div>


                {isEditing && (

                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                    >
                      Upload Photo
                    </Button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </>

                )}

              </div>


              {/* Basic information */}

              <div className="grid flex-1 gap-5 md:grid-cols-2">

                {/* Full name */}

                <div className="space-y-2">

                  <label className="text-sm font-medium">
                    Full Name
                  </label>

                  {isEditing ? (

                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />

                  ) : (

                    <p className="text-sm">
                      {profile.fullName}
                    </p>

                  )}

                </div>


                {/* Email */}

                <div className="space-y-2">

                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Mail className="h-4 w-4" />
                    Email
                  </label>

                  <Input
                    value={profile.email}
                    disabled
                    className="bg-muted"
                  />

                </div>


                {/* Phone */}

                <div className="space-y-2">

                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Phone className="h-4 w-4" />
                    Phone
                  </label>

                  {isEditing ? (

                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+977..."
                    />

                  ) : (

                    <p className="text-sm">
                      {profile.phone}
                    </p>

                  )}

                </div>


                {/* Location */}

                <div className="space-y-2">

                  <label className="flex items-center gap-2 text-sm font-medium">
                    <MapPin className="h-4 w-4" />
                    Location
                  </label>

                  {isEditing ? (

                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Kathmandu, Nepal"
                    />

                  ) : (

                    <p className="text-sm">
                      {profile.location}
                    </p>

                  )}

                </div>


                {/* Experience */}

                <div className="space-y-2">

                  <label className="flex items-center gap-2 text-sm font-medium">
                    <BriefcaseBusiness className="h-4 w-4" />
                    Experience
                  </label>

                  {isEditing ? (

                    <Input
                      name="experience"
                      type="number"
                      min="0"
                      value={formData.experience}
                      onChange={handleChange}
                    />

                  ) : (

                    <p className="text-sm">
                      {profile.experience} years
                    </p>

                  )}

                </div>


                {/* Headline */}

                <div className="space-y-2">

                  <label className="text-sm font-medium">
                    Professional Headline
                  </label>

                  {isEditing ? (

                    <Input
                      name="headline"
                      value={formData.headline}
                      onChange={handleChange}
                      placeholder="e.g. Full Stack Developer"
                    />

                  ) : (

                    <p className="text-sm">
                      {profile.headline}
                    </p>

                  )}

                </div>

              </div>

            </div>


            {/* -------------------------------------- */}
            {/* Skills */}
            {/* -------------------------------------- */}

            <div className="mt-8 border-t pt-6">

              <label className="text-sm font-medium">
                Skills
              </label>


              {isEditing ? (

                <div className="mt-3">

                  {/* Tags */}

                  <div className="flex min-h-12 flex-wrap gap-2 rounded-md border bg-background p-2">

                    {formData.skills.map((skill) => (

                      <Badge
                        key={skill}
                        variant="secondary"
                        className="gap-1 px-3 py-1.5"
                      >

                        {skill}

                        <button
                          type="button"
                          onClick={() =>
                            removeSkill(skill)
                          }
                          className="ml-1 rounded-full outline-none hover:text-destructive"
                        >

                          <X className="h-3 w-3" />

                        </button>

                      </Badge>

                    ))}


                    <input
                      value={skillInput}
                      onChange={(e) =>
                        setSkillInput(e.target.value)
                      }
                      onKeyDown={handleSkillKeyDown}
                      onBlur={addSkill}
                      placeholder={
                        formData.skills.length === 0
                          ? "Add a skill..."
                          : "Add another skill..."
                      }
                      className="min-w-[150px] flex-1 bg-transparent px-2 text-sm outline-none"
                    />

                  </div>


                  <p className="mt-2 text-xs text-muted-foreground">
                    Type a skill and press Enter to add it.
                  </p>

                </div>

              ) : (

                <div className="mt-3 flex flex-wrap gap-2">

                  {profile.skills.length > 0 ? (

                    profile.skills.map((skill) => (

                      <Badge
                        key={skill}
                        variant="secondary"
                        className="px-3 py-1.5"
                      >
                        {skill}
                      </Badge>

                    ))

                  ) : (

                    <p className="text-sm text-muted-foreground">
                      No skills added yet.
                    </p>

                  )}

                </div>

              )}

            </div>


            {/* -------------------------------------- */}
            {/* Save / Cancel */}
            {/* -------------------------------------- */}

            {isEditing && (

              <div className="mt-8 flex justify-end gap-3 border-t pt-6">

                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>

                <Button
                  onClick={handleSave}
                  className="gap-2"
                >
                  <Check className="h-4 w-4" />
                  Save Changes
                </Button>

              </div>

            )}

          </CardContent>

        </Card>

      </div>

    </div>

  );
}