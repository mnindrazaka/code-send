import { Api } from './Api'

export interface Update extends Api {
  version: string
  note: string
  bundle?: Blob
}

export type UpdateFormValues = Omit<Update, keyof Api>
