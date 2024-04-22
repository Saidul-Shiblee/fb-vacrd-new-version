"use client";
import notify from "@/utils/toastNotification";
import axios from "axios";
import Link from "next/link";
import Logo from '../../../public/images/Logo.png'
import React, { useState, useEffect } from "react"
import Joi from "joi";
import { useForm, useWatch } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Image from "next/image"
import { IoClose } from "react-icons/io5";
import { useRouter } from 'next/navigation'






const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [errMsg, setErrMsg] = useState(null)
  const router = useRouter()

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.empty": `Email cannot be empty`,
        "string.email": "Please provide a valid email address",
        "any.required": `Email is required`,
      }),
    f_name: Joi.string()
      .required()
      .messages({
        "string.empty": `Full name cannot be empty`,
        "any.required": `Full name is required`,
      }),
    password: Joi.string()
      .required()
      .messages({
        "string.empty": `Password cannot be empty`,
        "any.required": `Password is required`,
      }),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref('password'))
      .messages({
        "any.only": `Passwords do not match `,
      }),

  });
  //Instantiate React Hook Form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: joiResolver(schema),
  });
  //Watch field value
  const fieldValue = useWatch({
    control,
    name: ['f_name',"email", "password",'confirmPassword'],
    defaultValue: "",
  });



  //ON Submit handler
  const handleSignup = async (formData) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/register", {
        email: formData.email,
        fullName: formData.f_name,
        password: formData.password,
      })
      if (res?.status === 201) {
        notify(res?.data?.message, "success", {});
      }
    } catch (error) {
      if (
        error.response.status === 400 ||
        error.response.status === 401 ||
        error.response.status === 403 ||
        error.response.status === 409
      ) {
        setErrMsg(error?.response?.data?.message)
      } else {
        setErrMsg("Something went wrong", "error");
      }
    } finally {
          setIsLoading(false);
    }
  };
  // To remove error message after 6 sec.
  useEffect(() => {
    if (errMsg) {
      setTimeout(() => setErrMsg(""), 6000);
    }
  }, [errMsg]);
  return (
    <div className='w-full  flex justify-center items-center'>
      <section class="w-full flex justify-center items-center flex-col gap-8 px-2  py-4">
        <Image src={Logo} alt='Maind Logo' width={60} height={60} className=' ' />
        <div class="w-full lg:w-4/12 px-4 mx-auto pt-6 bg-primary-dark-blue2   relative flex flex-col min-w-0 break-words mb-6 card rounded-lg border-[1px] ">
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-primary-light-blue text-center mb-3 font-semibold text-xl ">
              <p >Sign up for an account</p>
            </div>
            <form onSubmit={handleSubmit(handleSignup)}>
              {errMsg && <div className="px-2 py-1 bg-red-600/30 rounded-md text-xs text-red-600 flex gap-4 justify-between items-center  transform mb-4">
                <p className=' text-center'>{errMsg}</p>
                <IoClose
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => setErrMsg(null)}
                />
              </div>}
              <div class="relative w-full mb-3">
                <label class="block uppercase text-primary-light-blue text-xs font-bold mb-2" for="grid-password">Full Name</label>
                <input name='f_name' type="text" class="border-[2px] px-3 py-3
                                  text-primary-blue bg-primary-light-blue rounded text-sm shadow  w-full ease-linear transition-all duration-150 focus:border-primary-mid-blue focus:border-[2px]  focus:outline-none focus:ring-none" placeholder="Full Name"
                  {...register("f_name")}
                />
                {errors.f_name && (
                  <span className="text-red-600 text-xs max-w-sm">
                    {errors.f_name.message}
                  </span>
                )}
              </div>
              <div class="relative w-full mb-3">
                <label class="block uppercase text-primary-light-blue text-xs font-bold mb-2" for="grid-password">Email</label>
                <input name='email' type="email" class="border-[2px] px-3 py-3
                                  text-primary-blue bg-primary-light-blue rounded text-sm shadow  w-full ease-linear transition-all duration-150 focus:border-primary-mid-blue focus:border-[2px]  focus:outline-none focus:ring-none" placeholder="Email"
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-red-600 text-xs max-w-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div class="relative w-full mb-3">

                <label class=" uppercase text-primary-light-blue text-xs font-bold mb-2 flex justify-between" for="grid-password">
                  <p>Password</p>
                  {/* <p className='underline'>Forgot Password?</p> */}


                </label>

                <input name='password' type="password" class="border-[2px] px-3 py-3
                                 text-primary-blue bg-primary-light-blue rounded text-sm shadow  w-full ease-linear transition-all duration-150 focus:border-primary-mid-blue focus:border-[2px]  focus:outline-none focus:ring-none" placeholder="Password"
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-red-600 text-xs max-w-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div class="relative w-full mb-3">

                <label class=" uppercase text-primary-light-blue text-xs font-bold mb-2 flex justify-between" for="grid-password">
                  <p>Confirm Password</p>



                </label>

                <input name='confirmPassword' type="password" class="border-[2px] px-3 py-3
                                 text-primary-blue bg-primary-light-blue rounded text-sm shadow  w-full ease-linear transition-all duration-150 focus:border-primary-mid-blue focus:border-[2px]  focus:outline-none focus:ring-none" placeholder="Password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <span className="text-red-600 text-xs max-w-sm">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <div class="text-center mt-6">
                <button
                  disabled={isLoading
                    || errors.email
                    || errors.password
                    || errors.confirmPassword
                    || errors.f_name
                    || !fieldValue[0]
                    || !fieldValue[1]
                    || !fieldValue[2]
                    || !fieldValue[3]}
                  class=" bg-primary-light-blue text-primary-dark-blue2 active:scale-95 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 disabled:text-gray-300 disabled:active:scale-100" type="submit"> Sign Up </button>
              </div>
              <p className=' text-end text-xs text-primary-light-blue mt-1'> Already have an account ? <span className=" font-semibold underline cursor-pointer">
                <Link href={"/login"}>Login</Link>
              </span></p>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SignUpForm

