import { requestConfig, api } from "../utils/config";

// Publish an user photo
const publishPhoto = async(data, token) => {

   const config = requestConfig("POST", data, token, true)

   try {

      const res = await fetch(api + "/photos/", config)
         .then((res) => res.json())
         .catch((err) => err)

      return res

   } catch (error) {
      console.log(error)
   }

}

// Get user's photos
const getUserPhotos = async(id, token) => {
   
   const config = requestConfig("GET", null, token)

   try {
      
      const res = await fetch(api + "/photos/user/" + id, config)
         .then((res) => res.json())
         .catch((err) => err)

      return res

   } catch (error) {
      console.log(error)
   }

}

// Delete a photo
const deletePhoto = async(id, token) => {

   const config = requestConfig("DELETE", null, token)

   try {
      
      const res = await fetch(api + "/photos/" + id, config)
         .then((res) => res.json())
         .catch((err) => err)

      return res

   } catch (error) {
      console.log(error)
   }

}

// Update a photo
const updatePhoto = async(data, token) => {

   const config = requestConfig("PUT", data, token)

   try {

      const res = await fetch(api + "/photos/" + data.id, config)
         .then((res) => res.json())
         .catch((err) => err)

      return res
      
   } catch (error) {
      console.log(error)
   }

}

// Get a photo by id
const getPhoto = async(id, token) => {

   const config = requestConfig("GET", null, token)

   try {

      const res = fetch(api + "/photos/" + id, config)
         .then((res) => res.json())
         .catch((err) => err)

      return res

   } catch (error) {
      console.log(error)
   }


}

// Like a photo
const likePhoto = async(id, token) => {

   const config = requestConfig("PUT", null, token)

   try {
      
      const res = await fetch(api + "/photos/like/" + id, config)
         .then((res) => res.json())
         .catch((err) => err)

      return res

   } catch (error) {
      console.log(error)
   }

}

// Add comment to a photo
const commentPhoto = async(data, token) => {

   const config = requestConfig("PUT", data, token)

   try {
      
      const res = await fetch(api + "/photos/comment/" + data.id, config)
         .then((res) => res.json())
         .catch((err) => err)

      return res

   } catch (error) {
      console.log(error)
   }

}

// Get all photos
const getAllPhotos = async(token) => {

   const config = requestConfig("GET", null, token)

   try {
      
      const res = await fetch(api + "/photos", config)
         .then((res) => res.json())
         .catch((err) => err)

      return res

   } catch (error) {
      console.log(error)
   }

}

// Search photos by title
const searchPhotos = async(query, token) => {

   const config = requestConfig("GET", null, token)

   try {
      
      const res = await fetch(api + "/photos/search?q=" + query, config)
         .then((res) => res.json())
         .catch((err) => err)

      return res

   } catch (error) {
      console.log(error)
   }

}

const photoService = {
   publishPhoto,
   getUserPhotos,
   deletePhoto,
   updatePhoto,
   getPhoto,
   likePhoto,
   commentPhoto,
   getAllPhotos,
   searchPhotos,
}

export default photoService