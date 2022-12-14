import { FiCheckSquare } from 'react-icons/fi'

import { Form } from './styles'
import Modal from '../Modal'
import Input from '../Input'

import React, { useRef } from 'react'
import { FormHandles, SubmitHandler } from '@unform/core'

interface FoodInterface {
  id: number
  name: string
  description: string
  price: string
  available: boolean
  image: string
}

type ModalAddFoodProps = {
  isOpen: boolean
  setIsOpen: () => void
  handleAddFood: (food: FoodInterface) => void
}

const ModalAddFood: React.FC<ModalAddFoodProps> = ({
  handleAddFood,
  isOpen,
  setIsOpen
}) => {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit: SubmitHandler<FoodInterface> = data => {
    handleAddFood({
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
      available: false
    })

    setIsOpen()
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}

export default ModalAddFood
