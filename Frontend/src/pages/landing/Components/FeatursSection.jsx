

import { Link } from 'react-router-dom';
import ensetLogo from "../../../assets/ensetLogo.png"
import one1 from "../../../assets/one1.jpeg"
import two1 from "../../../assets/two1.jpeg"
import two2 from "../../../assets/two2.jpeg"
import two3 from "../../../assets/two3.png"
import two4 from "../../../assets/two4.jpeg"
import two5 from "../../../assets/two5.jpeg"
import two6 from "../../../assets/two6.png"
import three1 from "../../../assets/three1.jpeg"
import three2 from "../../../assets/three2.jpeg"
import three3 from "../../../assets/three3.jpeg"
import geeks from "../../../assets/Geeks.jpeg"
import emiu from "../../../assets/emiu.png"
import mechatronic from "../../../assets/mechatronic.jpeg"
import Rotaract from "../../../assets/Rotaract.jpeg"
import sport from "../../../assets/image.png"


export default function FeatursSection() {
  return (
    <section className="flex px-6 flex-col text-gray-800 w-full h-screen mt-20 ">
        <div className='flex flex-col font-[700] w-full gap-3 items-center text-center absolute left-0 ' >
            <h2 className='text-3xl ' >Where Passion Meets Purpose</h2>
            <h2 className='text-3xl  leading-12'>“We do not find ourselves in isolation, but in the <br /> communities we build”</h2>
        </div>


        <div className="flex justify-between wrap">
            <div className=" card  ">
              <span className='flex  flex-col gap-2 mb-3'>
                <div
                className='w-16
                aspect-[3/1]
                translate-x-[80%]
                translate-y-[280%]
                 shadow-violet-200
  shadow-2xl
   rounded-3xl
            
                '
                >
                    <img src={ensetLogo} alt="" />
                </div>

                <div className='
                w-[60%]
                aspect-[2/2.5]
               translate-x-30
               translate-y-10
                z-10
                 shadow-violet-200
  shadow-2xl
   rounded-3xl

                '>
                    <img src={one1} alt="" className='w-full h-full rounded-3xl' />
                </div>
                <div
                className='
                w-[40%]
                aspect-[2/2.5]
                z-10
                translate-y-[-60%]
                translate-x-10
 shadow-violet-200
  shadow-2xl
   rounded-3xl

                '
                >
                    <img src={geeks} alt="" className='h-full w-full  rounded-3xl' />
                </div>
              </span>
              <span className="bottom flex flex-col translate-y-[-100%] gap-2 pl-10 pt-3 ">
                <h2 className='font-extrabold  text-gray-700 text-2xl '>Explore clubs</h2>
                <p className='text-sm text-gray-500'>Browse through a diverse range of clubs and find where you belong</p>
                <Link className="link" >Explore Clubs &gt;</Link>
              </span>
            </div> 

            <div className=" card   ">

              <span className='mb-3 w-full h-50 border'>
                <div
                className='
               aspect-[3/1]
               w-full 
               translate-y-[100%]
                shadow-violet-200
  shadow-2xl
   rounded-3xl
            
                '
                >
                    <img src={two1} alt="" className='rounded-3xl' />
                </div>

                <div className='
                   w-[40%]
                aspect-[3/2.2]
                z-10
                translate-y-[-50%]
                translate-x-[80%]
                 shadow-violet-200
  shadow-2xl
   rounded-3xl

                '>
                    <img src={two2} alt="" className='w-full h-full rounded-3xl' />
                </div>
                <div
                className='
                w-[40%]
                aspect-[3/2.2]
                z-10
                translate-y-[60%]
                translate-x-[160%]
 shadow-violet-200
  shadow-2xl
   rounded-3xl

                '
                >
                    <img src={two3} alt="" className='h-full w-full  rounded-3xl' />
                </div>

                <div
                className='
                w-[30%]
                aspect-[2.8/2]
                z-10
                translate-y-[-50%]
                translate-x-20
 shadow-violet-200
  shadow-2xl
   rounded-3xl

                '
                >
                    <img src={two4} alt="" className='h-full w-full  rounded-3xl' />
                </div>

                <div
                className='
               w-[25%]
                aspect-[2.8/2]
                z-10
                translate-y-[-120%]
                translate-x-7
 shadow-violet-200
  shadow-2xl
   rounded-3xl

                '
                >
                    <img src={two5} alt="" className='h-full w-full  rounded-3xl' />
                </div>

                <div
                className='
                   w-[35%]
                aspect-[3/2]
                z-10
                translate-y-[-400%]
                translate-x-[-40%]
 shadow-violet-200
  shadow-2xl
   rounded-3xl
                '
                >
                    <img src={two6} alt="" className='h-full w-full  rounded-3xl' />
                </div>

              </span>
              <span className=" flex flex-col translate-y-[-130%] pl-10 pt-3 gap-2 ">
                <h2 className='font-extrabold  text-gray-700 text-2xl '>Upcoming Events</h2>
                <p className='text-sm text-gray-500'>Stay updated with the latest events and participate actively.</p>
                <Link className="link" >Explore Clubs &gt;</Link>
              </span>
            </div> 
{/* third card ---------------------------------------------------------------------------------------------------- */}

<div className=" card   ">

<span className='mb-3 w-full h-50 border'>
  <div
  className='
aspect-[2.6/2]
 translate-y-[100%]
  shadow-violet-200
  shadow-2xl
  rounded-3xl

  '
  >
      <img src={three1} alt="" className='rounded-3xl w-full h-full' />
  </div>

  <div className='
     w-[30%]
  aspect-[3/2.2]
  z-10
  translate-y-[100%]
  translate-x-[250%]
   shadow-violet-200
  shadow-2xl
 rounded-3xl
  '>
      <img src={three2} alt="" className='w-full h-full rounded-3xl' />
  </div>
  <div
  className='
  w-[30%]
  aspect-[3/2.2]
  z-10
  translate-y-[-150%]
  translate-x-[260%]
 shadow-violet-200
  shadow-2xl
 rounded-3xl
  '
  >
      <img src={three3} alt="" className='h-full w-full  rounded-3xl' />
  </div>

  <div
  className='
  w-[30%]
  aspect-[2.8/2]
  z-10
  translate-y-[80%]
  translate-x-40
 shadow-violet-200
  shadow-2xl
 rounded-3xl
  '
  >
      <img src={Rotaract} alt="" className='h-full w-full  rounded-3xl' />
  </div>

  <div
  className='
 w-[25%]
  aspect-[2.8/2]
  z-10
  translate-y-[50%]
  translate-x-7
 shadow-violet-200
  shadow-2xl
   rounded-3xl

  '
  >
      <img src={emiu} alt="" className='h-full w-full  rounded-3xl' />
  </div>

  <div
  className='
     w-[38%]
    
  aspect-[3/2]
  z-10
  translate-y-[-430%]
  translate-x-30
 rounded-3xl
  '
  >
      <img src={sport} alt="" className='h-full w-full  rounded-full' />
  </div>
  <div
  className='
     w-[35%]
  aspect-[3/2]
  z-10
  translate-y-[-400%]
  translate-x-[-40%]
 shadow-violet-200
  shadow-2xl
   rounded-3xl
  '
  >
      <img src={mechatronic} alt="" className='h-full w-full  rounded-3xl' />
  </div>

</span>
<span className=" flex flex-col translate-y-[-140%] pl-10 pt-3 gap-2 ">
  <h2 className='font-extrabold  text-gray-700 text-2xl '>Upcoming Events</h2>
  <p className='text-sm text-gray-500'>Stay updated with the latest events and participate actively.</p>
  <Link className="link" >Explore Clubs &gt;</Link>
</span>
</div> 

        </div>
    </section>
  )
}
