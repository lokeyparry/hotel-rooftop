import React from 'react'
import EditorJSHTML  from 'editorjs-html'
import formatDate from '../../../utils/formateDate'

const editorJSHTML = EditorJSHTML()

const SingleBlogCard = ({blog}) => {
  const { title,description, content,coverImg,category,rating, author, createdAt  } = blog || {};
  const htmlContent = editorJSHTML.parse(content).join('') 
  // Not needed in this context as we're rendering HTML directly.
  return (
    <>
    <div className="bg-white p-8">
      <div>
          <h1 className='md:text-4xl text-3xl font-medium mb-4'>{title}</h1>            
          <p>{formatDate(createdAt)} by <span className='text-blue-400 cursor-pointer'>Lokey</span></p>
      </div>
          <div>
              <img src={coverImg} alt="" className='w-full md:h-[520px] bg-cover' />       
          </div>
          <div className='mt-8 space-y-4  '>
            {/* <div className='text-red-400'>{description}</div> */}
            <div dangerouslySetInnerHTML={{__html: htmlContent }} className='space-y-3 editorjsdiv'/>
            <div>
              <span className='text-lg font-medium'>rating: </span> 
              <span>{rating} based on 2,370 reviews.</span>
            </div>

          </div>
    </div>
    </>
  )
}

export default SingleBlogCard
{/* <div className='mt-8'>
              {content?.blocks.map((block) => {
                switch (block.type) {
                  case 'paragraph':
                    return <p key={block.id}>{block.data.text}</p>;
                  default:
                    return null;
                }
              })}
              </div> */}

// import React from 'react'
// import EditorJSHTML from 'editorjs-html'
// // // import EditorJSHTML from '@editorjs/editorjs';

// const editorJSHTML = EditorJSHTML();

// const SingleBlogCard = ({blog}) => {
//   const { title,description, content,coverImg,category,rating, author, createdAt  } = blog || {};
//   const htmlContent = editorJSHTML.parse(content).join('');
//   const formatDate = (isoDate) => {
//         const date = new Date(isoDate)
//     //     // Format the date to show month, day, and year (e.g., January 15, 2022)
//         const options = { year: 'numeric', month: 'long', day: 'numeric' }
//         return date.toLocaleDateString('en-US', options)
//       }
//   return (
//     <>
//     <div className="bg-white p-8">
//          <div>
//              <h1 className='md:text-4xl text-3xl font-medium mb-4'>{title}</h1>
//              <p>{formatDate(createdAt)} by <span className='text-blue-400 cursor-pointer'>Lokey</span></p>
//          </div>
//          <div>
//              <img src={coverImg} alt="" className='w-full md:h-[520px] bg-cover' />
//          </div>
//          <div className='mt-8'>
//           <div>{description}</div>
            
//              {/* <div dangerouslySetInnerHTML={{__html: htmlContent }} className='space-y-3 '></div> */}
//          </div>

//     </div>
//     </>
//   )
// }

// export default SingleBlogCard