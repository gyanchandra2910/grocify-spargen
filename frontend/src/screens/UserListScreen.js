import React, { useEffect } from 'react'
import { Table, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'
import { useTheme } from '../ThemeContext'

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const { theme } = useTheme()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Card
          className={
            theme === 'dark'
              ? 'bg-dark text-light border-light'
              : 'bg-light text-dark'
          }
        >
          <Table
            striped
            bordered
            hover
            responsive
            className={`table-sm ${
              theme === 'dark' ? 'table-dark border-light' : 'table-light border-dark'
            }`}
            variant={theme === 'dark' ? 'dark' : 'light'}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a
                      href={`mailto:${user.email}`}
                      className={
                        theme === 'dark' ? 'text-light' : 'text-dark'
                      }
                    >
                      {user.email}
                    </a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'limegreen' }}
                      ></i>
                    ) : (
                      <i
                        className='fas fa-times'
                        style={{ color: 'tomato' }}
                      ></i>
                    )}
                  </td>
                  <td>
                    <Button
                      variant={
                        theme === 'dark' ? 'outline-light' : 'light'
                      }
                      className='btn-sm'
                      onClick={() => history.push(`/admin/user/${user._id}/edit`)}
                    >
                      <i className='fas fa-edit'></i>
                    </Button>
                    <Button
                      variant={
                        theme === 'dark' ? 'outline-danger' : 'danger'
                      }
                      className='btn-sm ms-2'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      )}
    </>
  )
}

export default UserListScreen
