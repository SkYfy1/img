import { useRef, useState } from 'react'
import './App.css'
import ProfileCard from 'components/ProfileCard/ProfileCard'
import ImageUpload from 'components/ImageUpload/ImageUpload'
import defaultImg from "./assets/avatar.jpg"


function App() {
  const [state, setState] = useState('profile');
  const avatar = useRef(defaultImg);

  const handleChangeAvatar = (img: any) => {
    avatar.current = img;
  }

  return (
    <>
      {state === 'profile' && <ProfileCard avatar={avatar.current} change={setState}/>}
      {state === 'uploader' && <ImageUpload handleChangeAvatar={handleChangeAvatar} cancel={setState}/>}
      {/* {state === 'preview' && <ProfileCard />} */}
    </>
  )
}

export default App
