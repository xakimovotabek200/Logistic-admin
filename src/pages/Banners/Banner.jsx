import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PostBanner from "./PostBanner";
import { Carousel, Dropdown, Space } from "antd";
import DeleteBanner from "./DeleteBanner";
import { Link } from "react-router-dom";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

const contentStyle = {
  height: "70vh",
  width: "100%",
  color: "#fff",
  lineHeight: "160px",
};

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
  useEffect(() => {
    getBanner();
  }, []);

  return (
    <div className="mx-auto mt-[8px] flex min-h-[840px] min-w-full max-w-screen-lg flex-col gap-8 rounded-lg bg-white shadow-2xl md:container md:mt-10">
      <div>
        <Carousel effect="fade" autoplay autoplaySpeed={2000} loop>
          {banners?.length > 0 ? (
            banners?.map((item) => {
              return (
                <div key={item.id} style={contentStyle} className="relative">
                  <div className="absolute right-2 top-2 z-20">
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: "1",
                            label: (
                              <>
                                <DeleteBanner
                                  id={item.id}
                                  getData={getBanner}
                                />
                              </>
                            ),

                            icon: (
                              <span className="fa-solid fa-trash text-xl text-red-500" />
                            ),
                          },
                        ],
                      }}
                    >
                      <Link onClick={(e) => e.preventDefault()}>
                        <Space>
                          <EllipsisVerticalIcon className="h-6 w-6 justify-end  rounded-md bg-white text-gray-500" />
                        </Space>
                      </Link>
                    </Dropdown>
                  </div>
                  <img
                    style={contentStyle}
                    className="h-full w-full object-cover"
                    src={`http://82.97.242.32:8080/api/image/ + ${item?.image}`}
                    alt=""
                  />
                </div>
              );
            })
          ) : (
            <div>
              <div className="flex flex-col items-center gap-3">
                <img src="/empty.png" alt="no data" width={100} />
                <p className="text-gray-500">No data available.</p>
              </div>
            </div>
          )}
        </Carousel>
      </div>
      <PostBanner />
    </div>
  );
};

export default Banner;
