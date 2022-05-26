import React, { useState, useEffect, useRef } from 'react'
import AdminLayout from '../../../hoc/adminLayout'
import { useFormik, FieldArray, FormikProvider } from 'formik'
import { validation, formValues } from './validationSchema'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAdminArticle,
  updateArticle,
  getCategories
} from '../../../store/actions/article_actions'

import {
  TextField,
  Button,
  Divider,
  Paper,
  InputBase,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  FormHelperText
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

const EditArticle = (props) => {
  const articles = useSelector((state) => state.articles)
  const [formdata, setFormdata] = useState(formValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const notifications = useSelector((state) => state.notifications)
  const dispatch = useDispatch()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formdata,
    validationSchema: validation,
    onSubmit: (values, { resetfORM }) => {
      setIsSubmitting(true)
      dispatch(updateArticle(values, props.match.params.id))
    }
  })

  useEffect(() => {
    // if(notifications && notifications.success){
    //     props.history.push('/dashboard/articles');
    // }
    // if(notifications && notifications.error){
    setIsSubmitting(false)
    //   }
  }, [notifications, props.history])

  // EDIT
  useEffect(() => {
    dispatch(getCategories())
    dispatch(getAdminArticle(props.match.params.id))
  }, [dispatch, props.match.params])

  useEffect(() => {
    if (articles && articles.current) {
      setFormdata(articles.current)
    }
  }, [articles])

  //

  const errorHelper = (formik, values) => ({
    error: !!(formik.errors[values] && formik.touched[values]),
    helperText:
      formik.errors[values] && formik.touched[values]
        ? formik.errors[values]
        : null
  })

  return (
    <AdminLayout section='Eddit article'>
      <Divider className='mt-3 mb-3' />
      <form className='mt-3' onSubmit={formik.handleSubmit}>
        <div className='form-group'>
          <TextField
            style={{
              width: '100%'
            }}
            name='title'
            label='Enter a title'
            variant='outlined'
            {...formik.getFieldProps('title')}
            {...errorHelper(formik, 'title')}
          />{' '}
        </div>
        <div className='form-group'>
          <TextField
            style={{
              width: '100%'
            }}
            name='excerpt'
            label='Enter an excerpt'
            variant='outlined'
            {...formik.getFieldProps('excerpt')}
            {...errorHelper(formik, 'excerpt')}
            multiline
            rows={2}
          />{' '}
        </div>{' '}
        <div className='form-group'>
          <TextField
            style={{
              width: '100%'
            }}
            name='content'
            label='Write some Text'
            variant='outlined'
            {...formik.getFieldProps('content')}
            {...errorHelper(formik, 'content')}
            multiline
            rows={4}
          />{' '}
        </div>
        <FormControl variant='outlined'>
          <h5>Select a category</h5>
          <Select
            name='category'
            {...formik.getFieldProps('category')}
            error={
              !!(formik.errors.category && formik.touched.category)
            }
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {articles.categories
              ? articles.categories.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))
              : null}
          </Select>
          {formik.errors.category && formik.touched.category
            ? (
              <FormHelperText error>
                {formik.errors.category}
              </FormHelperText>
            )
            : null}
        </FormControl>
        <FormControl variant='outlined'>
          <h5> Select a status </h5>{' '}
          <Select
            name='status'
            {...formik.getFieldProps('status')}
            error={!!(formik.errors.status && formik.touched.status)}
          >
            <MenuItem value=''>
              <em> None </em>{' '}
            </MenuItem>{' '}
            <MenuItem value='draft'> Draft </MenuItem>{' '}
            <MenuItem value='public'> Public </MenuItem>{' '}
          </Select>{' '}
          {formik.errors.status && formik.touched.status
            ? (
              <FormHelperText error> {formik.errors.status} </FormHelperText>
            )
            : null}{' '}
        </FormControl>{' '}
        <Divider className='mt-3 mb-3' />
        <Button
          variant='contained'
          color='primary'
          type='submit'
          // disabled={false}
        >
          Edit article{' '}
        </Button>
      </form>
    </AdminLayout>
  )
}

export default EditArticle
