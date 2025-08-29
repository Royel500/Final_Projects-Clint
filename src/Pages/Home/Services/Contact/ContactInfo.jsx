import React from 'react';
import { FiMail, FiLinkedin, FiPhone, FiMessageSquare, FiMapPin } from 'react-icons/fi';

const ContactInfo = () => {
  const contactItems = [
   
    {
      icon: <FiMessageSquare className=" text-xl" />,
      title: "WhatsApp",
      value: "+88 01907226353",
      link: "https://wa.me/8801902264311"
    },
    {
      icon: <FiMessageSquare className=" text-xl" />,
      title: "Telegram",
      value: "Telegram",
      link: "https://t.me/itisroyel528"
    },
    {
      icon: <FiMessageSquare className=" text-xl" />,
      title: "Twitter",
      value: "Twitter",
      link: "https://x.com/royel528"
    },
     {
      icon: <FiMail className=" text-xl" />,
      title: "Email",
      value: "webdev.royelali@gmail.com"
    },

    {
      icon: <FiPhone className=" text-xl" />,
      title: "Phone",
      value: "+88 01907226353"
    },
        {
      icon: <FiLinkedin className=" text-xl" />,
      title: "LinkedIn",
      value: "Connect with me",
      link: "linkedin.com/in/md-royel-ali-b1ab45372" 
    },
    {
      icon: <FiMapPin className=" text-xl" />,
      title: "Location",
      value: " Dhaka, Bangladesh"
    }
  ];

  return (
    <div className="
       p-8 rounded-xl border bg-base-300 font-bold shadow-l">
      <h3 className="text-2xl   mb-6">Contact Information</h3>
      <div className="space-y-5">
        {contactItems.map((item, index) => (
          <div key={index} className="flex   items-start">
            <div className="mr-4 mt-1">{item.icon}</div>
            <div className='bg-gray-400 w-full px-8 rounded-3xl py-1'>
              <h4 className="text-sm  font-medium ">{item.title}</h4>
              {item.link ? (
                <a href={item.link} className="text-blue-600 hover:underline">
                  {item.value}
                </a>
              ) : (
                <p className="text-gray-800">{item.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;