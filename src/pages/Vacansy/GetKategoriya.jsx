import { Button, Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import Table from "./Table";

const Vacansy = ({ getData }) => {
  const [formData, setFormData] = useState({
    description_en: "",
    description_ru: "",
    description_uz: "",
    name: "",
    title_en: "",
    title_ru: "",
    title_uz: "",
    workHours: "",
    workdays: "",
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
        const response = await axios.post("/vacancy", formData);
        setSuccess(true);
        getData();
        handleCancel(response);
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      setSuccess(false);
    }
  };

  return (
    <div className="mx-auto mt-[8px] flex min-h-[840px] min-w-full max-w-screen-lg flex-col gap-8 rounded-lg bg-white shadow-2xl md:container md:mt-10">
      <Table />
      <Button
        type="primary"
        className="fixed bottom-5 right-5 w-fit bg-blue-500"
        onClick={showModal}
      >
        + Add Vacansy
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
            Description (English):
            <Input
              type="text"
              name="description_en"
              size="large"
              value={formData.description_en}
              onChange={handleChange}
            />
          </label>
          <label>
            Description (Russian):
            <Input
              type="text"
              name="description_ru"
              size="large"
              value={formData.description_ru}
              onChange={handleChange}
            />
          </label>
          <label>
            Description (Uzbek):
            <Input
              type="text"
              name="description_uz"
              size="large"
              value={formData.description_uz}
              onChange={handleChange}
            />
          </label>
          <label>
            Name
            <Input
              type="text"
              name="name"
              size="large"
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <label>
            Title (English):
            <Input
              type="text"
              size="large"
              name="title_en"
              value={formData.title_en}
              onChange={handleChange}
            />
          </label>
          <label>
            Title (Russian):
            <Input
              type="text"
              name="title_ru"
              size="large"
              value={formData.title_ru}
              onChange={handleChange}
            />
          </label>
          <label>
            Title (Uzbek):
            <Input
              type="text"
              name="title_uz"
              size="large"
              value={formData.title_uz}
              onChange={handleChange}
            />
          </label>

          <label>
            Work Hours:
            <Input
              type="date"
              name="workHours"
              size="large"
              value={formData.workHours}
              onChange={handleChange}
            />
          </label>
          <label>
            Work Days:
            <Input
              type="text"
              name="workdays"
              size="large"
              value={formData.workdays}
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

export default Vacansy;
