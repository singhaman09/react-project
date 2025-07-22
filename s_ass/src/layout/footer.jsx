import React from 'react'

const footer = () => {
  return (

    <div class="bg-blue-500 py-4 text-black border-2 text-center"> &copy;{ (new Date().getFullYear())} All Rights Reserved. </div>
  )
}

//React.memo()

export default React.memo(footer);