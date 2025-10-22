import { useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import Swal from "sweetalert2";
import api from "../services/api";
import defaultAvatar from "../assets/image/defaultAvatar.jpeg" 

const ProfileImage = () => {
    const {userData, fetchData} = useAuth()
    const [image, setImage] = useState(null); 
     const [preview, setPreview] = useState(""); 
     const [uploadedUrl, setUploadedUrl] = useState("");
    
     const handleFileChange = (e) => {
        const file = e.target.files[0]; 
        setImage(file); 
        setPreview(URL.createObjectURL(file)); 
       }; 
     
        const handleUpload = async () => { 
         const formData = new FormData(); 
         formData.append("image", image); 
         try { 
           const res = await api.post("/upload", formData, 
          { headers: { "Content-Type": "multipart/form-data" }, }); 
         setUploadedUrl(res.data.fileUrl); 
        setPreview(res.data.fileUrl);
     Swal.fire({
             icon: "success",
             title: "Success!",
             text: "Profile Image Uploaded successfully!",
             showConfirmButton: false,  
             timer: 2000,               
             timerProgressBar: true,
           });
         fetchData()
       } 
     
         catch (err) { console.error(err); 
            Swal.fire({
             icon: "error",
             title: "oops!",
             text: "Upload failed!",
            
           });
        } 
       };
     
  return (
    <div className="flex flex-col items-center mt-6">
      <div className="relative w-[120px] h-[120px]">
       
        <img
          src={preview || userData?.profileImage || defaultAvatar}
          alt="Profile"
          className="w-full h-full object-cover rounded-full  border-gray-200 shadow-sm"
        />
        <label
          htmlFor="fileInput"
          className="absolute bottom-1 right-[15px] w-6 h-6 bg-private flex items-center justify-center hover:bg-blue-700 p-2 rounded-full cursor-pointer shadow-md"
        >
          <i className='fa fa-pencil text-white text-[12px]'></i>
        </label>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      {preview && (
        <button
          onClick={handleUpload}
          className="mt-3 bg-blue-600 text-private text-sm px-4 py-1.5 rounded-full hover:bg-blue-700"
        >
          Save Change
        </button>
      )}
    </div>
  )
}

export default ProfileImage