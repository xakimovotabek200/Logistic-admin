import { Popconfirm, message } from "antd";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const DeleteVacansy = ({ id, getData }) => {
  async function handleDelete() {
    await axios
      .delete(`/vacancy/${id}`)
      .then((res) => {
        if (res.status === 200) {
          getData();
        }
      })
      .catch(() => toast.error("Nimadadir xatolik ketdi!"));
  }
  const confirm = (e) => {
    handleDelete();
    toast.success("Click on Yes");
  };

  return (
    <div>
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <span className="fa-solid fa-trash cursor-pointer text-center text-xl text-red-500" />{" "}
      </Popconfirm>
    </div>
  );
};

export default DeleteVacansy;
