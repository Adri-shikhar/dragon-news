import React from "react";

const Loading = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
    <span className="ml-4 text-xl font-semibold text-orange-600">
      Loading...
    </span>
  </div>
);

export default Loading;
