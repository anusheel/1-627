import type { NextApiRequest, NextApiResponse } from 'next'

type Pet = {
  id: number
  name: string
  breed: string
  age: number
}

let pets: Pet[] = [
  { id: 1, name: 'Max', breed: 'Golden Retriever', age: 5 },
  { id: 2, name: 'Bella', breed: 'Bulldog', age: 3 },
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pet | { message: string }>
) {
  const {
    query: { id },
    method,
  } = req

  const petIndex = pets.findIndex((pet) => pet.id === Number(id))

  switch (method) {
    case 'GET':
      if (petIndex > -1) {
        res.status(200).json(pets[petIndex])
      } else {
        res.status(404).json({ message: 'Pet not found' })
      }
      break
    case 'PUT':
      if (petIndex > -1) {
        const { name, breed, age } = req.body
        const updatedPet = { id: Number(id), name, breed, age }
        pets[petIndex] = updatedPet
        res.status(200).json(updatedPet)
      } else {
        res.status(404).json({ message: 'Pet not found' })
      }
      break
    case 'DELETE':
      if (petIndex > -1) {
        const deletedPet = pets.splice(petIndex, 1)
        res.status(200).json(deletedPet[0])
      } else {
        res.status(404).json({ message: 'Pet not found' })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).json({ message: `Method ${method} Not Allowed` })
  }
}