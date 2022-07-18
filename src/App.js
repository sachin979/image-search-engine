import { useEffect, useCallback, useState } from "react";
import React from "react";
import "./App.css";
import axios from "axios";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import searchIcon from "./images/searchicon.png";
import ImageGallery from "./ImageGallery";
import debounce from "lodash.debounce";

function App() {
  const [Imagedata, setImageData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState("");
  const getImageData = async () => {
    console.log("Get image data");
    const url = "https://api.unsplash.com/photos/?client_id=" + process.env.REACT_APP_API_KEY;
    try {
      var data = await axios.get(url);
      setImageData(data.data);
    } catch (err) {
      console.error("Something went wrong\n" + err);
    }
  };
  const debouncedSearch = useCallback(
    debounce(async () => {
      console.log("Get search data");
      const url =
        "https://api.unsplash.com/search/photos?query=" +
        searchInput +
        "&client_id=" +
        process.env.REACT_APP_API_KEY;
      try {
        var data = await axios.get(url);
        console.log(data.data.results);
        setSearchData(data.data.results);
      } catch (err) {
        console.error("Something went wrong\n" + err);
      }
    }, 1000),
    []
  );
  const getSearchData = () => {
    debouncedSearch();
  };
  useEffect(() => {
    getImageData();
  }, []);
  useEffect(() => {
    if (searchInput.length > 2) debouncedSearch();
    //console.log(searchData);
  }, [searchInput]);
  useEffect(() => {
    //console.log(Imagedata);
  }, [Imagedata]);
  return (
    <div className="App">
      <div className="search__part">
        <div>Search among thousands of images!</div>
      </div>
      <div className="input__block">
        <input
          type="text"
          className="text__box"
          placeholder="Search"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <img src={searchIcon} className="search__icon" alt="" />
      </div>
      <div className="images__block">
        {searchInput.length < 1 ? (
          <ImageGallery data={Imagedata} search="false" />
        ) : (
          <ImageGallery data={searchData} search="true" />
        )}
      </div>
    </div>
  );
}

export default App;
