import { useGlobalContext } from '@/app/context/context';
import generateVCF from '@/utils/generateVCF';
import axios from 'axios';
import React from 'react';




const VCardGenerator = () => {
  
    const { state } = useGlobalContext()
    const downloadVCF = async () => {
        let vcfContent = await axios.post(`/api/vcf`,{
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
    };

    return (
        <div>
            <button onClick={downloadVCF}>Download VCF</button>
        </div>
    );
};

export default VCardGenerator;