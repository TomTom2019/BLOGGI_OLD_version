import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
// import { Container} from 'react-bootstrap'

import { TextField, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, signInUser } from '../../store/actions/users_actions'

import PreventAuthRoute from '../../hoc/preventAuthRoutes'

const Auth = (props) => {
  const [register, setRegister] = useState(false)
  const notifications = useSelector(state => state.notifications)
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: { email: 'test@gmail.com', password: 'test123' },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email is required')
        .email('This is not a valid email'),
      password: Yup.string()
        .required('Password is required')

    }),
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values)
    }
  })

  const handleSubmit = (values) => {
    if (register) {
      dispatch(registerUser(values))
    } else {
      dispatch(signInUser(values))
    }
  }

  // CAN BE REUSABLE
  const errorHelper = (formik, values) => ({
    error: !!(formik.errors[values] && formik.touched[values]),
    helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
  })

  useEffect(() => {
    if (notifications && notifications.success) {
      props.history.push('/dashboard')
    }
  }, [notifications, props.history])

          return (
          <PreventAuthRoute>
            <div className='Container'>

        <h3>Auth</h3>
        <form className='nt-3' onSubmit={formik.handleSubmit}>
          <div className='form-group'>
            <TextField
              style={{ width: '20%' }}
              name='email'
              label='Enter you email'
              variant='outlined'
              {...formik.getFieldProps('email')}
              {...errorHelper(formik, 'email')}
            />
          </div>
          <div className='form-group'>
            <TextField
              style={{ width: '20%' }}
              name='password'
              label='Enter you password'
              tupe='password'
              variant='outlined'
              {...formik.getFieldProps('password')}
              {...errorHelper(formik, 'password')}
            />
          </div>
          <Button
            variant='contained' color='primary' type='submit'
            size='large'
          >
            {register ? 'Register' : 'Login'}
          </Button>
          <hr />
          <Button

            variant='contained'
            color='inherit'
            size='large'
            onClick={() => setRegister(!register)}
          >
            Want to {!register ? 'Register' : 'Login'} ?
          </Button>
        </form>

      </div>
    </PreventAuthRoute>
  )
}

export default Auth
