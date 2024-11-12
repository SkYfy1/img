import React, { SetStateAction, useState } from 'react'
import './styles.css'
import img from '../../assets/canada.png'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from 'src/ui/Select'
import useStorage from 'src/store/storage';

export interface Info {
    name: string,
    pron: string,
    work: string,
    twitter: string
}

interface ProfileInfoProps {
    showPopUp: boolean,
    setShowPopUp: React.Dispatch<SetStateAction<boolean>>
    profileInfo: Info,
    setProfileInfo?: React.Dispatch<SetStateAction<Info>>
}

const ProfileInfo = ({ showPopUp, setShowPopUp, profileInfo }: ProfileInfoProps) => {
    const [changeInfo, setChangeInfo] = useState(false);
    const data = useStorage((state) => state.userInfo)
    const setUserInfo = useStorage((state) => state.setUserInfo)

    return (
        <div className='info'>
            {changeInfo ?
                <div style={{ width: '100%', display: 'flex', gap: '5px' }}>
                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { ml: 1.9, width: '155px' } }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField onChange={(e) => setUserInfo({ ...data, name: e.target.value })} id="name" label="Name" variant="outlined" />
                    </Box>
                    <button className='update-btn' onClick={() => {
                        setChangeInfo(false)
                    }}>Update info</button>
                </div> :
                <div style={{
                    display: 'flex',
                    gap: 12,
                    alignItems: 'center'
                }}>
                    <h1>{profileInfo.name}</h1>
                    <svg onClick={() => setChangeInfo(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='change'>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </div>}
            <div className={changeInfo ? 'change-about' : 'about'}>
                {showPopUp && <div className='popup'>Privetiki</div>}
                {changeInfo ?
                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { m: 0, width: '155px' } }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField onChange={(e) => setUserInfo({ ...data, twitter: e.target.value })} id="twitter" label="Twitter" variant="outlined" />
                    </Box> : <a href="#" onMouseEnter={() => setShowPopUp(true)} onMouseLeave={() => setShowPopUp(false)}>@{profileInfo.twitter}</a>}
                {changeInfo ?
                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { m: 0, width: '155px' } }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField onChange={(e) => setUserInfo({ ...data, work: e.target.value })} id="work" label="Work" variant="outlined" />
                    </Box>
                    : <p >{profileInfo.work}</p>}
                {changeInfo ? <Select change={(e) => setUserInfo({ ...data, pron: e.target.value })} pron={profileInfo.pron} />
                    : <p >{profileInfo.pron}</p>}
            </div>
            <div className='country'>
                <img src={img} alt="" />
                <div style={{
                    color: 'gray',
                    fontWeight: 400
                }}>Vancouver, Canada</div>
            </div>
        </div>
    )
}

{/* <div><label htmlFor="pron">Pronunciation</label><input id='pron' type="radio" /></div> */ }

export default ProfileInfo
