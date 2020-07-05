const storageKey = 'loggedBlogAppUser'

const saveUser = (user) =>
  localStorage.setItem(storageKey, JSON.stringify(user))

const loadUser = () =>
  JSON.parse(localStorage.getItem(storageKey))

const logoutUser = () =>
  localStorage.removeItem(storageKey)

const checkUser = () =>
  localStorage.getItem(storageKey) ? true : false

export default {
  saveUser,
  loadUser,
  logoutUser,
  checkUser
}