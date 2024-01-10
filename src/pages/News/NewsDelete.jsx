import { Popconfirm, message } from "antd";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const NewsDelete = ({ id, getData }) => {
  async function handleDelete() {
    try {
      const res = await axios.delete(`/news/${id}`);
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
    message.success("Task deleted");
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Deletion canceled");
  };

  return (
    <div>
      <Popconfirm
        title="Are you sure to delete this task?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <span className="fa-solid fa-trash cursor-pointer text-center text-red-500" />
      </Popconfirm>
    </div>
  );
};

export default NewsDelete;
