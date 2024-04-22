import Image from 'next/image';
import React from 'react';
import loginImage from '../../public/images/new1.png'
import LoginForm from '../components/UI/LoginForm';


const page = () => {
  return (
    <section className="h-screen w-full bg-primary-light-blue/50 flex items-center justify-center ">
      <LoginForm />
    </section>
  );
}

export default page