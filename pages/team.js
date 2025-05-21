import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiLinkedin, FiMail, FiInstagram } from 'react-icons/fi'

// Sample team member data
const teamMembers = [
  {
    id: 1,
    name: 'Sophia Reynolds',
    role: 'Founder & Principal Designer',
    bio: 'With over 15 years of experience in interior design, Sophia founded MARS Design with a vision to create spaces that inspire and elevate everyday living. Her work has been featured in Architectural Digest and Elle Decor.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    social: {
      linkedin: 'https://linkedin.com/',
      email: 'sophia@marsdesign.com',
      instagram: 'https://instagram.com/',
    },
    specialties: ['Residential Design', 'Space Planning', 'Custom Furniture Design'],
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Senior Interior Designer',
    bio: 'Michael brings a unique perspective to each project, combining his background in architecture with a passion for innovative materials and sustainable design practices.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    social: {
      linkedin: 'https://linkedin.com/',
      email: 'michael@marsdesign.com',
      instagram: 'https://instagram.com/',
    },
    specialties: ['Commercial Design', 'Sustainable Interiors', 'Lighting Design'],
  },
  {
    id: 3,
    name: 'Emma Davis',
    role: 'Interior Designer',
    bio: 'Emma specializes in creating warm, inviting residential spaces that perfectly balance aesthetics and functionality. Her attention to detail and client-focused approach ensure exceptional results.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    social: {
      linkedin: 'https://linkedin.com/',
      email: 'emma@marsdesign.com',
      instagram: 'https://instagram.com/',
    },
    specialties: ['Residential Design', 'Color Theory', 'Textile Selection'],
  },
  {
    id: 4,
    name: 'James Wilson',
    role: 'Project Manager',
    bio: 'James ensures that every project runs smoothly from concept to completion. With his background in construction and design, he bridges the gap between creative vision and practical execution.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    social: {
      linkedin: 'https://linkedin.com/',
      email: 'james@marsdesign.com',
      instagram: 'https://instagram.com/',
    },
    specialties: ['Project Coordination', 'Budget Management', 'Vendor Relations'],
  },
  {
    id: 5,
    name: 'Olivia Martinez',
    role: 'Interior Designer',
    bio: 'Olivia\'s designs are characterized by her bold use of color and ability to blend different design styles. She excels at creating spaces that reflect her clients\' personalities and lifestyles.',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    social: {
      linkedin: 'https://linkedin.com/',
      email: 'olivia@marsdesign.com',
      instagram: 'https://instagram.com/',
    },
    specialties: ['Residential Design', 'Eclectic Interiors', 'Art Curation'],
  },
  {
    id: 6,
    name: 'David Kim',
    role: 'Commercial Design Specialist',
    bio: 'David focuses on creating productive and inspiring workspaces. His designs blend functionality with aesthetic appeal, resulting in environments that enhance productivity and employee satisfaction.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    social: {
      linkedin: 'https://linkedin.com/',
      email: 'david@marsdesign.com',
      instagram: 'https://instagram.com/',
    },
    specialties: ['Office Design', 'Hospitality Interiors', 'Ergonomic Workspaces'],
  },
]

export default function Team() {
  return (
    <>
      <Head>
        <title>Our Team | MARS Interior Design</title>
        <meta name="description" content="Meet our talented team of interior designers and professionals who create beautiful, functional spaces." />
      </Head>

      {/* Page Header */}
      <section className="pt-36 pb-16 bg-primary text-white">
        <div className="container text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">Our Team</h1>
          <p className="max-w-2xl mx-auto text-xl">
            Meet the talented professionals behind MARS Interior Design who bring creativity, expertise, and passion to every project.
          </p>
        </div>
      </section>

      {/* Team Philosophy */}
      <section className="py-16 bg-light">
        <div className="container">
          <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold">Our Design Philosophy</h2>
              <p className="mb-4 text-lg">
                At MARS Interior Design, we believe that exceptional spaces begin with understanding the people who inhabit them. Our collaborative approach places your needs, preferences, and lifestyle at the center of our design process.
              </p>
              <p className="mb-4 text-lg">
                We combine technical expertise with creative vision to create environments that are both beautiful and functional. Each team member brings unique skills and perspectives, allowing us to deliver truly personalized design solutions.
              </p>
              <p className="text-lg">
                From initial concept to final installation, we work closely with you to ensure that every detail reflects your vision and exceeds your expectations.
              </p>
            </div>
            <div className="relative h-80 md:h-auto">
              <Image
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Team collaboration"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="mb-12 text-3xl font-bold text-center">Meet Our Designers</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="overflow-hidden bg-white rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-80">
                  <Image
                    src={member.image}
                    alt={member.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-1 text-xl font-bold">{member.name}</h3>
                  <p className="mb-4 text-secondary">{member.role}</p>
                  <p className="mb-4 text-gray-700">{member.bio}</p>
                  
                  <h4 className="mt-4 mb-2 font-semibold">Specialties:</h4>
                  <div className="flex flex-wrap mb-4 gap-2">
                    {member.specialties.map((specialty, idx) => (
                      <span key={idx} className="px-3 py-1 text-sm text-primary bg-gray-100 rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex mt-6 space-x-4">
                    <a 
                      href={member.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={member.name + "'s LinkedIn"}
                      className="p-2 text-gray-600 transition-colors hover:text-secondary"
                    >
                      <FiLinkedin className="w-5 h-5" />
                    </a>
                    <a 
                      href={`mailto:${member.social.email}`}
                      className="p-2 text-gray-600 transition-colors hover:text-secondary"
                      aria-label={`Email ${member.name}`}
                    >
                      <FiMail className="w-5 h-5" />
                    </a>
                    <a 
                      href={member.social.instagram}
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={member.name + "'s Instagram"}
                      className="p-2 text-gray-600 transition-colors hover:text-secondary"
                    >
                      <FiInstagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-16 text-center bg-light">
        <div className="container">
          <h2 className="mb-6 text-3xl font-bold">Join Our Team</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            We're always looking for talented designers and professionals to join our growing team.
            Check out our current openings or submit your portfolio for future opportunities.
          </p>
          <a
            href="/careers"
            className="inline-flex items-center px-6 py-3 text-white transition-colors rounded-md bg-primary hover:bg-primary-light"
          >
            View Open Positions
          </a>
        </div>
      </section>
    </>
  )
}
