import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detay } from "../actions/detayMemory";
import { useParams } from "react-router-dom"; // react-router-dom eklenmeli
import ReactPlayer from "react-player";
import moment from "moment";
const Detay = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.yaziListesi);
  useEffect(() => {
    dispatch(detay(id));
  }, [dispatch, id]);

  return (
    <div className="col-md-10 p-0 m-0">
      <div className="col-md-12 p-0 m-0">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${id}`}
          width="100%"
          height="50vh"
        ></ReactPlayer>
      </div>
      <div className="col-md-12">
        {data?.items?.map((item, index) => {
          return (
            <>
              <div key={index}>
                <div
                  className="font-bold text-2xl mt-1 text-gray-900"
                  style={{ color: "gray", fontSize: "bold" }}
                >
                  {item?.snippet?.title}
                </div>
                <div className="space-x-2 text-gray-800 mt-1">
                  <span>{item?.statistics?.viewCount} Görüntüleme</span>
                  <span>
                    {moment(item?.snippet?.publishedAt)
                      .startOf("day")
                      .fromNow()}{" "}
                  </span>
                </div>
                <div
                  className=" mt-2"
                  style={{ color: "gray", fontSize: "bold" }}
                ></div>
                <div className="">
                  {(item?.snippet?.description).substring(0, 200)}...
                </div>
                {/* <div
                  className=""
                  style={{
                    marginTop: " 0.5rem",
                    fontSize: "0.75rem",
                    color: "#1d4ed8",
                  }}
                >
                  {item?.snippet?.tags.map((tag) => `#${tag}`)}
                </div> */}
                <div className="align-items " style={{ color: "gray" }}>
                  <span className="flex items-center">
                    <i className="fa-solid fa-thumbs-up"></i>
                    {item?.statistics?.likeCount}{" "}
                  </span>
                  <span className="flex items-center">
                    <i className="fa-solid fa-thumbs-down"></i> Görüntüleme{" "}
                    {item?.statistics?.viewCount}
                  </span>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Detay;
