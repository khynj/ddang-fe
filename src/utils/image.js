export function fetchPhotoFromUrl(url) {
  console.log(url)
  return fetch(url).then(res => res.blob())
}
