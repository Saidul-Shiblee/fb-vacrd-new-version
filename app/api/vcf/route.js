var vCardsJS = require('vcards-js');



import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {

    let state = await request.json();

    var vCard = vCardsJS();

    let lastEncodedPart
    let headShot = state?.headShot?.url
    let str = headShot

    if (str) {
        let pieces = str.split(/[\s;]+/)
        let res = pieces[pieces.length - 1]
        let aotherpieces = res.split(/[\s,]+/)
        lastEncodedPart = aotherpieces[pieces.length - 1]

    }
    let PHONE = state?.primaryActions?.filter(el => el.name === 'call')?.[0]?.value ? state?.primaryActions?.filter(el => el.name === 'call')?.[0]?.value : "";
    let MOBILE = state?.primaryActions?.filter(el => el.name === 'mobile')?.[0]?.value ? state?.primaryActions?.filter(el => el.name === 'mobile')?.[0]?.value : "";
    let FAX = state?.primaryActions?.filter(el => el.name === 'fax')?.[0]?.value ? state?.primaryActions?.filter(el => el.name === 'fax')?.[0]?.value : ""
    let HOME = state?.primaryActions?.filter(el => el.name === 'home')?.[0]?.value ? state?.primaryActions?.filter(el => el.name === 'home')?.[0]?.value : "";
    let WHATSAPP = state?.primaryActions?.filter(el => el.name === 'whatsapp')?.[0]?.value ? state?.primaryActions?.filter(el => el.name === 'whatsapp')?.[0]?.value : "";
    let WORK = state?.primaryActions?.filter(el => el.name === 'office')?.[0]?.value ? state?.primaryActions?.filter(el => el.name === 'office')?.[0]?.value : "";
    let EMAIL = state?.primaryActions?.filter(el => el.name === 'email')?.[0]?.value ? state?.primaryActions?.filter(el => el.name === 'email')?.[0]?.value : "";
    let LOCATION = state?.primaryActions?.filter(el => el.name === 'locatoin')?.[0]?.value ? state?.primaryActions?.filter(el => el.name === 'locatoin')?.[0]?.value : "";
    // let WEBSITE = state?.primaryActions?.filter(el => el.name === 'website')?.[0]?.value ? state?.primaryActions?.filter(el => el.name === 'website')?.[0]?.value : "";
    let HOSTED_URL = state?.hostedUrl ? state?.hostedUrl : "";
    let FN = state?.personalInfo?.firstName,
        LN = state?.personalInfo?.lastName,
        TITLE = state?.personalInfo?.jobTitle,
        ORG = state?.personalInfo?.businessName,
        COMPANY = state?.personalInfo?.businessName,
        NOTE = state?.personalInfo?.businessDescription,
        GENDER = state?.personalInfo?.gender,
        PREFIX = state?.personalInfo?.prefix,
        STREET = state?.personalInfo?.streetAddress,
        CITY = state?.personalInfo?.city,
        STATE = state?.personalInfo?.state,
        POST = state?.personalInfo?.postalCode,
        COUNTRY = state?.personalInfo?.country;


    ;
    ;
    // let actions = [
    //     ...this.primaryActions,
    //     ...this.secondaryActions.map(e => {
    //         return { ...e, isURL: 1 }
    //     })
    // ]
    // let urls = actions
    //     .map(e => {
    //         if (e.isURL && e.value) {
    //             return {
    //                 title: e.name.charAt(0).toUpperCase() + e.name.slice(1),
    //                 url:
    //                     (e.href ? e.href : '') + e.value + (e.hrefEnd ? e.hrefEnd : '')
    //             }
    //         }
    //         return false
    //     })
    //     .filter(e => e)


    // let note = this.genInfo.desc
    //     ? this.genInfo.desc.replace(/[\r\n]+/gm, '')
    //     : null
    // let key = this.pubKeyIsValid ? window.btoa(this.genInfo.key) : null
    // let randomNumber = Math.floor(100000000 + Math.random() * 900000)


    vCard.firstName = FN
    vCard.lastName = LN
    vCard.organization = ORG
    vCard.photo.embedFromString(lastEncodedPart, 'PNG');
    vCard.workPhone = WORK;
    vCard.title = TITLE;
    // vCard.url = 'https://github.com/enesser';
    // vCard.workUrl = 'https://acme-corporation/enesser';
    vCard.note = NOTE;

    //set other vitals

    vCard.namePrefix = PREFIX;
    vCard.gender = GENDER;
    vCard.role = TITLE;

    //set other phone numbers
    vCard.homePhone = HOME;
    vCard.cellPhone = MOBILE;
    vCard.workFax = FAX;
    //set email addresses
    vCard.email = EMAIL;
    vCard.workAddress.label = 'Work Address';
    vCard.workAddress.street = STREET
    vCard.workAddress.city = CITY;
    vCard.workAddress.postalCode = POST;
    vCard.workAddress.countryRegion = COUNTRY;
    // vCard.url = WEBSITE

    vCard.workUrl = HOSTED_URL


    //set social media URLs
    vCard.socialUrls['facebook'] = 'https://...';
    vCard.socialUrls['linkedIn'] = 'https://...';
    vCard.socialUrls['twitter'] = 'https://...';

    vCard.version = '3.0';

    let response = NextResponse.next()

    // response.headers.set('Content-Type', 'text/vcard');



    return NextResponse.json(vCard.getFormattedString());
}










// END: VCARD


// NOTE; CHARSET = UTF - 8: { { vCard.NOTE } }
// // ADR; CHARSET = UTF - 8: { { vCard.ADDRESS } }