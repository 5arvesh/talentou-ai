export const onboardingContent = {
  'talent-lead': {
    step1: {
      title: "Company USP",
      checklistItems: [
        "Ensure TA Team use the AI-recommended messaging framework for consistency and personalization.",
        "Experiment with different messaging variations to identify what resonates most with different candidate personas.",
        "Analyze the responses and refine the messaging accordingly: double down on approaches that work and optimize those that don't."
      ],
      nextRoute: "/onboarding/step2"
    },
    step2: {
      title: "Talent Pool",
      checklistItems: [
        "Use Talentou AI to set your strategy to identify the top candidates.",
        "Choose candidates based on criteria like demographics, experience, target companies/educational institutions, salary range, etc.",
        "Guide your TA Team to zero in on the right candidate profiles."
      ],
      nextRoute: "/onboarding/step3"
    },
    step3: {
      title: "Recruitment Channels",
      checklistItems: [
        "Guide your TA Team to use the optimal mix of emails, LinkedIn messages, and calls for maximum candidate engagement.",
        "Monitor outreach process - check if emails are being opened and if calls are sparking conversations.",
        "Refine outreach channels using Talentou AI's insights: double down on those driving the best outcomes and adjust where needed."
      ],
      nextRoute: "/onboarding/step4"
    },
    step4: {
      title: "Success Metrics",
      checklistItems: [
        "Stay on top of TA Team activity metrics: emails sent, responses received, calls made, and interviews scheduled.",
        "Spot pipeline bottlenecks - understand exactly where candidate engagement is falling off.",
        "Use Talentou AI's insights to guide the TA Team, refining their strategies to recruit the right candidates quickly."
      ],
      nextRoute: "/sales-plan",
      isLastStep: true
    }
  },
  'ta-associate': {
    step1: {
      title: "Company USP",
      checklistItems: [
        "Start with Talentou AI's smart templates for emails and LinkedIn—but personalize them with your voice.",
        "Focus on what candidates care about—growth potential, culture, flexibility, or technology stack—and tailor your message accordingly.",
        "Keep it concise, impactful, and action-oriented."
      ],
      nextRoute: "/onboarding-ta-associate/step2"
    },
    step2: {
      title: "Talent Pool",
      checklistItems: [
        "Talentou AI has already narrowed your candidate pool—stick to it for the best results.",
        "Before reaching out, take a moment to understand each candidate's experience and relevance.",
        "Focus first on active or previously engaged candidates, and revisit other profiles as needed."
      ],
      nextRoute: "/onboarding-ta-associate/step3"
    },
    step3: {
      title: "Recruitment Channels",
      checklistItems: [
        "Emails – Your first message matters. Keep it clear, relevant, and tailored to the candidate's profile.",
        "LinkedIn – Leverage LinkedIn to share concise, role-relevant information that sparks candidate engagement.",
        "Calls – Use notes and AI insights from Talentou to personalize every conversation and drive it forward."
      ],
      nextRoute: "/onboarding-ta-associate/step4"
    },
    step4: {
      title: "Success Metrics",
      checklistItems: [
        "Monitor key metrics: email response rates, call outcomes, and interview conversions.",
        "Let Talentou AI guide your next move—optimize based on what's working.",
        "Benchmark against your peers and apply proven tactics to your reach-outs."
      ],
      nextRoute: "/ta-associate-plan",
      isLastStep: true
    }
  }
} as const;

export type OnboardingRole = keyof typeof onboardingContent;
export type OnboardingStep = 'step1' | 'step2' | 'step3' | 'step4';