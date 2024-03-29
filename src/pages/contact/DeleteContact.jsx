import { Popconfirm, message } from "antd";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const DeleteContact = ({ id, getData }) => {
  async function handleDelete() {
    try {
      const res = await axios.delete(`/contact/${id}`);
      if (res.status === 204) {
        getData();
        toast.info("O'chirildi!");
      }
    } catch (error) {
      toast.error("Nimadadir xatolik ketdi!");
    }
  }

  const confirm = () => {
    handleDelete();
  };

  return (
    <div>
      <Popconfirm
        title="Are you sure to delete this task?"
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <span className="fa-solid fa-trash cursor-pointer text-center text-red-500" />
      </Popconfirm>
    </div>
  );
};

export default DeleteContact;
