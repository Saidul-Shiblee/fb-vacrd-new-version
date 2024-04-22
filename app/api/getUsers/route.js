
import { findUser, findUsers } from "../../../services/db/userServices";
import { NextResponse } from "next/server";
import { findPermission } from "../../../services/db/permissionServices";
import createHttpError from "http-errors";
import { UNAUTHORIZED } from "../../../utils/httpStatusCodes";
import dbConnect from "@/lib/monogConnect";
import { handleErrors } from "@/utils/handleErrors";
import { getToken } from "next-auth/jwt";


export async function GET(req) {
    try {
        await dbConnect();
        const token = await getToken({ req })
        const foundUser = await findUser({ _id: token.id });
        if (foundUser.role !== 'admin') {
            return NextResponse.json(
                {
                    message: `Unauthorized`,
                },
                { status: UNAUTHORIZED }
            );
        }


        const allUsers= await findUsers({})

        return NextResponse.json(
            {
                data: allUsers,
            },
            { status: 200 }
        );
    } catch (error) {

        return handleErrors(error);
    }
}
