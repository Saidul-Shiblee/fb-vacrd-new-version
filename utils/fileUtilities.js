'use client'


import parse from 'id3-parser';
import { convertFileToBuffer } from 'id3-parser/lib/util';


export function resizeImage(file, type, mime) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let img = document.createElement('img');
        let maxWidth, maxHeight;

        reader.onload = e => {
            img.src = e.target.result;
            img.onload = () => {
                if (type == 'headShot') {
                    canvas.width = canvas.height = 320;
                } else {
                    if (type == 'brandLogo') {
                        maxWidth = 1056;
                        maxHeight = 288;
                    } else if (type == 'icon') {
                        maxWidth = 16;
                        maxHeight = 16;
                    } else {
                        maxWidth = maxHeight = 1296;
                    }
                    let width = img.width;
                    let height = img.height;

                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                    canvas.width = width;
                    canvas.height = height;
                }
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                canvas.toBlob(
                    blob => {
                        const resizedImage = new File([blob], type, { type: mime });
                        resolve(resizedImage); // Resolve the Promise with the resized image.
                    },
                    mime,
                    0.8
                );
            }
        };
        reader.onerror = error => {
            reject(error); // Reject the Promise if there's an error reading the file.
        };

        reader.readAsDataURL(file);
    });
}

export function chekImageType(e, type) {
    let file = e.target.files[0]
    let mime = file.type
    if (
        type == 'logo' &&
        file.type.match(/image\/(svg\+xml|png|jpeg|gif|webp)/)
    ) {
        return {
            message: "OK"
        }
    } else if (file.type.match(/image\/(png|jpeg|gif|webp)/)) {
        return {
            message: "OK"
        }
    } else {
        if (type == 'logo') {
            return {
                message: 'Unsupported file format.\nOnly jpeg, png, webp, gif and svg file can be attached.'
            }
        } else {
            return {
                message: 'Unsupported file format.\nOnly jpeg, png, webp, gif and svg file can be attached.'
            }
        }
    }
}
// imageLoaded(file, type, mime) {
//     let reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onload = f => {
//         let dataURI = f.target.result
//         let ext = dataURI
//             .split(',')[0]
//             .split(':')[1]
//             .split('/')[1]
//             .match(/^\w+/g)[0]

//         if (type == 'logo' || type == 'icon' || mime.match(/gif|webp/)) {

//             const 
//             this.content[type] = {
//                 url: dataURI,
//                 blob: file,
//                 ext,
//                 mime,
//                 resized: file
//             }
//             console.log(this.content)
//             if (!mime.match(/svg|gif|webp/)) this.resizeImage(type, mime)
//             debugger
//             console.log(this.content)
//         } else {
//             this.content.photo.ext = ext
//             this.mime = mime
//             this.tempURL = dataURI
//             this.showCropper = true
//         }
//     }

// }

//Determine file type
export function mediaType(t) {
    switch (true) {
        case t == 'image/jpeg' || t == 'image/png':
            return 'image'
        case t == 'audio/mpeg':
            return 'music'
        case t == 'video/mp4' || t == 'video/webm':
            return 'video'
        case t == 'application/pdf':
            return 'document'
    }
}

function getFileName(file) {
    return file.name.replace(/(?:\.([^.]+))?$/, '')
}


// handle Image file
export function handleImageFile(file, type, mime) {
    return new Promise((resolve, reject) => {
        let title = getFileName(file)
        let reader = new FileReader()
        reader.onload = async (f) => {
            let dataURI = f.target.result
            const ext = file?.name?.split('.').pop();
            const resizedFIle = await resizeImage(file, type, mime)
            resolve({
                name: file.name,
                title,
                dataURI,
                file: resizedFIle,
                type,
                contentType: 'media',
                ext,
                mime
            })
        }
        reader.onerror = error => {
            reject(error);
        };
        reader.readAsDataURL(file)
    })

}

// handle Music file
export async function handleMusicFile(file, type) {
    return new Promise((resolve, reject) => {
        convertFileToBuffer(file)
            .then(parse)
            .then(async (tag) => {
                if (tag) {
                    if (tag.image) {
                        let cover = new Blob([new Uint8Array(tag.image.data)])
                        let coverDataURI = URL.createObjectURL(cover)

                        resizedCover = await resizeImage(cover, type, 'image/jpeg')

                        resolve({
                            name: file.name,
                            cover: resizedCover,
                            coverDataURI,
                            coverExt: 'jpeg',
                            title: tag.title,
                            artist: tag.artist,
                            album: tag.album,
                            dataURI: URL.createObjectURL(file),
                            type,
                            contentType: 'media',
                            file,
                            ext: 'mp3'
                        })

                    } else {
                        resolve({
                            name: file.name,
                            title: tag.title,
                            artist: tag.artist,
                            album: tag.album,
                            dataURI: URL.createObjectURL(file),
                            type,
                            contentType: 'media',
                            file,
                            ext: 'mp3',
                            info: 'No Thumb'
                        })

                    }
                } else {
                    resolve({
                        name: file.name,
                        title: getFileName(file),
                        dataURI: URL.createObjectURL(file),
                        type,
                        contentType: 'media',
                        file,
                        ext: 'mp3',
                        info: 'No ID3 Tag'
                    })
                }
            })
    })
}

// handle video file
export async function handleVideoFile(file, type) {
    return new Promise(async (resolve, reject) => {
        let title = getFileName(file);
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let video = document.createElement('video');
        let videoFile, dataURI;
        let maxWidth, maxHeight;
        maxWidth = maxHeight = 80;
        let reader = new FileReader();
        let uA = navigator.userAgent.match(/firefox|android/gi);
        async function videoProcessor () {
            let width = video.videoWidth;
            let height = video.videoHeight;

            if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
            }
            if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            let coverDataURI = canvas.toDataURL('image/jpeg', 0.8);

            let cover = dataURItoBlob(coverDataURI)

            let resizedCover = await  resizeImage(cover, 'videocover', 'image/jpeg')

            const resultObject = {
                name: file.name,
                coverDataURI,
                coverExt: 'jpeg',
                dataURI,
                file,
                title,
                type,
                contentType: 'media',
                ext: 'mp4',
                cover: resizedCover
            };

            resolve(resultObject);
        }

        if (uA && uA.length == 2) {
            video.addEventListener('loadstart', videoProcessor);
        } else {
            video.addEventListener('seeked', videoProcessor);
        }

        reader.onload = f => {
            videoFile = new Blob([f.target.result], { type: 'video/mp4' });
            dataURI = URL.createObjectURL(videoFile);
            video.src = dataURI + '#t=0.2';
        };

        reader.onerror = error => {
            reject(error);
        };

        reader.readAsArrayBuffer(file);
    });
}




//handle Pdf File
function dataURIToBinary(dataURI) {
    var BASE64_MARKER = ';base64,'
    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length
    var base64 = dataURI.substring(base64Index)
    var raw = window.atob(base64)
    var rawLength = raw.length
    var array = new Uint8Array(new ArrayBuffer(rawLength))

    for (let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i)
    }
    return array
}
function formatBytes(a, b = 2) {
    if (0 === a) return '0 Bytes'
    const c = 0 > b ? 0 : b,
        d = Math.floor(Math.log(a) / Math.log(1024))
    return (
        parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
        ' ' +
        ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]
    )
}
export function handlePDFFile(file, type) {
    if (typeof window !== "undefined")
   {
        const pdfjs = require("react-pdf").pdfjs;
        const DynamicPDFWorker =`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
        pdfjs.GlobalWorkerOptions.workerSrc = DynamicPDFWorker
        pdfjs.disableWorker = true
        pdfjs.workerSrc = false
    return new Promise((resolve, reject) => {
        let filesize = formatBytes(file.size);
        let title = getFileName(file);
        let reader = new FileReader();
        let data, maxWidth, maxHeight;
        maxWidth = maxHeight = 1296;
        reader.onload = f => {
            data = dataURIToBinary(f.target.result);
            let loadingTask = pdfjs.getDocument(data);
            loadingTask.promise
                .then(pdf => {
                    pdf.getPage(1).then(page => {
                        let canvas = document.createElement('canvas');
                        let ctx = canvas.getContext('2d');
                        let scale = 1;
                        let viewport = page.getViewport({ scale });
                        let width = viewport.width;
                        let height = viewport.height;

                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                        canvas.width = width;
                        canvas.height = height;
                        var renderContext = {
                            canvasContext: ctx,
                            viewport: viewport,
                        };
                        page.render(renderContext).promise.then(e => {
                            let coverDataURI = canvas.toDataURL('image/jpeg', 0.8);
                            let cover = new Blob([dataURIToBinary(coverDataURI)], {
                                type: 'image/jpeg',
                            });
                            const resultObject = {
                                name: file.name,
                                cover,
                                coverDataURI,
                                coverExt: 'jpeg',
                                file,
                                filesize,
                                title,
                                type,
                                contentType: 'media',
                                ext: 'pdf',
                            };

                            resolve(resultObject);
                        });
                    });
                })
                .catch(error => {
                    reject(error);
                });
        };

        reader.readAsDataURL(file);
    });

}
}


function dataURItoBlob(dataURI) {

    const dataPart = dataURI.split(',')[1];
    const binaryData = atob(dataPart);
    const dataArray = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
        dataArray[i] = binaryData.charCodeAt(i);
    }
    return new Blob([dataArray], { type: 'image/jpeg' }); // Specify the MIME type here
}


// function readFileAsync(file) {
//     return new Promise((resolve, reject) => {
//         let reader = new FileReader();
//         reader.onload = () => {
//             resolve(reader.result);
//         };
//         reader.onerror = reject;
//         reader.readAsArrayBuffer(file);
//     });
// }


// async function extractPdfPage(arrayBuff) {
//     const pdfSrcDoc = await PDFDocument.load(arrayBuff);
//     const pdfNewDoc = await PDFDocument.create();
//     const pages = await pdfNewDoc.copyPages(pdfSrcDoc, [1]);
//     pages.forEach((page) => pdfNewDoc.addPage(page));
//     const newpdf = await pdfNewDoc.save();
//     return newpdf;
// }

// export async function handlePDFFile(file,type){
//     const pdfArrayBuffer = await readFileAsync(file);
//     const newPdfDoc = await extractPdfPage(pdfArrayBuffer);
//     const blob = new Blob([newPdfDoc]);
//     let mfile = new File([blob], 'thumbnail', { type: 'image/jpeg' });
//     return mfile
    
// }