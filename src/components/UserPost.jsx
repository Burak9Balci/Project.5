import React from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ApiService from "../services/apiService";
import { User } from "../models/User";
import { toast } from "react-toastify";
const UserPost = () => {
  const navigate = useNavigate();
  const api = new ApiService();

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      address: "",
      phone: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Kullanıcı adı zorunludur"),
      email: Yup.string()
        .email("Geçerli bir e-posta girin")
        .required("E-posta zorunludur"),
      address: Yup.string().required("Adres zorunludur"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Telefon numarası 10 haneli olmalıdır")
        .required("Telefon zorunludur"),
    }),
    onSubmit: async (values) => {
      const newUser = new User(
        values.userName,
        values.email,
        values.address,
        values.phone
      );
      try {
        const response = await api.makePost(newUser);
        toast.success(
          `Yeni  isim ${values.userName} adlı kullanıcı güncellendi`,
          { position: "top-left", autoClose: 5000 } // kapanma süresia
        );
        formik.resetForm();
        navigate("/list");
      } catch (error) {
        alert("Ekleme yapılırken hata oldu");
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="form">
      <Form.Group controlId="userName">
        <Form.Label>Kullanıcı Adı</Form.Label>
        <Form.Control
          type="text"
          name="userName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.userName}
          isInvalid={formik.touched.userName && formik.errors.userName}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.userName}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>E-Posta</Form.Label>
        <Form.Control
          type="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          isInvalid={formik.touched.email && formik.errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="address">
        <Form.Label>Adres</Form.Label>
        <Form.Control
          type="text"
          name="address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
          isInvalid={formik.touched.address && formik.errors.address}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.address}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="phone">
        <Form.Label>Telefon</Form.Label>
        <Form.Control
          type="text"
          name="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          isInvalid={formik.touched.phone && formik.errors.phone}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.phone}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        Kaydet
      </Button>
    </Form>
  );
};

export default UserPost;
