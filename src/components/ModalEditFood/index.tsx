import { useRef } from 'react'
import { FiCheckSquare } from 'react-icons/fi'

import { Form } from './styles'
import Modal from '../Modal'
import Input from '../Input'

import React from 'react'

import { FormHandles, SubmitHandler } from '@unform/core'

interface FoodInterface {
  id: number
  name: string
  description: string
  price: string
  available: boolean
  image: string
}

type ModalEditFoodProps = {
  isOpen: boolean
  setIsOpen: () => void
  editingFood: FoodInterface | undefined
  handleUpdateFood: (data: FoodInterface) => void
}

const ModalEditFood: React.FC<ModalEditFoodProps> = ({
  editingFood,
  handleUpdateFood,
  isOpen,
  setIsOpen
}) => {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit: SubmitHandler<FoodInterface> = data => {
    handleUpdateFood(data)
    setIsOpen()
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}

export default ModalEditFood
