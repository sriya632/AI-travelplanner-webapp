import React from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../ui/button'

function Hero() {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/create-trip')
    }
  return (
    <div className='flex items-center mx-56 gap-9 flex-col'>
        <h1 className='font-bold text-[50px] text-center mt-16'><span>Discover and Plan your next trip with us:</span> Personalized Travel Iteneries at your Fingertips</h1>
        <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creates personal itenaries tailored to your budget.</p>
        <Button onClick={handleClick}> Start Planning</Button>
    </div>
  )
}

export default Hero