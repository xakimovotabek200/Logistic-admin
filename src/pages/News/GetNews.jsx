import React from "react";
import { Link } from "react-router-dom";

const GetNews = () => {
  return (
    <div>
      <section className="font-poppins flex items-center">
        <div className="mx-auto max-w-6xl justify-center px-4 py-4 lg:py-0">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white shadow-md ">
              <Link to={"/"} className="">
                <img
                  src="https://i.postimg.cc/fW3hVdhv/pexels-rodnae-productions-7648047.jpg"
                  alt=""
                  className="h-64 w-full rounded-t-lg object-cover"
                />
              </Link>
              <div className="p-5">
                <Link
                  to={"/"}
                  className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300"
                >
                  Community hub
                </Link>
                <p className="mt-3 mb-4 font-normal text-gray-700 dark:text-gray-400">
                  lorem ipsum dor amit isoeirspus soiduitrsas orem ipsum dor ami
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetNews;
