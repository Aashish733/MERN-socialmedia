import React, { useState } from 'react'
import { createPost } from "../../api/post.api";
import PostEditor from "./PostEditor";
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import Spinner from '../General/Spinner';

const UploadPostContainer = () => {
   const [content, setContent] = useState("");
   const [image, setImage] = useState<File | null>(null);
   const [loading, setLoading] = useState(false);
   const navigate =useNavigate()

   const handleCreatePost = async () => {
     if (!content || content === "<p></p>") {
       toast.error("Post cannot be empty");
       return;
     }

     try {
       const formData = new FormData();
       formData.append("content", content);

       if(image){
        formData.append("image", image)
       }

      //  if (mediaFile && mediaType === "image") {
      //    formData.append("image", mediaFile);
      //  } else if (mediaFile && mediaType === "video") {
      //    formData.append("video", mediaFile);
      //  }

       setLoading(true);
       const response = await createPost(formData);
       console.log(response);
       toast.success("Post uploaded successfully");
       setContent("");
      //  handleRemoveMedia();
       navigate("/");
     } catch (error: any) {
       console.log(error);
       toast.error(error.message || "Failed to upload post");
     } finally {
       setLoading(false);
     }
   };

  return (
    <div className="mt-6 p-4 bg-neutral-900 rounded-xl text-white mx-4 md:mx-0">
      <h2 className="text-lg font-semibold mb-3">Create Your Post</h2>

      {/* TipTap Rich Text Editor */}
      <PostEditor value={content} onChange={setContent} />

      {/* Image Input */}
      <input 
        type="file"
        accept='image/*'
        onChange={(e)=> {
          if(e.target.files?.[0]){
            setImage(e.target.files?.[0])
          }
        }} />


      {/* Image preview */}
      {
        image && (
          <img src={URL.createObjectURL(image)} alt="Preview" className="mt-3 max-h-60 rounded-lg" />
        )
      }
      {/* Submit Button */}
      <button
        onClick={handleCreatePost}
        disabled={loading}
        className="px-4 py-2 rounded-xl text-sm font-semibold transition disabled:opacity-50 cursor-pointer hover:scale-[1.02] bg-[#9929EA] text-white flex justify-center items-center gap-1 mt-3"
      >
        {loading ? (
          <div className="flex gap-2">
            <Spinner />
            Posting
          </div>
        ) : (
          "Post"
        )}
      </button>
    </div>
  );
}

export default UploadPostContainer