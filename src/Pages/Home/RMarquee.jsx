import React from "react";
import Marquee from "react-fast-marquee";
import photo1 from '../../../public/marquee1.png'
import photo2 from '../../../public/marquee2.png'
import photo3 from '../../../public/marquee3.png'
import photo4 from '../../../public/marquee4.png'
import photo5 from '../../../public/marqee5.png'
import photo6 from '../../../public/marqee6.png'
import photo7 from '../../../public/marqee8.png'

const RMarquee = () => {
  return (
    <div >
      <h1 className="text-center italic underline text-fuchsia-600  my-5 text-2xl font-bold">We've helped thousands of sales teams</h1>
      <Marquee speed={60} pauseOnHover={true} gradient={false} className=" bg-green-500 py-3"> 
        <img  src={photo1} alt="Company 1" className="h-10 mx-8" />
        <img  src={photo2} alt="Company 2" className="h-10 mx-8" />
        <img  src={photo3} alt="Company 3" className="h-10 mx-8" />
        <img  src={photo4} alt="Company 4" className="h-10 mx-8" />
        <img  src={photo5} alt="Company 5" className="h-10 mx-8" />
        <img  src={photo6} alt="Company 6" className="h-10 mx-8" />
        <img  src={photo7} alt="Company 7" className="h-10 mx-8" />
      </Marquee>
    </div>
  );
};

export default RMarquee;
