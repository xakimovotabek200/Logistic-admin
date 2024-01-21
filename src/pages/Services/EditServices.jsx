import { Button, Form, Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
const { TextArea } = Input;

const EditServices = ({ data, getData }) => {
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
    formdataForSubmit.append(
      "description_en",
      values.description_en ?? data?.description_en
    );
    formdataForSubmit.append(
      "description_ru",
      values.description_ru ?? data?.description_ru
    );
    formdataForSubmit.append(
      "description_uz",
      values.description_uz ?? data?.description_uz
    );
    formdataForSubmit.append("title_en", values.title_en ?? data?.title_en);
    formdataForSubmit.append("title_ru", values.title_ru ?? data?.title_ru);
    formdataForSubmit.append("title_uz", values.title_uz ?? data?.title_uz);
    if (image) {
      formdataForSubmit.append("image", image);
    }

    try {
      const response = await axios.patch(
        `services/${data.id}`,
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
      <p onClick={showModal}>Tahrirlash</p>
      <Modal
        width={1000}
        title="Edit Service"
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
          <Form.Item label="title_en" name="title_en">
            <Input defaultValue={data.title_en} />
          </Form.Item>
          <Form.Item label="title_ru" name="title_ru">
            <Input defaultValue={data.title_ru} />
          </Form.Item>
          <Form.Item label="title_uz" name="title_uz">
            <Input defaultValue={data.title_uz} />
          </Form.Item>
          <Form.Item label="description_en" name="description_en">
            <TextArea
              showCount
              style={{
                height: 120,
                resize: "none",
              }}
              placeholder="Description in English"
              defaultValue={data.description_en}
            />
          </Form.Item>
          <Form.Item label="description_ru" name="description_ru">
            <TextArea
              showCount
              style={{
                height: 120,
                resize: "none",
              }}
              placeholder="Description in Russian"
              defaultValue={data.description_ru}
            />
          </Form.Item>
          <Form.Item label="description_uz" name="description_uz">
            <TextArea
              showCount
              style={{
                height: 120,
                resize: "none",
              }}
              placeholder="Description in Uzbek"
              defaultValue={data.description_uz}
            />
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

export default EditServices;
