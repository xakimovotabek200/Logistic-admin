import {
  EllipsisVerticalIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Button, Dropdown, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteNews from "./DeleteNews";
import EditNews from "./EditNews";
import SeeAll from "./SeeAll";

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

  return (
    <div>
      <section className="font-poppins flex items-center">
        <div className="mx-auto max-w-6xl justify-center  py-4 lg:py-0">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data?.map((item, i) => {
              return (
                <div
                  key={i}
                  className="relative rounded-lg bg-white shadow-md "
                >
                  <div className="absolute right-2 top-2 z-20">
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: "1",
                            label: (
                              <>
                                <SeeAll data={item} />
                              </>
                            ),
                            icon: <EyeIcon className="h-6 w-6 text-gray-500" />,
                          },
                          {
                            key: "2",
                            label: (
                              <>
                                <EditNews data={item} getData={getData} />
                              </>
                            ),
                            icon: (
                              <PencilSquareIcon className="h-6 w-6 text-gray-500" />
                            ),
                          },
                          {
                            key: "3",
                            danger: true,
                            label: (
                              <>
                                <DeleteNews id={item?.id} getData={getData} />
                              </>
                            ),
                            icon: <TrashIcon className="h-6 w-6" />,
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
                    src={`http://192.168.1.182:8081/api/image/` + item?.jpgId}
                    alt=""
                    className="h-72 w-full rounded-t-lg object-cover"
                  />
                  <div className="p-5">
                    <p className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
                      {item?.title_en}
                    </p>
                    <p className="line-clamp-3 whitespace-pre-wrap break-words mt-3 mb-4 max-w-full font-normal text-gray-700 dark:text-gray-400">
                      {item?.description_en}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetNews;
