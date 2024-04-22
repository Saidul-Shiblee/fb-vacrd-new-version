
import { findUser, findUserAndUpdate} from "../../../services/db/userServices";
import {  NextResponse } from "next/server";
import { findPermission } from "../../../services/db/permissionServices";
import createHttpError from "http-errors";
import {  UNAUTHORIZED } from "../../../utils/httpStatusCodes";
import dbConnect from "@/lib/monogConnect";
import { handleErrors } from "@/utils/handleErrors";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
    try {
        await dbConnect();
        let reqBody = await req.json();
        const { item } = reqBody;
        const token = await getToken({ req })
        const foundUser = await findUser({ _id: token.id });
        const foundPermission = await findPermission({  });




        if (foundUser) {
            let permitted=true
            if (item === "productNameGeneration" && foundUser?.productNameGenerated >= foundPermission.productNameGeneration){

                permitted=false
            }
            if (item === "rewrite" &&  foundUser?.rewrite >= foundPermission.rewrite){

                permitted = false
            }
            if (item === "cardGeneration" && foundUser?.cardGenerated >= foundPermission.cardGeneration){

                permitted = false
            }

            if(!permitted){

                return NextResponse.json(
                    {
                        message: `You have exceeded max limit of ${
                            item === "productNameGeneration"? " product name generation":
                            item === "cardGeneration" ? "card generation" :
                            item === "rewrite"?'rewrite ':''
                        }`,
                    },
                    { status: 400 }
                );

            }

            await findUserAndUpdate({ _id: token.id },{
                ...(item === "productNameGeneration" ? { productNameGenerated: foundPermission.productNameGeneration +1}:{}),
                ...(item === "rewrite" ? { rewrite: foundUser?.rewrite +1}:{}),
                ...(item === "cardGeneration" ? { cardGenerated: foundUser?.cardGenerated +1}:{}),
            })

            return NextResponse.json(
                {
                    message: `permitted`,
                },
                { status: 200 }
            );
        } else {
            throw createHttpError(UNAUTHORIZED, "Unauthorized");
        }
    } catch (error) {

        return handleErrors(error);
    }
}
