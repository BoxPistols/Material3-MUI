import { createFileRoute } from '@tanstack/react-router'
import TypographyPage from '../pages/TypographyPage'

export const Route = createFileRoute('/typography')({
  component: TypographyPage,
}) 