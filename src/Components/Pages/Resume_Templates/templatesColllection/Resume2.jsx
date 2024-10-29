const Resume2 = (props) => {
  
  const {
    personalInfo,
  
    skills,
    careerObjective,
    projects,
    education,
    experience,
    languages,
    certificates,
    awards,
  } = props?.props;
  console.log(props.props)

  return (
    <div className="w-full mx-auto bg-white p-10 shadow-lg">
      {/* Resume Title and Contact Information */}
      <header className="flex flex-col items-center mb-10">
        <h1 className="text-5xl font-bold text-orange-600 mb-2">
          {personalInfo?.name}
        </h1>
        <h2 className="text-lg text-gray-500 font-light">Web Developer</h2>
        <p className="text-gray-600 text-center mt-2">
          {personalInfo?.phone} — {personalInfo?.email} —{" "}
          <a href={personalInfo?.website} className="text-blue-500 underline">
            {personalInfo?.website}
          </a>
        </p>
      </header>

      {/* Career Objective */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold text-orange-600 mb-4">
          Career Objective
        </h3>
        <p className="text-gray-600">
          {careerObjective || "Your career objective goes here."}
        </p>
      </section>

      {/* Summary */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold text-orange-600 mb-4">Summary</h3>
        <p className="text-gray-600">
          A dedicated and result-driven developer with a solid understanding of
          front-end and back-end development. Experienced in working in agile
          environments and using JavaScript, React, Node.js, and other modern
          technologies to build efficient and scalable applications.
        </p>
      </section>

      {/* Experience */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold text-orange-600 mb-4">
          Experience
        </h3>
        {experience && experience.length > 0 ? (
          experience.map((exp) => (
            <div key={exp._id} className="mb-6">
              <h4 className="text-lg font-bold">{exp.jobTitle}</h4>
              <p className="text-gray-500 font-medium">
                {exp.company} • {exp.duration}
              </p>
              <p className="text-gray-600 mt-2">
                {exp.description || "Job description goes here."}
              </p>
              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <ul className="list-disc ml-6 mt-2 text-gray-600">
                  {exp.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600">No experience data available.</p>
        )}
      </section>

      {/* Projects */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold text-orange-600 mb-4">Projects</h3>
        {projects && projects.length > 0 ? (
          projects.map((project, index) => (
            <div key={project._id} className="mb-4">
              <h4 className="text-lg font-bold">
                {project.title || `Project ${index + 1}`}
              </h4>
              <p className="text-gray-600">
                {project.description || "Project description goes here."}
              </p>
              {project.features && project.features.length > 0 ? (
                <ul className="list-disc ml-6 mt-2 text-gray-600">
                  {project.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              ) : (
                <ul className="list-disc ml-6 mt-2 text-gray-600">
                  <li>Feature 1 of the project</li>
                  <li>Feature 2 of the project</li>
                </ul>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600">No projects data available.</p>
        )}
      </section>

      {/* Skills */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold text-orange-600 mb-4">Skills</h3>
        {skills && skills.length > 0 ? (
          <ul className="list-disc ml-6 text-gray-600">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No skills data available.</p>
        )}
      </section>

      {/* Awards */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold text-orange-600 mb-4">Awards</h3>
        {awards && awards.length > 0 ? (
          <ul className="list-disc ml-6 text-gray-600">
            {awards.map((award) => (
              <li key={award._id}>
                {award.title} - {award.organization} ({award.year})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No awards data available.</p>
        )}
      </section>

      {/* Certificates */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold text-orange-600 mb-4">
          Certificates
        </h3>
        {certificates && certificates.length > 0 ? (
          <ul className="list-disc ml-6 text-gray-600">
            {certificates.map((cert) => (
              <li key={cert._id}>
                {cert.title} by {cert.institution}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No certificates available.</p>
        )}
      </section>

      {/* Education Details */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold text-orange-600 mb-4">
          Education
        </h3>
        {education && education.length > 0 ? (
          education.map((edu) => (
            <div key={edu._id} className="mb-4">
              <h4 className="text-lg font-bold">{edu.degree}</h4>
              <p className="text-gray-500">
                {edu.institution} • {edu.startYear} - {edu.endYear}
              </p>
              <p className="text-gray-600 mt-2">
                {edu.description || "Education description goes here."}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No education data available.</p>
        )}
      </section>

      {/* Languages */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold text-orange-600 mb-4">
          Languages
        </h3>
        {languages && languages.length > 0 ? (
          <ul className="list-disc ml-6 text-gray-600">
            {languages.map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No languages data available.</p>
        )}
      </section>
    </div>
  );
};

export default Resume2;
