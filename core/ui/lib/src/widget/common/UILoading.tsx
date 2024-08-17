import React from "react";
import { BsArrowClockwise } from "react-icons/bs";
import { Button } from "../../widget/button/UIButton";

interface LoadingProps {
  loadingText?: string;
  timeoutContent?: any;
  timeoutIn?: number;
  reloadParent?: () => void;
}
function Loading({ loadingText, timeoutIn, timeoutContent, reloadParent }: LoadingProps) {
  if (!reloadParent) reloadParent = () => {
    alert("Ops! Developers are working on it! :)");
  }
  const timeout = timeoutIn * 1000;
  const [isLoading, setIsLoading] = React.useState(true);
  if (!timeoutContent) {
    timeoutContent = (
      <div className="flex-h justify-content-center">
        <Button 
          title="Retry?" type="link" icon={<BsArrowClockwise/>} 
          onClick={(event: any) => reloadParent()}/>
      </div>
    )
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, timeout);
    return () => {
      clearTimeout(timer);
    }
  }, []);

  return isLoading ? (
    <div className="flex-h justify-content-center py-2">
      <div className="spinner-border text-primary" role="status">
      </div>
      <div className="text-center p-1 small">{loadingText}</div>
    </div>
  ) : (timeoutContent);
}

/**
 * @param loadingText the content placed right next to the spinner. Default value = "Loading..."
 * @param timeoutContent the content that replace the loading content after duration.
 * @param timeoutIn duration of the loading (seconds). Default value = 3s.
 * @param reloadParent reload the parent component.
 * @returns React.ReactElement
 */
export function createLoading({
  loadingText = "Loading...",
  timeoutIn = 3,
  timeoutContent,
  reloadParent = () => { alert("Ops! Developers are working on it! :(") }
}: LoadingProps) {
  return (
    <Loading 
      loadingText={loadingText} 
      timeoutIn={timeoutIn} 
      timeoutContent={timeoutContent}
      reloadParent={reloadParent}
    />
  )
}