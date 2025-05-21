import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiArrowRight, FiAward, FiUsers, FiHome } from 'react-icons/fi'

export default function Home() {
  return (
    <>
      <Head>
        <title>MARS Interior Design | Transform Your Space</title>
        <meta name="description" content="MARS Interior Design transforms spaces into inspiring environments through thoughtful design and expert craftsmanship." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="Luxury living room design"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="absolute inset-0 bg-primary opacity-50"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <motion.h1 
            className="mb-6 text-4xl font-bold md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Creating Spaces That Inspire
          </motion.h1>
          <motion.p 
            className="max-w-xl mb-8 text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            MARS Interior Design transforms your vision into beautiful, functional spaces that reflect your unique style.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/projects" legacyBehavior>
              <a className="inline-flex items-center px-6 py-3 mr-4 text-lg text-white transition-colors rounded-md bg-secondary hover:bg-secondary-light">
                View Our Work <FiArrowRight className="ml-2" />
              </a>
            </Link>
            <Link href="/contact" legacyBehavior>
              <a className="inline-flex items-center px-6 py-3 text-lg transition-colors border rounded-md text-secondary border-secondary hover:bg-secondary hover:bg-opacity-10">
                Contact Us
              </a>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">About MARS Design</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <p className="mb-6 text-lg">
                MARS Interior Design is a premier design studio specializing in creating beautiful and functional spaces for residential and commercial clients. 
                Our approach combines aesthetics, functionality, and sustainability to deliver designs that exceed expectations.
              </p>
              <p className="mb-6 text-lg">
                With a dedicated team of experienced designers, project managers, and craftspeople, we handle projects of all sizes with the same attention to detail and commitment to excellence.
              </p>
              <Link href="/team" legacyBehavior>
                <a className="inline-flex items-center text-lg font-medium text-primary hover:text-secondary">
                  Meet Our Team <FiArrowRight className="ml-2" />
                </a>
              </Link>
            </div>
            <div className="relative h-80 md:h-auto">
              <Image
                src="https://images.unsplash.com/photo-1567016526105-22da7c13161a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Interior designers working together"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-8 text-center bg-white rounded-lg shadow-md">
              <FiAward className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h3 className="mb-2 text-2xl font-bold">15+ Years</h3>
              <p className="text-gray-600">Of Design Excellence</p>
            </div>
            <div className="p-8 text-center bg-white rounded-lg shadow-md">
              <FiHome className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h3 className="mb-2 text-2xl font-bold">200+</h3>
              <p className="text-gray-600">Projects Completed</p>
            </div>
            <div className="p-8 text-center bg-white rounded-lg shadow-md">
              <FiUsers className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h3 className="mb-2 text-2xl font-bold">150+</h3>
              <p className="text-gray-600">Happy Clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Modern Apartment Redesign',
                location: 'New York, NY',
                image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
              },
              {
                title: 'Luxury Villa Interior',
                location: 'Los Angeles, CA',
                image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
              },
              {
                title: 'Corporate Office Space',
                location: 'Chicago, IL',
                image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
              },
            ].map((project, index) => (
              <div key={index} className="overflow-hidden transition-transform duration-300 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2">
                <div className="relative h-64">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                  <p className="mb-4 text-gray-600">{project.location}</p>
                  <Link href="/projects" legacyBehavior>
                    <a className="inline-flex items-center font-medium text-primary hover:text-secondary">
                      View Project <FiArrowRight className="ml-2" />
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/projects" legacyBehavior>
              <a className="btn btn-primary">View All Projects</a>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20 text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="Modern interior design"
            fill
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute inset-0 bg-primary opacity-80"></div>
        </div>
        <div className="relative container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to Transform Your Space?</h2>
            <p className="mb-8 text-xl">
              Let's collaborate to create a space that reflects your style, meets your needs, and exceeds your expectations.
            </p>
            <Link href="/contact" legacyBehavior>
              <a className="inline-flex items-center px-8 py-3 text-lg font-medium rounded-md text-primary bg-secondary hover:bg-secondary-light">
                Get Started Today
              </a>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
