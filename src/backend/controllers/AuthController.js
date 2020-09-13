import Auth from '../services/Auth'

const auth = new Auth()

const createCompany = (email, pass, displayName, router) => auth.createCompany(email, pass, displayName, router)

const signInEmail = (email, pass) => auth.signInEmail(email, pass)

const signInGoogle = () => auth.signInGoogle()

const changePass = (email) => auth.changePass(email)

const signOut = () => auth.signOut()

export { createCompany, signInEmail, signInGoogle, changePass, signOut }
