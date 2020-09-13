import Storage from 'firebase'

const storage = new Storage()

const uploadImage = (file, path, name) => storage.uploadImage(file, path, name)

export { uploadImage }
