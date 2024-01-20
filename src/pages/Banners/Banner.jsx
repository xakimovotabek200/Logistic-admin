import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Banner = () => {
  const [banners, setBanners] = useState([]);

  async function getBanner() {
    await axios
      .get("banner")
      .then((response) => {
        setBanners(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }
  return (
    <div className="mx-auto mt-[8px] flex min-h-[840px] min-w-full max-w-screen-lg flex-col gap-8 rounded-lg bg-white shadow-2xl md:container md:mt-10">
      Banner
    </div>
  );
};

export default Banner;
