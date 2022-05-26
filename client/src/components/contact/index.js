import React, { useEffect, useState } from 'react'
import { useFormik, yupToFormErrors } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { contactUs } from '../../store/actions/users_actions'

import { TextField, Button } from '@material-ui/core'
import Loader from '../../utils/loader'

const Contact = () => {
  const [loading, setLoading] = useState(null)
  const notifications = useSelector(state => state.notifications)
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: { email: '', firstname: '', lastname: '', message: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email is required')
        .email('This is not a valid email'),
      firstname: Yup.string()
        .required('Firstname is required'),
      lastname: Yup.string()
        .required('Lastname is required'),
      message: Yup.string()
        .required('You need to say something')
        .max(500, 'Sorry, the message is too long')
    }),
    onSubmit: (values) => {
      setLoading(true)
      dispatch(contactUs(values))
    }
  })

  useEffect(() => {
    if (notifications && notifications.success) { formik.resetForm() }
    setLoading(false)
  }, [notifications])

  const errorHelper = (formik, values) => ({
    error: !!(formik.errors[values] && formik.touched[values]),
    helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
  })

  return (
    <>
      {loading
        ? <Loader />
        : <>
          <h1>Contact Us</h1>
          <form className='mt-3' onSubmit={formik.handleSubmit}>
            <div className='form-group'>
              <TextField
                style={{ width: '100%' }}
                name='email'
                label='Enter you email'
                variant='outlined'
                {...formik.getFieldProps('email')}
                {...errorHelper(formik, 'email')}
              />
            </div>
            <div className='form-group'>
              <TextField
                style={{ width: '100%' }}
                name='firstname'
                label='Enter you firstname'
                variant='outlined'
                {...formik.getFieldProps('firstname')}
                {...errorHelper(formik, 'firstname')}
              />
            </div>
            <div className='form-group'>
              <TextField
                style={{ width: '100%' }}
                name='lastname'
                label='Enter you lastname'
                variant='outlined'
                {...formik.getFieldProps('lastname')}
                {...errorHelper(formik, 'lastname')}
              />
            </div>
            <div className='form-group'>
              <TextField
                style={{ width: '100%' }}
                name='message'
                label='Add your message'
                variant='outlined'
                {...formik.getFieldProps('message')}
                {...errorHelper(formik, 'message')}
                multiline
                rows={4}
              />
            </div>
            <Button variant='contained' color='primary' type='submit'>
              Send us a message
            </Button>
          </form>
          </>}

    </>
  )
}

export default Contact
