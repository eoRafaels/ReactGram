import "./Search.css"

// Hooks
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage"
import { useQuery } from "../../hooks/useQuery"

// Componentes
import LikeContainer from "../../components/LikeContainer"
import PhotoItem from "../../components/PhotoItem"
import { Link } from "react-router-dom"

// Redux
import { searchPhotos, likePhoto } from "../../slices/photoSlice"


const Search = () => {

  let query = useQuery()
  const search = query.get("q")

  const dispatch = useDispatch()

  const resetMessage = useResetComponentMessage(dispatch)

  const {loading, photos} = useSelector((state) => state.photo)

  const {user} = useSelector((state) => state.auth)

  // Load photos
  useEffect(() => {

    dispatch(searchPhotos(search))

  }, [dispatch, search])

  if(loading){
    return <p>Carregando...</p>
  }

  // Insert a like
  const handleLike = (photo) => {
  
    dispatch(likePhoto(photo._id))

    resetMessage()

  }
  

  return (
    <div id="search">
      <h2>Você está buscando por: {search}</h2>
      {photos && photos.map((photo) => (
        <div key={photo._id}>
          <PhotoItem photo={photo} />
          <LikeContainer photo={photo} user={user} handleLike={handleLike}/>
          <Link className="btn" to={`/photos/${photo._id}`}>Ver mais</Link>
        </div>
      ))}
      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Não foram encontrados resultados para a sua busca...
        </h2>
      )}
    </div>
  )
}

export default Search