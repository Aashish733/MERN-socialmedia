import { Link, useNavigate } from 'react-router';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserSchema, type LoginUserFormData } from '../../schemas/auth.schema';
import { useState } from 'react';
import { loginUser } from '../../api/auth.api';
import Spinner from '../General/Spinner';
import { toast } from 'sonner';
import { useDispatch } from "react-redux";
import { setUser } from '../../store/slices/authSlice';

const LoginUserForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

   const {
     register,
     handleSubmit,
     reset,
     formState: { errors },
   } = useForm<LoginUserFormData>({
     resolver: zodResolver(loginUserSchema),
   });

   const onSubmit  = async(data: LoginUserFormData)=>{
    // console.log(data)
     try {
       setLoading(true);
       setServerError(null);

       const response = await loginUser(data);
        dispatch(setUser(response.data.user));
       toast.success(`Welcome Back ${response.data.user.username}`);
       reset();
       navigate("/");
     } catch (error: unknown) {
       if (error instanceof Error) {
         setServerError(error.message);
         toast.error(error.message);
       } else {
         setServerError("Something went wrong");
         toast.error("Something went wrong");
       }
     }
   }

   const inputBase =
     "w-full bg-[#15151c] border text-gray-100 px-2 py-2 rounded-xl outline-none transition-all duration-200 placeholder:text-gray-500";

   const inputFocus =
     "focus:border-[#9929EA] focus:ring-2 focus:ring-[#9929EA]/30";

   const inputError = "border-red-500 focus:ring-red-500/20";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="">User or Email</label>
        <input
          type="text"
          placeholder="enter your email or username"
          {...register("identifier")}
          className={`${inputBase} ${inputFocus} ${
            errors.identifier ? inputError : "border-[#2a2a35]"
          }`}
        />
        <p className="text-red-500 text-xs mt-1 min-h-[16px]">
          {errors.identifier?.message}
        </p>
      </div>
      <div>
        <label htmlFor="">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          className={`${inputBase} ${inputFocus} ${
            errors.password ? inputError : "border-[#2a2a35]"
          }`}
        />
        <p className="text-red-500 text-xs mt-1 min-h-[16px]">
          {errors.password?.message}
        </p>
      </div>
      <div>
        Don't have an acccount?{" "}
        <span>
          <Link to={"/register"}>Register here</Link>
        </span>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="
          w-full bg-[#9929EA]
          hover:bg-[#7b14c4]
          text-white font-semibold
          py-3 rounded-xl
          transition-all duration-200
          active:scale-[0.98]
          disabled:opacity-60
          disabled:cursor-not-allowed
          flex items-center justify-center
          cursor-pointer
        "
      >
        {loading ? <Spinner /> : "Login"}
      </button>
    </form>
  );
}

export default LoginUserForm