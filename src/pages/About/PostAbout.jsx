import { Button, Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";

const PostAbout = ({ getData }) => {
  const [formData, setFormData] = useState({
    about_en: "",
    about_ru: "",
    about_uz: "",
    location: "",
    number: "",
    Email: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    for (const key in formData) {
      if (formData[key].trim() === "") {
        setError(`${key} is required`);
        return false;
      }
    }
    setError(null);
    return true;
  };

  const postData = async () => {
    try {
      if (validateForm()) {
        const response = await axios.post("/information", formData);
        setSuccess(true);
        getData();
        handleCancel();
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      setSuccess(false);
    }
  };

  return (
    <div className="mx-auto mt-[8px] flex min-h-[840px] min-w-full max-w-screen-lg flex-col gap-8 rounded-lg bg-white shadow-2xl md:container md:mt-10">
      <Button
        type="primary"
        className="fixed bottom-5 right-5 w-fit bg-blue-500"
        onClick={showModal}
      >
        + Add PostAbout
      </Button>
      <Modal
        width={1000}
        title="Create News"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form>
          <label>
            about_en:
            <Input
              type="text"
              name="about_en"
              size="large"
              value={formData.about_en}
              onChange={handleChange}
            />
          </label>
          <label>
            about_ru (Russian):
            <Input
              type="text"
              name="about_ru"
              size="large"
              value={formData.about_ru}
              onChange={handleChange}
            />
          </label>
          <label>
            about_uz (Uzbek):
            <Input
              type="text"
              name="about_uz"
              size="large"
              value={formData.about_uz}
              onChange={handleChange}
            />
          </label>
          <label>
            location
            <Input
              type="text"
              name="location"
              size="large"
              value={formData.location}
              onChange={handleChange}
            />
          </label>

          <label>
            Phone:
            <Input
              type="number"
              size="large"
              name="number"
              value={formData.number}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <Input
              type="email"
              size="large"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
            />
          </label>

          <Button
            type="primary"
            className="my-5 bg-blue-500"
            onClick={postData}
          >
            Submit
          </Button>
        </form>
      </Modal>

      {error && <p>Error: {error}</p>}
      {success && <p>Post successful!</p>}
    </div>
  );
};

export default PostAbout;
