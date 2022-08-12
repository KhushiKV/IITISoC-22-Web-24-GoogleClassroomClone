import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import Announcement from "../Components/Announcement";
import { auth, db } from "../firebase";
import moment from 'moment';
import { IconButton } from "@material-ui/core";
import { SendOutlined } from "@material-ui/icons";
import Navbar from "../Components/Navbar"
//import {Map} from'./Map';
import "./Class.css";
function Class() {
  const [classData, setClassData] = useState({});
  const [announcementContent, setAnnouncementContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    // reverse the array
    let reversedArray = classData?.posts?.reverse();
    setPosts(reversedArray);
  }, [classData]);
  const createPost = async () => {
    if(announcementContent == "")
    {
      alert("can\'t post empty announcement");
      return;
    }
    try {
      const myClassRef = await db.collection("classes").doc(id).get();
      const myClassData = await myClassRef.data();
      console.log(myClassData);
      let tempPosts = myClassData.posts;
      tempPosts.push({
        authorId: user.uid,
        content: announcementContent,
        date: moment().format("MMM D, YYYY"),
        // date: moment().format("Do MM YY"),
        
        image: user.photoURL,
        name: user.displayName,
      });
      myClassRef.ref.update({
        posts: tempPosts,
      });
      setAnnouncementContent("")
    } catch (error) {
      console.error(error);
      alert(`There was an error posting the announcement, please try again!`);
    }
  };
  useEffect(() => {
    db.collection("classes")
      .doc(id)
      .onSnapshot((snapshot) => {
        const data = snapshot.data();
        if (!data) history("/");
        // console.log(data);
        setClassData(data);
      });
  }, []);
  useEffect(() => {
    if (loading) return;
    if (!user) history("/dashboard");
  }, [loading, user]);

  return (
    <>
    <Navbar />
    <div className="class">
      <div className="class__nameBox">
        <div className="class__name">{classData?.name}</div>
      </div>
      <div className="class__announce">
        <img src={user?.photoURL} alt="My image" />
        <input
          type="text"
          value={announcementContent}
          onChange={(e) => setAnnouncementContent(e.target.value)}
          placeholder="Announce something to your class"
        />
        <IconButton onClick={createPost}>
          <SendOutlined />
        </IconButton>
      </div>
      {posts?.map((post,ind) => (
        <>
        <Announcement
          authorId={post.authorId}
          content={post.content}
          date={post.date}
          image={post.image}
          name={post.name}
          key={ind}
        />
        </>
      ))}
    </div>
    </>
  );
}
export default Class;
