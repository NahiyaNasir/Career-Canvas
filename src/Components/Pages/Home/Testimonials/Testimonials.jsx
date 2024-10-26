const Testimonials = () => {
  const testimonials = [
    {
      name: "Ajoy Das",
      image: '../../../../../public/testimonials1.jpg',
      feedback:
        "Using this resume builder was a game-changer for my job search. The templates are modern and professional, and the customization options are fantastic. I was able to create a standout resume in no time!",
      designation: "One of our Clients",
    },
    {
      name: "Jebin Khan",
      image:'../../../../../public/testimonials2.jpg',
      feedback:
        "I was amazed at how easy it was to craft a polished resume with this tool. The user-friendly interface and variety of templates helped me present my skills and experience effectively. Highly recommend for anyone!",
      designation: "One of our Clients",
    },
    {
      name: "Sunny Khan",
      image:'../../../../../public/testimonials3.jpg',
      feedback:
        "This resume builder exceeded my expectations. The professional templates and straightforward process made it simple to create a resume that truly reflects my qualifications.",
      designation: "One of our Clients",
    },
  ];

  return (
    <section className="py-14 px-6 bg-green-50 rounded-2xl md:mt-20 mt-8">
      <div className="container mx-auto px-4 text-center space-y-8">
        <div className="flex gap-2 mb-4 justify-center">
          <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
          <span className="w-4 h-4 bg-purple-500 rounded-full"></span>
          <span className="w-4 h-4 bg-green-500 rounded-full"></span>
          <span className="w-4 h-4 bg-red-500 rounded-full"></span>
          <span className="w-4 h-4 bg-yellow-500 rounded-full"></span>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-bold text-green-500 mb-4">
            Your Success, Our Inspiration
          </h2>
          <p className="text-gray-600 mb-10 text-xl md:w-2/3 items-center">
            Discover how our users have transformed their job search experience
            with our resume builder. Read their stories and see the impact for
            yourself.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-lg text-left hover:shadow-xl transition-shadow duration-300 relative"
            >
              {/* Green Quotation Mark Design */}
              <div className="absolute top-0 left-2">
                <svg
                  fill="currentColor"
                  viewBox="0 0 8 8"
                  className="w-12 h-12 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M3 0c-1.65 0-3 1.35-3 3v3h3v-3h-2c0-1.11.89-2 2-2v-1zm5 0c-1.65 0-3 1.35-3 3v3h3v-3h-2c0-1.11.89-2 2-2v-1z"
                      transform="translate(0 1)"
                    ></path>
                  </g>
                </svg>
              </div>

              <div className="text-center mt-8">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <p className="text-gray-600 mb-4 text-lg">{testimonial.feedback}</p>
                <h3 className="text-green-500 font-bold text-xl">
                  {testimonial.name}
                </h3>
                <p className="text-gray-500 text-lg">{testimonial.designation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
