'use client'

import React from 'react';
import { saveAs } from 'file-saver';
import { useGlobalContext } from '@/app/context/context';
import Download  from '../assets/icons/download.svg'

function DocumentViwer({ media, type, PreviewMode, fileName, hasLightBG ,item}) {

    const { state } = useGlobalContext()
    const getTitle = (e) => {
        return e.toLowerCase().split(' ').join('_');
    };

    let fileURL =   `${fileName}_pdf.${media.ext}`
    let coverURL = `${fileName}_cover.${ media.coverExt }`


    const downloadDocument = () => {
        saveAs(
            window.URL.createObjectURL(media.file),
            `${media.title}.pdf`
        );
    };

    return (
        <div className="mediaC">
            <div>
                <img
                    src={
                        PreviewMode
                            ? media.coverDataURI
                            : `./media/${coverURL}`
                    }
                    alt={media.title}
                />
            </div>
            <div className={`controls  ${PreviewMode ? 'font-' + state?.[item]?.Font?.cls : '' } `}>
                <p
                style={{
                color: state?.[item]?.Color ? state?.[item]?.Color : 'black',
                fontSize: state?.[item]?.FontSize ? state?.[item]?.FontSize + 'px' : '16px',
                fontWeight: state?.[item]?.FontWeight ? state?.[item]?.FontWeight : "normal",
                fontStyle: state?.[item]?.FontStyle ? state?.[item]?.FontStyle : 'normal',

               ...(!PreviewMode ?{fontFamily: state?.[item]?.Font?.fontFace}:{ }),
                marginTop: "40px;",

            }}
                className="title ">{media.title}</p>
                <p
                    style={{
                        color: state?.[item]?.Color ? state?.[item]?.Color : 'black',
                        fontSize: state?.[item]?.FontSize ? state?.[item]?.FontSize + 'px' : '16px',
                        fontWeight: state?.[item]?.FontWeight ? state?.[item]?.FontWeight : "normal",
                        fontStyle: state?.[item]?.FontStyle ? state?.[item]?.FontStyle : 'normal',
                        paddingTop: "20px;",

                    }}
                className="mediaInfo ">PDF - {media.filesize}</p>
                <div


                className="docDl">
                    <a
                        className="dlBtn"
                        onClick={downloadDocument}
                        style={{ backgroundColor: state?.[item]?.buttonBackgroundColor?state?.[item]?.buttonBackgroundColor:'black'}}
                        href={
                            PreviewMode
                                ? ''
                                : `./media/${fileURL}`
                        }
                        download
                        target="_blank"
                    >
                        <div
                            className="icon action"
                            style={{ stroke:state?.[item]?.buttonColor?state?.[item]?.buttonColor:'white'}}
                        >
                            <Download/>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default DocumentViwer;