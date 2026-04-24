import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

// ─── Initials Avatar ─────────────────────────────────────────────────────────
const AVATAR_COLORS = [
  '#1E40AF', // blue-800
  '#0E7490', // cyan-700
  '#1D4ED8', // blue-700
  '#0369A1', // sky-700
  '#4338CA', // indigo-700
  '#0F766E', // teal-700
  '#1E3A5F', // navy
  '#065F46', // emerald-800
];

const getInitialsColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

const getInitials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

// ─── Avatar ───────────────────────────────────────────────────────────────────
const Avatar = ({ name, size = 'md' }) => {
  const bg = getInitialsColor(name);
  const initials = getInitials(name);
  const sizeClasses = {
    sm: 'w-12 h-12 text-sm',
    md: 'w-16 h-16 text-lg',
    lg: 'w-20 h-20 text-xl',
    xl: 'w-24 h-24 text-2xl',
  };
  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}
      style={{ backgroundColor: bg }}
    >
      {initials}
    </div>
  );
};

// ─── Principal Card ───────────────────────────────────────────────────────────
const PrincipalCard = ({ member }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
    <div className="h-2 bg-gradient-to-r from-insite-blue to-insite-cyan" />
    <div className="p-8 md:p-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Avatar + name */}
        <div className="flex flex-col items-center md:items-start gap-4 md:w-56 flex-shrink-0">
          <Avatar name={member.name} size="xl" />
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
            <p className="text-insite-blue font-semibold mt-1">{member.title}</p>
            <p className="text-gray-500 text-sm mt-1 italic">{member.role}</p>
          </div>
        </div>

        {/* Bio + expertise */}
        <div className="flex-1">
          <p className="text-gray-600 leading-relaxed mb-6">{member.bio}</p>
          {member.expertise && member.expertise.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {member.expertise.map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-insite-blue rounded-full text-sm font-medium border border-blue-100"
                >
                  <CheckCircle className="h-3.5 w-3.5 flex-shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

// ─── Executive Card ───────────────────────────────────────────────────────────
const ExecutiveCard = ({ member, bioComingSoon }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col">
    <div className="h-1.5 bg-gradient-to-r from-insite-blue to-insite-cyan" />
    <div className="p-6 flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <Avatar name={member.name} size="md" />
        <div>
          <h3 className="font-bold text-gray-900 leading-tight">{member.name}</h3>
          <p className="text-insite-blue text-sm font-semibold mt-0.5">{member.title}</p>
          <p className="text-gray-400 text-xs mt-0.5 italic">{member.role}</p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">
        {member.bio || bioComingSoon}
      </p>

      {/* Expertise chips */}
      {member.expertise && member.expertise.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100">
          {member.expertise.map((item, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-gray-50 text-gray-600 rounded-md text-xs border border-gray-200"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  </div>
);

// ─── Clinical Card ────────────────────────────────────────────────────────────
const ClinicalCard = ({ member, bioComingSoon }) => (
  <div className="bg-white rounded-xl shadow-md border border-teal-100 overflow-hidden flex flex-col">
    <div className="h-1.5 bg-gradient-to-r from-teal-500 to-teal-300" />
    <div className="p-6 flex flex-col flex-1">
      <div className="flex items-center gap-4 mb-3">
        <Avatar name={member.name} size="md" />
        <div>
          <h3 className="font-bold text-gray-900">{member.name}</h3>
          <p className="text-teal-700 text-sm font-semibold mt-0.5">{member.title}</p>
        </div>
      </div>
      <p className="text-gray-500 text-sm leading-relaxed italic">
        {member.bio || bioComingSoon}
      </p>
    </div>
  </div>
);

// ─── Dev Card ─────────────────────────────────────────────────────────────────
const DevCard = ({ member }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 p-5 flex items-center gap-4">
    <Avatar name={member.name} size="sm" />
    <div>
      <h4 className="font-semibold text-gray-900 text-sm">{member.name}</h4>
      <p className="text-gray-500 text-xs mt-0.5">{member.title}</p>
    </div>
  </div>
);

// ─── Section Heading ──────────────────────────────────────────────────────────
const SectionHeading = ({ label, badge }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="h-px flex-1 bg-gray-200" />
    <div className="flex items-center gap-2">
      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest">
        {label}
      </h2>
      {badge && (
        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold border border-amber-200">
          {badge}
        </span>
      )}
    </div>
    <div className="h-px flex-1 bg-gray-200" />
  </div>
);

// ─── TeamPage ─────────────────────────────────────────────────────────────────
const TeamPage = () => {
  const { t } = useTranslation();

  const principal  = t('team.members.principal',  { returnObjects: true }) || [];
  const executive  = t('team.members.executive',  { returnObjects: true }) || [];
  const clinical   = t('team.members.clinical',   { returnObjects: true }) || [];
  const dev        = t('team.members.dev',         { returnObjects: true }) || [];
  const stats      = t('team.stats',               { returnObjects: true }) || [];
  const philosophy = t('team.philosophyItems',     { returnObjects: true }) || [];
  const bioComingSoon = t('team.bioComingSoon');

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ── */}
      <div className="bg-insite-blue py-16">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('team.title')}
            </h1>
            <div className="flex items-center justify-center space-x-2 text-white/80 text-sm mb-4">
              <Link to="/" className="hover:text-white transition-colors">
                {t('nav.home')}
              </Link>
              <span>/</span>
              <span className="text-insite-cyan">{t('nav.team')}</span>
            </div>
            <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
              {t('team.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      {stats.length > 0 && (
        <div className="bg-gradient-to-r from-insite-blue/90 to-insite-blue/80">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
              {stats.map((stat, i) => (
                <div key={i} className="text-center py-6 px-4">
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-white/70 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="container-custom py-16 space-y-20">

        {/* ── Section 1: Principal ── */}
        {principal.length > 0 && (
          <section>
            <SectionHeading label={t('team.sectionPrincipal')} />
            <div className="max-w-4xl mx-auto">
              {principal.map((member, i) => (
                <PrincipalCard key={i} member={member} />
              ))}
            </div>
          </section>
        )}

        {/* ── Section 2: Executive Leadership ── */}
        {executive.length > 0 && (
          <section>
            <SectionHeading label={t('team.sectionExecutive')} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {executive.map((member, i) => (
                <ExecutiveCard key={i} member={member} bioComingSoon={bioComingSoon} />
              ))}
            </div>
          </section>
        )}

        {/* ── Section 3: Clinical Advisory ── */}
        {/* {clinical.length > 0 && (
          <section>
            <SectionHeading
              label={t('team.sectionClinical')}
              badge={t('team.sectionClinicalBadge')}
            />
            <p className="text-gray-500 text-sm text-center max-w-2xl mx-auto mb-8 leading-relaxed">
              {t('team.sectionClinicalNote')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {clinical.map((member, i) => (
                <ClinicalCard key={i} member={member} bioComingSoon={bioComingSoon} />
              ))}
            </div>
          </section>
        )} */}

        {/* ── Section 4: Dev & Support ── */}
        {dev.length > 0 && (
          <section>
            <SectionHeading label={t('team.sectionDev')} />
            <p className="text-gray-500 text-sm text-center max-w-2xl mx-auto mb-8 leading-relaxed">
              {t('team.sectionDevNote')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dev.map((member, i) => (
                <DevCard key={i} member={member} />
              ))}
            </div>
          </section>
        )}

        {/* ── Leadership Philosophy ── */}
        {philosophy.length > 0 && (
          <section>
            <SectionHeading label={t('team.philosophy')} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {philosophy.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-insite-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-insite-blue" />
                  </div>
                  <p className="text-gray-700 font-medium text-sm leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* ── Join CTA ── */}
      <section className="bg-white border-t border-gray-200 py-16">
        <div className="container-custom">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {t('team.joinMission')}
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">{t('team.joinDesc')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/contact"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                {t('team.viewPositions')}
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="btn-outline inline-flex items-center justify-center"
              >
                {t('team.contactTeam')}
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-gray-500">
              <div className="flex items-center justify-center gap-2">
                <Mail className="h-4 w-4 text-insite-blue" />
                <span>careers@insite.health</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Phone className="h-4 w-4 text-insite-blue" />
                <span>(858) 366-3838</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4 text-insite-blue" />
                <span>Southern California</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default TeamPage;
