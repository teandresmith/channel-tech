import { createSlice } from '@reduxjs/toolkit'
import { englishLinks, japaneseLinks } from '../../assets/data/data'

const language =
  localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en'

const initialState = {
  language: language,
  languageData: language === 'en' ? englishLinks : japaneseLinks,
}

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      const language = action.payload

      state.language = language

      if (language === 'en') {
        state.languageData = englishLinks
      } else {
        state.languageData = japaneseLinks
      }

      localStorage.setItem('lang', language)
    },
  },
})

export const { changeLanguage } = languageSlice.actions

export default languageSlice.reducer
