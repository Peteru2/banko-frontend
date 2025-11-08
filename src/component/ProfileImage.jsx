import { useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import themedSwal from "../utils/themedSwal.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import api from "../services/api";
import defaultAvatar from "../assets/image/defaultAvatar.jpeg";

const ProfileImage = () => {
  const { userData, fetchData } = useAuth();
  const { theme } = useTheme();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      setIsUploading(true);

      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        
      });

      themedSwal(
        {
          icon: "success",
          title: "Success!",
          text: "Profile Image Uploaded successfully!",
          timer: 2000,
          showConfirmButton: false,
          timerProgressBar: true,
        },
        theme
      );

      setPreview(res.data.fileUrl);
      
      fetchData();
    } catch (err) {
      themedSwal(
        { icon: "error", title: "Oops!", text: "Upload failed!" },
        theme
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <div className="relative w-[120px] h-[120px]">
        <img
          src={preview || userData?.profileImage || defaultAvatar}
          alt="Profile"
          className="w-full h-full object-cover rounded-full border shadow-sm"
        />
        <label
          htmlFor="fileInput"
          className="absolute bottom-1 right-[15px] w-7 h-7 bg-private flex items-center justify-center hover:bg-blue-700 rounded-full cursor-pointer shadow-md"
        >
          <i className="fa fa-pencil text-white text-xs"></i>
        </label>

        <input
          id="fileInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {preview && !isUploading && (
        <button
          onClick={handleUpload}
          className="mt-3 bg-blue-600 text-white text-sm px-4 py-1.5 rounded-full hover:bg-blue-700"
        >
          
          Save Change
        </button>
      )}

      {isUploading && (
        <div className="mt-4 w-48">
          <div className="w-full bg-private rounded-full text-center p-2 overflow-hidden">
            Uploading <i className="fas fa-spinner fa-spin ml-1"></i></div>
          
          
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
