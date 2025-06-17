import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

const UploaderContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const DropzoneContainer = styled.div`
  border: 2px dashed ${props => props.isDragActive 
    ? props.theme.colors.primary 
    : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.medium};
  background-color: ${props => props.isDragActive 
    ? `${props.theme.colors.primary}10` 
    : props.theme.colors.cardBackground};
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background-color: ${props => `${props.theme.colors.primary}10`};
  }
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.primary};
`;

const UploadText = styled.p`
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSizes.medium};
`;

const UploadHint = styled.p`
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.fontSizes.small};
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.danger};
  margin-top: ${props => props.theme.spacing.md};
`;

const FileInfo = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => `${props.theme.colors.primary}10`};
  border-radius: ${props => props.theme.borderRadius.medium};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FileDetails = styled.div``;

const FileName = styled.p`
  font-weight: 500;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const FileSize = styled.p`
  font-size: ${props => props.theme.fontSizes.small};
  color: ${props => props.theme.colors.textLight};
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.danger};
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    background-color: ${props => `${props.theme.colors.danger}15`};
  }
`;

const ButtonsContainer = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: center;
`;

const Button = styled.button`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.medium};
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const AnalyzeButton = styled(Button)`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  
  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const CancelButton = styled(Button)`
  background-color: transparent;
  border: 1px solid ${props => props.theme.colors.border};
  
  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.background};
  }
`;

const ProgressContainer = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
`;

const ProgressBar = styled.div`
  height: 8px;
  background-color: ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.small};
  margin-bottom: ${props => props.theme.spacing.sm};
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => `${props.progress}%`};
  background-color: ${props => props.theme.colors.primary};
  transition: width 0.3s ease;
`;

const ProgressText = styled.p`
  font-size: ${props => props.theme.fontSizes.small};
  color: ${props => props.theme.colors.textLight};
  text-align: center;
`;

const VideoUploader = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const onDrop = useCallback(acceptedFiles => {
    // Reset any previous errors
    setError('');
    
    // Check if a file was provided
    if (acceptedFiles.length === 0) {
      return;
    }
    
    const selectedFile = acceptedFiles[0];
    
    // Validate file type
    if (!selectedFile.type.includes('video/')) {
      setError('Please upload a video file');
      return;
    }
    
    // Validate file size (limit to 100MB)
    if (selectedFile.size > 100 * 1024 * 1024) {
      setError('Video file is too large. Please upload a file smaller than 100MB.');
      return;
    }
    
    // Set the file
    setFile(selectedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.webm']
    },
    maxFiles: 1
  });

  const handleRemoveFile = () => {
    setFile(null);
    setError('');
    setProgress(0);
  };

  const handleAnalyze = () => {
    if (!file) return;
    
    // Simulate upload and processing
    setUploading(true);
    
    // Fake progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploading(false);
            // Navigate to analysis page with a dummy ID
            // In a real app, this would be the ID returned from the server
            navigate('/analysis/123');
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <UploaderContainer>
      {!file ? (
        <DropzoneContainer {...getRootProps()} isDragActive={isDragActive}>
          <input {...getInputProps()} />
          <UploadIcon>📤</UploadIcon>
          <UploadText>
            {isDragActive
              ? 'Drop your video here...'
              : 'Drag and drop your video, or click to browse'}
          </UploadText>
          <UploadHint>
            For best results, upload a video showing your shot from the side angle.
            Supported formats: MP4, MOV, WebM, AVI
          </UploadHint>
        </DropzoneContainer>
      ) : (
        <>
          <FileInfo>
            <FileDetails>
              <FileName>{file.name}</FileName>
              <FileSize>{formatFileSize(file.size)}</FileSize>
            </FileDetails>
            <RemoveButton onClick={handleRemoveFile}>Remove</RemoveButton>
          </FileInfo>
          
          {uploading && (
            <ProgressContainer>
              <ProgressBar>
                <ProgressFill progress={progress} />
              </ProgressBar>
              <ProgressText>
                {progress < 100
                  ? `Uploading and analyzing: ${progress}%`
                  : 'Analysis complete! Redirecting...'}
              </ProgressText>
            </ProgressContainer>
          )}
          
          <ButtonsContainer>
            <CancelButton onClick={handleRemoveFile} disabled={uploading}>
              Cancel
            </CancelButton>
            <AnalyzeButton onClick={handleAnalyze} disabled={uploading}>
              {uploading ? 'Analyzing...' : 'Analyze Shot'}
            </AnalyzeButton>
          </ButtonsContainer>
        </>
      )}
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </UploaderContainer>
  );
};

export default VideoUploader;