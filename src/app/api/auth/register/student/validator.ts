import { getUsers } from '@/domain/actions/users'
import { BadRequestException } from '@/domain/providers/http'

export const studentValidator = async (params: any) => {
  const { data } = params
  const { username, email, password, info } = data
  const {
    firstName, lastName, birthDate,
    address, phone, docType, docID,
    school, class: studentClass, gender,
  } = info || {}

  if (!username || !email || !password || !info) {
    const err = new BadRequestException()
    const params = []
    if (!username) { params.push('\'username\'') }
    if (!email) { params.push('\'email\'') }
    if (!password) { params.push('\'password\'') }
    if (!info) { params.push('\'info\'') }
    err.setMessage(`Request parameter ${params.join(' and ')} is required`)
    throw err
  }

  if (
    !firstName || !lastName || !birthDate
    || !address || !phone || !docType || !docID
    || !school || !studentClass || !gender
  ) {
    const err = new BadRequestException()
    const params = []
    if (!firstName) { params.push('\'firstName\'') }
    if (!lastName) { params.push('\'lastName\'') }
    if (!birthDate) { params.push('\'birthDate\'') }
    if (!address) { params.push('\'address\'') }
    if (!phone) { params.push('\'phone\'') }
    if (!docType) { params.push('\'docType\'') }
    if (!docID) { params.push('\'docID\'') }
    if (!school) { params.push('\'school\'') }
    if (!studentClass) { params.push('\'class\'') }
    if (!gender) { params.push('\'gender\'') }
    err.setMessage(`Request parameter ${params.join(' and ')} is required`)
    throw err
  }

  // Validate if user exists
  const exists = await getUsers({ OR: [{ email }, { username }] })
  if (exists.length > 0) {
    const err = new BadRequestException()
    if (exists.some(user => user.email === email)) {
      err.setMessage(`User with email '${email}' already exists`)
    } else if (exists.some(user => user.username === username)) {
      err.setMessage(`User with username '${username}' already exists`)
    }
    throw err
  }
}
