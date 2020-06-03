import React, { useCallback } from 'react';
import { useSession } from '../session_context/session_context';

interface FeatureToggleContext {
  features: string[];
  hasFeature: (name: string) => boolean;
}

export const FeatureToggleContext = React.createContext<FeatureToggleContext>({
  features: [],
  hasFeature: () => false,
});

export const FeatureToggles = ({
  children,
  features,
}: {
  children: React.ReactNode;
  features?: string[];
}) => {
  const sessionContext = useSession();
  const providedFeatures = features ?? sessionContext.sessionData?.roles ?? [];
  const hasFeature = useCallback(
    (name: string) => {
      return name && providedFeatures.includes(name);
    },
    [providedFeatures]
  );

  return (
    <FeatureToggleContext.Provider
      value={{ features: providedFeatures, hasFeature }}
    >
      {children}
    </FeatureToggleContext.Provider>
  );
};