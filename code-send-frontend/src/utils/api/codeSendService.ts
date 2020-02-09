import { UpdateFormValues } from 'interfaces/Update'
import axios from 'axios'

const baseURL = process.env.REACT_APP_CODE_SEND_SERVICE_URL

const createUpdate = (update: UpdateFormValues) => {
  return axios({
    baseURL,
    url: '/update',
    method: 'post',
    data: update
  })
}

const uploadUpdate = (id: string, bundle: Blob) => {
  const formData = new FormData()
  formData.append('bundle', bundle)

  return axios({
    baseURL,
    url: `/update/${id}/bundle`,
    method: 'put',
    data: formData
  })
}

export default {
  baseURL,
  createUpdate,
  uploadUpdate
}
