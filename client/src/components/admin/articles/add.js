import React, { useState, useEffect, useRef } from 'react'
import AdminLayout from '../../../hoc/adminLayout'

import { useFormik, FieldArray, FormikProvider } from 'formik'

import { useDispatch, useSelector } from 'react-redux'

import {
  addArticle,
  getCategories
} from '../../../store/actions/article_actions'
import { validation, formValues } from './validationSchema'

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

const AddArticle = props => {
  const dispatch = useDispatch()
  const { categories } = useSelector(state => state.articles)
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formValues,
    validationSchema: validation,
    onSubmit: (values, { resetfORM }) => {
      dispatch(addArticle(values))
    }
  })

  const errorHelper = (formik, values) => ({
    error: !!(formik.errors[values] && formik.touched[values]),
    helperText:
      formik.errors[values] && formik.touched[values]
        ? formik.errors[values]
        : null
  })

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  return (
    <AdminLayout section='Add article'>
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
          />
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
            multiline='multiline'
            rows={2}
          />
        </div>
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
            multiline='multiline'
            rows={4}
          />
        </div>

        <FormControl variant='outlined'>
          <h5>Select a category</h5>
          <Select
            name='category'
            {...formik.getFieldProps('category')}
            error={!!(formik.errors.category && formik.touched.category)}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {categories
              ? categories.map(item => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))
              : null}
          </Select>
          {formik.errors.category && formik.touched.category ? (
            <FormHelperText error>{formik.errors.category}</FormHelperText>
          ) : null}
        </FormControl>

        <Divider className='mt-3 mb-3' />

        <FormControl variant='outlined'>
          <h5>Select a status</h5>
          <Select
            name='status'
            {...formik.getFieldProps('status')}
            error={!!(formik.errors.status && formik.touched.status)}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value='draft'>Draft</MenuItem>
            <MenuItem value='public'>Public</MenuItem>
          </Select>
          {formik.errors.status && formik.touched.status ? (
            <FormHelperText error='error'>
              {formik.errors.status}
            </FormHelperText>
          ) : null}
        </FormControl>
        <Divider className='mt-3 mb-3' />

        <Button
          variant='contained'
          color='primary'
          type='submit'
          // disabled={false}
        >
          Add article
        </Button>
      </form>
    </AdminLayout>
  )
}

export default AddArticle
