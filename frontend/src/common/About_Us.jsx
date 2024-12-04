import React from "react";

const AboutUs = () => {
  return (
    <div className="lg:mx-[13%] lg:my-8">
      <h1 className="text-8xl font-bold text-gray-900 mt-10 mb-14">About Us</h1>
      <div className="flex justify-center items-center gap-8 mb-9">
        <div className="w-2/4">
          <h1 className="font-bold text-xl pb-4">Welcome to HomImprovement!</h1>
          <p className="text-lg">
            We love making spaces look better and improving the way you live
            here at HomImprovement. We are an innovative digital publisher that
            is part of the HomeMedia Group. Our aim is to offer expert tips,
            ideas, and useful information for all your home improvement
            projects.
          </p>
        </div>
        <div className="w-2/4">
          <img
            src="about1.webp"
            alt="About_us"
            className="w-full h-[250px] object-cover"
          />
        </div>
      </div>
      <div className="flex justify-center items-center gap-8 mb-10">
        <div className="w-2/4">
          <img
            src="about2.webp"
            alt="About_us"
            className="w-full h-[250px] object-cover"
          />
        </div>
        <div className="w-2/4">
          <h1 className="font-bold text-xl pb-4">Our Mission</h1>
          <p className="text-lg">
            House owners, DIYers, or design freak should be able to search the
            product and details they require to make their homes beautiful,
            functional, and lasting. Do you want to renovate a room, attempt a
            DIY project, or just get ideas for the next thing you want to do to
            improve your home? We can help. 
          </p>
        </div>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        What We Offer
      </h2>
      <ul className="list-disc list-inside mb-4 space-y-2 ml-10">
        <li>
          <span className="font-semibold">Advice from Experts:</span> Our team of experienced writers
          and professionals share insights on the newest trends, techniques, and
          best practices.
        </li>
        <li>
          <span className="font-semibold">Inspiration:</span> From kitchens to gardens, find ideas and
          case studies to get your creative juices flowing.
        </li>
        <li>
          <span className="font-semibold">How-To Guides:</span> Step-by-step tutorials for projects,
          regardless of your skill level.
        </li>
        <li>
          <span className="font-semibold">Product Reviews:</span> In-depth reviews of the newest home
          products to help you make informed decisions.
        </li>
        <li>
          <span className="font-semibold">Versus:</span> Detailed comparisons of products, styles, and
          techniques to guide your choices.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Join Our Community
      </h2>
      <p className="mb-4">
        At <strong>HomImprovement</strong>, we believe every house can become a
        safe haven. Join our community of passionate homeowners and DIYers to
        share your projects, ask questions, and connect with others who love
        home improvement as much as you do.
      </p>

      <p className="mb-4">
        Thanks for swinging by to <strong>HomImprovement.com!</strong> We’re
        here to help you make your dream home a reality. Don’t hesitate to
        contact us with any questions or ideas. Let’s make every house a better
        place to live!
      </p>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h2>
      <p className="mb-4">
        If you need to get in touch with us about this disclaimer, you can do so
        at info@homimprovement.com.
      </p>
    </div>
  );
};

export default AboutUs;
