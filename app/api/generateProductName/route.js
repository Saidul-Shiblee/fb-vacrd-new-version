
import { findUser, findUserAndUpdate } from "../../../services/db/userServices";
import { NextResponse } from "next/server";
import { findPermission } from "../../../services/db/permissionServices";
import createHttpError from "http-errors";
import { UNAUTHORIZED } from "../../../utils/httpStatusCodes";
import dbConnect from "@/lib/monogConnect";
import { handleErrors } from "@/utils/handleErrors";
import { getToken } from "next-auth/jwt";
import OpenAI from "openai";

export async function POST(req) {
    try {
        await dbConnect();
        let reqBody = await req.json();
        const { prompt } = reqBody;
        const token = await getToken({ req })
        const foundUser = await findUser({ _id: token.id });
        const foundPermission = await findPermission({});




        if (foundUser) {
            const openai = new OpenAI({
                apiKey: process.env.OPEN_AI_API_KEY,
                dangerouslyAllowBrowser: true
            });

            let permitted = true
            if (foundUser?.productNameGenerated >= foundPermission.productNameGeneration) {
                permitted = false
            }


            if (!permitted) {
                return NextResponse.json(
                    {
                        message: `You have exceeded max limit of product name generation`,
                    },
                    { status: 400 }
                );

            }

            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        "role": "system",
                        "content": "Tasked with a product description, your mission is to conjure up the most inventive and captivating product names imaginable. Your creativity is key here; each name should not only resonate with the essence of the product but also spark intrigue and interest in potential buyers. Think outside the box and weave a name that tells a story, creating an instant connection with the audience. Let's turn these descriptions into names that are not just labels, but gateways to the unique experiences these products offer."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature: 0.8,
                max_tokens: 64,
                top_p: 1,
            });

            await findUserAndUpdate({ _id: token.id }, { productNameGenerated: foundUser?.productNameGenerated + 1 })

            return NextResponse.json(
                {
                    data: response.choices[0].message.content,
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
