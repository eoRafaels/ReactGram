import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
   photos: [],
   photo: {},
   error: false,
   success: false,
   loading: false,
   message: null
}

// Publish user photo
export const publishPhoto = createAsyncThunk("photos/publish", async(photo, thunkAPI) => {

   const token = thunkAPI.getState().auth.user.token

   const data = await photoService.publishPhoto(photo, token)

   // Check for errors
   if(data.errors){
      return thunkAPI.rejectWithValue(data.errors[0])
   }

   return data

})

// Get user's photos
export const getUserPhotos = createAsyncThunk("photos/user", async(id, thunkAPI) => {

   const token = thunkAPI.getState().auth.user.token

   const data = await photoService.getUserPhotos(id, token)

   return data

})

// Delete a photo
export const deletePhoto = createAsyncThunk("photo/delete", async(id, thunkAPI) => {

   const token = thunkAPI.getState().auth.user.token

   const data = await photoService.deletePhoto(id, token)

   // Check for errors
   if(data.errors){
      return thunkAPI.rejectWithValue(data.errors[0])
   }

   return data

})

// Update a photo
export const updatePhoto = createAsyncThunk("photo/update", async(photoData, thunkAPI) => {

   const token = thunkAPI.getState().auth.user.token

   const data = await photoService.updatePhoto(photoData, token)

   // Check for errors
   if(data.errors){
      return thunkAPI.rejectWithValue(data.errors[0])
   }

   return data

})

// Get photo by id
export const getPhoto = createAsyncThunk("photo/view",  async(id, thunkAPI) => {

   const token =  thunkAPI.getState().auth.user.token

   const data = await photoService.getPhoto(id, token)

   return data

})

// Like a photo
export const likePhoto = createAsyncThunk("photo/like", async(id, thunkAPI) => {

   const token = thunkAPI.getState().auth.user.token

   const data = await photoService.likePhoto(id, token)

   // Check for errors
   if(data.errors){
      return thunkAPI.rejectWithValue(data.errors[0])
   }

   return data

})

// Add comment to a photo
export const commentPhoto = createAsyncThunk("photo/comment", async(commentData, thunkAPI) => {

   const token = thunkAPI.getState().auth.user.token

   const data = await photoService.commentPhoto(commentData, token)

   // Check for error
   if(data.errors){
      return thunkAPI.rejectWithValue(data.errors[0])
   }
   
   return data

})

// Get all photos
export const getAllPhotos = createAsyncThunk("photo/getAll", async(_, thunkAPI) => {

   const token = thunkAPI.getState().auth.user.token

   const data = await photoService.getAllPhotos(token)

   return data

})

// Search photos by title
export const searchPhotos = createAsyncThunk("photo/search", async(query, thunkAPI) => {

   const token = thunkAPI.getState().auth.user.token

   const data = await photoService.searchPhotos(query, token)

   return data

})


export const photoSlice = createSlice({
   name: "photo",
   initialState,
   reducers: {
      resetMessage: (state) => {
         state.message = null
      }
   },
   extraReducers: (builder) => {
      builder.addCase(publishPhoto.pending, (state) => {
         state.loading = true
         state.error = false
      }).addCase(publishPhoto.fulfilled, (state, action) => {
         state.loading = false
         state.success = true
         state.error = null
         state.photo = action.payload
         state.photos.unshift(state.photo)
         state.message = "Photo publicada com sucesso!"
      }).addCase(publishPhoto.rejected, (state, action) => {
         state.loading = false
         state.error = action.payload
         state.photo = {}
      }).addCase(getUserPhotos.pending, (state) => {
         state.loading = true
         state.error = false
      }).addCase(getUserPhotos.fulfilled, (state, action) => {
         state.loading = false
         state.success = true
         state.error = null
         state.photos = action.payload
      }).addCase(deletePhoto.pending, (state) => {
         state.loading = true
         state.error = false
      }).addCase(deletePhoto.fulfilled, (state, action) => {
         state.loading = false
         state.success = true
         state.error = null
         state.photos = state.photos.filter((photo) => {
            return photo._id !== action.payload.id
         })
         state.message = action.payload.message
      }).addCase(deletePhoto.rejected, (state, action) => {
         state.loading = false
         state.error = action.payload
         state.photo = {}
      }).addCase(updatePhoto.pending, (state) => {
         state.loading = true
         state.error = false
      }).addCase(updatePhoto.fulfilled, (state, action) => {
         state.loading = false
         state.success = true
         state.error = null
         state.photos.map((photo) => {
            if(photo._id !== action.payload.photo._id){
               return photo.title = action.payload.photo.title
            }
            return photo
         })
         state.message = action.payload.message
      }).addCase(updatePhoto.rejected, (state, action) => {
         state.loading = false
         state.error = action.payload
         state.photo = {}
      }).addCase(getPhoto.pending, (state) => {
         state.loading = true
         state.error = false
      }).addCase(getPhoto.fulfilled, (state, action) => {
         state.loading = false
         state.success = true
         state.error = null
         state.photo = action.payload
      }).addCase(likePhoto.fulfilled, (state, action) => {
         state.loading = false
         state.success = true
         state.error = null
         if(state.photo.likes){
            state.photo.likes.push(action.payload.userId)
         }
         state.photos.map((photo) => {
            if(photo._id === action.payload.photoId){
               return photo.likes.push(action.payload.userId)
            }
            return photo
         })
         state.message = action.payload.message
      }).addCase(likePhoto.rejected, (state, action) => {
         state.loading = false
         state.error = action.payload
      }).addCase(commentPhoto.pending, (state) => {
         state.loading = true
         state.error = false
      }).addCase(commentPhoto.fulfilled, (state, action) => {
         state.loading = false
         state.success = true
         state.error = null
         state.photo.comments.push(action.payload.comment)
         state.message = action.payload.message
      }).addCase(commentPhoto.rejected, (state, action) => {
         state.loading = false
         state.error = action.payload
         state.photo = {}
      }).addCase(getAllPhotos.pending, (state) => {
         state.loading = true
         state.error = false
      }).addCase(getAllPhotos.fulfilled, (state, action) => {
         state.loading = false
         state.success = true
         state.error = null
         state.photos = action.payload
      }).addCase(searchPhotos.pending, (state) => {
         state.loading = true
         state.error = false
      }).addCase(searchPhotos.fulfilled, (state, action) => {
         state.loading = false
         state.success = true
         state.error = null
         state.photos = action.payload
      })
   }
})

export const {resetMessage} = photoSlice.actions
export default photoSlice.reducer