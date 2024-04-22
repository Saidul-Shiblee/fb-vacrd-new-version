import Image from "next/image";
import React from "react";
import loginImage from "../../public/images/new1.png";
import SignUpForm from "../components/UI/SignUpForm";

const page = () => {
  return (
    <section className=" w-full bg-primary-light-blue/50 flex items-center justify-center ">
          <SignUpForm/>
    </section>
  );
};

export default page;
