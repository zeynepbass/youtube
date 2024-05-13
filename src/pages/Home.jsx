import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { memory } from "../actions/memory";
import { Link } from "react-router-dom";
import moment from "moment";
const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(memory());
  }, [dispatch]);

  const data = useSelector((state) => state.yaziListesi);

  return (
    <>
      <div className="col-md-10 ">
        <div className="row">
          {data.items &&
            data.items.map((item) => (
              
              <div className="col-md-3 " key={item.id}>
                <Link to={`video/${item.id.videoId}`}>
                  <img
                    src={item.snippet.thumbnails.medium.url}
                    alt="Video Thumbnail"
                    height={item.snippet.thumbnails.medium.height}
                    width={item.snippet.thumbnails.medium.width}
                  />
                </Link>
                <br />

                <div style={{ color: "black", fontWeight: "bold" }}>
                  {(item?.snippet?.title).substring(0, 50)}...
                </div>
                <div className="">{item?.snippet?.channelTitle}</div>
                <div style={{ color: "gray" }}>
                  <span>
                    {" "}
                    <i
                      className="fa-solid fa-eye"
                      style={{ fontSize: "15px" }}
                    ></i>{" "}
                    Görüntüleme {item?.statistics?.viewCount}
                  </span>

                  <span>
                    {moment(item?.snippet?.publishedAt)
                      .startOf("day")
                      .fromNow()}{" "}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
