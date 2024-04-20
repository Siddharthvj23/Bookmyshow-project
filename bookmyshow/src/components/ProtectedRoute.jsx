import { useEffect } from "react";
import { GetCurrentUser } from "../apicalls/user";
import { useNavigate } from "react-router-dom";
import { message, Layout, Menu } from "antd";
import { hideloading, showloading } from "../redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "antd/es/layout/layout";
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { setUser } from "../redux/userSlice";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navitems = [
    {
      label: "Home",
      icon: (
        <HomeOutlined
          onClick={() => {
            navigate("/");
          }}
        />
      ),
    },
    {
      label: `${user ? user.name : ""}`,
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <span
              onClick={() => {
                user.isAdmin ? navigate("/Admin") : navigate("/Profile");
              }}
            >
              My Profile
            </span>
          ),
          icon: <ProfileOutlined />,
        },
        {
          label: (
            <Link
              to="/login"
              onClick={() => {
                localStorage.removeItem("token");
                dispatch(setUser(null));
              }}
            >
              {" "}
              Log out{" "}
            </Link>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  const handleUser = async () => {
    try {
      // If token is present, try to fetch user data
      const response = await GetCurrentUser();
      console.log("get user success")
      // If token is valid, set user data in Redux state
      dispatch(setUser(response.data.data));
    } catch (error) {
      console.log("get user failure",error)
      // Redux State Clear
      dispatch(setUser(null));
      // LocalStorage Clear
      localStorage.removeItem("token");
      // Redirect to Login Page
      navigate("/login");
      // Show Error Message on top (Notification)
      message.error(error.response.data.message);
      
    }
  }
  
  useEffect(() => {
    if (localStorage.getItem("token")) {
      handleUser();
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return (
    user && (
      <>
        <Layout>
          <Header className="nav-container">
            <h3 className=" text-white">Book my show</h3>
            <Menu theme="dark" mode="horizontal" items={navitems} />
          </Header>
          {children}
        </Layout>
      </>
    )
  );
}

export default ProtectedRoute;
