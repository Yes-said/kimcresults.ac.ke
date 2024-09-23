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
      <h2 className="text-2xl font-semibold mt-4 mb-2">{text}</h2>
    );
  }

  function inputDescription(text) {
    return (
      <p className="text-gray-600 text-sm mb-2">{text}</p>
    );
  }

  function PreInput(header, description) {
    return (
      <div className="mb-6">
        {inputHeader(header)}
        {inputDescription(description)}
      </div>
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
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <AccountNav />
      <form onSubmit={saveCourse} className="mt-8">
        {PreInput("Student Name", "Please enter your full name.")}
        <input
          value={name}
          onChange={ev => setName(ev.target.value)}
          type="text"
          placeholder="John Doe"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none"
        />
        {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}

        {PreInput("Course Name", "Specify the course you are enrolled in.")}
        <input
          type="text"
          value={courseName}
          onChange={ev => setCourseName(ev.target.value)}
          placeholder="e.g. Diploma in Web and Graphic Design"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none"
        />
        {errors.courseName && <p className="text-red-500 mt-1">{errors.courseName}</p>}

        {PreInput("Department", "The department to which the course belongs.")}
        <input
          type="text"
          value={department}
          onChange={ev => setDepartment(ev.target.value)}
          placeholder="e.g. School of Information Technology"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none"
        />
        {errors.department && <p className="text-red-500 mt-1">{errors.department}</p>}

        {PreInput("Year of Study", "The current year of the student in the course.")}
        <input
          type="number"
          value={year}
          onChange={ev => setYear(ev.target.value)}
          placeholder="e.g. 1, 2, or 3"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none"
        />
        {errors.year && <p className="text-red-500 mt-1">{errors.year}</p>}

        {PreInput("Units", "List all the units you are enrolled in.")}
        <textarea
          value={units}
          onChange={ev => setUnits(ev.target.value)}
          placeholder="Separate units with commas: e.g. Web Programming, System Analysis"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none"
        />
        {errors.units && <p className="text-red-500 mt-1">{errors.units}</p>}

        {PreInput("Phone Number", "Enter the student's phone number for contact purposes.")}
        <input
          type="tel"
          value={phone}
          onChange={ev => setPhone(ev.target.value)}
          placeholder="e.g. 0754364738"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none"
        />
        {errors.phone && <p className="text-red-500 mt-1">{errors.phone}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700">Admission Number</label>
            <input
              value={admission}
              onChange={ev => setAdmission(ev.target.value)}
              type="number"
              placeholder="Admission Number"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            />
            {errors.admission && <p className="text-red-500 mt-1">{errors.admission}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Units Enrolled</label>
            <input
              value={unitsEnrolled}
              onChange={ev => setUnitsEnrolled(ev.target.value)}
              type="number"
              placeholder="Number of Units"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            />
            {errors.unitsEnrolled && <p className="text-red-500 mt-1">{errors.unitsEnrolled}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Gender</label>
            <input
              value={gender}
              onChange={ev => setGender(ev.target.value)}
              type="text"
              placeholder="e.g. Male, Female, Other"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            />
            {errors.gender && <p className="text-red-500 mt-1">{errors.gender}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Save Course Information
        </button>
      </form>
    </div>
  );
}
