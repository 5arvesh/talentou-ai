export const messageTemplates = {
  // Stage 0: Company USP
  stage0: [
    {
      sender: 'ai',
      content: `Hi! I'm Talentou AI, your recruitment planning assistant. 

Let's build your comprehensive Talent Acquisition plan together. We'll cover:
• Company USP (Your employer value proposition)
• Talent Pool (Target candidate profiles)
• Recruitment Channels (Outreach strategies)
• Success Metrics (KPIs and milestones)
• Team Invitation (Collaborate with your team)

Let's start with your **Company USP**. What makes your company a great place to work? Share your elevator pitch.`,
      name: 'Talentou AI'
    }
  ],

  // Stage 1: Talent Pool
  stage1: [
    {
      sender: 'ai',
      content: `✅ **Company USP completed!** Great work defining your employer value proposition.

Now let's move to **Talent Pool** - identifying your ideal candidates.

I'll help you define:
• Work arrangement preferences (Remote/Hybrid/On-site)
• Geographic targeting
• Target industries and companies
• Required skills and experience

What work arrangement are you offering for these roles? (Remote, Hybrid, or On-site)`,
      name: 'Talentou AI'
    }
  ],

  // Stage 2: Recruitment Channels
  stage2: [
    {
      sender: 'ai',
      content: `✅ **Talent Pool defined!** You now have clear candidate profiles.

Let's plan your **Recruitment Channels** - how you'll reach these candidates.

We'll define:
• Primary outreach channels (Email, LinkedIn, Phone)
• Message sequences and templates
• Outreach cadence and timing
• Follow-up strategies

Which channels would you like to use for candidate outreach? (Select all that apply: Email, LinkedIn, Phone)`,
      name: 'Talentou AI'
    }
  ],

  // Stage 3: Success Metrics
  stage3: [
    {
      sender: 'ai',
      content: `✅ **Recruitment Channels planned!** Your outreach strategy is ready.

Now let's set **Success Metrics** - how you'll measure hiring performance.

We'll define:
• Key Performance Indicators (Time-to-hire, Quality-of-hire, etc.)
• Target numbers for each metric
• Milestone schedule
• Tracking mechanisms

What's your target time-to-hire for these positions? (in days)`,
      name: 'Talentou AI'
    }
  ],

  // Stage 4: Team Invitation
  stage4: [
    {
      sender: 'ai',
      content: `✅ **Success Metrics set!** You have clear KPIs to track.

Final step: **Team Invitation** - collaborate with your recruitment team.

You can invite:
• **Recruiters** - Execute the recruitment plan
• **Hiring Leads** - Review candidates and make hiring decisions
• **HR Team** - Handle offers and onboarding

Would you like to invite team members now, or skip this for later?`,
      name: 'Talentou AI'
    }
  ],

  // Completion
  completion: {
    sender: 'ai',
    content: `🎉 **TA Plan Complete!** 

You've successfully built a comprehensive Talent Acquisition plan covering:
✅ Company USP
✅ Talent Pool
✅ Recruitment Channels
✅ Success Metrics
✅ Team Collaboration

Your plan is ready to execute. You can:
• Export your plan as PDF
• Assign recruiters to start sourcing
• Onboard hiring leads for interviews

What would you like to do next?`,
    name: 'Talentou AI'
  }
};

export const getStageTransitionMessage = (stageIndex: number): string => {
  const transitions = [
    "✅ Company USP completed! Moving to Talent Pool...",
    "✅ Talent Pool defined! Moving to Recruitment Channels...",
    "✅ Recruitment Channels planned! Moving to Success Metrics...",
    "✅ Success Metrics set! Moving to Team Invitation...",
    "🎉 All stages complete!"
  ];
  return transitions[stageIndex] || "";
};
