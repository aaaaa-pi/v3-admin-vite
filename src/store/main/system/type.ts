export interface IUsers {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  creatAt: string
  updateAt: string
}

export interface ISystemStore {
  usersList: IUsers[]
  usersTotalCount: number
}
