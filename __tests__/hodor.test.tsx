import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../app/door/hodor/page'
 
test('Page', async () => {
  render(<Page />)
  expect(screen.getByRole('heading', { level: 1, name: 'Hold the door' })).toBeDefined();
})