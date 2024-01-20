import { Button, Modal } from "antd";
import axios from "axios";
import { useState } from "react";

const PostBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (e) => {
    console.log(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { image } = e.target;
    const formdataForSubmit = new FormData();
    formdataForSubmit.append("image", image.files[0]);
    try {
      const response = await axios.post("banner", formdataForSubmit);
      console.log(response.data);
      handleCancel(response);
    } catch (error) {
      console.error("Error submitting news post:", error);
    }
  };
  return (
    <div>
      <Button
        type="primary"
        className="fixed bottom-5 right-5 w-fit bg-blue-500"
        onClick={showModal}
      >
        + Add Banner
      </Button>
      <Modal
        width={1000}
        title="About us"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form onSubmit={handleSubmit}>
          <label className="">
            Choose Image file
            <br />
            <input
              type="file"
              name="image"
              className="file:cursor-pointer file:rounded-md file:bg-transparent file:px-5"
              onChange={handleChange}
            />
            <img src={file} className="w-[400px] " />
          </label>
          <Button
            htmlType="submit"
            type="primary"
            className="w-full bg-blue-500"
          >
            Submit
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default PostBanner;
