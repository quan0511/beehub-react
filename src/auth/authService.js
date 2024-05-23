import axios from './baseApi'

export const login = async (body) => await axios.post('auth/signin', body)

export const testApi = async () => await axios.get('test/admin')