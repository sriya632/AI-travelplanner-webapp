import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from "../components/ui/input.jsx";
import { SelectBudgetList } from "../constants/options.jsx";
import { SelectTravelerList } from "../constants/options.jsx";
import { Button } from '@/components/ui/button.jsx';
import { toast } from 'sonner';




function CreateTrip() {
    const [place, setplace] = useState();
    const [formData, setFormData] = useState([]);

    const handleInputChange = (name, value) => {


        setFormData({
            ...formData,
            [name]: value
        })
    }

    useEffect(() => {
        console.log(formData)
    }, [formData])

    const OnGenerateTrip = () => {
        if (formData?.noOfDays > 10 && !formData?.location || !formData?.budget || !formData?.traveler) {
            toast('Please fill all the fields');
            return;
        }
        console.log(formData);

    }

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
            <p className='mt-3 text-gray-600 text-xl'>Provide the basic information asked below for your trip and we will generate a travel itenary based on that.</p>

            <div>
                <div className='mt-20 flex flex-col gap-10'>
                    <div>
                        <h2 className='text-xl my-3 font-medium'>What is the destination you are planning to go to?</h2>
                        <GooglePlacesAutocomplete apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                            selectProps={{
                                place,
                                onChange: (v) => { setplace(v); handleInputChange('location', v) }

                            }}
                        />
                    </div>
                </div>
                <div>
                    <div className='mt-20 flex flex-col gap-15'>
                        <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
                    </div>
                    <Input placeholder={'Ex:3 '} type="number"
                        onChange={(e) => handleInputChange('noOfDays', e.target.value)} />

                </div>
            </div>

            <div>
                <div className='mt-20 flex flex-col gap-15'>
                    <h2 className='text-xl my-3 font-medium'>What is your Budget?</h2>
                </div>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectBudgetList.map((item, index) => (
                        <div key={index}
                            onClick={() => handleInputChange('budget', item.title)}
                            className={`p-4 rounded-lg cursor-pointer hover:shadow-lg 
                          ${formData?.budget === item.title ? 'shadow-lg border border-black' : ''}
                        `}
                        >
                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm font-semibold text-gray-800'>{item.description}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div className='mt-20 flex flex-col gap-15'>
                    <h2 className='text-xl my-3 font-medium'>Who do you plan to travel with?</h2>
                </div>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectTravelerList.map((item, index) => (
                        <div key={index}
                            onClick={() => handleInputChange('traveler', item.people)}
                            className={`p-4 rounded-lg cursor-pointer hover:shadow-lg
                          ${formData?.traveler === item.people ? 'shadow-lg border border-black' : ''}
                        `}
                        >
                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm font-semibold text-gray-800'>{item.description}</h2>
                        </div>
                    ))}
                </div>
            </div>

            <div className='my-10 flex justify-end'>
                <Button onClick={OnGenerateTrip}>Generate Trip</Button>
            </div>
        </div>
    )
}

export default CreateTrip