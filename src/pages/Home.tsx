import { Blogs } from "../components/blogs"
import { Filters } from "../components/filters"
import { Hero } from "../components/hero"
import { Navbar } from "../components/navbar"

export  const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Filters />
            <Blogs />
        </>
    )
}