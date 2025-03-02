"use client"

import type React from "react"
import { useState } from "react"
import { z } from "zod"

const countries = [
  { code: "AT", name: "Austria", dialCode: "+43", flag: "🇦🇹" },
  { code: "BE", name: "Belgium", dialCode: "+32", flag: "🇧🇪" },
  { code: "BG", name: "Bulgaria", dialCode: "+359", flag: "🇧🇬" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { code: "CN", name: "China", dialCode: "+86", flag: "🇨🇳" },
  { code: "CY", name: "Cyprus", dialCode: "+357", flag: "🇨🇾" },
  { code: "CZ", name: "Czech Republic", dialCode: "+420", flag: "🇨🇿" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "DK", name: "Denmark", dialCode: "+45", flag: "🇩🇰" },
  { code: "EE", name: "Estonia", dialCode: "+372", flag: "🇪🇪" },
  { code: "ES", name: "Spain", dialCode: "+34", flag: "🇪🇸" },
  { code: "FI", name: "Finland", dialCode: "+358", flag: "🇫🇮" },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "GR", name: "Greece", dialCode: "+30", flag: "🇬🇷" },
  { code: "HR", name: "Croatia", dialCode: "+385", flag: "🇭🇷" },
  { code: "HU", name: "Hungary", dialCode: "+36", flag: "🇭🇺" },
  { code: "IE", name: "Ireland", dialCode: "+353", flag: "🇮🇪" },
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
  { code: "IT", name: "Italy", dialCode: "+39", flag: "🇮🇹" },
  { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
  { code: "KR", name: "South Korea", dialCode: "+82", flag: "🇰🇷" },
  { code: "LT", name: "Lithuania", dialCode: "+370", flag: "🇱🇹" },
  { code: "LV", name: "Latvia", dialCode: "+371", flag: "🇱🇻" },
  { code: "MT", name: "Malta", dialCode: "+356", flag: "🇲🇹" },
  { code: "MY", name: "Malaysia", dialCode: "+60", flag: "🇲🇾" },
  { code: "NL", name: "Netherlands", dialCode: "+31", flag: "🇳🇱" },
  { code: "NO", name: "Norway", dialCode: "+47", flag: "🇳🇴" },
  { code: "PH", name: "Philippines", dialCode: "+63", flag: "🇵🇭" },
  { code: "PK", name: "Pakistan", dialCode: "+92", flag: "🇵🇰" },
  { code: "PL", name: "Poland", dialCode: "+48", flag: "🇵🇱" },
  { code: "PT", name: "Portugal", dialCode: "+351", flag: "🇵🇹" },
  { code: "RO", name: "Romania", dialCode: "+40", flag: "🇷🇴" },
  { code: "SE", name: "Sweden", dialCode: "+46", flag: "🇸🇪" },
  { code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬" },
  { code: "SI", name: "Slovenia", dialCode: "+386", flag: "🇸🇮" },
  { code: "SK", name: "Slovakia", dialCode: "+421", flag: "🇸🇰" },
  { code: "TH", name: "Thailand", dialCode: "+66", flag: "🇹🇭" },
  { code: "UK", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "VN", name: "Vietnam", dialCode: "+84", flag: "🇻🇳" },
]

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  cv: z.any().optional(),
  countryCode: z.string(),
})

type FormData = z.infer<typeof formSchema>

export default function ApplicationForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    cv: undefined,
    countryCode: "IN"
  })
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const validateForm = (): boolean => {
    try {
      formSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof FormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof FormData] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Form submitted:", formData)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, cv: e.target.files![0] }))
    }
  }

  const handleCountrySelect = (code: string) => {
    setFormData((prev) => ({ ...prev, countryCode: code }))
    setIsCountryDropdownOpen(false)
  }

  const selectedCountry = countries.find(country => country.code === formData.countryCode)

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Cannot find a role that fits you?</h1>
        <p className="text-gray-600 text-base">
          Send us your application, and we&apos;ll reach out if there&apos;s a role that&apos;s the right fit for you
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-600">
            Full name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-300"
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-300"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
            Phone number *
          </label>
          <div className="space-y-3 md:flex gap-3">
            <div className="relative flex">
              <button
                type="button"
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className="h-full px-3 py-2.5 border border-gray-200 rounded-md bg-white flex items-center gap-2 min-w-[120px]"
              >
                <span className="text-xl">{selectedCountry?.flag}</span>
                <span className="text-sm text-gray-600">{selectedCountry?.dialCode}</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isCountryDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 max-h-64 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {countries.map(country => (
                    <button
                      key={country.code}
                      type="button"
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                      onClick={() => handleCountrySelect(country.code)}
                    >
                      <span className="text-xl">{country.flag}</span>
                      <span className="text-sm text-gray-600">{country.name}</span>
                      <span className="text-sm text-gray-400">{country.dialCode}</span>
                    </button>
                  ))}
                </div>
              )}

              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="flex-1 px-1 md:px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-300"
                placeholder="Enter your phone number"
              />
            </div>

            <label
              htmlFor="cv"
              className="inline-flex items-center px-4 py-2 bg-[#EBE2FF] text-[#4F4F4F] rounded-lg cursor-pointer gap-2"
            >
              <svg className="w-5 h-5 text-[#6438C3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
              Attach CV / Portfolio
              <input
                type="file"
                id="cv"
                name="cv"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx"
              />
            </label>
          </div>
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="w-full md:w-32 px-4 py-2.5 font-bold bg-gray-200 text-gray-600 rounded-md hover:bg-[#6438C3] hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  )
}