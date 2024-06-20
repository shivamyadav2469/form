import React, { useState } from 'react';
import './App.css';
import EventRegistrationForm from './Component/Forms1';
import JobApplicationForm from './Component/Forms2';
import SurveyForm from './Component/Forms3';

function App() {
  const [activeTab, setActiveTab] = useState('event');

  const renderForm = () => {
    switch (activeTab) {
      case 'event':
        return <EventRegistrationForm />;
      case 'job':
        return <JobApplicationForm />;
      case 'survey':
        return <SurveyForm />;
      default:
        return null;
    }
  };

  return (
    <>
    <div className='bg-gradient-to-r from-pink-100 to-indigo-600 h-screen'>
      <div className="tabs flex  gap-2 p-3">
        <div
          className={`tab ${activeTab === 'event' ? 'active' : ''} bg-black text-white p-2 cursor-pointer rounded-md`}
          onClick={() => setActiveTab('event')}
        
        >
          Event Registration
        </div>
        <div
          className={`tab ${activeTab === 'job' ? 'active' : ''} bg-black text-white p-2 cursor-pointer rounded-md`}
          onClick={() => setActiveTab('job')}

        >
          Job Application
        </div>
        <div
          className={`tab ${activeTab === 'survey' ? 'active' : ''} bg-black text-white p-2 cursor-pointer rounded-md`}
          onClick={() => setActiveTab('survey')}
        >
          Survey
        </div>
      </div>
      <div className="tab-content">
        {renderForm()}
      </div>
      </div>
    </>
  );
}

export default App;
