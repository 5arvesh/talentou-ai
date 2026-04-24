import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Eye, EyeOff, ThumbsUp, ThumbsDown, Building2, Clock, Star, Heart, 
  TrendingUp, DollarSign, Calendar, User, AlertTriangle, Zap, MapPin, 
  Briefcase, Users, CheckCircle2 
} from 'lucide-react';
import { useNewPosition } from '@/context/NewPositionContext';

export function JDPreviewStage() {
  const {
    showJD,
    setShowJD,
    showApprovalButtons,
    handleApprove,
    handleReject,
    priority,
    getPriorityConfig,
    jobDetails,
    showRejectionInput,
    setShowRejectionInput,
    rejectionFeedback,
    setRejectionFeedback,
    handleSubmitRejectionFeedback,
    setShowApprovalButtons
  } = useNewPosition();

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#7800D3]">Job Description</h2>
          <p className="text-xs text-muted-foreground mt-1">Submitted by {jobDetails.hiringLead}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowJD(!showJD)}
          className="text-muted-foreground hover:text-foreground"
        >
          {showJD ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </Button>
      </div>

      {showJD ? (
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {/* Header Section with Priority Badge */}
            <div className="rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 p-6">
              <div className="flex items-start justify-between mb-4">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                  <Building2 className="h-3 w-3 mr-1" />
                  {jobDetails.project}
                </Badge>
                {priority && (
                  <Badge className={`${getPriorityConfig(priority).color} border`}>
                    {priority === 'high' && <AlertTriangle className="h-3 w-3 mr-1" />}
                    {priority === 'medium' && <Zap className="h-3 w-3 mr-1" />}
                    {getPriorityConfig(priority).label} Priority
                  </Badge>
                )}
              </div>
              
              <h1 className="text-2xl font-bold text-foreground mb-1">
                {jobDetails.title}
              </h1>
              <p className="text-base text-muted-foreground mb-4">TechCorp Inc.</p>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-background">
                  <MapPin className="h-3 w-3 mr-1 text-primary" />
                  {jobDetails.location}
                </Badge>
                <Badge variant="outline" className="bg-background">
                  <Briefcase className="h-3 w-3 mr-1 text-primary" />
                  {jobDetails.workType}
                </Badge>
                <Badge variant="outline" className="bg-background">
                  <Clock className="h-3 w-3 mr-1 text-primary" />
                  {jobDetails.employmentMode}
                </Badge>
              </div>
            </div>

            {/* Quick Info Summary Card */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Card className="p-4 text-center bg-muted/30">
                <Users className="h-5 w-5 mx-auto mb-2 text-primary" />
                <p className="text-lg font-bold text-foreground">{jobDetails.numberOfOpenings}</p>
                <p className="text-xs text-muted-foreground">Openings</p>
              </Card>
              <Card className="p-4 text-center bg-muted/30">
                <Briefcase className="h-5 w-5 mx-auto mb-2 text-primary" />
                <p className="text-lg font-bold text-foreground">{jobDetails.minExperience}+ yrs</p>
                <p className="text-xs text-muted-foreground">Experience</p>
              </Card>
              <Card className="p-4 text-center bg-muted/30">
                <DollarSign className="h-5 w-5 mx-auto mb-2 text-emerald-500" />
                <p className="text-lg font-bold text-foreground">{jobDetails.maxBudget}</p>
                <p className="text-xs text-muted-foreground">Budget</p>
              </Card>
              <Card className="p-4 text-center bg-muted/30">
                <Calendar className="h-5 w-5 mx-auto mb-2 text-amber-500" />
                <p className="text-lg font-bold text-foreground">{jobDetails.startDate}</p>
                <p className="text-xs text-muted-foreground">Start Date</p>
              </Card>
            </div>

            {/* Team Info */}
            <Card className="p-4 bg-muted/20 border-dashed">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Hiring Lead</p>
                  <p className="font-medium text-foreground">{jobDetails.hiringLead}</p>
                </div>
              </div>
            </Card>

            {/* About the Role */}
            <Card className="p-5 border-l-4 border-l-primary">
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                About the Role
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We're looking for a talented {jobDetails.title} to join our growing team. This is an exciting opportunity to work on cutting-edge projects and make a significant impact on our product and users. You'll collaborate with cross-functional teams to deliver high-quality solutions that drive business value.
              </p>
            </Card>

            {/* Why Join Us */}
            <Card className="p-5">
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Why Join Us?
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>We're on a mission to revolutionize how businesses leverage technology. Our team is passionate about creating innovative solutions that make a real impact.</p>
                <p>Join a diverse team of talented individuals who believe in collaboration, continuous learning, and pushing boundaries.</p>
              </div>
            </Card>

            {/* Benefits & Perks */}
            <Card className="p-5 border-emerald-500/20">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
                Benefits & Perks
              </h3>
              <div className="space-y-2">
                {["Competitive salary + equity package", "Comprehensive health insurance", "Flexible remote work options", "25 days PTO + holidays", "Latest equipment & tools", "Learning & development budget"].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-emerald-500" />
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Skills Section */}
            <Card className="p-5">
              <h3 className="text-lg font-semibold text-foreground mb-4">Skills Required</h3>
              
              <div className="mb-4">
                <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Must Have</p>
                <div className="flex flex-wrap gap-2">
                  {jobDetails.keySkills.map((skill, index) => (
                    <Badge key={index} className="bg-primary text-primary-foreground">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Nice to Have</p>
                <div className="flex flex-wrap gap-2">
                  {jobDetails.desiredSkills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-muted-foreground">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            {/* What You'll Do */}
            <Card className="p-5">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                What You'll Do
              </h3>
              <div className="space-y-2">
                {jobDetails.responsibilities.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="font-semibold min-w-[20px] text-primary">{index + 1}.</span>
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Qualifications */}
            <Card className="p-5">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Preferred Qualifications
              </h3>
              <div className="space-y-2">
                {jobDetails.preferredQualifications.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </ScrollArea>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <Eye className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Click the eye icon to view the Job Description</p>
          </div>
        </div>
      )}

      {/* Approve/Reject Buttons - Fixed at bottom of right panel */}
      {showApprovalButtons && !showRejectionInput && (
        <div className="border-t border-border p-4 bg-white">
          <div className="flex gap-3">
            <Button 
              onClick={handleReject}
              variant="outline"
              className="flex-1 border-red-500 text-red-600 hover:bg-red-50"
            >
              <ThumbsDown className="h-4 w-4 mr-2" />
              Reject Position
            </Button>
            <Button 
              onClick={handleApprove}
              className="flex-1 bg-[#4ead3b] hover:bg-[#8FD378] text-white"
            >
              <ThumbsUp className="h-4 w-4 mr-2" />
              Approve Position
            </Button>
          </div>
        </div>
      )}

      {/* Rejection Form - Fixed at bottom of right panel */}
      {showRejectionInput && (
        <div className="border-t border-border p-4 bg-red-50/50">
          <p className="text-sm font-semibold text-red-700 mb-2">Provide Rejection Reason</p>
          <Textarea 
            value={rejectionFeedback} 
            onChange={e => setRejectionFeedback(e.target.value)} 
            placeholder="Please explain why you're rejecting this position..."
            className="mb-3 bg-white"
            rows={3} 
          />
          <div className="flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={() => { 
                setShowRejectionInput(false); 
                setShowApprovalButtons(true); 
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitRejectionFeedback} 
              className="bg-red-600 hover:bg-red-700 text-white" 
              disabled={!rejectionFeedback.trim()}
            >
              Submit Feedback
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
