import React from "react"
import HomeLayout from "../components/layout/home-layout"

const IndexPage = () => {
  return (
    <HomeLayout>
      <body class="min-h-screen dark:bg-slate-900">
        <div class="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <h1 class="mt-5 md:mt7 lg:mt-10 flex-none font-medium text-gray-800 dark:text-gray-200 text-2xl sm:text-3xl md:text-4xl lg:text-5xl inline-flex items-center">
            Welcome to PolymerLite
          </h1>
        </div>

      </body>
    </HomeLayout>
  )
}

export default IndexPage

export const Head = () => <title>Algebananazzzzz</title>