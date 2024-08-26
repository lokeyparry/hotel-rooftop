 const formatDate = (isoDate) => {
     const date = new Date(isoDate)
         // Format the date to show month, day, and year (e.g., January 15, 2022)
     const options = { year: 'numeric', month: 'long', day: 'numeric' }
     return date.toLocaleDateString('en-US', options)
 }
 export default formatDate