import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, User, Mail, Phone, AlertTriangle } from 'lucide-react';

// ─── Equipment data ────────────────────────────────────────────────────────────
const EQUIPMENT_CATEGORIES = [
  {
    id: 'mobility',
    label: 'Mobility & Patient Support',
    icon: '🚑',
    recommended: true,
    owningDept: 'Nursing / Facilities',
    defaultQty: 15,
    items: [
      'Wheelchairs',
      'Transport chairs',
      'Stretchers / gurneys',
      'Bariatric wheelchairs',
      'Patient lifts (Hoyer lifts)',
      'Slings',
      'Bassinets',
    ],
  },
  {
    id: 'infusion',
    label: 'Infusion & Monitoring',
    icon: '💉',
    recommended: true,
    owningDept: 'Biomed',
    defaultQty: 8,
    items: [
      'IV pumps',
      'PCA pumps',
      'Feeding pumps (enteral)',
      'Syringe pumps',
      'Vital sign monitors',
      'Telemetry units',
      'Portable ECG machines',
    ],
  },
  {
    id: 'respiratory',
    label: 'Respiratory & Critical Care',
    icon: '🫁',
    recommended: true,
    owningDept: 'Respiratory / ICU',
    defaultQty: 5,
    items: [
      'Ventilators',
      'BiPAP / CPAP machines',
      'Oxygen concentrators',
      'Oxygen tanks',
      'Respiratory therapy carts',
      'ECMO support equipment',
      'Dialysis machines',
      'Anesthesia carts',
    ],
  },
  {
    id: 'imaging',
    label: 'Portable Imaging & Diagnostics',
    icon: '🩻',
    recommended: false,
    owningDept: 'Radiology',
    defaultQty: 3,
    items: [
      'Portable imaging systems',
      'Portable X-ray machines',
      'Ultrasound carts',
      'C-arms',
      'Bladder scanners',
      'EKG carts',
      'Portable lab analyzers',
    ],
  },
  {
    id: 'carts',
    label: 'Carts & Supplies',
    icon: '🧹',
    recommended: false,
    owningDept: 'EVS / Facilities',
    defaultQty: 5,
    items: [
      'Crash carts (code carts)',
      'Medication carts',
      'Isolation carts',
      'Supply carts',
      'Linen carts',
    ],
  },
  {
    id: 'computing',
    label: 'Mobile Computing',
    icon: '💻',
    recommended: false,
    owningDept: 'IT',
    defaultQty: 5,
    items: [
      'Workstations on Wheels (WOWs / COWs)',
      'Mobile computer carts',
      'Tablet carts',
    ],
  },
  {
    id: 'other',
    label: 'Other Mobile Equipment',
    icon: '🔧',
    recommended: false,
    owningDept: 'Biomed / Facilities',
    defaultQty: 5,
    items: ['IV poles', 'Patient warming devices', 'Specialty beds'],
  },
];

const CRITERIA_FIELDS = [
  { key: 'sharedAcrossUnits',    label: 'Shared Across Units' },
  { key: 'frequentlySearched',   label: 'Frequently Searched' },
  { key: 'mobileDaily',          label: 'Mobile Daily' },
  { key: 'causesDelays',         label: 'Causes Delays' },
  { key: 'influencesPurchasing', label: 'Influences Purchasing' },
];

// ─── Initial state helpers ──────────────────────────────────────────────────────
function buildInitialCheckedItems() {
  const map = {};
  EQUIPMENT_CATEGORIES.forEach((cat) =>
    cat.items.forEach((item) => {
      map[item] = { checked: false, qty: cat.defaultQty };
    })
  );
  return map;
}

function buildInitialCriteria() {
  const map = {};
  EQUIPMENT_CATEGORIES.forEach((cat) =>
    cat.items.forEach((item) => {
      map[item] = {
        sharedAcrossUnits: false,
        frequentlySearched: false,
        mobileDaily: false,
        causesDelays: false,
        influencesPurchasing: false,
      };
    })
  );
  return map;
}

function buildInitialStakeholders() {
  const map = {};
  EQUIPMENT_CATEGORIES.forEach((cat) =>
    cat.items.forEach((item) => {
      map[item] = '';
    })
  );
  return map;
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function PilotSetup() {
  // Contact
  const [contact, setContact] = useState({
    hospitalName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  });

  // Equipment
  const [checkedItems, setCheckedItems] = useState(buildInitialCheckedItems);

  // Criteria
  const [criteria, setCriteria] = useState(buildInitialCriteria);

  // Stakeholders
  const [stakeholders, setStakeholders] = useState(buildInitialStakeholders);

  // Sign-offs + misc
  const [signoffs, setSignoffs] = useState({
    pilotUnit: '',
    installationDate: '',
    notes: '',
    listApproved: false,
    tagsConfirmed: false,
    unitConfirmed: false,
    dateScheduled: false,
  });

  // UI
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ── Derived ────────────────────────────────────────────────────────────────
  const selectedItems = Object.entries(checkedItems)
    .filter(([, v]) => v.checked)
    .map(([item]) => item);

  const totalAssets = Object.values(checkedItems)
    .filter((v) => v.checked)
    .reduce((sum, v) => sum + (Number(v.qty) || 0), 0);

  const owningDeptFor = (itemLabel) => {
    for (const cat of EQUIPMENT_CATEGORIES) {
      if (cat.items.includes(itemLabel)) return cat.owningDept;
    }
    return '';
  };

  const criteriaScore = (itemLabel) =>
    Object.values(criteria[itemLabel]).filter(Boolean).length;

  const canSubmit =
    contact.hospitalName.trim() &&
    contact.contactName.trim() &&
    contact.contactEmail.trim();

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleContact = (e) =>
    setContact((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCheckItem = (item, catDefaultQty) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: {
        checked: !prev[item].checked,
        qty: prev[item].checked ? catDefaultQty : prev[item].qty,
      },
    }));
  };

  const handleQty = (item, value) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: { ...prev[item], qty: Math.max(1, parseInt(value, 10) || 1) },
    }));
  };

  const handleCriteria = (item, field) => {
    setCriteria((prev) => ({
      ...prev,
      [item]: { ...prev[item], [field]: !prev[item][field] },
    }));
  };

  const handleStakeholder = (item, value) => {
    setStakeholders((prev) => ({ ...prev, [item]: value }));
  };

  const handleSignoff = (e) => {
    const { name, value, type, checked } = e.target;
    setSignoffs((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);

    const quantities = {};
    selectedItems.forEach((item) => {
      quantities[item] = checkedItems[item].qty;
    });

    const payload = {
      hospitalName: contact.hospitalName.trim(),
      contactName: contact.contactName.trim(),
      contactEmail: contact.contactEmail.trim(),
      contactPhone: contact.contactPhone.trim(),
      selectedEquipment: selectedItems,
      quantities,
      criteria: selectedItems.map((item) => ({
        device: item,
        ...criteria[item],
      })),
      stakeholders: selectedItems.map((item) => ({
        device: item,
        department: owningDeptFor(item),
        stakeholder: stakeholders[item],
      })),
      pilotUnit: signoffs.pilotUnit.trim(),
      installationDate: signoffs.installationDate,
      notes: signoffs.notes.trim(),
      signOffs: {
        listApproved: signoffs.listApproved,
        tagsConfirmed: signoffs.tagsConfirmed,
        unitConfirmed: signoffs.unitConfirmed,
        dateScheduled: signoffs.dateScheduled,
      },
    };

    try {
      const base =
        import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';
      const res = await fetch(`${base}/api/pilot/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || `Server error ${res.status}`);
      }
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Confirmation screen ────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center px-4 py-24">
        <div className="max-w-lg w-full text-center bg-white rounded-2xl shadow-medium p-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Submission Received!
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Thank you,{' '}
            <span className="font-semibold text-insite-blue">
              {contact.contactName}
            </span>
            .
          </p>
          <p className="text-gray-500 mb-8">
            We'll be in touch within{' '}
            <span className="font-semibold text-gray-700">1 business day</span>{' '}
            to begin setting up your pilot at{' '}
            <span className="font-semibold text-gray-700">
              {contact.hospitalName}
            </span>
            .
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-3 bg-insite-blue text-white font-semibold rounded-lg hover:bg-insite-blue/90 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // ── Main form ──────────────────────────────────────────────────────────────
  return (
    <div className="bg-background-light min-h-screen">
      {/* ── Hero banner ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-insite-blue to-insite-blue/90 py-16">
        <div className="container-custom text-center">
          <p className="text-insite-cyan uppercase tracking-widest text-sm font-semibold mb-3">
            InSite Health Systems
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Pilot Equipment Setup
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Complete this form to configure your asset-tracking pilot. We'll
            review your selections and follow up within 1 business day.
          </p>
        </div>
      </section>

      <form onSubmit={handleSubmit} noValidate>
        <div className="container-custom py-16 max-w-4xl mx-auto space-y-14">

          {/* ── Section 1 — Best Practice callout + Contact ─────────────── */}
          <section>
            {/* Amber callout */}
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
              <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
              <p className="text-amber-800 text-sm font-medium">
                <span className="font-bold">Best Practice:</span> Start with
                wheelchairs + IV pumps + 1 high-value device for the most
                impactful first pilot.
              </p>
            </div>

            {/* Contact fields */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hospital Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="hospitalName"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-1.5"
                >
                  <Building2 className="w-4 h-4 text-insite-blue" />
                  Hospital / Facility Name
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="hospitalName"
                  name="hospitalName"
                  type="text"
                  required
                  value={contact.hospitalName}
                  onChange={handleContact}
                  placeholder="e.g. St. Mary's Medical Center"
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-insite-blue/40 focus:border-insite-blue transition"
                />
              </div>

              {/* Contact Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contactName"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-1.5"
                >
                  <User className="w-4 h-4 text-insite-blue" />
                  Contact Name
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="contactName"
                  name="contactName"
                  type="text"
                  required
                  value={contact.contactName}
                  onChange={handleContact}
                  placeholder="e.g. Jane Doe"
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-insite-blue/40 focus:border-insite-blue transition"
                />
              </div>

              {/* Contact Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contactEmail"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-1.5"
                >
                  <Mail className="w-4 h-4 text-insite-blue" />
                  Contact Email
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  required
                  value={contact.contactEmail}
                  onChange={handleContact}
                  placeholder="jane@hospital.org"
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-insite-blue/40 focus:border-insite-blue transition"
                />
              </div>

              {/* Contact Phone */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contactPhone"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-1.5"
                >
                  <Phone className="w-4 h-4 text-insite-blue" />
                  Contact Phone
                  <span className="text-gray-400 text-xs font-normal ml-1">
                    optional
                  </span>
                </label>
                <input
                  id="contactPhone"
                  name="contactPhone"
                  type="tel"
                  value={contact.contactPhone}
                  onChange={handleContact}
                  placeholder="(555) 000-0000"
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-insite-blue/40 focus:border-insite-blue transition"
                />
              </div>
            </div>
          </section>

          {/* ── Section 2 — Equipment Selection ─────────────────────────── */}
          <section>
            {/* Section header + running total */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Equipment Selection
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Check each device type you want to track. Adjust quantities
                  as needed.
                </p>
              </div>
              {/* Running total badge */}
              <div className="shrink-0 inline-flex items-center gap-2 bg-insite-blue/8 border border-insite-blue/20 text-insite-blue font-semibold text-sm px-4 py-2 rounded-full">
                <span className="text-xl font-bold">{totalAssets}</span>
                <span>asset{totalAssets !== 1 ? 's' : ''} selected</span>
              </div>
            </div>

            {/* Category cards */}
            <div className="space-y-5">
              {EQUIPMENT_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-soft overflow-hidden"
                >
                  {/* Card header */}
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-gray-50/60">
                    <span className="text-2xl leading-none">{cat.icon}</span>
                    <span className="font-semibold text-gray-900 text-base">
                      {cat.label}
                    </span>
                    <span className="text-xs text-gray-400 font-normal">
                      — {cat.owningDept}
                    </span>
                    {cat.recommended && (
                      <span className="ml-auto shrink-0 inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                        <svg
                          className="w-3 h-3"
                          viewBox="0 0 12 12"
                          fill="currentColor"
                        >
                          <path d="M6 1l1.545 3.09L11 4.635l-2.5 2.41.59 3.41L6 8.865l-3.09 1.59.59-3.41L1 4.635l3.455-.545z" />
                        </svg>
                        Recommended for first pilots
                      </span>
                    )}
                  </div>

                  {/* Item rows */}
                  <ul className="divide-y divide-gray-100">
                    {cat.items.map((item) => {
                      const state = checkedItems[item];
                      return (
                        <li
                          key={item}
                          className={`flex items-center gap-4 px-5 py-3 transition-colors ${
                            state.checked ? 'bg-insite-blue/4' : 'hover:bg-gray-50/80'
                          }`}
                        >
                          {/* Checkbox */}
                          <input
                            type="checkbox"
                            id={`item-${item}`}
                            checked={state.checked}
                            onChange={() =>
                              handleCheckItem(item, cat.defaultQty)
                            }
                            className="w-4 h-4 rounded border-gray-300 text-insite-blue focus:ring-insite-blue/40 cursor-pointer shrink-0"
                          />

                          {/* Label */}
                          <label
                            htmlFor={`item-${item}`}
                            className={`flex-1 text-sm cursor-pointer select-none ${
                              state.checked
                                ? 'text-gray-900 font-medium'
                                : 'text-gray-600'
                            }`}
                          >
                            {item}
                          </label>

                          {/* Quantity input — only visible when checked */}
                          {state.checked && (
                            <div className="flex items-center gap-2 shrink-0">
                              <label
                                htmlFor={`qty-${item}`}
                                className="text-xs text-gray-400 whitespace-nowrap"
                              >
                                Qty:
                              </label>
                              <input
                                id={`qty-${item}`}
                                type="number"
                                min={1}
                                value={state.qty}
                                onChange={(e) => handleQty(item, e.target.value)}
                                className="w-20 rounded-md border border-insite-blue/40 bg-white px-2 py-1 text-sm text-center text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-insite-blue/40 focus:border-insite-blue transition"
                              />
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ── Section 3 — Selection Criteria ──────────────────────────── */}
          {selectedItems.length > 0 && (
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Selection Criteria
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Answer yes/no for each selected device. A score of 3 or more
                  marks it a strong pilot candidate.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-soft overflow-x-auto">
                <table className="w-full text-sm min-w-[640px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-5 py-3 font-semibold text-gray-700 w-48">
                        Device
                      </th>
                      {CRITERIA_FIELDS.map((f) => (
                        <th
                          key={f.key}
                          className="text-center px-3 py-3 font-semibold text-gray-600 text-xs leading-tight whitespace-normal max-w-[100px]"
                        >
                          {f.label}
                        </th>
                      ))}
                      <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {selectedItems.map((item) => {
                      const score = criteriaScore(item);
                      const strong = score >= 3;
                      return (
                        <tr
                          key={item}
                          className="hover:bg-gray-50/60 transition-colors"
                        >
                          <td className="px-5 py-3 text-gray-800 font-medium text-sm">
                            {item}
                          </td>
                          {CRITERIA_FIELDS.map((f) => (
                            <td key={f.key} className="text-center px-3 py-3">
                              <button
                                type="button"
                                onClick={() => handleCriteria(item, f.key)}
                                aria-pressed={criteria[item][f.key]}
                                className={`w-8 h-8 rounded-full border-2 font-bold text-xs transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                                  criteria[item][f.key]
                                    ? 'bg-insite-blue border-insite-blue text-white focus:ring-insite-blue/40'
                                    : 'bg-white border-gray-300 text-gray-400 hover:border-insite-blue/50 focus:ring-gray-300'
                                }`}
                              >
                                {criteria[item][f.key] ? 'Y' : 'N'}
                              </button>
                            </td>
                          ))}
                          <td className="text-center px-4 py-3">
                            {strong ? (
                              <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                                <svg
                                  className="w-3 h-3"
                                  viewBox="0 0 12 12"
                                  fill="currentColor"
                                >
                                  <path d="M6 1l1.545 3.09L11 4.635l-2.5 2.41.59 3.41L6 8.865l-3.09 1.59.59-3.41L1 4.635l3.455-.545z" />
                                </svg>
                                Strong Candidate
                              </span>
                            ) : (
                              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-600 text-xs font-bold">
                                {score}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* ── Section 4 — Stakeholder Table ────────────────────────────── */}
          {selectedItems.length > 0 && (
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Stakeholder Assignments
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  For each selected device, name the stakeholder responsible
                  for coordinating during the pilot.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-soft overflow-x-auto">
                <table className="w-full text-sm min-w-[480px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-5 py-3 font-semibold text-gray-700">
                        Device
                      </th>
                      <th className="text-left px-5 py-3 font-semibold text-gray-700">
                        Owning Department
                      </th>
                      <th className="text-left px-5 py-3 font-semibold text-gray-700">
                        Stakeholder Name
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {selectedItems.map((item) => (
                      <tr
                        key={item}
                        className="hover:bg-gray-50/60 transition-colors"
                      >
                        <td className="px-5 py-3 text-gray-800 font-medium">
                          {item}
                        </td>
                        <td className="px-5 py-3 text-gray-500 text-xs">
                          {owningDeptFor(item)}
                        </td>
                        <td className="px-5 py-3">
                          <input
                            type="text"
                            value={stakeholders[item]}
                            onChange={(e) =>
                              handleStakeholder(item, e.target.value)
                            }
                            placeholder="Full name or role"
                            className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-insite-blue/40 focus:border-insite-blue transition"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* ── Section 5 — Pilot Details ─────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Pilot Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="pilotUnit"
                  className="text-sm font-semibold text-gray-700"
                >
                  Pilot Unit / Floor
                </label>
                <input
                  id="pilotUnit"
                  name="pilotUnit"
                  type="text"
                  value={signoffs.pilotUnit}
                  onChange={handleSignoff}
                  placeholder="e.g. 4 North ICU"
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-insite-blue/40 focus:border-insite-blue transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="installationDate"
                  className="text-sm font-semibold text-gray-700"
                >
                  Target Installation Date
                </label>
                <input
                  id="installationDate"
                  name="installationDate"
                  type="date"
                  value={signoffs.installationDate}
                  onChange={handleSignoff}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-insite-blue/40 focus:border-insite-blue transition"
                />
              </div>
            </div>
          </section>

          {/* ── Section 6 — Sign-offs ─────────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Pre-Launch Sign-offs
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Check each item once it has been confirmed on your end.
            </p>

            <div className="bg-white rounded-xl border border-gray-200 shadow-soft divide-y divide-gray-100">
              {[
                {
                  name: 'listApproved',
                  label: 'Equipment list approved by clinical/biomed leadership',
                },
                {
                  name: 'tagsConfirmed',
                  label: 'Asset tags / trackers confirmed and ordered',
                },
                {
                  name: 'unitConfirmed',
                  label: 'Pilot unit staff notified and confirmed',
                },
                {
                  name: 'dateScheduled',
                  label: 'Installation date scheduled with InSite team',
                },
              ].map(({ name, label }) => (
                <label
                  key={name}
                  className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50/60 transition-colors"
                >
                  <input
                    type="checkbox"
                    name={name}
                    checked={signoffs[name]}
                    onChange={handleSignoff}
                    className="w-4 h-4 rounded border-gray-300 text-insite-blue focus:ring-insite-blue/40 cursor-pointer shrink-0"
                  />
                  <span
                    className={`text-sm ${
                      signoffs[name]
                        ? 'text-gray-900 font-medium line-through decoration-green-500'
                        : 'text-gray-600'
                    }`}
                  >
                    {label}
                  </span>
                  {signoffs[name] && (
                    <svg
                      className="w-4 h-4 text-green-500 shrink-0 ml-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </label>
              ))}
            </div>
          </section>

          {/* ── Section 7 — Notes + Submit ────────────────────────────────── */}
          <section className="space-y-6">
            {/* Notes */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="notes"
                className="text-sm font-semibold text-gray-700"
              >
                Additional Notes
                <span className="text-gray-400 text-xs font-normal ml-1">
                  optional
                </span>
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                value={signoffs.notes}
                onChange={handleSignoff}
                placeholder="Any special requirements, constraints, or context for our team..."
                className="rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-insite-blue/40 focus:border-insite-blue transition resize-y"
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Submit row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
              <p className="text-xs text-gray-400">
                <span className="text-red-400">*</span> Hospital name, contact
                name, and email are required to submit.
              </p>
              <button
                type="submit"
                disabled={!canSubmit || loading}
                className={`inline-flex items-center justify-center gap-2 px-10 py-3 rounded-lg font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-insite-blue/50 ${
                  canSubmit && !loading
                    ? 'bg-insite-blue text-white hover:bg-insite-blue/90 shadow-md hover:shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  'Submit Pilot Setup'
                )}
              </button>
            </div>
          </section>

        </div>
      </form>
    </div>
  );
}
