import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import {  Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function CoursesFormPage() {
  const {id} = useParams();
    const [name, setName] = useState("");
    const [courseName, setCourseName] = useState("");
    const [department, setDepartment] = useState("");
    const [year, setYear] = useState("");
    const [units, setUnits] = useState("");
    const [phone, setPhone] = useState("");
    const [admission, setAdmission] = useState("");
    const [unitsEnrolled, setUnitsEnrolled] = useState("");
    const [gender, setGender] = useState("");
    const [redirect,setRedirect] = useState(false);
    useEffect(() => {
   if (!id) {
    return;
   }
   axios.get("/courses/"+id).then(response => {
const {data} = response;
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
      return(
          <p className="text-gray-500 text-sm">{text}</p>
      );
  }

  function PreInput(header,description) {
      return(
          <>
          {inputHeader(header)}
          {inputDescription(description)}
          </>
      );
  }

  

 async function saveCourse(ev) {
ev.preventDefault();
const courseData = {
  name,courseName,department,year,
  units,phone,admission,
  unitsEnrolled,gender
};


if (id) {
//update


await axios.put("/courses", {
  id,
 ...courseData
});
setRedirect(true)
}else {
  //new course

  await axios.post("/courses", courseData);
  setRedirect(true)
   }
}


if (redirect) {
  return <Navigate to={"/account/courses"} />
}

    return(
        <div>
          <AccountNav />
  <form onSubmit={saveCourse}>
    {PreInput("Name", "Write your name.")}
    <input value={name} onChange={ev => setName(ev.target.value)} type="text"placeholder="Enter your name"/>
  {PreInput("CourseName", "Name for your course.")}
 <input type="text" value={courseName} onChange={ev => setCourseName(ev.target.value)} placeholder="add name for your course e.g diploma in web and graphic design" />
 {PreInput("Department", "Department to which your course belongs.")}
 <input type="text" value={department} onChange={ev => setDepartment(ev.target.value)} placeholder="department e.g engineering" /> 
  
  {PreInput("Year", "Current year of your study")}
 <input type="number" value={year} onChange={ev => setYear(ev.target.value)} placeholder="e.g 1st, 2nd or 3rd"/>
 {PreInput("units", "Add the units of your course")}
 <textarea value={units} onChange={ev => setUnits(ev.target.value)} placeholder="input all your units separating by a comma in the order: web programming,web hosting,system analysis etc"/>
 <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">

     </div>
     {PreInput("Phone", "Enter your phone number")}
     <input type="number" value={phone} onChange={ev => setPhone(ev.target.value)} placeholder="e.g 0754364738"/>
     {PreInput("Other important information", "Please fill in the fields below")}
     <div className="grid gap-2 sm:grid-cols-3">
       <div>
        <h3 className="mt-3 -mb-1">Admission</h3>
   <input value={admission} onChange={ev => setAdmission(ev.target.value)} type="number" placeholder="Enter your admission number" />
     </div>
    <div>
  <h3 className="mt-3 -mb-1">UnitsEnrolled</h3>
   <input value={unitsEnrolled} onChange={ev => setUnitsEnrolled(ev.target.value)} type="number" placeholder="Enter number of units enrolled e.g 10" />
    </div>
    <div>
     <h3 className="mt-3 -mb-1">Gender</h3>
     <input value={gender} onChange={ev => setGender(ev.target.value)} type="text" placeholder="e.g male, female or other"/>
      </div>
     </div>
     <button type="submit" className="primary my-4">Save</button>
     </form>
     </div>
    );
}