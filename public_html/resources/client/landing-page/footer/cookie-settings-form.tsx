import React, {useState} from 'react';

export const CookieSettingsForm = () => {
  const [activeTab, setActiveTab] = useState('privacy');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleToggle = (category: string) => {
    // Handle enabling/disabling the selected category
  };

  return (
    <div
      className="ot-pc-content ot-pc-scrollbar ot-sdk-row"
      style={{height: '259px'}}
    >
      <div className="ot-sdk-container ot-grps-cntr ot-sdk-column">
        <div
          className="ot-sdk-four ot-sdk-columns ot-tab-list"
          aria-label="Cookie Categories"
        >
          <ul className="ot-cat-grp" role="tablist">
            <li
              className={`ot-abt-tab ${
                activeTab === 'privacy' ? 'ot-active-menu' : ''
              }`}
              role="presentation"
            >
              <div
                className="category-menu-switch-handler"
                role="tab"
                tabIndex={0}
                aria-selected={activeTab === 'privacy' ? 'true' : 'false'}
                onClick={() => handleTabClick('privacy')}
              >
                <h3>Your Privacy</h3>
              </div>
            </li>
          </ul>
        </div>

        {activeTab === 'privacy' && (
          <div>
            <h4>Privacy Settings</h4>
            <label>
              <input
                type="checkbox"
                onChange={() => handleToggle('exampleCategory')}
              />
              Example Category
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieSettingsForm;
