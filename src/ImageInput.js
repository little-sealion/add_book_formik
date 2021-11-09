import React, { useState } from "react";
import {FormControl,Button,FormHelperText } from "@chakra-ui/react";

const ImageInput = props => {
  const [fileName, setFileName] = useState("");

  const handleImageChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onloadend = () => setFileName(file.name);
      reader.readAsDataURL(file);
      props.setFieldValue(props.field.name, file);
    }
  };

  return (
    <FormControl mt="8">
      <input
        style={{ display: "none" }}
        id={props.field.name}
        name={props.field.name}
        type="file"
        accept={props.SUPPORTED_FORMATS}
        onChange={handleImageChange}
      />
      <label htmlFor={props.field.name}>
        <Button color="primary" margin="normal" component="span">
          Upload Image
        </Button>
      </label>
      {fileName ? (
        <FormHelperText id="image-upload-filename">{fileName}</FormHelperText>
      ) : null}
      {props.errorMessage ? (
        <FormHelperText id="image-upload-helper-text" error={true}>
          {props.errorMessage}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default ImageInput;