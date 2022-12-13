import axios from 'axios'

export function useLogin (data){
  console.log('this is the data: ', data)
  event.preventDefault()
  axios.post('api/login', data)
    .then((response)=>console.log(response))
    .catch((error)=>console.log(error))
}

export function useLogout(data){
  axios.post('api/logout')
    .then((response)=>console.log(response))
    .catch((error)=>console.log(error))
}

// const userLogin = () => {
//   event.preventDefault()
//   axios.post('api/login', {
//     'username': username,
//     'password': password
//   })
//     .then((response)=>console.log(response))
//     .then(()=>setUserStatus(true))
//     .then(()=>navigate('/'))
//     .catch((error)=>console.log(error))
// }