import React, { useState } from 'react'
import SearchBlog from './SearchBlog'
import {Link} from 'react-router-dom'
// import BlogCard from './BlogCard'
import { useFetchBlogsQuery } from '../../redux/features/blogs/blogsApi'

const Blogs = () => {
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [query, setQuery] = useState({search,category})
    // get dat using reudx
    const {data:blogs=[],error,isLoading}=useFetchBlogsQuery(query)
    // console.log(blogs);
    

    const handleSearchChange = (e)=>{
        setSearch(e.target.value)
        // setQuery({...query, search: e.target.value})
    }
    const handleSearch = () => setQuery({search,category})
  return (
    <div className='container mt-16 mx-auto'>
        <SearchBlog search={search} handleSearchChange={handleSearchChange} handleSearch={handleSearch} />
        {isLoading && <div>Loading....</div>}
        {error && <div>{error.toString()}</div>}



        <div className='mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8'>
        {
          blogs?.map(blog => (
            <Link to={`/blogs/${blog._id}`} key={blog._id} className='shadow-md'>
            <img src={blog?.coverImg} alt={blog.name} className='h-80 w-full' />
            <h2 className='text-xl p-4'>{blog.title}</h2>
            </Link>
          ))
        }
        </div>
    </div>
  )
}

export default Blogs