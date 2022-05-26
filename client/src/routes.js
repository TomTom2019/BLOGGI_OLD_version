import React, { useEffect, useState } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import GoogleFontLoader from 'react-google-font-loader'
import Loader from './utils/loader'
import MainLayout from './hoc/maintLayout'

import { useDispatch, useSelector } from 'react-redux'
import { isAuthUser } from './store/actions/users_actions'

import Home from './components/home'
import Header from './components/navigation/header'
import Auth from './components/auth'
import Admin from './components/admin'
import Profile from './components/admin/profile'
import Articles from './components/admin/articles'
import Article from './components/articles/article'
import AddArticle from './components/admin/articles/add'
import AuthGuard from './hoc/authGuard'
import TestUpload from './components/admin/testupload/'
import EditArticle from './components/admin/articles/edit'
import Contact from './components/contact'
import AccountVerify from './components/auth/verification'
import Categories from './components/admin/categories'
import SearchResults from './components/search'

const Routes = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(isAuthUser())
  }, [dispatch])

  useEffect(() => {
    if (users.auth !== null) {
      setLoading(false)
    }
  }, [users])

  return (
    <BrowserRouter>
      <Header />

      {loading ? (
        <Loader />
      ) : (
        <MainLayout>
          <Switch>
            <Route
              path='/admin/articles/edit/:id'
              component={AuthGuard(EditArticle, true)}
            />
            <Route
              path='/admin/articles/add'
              component={AuthGuard(AddArticle, true)}
            />

            <Route path='/admin/testupload' component={AuthGuard(TestUpload)} />
            <Route
              path='/admin/articles'
              component={AuthGuard(Articles, true)}
            />
            <Route path='/admin/profile' component={AuthGuard(Profile)} />
            <Route path='/admin/categories' component={AuthGuard(Categories)} />
            <Route path='/admin' component={AuthGuard(Admin)} />
            <Route path='/article/:id' component={Article} />

            <Route path='/verification' component={AccountVerify} />

            <Route path='/searchresults' component={SearchResults} />
            <Route path='/contact' component={Contact} />
            <Route path='/auth' component={Auth} />
            <Route path='/' component={Home} />
          </Switch>
        </MainLayout>
      )}

      <GoogleFontLoader
        fonts={[{ font: 'Oswald', weights: [300, 400, 600] }]}
      />
    </BrowserRouter>
  )
}

export default Routes
