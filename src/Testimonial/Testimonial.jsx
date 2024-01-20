import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PostTestimonial from "./PostTestimonial";
import DeleteTestimonial from "./DeleteTestimonial";
import EditTestimonail from "./EditTestimonail";

const Testimonial = () => {
  const [testimonial, setTestimonial] = useState([]);

  async function getData() {
    await axios
      .get("testimony")
      .then((response) => {
        setTestimonial(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }
  useEffect(() => {
    getData();
  }, []);

  console.log(testimonial, "test");

  return (
    <div className="mx-auto mt-[8px] flex min-h-[840px] min-w-full max-w-screen-lg flex-col gap-8 rounded-lg bg-white shadow-2xl md:container md:mt-10">
      <table className="bg-[#333366] text-white">
        <thead>
          <tr>
            <th className="border p-3">#</th>
            <th className="border p-3">Comment</th>
            <th className="border p-3">Job</th>
            <th className="border p-3">Name</th>
            <th className="border p-3">Image</th>
            <th className="border p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {testimonial?.length > 0 ? (
            testimonial?.map((item, index) => {
              return (
                <tr key={item?.id}>
                  <td className="border p-3">{index + 1}</td>
                  <td className="border p-3">{item?.comment}</td>
                  <td className="border p-3">{item?.name}</td>
                  <td className="border p-3">{item?.job}</td>
                  <td className="border p-3">
                    <img
                      className="aspect-square w-11 rounded-full"
                      src={`http://82.97.242.32:8080/api/image/ +${item?.image}`}
                      alt=""
                    />
                  </td>
                  <td className="border p-3">
                    <div className="flex items-center justify-center gap-2">
                      <DeleteTestimonial id={item.id} getData={getData} />
                      <EditTestimonail
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
      <PostTestimonial getData={getData} />
    </div>
  );
};

export default Testimonial;
