import React from 'react'
import FavoriteStudent from '../home/FavoriteStudent'
import { useLocation } from 'react-router-dom';
import Navbar1 from './Navbar1';

const Counsellor = () => {
  const location = useLocation(); // Access the location object
  const { counsellorName } = location.state || {};
  return (
    <div>
      <Navbar1 />
      <FavoriteStudent counsellor={counsellorName}/>
    </div>
  )
}

export default Counsellor