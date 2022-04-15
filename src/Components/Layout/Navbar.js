import { useEffect, useContext, useState } from "react";
import { Link } from 'react-router-dom'






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
            <div>
              {/* <!-- Website Logo --> */}
              <Link to='/'>
                {/* <GiCampingTent className='inline pr-2 text-6xl' /> */}
                <h1 className="pt-2">DWT Reporter</h1>
                {/* {title} */}

              </Link>

            </div>
            {/* <!-- Primary Navbar items --> */}
            <div className="hidden md:flex items-center space-x-1">
              <Link to='/' className='btn btn-ghost btn-sm rounded-btn'>
                Home
              </Link>
              <Link to='/createreport' className='btn btn-ghost btn-sm rounded-btn'>
               Create Report
              </Link>
              {/* <div className="dropdown">
                                <div tabIndex="0" className="btn btn-ghost btn-sm rounded-btn">Categories</div>
                                <ul tabIndex="0" className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">

                                    {
                                        categories.map((category) =>
                                        (


                                            <li className='hover-bordered' key={category.id}>

                                                <Link to='/categories' state={{ id: category.id, categoryName: category.categoryName }}>
                                                    {category.categoryName}
                                                </Link>
                                            </li>

                                        ))
                                    }

                                </ul>
                            </div> */}
              <Link to='/popular' className='btn btn-ghost btn-sm rounded-btn'>
                My Account
              </Link>
            </div>
          </div>


          {/* <!-- Secondary Navbar items --> */}

          <div className="hidden md:flex items-center space-x-3 ">



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


          {/* <div className="dropdown">
        <div tabIndex="0" className="btn btn-ghost btn-sm rounded-btn">Categories</div>
        <ul tabIndex="0" className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">

          {
            categories.map((category) =>
            (


              <li className='hover-bordered' key={category.id}>

                <Link onClick={(() => { handleLinkClick() })} to='/categories' state={{ id: category.id, categoryName: category.categoryName }}>
                  {category.categoryName}
                </Link>
              </li>

            ))
          }

        </ul>
      </div> */}



          <li className="active"> <Link onClick={(() => { handleLinkClick() })} to='/popular' className='btn btn-ghost btn-sm rounded-btn'>
            Popular
          </Link></li>
          <li className="active">

            <Link onClick={(() => { handleLinkClick() })} to='/admindashboard' className='btn btn-ghost btn-sm rounded-btn'>
              dashboard
            </Link>

          </li>
          <li className="active">
            <Link onClick={(() => { handleLinkClick() })} to='/logout' className='btn btn-ghost btn-sm rounded-btn'>
              Log out
            </Link>

          </li>

        </ul>
      </div>

    </nav >
  );
};

