
import { SyntheticEvent, useState } from 'react';
import './Image.css'

const MIN_DIMENSION = 150;

interface Image {
    name: string,
    file: string,
    size: number
}

interface ImageProps {
    image: Image,
    deleteImage: () => void;
    selected: boolean,
    changeSelected: () => void;
    crop: () => void;
    // onLoad: (e: SyntheticEvent<HTMLImageElement>) => void;
}

const Image = ({ image, deleteImage, selected, changeSelected, crop }: ImageProps) => {
    const [isSmall, setIsSmall] = useState(false);

    const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
        const { naturalWidth, naturalHeight } = e.currentTarget;
    
        if (naturalHeight < MIN_DIMENSION || naturalWidth < MIN_DIMENSION) {
            setIsSmall(true)
        }
    }

    return (
        <div className='wrapper' onClick={(e) => {
            e.stopPropagation()
            changeSelected()
            }}>
            <div className='inner'>
                <img onLoad={onImageLoad} className='image' src={image.file} alt="" />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10px 0' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <div style={{ fontSize: '1.2rem' }}>{image.name}</div>
                        <div style={{ fontSize: isSmall ? '1.3rem' : '0.9rem', lineHeight: '1', color: isSmall ? 'rgb(242, 13, 104)' :'rgb(144, 144, 144)' }}>{isSmall ? 'Small image, please pick another' :(image.size / 1000 + ' kb')}</div>
                    </div>
                    <div className='settings '>
                        <button disabled={isSmall} onClick={crop} className='btn'>
                            Crop image
                        </button>
                        <button onClick={deleteImage} className='btn'>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            {selected ? <div className='selected-btn'><div className='selected-btn-inner'></div></div> : <button onClick={deleteImage} className='unselected-btn'></button>}
        </div>
    )
}

export default Image
