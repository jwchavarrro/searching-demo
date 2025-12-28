/**
 * comment/index.test.tsx
 * @description: Tests para el componente Comment
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Comment } from '../index'

describe('Comment', () => {
  const mockOnSave = vi.fn()
  const mockOnDelete = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Renderizado básico', () => {
    it('renderiza el título "Comment"', () => {
      render(<Comment characterId={1} initialComment="" onSave={mockOnSave} />)
      expect(screen.getByText('Comment')).toBeInTheDocument()
    })

    it('renderiza el textarea', () => {
      render(<Comment characterId={1} initialComment="" onSave={mockOnSave} />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toBeInTheDocument()
    })

    it('aplica className personalizada', () => {
      const { container } = render(
        <Comment
          characterId={1}
          initialComment=""
          onSave={mockOnSave}
          className="custom-class"
        />
      )
      const wrapper = container.firstChild
      expect(wrapper).toHaveClass('custom-class')
    })

    it('incluye el atributo data-character-id', () => {
      const { container } = render(
        <Comment characterId={123} initialComment="" onSave={mockOnSave} />
      )
      const wrapper = container.firstChild
      expect(wrapper).toHaveAttribute('data-character-id', '123')
    })
  })

  describe('Sin comentario inicial', () => {
    it('inicia en modo edición cuando no hay comentario inicial', () => {
      render(<Comment characterId={1} initialComment="" onSave={mockOnSave} />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).not.toBeDisabled()
    })

    it('muestra el botón Save cuando está en modo edición', () => {
      render(<Comment characterId={1} initialComment="" onSave={mockOnSave} />)
      expect(screen.getByText('Save')).toBeInTheDocument()
    })

    it('no muestra el botón Cancel cuando no hay comentario inicial', () => {
      render(<Comment characterId={1} initialComment="" onSave={mockOnSave} />)
      expect(screen.queryByText('Cancel')).not.toBeInTheDocument()
    })

    it('no muestra el botón Delete cuando no hay comentario inicial', () => {
      render(<Comment characterId={1} initialComment="" onSave={mockOnSave} />)
      expect(screen.queryByText('Delete')).not.toBeInTheDocument()
    })
  })

  describe('Con comentario inicial', () => {
    it('inicia en modo lectura cuando hay comentario inicial', () => {
      render(
        <Comment
          characterId={1}
          initialComment="Mi comentario"
          onSave={mockOnSave}
        />
      )
      const textarea = screen.getByRole('textbox')
      expect(textarea).toBeDisabled()
      expect(textarea).toHaveValue('Mi comentario')
    })

    it('muestra el botón de editar cuando hay comentario y no está editando', () => {
      render(
        <Comment
          characterId={1}
          initialComment="Mi comentario"
          onSave={mockOnSave}
        />
      )
      const editButton = screen.getByTestId('iconify-icon')
      expect(editButton).toHaveAttribute(
        'data-icon',
        'hugeicons:pencil-edit-02'
      )
    })

    it('no muestra los botones de acción cuando está en modo lectura', () => {
      render(
        <Comment
          characterId={1}
          initialComment="Mi comentario"
          onSave={mockOnSave}
        />
      )
      expect(screen.queryByText('Save')).not.toBeInTheDocument()
      expect(screen.queryByText('Cancel')).not.toBeInTheDocument()
    })
  })

  describe('Modo edición', () => {
    it('cambia a modo edición cuando se hace clic en el botón de editar', async () => {
      const user = userEvent.setup()
      render(
        <Comment
          characterId={1}
          initialComment="Mi comentario"
          onSave={mockOnSave}
        />
      )

      const editIcon = screen.getByTestId('iconify-icon')
      const editButton = editIcon.closest('button')
      expect(editButton).toBeInTheDocument()
      await user.click(editButton!)

      const textarea = screen.getByRole('textbox')
      expect(textarea).not.toBeDisabled()
      expect(screen.getByText('Save')).toBeInTheDocument()
    })

    it('muestra los botones Save y Cancel cuando está editando un comentario existente', async () => {
      const user = userEvent.setup()
      render(
        <Comment
          characterId={1}
          initialComment="Mi comentario"
          onSave={mockOnSave}
          onDelete={mockOnDelete}
        />
      )

      const editIcons = screen.getAllByTestId('iconify-icon')
      const editIcon = editIcons.find(
        icon => icon.getAttribute('data-icon') === 'hugeicons:pencil-edit-02'
      )
      const editButton = editIcon?.closest('button')
      await user.click(editButton!)

      expect(screen.getByText('Save')).toBeInTheDocument()
      expect(screen.getByText('Cancel')).toBeInTheDocument()
    })

    it('sincroniza el valor del textarea con initialComment al entrar en modo edición', async () => {
      const user = userEvent.setup()
      render(
        <Comment
          characterId={1}
          initialComment="Comentario original"
          onSave={mockOnSave}
        />
      )

      const editIcon = screen.getByTestId('iconify-icon')
      const editButton = editIcon.closest('button')
      await user.click(editButton!)

      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveValue('Comentario original')
    })
  })

  describe('Guardar comentario', () => {
    it('llama a onSave con el comentario cuando se hace clic en Save', async () => {
      const user = userEvent.setup()
      render(<Comment characterId={1} initialComment="" onSave={mockOnSave} />)

      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'Nuevo comentario')

      const saveButton = screen.getByText('Save')
      await user.click(saveButton)

      expect(mockOnSave).toHaveBeenCalledWith('Nuevo comentario')
      expect(mockOnSave).toHaveBeenCalledTimes(1)
    })

    it('recorta espacios en blanco al guardar', async () => {
      const user = userEvent.setup()
      render(<Comment characterId={1} initialComment="" onSave={mockOnSave} />)

      const textarea = screen.getByRole('textbox')
      await user.type(textarea, '  Comentario con espacios  ')

      const saveButton = screen.getByText('Save')
      await user.click(saveButton)

      expect(mockOnSave).toHaveBeenCalledWith('Comentario con espacios')
    })

    it('no llama a onSave si el comentario está vacío', async () => {
      const user = userEvent.setup()
      render(<Comment characterId={1} initialComment="" onSave={mockOnSave} />)

      const saveButton = screen.getByText('Save')
      expect(saveButton).toBeDisabled()

      await user.click(saveButton)

      expect(mockOnSave).not.toHaveBeenCalled()
    })

    it('no llama a onSave si el comentario solo tiene espacios', async () => {
      const user = userEvent.setup()
      render(<Comment characterId={1} initialComment="" onSave={mockOnSave} />)

      const textarea = screen.getByRole('textbox')
      await user.type(textarea, '   ')

      const saveButton = screen.getByText('Save')
      expect(saveButton).toBeDisabled()

      await user.click(saveButton)

      expect(mockOnSave).not.toHaveBeenCalled()
    })

    it('sale del modo edición después de guardar', async () => {
      const user = userEvent.setup()
      render(<Comment characterId={1} initialComment="" onSave={mockOnSave} />)

      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'Nuevo comentario')

      const saveButton = screen.getByText('Save')
      await user.click(saveButton)

      expect(textarea).toBeDisabled()
      expect(screen.queryByText('Save')).not.toBeInTheDocument()
    })
  })

  describe('Cancelar edición', () => {
    it('restaura el comentario original al cancelar', async () => {
      const user = userEvent.setup()
      render(
        <Comment
          characterId={1}
          initialComment="Comentario original"
          onSave={mockOnSave}
        />
      )

      const editIcon = screen.getByTestId('iconify-icon')
      const editButton = editIcon.closest('button')
      await user.click(editButton!)

      const textarea = screen.getByRole('textbox')
      await user.clear(textarea)
      await user.type(textarea, 'Comentario modificado')

      const cancelButton = screen.getByText('Cancel')
      await user.click(cancelButton)

      expect(textarea).toHaveValue('Comentario original')
      expect(textarea).toBeDisabled()
      expect(mockOnSave).not.toHaveBeenCalled()
    })

    it('sale del modo edición al cancelar', async () => {
      const user = userEvent.setup()
      render(
        <Comment
          characterId={1}
          initialComment="Comentario original"
          onSave={mockOnSave}
        />
      )

      const editIcon = screen.getByTestId('iconify-icon')
      const editButton = editIcon.closest('button')
      await user.click(editButton!)

      const cancelButton = screen.getByText('Cancel')
      await user.click(cancelButton)

      expect(screen.queryByText('Save')).not.toBeInTheDocument()
      expect(screen.queryByText('Cancel')).not.toBeInTheDocument()
    })
  })

  describe('Eliminar comentario', () => {
    it('llama a onDelete cuando se hace clic en Delete', async () => {
      const user = userEvent.setup()
      render(
        <Comment
          characterId={1}
          initialComment="Comentario a eliminar"
          onSave={mockOnSave}
          onDelete={mockOnDelete}
        />
      )

      const deleteIcons = screen.getAllByTestId('iconify-icon')
      const deleteIcon = deleteIcons.find(
        icon => icon.getAttribute('data-icon') === 'hugeicons:delete-01'
      )
      const deleteButton = deleteIcon?.closest('button')
      expect(deleteButton).toBeInTheDocument()
      await user.click(deleteButton!)

      expect(mockOnDelete).toHaveBeenCalledTimes(1)
    })

    it('limpia el comentario después de eliminar', async () => {
      const user = userEvent.setup()
      render(
        <Comment
          characterId={1}
          initialComment="Comentario a eliminar"
          onSave={mockOnSave}
          onDelete={mockOnDelete}
        />
      )

      const deleteIcons = screen.getAllByTestId('iconify-icon')
      const deleteIcon = deleteIcons.find(
        icon => icon.getAttribute('data-icon') === 'hugeicons:delete-01'
      )
      const deleteButton = deleteIcon?.closest('button')
      await user.click(deleteButton!)

      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveValue('')
    })

    it('entra en modo edición después de eliminar', async () => {
      const user = userEvent.setup()
      render(
        <Comment
          characterId={1}
          initialComment="Comentario a eliminar"
          onSave={mockOnSave}
          onDelete={mockOnDelete}
        />
      )

      const deleteIcons = screen.getAllByTestId('iconify-icon')
      const deleteIcon = deleteIcons.find(
        icon => icon.getAttribute('data-icon') === 'hugeicons:delete-01'
      )
      const deleteButton = deleteIcon?.closest('button')
      await user.click(deleteButton!)

      const textarea = screen.getByRole('textbox')
      expect(textarea).not.toBeDisabled()
    })

    it('no muestra el botón Delete si onDelete no está definido', () => {
      render(
        <Comment
          characterId={1}
          initialComment="Comentario"
          onSave={mockOnSave}
        />
      )

      const deleteIcons = screen.queryAllByTestId('iconify-icon')
      const deleteIcon = deleteIcons.find(
        icon => icon.getAttribute('data-icon') === 'hugeicons:delete-01'
      )
      expect(deleteIcon).toBeUndefined()
    })
  })

  describe('Validación', () => {
    it('deshabilita el botón Save cuando el comentario está vacío', () => {
      render(<Comment characterId={1} initialComment="" onSave={mockOnSave} />)
      const saveButton = screen.getByText('Save')
      expect(saveButton).toBeDisabled()
    })

    it('habilita el botón Save cuando hay texto', async () => {
      const user = userEvent.setup()
      render(<Comment characterId={1} initialComment="" onSave={mockOnSave} />)

      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'Texto')

      const saveButton = screen.getByText('Save')
      expect(saveButton).not.toBeDisabled()
    })

    it('deshabilita el botón Save cuando solo hay espacios', async () => {
      const user = userEvent.setup()
      render(<Comment characterId={1} initialComment="" onSave={mockOnSave} />)

      const textarea = screen.getByRole('textbox')
      await user.type(textarea, '   ')

      const saveButton = screen.getByText('Save')
      expect(saveButton).toBeDisabled()
    })
  })
})
