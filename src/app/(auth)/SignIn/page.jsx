"use client";
import { authClient } from "@/lib/auth-client";
import React from "react";
import { useForm } from "react-hook-form";

const Signinpage = () => {
  const { handleSubmit, register } = useForm();

  const onSubmit = async (formdata) => {
    console.log(formdata);

    const { data, error } = await authClient.signIn.email({
      email: formdata.email, // required
      password: formdata.password, // required
      rememberMe: true,
      callbackURL: "/",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6 "
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="you@email.com"
            {...register("email")}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Password"
            {...register("password")}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded font-semibold hover:bg-orange-600 transition-colors"
        >
          Login
        </button>
        <p className="text-center text-sm mt-2">
          Donnot have an account?{" "}
          <a href="/Register" className="text-orange-500 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signinpage;
