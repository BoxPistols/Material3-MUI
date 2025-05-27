import { createFileRoute } from '@tanstack/react-router'
import ColorsPage from '../pages/ColorsPage'

export const Route = createFileRoute('/colors')({
    component: ColorsPage,
})
