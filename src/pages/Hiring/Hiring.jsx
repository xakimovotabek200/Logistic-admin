import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteHiring from "./DeleteHiring";

const Hiring = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  async function getData() {
    await axios
      .get("/hiring")
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
    <div className="mx-auto mt-[8px] flex min-h-[840px] min-w-full max-w-screen-lg flex-col gap-8 rounded-lg bg-white shadow-2xl md:container md:mt-10">
      <table className="bg-[#333366] text-white">
        <thead>
          <tr className="border">
            <th className="border p-3">#</th>
            <th className="border p-3">Name</th>
            <th className="border p-3">Phone</th>
            <th className="border p-3">city</th>
            <th className="border p-3">comment</th>
            <th className="border p-3">experience</th>
          </tr>
        </thead>

        <tbody>
          {data?.length > 0 ? (
            data?.map((item, index) => {
              return (
                <tr key={item?.id}>
                  <td className="border p-3">{index + 1}</td>
                  <td className="border p-3">{item?.name}</td>

                  <td className="border p-3">{item?.phone}</td>
                  <td className="border p-3">{item?.city}</td>
                  <td className="border p-3">{item?.comment}</td>
                  <td className="border p-3">{item?.experience}</td>
                  <td className="border p-3">
                    <div className="flex items-center justify-center gap-2">
                      <DeleteHiring id={item.id} getData={getData} />
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={11}>
                <div className="flex flex-col items-center gap-3">
                  <img src="/empty.png" alt="no data" width={100} />
                  <p className="text-gray-500">No data available.</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Hiring;
