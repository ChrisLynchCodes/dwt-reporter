import React from 'react'

export const Share = () => {

    const shareData = {
        title: 'MDN',
        text: 'Learn web development on MDN!',
        url: 'https://developer.mozilla.org'
      }
      const resultPara = document.querySelector('.result');
    const share = async () => {
        try {
            
            await navigator.share(shareData)
            resultPara.textContent = 'MDN shared successfully'
          } catch(err) {
            resultPara.textContent = 'Error: ' + err
          }
    }
  return (
    <div>
        <button className='btn' onClick={share()}>Share</button>
        <p className='result'></p>
    
    </div>
  )
}
