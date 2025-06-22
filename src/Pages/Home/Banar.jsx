import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import banner1 from '/banner1.png'
import banner2 from '/banner2.png'
import banner3 from '/banner3.png'


const Banar = () => {
    return (
  <Carousel
  autoPlay={true}
  infiniteLoop={true}
  interval={2000} // 2 seconds between slides
  showThumbs={false}
  showStatus={false}
>
               
            <div>
                    <img src={banner1} />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src={banner2} />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src={banner3} />
                    <p className="legend">Legend 3</p>
                </div>

            </Carousel>
    );
};

export default Banar;