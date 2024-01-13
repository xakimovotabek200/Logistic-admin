import { Button, Checkbox, Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import Table from "./Table";
import { toast } from "react-toastify";
const { TextArea } = Input;

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
    remote: "",
    location: "",
  });

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

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/vacancy", formData);
      setSuccess(true);
      handleCancel();
      getData();
    } catch (error) {
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
        title="Create Vacansy"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form onSubmit={postData}>
          <label>
            Description (English):
            <TextArea
              showCount
              style={{
                height: 120,
                resize: "none",
              }}
              required
              placeholder="Description in English"
              type="text"
              name="description_en"
              size="large"
              value={formData.description_en}
              onChange={handleChange}
            />
          </label>
          <label>
            Description (Russian):
            <TextArea
              showCount
              style={{
                height: 120,
                resize: "none",
              }}
              placeholder="Description in Russian"
              size="large"
              value={formData.description_ru}
              name="description_ru"
              onChange={handleChange}
            />
          </label>
          <label>
            Description (Uzbek):
            <TextArea
              showCount
              style={{
                height: 120,
                resize: "none",
              }}
              placeholder="Description in Uzbek"
              type="text"
              name="description_uz"
              size="large"
              value={formData.description_uz}
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
              type="text"
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
          <label>
            Location:
            <Input
              type="text"
              name="location"
              size="large"
              value={formData.location}
              onChange={handleChange}
            />
          </label>
          <label>
            Remote:
            <Checkbox
            className="py-5 px-10 "
              onChange={(e) =>
                setFormData((old) => ({ ...old, remote: e.target.checked }))
              }
            />{" "}
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

export default Vacansy;
