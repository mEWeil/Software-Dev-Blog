import axios from 'axios'

export function useLogin (data){
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

// CSRF TOKEN
export function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
        }
      }
    }
  return cookieValue;
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