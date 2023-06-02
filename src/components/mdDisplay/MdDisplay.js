import React, { useState } from 'react'
// import PropTypes from 'prop-types'

import './MdDisplay.css'

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import Modal from 'react-modal'

const MdDisplay = props => {

  //https://stackoverflow.com/questions/71039926/how-to-import-md-file-when-i-use-create-react-app-with-javascript
  const inputMdText = props.inputMdText;

  let [readable, setReadable] = React.useState({ md: "" });

  // https://chat.openai.com/share/af595ff8-b385-4384-892e-b40a6c1e3bf1
  // 新增一个状态来存储被点击的图片的 URL
  const [modalImage, setModalImage] = useState(null)

  // 点击图片时打开模态框，点击模态框之外的地方时关闭模态框
  const openModal = (src) => setModalImage(src)
  const closeModal = () => setModalImage(null)

  // https://stackoverflow.com/a/71552116/20787775
  React.useEffect(() => {
    fetch(inputMdText)
      .then((res) => res.text())
      .then((md) => {
        setReadable({ md });
      });
  }, [inputMdText]);



  return (
    <div>
      <ReactMarkdown
        children={readable.md}
        components={{
          img: ({ node, ...props }) => (
            <img
              style={{ maxWidth: '100%', cursor: 'pointer' }}
              onClick={() => openModal(props.src)}
              {...props}
            />
          )
        }}
        remarkPlugins={[remarkGfm]}
      />

      <Modal
        isOpen={!!modalImage}
        onRequestClose={closeModal}
        className="Modal"
        overlayClassName="Overlay">

        <img
          className='modal-image'
          src={modalImage} 
        />

        <button
          onClick={closeModal}
          className='modal-close-button'>

          &times;
        </button>

      </Modal>

    </div>
  )
}

// MdDisplay.propTypes = {}

export default MdDisplay