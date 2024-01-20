import { Button, Form, Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
const { TextArea } = Input;

const EditTestimonail = ({ data, getData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState();
  const [image, setImage] = useState();

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
    setFile(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (values) => {
    const formdataForSubmit = new FormData();
    formdataForSubmit.append("comment", values.comment ?? data?.comment);
    formdataForSubmit.append("name", values.name ?? data?.name);
    formdataForSubmit.append("job", values.job ?? data?.job);
    if (image) {
      formdataForSubmit.append("image", image);
    }
    try {
      const response = await axios.patch(
        `testimony/${data.id}`,
        formdataForSubmit
      );
      handleCancel(response);
      getData();
    } catch (error) {
      console.error("Error submitting news patch:", error);
    }
  };

  return (
    <div>
      <div onClick={showModal}>
        <span className="fa-solid fa-edit cursor-pointer text-xl text-blue-500" />
      </div>
      <Modal
        width={1000}
        title="Edit News"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={handleSubmit}
        >
          <Form.Item label="comment" name="comment">
            <Input defaultValue={data.comment} />
          </Form.Item>
          <Form.Item label="name" name="name">
            <Input defaultValue={data.name} />
          </Form.Item>
          <Form.Item label="job" name="job">
            <Input defaultValue={data.job} />
          </Form.Item>
          <Form.Item label="image" name="image">
            <br />
            <Input
              type="file"
              name="image"
              className="file:cursor-pointer file:rounded-md file:bg-transparent file:px-5"
              onChange={handleChange}
            />
            <img src={file} className="w-[400px] " />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-500"
          >
            Tahrirlash
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default EditTestimonail;
