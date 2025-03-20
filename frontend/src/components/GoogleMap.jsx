import React from 'react';

const GoogleMapEmbed = () => {
  return (
    <div className=" mx-auto py-4 px-6">
      <h1 className="text-xl font-bold mb-4">Our Location</h1>
      <div className="relative w-full h-0 pb-[56.25%]">
       {/**<iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4694.924462955835!2d106.38211157573366!3d10.460721264936234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310ab210667c60af%3A0xe3a9cd435c8617c9!2sTh%E1%BB%A7%20Khoa%20Hu%C3%A2n%20High%20School!5e1!3m2!1sen!2s!4v1734178028417!5m2!1sen!2s"
          className="absolute top-0 left-0 w-full h-full border-0"
        ></iframe> */} 
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2347.6128210920488!2d106.398226!3d10.440795!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310ab210667c60af%3A0xe3a9cd435c8617c9!2sTh%E1%BB%A7%20Khoa%20Hu%C3%A2n%20High%20School!5e1!3m2!1sen!2sus!4v1734178416532!5m2!1sen!2sus"
        className='absolute top-0 left-0 w-full h-full'>
           
        </iframe>
      </div>
    </div>
  );
};

export default GoogleMapEmbed;  