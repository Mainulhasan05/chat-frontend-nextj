"use client";
import React, { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useChatApp } from "@/context/ChatAppContext";
import Link from "next/link";

const page = () => {
  const router = useRouter();
  const { fetchRooms } = useChatApp();
  const [loading, setLoading] = useState(false);
  const [userObj, setUserObj] = useState({
    phone: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axiosInstance.post("/api/auth/login", userObj);
      if (res.status === 200) {
        Cookies.set("token", res.data?.data?.token, {
          expires: 90,
        });
        Cookies.set("user", JSON.stringify(res.data?.data?.user), {
          expires: 90,
        });
        router.push("/chat");
        setLoading(false);
        fetchRooms();
      }
    } catch (error) {
      setLoading(false);
      alert(error.response.data.error);
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setUserObj({ ...userObj, [e.target.id]: e.target.value });
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Login</h3>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    value={userObj.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={userObj.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-grid">
                  {
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Login"}
                    </button>
                  }
                </div>
              </form>
              <div className="text-center my-2 p-2">
                <small>
                  {/* Don't have an account?{" "} */}
                  <Link href="/" className="text-primary">
                    Back to home
                  </Link>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
