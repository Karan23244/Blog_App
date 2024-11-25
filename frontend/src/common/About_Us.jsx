import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-6 md:px-8 lg:px-16">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">About Us</h1>

      <p className="mb-4">
        Welcome to <strong>HomImprovement!</strong> We love making spaces look better and improving the way you live here at HomImprovement. 
        We are an innovative digital publisher that is part of the HomeMedia Group. Our aim is to offer expert tips, ideas, and useful 
        information for all your home improvement projects.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">Our Mission</h2>
      <p className="mb-4">
        House owners, DIYers, or design freaks should be able to search the product and details they require to make their homes beautiful, functional, and lasting. 
        Whether you want to renovate a room, attempt a DIY project, or just get ideas for your next home improvement project, we can help.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">What We Offer</h2>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>
          <strong>Advice from Experts:</strong> Our team of experienced writers and professionals share insights on the newest trends, techniques, and best practices.
        </li>
        <li>
          <strong>Inspiration:</strong> From kitchens to gardens, find ideas and case studies to get your creative juices flowing.
        </li>
        <li>
          <strong>How-To Guides:</strong> Step-by-step tutorials for projects, regardless of your skill level.
        </li>
        <li>
          <strong>Product Reviews:</strong> In-depth reviews of the newest home products to help you make informed decisions.
        </li>
        <li>
          <strong>Versus:</strong> Detailed comparisons of products, styles, and techniques to guide your choices.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">Join Our Community</h2>
      <p className="mb-4">
        At <strong>HomImprovement</strong>, we believe every house can become a safe haven. Join our community of passionate homeowners and DIYers to 
        share your projects, ask questions, and connect with others who love home improvement as much as you do.
      </p>

      <p className="mb-4">
        Thanks for swinging by to <strong>HomImprovement.com!</strong> We’re here to help you make your dream home a reality. 
        Don’t hesitate to contact us with any questions or ideas. Let’s make every house a better place to live!
      </p>
    </div>
  );
};

export default AboutUs;
