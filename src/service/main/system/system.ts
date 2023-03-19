import myRequest from '@/service/index'

export function getUserListData() {
  return myRequest.get({
    url: 'users/list'
  })
}
