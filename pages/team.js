import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiLinkedin, FiMail, FiInstagram } from 'react-icons/fi'
import { getTeamMembers } from '../lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'


export default function Team({ teamMembers }) {
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
                <div className="relative h-80 w-full overflow-hidden bg-gray-50 flex items-center justify-center p-2">
                  <div className="w-full h-full relative flex items-center justify-center">
                    <Image
                      src={member.image || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
                      alt={member.name}
                      width={400}
                      height={500}
                      priority
                      className="max-w-full max-h-full object-contain" 
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-1 text-xl font-bold">{member.name}</h3>
                  <p className="mb-4 text-secondary">{member.role}</p>
                  <div className="mb-4 text-gray-700">
                    {typeof member.bio === 'string' 
                      ? member.bio 
                      : member.bio && documentToReactComponents(member.bio)}
                  </div>
                  
                  {member.specialties && member.specialties.length > 0 && (
                    <>
                      <h4 className="mt-6 mb-2 font-bold">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-sm text-secondary bg-secondary bg-opacity-10 rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                  
                  <div className="flex mt-6 space-x-4">
                    {member.social?.linkedin && (
                      <a 
                        href={member.social.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={member.name + "'s LinkedIn"}
                        className="p-2 text-gray-600 transition-colors hover:text-secondary"
                      >
                        <FiLinkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.social?.email && (
                      <a 
                        href={`mailto:${member.social.email}`}
                        className="p-2 text-gray-600 transition-colors hover:text-secondary"
                        aria-label={`Email ${member.name}`}
                      >
                        <FiMail className="w-5 h-5" />
                      </a>
                    )}
                    {member.social?.instagram && (
                      <a 
                        href={member.social.instagram}
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={member.name + "'s Instagram"}
                        className="p-2 text-gray-600 transition-colors hover:text-secondary"
                      >
                        <FiInstagram className="w-5 h-5" />
                      </a>
                    )}
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

export async function getStaticProps() {
  const teamMembers = await getTeamMembers();
  
  return {
    props: {
      teamMembers,
    },
    // Re-generate at most once per hour
    revalidate: 3600,
  };
}
