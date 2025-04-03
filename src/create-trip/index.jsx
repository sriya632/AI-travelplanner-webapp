import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from "../components/ui/input.jsx";
import { AI_PROMPT, SelectBudgetList } from "../constants/options.jsx";
import { SelectTravelerList } from "../constants/options.jsx";
import { Button } from '@/components/ui/button.jsx';
import { toast } from 'sonner';
import { chatSession } from '@/service/aimodel.jsx';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog.jsx"
import axios from 'axios';
import { db } from '@/service/firebaseConfig.jsx';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function CreateTrip() {
    const [place, setplace] = useState();
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (name, value) => {


        setFormData({
            ...formData,
            [name]: value
        })
    }

    useEffect(() => {
        console.log(formData)
    }, [formData])

    const login = useGoogleLogin({
        onSuccess: (codeResp) => GetUserProfile(codeResp),
        onError: (error) => console.log(error),
        flow: 'implicit', // Try using implicit flow instead
        popup: true,
        // Add additional scopes if needed
        scope: 'email profile openid',

    })


    const OnGenerateTrip = async () => {

        const user = localStorage.getItem('user');
        if (!user) {
            setOpenDialog(true);
            return;
        }
        if (formData?.noOfDays > 10 && !formData?.location || !formData?.budget || !formData?.traveler) {
            toast('Please fill all the fields');
            return;
        }

        setLoading(true);
        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location?.label || 'Unknown Location')
            .replace('{totalDays}', formData?.noOfDays || '0')
            .replace('{traveler}', formData?.traveler || '1')
            .replace('{budget}', formData?.budget || 'Budget friendly')
            .replace('{totalDays}', formData?.noOfDays || '0')



        const result = await chatSession.sendMessage(FINAL_PROMPT);

        console.log(result?.response?.text());
        setLoading(false);
        SaveAiTrip(result?.response?.text())

    }
    const SaveAiTrip = async (TripData) => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const docId = Date.now().toString(); // Unique ID for the document
        await setDoc(doc(db, "AITrips", docId), {
            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email || "unknown", // Store user email if available
            id: docId,
        });
        setLoading(false);

    }
    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((resp) => {
            console.log(resp);
            localStorage.setItem('user', JSON.stringify(resp.data));
            setOpenDialog(false); // Close the dialog after successful login
            OnGenerateTrip(); // Call the function to generate trip after successful login
        })
    }
    return (
        <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
            <div className='mt-3 text-gray-600 text-xl'>Provide the basic information asked below for your trip and we will generate a travel itenary based on that.</div>

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
                <Button
                    disabled={loading}
                    onClick={OnGenerateTrip}>
                    {loading ? <AiOutlineLoading3Quarters className={`h-7 w-7 animate-spin`} /> : 'Generate Trip'
                    }
                    </Button>
            </div>

            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <img src='/logo.png' className="h-10 w-auto my-1 mx-2 align-middle" />
                            AI-Travel-Planner
                        </DialogTitle>
                        <DialogDescription asChild>
                            <div>
                                <h2 className='font-bold text-lg mt-7'>Log In or Sign Up with google</h2>
                                <p>Sign in with google authentication securely</p>
                                <Button onClick={login}
                                    className='w-full mt-5 flex gap-4 items-center'> <FcGoogle />Sign in with Google </Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>


        </div>
    )
}

export default CreateTrip
