import React, { useState, useEffect } from "react";

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    attendingWithGuest: "No",
    guestName: "",
  });

  const [errors, setErrors] = useState({});
  const [showGuestName, setShowGuestName] = useState(false);

  useEffect(() => {
    setShowGuestName(formData.attendingWithGuest === "Yes");
  }, [formData.attendingWithGuest]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.age) newErrors.age = "Age is required";
    else if (isNaN(formData.age) || formData.age <= 0)
      newErrors.age = "Age must be a number greater than 0";
    if (showGuestName && !formData.guestName)
      newErrors.guestName = "Guest name is required";

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
      alert(`Form Submitted:\n${JSON.stringify(formData, null, 2)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center p-4">
      <div className="p-4 rounded-md bg-gray-200 bg-opacity-50 border border-gray-100 w-full max-w-md">
        <div className="mb-4">
          <label>
            Name:
            <input
              className="bg-gray-50 border rounded-lg w-full p-2 outline-none"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <div className="h-5">
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
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
            <div className="h-5">
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>
          </label>
        </div>

        <div className="mb-4">
          <label>
            Age:
            <input
              className="bg-gray-50 border rounded-lg w-full p-2 outline-none"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
            <div className="h-5">
              {errors.age && <span className="text-red-500 text-sm">{errors.age}</span>}
            </div>
          </label>
        </div>

        <div className="mb-4">
          <label>
            Are you attending with a guest?
            <select
              name="attendingWithGuest"
              value={formData.attendingWithGuest}
              onChange={handleChange}
              className="bg-gray-50 border rounded-lg w-full p-2 outline-none"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </label>
        </div>

        {showGuestName && (
          <div className="mb-4">
            <label>
              Guest Name:
              <input
                type="text"
                className="bg-gray-50 border rounded-lg w-full p-2 outline-none"
                name="guestName"
                value={formData.guestName}
                onChange={handleChange}
              />
              <div className="h-5">
                {errors.guestName && <span className="text-red-500 text-sm">{errors.guestName}</span>}
              </div>
            </label>
          </div>
        )}

        <button type="submit" className="bg-black text-white p-2 rounded-md w-full">
          Submit
        </button>
      </div>
    </form>
  );
};

export default EventRegistrationForm;
