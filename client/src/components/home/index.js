import React, { useReducer, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import ArticleCard from '../../utils/articleCard'

import { useDispatch, useSelector } from 'react-redux'
import { getArticles } from '../../store/actions/article_actions'

const initialSort = { sortBy: '_id', order: 'desc', limit: 6, skip: 0 }

// setSort
const Home = () => {
  const [sort, setSort] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialSort
  )
  const articles = useSelector(state => state.articles)
  const dispatch = useDispatch()

  useEffect(() => {
    // trigger only on first render
    if (articles && !articles.articles) {
      // /dispatch
      dispatch(getArticles(initialSort))
    }
  }, [dispatch, articles])

  return (
    <div>

      <Container fluid='md'>
        <Row>

          {articles && articles.articles
            ? articles.articles.map((item) => (
              <Col key={item._id}>
                <ArticleCard key={item._id} article={item} />
              </Col>
              ))
            : null}

        </Row>
        <Button
          variant='secondary'

          onClick={() => {
            const skip = sort.skip + sort.limit
            dispatch(getArticles({ ...sort, skip: skip }))
          }}
        >
          Load more
        </Button>
      </Container>

    </div>
  )
}

export default Home
