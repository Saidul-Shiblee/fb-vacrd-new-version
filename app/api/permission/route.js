
import { findUser, findUsers } from "../../../services/db/userServices";
import { NextResponse } from "next/server";
import { findPermission, findPermissionAndUpdate } from "../../../services/db/permissionServices";
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
        const foundPermission = await findPermission({});
        if (foundUser.role !== 'admin') {
            return NextResponse.json(
                {
                    message: `Unauthorized`,
                },
                { status: UNAUTHORIZED }
            );
        }
        return NextResponse.json(
            {
                data: foundPermission,
            },
            { status: 200 }
        );
    } catch (error) {

        return handleErrors(error);
    }
}



export async function POST(req) {
    try {
        let state = await req.json();
        const { id,cardGeneration,rewrite,productNameGeneration } = state
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
        const updatedPermission = await findPermissionAndUpdate({_id:id},{
            cardGeneration, rewrite, productNameGeneration
        });

        return NextResponse.json(
            {
                data: updatedPermission,
            },
            { status: 200 }
        );

    } catch (error) {

        return handleErrors(error);

    }


}