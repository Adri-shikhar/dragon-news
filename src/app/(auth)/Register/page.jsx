"use client";
import React from "react";
import { useForm } from "react-hook-form";

const Registerpage = () => {
  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Your Name"
            {...register("name")}
          />
        </div>
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
          Register
        </button>
        <p className="text-center text-sm mt-2">
          Already have an account?{" "}
          <a href="/SignIn" className="text-orange-500 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Registerpage;
