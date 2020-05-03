import React from 'react';

import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from
"mdbreact";
import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './css/Banner.css';
import LazyImage from './Wigets/LazyLoadImg';

export default function Banners(){


	return(
		<div style={{marginBottom:'30px'}}>
            <MDBCarousel
        activeItem={1}
        length={3}
        showControls={true}
        showIndicators={true}
        className="z-depth-1"
        testimonial = {true}
        style={{minHeight:'400px', height:'400px'}}
      >
      <MDBCarouselInner>
        <MDBCarouselItem itemId="1">
            <MDBView className="h-100">
             
              <LazyImage image={{srcMain:'/images/banner/1.jpg',
                        srcDef: '/images/banner/1_min.jpg',
                        title: 'banner'}} />
             
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView className="h-100">
             <LazyImage image={{srcMain:'/images/banner/cover.jpg',
                        srcDef: '/images/banner/cover_min.jpg',
                        title: 'banner'}} />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView className="h-100">
              <LazyImage image={{srcMain:'/images/banner/optimize.jpg',
                        srcDef: '/images/banner/optimize_min.jpg',
                        title: 'banner'}} />
            </MDBView>
          </MDBCarouselItem>
          
            </MDBCarouselInner>
            </MDBCarousel>
         </div>
	)
}