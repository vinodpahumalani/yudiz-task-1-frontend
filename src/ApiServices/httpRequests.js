import { confirmAlert } from "react-confirm-alert"

const baseUrl = "http://localhost:3000"
const headers = {
  "Content-Type": "application/json",
}

export const httpPost = async ({ subUrl, token, body }) => {
  try {
    const fullUrl = baseUrl + subUrl
    if (token) {
      headers.Authorization = token
    }
    const res = await fetch(fullUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })

    const result = await res.json()

    if (res.status == 200) {
      return {
        success: true,
        result,
      }
    } else {
      return {
        success: false,
        result,
      }
    }
  } catch (error) {
    confirmAlert({
      title: "Error",
      message:
        "Something Went Wrong. Check your internet connection or try again after sometime.",
      buttons: [
        {
          label: "OK",
        },
      ],
    })
  }
}

export const httpGet = async ({ subUrl, params, query, token }) => {
  try {
    let fullUrl = baseUrl + subUrl

    if (params) {
      fullUrl = fullUrl + params
    }

    if (query) {
      fullUrl = fullUrl + query
    }
    if (token) {
      headers.Authorization = token
    }

    const res = await fetch(fullUrl, {
      headers,
    })
    const result = await res.json()

    if (res.status == 200) {
      return {
        success: true,
        result,
      }
    } else {
      return {
        success: false,
        result,
      }
    }
  } catch (error) {
    confirmAlert({
      title: "Error",
      message:
        "Something Went Wrong. Check your internet connection or try again after sometime.",
      buttons: [
        {
          label: "OK",
        },
      ],
    })
  }
}

export const httpPatch = async ({ subUrl, params, token, body }) => {
  try {
    let fullUrl = baseUrl + subUrl

    if (params) {
      fullUrl = fullUrl + params
    }

    if (token) {
      headers.Authorization = token
    }

    const res = await fetch(fullUrl, {
      method: "PATCH",
      headers,
      body: JSON.stringify(body),
    })
    const result = await res.json()

    if (res.status == 200) {
      return {
        success: true,
        result,
      }
    } else {
      return {
        success: false,
        result,
      }
    }
  } catch (error) {
    confirmAlert({
      title: "Error",
      message:
        "Something Went Wrong. Check your internet connection or try again after sometime.",
      buttons: [
        {
          label: "OK",
        },
      ],
    })
  }
}

export const httpDelete = async ({ subUrl, params, token, body }) => {
  try {
    let fullUrl = baseUrl + subUrl
    const deleteOptions = {
      method: "DELETE",
      headers,
    }

    if (body) {
      deleteOptions.body = JSON.stringify(body)
    }

    if (params) {
      fullUrl = fullUrl + params
    }

    if (token) {
      headers.Authorization = token
    }

    const res = await fetch(fullUrl, deleteOptions)
    const result = await res.json()

    if (res.status == 200) {
      return {
        success: true,
        result,
      }
    } else {
      return {
        success: false,
        result,
      }
    }
  } catch (error) {
    confirmAlert({
      title: "Error",
      message:
        "Something Went Wrong. Check your internet connection or try again after sometime.",
      buttons: [
        {
          label: "OK",
        },
      ],
    })
  }
}

export default { httpPost, httpGet, httpPatch, httpDelete }
