import React from 'react';
import Banar from './Banar';
import ServiceCards from './Services/ServiceCard';
import Marquee from 'react-fast-marquee';
import RMarquee from './RMarquee';
import FeatureCards from './FeatureCards';
import MegaCard from './MegaCard';

const Home = () => {
    return (
        <div>
            <Banar></Banar>
            <ServiceCards></ServiceCards>
            <RMarquee></RMarquee>
            <FeatureCards></FeatureCards>
            <MegaCard></MegaCard>
        </div>
    );
};

export default Home;