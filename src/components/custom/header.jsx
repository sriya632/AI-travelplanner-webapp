import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <div className='p-3  shadow-sm flex justify-between items-center px-5'>
        <img src='/logo.png' className="h-10 w-auto my-1 mx-2 align-middle" />
        <h2 className='font-semibold'>AI-Travel-Planner</h2>
        <div>
            <Button>Sign In</Button>
        </div>
    </div>
    
  )
}

export default Header