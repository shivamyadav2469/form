import React, { useState, useEffect } from "react";

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    position: "",
    experience: "",
    portfolioURL: "",
    managementExperience: "",
    skills: {
      JavaScript: false,
      CSS: false,
      Python: false,
    },
    interviewTime: "",
  });

  const [errors, setErrors] = useState({});
  const [showExperience, setShowExperience] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showManagement, setShowManagement] = useState(false);

  useEffect(() => {
    setShowExperience(
      formData.position === "Developer" || formData.position === "Designer"
    );
    setShowPortfolio(formData.position === "Designer");
    setShowManagement(formData.position === "Manager");
  }, [formData.position]);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";
    else if (isNaN(formData.phoneNumber))
      newErrors.phoneNumber = "Phone Number must be a valid number";
    if (showExperience && (!formData.experience || formData.experience <= 0))
      newErrors.experience = "Relevant Experience must be greater than 0";
    if (showPortfolio && !formData.portfolioURL)
      newErrors.portfolioURL = "Portfolio URL is required";
    else if (
      showPortfolio &&
      !/^https?:\/\/\S+\.\S+/.test(formData.portfolioURL)
    )
      newErrors.portfolioURL = "Portfolio URL is invalid";
    if (showManagement && !formData.managementExperience)
      newErrors.managementExperience = "Management Experience is required";
    if (!Object.values(formData.skills).some((skill) => skill))
      newErrors.skills = "At least one skill must be selected";
    if (!formData.interviewTime)
      newErrors.interviewTime = "Preferred Interview Time is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        skills: {
          ...formData.skills,
          [name]: checked,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
      
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(`Form Submitted:\n${JSON.stringify(formData, null, 2)}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center p-4 md:mt-[-4rem] bg-gradient-to-r from-pink-100 to-indigo-600"
    >
      <div className="p-6 rounded-md bg-gray-200 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 w-full max-w-md">
        <div className="mb-4">
          <label>
            Full Name:
            <input
              className="bg-gray-50 border rounded-lg w-full p-2 outline-none"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            <div className="h-6 text-red-500">
              {errors.fullName && <span>{errors.fullName}</span>}
            </div>
          </label>
        </div>

        <div className="mb-4">
          <label>
            Email:
            <input
              className="bg-gray-50 border rounded-lg w-full p-2 outline-none"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="h-6 text-red-500">
              {errors.email && <span>{errors.email}</span>}
            </div>
          </label>
        </div>

        <div className="mb-4">
          <label>
            Phone Number:
            <input
              className="bg-gray-50 border rounded-lg w-full p-2 outline-none"
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <div className="h-6 text-red-500">
              {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
            </div>
          </label>
        </div>

        <div className="mb-4">
          <label>
            Applying for Position:
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="bg-gray-50 border rounded-lg w-full p-2 outline-none"
            >
              <option value="">Select</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
          </label>
        </div>

        {showExperience && (
          <div className="mb-4">
            <label>
              Relevant Experience (years):
              <input
                className="bg-gray-50 border rounded-lg w-full p-2 outline-none"
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              />
              <div className="h-6 text-red-500">
                {errors.experience && <span>{errors.experience}</span>}
              </div>
            </label>
          </div>
        )}

        {showPortfolio && (
          <div className="mb-4">
            <label>
              Portfolio URL:
              <input
                className="bg-gray-50 border rounded-lg w-full p-2 outline-none"
                type="text"
                name="portfolioURL"
                value={formData.portfolioURL}
                onChange={handleChange}
              />
              <div className="h-6 text-red-500">
                {errors.portfolioURL && <span>{errors.portfolioURL}</span>}
              </div>
            </label>
          </div>
        )}

        {showManagement && (
          <div className="mb-4">
            <label>
              Management Experience:
              <input
                className="bg-gray-50 border rounded-lg w-full p-2 outline-none"
                type="text"
                name="managementExperience"
                value={formData.managementExperience}
                onChange={handleChange}
              />
              <div className="h-6 text-red-500">
                {errors.managementExperience && (
                  <span>{errors.managementExperience}</span>
                )}
              </div>
            </label>
          </div>
        )}

        <div className="mb-4">
          <label>
            Additional Skills:
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2">
                JavaScript
                <input
                  className="bg-gray-50 border rounded-lg outline-none"
                  type="checkbox"
                  name="JavaScript"
                  checked={formData.skills.JavaScript}
                  onChange={handleChange}
                />
              </label>
              <label className="flex items-center gap-2">
                CSS
                <input
                  className="bg-gray-50 border rounded-lg outline-none"
                  type="checkbox"
                  name="CSS"
                  checked={formData.skills.CSS}
                  onChange={handleChange}
                />
              </label>
              <label className="flex items-center gap-2">
                Python
                <input
                  className="bg-gray-50 border rounded-lg outline-none"
                  type="checkbox"
                  name="Python"
                  checked={formData.skills.Python}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="h-6 text-red-500">
              {errors.skills && <span>{errors.skills}</span>}
            </div>
          </label>
        </div>

        <div className="mb-4">
          <label>
            Preferred Interview Time:
            <input
              className="bg-gray-50 border rounded-lg w-full p-2 outline-none"
              type="datetime-local"
              name="interviewTime"
              value={formData.interviewTime}
              onChange={handleChange}
            />
            <div className="h-6 text-red-500">
              {errors.interviewTime && <span>{errors.interviewTime}</span>}
            </div>
          </label>
        </div>

        <button type="submit" className="bg-black text-white p-2 rounded-md w-full">
          Submit
        </button>
      </div>
    </form>
  );
};

export default JobApplicationForm;
