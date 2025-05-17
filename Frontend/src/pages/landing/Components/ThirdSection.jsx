import React from 'react'

import Tsone from "../../../assets/Tsone.jpeg"
import Tstwo from "../../../assets/Tstwo.jpeg"
export default function ThirdSection() {
  return (
    <section
    className='flex flex-col w-full mt-50 items-center gap-10 relative  '
    >
        <h2
        className='font-bold text-4xl text-center text-gray-600' 
        >Explore Our Diverse Clubs</h2>
        <div className='flex flex-col w-full h-200 bg-violet-600 pr-20 text-white 
        before:content-[""] 
        before:absolute 
        before:w-full
        before:h-7
        before:bg-white
        before:top-20
        before:z-10
        before:left-0
        before:rounded-b-[50%]

          after:content-[""] 
        after:absolute 
        after:w-full
        after:h-14
        after:bg-white
        after:bottom-0
        after:z-10
        after:left-0
        after:rounded-t-[50%]
        
        '>
            <div className='flex w-full  justify-evenly '>
                    <span 
                    className='aspect-[2.4/3] w-[23%] h-[90%] rounded-3xl z-20 sht translate-y-[-10%]  '
                    >
                    <img src={Tsone} alt=""  className='w-full h-full rounded-3xl object-cover'/>
                    </span>    
                    <div className='flex flex-col w-[60%] gap-5 p-10'>
                        <h2
                        className='text-3xl font-bold text-left leading-12'
                        >
                        Unlock Your Potential : Engage, lead, and Thrive with ENSET Student Clubs
                        </h2>
                        <p
                        className='text-[.85rem] pr-50 leading-6 text-left'
                        >
                        Engaging in students clubs at ENSET enriches your academic journey by fostering leadership, teamwork, and critical thinking skills. These extracurricular activities provide a platform to explore passions, build lasting friendships, and contribute positively to the community, ultimately enhancing personal and professional development.
                        </p>
                    </div>
            </div>

            <div className='flex w-full   justify-evenly h-fit '>
                      
                    <div className='flex flex-col w-[62%] h-100 pl-15 pr-5  py-0 '>
                        <h2
                        className='text-3xl mb-5 font-bold text-left leading-12'
                        >
                        Explore ENSET’s Diverse Club Categories
                        </h2>
                        <p
                        className='text-[.85rem] leading-6 text-left'
                        >
                       Engaging in ENSET's student clubs enhances your academic journey by fostering leadership, teamwork, and critical thinking. Explore diverse categories:
<br />-&gt;Academic Societies: Subject-focused groups like Accounting Society, Art History Club.
<br />-&gt;Cultural Organizations: Celebrate diverse backgrounds, e.g., Black Student Union, Asian Pacific Student Association.
<br />-&gt;Recreational Clubs: Hobby-based groups such as Board Games Society, Baking Society.
<br />-&gt;Sports Teams: Physical activity groups like Chess classes, Intramural Sports teams.
<br />-&gt;Civic Engagement: Community service clubs, e.g., Habitat for Humanity, Colleges Against Cancer.
<br />-&gt;Honor Societies: Academic excellence groups like Phi Beta Kappa.
Joining these clubs provides platforms to explore passions, build lasting friendships, and contribute positively to the community, ultimately enhancing personal and professional development.
                        </p>
                    </div>

                    <span 
                    className='aspect-[2/3]  w-[40%] h-[20%] rounded-3xl object-cover translate-y-[25%] z-30'
                    >
                    <img src={Tstwo} alt=""  className='w-full  object-cover bg-center  rounded-3xl z-30  sh'/>
                    </span> 
            </div>

        </div>
    </section>
  ) 
}
