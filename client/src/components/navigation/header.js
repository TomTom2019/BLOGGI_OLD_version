import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Navbar, Container } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { clearNotification } from '../../store/actions/index'
import { signOut } from '../../store/actions/users_actions'
import { appLayout } from '../../store/actions/site_action'

import SideDrawer from './sideNavigation'
import { showToast } from '../../utils/tools'

const Header = (props) => {
  const [layout, setLayout] = useState('')
  const notifications = useSelector(state => state.notifications)
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  // LOG OUT
  const signOutUser = () => {
    dispatch(signOut())
    props.history.push('/')
  }

  useEffect(() => {
    const pathArray = props.location.pathname.split('/')
    if (pathArray[1] === 'admin') {
      setLayout('admin')
      dispatch(appLayout('admin'))
    } else {
      setLayout('')
      dispatch(appLayout(''))
    }
  }, [props.location.pathname, dispatch])

  useEffect(() => {
    if (notifications && notifications.error) {
      const msg = notifications.msg ? notifications.msg : 'Right way'
      showToast('ERROR', msg)
      dispatch(clearNotification())
    }

    if (notifications && notifications.success) {
      const msg = notifications.msg ? notifications.msg : 'Right way'
      showToast('SUCCESS', msg)
      dispatch(clearNotification())
    }
  }, [notifications, dispatch])

  return (
    <>
      <Navbar className={`${layout}`}>
        <Container>
          <Link to='/'>
            <Navbar.Brand className='customNav'>Blogg</Navbar.Brand>
          </Link>
          <SideDrawer users={users} signOutUser={signOutUser} />

        </Container>

      </Navbar>

    </>
  )
}

export default withRouter(Header)
