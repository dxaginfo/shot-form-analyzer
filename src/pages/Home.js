import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeroSection = styled.section`
  text-align: center;
  padding: ${props => props.theme.spacing.xxl} 0;
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.primary} 0%,
    ${props => props.theme.colors.secondary} 100%
  );
  color: white;
  border-radius: ${props => props.theme.borderRadius.large};
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: ${props => props.theme.spacing.lg};
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 3.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${props => props.theme.fontSizes.large};
  max-width: 800px;
  margin: 0 auto ${props => props.theme.spacing.xl};
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: white;
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 600;
  font-size: ${props => props.theme.fontSizes.large};
  transition: all ${props => props.theme.transitions.medium};
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.primary};
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const FeaturesSection = styled.section`
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.xl};
`;

const FeatureCard = styled.div`
  background-color: ${props => props.theme.colors.cardBackground};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.small};
  transition: all ${props => props.theme.transitions.medium};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FeatureTitle = styled.h3`
  margin-bottom: ${props => props.theme.spacing.sm};
  text-align: center;
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  text-align: center;
`;

const HowItWorksSection = styled.section`
  margin-bottom: ${props => props.theme.spacing.xxl};
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.large};
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: row;
  }
`;

const Step = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  
  &:not(:last-child)::after {
    content: '→';
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    font-size: 2rem;
    color: ${props => props.theme.colors.textLight};
    
    @media (max-width: ${props => props.theme.breakpoints.tablet}) {
      content: '↓';
      top: auto;
      bottom: -10px;
      right: 50%;
      transform: translateX(50%);
    }
  }
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const StepTitle = styled.h3`
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const StepDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
`;

const TestimonialsSection = styled.section`
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const TestimonialCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const TestimonialCard = styled.div`
  background-color: ${props => props.theme.colors.cardBackground};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.small};
`;

const TestimonialText = styled.p`
  font-style: italic;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.secondary};
  margin-right: ${props => props.theme.spacing.md};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.h4`
  margin-bottom: 4px;
`;

const AuthorRole = styled.p`
  font-size: ${props => props.theme.fontSizes.small};
  color: ${props => props.theme.colors.textLight};
`;

const CTASection = styled.section`
  text-align: center;
  padding: ${props => props.theme.spacing.xl} 0;
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  border-radius: ${props => props.theme.borderRadius.large};
`;

const CTATitle = styled.h2`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const CTAText = styled.p`
  max-width: 600px;
  margin: 0 auto ${props => props.theme.spacing.lg};
`;

const Home = () => {
  return (
    <>
      <HeroSection>
        <HeroTitle>Improve Your Basketball Shot with AI Analysis</HeroTitle>
        <HeroSubtitle>
          Upload a video of your basketball shot and get instant, AI-powered feedback
          to help you shoot like the pros.
        </HeroSubtitle>
        <CTAButton to="/upload">Analyze My Shot</CTAButton>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>Key Features</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>📊</FeatureIcon>
            <FeatureTitle>Detailed Metrics</FeatureTitle>
            <FeatureDescription>
              Get precise measurements of your elbow angle, release point, shot arc, and more.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🔍</FeatureIcon>
            <FeatureTitle>Visual Feedback</FeatureTitle>
            <FeatureDescription>
              See your form with overlay visualization highlighting areas for improvement.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>📈</FeatureIcon>
            <FeatureTitle>Progress Tracking</FeatureTitle>
            <FeatureDescription>
              Monitor your improvement over time with detailed progress charts.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🏀</FeatureIcon>
            <FeatureTitle>Pro Comparisons</FeatureTitle>
            <FeatureDescription>
              Compare your shooting form to professional basketball players.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>📱</FeatureIcon>
            <FeatureTitle>Anywhere Access</FeatureTitle>
            <FeatureDescription>
              Use on any device with a web browser - no app installation required.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🔒</FeatureIcon>
            <FeatureTitle>Privacy-Focused</FeatureTitle>
            <FeatureDescription>
              All video processing happens in your browser - no videos are stored on servers.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <HowItWorksSection>
        <SectionTitle>How It Works</SectionTitle>
        <StepsContainer>
          <Step>
            <StepNumber>1</StepNumber>
            <StepTitle>Upload</StepTitle>
            <StepDescription>
              Record or upload a video of your basketball shot from the side angle.
            </StepDescription>
          </Step>
          
          <Step>
            <StepNumber>2</StepNumber>
            <StepTitle>Analyze</StepTitle>
            <StepDescription>
              Our AI technology analyzes your form using advanced computer vision.
            </StepDescription>
          </Step>
          
          <Step>
            <StepNumber>3</StepNumber>
            <StepTitle>Review</StepTitle>
            <StepDescription>
              Get detailed feedback and personalized recommendations to improve.
            </StepDescription>
          </Step>
          
          <Step>
            <StepNumber>4</StepNumber>
            <StepTitle>Improve</StepTitle>
            <StepDescription>
              Practice with the recommendations, then upload again to track progress.
            </StepDescription>
          </Step>
        </StepsContainer>
      </HowItWorksSection>

      <TestimonialsSection>
        <SectionTitle>What Players Are Saying</SectionTitle>
        <TestimonialCards>
          <TestimonialCard>
            <TestimonialText>
              "Shot Form Analyzer helped me identify a flaw in my elbow positioning that coaches had missed. After just two weeks of practice with the recommendations, my shooting percentage improved dramatically."
            </TestimonialText>
            <TestimonialAuthor>
              <AuthorAvatar>JD</AuthorAvatar>
              <AuthorInfo>
                <AuthorName>Jason Davidson</AuthorName>
                <AuthorRole>High School Varsity Player</AuthorRole>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>
          
          <TestimonialCard>
            <TestimonialText>
              "As a coach, this tool has revolutionized how I work with my players. I can quickly identify technical issues and track improvements over the season. It's like having an assistant coach focused on shooting technique."
            </TestimonialText>
            <TestimonialAuthor>
              <AuthorAvatar>SC</AuthorAvatar>
              <AuthorInfo>
                <AuthorName>Sarah Chen</AuthorName>
                <AuthorRole>College Basketball Coach</AuthorRole>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>
          
          <TestimonialCard>
            <TestimonialText>
              "I was struggling with consistency in my three-point shots. The Shot Form Analyzer showed me that my release point was inconsistent. After working on the specific drills recommended, my shooting has never been better!"
            </TestimonialText>
            <TestimonialAuthor>
              <AuthorAvatar>MJ</AuthorAvatar>
              <AuthorInfo>
                <AuthorName>Marcus Johnson</AuthorName>
                <AuthorRole>Recreational League Player</AuthorRole>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>
        </TestimonialCards>
      </TestimonialsSection>

      <CTASection>
        <CTATitle>Ready to Improve Your Shot?</CTATitle>
        <CTAText>
          Join thousands of players who have enhanced their shooting technique with our AI-powered analysis.
        </CTAText>
        <CTAButton to="/upload">Analyze My Shot Now</CTAButton>
      </CTASection>
    </>
  );
};

export default Home;