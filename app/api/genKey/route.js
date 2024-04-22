const openpgp = require("openpgp");
import { NextRequest, NextResponse } from "next/server";
import { handleErrors } from "@/utils/handleErrors";
export async function POST(request) {

    try {
        let state = await request.json();
        const { name, email, passphrase } = state

        const { privateKey, publicKey } = await openpgp.generateKey({
            userIDs: [{ name, email }],
            curve: "brainpoolP512r1",
            passphrase,
        });




        return NextResponse.json({
            keys: {
                privateKey,
                publicKey
            }
        },
            { status: 201 }
        );

    } catch (error) {
        console.log(error)
        return handleErrors(error);


    }


}