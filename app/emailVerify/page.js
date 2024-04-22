"use client";
import {
  BsCheckCircleFill,
  BsFillExclamationTriangleFill,
} from "react-icons/bs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import Link from "next/link";


const EmailVerify = () => {
  const [isVerified, setIsisVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParams = {};
  searchParams.forEach((value, key) => {
    Object.assign(queryParams, { [key]: value });
  });

  useEffect(() => {
    const verifyToken = async () => {
      setLoading(true);
      try {
        if (queryParams?.id && queryParams?.token) {
          const res = await axios.get(
            `/api/auth/emailVerify?id=${queryParams.id}&token=${queryParams.token}`
          );
          if (res.status === 200) {
            // if (res.data.message === "redirect") {
            //   window.location.href = "/login";
            //   return;
            // }
            setLoading(false);
            setIsisVerified(true);
          }
        }
      } catch (error) {
        setIsisVerified(false);
        setLoading(false);
        if (
          error.response.status === 400 ||
          error.response.status === 401 ||
          error.response.status === 403
        ) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Something Went wrong");
        }
      }
    };
    verifyToken();
  }, [queryParams?.id, queryParams?.token]);

  return (
    <div className="min-h-screen w-full px-6 sm:px-10 py-10 flex flex-col items-center justify-center gap-6 bg-white text-gray-600">
      <div className="p-6 space-y-4  sm:p-10 bg-white border-primary-dark-blue2 border-[1px] rounded-lg w-full sm:w-[60%]  xmd:w-[40%] custom-shadow3 min-h-[300px]">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-primary-dark-blue2 md:text-2xl text-center mb-10 w-full">
          Verify Email
        </h1>
        {isVerified && !loading && !errorMessage && (
          <div className="p-4  w-full flex flex-col gap-4 items-center justify-center text-gray-600 ">
            <div className="flex justify-center items-center gap-4">
              <BsCheckCircleFill className="w-10 h-10 text-secondary-100 text-green-600" />
              <p className="text-center">
                Your email has been verfied successfully,
                <br />
                you can login{" "}
                <span className="font font-semibold text-primary-dark-blue2">
                  <Link href={"/login"}>here</Link>
                </span>
              </p>
            </div>
          </div>
        )}
        {!isVerified && loading && !errorMessage && (
          <div className="p-6  sm:p-10   w-full flex justify-center items-center">
            <HashLoader size={60} color="#0d222e" />
          </div>
        )}
        {!isVerified && !loading && errorMessage && (
          <div className="p-6  sm:p-10  w-full flex gap-2 items-center justify-center text-gray-600">
            <BsFillExclamationTriangleFill className="text-red-600 w-6 h-6" />{" "}
            <p>{errorMessage} ,please try again!</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default EmailVerify;
