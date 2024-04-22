'use client '
import { useGlobalContext } from '@/app/context/context'
import GenerateCardHTML from '@/utils/generateCardHTML'
import React, { useState } from 'react'
import generateCSS from '../../../../utils/generateCSS'
import QRCode from '../../../../utils/generateJS'
import axios from 'axios'
import notify from '@/utils/toastNotification'
const Download = () => {
    const { state, dispatch } = useGlobalContext()
    const [risk, setRisk] = useState(false)
    const [link, setLink] = useState(false)
    const [fields, setFields] = useState(false)
    const [loading, setLoading] = useState(false)
    const downloader = () => {
        const JSZip = require('jszip')
        return new Promise(async (resolve, reject) => {
            await changePreviwMode()
            const el = document.getElementById("body")
            const html = el.innerHTML
            const elelment = GenerateCardHTML(html, state)
            let h = new DOMParser().parseFromString(
                elelment,
                'text/html'
            )
            let styleLink = document.createElement('link')
            styleLink.rel = 'stylesheet'
            styleLink.href = './style.min.css'
            h.querySelector('head').appendChild(styleLink)
            const preconnect1 = document.createElement('link');
            preconnect1.rel = 'preconnect';
            preconnect1.href = 'https://fonts.gstatic.com';
            preconnect1.crossorigin = true;
            const preconnect2 = document.createElement('link');
            preconnect2.rel = 'preconnect';
            preconnect2.href = 'https://fonts.googleapis.com';
            const fontStylesheet = document.createElement('link');
            fontStylesheet.rel = 'stylesheet';
            fontStylesheet.href = `https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Dancing+Script:wght@400..700&family=Inter:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap`;
            h.querySelector('head').appendChild(preconnect1);
            h.querySelector('head').appendChild(preconnect2);
            h.querySelector('head').appendChild(fontStylesheet);
            // Inject qrcode script
            let qrcode = document.createElement('script')
            qrcode.src = './qrcode.min.js'
            h.querySelector('body').appendChild(qrcode)
            // Inject general script
            let modals = document.createElement('script')
            modals.innerText =
                'let m=document.getElementById("modal"),c=document.getElementById("close"),ki=document.getElementById("keyInfo"),cv=document.getElementById("copyView"),curl=document.getElementById("copyURL"),qrv=document.getElementById("qrView"),qr=document.getElementById("qr"),s=document.getElementById("share"),sqr=document.getElementById("showQR"),sk=document.getElementById("showKey");function tC(e){"2rem"==e.style.top?(e.style.visibility="visible",e.style.top="0px",e.style.opacity=1):(e.style.top="2rem",e.style.opacity=0,setTimeout(()=>{e.style.visibility="hidden"},200))}function dN(e){e.style.display="none"}window.addEventListener("load",()=>{document.querySelector("#topActions").style.display="flex",qr.innerHTML=new QRCode({content:window.location.href,container:"svg-viewbox",join:!0,ecl:"L",padding:0}).svg()}),navigator.canShare?s.addEventListener("click",()=>{navigator.share({title:document.title,text:"You can view my Digital Business Card here:",url:window.location.href})}):s.addEventListener("click",()=>{tC(m),cv.style.display="flex",dN(qrv),ki&&dN(ki)}),sqr.addEventListener("click",()=>{tC(m),qrv.style.display="block",dN(cv),ki&&dN(ki)}),sk&&sk.addEventListener("click",()=>{tC(m),ki&&(ki.style.display="flex"),dN(cv),dN(qrv)}),c.addEventListener("click",()=>tC(m)),curl.addEventListener("click",async()=>{let e=curl.querySelectorAll(".action")[1];await navigator.clipboard.writeText(window.location.href).then(t=>{e.innerText="Copied",setTimeout(()=>{e.innerText="Copy URL"},1e3)})});'
            h.querySelector('body').appendChild(modals)
            // Inject media script
            let mediaHandler = document.createElement('script')
            mediaHandler.innerText =
                'let pC=document.querySelectorAll(".pCtrl"),pP=document.querySelectorAll(".playPause"),srcs=document.querySelectorAll(".source");srcs.forEach(e=>{e.style.pointerEvents="none",e.removeAttribute("controls")}),pC.forEach((e,l)=>{e.style.display="flex";let r=e.querySelector(".currentTime"),s=e.querySelector(".seekBar"),t=e.querySelector(".playPause"),a=t.querySelector(".play"),c=t.querySelector(".pause");srcs[l].addEventListener("timeupdate",()=>{let e=srcs[l].currentTime,t=100/srcs[l].duration*e;s.value=t,100==t&&(s.value=0,a.style.display="block",c.style.display="none");let o=Math.floor(e/60),y=Math.floor(e%60);o.toString().length<2&&(o="0"+o),y.toString().length<2&&(y="0"+y),r.value=o+":"+y}),s.addEventListener("change",()=>{srcs[l].currentTime=srcs[l].duration*(parseInt(s.value)/100)}),t.addEventListener("click",()=>{srcs[l].paused?(srcs.forEach((e,r)=>{l!=r&&(e.paused||e.pause())}),pP.forEach((e,l)=>{let r=e.querySelector(".play"),s=e.querySelector(".pause");r.style.display="block",s.style.display="none"}),srcs[l].play(),a.style.display="none",c.style.display="block"):(srcs[l].pause(),c.style.display="none",a.style.display="block")})});'
            if (state.featuredSections.length > 0)
                h.querySelector('body').appendChild(mediaHandler)
            let htm = new Blob(
                [`<!DOCTYPE html>${h.documentElement.outerHTML}`],
                {
                    type: 'text/html'
                }
            )
            // const themeCSS = generateCSS(state.slectedFont.charAt(0).toUpperCase() + state.slectedFont.slice(1),'sans-serif')
            const themeCSS = generateCSS(state.selectedFont.fontFace, state.selectedFont.fontStyle)
            let css = new Blob([themeCSS], {
                type: 'text/css'
            })
            let qrScript = new Blob([QRCode()], {
                type: 'application/javascript'
            })
            let vcfContent = await axios.post(`/api/vcf`, {
                ...state
            })
            const vcf = new Blob([vcfContent.data], { type: 'text/vcard' });
            let username = state?.personalInfo?.firstName
            let zip = new JSZip()
            zip.folder(username).file('index.html', htm)
            zip.folder(username).file('style.min.css', css)
            zip.folder(username).file('qrcode.min.js', qrScript)
            zip.folder(username).file(`${state?.personalInfo?.firstName}.vcf`, vcf)
            if (state?.coverImage) {
                zip.folder(username)
                    .file(`cover.${state?.coverImage?.ext}`, state?.coverImage?.resized)
            }
            if (state?.brandLogo) {
                zip.folder(username)
                    .file(`logo.${state?.headShot?.ext}`, state?.headShot?.resized)
            }
            if (state?.headShot) {
                zip.folder(username)
                    .file(`profile.${state?.headShot?.ext}`, state?.headShot?.resized)
            }
            if (state?.favIcon?.image) {
                zip.folder(username)
                    .file(`icon.${state?.favIcon?.image?.ext}`, state?.favIcon?.image?.file)
            }
            state?.featuredSections?.length > 0 && state?.featuredSections?.map((featuredSection, index) => {
                const key = Object.keys(featuredSection)[0]
                featuredSection[key].sectionItems.map((item, index) => {
                    const key1 = Object.keys(item)[0]
                    const type = key1.split("_")[0]
                    const fileName = key1.split("_")[1]
                    if (type === 'image') {
                        zip
                            .folder(username)
                            .folder('media')
                            .file(`${fileName}.${item[key1].ext}`, item[key1].file)
                    }
                    if (type === 'video') {
                        zip
                            .folder(username)
                            .folder('media')
                            .file(`${fileName}_video.${item[key1].ext}`, item[key1].file)
                        zip
                            .folder(username)
                            .folder('media')
                            .file(`${fileName}_cover.${item[key1].coverExt}`, item[key1].cover)
                    }
                    if (type === 'music') {
                        zip
                            .folder(username)
                            .folder('media')
                            .file(`${fileName}_music.${item[key1].ext}`, item[key1]?.file)
                        if (item[key1].cover) {
                            zip
                                .folder(username)
                                .folder('media')
                                .file(`${fileName}_cover.${item[key1].coverExt}`, item[key1].cover)
                        }
                    }
                    if (type === 'pdf') {
                        zip
                            .folder(username)
                            .folder('media')
                            .file(`${fileName}_pdf.${item[key1].ext}`, item[key1]?.file)
                        if (item[key1].cover) {
                            zip
                                .folder(username)
                                .folder('media')
                                .file(`${fileName}_cover.${item[key1].coverExt}`, item[key1].cover)
                        }
                    }
                    if (type === 'product' && item[key1].image.file) {
                        zip
                            .folder(username)
                            .folder('media')
                            .file(`${fileName}_product.${item[key1].image.ext}`, item[key1].image.file)
                    }
                })
            })
            const zipBlob = await zip.generateAsync({ type: 'blob' })
            saveAs(zipBlob, `${username}'s Digital Business Card.zip`)
            return resolve(true)
        })
    }
    const changePreviwMode = async () => {
        return new Promise((res, rej) => {
            dispatch({ previewMode: false })
            return res()
        })
    }
    const handleDownload = async () => {

        setLoading(true)
        try {
            const res = await axios.post("/api/checkCount",{
                item:'cardGeneration'
            })
            if (res?.status === 200) {
                await downloader()
                dispatch({ previewMode: true })
            }

        } catch (error) {
            if (error?.response?.status === 400 || error?.response?.status === 400){
                notify(error?.response?.data?.message,'error',{})
            }else{
                notify('Something went wrong', 'error', {})
            }

        }finally{
            setLoading(false)
        }


    }
    return (
        <div className='flex flex-col justify-center items-start gap-4 max-w-[448px] mb-10'>
            <h2 className='text-2xl font-semibold text-primary-dark-blue2'>
                Download
            </h2>
            <div className='pl-4 flex flex-col gap-4'>
                <h3 className='text-lg font-semibold text-primary-dark-blue2'>
                    Please complete the checklist to proceed
                </h3>
                <div className='flex flex-col items-start gap-4'>
                    <div className='flex gap-4 justify-start items-center '>
                        <div className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary-dark-blue2'>
                            <input checked={risk} onChange={() => setRisk(!risk)} className='h-8 w-8 cursor-pointer appearance-none rounded-full bg-primary-light-blue  outline-none checked:bg-primary-dark-blue2' type='checkbox' />
                        </div>
                        <div className='max-w-[380px]'><p >I did not attach any link or file that will cause <br /> any risk to the user</p></div>
                    </div>
                    <div className='flex gap-4 justify-start items-center '>
                        <div className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary-dark-blue2'>
                            <input checked={link} onChange={() => setLink(!link)} className='h-8 w-8 cursor-pointer appearance-none rounded-full bg-primary-light-blue  outline-none checked:bg-primary-dark-blue2' type='checkbox' />
                        </div>
                        <div className='max-w-[380px]'><p >I have verified that all the links are working correctly</p></div>
                    </div>
                    <div className='flex gap-4 justify-start items-center '>
                        <div className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary-dark-blue2'>
                            <input checked={fields} onChange={() => setFields(!fields)} className='h-8 w-8 cursor-pointer appearance-none rounded-full bg-primary-light-blue  outline-none checked:bg-primary-dark-blue2' type='checkbox' />
                        </div>
                        <div className='max-w-[380px]'><p >I have removed all unused fields and sections</p></div>
                    </div>
                </div>
            </div>
            <button
                onClick={handleDownload}
                disabled={!risk || !link || !fields}
                className="mt-2 font-semibold duration-500 ease-in-out transition uppercase px-4 sm:px-8 hover:bg-primary-dark-blue2 hover:text-primary-light-blue border-[1px] border-primary-dark-blue2 py-4 rounded-full bg-primary-light-blue text-primary-dark-blue2  disabled:text-gray-600 disabled:hover:bg-primary-light-blue disabled:cursor-not-allowed">
                Download as zip
            </button>
        </div>
    )
}
export default Download
// footer text link text url