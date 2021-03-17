import { render, screen, waitFor } from '../../testUtils'
import  ContactDetailsPage  from './ContactDetailsPage'

test('loads contact correctly', async () => {
    const mockGetContactById = jest.fn(() => Promise.resolve({
        "_id": "5a56640243427b8f8445231e",
        "name": "Tanner Gates",
        "email": "tannergates@renovize.com",
        "phone": "+1 (978) 591-2291"
    }))
    render(<ContactDetailsPage match={{ params: { contactId: '5a56640243427b8f8445231e' } }} />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    await waitFor(mockGetContactById)
    expect(screen.getByText('Tanner Gates')).toBeInTheDocument()
})