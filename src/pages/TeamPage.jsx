import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Share2, ExternalLink, Play, Mail, Phone, MapPin } from 'lucide-react';

const TeamPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Nicolas Poran",
      role: "Delivery Manager",
      image: "assets/images/team-1.jpg",
      bio: "Leading healthcare technology deployments with over 8 years of experience in medical device integration and system optimization.",
      socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        youtube: "#"
      }
    },
    {
      id: 2,
      name: "Froster Collings", 
      role: "CEO-Founder",
      image: "assets/images/team-2.jpg",
      bio: "Visionary leader with 15+ years in healthcare technology, dedicated to revolutionizing patient care through innovative solutions.",
      socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        youtube: "#"
      }
    },
    {
      id: 3,
      name: "Kerry Anderson",
      role: "24/7 Support Lead", 
      image: "assets/images/team-3.jpg",
      bio: "Healthcare support specialist ensuring continuous operation of critical medical systems with round-the-clock technical expertise.",
      socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        youtube: "#"
      }
    },
    {
      id: 4,
      name: "Richard Smith",
      role: "Technical Founder",
      image: "assets/images/team-4.jpg",
      bio: "Healthcare technology architect with deep expertise in HIPAA-compliant systems and medical device interoperability.",
      socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        youtube: "#"
      }
    },
    {
      id: 5,
      name: "Dr. Sarah Mitchell",
      role: "Chief Medical Officer",
      image: "assets/images/team-1.jpg",
      bio: "Board-certified physician bridging clinical practice and technology to improve patient outcomes and streamline healthcare workflows.",
      socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        youtube: "#"
      }
    },
    {
      id: 6,
      name: "Michael Chen",
      role: "Senior Systems Architect",
      image: "assets/images/team-2.jpg",
      bio: "Expert in healthcare IT infrastructure design, specializing in scalable, secure, and interoperable medical technology platforms.",
      socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        youtube: "#"
      }
    },
    {
      id: 7,
      name: "Jennifer Davis",
      role: "Implementation Specialist",
      image: "assets/images/team-3.jpg",
      bio: "Healthcare system integration expert with extensive experience in medical facility technology deployment and staff training.",
      socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        youtube: "#"
      }
    },
    {
      id: 8,
      name: "Robert Thompson",
      role: "Quality Assurance Director",
      image: "assets/images/team-4.jpg",
      bio: "Medical device testing and compliance specialist ensuring all InSite systems meet the highest healthcare industry standards.",
      socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        youtube: "#"
      }
    }
  ];

  const TeamCard = ({ member }) => (
    <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
      
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img 
          src={member.image} 
          alt={member.name}
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Social Media Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <a 
              href={member.socialLinks.facebook}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors"
              aria-label={`${member.name} Facebook`}
            >
              <Users className="h-5 w-5" />
            </a>
            <a 
              href={member.socialLinks.twitter}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors"
              aria-label={`${member.name} Twitter`}
            >
              <Share2 className="h-5 w-5" />
            </a>
            <a 
              href={member.socialLinks.instagram}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors"
              aria-label={`${member.name} Instagram`}
            >
              <ExternalLink className="h-5 w-5" />
            </a>
            <a 
              href={member.socialLinks.youtube}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors"
              aria-label={`${member.name} YouTube`}
            >
              <Play className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {member.name}
        </h3>
        <p className="text-primary font-semibold mb-3">
          {member.role}
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          {member.bio}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Section */}
      <div className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Team
            </h1>
            <div className="flex items-center justify-center space-x-2 text-white/90">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-accent">Team</span>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-lg font-semibold text-accent mb-3 tracking-wide uppercase">
              Team Members
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Our Expert Healthcare Team
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse team of healthcare technology experts, medical professionals, and 
              support specialists are dedicated to transforming healthcare through innovative solutions.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>

          {/* Join Our Team CTA */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join Our Growing Team
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals who are passionate about 
              transforming healthcare through technology and innovation.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Email Us</p>
                  <p className="text-gray-600">careers@insite.health</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Call Us</p>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Visit Us</p>
                  <p className="text-gray-600">Healthcare Innovation Hub</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact"
                className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center justify-center"
              >
                Get In Touch
              </Link>
              <a 
                href="mailto:careers@insite.health"
                className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors inline-flex items-center justify-center"
              >
                Send Your Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Team by the Numbers
            </h3>
            <p className="text-white/90 text-xl max-w-2xl mx-auto">
              The strength of our organization lies in the expertise and dedication of our team members.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">50+</div>
              <p className="text-white/90 font-medium">Team Members</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">15+</div>
              <p className="text-white/90 font-medium">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">200+</div>
              <p className="text-white/90 font-medium">Healthcare Clients</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">24/7</div>
              <p className="text-white/90 font-medium">Support Available</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;