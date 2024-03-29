import React, { useEffect } from "react";
import "./Dashboard.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useNavigate} from "react-router-dom";
import { useState } from "react";
import ClassCard from "../Components/ClassCard";
import Navbar from "../Components/Navbar";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [classes, setClasses] = useState([]);
  const navigate= useNavigate();
  const fetchClasses = async () => {
    try {
       db
        .collection("users")
        .where("uid", "==", user.uid)
        .onSnapshot((snapshot) => {
          setClasses(snapshot?.docs[0]?.data()?.enrolledClassrooms);
        });
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/");
  }, [user, loading]);
  useEffect(() => {
    if (loading) return;
    fetchClasses();
  }, [user, loading]);

  console.log(user)

  return (
    <>
    <Navbar />
    <div className="dashboard">
      {classes === undefined || classes.length === 0 ? (
        <div className="dashboard__404">
          No classes found! Join or create one!
        </div>
      ) : (
        <div className="dashboard__classContainer">
          {classes.map((individualClass, ind) => (
            <ClassCard
              creatorName={individualClass.creatorName}
              creatorPhoto={individualClass.creatorPhoto}
              name={individualClass.name}
              id={individualClass.id}
              style={{ marginRight: 30, marginBottom: 30 }}
              key={ind}
            />
          ))}
        </div>
      )}
    </div>
    </>
  );
}
export default Dashboard;