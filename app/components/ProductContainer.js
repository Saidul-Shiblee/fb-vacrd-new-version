'use client'
import { useGlobalContext } from '@/app/context/context';
import React from 'react';

function ProductContainer({ product, colors, PreviewMode, fileName, hasLightBG,item }) {
    const { state } = useGlobalContext()







    const getTitle = (e) => {
        return e.toLowerCase().split(' ').join('_');
    };
    let fileURL = `${fileName}_product.${product?.image?.ext}`
    return (
        <div className={`content prodInfo ${state?.[item]?.containerBoxShadow}`} style={{
            backgroundColor: `${state?.[item]?.containerBackgroundColor ? state?.[item]?.containerBackgroundColor :'rgb(212 212 212)'}`,
            borderRadius: `${state?.[item]?.containerBorderRadius ? state?.[item]?.containerBorderRadius+'px' : '16px'}`,

            display:'flex',
            flexDirection:'row',
            minHeight:'250px',
            padding:'6px'}}

             >
            {product.image && (

                <div style={{ position: 'relative', width: '50%',
                order: state?.[item]?.layoutOrder === 1 ? 1:2 }}>
                <img
                        className={`${state?.[item]?.imageBoxShadow}`}
                    src={
                        PreviewMode
                            ? product.image.dataURI
                            : `./media/${fileURL}`
                    }
                    alt="Product image"
                        style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: `${state?.[item]?.imageBorderRadius ? state?.[item]?.imageBorderRadius + 'px' : '16px'}`,
                        opacity: `${state?.[item]?.imageOpacity ? state?.[item]?.imageOpacity/100 : 1}`,

                    }}
                />
            </div>
            )}
            <div style={{ padding: '1rem', order: state?.[item]?.layoutOrder === 2 ? 1 : 1 ,width:'50%'}} className="controls prodInfo ">
                <p
                    style={{
                        color: state?.[item]?.producHeadingColor ? state?.[item]?.producHeadingColor : 'black',
                        fontSize: state?.[item]?.producHeadingFontSize ? state?.[item]?.producHeadingFontSize + 'px' : '16px',
                        fontWeight: state?.[item]?.producHeadingFontWeight ? state?.[item]?.producHeadingFontWeight : "normal",
                        fontStyle: state?.[item]?.producHeadingFontStyle ? state?.[item]?.producHeadingFontStyle : 'normal',
                        ...(!PreviewMode ? { fontFamily: state?.[item]?.producHeadingFont?.fontFace } : {}),

                        width: '100%',
                        marginBottom:'10px'

                    }}
                    className={`${PreviewMode ? 'font-' + state?.[item]?.producHeadingFont?.cls : ''}`}>
                    {product.title}
                </p>
                {product.description && (
                    <p
                        style={{
                            color: state?.[item]?.productDescriptionColor ? state?.[item]?.productDescriptionColor : 'black',
                            fontSize: state?.[item]?.productDescriptionFontSize ? state?.[item]?.productDescriptionFontSize + 'px' : '16px',
                            fontWeight: state?.[item]?.productDescriptionFontWeight ? state?.[item]?.productDescriptionFontWeight : "normal",
                            fontStyle: state?.[item]?.productDescriptionFontStyle ? state?.[item]?.productDescriptionFontStyle : 'normal',

                            ...(!PreviewMode ? { fontFamily: state?.[item]?.productDescriptionFont?.fontFace } : {}),
                            textAlign:'center'


                        }}
                        className={`${PreviewMode ? 'font-' + state?.[item]?.productDescriptionFont?.cls : ''}`}>
                        {product.description}
                    </p>
                )}

                {product.price && (
                    <p
                        style={{
                            color: state?.[item]?.productPriceColor ? state?.[item]?.productPriceColor : 'black',
                            fontSize: state?.[item]?.productPriceFontSize ? state?.[item]?.productPriceFontSize + 'px' : '16px',
                            fontWeight: state?.[item]?.productPriceFontWeight ? state?.[item]?.productPriceFontWeight : "normal",
                            fontStyle: state?.[item]?.productPriceFontStyle ? state?.[item]?.productPriceFontStyle : 'normal',
                            ...(!PreviewMode ? { fontFamily: state?.[item]?.productPriceFont?.fontFace } : {}),
                            paddingTop: "20px;",

                        }}
                        className={`price ${PreviewMode ? 'font-' + state?.[item]?.productPriceFont?.cls : ''}`}>
                        {product.price}
                    </p>
                )}
                {product.price && (
                <input className={`email_input`} style={{ }} placeholder='Enter your email to place order' type='email' required />
                )}
                {product.buttonText && (
                    <a
                        className={`${PreviewMode ? 'font-' + state?.[item]?.buttonTextFont?.cls : ''}`}

                        style={{
                            backgroundColor: `${state?.[item]?.button ? state?.[item]?.button : 'black' }`,
                            color: state?.[item]?.buttonTextColor ? state?.[item]?.buttonTextColor : 'white',
                            borderRadius: state?.[item]?.buttonBorderRadius ? state?.[item]?.buttonBorderRadius+"px" : '8px',
                            fontSize: state?.[item]?.buttonTextFontSize ? state?.[item]?.buttonTextFontSize + 'px' : '16px',
                            fontWeight: state?.[item]?.buttonTextFontWeight ? state?.[item]?.buttonTextFontWeight : "normal",
                            fontStyle: state?.[item]?.buttonTextFontStyle ? state?.[item]?.buttonTextFontStyle : 'normal',
                            ...(!PreviewMode ? { fontFamily: state?.[item]?.buttonTextFont?.fontFace } : {}),

                            lineHeight: PreviewMode ? 'inherit' : '1.5rem',
                            padding:'8px 16px',


                        }}
                        target="_blank"
                        href={product.buttonLink}
                    >
                        {product.buttonText}
                    </a>
                )}
            </div>
        </div>
    );
}

export default ProductContainer;