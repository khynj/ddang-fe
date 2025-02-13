export function compressImage(file, quality = 0.7) {
  const filename = file.name
  const filetype = file.type
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = event => {
      const img = new Image()
      img.src = event.target.result
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0, img.width, img.height)

        // toDataURL의 두 번째 인자로 품질 설정 (0~1)
        canvas.toBlob(
          blob => resolve(blobToFile(blob, filename, filetype)),
          'image/jpeg',
          quality,
        )
      }
    }
    reader.onerror = error => reject(error)
  })
}
function blobToFile(blob, fileName, mimeType) {
  return new File([blob], fileName, {
    type: mimeType,
    lastModified: Date.now(),
  })
}
