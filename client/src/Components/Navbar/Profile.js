import { useEffect, useRef } from 'react';
import { Disclosure } from '@headlessui/react'

export default function Example(props) {
    
  const menuRef = useRef(null);
  
  
  const myStyles = {
        backgroundColor: 'rgb(31,41,55)',
        border:'0'
      };

      const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
      };

      useEffect(() => {
        const handleOutsideClick = (event) => {
          if (menuRef.current && !menuRef.current.contains(event.target)) {


          }
        };
        document.addEventListener('mousedown', handleOutsideClick);
    
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, []);

      
      
  return (
    <div className="w-screen " ref={menuRef} style={myStyles}>
      <div className=" w-screen max-w-md rounded-2xl bg-white ">
        <Disclosure>
            <>
              <Disclosure.Button style={myStyles} className="flex w-screen justify-between   px-4 py-2 text-left text-sm font-medium text-gray-300 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <a href='#'>Your Profile</a>
                
              </Disclosure.Button>
              
            </>
        </Disclosure>
        <Disclosure>
            <>
              <Disclosure.Button style={myStyles} className="flex w-screen justify-between   px-4 py-2 text-left text-sm font-medium text-gray-300 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <a href='#'>Setting</a>

                
              </Disclosure.Button>
              
            </>
        </Disclosure>
        <Disclosure>
          
            <>
              <Disclosure.Button style={myStyles} className="flex w-screen justify-between   px-4 py-2 text-left text-sm font-medium text-gray-300 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <a onClick={handleLogout} href='#'>Signout</a>

                
              </Disclosure.Button>
              
            </>
          
        </Disclosure>
        
      </div>
    </div>
  )
}
