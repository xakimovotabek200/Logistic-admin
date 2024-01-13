import axios from "axios";
import { useEffect, useState } from "react";
import DeleteVacansy from "./DeleteVacansy";
import EditVacansy from "./EditVacansy";
import Vacansy from "./GetKategoriya";

const Table = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function getData() {
    await axios
      .get("/vacancy")
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
      <table className="w-full bg-[#333366] text-white">
        <thead>
          <tr className="border">
            <th className="border p-3">#</th>
            <th className="border p-3">title_en,uz,ru</th>
            <th className="border p-3">description_en,uz,ru</th>
            <th className="border p-3">workHours</th>
            <th className="border p-3">workdays</th>
            <th className="border p-3">Location</th>
            <th className="border p-3">Remote</th>
            <th className="border p-3">Action </th>
          </tr>
        </thead>

        <tbody>
          {data?.length > 0 ? (
            data?.map((item, index) => {
              return (
                <tr key={item?.id}>
                  <td className="border p-3">{index + 1}</td>
                  <td className="border p-3">
                    {item?.title_en}
                    <hr className="my-2" />
                    {item?.title_ru}
                    <hr className="my-2" />
                    {item?.title_uz}
                  </td>
                  <td className="border p-3">
                    {item?.description_en}
                    <hr className="my-2" />
                    {item?.description_ru}
                    <hr className="my-2" />
                    {item?.description_uz}
                  </td>
                  <td className="border p-3">{item?.workHours}</td>
                  <td className="border p-3">{item?.workdays}</td>
                  <td className="border p-3">{item?.location}</td>
                  <td className="border p-3">
                    {item?.remote ? "online" : "offline"}
                  </td>
                  <td className="border p-3 ">
                    <div className="flex justify-center gap-2">
                      <DeleteVacansy id={item.id} getData={getData} />
                      <EditVacansy id={item.id} getData={getData} data={item} />
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

export default Table;
