import React, { useDebugValue } from 'react'
import AdminLayout from '../../../hoc/adminLayout'
import { Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import PicViewer from './picViewer'

const TestUpload = () => {
  const formik = useFormik({
    initialValues: { archivo: '' },
    validationSchema: Yup.object({
      archivo: Yup.mixed().required('File is required')
    }),
    onSubmit: values => {
      const formData = new FormData()
      formData.append('file', values.archivo)

      // axios.post('/api/files/multerupload',formData,{
      //   header:{'content-type':'multipart/form-data'}
      // }).then(response=>{
      //     console.log(response)
      // }).catch(error=>{
      //    console.log(error)
      // })
      //
      //
      //

      // CLOUDINARY
      axios
        .post('/api/files/testupload', formData, {
          header: { 'content-type': 'multipart/form-data' }
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  })

  const errorHelper = (formik, values) => ({
    error: !!(formik.errors[values] && formik.touched[values]),
    helperText:
      formik.errors[values] && formik.touched[values]
        ? formik.errors[values]
        : null
  })

  return (
    <AdminLayout section='Test upload'>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.File
            id='file'
            name='file'
            label='Example file input'
            onChange={event => {
              formik.setFieldValue('archivo', event.target.files[0])
            }}
          />
          {formik.errors.archivo && formik.touched.archivo ? <>Error</> : null}
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </AdminLayout>
  )
}

export default TestUpload
