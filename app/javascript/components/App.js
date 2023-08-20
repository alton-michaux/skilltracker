import React from 'react'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { AppProvider } from './AppContext'
import AppWrapper from './AppWrapper'

const App = () => {
  // Check if the code is executing in a browser environment
  const isBrowser = typeof window !== 'undefined'
  return (
    <>
      {isBrowser && (
        <AppProvider>
          <AppWrapper/>
        </AppProvider>
      )}
    </>
  )
}

export default App
