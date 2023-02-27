import React, { useRef,useEffect, useState } from 'react'
import {chooserandom} from '../../../components/everything/sendpost/randomline'
import Picker from 'emoji-picker-react'
import dataURItoBlob from '../../../helpers/dataURItoBlob';
import { uploadImages } from '../../../functions/uploadImages';
import { uploadVideo } from '../../../functions/uploadVideo';
import { createcomment } from '../../../functions/createcomment';
import AllComments from './AllComments';
import BarLoader from "react-spinners/BarLoader";


export default function Comments({post,user,LogedInUserLikesPosts , comments}) {
    const [test, setTest] = useState("")

    useEffect(() => {
        ContinueThread(); // This is be executed when `loading` state changes
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [post?.user?._id])

    function ContinueThread(){
        if (post?.user?._id === user?.id) {
            setTest(true)
        }else{
            setTest(false)
        }
    }

  //Text in the post
    const [text, setText] = useState("")
    
//Character Counting
  const [count, setCount] = React.useState(0);

    //Loading state

    const [loading, setLoading] = useState(false)

    ///setting random quote via usestate
  const [randomquateset, setrandomquateset] = useState("")
  
    //Ref for using emoji in text area
    const textRef = useRef(null);

      //Emoji picker
  const [picker, setPicker] = useState(false)

    //fIXED cursor bug
    const [cursorPosition, setCursorPosition] = useState();


        // images post settings and functions

        const imageInputRef = useRef(null)
  

      //Showing errors
  const [error, seterror] = useState("")
  
 const [errorBackend, seterrorBackend] = useState("")
  
  
    //Images in the post
    const [images, setImages] = useState([])

        //Handing Video Uplaods Restrictions
        const videoInputRef = useRef(null)

          //Video in the post
  const [video, setvideo] = useState([])







    useEffect(()=>{
      setfinalresultStyle(true)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

      
      




  //Handling emoji 
  
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

    //uSE effect for currsor glitch
    useEffect(()=> {
      textRef.current.selectionEnd= cursorPosition;
    }, [cursorPosition])


    //Handling images 
    const handleImages = (e) => {
      let files = Array.from(e.target.files);
      console.log(images.length)
      if (files.length < 5 && images.length < 4 && files.length + images.length < 5 && video.length === 0) {
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

  

          //Hanlding the video


          const handleVideos= (e) => {
            let files = Array.from(e.target.files);
            if (files.length < 2 && video.length < 2 && video.length + video.length < 2 && images.length === 0) {
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



    //Publishing the comment 
    const postSubmit= async()=> {
     var checkReplyNumber
     if (post.hasOwnProperty("replyCheck")) {
      checkReplyNumber = true
     }else{
      checkReplyNumber = false
     }

     var finaltext = text.replace(/(\r\n|\r|\n){2,}/g, '$1\n');
     finaltext = finaltext.trim()

      const postID = post._id
      // console.log(post)

      var replyingto 

      if (post.hasOwnProperty("replyCheck")) {
        replyingto = post.user.username
       }else{
        post.replyingto.push(post.user.username)
        replyingto =  post.replyingto
       }

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
            const res = await createcomment(
              null,
              finaltext,
              response,
              null,
              user.id,
              postID,
              checkReplyNumber,
              replyingto,
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
            const res = await createcomment(
              null,
              finaltext,
              null,
              response,
              user.id,
              postID,
              checkReplyNumber,
              replyingto,
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
                setImages([]);
                setvideo([]);
                setCount(0);    
                seterrorBackend("")
                setLoading(false);
               stop();
                console.log("error",response)
              }else{
                seterrorBackend(res)
                setvideo([]);
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
          const response = await createcomment(
            null,
            finaltext,
            null,
            null,
            user.id,
            postID,
            checkReplyNumber,
            replyingto,
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


  


      const [setheightofusercomment, setsetheightofusercomment]=useState(true)

      const [finalresultStyle, setfinalresultStyle]=useState(true)
  return (
    <>
   
    
    
    <div id='allComments'>
 


<div
    style={{
      height: setheightofusercomment ? '120px' : '200px',
    }}
id='LoggedinUserComment'> 
 <div
    style={{
      height: setheightofusercomment ? '30px' : '75px',
    }}
 id='textareainPostFull' >
   <img src={user?.picture} alt="" />
   {
   test &&
   <textarea
   style={{
    height: setheightofusercomment ? '30px' : '70px',
  }} onClick={()=> setsetheightofusercomment(false)}
   ref={textRef}  maxLength="280" value={text} name=""  cols="30" rows="10" onInput={e => setCount(e.target.value.length)}  onChange={(e) =>{setText(e.target.value)}}   placeholder='Continue this Pat'></textarea>
   }
   {
   !test &&
   <textarea
   style={{
    height: setheightofusercomment ? '30px' : '70px',
  }}  onClick={()=> setsetheightofusercomment(false)}
   ref={textRef}  maxLength="280" value={text} name=""  cols="30" rows="10" onInput={e => setCount(e.target.value.length)}  onChange={(e) =>{setText(e.target.value)}} placeholder={`Replying to @${post?.user?.username}`}></textarea>
   }
 </div>
   <div id="characCountinCommenmts"> <span>{count}</span>/280</div>
   <hr id='hr2nd' />
   <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple hidden  ref={imageInputRef} onChange={handleImages}/>
   <div id='addPhotoEmojiAndSendButton'>
       <img onClick={()=>{imageInputRef.current.click()}} src="../assets/imgforcomment.png" alt="" />
       <input type="file" accept="video/mp4"  hidden  ref={videoInputRef} onChange={handleVideos}/>
       <img src="../assets/video_library.png" alt=""  onClick={()=>{videoInputRef.current.click()}} />
       <img onClick={()=>  setPicker((prev) => !prev)} src="../assets/insert_emoticon.png" alt="" />
       <button onClick={()=>{
                    setLoading(true);
                    start();
                    postSubmit();}}
       >Reply</button>
       
   </div>
   
   {
    picker && <div id='emojiPicker2'><Picker onEmojiClick={handleemoji} /></div> 
   }
   <hr id='hr3nd' />  
 
 {
  images && images.length !== 0 &&
  <div id='showingcommentImages'>
     {images.map((img, i) => (
         <img src={img} key={i} alt="" />
     ))}
      <div onClick={()=>setImages([])} id='deletethefilesComment'><img src="../assets/delete.png" alt="" /></div>
  </div>
 }

{
   video && video.length !== 0 &&
   <div id='showingcommentImages'>
   <video  src={video}></video>
    <div onClick={()=>setvideo([])} id='deletethefilesComment'><img src="../assets/delete.png" alt="" /></div>
</div>
}


  {
error && <div id='Backenderror'>{error}</div>
} 
   {
errorBackend && <div id='Backenderror'>{errorBackend}</div>
} 

    
 </div>
 <hr id='hr3nd' />
<div id='OtherAllComments'>
  {
    comments && 
    <>
    {comments.map((comment)=> (<AllComments key={comment._id} finalresultStyle={finalresultStyle}  LogedInUserLikesPosts={LogedInUserLikesPosts} post={comment} user={user} post1={post} /> ))}
    </>
  }
</div>

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
