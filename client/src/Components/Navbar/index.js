import React from "react";
import { Link, useLocation} from "react-router-dom";
import { ReactComponent as Songs } from "Images/songs.svg";
import { ReactComponent as Album } from "Images/album.svg";
import { ReactComponent as Fav } from "Images/fav.svg";
import Consts from "const";

const Navbar = (props) => {
  const location = useLocation(),
    list = [
      { ...Consts.fields["album"], icon: <Album className="text-danger " /> },
      { ...Consts.fields["songs"], icon: <Songs /> },
      { ...Consts.fields["favList"], icon: <Fav className="text-warning" /> },
    ];
  /**
   * Renders the nav button with icon
   * @param {*} label 
   * @param {*} selected 
   * @param {*} key 
   * @param {*} svg 
   * @returns 
   */
  const renderNavButton = (label, selected, key, svg) => {
    return (
      <button
        className={`nav-link ${selected && "active"} my-2`}
        id="v-pills-home-tab"
        data-bs-toggle="pill"
        data-bs-target={`#v-pills-${key}`}
        type="button"
        role="tab"
        aria-controls={`v-pills-${key}`}
        aria-selected={selected}
        key={key}
      >
        <Link to={`/${key}`} className={`${selected ? "text-white" : "text-dark text-decoration-none"} fw-bold`}>
          {label}&nbsp;&nbsp;{svg}
        </Link>
      </button>
    );
  };

  /**
   * @returns Renders the navigations links
   */
  const renderNavButtons = () => list.map(({ label, redirectUrl, key, icon }, inedx) => renderNavButton(label, location.pathname === redirectUrl, key, icon));

  return (
    <div className="d-flex align-items-start">
      <div
        className="nav flex-column nav-pills me-3"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
      >
        {renderNavButtons()}
      </div>
    </div>
  );
};

export default Navbar;
