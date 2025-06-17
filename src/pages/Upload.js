import React, { useState } from 'react';
import styled from 'styled-components';
import VideoUploader from '../components/upload/VideoUploader';

const UploadPageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
`;

const PageDescription = styled.p`
  margin-bottom: ${props => props.theme.spacing.xl};
  text-align: center;
  color: ${props => props.theme.colors.textLight};
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.spacing.xl};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Tab = styled.button`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background: none;
  border: none;
  border-bottom: 3px solid ${props => 
    props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => 
    props.active ? props.theme.colors.primary : props.theme.colors.text};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const TipsContainer = styled.div`
  background-color: ${props => `${props.theme.colors.primary}10`};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.medium};
  margin-top: ${props => props.theme.spacing.xl};
`;

const TipsTitle = styled.h3`
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const TipsList = styled.ul`
  margin-left: ${props => props.theme.spacing.lg};
`;

const TipItem = styled.li`
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const RecordingSection = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  border: 1px dashed ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
`;

const RecordingIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.primary};
`;

const RecordButton = styled.button`
  background-color: ${props => props.recording ? props.theme.colors.danger : props.theme.colors.primary};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 500;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.medium};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin: 0 auto;
  
  &:hover {
    background-color: ${props => props.recording ? props.theme.colors.danger : props.theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const RecordingHint = styled.p`
  margin-top: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSizes.small};
  color: ${props => props.theme.colors.textLight};
`;

const Upload = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [recording, setRecording] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleRecordToggle = () => {
    // In a real implementation, this would start/stop camera recording
    setRecording(!recording);
  };

  return (
    <UploadPageContainer>
      <PageTitle>Upload Your Shot</PageTitle>
      <PageDescription>
        Upload or record a video of your basketball shot to get AI-powered analysis and feedback.
      </PageDescription>

      <TabsContainer>
        <Tab 
          active={activeTab === 'upload'} 
          onClick={() => handleTabChange('upload')}
        >
          Upload Video
        </Tab>
        <Tab 
          active={activeTab === 'record'} 
          onClick={() => handleTabChange('record')}
        >
          Record Shot
        </Tab>
      </TabsContainer>

      {activeTab === 'upload' ? (
        <>
          <VideoUploader />
          
          <TipsContainer>
            <TipsTitle>
              <span>💡</span>
              <span>Tips for Best Results</span>
            </TipsTitle>
            <TipsList>
              <TipItem>Record from the side (90° angle to your shooting direction)</TipItem>
              <TipItem>Make sure your entire body is visible in the frame</TipItem>
              <TipItem>Wear clothing that contrasts with the background</TipItem>
              <TipItem>Record in a well-lit area with minimal shadows</TipItem>
              <TipItem>Include at least 3 seconds before and after the shot</TipItem>
              <TipItem>Keep the camera stable - use a tripod if possible</TipItem>
            </TipsList>
          </TipsContainer>
        </>
      ) : (
        <RecordingSection>
          <RecordingIcon>📹</RecordingIcon>
          <p>Use your camera to record your shot directly.</p>
          <RecordButton recording={recording} onClick={handleRecordToggle}>
            {recording ? (
              <>
                <span>⏹️</span>
                <span>Stop Recording</span>
              </>
            ) : (
              <>
                <span>⏺️</span>
                <span>Start Recording</span>
              </>
            )}
          </RecordButton>
          <RecordingHint>
            {recording 
              ? 'Recording... Take your shot now.'
              : 'Position yourself in frame before starting.'}
          </RecordingHint>
        </RecordingSection>
      )}
    </UploadPageContainer>
  );
};

export default Upload;