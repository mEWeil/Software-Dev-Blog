import axios from 'axios'

// LOGIN
export function useLogin (data, setUserInfo){
  event.preventDefault()
  axios.post('api/login', data)
    .then(response=>setUserInfo(response.data))
    .catch(error=>console.log(error))
}

// LOGOUT
export function useLogout(data, setUserInfo){
  axios.post('api/logout')
    .then(response=>{
      console.log(response);
      setUserInfo(null);
    })
    .catch(error=>console.log(error))
}

// SIGNUP
export function useSignup(data){
  axios.post('api/signup', data)
    .then(response=>console.log(response))
    .catch(error=>console.log(error))
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
    .then(response=>setQuotes(response.data.data))
    .catch(error=>console.log(error))
}

// CREATES A RANDOM NUMBER AND PULLS THAT INDEX FROM QUOTE ARRAY TO DISPLAY
export const useSendQuote = (setDisplayQuote, quotes) => {
  let randNum = Math.floor(Math.random()*50);
  setDisplayQuote(quotes[randNum])
}

// SENDS GET REQUEST > DJANGO > PEXELS TO RECIEVE TITLES AND IDS OF MY COLLECTIONS
export const useGetCollectionIds = (setCategories) => {
  axios.get('api/getcollectionids')
    .then(response=>{
      let collections = response.data.data.collections;
      let collectionArr = [];
      collections.map(collection=>{
        collectionArr.push({title: collection.title, id: collection.id})
      })
      setCategories(collectionArr)})
    .catch(error=>console.log(error))
}

// SENDS POST REQUEST TO DAJNGO > SENDS GET REQUEST TO PEXELS TO RETRIEVE ARRAY WITH PICTURE URLS
export const useGetPictureUrls = (setPictureUrls, data) => {
  axios.post('api/getcollectionurls', data)
    .then(response=>setPictureUrls(response.data.data['media']))
    .catch(error=>console.log(error))
}

// CREATES A RANDOM NUMBER AND PULLS THAT INDEX FROM PICTURE URL ARRAY TO DISPLAY
export const useSendPicture = (setDisplayPicture, pictureUrls) => {
  let randNum = Math.floor(Math.random()*15);
  console.log(randNum)
  console.log(pictureUrls[randNum].src['original'])
  setDisplayPicture(pictureUrls[randNum].src['original'])
}

export const createPost = (data) => {
  axios.post('api/createpost', data)
    .then(response=>console.log(response))
    .catch(error=>console.log(error))
}

export const getPosts = (setPosts) => {
  axios.get('api/getposts')
    .then(response=>setPosts(response.data))
    .catch(error=>console.log(error))
}

export const deletePost = (postId, setPosts) => {
  axios.delete('api/deletepost/'+postId+'')
    .then(response=>{
      console.log(response);
      getPosts(setPosts);
      })
    .catch(error=>console.log(error))
}