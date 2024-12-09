import React from "react";

const AboutUs = () => {
  return (
    <div className="lg:mx-[13%] lg:my-8 mx-[2%] my-[1%]">
      <h1 className="lg:text-8xl text-xl font-bold text-gray-900 lg:mt-10 lg:mb-14 my-5">
        About Us
      </h1>
      <div className="flex lg:flex-row flex-col justify-center items-center gap-8 mb-9">
        <div className="lg:w-2/4">
          <h1 className="font-bold lg:text-xl text-lg pb-4">Welcome to HomImprovement!</h1>
          <p className="lg:text-lg text-base text-justify">
            We love making spaces look better and improving the way you live
            here at HomImprovement. We are an innovative digital publisher that
            is part of the HomeMedia Group. Our aim is to offer expert tips,
            ideas, and useful information for all your home improvement
            projects.
          </p>
        </div>
        <div className="lg:w-2/4">
          <img
            src="about1.webp"
            alt="About_us"
            className="w-full h-[250px] object-cover"
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex lg:flex-row flex-col-reverse justify-center items-center gap-8 mb-10">
        <div className="lg:w-2/4">
          <img
            src="about2.webp"
            alt="About_us"
            className="w-full h-[250px] object-cover"
            loading="lazy"
          />
        </div>
        <div className="lg:w-2/4">
          <h1 className="font-bold lg:text-xl text-lg pb-4">Our Mission</h1>
          <p className="lg:text-lg text-base text-justify">
            House owners, DIYers, or design freak should be able to search the
            product and details they require to make their homes beautiful,
            functional, and lasting. Do you want to renovate a room, attempt a
            DIY project, or just get ideas for the next thing you want to do to
            improve your home? We can help.
          </p>
        </div>
      </div>
      <h2 className="lg:text-xl text-lg font-semibold text-gray-800 lg:mb-4 lg:mt-7 my-3">
        What We Offer
      </h2>
      <ul className="list-disc list-inside mb-4 space-y-2 lg:ml-10">
        <li>
          <span className="font-semibold text-justify">Advice from Experts:</span> Our team
          of experienced writers and professionals share insights on the newest
          trends, techniques, and best practices.
        </li>
        <li>
          <span className="font-semibold text-justify">Inspiration:</span> From kitchens to
          gardens, find ideas and case studies to get your creative juices
          flowing.
        </li>
        <li>
          <span className="font-semibold text-justify">How-To Guides:</span> Step-by-step
          tutorials for projects, regardless of your skill level.
        </li>
        <li>
          <span className="font-semibold text-justify">Product Reviews:</span> In-depth
          reviews of the newest home products to help you make informed
          decisions.
        </li>
        <li>
          <span className="font-semibold text-justify">Versus:</span> Detailed comparisons of
          products, styles, and techniques to guide your choices.
        </li>
      </ul>

      <h2 className="lg:text-xl text-lg font-semibold text-gray-800 lg:mb-4 lg:mt-7 my-3">
        Join Our Community
      </h2>
      <p className="mb-4 text-justify">
        At <strong>HomImprovement</strong>, we believe every house can become a
        safe haven. Join our community of passionate homeowners and DIYers to
        share your projects, ask questions, and connect with others who love
        home improvement as much as you do.
      </p>

      <p className="mb-4 text-justify">
        Thanks for swinging by to <strong>HomImprovement.com!</strong> We’re
        here to help you make your dream home a reality. Don’t hesitate to
        contact us with any questions or ideas. Let’s make every house a better
        place to live!
      </p>
      <h2 className="lg:text-xl text-lg font-semibold text-gray-800 lg:mb-4 lg:mt-7 my-3">Contact Us</h2>
      <p className="mb-4 text-justify">
        If you need to get in touch with us about this disclaimer, you can do so
        at info@homimprovement.com.
      </p>
    </div>
  );
};

export default AboutUs;
