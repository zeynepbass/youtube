import { Link } from "react-router-dom";
import { useState } from "react";
import "./style.css";
const Header = (props) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const onKeyFunc = (e) => {
    if (e.key === "Enter") {
      searchFunc();
    }
  };
  const searchFunc = () => {
    if (searchKeyword.length > 0) {
      window.location = `search/${searchKeyword}`;
    }
  };
  return (
    <>
      <nav className="navbar col-12">
        <div className="toggle-btn">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <img src="img/logo.PNG" className="logo" alt="" />
        <div className="search-box">
          <input
            type="text"
            onKeyPress={onKeyFunc}
            className="search-bar"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="search"
          />
          <button className="search-btn" onClick={searchFunc}>
            <img src="img/search.PNG" alt="" />
          </button>
        </div>
        <div className="user-options">
          <img src="img/video.PNG" className="icon" alt="" />
          <img src="img/grid.PNG" className="icon" alt="" />
          <img src="img/bell.PNG" className="icon" alt="" />
          <div className="user-dp">
            <img src="img/profile-pic.png" alt="" />
          </div>
        </div>
      </nav>
      <div className="row p-0 m-0">
        <div className="side-bar col-md-2">
          <Link to="" className="links active">
            <img src="img/home.PNG" alt="" />
            home
          </Link>
          <Link to="" className="links">
            <img src="img/explore.PNG" alt="" />
            explore
          </Link>
          <Link to="" className="links">
            <img src="img/subscription.PNG" alt="" />
            subscription
          </Link>
          <hr className="seperator" />
          <Link to="" className="links">
            <img src="img/library.PNG" alt="" />
            library
          </Link>
          <Link to="" className="links">
            <img src="img/history.PNG" alt="" />
            history
          </Link>
          <Link to="" className="links">
            <img src="img/your-video.PNG" alt="" />
            your video
          </Link>
          <Link to="" className="links">
            <img src="img/watch-later.PNG" alt="" />
            watch leater
          </Link>
          <Link to="" className="links">
            <img src="img/liked video.PNG" alt="" />
            like video
          </Link>
          <Link to="" className="links">
            <img src="img/show more.PNG" alt="" />
            show more
          </Link>
        </div>
        {props.children}
      </div>
    </>
  );
};

export default Header;
