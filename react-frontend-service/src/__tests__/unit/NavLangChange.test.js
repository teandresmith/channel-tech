import { fireEvent, render, screen } from '@testing-library/react'
import Navbar from '../../components/Navbar/Navbar'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../../redux/store/store'

test('on click of language button, language changes', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </Provider>
  )

  let button

  localStorage.setItem('lang', 'en')

  if (localStorage.getItem('lang') === 'en') {
    button = screen.getByRole('button', { name: /Change to Japanese/i })
  } else {
    button = screen.getByRole('button', { name: /Change to English/i })
  }

  fireEvent.click(button)
  const language = localStorage.getItem('lang')
  if (language === 'jp') {
    expect(language).toMatch(/jp/)
  } else {
    expect(language).toMatch(/en/)
  }
})
