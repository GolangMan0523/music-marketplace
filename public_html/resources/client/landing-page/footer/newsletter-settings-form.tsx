import React, {useState, ChangeEvent, FormEvent} from 'react';

export function NewsletterSettingsForm() {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    plan: 'FREE',
    attendedWebinar: 'True',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prevData => ({...prevData, [name]: value}));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="card relative">
      <div className="title-container flex-vertical">
        <h3>Example Newsletter Subscribe form</h3>
        <p>
          Be the first to know the latest challenges, live shows, opportunities,
          and more!
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}

export default NewsletterSettingsForm;
