import { Button, Form, Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
const { TextArea } = Input;

const EditInformation = ({ data, getData }) => {
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
    formdataForSubmit.append("location", values.location ?? data?.location);
    formdataForSubmit.append("email", values.email ?? data?.email);
    formdataForSubmit.append("number", values.number ?? data?.number);
    formdataForSubmit.append("about_en", values.about_en ?? data?.about_en);
    formdataForSubmit.append("about_ru", values.about_ru ?? data?.about_ru);
    formdataForSubmit.append("about_uz", values.about_uz ?? data?.about_uz);
    if (image) {
      formdataForSubmit.append("image", image);
    }

    try {
      const response = await axios.patch(
        `information/${data.id}`,
        formdataForSubmit
      );
      handleCancel(response);
      getData();
    } catch (error) {
      console.error("Error submitting servicew patch:", error);
    }
  };

  return (
    <div>
      <span
        onClick={showModal}
        className="fa-solid fa-edit cursor-pointer text-xl text-blue-500"
      />
      <Modal
        width={1000}
        title="Edit About"
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
          <Form.Item label="location" name="location">
            <Input type="text" defaultValue={data.location} />
          </Form.Item>
          <Form.Item label="email" name="email">
            <Input type="email" defaultValue={data.email} />
          </Form.Item>
          <Form.Item label="number" name="number">
            <Input defaultValue={data.number} />
          </Form.Item>
          <Form.Item label="about_en" name="about_en">
            <TextArea
              showCount
              placeholder="Description in about_en"
              style={{
                height: 120,
                resize: "none",
              }}
              defaultValue={data.about_en}
            />
          </Form.Item>
          <Form.Item label="about_ru" name="about_ru">
            <TextArea
              showCount
              placeholder="Description in about_ru"
              style={{
                height: 120,
                resize: "none",
              }}
              defaultValue={data.about_ru}
            />
          </Form.Item>
          <Form.Item label="about_uz" name="about_uz">
            <TextArea
              showCount
              placeholder="Description in about_uz"
              style={{
                height: 120,
                resize: "none",
              }}
              defaultValue={data.about_uz}
            />
          </Form.Item>

          <Form.Item label="image" name="image">
            <Input
              type="file"
              name="image"
              className="file:cursor-pointer file:rounded-md file:bg-transparent file:px-5"
              onChange={handleChange}
            />
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

export default EditInformation;
