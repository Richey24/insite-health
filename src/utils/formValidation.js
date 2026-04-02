// Form validation schemas using Yup
import * as yup from 'yup';

// Contact/Appointment form validation schema
export const appointmentSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  patientType: yup
    .string()
    .required('Please select patient type'),
  date: yup
    .string()
    .required('Please select a date'),
  gender: yup
    .string()
    .required('Please select gender'),
  service: yup
    .string()
    .required('Please select a service'),
  comment: yup
    .string()
    .max(500, 'Comment must be less than 500 characters'),
});

// Newsletter subscription validation schema
export const newsletterSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
});

// Contact validation (simpler form)
export const contactSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  subject: yup
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .required('Subject is required'),
  message: yup
    .string()
    .min(10, 'Message must be at least 10 characters')
    .required('Message is required'),
});