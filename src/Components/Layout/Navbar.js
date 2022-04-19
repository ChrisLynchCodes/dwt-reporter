import { useEffect, useContext, useState } from "react";
import { Link } from 'react-router-dom'
import logo from '../../Images/dwtlogonav.png'




export const Navbar = ({ title }) => {


  // handle the click of hamburger to show menu on mobile
  const handleClick = () => {
    document.querySelectorAll(".mobile-menu").forEach(element => {
      element.classList.toggle("hidden");
    })
  }

  // handle the click of hamburger to show menu on mobile
  const handleLinkClick = () => {
    const mobileMenu = document.getElementById("mobile-menu")

    mobileMenu.classList.toggle("hidden")


  }

  const style = { color: "white", fontSize: "1.5em", marginRight: "5px" }

  return (

    // <!-- Navbar goes here -->
    <nav className="shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div className="mt-1">
              {/* <!-- Website Logo --> */}
              <Link to='/'>
                {/* <GiCampingTent className='inline pr-2 text-6xl' /> */}
                <img  className="mask mask-square w-20" src={logo} alt="report" />
              
               
                {/* {title} */}

              </Link>
            
            </div>
            {/* <!-- Primary Navbar items --> */}
            <div className="hidden md:flex items-center space-x-1">
              {/* <Link to='/' className='btn btn-ghost btn-sm rounded-btn'>
                Home
              </Link>
              <Link to='/createreport' className='btn btn-ghost btn-sm rounded-btn'>
               Create Report
              </Link>
             
              <Link to='/popular' className='btn btn-ghost btn-sm rounded-btn'>
                My Reports
              </Link> */}
            </div>
          </div>


          {/* <!-- Secondary Navbar items --> */}

          <div className="hidden md:flex items-center space-x-3 ">
          <Link to='/' className='btn btn-ghost btn-sm rounded-btn'>
                Home
              </Link>
              <Link to='/createreport' className='btn btn-ghost btn-sm rounded-btn'>
               Create Report
              </Link>
             
              <Link to='/popular' className='btn btn-ghost btn-sm rounded-btn'>
                My Reports
              </Link>
              <Link to='/popular' className='btn btn-ghost btn-sm rounded-btn'>
                About
              </Link>
              <Link to='/popular' className='btn btn-ghost btn-sm rounded-btn'>
                FAQ
              </Link>
          </div>






          {/* <!-- Mobile menu button --> */}
          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button" onClick={() => { handleClick() }}>
              <svg className=" w-6 h-6 text-gray-500 hover:text-green-500 "
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>

          </div>
        </div>
      </div>
      {/* <!-- mobile menu --> */}
      <div id="mobile-menu" className="hidden md:hidden mobile-menu">
        <ul className="">
          <li className="active"> <Link to='/' onClick={(() => { handleLinkClick() })} className='btn btn-ghost btn-sm rounded-btn'>
            Home
          </Link></li>
          <li className="active"> <Link onClick={(() => { handleLinkClick() })} to='/createreport' className='btn btn-ghost btn-sm rounded-btn'>
            Create Report
          </Link></li>



          <li className="active"> <Link onClick={(() => { handleLinkClick() })} to='/userreports' className='btn btn-ghost btn-sm rounded-btn'>
            My Reports
          </Link></li>
          <li className="active">

            <Link onClick={(() => { handleLinkClick() })} to='/admindashboard' className='btn btn-ghost btn-sm rounded-btn'>
              About
            </Link>

          </li>
          <li className="active">
            <Link onClick={(() => { handleLinkClick() })} to='/logout' className='btn btn-ghost btn-sm rounded-btn'>
              FAQ
            </Link>

          </li>

        </ul>
      </div>

    </nav >
  );
};

