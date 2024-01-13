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
        <table className="bg-[#333366] text-white">
          <thead>
            <tr className="border">
              <th className="border p-3">#</th>
              <th className="border p-3">about_en,ru,uz</th>
              <th className="border p-3">Location</th>
              <th className="border p-3">Phone</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {data?.length > 0 ? (
              data?.map((item, index) => {
                return (
                  <tr key={item?.id}>
                    <td className="border p-3">{index + 1}</td>
                    <td className="border p-3">
                      {item?.about_en}
                      <hr className="my-2" />
                      {item?.about_ru}
                      <hr className="my-2" />
                      {item?.about_uz}
                    </td>

                    <td className="border p-3">{item?.location}</td>
                    <td className="border p-3">{item?.number}</td>
                    <td className="border p-3">{item?.email}</td>
                    <td className="border p-3">
                      <div className="flex items-center justify-center gap-2">
                        <DeleteInformation id={item.id} getData={getData} />
                        <EditInformation
                          id={item.id}
                          getData={getData}
                          data={item}
                        />
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
        <PostAbout />
      </div>
    </>
  );
}

export default About;
