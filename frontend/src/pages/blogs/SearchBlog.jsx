import React from 'react'

const SearchBlog = ({search,handleSearchChange,handleSearch}) => {
    const handleKeyPress = (e)=> {
        if(e.key === 'Enter'){
            handleSearch()
        }
    }
    
    return (
    <div className='w-full  flex'>
        <input value={search} 
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
         type="text" placeholder='Hotels with rooftop near you...' className='py-2 px-4 w-full mr-5 bg-[#f7f8f9] focus:outline-none focus:border rounded-full' />
        <button onClick={handleSearch} className=' bg-[#1E73BE] px-6 py-2 text-white rounded-full'>Search</button>
    </div>
  )
}

export default SearchBlog