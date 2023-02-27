import Left from './leftsection/Left'
import Centerposts from './center/Centerposts'
import Right from './right/Right'





export default function Everything({posts, user}) {   
  return (
    <div id="HomeEverything" >
     <Left/>
     <Centerposts posts={posts}  user={user} />
     <Right/>
   </div>
  )
}
