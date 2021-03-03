import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import "./HomePage.css";
import axios from "axios";

function HomePage() {
  const [data, setData] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [results, setResults] = useState(1000);
  const [OriginalData, setOriginalData] = useState([]);
  const [pagenumber, setPageNumber] = useState(1);
  const fetchdata = () => {
    console.log(gender, results, country);
    if (gender !== "" && country !== "") {
      return axios
        .get(
          `https://randomuser.me/api/?page=${pagenumber}&gender=${gender}&results=${results}&nat=${country}`
        )
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {
          console.error(err);
        });
    }
    return axios
      .get(`https://randomuser.me/api/?page=${pagenumber}&results=${results}`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const callapi = () => {
    fetchdata().then((newData) => {
      setData(JSON.stringify(newData) || "No data");
      const inter = newData.results;
      setOriginalData(inter);
    });
  };
  useEffect(()=>{
    callapi();
  },[]);
  const handelgender = (e) => {
    setGender(e.target.value);
  };
  const handelcountry = (e) => {
    setCountry(e.target.value);
  };
  const handelresults = (e) => {
    setResults(e.target.value);
  };

  const handleNextPageNumber = (pagenumber) => {
    setPageNumber(pagenumber + 1);
  };
  const handlePrevPageNumber = (pagenumber) => {
    if (pagenumber === 1) {
      setPageNumber(1);
    }
    setPageNumber(pagenumber - 1);
  };

  return (
    <>
      <p className="Header"> BetterPlace</p>
      <div className="Queries">
        <button
          onClick={() => {
            callapi();
            handlePrevPageNumber(pagenumber);
          }}
          className = "prev__button"
        >
          &lt;&lt;&lt;  Prev
        </button>
        <select className="gender" onChange={handelgender}>
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select className="result" onChange={handelresults}>
          <option value="">Results</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <select className="Country" onChange={handelcountry}>
          <option value="">Country</option>
          <option value="AU">Australia</option>
          <option value="BR">Brazil</option>
          <option value="CA">Canada</option>
          <option value="GB">Great Britain</option>
          <option value="US">USA</option>
        </select>
        <button onClick={() => callapi()}>load data</button>
        <button
          onClick={() => {
            callapi();
            handleNextPageNumber(pagenumber);
          }}
          className = "next__button"
        >
          Next  &gt;&gt;&gt;
        </button>
      </div>
      <div >
        Page.No:- {pagenumber}
      </div>
      <div className="details">
        {/* <p>{data}data is here</p> */}

        {OriginalData.map((details) => (
          <Post
            username={
              details.name.title +
              " " +
              details.name.first +
              " " +
              details.name.last
            }
            location={details.location.country}
            imagethumb={details.picture.thumbnail}
            gender={details.gender}
            phone={details.phone}
            email={details.email}
            imagelarge={details.picture.large}
            imageStatus = {true}
          />
        ))}
      </div>
    </>
  );
}

export default HomePage;

