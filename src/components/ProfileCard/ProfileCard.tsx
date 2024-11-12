import './styles.css'
import { SetStateAction, useState } from 'react';
import ProfileInfo from './ProfileInfo';
import useStorage from 'src/store/storage';


const ProfileCard = ({ change, avatar }: { change: React.Dispatch<SetStateAction<string>>, avatar: any }) => {
  const [showPopUp, setShowPopUp] = useState(false);
  // const [profileInfo, setProfileInfo] = useState({
  //   name: 'Jack Smith',
  //   pron: 'He/Him',
  //   work: 'Senior Product Designer at Webflow',
  //   twitter: 'kingjack'
  // });
  const profileInfo = useStorage((state) => state.userInfo)

  return (
    <div className="card itim-regular">
      <div className="card-cover"></div>
      <div className='card-info'>
        <div className='f '>
          <div className='avatar'>
            <img style={{
              borderRadius: '50%',
              width: '100%'
            }} src={avatar} alt="" />
          </div>
          <button style={{ marginTop: '70px'}} className='update-btn itim-regular' onClick={() => change('uploader')}>Update picture</button>
        </div>
        <ProfileInfo showPopUp={showPopUp} profileInfo={profileInfo} setShowPopUp={setShowPopUp}/>
        {/* <div className='info'>
          <h1>{profileInfo.name}</h1>
          <div className='about'>
            {showPopUp && <div className='popup'>Privetiki</div>}
            <a href="#" onMouseEnter={() => setShowPopUp(true)} onMouseLeave={() => setShowPopUp(false)}>@{profileInfo.twitter}</a>
            <p >{profileInfo.work}</p>
            <p >{profileInfo.pron}</p>
          </div>
          <div className='country'>
            <img src={img} alt="" />
            <div style={{
              color: 'gray',
              fontWeight: 400
            }}>Vancouver, Canada</div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default ProfileCard
