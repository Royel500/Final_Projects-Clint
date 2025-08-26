import React from 'react';
import Banar from './Banar';
import ServiceCards from './Services/ServiceCard';
import RMarquee from './RMarquee';
import FeatureCards from './FeatureCards';
import MegaCard from './MegaCard';
import Reviews from './Services/ReviewContainer';
import ReviewContainer from './Services/Reviews';

const Home = () => {
    return (
        <div>
            <Banar></Banar>
            <Reviews></Reviews>
            <ServiceCards></ServiceCards>
             <RMarquee></RMarquee>
         
            <FeatureCards></FeatureCards>
            <MegaCard></MegaCard>
               <div className=' max-w-4xl mx-auto mt-10'>
                           <ReviewContainer></ReviewContainer>

            </div>
        </div>
    );
};

export default Home;