// Portfolio Website JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initNavigation()
  initPortfolioFilter()
  initChatbot()
  initAnimations()
  initSkillBars()
})

// Navigation functionality
function initNavigation() {
  const navbar = document.querySelector(".navbar")
  const navLinks = document.querySelectorAll(".nav-link")

  // Add active class to current page
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = "rgba(37, 99, 235, 0.98)"
    } else {
      navbar.style.backgroundColor = "rgba(37, 99, 235, 0.95)"
    }
  })
}

// Portfolio filter functionality
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll("[data-filter]")
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  if (filterButtons.length === 0) return

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter")

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      // Filter portfolio items
      portfolioItems.forEach((item) => {
        const categories = item.getAttribute("data-category").split(" ")

        if (filter === "all" || categories.includes(filter)) {
          item.style.display = "block"
          item.classList.add("fade-in")
        } else {
          item.style.display = "none"
          item.classList.remove("fade-in")
        }
      })
    })
  })
}

// Chatbot functionality
function initChatbot() {
  const chatbotToggle = document.getElementById("chatbot-toggle")
  const chatbotWindow = document.getElementById("chatbot-window")
  const chatbotClose = document.getElementById("chatbot-close")
  const chatbotInput = document.getElementById("chatbot-input")
  const chatbotSend = document.getElementById("chatbot-send")
  const chatbotMessages = document.getElementById("chatbot-messages")

  if (!chatbotToggle) return

  // Toggle chatbot window
  chatbotToggle.addEventListener("click", () => {
    chatbotWindow.classList.toggle("active")
    if (chatbotWindow.classList.contains("active")) {
      chatbotInput.focus()
    }
  })

  // Close chatbot
  chatbotClose.addEventListener("click", () => {
    chatbotWindow.classList.remove("active")
  })

  // Send message functionality
  function sendMessage() {
    const message = chatbotInput.value.trim()
    if (message === "") return

    // Add user message
    addMessage(message, "user")
    chatbotInput.value = ""

    // Simulate bot response
    setTimeout(() => {
      const response = generateBotResponse(message)
      addMessage(response, "bot")
    }, 1000)
  }

  // Add message to chat
  function addMessage(text, sender) {
    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${sender}-message`

    if (sender === "bot") {
      messageDiv.innerHTML = `<i class="bi bi-robot me-2"></i>${text}`
    } else {
      messageDiv.textContent = text
    }

    chatbotMessages.appendChild(messageDiv)
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight
  }

  // Generate bot responses
  function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase()

    const responses = {
      greeting: [
        "Hello! I'm Alex's AI assistant. How can I help you today?",
        "Hi there! I'm here to help you learn more about Alex's work and experience.",
        "Welcome! I'm Alex's virtual assistant. What would you like to know?",
      ],
      skills: [
        "Alex specializes in UX/UI design with a focus on AI integration. He's proficient in Figma, Adobe Creative Suite, React, and machine learning technologies.",
        "Alex has expertise in user research, prototyping, frontend development, and AI-powered interface design. He's also skilled in Python and TensorFlow.",
        "His technical skills include design tools like Figma and Adobe CC, development with React and Node.js, and AI technologies like TensorFlow and OpenAI API.",
      ],
      experience: [
        "Alex has over 3 years of experience in UX/UI design, with a Master's degree from Stanford in Human-Computer Interaction.",
        "He has worked on 15+ projects, ranging from e-commerce platforms to AI-powered mobile apps, serving 50+ happy clients.",
        "Alex's experience spans web design, mobile app development, and cutting-edge AI integration in user interfaces.",
      ],
      education: [
        "Alex holds a Master's degree in Human-Computer Interaction from Stanford University and a Bachelor's in Graphic Design from UC Berkeley.",
        "He graduated with a 3.9 GPA from Stanford, where he specialized in AI-driven user interfaces and received the Outstanding Thesis Award.",
        "His educational background combines design fundamentals with advanced HCI research and AI applications in UX design.",
      ],
      contact: [
        "You can reach Alex at alex@example.com or call him at +1 (234) 567-8900. He's based in San Francisco, CA.",
        "Alex is available for freelance projects. Contact him via email at alex@example.com or through his LinkedIn profile.",
        "Feel free to get in touch with Alex through the contact information on his About page, or connect with him on social media.",
      ],
      projects: [
        "Alex has worked on various projects including an AI-powered e-commerce platform, health tracking app, analytics dashboard, and conversational AI interfaces.",
        "His portfolio showcases web applications, mobile apps, and AI integrations. Each project demonstrates his user-centered design approach.",
        "Recent projects include an intelligent shopping platform, AI health tracker, and corporate website redesigns with focus on UX optimization.",
      ],
      default: [
        "That's an interesting question! You can find more detailed information about Alex on his portfolio pages.",
        "I'd be happy to help you learn more about Alex's work. Try asking about his skills, experience, or projects!",
        "For specific details, I recommend checking out Alex's portfolio sections. Is there something particular you'd like to know?",
        "Alex would be happy to discuss this further. You can contact him directly through the information on his About page.",
      ],
    }

    // Determine response category
    let category = "default"

    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      category = "greeting"
    } else if (message.includes("skill") || message.includes("technology") || message.includes("tool")) {
      category = "skills"
    } else if (message.includes("experience") || message.includes("work") || message.includes("career")) {
      category = "experience"
    } else if (
      message.includes("education") ||
      message.includes("degree") ||
      message.includes("school") ||
      message.includes("university")
    ) {
      category = "education"
    } else if (
      message.includes("contact") ||
      message.includes("email") ||
      message.includes("phone") ||
      message.includes("reach")
    ) {
      category = "contact"
    } else if (message.includes("project") || message.includes("portfolio") || message.includes("work")) {
      category = "projects"
    }

    // Return random response from category
    const categoryResponses = responses[category]
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)]
  }

  // Event listeners
  chatbotSend.addEventListener("click", sendMessage)
  chatbotInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  })

  // Close chatbot when clicking outside
  document.addEventListener("click", (e) => {
    if (!chatbotWindow.contains(e.target) && !chatbotToggle.contains(e.target)) {
      chatbotWindow.classList.remove("active")
    }
  })
}

// Animation functionality
function initAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".card, .stat-card, .philosophy-card, .quality-card, .certification-card, .achievement-card",
  )
  animatedElements.forEach((el) => {
    observer.observe(el)
  })

  // Floating animation for hero icons
  const floatingIcons = document.querySelectorAll(".floating-icon")
  floatingIcons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.5}s`
  })
}

// Skill bars animation
function initSkillBars() {
  const skillBars = document.querySelectorAll(".progress-bar")

  if (skillBars.length === 0) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target
          const width = progressBar.style.width
          progressBar.style.width = "0%"

          setTimeout(() => {
            progressBar.style.width = width
          }, 200)
        }
      })
    },
    { threshold: 0.5 },
  )

  skillBars.forEach((bar) => {
    observer.observe(bar)
  })
}

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Form validation (if forms exist)
function validateForm(form) {
  const inputs = form.querySelectorAll("input[required], textarea[required]")
  let isValid = true

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.classList.add("is-invalid")
      isValid = false
    } else {
      input.classList.remove("is-invalid")
    }
  })

  return isValid
}

// Loading animation
function showLoading() {
  const loader = document.createElement("div")
  loader.className = "loading-spinner"
  loader.innerHTML =
    '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>'
  document.body.appendChild(loader)
}

function hideLoading() {
  const loader = document.querySelector(".loading-spinner")
  if (loader) {
    loader.remove()
  }
}

// Error handling
window.addEventListener("error", (e) => {
  console.error("An error occurred:", e.error)
})

// Performance monitoring
window.addEventListener("load", () => {
  const loadTime = performance.now()
  console.log(`Page loaded in ${loadTime.toFixed(2)}ms`)
})
