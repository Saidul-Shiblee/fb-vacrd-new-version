import hashPassword from "../../../../utils/hashPassword";
import { findUser, insertUser } from "../../../../services/db/userServices";
import { NextRequest, NextResponse } from "next/server";
import { createToken, findToken } from "../../../../services/db/tokenServices";
import createHttpError from "http-errors";
import crypto from "crypto";
import { FORBIDDEN } from "../../../../utils/httpStatusCodes";
import sendEmail from "../../../../utils/sendEmail";
import dbConnect from "@/lib/monogConnect";
import { handleErrors } from "@/utils/handleErrors";

export async function POST(request) {
  let result;
  let workProgress = 0;

  try {
    await dbConnect();
    let reqBody = await request.json();
    const { email, fullName, password } = reqBody;
    const foundUser = await findUser({ email: email });
    if (!foundUser) {
      //Hash password
      const hashedPassword = await hashPassword(password);
      workProgress++;
      //Create User
      result = await insertUser({
        email,
        fullName,
        password: hashedPassword,
      });
      workProgress++;
      //Create token
      const token = await createToken({
        userId: result._id,
        token: crypto.randomBytes(32).toString("hex"),
        purpose: "verify_email",
      });
      const url = `${process.env.BASE_URL}/emailVerify?id=${result._id}&token=${token.token}`;
      //Send verification email
      await sendEmail(
        result.email,
        "Verify Your Email Address",
        url,
        "verify_email",
        undefined
      );

      return NextResponse.json(
        {
          message: `Successfully registered,an email sent to ${result.email} please verify the email`,
        },
        { status: 201 }
      );
    } else {
      const foundToken = await findToken({
        userId: foundUser._id,
        purpose: "verify_email",
      });
      if (foundUser && foundUser?.verified) {
        throw createHttpError(FORBIDDEN, "You are already registered");
      } else if (foundUser && !foundUser?.verified && foundToken) {
        throw createHttpError(
          FORBIDDEN,
          "Regstration process pending ,please verify your email"
        );
      }
    }
  } catch (error) {
    if (workProgress >= 2 && result) {
      await deleteUser({ _id: result._id });
    }
    return handleErrors(error);
  }
}
