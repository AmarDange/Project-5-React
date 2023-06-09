// Igfile edit form functionality credit goes to CI's Moments Project
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/IgfilePagePopular.module.css";

const IgfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const imageFile = useRef();

  const [igfileData, setIgfileData] = useState({
    name: "",
    content: "",
    image: "",
  });
  const { name, content, image } = igfileData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.igfile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/igfile/${id}`);
          const { name, content, image } = data;
          setIgfileData({ name, content, image });
        } catch (err) {
          // console.log(err);
          navigate("/");
          if (err.response?.status === 500) {
            navigate("/500");
          }
        }
      } else {
        navigate("/");
      }
    };

    handleMount();
  }, [currentUser, navigate, id]);

  const handleChange = (event) => {
    setIgfileData({
      ...igfileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("content", content);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/igfile/${id}`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        igfile_image: data.image,
      }));
      navigate(-1);
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  const textFields = (
    <>
      <Form.Group>
        <Form.Label className={`${styles.PageFont} ${styles.BlueFont}`}>
          About me
        </Form.Label>
        <Form.Control
          as="textarea"
          value={content}
          onChange={handleChange}
          name="content"
          rows={7}
        />
      </Form.Group>

      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <div className="mt-2">
        <Button
          aria-label="Click here to cancel (goes back to previous page)"
          className={`${btnStyles.Btn} mr-2`}
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button
          aria-label="Click here to submit changes to 'about me"
          className={`${btnStyles.Btn}`}
          type="submit"
        >
          Update
        </Button>
      </div>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
          <Container>
            <Form.Group>
              {image && (
                <figure>
                  <Image src={image} fluid />
                </figure>
              )}
              {errors?.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <Form.Control
                type="file"
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setIgfileData({
                      ...igfileData,
                      image: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
          <Container>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default IgfileEditForm;
