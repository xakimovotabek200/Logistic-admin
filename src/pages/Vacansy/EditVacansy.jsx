import { Button, Checkbox, Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const { TextArea } = Input;

const EditVacancy = ({ data, id, getData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    description_en: data?.description_en || "",
    description_ru: data?.description_ru || "",
    description_uz: data?.description_uz || "",
    title_en: data?.title_en || "",
    title_ru: data?.title_ru || "",
    title_uz: data?.title_uz || "",
    location: data?.location || "",
    workHours: data?.workHours || "",
    workdays: data?.workdays || "",
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
      const res = await axios.patch(`/vacancy/${id}`, editedData);
      if (res.status === 200) {
        toast.success("Profile edited successfully");
        handleCancel();
        getData();
      }
    } catch (err) {
      toast.error("An error occurred!");
    }
  };
console.log(editedData, "setEditedData");
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
          <label htmlFor="description_en">Description_en:</label>
          <TextArea
            showCount
            style={{
              height: 120,
              resize: "none",
            }}
            placeholder="Description in English"
            defaultValue={data.description_en}
            value={editedData.description_en}
            onChange={(e) => handleChange("description_en", e.target.value)}
            className="w-full rounded-md border border-blue-500 p-2 focus:outline-2 focus:outline-blue-700"
          />
        </div>
        <div>
          <label htmlFor="description_ru">description_ru:</label>
          <TextArea
            showCount
            style={{
              height: 120,
              resize: "none",
            }}
            placeholder="Description in Russian"
            defaultValue={data.description_ru}
            value={editedData.description_ru}
            onChange={(e) => handleChange("description_ru", e.target.value)}
            className="w-full rounded-md border border-blue-500 p-2 focus:outline-2 focus:outline-blue-700"
          />
        </div>
        <div>
          <label htmlFor="description_en">Description_uz:</label>
          <TextArea
            showCount
            style={{
              height: 120,
              resize: "none",
            }}
            placeholder="Description in uzbek"
            defaultValue={data.description_uz}
            value={editedData.description_uz}
            onChange={(e) => handleChange("description_uz", e.target.value)}
            className="w-full rounded-md border border-blue-500 p-2 focus:outline-2 focus:outline-blue-700"
          />
        </div>
        <div>
          <label htmlFor="title_en">title_en:</label>
          <Input
            defaultValue={data.title_en}
            value={editedData.title_en}
            onChange={(e) => handleChange("title_en", e.target.value)}
            className="w-full rounded-md border border-blue-500 p-2 focus:outline-2 focus:outline-blue-700"
          />
        </div>
        <div>
          <label htmlFor="title_ru">title_ru:</label>
          <Input
            defaultValue={data.title_ru}
            value={editedData.title_ru}
            onChange={(e) => handleChange("title_en", e.target.value)}
            className="w-full rounded-md border border-blue-500 p-2 focus:outline-2 focus:outline-blue-700"
          />
        </div>
        <div>
          <label htmlFor="title_uz">title_uz:</label>
          <Input
            defaultValue={data.title_uz}
            value={editedData.title_uz}
            onChange={(e) => handleChange("title_en", e.target.value)}
            className="w-full rounded-md border border-blue-500 p-2 focus:outline-2 focus:outline-blue-700"
          />
        </div>
        <div>
          <label htmlFor="workHours">workHours:</label>
          <Input
            defaultValue={data.workHours}
            value={editedData.workHours}
            onChange={(e) => handleChange("workHours", e.target.value)}
            className="w-full rounded-md border border-blue-500 p-2 focus:outline-2 focus:outline-blue-700"
          />
        </div>
        <div>
          <label htmlFor="workdays">workdays:</label>
          <Input
            defaultValue={data.workdays}
            value={editedData.workdays}
            onChange={(e) => handleChange("title_en", e.target.value)}
            className="w-full rounded-md border border-blue-500 p-2 focus:outline-2 focus:outline-blue-700"
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <Input
            defaultValue={data.location}
            value={editedData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className="w-full rounded-md border border-blue-500 p-2 focus:outline-2 focus:outline-blue-700"
          />
        </div>
        <label>
          Remote:
          <Checkbox
            className="px-5 py-5"
            onChange={(e) =>
              setEditedData((old) => ({ ...old, remote: e.target.checked }))
            }
          />{" "}
        </label>
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

export default EditVacancy;
