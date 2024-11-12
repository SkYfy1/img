import { SetStateAction, SyntheticEvent, useState, useRef } from 'react'
import ReactCrop, { centerCrop, convertToPixelCrop, Crop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Button from 'src/ui/Button'
import { setCanvasPreview } from 'src/setCanvasPreview'



const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

type CropModalProps = {
    img: { file: string, name: string, size: number };
    isCrop: React.Dispatch<SetStateAction<boolean>>;
    cropImage: (name: string, img: any) => void;
}


const CropModal = ({ img, isCrop, cropImage }: CropModalProps) => {
    const [crop, setCrop] = useState<Crop>();
    const imageRef = useRef<HTMLImageElement>();
    const canvasRef = useRef();

    const handleClose = () => {
        isCrop(false)
    }

    const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
        const { width, height } = e.currentTarget;
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100

        const crop = makeAspectCrop(
            {
                unit: '%',
                width: cropWidthInPercent
            },
            ASPECT_RATIO,
            width,
            height
        );

        const centeredCrop = centerCrop(crop, width, height);

        setCrop(centeredCrop);
    }


    return (
        <div className='crop-background'>
            <div className='crop-modal'>
                <div style={{ lineHeight: 1.4, fontSize: '1.3rem' }}>Crop your image</div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 100
                }}>
                    <ReactCrop crop={crop} onChange={(px, pc) => {
                        setCrop(pc);
                        if (imageRef.current == undefined || canvasRef.current == undefined || crop == undefined) return
                        setCanvasPreview(
                            imageRef.current,
                            canvasRef.current,
                            convertToPixelCrop(crop, imageRef.current.width, imageRef.current.height)
                        );
                    }} circularCrop={true} aspect={ASPECT_RATIO} >
                        <img ref={imageRef} onLoad={onImageLoad} style={{
                            maxHeight: 500
                        }} src={img.file} alt="" />
                    </ReactCrop>
                    {crop &&
                        <div>
                            <p>Cropped image preview</p>
                            <canvas
                                ref={canvasRef}
                                style={{
                                    border: '1px solid black',
                                    objectFit: 'contain',
                                    width: 150,
                                    height: 150,
                                    borderRadius: '50%'
                                }} />
                            {/* <Button onClick={() => {
                                if (imageRef.current == undefined || canvasRef.current == undefined || crop == undefined) return
                                setCanvasPreview(
                                    imageRef.current,
                                    canvasRef.current,
                                    convertToPixelCrop(crop, imageRef.current.width, imageRef.current.height)
                                );
                            }} style={{
                                fontSize: '1.1rem',
                                display: 'block',
                                border: 'none',
                                width: '70%',
                                padding: 5,
                                margin: '10px auto',
                                borderRadius: 5,
                                background: 'rgb(86, 61, 233)',
                                color: '#fff'
                            }} label='Crop Image' /> */}
                        </div>
                    }
                </div>
                <div className='btn-div'>
                    <Button onClick={handleClose} style={{ fontSize: '1.2rem' }} label='Cancel' />
                    <Button onClick={() => {
                        const dataURL = canvasRef.current.toDataURL();
                        cropImage(img.name, dataURL);
                        handleClose();
                    }} style={{ fontSize: '1.2rem' }} label='Confirm' />
                </div>
            </div>
        </div>
    )
}

export default CropModal
