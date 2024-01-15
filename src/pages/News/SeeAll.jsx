import { Modal } from "antd";
import React, { useState } from "react";

const SeeAll = ({ data }) => {
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

  return (
    <div>
      <p onClick={showModal}>Toliq Korish</p>
      <Modal
        width={1000}
        title="See All News"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="grid grid-cols-2 items-start">
          <img
            src={`http://192.168.137.126:8081/api/image/` + data?.jpgId}
            alt=""
          />
          <table>
            <tbody>
              <tr>
                <th>title_en</th>
                <td>{data?.title_en}</td>
              </tr>
              <tr>
                <th>title_ru</th>
                <td>{data?.title_ru}</td>
              </tr>
              <tr>
                <th>title_uz</th>
                <td>{data?.title_uz}</td>
              </tr>
              <tr>
                <th>description_en</th>
                <td className="line-clamp-3 whitespace-pre-wrap break-words">
                  {data?.description_en}
                </td>
              </tr>
              <tr>
                <th>description_ru</th>
                <td className="line-clamp-3 whitespace-pre-wrap break-words">
                  {data?.description_ru}
                </td>
              </tr>
              <tr>
                <th>description_uz</th>
                <td className="line-clamp-3 whitespace-pre-wrap break-words">
                  {data?.description_uz}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
};

export default SeeAll;
