import axios from "axios";
import { useEffect, useState } from "react";
import DeleteContact from "./DeleteContact";

const Contact = () => {
  const [contactData, setContactData] = useState(null);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("");

  async function getData() {
    await axios
      .get("/contact")
      .then((response) => {
        setContactData(response.data);
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
            <th className="border p-3">First name</th>
            <th className="border p-3">Last name</th>
            <th className="border p-3">Phone</th>
            <th className="border p-3">Email</th>
            <th className="border p-3">Message</th>
            <th className="border p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {contactData?.length > 0 ? (
            contactData?.map((item, index) => {
              return (
                <tr key={item?.id}>
                  <td className="border p-3">{index + 1}</td>
                  <td className="border p-3">{item?.firstName}</td>
                  <td className="border p-3">{item?.secondName}</td>
                  <td className="border p-3">{item?.number}</td>
                  <td className="border p-3">{item?.email}</td>
                  <td className="border p-3">{item?.message}</td>
                  <td className="border p-3">
                    <DeleteContact id={item.id} getData={getData} />
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

export default Contact;
