import { Button, Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
const { TextArea } = Input;

const EditInformation = ({ data, id, getData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    about_en: data?.about_en || "",
    about_ru: data?.about_ru || "",
    about_uz: data?.about_uz || "",
    location: data?.location || "",
    number: data?.number || "",
    email: data?.email || "",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (field, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.patch(`/information/${data.id}`, editedData);
      if (res.status === 200) {
        toast.success("Profile edited successfully");
        handleCancel();
        getData();
      }
    } catch (err) {
      toast.error("An error occurred!");
    }
  };

  return (
    <div>
      <span
        onClick={showModal}
        className="fa-solid fa-edit cursor-pointer text-xl text-blue-500"
      />
      <Modal
        title="Edit Vacancy"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <div>
          <label htmlFor="about_en">about_en:</label>
          <TextArea
            showCount
            style={{
              height: 120,
              resize: "none",
            }}
            placeholder="Description in English"
            value={editedData.about_en}
            defaultValue={editedData.about_en}
            onChange={(e) => handleChange("about_en", e.target.value)}
            className="w-full rounded-md border border-blue-500 p-2 focus:outline-2 focus:outline-blue-700"
          />
        </div>
        <div>
          <label htmlFor="about_ru">about_ru:</label>
          <TextArea
            showCount
            style={{
              height: 120,
              resize: "none",
            }}
            placeholder="Description in English"
            defaultValue={data.about_ru}
            value={editedData.about_ru}
            onChange={(e) => handleChange("about_ru", e.target.value)}
            className="w-full rounded-md border border-blue-500 p-2 focus:outline-2 focus:outline-blue-700"
          />
        </div>
        <div>
          <label htmlFor="about_uz">about_uz:</label>
          <TextArea
            showCount
            style={{
              height: 120,
              resize: "none",
            }}
            placeholder="Description in English"
            value={editedData.about_uz}
            defaultValue={editedData.about_uz}
            onChange={(e) => handleChange("about_uz", e.target.value)}
            className="w-full rounded-md border border-blue-500 p-2 focus:outline-2 focus:outline-blue-700"
          />
        </div>
        <div>
          <label htmlFor="location">location:</label>
          <Input
            value={editedData.location}
            defaultValue={editedData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className="w-full rounded-md border border-blue-500 p-2 focus:outline-2 focus:outline-blue-700"
          />
        </div>
        <div>
          <label htmlFor="number">phone:</label>
          <Input
            type="text"
            value={editedData.number}
            defaultValue={editedData.number}
            onChange={(e) => handleChange("number", e.target.value)}
            className="w-full rounded-md border border-blue-500 p-2 focus:outline-2 focus:outline-blue-700"
          />
        </div>
        <div>
          <label htmlFor="email">email:</label>
          <Input
            value={editedData.email}
            defaultValue={editedData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full rounded-md border border-blue-500 p-2 focus:outline-2 focus:outline-blue-700"
          />
        </div>
        <Button
          className="my-6 w-full bg-blue-500"
          type="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Modal>
    </div>
  );
};

export default EditInformation;
