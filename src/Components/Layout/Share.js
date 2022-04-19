import React from 'react'
import { FiShare } from 'react-icons/fi'
export const Share = () => {

  const shareData = {
    title: 'DWT Reporter',
    text: 'Share our app with your friends',
    url: 'https://dwtproject-75c16.web.app/'
  }
  const resultPara = document.querySelector('.result');
  const share = async () => {
    try {

      await navigator.share(shareData)
      resultPara.innerHTML = 'Thank you for sharing this App!'
      setTimeout(() => resultPara.innerHTML = '', 5000)
    
    } catch (err) {
      resultPara.textContent = 'Error: ' + err
    }
  }
  return (
    <div>
      
      <button className='btn btn-ghost' onClick={() => (share())}>- <FiShare size={25} /> - </button>
      Share

      <p className='result'></p>

    </div>
  )
}
