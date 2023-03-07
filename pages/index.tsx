import { faker } from '@faker-js/faker'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRef, useState } from 'react'
const Home: NextPage = () => {

  const [no_of_tabs, setNoOfTabs] = useState(0)
  const [search_contents, setSearchContents] = useState([])

  // sessions
  const result_session = useRef<HTMLInputElement>(null);
  const color_map = useRef<{ [key: string]: string }>({})

  const handleNoOfTabs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoOfTabs(parseInt(e.target.value))
  }

  const fakerPossibleOptions = {
    "vehicle": faker.vehicle.vehicle,
    "animal": faker.animal.dog,
    "commerce": faker.commerce.productName,
  }

  const generateColorMap = (fakerPossibleOptions: { [key: string]: any }) => {
    // generate a color map for each faker option
    // use this color map to generate random search contents
    let colorMap: { [key: string]: string } = {}
    for (const key in fakerPossibleOptions) {
      // generate light colors
      colorMap[key] = faker.internet.color(200, 50, 200)
    }
    color_map.current = colorMap
  }

  // on button click, open the number of new tabs with random search contents
  const handleOpenTabs = () => {
    // use @faker-js/faker to generate random search content
    // open the number of tabs
    let search_contents: {}[] = []
    generateColorMap(fakerPossibleOptions);
    for (let i = 0; i < no_of_tabs; i++) {
      // generate a random search content
      const fakerOption = Object.keys(fakerPossibleOptions)[Math.floor(Math.random() * Object.keys(fakerPossibleOptions).length)]
      const search = fakerPossibleOptions[fakerOption]()
      // add the search content and faker option to the search contents array
      search_contents.push({ search: search })
    }
    setSearchContents(search_contents)
    // scroll to the result section with a slow speed animation
    result_session.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const openTabInNewWindow = (searchParam: string) => {
    // open in a new bing tab
    window.open(`https://www.bing.com/search?q=${searchParam}`, '_blank')
  }

  const openAll = () => {
    // open all the tabs in a new window
    search_contents.forEach(search_content => {
      openTabInNewWindow(search_content.search)
    })
  }


  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
      </Head>
      <section className='flex flex-col items-center justify-center h-screen p-10 rounded-lg shadow-xl'>
        <h1 className='text-4xl text-center font-sans p-4'>Auto Tab opener</h1>
        <p className='text-2xl text-center font-sans p-4'>Randomly Open Tabs with search contents</p>
        {/* collect the number of tabs in an inputbox */}
        <div className='flex'>
          <input
            className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none p-4 mr-2'
            type='number'
            placeholder='Number of Tabs'
            onChange={handleNoOfTabs} />

          <button
            className=' bg-blue-500 text-white font-bold py-2 px-4 rounded-lg p-4'
            onClick={handleOpenTabs}
          >Button</button>
        </div>
      </section>

      {/* Result section */}
      <section className='flex flex-col items-center justify-center h-screen p-10 rounded-lg shadow-xl' ref={result_session}>
        <h1 className='text-4xl text-center font-sans p-4'>Result</h1>
        {/* add two coloumns Text with number of tabs and a green button which says open all */}
        <div className='flex items-center'>
          {/* 4 open tabs... */}
          <p className='text-2xl text-center font-sans p-4'>
            {no_of_tabs} tabs...
          </p>
          <button
            className=' bg-green-500 text-white font-bold py-2 rounded-lg p-4 h-10'
            onClick={openAll}
          >
            Open All
          </button>
        </div>

        {/* add a list of search contents in a 5x5 grid */}
        <div className='grid grid-cols-5 gap-4 p-2 items-center justify-center'>
          {search_contents.map((search_content, index) => (
            <div key={index} className='p-4'>
              <button
                onClick={() => openTabInNewWindow(search_content.search)}
                className={
                  index % 2 ? `bg-blue-700 hover:bg-blue-900 text-white font-bold py-4 px-6 rounded-full` :
                    // shade of blue
                    `bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full`
                } style={{ width: '100%', height: '70px' }}
                // add a tooltip to show the search content
                title={search_content.search}
              >
                {search_content.search}
              </button>
            </div>
          ))}
        </div>

      </section>
      Text
    </div>
  )
}

export default Home
