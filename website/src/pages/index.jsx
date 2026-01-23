import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import LandingPage from '../components/Landing/LandingPage';
import { useHistory } from '@docusaurus/router';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const history = useHistory();
  const baseUrl = siteConfig.baseUrl;

  const handleCategoryClick = (categoryId) => {
    // Navigate to category page with baseUrl
    history.push(`${baseUrl}category/${categoryId}`);
  };

  const handleTimelineClick = (timelineId) => {
    // Navigate to timeline page with baseUrl
    history.push(`${baseUrl}timeline/${timelineId}`);
  };

  return (
    <Layout
      title="Trump Controversies Tracker"
      description="A comprehensive, sourced database of controversies, criticisms, and concerns about Donald Trump">
      <LandingPage
        onCategoryClick={handleCategoryClick}
        onTimelineClick={handleTimelineClick}
      />
    </Layout>
  );
}
