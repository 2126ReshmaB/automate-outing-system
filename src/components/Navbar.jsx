import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky,setIsSticky] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 100){
        setIsSticky(true);
      }
      else{
        setIsSticky(false);
      }
    }
    window.addEventListener("scroll",handleScroll);

    return () => {
      window.addEventListener("scroll",handleScroll);
    }
  },[])

  const navItems = [
    {link: "Home",path: "/"},
    {link: "Student",path: "/student"},
    {link: "Councellor",path: "/counsellor"},
  ]
  return (
    <header>
      <nav>
        <div className='flex justify-between items-center'>
          <ul className='md:flex space-x-12 hidden'>
            {
              navItems.map(({link,path}) => <Link key={path} to={path} className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'>{link}</Link>)
            }
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar