import { Api } from './Api'

export interface Update extends Api {
  version: string
  note: string
}

export type UpdateForm = Omit<Update, keyof Api>
