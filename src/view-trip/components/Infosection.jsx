import { Button } from "@/components/ui/button";
import React from "react";

function InfoSection({trip}){
    return (
        <div>
            <img src='/6345959.jpg' className='h-[350px] w-full object-cover rounded-xl '/>

            <div className='my-5 flex flex-col gap-2 '>
                <h2 className='font-bold text-2xl '>
                    {trip?.userSelection?.location?.label}
                </h2>
                <div className='flex justify-between items center'>
                <div className='flex gap-5'>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
                        {trip?.userSelection?.noOfDays} Days
                    </h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
                        {trip?.userSelection?.budget} Budget
                    </h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
                       No of Travelers: {trip?.userSelection?.traveler} 
                    </h2>
                    </div>
                </div>
                <Button> Share</Button>
            </div>
        </div>
    )
}

export default InfoSection;