import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function CoursesFormPage() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [units, setUnits] = useState("");
  const [phone, setPhone] = useState("");
  const [admission, setAdmission] = useState("");
  const [unitsEnrolled, setUnitsEnrolled] = useState("");
  const [gender, setGender] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/courses/" + id).then(response => {
      const { data } = response;
      setName(data.name);
      setCourseName(data.courseName);
      setDepartment(data.department);
      setYear(data.year);
      setUnits(data.units);
      setPhone(data.phone);
      setAdmission(data.admission);
      setUnitsEnrolled(data.unitsEnrolled);
      setGender(data.gender);
    });
  }, [id]);

  function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    );
  }

  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    );
  }

  function PreInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  function validateForm() {
    const newErrors = {};
  
    if (!String(name).trim()) newErrors.name = "Name is required";
    if (!String(courseName).trim()) newErrors.courseName = "Course name is required";
    if (!String(department).trim()) newErrors.department = "Department is required";
    if (!year || year < 1) newErrors.year = "Valid year is required";
    if (!String(units).trim()) newErrors.units = "Units are required";
    if (!phone) newErrors.phone = "Phone number is required";
    if (!admission) newErrors.admission = "Admission number is required";
    if (!unitsEnrolled || unitsEnrolled < 1) newErrors.unitsEnrolled = "Valid units enrolled is required";
    if (!String(gender).trim()) newErrors.gender = "Gender is required";
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  

  async function saveCourse(ev) {
    ev.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const courseData = {
      name, courseName, department, year,
      units, phone, admission,
      unitsEnrolled, gender
    };

    if (id) {
      // Update existing course
      await axios.put("/courses", {
        id,
        ...courseData
      });
    } else {
      // Create new course
      await axios.post("/courses", courseData);
    }
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/account/courses"} />
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={saveCourse}>
        {PreInput("Name", "Write your name.")}
        <input
          value={name}
          onChange={ev => setName(ev.target.value)}
          type="text"
          placeholder="Enter your name"
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}

        {PreInput("CourseName", "Name for your course.")}
        <input
          type="text"
          value={courseName}
          onChange={ev => setCourseName(ev.target.value)}
          placeholder="Add name for your course e.g. Diploma in Web and Graphic Design"
        />
        {errors.courseName && <p className="text-red-500">{errors.courseName}</p>}

        {PreInput("Department", "Department to which your course belongs.")}
        <input
          type="text"
          value={department}
          onChange={ev => setDepartment(ev.target.value)}
          placeholder="Department e.g. Engineering"
        />
        {errors.department && <p className="text-red-500">{errors.department}</p>}

        {PreInput("Year", "Current year of your study")}
        <input
          type="number"
          value={year}
          onChange={ev => setYear(ev.target.value)}
          placeholder="e.g. 1st, 2nd or 3rd"
        />
        {errors.year && <p className="text-red-500">{errors.year}</p>}

        {PreInput("Units", "Add the units of your course")}
        <textarea
          value={units}
          onChange={ev => setUnits(ev.target.value)}
          placeholder="Input all your units separating by a comma in the order: Web Programming, Web Hosting, System Analysis, etc."
        />
        {errors.units && <p className="text-red-500">{errors.units}</p>}

        {PreInput("Phone", "Enter your phone number")}
        <input
          type="number"
          value={phone}
          onChange={ev => setPhone(ev.target.value)}
          placeholder="e.g. 0754364738"
        />
        {errors.phone && <p className="text-red-500">{errors.phone}</p>}

        {PreInput("Other important information", "Please fill in the fields below")}
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className="mt-3 -mb-1">Admission</h3>
            <input
              value={admission}
              onChange={ev => setAdmission(ev.target.value)}
              type="number"
              placeholder="Enter your admission number"
            />
            {errors.admission && <p className="text-red-500">{errors.admission}</p>}
          </div>
          <div>
            <h3 className="mt-3 -mb-1">UnitsEnrolled</h3>
            <input
              value={unitsEnrolled}
              onChange={ev => setUnitsEnrolled(ev.target.value)}
              type="number"
              placeholder="Enter number of units enrolled e.g. 10"
            />
            {errors.unitsEnrolled && <p className="text-red-500">{errors.unitsEnrolled}</p>}
          </div>
          <div>
            <h3 className="mt-3 -mb-1">Gender</h3>
            <input
              value={gender}
              onChange={ev => setGender(ev.target.value)}
              type="text"
              placeholder="e.g. Male, Female or Other"
            />
            {errors.gender && <p className="text-red-500">{errors.gender}</p>}
          </div>
        </div>

        <button type="submit" className="primary my-4">Save</button>

      </form>
    </div>
  );
}
