export function getToken() {
  const token = localStorage.getItem("AUTH_TOKEN")
  return token ?? ""
}

export function getUserId() {
  const id = localStorage.getItem("USERID")
  return id ?? ""
}

export function isLoggedIn() {
  const token = localStorage.getItem("AUTH_TOKEN")
  return token != undefined && token != null
}

export function saveToken(id, token) {
  localStorage.setItem("USERID", id)
  localStorage.setItem("AUTH_TOKEN", token)
}

export function removeToken() {
  localStorage.removeItem("AUTH_TOKEN")
  localStorage.removeItem("USERID")
}
