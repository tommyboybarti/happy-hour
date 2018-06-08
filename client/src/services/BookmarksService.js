import Api from '@/services/Api'

export default {
  index (bookmark) {
    // get ('path' and what you pass on {params})
    return Api().get('bookmarks', {
      params: bookmark
    })
  },
  post (bookmark) {
    return Api().post('bookmarks', bookmark)
  },
  delete (bookmarkId) {
    return Api().delete(`bookmarks/${bookmarkId}`)
  }
}
