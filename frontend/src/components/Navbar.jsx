import React, { useState } from 'react'
import logo from '/logo.png'
import { Link, NavLink } from 'react-router-dom'
import { IoClose, IoMenuSharp } from 'react-icons/io5'
import { useDispatch,useSelector } from 'react-redux'
import avatarImg from '../assets/commentor.png'
import { useLogoutUserMutation } from '../redux/features/auth/authApi'
import { logout } from '../redux/features/auth/authSlice'
const navList = [
    { name: 'Home', path: '/' },
    { name: 'About us', path: '/about-us' },
    { name: 'Privacy policy', path: '/privacy-policy' },
    { name: 'Contact us', path: '/contact-us' },
]

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const {user} = useSelector((state)=>state.auth)
    console.log(user);
    
    const dispatch = useDispatch()
    const [logoutUser]=useLogoutUserMutation()
    
    const handleToggleMenu = () => setIsMenuOpen(!isMenuOpen)

    const handleLogout = async () => {
      try {
        await logoutUser().unwrap();
        dispatch (logout())
      } catch (error) {
        
      }
    }


  return (
    <header className='bg-white py-6 border '>
        <nav className='container mx-auto flex justify-between px-5'>
            <a href="logo">
                <img src={logo} alt="" className='h-12' />
            </a>
          <ul className='sm:flex hidden items-center gap-8'>
            {navList.map((item, index) => (
              <li key={index}>
                <NavLink  to={item.path} className={({isActive})=> isActive? "active":''}>
                  {item.name}
                </NavLink>
              </li>
            ))}
            {/* <NavLink to="/login">Login</NavLink> */}
            {/* render btn based on user login activity */}
            {
              user && user.role === 'user' ? (<li className='flex items-center gap-3'>
                <img src={avatarImg} alt="" className='size-8' />
                <button onClick={handleLogout} className='bg-black px-4 py-1.5 text-white rounded-sm'>logout</button>
                
                </li>) 
              : (<li>
                <NavLink to="/login">Login</NavLink>
            </li>)
            }
            {
              user && user.role === 'admin' && (<li className='flex items-center gap-3'>
                <img src={avatarImg} alt="" className='size-8' />
                 <Link to='/dashboard'>
                <button className='bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm'>Dashboard</button>
                </Link> 
                </li>)  
              
            }
          </ul>
          <div className='flex flex-center sm:hidden'>
            <button onClick={handleToggleMenu} className={`flex items-center px-3 py-4 bg-[#fafafa] rounded text-sm text-graay-500 hover:text-gray-900`}>
                {
                    isMenuOpen ? <IoClose className='size-6'/>:<IoMenuSharp className='size-6' /> 
                }
            </button>
          </div>
            
        </nav>
        {/* mobile menu */}
        {
           isMenuOpen && (
            <ul className='fixed top-[108px] left-0 w-full h-auto pb-8 border-b bg-white shadow-sm z-50'>
            {navList.map((item, index) => (
              <li key={index} className='mt-2 px-4'>
                <NavLink onClick={()=>setIsMenuOpen(false)}  to={item.path} className={({isActive})=> isActive? "active":''}>
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li className='mt-5 px-4'>
                <NavLink  to="/login">Login</NavLink>
            </li>
          </ul>
           ) 
        }
    </header>
  )
}

export default Navbar