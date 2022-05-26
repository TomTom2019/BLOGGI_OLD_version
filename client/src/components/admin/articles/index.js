import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../hoc/adminLayout'
import { useDispatch, useSelector } from 'react-redux'
import {
  getPaginateArticles,
  changeStatusArticle,
  removeArticle
} from '../../../store/actions/article_actions'

import PaginationComponent from './paginate'

import {
  Modal,
  Button,
  ButtonToolbar,
  ButtonGroup,
  InputGroup,
  FormControl
} from 'react-bootstrap'

// LinkContainer WORK WITH BOOSTRAP
import { LinkContainer } from 'react-router-bootstrap'

const Articles = props => {
  const articles = useSelector(state => state.articles)
  const notifications = useSelector(state => state.notifications)
  const dispatch = useDispatch()

  const [removeAlert, setRemoveAlert] = useState(false)
  const [toRemove, setToRemove] = useState(null)
  const arts = articles.adminArticles

  const editArtsAction = id => {
    props.history.push(`/admin/articles/edit/${id}`)
  }

  const handleClose = () => setRemoveAlert(false)
  const handleShow = (id = null) => {
    setToRemove(id)
    setRemoveAlert(true)
  }

  // DELETE
  const handleDelete = () => {
    dispatch(removeArticle(toRemove))
  }

  const handleStatusChange = (status, _id) => {
    const newStatus = status === 'draft' ? 'public' : 'draft'
    dispatch(changeStatusArticle(newStatus, _id))
  }

  const goToPrevPage = page => {
    dispatch(getPaginateArticles(page))
  }

  const goToNextPage = page => {
    dispatch(getPaginateArticles(page))
  }

  useEffect(() => {
    handleClose()
    if (notifications && notifications.removeArticle) {
      dispatch(getPaginateArticles(arts.page))
    }
  }, [dispatch, notifications, arts])

  useEffect(() => {
    dispatch(getPaginateArticles())
  }, [dispatch])

  return (
    <AdminLayout section='Articles'>
      <div className='articles_table'>
        <ButtonToolbar className='mb-3'>
          <ButtonGroup className='mr-2'>
            <LinkContainer to='/admin/articles/add'>
              <Button variant='secondary'>add article</Button>
            </LinkContainer>
            <form onSubmit={() => alert('searsh')}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id='btnGoupAddon2'>@</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl type='text' placeholder='Example' />
              </InputGroup>
            </form>
          </ButtonGroup>
        </ButtonToolbar>
        <PaginationComponent
          arts={arts}
          prev={page => goToPrevPage(page)}
          next={page => goToNextPage(page)}
          handleStatusChange={(status, id) => handleStatusChange(status, id)}
          editArtsAction={id => editArtsAction(id)}
          handleShow={id => handleShow(id)}
        />
        <Modal show={removeAlert} onHide={handleClose}>
          <Modal.Header closeButton='closeButton'>
            <Modal.Title>Are you really sure ?</Modal.Title>
          </Modal.Header>
          <Modal.Body>There is no going back you know.</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close this.
            </Button>
            <Button variant='danger' onClick={() => handleDelete()}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </AdminLayout>
  )
}

export default Articles
