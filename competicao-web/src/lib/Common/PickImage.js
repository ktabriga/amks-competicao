import React from 'react'

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      resolve(event.target.result)
    }
    reader.onerror = event => {
      console.log('error on read file', event.target)
      reject(event.target.result)
      reader.abort()
    }
    reader.readAsDataURL(file)
  })
}

const processFiles = async (files) => {
  const promises = []
  for (const file of files) {
    const dataURL = await readAsDataURL(file)
    promises.push({
      file,
      dataURL
    })
  }
  return promises
}

export default function PickImage({children, multiple, onChange}) {
  return (
    <div>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        multiple={multiple}
        onChange={(event) => {
          processFiles(event.target.files).then(onChange)
        }}
        type="file"
      />
      <label htmlFor="raised-button-file">
        { children }
      </label>
    </div>
  );
}
