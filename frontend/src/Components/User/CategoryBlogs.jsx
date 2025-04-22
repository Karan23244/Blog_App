import React from "react";
import usePostsByCategory from "../../hooks/usePostsByCategory";
import { Link } from "react-router-dom";
import usePageTracker from "../../hooks/usePageTracker";
import { Helmet } from "react-helmet-async";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CategoryPosts = () => {
  usePageTracker("category");
  const {
    posts,
    loading,
    error,
    categoryName,
    categoryType,
    totalPages,
    currentPage,
    fetchPosts,
  } = usePostsByCategory();
  const modifiedCategoryName =
    categoryName?.trim().toLowerCase() === "how to" ? "How To ?" : categoryName;

  const currentUrl = window.location.href;
  // Function to fetch SEO data based on category name

  const getSeoDetails = (category) => {
    const seoData = {
      "Smart Home Technology": {
        title: "Smart Home Automation Technology | HomImprovement",
        description:
          "Explore the best home automation devices and the smart home automation technology. Make your home smarter and safer with innovative smart solutions today!",
        keywords:
          "home automation technology, best home automation devices,Smart home automation",
        shortDescription:
          "At homimprovement, we are devoted to bringing you the new improvements in Smart Home Technology, a category that is revolutionizing the way we stay. Smart Home Technology includes an extensive range of gadgets, systems, and solutions designed to make your home smart, efficient, and stable. From smart lighting fixtures and thermostats to great security systems and voice-controlled assistants, these innovations are reworking normal homes into smart living spaces. With our carefully curated choice of companies, we intend to help you make a smart home that isn't handiest present day but additionally tailor-made on your particular life-style. By incorporating home automation technology, you can seamlessly manage your home’s various aspects with ease.",
        html: `<h2><strong><span style="font-size:16pt;font-family:Arial,sans-serif;padding-top:10px;">Advantages of Smart Home Automation</span></strong></h2>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">One of the main benefits of Smart Home Technology is the exceptional ease it gives. Imagine being able to control your home lighting, adjust your thermostat, and maybe start your coffee maker with just a one voice command or a faucet to your smartphone. These devices automate everyday tasks, saving you effort and time whilst permitting you to be aware of what are definitely topics. Additionally, smart home structures can be customized to fit your options, whether it&rsquo;s setting an appropriate lighting mood for a dinner party or growing a morning recurring that wakes you up gently along with your favourite song. With the best home automation devices, you can elevate your living experience and make your daily routine more convenient.</span></p>
<p><br/></p>
<h2><strong><span style="font-size:16pt;font-family:Arial,sans-serif;padding-top:10px;">Upgrading Convenience with Home Automation Technology</span></strong></h2>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">Security is every other main goal of integrating Smart Home Technology into your house. With smart security cameras, video doorbells, or smart locks, you could discover your own home in actual-time from anywhere within the international community. Receive instant indicators if any unusual pastime is detected, and relaxation smooth knowing that your house is included even whilst you&rsquo;re away. These systems offer peace of thoughts and an introduced layer of safety for you and your family. Investing in home automation technology ensures that your home remains protected with cutting-edge security features.</span></p>
<p><br/></p><h2><strong><span style="font-size:16pt;font-family:Arial,sans-serif;padding-top:10px;">Save Energy with the Smart Home Devices</span></strong></h2>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">Energy efficiency is also a sizable benefit of adopting smart home solutions. Devices like&nbsp;</span><a href="https://homimprovement.com/smart-home-technology/smart-thermostat-save-energy"><u><span style="color:#1155cc;font-size:11pt;font-family:Arial,sans-serif;">smart thermostats</span></u></a><span style="font-size:11pt;font-family:Arial,sans-serif;">&nbsp;and smart lighting systems are made to optimize strength usage, lowering your software bills and minimizing your environmental impact. For example, smart thermostats research your exercises each day and adjust the temperature robotically, making sure your home is continually secure without losing electricity. Similarly, smart lighting systems allow you to time table lighting to show on or off at precise instances, further improving power savings. The best home automation devices help in optimizing energy consumption, making your home more sustainable and cost-effective.</span></p>
<p><br/></p><h2><strong><span style="font-size:16pt;font-family:Arial,sans-serif;padding-top:10px;">Smooth Integration with Automation for Smart Homes</span></strong></h2>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">At homimprovement, we stay ahead of the curve with the aid of offering the brand new gadgets in Smart Home Technology. Voice-controlled assistants such as Amazon Alexa, Google Assistant, or Apple HomeKit have become essential gadgets for smart home, Permitting seamless manipulation of all related devices.&nbsp;</span><a href="https://homimprovement.com/smart-home-technology/best-home-lighting-ideas"><u><span style="color:#1155cc;font-size:11pt;font-family:Arial,sans-serif;">Smart lights systems</span></u></a><span style="font-size:11pt;font-family:Arial,sans-serif;">&nbsp;assist you to modify brightness and color to create the precise ambiance, even as advanced protection systems offer real-time tracking and alerts. Integrated home automation technology brings all of your devices together, allowing you to manipulate the whole thing from a single app or voice command. Smart home automation ensures effortless control and integration of multiple devices in your home.</span></p>
<p><br/></p><h2><strong><span style="font-size:16pt;font-family:Arial,sans-serif;padding-top:10px;">How to Begin Using Smart Home Technology</span></strong></h2>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">Getting started out with Smart Home Technology is less complicated than you would possibly think. Begin by identifying the areas of your home that would benefit from automation, which include lighting fixtures, protection, or strength management. Start small with some key devices, like a smart speaker or a&nbsp;</span><a href="https://homimprovement.com/smart-home-technology/what-is-a-smart-plug"><u><span style="color:#1155cc;font-size:11pt;font-family:Arial,sans-serif;">smart plug</span></u></a><span style="font-size:11pt;font-family:Arial,sans-serif;">, and gradually amplify your system as you become more comfortable with the era. It&rsquo;s crucial to select devices which are well matched with every different and can be included into a single platform for smooth manipulation. At homimprovement, our team of specialists is right here to manual you each step of the manner, from choosing the right brand to installation and setup. Selecting the best home automation devices ensures a hassle-free and efficient transition into a smart home automation system.</span></p>
<p><br/></p><h2><strong><span style="font-size:16pt;font-family:Arial,sans-serif;padding-top:10px;">Selecting the Smart Home Devices for Your Requirements</span></strong></h2>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">We take pleasure in supplying a cautiously curated series of smart home gadgets that combine modern generation with consumer-friendly plans. Our aim is to help you create a home that isn&apos;t always only smart but also stylish and functional. With competitive pricing,&nbsp;</span><a href="https://homimprovement.com/home-insights/reviews"><u><span style="color:#1155cc;font-size:11pt;font-family:Arial,sans-serif;">expert advice</span></u></a><span style="font-size:11pt;font-family:Arial,sans-serif;">, and dependable customer service, homimprovement is your relied on companion in constructing a linked, smart home. Explore our variety of Smart Home Technology answers nowadays and take the first step toward a wiser, extra green, and secure living space with the latest smart home automation solutions.</span></p>`,
      },
      "Diy Home Projects": {
        title: "DIY Home Decor & Home Improvement Projects",
        description:
          "Personalize your home with DIY decor and projects. Transform your space with home improvement tips. Start your next DIY adventure today!",
        keywords: "DIY home decor,DIY home projects,best DIY home security",
        shortDescription:
          "Wherein creativity meets functionality! Engaging in do-it-yourself home projects now not most effective permits you to change your home but also saves your money compared to hiring professionals. There’s a unique delight that arrives from creating something together with your own ideas, whether it’s constructing a new bookshelf, painting a room, or make smart home device for your home. These tasks can substantially decorate your home’s aesthetic and capability. Additionally, incorporating DIY home decor can add a personalized touch to every corner of your house.",
        html: `<h2><strong><span style="font-size:16pt;font-family:Arial,sans-serif;">Popular DIY Home Projects</span></strong></h2>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">One of the most famous DIY home projects is restoring your furniture. This manner provides unique pieces a brand new lease on life with some paint, new hardware, and gadgets. Upcycling isn&apos;t always the handiest green but additionally a wonderful way to create particular objects that mirror your style. Another massive concept is a garden makeover;&nbsp;</span><a href="https://homimprovement.com/diy-home-projects/diy-outdoor-projects-enhance-backyard"><u><span style="color:#1155cc;font-size:11pt;font-family:Arial,sans-serif;">renovate your outdoor</span></u></a><span style="font-size:11pt;font-family:Arial,sans-serif;">&nbsp;area proper right into a lovely lawn may be as simple as constructing raised lawn beds, growing a flower bed, and putting in a small pond. DIY home decor ideas, such as repurposing old jars into stylish vases or making rustic wooden signs, can elevate your space effortlessly.</span></p>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">For those trying to customise their interiors, DIY wall art and decor projects provide infinite opportunities, from canvas artwork to wall hangings made from herbal substances. You can even create a gallery wall offering your favored pictures and artwork. Additionally, tackling domestic corporation with creative storage solutions, which includes DIY shelving devices, garage bins, and closet organizers, can help maximize area and preserve your private home tidy. Lighting upgrades are another top notch way to trade the atmosphere of your property; remember making your personal pendant lighting fixtures or updating existing furniture with a fresh coat of paint or new shades. Executing the best DIY home security measures, such as installing smart locks or motion sensor lights, can add an extra layer of protection to your household.</span></p>
<p><br/></p><h2><strong><span style="font-size:16pt;font-family:Arial,sans-serif;">Tips for Successful DIY Projects</span></strong></h2>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">To ensure a successful DIY initiative, it&rsquo;s crucial to plot ahead. Gather all vital substances and tools, and create a step-by-step means of step manual to follow. If you&rsquo;re new to DIY home decor, begin small with plausible initiatives to build your self assurance earlier than tackling extra complex responsibilities. Always prioritize protection via carrying suitable tools and following commands carefully. If a task calls for equipment or substances you&rsquo;re surprised with, consider looking at tutorials or looking for advice. Remember, no longer will each challenge go as planned, and that&rsquo;s ok! Embrace the studying system and don&rsquo;t be afraid to make modifications along the way. Additionally, if you&apos;re looking to enhance security, the best&nbsp;</span><a href="https://homimprovement.com/diy-home-projects/easy-diy-home-security-projects"><u><span style="color:#1155cc;font-size:11pt;font-family:Arial,sans-serif;">DIY home security solutions</span></u></a><span style="font-size:11pt;font-family:Arial,sans-serif;">&nbsp;can be both effective and cost-efficient.</span></p>
<p><br/></p><h2><strong><span style="font-size:16pt;font-family:Arial,sans-serif;">Inspiration and Resources</span></strong></h2>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">For extra inspiration, test out our blog posts presenting exact publications and tutorials on diverse DIY home projects. We additionally offer hints on sourcing substances, budgeting, and locating the right equipment in your duties. Join our network of DIY fans and share your tasks with us! Engaging in DIY now is not the simplest way to create a beautiful home, but it additionally fosters an experience of accomplishment and creativity. By integrating DIY home decor elements into your projects, you can ensure that every space in your home reflects your unique personality.</span></p>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">DIY home projects are an extraordinary manner to specify your creativity at the same time as improving your dwelling area. With the right ideas and resources, you can rework your home right into a reflection of your character and style. Explore our DIY Home Projects category for more suggestions, tricks, and suggestions to get begun for your subsequent mission these days! By conducting DIY, you no longer handiest create a stunning domestic but additionally revel in the method of creating it uniquely yours. Happy crafting, and don&rsquo;t forget to explore the best DIY home security tips to make your home both stylish and secure!</span></p>`,
      },
      "Interior Design Trends": {
        title: "Top Interior Design Styles & Modern Trends to Know",
        description:
          "Discover the latest interior design trends and modern styles. Stay ahead with fresh ideas and elevate your space with the best design inspiration for 2025",
        keywords:
          "interior design styles,modern interior design,interior design trends,interior design ideas for home",
        shortDescription:
          "Where we explore the state-of-the-art interior design trends and thoughts to transform your dwelling space into a haven of splendor and comfort. Staying updated with modern interior design tendencies is essential for developing a home that reflects your character even as also being purposeful and alluring. Whether you’re making plans for a whole protection or just trying to refresh a room, knowledge of the latest trends can inspire you to make impactful adjustments.",
        html: `<h2><strong><span style="font-size:16pt;font-family:Arial,sans-serif;">Embracing Sustainable Design</span></strong></h2>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">One of the most considerable trends in contemporary interior design styles nowadays is sustainability. Homeowners are more and more searching for eco-friendly substances and practices that reduce environmental effects. This includes using reclaimed timber, recycled materials, and coffee-VOC paints. Incorporating plant life into your decor no longer only complements aesthetics but also improves air niceness, making biophilic design a famous desire. By embracing sustainable design, you can create a lovely area that aligns with your values and contributes to a more fit planet.</span></p>
<p><br/></p><h2><strong><span style="font-size:16pt;font-family:Arial,sans-serif;">Minimalism Meets Maximalism</span></strong></h2>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">The conflict of minimalism and maximalism is shaping modern interior design. Minimalism makes a speciality of simplicity, easy strains, and a litter-unfastened surroundings, even as maximalism celebrates bold colorations, styles, and eclectic decor. Many owners are finding a stability between the 2, creating spaces which might be both practical and visually stimulating. This fashion permits for private expression through curated collections and announcement portions, making your home uniquely yours. Consider incorporating some bold add-ons or artwork right into a minimalist area to feature a person without overwhelming the layout.</span></p>
<p><br/></p><h2><strong><span style="font-size:16pt;font-family:Arial,sans-serif;">Warm Color Palettes</span></strong></h2>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">Warm color schemes are returning, ditching the cool hues that reigned for the past years. Earthy tones consisting of terracotta, yellow mustard, and dark greens deliver a warm, welcoming environment. These colors may be carried out in unique forms, starting from wall paint to furniture, add-ons, and extra. Combining heat hues with organic substances inclusive of wooden and stone adds to the overall warm temperature of a place, growing a cozier and extra inviting environment. This is one of the best interior design ideas for home that can be done without problems.</span></p>
<p><br/></p><h2><strong><span style="font-size:16pt;font-family:Arial,sans-serif;">Multi-Functional Spaces</span></strong></h2>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">With remote employment and bendy lifestyle gaining popularity, there may be growing call for for multifunctional space. Homeowners need to be able to do greater with what they have got in terms of maximising their place and creating the forms of multifunctional rooms that can work more than one methods. It might include a home workplace doubling as a bedroom or a living room that turns fast into an workout room. Adding modular fixtures like a foldable table or sofa bed will help you in achieving that fashion while preserving your style and order intact. This modern interior design technique is a game-changer in contemporary homes.</span></p>
<p><br/></p><h2><strong><span style="font-size:16pt;font-family:Arial,sans-serif;">Statement Lighting</span></strong></h2>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">Lighting is not just a utilitarian aspect anymore; it has come to be the center-piece of contemporary interior design trends. Show-stopping lights, like oversized chandeliers or quirky pendant lighting fixtures, can revolutionize the ecosystem of an area. Designers are pushing the limits with strong shapes, vibrant colorings, and unconventional substances to produce putting pieces which can be artwork in themselves. When choosing lights, consider how it integrates with your usual design aesthetic and elevates the mood of the room. Unique lighting ideas are an integral part of modern interior design.</span></p>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">Keeping up with the modern interior design trends is essential to designing a domestic that expresses your personality and suits your needs. From going inexperienced with sustainable layout to harmonizing minimalism and maximalism, those trends offer a wealthy source of idea for reinventing your space. Warm coloration schemes, multi-functional areas, and display-stopping lights are some of the interior design ideas for home which can take your home&apos;s style and capability to the next stage. Visit our Interior Design Trends section for added recommendation, ideas, and notion to make your lovely living space turn out to be one that you&apos;ll adore for many years to come. Happy adorning!</span></p>`,
      },
      "How To ?": {
        title: "Home Maintenance Tips & Guides | Homimprovement",
        description:
          "Get the best home maintenance tips and guides to keep your home beautiful and functional year-round. Actionable advice on repairs, upgrades, and more!",
        keywords:
          "home maintenance list,home maintenance tips,Home improvement guides",
        shortDescription:
          'Welcome to Homimprovement\'s "How To?" category, where we give you specified step-by-step instructions and useful guidelines on how to use the arena of smart technology. With greater smart home gadgets available on the market these days, getting to know the way to set up, use, and fasten them is crucial in order to achieve their advantages. You are both a technology amateur or a pro user; our special home improvement guides will make sure you get the first-rate from your smart home experience.',
        html: `<h2><strong><span style="font-size:16pt;font-family:Arial,sans-serif;">Setting Up Your Smart Home Devices</span></strong></h2>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">Setting up your gadgets well is one of the initial steps in the direction of constructing a smart home. Our &quot;How To?&quot; guides vary from installing smart audio systems and security cameras to setting up smart thermostats and lighting fixtures systems. We give clean commands, along with required equipment, app downloads, and suggestions on a way to troubleshoot so that the setup manner goes easily. With our step-by-step publications, you will be able to install your smart home devices with a bit of luck and without difficulty. Our home maintenance tips will help you maintain these devices efficiently.</span></p>
<p><br/></p><h2><strong><span style="font-size:16pt;font-family:Arial,sans-serif;">Integrating Smart Home Systems</span></strong></h2>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">Integrating between different smart home devices can optimize their functionality and provide a streamlined user experience. Our tutorials will guide you through connecting devices of different brands and platforms so they function in a harmonious state. Discover how to utilize smart hubs, voice assistants, and automation routines to achieve a uniform smart home system. We&apos;ll also give advice on how to optimize your network for improved connectivity and performance. Keeping a home maintenance list will ensure all smart systems run smoothly.</span></p>
<p><br/></p><h2><strong><span style="font-size:16pt;font-family:Arial,sans-serif;">Maximizing Energy Efficiency</span></strong></h2>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">One of the key benefits of smart home era is how it can make your property greater strength green. Our &quot;How To?&quot; segment capabilities tutorials on ways to use smart thermostats, smart plugs, and smart display units to cut down your power usage and save money to your utility bills. Learn the way to schedule your usage, construct power-saving routines, and hold an eye for your utilisation so that you could make best decisions approximately your energy use. With our recommendation, you may have a greener, inexpensive home. Regularly updating your home maintenance list will help you monitor energy efficiency.</span></p>
<p><br/></p><h2><strong><span style="font-size:16pt;font-family:Arial,sans-serif;">Troubleshooting Common Issues</span></strong></h2>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">Even the great smart home devices may additionally run into problem rarly. Our troubleshooting guides tackle typical problems you would possibly enjoy, which include connectivity, device, and app-related troubles. We provide you with genuine answers and tips to quick and efficaciously resolve the troubles. Through our guides, you may avoid downtime and make certain your smart home continues to works as it need to. Following our home maintenance tips will assist in troubleshooting smart devices efficiently.</span></p>
<p><br/></p><h2><strong><span style="font-size:16pt;font-family:Arial,sans-serif;">Exploring New Features and Updates</span></strong></h2>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">Smart home tech is changing continuously, with more features and releases happening every day. Our &quot;How To?&quot; articles will ensure you stay on top of new developments in smart home devices and how to capitalize on them. Find out how to update your gadgets, check out latest functions, and use the new software updates to enrich your smart home experience. With our help, you&apos;ll make sure you are maximizing your use of your gadgets. Our home improvement guides will provide additional insights on keeping your home updated.</span></p>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">The &quot;How To?&quot; section at Homimprovement is your one-stop for getting to know smart home technology. With step-by-step commands, beneficial pointers, and troubleshooting pointers, we hope to allow you to build a related and strength-efficient living area. Whether you&apos;re installing new devices, merging systems, optimizing electricity performance, or troubleshooting, our guide will walk you through every step. Visit our &quot;How To?&quot; section today and unleash the entire energy of your smart home! Our home maintenance list and home maintenance tips will support you in maintaining a well-functioning home.</span></p>`,
      },
      Best: {
        title: "Best Smart Home System: Guide to Top Devices & Integration ",
        description:
          "Explore top smart home systems that blend security, energy efficiency, and seamless integration. Find the best devices to upgrade your home today!",
        keywords: "best smart home devices,best smart home system",
        shortDescription:
          'Welcome to the "Best" category of Homimprovement, wherein we pick and present to you the greatest products, equipment, and solutions for each element of your own home development task. If you need the high-quality smart home devices, the maximum appropriate equipment for home improvement tasks, or the maximum rated materials for preservation, our expertly decided on guidelines will provide you with the entirety you need. Based on expert evaluation and consumer reviews, you can choose with confidence the satisfaction to transform your home.',
        html: `<h2><strong><span style="font-size:16pt;font-family:Arial,sans-serif;">Best Smart Home Devices</span></strong></h2>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">In today&apos;s digital age, home automation generation is changing the manner we live. Our &quot;Best&quot; category showcases the best smart home devices which are convenient, steady, and energy-green. From smart thermostats and security cameras to smart audio systems and light systems, we assess every device based totally on performance, usability, and compatibility. Find out the satisfaction of building the best smart home system that suits your lifestyle and requirements. Whether you&rsquo;re searching for voice-controlled assistants or automated lighting solutions, our carefully curated list will help you find the best smart home devices to upgrade your home.</span></p>
<p><br/></p><h2><strong><span style="font-size:16pt;font-family:Arial,sans-serif;">Best Tools for DIY Projects</span></strong></h2>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">Each DIY person is aware of the significance of proper equipment to reap successful home improvement obligations. In this method, we highlight the top tools for particular jobs, ranging from electricity equipment handy tools to specialized gadgets. Our selections are based totally on excellence, sturdiness, and a person who revels in it, so that you can put money into tools in order to ultimately last a long time. Whether you&apos;re an amateur or an expert, our cautiously decided on listing will help you in stocking your workshop with the finest gear available. Additionally, a best smart home system can seamlessly integrate automation with your&nbsp;</span><a href="https://homimprovement.com/upgrade-yourself/diy-home-projects"><u><span style="color:#1155cc;font-size:11pt;font-family:Arial,sans-serif;">DIY projects</span></u></a><span style="font-size:11pt;font-family:Arial,sans-serif;">, making tasks easier and more efficient.</span></p>
<p><br/></p><h2><strong><span style="font-size:16pt;font-family:Arial,sans-serif;">Best Materials for Renovations</span></strong></h2>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">Selecting the top-of-the-line materials is constantly the key to any renovation mission. Our &quot;Best&quot; category showcases relatively recommended materials used for flooring, cabinetry, countertops, and plenty of extra. We give our readers an understanding of the strengths and weaknesses of every material and offer recommendations on where to accumulate them and utilize them nicely. If you&apos;re renovating your kitchen, lavatory, or home, our blogs will help you make the perfect picks with the right materials that allow you to bring about your best smart home system with modern, high-quality materials. With the right materials, you can also enhance the functionality of your best smart home devices to create a seamless living experience.</span></p>
<p><br/></p><h2><strong><span style="font-size:16pt;font-family:Arial,sans-serif;">Best Home Improvement Products</span></strong></h2>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">From paint and adhesives to insulation and fixtures, our &quot;Best&quot; category covers a wide range of home improvement products. We evaluate each product based on performance, ease of application, and value for money. Our goal is to help you find the best smart home devices and other improvement tools that will make your projects easier and more successful. With our expert reviews and recommendations, you can confidently choose the right products for your home improvement needs. Investing in a best smart home system will ensure that your home remains connected, efficient, and modern.</span></p>
<p><br/></p><h2><strong><span style="font-size:16pt;font-family:Arial,sans-serif;">Best Practices for Home Improvement</span></strong></h2>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">Along with product tips, our &quot;Best&quot; section additionally features pleasant practices for smart home improvement projects. Discover high-quality strategies for portraying, tiling, installing flooring, and more. Our guides offer helpful pointers and tricks to make certain you get expert-searching consequences, whether or not you&apos;re working on a small challenge or a huge renovation. By using our quality practices, you may enhance your competencies and have your initiatives finished to the highest level. Additionally, integrating the best smart home system into your renovation plans can improve security, convenience, and energy efficiency. A well-structured approach will ensure that your best smart home devices function optimally within your space.</span></p>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">The &quot;Best&quot; category at Homimprovement is your go-to location for locating high-quality products, tools, and answers for each issue of your house improvement. Based on our expert analysis, client critiques, and handpicked hints, you can make the first-rate choices so that it will make your home great to stay in and boom its fee. Check out our &quot;Best&quot; category now and find out the first-rate products to take your own home improvement project to the following degree!</span></p>`,
      },
      Vs: {
        title: "Product and Technology Comparison | Homimprovement",
        description:
          "Explore in-depth product and technology comparisons to help you make smarter choices for your next home purchase. Find the best options today!",
        keywords: "product comparison,technology comparison",
        shortDescription:
          'Welcome to the "Versus" section of Homimprovement, in which we compare famous home improvement products and tools in opposition to each other to assist you in making better choices. In a world full of picks, it may be hard to determine which products are surely satisfactorily suited to your functions. Our intensity product comparison and technology comparison will come up with an idea of the strengths and weaknesses of each choice so you can make a smart decision for your own home development endeavours.',
        html: `<h2><strong><span style="font-size:16pt;font-family:Arial,sans-serif;">Smart Home Devices: Alexa vs. Google Assistant</span></strong></h2>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">Among the smart home gadgets, two giants dominate the market: Amazon Alexa and Google Assistant. Our &quot;Versus&quot; category will examine the capabilities, compatibility, and person revel in among each of the structures. See which smart home system is the first-class good for you, based on your precedence for voice popularity, device assist, or usability. Our full evaluation manual permit you to with a bit of luck pick the greatest smart assistant to your connected home. This technology comparison will help you understand which assistant suits your needs best.</span></p>
<p><br/></p><h2><strong><span style="font-size:16pt;font-family:Arial,sans-serif;">Power Tools: Corded vs. Cordless</span></strong></h2>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">When it involves power tools, possibly the most frequent product comparison is between corded and cordless. Our &quot;Versus&quot; category will discuss the pros and cons of each, inclusive of electricity, portability, and battery existence. Whether you&apos;re a homeowner or an expert contractor, knowing the variations will enable you to pick out the first-rate tools for your job. We&apos;ll make suggestions for every undertaking, so that you know you have got the right tool for the project. This technology comparison will ensure you make the most informed decision.</span></p>
<p><span style="font-size:11pt;font-family:Arial,sans-serif;">The &quot;Versus&quot; section at Homimprovement is your one-stop guide for comparing the top products and tools solutions in home improvement. Through our in-depth product comparison, expert tips, and person critiques, you can make knowledgeable decisions as a way to decorate your living area and maximize your house&apos;s functionality. Visit our &quot;Versus&quot; section these days and discover the best products to take your home improvement initiatives to the next level! Our technology comparison guides will keep you updated on the latest advancements and trends.</span></p>
`,
      },
      Reviews: {
        title: "Product Analysis and Reviews | Best Product Review Website",
        description:
          "Explore honest product analysis and the latest reviews for your smart home. Get expert buying advice and discover the best products today!",
        keywords: "product analysis, best product review websites",
        shortDescription:
          "In which we explore the area of smart home devices to help you in making your living area greater linked, green, and cushy. With technology advancing every day, smart home gadgets are gaining titanic popularity, presenting comfort, security, and electricity efficiency. Whether you're a tech geek or a property owner who wants to smarten up your house, our in-depth opinions will assist you choose the maximum appropriate smart home brand to your necessities. Our product analysis guarantees that every gadget is assessed thoroughly to help you make the best choice.",
        html: `<h2 dir="ltr" style="line-height:1.38;margin-top:18pt;margin-bottom:6pt;"><span style="font-size:16pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">In-Depth Product Evaluations</span></h2>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Our smart home product opinions contact on in reality all kinds of devices which are to be had, starting from smart audio system to security cameras, smart thermostats, lights manage structures, and others. Every evaluation is carefully written to present you an in-depth information of the functions, overall performance, and value of the product. We observe key elements like installation, compatibility with different gadgets, app usability, and well-known person enjoyment. Our challenge is to offer you with all of the records you need to make smart selections about which smart home devices will upload fee in your existence. If you&apos;re searching for trusted sources, we also cover the best product review websites to enhance your research.</span></p>
<p><br/></p><h2 dir="ltr" style="line-height:1.38;margin-top:18pt;margin-bottom:6pt;"><span style="font-size:16pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Expert Comparisons and Recommendations</span></h2>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Along with our individual product reviews, we also offer professional comparisons so you can see how various smart home gadgets examine to each other. Our aspect-by-side exams examine the professionals and cons of alternative merchandise, giving you a clear way to look which products great fit your home. Whether you&apos;re attempting to find the maximum truthful&nbsp;</span><a href="https://homimprovement.com/reviews/blink-outdoor-4-review" style="text-decoration:none;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#1155cc;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">smart security cameras</span></a><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">&nbsp;or the most appropriate smart lighting choice, our critiques provide you with sound pointers after complete evaluation. Our product analysis helps break down the strengths and weaknesses of each gadget, ensuring that you make an informed decision.</span></p>
<p><br/></p><h2 dir="ltr" style="line-height:1.38;margin-top:18pt;margin-bottom:6pt;"><span style="font-size:16pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Real-World Testing and User Feedback</span></h2>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">We realize that actual international performance is paramount in terms of smart home devices. That&apos;s why our reviews include real-global trying out and person revel in to present a complete review of the overall performance of each device. By contemplating the stories of actual customers, we are able to offer insights into how nicely a device plays in actual-existence scenarios. This way, our reviews are not most effective informative but additionally indicative of the actual international applications of smart home generation. Additionally, we reference the best product review websites to provide external validation for our findings.</span></p>
<p><br/></p><h2 dir="ltr" style="line-height:1.38;margin-top:18pt;margin-bottom:6pt;"><span style="font-size:16pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Staying Updated on Smart Home Trends</span></h2>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">The smart home devices is unexpectedly evolving, with new products and innovations emerging regularly. Our Reviews category is dedicated to retaining you knowledgeable about the present day traits and improvements in&nbsp;</span><a href="https://homimprovement.com/upgrade-yourself/smart-home-technology" style="text-decoration:none;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#1155cc;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">smart home technology</span></a><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">. We cover all of it, making sure you&rsquo;re always privy to the first-rate alternatives to be had. By staying up to date on smart home technology, you can make great choices about which products to invest in for your house. Our ongoing product analysis ensures that you receive the most relevant and up-to-date information.</span></p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Our Smart Home Product Reviews category at Homimprovement is your ultimate guide for navigating the arena of smart home devices. With in-intensity product evaluations, expert comparisons, actual-world trying out, and the brand new developments, we aim to empower you to make informed decisions for your smart home purchases. Whether you&rsquo;re seeking to beautify your property&rsquo;s security, improve strength efficiency, or smartly revel in the convenience of linked devices, our evaluations will manual you every step of the manner. Explore our smart home product nowadays and find out the excellent answers to raise your dwelling enjoy! Don&apos;t forget to check out the best product review websites for additional insights and recommendations.</span></p>`,
      },
      Deals: {
        title: "Smart Home Deals: Discounts You Can’t Miss!",
        description:
          "Get exclusive smart home deals today! Shop top smart home bundle deals to automate your home for less. Save big on automation essentials—Act now!",
        keywords: "smart home bundle deals, smart home deals today, home automation deals, great deal products, smart deal, smart deals, smart deals now",
        shortDescription:
          "In our increasingly busy world, adding smart home technology to your abode has never been easier. Here at Homimprovement, we are pleased to showcase a wide range of smart home bundle deals to suit any budget and need. Whether you're looking to get into home automation for the first time or are an experienced tech person, our smart home bundle deals allow you to start building out a better home.",
        html: `<h2><strong>Discover Smart Home Bundle Deals</strong></h2>
<h2><span style="font-weight: 400;">Smart home bundle deals Our smart home bundle deals are a great way to level up your home and save big in the process. Often, these bundles include more than one device that can&ensp;work in harmony with each other to give you a fully connected smart home experience. These packages, ranging from smart lights to </span><a href="https://homimprovement.com/best/indoor-security-camera"><span style="font-weight: 400;">security cameras</span></a><span style="font-weight: 400;">, are curated&ensp;to ensure compatibility and ease of use. The bundling of products is often seen as a cost-effective solution, saving money when items are bought&ensp;together instead of separately. And with each bundle designed to work together, you'll reap&ensp;the rewards of </span><a href="https://homimprovement.com/smart-home-technology/smart-home-matter-thread"><span style="font-weight: 400;">interconnected devices</span></a><span style="font-weight: 400;"> that work through one app.</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span></h2>
<h2><strong>Smart Home Deals Today</strong></h2>
<h2><span style="font-weight: 400;">Want to save even more on smart home deals today? You&rsquo;re in luck! From the latest sales on highly-rated </span><a href="https://homimprovement.com/smart-home-technology/must-have-smart-home-devices"><span style="font-weight: 400;">smart home devices</span></a><span style="font-weight: 400;"> to&ensp;the best offers on top-of-the-line appliances, our website is updated daily. Whether it&rsquo;s an energy-efficient </span><a href="https://homimprovement.com/smart-home-technology/smart-thermostat-save-energy"><span style="font-weight: 400;">smart thermostat</span></a><span style="font-weight: 400;"> or a </span><a href="https://homimprovement.com/best/smart-locks"><span style="font-weight: 400;">smart lock</span></a><span style="font-weight: 400;"> to&ensp;secure your property, we can help. Date-stamped deals, to ensure&ensp;you receive the lowest prices possible. From </span><a href="https://homimprovement.com/best/smart-kitchen-appliances"><span style="font-weight: 400;">kitchen products</span></a><span style="font-weight: 400;"> to security, there are all sorts of products you can&ensp;enjoy that fit your lifestyle. There are also customer reviews to guide&ensp;your decisions regarding your purchases.</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span></h2>
<h2><strong>Home Automation Deals</strong></h2>
<h2><span style="font-weight: 400;">Get with the home automation times; our home automation deals make it more affordable than ever! Just envision&ensp;having the ability to manage your </span><a href="https://homimprovement.com/upgrade-yourself/smart-home-technology"><span style="font-weight: 400;">lights, thermostat, and security system from your phone or use voice commands</span></a><span style="font-weight: 400;">. Smart lighting is part of our smart home bundle deals as they are bulbs you can dim or change the mood of any color&ensp;and from anywhere smart thermostats can learn your schedule and adjust&ensp;temperatures as needed to help save energy and money. Our security systems also guard your home with smart cameras and&ensp;alarms you can check from anywhere.</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span></h2>
<p>&nbsp;</p>
<h2><strong>Great Deal Products</strong></h2>
<h2><span style="font-weight: 400;">If you want to know more about Homimprovement and our great deal products for your home, please read more. We have the smart speakers pro,&ensp;letting you control your smart home with voice commands as you stream music. </span><a href="https://homimprovement.com/smart-home-technology/what-is-a-smart-plug"><span style="font-weight: 400;">Smart plugs</span></a><span style="font-weight: 400;"> can make your devices smart and enable control from a distance. We also showcase an array of smart appliances, including refrigerators and ovens, that bring a new level of ease to meals and food stockkeeping for those&ensp;who may be ready for a </span><a href="https://homimprovement.com/smart-home-technology/smart-kitchens-integrating-technology-for-a-connected-home"><span style="font-weight: 400;">kitchen upgrade</span></a><span style="font-weight: 400;">. These great deal products are ideal for&ensp;anyone who wants to modernize their home with smart technology.</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span></h2>
<h2><strong>Smart Deals Now</strong></h2>
<h2><span style="font-weight: 400;">Make sure that you don&rsquo;t wait to upgrade your home! Now with smart deals, it&rsquo;s the perfect time to look&ensp;for a smart investment. Our extensive organization and&ensp;search features help you find what you need quickly. Your information is safe during the checkout process, and if you have any questions or concerns about your purchases, our customer support team is here to&ensp;help you.</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span></h2>
<h2><strong>Wrap-Up</strong></h2>
<h2><span style="font-weight: 400;">Overall, Homimprovement is the place to&ensp;be for the best smart home deals of the season. Smart home bundle deals and daily promotions with quality means&ensp;you can tailor your living space into the smart home you want it to be. Take advantage of our great deals on products and home automation. Make your home smart with the smart deals and smart deals now! And for anyone interested in making smart&ensp;choices, we offer </span><a href="https://homimprovement.com/home-insights/vs"><span style="font-weight: 400;">Versus guides</span></a><span style="font-weight: 400;"> and smart home product reviews to help you understand which devices are best for you.</span></h2>`,
      },
    };

    return (
      seoData[category] || {
        title: "Homimprovement | Home Improvement Blog",
        description:
          "Explore a wide range of home improvement ideas and trends.",
        keywords: "Home Improvement, DIY, Interior Design, Smart Technology",
      }
    );
  };
  const { title, description, keywords, shortDescription, html } =
    getSeoDetails(modifiedCategoryName);
  if (loading)
    return <div className="text-gray-500 text-center h-screen">Loading...</div>;
  if (error)
    return (
      <div className="text-gray-500 text-center h-screen">
        Error: {error.message}
      </div>
    );
  // Sort posts by view_count in descending order
  const sortedPosts = [...posts].sort((a, b) => b.view_count - a.view_count);
  const mostViewedPost = sortedPosts[0]; // Most viewed post
  const remainingPosts = sortedPosts.slice(1); // Remaining posts
  // UI for Upgrade Yourself category
  const UpgradeYourselfUI = () => (
    <>
      <div
        className="relative w-full lg:h-[250px] h-[350px] flex flex-col lg:gap-5 gap-3 py-5 lg:px-[10%] px-[2%]"
        style={{
          backgroundImage: `linear-gradient(90deg, #000025 0%, rgba(0, 0, 139, 0.3) 100%), url('/background.webp')`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}>
        <h1 className="lg:text-5xl text-xl font-semibold text-white">
          {modifiedCategoryName}
        </h1>
        <p className="lg:text-base text-xs text-white space-y-4 leading-relaxed ">
          {shortDescription}
        </p>
      </div>
      <div className="lg:px-[15%] lg:py-[2%] px-[2%] py-[2%] bg-[#00008B] bg-opacity-30">
        {posts && (
          <div className="mb-6">
            <h2 className="lg:text-2xl text-lg font-semibold mb-2">
              {posts[0].title}
            </h2>
            <Link
              to={`/${createSlug(
                posts[0]?.category_names?.split(",")[0]
              )}/${createSlug(posts[0]?.Custom_url)}`}
              className="block">
              <img
                src={
                  posts[0].featured_image
                    ? `${import.meta.env.VITE_API_URL}/${posts[0].featured_image}`
                    : "https://via.placeholder.com/300x200.png?text=No+Image"
                }
                alt={posts[0].title}
                className="w-full h-[300px] object-cover mb-4"
                loading="lazy"
              />
              <p className="lg:text-lg text-base text-gray-700">
                {posts[0].seoDescription}
                ...
              </p>
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {posts.slice(1).map((post) => (
            <div
              key={post.id}
              className="bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <img
                src={
                  post.featured_image
                    ? `${import.meta.env.VITE_API_URL}/${post.featured_image}`
                    : "https://via.placeholder.com/300x200.png?text=No+Image"
                }
                alt={post.title}
                className="w-full h-40 object-cover mb-2"
                loading="lazy"
              />
              <div className="p-2">
                <h3 className="lg:text-md text-base font-semibold line-clamp-2">
                  {post?.title}
                </h3>
                <p className="lg:text-sm text-xs text-gray-600 line-clamp-2">
                  {post?.seoDescription}
                </p>
                <Link
                  to={`/${createSlug(
                    post?.category_names?.split(",")[0]
                  )}/${createSlug(post?.Custom_url)}`}
                  className="text-[#00008B] hover:underline inline-block">
                  Read More...
                </Link>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 space-x-3">
            <button
              disabled={currentPage === 1}
              onClick={() => fetchPosts(currentPage - 1)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-[#00008B] rounded-full shadow-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
              <FaChevronLeft className="text-lg" />
              Prev
            </button>

            <span className="px-4 py-2 text-lg font-semibold text-gray-800 bg-gray-100 rounded-lg shadow-md">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => fetchPosts(currentPage + 1)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-[#00008B] rounded-full shadow-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
              Next
              <FaChevronRight className="text-lg" />
            </button>
          </div>
        )}
        <div className="leading-relaxed py-5">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </>
  );

  const HomeInsightsUI = () => (
    <>
      {/* Category Title Section */}
      <div className="relative w-full lg:h-[250px] h-[350px] flex flex-col lg:gap-5 gap-3 py-5 lg:px-[10%] px-[2%]">
        <h1 className="lg:text-5xl text-center text-xl font-semibold text-black">
          {modifiedCategoryName}
        </h1>
        <p className="text-lg text-black text-justify space-y-4 leading-relaxed">
          {shortDescription}
        </p>
      </div>

      {/* Posts Section */}
      <div className="lg:mx-[10%] mx-[2%]">
        {/* <div className="mb-5">
          <h2 className="lg:text-3xl text-xl font-semibold text-left text-black underline">
            Latest about {modifiedCategoryName}
          </h2>
        </div> */}
        {posts && posts.length > 0 && (
          <>
            {/* Top Section: Featured Post and Smaller Cards */}
            <div className="grid lg:gap-4 gap-2 lg:grid-cols-3">
              {/* Featured Post (Big Card) */}
              <div className="relative lg:col-span-2 order-1 lg:order-none">
                <Link
                  to={`/${createSlug(
                    posts[0]?.category_names?.split(",")[0]
                  )}/${createSlug(posts[0]?.Custom_url)}`}
                  className="block relative h-full">
                  <img
                    src={
                      posts[0]?.featured_image
                        ? `${import.meta.env.VITE_API_URL}/${
                            posts[0]?.featured_image
                          }`
                        : "https://via.placeholder.com/600x400.png?text=No+Image"
                    }
                    alt={posts[0]?.title}
                    className="w-full lg:h-[450px] h-[250px] object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="lg:text-2xl text-lg font-semibold">
                      {posts[0]?.title}
                    </h3>
                    <p className="lg:text-lg text-base mt-2">
                      {posts[0]?.seoDescription}
                    </p>
                  </div>
                </Link>
              </div>

              {/* Smaller Cards - Equal Height */}
              <div className="flex flex-col lg:gap-4 gap-2 order-2 lg:order-none h-full">
                {posts.slice(1, 3).map((post, index) => (
                  <div
                    key={post.id}
                    className="relative flex-1 flex flex-col bg-white">
                    <Link
                      to={`/${createSlug(
                        post?.category_names?.split(",")[0]
                      )}/${createSlug(post?.Custom_url)}`}
                      className="block relative h-full">
                      <img
                        src={
                          post?.featured_image
                            ? `${import.meta.env.VITE_API_URL}/${
                                post?.featured_image
                              }`
                            : "https://via.placeholder.com/300x200.png?text=No+Image"
                        }
                        alt={post?.title}
                        className="w-full h-[150px] object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="lg:text-lg text-base font-semibold">
                          {post?.title}
                        </h3>
                        <p className="lg:text-base text-sm mt-1 line-clamp-2">
                          {post?.seoDescription}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <hr className=" border-gray-300 my-5" />
            {/* Remaining Posts Section */}
            <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-6 gap-2 lg:mt-8 pb-8">
              {posts.slice(3).map((post) => (
                <>
                  <div
                    key={post.id}
                    className="flex flex-row items-start lg:gap-10 gap-2">
                    <div className="w-5/12">
                      <img
                        src={
                          post?.featured_image
                            ? `${import.meta.env.VITE_API_URL}/${
                                post?.featured_image
                              }`
                            : "https://via.placeholder.com/300x200.png?text=No+Image"
                        }
                        alt={post?.title}
                        className="w-full lg:h-[150px] h-[130px] object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="w-2/3">
                      <h3 className="lg:text-lg text-base font-semibold line-clamp-2">
                        {post?.title}
                      </h3>
                      <p className="lg:text-base text-sm text-gray-600 mt-2 line-clamp-2">
                        {post?.seoDescription}
                      </p>
                      <Link
                        to={`/${createSlug(
                          post?.category_names?.split(",")[0]
                        )}/${createSlug(post?.Custom_url)}`}
                        className="text-blue-600 hover:underline mt-2 inline-block">
                        Read More...
                      </Link>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </>
        )}
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 space-x-3">
            <button
              disabled={currentPage === 1}
              onClick={() => fetchPosts(currentPage - 1)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-[#00008B] rounded-full shadow-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
              <FaChevronLeft className="text-lg" />
              Prev
            </button>

            <span className="px-4 py-2 text-lg font-semibold text-gray-800 bg-gray-100 rounded-lg shadow-md">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => fetchPosts(currentPage + 1)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-[#00008B] rounded-full shadow-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
              Next
              <FaChevronRight className="text-lg" />
            </button>
          </div>
        )}
        <div className="leading-relaxed py-5">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* React Helmet for SEO */}
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="Category Page" />
        <meta property="og:url" content={`${currentUrl}`} />
        <link rel="canonical" href={`${currentUrl}`} />
      </Helmet>
      {categoryType === "Upgrade Yourself" && <UpgradeYourselfUI />}
      {categoryType === "Home Insights" && <HomeInsightsUI />}
    </>
  );
};

// Helper function to create slug
const createSlug = (title) => {
  // Check if the title is not null and is a string before processing
  if (typeof title !== "string") {
    return ""; // Return an empty string or handle the case as needed
  }
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
};

export default CategoryPosts;
