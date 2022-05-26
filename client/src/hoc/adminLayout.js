import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'

const AdminLayout = (props) => {
  const users = useSelector(state => state.users)

  return (
    <>
      <div className='row adminLayout'>
        <nav className='col-md-2 d-none d-md-block sidebar'>
          <div>
            <List>
              <ListItem button component={RouterLink} to='/admin'>
                <ListItemText primary='Admin' />
              </ListItem>
              <ListItem button component={RouterLink} to='/admin/profile'>
                <ListItemText primary='Profile' />
              </ListItem>
              <ListItem button component={RouterLink} to='/admin/categories'>
                <ListItemText primary='Categories' />
              </ListItem>

              {users.data.role === 'admin'
                ? <>

                  <ListItem button component={RouterLink} to='/admin/articles'>
                    <ListItemText primary='Articles' />
                  </ListItem>

                  <ListItem button component={RouterLink} to='/admin/articles/add'>
                    <ListItemText primary='Add' />
                  </ListItem>

                  <ListItem button component={RouterLink} to='/admin/testupload'>
                    <ListItemText primary='Test upload' />
                  </ListItem>

                  </>

                : null}

            </List>
          </div>
        </nav>

        <main role='main' className='col-md-9 ml-sm-auto col-lg-10 pt-3 px-4'>
          <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
            <h1 className='h2'>{props.section}</h1>
          </div>
          {props.children}
        </main>
      </div>
    </>
  )
}

export default AdminLayout
