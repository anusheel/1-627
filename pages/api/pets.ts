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
  res: NextApiResponse<Pet | Pet[] | { message: string }>
) {
  const { method } = req

  switch (method) {
    case 'GET':
      res.status(200).json(pets)
      break
    case 'POST':
      const { name, breed, age } = req.body
      const id = pets.length + 1
      const newPet = { id, name, breed, age }
      pets.push(newPet)
      res.status(201).json(newPet)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).json({ message: `Method ${method} Not Allowed` })
  }
}