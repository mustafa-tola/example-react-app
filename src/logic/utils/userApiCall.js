import axios from "axios"

export const createUser = async (body) => {
    return await axios.post('http://localhost:4000/users/createUser',body)
}

