import { doc,getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "@/service/firebaseConfig";
import { toast } from "sonner";
import InfoSection from "../components/Infosection";
import { useState } from "react";

 function ViewTrip() {

    const {tripId}=useParams();
    const [trip,setTrip]=useState([])

    useEffect(() => {
        tripId&&GetTripData();
    }, [tripId]);

    const GetTripData=async()=>{
        const docRef =doc(db,'AITrips', tripId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            // You can set this data to state to display it in your component
            setTrip(docSnap.data());
        }
        else {
            console.log("No such document!");
            toast( "No trip found")
            // Handle the case where the document doesn't exist
        }
    }
    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            <InfoSection trip={trip} />
        </div>
    )
}

export default ViewTrip;