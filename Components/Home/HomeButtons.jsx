"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const HomeButtons = () => {
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push("/chat");
    }
  }, []);
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Welcome</h3>
          <div className="d-grid gap-2">
            <Link href="/login" className="btn btn-primary">
              Login
            </Link>
            <Link href="/register" className="btn btn-primary">
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeButtons;
