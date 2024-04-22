'use client'
import React, { useRef, useState } from 'react'
import OpenAI from "openai";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import convertToArray from '../../../../utils/convertToArray'
import { FaCopy } from "react-icons/fa";
import notify from '@/utils/toastNotification';
const ProductNameGenerator = () => {
    const [prompt, setPrompt] = useState('')
    const [generatedText, setGeneratedText] = useState('')
    const [loading, setLoading] = useState(false)
    const ref = useRef()
    const closeModal = () => {
        ref.current.close();
        setGeneratedText("")
    };
    const handleGenerate = async () => {
        if (prompt.length <= 20) {
            alert("Too short description")
            return
        }
        try {
            setLoading(true)
            const res = await axios.post("/api/generateProductName", {
                prompt: prompt
            })

            if (res?.status === 200) {
                setGeneratedText(res?.data?.data)
                document.getElementById('product_name_suggestion_modal').showModal()
            }
        } catch (error) {
            if (error?.response?.status === 400 || error?.response?.status === 400) {
                notify(error?.response?.data?.message, 'error', {})
            } else {
                notify('Something went wrong', 'error', {})
            }
        } finally {
            setLoading(false)
        }

    }
    return (
        <div className='flex flex-col gap-4'>
            <div>
                <textarea
                    name="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full h-24 border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600 mt-2 p-4  rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none"
                    type="text"
                    placeholder="Tell us about your product to get a exciting name"
                />
                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="mt-2 ml-4 font-semibold duration-500 ease-in-out transition uppercase px-4 sm:px-8 hover:bg-primary-dark-blue2 hover:text-primary-light-blue border-[1px] border-primary-dark-blue2 py-2 rounded-full bg-primary-light-blue text-primary-dark-blue2 relative">
                    {loading ? "Generating..." : "Generate"}
                </button>
            </div>
            <dialog ref={ref} id="product_name_suggestion_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Here are the suggestion for you!</h3>
                    <ul className='px-4 flex flex-col gap-2 list-disc'>
                        {convertToArray(generatedText)?.map((el, i) => <li key={i}>
                            <p>{el}</p>
                            {/* <CopyToClipboard
                              onCopy={onCopy}
                              options={{ message: 'Copied!' }}
                              text={el}>
                              <button onClick={onClick}>Copy</button>
                          </CopyToClipboard> */}
                        </li>)}
                    </ul>
                    <div className="modal-action">
                        <button onClick={closeModal} className="btn">Close</button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}
export default ProductNameGenerator