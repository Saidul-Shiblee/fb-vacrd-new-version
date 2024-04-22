
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

            if (foundUser?.rewrite >= foundPermission.rewrite) {
                permitted = false
            }


            if (!permitted) {
                return NextResponse.json(
                    {
                        message: `You have exceeded max limit of rewrite`,
                    },
                    { status: 400 }
                );

            }

            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        "role": "system",
                        "content": "you are a skilled copywriter, specializing in crafting text that is both polished and highly engaging. your expertise lies in transforming any given content into its best possible version, with a focus on creating a style that is captivating and compelling for readers.you will elevate the text provided to achieve maximum impact and reader appeal."
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

            await findUserAndUpdate({ _id: token.id }, {rewrite: foundUser?.rewrite + 1 })

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
