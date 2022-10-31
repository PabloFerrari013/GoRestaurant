import { useState } from 'react'
import { FiEdit3, FiTrash } from 'react-icons/fi'

import { Container } from './styles'
import api from '../../services/api'

import React from 'react'

type FProps = {
  id: number
  name: string
  description: string
  price: string
  available: boolean
  image: string
}

type FoodProps = {
  food: FProps
  handleDelete: (id: number) => void
  handleEditFood: (food: FProps) => void
}

const Food: React.FC<FoodProps> = ({ food, handleDelete, handleEditFood }) => {
  const [isAvailable, setAvailable] = useState(false)

  async function handleToggleAvailable() {
    try {
      await api.put(`/foods/${food.id}`, {
        ...food,
        available: !isAvailable
      })

      setAvailable(!isAvailable)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container available={isAvailable}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => handleEditFood(food)}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={handleToggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  )
}

export default Food
