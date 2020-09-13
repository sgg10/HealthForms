import { firestore, auth } from 'firebase'

class Auth {
  async createCompany (email, pass, displayName, router) {
    const result = await auth().createUserWithEmailAndPassword(email, pass)
    if (displayName) {
      await result.user.updateProfile({ displayName })
    }
    await firestore().collection('Companies').add({ udi: result.user.uid, email })
    router.push({ name: 'Home' })
  }

  signInEmail = (email, pass) => auth().signInWithEmailAndPassword(email, pass)

  signInGoogle () {
    const provider = new auth.GoogleAuthProvider()
    auth().useDeviceLanguage()
    return auth().signInWithPopup(provider)
  }

  changePass = (email) => auth().sendPasswordResetEmail(email)

  signOut = () => auth().signOut()
}

export default Auth
