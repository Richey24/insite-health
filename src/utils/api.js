// API utility functions for REST API endpoints

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.insitehealthsystem.com';

// Generic API request function
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('API request failed:', error);
    return { 
      success: false, 
      error: error.message || 'An error occurred while processing your request' 
    };
  }
}

// Submit appointment form
export async function submitAppointment(formData) {
  return apiRequest('/appointments', {
    method: 'POST',
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      organization: formData.organization,
      appointmentType: formData.appointmentType,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      // ContactPage.jsx also registers patientType, gender, department — include both field sets
      patientType: formData.patientType,
      gender: formData.gender,
      department: formData.department,
      message: formData.message,
      comment: formData.comment,
      submittedAt: new Date().toISOString(),
    }),
  });
}



// Submit contact form
export async function submitContact(formData) {
  return apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      submittedAt: new Date().toISOString(),
    }),
  });
}

// Submit contact form (alternative name for compatibility)
export async function submitContactForm(formData) {
  return submitContact(formData);
}

// Submit newsletter subscription
export async function submitNewsletter(formData) {
  return apiRequest('/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify({
      email: formData.email,
      subscribedAt: new Date().toISOString(),
    }),
  });
}

// Subscribe to newsletter (alternative name for compatibility)  
export async function subscribeNewsletter(email) {
  return submitNewsletter({ email });
}

// Get blog posts (for future use)
export async function getBlogPosts(limit = 4) {
  return apiRequest(`/blog/posts?limit=${limit}`);
}

// Get team members (for future use)
export async function getTeamMembers() {
  return apiRequest('/team/members');
}

// Submit pilot consultation request
export async function submitPilotConsultation(formData) {
  return apiRequest('/pilot/consultation', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}