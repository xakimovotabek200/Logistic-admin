import { Button, Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import GetNews from "./GetNews";
const { TextArea } = Input;

const NewsForm = () => {
  const [file, setFile] = useState();
  const [formData, setFormData] = useState({});

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
    console.log(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      title_en,
      title_ru,
      title_uz,
      description_en,
      description_ru,
      description_uz,
      image,
    } = e.target;

    const formdataForSubmit = new FormData();
    formdataForSubmit.append("title_en", title_en.value);
    formdataForSubmit.append("title_ru", title_ru.value);
    formdataForSubmit.append("title_uz", title_uz.value);
    formdataForSubmit.append("description_en", description_en.value);
    formdataForSubmit.append("description_ru", description_ru.value);
    formdataForSubmit.append("description_uz", description_uz.value);
    formdataForSubmit.append("image", image.files[0]);

    try {
      const response = await axios.post("news", formdataForSubmit);
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting news post:", error);
    }
  };
  return (
    <div className="mx-auto mt-[8px] flex min-h-[840px] min-w-full max-w-screen-lg flex-col gap-8 rounded-lg bg-white shadow-2xl md:container md:mt-10">
      <Button
        type="primary"
        className="fixed bottom-5 right-5 w-fit bg-blue-500"
        onClick={showModal}
      >
        + Add News
      </Button>
      <Modal
        width={1000}
        title="Create News"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form onSubmit={handleSubmit}>
          <label>
            Title in English:
            <Input
              type="text"
              name="title_en"
              value={formData.title_en}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Title in Russian:
            <Input
              type="text"
              name="title_ru"
              value={formData.title_ru}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Title in Uzbek:
            <Input
              type="text"
              name="title_uz"
              value={formData.title_uz}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Description in English:
            <TextArea
              showCount
              placeholder="Description in English"
              style={{
                height: 120,
                resize: "none",
              }}
              name="description_en"
              value={formData.description_en}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Description in Russian:
            <TextArea
              showCount
              placeholder="Description in English"
              style={{
                height: 120,
                resize: "none",
              }}
              name="description_ru"
              value={formData.description_ru}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Description in Uzbek:
            <TextArea
              showCount
              placeholder="Description in English"
              style={{
                height: 120,
                resize: "none",
              }}
              name="description_uz"
              value={formData.description_uz}
              onChange={handleInputChange}
            />
          </label>
          <label className="">
            Choode Image file
            <br />
            <input
              type="file"
              name="image"
              className="file:cursor-pointer file:rounded-md file:bg-transparent file:px-5"
              onChange={handleChange}
            />
            <img src={file} className="w-[400px] " />
          </label>
          <Button htmlType="submit" type="primary" className="bg-blue-500">
            Submit
          </Button>
        </form>
      </Modal>
      <GetNews />
    </div>
  );
};

export default NewsForm;
