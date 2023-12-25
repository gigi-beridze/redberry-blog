import { Blogs } from "../components/blogs"
import { Hero } from "../components/hero"
import { Navbar } from "../components/navbar"

export  const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Blogs />
        </>
    )
}