import React, { SetStateAction, useState, SyntheticEvent } from 'react'
import Image from './Image'
import CropModal from './CropModal'
import './imageUpload.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import Button from 'src/ui/Button'

type InputEvent = React.ChangeEvent<HTMLInputElement>

// interface HTMLInputEvent extends Event {
//     target: HTMLInputElement & EventTarget;
// }


const ImageUpload = ({ cancel, handleChangeAvatar }: { cancel: React.Dispatch<SetStateAction<string>>; handleChangeAvatar: (img: any) => void; }) => {
    const [images, setImages] = useState<{ file: string, name: string, size: number }[]>([]);
    const [select, setSelect] = useState(0);
    const [crop, setCrop] = useState(false);
    const [error, setError] = useState(null)


    const handleChange = (e?: InputEvent) => {
        if (images.length === 5) {
            toast.error('Maximum amount of images is 5!');
            return;
        }
        if (!e?.target.files) return;
        const image = e.target.files[0];
        console.log(image);
        setImages([...images, { name: image.name, file: URL.createObjectURL(image), size: image.size }])
    }

    const handleCancel = () => {
        cancel('profile')
    }

    const cropImage = (name: string, newImg: string) => {
        const newImages = images.map((el) => {
            if (name === el.name) {
                return { ...el, file: newImg }
            };
            return el;
        })
        setImages(newImages)
    }

    const handleConfirm = () => {
        try {
            handleChangeAvatar(images[select].file);
            handleCancel();
        } catch (err) {
            setError('Image not selected')
            console.log(err)
        }
    }


    return (
        <div className='modal itim-regular'>
            {crop && <CropModal cropImage={cropImage} isCrop={(bool) => setCrop(bool)} img={images[select]} />}
            <ToastContainer />
            <div className='text'>
                <div>Upload image(s)</div>
                <button onClick={handleCancel} className='x itim-regular'>x</button>
            </div>
            <p style={{ marginBottom: '20px', fontSize: '1.1rem', color: 'rgb(144, 144, 144)' }}>You may upload up to 5 images</p>
            <div className='input-block'>
                <label style={{ margin: '0 auto' }} className='input' htmlFor='avatar'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cloud">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                    </svg>
                    <input onChange={handleChange} type="file" name="avatar" id="avatar" />
                </label>
                <div>Click or drag and drop to upload</div>
                <div className='last'>PNG, JPG</div>
            </div>
            {images.map((el, ind) => (
                <Image key={el.size} image={el} selected={select === ind} crop={() => setCrop(true)} changeSelected={() => setSelect(ind)} deleteImage={() => setImages(images.filter(img => img.name != el.name))} />
            ))}
            {error && <div style={{
                color: 'red',
                fontSize: '1.5rem',
                margin: '15px auto 0 auto'
            }}>
                {error}
            </div>}
            <div className='btn-div'>
                <Button onClick={handleCancel} label='Cancel' />
                <Button onClick={handleConfirm} label='Select Image' />
            </div>
        </div>
    )
}

export default ImageUpload
