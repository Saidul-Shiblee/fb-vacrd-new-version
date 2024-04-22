import { NextResponse } from "next/server";
import mongoose from "mongoose";
import createHttpError from "http-errors";


export const handleErrors =  (err) => {
  if (createHttpError.isHttpError(err) && err.expose) {
    // Handle all errors thrown by http-errors module
      return NextResponse.json(
        {
          error: err.name,
          message: err.message,
        },
        { status: err.statusCode }
      );
  } else if (err instanceof mongoose.Error.CastError) {
    //Handle cast error

     return NextResponse.json(
       {
         error: "Invalid data",
         message: "Invalid data provided for the request",
       },
       { status: 400 }
     );
  } 
  // else if (err instanceof ValidationError) {
  //   // Handle yup validation errors
  //   return res.status(400).end(err.errors.join(","));
  // } 
  else if (err instanceof mongoose.Error.ValidationError) {
    //Handle mongoose validation error
  return NextResponse.json(
    {
      error: err.name,
      message: err.message,
    },
    { status: 400 }
  );
    
  } else if (err.name === "MongoServerError" && err.code === 11000) {
    //handle mongoDB error
     return NextResponse.json(
       {
         error: err.name,
         message: "Duplicate record found",
       },
       { status: 400 }
     );
   
  } else if (err.name === "MongoServerError") {
    //handle mongoDB error
    return NextResponse.json(
      {
        error: err.name,
        message: err.message,
      },
      { status: err.code }
    );
  } else {
    // default to 500 server error
    console.log(err);

    return NextResponse.json(
      {
        message: "Internal Server Error....",
      },
      { status: 500 }
    );
  }
};


