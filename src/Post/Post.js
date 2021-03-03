import React, { useState} from "react";
import "./Post.css";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
function Post({
  username,
  location,
  imagethumb,
  gender,
  phone,
  imagelarge,
  email,
}) {
  const [isOpen, setOpen] = useState(false);

 /*  const exit = (e) =>{
    if(typeof onClose === "function") return onClose(e);
    console.error("No Exit function passed on prop: onClose. Clicking the close button will do nothing");
  } */
  return (
    <div className="details">
      <p>{username}</p>
      <p>{gender}</p>
      <img src={imagethumb} alt=""  onClick={()=>setOpen(true)}/>
      {isOpen && (
        <Lightbox  
        mainSrc={imagelarge}
        onCloseRequest={()=>setOpen(false)}></Lightbox>
      )}
      <p>{location}</p>
      <p>{email}</p>
      <p>{phone}</p>
    </div>
  );
}

export default Post;

