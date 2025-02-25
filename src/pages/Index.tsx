
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { ThreeAnimation } from "@/components/ThreeAnimation";
import { ChatbotProject } from "@/components/ChatbotProject";

const Index = () => {
  const chatbots = [
    {
      title: "GPT Assistant",
      description: "Chat with a GPT-powered AI assistant",
      apiKeyName: "OPENAI_API_KEY"
    },
    {
      title: "Claude Assistant",
      description: "Interact with Claude AI",
      apiKeyName: "ANTHROPIC_API_KEY"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary">
      <ThreeAnimation />
      <Hero />
      <section className="container-padding" id="chatbots">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title">AI Chatbots</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {chatbots.map((bot) => (
              <ChatbotProject
                key={bot.title}
                title={bot.title}
                description={bot.description}
                apiKeyName={bot.apiKeyName}
              />
            ))}
          </div>
        </div>
      </section>
      <Projects />
    </div>
  );
};

export default Index;
