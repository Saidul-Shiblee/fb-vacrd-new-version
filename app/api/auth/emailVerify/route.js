import createHttpError from "http-errors";
import { findUser, findUserAndUpdate } from "@/services/db/userServices";
import { findToken, removeToken } from "@/services/db/tokenServices";
import { FORBIDDEN } from "@/utils/httpStatusCodes";
import { handleErrors } from "@/utils/handleErrors";
import dbConnect from "@/lib/monogConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const token = searchParams.get("token");
  try {
    await dbConnect();
    //Find rescpective user in the database
    const user = await findUser({ _id: id });
    //Through error if user not found in the database
    if (!user) {
      throw createHttpError(FORBIDDEN, "Invalid link");
    }
    //find respective token in the database
    const foundToken = await findToken({
      userId: id,
      token: token,
    });

    //If token not found in the data base and user already verified
    //that means this user's email already verified
    //so redirect the user to login page.
    if (!foundToken && user.verified) {
      return NextResponse.json(
        {
          message: `redirect`,
        },
        { status: 200 }
      );
    }

    //If token found in the data base and user already verified
    //that means this user's email already verified but some token not removed from the db
    //so remove the token from db and redirect the user to login page.

    if (foundToken && user.verified) {
      await removeToken(foundToken._id);

      return NextResponse.json(
        {
          message: `redirect`,
        },
        { status: 200 }
      );
    }

    //If token not found in the data base and user not verified
    //then its an invalid link

    if (!foundToken && !user.verified)
      throw createHttpError(FORBIDDEN, "Invalid link");

    //If token is found in the data base and user not verified yet
    //that means this user's email is not verified  yet
    //so update the verifed status and send response
    if (foundToken && !user.verified) {
      await findUserAndUpdate({ _id: id }, { verified: true });
      await removeToken(foundToken._id);

      return NextResponse.json(
        {
          message: "Email verified",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return handleErrors(error);
  }
}
