import { useState } from "react";
import Header from '../landing/Components/Header'
import Test from '../../assets/two6.png'
import Test2 from '../../assets/two5.jpeg'
import BigFooter from "../BigFooter"

export default function Event() {

    const [event ,setEvent]=useState(
            {
                images:[Test,Test2,Test,Test2],
                title:"This is just a title",
               departement:"Math info",
               descrepion :"Depart informatiq Depart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatique Depart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatiqueDepart informatique"
            }
        );
  return (
    <main>
        <section
            className='px-5 py-2 pt-5 bg-gray-100'
            ><Header /> </section>
            <section
        className='bg-gradient-to-b from-[#0095ff32] to-white min-h-[70vh] pt-30 px-10  relative
        '
        >
        {
            event ? <section>
                <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[28rem] ">
      {event.images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`event-${index}`}
          className={`w-full h-full object-cover rounded-2xl 
            ${index === 0 ? 'col-span-2 row-span-2' : ''} 
            ${index !== 0 ? 'aspect-square' : ''}
            ${index === 0 ? '' : 'transition-transform transform '}`} // Added hover effect
        />
       
          ))
        }
         </div>
          
            <div className="pl-20 pr-10 pt-10">
            <h1 className="text-4xl tracking-wider text-gray-600 font-semibold pt-10 pb-4 ">{event.title}</h1>
            <p 
            style={{ wordSpacing: '0.2rem' }}
            className="text-gray-500 text-[.9rem] tracking-wider leading-[1.7rem] pb-40 pl-5">{event.descrepion}</p>
            </div>
            </section>
            : <h1>
                Event with that Id does not exist 
            </h1>
        }

        </section>

            <BigFooter />

    </main>
  )
}
