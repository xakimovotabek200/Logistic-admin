import { Popconfirm } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

const DeleteInformation = ({ id, getData }) => {
  async function handleDelete() {
    try {
      const res = await axios.delete(`/information/${id}`);
      if (res.status === 200) {
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
        title="Are you sure to delete this data?"
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <span className="fa-solid fa-trash cursor-pointer text-center text-xl text-red-500" />
      </Popconfirm>
    </div>
  );
};

export default DeleteInformation;
