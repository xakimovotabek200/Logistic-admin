import { Popconfirm, message } from "antd";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const DeleteHiring = ({ id, getData }) => {
  async function handleDelete() {
    try {
      const res = await axios.delete(`/hiring/${id}`);
      if (res.status === 204) {
        toast.info("O'chirildi!");
        getData();
      }
    } catch (error) {
      toast.error("Nimadadir xatolik ketdi!");
    }
  }

  const confirm = () => {
    handleDelete();
    toast.success("Task deleted");
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

export default DeleteHiring;
