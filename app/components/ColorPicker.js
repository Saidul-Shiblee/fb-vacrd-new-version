import React, { useEffect, useRef, useState } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import 'animate.css';
import { useGlobalContext } from '@/app/context/context';
const ColorPicker = (props) => {
    const { dispatch } = useGlobalContext();
    const { colorOf, defaultColor, setOpen, item = 'color', selectedIcon, icon } = props;
    const [color, setColor] = useState(defaultColor || '#aabbcc');
    const colorPickerRef = useRef();
    useEffect(() => {
        const colorPicker = colorPickerRef.current;
        colorPicker.classList.add('animate__zoomIn');
        if (colorPickerRef) {
            colorPicker.addEventListener('animationend', () => {
                if (colorPicker.classList.contains('animate__zoomIn')) {
                    colorPicker.classList.remove('animate__zoomIn');
                }
            });
        }
    }, []);
    useEffect(() => {
        if (icon) {
            dispatch({
                ChangeIcon: {
                    field: colorOf,
                    id: selectedIcon?.id,
                    value: color,
                },
            });
        } else {
            dispatch({
                ChangeColorOrText: {
                    field: colorOf,
                    item: item,
                    value: color,
                },
            });
        }
    }, [color]);
    useEffect(() => {
        const picker = document.getElementById('color_picker')
        picker.addEventListener('click', function (event) {
            event.stopPropagation();
        })
        const closeModal = () => {
            if (colorPickerRef) {
                setOpen(false);
            }
        };
        document.addEventListener('click', closeModal);
        return () => {
            document.removeEventListener('click', closeModal);
        };
    }, [colorPickerRef]);
    return (
        <div
            id='color_picker'
            ref={colorPickerRef}
            className='animate__animated colorPicker absolute z-50 top-0 left-[72px] mb-4 bg-white border-[1px] border-[#ff544b] w-[210px] border-dotted p-1 rounded-[4px] shadow-xl  flex flex-col justify-center items-start gap-2'
        >
            <HexColorPicker color={color} onChange={setColor} />
            <div className='flex  items-center gap-2 w-[180px]'>
                <div className='px-2 bg-[#ff544b] text-white text-sm font-semibold h-[32px] rounded-[4px] flex justify-center items-center'>
                    HEX
                </div>
                <div className='hexInput '>
                    <HexColorInput color={color} onChange={setColor} />
                </div>
            </div>
        </div>
    );
};
export default ColorPicker;