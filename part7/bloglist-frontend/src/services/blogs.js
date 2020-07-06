import axios from 'axios'
import storage from '../utils/storage'

const baseUrl = '/api/blogs'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}


const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, getConfig())
  return response.data
}

const deleteBlog = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig())
  return response.data
}

const addComment = async (id, comment) => {
  const commentObject = {
    comment: comment
  }
  const response = await axios.post(`${baseUrl}/${id}/comments`, commentObject, getConfig())
  return response.data
}

const update = async (newObject)  => {
  const id = newObject.id
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

export default { getAll, create, update, deleteBlog, addComment }