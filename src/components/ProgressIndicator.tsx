import React from 'react';
import { Progress } from './ui/progress';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

export interface ProgressIndicatorProps {
  progress: number | null;
  status: 'idle' | 'converting' | 'completed' | 'error';
  fileName?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  progress, 
  status,
  fileName 
}) => {
  if (status === 'idle') {
    return null;
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg">
          {status === 'converting' && 'Converting...'}
          {status === 'completed' && 'Conversion Complete!'}
          {status === 'error' && 'Conversion Failed'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {status === 'converting' && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Converting {fileName}</span>
              <span>{progress !== null ? `${Math.round(progress)}%` : 'Processing...'}</span>
            </div>
            <Progress value={progress ?? 0} className="h-2" />
          </div>
        )}
        {status === 'completed' && (
          <div className="text-green-600">
            Your file has been successfully converted.
          </div>
        )}
        {status === 'error' && (
          <div className="text-destructive">
            There was an error during conversion. Please try again.
          </div>
        )}
      </CardContent>
      {status === 'converting' && (
        <CardFooter className="text-xs text-muted-foreground">
          Please don't close this window during conversion
        </CardFooter>
      )}
    </Card>
  );
};

export default ProgressIndicator; 