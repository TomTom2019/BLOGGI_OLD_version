import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Card } from 'react-bootstrap'

import { Button } from '@material-ui/core'

const ArticleCard = ({ article }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant='top' src='https://picsum.photos/200' />

      <Card.Body>
        <Card.Title>{article.title}</Card.Title>
        <Card.Text>{article.excerpt}</Card.Text>
        <Button
          size='small'
          color='primary'
          component={RouterLink}
          to={`/article/${article._id}`}
        >
          View article
        </Button>
      </Card.Body>
    </Card>
  )
}

export default ArticleCard
