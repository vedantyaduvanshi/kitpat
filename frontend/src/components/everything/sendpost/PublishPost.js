import React, { useEffect, useRef, useState } from 'react'
import {useSelector} from "react-redux";
import Picker from 'emoji-picker-react'
import { createPost } from '../../../functions/createPost';
import BarLoader from "react-spinners/BarLoader";
import {chooserandom} from './randomline'
import dataURItoBlob from '../../../helpers/dataURItoBlob'
import { uploadImages } from '../../../functions/uploadImages';
import { uploadVideo } from '../../../functions/uploadVideo';

export default function PublishPost() {

  // Show Text Post 
  const [textPost, setTextPost] = useState(true)

  //Show Photo Post 
  const [PhotoPost, setPhotoPost] = useState(false)

  //Text in the post
  const [text, setText] = useState("")

  //Images in the post
  const [images, setImages] = useState([])

  //Video in the post
  const [video, setvideo] = useState([])

  const {user} = useSelector((user)=>({...user}))

  //Emoji picker
  const [picker, setPicker] = useState(false)

  //Ref for using emoji in text area
  const textRef = useRef(null);

  //fIXED cursor bug
  const [cursorPosition, setCursorPosition] = useState();

  //Showing errors
  const [error, seterror] = useState("")

 const [errorBackend, seterrorBackend] = useState("")


//Character Counting
  const [count, setCount] = React.useState(0);

  //Loading state

  const [loading, setLoading] = useState(false)


///setting random quote via usestate
  const [randomquateset, setrandomquateset] = useState("")






  //uSE effect for currsor glitch
  useEffect(()=> {
    textRef.current.selectionEnd= cursorPosition;
  }, [cursorPosition])




  

  //Handling emoji using the funtion below
  const handleemoji=(e,{emoji})=>{
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText)
    setCursorPosition(start.length + emoji.length)
    setCount(count+2);
  }





  //Closing post popup funtion
    function CloseCrossClicked(){
            const sample = document.querySelector('#popup');
            sample.style.visibility = 'hidden';
            document.body.style.overflowY = "auto";
            const sample2 = document.querySelector('#JustToBlur');
            sample2.style.visibility = 'hidden';
            sample2.style.backdropFilter = " blur(0px)";
            setText("")
            setPicker(false)
            setPhotoPost(false);
            setTextPost(true);
            setImages([]);
            setCount(0);    
            setvideo([]);
    }



    //Handing Video Uplaods Restrictions
    const videoInputRef = useRef(null)

    const handleVideos= (e) => {
      let files = Array.from(e.target.files);
      if (files.length < 2) {
        seterror("")
        files.forEach((vid)=>{
          if(
            vid.type !== "video/mp4" 
            ){
            seterror("File format not supported");
            disappear();
            files = files.filter((item) => item.name !== vid.name);
            return;
          }else if(vid.size > 1024 * 1024 * 9){
            seterror("Too large. Files should be smaller then 9mb.");
            disappear();
            files = files.filter((item) => item.name !== vid.name);
            return;
          }
          const reader = new FileReader();
          reader.readAsDataURL(vid);
          reader.onload=(readerEvent)=>{
            setvideo((video)=> [...video, readerEvent.target.result])
          };
        });
      }else{
         seterror("Please choose either 1 Video or up to 4 photos.")
         disappear();
         setvideo([]);
      }
        
    }
 
    // images post settings and functions

    const imageInputRef = useRef(null)
    const handleImages = (e) => {
      let files = Array.from(e.target.files);
      if (files.length < 5) {
        seterror("")
        files.forEach((img)=>{
          if(
            img.type !== "image/jpeg" &&
            img.type !== "image/png" &&
            img.type !== "image/webp" && 
            img.type !== "image/gif"
            ){
            seterror("File format not supported");
            disappear();
            files = files.filter((item) => item.name !== img.name);
            return;
          }else if(img.size > 1024 * 1024 * 5){
            seterror("Too large. Files should be smaller then 5mb.");
            disappear();
            files = files.filter((item) => item.name !== img.name);
            return;
          }
          const reader = new FileReader();
          reader.readAsDataURL(img);
          reader.onload=(readerEvent)=>{
            setImages((images)=> [...images, readerEvent.target.result])
          };
        });
      }else{
         seterror("Please choose either 1 Video or up to 4 photos.")
         disappear();
         setImages([]);
      }
        
      } 



      // Disappear the error message after some sec

      function disappear(){
        setTimeout(() => {
         seterror("");
        }, 2000)

      }

      
      // Disappear the error message after some sec

      function disappear2(){
        setTimeout(() => {
         seterrorBackend("");
        }, 2000)

      }





//post submit function


const postSubmit= async()=> {

  var finaltext = text.replace(/(\r\n|\r|\n){2,}/g, '$1\n');
  finaltext = finaltext.trim()
    


if (images && images.length < 5 && images.length !== 0) {
  if (count > 280) {
    seterrorBackend("Max characters allowed : 280")
    disappear2();
    setLoading(false);
    stop();
  }else{
    const postImages = images.map((img)=>{
      return dataURItoBlob(img);
    });
    const path = `${user.username}/post_images`;
    let formData = new FormData();
    formData.append("path", path);
    postImages.forEach((image)=>{
      formData.append('file', image);
    });
    const response = await uploadImages(formData, path, user.token);
    if (typeof response === 'string') {    
      seterrorBackend(response)
      disappear2();
      setLoading(false);
      stop();
    }else{

      const res = await createPost(
        null,
        finaltext,
        response,
        null,
        user.id,
        user.token);
        if(res==="ok") {
    
          const sample = document.querySelector('#popup');
          sample.style.visibility = 'hidden';
          document.body.style.overflowY = "auto";
          const sample2 = document.querySelector('#JustToBlur');
          sample2.style.visibility = 'hidden';
          sample2.style.backdropFilter = " blur(0px)";
          setText("")
          setPicker(false)
          setPhotoPost(false);
          setTextPost(true);
          setImages([]);
          setCount(0);    
          seterrorBackend("")
          setLoading(false);
          stop();
          console.log("error",response)
        }else{
          seterrorBackend(res)
          disappear2();
          setLoading(false);
          stop();
        }



    }




  }

}
else if (video && video.length < 2 && video.length !== 0){
  if (count > 280) {
    seterrorBackend("Max characters allowed : 280")
    disappear2();
    setLoading(false);
    stop();
  }else{
    const postVideo = video.map((vid)=>{
      return dataURItoBlob(vid);
    });
    const path = `${user.username}/post_video`;
    let formData = new FormData();
    formData.append("path", path);
    postVideo.forEach((vide)=>{
      formData.append('file', vide);
    });
    const response = await uploadVideo(formData, path, user.token);
    if (typeof response === 'string') {    
      seterrorBackend(response)
      disappear2();
      setLoading(false);
      stop();
    }else{
      const res = await createPost(
        null,
        finaltext,
        null,
        response,
        user.id,
        user.token);
        if(res==="ok") {
    
          const sample = document.querySelector('#popup');
          sample.style.visibility = 'hidden';
          document.body.style.overflowY = "auto";
          const sample2 = document.querySelector('#JustToBlur');
          sample2.style.visibility = 'hidden';
          sample2.style.backdropFilter = " blur(0px)";
          setText("")
          setPicker(false)
          setPhotoPost(false);
          setTextPost(true);
          setImages([]);
          setCount(0);    
          seterrorBackend("")
          setLoading(false);
          stop();
          console.log("error",response)
        }else{
          seterrorBackend(res)
          disappear2();
          setLoading(false);
          stop();
        }
      
    }
  }
}
else if(text){


  if (finaltext === "") {
      seterrorBackend("Type something or add Photos/Video to Post.")
      disappear2();
      setLoading(false);
      stop();
  }else if (count > 280) {
    seterrorBackend("Max characters allowed : 280")
    disappear2();
    setLoading(false);
    stop();
  }else{
    const response = await createPost(
      null,
      finaltext,
      null,
      null,
      user.id,
      user.token);
      if (response === "ok") {
        const sample = document.querySelector('#popup');
        sample.style.visibility = 'hidden';
        document.body.style.overflowY = "auto";
        const sample2 = document.querySelector('#JustToBlur');
        sample2.style.visibility = 'hidden';
        sample2.style.backdropFilter = " blur(0px)";
        setText("")
        setPicker(false)
        setPhotoPost(false);
        setTextPost(true);
        setImages([]);
        setCount(0);    
        seterrorBackend("")
        setLoading(false);
        stop();
      } else{
        seterrorBackend(response)
        disappear2();
        setLoading(false);
        stop();
      }
  }

}
else{
  seterrorBackend("Type something or add Photos/Video to Post.")
  disappear2();
  setLoading(false);
  stop();
}

}



///For generating random lines loading

var intervalID;

    // Function to call repeatedly 
    function sayHello(){
      setrandomquateset(chooserandom);
    }
    
    // Function to start setInterval call
    function start(){
        intervalID = setInterval(sayHello, 4000);
    }

    // Function to stop setInterval call
    function stop(){
        clearInterval(intervalID);
    }


    // console.log(video)
    // console.log(images)

  return (
    <>
    <div id="JustToBlur" ></div>
    <div id="popup">
        <img onClick={CloseCrossClicked} id="closeSection" src="../assets/close.png" alt=""/>


        
        {
          textPost && 
          <div id="MakeAPostPopUp">
          <textarea ref={textRef}  placeholder="What's happening...." maxLength="280" value={text} name="" id="textToPost" cols="30" rows="10" onInput={e => setCount(e.target.value.length)}  onChange={(e) =>{setText(e.target.value)}}></textarea>
              <div id="characCount"> <span>{count}</span>/280</div>
              <hr/>
              <div id="photosAndEmojiSendButton">
              <img onClick={()=>{
                setPhotoPost(true);
                setTextPost(false);
              }} 
              src="../assets/add_to_photos.png" alt=""/>
                  <img onClick={()=> {
                    setPicker((prev) => !prev)
                  }} src="../assets/insert_emoticon.png" alt=""/>
                  <button onClick={()=>{
                    setLoading(true);
                    start();
                    postSubmit();
                  }} >Pat it!</button>
              </div>
                {
                  picker && <div id='emojiPicker'><Picker onEmojiClick={handleemoji}/></div> 
                 }
                 {
                  error && <div id='Backenderror'>{error}</div>
                 } 
                  {
                  errorBackend && <div id='Backenderror'>{errorBackend}</div>
                 } 

          </div>
        }
















        {
          PhotoPost && 
          <div id="MakeAPostPopUpforPhotos">
          <textarea ref={textRef}  placeholder={`What's happening ${user?.first_name}...`} maxLength="280" value={text} name="" id="textToPost" cols="30" rows="10" onInput={e => setCount(e.target.value.length)}  onChange={(e) =>{setText(e.target.value)}}></textarea>
              <div id="characCount"> <span>{count}</span>/280</div>
              <hr/>
              <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple hidden  ref={imageInputRef} onChange={handleImages}/>
              <input type="file" accept="video/mp4"  hidden  ref={videoInputRef} onChange={handleVideos}/>
             
             
             
             
             
             
             
             
             
             {
              images && images.length &&
              <>
                           <div id='photostoUpload'>
                    <div onClick={()=> {
                      setImages([]);
                      
                    }} id='deleteImage'> <img src="../assets/delete.png" alt="" /></div>
                     <div onClick={()=>
                     {
                      if (images.length < 4) {
                        imageInputRef.current.click()
                      }else{
                        seterror("Max Limit Reached.")
                        disappear();
                      }
                     
                    } 
                  }id='addmore'><img src="../assets/add_to_photos.png" alt="" /> <span>Add Photos</span></div>
                   <div id= {images.length === 1 ? "preview1" : 
                   images.length === 2 ? "preview2" :
                   images.length === 3 ? "preview3" : "preview4"
                   } >
                    {images.map((img, i) => (
                      <img src={img} key={i} alt="" />
                    ))}
                   </div>
                  </div>
              </>
             }

             

              {
                video && video.length &&
                <>
                <div id='photostoUpload'>
                  <div onClick={()=> {
                    setvideo([]);
                      }} id='deleteVideo'> <img src="../assets/delete.png" alt="" /></div>
                   <div id='playingvideo'>
                    <video controls loop playsInline src={video}></video>
                   </div>
                  </div>
                </> 
              }
             
             
             
             
             
             {
              video.length === 0 &&
              images.length === 0 &&
              <>
                <div id='addVideosAndPhotos'>
                       <div id='AddingPhotos' onClick={()=>{imageInputRef.current.click()}}>
                        <img src="../assets/add_to_photos.png" alt="" />
                      <h3>Upto 4 Photos</h3>
                      </div>
                      <div id='OrDiv'>
                         <h2>OR</h2>
                      </div>
                       <div id='AddingVideos'  onClick={()=>{videoInputRef.current.click()}}>
                         <img src="../assets/video_library.png" alt="" />
                         <h3>A Video</h3>
                       </div>
                  </div>
              </>
             }
             
             
    
             






              
              <div id="photosAndEmojiSendButton">
              <img onClick={()=>{
                setPhotoPost(false);
                setTextPost(true);
              }} 
              src="../assets/text_fields.png" alt=""/>
                  <img onClick={()=> {
                    setPicker((prev) => !prev)
                  }} src="../assets/insert_emoticon.png" alt=""/>
                  <button
                  onClick={()=>{
                    setLoading(true);
                    start();
                    postSubmit();
                  }}>Pat it!</button>
              </div>
                {
                  picker && <div id='emojiPicker2'><Picker onEmojiClick={handleemoji}/></div> 
                 }
                 {
                  error && <div id='Backenderror'>{error}</div>
                 } 
                  {
                  errorBackend && <div id='Backenderror'>{errorBackend}</div>
                 } 

          </div>
        }
    </div>




    {
      loading && 
      <div id='PostLoadingforSubmit'>

        <img src="../../assets/loadingpost.gif" alt="" />
        <BarLoader color='#00EEFF' size={100} />
        <h2>Syncing with the server.</h2>
        <p>{randomquateset}</p>
      </div>
      
    }
    </>
  )
}
