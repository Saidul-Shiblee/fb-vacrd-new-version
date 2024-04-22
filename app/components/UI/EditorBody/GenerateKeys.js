import { useGlobalContext } from "@/app/context/context";
import React, { useRef, useState } from "react";
import Toggle from "../../toggleButton";
import axios from "axios";
import { CopyToClipboard } from 'react-copy-to-clipboard';

const GenerateKeys = () => {
  const { dispatch } = useGlobalContext();
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const ref = useRef();
  const [keys, setKeys] = useState(null);
  const [copied, setCopied] = React.useState({
    privateKey:false,
    publicKey:false
  });


  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  const handleCopyClick = (textToCopy,type) => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(textToCopy)
      .then(() => {
        // If successful, update the isCopied state value
        setCopied(pv=>({
          ...pv,
          [type]:true
        }));

        setTimeout(() => {
          setCopied({
            privateKey: false,
            publicKey: false
          });
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  }



  const downloadKey = (content,type) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${type}.asc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  const handleCopy=(textToCopy)=>{
    navigator.clipboard.writeText(textToCopy)
  }

  const handleGenerate = async () => {
    let keys = await axios.post(`/api/genKey`, {
      name,
      email,
      passphrase,
    });
    setKeys(keys?.data?.keys);
    document.getElementById("gen_key").showModal();
  };

  const closeModal = () => {
    ref.current.close();

  };

  return (
    <div className="flex flex-col justify-center items-start gap-4">
      <h2 className="text-2xl font-semibold text-primary-dark-blue2">
        Generate your key pairs?
      </h2>

      <div className="pl-4 flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <Toggle toggle={toggle} setToggle={setToggle} />
          <p className="">
            {toggle
              ? "Yes I want to generate key pairs for secure communication"
              : "No,Thanks"}
          </p>
        </div>

        {toggle && (
          <>
            <div>
              <input
                // onBlur={(e) => handleTextChange(e)}
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                placeholder="Your name"
                className="min-w-[446px] border-gray-300 bg-primary-light-blue text-gray-900
                   placeholder-gray-600  p-4 h-12 rounded-xl focus:border-primary-dark-blue2
                   focus:border-[1px] border-[1px] focus:outline-none"
              />
            </div>
            <div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // onBlur={(e) => handleTextChange(e)}
                name="email"
                placeholder="Your email"
                className="min-w-[446px] border-gray-300 bg-primary-light-blue text-gray-900
                   placeholder-gray-600  p-4 h-12 rounded-xl focus:border-primary-dark-blue2
                   focus:border-[1px] border-[1px] focus:outline-none"
              />
            </div>
            <div>
              <input
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                // onBlur={(e) => handleTextChange(e)}
                name="passphrase"
                placeholder="Passphrase"
                className="min-w-[446px] border-gray-300 bg-primary-light-blue text-gray-900
                   placeholder-gray-600  p-4 h-12 rounded-xl focus:border-primary-dark-blue2
                   focus:border-[1px] border-[1px] focus:outline-none"
              />
            </div>
            <div className="h-12 flex">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="min-w-[446px] p-4 h-12  font-semibold duration-500 ease-in-out transition uppercase  hover:bg-primary-dark-blue2 hover:text-primary-light-blue border-[1px] border-primary-dark-blue2  rounded-full bg-primary-light-blue text-primary-dark-blue2 relative flex justify-center items-center"
              >
                {loading ? "Generating..." : "Generate"}
              </button>
            </div>
          </>
        )}
      </div>

      <dialog
        ref={ref}
        id="gen_key"
        className="modal "
      >
        <div className="modal-box w-11/12 max-w-5xl ">
          <h3 className="font-bold text-lg mb-4 text-primary-dark-blue2">
            Here are your public and private keys.You can use your public key for secure communication,this key will be autmatically added to your generated card
          </h3>

          <div className="flex flex-col w-full gap-4">
            <div>
              <label className="ml-2 mb-2 text-lg font-semibold text-primary-dark-blue2 flex justify-between items-center">
                <p>Public Key:</p>

                <div className="flex justify-center items-center gap-2">

                  <button onClick={() => handleCopyClick(keys?.publicKey,'publicKey')} className="border text-primary-dark-blue2 border-primary-dark-blue2 px-3 py-1 rounded-full">{copied.publicKey?"Copied":"Copy"}</button>
                  <button onClick={() => downloadKey(keys?.publicKey, 'Public_Key')} className="border text-primary-dark-blue2 border-primary-dark-blue2 px-3 py-1 rounded-full">Download</button>
                </div>



              </label>
              <div className="w-full h-[200px] border-[1px] border-primary-dark-blue2  rounded-xl bg-[#f9f1f1]  overflow-y-auto p-4" >
                {keys?.publicKey}
              </div>

            </div>
            <div>
              <label className="ml-2 mb-2 text-lg font-semibold text-primary-dark-blue2 flex justify-between items-center">
                <p>Private Key:</p>


                <div className="flex justify-center items-center gap-2">

                  <button onClick={() => handleCopyClick(keys?.privateKey,'privateKey')} className="border text-primary-dark-blue2 border-primary-dark-blue2 px-3 py-1 rounded-full">{copied.privateKey ? "Copied" : "Copy"}</button>
                  <button onClick={() => downloadKey(keys?.privateKey, 'Private_Key')} className="border text-primary-dark-blue2 border-primary-dark-blue2 px-3 py-1 rounded-full">Download</button>
                </div>



              </label>
              <div className="w-full h-[200px] border-[1px] border-primary-dark-blue2  rounded-xl bg-[#f9f1f1]  overflow-y-auto p-4" >
                {keys?.privateKey}
              </div>
            </div>


          </div>

          <div className="modal-action">
            <button onClick={closeModal} className="btn">
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default GenerateKeys;
