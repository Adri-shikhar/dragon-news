"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Mylink from "./Mylink";
import { authClient, signOut } from "@/lib/auth-client";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log("data session:", session);

  return (
    <div>
      <div className="py-4">
        <div className="mx-auto container grid grid-cols-3 items-center">
          <div />
          <div className="flex gap-4 justify-center">
            <Mylink href="/">Home</Mylink>
            <Mylink href="/About">About</Mylink>
            <Mylink href="/Career">Career</Mylink>
          </div>
          {user ? (
            <div className="flex justify-end text-center">
              <p className="text-gray-800 pr-4 text-center">
                Welcome, {user?.name}
              </p>
              <button
                className="bg-red-500 text-white px-6 py-2 rounded transition-colors duration-200 hover:bg-red-600"
                onClick={async () => {
                  await authClient.signOut();
                  router.push("/");
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex justify-end">
              <Link
                href="/SignIn"
                className="bg-gray-800 text-white px-6 py-2 rounded transition-colors duration-200 hover:bg-gray-700"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
