const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const uuid = require('uuid')

const PORT = 5000
const SERVER_URL = `http://localhost:${PORT}`
const CLIENT_URL = 'http://localhost:4200'

const sortPosts = (posts) => {
  return posts.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : (a.createdAt < b.createdAt) ? 1 : 0)
}

let posts = [
  { id: uuid.v4(), title: 'title 1', body: 'body 1', createdAt: '2022-06-11T12:30:02.656Z' },
  { id: uuid.v4(), title: 'title 2', body: 'body 2', createdAt: '2022-06-10T10:37:03.552Z' },
  { id: uuid.v4(), title: 'title 3', body: 'body 3', createdAt: '2022-06-12T17:42:02.544Z' },
  { id: uuid.v4(), title: 'title 4', body: 'body 4', createdAt: '2022-06-12T18:01:04.213Z' },
  { id: uuid.v4(), title: 'title 5', body: 'body 5', createdAt: '2022-06-13T11:23:05.333Z' },
  { id: uuid.v4(), title: 'title 6', body: 'body 6', createdAt: '2022-06-13T12:30:02.656Z' },
  { id: uuid.v4(), title: 'title 7', body: 'body 7', createdAt: '2022-06-11T10:37:03.552Z' },
  { id: uuid.v4(), title: 'title 8', body: 'body 8', createdAt: '2022-06-14T17:42:02.544Z' },
  { id: uuid.v4(), title: 'title 9', body: 'body 9', createdAt: '2022-06-11T18:01:04.213Z' },
  { id: uuid.v4(), title: 'title 10', body: 'body 10', createdAt: '2022-06-14T11:23:05.333Z' },
  { id: uuid.v4(), title: 'title 11', body: 'body 11', createdAt: '2022-06-11T12:30:02.656Z' },
  { id: uuid.v4(), title: 'title 12', body: 'body 12', createdAt: '2022-06-10T10:37:03.552Z' },
  { id: uuid.v4(), title: 'title 13', body: 'body 13', createdAt: '2022-06-12T17:42:02.544Z' },
  { id: uuid.v4(), title: 'title 14', body: 'body 14', createdAt: '2022-06-12T18:01:04.213Z' },
  { id: uuid.v4(), title: 'title 15', body: 'body 15', createdAt: '2022-06-13T11:23:05.333Z' },
  { id: uuid.v4(), title: 'title 16', body: 'body 16', createdAt: '2022-06-13T12:30:02.656Z' },
  { id: uuid.v4(), title: 'title 17', body: 'body 17', createdAt: '2022-06-11T10:37:03.552Z' },
  { id: uuid.v4(), title: 'title 18', body: 'body 18', createdAt: '2022-06-14T17:42:02.544Z' },
  { id: uuid.v4(), title: 'title 19', body: 'body 19', createdAt: '2022-06-11T18:01:04.213Z' },
  { id: uuid.v4(), title: 'title 20', body: 'body 20', createdAt: '2022-06-14T11:23:05.333Z' },
  { id: uuid.v4(), title: 'title 21', body: 'body 21', createdAt: '2022-06-11T12:30:02.656Z' },
  { id: uuid.v4(), title: 'title 22', body: 'body 22', createdAt: '2022-06-10T10:37:03.552Z' },
  { id: uuid.v4(), title: 'title 23', body: 'body 23', createdAt: '2022-06-12T17:42:02.544Z' },
  { id: uuid.v4(), title: 'title 24', body: 'body 24', createdAt: '2022-06-12T18:01:04.213Z' },
  { id: uuid.v4(), title: 'title 25', body: 'body 25', createdAt: '2022-06-13T11:23:05.333Z' },
  { id: uuid.v4(), title: 'title 26', body: 'body 26', createdAt: '2022-06-13T12:30:02.656Z' },
  { id: uuid.v4(), title: 'title 27', body: 'body 27', createdAt: '2022-06-11T10:37:03.552Z' },
  { id: uuid.v4(), title: 'title 28', body: 'body 28', createdAt: '2022-06-14T17:42:02.544Z' },
  { id: uuid.v4(), title: 'title 29', body: 'body 29', createdAt: '2022-06-11T18:01:04.213Z' },
  { id: uuid.v4(), title: 'title 30', body: 'body 30', createdAt: '2022-06-14T11:23:05.333Z' },
  { id: uuid.v4(), title: 'title 31', body: 'body 31', createdAt: '2022-06-11T12:30:02.656Z' },
  { id: uuid.v4(), title: 'title 32', body: 'body 32', createdAt: '2022-06-10T10:37:03.552Z' },
  { id: uuid.v4(), title: 'title 33', body: 'body 33', createdAt: '2022-06-12T17:42:02.544Z' },
  { id: uuid.v4(), title: 'title 34', body: 'body 34', createdAt: '2022-06-12T18:01:04.213Z' },
  { id: uuid.v4(), title: 'title 35', body: 'body 35', createdAt: '2022-06-13T11:23:05.333Z' },
  { id: uuid.v4(), title: 'title 36', body: 'body 36', createdAt: '2022-06-13T12:30:02.656Z' },
  { id: uuid.v4(), title: 'title 37', body: 'body 37', createdAt: '2022-06-11T10:37:03.552Z' },
  { id: uuid.v4(), title: 'title 38', body: 'body 38', createdAt: '2022-06-14T17:42:02.544Z' },
  { id: uuid.v4(), title: 'title 39', body: 'body 39', createdAt: '2022-06-11T18:01:04.213Z' },
  { id: uuid.v4(), title: 'title 40', body: 'body 40', createdAt: '2022-06-14T11:23:05.333Z' },
  { id: uuid.v4(), title: 'title 41', body: 'body 40', createdAt: '2022-06-14T11:23:05.333Z' },
  { id: uuid.v4(), title: 'title 41', body: 'body 41', createdAt: '2022-06-11T12:30:02.656Z' },
  { id: uuid.v4(), title: 'title 42', body: 'body 42', createdAt: '2022-06-10T10:37:03.552Z' },
  { id: uuid.v4(), title: 'title 43', body: 'body 43', createdAt: '2022-06-12T17:42:02.544Z' },
  { id: uuid.v4(), title: 'title 44', body: 'body 44', createdAt: '2022-06-12T18:01:04.213Z' },
  { id: uuid.v4(), title: 'title 45', body: 'body 45', createdAt: '2022-06-13T11:23:05.333Z' },
  { id: uuid.v4(), title: 'title 46', body: 'body 46', createdAt: '2022-06-13T12:30:02.656Z' },
  { id: uuid.v4(), title: 'title 47', body: 'body 47', createdAt: '2022-06-11T10:37:03.552Z' },
  { id: uuid.v4(), title: 'title 48', body: 'body 48', createdAt: '2022-06-14T17:42:02.544Z' },
  { id: uuid.v4(), title: 'title 49', body: 'body 49', createdAt: '2022-06-11T18:01:04.213Z' },
  { id: uuid.v4(), title: 'title 50', body: 'body 50', createdAt: '2022-06-14T11:23:05.333Z' },
]

const app = express()

app
  .use(cookieParser())
  .use(express.json())
  .use(cors({ origin: CLIENT_URL }))

app
  .post('/api/posts/create', (req, res) => {
    const { title, body } = req.body

    const createdPost = { id: uuid.v4(), title, body, createdAt: new Date() }
    posts = [createdPost, ...posts]

    res.json({ createdPost, lengthAllPosts: posts.length })
  })
  .post('/api/posts/find', (req, res) => {
    const { start, limit } = req.body

    const begin = start > (posts.length - 1) ? posts.length : start
    const end = begin + limit

    const slicesPosts = sortPosts(posts).slice(begin, end)

    res.json({ posts: slicesPosts, lengthAllPosts: posts.length })
  })
  .post('/api/posts/update', (req, res) => {
    const { postID, title, body } = req.body

    let updatedPost = null

    posts = posts.map(post => {
      if (post.id === postID) {
        post.title = title
        post.body = body

        updatedPost = post
      }

      return post
    })

    res.json({ updatedPost })
  })
  .post('/api/posts/delete', (req, res) => {
    const { postID } = req.body

    const filteredPosts = posts.filter(post => post.id !== postID)

    posts = [...filteredPosts]

    res.json({ postID, lengthAllPosts: posts.length })
  })

try {
  app.listen(PORT, () => console.log(`Server has been started on ${SERVER_URL}`))
} catch (e) {
  console.log(e)
  process.exit(1)
}
