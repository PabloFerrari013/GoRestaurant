import Header from '../../components/Header'
import api from '../../services/api'
import Food from '../../components/Food'
import ModalAddFood from '../../components/ModalAddFood'
import ModalEditFood from '../../components/ModalEditFood'
import { FoodsContainer } from './styles'

import React, { useEffect, useState } from 'react'

interface FoodInterface {
  id: number
  name: string
  description: string
  price: string
  available: boolean
  image: string
}

interface Foods {
  data: FoodInterface[]
}
const Dashboard: React.FC = () => {
  const [foods, setFoods] = useState<FoodInterface[]>([])
  const [modalAddIsOpen, setModalAdd] = useState(false)
  const [modalEditIsOpen, setModalEdit] = useState(false)
  const [activeFood, setActiveFood] = useState<FoodInterface>()
  const [currentId, setCurrentId] = useState(0)

  async function handleAddFood(food: FoodInterface) {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true
      })

      setFoods([...foods, response.data])
    } catch (err) {
      console.log(err)
    }
  }

  async function handleUpdateFood(food: FoodInterface) {
    try {
      const foodUpdated = await api.put(`/foods/${currentId}`, {
        ...food,
        ...foods
      })

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      )

      setFoods([...foodsUpdated])
    } catch (err) {
      console.log(err)
    }
  }

  async function handleDeleteFood(id: number) {
    await api.delete(`/foods/${id}`)

    const foodsFiltered = foods.filter(food => food.id !== id)

    setFoods(foodsFiltered)
  }

  function handleEditFood(food: FoodInterface) {
    setModalEdit(true)
    setActiveFood(food)
    setCurrentId(food.id)
  }

  useEffect(() => {
    const fetchData = async () => {
      const response: Foods = await api.get('/foods')

      return response
    }

    fetchData()
      .then(res => {
        setFoods(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <Header openModal={() => setModalAdd(p => !p)} />

      <ModalAddFood
        isOpen={modalAddIsOpen}
        setIsOpen={() => setModalAdd(p => !p)}
        handleAddFood={handleAddFood}
      />

      <ModalEditFood
        isOpen={modalEditIsOpen}
        setIsOpen={() => setModalEdit(p => !p)}
        editingFood={activeFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  )
}

export default Dashboard
