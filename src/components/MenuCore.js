import { stack as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import { Icon, Image } from "@sonnat/ui";
import { Account } from "@sonnat/icons/paths";
import { Home } from "@sonnat/icons/paths";
import { PencilRulerO } from "@sonnat/icons/paths";
import { Logout } from "@sonnat/icons/paths";

const MenuCore = () => {
  function logout() {
    localStorage.clear();
  }

  return (
    <Menu right>
      <Link
        onClick={logout}
        to={"/sign"}
        className="d-flex justify-content-start align-items-center p-2 bg-white rounded mt-3 click pointer"
      >
        <Icon size={24}>{Logout}</Icon>
        <h5 className="m-0 mx-2">Logout</h5>
      </Link>
      <Link
        to={"/home"}
        className="d-flex justify-content-start align-items-center p-2 bg-white rounded mt-3 click pointer"
      >
        <Icon size={24}>{Home}</Icon>
        <h5 className="m-0 mx-2">Home</h5>
      </Link>
      <Link
        to={"/post"}
        className="d-flex justify-content-start align-items-center p-2 bg-white rounded mt-3 click pointer"
      >
        <Icon size={24}>{PencilRulerO}</Icon>
        <h5 className="m-0 mx-2">Add post</h5>
      </Link>
      <Link
        to={"/User"}
        className="d-flex justify-content-start align-items-center p-2 bg-white rounded mt-3 click pointer mb-5"
      >
        <Icon size={24}>{Account}</Icon>
        <h5 className="m-0 mx-2">Account</h5>
      </Link>
      <div className="mt-5 pt-5">
        <img src={"dashboard.png"} className="mt-5" />
      </div>
    </Menu>
  );
};

export default MenuCore;
