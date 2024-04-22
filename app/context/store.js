import FontFaces from '../../utils/fontConst'



export const DEFAULT_STATE = {
    coverImage: null,
    brandLogo: null,
    brandLogoStyle:{
        width:'120px',
        height:'70px',
        blur:4,
        verticalOffset:2,
        horizontalOffset:-4,
        shadowColor:'#8f8f8f'
    },

    headShot: null,
    headShotPosition:'center',
    headShotRingColor:'',
    personalInfo: {
        prefix: "",
        firstName: "",
        lastName: "",
        email: "",
        jobTitle: "",
        businessName: "",
        streetAddress: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        businessDescription: ""
    },
    url: "",
    primaryActions: [],
    secondaryActions: [],
    featuredSections: [],
    color: {
        headerBackground: "#e4e4e4",
        headerFontColor:"#000000",
        bodyBackground: "#ffffff",
        buttonBackground: "#FF534B",
        featuredContentBackground: "#d8fcff"
    },
    analyticsCode: "",

    downloadQuestions:{
        q1:false,
        q2:false,
        q3:false
    } ,
    hostedUrl:"",
    selectedFont: FontFaces[0],
    previewMode : true,


    headerStyle:{
        headerBackground: "#e4e4e4",
        headerFontColor: "#000000",
    },
    bodyStyle:{
        bodyBackground: "#ffffff",
    },


    mainsectionStyle:{
    backgroundColor:'#dddddd',
    boxShadow: 'badge1',
    nameColor:'black',
    nameFontSize:'28',
    nameFontWeight:'700',
    nameFont:{
        cls:"inter",
        fontFace:"Inter",
        fontStyle:"sans-serif",
        linkText:"Inter"
    },
    nameFontStyle:'normal',
    positionColor:'black',
    positionFontSize:'17',
    positionFontWeight:'500',
        positionFont: {
            cls: "inter",
            fontFace: "Inter",
            fontStyle: "sans-serif",
            linkText: "Inter"
        },
    positionFontStyle:'italic',
    companyNameColor:'black',
    companyNameFontSize:'17',
    companyNameFontWeight:"600",
    companyNameFont: {
            cls: "inter",
            fontFace: "Inter",
            fontStyle: "sans-serif",
            linkText: "Inter"
        },
    companyNameFontStyle:'normal',
    emailNameColor:'black',
    emailNameFontSize:'17',
    emailNameFontWeight:"500",
    emailNameFont:{
        cls:"inter",
        fontFace:"Inter",
        fontStyle:"sans-serif",
        linkText:"Inter"
    },
    emailNameFontStyle:'normal',
        saveContactButtonColor:'#232323',
    saveContactColor:'#ffffff',
    saveContactFontSize: '24',
    saveContactFontWeight: "normal",
    saveContactFont: {
        cls:"inter",
        fontFace:"Inter",
        fontStyle:"sans-serif",
        linkText:"Inter"
    },
    saveContactFontStyle: 'normal',
        saveContactButtonBorderRadius:'20',
    saveContactButtonAnimation: '',
},


addressStyle:{
    addressColor: 'black',
    addressFontSize: '17',
    addressFontWeight: "500",
    addressFont: {
        cls: "inter",
        fontFace: "Inter",
        fontStyle: "sans-serif",
        linkText: "Inter"
    },

    backgroundColor: '#dddddd',
    boxShadow: 'badge1',
},
aboutStyle:{
    aboutColor: 'black',
    aboutFontSize: '17',
    aboutFontWeight: "500",
    aboutFont: {
        cls: "inter",
        fontFace: "Inter",
        fontStyle: "sans-serif",
        linkText: "Inter"
    },

    backgroundColor: '#dddddd',
    boxShadow: 'badge1',
},
    primaryActionStyle:{
       backgroundColor: '#dddddd',
       boxShadow: 'badge1',
    },
    secondaryActionStyle:{
       backgroundColor: '#dddddd',
       boxShadow: 'badge1',
    }

}