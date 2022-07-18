import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

function ImageGallery(props) {
  const Imagedata = props.data;
  //console.log(props.data);
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
      <Masonry>
        {props.data.length > 0 ? (
          props.data.map((ele, index) => {
            return <img src={ele.urls.thumb} className="image__class" key={index} />;
          })
        ) : (
          <div style={{ textAlign: "center" }}>
            {" "}
            {props.search ? "No Results Found" : "Loading"}
          </div>
        )}
      </Masonry>
    </ResponsiveMasonry>
  );
}

export default ImageGallery;
