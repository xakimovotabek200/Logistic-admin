import { Button, Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import PostBanner from "../Banners/PostBanner";
const { TextArea } = Input;

const PostAbout = ({ getData }) => {
  const [file, setFile] = useState();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    getData();
  };

  const handleChangeInput = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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

  const postData = async (e) => {
    e.preventDefault();
    const { about_en, about_ru, about_uz, location, number, email, image } =
      e.target;
    const formdataForSubmit = new FormData();
    formdataForSubmit.append("about_en", about_en.value);
    formdataForSubmit.append("about_ru", about_ru.value);
    formdataForSubmit.append("about_uz", about_uz.value);
    formdataForSubmit.append("location", location.value);
    formdataForSubmit.append("number", number.value);
    formdataForSubmit.append("email", email.value);
    formdataForSubmit.append("image", image.files[0]);

    try {
      if (validateForm()) {
        const response = await axios.post("/information", formdataForSubmit);
        setSuccess(true);
        handleCancel();
        getData();
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
        title="About us"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form onSubmit={postData}>
          <label>
            about_en:
            <TextArea
              showCount
              style={{
                height: 120,
                resize: "none",
              }}
              placeholder="Description in English"
              type="text"
              name="about_en"
              size="large"
              value={formData.about_en}
              onChange={handleChange}
            />
          </label>
          <label>
            about_ru (Russian):
            <TextArea
              showCount
              style={{
                height: 120,
                resize: "none",
              }}
              placeholder="Description in Russian"
              type="text"
              name="about_ru"
              size="large"
              value={formData.about_ru}
              onChange={handleChange}
            />
          </label>
          <label>
            about_uz (Uzbek):
            <TextArea
              showCount
              style={{
                height: 120,
                resize: "none",
              }}
              placeholder="Description in Uzbek"
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
              required
            />
          </label>

          <label>
            Phone:
            <Input
              type="tel"
              size="large"
              name="number"
              value={formData.number}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <Input
              type="text"
              size="large"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Image:
            <Input
              type="file"
              size="large"
              name="image"
              value={formData.image}
              onChange={handleChangeInput}
            />
          </label>
          <Button
            type="primary"
            htmlType="submit"
            className="my-5 w-full bg-blue-500"
          >
            Submit
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default PostAbout;
