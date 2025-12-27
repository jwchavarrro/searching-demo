/**
 * CommentSection.tsx
 * @description: Componente para mostrar y editar comentarios de personajes starred
 */

import { useState } from 'react'
import { Icon } from '@iconify/react'

// Import of components custom
import { Textarea, Text, Button } from '@/components/atomic-desing/atoms'

// Import of utils
import { cn } from '@/utils/cn'
import { ICONS } from '@/config'

export interface CommentProps {
  characterId: number
  initialComment?: string
  onSave: (comment: string) => void
  onDelete?: () => void
  className?: string
}

export const Comment = ({
  characterId,
  initialComment = '',
  onSave,
  onDelete,
  className,
}: CommentProps) => {
  // State Generals
  const [comment, setComment] = useState(initialComment)
  const [isEditing, setIsEditing] = useState(!initialComment)

  // Handlers
  /* @name handleSave
  @description: Manejador para guardar el comentario
  */
  const handleSave = () => {
    if (comment.trim()) {
      onSave(comment.trim())
      setIsEditing(false)
    }
  }

  /* @name handleDelete
  @description: Manejador para eliminar el comentario
  */
  const handleDelete = () => {
    if (onDelete) {
      onDelete()
      setComment('')
      setIsEditing(true)
    }
  }

  /* @name handleEdit
  @description: Manejador para editar el comentario
  */
  const handleEdit = () => {
    setComment(initialComment)
    setIsEditing(true)
  }

  /* @name handleCancel
  @description: Manejador para cancelar la edición del comentario
  */
  const handleCancel = () => {
    setComment(initialComment)
    setIsEditing(false)
  }

  /* @name hasComment
  @description: Verificar si hay un comentario
  */
  const hasComment = !!initialComment

  return (
    <div className={cn('space-y-2', className)} data-character-id={characterId}>
      {/* Title and edit button */}
      <div className="flex items-center gap-2">
        <Text text="Comment" weight="bold" size="base" />
        {hasComment && !isEditing && (
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary-100 text-primary-700 border-transparent hover:border-transparent md:size-7"
            onClick={handleEdit}
          >
            <Icon icon={ICONS.update_02} className="size-5" />
          </Button>
        )}
      </div>

      {/* Comment textarea and buttons */}
      <div className="max-w-2xl space-y-2">
        <Textarea
          value={isEditing ? comment : initialComment}
          onChange={e => setComment(e.target.value)}
          disabled={!isEditing}
        />
        {isEditing && (
          <div className="flex flex-col gap-2 md:flex-row md:justify-end">
            {hasComment && (
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            )}
            {hasComment && onDelete && (
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            )}
            <Button onClick={handleSave} disabled={!comment.trim()}>
              Save
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
