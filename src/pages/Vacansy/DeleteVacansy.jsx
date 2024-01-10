import { Popconfirm, message } from "antd";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const DeleteVacansy = ({ id, getData }) => {
  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  async function handleDelete() {
    await axios
      .delete(`/vacancy/${id}`)
      .then((res) => {
        if (res.status === 200) {
          getData();
          toast.info("O'chirildi!");
        }
      })
      .catch(() => toast.error("Nimadadir xatolik ketdi!"));
  }
  
  return (
    <div>
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <span
          className="fa-solid fa-trash cursor-pointer text-center text-xl text-red-500"
          onClick={handleDelete}
        />{" "}
      </Popconfirm>
    </div>
  );
};

export default DeleteVacansy;
