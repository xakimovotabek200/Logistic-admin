import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GetNews = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function getData() {
    await axios
      .get("/news")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }
  useEffect(() => {
    getData();
  }, []);
  console.log(data, "data");

  return (
    <div>
      <section className="font-poppins flex items-center">
        <div className="mx-auto max-w-6xl justify-center  py-4 lg:py-0">
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
