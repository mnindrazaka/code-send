import codeSendService from '../codeSendService'
import axios from 'axios'

jest.mock('axios')
const axiosMock = axios as jest.Mocked<typeof axios>

describe('code send service', () => {
  it('can create update', () => {
    const note = 'mock note'
    const version = 'mock version'

    codeSendService.createUpdate({ note, version })
    expect(axiosMock).toBeCalledWith({
      baseURL: codeSendService.baseURL,
      url: '/update',
      method: 'post',
      data: { note, version }
    })
  })

  it('can upload update', () => {
    const id = '12345'
    const bundle = new Blob([])
    const formData = new FormData()
    formData.append('bundle', bundle)

    codeSendService.uploadUpdate(id, bundle)
    expect(axiosMock).toBeCalledWith({
      baseURL: codeSendService.baseURL,
      url: `/update/${id}/bundle`,
      method: 'put',
      data: formData
    })
  })
})
