import React, { useEffect, useState, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CgMenuLeft } from "react-icons/cg";
import { BiDonateBlood } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { toast } from "react-hot-toast";
import { BiLogInCircle } from "react-icons/bi";
import { InitializeContext } from "../../App";
import auth from "../../auth/Firebase/Firebase.config";

const Navbar = () => {
  const { theme, handleThemeChange } = useContext(InitializeContext);
  const [user] = useAuthState(auth);
  // const [userInfo] = useUserInfo(user);
  const { pathname } = useLocation();
  const [scrollY, setScrollY] = useState<Number>(0);

  const handleScroll = () => {
    const position = window.pageYOffset as any;
    setScrollY(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  const handleLogOut = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
    toast.success(`Thank you, ${user?.displayName} to stay with us!`);
  };

  const NavbarMenus = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-white uppercase bg-error" : ""
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-white uppercase bg-error" : ""
          }
          to="/campaigns"
        >
          Campaigns
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-white uppercase bg-error" : ""
          }
          to="/volunteers"
        >
          Volunteers
        </NavLink>
      </li>

      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-white uppercase bg-error" : ""
          }
          to="/contact-us"
        >
          Contact Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 w-full z-50">
      <div
        className={`drawer-content flex flex-col bg-base-100 duration-300 ${scrollY > 100 && `shadow-md bg-[#006A4E] text-black`
          }`}
        style={
          pathname.includes("dashboard")
            ? { display: "none" }
            : { display: "flex" }
        }
      >
        <div className="navbar py-3 container mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <CgMenuLeft className="text-3xl" />
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow-xl bg-base-100 rounded-box w-52"
              >
                {NavbarMenus}
              </ul>
            </div>
            <Link
              className="btn btn-ghost normal-case text-xl flex gap-2 items-center"
              to="/"
            >
              <BiDonateBlood className="hidden lg:block text-2xl" />{" "}
              {!user ? (
                <span className="text-lg md:text-xl">One Life Resources</span>
              ) : (
                <span className="ml-[-17px] md:ml-0">One Life Resources</span>
              )}
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal p-0 gap-3">{NavbarMenus}</ul>
          </div>
          <div className="navbar-end gap-3">
            {/* <li className="list-none">
              <button
                onClick={handleThemeChange}
                className="rounded-full lg:mx-2 font-bold pt-2 ml-2"
              >
                {theme ? (
                  <svg
                    className="swap-on fill-current w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>
                ) : (
                  <svg
                    className="swap-off fill-current w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                )}
              </button>
            </li> */}
            {!user && (
              <NavLink
                to="/login"
                className="btn flex gap-2 items-center btn-error text-white"
              >
                <BiLogInCircle /> Login
              </NavLink>
            )}
            {user && (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div
                    style={{ display: "grid" }}
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border bg-base-300 grid place-items-center ring ring-primary ring-offset-base-100 ring-offset-2"
                  >
                    {/* {auth?.currentUser?.photoURL && !userInfo?.image ? ( */}
                    <img src={auth?.currentUser?.photoURL as any} alt="" />
                    {/* ) : !auth?.currentUser?.photoURL && userInfo?.image ? (
                      <img src={userInfo?.image} alt="profile" />
                    ) : (
                      <img
                        src="https://i.ibb.co/xY0rfV4/avatar.jpg"
                        alt="profile"
                      />
                    )} */}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow-xl menu menu-compact dropdown-content bg-base-100 rounded-box w-60"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto my-4 border ring ring-primary ring-offset-base-100 ring-offset-2">
                    {/* {auth?.currentUser?.photoURL && !userInfo?.image ? (
                      <img
                        src={auth?.currentUser?.photoURL}
                        alt="profile"
                        className="w-16 h-16 rounded-full"
                      />
                    ) : !auth?.currentUser?.photoURL && userInfo?.image ? (
                      <img
                        src={userInfo?.image}
                        alt="profile"
                        className="w-16 h-16 rounded-full"
                      />
                    ) : ( */}
                    <img
                      src="https://i.ibb.co/xY0rfV4/avatar.jpg"
                      alt="profile"
                      className="w-16 h-16 rounded-full"
                    />
                    {/* )} */}
                  </div>
                  <div className="text-center mb-4">
                    <h2 className="font-semibold text-lg">
                      {
                        // userInfo?.displayName
                        //   ? userInfo?.displayName
                        //   : 
                        auth?.currentUser?.displayName
                      }
                    </h2>

                    <Link to="/dashboard/profile">
                      <button className="btn btn-primary mt-4 rounded-full text-white">
                        View Profile
                      </button>
                    </Link>
                  </div>
                  <hr className="font-semibold" />
                  <li className="py-1 font-semibold">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "text-white py-3 bg-primary" : "py-3"
                      }
                      to="/dashboard"
                    >
                      <i className="bx bxs-dashboard"></i> Dashboard
                    </NavLink>
                  </li>
                  <li className="py-1">
                    <button
                      onClick={handleLogOut}
                      className="py-3 font-semibold"
                    >
                      <i className="bx bx-log-out font-semibold"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;