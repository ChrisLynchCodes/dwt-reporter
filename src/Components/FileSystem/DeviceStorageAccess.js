import React from 'react'

export const DeviceStorageAccess = () => {
  const pickerOpts = {
    types: [
      {
        description: 'Images',
        accept: {
          'image/*': ['.png', '.gif', '.jpeg', '.jpg']
        }
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false
  };
    // store a reference to our file handle
let fileHandle;

async function getFile() {
  // open file picker
  [fileHandle] = await window.showOpenFilePicker(pickerOpts);

  if (fileHandle.kind === 'file') {
    // run file code
    const fileData = await fileHandle.getFile();
    debugger
  } else if (fileHandle.kind === 'directory') {
    // run directory code
  }

}

  return (
    <button type='text' className='btn btn-secondary ml-10' onClick={()=>{getFile()}}>Gallery</button>
  )
}
