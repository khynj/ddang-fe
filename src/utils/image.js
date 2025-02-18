import imageCompression from 'browser-image-compression'

function blobToFile(blob, fileName, mimeType) {
  return new File([blob], fileName, {
    type: mimeType,
    lastModified: Date.now(),
  })
}

export async function compressImage(file) {
  const options = {
    maxSizeMB: 1, // 허용하는 최대 사이즈 지정
    maxWidthOrHeight: 1920, // 허용하는 최대 width, height 값 지정
    useWebWorker: true, // webworker 사용 여부
  }
  try {
    const blob = await imageCompression(file, options)
    return blobToFile(blob, file.name, file.type)
  } catch (error) {
    console.log(error)
  }
}
