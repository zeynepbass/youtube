import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchMemory } from "../actions/searchMemory";
import { useParams } from "react-router-dom"; // react-router-dom eklenmeli

import { Link } from "react-router-dom";
import moment from "moment";
const Detay = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.yaziListesi);
  useEffect(() => {
    dispatch(searchMemory(keyword));
  }, [dispatch, keyword]);

  return (
    <div className="col-md-10 p-0 m-0">

        {data?.items?.map((item, index) => {
          return (
            <div className="row pb-4" key={index}>
 
              <div className="col-md-4 ">
             
                <img
                  src={item.snippet.thumbnails.high.url}
                  alt="Video Thumbnail"
           
                  height={item.snippet.thumbnails.medium.height}
                  width={item.snippet.thumbnails.medium.width}
                />
           
              </div>
              <div className="col-md-8 p-0 m-0">
                <div style={{ color: "gray", fontSize: "bold" }}>
                  {item?.snippet?.title}
                </div>
                <div className="">
                  {(item?.snippet?.description).substring(0, 200)}...
                </div>
                <div className="space-x-2 text-gray-600 mt-1">
                <span>{item?.snippet?.channelTitle} </span>
                
                  <span>
                    {moment(item?.snippet?.publishedAt)
                      .startOf("day")
                      .fromNow()}{" "}
                  </span>
                </div>
                <div
                  className=" mt-2"
                  style={{ color: "gray", fontSize: "bold" }}
                >
                                    {(item?.snippet?.description).substring(0, 200)}...
                </div>
               
        
              </div>
         
            </div>
 
          );
        })}
      </div>

  );
};

export default Detay;
