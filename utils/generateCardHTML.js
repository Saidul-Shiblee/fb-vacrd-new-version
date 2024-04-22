


export default function GenerateCardHTML(el,state){

    const fn = state?.personalInfo?.firstName
    const ln = state?.personalInfo?.lastName
    const bgColor = state.color.bodyBackground
    const btnColor = state.color.buttonBackground
    const title = state?.seo?.title
    const desc = state?.seo?.description
    const metaName = state?.metaData?.name
    const metaDesc = state?.metaData?.serviceOrProductName
    const metaURL = state?.metaData?.url





    return `<html
            lang="en"
            style=${`background-color:${bgColor}`}

        >
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta
                    name="author"
                    content="Flameback vCard  - Another Software Solution By Saidul"
                />
                <meta name="url" content="${metaURL ? metaURL:"https://flamebackvcard.com"}" />
                <meta name="designer" content="saidul" />
                ${!state?.favIcon?.image ?`<link
                    rel="icon"
                    type="image/png"
                    href="https://asset.cloudinary.com/dvxrxaens/29e21383197ade0686c60540e783c790"
                />`:`
                <link
                    style="border-radius:100%"
                    rel="icon"
                    type="image/png"
                    href="./icon.${state.favIcon.image.ext}"
                />
                `}

                    <meta name="robots" content="noindex, nofollow" />
                    <meta name="robots" content="none" />

                ${metaName && metaDesc && `<meta name="${metaName}" content="${metaDesc}" />`}

                ${title ? `<title>"${title}" </title>` : `<title> "${fn} ${ln}'s Digital Business Card "</title>`}

                ${!state?.seo?.title ? `<meta property="og:title" content="${`${fn} ${ln}'s Digital Business Card`}"/>` : `<meta property="og:title" content="${title}"/>`}
                ${!state?.seo?.title ? `<meta property="twiller:title" content="${`${fn} ${ln}'s Digital Business Card`}"/>` : `<meta property="twiller:title" content="${title}"/>`}
               <meta name="description" content="${desc ? desc : `${fn} ${ln}'s Digital Business Card`}" />
            </head>

            <!-- Google tag (gtag.js) -->
         ${!state?.analyticsCode ?
         `<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
            <script>
             window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${state?.analyticsCode});
           </script>` :""}

            <body
                id='body'
                style="line-height: 1.6;letter-spacing: 0.06em">
                    ${el}
            </body>

        </html>`




}



{/* {genInfo?.fontLink && (
                    <link rel="stylesheet" href={getCssHref()} />
                )}
                {genInfo?.fontCss && (
                    <style>{getFontFamily()}</style>
                )}
                {genInfo.favicon && (
                    <link rel="icon" href={genInfo.favicon} />
                )} */}




