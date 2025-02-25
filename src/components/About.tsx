
import { Card } from "@/components/ui/card";

export const About = () => {
  const skills = [
    "Artificial Intelligence",
    "Machine Learning",
    "3D Animation",
    "Data Science",
    "Full Stack Development",
    "Cloud Computing",
  ];

  return (
    <section className="container-padding bg-primary" id="about">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title">About Me</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4">Background</h3>
            <p className="text-secondary/80">
              A passionate technologist with expertise in AI, data science, and creative development.
              Focused on building innovative solutions that bridge technology and creativity.
            </p>
          </Card>
          <Card className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-accent/10 text-secondary rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
