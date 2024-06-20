import React, { useState, useEffect } from 'react';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    surveyTopic: '',
    favoriteProgrammingLanguage: '',
    yearsOfExperience: '',
    exerciseFrequency: '',
    dietPreference: '',
    highestQualification: '',
    fieldOfStudy: '',
    feedback: ''
  });

  const [errors, setErrors] = useState({});
  const [additionalQuestions, setAdditionalQuestions] = useState([]);

  useEffect(() => {
    if (formData.surveyTopic) {
      fetchAdditionalQuestions(formData.surveyTopic);
    }
  }, [formData.surveyTopic]);

  const fetchAdditionalQuestions = async (topic) => {
    try {
      const response = await fetch(`https://api.example.com/questions?topic=${topic}`);
      const data = await response.json();
      setAdditionalQuestions(data.questions);
    } catch (error) {
      console.error('Error fetching additional questions:', error);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.surveyTopic) newErrors.surveyTopic = 'Survey Topic is required';

    if (formData.surveyTopic === 'Technology') {
      if (!formData.favoriteProgrammingLanguage) newErrors.favoriteProgrammingLanguage = 'Favorite Programming Language is required';
      if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Years of Experience is required';
      else if (isNaN(formData.yearsOfExperience) || formData.yearsOfExperience <= 0) newErrors.yearsOfExperience = 'Years of Experience must be a number greater than 0';
    }

    if (formData.surveyTopic === 'Health') {
      if (!formData.exerciseFrequency) newErrors.exerciseFrequency = 'Exercise Frequency is required';
      if (!formData.dietPreference) newErrors.dietPreference = 'Diet Preference is required';
    }

    if (formData.surveyTopic === 'Education') {
      if (!formData.highestQualification) newErrors.highestQualification = 'Highest Qualification is required';
      if (!formData.fieldOfStudy) newErrors.fieldOfStudy = 'Field of Study is required';
    }

    if (!formData.feedback || formData.feedback.length < 50) newErrors.feedback = 'Feedback is required and must be at least 50 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
        ...errors,
        [name]: "",
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(`Form Submitted:\n${JSON.stringify(formData, null, 2)}\nAdditional Questions:\n${JSON.stringify(additionalQuestions, null, 2)}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center p-4 bg-gradient-to-r from-pink-100 to-indigo-600"
    >
      <div className="p-6 rounded-md bg-gray-200 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 w-full max-w-md">
        <div className="mb-4">
          <label className="block">
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
          <label className="block">
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
          <label className="block">
            Survey Topic:
            <select
              className="bg-gray-50 border rounded-lg w-full p-2 outline-none"
              name="surveyTopic"
              value={formData.surveyTopic}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>
            <div className="h-6 text-red-500">
              {errors.surveyTopic && <span>{errors.surveyTopic}</span>}
            </div>
          </label>
        </div>

        {formData.surveyTopic === 'Technology' && (
          <>
            <div className="mb-4">
              <label className="block">
                Favorite Programming Language:
                <select
                  className="bg-gray-50 border rounded-lg w-full p-2 outline-none"
                  name="favoriteProgrammingLanguage"
                  value={formData.favoriteProgrammingLanguage}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C#">C#</option>
                </select>
                <div className="h-6 text-red-500">
                  {errors.favoriteProgrammingLanguage && <span>{errors.favoriteProgrammingLanguage}</span>}
                </div>
              </label>
            </div>

            <div className="mb-4">
              <label className="block">
                Years of Experience:
                <input
                  className="bg-gray-50 border rounded-lg w-full p-2 outline-none"
                  type="number"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                />
                <div className="h-6 text-red-500">
                  {errors.yearsOfExperience && <span>{errors.yearsOfExperience}</span>}
                </div>
              </label>
            </div>
          </>
        )}

        {formData.surveyTopic === 'Health' && (
          <>
            <div className="mb-4">
              <label className="block">
                Exercise Frequency:
                <select
                  className="bg-gray-50 border rounded-lg w-full p-2 outline-none"
                  name="exerciseFrequency"
                  value={formData.exerciseFrequency}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Rarely">Rarely</option>
                </select>
                <div className="h-6 text-red-500">
                  {errors.exerciseFrequency && <span>{errors.exerciseFrequency}</span>}
                </div>
              </label>
            </div>

            <div className="mb-4">
              <label className="block">
                Diet Preference:
                <select
                  className="bg-gray-50 border rounded-lg w-full p-2 outline-none"
                  name="dietPreference"
                  value={formData.dietPreference}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                </select>
                <div className="h-6 text-red-500">
                  {errors.dietPreference && <span>{errors.dietPreference}</span>}
                </div>
              </label>
            </div>
          </>
        )}

        {formData.surveyTopic === 'Education' && (
          <>
            <div className="mb-4">
              <label className="block">
                Highest Qualification:
                <select
                  className="bg-gray-50 border rounded-lg w-full p-2 outline-none"
                  name="highestQualification"
                  value={formData.highestQualification}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="PhD">PhD</option>
                </select>
                <div className="h-6 text-red-500">
                  {errors.highestQualification && <span>{errors.highestQualification}</span>}
                </div>
              </label>
            </div>

            <div className="mb-4">
              <label className="block">
                Field of Study:
                <input
                  className="bg-gray-50 border rounded-lg w-full p-2 outline-none"
                  type="text"
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={handleChange}
                />
                <div className="h-6 text-red-500">
                  {errors.fieldOfStudy && <span>{errors.fieldOfStudy}</span>}
                </div>
              </label>
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="block">
            Feedback:
            <textarea
              className="bg-gray-50 border rounded-lg w-full p-2 outline-none"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
            />
            <div className="h-6 text-red-500">
              {errors.feedback && <span>{errors.feedback}</span>}
            </div>
          </label>
        </div>

        {additionalQuestions.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Additional Questions</h3>
            {additionalQuestions.map((question, index) => (
              <div key={index} className="mb-4">
                <label className="block">
                  {question.text}
                  <input
                    className="bg-gray-50 border rounded-lg w-full p-2 outline-none"
                    type="text"
                    name={`additionalQuestion-${index}`}
                    value={formData[`additionalQuestion-${index}`] || ''}
                    onChange={handleChange}
                  />
                </label>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="bg-black text-white rounded-lg px-4 py-2 w-full"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SurveyForm;
