import { contact, hiri, news, sumka } from "@/assets/status_images";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Homepage() {
  const [data, setData] = useState({});
  const [statusData, setStatusData] = useState({
    news: 0,
    hiring: 0,
    contact: 0,
    vacancy: 0,
  });

  async function getData() {
    try {
      const response = await axios.get("home");
      setStatusData(response?.data);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data && data.news && data.hiring && data.contact) {
      setStatusData({
        news: data.news,
        hiring: data.hiring,
        contact: data.contact,
        vacancy: data.vacancy || 0,
      });
    }
  }, [data]);

  return (
    <>
      <div className="mx-auto mt-[8px] flex min-h-[840px] min-w-full max-w-screen-lg flex-col gap-8 rounded-lg bg-white shadow-2xl md:container md:mt-10">
        <div className="grid  gap-10 md:grid-cols-2">
          <div className="grid grid-cols-3 rounded-xl border bg-white p-2 shadow-md shadow-black/30 transition-all">
            <div className="col-span-2 flex flex-col gap-2">
              <h3 className="whitespace-nowrap text-lg font-semibold text-black/60">
                Number of news
              </h3>
              <p className="text-2xl">{statusData.news}</p>
            </div>
            <div className="ml-auto max-w-full">
              <img src={news} alt="Icon" className="max-w-full" />
            </div>
          </div>
          <div className="grid grid-cols-3 rounded-xl border bg-white p-2 shadow-md shadow-black/30 transition-all">
            <div className="col-span-2 flex flex-col gap-2">
              <h3 className="whitespace-nowrap text-lg font-semibold text-black/60">
                Total applications
              </h3>
              <p className="text-2xl">{statusData.hiring}</p>
            </div>
            <div className="ml-auto max-w-full">
              <img src={hiri} alt="Icon" className="max-w-full" />
            </div>
          </div>
        </div>
        <div className="grid gap-10 md:grid-cols-2 ">
          <div className="grid grid-cols-3 rounded-xl border bg-white p-2 shadow-md shadow-black/30 transition-all">
            <div className="col-span-2 flex flex-col gap-2">
              <h3 className="whitespace-nowrap text-lg font-semibold text-black/60">
                Total received messages
              </h3>
              <p className="text-2xl">{statusData.contact}</p>
            </div>
            <div className="ml-auto max-w-full">
              <img src={contact} alt="Icon" className="max-w-full" />
            </div>
          </div>
          <div className="grid grid-cols-3 rounded-xl border bg-white p-2 shadow-md shadow-black/30 transition-all">
            <div className="col-span-2 flex flex-col gap-2">
              <h3 className="whitespace-nowrap text-lg font-semibold text-black/60">
                Available vacancies
              </h3>
              <p className="text-2xl">{statusData.vacancy}</p>
            </div>
            <div className="ml-auto max-w-full">
              <img src={sumka} alt="Icon" className="max-w-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
