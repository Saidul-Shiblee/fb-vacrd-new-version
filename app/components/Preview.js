'use client'
import React, { useEffect, useRef, useState, } from 'react';
// import MediaPlayer from './MediaPlayer';
// import DocumentDownloader from './DocumentDownloader';
// import ProductShowcase from './ProductShowcase';
import { useGlobalContext } from '@/app/context/context';
import '../assets/css/theme1.css'
import QRCode from '../assets/icons/qrcode.svg'
import Share from '../assets/icons/share.svg'
import Key from '../assets/icons/key.svg'
import Save from '../assets/icons/add-user.svg'
import MediaPlayer from './MedidaPlayer';
import DocumentViwer from './DocumentViwer';
import ProductContainer from './ProductContainer';
import Copy from '../assets/icons/copy.svg'
import Close from '../assets/icons/close.svg'
import Download from '../assets/icons/download.svg'
import axios from 'axios';
import IconComponent from "@/utils/svgIcon";
import { MdEdit } from "react-icons/md";
import { useSize } from '@/app/hooks/useSize';
const Preview = (props) => {
    const { state, setDrawerOpen, setEditSection, setIconID, editSectionType, setEditSectionType, editFeaturedSectionID, setEditFeaturedSectionID } = useGlobalContext()


    const [currentIcon, setCurrentIcon] = useState('')
    const handleMouserEnter = (e) => {
        const pElement = e.target?.querySelector('p')?.innerText;
        setCurrentIcon(pElement)
    }
    const handleMouserLeave = (e) => {
        setCurrentIcon('')
    }
    const { dispatch } = useGlobalContext();
    const target = useRef(null)
    const size = useSize(target)
    useEffect(() => {
        if (size?.width && size?.height) {
            dispatch({
                brandLogoStyle: {
                    width: `${size.width}px`,
                    height: `${size.height}px`,
                },
            });
        }
    }, [size?.width, size?.height])
    const downloadVCF = async (e) => {
        e.preventDefault()
        try {
            let vcfContent = await axios.post(`/api/vcf`, {
                ...state
            })
            const blob = new Blob([vcfContent.data], { type: 'text/vcard' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'contact.vcf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log(error)
        }
    };
    let PreviewMode = state?.previewMode
    const location = `${state?.personalInfo?.streetAddress} <br/> ${state?.personalInfo?.city} <br/> ${state?.personalInfo?.state} - ${state?.personalInfo?.postalCode}
        <br/> ${state?.personalInfo?.country}`
    const isLocation = state?.personalInfo?.streetAddress || state?.personalInfo?.city || state?.personalInfo?.state || state?.personalInfo?.postalCode || state?.personalInfo?.country
    const fullNameWithOutSpace = state?.personalInfo?.prefix + state?.personalInfo?.firstName + state?.personalInfo?.lastName
    const fullName = state?.personalInfo?.prefix + " " + state?.personalInfo?.firstName + " " + state?.personalInfo?.lastName
    const TrimmedFullName = fullName.trim()
    const hasLightBG = (hex) => {
        hex = hex.slice(1)
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
        }
        let r = parseInt(hex.slice(0, 2), 16)
        let g = parseInt(hex.slice(2, 4), 16)
        let b = parseInt(hex.slice(4, 6), 16)
        const brightness = Math.round(
            (parseInt(r) * 299 + parseInt(g) * 587 + parseInt(b) * 114) / 1000
        )
        return brightness > 125 ? true : false
    }
    const dropShadow = `${state?.brandLogoStyle?.horizontalOffset}px ${state?.brandLogoStyle?.verticalOffset}px ${state?.brandLogoStyle?.blur}px ${state?.brandLogoStyle?.shadowColor}`
    // const parseString = (val) => {
    //     return val.replace(/ /g, '');;
    // }
    // const getEmbedContent = () => {
    //     return embedded
    //         .map((e) => {
    //             return {
    //                 title: e.title,
    //                 content: e.content.filter((f) => stripAttr(f)),
    //             };
    //         })
    //         .filter((e) => e);
    // };
    // const getCssHref = () => {
    //     if (genInfo.fontLink) {
    //         let html = new DOMParser().parseFromString(state?.fontLink, 'text/html');
    //         let link = Array.from(html.getElementsByTagName('link')).filter(
    //             (e) => e.getAttribute('rel') === 'stylesheet'
    //         );
    //         return link.length && link[0].getAttribute('href');
    //     }
    //     return false;
    // };
    // const getFontFamily = () => {
    //     let regex = /^font-family[^;]*/;
    //     let css = state?.fontCss.replace(/\s+/, '');
    //     if (regex.test(css)) {
    //         return css.match(/^font-family[^;]*/)[0];
    //     }
    // };
    const getHref = (e) => {
        let value = null;
        if (e.name === 'Viber' && e.value)
            value = e.value.replace(/[\s\-()]/g, '').replace(/\+/, '%2B');
        return e.href
            ? e.href + (value || e.value) + (e.hrefEnd ? e.hrefEnd : '')
            : value || e.value;
    };
    const stripAttr = (val) => {
        if (/<iframe(.*)\/iframe>/.test(val)) {
            let iframe = val.match(/<iframe(.*)\/iframe>/)[0];
            return iframe.match(/src="?([^"\s]+)"/)[1];
        } else return null;
    };
    const toggleContainer = (e) => {
        if (e.style.top === '2rem') {
            e.style.visibility = 'visible';
            e.style.top = '0px';
            e.style.opacity = 1;
        } else {
            e.style.top = '2rem';
            e.style.opacity = 0;
            setTimeout(() => {
                e.style.visibility = 'hidden';
            }, 200);
        }
    };
    const showKey = () => {
        let modal = document.getElementById('modal');
        let copyView = document.getElementById('copyView');
        let qrView = document.getElementById('qrView');
        toggleContainer(modal);
        copyView.style.display = qrView.style.display = 'none';
    };
    const closePublicKey = () => {
        let modal = document.getElementById('modal');
        toggleContainer(modal);
    };
    const sharingAlert = () => {
        showAlert(
            'You are able to share your business card after completing the hosting process.\n\nCheck out the <a className="underline font-extrabold text-green-600 hover:text-green-500 transition-colors duration-200" href="https://vcard.fyi/getbaer/" target="_blank">demo</a> to test the functionality.'
        );
    };
    return (
        <div id="Theme1 "
            className={`font-${state.selectedFont.cls}`}
        >
            <div id='html' style={{
                backgroundColor: `${state?.color?.headerBackground}`,
            }}>
                <div id="head"></div>
                <div id="body">
                    {/* QR/Share/Key Modal */}
                    <div
                        id="modal"
                        style=
                        {{
                            backgroundColor: `${state?.color?.bodyBackground}`,
                            visibility: "hidden",
                            top: "2rem",
                            opacity: 0
                        }}
                    >
                        <div id="closeModal">
                            <a id="close" className="closeBtnColor">
                                <div
                                    style={hasLightBG(state?.color?.bodyBackground) ? { filter: "invert(1)" } : { filter: "" }}
                                    className="icon"
                                >
                                    <Close />
                                </div>
                            </a>
                        </div>
                        <div id="modalView">
                            <div id="keyInfo">
                                <p
                                    style={hasLightBG(state?.color?.bodyBackground) ? { filter: "invert(1)" } : { filter: "" }}
                                    className="text">
                                    Use my public key to send me encrypted messages
                                </p>
                                <a
                                    href={!PreviewMode ? `./${state?.personalInfo?.firstName}'s public key.asc` : ""}
                                    download
                                    target="_blank"
                                    id="dlKey"
                                    rel="noreferrer"
                                    style={{
                                        backgroundColor: `${state?.color?.bodyBackground}`, color: "inherit", textDecoration: "inherit",
                                        cursor: "pointer"
                                    }}
                                    tabIndex="-1"
                                >
                                    <div
                                        className="icon action"
                                        style={hasLightBG(state?.color?.bodyBackground) ? { filter: "invert(1)" } : { filter: "" }}
                                    >
                                        <Download />
                                    </div>
                                    <span
                                        style={hasLightBG(state?.color?.bodyBackground) ? { filter: "invert(1)" } : { filter: "" }}
                                        className="action">Download Key</span>
                                </a>
                            </div>
                            <div id="copyView">
                                <p
                                    style={hasLightBG(state?.color?.bodyBackground) ? { filter: "invert(1)" } : { filter: "" }}
                                    className="text">
                                    Copy and send the URL to share my Business Card
                                </p>
                                <button
                                    id="copyURL"
                                    style={{ backgroundColor: `${state?.color?.bodyBackground}` }}
                                >
                                    <div
                                        className="icon action"
                                    >
                                        <Copy />
                                    </div>
                                    <span
                                        style={hasLightBG(state?.color?.bodyBackground) ? { filter: "invert(1)" } : { filter: "" }}
                                        className="action">Copy URL</span>
                                </button>
                            </div>
                            <div
                                style={hasLightBG(state?.color?.bodyBackground) ? { filter: "invert(1)" } : { filter: "" }}
                                id="qrView">
                                <div id="qr"></div>
                                <h2 className="text">Scan the QR Code</h2>
                                <p className="text">to view my Business Card on another device</p>
                            </div>
                        </div>
                    </div>
                    {/* Header */}
                    <header
                        className={`header ${PreviewMode && 'group'}`}
                        style={{
                            backgroundColor: `${state?.headerStyle?.headerBackground}`,
                            marginTop: PreviewMode ? "" : "2rem",
                            position: 'relative'
                        }
                        }
                    >
                        {PreviewMode && <div
                            className='absolute flex justify-center items-center  top-1 w-6 h-6 right-1 rounded-full opacity-0 group-hover:opacity-100  transition-all duration-300 ease-in-out cursor-pointer bg-gray-500 drop-shadow-2xl'>
                            <MdEdit onClick={() => {
                                setEditSection('Header')
                                setDrawerOpen(true)
                            }
                            } className='w-[18px] h-[18px] active:scale-90 cursor-pointer' />
                        </div>
                        }
                        <div
                            id="topActions"
                            style={PreviewMode ? { display: 'flex' } : { display: 'none' }}
                        >
                            <div>
                                <a id="share">
                                    <div
                                        className="icon topAction "
                                    >
                                        <Share style={{ stroke: state?.headerStyle?.headerFontColor }} />
                                    </div>
                                </a>
                                <a id="showQR"
                                ><div
                                    className="icon topAction"
                                >
                                        <QRCode style={{ fill: state?.headerStyle?.headerFontColor }} />
                                    </div>
                                </a>
                            </div>
                            <a
                                id="showKey"
                            ><div
                                className="icon topAction"
                            >
                                    <Key style={{ stroke: state?.headerStyle?.headerFontColor }} />
                                </div>
                            </a>
                        </div>
                    </header>
                    {/* Body */}
                    <main
                        className='group'
                        style={{
                            backgroundColor: `${state.bodyStyle.bodyBackground}`,
                        }}>
                        {PreviewMode && <div
                            className='absolute flex justify-center items-center  top-[70px] w-6 h-6 right-1 rounded-full opacity-0 group-hover:opacity-100  transition-all duration-300 ease-in-out cursor-pointer bg-gray-500 drop-shadow-2xl'>
                            <MdEdit onClick={(e) => {
                                e.stopPropagation()
                                setEditSection('Body')
                                setDrawerOpen(true)
                            }
                            } className='w-[18px] h-[18px] active:scale-90 cursor-pointer' />
                        </div>
                        }
                        {/* Brand Logo */}
                        {state?.brandLogo?.url && <div
                            className="headerImgC mx-auto"
                            style={{
                                filter: `drop-shadow(${dropShadow})`,
                                width: '130px',
                                height: '60px',
                                overflow: 'hidden',
                                maxWidth: '400px',
                                ...(PreviewMode ? { resize: 'both' } : {}),
                                position: 'relative',
                                // ...(PreviewMode ? {border : '1px solid gray'}:{}),
                                marginLeft: 'auto',
                                marginRight: 'auto',
                            }}
                            ref={target}
                        >
                            <img
                                className=''
                                src={state?.brandLogo?.url}
                                alt="resizable"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    position: 'absolute',
                                }}
                            />
                            <div
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    position: "absolute",
                                    bottom: "-10px",
                                    right: "-10px",
                                    cursor: "nwse-resize"
                                }} >
                            </div>
                            {PreviewMode && <div
                                className='absolute flex justify-center items-center  w-6 h-6 right-1 rounded-full opacity-0 group-hover:opacity-100  transition-all duration-300 ease-in-out cursor-pointer bg-gray-500 drop-shadow-2xl'>
                                <MdEdit onClick={() => {
                                    setEditSection('brandimage')
                                    setDrawerOpen(true)
                                }
                                } className='w-[18px] h-[18px] active:scale-90 cursor-pointer text-white' />
                            </div>
                            }
                        </div>}
                        {/* Main Section */}
                        {(state?.headShot?.url || TrimmedFullName || state?.personalInfo?.email || state?.personalInfo?.businessName || state?.personalInfo?.jobTitle) &&<div className='group' style={{ width: '100%', paddingTop: '4rem', }}>
                            <div style={{ width: '100%' }}>
                                <div
                                    class={state?.mainsectionStyle?.boxShadow}
                                    style={{
                                        minHeight: '300px',
                                        background: state?.mainsectionStyle?.backgroundColor,
                                        width: '100%',
                                        margin: "6rem auto",
                                        borderRadius: "1rem",
                                        position: "relative",
                                    }}
                                >
                                    <div class="headshot">
                                        <div style={{ background: state?.headShot?.url && state?.headShotRingColor }} class="headshot_image_wrapper">
                                            {state?.headShot?.url && <img
                                                style={{
                                                    position: "absolute",
                                                    borderRadius: "999px",
                                                    width: "90%",
                                                    height: "90%",
                                                    left: "50%",
                                                    top: "50%",
                                                    transform: "translate(-50%, -50%)",
                                                }}
                                                src={PreviewMode ? state?.headShot?.url : `./profile.${state?.headShot?.ext}`}
                                                alt=""
                                            />}
                                        </div>
                                    </div>
                                    <div class="contact_details ">
                                        <h2
                                            style={{
                                                color: state?.mainsectionStyle?.nameColor,
                                                fontSize: state?.mainsectionStyle?.nameFontSize + 'px',
                                                fontWeight: state?.mainsectionStyle?.nameFontWeight,
                                                fontStyle: state?.mainsectionStyle?.nameFontStyle,
                                                marginBottom: "8px",
                                                ...(!PreviewMode ? { fontFamily: state.mainsectionStyle.nameFont.fontFace } : {})
                                            }}
                                            className={` ${PreviewMode ? 'font-' + state.mainsectionStyle.nameFont.cls : ''}`}
                                        >
                                            {TrimmedFullName}
                                        </h2>
                                        <p
                                            style={{
                                                color: state?.mainsectionStyle?.positionColor,
                                                fontSize: state?.mainsectionStyle?.positionFontSize + 'px',
                                                fontWeight: state?.mainsectionStyle?.positionFontWeight,
                                                fontStyle: state?.mainsectionStyle?.positionFontStyle,
                                                marginBottom: "5px",
                                                ...(!PreviewMode ? { fontFamily: state.mainsectionStyle.positionFont.fontFace } : {})
                                            }}
                                            className={` ${PreviewMode ? 'font-' + state.mainsectionStyle.positionFont.cls : ''}`}
                                        >
                                            {state?.personalInfo?.jobTitle}
                                        </p>
                                        <p style={{
                                            color: state?.mainsectionStyle?.companyNameColor,
                                            fontSize: state?.mainsectionStyle?.companyNameFontSize + 'px',
                                            fontWeight: state?.mainsectionStyle?.companyNameFontWeight,
                                            fontStyle: state?.mainsectionStyle?.companyNameFontStyle,
                                            ...(!PreviewMode ? { fontFamily: state.mainsectionStyle.companyNameFont.fontFace } : {})
                                        }}
                                            className={` ${PreviewMode ? 'font-' + state.mainsectionStyle.companyNameFont.cls : ''}`}
                                        >
                                            {state?.personalInfo?.businessName}
                                        </p>
                                        <p style={{
                                            color: state?.mainsectionStyle?.emailNameColor,
                                            fontSize: state?.mainsectionStyle?.emailNameFontSize + 'px',
                                            fontWeight: state?.mainsectionStyle?.emailNameFontWeight,
                                            fontStyle: state?.mainsectionStyle?.emailNameFontStyle,
                                            ...(!PreviewMode ? { fontFamily: state.mainsectionStyle.emailNameFont.fontFace } : {})
                                        }}
                                            className={` ${PreviewMode ? 'font-' + state.mainsectionStyle.emailNameFont.cls : ''}`}
                                        >
                                            {state?.personalInfo?.email}
                                        </p>
                                    </div>
                                    {PreviewMode && <div
                                        className='absolute flex justify-center items-center  top-[10px] w-6 h-6 right-1 rounded-full opacity-0 group-hover:opacity-100  transition-all duration-300 ease-in-out cursor-pointer bg-gray-500 drop-shadow-2xl'>
                                        <MdEdit onClick={() => {
                                            setEditSection('Contact Info')
                                            setDrawerOpen(true)
                                        }
                                        } className='w-[18px] h-[18px] active:scale-90 cursor-pointer text-white' />
                                    </div>
                                    }
                                    <div
                                        onClick={downloadVCF}
                                        className={`${state?.mainsectionStyle?.saveContactButtonAnimation}`}
                                        style={{
                                            position: "absolute",
                                            bottom: "-20px",
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <a
                                            style={{
                                                backgroundColor: state?.mainsectionStyle?.saveContactButtonColor,
                                                color: state?.mainsectionStyle?.saveContactColor,
                                                fontSize: state?.mainsectionStyle?.saveContactFontSize + 'px',
                                                fontWeight: state?.mainsectionStyle?.saveContactFontWeight,
                                                fontStyle: state?.mainsectionStyle?.saveContactFontStyle,
                                                borderRadius: state?.mainsectionStyle?.saveContactButtonBorderRadius + 'px',
                                                ...(!PreviewMode ? { fontFamily: state.mainsectionStyle.saveContactFont.fontFace } : {})
                                            }}
                                            className={`save_contact ${PreviewMode ? 'font-' + state.mainsectionStyle.saveContactFont.cls : ''}`}
                                            href={!PreviewMode ? `./${state?.personalInfo?.firstName}.vcf` : ""}
                                            download={!PreviewMode ? true : undefined}
                                            aria-label="Save Contact"
                                        >
                                            Save Contact
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        {/* Address & About Us */}
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }}>
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '10px',
                                }}>
                                {isLocation && <div
                                    className={`${state?.addressStyle?.boxShadow} group relative `}
                                    style={{
                                        width: '49%',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        padding: "10px",
                                        color: 'black',
                                        background: state?.addressStyle?.background,
                                    }}
                                >
                                    {location ? <p
                                        style={{
                                            wordWrap: "break-word", width: "100%",
                                            fontSize: state?.addressStyle?.addressFontSize + 'px',
                                            color: state?.addressStyle?.addressColor,
                                            fontWeight: state?.addressStyle?.addressFontWeight,
                                            fontStyle: state?.addressStyle?.addressFontStyle,
                                            ...(!PreviewMode ? { fontFamily: state.addressStyle.addressFont.fontFace } : {})
                                        }}
                                        className={`bizaddr ${PreviewMode ? 'font-' + state.addressStyle.addressFont.cls : ''}`} dangerouslySetInnerHTML={{ __html: location }}></p> : null}
                                    {PreviewMode && <div
                                        className='absolute flex justify-center items-center  top-[10px] w-6 h-6 right-1 rounded-full opacity-0 group-hover:opacity-100  transition-all duration-300 ease-in-out cursor-pointer bg-gray-500 drop-shadow-2xl'>
                                        <MdEdit onClick={() => {
                                            setEditSection('Address')
                                            setDrawerOpen(true)
                                        }
                                        } className='w-[18px] h-[18px] active:scale-90 cursor-pointer text-white' />
                                    </div>
                                    }
                                </div>}
                                {state?.personalInfo?.businessDescription && <div
                                    className={`${state?.aboutStyle?.boxShadow} group relative `}
                                    style={{
                                        width: '49%',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        padding: "10px",
                                        background: state?.aboutStyle?.background,
                                    }}
                                >
                                    <p
                                        style={{
                                            wordWrap: "break-word",
                                            width: "100%",
                                            fontSize: state?.aboutStyle?.aboutFontSize + 'px',
                                            color: state?.aboutStyle?.aboutColor,
                                            fontWeight: state?.aboutStyle?.aboutFontWeight,
                                            fontStyle: state?.aboutStyle?.aboutFontStyle,
                                            ...(!PreviewMode ? { fontFamily: state.aboutStyle.aboutFont.fontFace } : {})
                                        }}
                                        className={`desc text ${PreviewMode ? 'font-' + state.aboutStyle.aboutFont.cls : ''} `}>
                                        {state?.personalInfo?.businessDescription}
                                    </p>
                                    {PreviewMode && <div
                                        className='absolute flex justify-center items-center  top-[10px] w-6 h-6 right-1 rounded-full opacity-0 group-hover:opacity-100  transition-all duration-300 ease-in-out cursor-pointer bg-gray-500 drop-shadow-2xl'>
                                        <MdEdit onClick={() => {
                                            setEditSection('About')
                                            setDrawerOpen(true)
                                        }
                                        } className='w-[18px] h-[18px] active:scale-90 cursor-pointer text-white' />
                                    </div>
                                    }
                                </div>}
                            </div>
                        </div>
                        {/* Primary Actions */}
                        {state?.primaryActions?.length > 0 && <div
                            className={`${state?.primaryActionStyle?.boxShadow} group relative `}
                            style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                paddingTop: '20px',
                                paddingBottom: "20px",
                                marginTop: '20px',
                                background: state?.primaryActionStyle?.background
                            }}>
                            {state?.primaryActions.map(el =>
                                <div
                                    onMouseEnter={handleMouserEnter}
                                    onMouseLeave={handleMouserLeave}
                                    key={el.id}
                                    className="actionsC relative group"
                                >
                                    <div className="actionBtn">
                                        <a
                                            href={getHref(el)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                backgroundColor: el.style.background,
                                            }}
                                            aria-label={el.name}
                                        >
                                            <IconComponent
                                                style={
                                                    {
                                                        width: el.style.size + "px",
                                                        height: el.style.size + "px",
                                                        fill: el.style.fill,
                                                    }
                                                }
                                                icon={el.icon} />
                                        </a>
                                        <p
                                            style={{
                                                color: el.style.textColor,
                                                fontSize: el.style.textFontSize + 'px',
                                                fontStyle: el.style.textFontStyle,
                                            }}
                                            className="text">
                                            {
                                                el.name.substr(0, 1).toUpperCase() + el.name.slice(1)
                                            }
                                        </p>
                                        {PreviewMode && currentIcon === el.name.substr(0, 1).toUpperCase() + el.name.slice(1) && <div
                                            className='absolute flex justify-center items-center  top-[10px] w-6 h-6 right-1 rounded-full opacity-0 group-hover:opacity-100  transition-all duration-300 ease-in-out cursor-pointer bg-gray-500 drop-shadow-2xl'>
                                            <MdEdit onClick={() => {
                                                setEditSection('Icon')
                                                setIconID(el.id)
                                                setDrawerOpen(true)
                                            }
                                            } className='w-[18px] h-[18px] active:scale-90 cursor-pointer text-white' />
                                        </div>
                                        }
                                    </div>
                                </div>
                            )}
                            {PreviewMode && <div
                                className='absolute flex justify-center items-center  top-[10px] w-6 h-6 right-1 rounded-full opacity-0 group-hover:opacity-100  transition-all duration-300 ease-in-out cursor-pointer bg-gray-500 drop-shadow-2xl'>
                                <MdEdit onClick={() => {
                                    setEditSection('Primary Action')
                                    setDrawerOpen(true)
                                }
                                } className='w-[18px] h-[18px] active:scale-90 cursor-pointer text-white' />
                            </div>
                            }
                        </div>}
                        {/* Secondary Actions */}
                        {state?.secondaryActions?.length > 0 && <div
                            style={{
                                paddingTop: '20px',
                                paddingBottom: "20px",
                                position: 'relative',
                                background: state?.secondaryActionStyle?.background
                            }}
                            className={`${state?.secondaryActionStyle?.boxShadow} actions secondary  group `}
                        >
                            {
                                state?.secondaryActions.length > 0 &&
                                state?.secondaryActions.map(el =>
                                    <div
                                        key={el.id}
                                        className="actionsC"
                                    >
                                        <div className="actionBtn">
                                            <a
                                                href={getHref(el)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    backgroundColor: el.color
                                                }}
                                                aria-label={el.name}
                                            >
                                                <IconComponent icon={el.icon} />
                                            </a>
                                            <p
                                                className='text'
                                                style={
                                                    hasLightBG(state?.color?.bodyBackground) ? { filter: "invert(1)" } : { filter: "" }
                                                }>
                                                {
                                                    el.name.substr(0, 1).toUpperCase() + el.name.slice(1)
                                                }
                                            </p>
                                        </div>
                                    </div>
                                )}
                            {PreviewMode && <div
                                className='absolute flex justify-center items-center  top-[10px] w-6 h-6 right-1 rounded-full opacity-0 group-hover:opacity-100  transition-all duration-300 ease-in-out cursor-pointer bg-gray-500 drop-shadow-2xl'>
                                <MdEdit onClick={() => {
                                    setEditSection('Secondary Action')
                                    setDrawerOpen(true)
                                }
                                } className='w-[18px] h-[18px] active:scale-90 cursor-pointer text-white' />
                            </div>
                            }
                        </div>}
                        {/* Featured Section */}
                        {state?.featuredSections?.length > 0 && state?.featuredSections?.map((featuredSection, index) => {
                            const key = Object.keys(featuredSection)[0]
                            return (<div key={key} className="attachments" >
                                {featuredSection[key]?.sectionTitle && <div className='group relative'>
                                    <h2
                                        style={key ? {
                                            color: state?.[key]?.Color ? state?.[key]?.Color : 'black',
                                            fontSize: state?.[key]?.FontSize ? state?.[key]?.FontSize + 'px' : '16px',
                                            fontWeight: state?.[key]?.FontWeight ? state?.[key]?.FontWeight : "normal",
                                            fontStyle: state?.[key]?.FontStyle ? state?.[key]?.FontStyle : 'normal',
                                            ...(!PreviewMode ? { fontFamily: state?.[key]?.Font?.fontFace } : {})
                                        } : {}}
                                        className={`section text ${PreviewMode ? 'font-' + state?.[key]?.Font?.cls : ''}`}>{featuredSection[key]?.sectionTitle}</h2>
                                    {PreviewMode && <div
                                        className='absolute flex justify-center items-center  top-[10px] w-6 h-6 right-1 rounded-full opacity-0 group-hover:opacity-100  transition-all duration-300 ease-in-out cursor-pointer bg-gray-500 drop-shadow-2xl'>
                                        <MdEdit onClick={() => {
                                            setEditSection('Featured Section')
                                            setEditFeaturedSectionID(key)
                                            setEditSectionType('Title')
                                            setDrawerOpen(true)
                                        }
                                        } className='w-[18px] h-[18px] active:scale-90 cursor-pointer text-white' />
                                    </div>
                                    }
                                </div>}
                                {featuredSection[key].sectionItems.map((item, index) => {
                                    const key1 = Object.keys(item)[0]
                                    const type = key1.split("_")[0]
                                    const fileName = key1.split("_")[1]
                                    if (type === 'image') {
                                        return (
                                            <div
                                                key={key1}
                                                className={`content ${item[key1]?.type} ${state?.[key1]?.boxShadow} group relative`}
                                                style={key1 ? {
                                                    borderRadius: state?.[key1]?.borderRadius ? state?.[key1]?.borderRadius + "%" : "5%",
                                                    overflow: 'hidden',
                                                } : { overflow: 'hidden' }}
                                            >
                                                <div>
                                                    <img
                                                        style={key1 ? {
                                                            opacity: state?.[key1]?.Opacity ? state?.[key]?.Opacity : 1,
                                                        } : {}}
                                                        className=' '
                                                        src={PreviewMode ? item[key1].dataURI : `./media/${fileName}.${item[key1].ext}`}
                                                        alt="img" />
                                                </div>
                                                {PreviewMode && <div
                                                    className='absolute flex justify-center items-center  top-[10px] w-6 h-6 right-1 rounded-full opacity-0 group-hover:opacity-100  transition-all duration-300 ease-in-out cursor-pointer bg-gray-500 drop-shadow-2xl'>
                                                    <MdEdit onClick={() => {
                                                        setEditSection('Featured Section')
                                                        setEditFeaturedSectionID(key1)
                                                        setEditSectionType(type)
                                                        setDrawerOpen(true)
                                                    }
                                                    } className='w-[18px] h-[18px] active:scale-90 cursor-pointer text-white' />
                                                </div>
                                                }
                                            </div>
                                        )
                                    }
                                    if (type === 'music' || type === 'video') {
                                        return (
                                            <div
                                                key={key1}
                                                className={`content ${item[key1]?.type}`}
                                                style={{ backgroundColor: `${state?.color?.featuredContentBackground}` }}
                                            >
                                                <MediaPlayer
                                                    media={item[key1]}
                                                    type={item[key1]?.type}
                                                    PreviewMode={PreviewMode}
                                                    fileName={fileName}
                                                    hasLightBG={hasLightBG}
                                                />
                                            </div>
                                        )
                                    }
                                    if (type === 'pdf') {
                                        return (
                                            <div
                                                key={key1}
                                                className={`content ${item[key1]?.type} group relative ${state?.[key1]?.boxShadow}`}
                                                style={{ backgroundColor: state?.[key1]?.backGroundColor }}
                                            >
                                                <DocumentViwer
                                                    item={key1}
                                                    media={item[key1]}
                                                    type={item[key1]?.type}
                                                    PreviewMode={PreviewMode}
                                                    fileName={fileName}
                                                    hasLightBG={hasLightBG}
                                                />
                                                {PreviewMode && <div
                                                    className='absolute flex justify-center items-center  top-[5px] w-6 h-6 right-1 rounded-full opacity-0 group-hover:opacity-100  transition-all duration-300 ease-in-out cursor-pointer bg-gray-500 drop-shadow-2xl'>
                                                    <MdEdit onClick={() => {
                                                        setEditSection('Featured Section')
                                                        setEditFeaturedSectionID(key1)
                                                        setEditSectionType(type)
                                                        setDrawerOpen(true)
                                                    }
                                                    } className='w-[18px] h-[18px] active:scale-90 cursor-pointer text-white' />
                                                </div>
                                                }
                                            </div>
                                        )
                                    }
                                    if (type === 'product') {
                                        return (
                                            <div
                                                key={key1}
                                                className='relative group'
                                            >
                                                <ProductContainer
                                                    item={key1}
                                                    product={item[key1]}
                                                    PreviewMode={PreviewMode}
                                                    fileName={fileName}
                                                    hasLightBG={hasLightBG}
                                                />
                                                {PreviewMode && <div
                                                    className='absolute flex justify-center items-center  top-[5px] w-6 h-6 right-1 rounded-full opacity-0 group-hover:opacity-100  transition-all duration-300 ease-in-out cursor-pointer bg-gray-500 drop-shadow-2xl'>
                                                    <MdEdit onClick={() => {
                                                        setEditSection('Featured Section')
                                                        setEditFeaturedSectionID(key1)
                                                        setEditSectionType(type)
                                                        setDrawerOpen(true)
                                                    }
                                                    } className='w-[18px] h-[18px] active:scale-90 cursor-pointer text-white' />
                                                </div>
                                                }
                                            </div>
                                        )
                                    }
                                    if (type === 'text') {
                                        return (
                                            <div
                                                key={key1}
                                                className={`content text ${state?.[key1]?.boxShadow} group relative ${PreviewMode ? 'font-' + state?.[key1]?.Font?.cls : ''}`}
                                                style={{ backgroundColor: state?.[key1]?.backGroundColor }}
                                            >
                                                <p
                                                    style={{
                                                        color: state?.[key1]?.Color ? state?.[key1]?.Color : 'black',
                                                        fontSize: state?.[key1]?.FontSize ? state?.[key1]?.FontSize + 'px' : '16px',
                                                        fontWeight: state?.[key1]?.FontWeight ? state?.[key1]?.FontWeight : "normal",
                                                        fontStyle: state?.[key1]?.FontStyle ? state?.[key1]?.FontStyle : 'normal',
                                                        ...(!PreviewMode ? { fontFamily: state?.[key1]?.Font?.fontFace } : {}),
                                                        paddingTop: "20px;"
                                                    }}
                                                    className={`textC font-${state?.[key1]?.Font?.cls}`} >
                                                    {item[key1].text}
                                                </p>
                                                {PreviewMode && <div
                                                    className='absolute flex justify-center items-center  top-[5px] w-6 h-6 right-1 rounded-full opacity-0 group-hover:opacity-100  transition-all duration-300 ease-in-out cursor-pointer bg-gray-500 drop-shadow-2xl'>
                                                    <MdEdit onClick={() => {
                                                        setEditSection('Featured Section')
                                                        setEditFeaturedSectionID(key1)
                                                        setEditSectionType(type)
                                                        setDrawerOpen(true)
                                                    }
                                                    } className='w-[18px] h-[18px] active:scale-90 cursor-pointer text-white' />
                                                </div>
                                                }
                                            </div>
                                        )
                                    }
                                    if (type === 'button') {

                                        return (
                                            <div key={key1} className='relative group'>
                                                <div className="controls prodInfo pd1" style={{ marginTop: " 1%" }}>
                                                    <div className="actions" style={{ marginTop: "0% !important" }}>
                                                        <div id="cta" style={{ padding: "0%" }}>
                                                            <a
                                                                className={`${state?.[key1]?.boxShadow ? state?.[key1]?.boxShadow : 'badge1'}  ${PreviewMode ? 'font-'+ state?.[key1]?.Font?.cls : ''}`}
                                                                id="vcard" rel="noreferrer" target="_blank"
                                                                href={item[key1].link}
                                                                style=
                                                                {{
                                                                    backgroundColor: state?.[key1]?.buttonBackgroundColor ? state?.[key1]?.buttonBackgroundColor : 'black',
                                                                    width: "90%",
                                                                    padding: "1rem 1.5rem",
                                                                    lineHeight: "inherit",
                                                                    color: state?.[key1]?.Color ? state?.[key1]?.Color : 'white',
                                                                    fontSize: state?.[key1]?.FontSize ? state?.[key1]?.FontSize + 'px' : '16px',
                                                                    fontWeight: state?.[key1]?.FontWeight ? state?.[key1]?.FontWeight : "normal",
                                                                    fontStyle: state?.[key1]?.FontStyle ? state?.[key1]?.FontStyle : 'normal',
                                                                    borderRadius: state?.[key1]?.buttonBorderRadius ? state?.[key1]?.buttonBorderRadius + 'px' : '18px',
                                                                    ...(!PreviewMode ? { fontFamily: state?.[key1]?.Font?.fontFace } : {})
                                                                    // fontFamily: state?.[key1]?.Font?.fontFace ? state?.[key1]?.Font?.fontFace : 'Inter',
                                                                }}>
                                                                {item[key1].text}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                {PreviewMode && <div
                                                    className='absolute flex justify-center items-center  top-[5px] w-6 h-6 right-1 rounded-full opacity-0 group-hover:opacity-100  transition-all duration-300 ease-in-out cursor-pointer bg-gray-500 drop-shadow-2xl'>
                                                    <MdEdit onClick={() => {
                                                        setEditSection('Featured Section')
                                                        setEditFeaturedSectionID(key1)
                                                        setEditSectionType(type)
                                                        setDrawerOpen(true)
                                                    }
                                                    } className='w-[18px] h-[18px] active:scale-90 cursor-pointer text-white' />
                                                </div>
                                                }
                                            </div>
                                        )
                                    }
                                    if (type === 'iframe') {
                                        if (!stripAttr(item[key1].text)) return null
                                        return (
                                            <div key={item[key1].text} className="content embedded">
                                                <iframe
                                                    src={stripAttr(item[key1].text)}
                                                    frameborder="0"
                                                    allowfullscreen
                                                >
                                                </iframe>
                                            </div>
                                        )
                                    }
                                    if (type === 'code') {
                                        return (
                                            <div key={item[key1].text} className="content text"
                                                style={{ backgroundColor: `${state.color.featuredContentBackground}` }}>
                                                <div dangerouslySetInnerHTML={{ __html: item[key1].text }} />
                                            </div>
                                        )
                                    }
                                    const styles = {
                                        inputFocusColor: "#717982",
                                        inputFontSize: "22",
                                    };
                                    if (type === 'contact') {
                                        return (
                                            <div
                                            key={key1}
                                                style={{
                                                    marginTop: '20px'
                                                }}
                                                className='group relative '>
                                                <div className={`${state?.[key1]?.containerBoxShadow ? state?.[key1]?.containerBoxShadow : 'badge1'}`}
                                                    style={{
                                                        paddingLeft: state?.[key1]?.containerx ? state?.[key1]?.containerx + 'px' : '10px',
                                                        paddingRight: state?.[key1]?.containerx ? state?.[key1]?.containerx + 'px' : '10px',
                                                        paddingBottom: state?.[key1]?.containery ? state?.[key1]?.containery + 'px' : '10px',
                                                        paddingTop: state?.[key1]?.containery ? state?.[key1]?.containery + 'px' : '10px',
                                                        backgroundColor: state?.[key1]?.containerBackgroundColor ? state?.[key1]?.containerBackgroundColor : '#d4d4d4',
                                                        borderRadius: state?.[key1]?.containerBorderRadius ? state?.[key1]?.containerBorderRadius + 'px' : '8px',
                                                        borderColor: state?.[key1]?.inputBorderColor ? state?.[key1]?.inputBorderColor : 'black',
                                                        display: 'flex',
                                                        width: '100%',
                                                    }}>
                                                    <form
                                                        style={{
                                                            display: 'flex',
                                                            width: '100%',
                                                            flexDirection: 'column',
                                                            gap: state?.[key1]?.inputgap ? state?.[key1]?.inputgap + 'px' : '20px'
                                                        }}
                                                    >
                                                        <input
                                                            onfocus="this.style.border = '2px solid #CC4949'"
                                                            onblur="this.style.border = '2px solid #CC6666'"
                                                            className={`${state?.[key1]?.inputBoxShadow ? state?.[key1]?.inputBoxShadow : 'badge1'} ${PreviewMode ? 'font-' + state?.[key1]?.inputFont?.cls : ''}`}
                                                            style={{
                                                                paddingLeft: state?.[key1]?.inputx ? state?.[key1]?.inputx + 'px' : '10px',
                                                                paddingRight: state?.[key1]?.inputx ? state?.[key1]?.inputx + 'px' : '10px',
                                                                paddingBottom: state?.[key1]?.inputy ? state?.[key1]?.inputy + 'px' : '10px',
                                                                paddingTop: state?.[key1]?.inputy ? state?.[key1]?.inputy + 'px' : '10px',
                                                                backgroundColor: state?.[key1]?.inputBackgroundColor ? state?.[key1]?.inputBackgroundColor : 'transparent',
                                                                borderRadius: state?.[key1]?.inputBorderRadius ? state?.[key1]?.inputBorderRadius + 'px' : '8px',
                                                                // borderWidth: state?.[key1]?.inputBorderWidth ? state?.[key1]?.inputBorderWidth + 'px' : '1px',
                                                                ...(!PreviewMode ? { fontFamily: state?.[key1]?.inputFont?.fontFace } : {}),
                                                                // fontFamily: state?.[key1]?.inputFont?.fontFace ? state?.[key1]?.inputFont?.fontFace : 'Inter',
                                                                // color: state?.[key1]?.inputColor ? state?.[key1]?.inputColor+'solid' : 'black solid',
                                                                border: state?.[key1]?.inputBorderWidth && state?.[key1]?.inputColor ? state?.[key1]?.inputBorderWidth + 'px' + " " + "solid" + " " + state?.[key1]?.inputColor : '1px solid black',
                                                                fontSize: state?.[key1]?.inputFontSize ? state?.[key1]?.inputFontSize + 'px' : '14px',
                                                                outline: 0,
                                                                border: state?.[key1]?.inputBorderColor ? state?.[key1]?.inputBorderColor : 'black',
                                                            }}
                                                            name="name" type="text" class="feedback-input" placeholder="Name" required />
                                                        <input
                                                            className={`${state?.[key1]?.inputBoxShadow ? state?.[key1]?.inputBoxShadow : 'badge1'} ${PreviewMode ? 'font-' + state?.[key1]?.inputFont?.cls : ''}`}
                                                            style={{
                                                                paddingLeft: state?.[key1]?.inputx ? state?.[key1]?.inputx + 'px' : '10px',
                                                                paddingRight: state?.[key1]?.inputx ? state?.[key1]?.inputx + 'px' : '10px',
                                                                paddingBottom: state?.[key1]?.inputy ? state?.[key1]?.inputy + 'px' : '10px',
                                                                paddingTop: state?.[key1]?.inputy ? state?.[key1]?.inputy + 'px' : '10px',
                                                                backgroundColor: state?.[key1]?.inputBackgroundColor ? state?.[key1]?.inputBackgroundColor : 'transparent',
                                                                borderRadius: state?.[key1]?.inputBorderRadius ? state?.[key1]?.inputBorderRadius + 'px' : '8px',
                                                                ...(!PreviewMode ? { fontFamily: state?.[key1]?.inputFont?.fontFace } : {}),
                                                                // borderWidth: state?.[key1]?.inputBorderWidth ? state?.[key1]?.inputBorderWidth + 'px' : '1px',
                                                                // fontFamily: state?.[key1]?.inputFont?.fontFace ? state?.[key1]?.inputFont?.fontFace : 'Inter',
                                                                // color: state?.[key1]?.inputColor ? state?.[key1]?.inputColor+'solid' : 'black solid',
                                                                border: state?.[key1]?.inputBorderWidth && state?.[key1]?.inputColor ? state?.[key1]?.inputBorderWidth + 'px' + " " + "solid" + " " + state?.[key1]?.inputColor : '1px solid black',
                                                                fontSize: state?.[key1]?.inputFontSize ? state?.[key1]?.inputFontSize + 'px' : '14px',
                                                                outline: 0,
                                                                border: state?.[key1]?.inputBorderColor ? state?.[key1]?.inputBorderColor : 'black',
                                                            }}
                                                            name="email" type="email" class="feedback-input" placeholder="Email" required />
                                                        <textarea
                                                            className={`${state?.[key1]?.inputBoxShadow ? state?.[key1]?.inputBoxShadow : 'badge1'}  ${PreviewMode ? 'font-' + state?.[key1]?.inputFont?.cls : ''}`}
                                                            style={{
                                                                paddingLeft: state?.[key1]?.inputx ? state?.[key1]?.inputx + 'px' : '10px',
                                                                paddingRight: state?.[key1]?.inputx ? state?.[key1]?.inputx + 'px' : '10px',
                                                                paddingBottom: state?.[key1]?.inputy ? state?.[key1]?.inputy + 'px' : '10px',
                                                                paddingTop: state?.[key1]?.inputy ? state?.[key1]?.inputy + 'px' : '10px',
                                                                backgroundColor: state?.[key1]?.inputBackgroundColor ? state?.[key1]?.inputBackgroundColor : 'transparent',
                                                                borderRadius: state?.[key1]?.inputBorderRadius ? state?.[key1]?.inputBorderRadius + 'px' : '8px',
                                                                ...(!PreviewMode ? { fontFamily: state?.[key1]?.inputFont?.fontFace } : {}),
                                                                // borderWidth: state?.[key1]?.inputBorderWidth ? state?.[key1]?.inputBorderWidth + 'px' : '1px',
                                                                // fontFamily: state?.[key1]?.inputFont?.fontFace ? state?.[key1]?.inputFont?.fontFace : 'Inter',
                                                                // color: state?.[key1]?.inputColor ? state?.[key1]?.inputColor+'solid' : 'black solid',
                                                                border: state?.[key1]?.inputBorderWidth && state?.[key1]?.inputColor ? state?.[key1]?.inputBorderWidth + 'px' + " " + "solid" + " " + state?.[key1]?.inputColor : '1px solid black',
                                                                fontSize: state?.[key1]?.inputFontSize ? state?.[key1]?.inputFontSize + 'px' : '14px',
                                                                outline: 0,
                                                                border: state?.[key1]?.inputBorderColor ? state?.[key1]?.inputBorderColor : 'black',
                                                            }}
                                                            name="text" class="feedback-input" placeholder="Comment" required></textarea>
                                                        <input className={`${state?.[key1]?.buttonBoxShadow ? state?.[key1]?.buttonBoxShadow : 'badge1'} ${PreviewMode ? 'font-' + state?.[key1]?.buttonFont?.cls : ''}`} type="submit" value="SUBMIT" style={{
                                                            width: "100%",
                                                            backgroundColor: `${state?.[key1]?.buttonBackgroundColor ? state?.[key1]?.buttonBackgroundColor : 'black'}`,
                                                            color: state?.[key1]?.buttonColor ? state?.[key1]?.buttonColor : 'white',
                                                            borderRadius: state?.[key1]?.buttonBorderRadius ? state?.[key1]?.buttonBorderRadius + "px" : '8px',
                                                            fontSize: state?.[key1]?.buttonFontSize ? state?.[key1]?.buttonFontSize + 'px' : '16px',
                                                            fontWeight: state?.[key1]?.buttonFontWeight ? state?.[key1]?.buttonFontWeight : "normal",
                                                            fontStyle: state?.[key1]?.buttonFontStyle ? state?.[key1]?.buttonFontStyle : 'normal',
                                                            ...(!PreviewMode ? { fontFamily: state?.[key1]?.buttonFont?.fontFace } : {}),
                                                            lineHeight: PreviewMode ? 'inherit' : '1.5rem',
                                                            padding: '8px 16px',
                                                        }} />
                                                    </form>
                                                </div>
                                                {PreviewMode && <div
                                                    className='absolute flex justify-center items-center  top-[5px] w-6 h-6 right-1 rounded-full opacity-0 group-hover:opacity-100  transition-all duration-300 ease-in-out cursor-pointer bg-gray-500 drop-shadow-2xl'>
                                                    <MdEdit onClick={() => {
                                                        setEditSection('Featured Section')
                                                        setEditFeaturedSectionID(key1)
                                                        setEditSectionType(type)
                                                        setDrawerOpen(true)
                                                    }
                                                    } className='w-[18px] h-[18px] active:scale-90 cursor-pointer text-white' />
                                                </div>
                                                }
                                            </div>
                                        )
                                    }
                                })}
                            </div>)
                        }
                        )}
                    </main >
                    {/* Footer */}
                    <footer
                        style={{ backgroundColor: state?.color?.bodyBackground }}
                        class="text"
                    >
                        <p style={hasLightBG(state?.color?.bodyBackground) ? { filter: "invert(1)" } : { filter: "" }}>{state?.footer?.footerLinkText || 'Created with '}</p>
                        <a
                         class="text"
                            href={state?.footer?.footerURL || ''}
                            style={{
                                color: "#fff !important;",
                                ...(hasLightBG(state?.color?.bodyBackground) ? { filter: "invert(1)" } : { filter: "" })
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {state?.footer?.footerText || 'Flameback vCARD'}

                        </a>
                    </footer>
                </div>
            </div>
        </div>
    )
}
export default Preview;
