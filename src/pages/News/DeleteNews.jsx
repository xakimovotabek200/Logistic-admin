import { Popconfirm } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

const DeleteNews = ({ id, getData }) => {
  async function handleDelete() {
    try {
      const res = await axios.delete(`/news/${id}`);
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
        <p>O'chirish</p>
      </Popconfirm>
    </div>
  );
};

export default DeleteNews;
