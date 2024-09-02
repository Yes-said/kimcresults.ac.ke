import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import {  Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function CoursesFormPage() {
  const {id} = useParams();
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [department, setDepartment] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState("");
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
setTitle(data.title);
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

  async function addPhotoByLink(ev) {
      ev.preventDefault();
      const {data: filename} = await axios.post("/_upload-by-link", {link: photoLink});
      setAddedPhotos(prev => {
          return [...prev, filename];
      });
      setPhotoLink("");
  }
  
  function uploadPhoto(ev) {
      const files = ev.target.files;
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
          data.append("photos", files[i]);
      }
     
      
      
    axios.post("/upload", data, {
         headers: {"Content-Type": "multipart/form-data"}
      }).then(response => {
          const {data:filenames} = response;
          return (prev => [...prev, ...filenames]);
      })
  }


 async function saveCourse(ev) {
ev.preventDefault();
const courseData = {
  name,title,department,year,
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
  {PreInput("Title", "Title for your course.")}
 <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="add name for your course e.g diploma in web and graphic design" />
 {PreInput("Department", "Department to which your course belongs.")}
 <input type="text" value={department} onChange={ev => setDepartment(ev.target.value)} placeholder="department e.g engineering" />
 {PreInput("Photos", "More = better")}
 <div className="flex gap-2">
   <input value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} type="text" placeholder={"Add using a link....jpg"} />    <button onClick={addPhotoByLink} className="bg-blue-500 px-4 rounded-2xl">Add&nbsp;photo</button>
 </div>
  <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
 {addedPhotos.length > 0 && addedPhotos.map((link, index) => (
    <div className="h-32 flex" key={link + index}>
  <img className="rounded-2xl w-full object-cover" src={`http://localhost:4000/uploads/${link}`} alt="" />
  </div>
  ))}
 <label className="h-32 cursor-pointer border items-center gap-1 flex justify-center bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
    <input type="file" multiple className="hidden" onChange={uploadPhoto} />
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
   <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
    </svg>
       Upload
      </label>
    </div>
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
    <button className="primary my-4">Save</button>
     </form>
     </div>
    );
}