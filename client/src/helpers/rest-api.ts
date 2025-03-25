import axios from "axios"
import { envVariablesConfig } from "../config/envVariablesConfig"
import axiosRetry from "axios-retry"
import useUIstore from "../stores/ui-store"

type HttpMethod = "get" | "post" | "put" | "delete" | "patch"

const axiosInstance = axios.create({
  baseURL: envVariablesConfig.backendURL,
  headers: { "Content-Type": "application/json" },
  timeout: envVariablesConfig.apiTimeout,
  withCredentials: true,
})

axiosRetry(axiosInstance, { retries: envVariablesConfig.apiRetryCount })

const restApi = async (
  url: string,
  method: HttpMethod = "get",
  body = {},
  overRides = {}
) => {
  console.log("restApi called")

  try {
    if (method !== "get" && method !== "delete")
      return await axiosInstance[method](url, body, overRides)
    else return await axiosInstance[method](url, overRides)
  } catch (err: any) {
    if (err.code === "ECONNABORTED")
      console.error("Request timeout:", err.message)
    else if (err.response)
      console.error("Server responded with a status:", err.response.status)
    else if (err.request)
      console.error(
        "Request was made but no response was received:",
        err.request
      )
    else
      console.error(
        "Something happened in setting up the request:",
        err.message
      )

    console.error(err)
    useUIstore.setState({
      snackbar: err.response.data || {
        message: "something went wrong. try with different input",
      },
    })
    return null
  }
}

class RestApi {
  private url: string
  private body: any[] | object
  private overRides: object

  constructor(url: string, body = {}, overRides = {}) {
    this.url = url
    this.body = body
    this.overRides = overRides
  }

  get = async () =>
    axiosInstance.get(this.url, {
      ...this.overRides,
      withCredentials: true,
    })

  delete = async () =>
    axiosInstance.delete(this.url, {
      ...this.overRides,
      withCredentials: true,
    })

  post = async () =>
    axiosInstance.post(this.url, this.body, {
      ...this.overRides,
      withCredentials: true,
    })

  put = async () =>
    axiosInstance.put(this.url, this.body, {
      ...this.overRides,
      withCredentials: true,
    })

  patch = async () =>
    axiosInstance.patch(this.url, this.body, {
      ...this.overRides,
      withCredentials: true,
    })
}
//TODO: interceptor for error handling, use tanstack & ts-pattern
//TODO: keerthana's frontend is good (30% Abhishek sir's)

export default restApi
