import React, { useCallback, useState } from 'react'
import './profilepic.css'
import Cropper from 'react-easy-crop'
import getCroppedImg from "../../helpers/getCroppedImg"


export default function ProfilePicChange({seteditProfilePicture,setProfilePic,ProfilePic}) {

  const HideEditPhotoCancel = () => {
  seteditProfilePicture(false)
  setProfilePic([]);
}

const [crop, setCrop] = useState({ x: 0, y: 0 })
const [zoom, setZoom] = useState(1)
const [croppedAreaPixels, setcroppedAreaPixels] = useState(null);


const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
  setcroppedAreaPixels(croppedAreaPixels)
}, [])

const getCroppedImage = useCallback(async()=>{
  try {
    const img = await getCroppedImg(ProfilePic, croppedAreaPixels)
    console.log(img);
    setProfilePic(img);
    seteditProfilePicture(false)
  return img;
  } catch (error) {
    console.log(error)
    
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[croppedAreaPixels])

  return (
    <div id='SelectNewProfilePic'>
      <h2>Edit Media</h2>
      <hr />
      <div id='SelectedPicture'>
      <Cropper
      image={ProfilePic}
      crop={crop}
      zoom={zoom}
      aspect={1 / 1}
      cropShape = "round"
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
      </div>

      <hr />
      <div id="slider">
      <input type="range"  min={1} step={0.2}  max={3} value={zoom} onChange={(e)=>setZoom(e.target.value)}/>
    </div>
      <div id='ButtonsPictureEdit'>
          <button onClick={HideEditPhotoCancel} id='CancelProfieeDIT'>Cancel</button>
          <button id='ApplyProfilEdit' onClick={()=>getCroppedImage()}>Done</button>
         </div>
    </div>
  )
}
