import "./Home.css"

import { uploads } from "../../utils/config"

// Components
import Message from "../../components/Message"
import { Link } from 'react-router-dom'
import PhotoItem from '../../components/PhotoItem'
import LikeContainer from '../../components/LikeContainer'

// Hooks
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'

// Redux
import { getAllPhotos, likePhoto } from "../../slices/photoSlice"

const Home = () => {

  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  
  const resetMessage = useResetComponentMessage(dispatch)

  const {loading, photos} = useSelector((state) => state.photo)

  // Load photo data
  useEffect(() => {
    dispatch(getAllPhotos())
  }, [dispatch])

  if(loading){
    return <p>Carregando...</p>
  }
  
  // Insert a like
  const handleLike = (photo) => {
  
    dispatch(likePhoto(photo._id))

    resetMessage()

  }

  return (
    <div id="home">
      {photos && photos.map((photo) => (
        <div key={photo._id}>
          <PhotoItem photo={photo} />
          <LikeContainer photo={photo} user={user} handleLike={handleLike}/>
          <Link className="btn" to={`/photos/${photo._id}`}>Ver mais</Link>
        </div>
      ))}
      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Ainda não há fotos publicadas, <Link to={`/users/${user._id}`}>Clique aqui</Link>
        </h2>
      )}
    </div>
  )
}

export default Home