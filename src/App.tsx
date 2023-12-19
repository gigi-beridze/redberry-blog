import { Blogs } from "./components/blogs"
import { Filters } from "./components/filters"
import { Hero } from "./components/hero"
import { Navbar } from "./components/navbar"

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Filters />
      <Blogs />
    </div>
  )
}

export default App
