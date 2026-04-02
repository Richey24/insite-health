import { useState } from 'react';
import { ExternalLink, MessageCircle, Mail, Phone } from 'lucide-react';

const Team = () => {
  const [hoveredMember, setHoveredMember] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      position: 'Chief Medical Officer',
      department: 'Medical Leadership',
      image: '/assets/images/team1.jpg',
      bio: 'Dr. Johnson brings 15+ years of hospital administration experience and deep understanding of healthcare workflow optimization.',
      specialties: ['Healthcare Operations', 'Medical Device Management', 'Patient Safety'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'sarah.johnson@insitehealth.com'
      }
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Chief Technology Officer', 
      department: 'Technology',
      image: '/assets/images/team2.jpg',
      bio: 'Michael leads our engineering team with expertise in IoT, real-time systems, and healthcare technology solutions.',
      specialties: ['IoT Systems', 'Real-time Analytics', 'Healthcare Tech'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'michael.chen@insitehealth.com'
      }
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'Head of Product Design',
      department: 'Design & UX',
      image: '/assets/images/team3.jpg',
      bio: 'Emily ensures our solutions are intuitive and user-friendly for busy healthcare professionals.',
      specialties: ['UX Design', 'Healthcare UI', 'User Research'],
      social: {
        linkedin: '#',
        email: 'emily.rodriguez@insitehealth.com',
        phone: '#'
      }
    },
    {
      id: 4,
      name: 'James Wilson',
      position: 'VP of Customer Success',
      department: 'Customer Relations',
      image: '/assets/images/team4.jpg',
      bio: 'James works directly with hospitals to ensure successful implementation and ongoing satisfaction.',
      specialties: ['Customer Success', 'Implementation', 'Training'],
      social: {
        linkedin: '#',
        email: 'james.wilson@insitehealth.com',
        phone: '#'
      }
    },
    {
      id: 5,
      name: 'Dr. Priya Patel',
      position: 'Head of Data Science',
      department: 'Analytics',
      image: '/assets/images/team5.jpg',
      bio: 'Dr. Patel develops the AI and analytics that power our predictive equipment management features.',
      specialties: ['Machine Learning', 'Healthcare Analytics', 'Predictive Modeling'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'priya.patel@insitehealth.com'
      }
    },
    {
      id: 6,
      name: 'Robert Thompson',
      position: 'VP of Sales',
      department: 'Business Development',
      image: '/assets/images/team6.jpg',
      bio: 'Robert helps healthcare organizations discover how InSite can transform their operations.',
      specialties: ['Healthcare Sales', 'Business Development', 'Strategic Partnerships'],
      social: {
        linkedin: '#',
        email: 'robert.thompson@insitehealth.com',
        phone: '#'
      }
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Meet Our Expert Team
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our diverse team combines healthcare expertise with cutting-edge technology 
            to deliver solutions that truly understand your needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group relative bg-white rounded-2xl shadow-soft hover:shadow-strong transition-all duration-300 overflow-hidden"
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback to a gradient background if image fails to load
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'block';
                  }}
                />
                {/* Fallback gradient background */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-insite-blue to-insite-cyan hidden"
                  style={{ display: 'none' }}
                >
                  <div className="flex items-center justify-center h-full text-white text-6xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>

                {/* Overlay on hover */}
                <div className={`absolute inset-0 bg-insite-blue/90 transition-opacity duration-300 ${
                  hoveredMember === member.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="flex flex-col justify-center h-full p-6 text-white">
                    <h4 className="text-lg font-semibold mb-3">Specialties:</h4>
                    <ul className="space-y-2">
                      {member.specialties.map((specialty, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-insite-cyan rounded-full"></div>
                          <span>{specialty}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Department Badge */}
                <div className="absolute top-4 left-4 bg-insite-cyan text-white px-3 py-1 rounded-full text-sm font-medium">
                  {member.department}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {member.name}
                </h3>
                <p className="text-insite-blue font-semibold mb-3">
                  {member.position}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      className="w-8 h-8 bg-gray-100 hover:bg-insite-blue hover:text-white rounded-full flex items-center justify-center transition-all duration-200"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      className="w-8 h-8 bg-gray-100 hover:bg-insite-cyan hover:text-white rounded-full flex items-center justify-center transition-all duration-200"
                      aria-label={`${member.name} Twitter`}
                    >
                      <MessageCircle size={16} />
                    </a>
                  )}
                  {member.social.email && (
                    <a
                      href={`mailto:${member.social.email}`}
                      className="w-8 h-8 bg-gray-100 hover:bg-insite-orange hover:text-white rounded-full flex items-center justify-center transition-all duration-200"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail size={16} />
                    </a>
                  )}
                  {member.social.phone && (
                    <a
                      href={member.social.phone}
                      className="w-8 h-8 bg-gray-100 hover:bg-green-500 hover:text-white rounded-full flex items-center justify-center transition-all duration-200"
                      aria-label={`Call ${member.name}`}
                    >
                      <Phone size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-background-section rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Join Our Mission?
            </h3>
            <p className="text-gray-600 mb-6">
              We're always looking for talented individuals who share our passion for improving healthcare through technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#careers"
                className="btn-primary inline-flex items-center justify-center"
              >
                View Open Positions
              </a>
              <a
                href="#contact"
                className="btn-outline inline-flex items-center justify-center"
              >
                Contact Our Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;