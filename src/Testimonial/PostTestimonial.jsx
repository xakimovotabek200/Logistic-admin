import { Button, Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
const { TextArea } = Input;

const PostTestimonial = (getData) => {
  const [file, setFile] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

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
    const { comment, image, job, name } = e.target;
    const formdataForSubmit = new FormData();
    formdataForSubmit.append("comment", comment.value);
    formdataForSubmit.append("job", job.value);
    formdataForSubmit.append("name", name.value);
    formdataForSubmit.append("image", image.files[0]);

    try {
      const response = await axios.post("testimony", formdataForSubmit);
      handleCancel(response);
      getData();
      toast.success("testtimonials created successfully");
    } catch (error) {
      toast.error("Error submitting news post:", error);
    }
  };

  return (
    <div>
      <Button
        type="primary"
        className="fixed bottom-5 right-5 z-30 w-fit bg-blue-500"
        onClick={showModal}
      >
        + Add Testimonials
      </Button>
      <Modal
        width={1000}
        title="Create Testimonials"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form onSubmit={handleSubmit}>
          <label>
            Comment:
            <Input
              type="text"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
            />
          </label>
          <label>
            job:
            <Input
              type="text"
              name="job"
              value={formData.job}
              onChange={handleInputChange}
            />
          </label>
          <label>
            name:
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
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

export default PostTestimonial;
