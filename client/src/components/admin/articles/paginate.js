import React from 'react'
import { Table, Pagination } from 'react-bootstrap'
import Moment from 'react-moment'

const PaginationComponent = ({
  arts,
  prev,
  next,
  handleStatusChange,
  editArtsAction,
  handleShow
}) => {
  const goToPrevPage = (page) => {
    prev(page)
  }

  const goToNextPage = (page) => {
    next(page)
  }

  return (
    <>
      {arts && arts.docs
        ? (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Created</th>
                  <th>Tittle</th>
                </tr>
              </thead>
              <tbody>
                {arts.docs.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <Moment to={item.date} />
                    </td>
                    <td>{item.title}</td>
                    <td className='redColor' onClick={() => handleShow(item._id)}>
                      Remove
                    </td>
                    <td
                      className='greenColor'
                      onClick={() => editArtsAction(item._id)}
                    >
                      Edit
                    </td>
                    <td
                      className='colorBleu'
                      onClick={() => handleStatusChange(item.status, item._id)}
                    >
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination>
              {arts.hasPrevPage
                ? (
                  <>
                    <Pagination.Prev onClick={() => goToPrevPage(arts.prevPage)} />
                    <Pagination.Item onClick={() => goToPrevPage(arts.prevPage)}>
                      {arts.prevPage}
                    </Pagination.Item>
                  </>
                  )
                : null}
              <Pagination.Item active>{arts.page}</Pagination.Item>
              {arts.hasNextPage
                ? (
                  <>
                    <Pagination.Item onClick={() => goToNextPage(arts.nextPage)}>
                      {arts.nextPage}
                    </Pagination.Item>
                    <Pagination.Next onClick={() => goToNextPage(arts.nextPage)} />
                  </>
                  )
                : null}
            </Pagination>
          </>
          )
        : null}
    </>
  )
}




export default PaginationComponent
