import React  from 'react'
import { Formik, Form, Field} from 'formik'   // handles form data & logic
import * as Yup from 'yup'  // handles form validation Schema
import './App.css';
import { BsPersonFill} from 'react-icons/bs';
import {
  ChakraProvider ,
  FormControl,
  FormLabel,
  FormErrorMessage,Icon,InputGroup,InputLeftElement,
  Input,Select,Radio, RadioGroup,  NumberInput,
  NumberInputField,Heading,Image,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormHelperText,Stack,
  Button
} from "@chakra-ui/react"   // beautify form components

function App() {
  const genreOptions = [
    { key: 'Select an option', value: '' },
    { key: 'Adventure', value: 'adventure' },
    { key: 'Classics', value: 'classics' },
    { key: 'Comic', value: 'comic' },
    { key: 'Detective', value: 'detective' },
    { key: 'Horror', value: 'horror' },
    { key: 'Historical Fiction', value: 'historical_fiction' }
  ]
  const languageOptions = [
    { key: 'English', value: 'english' },
    { key: 'Chinese', value: 'chinese' },
    { key: 'Spanish', value: 'spanish' },
    { key: 'Other', value: 'other' }
  ]
  const initialValues = {
    title:'',
    author:'',
    isbn:'',
    publication:'',
    genre:'',
    sold: 0.1,
    language:'',
    image:''
  }


  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']
  const validationSchema = Yup.object({
    title:Yup.string().required('Required'),
    author:Yup.string().required('Required'),
    isbn:Yup.string().required('Required').matches(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/,'Invalid ISBN, it should only contain 10 or 13 number with hyphen'),
    publication:Yup.date().max(new Date(),'Book publish date can not be in future'),
    genre:Yup.string().required('Required'),
    sold:Yup.number().min(0,'Sold number can not be less than 0').max(100,'Sold number can not exceed 100 million'),
    // image:Yup.mixed().nullable(true).test('fileSize', "File Size exceeds 1MB", value => value== null || value.size <= FILE_SIZE)
            // .test('fileType', "Wrong format", value => SUPPORTED_FORMATS.includes(value.type) )
    
  })

  const onSubmit = values => {alert("New Book Created!")}
  return (
    <ChakraProvider>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {(formik) => {
        // console.log('form',form)
        return (
          <Form className='form' >
              <Heading as="h2" size="lg" isTruncated color='#023E8A'>
                Add a book
              </Heading>
            <Field name="title">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.title && form.touched.title} mt='8'>
                  <FormLabel htmlFor="title" color='#023E8A'>Book Title</FormLabel>
                  <Input {...field} id="title" type="text" />
                  <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                </FormControl>
              )}
            </Field>   
            <Field name="author">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.author && form.touched.author} mt='8'>
                  <FormLabel htmlFor="author" color='#023E8A'>Author</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<Icon as={BsPersonFill} />}
                    />
                    <Input {...field} id="author" type="text" />
                  </InputGroup>
                  <FormErrorMessage>{form.errors.author}</FormErrorMessage>
                </FormControl>
              )}
            </Field> 
            <Field name="isbn">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.isbn && form.touched.isbn} mt='8'>
                  <FormLabel htmlFor="isbn" color='#023E8A'>ISBN</FormLabel>
                  <Input {...field} id="isbn" type="text" placeholder="234-3567-122345" />
                  <FormErrorMessage>{form.errors.isbn}</FormErrorMessage>
                </FormControl>
              )}
            </Field> 
            <Field name="publication">
               {({ field, form }) => {
                const {value} =field
                return(
                <FormControl isInvalid={form.errors.publication && form.touched.publication} mt='8'>
                  <FormLabel htmlFor="publication" color='#023E8A'>YearofPublication</FormLabel>
                  <Input id="publication" type='date' {...field} selected={value}  />
                  <FormErrorMessage>{form.errors.publication}</FormErrorMessage>
                </FormControl>

              )}}
            </Field>  
            <Field name="genre" as="select">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.genre && form.touched.genre} mt='8'>
                  <FormLabel htmlFor="genre" color='#023E8A'>Genre</FormLabel>
                  <Select id="genre" {...field}>
                    {genreOptions.map(genre => {
                      return(
                        <option key={genre.value} value={genre.value} >{genre.key}</option>
                      )
                    })}
                  </Select>
                  <FormErrorMessage>{form.errors.genre}</FormErrorMessage>
                </FormControl>
              )}
            </Field> 
            <Field name="sold">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.sold && form.touched.sold} mt='8'>
                  <FormLabel htmlFor="sold" color='#023E8A'>Millions Sold</FormLabel>
                  <NumberInput {...field} id="sold" step={0.01} precision={2} defaultValue={field.value} onChange={val => form.setFieldValue('sold',val)} min={0}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <FormErrorMessage>{form.errors.sold}</FormErrorMessage>
                </FormControl>
              )}
            </Field>  
            <Field name="language">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.language && form.touched.language} mt='8'>
                  <FormLabel htmlFor="language" color='#023E8A'>Written Language</FormLabel>
                  <RadioGroup {...field}>
                    <Stack direction="row">
                    {languageOptions.map(language => {
                      return(
                        <Radio {...field} key={language.value} value={language.value} checked={field.value === language.value} >{language.key}</Radio>
                      )
                    })}
                    </Stack>
                  </RadioGroup>
                  <FormErrorMessage>{form.errors.genre}</FormErrorMessage>
                </FormControl>
              )}
            </Field> 
            <Field name="image">
              {({ field, form }) => {                
                return(
                  <FormControl isInvalid={form.errors.image && form.touched.image} mt='8'>
                    <FormLabel htmlFor="image" color='#023E8A'>Upload the book cover image</FormLabel>
                    <Input
                        pt='1'
                        type="file"
                        id="image"
                        accept={SUPPORTED_FORMATS}
                        {...field}                        
                        onChange = { e => {
                        previewFile()
                        form.handleChange(e)

                        }}
                    />
                    <FormHelperText>Only accept jpg/jpeg/png/gif</FormHelperText>
                    <FormErrorMessage>
                      {form.errors.image}
                    </FormErrorMessage>
                  </FormControl>
              )}}
            </Field>
            <Image
              mt='4'
              boxSize="150px"
              objectFit="cover"
              hidden
              src=""
              alt="Preview Image"
            />
            <Button mt={10} colorScheme="teal" type="submit" >Submit</Button>
            {/* disabled={!formik.isValid} */}
         </Form> 
        )
      }}
    </Formik>
    </ChakraProvider>
  );
}
function previewFile() {
  var preview = document.querySelector('img');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
  }

  if (file) {
    reader.readAsDataURL(file);
    preview.hidden = false
  } else {
    preview.src = "";
    preview.hidden = true
  }
  // console.log('preview src',preview.src)
  console.log('file',file)
  return file
}


export default App;
