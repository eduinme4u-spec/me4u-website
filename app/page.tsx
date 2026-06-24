import { LeadForm } from "@/components/LeadForm";

const courses = [
  {
    title: "Spoken English",
    description: "Daily conversation, pronunciation, vocabulary, and fluency practice."
  },
  {
    title: "Public Speaking",
    description: "Stage confidence, speech structure, presentation flow, and delivery."
  },
  {
    title: "Interview Preparation",
    description: "Self-introduction, HR questions, mock interviews, and confidence drills."
  },
  {
    title: "Career Communication",
    description: "Emails, meetings, professional discussion, and workplace English."
  }
];

export default function HomePage() {
  return (
    <main>
      <div className="topBar">
        <span>Admissions open for online and offline batches</span>
        <a href="#lead-form">Book a free counselling call</a>
      </div>

      <header className="siteHeader">
        <a className="brand" href="#home" aria-label="ME4U Academy home">
          <span className="brandStack">
            <img src="/assets/me4u-logo-symbol.png" alt="ME4U Academy logo" />
            <span>SINCE 2008</span>
          </span>
        </a>
        <nav className="mainNav" aria-label="Main navigation">
          <a href="#courses">Courses</a>
          <a href="#directors">Directors</a>
          <a href="#lead-form">Enquiry</a>
          <a href="/admin/login">Admin</a>
        </nav>
      </header>

      <section className="hero" id="home">
        <div>
          <span className="eyebrow">ME4U Academy Pvt. Ltd.</span>
          <h1>Build English fluency and public speaking confidence.</h1>
          <p>
            A business-ready learning platform for spoken English, interview
            preparation, public speaking, and student follow-up management.
          </p>
          <div className="heroActions">
            <a className="primaryBtn" href="#lead-form">Register Enquiry</a>
            <a className="secondaryBtn" href="tel:+918904884654">Call Now</a>
          </div>
          <div className="stats">
            <div><strong>2600+</strong><span>Students</span></div>
            <div><strong>8+</strong><span>Teachers</span></div>
            <div><strong>2400+</strong><span>Certified students</span></div>
          </div>
        </div>
        <div className="heroImage">
          <img src="/assets/founder-director.jpg" alt="Mutturaj Badiger" />
        </div>
      </section>

      <section className="section" id="courses">
        <div className="sectionHeading">
          <span className="eyebrow">Courses</span>
          <h2>Programs for students and professionals.</h2>
          <p>Every enquiry can now flow into your lead dashboard for follow-up.</p>
        </div>
        <div className="courseGrid">
          {courses.map((course) => (
            <article className="courseCard" key={course.title}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section directors" id="directors">
        <div className="sectionHeading">
          <span className="eyebrow">Leadership</span>
          <h2>Meet the directors behind ME4U Academy.</h2>
        </div>
        <div className="directorGrid">
          <article className="directorCard">
            <img src="/assets/founder-director.jpg" alt="Mutturaj Badiger" />
            <div>
              <span className="eyebrow">Founder & Director</span>
              <h3>Mutturaj Badiger</h3>
              <p>Spoken English mentor, public speaking trainer, and career confidence builder.</p>
            </div>
          </article>
          <article className="directorCard">
            <img src="/assets/komal-director.jpg" alt="Komal Mutturaj Badiger" />
            <div>
              <span className="eyebrow">Co-Founder & Director</span>
              <h3>Komal Mutturaj Badiger</h3>
              <p>Supports student guidance, learning operations, and the academy mission.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="section leadSection" id="lead-form">
        <div className="sectionHeading">
          <span className="eyebrow">Lead Generation</span>
          <h2>Capture enquiries directly into your database.</h2>
          <p>Students can submit this form, and admins can follow up from the dashboard.</p>
        </div>
        <LeadForm />
      </section>

      <footer className="footer">
        <p>&copy; 2026 ME4U Academy Pvt. Ltd. All rights reserved.</p>
        <div>
          <a href="mailto:mutturajenglish4u@gmail.com">mutturajenglish4u@gmail.com</a>
          <a href="tel:+918904884654">+91 89048 84654</a>
        </div>
      </footer>
    </main>
  );
}
