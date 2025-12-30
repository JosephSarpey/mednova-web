export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  authorRole: string;
  authorImage: string;
  image: string;
  category: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Importance of Holistic Health in Modern Society",
    excerpt: "Holistic health is not just about physical well-being; it encompasses mental, emotional, and social aspects as well...",
    content: `
      <p>Holistic health is an approach to wellness that simultaneously addresses the physical, mental, emotional, social, and spiritual components of health. As a system of care, holistic health emphasizes the personal responsibility of individuals to optimize their health and the use of naturally based healing methods.</p>
      
      <h3>The Five Pillars of Holistic Health</h3>
      <p>When we talk about holistic health, we're looking at five main areas of a person's life:</p>
      <ul>
        <li><strong>Physical:</strong> How your body functions and how you care for it through nutrition, exercise, and sleep.</li>
        <li><strong>Emotional:</strong> Your ability to manage your emotions and cope with life's challenges.</li>
        <li><strong>Social:</strong> The quality of your relationships and your connection to your community.</li>
        <li><strong>Mental:</strong> Your cognitive function and your ability to process information and learn.</li>
        <li><strong>Spiritual:</strong> Your sense of purpose and meaning in life, which may or may not involving religion.</li>
      </ul>

      <blockquote>"The part can never be well unless the whole is well." — Plato</blockquote>

      <p>In modern society, we often focus on treating symptoms rather than addressing the root causes of our health issues. Holistic health encourages us to look at the big picture and make lifestyle choices that support our overall well-being. This might include practicing mindfulness, eating a balanced diet of whole foods, staying active, and fostering meaningful connections with others.</p>

      <h3>How to Start Your Holistic Journey</h3>
      <p>Starting a holistic health journey doesn't have to be overwhelming. You can begin with small, sustainable changes:</p>
      <ol>
        <li>Prioritize 7-9 hours of quality sleep each night.</li>
        <li>Include more colorful vegetables and fruits in your meals.</li>
        <li>Dedicate 10 minutes a day to meditation or deep breathing exercises.</li>
        <li>Reach out to a friend or loved one for a meaningful conversation.</li>
        <li>Spend time in nature whenever possible.</li>
      </ol>
      <p>By taking a holistic approach to your health, you're not just preventing disease; you're creating a foundation for a vibrant, fulfilling life.</p>
    `,
    date: "Dec 28, 2024",
    author: "Dr. Lloyd Okine",
    authorRole: "Medical Director",
    authorImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Wellness",
    tags: ["Holistic", "Wellness", "Lifestyle", "Prevention"]
  },
  {
    id: 2,
    title: "Managing Stress Through Lifestyle Changes",
    excerpt: "Chronic stress is a major contributor to many health issues. Learn how simple lifestyle modifications can help you...",
    content: `
      <p>Stress is a natural physical and mental reaction to life experiences. Everyone experiences stress from time to time. Anything from everyday responsibilities like work and family to serious life events such as a new diagnosis, war, or the death of a loved one can trigger stress.</p>

      <h3>The Impact of Chronic Stress</h3>
      <p>For immediate, short-term situations, stress can be beneficial to your health. It can help you cope with potentially serious situations. Your body responds to stress by releasing hormones that increase your heart and breathing rates and ready your muscles to respond. However, if your stress response doesn't stop firing, and these stress levels stay elevated far longer than is necessary for survival, it can take a toll on your health.</p>

      <p>Chronic stress can cause a variety of symptoms and affect your overall well-being. Symptoms of chronic stress include:</p>
      <ul>
        <li>Irritability and anxiety</li>
        <li>Depression</li>
        <li>Headaches</li>
        <li>Insomnia</li>
      </ul>

      <h3>Practical Lifestyle Changes to Reduce Stress</h3>
      <p>The good news is that you can manage stress effectively through small, intentional changes in your daily routine:</p>
      
      <h4>1. Regular Physical Activity</h4>
      <p>Exercise is one of the most important things you can do to combat stress. It might seem contradictory, but putting physical stress on your body through exercise can actually relieve mental stress.</p>

      <h4>2. Practice Mindfulness</h4>
      <p>Mindfulness describes practices that anchor you to the present moment. It can help combat the anxiety-inducing effects of negative thinking. Techniques include mindfulness-based cognitive therapy, mindfulness-based stress reduction, yoga, and meditation.</p>

      <h4>3. Reduce Caffeine Intake</h4>
      <p>Caffeine is a stimulant found in coffee, tea, chocolate, and energy drinks. High doses can increase anxiety. People have different thresholds for how much caffeine they can tolerate.</p>

      <p>By implementing these strategies, you can take control of your stress levels and improve your quality of life. Remember, managing stress is not about eliminating it entirely but about building resilience and finding healthy ways to cope.</p>
    `,
    date: "Dec 20, 2024",
    author: "Dr. Sarah Johnson",
    authorRole: "Consultant Physician",
    authorImage: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Lifestyle",
    tags: ["Stress Management", "Mental Health", "Productivity"]
  },
  {
    id: 3,
    title: "Public Health Strategies for Community Wellness",
    excerpt: "Effective public health strategies require community engagement and evidence-based interventions...",
    content: `
      <p>Public health is the science of protecting and improving the health of people and their communities. This work is achieved by promoting healthy lifestyles, researching disease and injury prevention, and detecting, preventing, and responding to infectious diseases.</p>

      <h3>Community Engagement as a Foundation</h3>
      <p>One of the most critical aspects of successful public health initiatives is community engagement. When communities are involved in identifying their own health challenges and developing solutions, the interventions are more likely to be sustainable and culturally appropriate.</p>

      <h3>Key Public Health Interventions</h3>
      <p>Some of the most impactful public health strategies include:</p>
      <ul>
        <li><strong>Vaccination Programs:</strong> Preventing the spread of infectious diseases across populations.</li>
        <li><strong>Health Education:</strong> Providing information that empowers individuals to make healthier choices.</li>
        <li><strong>Policy Development:</strong> Implementing laws and regulations that promote health, such as tobacco control or clean air acts.</li>
        <li><strong>Epidemiological Surveillance:</strong> Monitoring health trends to identify and respond to outbreaks early.</li>
      </ul>

      <p>At Mednova+, we believe that a healthy community is the bedrock of a prosperous society. By working together with local leaders, health professionals, and residents, we can create environments that support health for everyone.</p>
    `,
    date: "Dec 15, 2024",
    author: "Dr. Michael Chen",
    authorRole: "Epidemiologist",
    authorImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Public Health",
    tags: ["Community", "Public Health", "Prevention", "Education"]
  },
  {
    id: 4,
    title: "Nutritional Tips for a Healthier Heart",
    excerpt: "Your diet plays a crucial role in heart health. Discover which foods can help strengthen your cardiovascular system...",
    content: `
      <p>Heart disease is a leading cause of death worldwide, but the good news is that much of it is preventable through diet and lifestyle choices. What you put on your plate significantly affects your blood pressure, cholesterol levels, and inflammation—all key factors for heart health.</p>

      <h3>Heart-Healthy Foods to Include</h3>
      <p>Focusing on these nutrient-dense foods can help keep your heart strong:</p>
      <ul>
        <li><strong>Leafy Greens:</strong> Spinach, kale, and collard greens are rich in vitamins, minerals, and antioxidants, particularly Vitamin K.</li>
        <li><strong>Whole Grains:</strong> Swapping refined grains for whole grains like oats, brown rice, and quinoa can help lower cholesterol.</li>
        <li><strong>Berries:</strong> Strawberries, blueberries, and raspberries are packed with antioxidants that protect against oxidative stress.</li>
        <li><strong>Fatty Fish:</strong> Salmon, mackerel, and sardines are high in omega-3 fatty acids, which have been shown to reduce heart disease risk factors.</li>
        <li><strong>Walnuts:</strong> These are a great source of fiber and micronutrients like magnesium, copper, and manganese.</li>
      </ul>

      <h3>Foods to Limit</h3>
      <p>While adding healthy foods is important, it's also crucial to limit those that can harm your heart:</p>
      <ul>
        <li>Highly processed meats (bacon, sausages)</li>
        <li>Sugary drinks and snacks</li>
        <li>Trans fats found in some margarines and commercial baked goods</li>
        <li>Excessive sodium</li>
      </ul>

      <p>Remember, a heart-healthy diet is most effective when combined with regular physical activity and a smoke-free lifestyle. Consult with your doctor or a registered dietitian to create a personalized nutrition plan that works for you.</p>
    `,
    date: "Dec 10, 2024",
    author: "Dr. Emily Williams",
    authorRole: "Nutrition Specialist",
    authorImage: "https://images.unsplash.com/photo-1559839734-2b71f1536780?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Nutrition",
    tags: ["Heart Health", "Nutrition", "Healthy Eating", "Diet"]
  }
];
