import Image from "next/image";
import React from "react";

const FooterContactCard: React.FC = () => (
    <div className="bg-[#FFFFFF0D] rounded-[20px] px-2 py-6 w-full max-w-xs mx-auto col-span-2 md:col-span-1">
        <div className="flex items-center justify-center gap-3">
            <Image src="/images/icons/support.svg" alt="Support Icon" width={40} height={50} />
            <div className="text-[#00040d] fs-var-xs font-semibold">
                <span className="inline-block  bg-white rounded-[20px] rounded-tr-sm px-3 py-2 mb-1">&#128075; hi there</span>
                <span className="block bg-white rounded-[20px] rounded-tr-sm px-3 py-2 ">Do you have any questions?</span>
            </div>
        </div>
        <p className="text-white opacity-80 text-center my-5">Do you need help or have an inquiry?</p>
        <a href="http://wa.me/+201208123222" className="bg-[#FFFFFF14] rounded-2xl p-4 flex items-center justify-center gap-2 text-white fs-var-base font-bold w-fit mx-auto" >Contact Us <Image src="/images/icons/whatsapp.svg" alt="Whatsapp Icon" width={20} height={20} /></a>
    </div>
);

export default FooterContactCard; 