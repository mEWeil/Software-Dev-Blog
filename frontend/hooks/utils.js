import axios from 'axios'

// LOGIN
export function useLogin (data, setUserInfo){
  event.preventDefault()
  axios.post('api/login', data)
    .then((response)=>setUserInfo(response.data))
    .catch((error)=>console.log(error))
}

// LOGOUT
export function useLogout(data){
  axios.post('api/logout')
    .then((response)=>console.log(response))
    .catch((error)=>console.log(error))
}

// SIGNUP
export function useSignup(data){
  axios.post('api/signup', data)
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

// SENDS GET REQUEST > DJANGO > API TO RECEIVE QUOTE ARRAY
export const useGetQuotes = (setQuotes) => {
  axios.get('api/getquotes')
  .then((response)=>setQuotes(response.data.data))
  .catch((error)=>console.log(error))
}

// CREATES A RANDOM NUMBER AND PULLS THAT INDEX FROM QUOTE ARRAY TO DISPLAY
export const useSendQuote = (setDisplayQuote, quotes) => {
  let randNum = Math.floor(Math.random()*50);
  console.log(randNum)
  setDisplayQuote(quotes[randNum])
}

// SENDS GET REQUEST > DJANGO > PEXELS TO RECIEVE TITLES AND IDS OF MY COLLECTIONS
export const useGetCollectionIds = (setCategories) => {
  axios.get('api/getcollectionids')
    .then((response)=>{
      let collections = response.data.data.collections;
      let collectionArr = [];
      collections.map(collection=>{
        collectionArr.push({title: collection.title, id: collection.id})
      })
      setCategories(collectionArr)})
    .catch((error)=>console.log(error))
}


export const useGetPictureUrls = () => {
  axios.get('api/getcollectionurls')
  .then((response)=>console.log(response))
  .catch((error)=>console.log(error))
}

export const useSendPicture = () => {
  let randNum = Math.floor(Math.random()*50);
  console.log(randNum)
  setDisplayQuote(quotes[randNum])
}