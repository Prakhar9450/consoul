"use client"
import { ChangeEvent, useEffect, useState } from "react";

export const Form = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        website: '',
        designation: '',
        phone: '',
        countryCode: '+91',
    });

    const [selectedFlag, setSelectedFlag] = useState("🇮🇳");

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
    ];

    const [isFormValid, setIsFormValid] = useState(false);

    const checkboxItems = [
        { id: 'segmentation', label: 'Customer segmentation' },
        { id: 'roi', label: 'Return on Investment' },
        { id: 'analysis', label: 'Data analysis' },
        { id: 'martech', label: 'MarTech stack' },
        { id: 'other', label: 'Other?' }
    ];

    useEffect(() => {
        // Check if all required fields are filled
        const isValid = Object.values(formData).every(value => value.trim() !== '');
        setIsFormValid(isValid);
    }, [formData]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Update the selected flag when country code changes
        if (name === "countryCode") {
            const selectedCountry = countries.find(country => country.dialCode === value);
            if (selectedCountry) {
                setSelectedFlag(selectedCountry.flag);
            }
        }
    };

    return (
        <div>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-4 text-white md:text-[#4F4F4F]">
                    <div>
                        <label className="block text-lg font-light mb-1">Full name*</label>
                        <input 
                            type="text" 
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full p-2  border-2 border-[#DAC8FF] rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-light mb-1">Email*</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-2 border-2 border-[#DAC8FF] rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-light mb-1">Company website*</label>
                        <input 
                            type="url" 
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            className="w-full p-2 border-2 border-[#DAC8FF] rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-light mb-1">Designation*</label>
                        <input 
                            type="text" 
                            name="designation"
                            value={formData.designation}
                            onChange={handleInputChange}
                            className="w-full p-2 border-2 border-[#DAC8FF] rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-light mb-1">Phone number*</label>
                        <div className=" text-black">

                                <div className="border-2 border-[#DAC8FF] flex bg-white w-full rounded-md">
                                    <div className="flex items-center relative">
                                        <div className="px-2 h-10 flex items-center justify-start gap-1">
                                            <span className="text-xl">{selectedFlag}</span>
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                width="12" 
                                                height="12" 
                                                viewBox="0 0 24 24" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                strokeWidth="2" 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                className="ml-1"
                                            >
                                                <polyline points="6 9 12 15 18 9"></polyline>
                                            </svg>
                                            <span className="text-sm text-[#4F4F4F]">{formData.countryCode}</span>
                                           
                                        </div>
                                        <select 
                                            className="absolute inset-0 opacity-0 cursor-pointer w-24"
                                            name="countryCode"
                                            value={formData.countryCode}
                                            onChange={handleInputChange}
                                        >
                                            {countries.map(country => (
                                                <option key={country.code} value={country.dialCode}>
                                                    {country.flag} {country.name} ({country.dialCode})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <input 
                                        type="tel" 
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className=" p-2 w-[199px] md:w-full rounded-r-md outline-none "
                                        required
                                    />
                                </div>
                            
                        </div>
                    </div>
                </div>

                <div className="hidden md:block font-light text-[#4F4F4F]">
                    <label className="block text-lg mb-3">What do you need help with?</label>
                    <div className="grid grid-cols-2 gap-4">
                        {checkboxItems.map((item) => (
                            <label key={item.id} className="flex items-center gap-2">
                                <input 
                                    type="checkbox" 
                                    className="w-4 h-4 accent-[#6438C3] border-[#DAC8FF] rounded-md"    
                                />
                                <span className="text-sm">{item.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button 
                    type="submit"
                    disabled={!isFormValid}
                    className={`px-8 py-2 rounded-md transition-colors ${
                        isFormValid 
                        ? 'bg-[#6438C3] text-white hover:bg-opacity-90 cursor-pointer' 
                        : 'bg-[#DAC8FF] text-white cursor-not-allowed'
                    }`}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};