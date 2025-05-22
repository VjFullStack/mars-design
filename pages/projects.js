import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiSearch } from 'react-icons/fi'
import { getProjects } from '../lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

// Available category filters
const categories = ['All', 'Residential', 'Commercial', 'Hospitality']

export default function Projects({ projects }) {
  const [filter, setFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  // Filter projects based on category and search term
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = filter === 'All' || project.category === filter
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <Head>
        <title>Our Projects | MARS Interior Design</title>
        <meta name="description" content="Explore our portfolio of interior design projects including residential, commercial, and hospitality spaces." />
      </Head>

      {/* Page Header */}
      <section className="pt-36 pb-16 bg-primary text-white">
        <div className="container text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">Our Projects</h1>
          <p className="max-w-2xl mx-auto text-xl">
            Explore our portfolio of thoughtfully designed spaces that transform how people live, work, and experience their surroundings.
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-light">
        <div className="container">
          <div className="flex flex-col items-center justify-between md:flex-row">
            {/* Category Filters */}
            <div className="flex flex-wrap mb-4 space-x-2 md:mb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 mb-2 transition-colors rounded-full ${
                    filter === category
                      ? 'bg-secondary text-primary'
                      : 'bg-white text-primary hover:bg-gray-100'
                  }`}
                  onClick={() => setFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <FiSearch className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="overflow-hidden bg-white rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={project.image || 'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
                      alt={project.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 text-sm text-primary bg-secondary bg-opacity-20 rounded-full">
                        {project.category}
                      </span>
                      <span className="text-sm text-gray-500">{project.year}</span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                    <p className="mb-3 text-gray-600">{project.location}</p>
                    <div className="mb-4 text-gray-700">
                      {typeof project.description === 'string'
                        ? project.description
                        : project.description && documentToReactComponents(project.description)}
                    </div>
                    <button className="text-primary hover:text-secondary">View Details</button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="mb-2 text-xl font-bold">No projects found</h3>
                <p className="text-gray-600">Try adjusting your filters or search term</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center bg-light">
        <div className="container">
          <h2 className="mb-6 text-3xl font-bold">Have a Project in Mind?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            We'd love to work with you to bring your vision to life. Contact us to discuss your upcoming project.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 text-white transition-colors rounded-md bg-primary hover:bg-primary-light"
          >
            Let's Talk
          </a>
        </div>
      </section>
    </>
  )
}

export async function getStaticProps() {
  const projects = await getProjects();
  
  return {
    props: {
      projects,
    },
    // Re-generate at most once per hour
    revalidate: 3600,
  };
}
