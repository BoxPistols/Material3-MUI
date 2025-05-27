import { createFileRoute } from '@tanstack/react-router'
import ButtonsPage from '../pages/ButtonsPage'

export const Route = createFileRoute('/buttons')({
    component: ButtonsPage,
})
