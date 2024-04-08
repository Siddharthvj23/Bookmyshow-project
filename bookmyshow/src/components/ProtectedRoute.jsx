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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      try {
        dispatch(showloading());
        GetCurrentUser().then((response) => {
          dispatch(setUser(response.data.data));
          dispatch(hideloading());
        });
        // console.log(response)
      } catch (error) {
        dispatch(setUser(null));
        message.error(error.message);
      }
    } else {
      localStorage.removeItem("token");
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
