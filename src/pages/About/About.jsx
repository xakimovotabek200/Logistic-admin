import axios from "axios";
import { useEffect, useState } from "react";
import DeleteInformation from "./DeleteInformation";
import EditInformation from "./EditInformation";
import PostAbout from "./PostAbout";

function About() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  async function getData() {
    await axios
      .get("/information")
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
    <>
      <div className="mx-auto mt-[8px] flex min-h-[840px] min-w-full max-w-screen-lg flex-col gap-8 rounded-lg bg-white shadow-2xl md:container md:mt-10">
        <div className="mx-auto mt-8 rounded-lg ">
          {data?.length > 0 ? (
            data?.map((item, index) => (
              <div key={index} className="">
                <div className="grid justify-between gap-16 md:grid-cols-2">
                  <div>
                    {" "}
                    <p className="mb-2 text-lg ">{item?.about_en}</p>
                    <p className="mb-2 text-sm">{item?.about_ru}</p>
                    <p className="mb-2 text-sm">{item?.about_uz}</p>
                    <p className="mb-2">{item?.location}</p>
                    <p className="mb-2">{item?.number}</p>
                    <p className="mb-2">{item?.email}</p>
                  </div>
                  <div>
                    <img
                      className="h-[300px]"
                      src={`http://82.97.242.32:8080/api/image/ +${item.image}`}
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <EditInformation
                    data={item}
                    id={item?.id}
                    getData={getData}
                  />
                  <DeleteInformation
                    data={item}
                    id={item?.id}
                    getData={getData}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center gap-3">
              <img src="/empty.png" alt="no data" width={100} />
              <p className="text-gray-500">No data available.</p>
            </div>
          )}
        </div>
        <PostAbout />
      </div>
    </>
  );
}

export default About;
{
  /* <DeleteInformation id={item.id} getData={getData} />
<EditInformation id={item.id} getData={getData} data={item} /> */
}
