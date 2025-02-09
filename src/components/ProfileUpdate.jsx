import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../services/apiService";
import { toast } from "react-toastify";

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
      try {
        await api.makePut(id, values);
        toast.success(
          `Yeni  isim ${values.userName} adlı kullanıcı güncellendi`,
          {
            position: "top-left",
            autoClose: 5000,
          }
        );
        navigate("/list");
      } catch (error) {
        toast.error("Güncelleme sırasında hata oluştu!");
      }
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.getOne(id);
        console.log(response.data);
        if (response && response.data) {
          formik.setValues({
            userName: response.data.name || "",
            email: response.data.email || "",
            address:
              `${response.data.address.city} ${response.data.address.street}` ||
              "",
            phone: response.data.phone || "",
          });
        }
      } catch (error) {
        toast.error("Kullanıcı bilgileri alınırken hata oluştu!");
      }
    };
    fetchUser();
  }, [id]);

  return (
    <Form onSubmit={formik.handleSubmit} className="form">
      <Form.Group controlId="userName">
        <Form.Label>Kullanıcı Adı</Form.Label>
        <Form.Control
          type="text"
          name="userName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.userName || ""}
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
          value={formik.values.email || ""}
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
          value={formik.values.address || ""}
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
          value={formik.values.phone || ""}
          isInvalid={formik.touched.phone && formik.errors.phone}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.phone}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        Güncelle
      </Button>
    </Form>
  );
};

export default ProfileUpdate;
