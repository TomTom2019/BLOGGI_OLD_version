import * as Yup from 'yup'

export const formValues = {

  title: '',
  content: '',
  excerpt: '',
  status: 'public',
  category: ''

}

export const validation = () => (
  Yup.object({

    title: Yup.string()
      .required('title is required :-)'),
    content: Yup.string()
      .required('content is required pl')
      .min(50, 'Write some more'),
    excerpt: Yup.string()
      .required('excerpt is required pl')
      .max(500, 'Sorry its 500 max'),
    status: Yup.string()
      .required('the status is required'),
    category: Yup.string()
      .required('the category is required')
  })
)
