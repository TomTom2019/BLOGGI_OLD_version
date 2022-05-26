import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getArticle } from '../../../store/actions/article_actions'
import { Container, Image } from 'react-bootstrap'
import { clearCurrentArticle } from '../../../store/actions/index'

// ARTICLE NO ADMIN
const Article = (props) => {
  const { current } = useSelector(state => state.articles)
  const dispatch = useDispatch()

  useEffect(() => {
  // props.match.params.id
    dispatch(getArticle(props.match.params.id))
  }, [dispatch, props.match.params])

  useEffect(() => {
    return () => {
      dispatch(clearCurrentArticle())
    }
  }, [dispatch])

  return (
    <>
      {current
        ? <div>

          <Container className='mx-auto my-5'>

            <Image src='https://picsum.photos/400/500' alt='' fluid />
          </Container>
          <h1 className='mx-auto my-5'>{current.title}</h1>
          <div>
            <div dangerouslySetInnerHTML={
              { __html: current.content }
            }
            />
          </div>

          </div>
        : null}

    </>
  )
}

export default Article
