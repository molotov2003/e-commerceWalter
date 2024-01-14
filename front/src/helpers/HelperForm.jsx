/**
 * @description : Ayudante para capturar la data del formulario en tiempo real
 * @returns Devuelve un objeto
 */
import React, { Component } from "react";
import { useState } from "react";

const HelperForm = (data = {}) => {
  const [form, setForm] = useState(data);
  /////
  const cambiar = ({ target }) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value,
    });
    // console.log(form);
  };

  return {
    form,
    cambiar,
  };
};

export default HelperForm;
