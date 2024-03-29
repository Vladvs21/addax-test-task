import { FC, useRef } from 'react'

import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/HomePage'

const App:FC = () => {
    return (
        <>
            <Header />

            <HomePage />

            <Footer />
        </>
    )
}

export default App
