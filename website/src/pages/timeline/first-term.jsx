import React, { useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useHistory } from '@docusaurus/router';
import TimelinePage from '../../components/Timeline/TimelinePage';
import ControversyDetail from '../../components/Detail/ControversyDetail';

export default function FirstTerm() {
  const { siteConfig } = useDocusaurusContext();
  const history = useHistory();
  const [selectedControversy, setSelectedControversy] = useState(null);

  const handleBack = () => {
    history.push(siteConfig.baseUrl);
  };

  const handleControversyClick = (controversy) => {
    setSelectedControversy(controversy);
  };

  const handleCloseDetail = () => {
    setSelectedControversy(null);
  };

  return (
    <Layout title="First Term Controversies (2017-2021)" description="First term controversies">
      <TimelinePage
        timelineId="first-term"
        onControversyClick={handleControversyClick}
        onBack={handleBack}
      />

      {selectedControversy && (
        <ControversyDetail controversy={selectedControversy} onClose={handleCloseDetail} />
      )}
    </Layout>
  );
}
