import { createFileRoute } from '@tanstack/react-router'
import TokensPage from '../pages/TokensPage'

export const Route = createFileRoute('/tokens')({
    component: TokensPage,
})
