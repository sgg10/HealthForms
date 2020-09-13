function identifyImg (name) {
  if (name.indexOf('.PNG') !== -1) {
    return '.PNG'
  } else if (name.indexOf('.png') !== -1) {
    return '.png'
  } else if (name.indexOf('.jpg') !== -1) {
    return '.jpg'
  } else if (name.indexOf('.jpeg') !== -1) {
    return '.jpeg'
  }
}

const showToast = (obj, title, msg, variant, autoHideDelay = 5000) => obj.toast(msg, { title, autoHideDelay, variant })

export { identifyImg, showToast }
