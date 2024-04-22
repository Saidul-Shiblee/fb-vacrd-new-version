




const PrimaryActions=[
        {
            id: 1,
            name: 'call',
            icon: 'call',
            href: 'tel:',
            placeholder: '+1 XXX XXX XXXX',
            value: "",
            label: 'Phone number',
            style:{
                size:"20",
                fill: '#e0f3f7',
                background: '#ff544b',
                textColor:'black',
                textFontSize: '18px',
                textFont: 'inter',
                textFontStyle: 'normal',

            }
        },
        {   id: 2,
            name: 'mobile',
            icon: 'mobile',
            href: 'tel:',
            placeholder: '+1 XXX XXX XXXX',
            value: "",
            label: 'Mobile number',
            style: {
                size: "20",
                fill: '#e0f3f7',
                background: '#ff544b',
                textColor:'black',
                textFontSize: '18px',
                textFont: 'inter',
                textFontStyle: 'normal',

            }
        },
        {   id: 3,
            name: 'office',
            icon: 'office',
            href: 'tel:',
            placeholder: '+1 XXX XXX XXXX',
            value: "",
            label: 'Office number'
            ,
            style: {
                size: "20",
                fill: '#e0f3f7',
                background: '#ff544b',
                textColor:'black',
                textFontSize: '18px',
                textFont: 'inter',
                textFontStyle: 'normal',

            }
        },
        {   id: 4,
            name: 'fax',
            icon: 'fax',
            href: 'tel:',
            placeholder: '+1 XXX XXX XXXX',
            value: "",
            label: 'Fax Number',
            style: {
                size: "20",
                fill: '#e0f3f7',
                background: '#ff544b',
                textColor:'black',
                textFontSize: '18px',
                textFont: 'inter',
                textFontStyle: 'normal',

            }
        },
        {   id: 5,
            name: 'home',
            icon: 'home',
            href: 'tel:',
            placeholder: '+1 XXX XXX XXXX',
            value: "",
            label: 'Home number',
            style: {
                size: "20",
                fill: '#e0f3f7',
                background: '#ff544b',
                textColor:'black',
                textFontSize: '18px',
                textFont: 'inter',
                textFontStyle: 'normal',

            }
        },
        {   id: 6,
            name: 'sms',
            icon: 'sms',
            href: 'SMS:',
            placeholder: '+1 XXX XXX XXXX',
            value: "",
            label: 'Phone number to send the SMS',
            style: {
                size: "20",
                fill: '#e0f3f7',
                background: '#ff544b',
                textColor:'black',
                textFontSize: '18px',
                textFont: 'inter',
                textFontStyle: 'normal',

            }
        },
        {   id: 7,
            name: 'whatsApp',
            icon: 'whatsApp',
            placeholder: 'https://wa.me/profileID',
            value: "",
            label: 'WhatsApp profile URL',
            style: {
                size: "20",
                fill: '#e0f3f7',
                background: '#ff544b',
                textColor:'black',
                textFontSize: '18px',
                textFont: 'inter',
                textFontStyle: 'normal',

            }
        },
        {   id: 8,
            name: 'messenger',
            icon: 'messenger',
            href: 'https://m.me/',
            placeholder: 'username',
            value: "",
            label: 'Facebook Messanger Link',
            style: {
                size: "20",
                fill: '#e0f3f7',
                background: '#ff544b',
                textColor:'black',
                textFontSize: '18px',
                textFont: 'inter',
                textFontStyle: 'normal',

            }
        },
        {   id: 9,
            name: 'telegram',
            icon: 'telegram',
            href: 'https://t.me/',
            placeholder: 'username',
            value: "",
            label: 'Telegram profile URL',
            style: {
                size: "20",
                fill: '#e0f3f7',
                background: '#ff544b',
                textColor:'black',
                textFontSize: '18px',
                textFont: 'inter',
                textFontStyle: 'normal',

            }
        },
        {   id: 10,
            name: 'email',
            icon: 'email',
            href: 'mailto:',
            placeholder: 'info@example.com',
            value: "",
            label: 'Email address',
            style: {
                size: "20",
                fill: '#e0f3f7',
                background: '#ff544b',
                textColor:'black',
                textFontSize: '18px',
                textFont: 'inter',
                textFontStyle: 'normal',

            }
        },
        // {   id: 11,
        //     name: 'website',
        //     icon: 'website',
        //     placeholder: 'https://example.com',
        //     value: "",
        //     label: 'Website URL'
        // },
        {   id: 12,
            name: 'calendar',
            icon: 'calendar',
            placeholder: 'https://example.com',
            value: "",
            label: 'Calender',
            style: {
                size: "20",
                fill: '#e0f3f7',
                background: '#ff544b',
                textColor:'black',
                textFontSize: '18px',
                textFont: 'inter',
                textFontStyle: 'normal',

            }
        },
        {   id: 13,
            name: 'store',
            icon: 'store',
            placeholder: 'https://example.com/storeID',
            value: "",
            label: 'Online Store URL',
            style: {
                size: "20",
                fill: '#e0f3f7',
                background: '#ff544b',
                textColor:'black',
                textFontSize: '18px',
                textFont: 'inter',
                textFontStyle: 'normal',

            }
        },
        {   id: 14,
            name: 'location',
            icon: 'location',
            placeholder: 'https://goo.gl/maps/location',
            value: "",
            label: 'Map location URL',
            style: {
                size: "20",
                fill: '#e0f3f7',
                background: '#ff544b',
                textColor:'black',
                textFontSize: '18px',
                textFont: 'inter',
                textFontStyle: 'normal',

            }
        },

        {   id: 15,
            name: 'matrix',
            icon: 'matrix',
            href: 'https://matrix.to/#/',
            placeholder: '@username:matrix.org',
            value: "",
            label: 'Matrix userID',
            order: 10,
            isURL: 1,
            style: {
                size: "20",
                fill: '#e0f3f7',
                background: '#ff544b',
                textColor:'black',
                textFontSize: '18px',
                textFont: 'inter',
                textFontStyle: 'normal',

            }
        },
        {   id: 16,
            name: 'skype',
            icon: 'skype',
            href: 'skype:',
            hrefEnd: '?chat',
            placeholder: 'username',
            value: "",
            label: 'Skype username',
            order: 13,
            isURL: 1,
            style: {
                size: "20",
                fill: '#e0f3f7',
                background: '#ff544b',
                textColor:'black',
                textFontSize: '18px',
                textFont: 'inter',
                textFontStyle: 'normal',

            }
        },
        {   id: 17,
            name: 'line',
            icon: 'line',
            href: 'https://line.me/ti/p/',
            placeholder: 'LINE ID',
            value: "",
            label: 'Line profile ID',
            order: 14,
            isURL: 1,
            style: {
                size: "20",
                fill: '#e0f3f7',
                background: '#ff544b',
                textColor:'black',
                textFontSize: '18px',
                textFont: 'inter',
                textFontStyle: 'normal',


            }
        },
        {   id: 18,
            name: 'viber',
            icon: 'viber',
            href: 'viber://chat?number=',
            placeholder: 'XX XXXXX XXXXX',
            value: "",
            label: 'Viber mobile number',
            order: 15,
            isURL: 1,
            style: {
                size: "20",
                fill: '#e0f3f7',
                background: '#ff544b',
                textColor:'black',
                textFontSize: '18px',
                textFont: 'inter',
                textFontStyle: 'normal',

            }
        }
    ]







export default PrimaryActions